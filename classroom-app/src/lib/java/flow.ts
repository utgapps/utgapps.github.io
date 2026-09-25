/* Flow: the questions javac answers after it knows every type.

     - Can this statement ever run?            "unreachable statement"
     - Can this method fall off its end?       "missing return statement"
     - Has this variable been given a value?   "variable x might not have been initialized"
     - Is this checked exception handled?      "unreported exception X; must be caught or declared to be thrown"

   Definite assignment follows JLS 16: a boolean expression carries two
   answers, one for "when true" and one for "when false", so
   `if (x > 0 && (y = 5) > 0) use(y);` is fine and `use(y)` after it is not.

   A state's `assigned` of null means "vacuously everything": code after a
   `return` may use any variable, because it never runs.
*/
import type * as Ast from "./ast";
import { type ClassInfo, type FieldInfo, type JavaType, type MethodInfo, isSubtype, typeName, classType } from "./types";
import { type Diagnostic, callParenPosition } from "./checker";
import { library } from "./library";

type Assigned = Set<string> | null;
type FlowState = { alive: boolean; assigned: Assigned };

type JumpTarget = {
  kind: "loop" | "switch" | "label" | "switchExpression";
  labels: string[];
  breaks: Assigned[];
  continues: Assigned[];
  yields: Assigned[];
  hadBreak: boolean;
};

type HandlerFrame =
  | { kind: "try"; catchTypes: JavaType[]; thrown: JavaType[] }
  | { kind: "method"; declared: JavaType[] };

function intersect(first: Assigned, second: Assigned): Assigned {
  if (first === null) return second === null ? null : new Set(second);
  if (second === null) return new Set(first);
  const result = new Set<string>();
  for (const key of first) if (second.has(key)) result.add(key);
  return result;
}
function union(first: Assigned, second: Assigned): Assigned {
  if (first === null || second === null) return null;
  const result = new Set(first);
  for (const key of second) result.add(key);
  return result;
}
function copy(assigned: Assigned): Assigned { return assigned === null ? null : new Set(assigned); }
function withKey(assigned: Assigned, key: string): Assigned {
  if (assigned === null) return null;
  const result = new Set(assigned);
  result.add(key);
  return result;
}
function has(assigned: Assigned, key: string): boolean { return assigned === null || assigned.has(key); }
function join(states: FlowState[]): FlowState {
  const live = states.filter((state) => state.alive);
  if (!live.length) return { alive: false, assigned: null };
  let assigned: Assigned = null;
  for (const state of live) assigned = intersect(assigned, state.assigned);
  return { alive: true, assigned };
}
const DEAD: FlowState = { alive: false, assigned: null };

const localKey = (id: number) => "L" + id;
const fieldKey = (field: FieldInfo) => "F" + field.name;

export function analyzeFlow(classes: ClassInfo[]): Diagnostic[] {
  const analyzer = new FlowAnalyzer();
  for (const info of classes) {
    if (!info.declaration || info.unsupported) continue;
    try { analyzer.analyzeClass(info); } catch (error) {
      // A half-attributed tree (after a type error) must never take the compiler down.
      if (!analyzer.diagnostics.length) throw error;
    }
  }
  return analyzer.diagnostics;
}

class FlowAnalyzer {
  diagnostics: Diagnostic[] = [];
  private file = "";
  private targets: JumpTarget[] = [];
  private handlers: HandlerFrame[] = [];
  /** Locals declared in this body without a value: the only ones a read can find unassigned. */
  private tracked = new Set<string>();
  /** Blank final fields the current constructor or initializer must assign. */
  private trackedFields = new Map<string, FieldInfo>();
  private fieldReadsChecked = false;
  private returnStates: Assigned[] = [];
  private catchRethrows = new Map<number, JavaType[]>();
  private currentClass!: ClassInfo;

  private report(at: Ast.Position, message: string, code: string, details: string[] = []) {
    if (this.diagnostics.some((existing) => existing.file === this.file && existing.line === at.line
        && existing.column === at.column && existing.message === message)) return;
    this.diagnostics.push({ file: this.file, line: at.line, column: at.column, message, details, code });
  }

