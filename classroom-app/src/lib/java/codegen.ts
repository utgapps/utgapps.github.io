/* The code generator: a checked Java program in, one JavaScript function body
   out, run by runtime.ts inside a Web Worker.

   Java's rules are kept in the generated code, not approximated:
     - int arithmetic wraps (`|0`, Math.imul); long is a 64-bit BigInt; float
       rounds through Math.fround; integer / and % by zero throw.
     - Array reads and writes are bounds-checked, method calls on null throw
       NullPointerException, and every exception carries a Java stack trace
       from a shadow stack each method keeps up to date.
     - A method that can wait - for the keyboard or Thread.sleep - becomes a
       generator, and everything that calls it is called with `yield*`, so the
       program can pause for input without blocking the worker. Only methods
       that can actually wait pay for that.
*/
import type * as Ast from "./ast";
import {
  type ClassInfo, type FieldInfo, type JavaType, type LocalVariable, type MethodInfo, type PrimitiveName,
  INT, BOOLEAN, isString, primitiveOf, sameType, unboxed, typeName, isSubtype, erasedDescriptor, classType,
} from "./types";
import { type Diagnostic, callParenPosition } from "./checker";
import { library } from "./library";

export type GeneratedProgram = { code: string; diagnostics: Diagnostic[] };

type Constant = string | number | boolean | bigint;

/** Where a value of this primitive type lives: the letter used for boxing and array descriptors. */
const LETTER: Record<PrimitiveName, string> = { int: "I", long: "J", double: "D", float: "F", boolean: "Z", char: "C", byte: "B", short: "S" };

export function binaryName(info: ClassInfo): string {
  return info.isUser ? info.qualifiedName.replace(/\./g, "$") : info.qualifiedName;
}

/** Java's name for an array's runtime class: "[I", "[[D", "[Ljava.lang.String;". */
export function arrayDescriptor(type: JavaType): string {
  if (type.tag === "array") return "[" + arrayDescriptor(type.element);
  if (type.tag === "primitive") return LETTER[type.name];
  if (type.tag === "class") return "L" + binaryName(type.classInfo) + ";";
  return "Ljava.lang.Object;";
}

function literal(value: Constant, type: JavaType | undefined): string {
  if (typeof value === "string") return JSON.stringify(value).replace(/[\u007f-￿]/g, (character) => "\\u" + character.charCodeAt(0).toString(16).padStart(4, "0"));
  if (typeof value === "boolean") return String(value);
  if (typeof value === "bigint") return value < 0n ? `(${value}n)` : `${value}n`;
  if (Number.isNaN(value)) return "NaN";
  if (value === Infinity) return "Infinity";
  if (value === -Infinity) return "(-Infinity)";
  if (Object.is(value, -0)) return "(-0)";
  void type;
  return value < 0 ? `(${value})` : String(value);
}

type FunctionContext = {
  temps: number;
  locals: Set<string>;
  isGenerator: boolean;
  frameVariable: string;          // "$d": the shadow-stack slot of this call
  isConstructor: boolean;
  classInfo: ClassInfo;
};

export function generate(classes: ClassInfo[], entry: ClassInfo): GeneratedProgram {
  return new Generator(classes, entry).program();
}

class Generator {
  private diagnostics: Diagnostic[] = [];
  private blocking = new Set<MethodInfo>();
  private blockingInitializers = new Set<ClassInfo>();
  private context!: FunctionContext;
  private lines: string[] = [];
  private lib = library();
  private clinitDependencies = new Map<ClassInfo, Set<ClassInfo>>();
  private currentDependencies: Set<ClassInfo> | null = null;

  constructor(private classes: ClassInfo[], private entry: ClassInfo) {}

  // ---- which methods can wait --------------------------------------------------
  private isBlocking(method: MethodInfo): boolean {
    return method.owner.isUser ? this.blocking.has(method) : method.blocking;
  }

  private computeBlocking() {
    const userMethods: MethodInfo[] = [];
    for (const info of this.classes) userMethods.push(...info.methods, ...info.constructors);
    // Methods that can stand in for one another at a call site must agree.
    const families = new Map<string, MethodInfo[]>();
    for (const method of userMethods) {
      if (method.isStatic || method.isConstructor || method.isPrivate) continue;
      const family = families.get(method.jsName) ?? [];
      family.push(method);
      families.set(method.jsName, family);
    }
    let changed = true;
    while (changed) {
      changed = false;
      for (const info of this.classes) {
        if (this.blockingInitializers.has(info)) continue;
        if ([...(info.instanceInitializerCallees ?? [])].some((callee) => this.isBlocking(callee))) {
          this.blockingInitializers.add(info);
          changed = true;
        }
      }
      for (const method of userMethods) {
        if (this.blocking.has(method)) continue;
        let blocks = [...(method.callees ?? [])].some((callee) => this.isBlocking(callee));
        if (method.isConstructor) {
          const explicit = (method.declaration as Ast.ConstructorDeclaration | undefined)?.explicitCall;
          const superConstructor = (method as MethodInfo & { superConstructor?: MethodInfo }).superConstructor;
          if (superConstructor && this.isBlocking(superConstructor)) blocks = true;
          if (explicit?.kind !== "this" && this.blockingInitializers.has(method.owner)) blocks = true;
        }
        if (blocks) {
          const family = !method.isStatic && !method.isConstructor && !method.isPrivate ? families.get(method.jsName) ?? [method] : [method];
          for (const member of family) this.blocking.add(member);
          changed = true;
        }
      }
    }
    for (const method of this.blocking) {
      if (["toString", "equals", "hashCode", "compareTo"].includes(method.jsName) && method.declaration) {
        const declaration = method.declaration as Ast.MethodDeclaration;
        this.diagnostics.push({
          file: method.owner.declaration!.file, line: declaration.namePosition.line, column: declaration.namePosition.column,
          message: `${method.name}() waits for keyboard input or sleeps`, details: [], code: "unsupported", unsupported: true,
        });
      }
    }
  }

  // ---- the program ----------------------------------------------------------------
  program(): GeneratedProgram {
    // A private method is not overridden by a subclass's private method of the same name.
    for (const info of this.classes) {
      for (const method of info.methods) {
        if (method.isPrivate && !method.isStatic && method.jsName.startsWith("m_")) method.jsName += "$$" + info.jsName;
      }
    }
    this.computeBlocking();
    const out: string[] = [`"use strict";`, `const $r = $rt;`];
    for (const info of this.orderedClasses()) {
      this.lines = [];
      this.classDeclaration(info);
      out.push(...this.lines);
    }
    // Interfaces a class implements, for instanceof.
    for (const info of this.classes) {
      const interfaces = new Set<string>();
      const visit = (type: JavaType | null) => {
        if (!type || type.tag !== "class") return;
        if (type.classInfo.kind === "interface") {
          interfaces.add(type.classInfo.isUser ? type.classInfo.jsName : JSON.stringify(type.classInfo.qualifiedName));
        }
        visit(type.classInfo.superclass);
        for (const implemented of type.classInfo.interfaces) visit(implemented);
      };
      visit(classType(info));
      out.push(`${info.jsName}.$i = new Set([${[...interfaces].join(", ")}]);`);
    }
    const mainMethod = this.entry.methods.find((method) => method.name === "main" && method.isStatic
      && method.parameters.length === 1 && erasedDescriptor(method.parameters[0]) === "Ajava_lang_String")!;
    const initialization = this.initializationOrder().map((info) => `  yield* ${info.jsName}.$clinit();`);
    const mainCall = `${this.entry.jsName}.${mainMethod.jsName}($r.arr("[Ljava.lang.String;", []))`;
    out.push(
      `return function* $main() {`,
      ...initialization,
      `  ${this.isBlocking(mainMethod) ? `yield* ${mainCall}` : mainCall};`,
      `};`,
    );
    return { code: out.join("\n"), diagnostics: this.diagnostics };
  }

