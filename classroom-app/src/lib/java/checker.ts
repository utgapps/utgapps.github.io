/* The checker: javac's "attribute" phase. It finds what every name means,
   works out the type of every expression, picks the overload every call
   reaches, and folds compile-time constants - writing all of it onto the AST
   for the code generator - and reports what javac would report, in javac's
   words, at javac's caret.

   Flow questions (is this variable assigned yet? can this line ever run? is
   that exception caught?) are flow.ts's job, as they are javac's Flow's.
*/
import type * as Ast from "./ast";
import {
  type ClassInfo, type FieldInfo, type JavaType, type LocalVariable, type MethodInfo, type Substitution,
  INT, LONG, DOUBLE, FLOAT, BOOLEAN, CHAR, VOID, NULL_TYPE, ERROR_TYPE, OBJECT_PLACEHOLDER,
  arrayOf, classType, primitive, isPrimitive, isReference, isString, sameType, typeName, substitute,
  substitutionOf, asSuper, isSubclass, isSubtype, wideningPrimitive, binaryNumericPromotion,
  unaryNumericPromotion, assignmentConversion, boxedType, castAllowed, erasedDescriptor, unboxed,
  primitiveOf, isNumericPrimitive, isIntegralPrimitive, PRIMITIVE_NAMES, type PrimitiveName, directSupertypes,
} from "./types";
import { library, KNOWN_ANNOTATIONS, AUTO_IMPORTED_PACKAGE } from "./library";
import { javaDoubleToString, javaFloatToString } from "./format";

export type Diagnostic = {
  file: string;
  line: number;
  column: number;
  message: string;
  details: string[];
  code: string;
  /** Correct Java the classroom runner cannot run yet - not the student's mistake. */
  unsupported?: boolean;
};

export type SourceFile = { name: string; source: string; unit: Ast.CompilationUnit };

export type CheckResult = { classes: ClassInfo[]; diagnostics: Diagnostic[] };

export function check(files: SourceFile[]): CheckResult {
  const checker = new Checker(files);
  checker.run();
  return { classes: checker.userClasses, diagnostics: checker.diagnostics };
}

// ---- small helpers ------------------------------------------------------------
type Constant = string | number | boolean | bigint;

export function callParenPosition(call: Ast.MethodCall): Ast.Position {
  return { line: call.namePosition.line, column: call.namePosition.column + call.name.length, offset: call.namePosition.offset + call.name.length };
}

/** Where javac puts the caret for a problem with this expression's value. */
export function preferredPosition(expression: Ast.Expression): Ast.Position {
  switch (expression.kind) {
    case "Binary": case "Assign": case "InstanceOf": return expression.operatorPosition;
    case "Call": return callParenPosition(expression);
    case "FieldAccess": return expression.dotPosition;
    default: return expression.position;
  }
}

function describeKind(info: ClassInfo): string {
  return `${info.kind === "interface" ? "interface" : "class"} ${info.isUser ? info.qualifiedName : info.name}`;
}
function simpleClassName(info: ClassInfo): string { return info.isUser ? info.qualifiedName : info.name; }
function argumentTypesText(types: JavaType[]): string { return types.length ? types.map(typeName).join(",") : "no arguments"; }
function parameterText(method: MethodInfo, parameters = method.parameters): string {
  return parameters.map((parameter, index) =>
    method.varargs && index === parameters.length - 1 && parameter.tag === "array" ? typeName(parameter.element) + "..." : typeName(parameter)).join(",");
}
export function methodSignatureText(method: MethodInfo): string {
  const name = method.isConstructor ? method.owner.name : method.name;
  return `${name}(${parameterText(method)})`;
}
function toInt32(value: number): number { return value | 0; }
export function doubleToInt(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value >= 2147483647) return 2147483647;
  if (value <= -2147483648) return -2147483648;
  return Math.trunc(value) | 0;
}
export function doubleToLong(value: number): bigint {
  if (Number.isNaN(value)) return 0n;
  if (value >= 9223372036854775807) return 9223372036854775807n;
  if (value <= -9223372036854775808) return -9223372036854775808n;
  return BigInt(Math.trunc(value));
}

/** A constant converted the way a cast (or an assignment) converts it. */
export function convertConstant(value: Constant, from: JavaType, to: JavaType): Constant | undefined {
  if (to.tag === "class" && isString(to)) return typeof value === "string" ? value : undefined;
  if (to.tag !== "primitive" || from.tag !== "primitive") return undefined;
  if (to.name === "boolean" || from.name === "boolean") return from.name === to.name ? value : undefined;
  const asNumber = typeof value === "bigint" ? Number(value) : (value as number);
  const asLong = typeof value === "bigint" ? value
    : from.name === "double" || from.name === "float" ? doubleToLong(value as number) : BigInt(value as number);
  const asInt = typeof value === "bigint" ? Number(BigInt.asIntN(32, value))
    : from.name === "double" || from.name === "float" ? doubleToInt(value as number) : (value as number);
  switch (to.name) {
    case "long": return asLong;
    case "double": return asNumber;
    case "float": return Math.fround(asNumber);
    case "int": return asInt;
    case "char": return asInt & 0xffff;
    case "short": return (asInt << 16) >> 16;
    case "byte": return (asInt << 24) >> 24;
  }
}

/** How a constant reads when it is joined onto a string. */
export function constantToText(value: Constant, type: JavaType): string {
  if (type.tag === "primitive") {
    if (type.name === "char") return String.fromCharCode(value as number);
    if (type.name === "double") return javaDoubleToString(value as number);
    if (type.name === "float") return javaFloatToString(value as number);
  }
  return String(value);
}

function isConstantType(type: JavaType): boolean {
  return type.tag === "primitive" || isString(type);
}

// ---- the checker ------------------------------------------------------------------
type FileContext = {
  name: string;
  unit: Ast.CompilationUnit;
  singleImports: Map<string, ClassInfo>;
  starImports: string[];
  staticImports: { classInfo: ClassInfo; member: string | null }[];
};

type Jump = { kind: "loop" | "switch" | "label" | "switchExpression"; label?: string };

type SwitchExpressionContext = { results: { expression: Ast.Expression; yieldStatement?: Ast.YieldStatement }[] };

type BodyContext = {
  classInfo: ClassInfo;
  isStatic: boolean;
  method: MethodInfo | null;
  returnType: JavaType | null;     // null: `return` is not allowed here (an initializer)
  description: string;             // "method main(String[])" - for "already defined in ..."
  scopes: Map<string, LocalVariable>[];
  usedJsNames: Set<string>;
  jumps: Jump[];
  callees: Set<MethodInfo>;
  switchExpressions: SwitchExpressionContext[];
  isConstructor: boolean;
};

type Qualifier =
  | { kind: "value"; type: JavaType }
  | { kind: "class"; classInfo: ClassInfo }
  | { kind: "package"; name: string };

type Candidate = { method: MethodInfo; substitution: Substitution };
type Selection = { method: MethodInfo; substitution: Substitution; varargsCall: boolean; parameters: JavaType[] };

let nextVariableId = 1;

class Checker {
  diagnostics: Diagnostic[] = [];
  userClasses: ClassInfo[] = [];
  private lib = library();
  private topLevel = new Map<string, ClassInfo>();
  private memberClasses = new Map<ClassInfo, Map<string, ClassInfo>>();
  private fileOf = new Map<ClassInfo, FileContext>();
  private files: FileContext[] = [];
  private file!: FileContext;
  private currentClass: ClassInfo | null = null;
  private body: BodyContext | null = null;
  private brokenClasses = new Set<ClassInfo>();
  private checkedInitializers = new Set<FieldInfo>();
  private initializersInProgress = new Set<FieldInfo>();
  private methodTypeVariables: Set<string> | null = null;

  constructor(private sources: SourceFile[]) {}

  // ---- diagnostics ----------------------------------------------------------
  private report(at: Ast.Position, message: string, code: string, details: string[] = [], unsupported = false) {
    if (this.diagnostics.some((existing) => existing.file === this.file.name && existing.line === at.line
        && existing.column === at.column && existing.message === message)) return;
    this.diagnostics.push({ file: this.file.name, line: at.line, column: at.column, message, details, code, unsupported });
  }
  private unsupported(at: Ast.Position, feature: string) {
    this.report(at, feature, "unsupported", [], true);
  }

  run() {
    for (const source of this.sources) {
      const context: FileContext = { name: source.name, unit: source.unit, singleImports: new Map(), starImports: [], staticImports: [] };
      this.files.push(context);
      this.file = context;
      for (const declaration of source.unit.types) this.enterClass(declaration, context, undefined);
    }
    for (const context of this.files) { this.file = context; this.resolveImports(context); }
    for (const info of this.userClasses) this.withClass(info, () => this.resolveHeader(info));
    for (const info of this.userClasses) this.withClass(info, () => this.checkCycles(info));
    for (const info of this.userClasses) this.markThrowable(info);
    for (const info of this.userClasses) this.withClass(info, () => this.enterMembers(info));
    for (const info of this.userClasses) this.withClass(info, () => this.checkClassRules(info));
    for (const info of this.userClasses) this.withClass(info, () => this.attributeClass(info));
  }

  private withClass(info: ClassInfo, action: () => void) {
    const savedFile = this.file, savedClass = this.currentClass;
    this.file = this.fileOf.get(info)!;
    this.currentClass = info;
    try { action(); } finally { this.file = savedFile; this.currentClass = savedClass; }
  }