  private resetBody(declared: JavaType[]) {
    this.targets = [];
    this.handlers = [{ kind: "method", declared }];
    this.tracked = new Set();
    this.trackedFields = new Map();
    this.fieldReadsChecked = false;
    this.returnStates = [];
  }

  analyzeClass(info: ClassInfo) {
    const declaration = info.declaration!;
    this.file = declaration.file;
    this.currentClass = info;
    const blankInstance = [...info.fields.values()].filter((field) => field.isFinal && !field.isStatic && !field.declaration?.initializer);
    const blankStatic = [...info.fields.values()].filter((field) => field.isFinal && field.isStatic && !field.declaration?.initializer && info.kind !== "interface");

    // Static initializers, in textual order, then: every blank static final assigned?
    this.resetBody([]);
    for (const field of blankStatic) this.trackedFields.set(field.name, field);
    this.fieldReadsChecked = true;
    let staticState: FlowState = { alive: true, assigned: new Set() };
    for (const member of declaration.members) {
      if (member.kind === "Field" && member.modifiers.names.has("static")) staticState = this.fieldInitializers(member, staticState);
      else if (member.kind === "Initializer" && member.isStatic) staticState = this.initializerBlock(member, staticState);
    }
    for (const field of blankStatic) {
      if (!has(staticState.assigned, fieldKey(field)) && field.declaration) {
        this.report(field.declaration.position, `variable ${field.name} not initialized in the default constructor`, "var-might-not-have-been-initialized");
      }
    }

    // Instance initializers run at the start of every constructor that does not call this(...).
    this.resetBody([]);
    for (const field of blankInstance) this.trackedFields.set(field.name, field);
    this.fieldReadsChecked = true;
    let instanceState: FlowState = { alive: true, assigned: new Set() };
    for (const member of declaration.members) {
      if (member.kind === "Field" && !member.modifiers.names.has("static")) instanceState = this.fieldInitializers(member, instanceState);
      else if (member.kind === "Initializer" && !member.isStatic) instanceState = this.initializerBlock(member, instanceState);
    }
    const afterInitializers = copy(instanceState.assigned);

    let hasConstructor = false;
    for (const member of declaration.members) {
      if (member.kind === "Method" && member.info && member.body) this.method(member, member.info);
      else if (member.kind === "Constructor" && member.info) {
        hasConstructor = true;
        this.constructorDeclaration(member, member.info, blankInstance, afterInitializers);
      }
    }
    if (!hasConstructor && info.kind === "class") {
      for (const field of blankInstance) {
        if (!has(afterInitializers, fieldKey(field)) && field.declaration) {
          this.report(field.declaration.position, `variable ${field.name} not initialized in the default constructor`, "var-might-not-have-been-initialized");
        }
      }
    }
  }

  private fieldInitializers(member: Ast.FieldDeclaration, state: FlowState): FlowState {
    for (const declarator of member.declarators) {
      if (!declarator.initializer) continue;
      state = this.expression(declarator.initializer, state);
    }
    return state;
  }

  private initializerBlock(member: Ast.InitializerBlock, state: FlowState): FlowState {
    const result = this.block(member.body, state);
    if (!result.alive && state.alive) this.report(member.body.position, "initializer must be able to complete normally", "initializer-complete");
    return { alive: true, assigned: result.assigned };
  }

  private declareParameters(parameters: Ast.Parameter[], state: FlowState): FlowState {
    let assigned = state.assigned;
    for (const parameter of parameters) if (parameter.variable) assigned = withKey(assigned, localKey(parameter.variable.id));
    return { alive: true, assigned };
  }

  private method(member: Ast.MethodDeclaration, info: MethodInfo) {
    this.resetBody(info.throws);
    const start = this.declareParameters(member.parameters, { alive: true, assigned: new Set() });
    const end = this.block(member.body!, start);
    if (end.alive && info.returnType.tag !== "void") {
      this.report(member.body!.closePosition, "missing return statement", "missing-return");
    }
  }