  /** Superclasses before subclasses: `class X extends Y` needs Y defined. */
  private orderedClasses(): ClassInfo[] {
    const ordered: ClassInfo[] = [];
    const visit = (info: ClassInfo) => {
      if (ordered.includes(info)) return;
      if (info.superclass?.tag === "class" && info.superclass.classInfo.isUser) visit(info.superclass.classInfo);
      ordered.push(info);
    };
    for (const info of this.classes) visit(info);
    return ordered;
  }

  /** Static initializers run before main, each after the classes its initializer uses. */
  private initializationOrder(): ClassInfo[] {
    const ordered: ClassInfo[] = [];
    const visiting = new Set<ClassInfo>();
    const visit = (info: ClassInfo) => {
      if (ordered.includes(info) || visiting.has(info)) return;
      visiting.add(info);
      if (info.superclass?.tag === "class" && info.superclass.classInfo.isUser) visit(info.superclass.classInfo);
      for (const dependency of this.clinitDependencies.get(info) ?? []) visit(dependency);
      ordered.push(info);
    };
    for (const info of this.classes) visit(info);
    return ordered;
  }

  private emit(line: string) { this.lines.push(line); }

  private classDeclaration(info: ClassInfo) {
    const declaration = info.declaration!;
    const superName = info.superclass?.tag === "class" ? info.superclass.classInfo.jsName : "$r.C.Object";
    const extendsClause = info.kind === "interface" ? "" : ` extends ${superName.replace(/^\$rt\./, "$r.")}`;
    this.emit(`class ${info.jsName}${extendsClause} {`);
    // Instance fields start at their default values before any constructor runs.
    const instanceFields = [...info.fields.values()].filter((field) => !field.isStatic);
    if (info.kind !== "interface" && instanceFields.length) {
      this.emit(`  constructor() { super(); ${instanceFields.map((field) => `this.${field.jsName} = ${this.defaultValue(field.type)};`).join(" ")} }`);
    }
    if (info.kind !== "interface") {
      this.instanceInitializer(info, declaration);
      for (const constructor of info.constructors) this.constructorDeclaration(info, constructor);
    }
    for (const member of declaration.members) {
      if (member.kind === "Method" && member.info && member.body) this.methodDeclaration(info, member, member.info);
    }
    this.staticInitializer(info, declaration);
    this.emit(`}`);
    this.emit(`${info.jsName}.$jn = ${JSON.stringify(binaryName(info))};`);
    for (const field of info.fields.values()) {
      if (field.isStatic) this.emit(`${info.jsName}.${field.jsName} = ${field.constant !== undefined ? literal(field.constant, field.type) : this.defaultValue(field.type)};`);
    }
  }

  private defaultValue(type: JavaType): string {
    if (type.tag !== "primitive") return "null";
    if (type.name === "boolean") return "false";
    if (type.name === "long") return "0n";
    return "0";
  }

  private newContext(info: ClassInfo, isGenerator: boolean, isConstructor = false): FunctionContext {
    return { temps: 0, locals: new Set(), isGenerator, frameVariable: "$d", isConstructor, classInfo: info };
  }

  private frameName(info: ClassInfo, name: string) {
    return JSON.stringify(`${binaryName(info)}.${name}`);
  }