  // ---- entering classes -------------------------------------------------------
  private enterClass(declaration: Ast.ClassDeclaration, file: FileContext, outer: ClassInfo | undefined) {
    const qualifiedName = outer ? `${outer.qualifiedName}.${declaration.name}` : declaration.name;
    const names = declaration.modifiers.names;
    const isInterface = declaration.declarationKind === "interface";
    const info: ClassInfo = {
      name: declaration.name, qualifiedName, packageName: "",
      kind: isInterface ? "interface" : "class",
      isAbstract: names.has("abstract") || isInterface, isFinal: names.has("final"),
      typeParameters: [], superclass: null, interfaces: [], fields: new Map(), methods: [], constructors: [],
      isUser: true, declaration, outer,
      isStaticNested: !!outer && (names.has("static") || isInterface || outer.kind === "interface"),
      isInner: !!outer && !names.has("static") && !isInterface && outer.kind !== "interface",
      jsName: "J_" + qualifiedName.replace(/\./g, "$"),
    };
    declaration.info = info;
    this.fileOf.set(info, file);
    this.memberClasses.set(info, new Map());
    if (outer) {
      const siblings = this.memberClasses.get(outer)!;
      if (siblings.has(declaration.name) || this.enclosingNames(outer).includes(declaration.name)) {
        this.report(declaration.position, `class ${declaration.name} is already defined in ${describeKind(outer)}`, "duplicate-class");
        this.brokenClasses.add(info);
      }
      siblings.set(declaration.name, info);
    } else {
      if (this.topLevel.has(declaration.name)) {
        this.report(declaration.position, `duplicate class: ${declaration.name}`, "duplicate-class");
        this.brokenClasses.add(info);
      } else this.topLevel.set(declaration.name, info);
      const baseName = file.name.replace(/^.*\//, "").replace(/\.java$/, "");
      if (names.has("public") && declaration.name !== baseName) {
        this.report(declaration.position, `class ${declaration.name} is public, should be declared in a file named ${declaration.name}.java`, "public-class-file");
      }
    }
    this.userClasses.push(info);
    if (declaration.declarationKind === "enum") {
      this.unsupported(declaration.position, "enums (enum " + declaration.name + ")");
      info.kind = "enum";
      this.brokenClasses.add(info);
    } else if (declaration.declarationKind === "record") {
      this.unsupported(declaration.position, "records (record " + declaration.name + ")");
      this.brokenClasses.add(info);
    } else if (declaration.typeParameters.length) {
      this.unsupported(declaration.namePosition, `generic classes you write yourself (class ${declaration.name}<${declaration.typeParameters.join(", ")}>)`);
      this.brokenClasses.add(info);
    }
    for (const member of declaration.members) {
      if (member.kind === "Class") this.enterClass(member, file, info);
    }
  }

  private enclosingNames(info: ClassInfo | undefined): string[] {
    const names: string[] = [];
    for (let walker = info; walker; walker = walker.outer) names.push(walker.name);
    return names;
  }

  private resolveImports(context: FileContext) {
    for (const declaration of context.unit.imports) {
      if (declaration.isStatic) {
        const className = declaration.star ? declaration.name : declaration.name.slice(0, declaration.name.lastIndexOf("."));
        const member = declaration.star ? null : declaration.name.slice(declaration.name.lastIndexOf(".") + 1);
        const info = this.lib.lookup(className) ?? this.topLevel.get(className);
        if (!info) { this.reportMissingImport(declaration.position, className); continue; }
        if (info.unsupported) { this.unsupported(declaration.position, info.unsupported); continue; }
        context.staticImports.push({ classInfo: info, member });
        continue;
      }
      if (declaration.star) {
        if (!this.lib.packages.has(declaration.name) && !this.lib.lookup(declaration.name)) {
          this.report(declaration.position, `package ${declaration.name} does not exist`, "package-missing");
        } else context.starImports.push(declaration.name);
        continue;
      }
      const info = this.lib.lookup(declaration.name) ?? (declaration.name.includes(".") ? undefined : this.topLevel.get(declaration.name));
      if (!info) { this.reportMissingImport(declaration.position, declaration.name); continue; }
      const simple = declaration.name.slice(declaration.name.lastIndexOf(".") + 1);
      const clash = this.topLevel.get(simple);
      if (clash && clash !== info && this.fileOf.get(clash) === context) {
        this.report(declaration.position, `${simple} is already defined in this compilation unit`, "import-clash");
      }
      context.singleImports.set(simple, info);
    }
  }

  private reportMissingImport(at: Ast.Position, qualifiedName: string) {
    const packageName = qualifiedName.slice(0, qualifiedName.lastIndexOf("."));
    const simple = qualifiedName.slice(qualifiedName.lastIndexOf(".") + 1);
    if (this.lib.packages.has(packageName)) {
      this.report(at, "cannot find symbol", "cant-resolve-import", [`symbol:   class ${simple}`, `location: package ${packageName}`]);
    } else {
      this.report(at, `package ${packageName} does not exist`, "package-missing");
    }
  }

  // ---- class headers ------------------------------------------------------------
  private resolveHeader(info: ClassInfo) {
    const declaration = info.declaration!;
    const object = classType(this.lib.object);
    if (declaration.superclass && info.kind === "class") {
      const superType = this.resolveType(declaration.superclass);
      if (superType.tag === "class") {
        const superInfo = superType.classInfo;
        if (superInfo.kind === "interface") {
          this.report(declaration.superclass.position, "no interface expected here", "no-interface-expected");
        } else if (superInfo.isFinal) {
          this.report(declaration.superclass.position, `cannot inherit from final ${simpleClassName(superInfo)}`, "inherit-final");
        } else if (!superInfo.isUser && superInfo !== this.lib.object && !superInfo.isThrowable) {
          this.unsupported(declaration.superclass.position, `extending the ${superInfo.name} class`);
        } else info.superclass = superType;
      } else if (superType.tag !== "error") {
        this.report(declaration.superclass.position, "unexpected type", "unexpected-type", ["required: class", `found:    ${typeName(superType)}`]);
      }
    }
    if (info.kind !== "interface" && !info.superclass) info.superclass = object;
    for (const node of declaration.interfaces) {
      const interfaceType = this.resolveType(node);
      if (interfaceType.tag !== "class") continue;
      const interfaceInfo = interfaceType.classInfo;
      if (interfaceInfo.kind !== "interface") {
        this.report(node.position, "interface expected here", "interface-expected");
        continue;
      }
      if (!interfaceInfo.isUser && interfaceInfo.qualifiedName !== "java.lang.Comparable") {
        this.unsupported(node.position, `implementing the ${interfaceInfo.name} interface`);
        continue;
      }
      info.interfaces.push(interfaceType);
    }
  }

  private checkCycles(info: ClassInfo) {
    const seen = new Set<ClassInfo>();
    const visit = (walker: ClassInfo): boolean => {
      if (walker === info && seen.size) return true;
      if (seen.has(walker)) return false;
      seen.add(walker);
      const parents = [walker.superclass, ...walker.interfaces].filter((type): type is JavaType & { tag: "class" } => type?.tag === "class");
      return parents.some((parent) => parent.classInfo.isUser && visit(parent.classInfo));
    };
    if (visit(info)) {
      this.report(info.declaration!.position, `cyclic inheritance involving ${info.qualifiedName}`, "cyclic-inheritance");
      info.superclass = classType(this.lib.object);
      info.interfaces = [];
      this.brokenClasses.add(info);
    }
  }

  private markThrowable(info: ClassInfo) {
    let walker: ClassInfo | undefined = info;
    const seen = new Set<ClassInfo>();
    while (walker && !seen.has(walker)) {
      seen.add(walker);
      if (!walker.isUser && walker.isThrowable) {
        info.isThrowable = true;
        info.isChecked = walker.isChecked;
        return;
      }
      walker = walker.superclass?.tag === "class" ? walker.superclass.classInfo : undefined;
    }
  }

  // ---- members ------------------------------------------------------------------
  private enterMembers(info: ClassInfo) {
    if (this.brokenClasses.has(info)) return;     // its members would only produce errors about a class that can't run
    const declaration = info.declaration!;
    const isInterface = info.kind === "interface";
    const mangled = info.qualifiedName.replace(/\./g, "$");
    for (const member of declaration.members) {
      if (member.kind === "Field") {
        const names = member.modifiers.names;
        if (member.typeNode.name === "var" && !member.typeNode.dimensions) {
          this.report(member.typeNode.position, "'var' is not allowed here", "var-not-allowed");
          continue;
        }
        const baseType = this.resolveType(member.typeNode);
        member.fields = [];
        for (const declarator of member.declarators) {
          let type = baseType;
          for (let dimension = 0; dimension < declarator.dimensions; dimension++) type = arrayOf(type);
          if (info.fields.has(declarator.name)) {
            this.report(declarator.position, `variable ${declarator.name} is already defined in ${describeKind(info)}`, "already-defined");
            continue;
          }
          const isStatic = names.has("static") || isInterface;
          const field: FieldInfo = {
            name: declarator.name, type, isStatic, isFinal: names.has("final") || isInterface,
            isPrivate: names.has("private"), owner: info,
            jsName: isStatic ? `s_${declarator.name}` : `f_${mangled}_${declarator.name}`,
            declaration: declarator,
          };
          if (isInterface && !declarator.initializer) this.report(declarator.position, "= expected", "token-expected");
          info.fields.set(declarator.name, field);
          member.fields.push(field);
        }
      } else if (member.kind === "Method") {
        this.enterMethod(info, member);
      } else if (member.kind === "Constructor") {
        this.enterConstructor(info, member);
      } else if (member.kind === "Initializer" && isInterface) {
        this.report(member.position, "initializers not allowed in interfaces", "interface-initializer");
      }
    }
    if (!info.constructors.length && info.kind === "class") {
      info.constructors.push({
        name: "<init>", owner: info, parameters: [], parameterNames: [], varargs: false, returnType: classType(info),
        isStatic: false, isAbstract: false, isPrivate: false, isConstructor: true, typeParameters: [], throws: [],
        jsName: "$c_", blocking: false, isPublic: true, callees: new Set(),
      });
    }
  }

  private enterMethod(info: ClassInfo, member: Ast.MethodDeclaration) {
    const names = member.modifiers.names;
    const isInterface = info.kind === "interface";
    if (member.typeParameters.length) {
      this.unsupported(member.position, `generic methods you write yourself (<${member.typeParameters.join(", ")}>)`);
      this.methodTypeVariables = new Set(member.typeParameters);
    }
    try {
      if (isInterface && names.has("default")) this.unsupported(member.position, "default methods in interfaces");
      if (isInterface && names.has("private")) this.unsupported(member.position, "private methods in interfaces");
      const returnType = member.returnType.name === "void" ? VOID : this.resolveType(member.returnType);
      const parameters = this.enterParameters(member.parameters);
      const isStatic = names.has("static");
      const isAbstract = names.has("abstract") || (isInterface && !isStatic && !names.has("default") && !names.has("private"));
      if (member.body) {
        if (names.has("abstract")) this.report(member.namePosition, "abstract methods cannot have a body", "abstract-body");
        else if (isInterface && isAbstract) this.report(member.namePosition, "interface abstract methods cannot have body", "abstract-body");
      } else if (!isAbstract && !names.has("native")) {
        this.report(member.namePosition, "missing method body, or declare abstract", "missing-body");
      }
      const throwsTypes = member.throwsTypes.map((node) => this.resolveThrowsType(node));
      const method: MethodInfo = {
        name: member.name, owner: info, parameters, parameterNames: member.parameters.map((parameter) => parameter.name),
        varargs: member.parameters.some((parameter) => parameter.varargs), returnType,
        isStatic, isAbstract, isPrivate: names.has("private"), isConstructor: false, typeParameters: [],
        throws: throwsTypes, declaration: member, jsName: "", blocking: false,
        isPublic: names.has("public") || isInterface, callees: new Set(),
      };
      method.jsName = this.methodJsName(info, method);
      const duplicate = info.methods.find((existing) => existing.name === method.name && this.sameErasure(existing.parameters, parameters));
      if (duplicate) {
        this.report(member.namePosition, `method ${methodSignatureText(method)} is already defined in ${describeKind(info)}`, "already-defined");
        return;
      }
      member.info = method;
      info.methods.push(method);
    } finally {
      this.methodTypeVariables = null;
    }
  }

  private methodJsName(info: ClassInfo, method: MethodInfo): string {
    if (!method.isStatic) {
      const parameters = method.parameters;
      if (method.name === "toString" && !parameters.length) return "toString";
      if (method.name === "hashCode" && !parameters.length) return "hashCode";
      if (method.name === "equals" && parameters.length === 1 && parameters[0].tag === "class" && parameters[0].classInfo === this.lib.object) return "equals";
      if (method.name === "compareTo" && parameters.length === 1 && this.comparableArgument(info) && this.overridesComparable(info, parameters[0])) return "compareTo";
    }
    return `m_${method.name}${method.parameters.length ? "$" + method.parameters.map(erasedDescriptor).join("$") : ""}`;
  }

  private comparableArgument(info: ClassInfo): JavaType | null {
    const comparable = this.lib.lookup("java.lang.Comparable")!;
    const viewed = asSuper(classType(info), comparable);
    if (!viewed || viewed.tag !== "class") return null;
    return viewed.typeArguments[0] ?? classType(this.lib.object);
  }
  private overridesComparable(info: ClassInfo, parameter: JavaType): boolean {
    const argument = this.comparableArgument(info);
    return !!argument && sameType(argument, parameter);
  }

  private sameErasure(first: JavaType[], second: JavaType[]): boolean {
    return first.length === second.length && first.every((type, index) => erasedDescriptor(type) === erasedDescriptor(second[index]));
  }

  private enterParameters(parameters: Ast.Parameter[]): JavaType[] {
    const seen = new Set<string>();
    return parameters.map((parameter, index) => {
      if (parameter.varargs && index !== parameters.length - 1) {
        this.report(parameter.position, "varargs parameter must be the last parameter", "varargs-last");
      }
      if (seen.has(parameter.name)) this.report(parameter.position, `variable ${parameter.name} is already defined in this method`, "already-defined");
      seen.add(parameter.name);
      if (parameter.typeNode.name === "var") {
        this.report(parameter.typeNode.position, "'var' is not allowed here", "var-not-allowed");
        return ERROR_TYPE;
      }
      return this.resolveType(parameter.typeNode);
    });
  }

  private resolveThrowsType(node: Ast.TypeNode): JavaType {
    const type = this.resolveType(node);
    if (type.tag === "class" && !type.classInfo.isThrowable) {
      this.report(node.position, `incompatible types: ${typeName(type)} cannot be converted to Throwable`, "incompatible");
      return ERROR_TYPE;
    }
    return type;
  }

  private enterConstructor(info: ClassInfo, member: Ast.ConstructorDeclaration) {
    if (info.kind === "interface") {
      this.report(member.namePosition, "invalid method declaration; return type required", "return-type-required");
      return;
    }
    const parameters = this.enterParameters(member.parameters);
    const constructor: MethodInfo = {
      name: "<init>", owner: info, parameters, parameterNames: member.parameters.map((parameter) => parameter.name),
      varargs: member.parameters.some((parameter) => parameter.varargs), returnType: classType(info),
      isStatic: false, isAbstract: false, isPrivate: member.modifiers.names.has("private"), isConstructor: true,
      typeParameters: [], throws: member.throwsTypes.map((node) => this.resolveThrowsType(node)),
      declaration: member, jsName: "$c_" + parameters.map(erasedDescriptor).join("$"), blocking: false,
      isPublic: member.modifiers.names.has("public"), callees: new Set(),
    };
    if (info.constructors.some((existing) => this.sameErasure(existing.parameters, parameters))) {
      this.report(member.namePosition, `constructor ${methodSignatureText(constructor)} is already defined in ${describeKind(info)}`, "already-defined");
      return;
    }
    member.info = constructor;
    info.constructors.push(constructor);
  }

  // ---- class-level rules: overriding, abstract methods -------------------------------
  private allSupertypes(type: JavaType): JavaType[] {
    const result: JavaType[] = [];
    const visit = (current: JavaType) => {
      for (const parent of directSupertypes(current)) {
        if (parent.tag !== "class" || result.some((seen) => seen.tag === "class" && seen.classInfo === parent.classInfo)) continue;
        result.push(parent);
        visit(parent);
      }
    };
    visit(type);
    return result;
  }

  /** The methods `method` overrides, found in the supertypes of its class. */
  overriddenBy(method: MethodInfo): { method: MethodInfo; parameters: JavaType[]; returnType: JavaType }[] {
    if (method.isStatic || method.isConstructor || method.isPrivate) return [];
    const found: { method: MethodInfo; parameters: JavaType[]; returnType: JavaType }[] = [];
    for (const parent of this.allSupertypes(classType(method.owner))) {
      if (parent.tag !== "class") continue;
      const substitution = substitutionOf(parent);
      for (const candidate of parent.classInfo.methods) {
        if (candidate.name !== method.name || candidate.isStatic || candidate.isPrivate) continue;
        const parameters = candidate.parameters.map((type) => substitute(type, substitution));
        if (parameters.length === method.parameters.length && parameters.every((type, index) => sameType(type, method.parameters[index])
            || (type.tag === "typeVariable") )) {
          found.push({ method: candidate, parameters, returnType: substitute(candidate.returnType, substitution) });
        }
      }
    }
    return found;
  }

  private checkClassRules(info: ClassInfo) {
    const declaration = info.declaration!;
    if (this.brokenClasses.has(info)) return;
    for (const member of declaration.members) {
      if (member.kind !== "Method" || !member.info) continue;
      const method = member.info;
      const overridden = this.overriddenBy(method);
      const hasOverride = member.modifiers.annotations.find((annotation) => annotation.name === "Override");
      for (const annotation of member.modifiers.annotations) {
        if (!KNOWN_ANNOTATIONS.has(annotation.name) && !KNOWN_ANNOTATIONS.has(annotation.name.replace(/^java\.lang\./, ""))) {
          this.report({ ...annotation.position, column: annotation.position.column + 1 }, "cannot find symbol", "cant-resolve-class",
                      [`symbol:   class ${annotation.name}`, `location: ${describeKind(info)}`]);
        }
      }
      if (hasOverride && (!overridden.length || method.isStatic)) {
        this.report(hasOverride.position, "method does not override or implement a method from a supertype", "override-nothing");
      }
      for (const { method: parent, returnType } of overridden) {
        const verb = parent.owner.kind === "interface" && info.kind !== "interface" ? "implement" : "override";
        const head = `${methodSignatureText(method)} in ${simpleClassName(info)} cannot ${verb} ${methodSignatureText(parent)} in ${simpleClassName(parent.owner)}`;
        const returnOk = method.returnType.tag === "primitive" || returnType.tag === "primitive" || method.returnType.tag === "void" || returnType.tag === "void"
          ? sameType(method.returnType, returnType)
          : isSubtype(method.returnType, returnType) || returnType.tag === "typeVariable";
        if (!returnOk) {
          this.report(member.namePosition, head, "override-return", [`return type ${typeName(method.returnType)} is not compatible with ${typeName(returnType)}`]);
        } else if ((parent.isPublic || parent.owner.kind === "interface" || !parent.owner.isUser) && !method.isPublic) {
          this.report(member.namePosition, head, "override-access", ["attempting to assign weaker access privileges; was public"]);
        } else if (parent.declaration?.modifiers.names.has("final")) {
          this.report(member.namePosition, head, "override-final", ["overridden method is final"]);
        }
      }
    }
    if (info.kind === "class" && !info.isAbstract) {
      const missing = this.firstUnimplemented(info);
      if (missing) {
        this.report(declaration.position,
          `${simpleClassName(info)} is not abstract and does not override abstract method ${methodSignatureText(missing.method)} in ${simpleClassName(missing.method.owner)}`,
          "does-not-override-abstract");
      }
    }
  }

  private firstUnimplemented(info: ClassInfo): { method: MethodInfo } | null {
    const self = classType(info);
    const chain = [self, ...this.allSupertypes(self)];
    for (const type of chain) {
      if (type.tag !== "class") continue;
      const substitution = substitutionOf(type);
      for (const method of type.classInfo.methods) {
        if (!method.isAbstract) continue;
        if (!type.classInfo.isUser && type.classInfo !== this.lib.lookup("java.lang.Comparable")) continue;
        const parameters = method.parameters.map((parameter) => substitute(parameter, substitution));
        const implemented = chain.some((candidateType) => candidateType.tag === "class" && candidateType.classInfo.kind === "class"
          && candidateType.classInfo.isUser
          && candidateType.classInfo.methods.some((candidate) => !candidate.isAbstract && !candidate.isStatic && candidate.name === method.name
            && candidate.parameters.length === parameters.length
            && candidate.parameters.every((parameter, index) => sameType(parameter, parameters[index]))));
        if (!implemented) return { method };
      }
    }
    return null;
  }

  // ---- types written in the source ---------------------------------------------------
  resolveType(node: Ast.TypeNode): JavaType {
    const type = this.resolveTypeInner(node);
    node.resolved = type;
    return type;
  }

  private resolveTypeInner(node: Ast.TypeNode): JavaType {
    let base: JavaType;
    if (PRIMITIVE_NAMES.has(node.name)) {
      base = primitive(node.name as PrimitiveName);
    } else if (node.name === "void") {
      this.report(node.position, "'void' type not allowed here", "void-not-allowed");
      return ERROR_TYPE;
    } else if (this.methodTypeVariables?.has(node.name)) {
      base = classType(this.lib.object);
    } else {
      const info = this.resolveClassPath(node.name, node.position);
      if (!info) return ERROR_TYPE;
      if (info.unsupported) { this.unsupported(node.position, info.unsupported); return ERROR_TYPE; }
      // An enum, record or generic class the runner can't build: every use of it is quietly an error type,
      // so the unsupported note is the only thing said about it rather than a cascade of false errors.
      if (this.brokenClasses.has(info)) return ERROR_TYPE;
      let typeArguments: JavaType[] = [];
      if (node.typeArguments && node.typeArguments.length) {
        if (!info.typeParameters.length) {
          this.report(node.position, `type ${simpleClassName(info)} does not take parameters`, "no-type-parameters");
          return ERROR_TYPE;
        }
        if (node.typeArguments.length !== info.typeParameters.length) {
          this.report(node.position, `wrong number of type arguments; required ${info.typeParameters.length}`, "type-argument-count");
          return ERROR_TYPE;
        }
        typeArguments = node.typeArguments.map((argument) => {
          const resolved = this.resolveType(argument);
          if (resolved.tag === "primitive") {
            this.report(argument.position, "unexpected type", "primitive-type-argument", ["required: reference", `found:    ${resolved.name}`]);
            return ERROR_TYPE;
          }
          return resolved;
        });
        if (typeArguments.some((argument) => argument.tag === "error")) typeArguments = [];
      }
      base = classType(info, typeArguments);
    }
    for (let dimension = 0; dimension < node.dimensions; dimension++) base = arrayOf(base);
    return base;
  }

  /** "Scanner", "Main.Inner", "java.util.Scanner" - or report why not. */
  private resolveClassPath(path: string, at: Ast.Position): ClassInfo | null {
    const parts = path.split(".");
    let info: ClassInfo | null = this.resolveSimpleClass(parts[0]);
    let index = 1;
    if (!info) {
      // A qualified name: the longest package prefix that exists.
      for (let length = parts.length - 1; length >= 1 && !info; length--) {
        const candidate = this.lib.lookup(parts.slice(0, length + 1).join("."));
        if (candidate && this.lib.packages.has(parts.slice(0, length).join("."))) { info = candidate; index = length + 1; }
      }
      if (!info) {
        if (parts.length > 1 && this.lib.packages.has(parts[0])) {
          let packageLength = 1;
          while (packageLength < parts.length && this.lib.packages.has(parts.slice(0, packageLength + 1).join("."))) packageLength++;
          const packageName = parts.slice(0, packageLength).join(".");
          if (packageLength === parts.length) this.report(at, `package ${packageName} does not exist`, "package-missing");
          else this.report(at, "cannot find symbol", "cant-resolve-class", [`symbol:   class ${parts[packageLength]}`, `location: package ${packageName}`]);
          return null;
        }
        if (parts.length > 1) { this.report(at, `package ${parts.slice(0, -1).join(".")} does not exist`, "package-missing"); return null; }
        this.reportMissingClass(at, parts[0]);
        return null;
      }
    }
    for (; index < parts.length; index++) {
      const member: ClassInfo | undefined = this.memberClasses.get(info)?.get(parts[index]);
      if (!member) {
        if (!info.isUser) { this.unsupported(at, `the ${info.name}.${parts[index]} class`); return null; }
        this.report(at, "cannot find symbol", "cant-resolve-class", [`symbol:   class ${parts[index]}`, `location: ${describeKind(info)}`]);
        return null;
      }
      info = member;
    }
    return info;
  }

  private reportMissingClass(at: Ast.Position, name: string) {
    const location = this.currentClass ? describeKind(this.currentClass) : `package ${this.file.unit.packageName ?? ""}`;
    this.report(at, "cannot find symbol", "cant-resolve-class", [`symbol:   class ${name}`, `location: ${location}`]);
  }

  /** A class by its simple name, from where the code is: nested, top-level, imported, java.lang. */
  private resolveSimpleClass(name: string): ClassInfo | null {
    for (let walker = this.currentClass; walker; walker = walker.outer ?? null) {
      if (walker.name === name && !walker.outer) return walker;
      const member = this.memberClasses.get(walker)?.get(name) ?? this.inheritedMemberClass(walker, name);
      if (member) return member;
    }
    const top = this.topLevel.get(name);
    if (top) return top;
    const imported = this.file.singleImports.get(name);
    if (imported) return imported;
    const langClass = this.lib.lookup(`${AUTO_IMPORTED_PACKAGE}.${name}`);
    if (langClass) return langClass;
    for (const packageName of this.file.starImports) {
      const found = this.lib.lookup(`${packageName}.${name}`) ?? this.memberClasses.get(this.topLevel.get(packageName)!)?.get(name);
      if (found) return found;
    }
    return null;
  }

  private inheritedMemberClass(info: ClassInfo, name: string): ClassInfo | undefined {
    for (const parent of this.allSupertypes(classType(info))) {
      if (parent.tag === "class" && parent.classInfo.isUser) {
        const member = this.memberClasses.get(parent.classInfo)?.get(name);
        if (member) return member;
      }
    }
    return undefined;
  }

  // ---- attributing bodies -----------------------------------------------------------------
  private newBody(info: ClassInfo, isStatic: boolean, method: MethodInfo | null, description: string): BodyContext {
    return {
      classInfo: info, isStatic, method, returnType: method ? (method.isConstructor ? VOID : method.returnType) : null,
      description, scopes: [new Map()], usedJsNames: new Set(), jumps: [],
      callees: method?.callees ?? new Set(), switchExpressions: [], isConstructor: !!method?.isConstructor,
    };
  }

  private attributeClass(info: ClassInfo) {
    if (this.brokenClasses.has(info)) return;
    const declaration = info.declaration!;
    info.instanceInitializerCallees = new Set();
    info.staticInitializerCallees = new Set();
    for (const member of declaration.members) {
      if (member.kind === "Field") {
        for (const field of member.fields ?? []) this.attributeFieldInitializer(field);
      } else if (member.kind === "Initializer") {
        const body = this.newBody(info, member.isStatic, null, `${describeKind(info)}`);
        body.callees = member.isStatic ? info.staticInitializerCallees : info.instanceInitializerCallees;
        this.withBody(body, () => this.block(member.body));
      } else if (member.kind === "Method" && member.info && member.body) {
        const method = member.info;
        const body = this.newBody(info, method.isStatic, method, `method ${methodSignatureText(method)}`);
        this.withBody(body, () => {
          this.declareParameters(member.parameters, method.parameters);
          this.block(member.body!);
        });
      } else if (member.kind === "Constructor" && member.info) {
        const constructor = member.info;
        const body = this.newBody(info, false, constructor, `constructor ${methodSignatureText(constructor)}`);
        this.withBody(body, () => {
          this.declareParameters(member.parameters, constructor.parameters);
          this.constructorCall(member, info);
          this.block(member.body);
        });
      }
    }
    // The constructor javac writes when the class has none: it calls super().
    const implicit = info.constructors.find((constructor) => !constructor.declaration);
    if (implicit && info.superclass?.tag === "class") {
      const body = this.newBody(info, false, implicit, `constructor ${info.name}()`);
      this.withBody(body, () => {
        const selection = this.selectConstructor(info.superclass!, [], [], declaration.position, false);
        if (selection) implicit.callees!.add(selection.method);
        (implicit as MethodInfo & { superConstructor?: MethodInfo }).superConstructor = selection?.method;
      });
    }
  }

  private withBody(body: BodyContext, action: () => void) {
    const saved = this.body;
    this.body = body;
    try { action(); } finally { this.body = saved; }
  }

  private declareParameters(parameters: Ast.Parameter[], types: JavaType[]) {
    parameters.forEach((parameter, index) => {
      parameter.variable = this.declareLocal(parameter.name, types[index], parameter.position, parameter.isFinal, true);
    });
  }

  private attributeFieldInitializer(field: FieldInfo) {
    if (this.checkedInitializers.has(field)) return;
    const declarator = field.declaration;
    if (!declarator?.initializer) { this.checkedInitializers.add(field); return; }
    if (this.initializersInProgress.has(field)) return;
    this.initializersInProgress.add(field);
    const info = field.owner;
    const body = this.newBody(info, field.isStatic, null, describeKind(info));
    body.callees = (field.isStatic ? info.staticInitializerCallees : info.instanceInitializerCallees) ?? new Set();
    const savedFile = this.file, savedClass = this.currentClass;
    this.file = this.fileOf.get(info)!;
    this.currentClass = info;
    try {
      this.withBody(body, () => {
        const value = this.initializerValue(declarator.initializer!, field.type);
        if (field.isFinal && isConstantType(field.type) && value.constant !== undefined) {
          const converted = convertConstant(value.constant, value.type!, field.type);
          if (converted !== undefined) field.constant = converted;
        }
      });
    } finally {
      this.file = savedFile;
      this.currentClass = savedClass;
      this.initializersInProgress.delete(field);
      this.checkedInitializers.add(field);
    }
  }

  /** `= value` or `= { ... }` against the declared type. */
  private initializerValue(initializer: Ast.Expression, type: JavaType): Ast.Expression {
    if (initializer.kind === "ArrayInit") {
      this.arrayInitializer(initializer, type);
    } else {
      const valueType = this.expression(initializer, type);
      this.convert(initializer, valueType, type);
    }
    return initializer;
  }

  private constructorCall(member: Ast.ConstructorDeclaration, info: ClassInfo) {
    const constructor = member.info!;
    const explicit = member.explicitCall;
    const body = this.body!;
    if (explicit) {
      // Arguments to this()/super() cannot use the object being built.
      body.isStatic = true;
      const argumentTypes = explicit.args.map((argument) => this.expression(argument));
      body.isStatic = false;
      const target = explicit.kind === "this" ? classType(info) : info.superclass;
      if (!target || target.tag !== "class") return;
      const selection = this.selectConstructor(target, explicit.args, argumentTypes, explicit.position, true);
      if (selection) {
        explicit.constructorInfo = selection.method;
        explicit.varargsCall = selection.varargsCall;
        body.callees.add(selection.method);
        if (selection.method === constructor) this.report(explicit.position, "recursive constructor invocation", "recursive-constructor");
      }
    } else if (info.superclass?.tag === "class") {
      const selection = this.selectConstructor(info.superclass, [], [], member.namePosition, false);
      if (selection) {
        body.callees.add(selection.method);
        (constructor as MethodInfo & { superConstructor?: MethodInfo }).superConstructor = selection.method;
      }
    }
  }

  // ---- locals and scopes --------------------------------------------------------------------
  private declareLocal(name: string, type: JavaType, at: Ast.Position, isFinal: boolean, isParameter = false): LocalVariable {
    const body = this.body!;
    if (body.scopes.some((scope) => scope.has(name))) {
      this.report(at, `variable ${name} is already defined in ${body.description}`, "already-defined");
    }
    let jsName = "v_" + name;
    for (let counter = 2; body.usedJsNames.has(jsName); counter++) jsName = `v_${name}_${counter}`;
    body.usedJsNames.add(jsName);
    const variable: LocalVariable = { name, type, isFinal, id: nextVariableId++, jsName, position: at, isParameter };
    body.scopes[body.scopes.length - 1].set(name, variable);
    return variable;
  }

  private findLocal(name: string): LocalVariable | undefined {
    const scopes = this.body?.scopes ?? [];
    for (let index = scopes.length - 1; index >= 0; index--) {
      const found = scopes[index].get(name);
      if (found) return found;
    }
    return undefined;
  }

  private inScope<T>(action: () => T): T {
    this.body!.scopes.push(new Map());
    try { return action(); } finally { this.body!.scopes.pop(); }
  }

  // ---- statements -------------------------------------------------------------------------------
  private block(block: Ast.Block) {
    this.inScope(() => { for (const statement of block.statements) this.statement(statement); });
  }

  private statement(statement: Ast.Statement): void {
    const body = this.body!;
    switch (statement.kind) {
      case "Block": return this.block(statement);
      case "LocalVar": return this.localVariable(statement);
      case "ExprStmt": {
        const expression = statement.expression;
        if (expression.kind === "Unsupported") { this.unsupported(expression.position, expression.feature); return; }
        this.expression(expression);
        return;
      }
      case "If":
        this.inScope(() => {
          this.condition(statement.condition);
          this.inScope(() => this.statement(statement.thenBranch));
          if (statement.elseBranch) this.inScope(() => this.statement(statement.elseBranch!));
        });
        return;
      case "While":
        this.inScope(() => {
          this.condition(statement.condition);
          this.loopBody(statement.body);
        });
        return;
      case "Do":
        this.loopBody(statement.body);
        this.inScope(() => this.condition(statement.condition));
        return;
      case "For":
        this.inScope(() => {
          for (const init of statement.init) this.statement(init);
          if (statement.condition) this.condition(statement.condition);
          this.inScope(() => { for (const update of statement.update) this.expression(update); });
          this.loopBody(statement.body);
        });
        return;
      case "ForEach": return this.forEach(statement);
      case "Return": return this.returnStatement(statement);
      case "Break": {
        if (statement.label) {
          if (!body.jumps.some((jump) => jump.kind === "label" && jump.label === statement.label)) {
            this.report(statement.position, `undefined label: ${statement.label}`, "undefined-label");
          }
        } else {
          const target = [...body.jumps].reverse().find((jump) => jump.kind !== "label");
          if (!target) this.report(statement.position, "break outside switch or loop", "break-outside");
          else if (target.kind === "switchExpression") this.report(statement.position, "attempting to break out of a switch expression", "break-switch-expression");
        }
        return;
      }
      case "Continue": {
        const loops = [...body.jumps].reverse();
        const expressionIndex = loops.findIndex((jump) => jump.kind === "switchExpression");
        const loopIndex = loops.findIndex((jump) => jump.kind === "loop");
        if (statement.label) {
          const labelIndex = loops.findIndex((jump) => jump.kind === "label" && jump.label === statement.label);
          if (labelIndex < 0) this.report(statement.position, `undefined label: ${statement.label}`, "undefined-label");
          else if (loops[labelIndex - 1]?.kind !== "loop" && loops[labelIndex + 1]?.kind !== "loop") {
            this.report(statement.position, `not a loop label: ${statement.label}`, "not-loop-label");
          }
        } else if (loopIndex < 0 || (expressionIndex >= 0 && expressionIndex < loopIndex)) {
          this.report(statement.position, expressionIndex >= 0 && loopIndex >= 0
            ? "attempting to continue out of a switch expression" : "continue outside of loop", "continue-outside");
        }
        return;
      }
      case "Throw": {
        const type = this.expression(statement.value);
        const throwable = classType(this.lib.lookup("java.lang.Throwable")!);
        if (type.tag !== "error" && !isSubtype(type, throwable)) {
          this.report(preferredPosition(statement.value), `incompatible types: ${typeName(type)} cannot be converted to Throwable`, "incompatible");
        }
        return;
      }
      case "Yield": {
        const context = body.switchExpressions[body.switchExpressions.length - 1];
        if (!context) { this.report(statement.position, "yield outside of switch expression", "yield-outside"); return; }
        this.expression(statement.value);
        context.results.push({ expression: statement.value, yieldStatement: statement });
        return;
      }
      case "Switch": return this.switchStatement(statement);
      case "Try": return this.tryStatement(statement);
      case "Labeled":
        body.jumps.push({ kind: "label", label: statement.label });
        try { this.statement(statement.body); } finally { body.jumps.pop(); }
        return;
      case "Empty": return;
      case "Assert":
        this.condition(statement.condition);
        if (statement.message) this.expression(statement.message);
        return;
      case "UnsupportedStmt":
        this.unsupported(statement.position, statement.feature);
        return;
    }
  }

  private loopBody(statement: Ast.Statement) {
    const body = this.body!;
    body.jumps.push({ kind: "loop" });
    try { this.inScope(() => this.statement(statement)); } finally { body.jumps.pop(); }
  }

  private condition(expression: Ast.Expression) {
    const type = this.expression(expression, BOOLEAN);
    this.convert(expression, type, BOOLEAN);
  }

  private localVariable(statement: Ast.LocalVariableDeclaration) {
    const typeNode = statement.typeNode;
    if (typeNode.name === "var") {
      for (const declarator of statement.declarators) {
        if (statement.declarators.length > 1) {
          this.report(declarator.position, "'var' is not allowed in a compound declaration", "var-compound");
        }
        if (declarator.dimensions) {
          this.report(typeNode.position, "'var' is not allowed as an element type of an array", "var-array");
        }
        if (!declarator.initializer) {
          this.report(declarator.position, `cannot infer type for local variable ${declarator.name}`, "var-infer", ["(cannot use 'var' on variable without initializer)"]);
          declarator.variable = this.declareLocal(declarator.name, ERROR_TYPE, declarator.position, statement.isFinal);
          continue;
        }
        if (declarator.initializer.kind === "ArrayInit") {
          this.report(declarator.position, `cannot infer type for local variable ${declarator.name}`, "var-infer", ["(array initializer needs an explicit target-type)"]);
          declarator.variable = this.declareLocal(declarator.name, ERROR_TYPE, declarator.position, statement.isFinal);
          continue;
        }
        let type = this.expression(declarator.initializer);
        if (type.tag === "null") {
          this.report(declarator.position, `cannot infer type for local variable ${declarator.name}`, "var-infer", ["(variable initializer is 'null')"]);
          type = ERROR_TYPE;
        } else if (type.tag === "void") {
          this.report(declarator.position, `cannot infer type for local variable ${declarator.name}`, "var-infer", ["(variable initializer is 'void')"]);
          type = ERROR_TYPE;
        }
        const variable = this.declareLocal(declarator.name, type, declarator.position, statement.isFinal);
        declarator.variable = variable;
        typeNode.resolved = type;
        if (statement.isFinal && isConstantType(type) && declarator.initializer.constant !== undefined) variable.constant = declarator.initializer.constant;
      }
      return;
    }
    const baseType = this.resolveType(typeNode);
    for (const declarator of statement.declarators) {
      let type = baseType;
      for (let dimension = 0; dimension < declarator.dimensions; dimension++) type = arrayOf(type);
      const variable = this.declareLocal(declarator.name, type, declarator.position, statement.isFinal);
      declarator.variable = variable;
      if (declarator.initializer) {
        this.initializerValue(declarator.initializer, type);
        const constant = declarator.initializer.constant;
        if (statement.isFinal && isConstantType(type) && constant !== undefined && declarator.initializer.type) {
          const converted = convertConstant(constant, declarator.initializer.type, type);
          if (converted !== undefined) variable.constant = converted;
        }
      }
    }
  }

  private forEach(statement: Ast.ForEachStatement) {
    this.inScope(() => {
      const iterableType = this.expression(statement.iterable);
      let elementType: JavaType = ERROR_TYPE;
      if (iterableType.tag === "array") elementType = iterableType.element;
      else if (iterableType.tag === "class") {
        const iterable = this.lib.lookup("java.lang.Iterable")!;
        const viewed = asSuper(iterableType, iterable);
        if (viewed && viewed.tag === "class") elementType = viewed.typeArguments[0] ?? classType(this.lib.object);
        else this.report(preferredPosition(statement.iterable), "for-each not applicable to expression type", "foreach-type",
                         ["required: array or java.lang.Iterable", `found:    ${typeName(iterableType)}`]);
      } else if (iterableType.tag !== "error") {
        this.report(preferredPosition(statement.iterable), "for-each not applicable to expression type", "foreach-type",
                    ["required: array or java.lang.Iterable", `found:    ${typeName(iterableType)}`]);
      }
      statement.elementType = elementType;
      let variableType: JavaType;
      if (statement.typeNode.name === "var") {
        variableType = elementType;
        statement.typeNode.resolved = elementType;
      } else {
        variableType = this.resolveType(statement.typeNode);
        if (elementType.tag !== "error" && variableType.tag !== "error") {
          const result = assignmentConversion(elementType, variableType);
          if (result !== true) {
            this.report(preferredPosition(statement.iterable), result === "lossy"
              ? `incompatible types: possible lossy conversion from ${typeName(elementType)} to ${typeName(variableType)}`
              : `incompatible types: ${typeName(elementType)} cannot be converted to ${typeName(variableType)}`, result === "lossy" ? "lossy" : "incompatible");
          }
        }
      }
      statement.variable = this.declareLocal(statement.name, variableType, statement.namePosition, statement.isFinal);
      this.loopBody(statement.body);
    });
  }

  private returnStatement(statement: Ast.ReturnStatement) {
    const body = this.body!;
    if (body.switchExpressions.length && body.jumps.some((jump) => jump.kind === "switchExpression")) {
      this.report(statement.position, "attempting to return out of a switch expression", "return-switch-expression");
      return;
    }
    if (!body.returnType) { this.report(statement.position, "return outside method", "return-outside"); return; }
    statement.returnType = body.returnType;
    if (body.returnType.tag === "void") {
      if (statement.value) {
        this.expression(statement.value);
        this.report(preferredPosition(statement.value), "incompatible types: unexpected return value", "unexpected-return");
      }
      return;
    }
    if (!statement.value) { this.report(statement.position, "incompatible types: missing return value", "missing-return-value"); return; }
    if (statement.value.kind === "ArrayInit") { this.report(statement.value.position, "illegal start of expression", "illegal-start-of-expression"); return; }
    const type = this.expression(statement.value, body.returnType);
    this.convert(statement.value, type, body.returnType);
  }

  private switchSelector(selector: Ast.Expression): JavaType {
    const type = this.expression(selector);
    const plain = primitiveOf(type);
    if (type.tag === "error") return type;
    if (isString(type)) return type;
    if (plain && plain.tag === "primitive" && ["int", "char", "short", "byte"].includes(plain.name)) return plain;
    if (plain && plain.tag === "primitive" && plain.name === "long") {
      this.report(preferredPosition(selector), "constant label of type long is not compatible with switch selector", "switch-type");
      return ERROR_TYPE;
    }
    this.unsupported(preferredPosition(selector), `switching on a ${typeName(type)} value (patterns in switch)`);
    return ERROR_TYPE;
  }

  private switchLabels(cases: Ast.SwitchCase[], selectorType: JavaType) {
    const seen = new Set<string>();
    let sawDefault = false;
    for (const switchCase of cases) {
      if (switchCase.isDefault) {
        if (sawDefault) this.report(switchCase.position, "duplicate default label", "duplicate-default");
        sawDefault = true;
      }
      for (const label of switchCase.labels) {
        if (label.kind === "Unsupported") { this.unsupported(label.position, label.feature); continue; }
        if (label.kind === "Literal" && label.literalType === "null") {
          this.unsupported(label.position, "case null");
          continue;
        }
        const type = this.expression(label, selectorType);
        if (selectorType.tag === "error" || type.tag === "error") continue;
        if (label.constant === undefined) {
          this.report(preferredPosition(label), isString(selectorType) ? "string constant expression required" : "constant expression required", "constant-required");
          continue;
        }
        const result = assignmentConversion(type, selectorType, label.constant, false);
        if (result !== true) {
          this.report(preferredPosition(label), result === "lossy"
            ? `incompatible types: possible lossy conversion from ${typeName(type)} to ${typeName(selectorType)}`
            : `constant label of type ${typeName(type)} is not compatible with switch selector type ${typeName(selectorType)}`, "incompatible");
          continue;
        }
        const converted = convertConstant(label.constant, type, selectorType.tag === "primitive" ? selectorType : type);
        const key = String(converted);
        if (seen.has(key)) this.report(label.position, "duplicate case label", "duplicate-case");
        seen.add(key);
        label.constant = converted;
      }
    }
    return sawDefault;
  }

  private switchStatement(statement: Ast.SwitchStatement) {
    const body = this.body!;
    const selectorType = this.switchSelector(statement.selector);
    this.switchLabels(statement.cases, selectorType);
    body.jumps.push({ kind: "switch" });
    try {
      if (statement.cases.some((switchCase) => switchCase.arrow)) {
        for (const switchCase of statement.cases) {
          this.inScope(() => {
            const only = switchCase.body[0];
            if (switchCase.arrowExpression) {
              const expression = switchCase.arrowExpression;
              if (!["Assign", "Call", "New", "Unary", "Postfix", "Unsupported"].includes(expression.kind)
                  || (expression.kind === "Unary" && expression.operator !== "++" && expression.operator !== "--")) {
                this.report(expression.position, "not a statement", "not-a-statement");
              }
            }
            if (only) this.statement(only);
          });
        }
      } else {
        this.inScope(() => {
          for (const switchCase of statement.cases) for (const inner of switchCase.body) this.statement(inner);
        });
      }
    } finally { body.jumps.pop(); }
  }

  private switchExpression(expression: Ast.SwitchExpression, expected: JavaType | undefined): JavaType {
    const body = this.body!;
    const selectorType = this.switchSelector(expression.selector);
    const hasDefault = this.switchLabels(expression.cases, selectorType);
    if (!hasDefault) this.report(expression.position, "the switch expression does not cover all possible input values", "switch-not-exhaustive");
    const context: SwitchExpressionContext = { results: [] };
    body.switchExpressions.push(context);
    body.jumps.push({ kind: "switchExpression" });
    try {
      if (expression.cases.some((switchCase) => switchCase.arrow)) {
        for (const switchCase of expression.cases) {
          this.inScope(() => {
            if (switchCase.arrowExpression) {
              this.expression(switchCase.arrowExpression, expected);
              context.results.push({ expression: switchCase.arrowExpression });
            } else if (switchCase.body[0]) this.statement(switchCase.body[0]);
          });
        }
      } else {
        this.inScope(() => {
          for (const switchCase of expression.cases) for (const inner of switchCase.body) this.statement(inner);
        });
      }
    } finally {
      body.jumps.pop();
      body.switchExpressions.pop();
    }
    const types = context.results.map((result) => result.expression.type ?? ERROR_TYPE);
    let resultType: JavaType;
    if (types.some((type) => type.tag === "error")) resultType = ERROR_TYPE;
    else if (!types.length) resultType = expected ?? ERROR_TYPE;
    else if (types.every((type) => sameType(type, types[0])) && types[0].tag !== "null") resultType = types[0];
    else if (types.every((type) => { const plain = primitiveOf(type); return plain && isNumericPrimitive(plain); })) {
      resultType = types.map((type) => primitiveOf(type)!).reduce((first, second) => binaryNumericPromotion(first, second));
    } else if (types.every((type) => primitiveOf(type) && isPrimitive(primitiveOf(type)!, "boolean"))) resultType = BOOLEAN;
    else if (expected && expected.tag !== "void") resultType = expected;
    else if (types.every((type) => isString(type) || type.tag === "null")) resultType = classType(this.lib.string);
    else resultType = classType(this.lib.object);
    for (const result of context.results) {
      const type = result.expression.type ?? ERROR_TYPE;
      this.convert(result.expression, type, resultType);
      if (result.yieldStatement) result.yieldStatement.resultType = resultType;
    }
    return resultType;
  }

  private tryStatement(statement: Ast.TryStatement) {
    if (statement.hasResources) this.unsupported(statement.position, "try-with-resources (try (...) { })");
    this.block(statement.body);
    const throwable = classType(this.lib.lookup("java.lang.Throwable")!);
    for (const clause of statement.catches) {
      this.inScope(() => {
        const types = clause.types.map((node) => {
          const type = this.resolveType(node);
          if (type.tag !== "error" && !isSubtype(type, throwable)) {
            this.report(node.position, `incompatible types: ${typeName(type)} cannot be converted to Throwable`, "incompatible");
            return ERROR_TYPE;
          }
          return type;
        });
        if (types.length > 1) {
          for (let first = 0; first < types.length; first++) for (let second = 0; second < types.length; second++) {
            if (first !== second && types[first].tag === "class" && types[second].tag === "class" && isSubtype(types[first], types[second])) {
              this.report(clause.types[first].position, "Alternatives in a multi-catch statement cannot be related by subclassing", "multicatch-related",
                [`Alternative ${typeName(types[first])} is a subclass of alternative ${typeName(types[second])}`]);
            }
          }
        }
        const variableType = types.length === 1 ? types[0] : throwable;
        const variable = this.declareLocal(clause.name, variableType, clause.position, types.length > 1);
        variable.isCatchParameter = true;
        clause.variable = variable;
        (clause as Ast.CatchClause & { resolvedTypes?: JavaType[] }).resolvedTypes = types;
        this.block(clause.body);
      });
    }
    if (statement.finallyBlock) this.block(statement.finallyBlock);
  }

  // ---- expressions --------------------------------------------------------------------------------
  expression(expression: Ast.Expression, expected?: JavaType): JavaType {
    const type = this.expressionInner(expression, expected);
    expression.type = type;
    return type;
  }

  private expressionInner(expression: Ast.Expression, expected?: JavaType): JavaType {
    switch (expression.kind) {
      case "Literal": return this.literal(expression);
      case "Name": {
        const qualifier = this.nameQualifier(expression, false);
        return qualifier.kind === "value" ? qualifier.type : ERROR_TYPE;
      }
      case "FieldAccess": {
        const qualifier = this.fieldAccessQualifier(expression, false);
        return qualifier.kind === "value" ? qualifier.type : ERROR_TYPE;
      }
      case "ArrayAccess": return this.arrayAccess(expression);
      case "Call": return this.call(expression);
      case "New": return this.newObject(expression, expected);
      case "NewArray": return this.newArray(expression);
      case "ArrayInit":
        this.report(expression.position, "illegal start of expression", "illegal-start-of-expression");
        return ERROR_TYPE;
      case "Unary": return this.unary(expression);
      case "Postfix": return this.increment(expression, expression.operand, expression.operator);
      case "Binary": return this.binary(expression);
      case "Assign": return this.assignment(expression);
      case "Conditional": return this.conditional(expression, expected);
      case "Cast": return this.cast(expression);
      case "InstanceOf": return this.instanceOf(expression);
      case "This": {
        if (this.body?.isStatic || !this.body) {
          this.report(expression.position, "non-static variable this cannot be referenced from a static context", "static-context");
          return ERROR_TYPE;
        }
        return classType(this.body.classInfo);
      }
      case "SwitchExpr": return this.switchExpression(expression, expected);
      case "Unsupported":
        this.unsupported(expression.position, expression.feature);
        return ERROR_TYPE;
    }
  }

  private literal(literal: Ast.Literal): JavaType {
    switch (literal.literalType) {
      case "int": literal.constant = literal.value as number; return INT;
      case "long": literal.constant = literal.value as bigint; return LONG;
      case "float": literal.constant = literal.value as number; return FLOAT;
      case "double": literal.constant = literal.value as number; return DOUBLE;
      case "char": literal.constant = literal.value as number; return CHAR;
      case "string": literal.constant = literal.value as string; return classType(this.lib.string);
      case "boolean": literal.constant = literal.value as boolean; return BOOLEAN;
      case "null": return NULL_TYPE;
    }
  }

  /** What a bare name means here: a variable, a class, or the start of a package name. */
  private nameQualifier(expression: Ast.NameExpression, allowTypes: boolean): Qualifier {
    const name = expression.name;
    const local = this.findLocal(name);
    if (local) {
      expression.resolution = { to: "local", variable: local };
      if (local.constant !== undefined) expression.constant = local.constant;
      expression.type = local.type;
      return { kind: "value", type: local.type };
    }
    const field = this.findFieldInScope(name, expression.position);
    if (field === "reported") return { kind: "value", type: ERROR_TYPE };
    if (field) {
      expression.resolution = { to: "field", field: field.field, implicitThis: !field.field.isStatic };
      this.foldField(expression, field.field);
      expression.type = field.field.type;
      return { kind: "value", type: field.field.type };
    }
    const info = this.resolveSimpleClass(name);
    if (info) {
      if (!allowTypes) {
        this.report(expression.position, "cannot find symbol", "cant-resolve-variable", [`symbol:   variable ${name}`, `location: ${this.locationText()}`]);
        return { kind: "value", type: ERROR_TYPE };
      }
      if (info.unsupported) { this.unsupported(expression.position, info.unsupported); return { kind: "value", type: ERROR_TYPE }; }
      expression.resolution = { to: "class", classInfo: info };
      return { kind: "class", classInfo: info };
    }
    if (allowTypes && this.lib.packages.has(name)) {
      expression.resolution = { to: "package", name };
      return { kind: "package", name };
    }
    const staticImport = this.staticImportedField(name);
    if (staticImport) {
      expression.resolution = { to: "field", field: staticImport, implicitThis: false };
      this.foldField(expression, staticImport);
      return { kind: "value", type: staticImport.type };
    }
    this.report(expression.position, "cannot find symbol", allowTypes ? "cant-resolve-location" : "cant-resolve-variable",
                [`symbol:   ${allowTypes ? "variable" : "variable"} ${name}`, `location: ${this.locationText()}`]);
    return { kind: "value", type: ERROR_TYPE };
  }

  private staticImportedField(name: string): FieldInfo | undefined {
    for (const imported of this.file.staticImports) {
      if (imported.member !== null && imported.member !== name) continue;
      const field = this.findField(imported.classInfo, name);
      if (field?.isStatic) return field;
    }
    return undefined;
  }

  private locationText(): string {
    return this.currentClass ? describeKind(this.currentClass) : "class ?";
  }

  private foldField(expression: Ast.Expression, field: FieldInfo) {
    if (field.isFinal && field.owner.isUser && field.declaration?.initializer && isConstantType(field.type)) {
      this.attributeFieldInitializer(field);
    }
    if (field.constant !== undefined) expression.constant = field.constant;
  }

  /** A field by simple name from the current class outward - checking static context and inner-class reach. */
  private findFieldInScope(name: string, at: Ast.Position): { field: FieldInfo } | "reported" | null {
    const body = this.body;
    let crossedStatic = !!body?.isStatic;
    for (let walker = this.currentClass; walker; walker = walker.outer ?? null) {
      const field = this.findField(walker, name);
      if (field) {
        if (field.isPrivate && !this.canAccessPrivate(field.owner)) {
          this.report(at, `${name} has private access in ${simpleClassName(field.owner)}`, "private-access");
          return "reported";
        }
        if (!field.isStatic) {
          if (crossedStatic || !body) {
            this.report(at, `non-static variable ${name} cannot be referenced from a static context`, "static-context");
            return "reported";
          }
          if (walker !== this.currentClass) {
            this.unsupported(at, `using the outer object's variables from inside an inner class (${name})`);
            return "reported";
          }
        }
        return { field };
      }
      if (walker.isStaticNested || !walker.isInner) crossedStatic = true;
    }
    return null;
  }

  private canAccessPrivate(owner: ClassInfo): boolean {
    const outermost = (info: ClassInfo | null | undefined) => { let walker = info; while (walker?.outer) walker = walker.outer; return walker; };
    return outermost(owner) === outermost(this.currentClass);
  }

  findField(info: ClassInfo, name: string): FieldInfo | undefined {
    const own = info.fields.get(name);
    if (own) return own;
    for (const parent of directSupertypes(classType(info))) {
      if (parent.tag !== "class") continue;
      const inherited = this.findField(parent.classInfo, name);
      if (inherited) return inherited;
    }
    return undefined;
  }

  private fieldAccessQualifier(expression: Ast.FieldAccess, allowTypes: boolean): Qualifier {
    const target = this.qualifier(expression.target, true);
    const name = expression.name;
    if (target.kind === "package") {
      const qualifiedName = `${target.name}.${name}`;
      const info = this.lib.lookup(qualifiedName);
      if (info && allowTypes) {
        if (info.unsupported) { this.unsupported(expression.position, info.unsupported); return { kind: "value", type: ERROR_TYPE }; }
        expression.resolution = { to: "class", classInfo: info };
        return { kind: "class", classInfo: info };
      }
      if (this.lib.packages.has(qualifiedName) && allowTypes) {
        expression.resolution = { to: "package", name: qualifiedName };
        return { kind: "package", name: qualifiedName };
      }
      if (this.lib.packages.has(target.name) || info) {
        this.report(expression.dotPosition, "cannot find symbol", "cant-resolve-class", [`symbol:   class ${name}`, `location: package ${target.name}`]);
      } else {
        this.report(expression.target.position, `package ${target.name} does not exist`, "package-missing");
      }
      return { kind: "value", type: ERROR_TYPE };
    }
    if (target.kind === "class") {
      const info = target.classInfo;
      const field = this.findField(info, name);
      if (field) {
        if (field.isPrivate && !this.canAccessPrivate(field.owner)) {
          this.report(expression.dotPosition, `${name} has private access in ${simpleClassName(field.owner)}`, "private-access");
          return { kind: "value", type: ERROR_TYPE };
        }
        if (!field.isStatic) {
          this.report(expression.dotPosition, `non-static variable ${name} cannot be referenced from a static context`, "static-context");
          return { kind: "value", type: ERROR_TYPE };
        }
        expression.resolution = { to: "field", field };
        this.foldField(expression, field);
        return { kind: "value", type: field.type };
      }
      const member = this.memberClasses.get(info)?.get(name);
      if (member && allowTypes) {
        expression.resolution = { to: "class", classInfo: member };
        return { kind: "class", classInfo: member };
      }
      if (name === "length" && false) return { kind: "value", type: INT };
      if (!info.isUser && this.lib.unsupportedMethods.get(info)?.has(name)) {
        this.unsupported(expression.dotPosition, `${info.name}.${name}`);
        return { kind: "value", type: ERROR_TYPE };
      }
      // An enum or record the runner can't build has no members to find: the unsupported note already covers it.
      if (this.brokenClasses.has(info)) return { kind: "value", type: ERROR_TYPE };
      this.report(expression.dotPosition, "cannot find symbol", "cant-resolve-variable", [`symbol:   variable ${name}`, `location: ${describeKind(info)}`]);
      return { kind: "value", type: ERROR_TYPE };
    }
    const type = target.type;
    if (type.tag === "error") return { kind: "value", type: ERROR_TYPE };
    if (type.tag === "array") {
      if (name === "length") { expression.resolution = { to: "length" }; return { kind: "value", type: INT }; }
      this.report(expression.dotPosition, "cannot find symbol", "cant-resolve-variable", [`symbol:   variable ${name}`, `location: ${this.valueLocation(expression.target, type)}`]);
      return { kind: "value", type: ERROR_TYPE };
    }
    if (type.tag === "primitive" || type.tag === "null" || type.tag === "void") {
      this.report(expression.dotPosition, `${typeName(type)} cannot be dereferenced`, "dereference");
      return { kind: "value", type: ERROR_TYPE };
    }
    if (type.tag !== "class") return { kind: "value", type: ERROR_TYPE };
    const field = this.findField(type.classInfo, name);
    if (!field) {
      if (this.brokenClasses.has(type.classInfo)) return { kind: "value", type: ERROR_TYPE };
      this.report(expression.dotPosition, "cannot find symbol", "cant-resolve-field", [`symbol:   variable ${name}`, `location: ${this.valueLocation(expression.target, type)}`]);
      return { kind: "value", type: ERROR_TYPE };
    }
    if (field.isPrivate && !this.canAccessPrivate(field.owner)) {
      this.report(expression.dotPosition, `${name} has private access in ${simpleClassName(field.owner)}`, "private-access");
      return { kind: "value", type: ERROR_TYPE };
    }
    expression.resolution = { to: "field", field };
    this.foldField(expression, field);
    return { kind: "value", type: substitute(field.type, substitutionOf(asSuper(type, field.owner) ?? type)) };
  }

  /** "variable d of type Dog" when the target is a named variable, "class Dog" otherwise. */
  private valueLocation(target: Ast.Expression, type: JavaType): string {
    if (target.kind === "Name" && (target.resolution?.to === "local" || target.resolution?.to === "field")) {
      return `variable ${target.name} of type ${typeName(type)}`;
    }
    if (target.kind === "FieldAccess" && target.resolution?.to === "field") return `variable ${target.name} of type ${typeName(type)}`;
    if (type.tag === "class") return describeKind(type.classInfo);
    return `class ${typeName(type)}`;
  }

  /** The target of a `.`: may be a class or a package as well as a value. */
  private qualifier(expression: Ast.Expression, allowTypes: boolean): Qualifier {
    if (expression.kind === "Name") {
      if (expression.name === "super") return { kind: "value", type: this.body?.classInfo.superclass ?? ERROR_TYPE };
      const result = this.nameQualifier(expression, allowTypes);
      if (result.kind === "value") expression.type = result.type;
      return result;
    }
    if (expression.kind === "FieldAccess") {
      const result = this.fieldAccessQualifier(expression, allowTypes);
      if (result.kind === "value") expression.type = result.type;
      return result;
    }
    return { kind: "value", type: this.expression(expression) };
  }

  private arrayAccess(expression: Ast.ArrayAccess): JavaType {
    const arrayType = this.expression(expression.array);
    const indexType = this.expression(expression.index);
    this.indexValue(expression.index, indexType);
    if (arrayType.tag === "error") return ERROR_TYPE;
    if (arrayType.tag !== "array") {
      this.report(expression.position, `array required, but ${typeName(arrayType)} found`, "array-required");
      return ERROR_TYPE;
    }
    return arrayType.element;
  }

  /** An array index or size: anything that promotes to int. */
  private indexValue(expression: Ast.Expression, type: JavaType) {
    if (type.tag === "error") return;
    const plain = primitiveOf(type);
    if (plain && isIntegralPrimitive(plain) && !isPrimitive(plain, "long")) return;
    const result = assignmentConversion(type, INT);
    if (result === true) return;
    this.report(preferredPosition(expression), result === "lossy"
      ? `incompatible types: possible lossy conversion from ${typeName(type)} to int`
      : `incompatible types: ${typeName(type)} cannot be converted to int`, result === "lossy" ? "lossy" : "incompatible");
  }

  // ---- calls -----------------------------------------------------------------------------------------
  private call(call: Ast.MethodCall): JavaType {
    const body = this.body;
    const argumentTypes = call.args.map((argument) => {
      if (argument.kind === "ArrayInit") {
        this.report(argument.position, "illegal start of expression", "illegal-start-of-expression");
        return ERROR_TYPE;
      }
      return this.expression(argument);
    });
    for (const [index, type] of argumentTypes.entries()) {
      if (type.tag === "void") {
        this.report(preferredPosition(call.args[index]), "'void' type not allowed here", "void-not-allowed");
        return ERROR_TYPE;
      }
    }
    let receiverType: JavaType;
    let candidates: Candidate[];
    let staticOnly = false;
    let siteClass: ClassInfo | null = null;       // for unqualified calls: the class whose method it is
    let locationText: string;
    const namePosition = call.target ? call.dotPosition ?? call.namePosition : call.namePosition;
    if (!call.target) {
      for (let walker = this.currentClass; walker; walker = walker.outer ?? null) {
        const found = this.methodsNamed(classType(walker), call.name);
        if (found.length) { siteClass = walker; candidates = found; break; }
      }
      locationText = this.locationText();
      if (!siteClass) {
        const imported = this.staticImportedMethods(call.name);
        if (imported.length) {
          candidates = imported;
          staticOnly = true;
          receiverType = classType(imported[0].method.owner);
        } else {
          this.report(call.namePosition, "cannot find symbol", "cant-resolve-method",
                      [`symbol:   method ${call.name}(${argumentTypes.map(typeName).join(",")})`, `location: ${locationText}`]);
          return ERROR_TYPE;
        }
      } else receiverType = classType(siteClass);
    } else if (call.superCall) {
      if (!body || body.isStatic) {
        this.report(call.position, "non-static variable super cannot be referenced from a static context", "static-context");
        return ERROR_TYPE;
      }
      receiverType = body.classInfo.superclass ?? classType(this.lib.object);
      locationText = describeKind(receiverType.tag === "class" ? receiverType.classInfo : this.lib.object);
    } else {
      const target = this.qualifier(call.target, true);
      if (target.kind === "package") {
        this.report(call.target.position, `package ${target.name} does not exist`, "package-missing");
        return ERROR_TYPE;
      }
      if (target.kind === "class") {
        receiverType = classType(target.classInfo);
        staticOnly = true;
        call.staticTarget = true;
        locationText = describeKind(target.classInfo);
      } else {
        receiverType = target.type;
        if (receiverType.tag === "error") return ERROR_TYPE;
        if (receiverType.tag === "primitive" || receiverType.tag === "null" || receiverType.tag === "void") {
          this.report(call.dotPosition ?? call.namePosition, `${typeName(receiverType)} cannot be dereferenced`, "dereference");
          return ERROR_TYPE;
        }
        locationText = this.valueLocation(call.target, receiverType);
        if (receiverType.tag === "array") {
          if (call.name === "clone" && !call.args.length) {
            call.method = this.arrayCloneMethod();
            call.receiverType = receiverType;
            return receiverType;
          }
          receiverType = classType(this.lib.object);
        }
      }
    }
    candidates ??= this.methodsNamed(receiverType, call.name);
    if (!candidates.length) {
      const owner = receiverType.tag === "class" ? receiverType.classInfo : null;
      if (owner && this.unsupportedMethodOf(owner, call.name)) {
        this.unsupported(namePosition, `the ${this.unsupportedMethodOf(owner, call.name)!.name}.${call.name}() method`);
        return ERROR_TYPE;
      }
      if (owner && this.brokenClasses.has(owner)) return ERROR_TYPE;
      this.report(namePosition, "cannot find symbol", "cant-resolve-method",
                  [`symbol:   method ${call.name}(${argumentTypes.map(typeName).join(",")})`, `location: ${locationText!}`]);
      return ERROR_TYPE;
    }
    const selection = this.selectMethod(candidates, call.args, argumentTypes, call.name, namePosition, false);
    if (!selection) return ERROR_TYPE;
    const method = selection.method;
    call.method = method;
    call.varargsCall = selection.varargsCall;
    call.receiverType = receiverType!;
    (call as Ast.MethodCall & { parameterTypes?: JavaType[] }).parameterTypes = selection.parameters;
    if (method.isPrivate && !this.canAccessPrivate(method.owner)) {
      this.report(namePosition, `${methodSignatureText(method)} has private access in ${simpleClassName(method.owner)}`, "private-access");
      return ERROR_TYPE;
    }
    if (call.superCall && method.isAbstract) {
      this.report(namePosition, `abstract method ${methodSignatureText(method)} in ${simpleClassName(method.owner)} cannot be accessed directly`, "abstract-super");
    }
    if (!method.isStatic) {
      if (staticOnly) {
        this.report(namePosition, `non-static method ${methodSignatureText(method)} cannot be referenced from a static context`, "static-context");
        return ERROR_TYPE;
      }
      if (!call.target) {
        let crossedStatic = !!body?.isStatic || !body;
        for (let walker = this.currentClass; walker && walker !== siteClass; walker = walker.outer ?? null) {
          if (!walker.isInner) crossedStatic = true;
        }
        if (crossedStatic) {
          this.report(call.namePosition, `non-static method ${methodSignatureText(method)} cannot be referenced from a static context`, "static-context");
          return ERROR_TYPE;
        }
        if (siteClass !== this.currentClass) {
          this.unsupported(call.namePosition, `calling the outer object's methods from inside an inner class (${call.name})`);
          return ERROR_TYPE;
        }
      }
    }
    if (method.owner.isUser && method.owner.kind === "interface" && method.isStatic && call.target && !call.staticTarget) {
      this.report(namePosition, "illegal static interface method call", "static-interface-call");
    }
    body?.callees.add(method);
    const returnType = this.returnTypeOf(selection, receiverType!);
    return returnType;
  }

  private arrayCloneMethod(): MethodInfo {
    return {
      name: "clone", owner: this.lib.object, parameters: [], parameterNames: [], varargs: false, returnType: classType(this.lib.object),
      isStatic: false, isAbstract: false, isPrivate: false, isConstructor: false, typeParameters: [], throws: [],
      jsName: "", runtime: "Array_clone", blocking: false,
    };
  }

  private unsupportedMethodOf(info: ClassInfo, name: string): ClassInfo | null {
    for (const type of [classType(info), ...this.allSupertypes(classType(info))]) {
      if (type.tag === "class" && this.lib.unsupportedMethods.get(type.classInfo)?.has(name)) return type.classInfo;
    }
    return null;
  }

  private staticImportedMethods(name: string): Candidate[] {
    const found: Candidate[] = [];
    for (const imported of this.file.staticImports) {
      if (imported.member !== null && imported.member !== name) continue;
      for (const candidate of this.methodsNamed(classType(imported.classInfo), name)) if (candidate.method.isStatic) found.push(candidate);
    }
    return found;
  }

  /** Every method called `name` a value of `type` has, overridden ones left out. */
  private methodsNamed(type: JavaType, name: string): Candidate[] {
    const found: Candidate[] = [];
    const visit = (current: JavaType) => {
      if (current.tag !== "class") return;
      const substitution = substitutionOf(current);
      for (const method of current.classInfo.methods) {
        if (method.name !== name) continue;
        const parameters = method.parameters.map((parameter) => substitute(parameter, substitution));
        const hidden = found.some((existing) => existing.method.parameters.length === parameters.length
          && existing.method.parameters.every((parameter, index) => sameType(substitute(parameter, existing.substitution), parameters[index])));
        if (!hidden) found.push({ method, substitution });
      }
    };
    visit(type);
    for (const parent of this.allSupertypes(type)) visit(parent);
    if (type.tag === "class" && type.classInfo.kind === "interface") visit(classType(this.lib.object));
    return found;
  }

  private returnTypeOf(selection: Selection, receiverType: JavaType): JavaType {
    const method = selection.method;
    if (method.name === "getClass") return ERROR_TYPE;
    void receiverType;
    return this.substituteLenient(method.returnType, selection.substitution);
  }

  /** Substitute, turning a generic class whose argument could not be inferred into its raw form. */
  private substituteLenient(type: JavaType, substitution: Substitution): JavaType {
    switch (type.tag) {
      case "typeVariable": return substitution.get(type.name) ?? classType(this.lib.object);
      case "array": return arrayOf(this.substituteLenient(type.element, substitution));
      case "class": {
        if (!type.typeArguments.length) return type;
        const unbound = type.typeArguments.some((argument) => argument.tag === "typeVariable" && !substitution.has(argument.name));
        if (unbound) return classType(type.classInfo);
        return classType(type.classInfo, type.typeArguments.map((argument) => this.substituteLenient(argument, substitution)));
      }
      default: return type;
    }
  }

  private selectConstructor(type: JavaType, args: Ast.Expression[], argumentTypes: JavaType[], at: Ast.Position, explicit: boolean): Selection | null {
    if (type.tag !== "class") return null;
    const info = type.classInfo;
    const substitution = substitutionOf(type);
    const candidates = info.constructors.map((method) => ({ method, substitution }));
    if (!candidates.length) {
      this.unsupported(at, `creating a ${info.name} with new`);
      return null;
    }
    void explicit;
    const selection = this.selectMethod(candidates, args, argumentTypes, info.name, at, true);
    if (selection && selection.method.isPrivate && !this.canAccessPrivate(info)) {
      this.report(at, `${methodSignatureText(selection.method)} has private access in ${simpleClassName(info)}`, "private-access");
      return null;
    }
    return selection;
  }

  // ---- overload resolution (JLS 15.12.2) ------------------------------------------------------------
  private selectMethod(candidates: Candidate[], args: Ast.Expression[], argumentTypes: JavaType[], name: string,
                       at: Ast.Position, constructor: boolean): Selection | null {
    if (argumentTypes.some((type) => type.tag === "error")) {
      // Something already failed inside an argument: pick any plausible method quietly.
      const plausible = candidates.find((candidate) => candidate.method.parameters.length === argumentTypes.length) ?? candidates[0];
      if (!plausible) return null;
      const inferred = this.inferTypeArguments(plausible, argumentTypes, false);
      return { method: plausible.method, substitution: inferred, varargsCall: false,
               parameters: plausible.method.parameters.map((parameter) => this.substituteLenient(parameter, inferred)) };
    }
    for (const phase of [1, 2, 3] as const) {
      const applicable: Selection[] = [];
      for (const candidate of candidates) {
        const selection = this.applicable(candidate, args, argumentTypes, phase);
        if (selection) applicable.push(selection);
      }
      if (!applicable.length) continue;
      const best = this.mostSpecific(applicable, argumentTypes.length);
      if (best.length > 1) {
        const [first, second] = best;
        this.report(at, `reference to ${name} is ambiguous`, "ambiguous", [
          `both ${this.describeMember(first.method)} and ${this.describeMember(second.method)} match`,
        ]);
        return null;
      }
      return best[0];
    }
    // Nothing applies: say why, the way javac does, unless the class is one the runner could not build.
    if (candidates.some((candidate) => this.brokenClasses.has(candidate.method.owner))) return null;
    if (candidates.length === 1) {
      const method = candidates[0].method;
      const parameters = method.parameters.map((parameter) => this.substituteLenient(parameter, candidates[0].substitution));
      const head = constructor
        ? `constructor ${method.owner.name} in ${describeKind(method.owner)} cannot be applied to given types;`
        : `method ${method.name} in ${describeKind(method.owner)} cannot be applied to given types;`;
      this.report(at, head, "cant-apply", [
        `required: ${parameters.length ? parameterText(method, parameters) : "no arguments"}`,
        `found:    ${argumentTypesText(argumentTypes)}`,
        `reason: ${this.mismatchReason(method, parameters, args, argumentTypes)}`,
      ]);
      return null;
    }
    const details: string[] = [];
    for (const candidate of candidates) {
      const method = candidate.method;
      const parameters = method.parameters.map((parameter) => this.substituteLenient(parameter, candidate.substitution));
      details.push(`    ${constructor ? "constructor" : "method"} ${simpleClassName(method.owner)}.${constructor ? method.owner.name : method.name}(${parameterText(method, parameters)}) is not applicable`);
      details.push(`      (${this.mismatchReason(method, parameters, args, argumentTypes)})`);
    }
    this.report(at, `no suitable ${constructor ? "constructor" : "method"} found for ${name}(${argumentTypes.map(typeName).join(",")})`, "no-suitable", details.map((line) => line.slice(2)));
    return null;
  }

  private describeMember(method: MethodInfo): string {
    return `${method.isConstructor ? "constructor" : "method"} ${methodSignatureText(method)} in ${simpleClassName(method.owner)}`;
  }

  private mismatchReason(method: MethodInfo, parameters: JavaType[], args: Ast.Expression[], argumentTypes: JavaType[]): string {
    const fixed = method.varargs ? parameters.length - 1 : parameters.length;
    if (method.varargs ? argumentTypes.length < fixed : argumentTypes.length !== parameters.length) {
      return "actual and formal argument lists differ in length";
    }
    for (let index = 0; index < argumentTypes.length; index++) {
      let parameter = parameters[Math.min(index, parameters.length - 1)];
      if (method.varargs && index >= fixed && parameter.tag === "array" && !(argumentTypes.length === parameters.length && argumentTypes[index].tag === "array")) parameter = parameter.element;
      if (parameter.tag === "typeVariable") continue;
      const result = assignmentConversion(argumentTypes[index], parameter, undefined);
      if (result !== true) {
        return result === "lossy"
          ? `argument mismatch; possible lossy conversion from ${typeName(argumentTypes[index])} to ${typeName(parameter)}`
          : `argument mismatch; ${typeName(argumentTypes[index])} cannot be converted to ${typeName(parameter)}`;
      }
      void args;
    }
    return "argument mismatch";
  }

  /** Can this candidate take these arguments in this phase? (1: no boxing, 2: boxing, 3: varargs) */
  private applicable(candidate: Candidate, args: Ast.Expression[], argumentTypes: JavaType[], phase: 1 | 2 | 3): Selection | null {
    const method = candidate.method;
    const count = method.parameters.length;
    if (phase < 3 && argumentTypes.length !== count) return null;
    if (phase === 3 && (!method.varargs || argumentTypes.length < count - 1)) return null;
    const substitution = this.inferTypeArguments(candidate, argumentTypes, phase === 3);
    const parameters = method.parameters.map((parameter) => this.substituteLenient(parameter, substitution));
    const fits = (argumentType: JavaType, parameter: JavaType) => {
      if (parameter.tag === "error") return true;
      if (phase === 1) {
        if (argumentType.tag === "primitive" || parameter.tag === "primitive") {
          return argumentType.tag === "primitive" && parameter.tag === "primitive" && wideningPrimitive(argumentType, parameter);
        }
        return isSubtype(argumentType, parameter);
      }
      return assignmentConversion(argumentType, parameter, undefined) === true;
    };
    for (let index = 0; index < argumentTypes.length; index++) {
      let parameter: JavaType;
      if (phase === 3 && index >= count - 1) {
        const last = parameters[count - 1];
        parameter = last.tag === "array" ? last.element : last;
      } else parameter = parameters[index];
      if (!fits(argumentTypes[index], parameter)) return null;
    }
    void args;
    return { method, substitution, varargsCall: phase === 3, parameters };
  }

  private mostSpecific(applicable: Selection[], argumentCount: number): Selection[] {
    const parameterAt = (selection: Selection, index: number): JavaType => {
      const parameters = selection.parameters;
      if (selection.varargsCall && index >= parameters.length - 1) {
        const last = parameters[parameters.length - 1];
        return last.tag === "array" ? last.element : last;
      }
      return parameters[index];
    };
    const moreSpecific = (first: Selection, second: Selection) => {
      const count = first.varargsCall ? Math.max(argumentCount, first.parameters.length, second.parameters.length) : first.parameters.length;
      for (let index = 0; index < count; index++) {
        const one = parameterAt(first, index), other = parameterAt(second, index);
        if (!one || !other) continue;
        if (one.tag === "primitive" && other.tag === "primitive") { if (!wideningPrimitive(one, other)) return false; }
        else if (one.tag === "primitive" || other.tag === "primitive") {
          if (!(one.tag === "primitive" ? isSubtype(boxedType(one), other) : false)) return false;
        } else if (!isSubtype(one, other)) return false;
      }
      return true;
    };
    let best = applicable.filter((candidate) => applicable.every((other) => other === candidate || moreSpecific(candidate, other)));
    if (!best.length) {
      // Two with the same signature (an abstract one and its implementation): prefer the concrete one.
      best = applicable.filter((candidate) => applicable.every((other) => other === candidate || moreSpecific(candidate, other) || moreSpecific(other, candidate)));
      if (best.length > 1) {
        const concrete = best.filter((candidate) => !candidate.method.isAbstract);
        if (concrete.length) best = concrete;
      }
      return best.length ? best : applicable.slice(0, 2);
    }
    if (best.length > 1) {
      const concrete = best.filter((candidate) => !candidate.method.isAbstract);
      const pool = concrete.length ? concrete : best;
      // Overloads with identical parameter lists found along different paths are the same method.
      if (pool.every((candidate) => candidate.parameters.every((parameter, index) => sameType(parameter, pool[0].parameters[index])))) return [pool[0]];
      return pool;
    }
    return best;
  }

  /** Bind a generic method's type variables (List.of's T, Collections.max's T) from its arguments. */
  private inferTypeArguments(candidate: Candidate, argumentTypes: JavaType[], varargs: boolean): Substitution {
    const substitution: Substitution = new Map(candidate.substitution);
    const method = candidate.method;
    if (!method.typeParameters.length) return substitution;
    const bindings: Substitution = new Map();
    const unify = (parameter: JavaType, argument: JavaType) => {
      if (parameter.tag === "typeVariable" && method.typeParameters.includes(parameter.name)) {
        if (argument.tag === "null" || argument.tag === "error") return;
        const boxed = boxedType(argument);
        const existing = bindings.get(parameter.name);
        if (!existing || isSubtype(existing, boxed)) bindings.set(parameter.name, boxed);
        else if (!isSubtype(boxed, existing)) bindings.set(parameter.name, classType(this.lib.object));
        return;
      }
      if (parameter.tag === "array" && argument.tag === "array") return unify(parameter.element, argument.element);
      if (parameter.tag === "class" && argument.tag === "class" && parameter.typeArguments.length) {
        const viewed = asSuper(argument, parameter.classInfo);
        if (viewed?.tag === "class" && viewed.typeArguments.length === parameter.typeArguments.length) {
          parameter.typeArguments.forEach((inner, index) => unify(inner, viewed.typeArguments[index]));
        }
      }
    };
    const count = method.parameters.length;
    argumentTypes.forEach((argument, index) => {
      let parameter = method.parameters[Math.min(index, count - 1)];
      if (!parameter) return;
      if (varargs && index >= count - 1 && parameter.tag === "array") parameter = parameter.element;
      unify(parameter, argument);
    });
    for (const [name, type] of bindings) substitution.set(name, type);
    return substitution;
  }

  // ---- object and array creation ------------------------------------------------------------------------
  private newObject(expression: Ast.NewObject, expected: JavaType | undefined): JavaType {
    const node = expression.typeNode;
    const diamond = node.typeArguments !== null && node.typeArguments.length === 0;
    let type = this.resolveType(diamond ? { ...node, typeArguments: null } : node);
    node.resolved = type;
    const argumentTypes = expression.args.map((argument) => this.expression(argument));
    if (type.tag === "error") return ERROR_TYPE;
    if (type.tag !== "class") {
      this.report(node.position, "unexpected type", "unexpected-type", ["required: class", `found:    ${typeName(type)}`]);
      return ERROR_TYPE;
    }
    const info = type.classInfo;
    if (expression.hasBody) {
      this.unsupported(expression.position, "anonymous classes (new " + info.name + "() { ... })");
      return ERROR_TYPE;
    }
    if (info.typeParameters.length && diamond) {
      type = this.diamondType(info, expected);
      node.resolved = type;
    } else if (!info.typeParameters.length && diamond) {
      this.report(node.position, `cannot infer type arguments for ${simpleClassName(info)}`, "diamond-not-generic",
                  [`reason: cannot use '<>' with non-generic class ${simpleClassName(info)}`]);
      return ERROR_TYPE;
    }
    if (info.isAbstract) {
      this.report(expression.position, `${simpleClassName(info)} is abstract; cannot be instantiated`, "abstract-instantiation");
      return ERROR_TYPE;
    }
    if (info.isInner) {
      let reachable = !!this.body && !this.body.isStatic;
      if (reachable) {
        let walker: ClassInfo | null = this.currentClass;
        while (walker && walker !== info.outer) { if (!walker.isInner) { reachable = false; break; } walker = walker.outer ?? null; }
        if (!walker) reachable = false;
        else if (walker !== this.currentClass) {
          this.unsupported(expression.position, `creating an inner class object from inside another inner class`);
          return ERROR_TYPE;
        }
      }
      if (!reachable) {
        this.report(expression.position, "non-static variable this cannot be referenced from a static context", "static-context-inner");
        return ERROR_TYPE;
      }
    }
    for (const [index, argumentType] of argumentTypes.entries()) {
      if (argumentType.tag === "void") {
        this.report(preferredPosition(expression.args[index]), "'void' type not allowed here", "void-not-allowed");
        return ERROR_TYPE;
      }
    }
    const selection = this.selectConstructor(type, expression.args, argumentTypes, expression.position, false);
    if (!selection) return type.tag === "class" ? type : ERROR_TYPE;
    expression.constructorInfo = selection.method;
    expression.varargsCall = selection.varargsCall;
    (expression as Ast.NewObject & { parameterTypes?: JavaType[] }).parameterTypes = selection.parameters;
    this.body?.callees.add(selection.method);
    return type;
  }

  /** new ArrayList<>() takes its type arguments from where it is going. */
  private diamondType(info: ClassInfo, expected: JavaType | undefined): JavaType {
    if (expected?.tag === "class" && expected.typeArguments.length) {
      const generic = classType(info, info.typeParameters.map((name) => ({ tag: "typeVariable", name }) as JavaType));
      const viewed = asSuper(generic, expected.classInfo);
      if (viewed?.tag === "class") {
        const bindings = new Map<string, JavaType>();
        viewed.typeArguments.forEach((argument, index) => {
          if (argument.tag === "typeVariable") bindings.set(argument.name, expected.typeArguments[index]);
        });
        if (info.typeParameters.every((name) => bindings.has(name))) return classType(info, info.typeParameters.map((name) => bindings.get(name)!));
      }
    }
    return classType(info);
  }

  private newArray(expression: Ast.NewArray): JavaType {
    let type = this.resolveType(expression.elementType);
    if (type.tag === "error") {
      for (const size of expression.dimensionExpressions) this.expression(size);
      return ERROR_TYPE;
    }
    if (type.tag === "class" && expression.elementType.typeArguments?.length) {
      this.report(expression.position, "generic array creation", "generic-array");
      return ERROR_TYPE;
    }
    for (const size of expression.dimensionExpressions) this.indexValue(size, this.expression(size));
    const dimensions = expression.dimensionExpressions.length + expression.extraDimensions;
    for (let dimension = 0; dimension < dimensions; dimension++) type = arrayOf(type);
    if (expression.initializer) this.arrayInitializer(expression.initializer, type);
    return type;
  }

  private arrayInitializer(initializer: Ast.ArrayInitializer, type: JavaType) {
    initializer.type = type;
    if (type.tag === "error") { for (const element of initializer.elements) if (element.kind !== "ArrayInit") this.expression(element); return; }
    if (type.tag !== "array") {
      this.report(initializer.position, `illegal initializer for ${typeName(type)}`, "illegal-initializer");
      return;
    }
    for (const element of initializer.elements) {
      if (element.kind === "ArrayInit") this.arrayInitializer(element, type.element);
      else this.convert(element, this.expression(element, type.element), type.element);
    }
  }

  // ---- operators ----------------------------------------------------------------------------------------
  private unary(expression: Ast.Unary): JavaType {
    if (expression.operator === "++" || expression.operator === "--") return this.increment(expression, expression.operand, expression.operator);
    const type = this.expression(expression.operand);
    if (type.tag === "error") return ERROR_TYPE;
    const plain = primitiveOf(type);
    const bad = () => {
      this.report(expression.position, `bad operand type ${typeName(type)} for unary operator '${expression.operator}'`, "bad-operand");
      return ERROR_TYPE;
    };
    const constant = expression.operand.constant;
    if (expression.operator === "!") {
      if (!plain || !isPrimitive(plain, "boolean")) return bad();
      if (constant !== undefined) expression.constant = !constant;
      return BOOLEAN;
    }
    if (!plain || !isNumericPrimitive(plain)) return bad();
    const promoted = unaryNumericPromotion(plain);
    if (expression.operator === "~" && !isIntegralPrimitive(promoted)) return bad();
    if (constant !== undefined) {
      const value = convertConstant(constant, plain, promoted)!;
      if (expression.operator === "+") expression.constant = value;
      else if (expression.operator === "-") {
        expression.constant = typeof value === "bigint" ? BigInt.asIntN(64, -value)
          : isPrimitive(promoted, "int") ? toInt32(-(value as number)) : isPrimitive(promoted, "float") ? Math.fround(-(value as number)) : -(value as number);
      } else if (expression.operator === "~") {
        expression.constant = typeof value === "bigint" ? BigInt.asIntN(64, ~value) : ~(value as number);
      }
    }
    return promoted;
  }

  /** Is this expression something you can assign to? */
  private assignable(target: Ast.Expression, operatorText: string): boolean {
    if (target.kind === "Name" && (target.resolution?.to === "local" || target.resolution?.to === "field")) return true;
    if (target.kind === "FieldAccess" && (target.resolution?.to === "field" || target.resolution?.to === "length")) {
      if (target.resolution.to === "length") {
        this.report(target.dotPosition, "cannot assign a value to final variable length", "final-assign");
        return false;
      }
      return true;
    }
    if (target.kind === "ArrayAccess") return true;
    if (target.type?.tag === "error") return false;
    this.report(target.position, "unexpected type", "not-a-variable", ["required: variable", "found:    value"]);
    void operatorText;
    return false;
  }

  /** Assigning a final variable is legal only as a blank final's first assignment - flow checks "first". */
  private checkFinalAssignment(target: Ast.Expression) {
    const body = this.body;
    if (target.kind === "Name" && target.resolution?.to === "local") {
      const variable = target.resolution.variable;
      if (variable.isCatchParameter) variable.reassigned = true;
      if (variable.isFinal && (variable.isParameter || variable.constant !== undefined || this.hasInitializer(variable))) {
        this.report(target.position, `cannot assign a value to final variable ${variable.name}`, "final-assign");
      }
      return;
    }
    const field = target.kind === "Name" && target.resolution?.to === "field" ? target.resolution.field
      : target.kind === "FieldAccess" && target.resolution?.to === "field" ? target.resolution.field : null;
    if (!field || !field.isFinal) return;
    const blankInOwnInitializer = !field.declaration?.initializer && body && body.classInfo === field.owner
      && ((field.isStatic && body.isStatic && !body.method) || (!field.isStatic && !body.isStatic && (body.isConstructor || !body.method)))
      && (target.kind === "Name" || (target.kind === "FieldAccess" && target.target.kind === "This"));
    if (!blankInOwnInitializer) {
      const at = target.kind === "FieldAccess" ? target.dotPosition : target.position;
      this.report(at, `cannot assign a value to final variable ${field.name}`, "final-assign");
    }
  }

  private hasInitializer(variable: LocalVariable): boolean {
    return (variable as LocalVariable & { initialized?: boolean }).initialized === true;
  }

  private increment(expression: Ast.Unary | Ast.Postfix, operand: Ast.Expression, operator: "++" | "--"): JavaType {
    const type = this.expression(operand);
    if (type.tag === "error") return ERROR_TYPE;
    if (!this.assignable(operand, operator)) return ERROR_TYPE;
    const plain = primitiveOf(type);
    if (!plain || !isNumericPrimitive(plain)) {
      this.report(expression.position, `bad operand type ${typeName(type)} for unary operator '${operator}'`, "bad-operand");
      return ERROR_TYPE;
    }
    this.checkFinalAssignment(operand);
    return type;
  }

  private binary(expression: Ast.Binary): JavaType {
    const operator = expression.operator;
    const leftType = this.expression(expression.left);
    const rightType = this.expression(expression.right);
    if (leftType.tag === "error" || rightType.tag === "error") return ERROR_TYPE;
    const bad = () => {
      this.report(expression.operatorPosition, `bad operand types for binary operator '${operator}'`, "bad-operands",
                  [`first type:  ${typeName(leftType)}`, `second type: ${typeName(rightType)}`]);
      return ERROR_TYPE;
    };
    if (leftType.tag === "void" || rightType.tag === "void") {
      this.report(preferredPosition(leftType.tag === "void" ? expression.left : expression.right), "'void' type not allowed here", "void-not-allowed");
      return ERROR_TYPE;
    }
    const leftPlain = primitiveOf(leftType), rightPlain = primitiveOf(rightType);
    const leftConstant = expression.left.constant, rightConstant = expression.right.constant;
    const bothConstant = leftConstant !== undefined && rightConstant !== undefined;
    switch (operator) {
      case "+":
        if (isString(leftType) || isString(rightType)) {
          if (bothConstant) expression.constant = constantToText(leftConstant!, leftType) + constantToText(rightConstant!, rightType);
          return classType(this.lib.string);
        }
      // falls through
      case "-": case "*": case "/": case "%": {
        if (!leftPlain || !rightPlain || !isNumericPrimitive(leftPlain) || !isNumericPrimitive(rightPlain)) return bad();
        const promoted = binaryNumericPromotion(leftPlain, rightPlain);
        expression.operandType = promoted;
        if (bothConstant && leftType.tag === "primitive" && rightType.tag === "primitive") {
          expression.constant = foldArithmetic(operator, convertConstant(leftConstant!, leftPlain, promoted)!, convertConstant(rightConstant!, rightPlain, promoted)!, promoted);
        }
        return promoted;
      }
      case "<<": case ">>": case ">>>": {
        if (!leftPlain || !rightPlain || !isIntegralPrimitive(leftPlain) || !isIntegralPrimitive(rightPlain)) return bad();
        const promoted = unaryNumericPromotion(leftPlain);
        expression.operandType = promoted;
        if (bothConstant && leftType.tag === "primitive" && rightType.tag === "primitive") {
          const distance = Number(typeof rightConstant === "bigint" ? rightConstant : BigInt(rightConstant as number));
          const value = convertConstant(leftConstant!, leftPlain, promoted)!;
          expression.constant = foldShift(operator, value, distance, promoted);
        }
        return promoted;
      }
      case "<": case ">": case "<=": case ">=": {
        if (!leftPlain || !rightPlain || !isNumericPrimitive(leftPlain) || !isNumericPrimitive(rightPlain)) return bad();
        const promoted = binaryNumericPromotion(leftPlain, rightPlain);
        expression.operandType = promoted;
        if (bothConstant && leftType.tag === "primitive" && rightType.tag === "primitive") {
          const left = convertConstant(leftConstant!, leftPlain, promoted)!, right = convertConstant(rightConstant!, rightPlain, promoted)!;
          expression.constant = operator === "<" ? left < right : operator === ">" ? left > right : operator === "<=" ? left <= right : left >= right;
        }
        return BOOLEAN;
      }
      case "==": case "!=": {
        const eitherPrimitive = leftType.tag === "primitive" || rightType.tag === "primitive";
        if (eitherPrimitive) {
          if (leftPlain && rightPlain && isNumericPrimitive(leftPlain) && isNumericPrimitive(rightPlain)) {
            expression.operandType = binaryNumericPromotion(leftPlain, rightPlain);
          } else if (leftPlain && rightPlain && isPrimitive(leftPlain, "boolean") && isPrimitive(rightPlain, "boolean")) {
            expression.operandType = BOOLEAN;
          } else return bad();
          if (bothConstant && leftType.tag === "primitive" && rightType.tag === "primitive") {
            const operandType = expression.operandType;
            const left = convertConstant(leftConstant!, leftPlain, operandType)!, right = convertConstant(rightConstant!, rightPlain, operandType)!;
            expression.constant = (left === right) === (operator === "==");
          }
          return BOOLEAN;
        }
        if (!castAllowed(leftType, rightType) && !castAllowed(rightType, leftType)) {
          this.report(expression.operatorPosition, `incomparable types: ${typeName(leftType)} and ${typeName(rightType)}`, "incomparable");
          return ERROR_TYPE;
        }
        expression.operandType = classType(this.lib.object);
        if (bothConstant && isString(leftType) && isString(rightType)) expression.constant = (leftConstant === rightConstant) === (operator === "==");
        return BOOLEAN;
      }
      case "&": case "|": case "^": {
        if (leftPlain && rightPlain && isPrimitive(leftPlain, "boolean") && isPrimitive(rightPlain, "boolean")) {
          expression.operandType = BOOLEAN;
          if (bothConstant) {
            const left = leftConstant as boolean, right = rightConstant as boolean;
            expression.constant = operator === "&" ? left && right : operator === "|" ? left || right : left !== right;
          }
          return BOOLEAN;
        }
        if (!leftPlain || !rightPlain || !isIntegralPrimitive(leftPlain) || !isIntegralPrimitive(rightPlain)) return bad();
        const promoted = binaryNumericPromotion(leftPlain, rightPlain);
        expression.operandType = promoted;
        if (bothConstant && leftType.tag === "primitive" && rightType.tag === "primitive") {
          const left = convertConstant(leftConstant!, leftPlain, promoted)!, right = convertConstant(rightConstant!, rightPlain, promoted)!;
          expression.constant = foldBitwise(operator, left, right);
        }
        return promoted;
      }
      case "&&": case "||": {
        if (!leftPlain || !rightPlain || !isPrimitive(leftPlain, "boolean") || !isPrimitive(rightPlain, "boolean")) return bad();
        expression.operandType = BOOLEAN;
        if (bothConstant) expression.constant = operator === "&&" ? (leftConstant as boolean) && (rightConstant as boolean) : (leftConstant as boolean) || (rightConstant as boolean);
        return BOOLEAN;
      }
    }
    return bad();
  }

  private assignment(expression: Ast.Assignment): JavaType {
    const target = expression.target;
    const targetType = this.expression(target);
    // A local's own initializer state is flow's business; assignment itself is fine.
    if (targetType.tag === "error") { this.expression(expression.value); return ERROR_TYPE; }
    if (!this.assignable(target, expression.operator)) { this.expression(expression.value); return ERROR_TYPE; }
    this.checkFinalAssignment(target);
    if (expression.operator === "=") {
      if (expression.value.kind === "ArrayInit") {
        this.report(expression.value.position, "illegal start of expression", "illegal-start-of-expression");
        return ERROR_TYPE;
      }
      const valueType = this.expression(expression.value, targetType);
      this.convert(expression.value, valueType, targetType);
      return targetType;
    }
    const valueType = this.expression(expression.value);
    if (valueType.tag === "error") return targetType;
    const operator = expression.operator.slice(0, -1);
    if (operator === "+" && isString(targetType)) {
      if (valueType.tag === "void") this.report(preferredPosition(expression.value), "'void' type not allowed here", "void-not-allowed");
      return targetType;
    }
    const targetPlain = primitiveOf(targetType), valuePlain = primitiveOf(valueType);
    const bad = () => {
      this.report(expression.operatorPosition, `bad operand types for binary operator '${operator}'`, "bad-operands",
                  [`first type:  ${typeName(targetType)}`, `second type: ${typeName(valueType)}`]);
      return ERROR_TYPE;
    };
    if (!targetPlain || !valuePlain) return bad();
    if (["&", "|", "^"].includes(operator) && isPrimitive(targetPlain, "boolean") && isPrimitive(valuePlain, "boolean")) {
      expression.operandType = BOOLEAN;
      return targetType;
    }
    if (!isNumericPrimitive(targetPlain) || !isNumericPrimitive(valuePlain)) return bad();
    if (["<<", ">>", ">>>"].includes(operator)) {
      if (!isIntegralPrimitive(targetPlain) || !isIntegralPrimitive(valuePlain)) return bad();
      expression.operandType = unaryNumericPromotion(targetPlain);
      return targetType;
    }
    if (["&", "|", "^"].includes(operator) && (!isIntegralPrimitive(targetPlain) || !isIntegralPrimitive(valuePlain))) return bad();
    expression.operandType = binaryNumericPromotion(targetPlain, valuePlain);
    if (targetType.tag === "class" && !sameType(expression.operandType, targetPlain) && !wideningPrimitive(expression.operandType, targetPlain)) {
      // Integer x; x += 1.5  - the result would have to be boxed from a double
      this.report(expression.operatorPosition, `incompatible types: possible lossy conversion from ${typeName(expression.operandType)} to ${typeName(targetPlain)}`, "lossy");
    }
    return targetType;
  }

  private conditional(expression: Ast.Conditional, expected: JavaType | undefined): JavaType {
    this.condition(expression.condition);
    const whenTrue = this.expression(expression.whenTrue, expected);
    const whenFalse = this.expression(expression.whenFalse, expected);
    if (whenTrue.tag === "error" || whenFalse.tag === "error") return ERROR_TYPE;
    if (whenTrue.tag === "void" || whenFalse.tag === "void") {
      this.report(preferredPosition(whenTrue.tag === "void" ? expression.whenTrue : expression.whenFalse), "'void' type not allowed here", "void-not-allowed");
      return ERROR_TYPE;
    }
    let type: JavaType;
    const truePlain = primitiveOf(whenTrue), falsePlain = primitiveOf(whenFalse);
    if (sameType(whenTrue, whenFalse) && whenTrue.tag !== "null") type = whenTrue;
    else if (truePlain && falsePlain && isPrimitive(truePlain, "boolean") && isPrimitive(falsePlain, "boolean")) type = BOOLEAN;
    else if (truePlain && falsePlain && isNumericPrimitive(truePlain) && isNumericPrimitive(falsePlain)) {
      const narrow = (one: JavaType, constantSide: Ast.Expression, other: JavaType) =>
        one.tag === "primitive" && ["byte", "short", "char"].includes(one.name) && isPrimitive(other, "int")
        && constantSide.constant !== undefined && assignmentConversion(INT, one, constantSide.constant) === true;
      if (narrow(truePlain, expression.whenFalse, falsePlain)) type = truePlain;
      else if (narrow(falsePlain, expression.whenTrue, truePlain)) type = falsePlain;
      else if ((isPrimitive(truePlain, "byte") && isPrimitive(falsePlain, "short")) || (isPrimitive(truePlain, "short") && isPrimitive(falsePlain, "byte"))) type = primitive("short");
      else type = binaryNumericPromotion(truePlain, falsePlain);
    } else if (whenTrue.tag === "null" && whenFalse.tag === "primitive") type = boxedType(whenFalse);
    else if (whenFalse.tag === "null" && whenTrue.tag === "primitive") type = boxedType(whenTrue);
    else if (whenTrue.tag === "null") type = whenFalse;
    else if (whenFalse.tag === "null") type = whenTrue;
    else {
      const trueRef = boxedType(whenTrue), falseRef = boxedType(whenFalse);
      if (isSubtype(trueRef, falseRef)) type = falseRef;
      else if (isSubtype(falseRef, trueRef)) type = trueRef;
      else if (expected && expected.tag !== "void" && assignmentConversion(whenTrue, expected) === true && assignmentConversion(whenFalse, expected) === true) type = expected;
      else type = this.commonSuperclass(trueRef, falseRef);
    }
    const condition = expression.condition.constant;
    if (condition !== undefined && expression.whenTrue.constant !== undefined && expression.whenFalse.constant !== undefined && isConstantType(type)) {
      const chosen = condition ? expression.whenTrue : expression.whenFalse;
      expression.constant = convertConstant(chosen.constant!, chosen.type!, type);
    }
    return type;
  }

  private commonSuperclass(first: JavaType, second: JavaType): JavaType {
    if (first.tag !== "class" || second.tag !== "class") return classType(this.lib.object);
    for (let walker: JavaType | null = first; walker && walker.tag === "class"; walker = walker.classInfo.superclass) {
      if (isSubtype(second, classType(walker.classInfo))) return classType(walker.classInfo);
    }
    return classType(this.lib.object);
  }

  private cast(expression: Ast.Cast): JavaType {
    const target = this.resolveType(expression.typeNode);
    const type = this.expression(expression.operand, target);
    if (target.tag === "error" || type.tag === "error") return target.tag === "error" ? ERROR_TYPE : target;
    if (type.tag === "void") {
      this.report(preferredPosition(expression.operand), "'void' type not allowed here", "void-not-allowed");
      return ERROR_TYPE;
    }
    if (!castAllowed(type, target)) {
      this.report(expression.position, `incompatible types: ${typeName(type)} cannot be converted to ${typeName(target)}`, "incompatible");
      return ERROR_TYPE;
    }
    const constant = expression.operand.constant;
    if (constant !== undefined && isConstantType(target) && (type.tag === "primitive" || isString(type))) {
      const converted = convertConstant(constant, type, target);
      if (converted !== undefined) expression.constant = converted;
    }
    return target;
  }

  private instanceOf(expression: Ast.InstanceOf): JavaType {
    const type = this.expression(expression.operand);
    const target = this.resolveType(expression.typeNode);
    if (type.tag === "error" || target.tag === "error") return BOOLEAN;
    if (type.tag === "primitive") {
      this.report(preferredPosition(expression.operand), "unexpected type", "unexpected-type", ["required: reference", `found:    ${typeName(type)}`]);
      return BOOLEAN;
    }
    if (target.tag === "primitive") {
      this.report(expression.typeNode.position, "unexpected type", "unexpected-type", ["required: reference", `found:    ${typeName(target)}`]);
      return BOOLEAN;
    }
    if (!castAllowed(type, target)) {
      this.report(expression.operatorPosition, `incompatible types: ${typeName(type)} cannot be converted to ${typeName(target)}`, "incompatible");
      return BOOLEAN;
    }
    if (target.tag === "class" && target.typeArguments.length && expression.typeNode.typeArguments?.some((argument) => !argument.wildcard)) {
      this.report(expression.typeNode.position, `${typeName(type)} cannot be safely cast to ${typeName(target)}`, "reifiable");
    }
    if (expression.binding) {
      const variable = this.declareLocal(expression.binding, target, expression.typeNode.position, false);
      (expression as Ast.InstanceOf & { variable?: LocalVariable }).variable = variable;
    }
    return BOOLEAN;
  }

  // ---- conversions -------------------------------------------------------------------------------------------
  /** Assignment context: report if `from` cannot go where `to` is expected. */
  private convert(expression: Ast.Expression, from: JavaType, to: JavaType) {
    if (from.tag === "error" || to.tag === "error") return;
    if (from.tag === "void") {
      this.report(preferredPosition(expression), `incompatible types: void cannot be converted to ${typeName(to)}`, "void-not-allowed");
      return;
    }
    const result = assignmentConversion(from, to, expression.constant);
    if (result === true) return;
    this.report(preferredPosition(expression), result === "lossy"
      ? `incompatible types: possible lossy conversion from ${typeName(from)} to ${typeName(to)}`
      : `incompatible types: ${typeName(from)} cannot be converted to ${typeName(to)}`, result === "lossy" ? "lossy" : "incompatible");
  }
}

// ---- constant folding -------------------------------------------------------------------------------------------
function foldArithmetic(operator: string, left: Constant, right: Constant, type: JavaType): Constant | undefined {
  if (type.tag !== "primitive") return undefined;
  if (type.name === "long") {
    const a = left as bigint, b = right as bigint;
    switch (operator) {
      case "+": return BigInt.asIntN(64, a + b);
      case "-": return BigInt.asIntN(64, a - b);
      case "*": return BigInt.asIntN(64, a * b);
      case "/": return b === 0n ? undefined : BigInt.asIntN(64, a / b);
      case "%": return b === 0n ? undefined : a % b;
    }
    return undefined;
  }
  const a = left as number, b = right as number;
  if (type.name === "int") {
    switch (operator) {
      case "+": return toInt32(a + b);
      case "-": return toInt32(a - b);
      case "*": return Math.imul(a, b);
      case "/": return b === 0 ? undefined : toInt32(a / b);
      case "%": return b === 0 ? undefined : toInt32(a % b);
    }
    return undefined;
  }
  const result = operator === "+" ? a + b : operator === "-" ? a - b : operator === "*" ? a * b : operator === "/" ? a / b : a % b;
  return type.name === "float" ? Math.fround(result) : result;
}

function foldShift(operator: string, value: Constant, distance: number, type: JavaType): Constant {
  if (isPrimitive(type, "long")) {
    const shift = BigInt(distance & 63);
    const long = value as bigint;
    if (operator === "<<") return BigInt.asIntN(64, long << shift);
    if (operator === ">>") return long >> shift;
    return BigInt.asIntN(64, BigInt.asUintN(64, long) >> shift);
  }
  const int = value as number;
  if (operator === "<<") return int << distance;
  if (operator === ">>") return int >> distance;
  return toInt32(int >>> distance);
}

function foldBitwise(operator: string, left: Constant, right: Constant): Constant {
  if (typeof left === "bigint") {
    const b = right as bigint;
    return operator === "&" ? left & b : operator === "|" ? left | b : left ^ b;
  }
  const a = left as number, b = right as number;
  return operator === "&" ? a & b : operator === "|" ? a | b : a ^ b;
}

export { OBJECT_PLACEHOLDER, unboxed, isReference };