  private constructorDeclaration(member: Ast.ConstructorDeclaration, info: MethodInfo, blankFinals: FieldInfo[], afterInitializers: Assigned) {
    this.resetBody(info.throws);
    const delegates = member.explicitCall?.kind === "this";
    let state = this.declareParameters(member.parameters, { alive: true, assigned: new Set() });
    if (member.explicitCall) {
      for (const argument of member.explicitCall.args) state = this.expression(argument, state);
      const called = member.explicitCall.constructorInfo;
      if (called) this.throwsFrom(called, member.explicitCall.position);
    }
    if (!delegates) {
      for (const field of blankFinals) this.trackedFields.set(field.name, field);
      this.fieldReadsChecked = true;
      state = { alive: true, assigned: union(state.assigned, afterInitializers) };
    }
    const end = this.block(member.body, state);
    if (delegates) return;
    const exits = [...this.returnStates];
    if (end.alive) exits.push(end.assigned);
    for (const field of blankFinals) {
      if (exits.some((assigned) => !has(assigned, fieldKey(field)))) {
        this.report(member.body.closePosition, `variable ${field.name} might not have been initialized`, "var-might-not-have-been-initialized");
      }
    }
  }

  // ---- exceptions ---------------------------------------------------------------------
  private isChecked(type: JavaType): boolean {
    return type.tag === "class" && !!type.classInfo.isThrowable && !!type.classInfo.isChecked;
  }

  private throwType(type: JavaType, at: Ast.Position) {
    if (type.tag !== "class") return;
    for (let index = this.handlers.length - 1; index >= 0; index--) {
      const frame = this.handlers[index];
      if (frame.kind === "try") {
        frame.thrown.push(type);
        if (frame.catchTypes.some((caught) => isSubtype(type, caught))) return;
        continue;
      }
      if (!this.isChecked(type)) return;
      if (frame.declared.some((declared) => isSubtype(type, declared))) return;
      this.report(at, `unreported exception ${typeName(type)}; must be caught or declared to be thrown`, "unreported-exception");
      return;
    }
  }

  private throwsFrom(method: MethodInfo, at: Ast.Position) {
    for (const type of method.throws) this.throwType(type, at);
  }

  // ---- statements -------------------------------------------------------------------------
  private block(block: Ast.Block, state: FlowState): FlowState {
    return this.statements(block.statements, state);
  }

  private statements(statements: Ast.Statement[], state: FlowState): FlowState {
    let reportedUnreachable = false;
    for (const statement of statements) {
      if (!state.alive) {
        if (!reportedUnreachable) {
          this.report(statement.position, "unreachable statement", "unreachable");
          reportedUnreachable = true;
        }
        // Carry on as if it could run, so one mistake does not cascade.
        state = { alive: true, assigned: null };
      }
      state = this.statement(statement, state);
    }
    return state;
  }

  private statement(statement: Ast.Statement, state: FlowState): FlowState {
    switch (statement.kind) {
      case "Block": return this.block(statement, state);
      case "LocalVar": {
        for (const declarator of statement.declarators) {
          const variable = declarator.variable;
          if (declarator.initializer) {
            state = this.expression(declarator.initializer, state);
            if (variable) state = { ...state, assigned: withKey(state.assigned, localKey(variable.id)) };
          } else if (variable) {
            this.tracked.add(localKey(variable.id));
            // A fresh variable is unassigned even in code that is vacuously assigned everything.
            if (state.assigned) state.assigned.delete(localKey(variable.id));
          }
        }
        return state;
      }
      case "ExprStmt": return this.expression(statement.expression, state);
      case "If": {
        const outcome = this.condition(statement.condition, state);
        const thenState = this.statement(statement.thenBranch, { alive: true, assigned: outcome.whenTrue });
        const elseState = statement.elseBranch
          ? this.statement(statement.elseBranch, { alive: true, assigned: outcome.whenFalse })
          : { alive: true, assigned: outcome.whenFalse };
        return join([thenState, elseState]);
      }
      case "While": return this.whileLoop(statement.condition, statement.body, state, [], []);
      case "Do": return this.doLoop(statement, state, []);
      case "For": return this.forLoop(statement, state, []);
      case "ForEach": return this.forEach(statement, state, []);
      case "Labeled": return this.labeled(statement, state);
      case "Return": {
        if (statement.value) state = this.expression(statement.value, state);
        this.returnStates.push(state.assigned);
        return DEAD;
      }
      case "Break": {
        const target = this.findTarget(statement.label, false);
        if (target) { target.breaks.push(state.assigned); target.hadBreak = true; }
        return DEAD;
      }
      case "Continue": {
        const target = this.findTarget(statement.label, true);
        if (target) target.continues.push(state.assigned);
        return DEAD;
      }
      case "Yield": {
        state = this.expression(statement.value, state);
        const target = [...this.targets].reverse().find((candidate) => candidate.kind === "switchExpression");
        if (target) target.yields.push(state.assigned);
        return DEAD;
      }
      case "Throw": {
        state = this.expression(statement.value, state);
        const value = statement.value;
        const rethrown = value.kind === "Name" && value.resolution?.to === "local" ? this.catchRethrows.get(value.resolution.variable.id) : undefined;
        if (rethrown && value.kind === "Name" && value.resolution?.to === "local" && !value.resolution.variable.reassigned) {
          for (const type of rethrown) this.throwType(type, statement.position);
        } else if (value.type) this.throwType(value.type, statement.position);
        return DEAD;
      }
      case "Switch": return this.switchStatement(statement, state, []);
      case "Try": return this.tryStatement(statement, state);
      case "Assert": {
        const outcome = this.condition(statement.condition, state);
        if (statement.message) this.expression(statement.message, { alive: true, assigned: outcome.whenFalse });
        return state;
      }
      case "Empty": case "UnsupportedStmt": return state;
    }
  }