  /** The body of a method: hoisted locals, the shadow-stack frame, the Java-exception conversion. */
  private functionBody(header: string, info: ClassInfo, frame: string | null, line: number, bodyLines: string[], parameters: string[] = []) {
    const context = this.context;
    const locals = [...context.locals].filter((name) => !parameters.includes(name));
    for (let index = 1; index <= context.temps; index++) locals.push(`$t${index}`);
    this.emit(`  ${header} {`);
    if (locals.length) this.emit(`    let ${locals.join(", ")};`);
    if (frame === null) {
      // No frame of its own: an exception's constructor, which Java leaves out of the trace.
      for (const bodyLine of bodyLines) this.emit("    " + bodyLine);
      this.emit(`  }`);
      return;
    }
    const file = JSON.stringify(info.declaration!.file.replace(/^.*\//, ""));
    this.emit(`    const $d = $r.sp; if ($d >= $r.maxDepth) $r.soe(); $r.st[$d] = ${frame}; $r.fl[$d] = ${file}; $r.ln[$d] = ${line}; $r.sp = $d + 1;`);
    this.emit(`    try {`);
    for (const bodyLine of bodyLines) this.emit("      " + bodyLine);
    this.emit(`    } catch ($x) { throw $r.jex($x); } finally { $r.sp = $d; }`);
    this.emit(`  }`);
  }

  private methodDeclaration(info: ClassInfo, declaration: Ast.MethodDeclaration, method: MethodInfo) {
    const isGenerator = this.isBlocking(method);
    this.context = this.newContext(info, isGenerator);
    const parameters = declaration.parameters.map((parameter) => parameter.variable!.jsName);
    this.collectLocals(declaration.body!);
    const body = this.blockLines(declaration.body!);
    const header = `${method.isStatic ? "static " : ""}${isGenerator ? "*" : ""}${method.jsName}(${parameters.join(", ")})`;
    this.functionBody(header, info, this.frameName(info, method.name), declaration.position.line, body, parameters);
  }

  private instanceInitializer(info: ClassInfo, declaration: Ast.ClassDeclaration) {
    const isGenerator = this.blockingInitializers.has(info);
    this.context = this.newContext(info, isGenerator);
    const body: string[] = [];
    for (const member of declaration.members) {
      if (member.kind === "Field" && !member.modifiers.names.has("static")) {
        member.declarators.forEach((declarator, index) => {
          const field = member.fields?.[index];
          if (!declarator.initializer || !field || field.owner !== info) return;
          body.push(`$r.ln[$d] = ${declarator.position.line};`);
          body.push(`this.${field.jsName} = ${this.initializer(declarator.initializer, field.type)};`);
        });
      } else if (member.kind === "Initializer" && !member.isStatic) {
        this.collectLocals(member.body);
        body.push(...this.blockLines(member.body));
      }
    }
    const locals = [...this.context.locals];
    for (let index = 1; index <= this.context.temps; index++) locals.push(`$t${index}`);
    this.emit(`  ${isGenerator ? "*" : ""}$fi_${info.jsName}($d) {`);
    if (locals.length) this.emit(`    let ${locals.join(", ")};`);
    for (const line of body) this.emit("    " + line);
    this.emit(`  }`);
  }

  private staticInitializer(info: ClassInfo, declaration: Ast.ClassDeclaration) {
    this.context = this.newContext(info, true);
    this.currentDependencies = new Set();
    const body: string[] = [];
    for (const member of declaration.members) {
      if (member.kind === "Field" && (member.modifiers.names.has("static") || info.kind === "interface")) {
        member.declarators.forEach((declarator, index) => {
          const field = member.fields?.[index];
          if (!declarator.initializer || !field || field.constant !== undefined) return;
          body.push(`$r.ln[$d] = ${declarator.position.line};`);
          body.push(`${info.jsName}.${field.jsName} = ${this.initializer(declarator.initializer, field.type)};`);
        });
      } else if (member.kind === "Initializer" && member.isStatic) {
        this.collectLocals(member.body);
        body.push(...this.blockLines(member.body));
      }
    }
    this.currentDependencies.delete(info);
    this.clinitDependencies.set(info, this.currentDependencies);
    this.currentDependencies = null;
    this.functionBody("static *$clinit()", info, this.frameName(info, "<clinit>"), declaration.position.line, body);
  }

  private constructorDeclaration(info: ClassInfo, constructor: MethodInfo) {
    const declaration = constructor.declaration as Ast.ConstructorDeclaration | undefined;
    const isGenerator = this.isBlocking(constructor);
    this.context = this.newContext(info, isGenerator, true);
    const parameters = declaration ? declaration.parameters.map((parameter) => parameter.variable!.jsName) : [];
    if (declaration) this.collectLocals(declaration.body);
    const body: string[] = [];
    const wait = (callee: MethodInfo | undefined) => (callee && this.isBlocking(callee) ? "yield* " : "");
    const explicit = declaration?.explicitCall;
    if (explicit && explicit.constructorInfo) {
      const target = explicit.constructorInfo;
      const args = this.arguments(explicit.args, target, explicit.varargsCall ?? false,
        (explicit as typeof explicit & { parameterTypes?: JavaType[] }).parameterTypes);
      body.push(`$r.ln[$d] = ${explicit.position.line};`);
      body.push(`${wait(target)}${explicit.kind === "this" ? "this" : "super"}.${target.jsName || "$c_"}(${args});`);
    } else {
      const superConstructor = (constructor as MethodInfo & { superConstructor?: MethodInfo }).superConstructor;
      if (info.superclass?.tag === "class") body.push(`${wait(superConstructor)}super.${superConstructor?.jsName || "$c_"}();`);
    }
    if (explicit?.kind !== "this") body.push(`${this.blockingInitializers.has(info) ? "yield* " : ""}this.$fi_${info.jsName}($d);`);
    if (declaration) body.push(...this.blockLines(declaration.body));
    body.push(`return this;`);
    const header = `${isGenerator ? "*" : ""}${constructor.jsName}(${parameters.join(", ")})`;
    if (info.isThrowable) {
      // An exception's own constructor is left out of its stack trace, as in Java - but $d must still exist.
      // Its line markers go to the free slot above the stack, so the thrower's line stays put.
      body.unshift(`const $d = $r.sp;`);
      this.functionBody(header, info, null, 0, body, parameters);
    } else {
      this.functionBody(header, info, this.frameName(info, "<init>"), (declaration ?? info.declaration!).position.line, body, parameters);
    }
  }

  // ---- locals: every variable a body declares is hoisted to its top --------------------
  private collectLocals(block: Ast.Block) {
    const locals = this.context.locals;
    const statement = (node: Ast.Statement): void => {
      switch (node.kind) {
        case "Block": node.statements.forEach(statement); return;
        case "LocalVar":
          for (const declarator of node.declarators) {
            if (declarator.variable) locals.add(declarator.variable.jsName);
            if (declarator.initializer) expression(declarator.initializer);
          }
          return;
        case "ExprStmt": expression(node.expression); return;
        case "If": expression(node.condition); statement(node.thenBranch); if (node.elseBranch) statement(node.elseBranch); return;
        case "While": case "Do": expression(node.condition); statement(node.body); return;
        case "For":
          node.init.forEach(statement);
          if (node.condition) expression(node.condition);
          node.update.forEach(expression);
          statement(node.body);
          return;
        case "ForEach":
          if (node.variable) locals.add(node.variable.jsName);
          expression(node.iterable);
          statement(node.body);
          return;
        case "Return": if (node.value) expression(node.value); return;
        case "Throw": case "Yield": expression(node.value); return;
        case "Switch":
          expression(node.selector);
          for (const switchCase of node.cases) { switchCase.body.forEach(statement); if (switchCase.arrowExpression) expression(switchCase.arrowExpression); }
          return;
        case "Try":
          statement(node.body);
          for (const clause of node.catches) { if (clause.variable) locals.add(clause.variable.jsName); statement(clause.body); }
          if (node.finallyBlock) statement(node.finallyBlock);
          return;
        case "Labeled": statement(node.body); return;
        default: return;
      }
    };
    const expression = (node: Ast.Expression): void => {
      switch (node.kind) {
        case "InstanceOf": {
          const variable = (node as Ast.InstanceOf & { variable?: LocalVariable }).variable;
          if (variable) locals.add(variable.jsName);
          expression(node.operand);
          return;
        }
        case "SwitchExpr":
          expression(node.selector);
          for (const switchCase of node.cases) { switchCase.body.forEach(statement); if (switchCase.arrowExpression) expression(switchCase.arrowExpression); }
          return;
        case "Binary": expression(node.left); expression(node.right); return;
        case "Assign": expression(node.target); expression(node.value); return;
        case "Unary": case "Postfix": expression(node.operand); return;
        case "Conditional": expression(node.condition); expression(node.whenTrue); expression(node.whenFalse); return;
        case "Cast": expression(node.operand); return;
        case "Call": if (node.target) expression(node.target); node.args.forEach(expression); return;
        case "New": node.args.forEach(expression); return;
        case "NewArray": node.dimensionExpressions.forEach(expression); if (node.initializer) expression(node.initializer); return;
        case "ArrayInit": node.elements.forEach(expression); return;
        case "ArrayAccess": expression(node.array); expression(node.index); return;
        case "FieldAccess": expression(node.target); return;
        default: return;
      }
    };
    statement(block);
  }

  private temp(): string {
    this.context.temps++;
    return `$t${this.context.temps}`;
  }

  // ---- statements ---------------------------------------------------------------------------
  private blockLines(block: Ast.Block): string[] {
    const lines: string[] = [];
    for (const statement of block.statements) lines.push(...this.statement(statement));
    return lines;
  }

  private indent(lines: string[]): string[] { return lines.map((line) => "  " + line); }

  private lineMarker(statement: Ast.Statement): string {
    return `$r.ln[$d] = ${statement.position.line};`;
  }

  private body(statement: Ast.Statement): string[] {
    if (statement.kind === "Block") return this.indent(this.blockLines(statement));
    return this.indent(this.statement(statement));
  }

  private statement(statement: Ast.Statement, label?: string): string[] {
    const marker = this.lineMarker(statement);
    const prefix = label ? `${label}: ` : "";
    switch (statement.kind) {
      case "Block": return [`${prefix}{`, ...this.indent(this.blockLines(statement)), `}`];
      case "LocalVar": {
        const lines: string[] = [];
        for (const declarator of statement.declarators) {
          if (!declarator.initializer || !declarator.variable) continue;
          lines.push(`${declarator.variable.jsName} = ${this.initializer(declarator.initializer, declarator.variable.type)};`);
        }
        return lines.length ? [marker, ...lines] : [];
      }
      case "ExprStmt": return [marker, `${this.expression(statement.expression, true)};`];
      case "If": {
        const lines = [marker, `${prefix}if (${this.condition(statement.condition)}) {`, ...this.body(statement.thenBranch)];
        if (statement.elseBranch) lines.push(`} else {`, ...this.body(statement.elseBranch));
        lines.push(`}`);
        return lines;
      }
      case "While":
        return [marker, `${prefix}while (($r.ln[$d] = ${statement.condition.position.line}, ${this.condition(statement.condition)})) {`,
                ...this.body(statement.body), `}`];
      case "Do":
        return [marker, `${prefix}do {`, ...this.body(statement.body),
                `} while (($r.ln[$d] = ${statement.condition.position.line}, ${this.condition(statement.condition)}));`];
      case "For": {
        const init = statement.init.flatMap((initializer) => {
          if (initializer.kind === "LocalVar") {
            return initializer.declarators.filter((declarator) => declarator.initializer && declarator.variable)
              .map((declarator) => `${declarator.variable!.jsName} = ${this.initializer(declarator.initializer!, declarator.variable!.type)}`);
          }
          if (initializer.kind === "ExprStmt") return [this.expression(initializer.expression, true)];
          return [];
        });
        const condition = statement.condition ? `($r.ln[$d] = ${statement.condition.position.line}, ${this.condition(statement.condition)})` : "";
        const update = statement.update.map((expression) => this.expression(expression, true));
        return [marker, `${prefix}for (${init.join(", ")}; ${condition}; ${update.join(", ")}) {`, ...this.body(statement.body), `}`];
      }
      case "ForEach": return [marker, ...this.forEach(statement, prefix)];
      case "Labeled": {
        const name = `L_${statement.label}`;
        const inner = this.statement(statement.body, name);
        // A label on a statement that is not a loop, switch or block still needs a block to hang on.
        if (inner.length && inner.some((line) => line.startsWith(`${name}: `))) return inner;
        return [`${name}: {`, ...this.indent(inner), `}`];
      }
      case "Return": {
        if (this.context.isConstructor) return [marker, `return this;`];
        if (!statement.value) return [marker, `return;`];
        return [marker, `return ${this.converted(statement.value, statement.returnType!)};`];
      }
      case "Break": return [marker, statement.label ? `break L_${statement.label};` : `break;`];
      case "Continue": return [marker, statement.label ? `continue L_${statement.label};` : `continue;`];
      case "Throw": return [marker, `throw $r.thr(${this.expression(statement.value)});`];
      case "Yield": return [marker, `return ${this.converted(statement.value, statement.resultType!)};`];
      case "Switch": return [marker, ...this.switchStatement(statement, prefix)];
      case "Try": return [marker, ...this.tryStatement(statement, prefix)];
      case "Empty": case "Assert": case "UnsupportedStmt": return [];
    }
  }

  private forEach(statement: Ast.ForEachStatement, prefix: string): string[] {
    const variable = statement.variable!;
    const elementType = statement.elementType ?? variable.type;
    const iterable = statement.iterable;
    const collection = this.temp();
    if (iterable.type?.tag === "array") {
      const index = this.temp();
      return [
        `${collection} = $r.nn(${this.expression(iterable)}, ${this.nullMessage("Cannot read the array length", iterable)});`,
        `${prefix}for (${index} = 0; ${index} < ${collection}.length; ${index}++) {`,
        `  ${variable.jsName} = ${this.coerce(`${collection}[${index}]`, elementType, variable.type)};`,
        ...this.body(statement.body),
        `}`,
      ];
    }
    return [
      `${collection} = $r.iter($r.nn(${this.expression(iterable)}, ${this.nullMessage(`Cannot invoke "${typeName(iterable.type!)}.iterator()"`, iterable)}));`,
      `${prefix}while (${collection}.hasNext()) {`,
      `  ${variable.jsName} = ${this.coerce(`${collection}.next()`, elementType, variable.type)};`,
      ...this.body(statement.body),
      `}`,
    ];
  }

  private switchSelector(selector: Ast.Expression): string {
    const type = selector.type!;
    if (isString(type)) return `String($r.nn(${this.expression(selector)}, ${this.nullMessage(`Cannot invoke "String.hashCode()"`, selector)}))`;
    const plain = primitiveOf(type);
    return this.coerce(this.expression(selector), type, plain ?? type);
  }

  private caseLabels(switchCase: Ast.SwitchCase): string[] {
    const labels = switchCase.labels.map((label) => `case ${literal(label.constant!, label.type)}:`);
    if (switchCase.isDefault) labels.push(`default:`);
    return labels;
  }

  private switchStatement(statement: Ast.SwitchStatement, prefix: string): string[] {
    const lines = [`${prefix}switch (${this.switchSelector(statement.selector)}) {`];
    const arrow = statement.cases.some((switchCase) => switchCase.arrow);
    for (const switchCase of statement.cases) {
      lines.push(...this.indent(this.caseLabels(switchCase)));
      if (arrow) {
        const armBody = switchCase.arrowExpression
          ? [this.lineMarker(switchCase.body[0] ?? { kind: "Empty", position: switchCase.arrowExpression.position }), `${this.expression(switchCase.arrowExpression, true)};`]
          : switchCase.body.flatMap((inner) => inner.kind === "Block" ? this.blockLines(inner) : this.statement(inner));
        lines.push(`    {`, ...this.indent(this.indent(this.indent(armBody))), `    }`, `    break;`);
      } else {
        for (const inner of switchCase.body) lines.push(...this.indent(this.indent(this.statement(inner))));
      }
    }
    lines.push(`}`);
    return lines;
  }

  private tryStatement(statement: Ast.TryStatement, prefix: string): string[] {
    const lines = [`${prefix}try {`, ...this.indent(this.blockLines(statement.body)), `}`];
    if (statement.catches.length) {
      const caught = this.temp();
      lines.push(`catch (${caught}) {`, `  ${caught} = $r.jex(${caught});`);
      statement.catches.forEach((clause, index) => {
        const types = ((clause as Ast.CatchClause & { resolvedTypes?: JavaType[] }).resolvedTypes ?? []).filter((type) => type.tag === "class");
        const test = types.map((type) => this.instanceTest(caught, type)).join(" || ") || "false";
        lines.push(`  ${index ? "else " : ""}if (${test}) {`);
        if (clause.variable) lines.push(`    ${clause.variable.jsName} = ${caught};`);
        lines.push(...this.indent(this.indent(this.blockLines(clause.body))), `  }`);
      });
      lines.push(`  else throw ${caught};`, `}`);
    }
    if (statement.finallyBlock) lines.push(`finally {`, ...this.indent(this.blockLines(statement.finallyBlock)), `}`);
    return lines;
  }

  // ---- values in context ------------------------------------------------------------------------
  /** An initializer: an array initializer takes its type from the variable. */
  private initializer(expression: Ast.Expression, type: JavaType): string {
    if (expression.kind === "ArrayInit") return this.arrayInitializer(expression, type);
    return this.converted(expression, type);
  }

  private converted(expression: Ast.Expression, type: JavaType): string {
    return this.coerce(this.expression(expression), expression.type!, type);
  }

  private condition(expression: Ast.Expression): string {
    return this.converted(expression, BOOLEAN);
  }

  /** Java's conversions between primitives, and boxing and unboxing. */
  coerce(code: string, from: JavaType | undefined, to: JavaType | undefined): string {
    if (!from || !to || from.tag === "error" || to.tag === "error" || from.tag === "void" || to.tag === "void") return code;
    if (from.tag === "primitive" && to.tag === "primitive") return this.primitiveConversion(code, from.name, to.name);
    if (from.tag === "primitive") {
      // Boxing. `Character c = 65;` narrows the constant to char first.
      const target = unboxed(to);
      const primitiveName = target && target.tag === "primitive" ? target.name : from.name;
      return `$r.b${LETTER[primitiveName]}(${this.primitiveConversion(code, from.name, primitiveName)})`;
    }
    if (to.tag === "primitive") {
      const source = unboxed(from);
      if (!source || source.tag !== "primitive") return this.primitiveConversion(`$r.ubx(${code})`, to.name, to.name);
      return this.primitiveConversion(`$r.ub(${code})`, source.name, to.name);
    }
    return code;
  }

  private primitiveConversion(code: string, from: PrimitiveName, to: PrimitiveName): string {
    if (from === to) return code;
    const integral = (name: PrimitiveName) => name === "int" || name === "char" || name === "short" || name === "byte";
    const toInt = () => {
      if (integral(from)) return code;
      if (from === "long") return `Number(BigInt.asIntN(32, ${code}))`;
      return `$r.d2i(${code})`;
    };
    switch (to) {
      case "double": return from === "long" ? `Number(${code})` : code;
      case "float":
        if (from === "long") return `Math.fround(Number(${code}))`;
        if (from === "char" || from === "short" || from === "byte") return code;
        return `Math.fround(${code})`;
      case "long":
        if (integral(from)) return `BigInt(${code})`;
        return `$r.d2l(${code})`;
      case "int": return toInt();
      case "char": return `(${toInt()} & 65535)`;
      case "short": return from === "byte" ? code : `(${toInt()} << 16 >> 16)`;
      case "byte": return `(${toInt()} << 24 >> 24)`;
      case "boolean": return code;
    }
  }

  // ---- expressions ---------------------------------------------------------------------------------
  /** `discard`: the value is not used (an expression statement), so x++ need not keep the old value. */
  expression(expression: Ast.Expression, discard = false): string {
    if (expression.constant !== undefined && expression.type && (expression.type.tag === "primitive" || isString(expression.type))) {
      return literal(expression.constant, expression.type);
    }
    switch (expression.kind) {
      case "Literal": return expression.literalType === "null" ? "null" : literal(expression.value as Constant, expression.type);
      case "Name": return this.name(expression);
      case "FieldAccess": return this.fieldAccess(expression);
      case "ArrayAccess":
        return `$r.aget(${this.expression(expression.array)}, ${this.converted(expression.index, INT)})`;
      case "Call": return this.call(expression);
      case "New": return this.newObject(expression);
      case "NewArray": return this.newArray(expression);
      case "ArrayInit": return this.arrayInitializer(expression, expression.type!);
      case "Unary": return this.unary(expression, discard);
      case "Postfix": return this.increment(expression.operand, expression.operator, true, discard);
      case "Binary": return this.binary(expression);
      case "Assign": return this.assignment(expression);
      case "Conditional":
        return `(${this.condition(expression.condition)} ? ${this.converted(expression.whenTrue, expression.type!)} : ${this.converted(expression.whenFalse, expression.type!)})`;
      case "Cast": return this.cast(expression);
      case "InstanceOf": return this.instanceOf(expression);
      case "This": return "this";
      case "SwitchExpr": return this.switchExpression(expression);
      case "Unsupported": return `$r.unsupported(${JSON.stringify(expression.feature)})`;
    }
  }

  private staticFieldReference(field: FieldInfo): string {
    if (!field.owner.isUser) return field.jsName.replace(/^\$rt\./, "$r.");
    if (this.currentDependencies && field.owner !== this.context.classInfo) this.currentDependencies.add(field.owner);
    return `${field.owner.jsName}.${field.jsName}`;
  }

  private name(expression: Ast.NameExpression): string {
    const resolution = expression.resolution;
    if (!resolution) return "undefined";
    if (resolution.to === "local") return resolution.variable.jsName;
    if (resolution.to === "field") {
      const field = resolution.field;
      if (field.constant !== undefined) return literal(field.constant, field.type);
      return field.isStatic ? this.staticFieldReference(field) : `this.${field.jsName}`;
    }
    return "undefined";
  }

  private fieldAccess(expression: Ast.FieldAccess): string {
    const resolution = expression.resolution;
    if (!resolution) return "undefined";
    if (resolution.to === "length") {
      return `$r.nn(${this.expression(expression.target)}, ${this.nullMessage("Cannot read the array length", expression.target)}).length`;
    }
    if (resolution.to !== "field") return "undefined";
    const field = resolution.field;
    if (field.isStatic) {
      const reference = field.constant !== undefined ? literal(field.constant, field.type) : this.staticFieldReference(field);
      // `obj.STATIC_FIELD` still evaluates obj.
      if (this.isValueTarget(expression.target) && expression.target.kind !== "This") return `(${this.expression(expression.target)}, ${reference})`;
      return reference;
    }
    const target = expression.target;
    if (target.kind === "This" || (target.kind === "Name" && target.name === "super")) return `this.${field.jsName}`;
    return `$r.nn(${this.expression(target)}, ${this.nullMessage(`Cannot read field "${field.name}"`, target)}).${field.jsName}`;
  }

  private isValueTarget(target: Ast.Expression): boolean {
    if (target.kind === "Name") return target.resolution?.to === "local" || target.resolution?.to === "field";
    if (target.kind === "FieldAccess") return target.resolution?.to === "field" || target.resolution?.to === "length";
    return true;
  }

  /** "Cannot invoke ..." + because "name" is null - what Java's helpful NullPointerException says. */
  private nullMessage(action: string, target: Ast.Expression): string {
    const description = this.describe(target);
    return JSON.stringify(description ? `${action} because ${description} is null` : action);
  }

  private describe(target: Ast.Expression): string | null {
    switch (target.kind) {
      case "Name":
        if (target.resolution?.to === "local") return `"${target.name}"`;
        if (target.resolution?.to === "field") {
          const field = target.resolution.field;
          return field.isStatic ? `"${binaryName(field.owner)}.${field.name}"` : `"this.${field.name}"`;
        }
        return null;
      case "FieldAccess": {
        const inner = this.describe(target.target);
        if (target.target.kind === "This") return `"this.${target.name}"`;
        if (target.resolution?.to === "field" && target.resolution.field.isStatic) return `"${binaryName(target.resolution.field.owner)}.${target.name}"`;
        return inner ? `"${inner.slice(1, -1)}.${target.name}"` : null;
      }
      case "ArrayAccess": {
        const inner = this.describe(target.array);
        return inner ? `"${inner.slice(1, -1)}[...]"` : null;
      }
      case "Call": {
        const method = target.method;
        if (!method) return null;
        return `the return value of "${this.methodDescription(method)}"`;
      }
      default: return null;
    }
  }

  private methodDescription(method: MethodInfo): string {
    const owner = method.owner.isUser ? binaryName(method.owner) : method.owner.packageName === "java.lang" ? method.owner.name : method.owner.qualifiedName;
    return `${owner}.${method.name}(${method.parameters.map((parameter) => typeName(parameter)).join(", ")})`;
  }

  // ---- calls --------------------------------------------------------------------------------------
  private arguments(args: Ast.Expression[], method: MethodInfo, varargsCall: boolean, parameterTypes?: JavaType[]): string {
    const parameters = parameterTypes ?? method.parameters;
    if (!varargsCall) return args.map((argument, index) => this.converted(argument, parameters[index] ?? argument.type!)).join(", ");
    const fixed = parameters.length - 1;
    const arrayType = parameters[fixed];
    const elementType = arrayType.tag === "array" ? arrayType.element : arrayType;
    const leading = args.slice(0, fixed).map((argument, index) => this.converted(argument, parameters[index]));
    const packed = args.slice(fixed).map((argument) => this.converted(argument, elementType));
    return [...leading, `$r.arr(${JSON.stringify(arrayDescriptor(arrayType))}, [${packed.join(", ")}])`].join(", ");
  }

  private waitFor(method: MethodInfo, code: string): string {
    return this.isBlocking(method) ? `(yield* ${code})` : code;
  }

  private call(call: Ast.MethodCall): string {
    const method = call.method;
    if (!method) return "undefined";
    const parameterTypes = (call as Ast.MethodCall & { parameterTypes?: JavaType[] }).parameterTypes;
    const args = this.arguments(call.args, method, call.varargsCall ?? false, parameterTypes);
    if (method.runtime === "Array_clone") {
      return `$r.aclone($r.nn(${this.expression(call.target!)}, ${this.nullMessage(`Cannot invoke "Object.clone()"`, call.target!)}))`;
    }
    // Library code.
    if (!method.owner.isUser) {
      if (call.superCall) {
        const name = this.libraryMethodJsName(method);
        return this.waitFor(method, `super.${name}(${args})`);
      }
      const runtime = `$r.${method.runtime}`;
      if (method.isStatic) {
        const evaluateTarget = call.target && !call.staticTarget && this.isValueTarget(call.target) ? `${this.expression(call.target)}, ` : "";
        const invocation = this.waitFor(method, `${runtime}(${args})`);
        return evaluateTarget ? `(${evaluateTarget}${invocation})` : invocation;
      }
      const receiver = this.receiver(call, method);
      return this.waitFor(method, `${runtime}(${receiver}${args ? ", " + args : ""})`);
    }
    // The student's own methods.
    if (method.isStatic) {
      if (this.currentDependencies && method.owner !== this.context.classInfo) this.currentDependencies.add(method.owner);
      const invocation = this.waitFor(method, `${method.owner.jsName}.${method.jsName}(${args})`);
      if (call.target && !call.staticTarget && this.isValueTarget(call.target)) return `(${this.expression(call.target)}, ${invocation})`;
      return invocation;
    }
    if (call.superCall) return this.waitFor(method, `super.${method.jsName}(${args})`);
    const receiver = this.receiver(call, method);
    return this.waitFor(method, `${receiver}.${method.jsName}(${args})`);
  }

  /** The object a method is called on, null-checked unless it cannot be null. */
  private receiver(call: Ast.MethodCall, method: MethodInfo): string {
    const target = call.target;
    if (!target || target.kind === "This") return "this";
    const code = this.expression(target);
    if (this.neverNull(target)) return code;
    const description = method.owner.isUser ? binaryName(method.owner)
      : method.owner.packageName === "java.lang" ? method.owner.name : method.owner.qualifiedName;
    const signature = `${description}.${method.name}(${method.parameters.map((parameter) => typeName(parameter)).join(", ")})`;
    return `$r.nn(${code}, ${this.nullMessage(`Cannot invoke "${signature}"`, target)})`;
  }

  private neverNull(expression: Ast.Expression): boolean {
    if (expression.constant !== undefined) return true;
    if (expression.kind === "New" || expression.kind === "This" || expression.kind === "NewArray") return true;
    if (expression.kind === "Binary" && expression.type && isString(expression.type)) return true;
    if (expression.kind === "FieldAccess" && expression.resolution?.to === "field" && !expression.resolution.field.owner.isUser
        && expression.resolution.field.isStatic) return true;   // System.out
    return false;
  }

  /** The JS method a library class carries for a Java method: what `super.x()` calls. */
  private libraryMethodJsName(method: MethodInfo): string {
    if (method.name === "toString" && !method.parameters.length) return "toString";
    if (method.name === "hashCode" && !method.parameters.length) return "hashCode";
    if (method.name === "equals" && method.parameters.length === 1) return "equals";
    return `m_${method.name}${method.parameters.length ? "$" + method.parameters.map(erasedDescriptor).join("$") : ""}`;
  }

  private newObject(expression: Ast.NewObject): string {
    const constructor = expression.constructorInfo;
    const type = expression.type;
    if (!constructor || !type || type.tag !== "class") return "undefined";
    const info = type.classInfo;
    const parameterTypes = (expression as Ast.NewObject & { parameterTypes?: JavaType[] }).parameterTypes;
    const args = this.arguments(expression.args, constructor, expression.varargsCall ?? false, parameterTypes);
    if (!info.isUser && constructor.runtime) return `$r.${constructor.runtime}(${args})`;
    if (info.isUser && this.currentDependencies && info !== this.context.classInfo) this.currentDependencies.add(info);
    const jsClass = info.jsName.replace(/^\$rt\./, "$r.");
    return this.waitFor(constructor, `new ${jsClass}().${constructor.jsName}(${args})`);
  }

  private newArray(expression: Ast.NewArray): string {
    const type = expression.type!;
    if (expression.initializer) return this.arrayInitializer(expression.initializer, type);
    const sizes = expression.dimensionExpressions.map((size) => this.converted(size, INT));
    return `$r.newArr(${JSON.stringify(arrayDescriptor(type))}, [${sizes.join(", ")}])`;
  }

  private arrayInitializer(initializer: Ast.ArrayInitializer, type: JavaType): string {
    if (type.tag !== "array") return "null";
    const elementType = type.element;
    const elements = initializer.elements.map((element) =>
      element.kind === "ArrayInit" ? this.arrayInitializer(element, elementType) : this.converted(element, elementType));
    return `$r.arr(${JSON.stringify(arrayDescriptor(type))}, [${elements.join(", ")}])`;
  }

  // ---- operators -----------------------------------------------------------------------------------
  private unary(expression: Ast.Unary, discard: boolean): string {
    const operator = expression.operator;
    if (operator === "++" || operator === "--") return this.increment(expression.operand, operator, false, discard);
    if (operator === "!") return `(!${this.condition(expression.operand)})`;
    const type = expression.type!;
    const operand = this.converted(expression.operand, type);
    if (type.tag !== "primitive") return operand;
    if (operator === "+") return operand;
    if (operator === "~") return `(~${operand})`;
    switch (type.name) {
      case "int": return `(-${operand} | 0)`;
      case "long": return `BigInt.asIntN(64, -${operand})`;
      default: return `(-${operand})`;
    }
  }

  /** a op b, in the promoted type `type`, with Java's overflow and division rules. */
  private arithmetic(operator: string, left: string, right: string, type: JavaType): string {
    const name = type.tag === "primitive" ? type.name : "double";
    if (name === "int") {
      switch (operator) {
        case "+": return `(${left} + ${right} | 0)`;
        case "-": return `(${left} - ${right} | 0)`;
        case "*": return `Math.imul(${left}, ${right})`;
        case "/": return `$r.idiv(${left}, ${right})`;
        case "%": return `$r.imod(${left}, ${right})`;
        case "<<": return `(${left} << ${right})`;
        case ">>": return `(${left} >> ${right})`;
        case ">>>": return `(${left} >>> ${right} | 0)`;
        case "&": return `(${left} & ${right})`;
        case "|": return `(${left} | ${right})`;
        case "^": return `(${left} ^ ${right})`;
      }
    }
    if (name === "long") {
      switch (operator) {
        case "+": return `BigInt.asIntN(64, ${left} + ${right})`;
        case "-": return `BigInt.asIntN(64, ${left} - ${right})`;
        case "*": return `BigInt.asIntN(64, ${left} * ${right})`;
        case "/": return `$r.ldiv(${left}, ${right})`;
        case "%": return `$r.lmod(${left}, ${right})`;
        case "&": return `(${left} & ${right})`;
        case "|": return `(${left} | ${right})`;
        case "^": return `(${left} ^ ${right})`;
      }
    }
    if (name === "boolean") {
      switch (operator) {
        case "&": return `$r.band(${left}, ${right})`;
        case "|": return `$r.bor(${left}, ${right})`;
        case "^": return `(${left} !== ${right})`;
      }
    }
    const plain = `(${left} ${operator} ${right})`;
    return name === "float" ? `Math.fround${plain}` : plain;
  }

  /** Shifts take their distance as an int, masked the way Java masks it. */
  private shift(operator: string, left: string, rightCode: string, rightType: JavaType, type: JavaType): string {
    const distanceIsLong = primitiveOf(rightType)?.tag === "primitive" && (primitiveOf(rightType) as { name: string }).name === "long";
    if (type.tag === "primitive" && type.name === "long") {
      const distance = distanceIsLong ? `(${rightCode} & 63n)` : `BigInt(${rightCode} & 63)`;
      if (operator === "<<") return `BigInt.asIntN(64, ${left} << ${distance})`;
      if (operator === ">>") return `(${left} >> ${distance})`;
      return `BigInt.asIntN(64, BigInt.asUintN(64, ${left}) >> ${distance})`;
    }
    const distance = distanceIsLong ? `Number(${rightCode} & 31n)` : rightCode;
    return this.arithmetic(operator, left, distance, type);
  }

  private binary(expression: Ast.Binary): string {
    const operator = expression.operator;
    if (operator === "&&" || operator === "||") return `(${this.condition(expression.left)} ${operator} ${this.condition(expression.right)})`;
    if (operator === "+" && expression.type && isString(expression.type)) return this.concatenation(expression);
    const operandType = expression.operandType!;
    if (operator === "<<" || operator === ">>" || operator === ">>>") {
      const rightType = expression.right.type!;
      const right = this.coerce(this.expression(expression.right), rightType, primitiveOf(rightType) ?? rightType);
      return this.shift(operator, this.converted(expression.left, operandType), right, rightType, operandType);
    }
    if (operator === "==" || operator === "!=") {
      const javascriptOperator = operator === "==" ? "===" : "!==";
      if (operandType.tag === "primitive") {
        return `(${this.converted(expression.left, operandType)} ${javascriptOperator} ${this.converted(expression.right, operandType)})`;
      }
      return `(${this.expression(expression.left)} ${javascriptOperator} ${this.expression(expression.right)})`;
    }
    const left = this.converted(expression.left, operandType);
    const right = this.converted(expression.right, operandType);
    if (["<", ">", "<=", ">="].includes(operator)) return `(${left} ${operator} ${right})`;
    return this.arithmetic(operator, left, right, operandType);
  }

  /** How a value reads when joined onto a String, by its static type. */
  private stringPiece(code: string, type: JavaType): string {
    if (isString(type)) return code;
    if (type.tag === "primitive") {
      switch (type.name) {
        case "char": return `String.fromCharCode(${code})`;
        case "double": return `$r.ds(${code})`;
        case "float": return `$r.fs(${code})`;
        default: return `String(${code})`;
      }
    }
    if (type.tag === "null") return `"null"`;
    return `$r.str(${code})`;
  }

  private concatenation(expression: Ast.Binary): string {
    // Flatten the left spine: "a" + b + c + d is one join.
    const operands: Ast.Expression[] = [];
    let walker: Ast.Expression = expression;
    while (walker.kind === "Binary" && walker.operator === "+" && walker.type && isString(walker.type) && walker.constant === undefined) {
      operands.unshift(walker.right);
      walker = walker.left;
    }
    operands.unshift(walker);
    const pieces = operands.map((operand) => {
      if (operand.constant !== undefined && operand.type && (operand.type.tag === "primitive" || isString(operand.type))) {
        return literal(this.constantText(operand.constant, operand.type), undefined);
      }
      return this.stringPiece(this.expression(operand), operand.type!);
    });
    // "" first: two null Strings must join as "nullnull", not add up to 0.
    const first = operands[0];
    const startsWithText = first.constant !== undefined && first.type && isString(first.type);
    return `$r.S(${startsWithText ? "" : '"" + '}${pieces.join(" + ")})`;
  }

  private constantText(value: Constant, type: JavaType): string {
    if (isString(type)) return value as string;
    if (type.tag === "primitive") {
      if (type.name === "char") return String.fromCharCode(value as number);
      if (type.name === "double") return this.doubleText(value as number);
      if (type.name === "float") return this.floatText(value as number);
    }
    return String(value);
  }
  private doubleText(value: number): string { return formatDouble(value); }
  private floatText(value: number): string { return formatFloat(value); }

  /** A place a value can be stored: read it, and write a new value to it, evaluating its parts once. */
  private place(target: Ast.Expression): { setup: string[]; read: string; write: (value: string) => string } {
    if (target.kind === "Name" && target.resolution?.to === "local") {
      const name = target.resolution.variable.jsName;
      return { setup: [], read: name, write: (value) => `${name} = ${value}` };
    }
    if (target.kind === "Name" && target.resolution?.to === "field") {
      const field = target.resolution.field;
      const reference = field.isStatic ? this.staticFieldReference(field) : `this.${field.jsName}`;
      return { setup: [], read: reference, write: (value) => `${reference} = ${value}` };
    }
    if (target.kind === "FieldAccess" && target.resolution?.to === "field") {
      const field = target.resolution.field;
      if (field.isStatic) {
        const reference = this.staticFieldReference(field);
        const setup = this.isValueTarget(target.target) && target.target.kind !== "This" ? [this.expression(target.target)] : [];
        return { setup, read: reference, write: (value) => `${reference} = ${value}` };
      }
      if (target.target.kind === "This") {
        const reference = `this.${field.jsName}`;
        return { setup: [], read: reference, write: (value) => `${reference} = ${value}` };
      }
      const holder = this.temp();
      const setup = [`${holder} = $r.nn(${this.expression(target.target)}, ${this.nullMessage(`Cannot assign field "${field.name}"`, target.target)})`];
      return { setup, read: `${holder}.${field.jsName}`, write: (value) => `${holder}.${field.jsName} = ${value}` };
    }
    if (target.kind === "ArrayAccess") {
      const array = this.temp(), index = this.temp();
      const setup = [`${array} = ${this.expression(target.array)}`, `${index} = ${this.converted(target.index, INT)}`];
      return { setup, read: `$r.aget(${array}, ${index})`, write: (value) => `$r.ast(${array}, ${index}, ${value})` };
    }
    return { setup: [], read: "undefined", write: (value) => value };
  }

  private sequence(parts: string[]): string {
    return parts.length === 1 ? parts[0] : `(${parts.join(", ")})`;
  }

  private assignment(expression: Ast.Assignment): string {
    const target = expression.target;
    const targetType = target.type!;
    if (expression.operator === "=") {
      // Simple targets need no temporaries.
      if (target.kind === "ArrayAccess") {
        const array = this.expression(target.array);
        const index = this.converted(target.index, INT);
        return `$r.ast(${array}, ${index}, ${this.converted(expression.value, targetType)})`;
      }
      if (target.kind === "FieldAccess" && target.resolution?.to === "field" && !target.resolution.field.isStatic && target.target.kind !== "This") {
        const field = target.resolution.field;
        return `($r.nn(${this.expression(target.target)}, ${this.nullMessage(`Cannot assign field "${field.name}"`, target.target)}).${field.jsName} = ${this.converted(expression.value, targetType)})`;
      }
      const place = this.place(target);
      return this.sequence([...place.setup, `(${place.write(this.converted(expression.value, targetType))})`]);
    }
    const operator = expression.operator.slice(0, -1);
    const place = this.place(target);
    let combined: string;
    if (operator === "+" && isString(targetType)) {
      const value = expression.value;
      const piece = value.constant !== undefined && value.type && (value.type.tag === "primitive" || isString(value.type))
        ? literal(this.constantText(value.constant, value.type), undefined)
        : this.stringPiece(this.expression(value), value.type!);
      combined = `$r.S("" + ${this.stringPiece(place.read, targetType)} + ${piece})`;
    } else {
      const operandType = expression.operandType!;
      const current = this.coerce(place.read, targetType, operandType);
      if (operator === "<<" || operator === ">>" || operator === ">>>") {
        const valueType = expression.value.type!;
        const distance = this.coerce(this.expression(expression.value), valueType, primitiveOf(valueType) ?? valueType);
        combined = this.coerce(this.shift(operator, current, distance, valueType, operandType), operandType, targetType);
      } else {
        const value = this.converted(expression.value, operandType);
        combined = this.coerce(this.arithmetic(operator, current, value, operandType), operandType, targetType);
      }
    }
    return this.sequence([...place.setup, `(${place.write(combined)})`]);
  }

  private increment(operand: Ast.Expression, operator: "++" | "--", postfix: boolean, discard: boolean): string {
    const type = operand.type!;
    const plain = primitiveOf(type)!;
    const place = this.place(operand);
    const one = plain.tag === "primitive" && plain.name === "long" ? "1n" : "1";
    const promoted = plain.tag === "primitive" && (plain.name === "long" || plain.name === "double" || plain.name === "float") ? plain : INT;
    const next = (current: string) =>
      this.coerce(this.arithmetic(operator === "++" ? "+" : "-", this.coerce(current, type, promoted), one, promoted), promoted, type);
    if (!postfix || discard) return this.sequence([...place.setup, `(${place.write(next(place.read))})`]);
    const old = this.temp();
    return `(${[...place.setup, `${old} = ${place.read}`, place.write(next(old)), old].join(", ")})`;
  }

  private cast(expression: Ast.Cast): string {
    const target = expression.type!;
    const operandType = expression.operand.type!;
    const operand = this.expression(expression.operand);
    if (target.tag === "primitive") {
      if (operandType.tag === "primitive") return this.primitiveConversion(operand, operandType.name, target.name);
      const box = unboxed(operandType);
      if (box) return this.coerce(operand, operandType, target);
      // (int) someObject: check it is an Integer, then unbox.
      const boxType = this.lib.lookup("java.lang." + { int: "Integer", long: "Long", double: "Double", float: "Float", boolean: "Boolean", char: "Character", byte: "Byte", short: "Short" }[target.name])!;
      return this.coerce(this.checkedCast(operand, classType(boxType)), classType(boxType), target);
    }
    if (operandType.tag === "primitive") return this.coerce(operand, operandType, target);
    if (operandType.tag === "null" || isSubtype(operandType, target)) return operand;
    return this.checkedCast(operand, target);
  }

  private checkedCast(operand: string, target: JavaType): string {
    const value = this.temp();
    return `(${value} = ${operand}, ${value} === null || ${this.instanceTest(value, target)} ? ${value} : $r.cce(${value}, ${JSON.stringify(this.runtimeClassName(target))}))`;
  }

  private runtimeClassName(type: JavaType): string {
    if (type.tag === "class") return binaryName(type.classInfo);
    if (type.tag === "array") return arrayDescriptor(type);
    return typeName(type);
  }

  /** A JS test that `value` (a variable, not null) is an instance of `type`. */
  private instanceTest(value: string, type: JavaType): string {
    if (type.tag === "array") return `$r.isArr(${value}, ${JSON.stringify(arrayDescriptor(type))})`;
    if (type.tag !== "class") return "true";
    const info = type.classInfo;
    if (info.isUser) {
      return info.kind === "interface" ? `$r.io(${value}, ${info.jsName})` : `${value} instanceof ${info.jsName}`;
    }
    return `$r.is(${value}, ${JSON.stringify(info.qualifiedName)})`;
  }

  private instanceOf(expression: Ast.InstanceOf): string {
    const variable = (expression as Ast.InstanceOf & { variable?: LocalVariable }).variable;
    const target = expression.typeNode.resolved!;
    const value = this.temp();
    const test = `(${value} = ${this.expression(expression.operand)}) !== null && ${this.instanceTest(value, target)}`;
    return variable ? `(${test} && ((${variable.jsName} = ${value}), true))` : `(${test})`;
  }

  private switchExpression(expression: Ast.SwitchExpression): string {
    const resultType = expression.type!;
    const lines = [`switch (${this.switchSelector(expression.selector)}) {`];
    const arrow = expression.cases.some((switchCase) => switchCase.arrow);
    for (const switchCase of expression.cases) {
      lines.push(...this.indent(this.caseLabels(switchCase)));
      if (arrow && switchCase.arrowExpression) {
        lines.push(`    return ${this.converted(switchCase.arrowExpression, resultType)};`);
      } else if (arrow) {
        const armBody = switchCase.body.flatMap((inner) => inner.kind === "Block" ? this.blockLines(inner) : this.statement(inner));
        lines.push(`    {`, ...this.indent(this.indent(this.indent(armBody))), `    }`);
      } else {
        for (const inner of switchCase.body) lines.push(...this.indent(this.indent(this.statement(inner))));
      }
    }
    lines.push(`}`);
    const body = lines.join("\n");
    if (body.includes("yield*")) return `(yield* (function* () {\n${body}\n}).call(this))`;
    return `(() => {\n${body}\n})()`;
  }
}

// Constant strings fold at compile time, so the compiler needs Java's number formatting too.
import { javaDoubleToString as formatDouble, javaFloatToString as formatFloat } from "./format";
void callParenPosition;
void sameType;