  private findTarget(label: string | null, isContinue: boolean): JumpTarget | undefined {
    for (let index = this.targets.length - 1; index >= 0; index--) {
      const target = this.targets[index];
      if (label !== null) {
        if (target.labels.includes(label)) return target;
        continue;
      }
      if (target.kind === "switchExpression") return undefined;
      if (isContinue ? target.kind === "loop" : target.kind === "loop" || target.kind === "switch") return target;
    }
    return undefined;
  }

  private pushTarget(kind: JumpTarget["kind"], labels: string[]): JumpTarget {
    const target: JumpTarget = { kind, labels, breaks: [], continues: [], yields: [], hadBreak: false };
    this.targets.push(target);
    return target;
  }

  private labeled(statement: Ast.LabeledStatement, state: FlowState): FlowState {
    // Collect the labels stacked on one statement: `outer: for (...)`.
    const labels = [statement.label];
    let body: Ast.Statement = statement.body;
    while (body.kind === "Labeled") { labels.push(body.label); body = body.body; }
    switch (body.kind) {
      case "While": return this.whileLoop(body.condition, body.body, state, labels, []);
      case "Do": return this.doLoop(body, state, labels);
      case "For": return this.forLoop(body, state, labels);
      case "ForEach": return this.forEach(body, state, labels);
      case "Switch": return this.switchStatement(body, state, labels);
    }
    const target = this.pushTarget("label", labels);
    let end: FlowState;
    try { end = this.statement(body, state); } finally { this.targets.pop(); }
    return join([end, ...target.breaks.map((assigned) => ({ alive: true, assigned }))]);
  }

  /** while, and the shared tail of for: condition, body, updates. */
  private whileLoop(condition: Ast.Expression | null, body: Ast.Statement, state: FlowState, labels: string[],
                    updates: Ast.Expression[]): FlowState {
    const outcome = condition ? this.condition(condition, state) : { whenTrue: state.assigned, whenFalse: null as Assigned };
    const constant = condition ? condition.constant : true;
    if (constant === false) this.report(body.position, "unreachable statement", "unreachable");
    const target = this.pushTarget("loop", labels);
    let bodyEnd: FlowState;
    try {
      bodyEnd = this.statement(body, { alive: true, assigned: outcome.whenTrue });
    } finally { this.targets.pop(); }
    const beforeUpdate = join([bodyEnd, ...target.continues.map((assigned) => ({ alive: true, assigned }))]);
    let afterUpdate = beforeUpdate;
    for (const update of updates) afterUpdate = this.expression(update, { alive: true, assigned: afterUpdate.assigned });
    let assigned = outcome.whenFalse;
    for (const breakState of target.breaks) assigned = intersect(assigned, breakState);
    const alive = constant !== true || target.hadBreak;
    return { alive: alive && state.alive, assigned: alive ? assigned : null };
  }

  private doLoop(statement: Ast.DoStatement, state: FlowState, labels: string[]): FlowState {
    const target = this.pushTarget("loop", labels);
    let bodyEnd: FlowState;
    try { bodyEnd = this.statement(statement.body, state); } finally { this.targets.pop(); }
    const beforeCondition = join([bodyEnd, ...target.continues.map((assigned) => ({ alive: true, assigned }))]);
    const outcome = this.condition(statement.condition, beforeCondition.alive ? beforeCondition : { alive: true, assigned: null });
    let assigned = beforeCondition.alive ? outcome.whenFalse : null;
    for (const breakState of target.breaks) assigned = intersect(assigned, breakState);
    const alive = (beforeCondition.alive && statement.condition.constant !== true) || target.hadBreak;
    return { alive, assigned: alive ? assigned : null };
  }

  private forLoop(statement: Ast.ForStatement, state: FlowState, labels: string[]): FlowState {
    for (const init of statement.init) state = this.statement(init, state);
    return this.whileLoop(statement.condition, statement.body, state, labels, statement.update);
  }

  private forEach(statement: Ast.ForEachStatement, state: FlowState, labels: string[]): FlowState {
    state = this.expression(statement.iterable, state);
    const bodyStart = statement.variable ? withKey(state.assigned, localKey(statement.variable.id)) : state.assigned;
    const target = this.pushTarget("loop", labels);
    try { this.statement(statement.body, { alive: true, assigned: bodyStart }); } finally { this.targets.pop(); }
    let assigned = state.assigned;
    for (const breakState of target.breaks) assigned = intersect(assigned, breakState);
    return { alive: state.alive, assigned };
  }

  private switchStatement(statement: Ast.SwitchStatement, state: FlowState, labels: string[]): FlowState {
    state = this.expression(statement.selector, state);
    const afterSelector = state.assigned;
    const hasDefault = statement.cases.some((switchCase) => switchCase.isDefault);
    const target = this.pushTarget("switch", labels);
    const ends: FlowState[] = [];
    try {
      if (statement.cases.some((switchCase) => switchCase.arrow)) {
        for (const switchCase of statement.cases) {
          let armState: FlowState = { alive: true, assigned: copy(afterSelector) };
          if (switchCase.arrowExpression) armState = this.expression(switchCase.arrowExpression, armState);
          else if (switchCase.body[0]) armState = this.statement(switchCase.body[0], armState);
          ends.push(armState);
        }
      } else {
        let running: FlowState = DEAD;
        for (const switchCase of statement.cases) {
          // A label can be reached by jumping from the selector, or by falling through.
          const entry = join([{ alive: true, assigned: copy(afterSelector) }, running]);
          running = this.statementsInSwitch(switchCase.body, entry);
        }
        ends.push(running);
        if (!statement.cases.length) ends.push({ alive: true, assigned: afterSelector });
      }
    } finally { this.targets.pop(); }
    if (!hasDefault) ends.push({ alive: true, assigned: afterSelector });
    for (const breakState of target.breaks) ends.push({ alive: true, assigned: breakState });
    const result = join(ends);
    return { alive: result.alive && state.alive, assigned: result.assigned };
  }

  /** Statements of one case group: an unreachable one is reported like any other. */
  private statementsInSwitch(statements: Ast.Statement[], state: FlowState): FlowState {
    return this.statements(statements, state);
  }

  private tryStatement(statement: Ast.TryStatement, state: FlowState): FlowState {
    const catchTypesByClause = statement.catches.map((clause) =>
      ((clause as Ast.CatchClause & { resolvedTypes?: JavaType[] }).resolvedTypes ?? []).filter((type) => type.tag === "class"));
    const frame: HandlerFrame = { kind: "try", catchTypes: catchTypesByClause.flat(), thrown: [] };
    const before = state.assigned;
    this.handlers.push(frame);
    let tryEnd: FlowState;
    try { tryEnd = this.block(statement.body, state); } finally { this.handlers.pop(); }

    const ends: FlowState[] = [tryEnd];
    const earlier: JavaType[] = [];
    const exception = classType(library().lookup("java.lang.Exception")!);
    const throwable = classType(library().lookup("java.lang.Throwable")!);
    statement.catches.forEach((clause, clauseIndex) => {
      const types = catchTypesByClause[clauseIndex];
      types.forEach((type, typeIndex) => {
        const at = clause.types[typeIndex]?.position ?? clause.position;
        if (earlier.some((caught) => isSubtype(type, caught))) {
          this.report(at, `exception ${typeName(type)} has already been caught`, "already-caught");
        } else if (this.isChecked(type) && !isSubtype(exception, type) && !isSubtype(throwable, type)
                   && !frame.thrown.some((thrown) => isSubtype(thrown, type) || isSubtype(type, thrown))) {
          this.report(at, `exception ${typeName(type)} is never thrown in body of corresponding try statement`, "never-thrown");
        }
      });
      // What `throw e;` rethrows from here: the checked exceptions this clause can actually catch.
      if (clause.variable) {
        const rethrows: JavaType[] = [];
        for (const thrown of frame.thrown) {
          if (earlier.some((caught) => isSubtype(thrown, caught))) continue;
          for (const type of types) {
            if (isSubtype(thrown, type)) { if (!rethrows.includes(thrown)) rethrows.push(thrown); }
            else if (isSubtype(type, thrown) && !rethrows.includes(type)) rethrows.push(type);
          }
        }
        // Unchecked exceptions the clause catches need no declaration, so they need not be listed.
        this.catchRethrows.set(clause.variable.id, rethrows.filter((type) => this.isChecked(type)));
      }
      earlier.push(...types);
      const entry: Assigned = clause.variable ? withKey(copy(before), localKey(clause.variable.id)) : copy(before);
      ends.push(this.block(clause.body, { alive: true, assigned: entry }));
    });

    const joined = join(ends);
    if (!statement.finallyBlock) return { alive: joined.alive && state.alive, assigned: joined.assigned };
    const finallyEnd = this.block(statement.finallyBlock, { alive: true, assigned: copy(before) });
    if (!finallyEnd.alive) return DEAD;
    return { alive: joined.alive && state.alive, assigned: joined.alive ? union(joined.assigned, finallyEnd.assigned) : null };
  }

  // ---- expressions -----------------------------------------------------------------------------
  /** The two outcomes of a boolean expression. */
  private condition(expression: Ast.Expression, state: FlowState): { whenTrue: Assigned; whenFalse: Assigned } {
    // A constant condition only ever takes one side; the other is vacuous.
    // Worked out from the parts, not by handing the whole thing to
    // expression(): that hands every && and || straight back here, and
    // println((5 > 3) && (8 < 10)) overflowed the stack.
    const outcome = this.conditionParts(expression, state);
    if (expression.constant === true) return { whenTrue: outcome.whenTrue, whenFalse: null };
    if (expression.constant === false) return { whenTrue: null, whenFalse: outcome.whenFalse };
    return outcome;
  }

  private conditionParts(expression: Ast.Expression, state: FlowState): { whenTrue: Assigned; whenFalse: Assigned } {
    if (expression.kind === "Binary" && (expression.operator === "&&" || expression.operator === "||")) {
      const left = this.condition(expression.left, state);
      if (expression.operator === "&&") {
        const right = this.condition(expression.right, { alive: true, assigned: left.whenTrue });
        return { whenTrue: right.whenTrue, whenFalse: intersect(left.whenFalse, right.whenFalse) };
      }
      const right = this.condition(expression.right, { alive: true, assigned: left.whenFalse });
      return { whenTrue: intersect(left.whenTrue, right.whenTrue), whenFalse: right.whenFalse };
    }
    if (expression.kind === "Unary" && expression.operator === "!") {
      const inner = this.condition(expression.operand, state);
      return { whenTrue: inner.whenFalse, whenFalse: inner.whenTrue };
    }
    if (expression.kind === "Conditional" && expression.type?.tag === "primitive" && expression.type.name === "boolean") {
      const test = this.condition(expression.condition, state);
      const whenTrueBranch = this.condition(expression.whenTrue, { alive: true, assigned: test.whenTrue });
      const whenFalseBranch = this.condition(expression.whenFalse, { alive: true, assigned: test.whenFalse });
      return {
        whenTrue: intersect(whenTrueBranch.whenTrue, whenFalseBranch.whenTrue),
        whenFalse: intersect(whenTrueBranch.whenFalse, whenFalseBranch.whenFalse),
      };
    }
    const after = this.expression(expression, state);
    return { whenTrue: after.assigned, whenFalse: copy(after.assigned) };
  }

  private checkRead(expression: Ast.Expression, state: FlowState) {
    if (expression.kind === "Name" && expression.resolution?.to === "local") {
      const variable = expression.resolution.variable;
      const key = localKey(variable.id);
      if (this.tracked.has(key) && !has(state.assigned, key)) {
        this.report(expression.position, `variable ${variable.name} might not have been initialized`, "var-might-not-have-been-initialized");
      }
      return;
    }
    const field = this.trackedFieldOf(expression);
    if (field && this.fieldReadsChecked && !has(state.assigned, fieldKey(field))) {
      this.report(expression.position, `variable ${field.name} might not have been initialized`, "var-might-not-have-been-initialized");
    }
  }

  /** `x` or `this.x` naming a blank final field this body must assign. */
  private trackedFieldOf(expression: Ast.Expression): FieldInfo | null {
    let field: FieldInfo | null = null;
    if (expression.kind === "Name" && expression.resolution?.to === "field") field = expression.resolution.field;
    else if (expression.kind === "FieldAccess" && expression.target.kind === "This" && expression.resolution?.to === "field") field = expression.resolution.field;
    if (!field || field.owner !== this.currentClass) return null;
    return this.trackedFields.get(field.name) === field ? field : null;
  }

  private assign(target: Ast.Expression, state: FlowState): FlowState {
    if (target.kind === "Name" && target.resolution?.to === "local") {
      const variable = target.resolution.variable;
      const key = localKey(variable.id);
      if (variable.isFinal && this.tracked.has(key) && state.assigned !== null && state.assigned.has(key)) {
        this.report(target.position, `variable ${variable.name} might already have been assigned`, "var-might-already-be-assigned");
      }
      return { ...state, assigned: withKey(state.assigned, key) };
    }
    const field = this.trackedFieldOf(target);
    if (field) {
      if (state.assigned !== null && state.assigned.has(fieldKey(field))) {
        this.report(target.position, `variable ${field.name} might already have been assigned`, "var-might-already-be-assigned");
      }
      return { ...state, assigned: withKey(state.assigned, fieldKey(field)) };
    }
    return state;
  }

  /** Evaluate the parts of an assignment target that run before the value: `a[i] = ...`, `obj.f = ...`. */
  private targetParts(target: Ast.Expression, state: FlowState): FlowState {
    if (target.kind === "ArrayAccess") return this.expression(target.index, this.expression(target.array, state));
    if (target.kind === "FieldAccess" && target.target.kind !== "This") return this.valueTarget(target.target, state);
    return state;
  }

  /** A `.`'s left side, when it is a value and not a class or package name. */
  private valueTarget(target: Ast.Expression, state: FlowState): FlowState {
    if (target.kind === "Name" && (target.resolution?.to === "class" || target.resolution?.to === "package" || target.name === "super")) return state;
    if (target.kind === "FieldAccess" && (target.resolution?.to === "class" || target.resolution?.to === "package")) return state;
    return this.expression(target, state);
  }

  private expression(expression: Ast.Expression, state: FlowState): FlowState {
    switch (expression.kind) {
      case "Literal": case "This": case "Unsupported": return state;
      case "Name":
        this.checkRead(expression, state);
        return state;
      case "FieldAccess":
        if (expression.resolution?.to === "class" || expression.resolution?.to === "package") return state;
        state = expression.target.kind === "This" ? state : this.valueTarget(expression.target, state);
        this.checkRead(expression, state);
        return state;
      case "ArrayAccess": return this.expression(expression.index, this.expression(expression.array, state));
      case "Call": {
        if (expression.target) state = this.valueTarget(expression.target, state);
        for (const argument of expression.args) state = this.expression(argument, state);
        if (expression.method) this.throwsFrom(expression.method, callParenPosition(expression));
        return state;
      }
      case "New": {
        for (const argument of expression.args) state = this.expression(argument, state);
        if (expression.constructorInfo) this.throwsFrom(expression.constructorInfo, expression.position);
        return state;
      }
      case "NewArray": {
        for (const size of expression.dimensionExpressions) state = this.expression(size, state);
        return expression.initializer ? this.expression(expression.initializer, state) : state;
      }
      case "ArrayInit": {
        for (const element of expression.elements) state = this.expression(element, state);
        return state;
      }
      case "Unary":
        if (expression.operator === "!") {
          const outcome = this.condition(expression.operand, state);
          return { alive: state.alive, assigned: intersect(outcome.whenTrue, outcome.whenFalse) };
        }
        if (expression.operator === "++" || expression.operator === "--") return this.increment(expression.operand, state);
        return this.expression(expression.operand, state);
      case "Postfix": return this.increment(expression.operand, state);
      case "Binary": {
        if (expression.operator === "&&" || expression.operator === "||") {
          const outcome = this.condition(expression, state);
          return { alive: state.alive, assigned: intersect(outcome.whenTrue, outcome.whenFalse) };
        }
        return this.expression(expression.right, this.expression(expression.left, state));
      }
      case "Assign": {
        const target = expression.target;
        if (expression.operator === "=") {
          state = this.targetParts(target, state);
          state = this.expression(expression.value, state);
          return this.assign(target, state);
        }
        state = this.targetParts(target, state);
        this.checkRead(target, state);
        state = this.expression(expression.value, state);
        return this.assign(target, state);
      }
      case "Conditional": {
        const outcome = this.condition(expression.condition, state);
        const whenTrue = this.expression(expression.whenTrue, { alive: true, assigned: outcome.whenTrue });
        const whenFalse = this.expression(expression.whenFalse, { alive: true, assigned: outcome.whenFalse });
        return { alive: state.alive, assigned: intersect(whenTrue.assigned, whenFalse.assigned) };
      }
      case "Cast": return this.expression(expression.operand, state);
      case "InstanceOf": {
        state = this.expression(expression.operand, state);
        const variable = (expression as Ast.InstanceOf & { variable?: { id: number } }).variable;
        return variable ? { ...state, assigned: withKey(state.assigned, localKey(variable.id)) } : state;
      }
      case "SwitchExpr": return this.switchExpression(expression, state);
    }
  }

  private increment(operand: Ast.Expression, state: FlowState): FlowState {
    state = this.targetParts(operand, state);
    this.checkRead(operand, state);
    return this.assign(operand, state);
  }

  private switchExpression(expression: Ast.SwitchExpression, state: FlowState): FlowState {
    state = this.expression(expression.selector, state);
    const afterSelector = state.assigned;
    const target = this.pushTarget("switchExpression", []);
    const results: Assigned[] = [];
    try {
      if (expression.cases.some((switchCase) => switchCase.arrow)) {
        for (const switchCase of expression.cases) {
          const entry: FlowState = { alive: true, assigned: copy(afterSelector) };
          if (switchCase.arrowExpression) {
            results.push(this.expression(switchCase.arrowExpression, entry).assigned);
          } else if (switchCase.body[0]) {
            const body = switchCase.body[0];
            const end = this.statement(body, entry);
            if (end.alive) {
              this.report(body.kind === "Block" ? body.closePosition : body.position, "switch rule completes without providing a value", "switch-rule-no-value",
                          ["(switch rules in switch expressions must either provide a value or throw)"]);
            }
          }
        }
      } else {
        let running: FlowState = DEAD;
        for (const switchCase of expression.cases) {
          const entry = join([{ alive: true, assigned: copy(afterSelector) }, running]);
          running = this.statements(switchCase.body, entry);
        }
        if (running.alive) {
          this.report(expression.position, "switch expression completes without providing a value", "switch-no-value",
                      ["(switch expressions must either provide a value or throw for all possible input values)"]);
        }
      }
    } finally { this.targets.pop(); }
    let assigned: Assigned = null;
    for (const result of [...results, ...target.yields]) assigned = intersect(assigned, result);
    return { alive: state.alive, assigned };
  }
}
