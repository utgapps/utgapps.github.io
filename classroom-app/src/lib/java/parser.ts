/* The Java parser: tokens in, a CompilationUnit out.

   Recursive descent, one method per grammar rule. The first syntax error stops
   it, the way a beginner should read javac's output anyway: fix the first
   complaint, compile again. Error wording and caret positions follow javac -
   "';' expected" points just past the token before the gap, not at whatever
   happens to come next.

   Things real Java allows that the classroom cannot run yet (lambdas, generics
   declarations, anonymous classes...) still PARSE, into an Unsupported node, so
   the student is told "this is correct Java, it just won't run here" instead of
   being told their correct code is wrong.
*/
import { tokenize, JavaSyntaxError, type Token } from "./lexer";
import type * as Ast from "./ast";

const PRIMITIVES = new Set(["int", "long", "double", "float", "boolean", "char", "byte", "short"]);
const ASSIGNMENT_OPERATORS = new Set(["=", "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<=", ">>=", ">>>="]);
const BINARY_PRECEDENCE: Record<string, number> = {
  "||": 1, "&&": 2, "|": 3, "^": 4, "&": 5, "==": 6, "!=": 6,
  "<": 7, ">": 7, "<=": 7, ">=": 7, instanceof: 7, "<<": 8, ">>": 8, ">>>": 8,
  "+": 9, "-": 9, "*": 10, "/": 10, "%": 10,
};
const MODIFIERS = new Set(["public", "private", "protected", "static", "final", "abstract", "native",
  "synchronized", "transient", "volatile", "strictfp", "default", "sealed", "non-sealed"]);

export function parse(source: string, file: string): Ast.CompilationUnit {
  return new Parser(tokenize(source), file).compilationUnit();
}

class Parser {
  private index = 0;
  constructor(private tokens: Token[], private file: string) {}

  // ---- token helpers -----------------------------------------------------
  private get token(): Token { return this.tokens[this.index]; }
  private lookAhead(distance: number): Token { return this.tokens[Math.min(this.index + distance, this.tokens.length - 1)]; }
  private get previous(): Token { return this.tokens[Math.max(0, this.index - 1)]; }
  private is(text: string, token: Token = this.token): boolean {
    return (token.kind === "operator" || token.kind === "keyword") && token.text === text;
  }
  /** A method, not a property test, so TypeScript does not "remember" it across index moves. */
  private atEnd(): boolean { return this.tokens[this.index].kind === "end"; }
  private isIdentifier(token: Token = this.token): boolean { return token.kind === "identifier"; }
  private accept(text: string): boolean {
    if (this.is(text)) { this.index++; return true; }
    return false;
  }
  private position(token: Token = this.token): Ast.Position {
    return { line: token.line, column: token.column, offset: token.offset };
  }
  private endOfPrevious(): Ast.Position {
    const before = this.previous;
    return { line: before.endLine, column: before.endColumn, offset: before.endOffset };
  }
  private fail(message: string, at: Ast.Position, code: string): never {
    throw new JavaSyntaxError(message, at.line, at.column, code);
  }
  /** javac's "X expected" sits just after the last token that was fine. */
  private expect(text: string): Token {
    if (this.is(text)) return this.tokens[this.index++];
    if (this.atEnd()) this.endOfFile();
    return this.fail(`'${text}' expected`, this.endOfPrevious(), text === ";" ? "semicolon-expected" : "token-expected");
  }
  private endOfFile(): never {
    return this.fail("reached end of file while parsing", this.endOfPrevious(), "end-of-file");
  }
  private identifier(): Token {
    if (this.isIdentifier()) return this.tokens[this.index++];
    if (this.atEnd()) this.endOfFile();
    return this.fail("<identifier> expected", this.endOfPrevious(), "identifier-expected");
  }
  /** A `>` that closes type arguments may be the first half of `>>`. */
  private closeAngle() {
    const current = this.token;
    if (this.is(">")) { this.index++; return; }
    const rest: Record<string, string> = { ">>": ">", ">>>": ">>", ">=": "=", ">>=": ">=", ">>>=": ">>=" };
    if (current.kind === "operator" && rest[current.text]) {
      this.tokens[this.index] = { ...current, text: rest[current.text], offset: current.offset + 1, column: current.column + 1 };
      return;
    }
    this.fail("'>' expected", this.endOfPrevious(), "token-expected");
  }

  // ---- compilation unit ---------------------------------------------------
  compilationUnit(): Ast.CompilationUnit {
    const unit: Ast.CompilationUnit = { file: this.file, packageName: null, imports: [], types: [] };
    this.skipAnnotations();
    if (this.accept("package")) {
      unit.packageName = this.qualifiedName();
      this.expect(";");
    }
    while (this.is("import")) {
      const at = this.position();
      this.index++;
      const isStatic = this.accept("static");
      let name = this.identifier().text;
      let star = false;
      while (this.accept(".")) {
        if (this.accept("*")) { star = true; break; }
        name += "." + this.identifier().text;
      }
      this.expect(";");
      unit.imports.push({ name, star, isStatic, position: at });
    }
    while (this.token.kind !== "end") {
      if (this.accept(";")) continue;
      const modifiers = this.modifiers();
      if (this.is("class") || this.is("interface") || this.is("enum") || this.isContextual("record")) {
        unit.types.push(this.classDeclaration(modifiers));
        continue;
      }
      if (this.is("import")) this.fail("class, interface, enum, or record expected", this.position(), "import-order");
      this.fail("class, interface, enum, or record expected", this.position(), "class-expected");
    }
    return unit;
  }

  private isContextual(word: string, token: Token = this.token) { return token.kind === "identifier" && token.text === word; }

  private qualifiedName(): string {
    let name = this.identifier().text;
    while (this.is(".") && this.isIdentifier(this.lookAhead(1))) { this.index++; name += "." + this.identifier().text; }
    return name;
  }

  private skipAnnotations(into?: Ast.Modifiers["annotations"]) {
    while (this.is("@") && !this.is("interface", this.lookAhead(1))) {
      const at = this.position();
      this.index++;
      const name = this.qualifiedName();
      into?.push({ name, position: at });
      if (this.is("(")) this.skipBalanced("(", ")");
    }
  }

  private skipBalanced(open: string, close: string) {
    let depth = 0;
    do {
      if (this.atEnd()) this.endOfFile();
      if (this.is(open)) depth++;
      else if (this.is(close)) depth--;
      this.index++;
    } while (depth > 0);
  }

  private modifiers(): Ast.Modifiers {
    const result: Ast.Modifiers = { names: new Set(), annotations: [], position: this.position() };
    while (true) {
      if (this.is("@") && !this.is("interface", this.lookAhead(1))) { this.skipAnnotations(result.annotations); continue; }
      const word = this.token.text;
      if ((this.token.kind === "keyword" || this.token.kind === "identifier") && MODIFIERS.has(word)
          && !(word === "default" && (this.is(":", this.lookAhead(1)) || this.is("->", this.lookAhead(1))))
          && !(this.token.kind === "identifier" && !this.isIdentifier(this.lookAhead(1)) && !this.lookAhead(1).kind.match(/keyword/))) {
        if (result.names.has(word)) this.fail("repeated modifier", this.position(), "repeated-modifier");
        result.names.add(word);
        this.index++;
        continue;
      }
      return result;
    }
  }

  // ---- classes -------------------------------------------------------------
  private classDeclaration(modifiers: Ast.Modifiers): Ast.ClassDeclaration {
    // javac reports class-level errors at the `class` keyword, not the modifiers.
    const start = this.position();
    const keyword = this.token.text as Ast.ClassDeclaration["declarationKind"];
    this.index++;
    const nameToken = this.identifier();
    const declaration: Ast.ClassDeclaration = {
      kind: "Class", position: start, namePosition: this.position(nameToken), modifiers,
      declarationKind: keyword, name: nameToken.text, typeParameters: [],
      superclass: null, interfaces: [], members: [], enumConstants: [],
      closePosition: start, file: this.file,
    };
    if (this.is("<")) declaration.typeParameters = this.typeParameters();
    if (keyword === "record") {
      // record Point(int x, int y) - parsed so it can be reported as unsupported.
      this.skipBalanced("(", ")");
    }
    if (this.accept("extends")) {
      declaration.superclass = this.type();
      if (keyword === "interface") {
        declaration.interfaces.push(declaration.superclass);
        declaration.superclass = null;
        while (this.accept(",")) declaration.interfaces.push(this.type());
      }
    }
    if (this.accept("implements")) {
      do declaration.interfaces.push(this.type()); while (this.accept(","));
    }
    if (this.isContextual("permits")) { this.index++; do this.type(); while (this.accept(",")); }
    this.expect("{");
    if (keyword === "enum") this.enumConstants(declaration);
    while (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      this.member(declaration);
    }
    declaration.closePosition = this.position();
    this.index++;
    return declaration;
  }

  private typeParameters(): string[] {
    const names: string[] = [];
    this.expect("<");
    do {
      this.skipAnnotations();
      names.push(this.identifier().text);
      if (this.accept("extends")) { this.type(); while (this.accept("&")) this.type(); }
    } while (this.accept(","));
    this.closeAngle();
    return names;
  }

  private enumConstants(declaration: Ast.ClassDeclaration) {
    while (this.isIdentifier() || this.is("@")) {
      this.skipAnnotations();
      const nameToken = this.identifier();
      const constant: Ast.EnumConstant = { name: nameToken.text, position: this.position(nameToken), args: [], hasBody: false };
      if (this.is("(")) constant.args = this.arguments();
      if (this.is("{")) { constant.hasBody = true; this.skipBalanced("{", "}"); }
      declaration.enumConstants.push(constant);
      if (!this.accept(",")) break;
    }
    if (!this.accept(";") && !this.is("}")) this.expect(";");
  }

  private member(owner: Ast.ClassDeclaration) {
    if (this.accept(";")) return;
    const start = this.position();
    if (this.is("{") || (this.is("static") && this.is("{", this.lookAhead(1)))) {
      const isStatic = this.accept("static");
      owner.members.push({ kind: "Initializer", position: start, isStatic, body: this.block() });
      return;
    }
    const modifiers = this.modifiers();
    if (this.is("class") || this.is("interface") || this.is("enum") || this.isContextual("record")) {
      owner.members.push(this.classDeclaration(modifiers));
      return;
    }
    const typeParameters = this.is("<") ? this.typeParameters() : [];
    // Constructor: the class's own name, then "(".
    if (this.isIdentifier() && this.token.text === owner.name && this.is("(", this.lookAhead(1))) {
      const nameToken = this.tokens[this.index++];
      const parameters = this.parameters();
      const throwsTypes = this.throwsClause();
      owner.members.push(this.constructorBody(modifiers, start, nameToken, parameters, throwsTypes));
      return;
    }
    if (this.isIdentifier() && this.is("(", this.lookAhead(1))) {
      this.fail("invalid method declaration; return type required", this.position(), "return-type-required");
    }
    let returnType: Ast.TypeNode;
    if (this.is("void")) {
      returnType = { kind: "Type", position: this.position(), name: "void", typeArguments: null, dimensions: 0 };
      this.index++;
    } else {
      if (!this.startsType()) {
        if (this.atEnd()) this.endOfFile();
        this.fail(this.is("}") ? "class, interface, enum, or record expected" : "<identifier> expected",
                  this.is("}") ? this.position() : this.endOfPrevious(), "identifier-expected");
      }
      returnType = this.type();
    }
    const nameToken = this.identifier();
    if (this.is("(")) {
      const parameters = this.parameters();
      while (this.is("[")) { this.index++; this.expect("]"); returnType = { ...returnType, dimensions: returnType.dimensions + 1 }; }
      const throwsTypes = this.throwsClause();
      let body: Ast.Block | null = null;
      if (this.is("{")) body = this.block();
      else if (this.is("default")) { this.index++; this.expression(); this.expect(";"); }
      else this.expect(";");
      owner.members.push({
        kind: "Method", position: start, namePosition: this.position(nameToken), modifiers, typeParameters,
        returnType, name: nameToken.text, parameters, throwsTypes, body,
      });
      return;
    }
    if (returnType.name === "void") this.fail("'(' expected", this.endOfPrevious(), "token-expected");
    const declarators = this.declaratorsAfterFirstName(nameToken);
    this.expect(";");
    owner.members.push({ kind: "Field", position: start, modifiers, typeNode: returnType, declarators });
  }

  private constructorBody(modifiers: Ast.Modifiers, start: Ast.Position, nameToken: Token,
                          parameters: Ast.Parameter[], throwsTypes: Ast.TypeNode[]): Ast.ConstructorDeclaration {
    const open = this.position();
    this.expect("{");
    let explicitCall: Ast.ConstructorDeclaration["explicitCall"] = null;
    if ((this.is("this") || this.is("super")) && this.is("(", this.lookAhead(1))) {
      const at = this.position();
      const kind = this.token.text as "this" | "super";
      this.index++;
      const args = this.arguments();
      this.expect(";");
      explicitCall = { kind, args, position: at };
    }
    const statements: Ast.Statement[] = [];
    while (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      statements.push(this.blockStatement());
    }
    const closePosition = this.position();
    this.index++;
    return {
      kind: "Constructor", position: start, namePosition: this.position(nameToken), modifiers,
      name: nameToken.text, parameters, throwsTypes,
      body: { kind: "Block", position: open, statements, closePosition }, explicitCall,
    };
  }

  private parameters(): Ast.Parameter[] {
    this.expect("(");
    const parameters: Ast.Parameter[] = [];
    if (!this.is(")")) {
      do {
        const modifiers = this.modifiers();
        if (!this.startsType()) this.fail("<identifier> expected", this.endOfPrevious(), "identifier-expected");
        let typeNode = this.type();
        const varargs = this.accept("...");
        const nameToken = this.identifier();
        let extra = 0;
        while (this.is("[")) { this.index++; this.expect("]"); extra++; }
        if (extra) typeNode = { ...typeNode, dimensions: typeNode.dimensions + extra };
        if (varargs) typeNode = { ...typeNode, dimensions: typeNode.dimensions + 1 };
        parameters.push({ typeNode, name: nameToken.text, position: this.position(nameToken), isFinal: modifiers.names.has("final"), varargs });
      } while (this.accept(","));
    }
    this.expect(")");
    return parameters;
  }

  private throwsClause(): Ast.TypeNode[] {
    const types: Ast.TypeNode[] = [];
    if (this.accept("throws")) do types.push(this.type()); while (this.accept(","));
    return types;
  }

  private declaratorsAfterFirstName(first: Token): Ast.Declarator[] {
    const declarators: Ast.Declarator[] = [];
    let nameToken = first;
    while (true) {
      let dimensions = 0;
      while (this.is("[")) { this.index++; this.expect("]"); dimensions++; }
      let initializer: Ast.Expression | null = null;
      if (this.accept("=")) initializer = this.variableInitializer();
      declarators.push({ name: nameToken.text, position: this.position(nameToken), dimensions, initializer });
      if (!this.accept(",")) break;
      nameToken = this.identifier();
    }
    return declarators;
  }

  private variableInitializer(): Ast.Expression {
    return this.is("{") ? this.arrayInitializer() : this.expression();
  }

  private arrayInitializer(): Ast.ArrayInitializer {
    const at = this.position();
    this.expect("{");
    const elements: Ast.Expression[] = [];
    while (!this.is("}")) {
      elements.push(this.variableInitializer());
      if (!this.accept(",")) break;
    }
    if (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      this.fail("'}' expected", this.endOfPrevious(), "token-expected");
    }
    this.index++;
    return { kind: "ArrayInit", position: at, elements };
  }

  // ---- types ------------------------------------------------------------
  private startsType(token: Token = this.token): boolean {
    return (token.kind === "keyword" && PRIMITIVES.has(token.text)) || token.kind === "identifier";
  }

  type(): Ast.TypeNode {
    const at = this.position();
    if (this.token.kind === "keyword" && PRIMITIVES.has(this.token.text)) {
      const name = this.tokens[this.index++].text;
      return { kind: "Type", position: at, name, typeArguments: null, dimensions: this.dimensions() };
    }
    let name = this.identifier().text;
    let typeArguments: Ast.TypeNode[] | null = null;
    if (this.is("<")) typeArguments = this.typeArguments();
    while (this.is(".") && this.isIdentifier(this.lookAhead(1))) {
      this.index++;
      name += "." + this.identifier().text;
      if (this.is("<")) typeArguments = this.typeArguments();
    }
    return { kind: "Type", position: at, name, typeArguments, dimensions: this.dimensions() };
  }

  private dimensions(): number {
    let count = 0;
    while (this.is("[") && this.is("]", this.lookAhead(1))) { this.index += 2; count++; }
    return count;
  }

  private typeArguments(): Ast.TypeNode[] {
    this.expect("<");
    const list: Ast.TypeNode[] = [];
    if (this.is(">")) { this.index++; return list; }       // the diamond
    do {
      this.skipAnnotations();
      if (this.is("?")) {
        const at = this.position();
        this.index++;
        let bound: Ast.TypeNode = { kind: "Type", position: at, name: "Object", typeArguments: null, dimensions: 0 };
        if (this.accept("extends") || this.accept("super")) bound = this.type();
        list.push({ ...bound, wildcard: true });
      } else {
        if (!this.startsType()) this.fail("illegal start of type", this.position(), "illegal-start-of-type");
        list.push(this.type());
      }
    } while (this.accept(","));
    this.closeAngle();
    return list;
  }

  /** Does a type start here, and a variable name follow it? Scans without consuming. */
  private looksLikeDeclaration(allowColon: boolean): boolean {
    const saved = this.index;
    this.pendingCloses = 0;
    try {
      if (!this.startsType()) return false;
      if (!this.scanType()) return false;
      if (!this.isIdentifier()) return false;
      const after = this.lookAhead(1);
      if (this.is("=", after) || this.is(";", after) || this.is(",", after) || this.is("[", after)
          || (allowColon && this.is(":", after))) return true;
      // "String name" then something unexpected: still a declaration, missing its ';'.
      return this.token.line === this.lookAhead(1).line ? !this.is("(", after) && !this.is(".", after) : true;
    } finally {
      this.index = saved;
    }
  }

  /** Move past a type if one is here; false (position undefined) if not. */
  private scanType(): boolean {
    if (this.token.kind === "keyword" && PRIMITIVES.has(this.token.text)) {
      this.index++;
    } else {
      if (!this.isIdentifier()) return false;
      this.index++;
      if (this.is("<") && !this.scanTypeArguments()) return false;
      while (this.is(".") && this.isIdentifier(this.lookAhead(1))) {
        this.index += 2;
        if (this.is("<") && !this.scanTypeArguments()) return false;
      }
    }
    while (this.is("[") && this.is("]", this.lookAhead(1))) this.index += 2;
    return true;
  }

  private pendingCloses = 0;
  private scanTypeArguments(): boolean {
    this.index++;                                  // "<"
    if (this.is(">")) { this.index++; return true; }
    while (true) {
      if (this.is("?")) {
        this.index++;
        if ((this.is("extends") || this.is("super"))) { this.index++; if (!this.scanType()) return false; }
      } else if (!this.scanType()) return false;
      if (this.pendingCloses > 0) { this.pendingCloses--; return true; }
      if (this.is(",")) { this.index++; continue; }
      if (this.is(">")) { this.index++; return true; }
      if (this.is(">>")) { this.index++; this.pendingCloses = 1; return true; }
      if (this.is(">>>")) { this.index++; this.pendingCloses = 2; return true; }
      return false;
    }
  }

  // ---- statements ----------------------------------------------------------
  block(): Ast.Block {
    const at = this.position();
    this.expect("{");
    const statements: Ast.Statement[] = [];
    while (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      statements.push(this.blockStatement());
    }
    const closePosition = this.position();
    this.index++;
    return { kind: "Block", position: at, statements, closePosition };
  }

  private blockStatement(): Ast.Statement {
    const at = this.position();
    if (this.is("final") || this.is("@")) {
      const modifiers = this.modifiers();
      if (this.is("class") || this.is("interface") || this.is("enum")) return this.localClass(at);
      return this.localVariable(at, modifiers.names.has("final"));
    }
    if (this.is("class") || this.is("interface") || this.is("enum") || this.is("abstract")
        || (this.is("static") && (this.is("class", this.lookAhead(1)) || this.is("interface", this.lookAhead(1))))) {
      return this.localClass(at);
    }
    if (this.isContextual("record") && this.isIdentifier(this.lookAhead(1))) return this.localClass(at);
    if (this.isContextual("var") && this.isIdentifier(this.lookAhead(1))) return this.localVariable(at, false);
    if (this.isContextual("yield") && !this.startsNonYield(this.lookAhead(1))) {
      this.index++;
      const value = this.expression();
      this.expect(";");
      return { kind: "Yield", position: at, value };
    }
    if (this.looksLikeDeclaration(false)) return this.localVariable(at, false);
    if (this.is("public") || this.is("private") || this.is("protected") || this.is("static")) {
      // Almost always a method started before the last one's closing brace.
      this.fail("illegal start of expression", at, "illegal-start-of-expression");
    }
    return this.statement();
  }

  private startsNonYield(next: Token): boolean {
    return this.is("=", next) || this.is(".", next) || this.is("[", next) || this.is("++", next)
      || this.is("--", next) || this.is("(", next) || ASSIGNMENT_OPERATORS.has(next.text) && next.kind === "operator";
  }

  private localClass(at: Ast.Position): Ast.Statement {
    // Skip to the class body and past it.
    while (!this.is("{")) { if (this.atEnd()) this.endOfFile(); this.index++; }
    this.skipBalanced("{", "}");
    return { kind: "UnsupportedStmt", position: at, feature: "a class declared inside a method" };
  }

  private localVariable(at: Ast.Position, isFinal: boolean): Ast.LocalVariableDeclaration {
    const typeNode = this.isContextual("var")
      ? (() => { const position = this.position(); this.index++; return { kind: "Type", position, name: "var", typeArguments: null, dimensions: 0 } as Ast.TypeNode; })()
      : this.type();
    const declarators = this.declaratorsAfterFirstName(this.identifier());
    this.expect(";");
    return { kind: "LocalVar", position: at, typeNode, declarators, isFinal };
  }

  private statement(): Ast.Statement {
    const at = this.position();
    const token = this.token;
    if (this.is("{")) return this.block();
    if (this.accept(";")) return { kind: "Empty", position: at };
    if (token.kind === "keyword") {
      switch (token.text) {
        case "if": {
          this.index++;
          const condition = this.parenthesized();
          const thenBranch = this.embeddedStatement();
          const elseBranch = this.accept("else") ? this.embeddedStatement() : null;
          return { kind: "If", position: at, condition, thenBranch, elseBranch };
        }
        case "else":
          return this.fail("'else' without 'if'", at, "else-without-if");
        case "while": {
          this.index++;
          const condition = this.parenthesized();
          return { kind: "While", position: at, condition, body: this.embeddedStatement() };
        }
        case "do": {
          this.index++;
          const body = this.embeddedStatement();
          if (!this.is("while")) this.fail("'while' expected", this.endOfPrevious(), "token-expected");
          this.index++;
          const condition = this.parenthesized();
          this.expect(";");
          return { kind: "Do", position: at, body, condition };
        }
        case "for": return this.forStatement(at);
        case "return": {
          this.index++;
          const value = this.is(";") ? null : this.expression();
          this.expect(";");
          return { kind: "Return", position: at, value };
        }
        case "break": case "continue": {
          this.index++;
          const label = this.isIdentifier() ? this.identifier().text : null;
          this.expect(";");
          return { kind: token.text === "break" ? "Break" : "Continue", position: at, label };
        }
        case "throw": {
          this.index++;
          const value = this.expression();
          this.expect(";");
          return { kind: "Throw", position: at, value };
        }
        case "switch": {
          this.index++;
          const selector = this.parenthesized();
          const { cases, closePosition } = this.switchBody();
          return { kind: "Switch", position: at, selector, cases, closePosition };
        }
        case "try": return this.tryStatement(at);
        case "assert": {
          this.index++;
          const condition = this.expression();
          const message = this.accept(":") ? this.expression() : null;
          this.expect(";");
          return { kind: "Assert", position: at, condition, message };
        }
        case "synchronized": {
          this.index++;
          this.parenthesized();
          this.block();
          return { kind: "UnsupportedStmt", position: at, feature: "synchronized blocks" };
        }
        case "case": case "default":
          return this.fail("orphaned " + token.text, at, "orphaned-case");
        case "catch": case "finally":
          return this.fail(`'${token.text}' without 'try'`, at, "catch-without-try");
      }
    }
    if (this.isIdentifier() && this.is(":", this.lookAhead(1))) {
      const label = this.identifier().text;
      this.index++;
      return { kind: "Labeled", position: at, label, body: this.statement() };
    }
    const expression = this.expression();
    if (!["Assign", "Call", "New", "Unsupported"].includes(expression.kind)
        && !((expression.kind === "Unary" && (expression.operator === "++" || expression.operator === "--")) || expression.kind === "Postfix")) {
      this.fail("not a statement", expression.position, "not-a-statement");
    }
    this.expect(";");
    return { kind: "ExprStmt", position: at, expression };
  }

  /** The body of an if/while/for: a declaration is not allowed on its own there. */
  private embeddedStatement(): Ast.Statement {
    if (this.looksLikeDeclaration(false) && !this.isContextual("var")) {
      const at = this.position();
      this.fail("variable declaration not allowed here", at, "declaration-not-allowed");
    }
    return this.statement();
  }

  private parenthesized(): Ast.Expression {
    this.expect("(");
    const inner = this.expression();
    this.expect(")");
    return inner;
  }

  private forStatement(at: Ast.Position): Ast.Statement {
    this.index++;
    this.expect("(");
    const declarationStart = this.position();
    let isFinal = false;
    if (this.is("final") || this.is("@")) isFinal = this.modifiers().names.has("final");
    const isVar = this.isContextual("var") && this.isIdentifier(this.lookAhead(1));
    if (isVar || this.looksLikeDeclaration(true)) {
      const typeNode: Ast.TypeNode = isVar
        ? (() => { const position = this.position(); this.index++; return { kind: "Type", position, name: "var", typeArguments: null, dimensions: 0 } as Ast.TypeNode; })()
        : this.type();
      const nameToken = this.identifier();
      if (this.accept(":")) {
        const iterable = this.expression();
        this.expect(")");
        return { kind: "ForEach", position: at, typeNode, name: nameToken.text, namePosition: this.position(nameToken),
                 isFinal, iterable, body: this.embeddedStatement() };
      }
      const declarators = this.declaratorsAfterFirstName(nameToken);
      return this.forRest(at, [{ kind: "LocalVar", position: declarationStart, typeNode, declarators, isFinal }]);
    }
    const init: Ast.Statement[] = [];
    if (!this.is(";")) {
      do {
        const expressionAt = this.position();
        init.push({ kind: "ExprStmt", position: expressionAt, expression: this.expression() });
      } while (this.accept(","));
    }
    return this.forRest(at, init);
  }

  private forRest(at: Ast.Position, init: Ast.Statement[]): Ast.ForStatement {
    this.expect(";");
    const condition = this.is(";") ? null : this.expression();
    this.expect(";");
    const update: Ast.Expression[] = [];
    if (!this.is(")")) do update.push(this.expression()); while (this.accept(","));
    this.expect(")");
    return { kind: "For", position: at, init, condition, update, body: this.embeddedStatement() };
  }

  private switchBody(): { cases: Ast.SwitchCase[]; closePosition: Ast.Position } {
    this.expect("{");
    const cases: Ast.SwitchCase[] = [];
    let arrowKind: boolean | null = null;
    while (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      const at = this.position();
      const switchCase: Ast.SwitchCase = { position: at, labels: [], isDefault: false, arrow: false, body: [] };
      if (this.accept("default")) {
        switchCase.isDefault = true;
      } else if (this.accept("case")) {
        do {
          if (this.accept("default")) { switchCase.isDefault = true; continue; }
          const label = this.ternary();
          if (this.isIdentifier() || (this.is("(") && label.kind === "Name")) {
            // case Integer number -> ...   (a type pattern, Java 21)
            while (!this.is("->") && !this.is(":")) { if (this.atEnd()) this.endOfFile(); this.index++; }
            switchCase.labels.push({ kind: "Unsupported", position: label.position, feature: "patterns in switch cases" });
          } else switchCase.labels.push(label);
        } while (this.accept(","));
      } else {
        this.fail("orphaned " + (this.atEnd() ? "end" : this.token.text), at, "case-expected");
      }
      if (this.accept("->")) switchCase.arrow = true;
      else if (!this.accept(":")) this.fail("':' or '->' expected", this.endOfPrevious(), "token-expected");
      if (arrowKind !== null && arrowKind !== switchCase.arrow) {
        this.fail("different case kinds used in the switch", at, "mixed-case-kinds");
      }
      arrowKind = switchCase.arrow;
      if (switchCase.arrow) {
        const bodyAt = this.position();
        if (this.is("{")) switchCase.body = [this.block()];
        else if (this.is("throw")) switchCase.body = [this.statement()];
        else {
          const expression = this.expression();
          this.expect(";");
          switchCase.arrowExpression = expression;
          switchCase.body = [{ kind: "ExprStmt", position: bodyAt, expression }];
        }
      } else {
        while (!this.is("case") && !this.is("default") && !this.is("}")) {
          if (this.atEnd()) this.endOfFile();
          // "default" can also start a statement? No - only a label here.
          switchCase.body.push(this.blockStatement());
        }
      }
      cases.push(switchCase);
    }
    const closePosition = this.position();
    this.index++;
    return { cases, closePosition };
  }

  private tryStatement(at: Ast.Position): Ast.TryStatement {
    this.index++;
    let hasResources = false;
    if (this.is("(")) { hasResources = true; this.skipBalanced("(", ")"); }
    const body = this.block();
    const catches: Ast.CatchClause[] = [];
    while (this.is("catch")) {
      const catchAt = this.position();
      this.index++;
      this.expect("(");
      this.modifiers();
      const types = [this.type()];
      while (this.accept("|")) types.push(this.type());
      const name = this.identifier().text;
      this.expect(")");
      catches.push({ position: catchAt, types, name, body: this.block() });
    }
    const finallyBlock = this.accept("finally") ? this.block() : null;
    if (!catches.length && !finallyBlock && !hasResources) {
      this.fail("'try' without 'catch', 'finally' or resource declarations", at, "try-without-catch");
    }
    return { kind: "Try", position: at, body, catches, finallyBlock, hasResources };
  }

  // ---- expressions ---------------------------------------------------------
  expression(): Ast.Expression {
    return this.assignment();
  }

  private assignment(): Ast.Expression {
    const lambda = this.lambdaAhead();
    if (lambda) return lambda;
    const target = this.ternary();
    if (this.token.kind === "operator" && ASSIGNMENT_OPERATORS.has(this.token.text)) {
      const operatorPosition = this.position();
      const operator = this.tokens[this.index++].text;
      const value = this.assignment();
      return { kind: "Assign", position: target.position, operator, target, value, operatorPosition };
    }
    return target;
  }

  /** x -> ..., (x, y) -> ..., (int x) -> ... : parse past it, report unsupported. */
  private lambdaAhead(): Ast.Expression | null {
    const at = this.position();
    let isLambda = false;
    if (this.isIdentifier() && this.is("->", this.lookAhead(1))) { this.index += 2; isLambda = true; }
    else if (this.is("(")) {
      let depth = 0, scan = this.index;
      do {
        const text = this.tokens[scan];
        if (text.kind === "end") break;
        if (this.is("(", text)) depth++;
        if (this.is(")", text)) depth--;
        scan++;
      } while (depth > 0);
      if (this.is("->", this.tokens[scan])) { this.index = scan + 1; isLambda = true; }
    }
    if (!isLambda) return null;
    if (this.is("{")) this.skipBalanced("{", "}");
    else this.expression();
    return { kind: "Unsupported", position: at, feature: "lambda expressions (->)" };
  }

  private ternary(): Ast.Expression {
    const condition = this.binary(1);
    if (!this.is("?")) return condition;
    this.index++;
    const whenTrue = this.lambdaAhead() ?? this.expression();
    this.expect(":");
    const whenFalse = this.lambdaAhead() ?? this.ternary();
    return { kind: "Conditional", position: condition.position, condition, whenTrue, whenFalse };
  }

  private binary(minimum: number): Ast.Expression {
    let left = this.unary();
    while (true) {
      const token = this.token;
      const operator = token.kind === "operator" || token.text === "instanceof" ? token.text : "";
      const precedence = BINARY_PRECEDENCE[operator];
      if (!precedence || precedence < minimum) return left;
      const operatorPosition = this.position();
      this.index++;
      if (operator === "instanceof") {
        const isFinal = this.accept("final");
        const typeNode = this.type();
        let binding: string | null = null;
        if (this.isIdentifier()) binding = this.identifier().text;
        else if (isFinal) this.identifier();
        left = { kind: "InstanceOf", position: left.position, operand: left, typeNode, binding, operatorPosition };
        continue;
      }
      const right = this.binary(precedence + 1);
      left = { kind: "Binary", position: left.position, operator, left, right, operatorPosition };
    }
  }

  private unary(): Ast.Expression {
    const at = this.position();
    const token = this.token;
    if (token.kind === "operator" && (token.text === "+" || token.text === "-" || token.text === "++" || token.text === "--" || token.text === "!" || token.text === "~")) {
      this.index++;
      // -2147483648: the one int literal that only exists with its minus sign.
      if (token.text === "-" && (this.token.kind === "int" || this.token.kind === "long") && typeof this.token.value === "bigint") {
        const literal = this.token;
        const limit = literal.kind === "int" ? 2147483648n : 9223372036854775808n;
        if (literal.value === limit) {
          this.index++;
          return this.postfixSelectors({
            kind: "Literal", position: at, literalType: literal.kind as "int" | "long", text: "-" + literal.text,
            value: literal.kind === "int" ? -2147483648 : -9223372036854775808n,
          });
        }
      }
      const operand = this.unary();
      return { kind: "Unary", position: at, operator: token.text as Ast.Unary["operator"], operand };
    }
    if (this.is("(")) {
      const cast = this.castAhead();
      if (cast) return cast;
    }
    return this.postfix();
  }

  private castAhead(): Ast.Expression | null {
    const saved = this.index;
    const at = this.position();
    this.pendingCloses = 0;
    this.index++;                                         // "("
    const primitive = this.token.kind === "keyword" && PRIMITIVES.has(this.token.text);
    if (!this.startsType() || !this.scanType() || !this.is(")")) { this.index = saved; return null; }
    const after = this.lookAhead(1);
    const operandStarts = after.kind === "identifier" || after.kind === "int" || after.kind === "long"
      || after.kind === "float" || after.kind === "double" || after.kind === "char" || after.kind === "string"
      || this.is("(", after) || this.is("!", after) || this.is("~", after)
      || ["this", "super", "new", "true", "false", "null", "switch"].some((word) => this.is(word, after))
      || (after.kind === "keyword" && PRIMITIVES.has(after.text));
    const castable = primitive
      ? operandStarts || this.is("+", after) || this.is("-", after) || this.is("++", after) || this.is("--", after)
      : operandStarts;
    if (!castable) { this.index = saved; return null; }
    this.index = saved + 1;
    const typeNode = this.type();
    this.expect(")");
    const operand = primitive ? this.unary() : this.unaryNotPlusMinus();
    return { kind: "Cast", position: at, typeNode, operand };
  }

  private unaryNotPlusMinus(): Ast.Expression {
    if (this.is("!") || this.is("~")) return this.unary();
    if (this.is("(")) { const cast = this.castAhead(); if (cast) return cast; }
    return this.postfix();
  }

  private postfix(): Ast.Expression {
    return this.postfixSelectors(this.primary());
  }

  private postfixSelectors(start: Ast.Expression): Ast.Expression {
    let expression = this.selectors(start);
    while (this.is("++") || this.is("--")) {
      const operator = this.tokens[this.index++].text as "++" | "--";
      expression = { kind: "Postfix", position: expression.position, operator, operand: expression };
    }
    return expression;
  }

  private selectors(start: Ast.Expression): Ast.Expression {
    let expression = start;
    while (true) {
      if (this.is(".")) {
        const dotPosition = this.position();
        this.index++;
        if (this.is("new") || this.is("class") || this.is("this") || this.is("<") || this.is("super")) {
          const feature = this.is("new") ? "creating an inner class from an object (outer.new Inner())"
            : this.is("class") ? "class literals (.class)" : this.is("<") ? "explicit generic method calls" : "qualified this / super";
          const isCreation = this.is("new");
          this.index++;
          if (isCreation) {
            // outer.new Inner<T>(args) { body }: step over all of it.
            this.type();
            if (this.is("(")) this.arguments();
            if (this.is("{")) this.skipBalanced("{", "}");
          } else if (this.is("(")) this.arguments();
          expression = { kind: "Unsupported", position: expression.position, feature };
          continue;
        }
        const nameToken = this.identifier();
        if (this.is("(")) {
          const args = this.arguments();
          expression = { kind: "Call", position: expression.position, target: expression, name: nameToken.text,
                         args, namePosition: this.position(nameToken), dotPosition };
        } else {
          expression = { kind: "FieldAccess", position: expression.position, target: expression, name: nameToken.text, dotPosition };
        }
        continue;
      }
      if (this.is("[")) {
        if (this.is("]", this.lookAhead(1))) {
          // String[].class and the like
          this.fail("illegal start of expression", this.position(), "illegal-start-of-expression");
        }
        this.index++;
        const index = this.expression();
        this.expect("]");
        expression = { kind: "ArrayAccess", position: expression.position, array: expression, index };
        continue;
      }
      if (this.is("::")) {
        this.index++;
        if (this.is("new")) this.index++; else this.identifier();
        expression = { kind: "Unsupported", position: expression.position, feature: "method references (::)" };
        continue;
      }
      return expression;
    }
  }

  private arguments(): Ast.Expression[] {
    this.expect("(");
    const args: Ast.Expression[] = [];
    if (!this.is(")")) {
      do args.push(this.expression()); while (this.accept(","));
    }
    if (!this.is(")")) {
      if (this.atEnd()) this.endOfFile();
      this.fail("')' expected", this.endOfPrevious(), "token-expected");
    }
    this.index++;
    return args;
  }

  private primary(): Ast.Expression {
    const at = this.position();
    const token = this.token;
    switch (token.kind) {
      case "int": {
        this.index++;
        if (token.value === 2147483648n) this.fail("integer number too large", at, "number-too-large");
        return { kind: "Literal", position: at, literalType: "int", value: Number(token.value), text: token.text };
      }
      case "long": {
        this.index++;
        if (token.value === 9223372036854775808n) this.fail("integer number too large", at, "number-too-large");
        return { kind: "Literal", position: at, literalType: "long", value: token.value as bigint, text: token.text };
      }
      case "float": case "double": case "char": case "string":
        this.index++;
        return { kind: "Literal", position: at, literalType: token.kind, value: token.value as number | string, text: token.text };
      case "identifier": {
        this.index++;
        if (this.is("(")) {
          const args = this.arguments();
          return { kind: "Call", position: at, target: null, name: token.text, args, namePosition: at };
        }
        return { kind: "Name", position: at, name: token.text };
      }
      case "end":
        return this.endOfFile();
    }
    if (token.kind === "keyword") {
      switch (token.text) {
        case "true": case "false":
          this.index++;
          return { kind: "Literal", position: at, literalType: "boolean", value: token.text === "true", text: token.text };
        case "null":
          this.index++;
          return { kind: "Literal", position: at, literalType: "null", value: null, text: "null" };
        case "this":
          this.index++;
          if (this.is("(")) this.fail("call to this must be first statement in constructor", at, "this-call-position");
          return { kind: "This", position: at };
        case "super": {
          this.index++;
          if (this.is("(")) this.fail("call to super must be first statement in constructor", at, "super-call-position");
          const dotPosition = this.position();
          this.expect(".");
          const nameToken = this.identifier();
          const superTarget: Ast.Expression = { kind: "Name", position: at, name: "super" };
          if (this.is("(")) {
            const args = this.arguments();
            return { kind: "Call", position: at, target: superTarget, name: nameToken.text, args,
                     namePosition: this.position(nameToken), dotPosition, superCall: true };
          }
          return { kind: "FieldAccess", position: at, target: { kind: "This", position: at }, name: nameToken.text, dotPosition };
        }
        case "new": return this.creator();
        case "switch": {
          this.index++;
          const selector = this.parenthesized();
          const { cases } = this.switchBody();
          return { kind: "SwitchExpr", position: at, selector, cases };
        }
      }
      if (PRIMITIVES.has(token.text) || token.text === "void") {
        // int.class, int[]::new ...
        this.index++;
        while (this.is("[") || this.is("]")) this.index++;
        if (this.accept(".") && this.accept("class")) return { kind: "Unsupported", position: at, feature: "class literals (.class)" };
        if (this.accept("::")) { this.accept("new"); return { kind: "Unsupported", position: at, feature: "method references (::)" }; }
        this.fail("'.class' expected", this.endOfPrevious(), "class-expected");
      }
    }
    if (this.is("(")) {
      this.index++;
      const inner = this.expression();
      this.expect(")");
      return inner;
    }
    return this.fail("illegal start of expression", at, "illegal-start-of-expression");
  }

  private creator(): Ast.Expression {
    const at = this.position();
    this.index++;                                         // "new"
    if (!this.startsType()) {
      if (this.atEnd()) this.endOfFile();
      this.fail("<identifier> expected", this.endOfPrevious(), "identifier-expected");
    }
    // The element or class type, without dimensions.
    const typeAt = this.position();
    let typeNode: Ast.TypeNode;
    if (this.token.kind === "keyword" && PRIMITIVES.has(this.token.text)) {
      typeNode = { kind: "Type", position: typeAt, name: this.tokens[this.index++].text, typeArguments: null, dimensions: 0 };
    } else {
      let name = this.identifier().text;
      let typeArguments: Ast.TypeNode[] | null = null;
      if (this.is("<")) typeArguments = this.typeArguments();
      while (this.is(".") && this.isIdentifier(this.lookAhead(1))) {
        this.index++;
        name += "." + this.identifier().text;
        if (this.is("<")) typeArguments = this.typeArguments();
      }
      typeNode = { kind: "Type", position: typeAt, name, typeArguments, dimensions: 0 };
    }
    if (this.is("[")) {
      const dimensionExpressions: Ast.Expression[] = [];
      let extraDimensions = 0;
      while (this.is("[")) {
        if (this.is("]", this.lookAhead(1))) { this.index += 2; extraDimensions++; continue; }
        if (extraDimensions) this.fail("']' expected", this.position(), "token-expected");
        this.index++;
        dimensionExpressions.push(this.expression());
        this.expect("]");
      }
      let initializer: Ast.ArrayInitializer | null = null;
      if (this.is("{")) {
        if (dimensionExpressions.length) this.fail("';' expected", this.endOfPrevious(), "semicolon-expected");
        initializer = this.arrayInitializer();
      } else if (!dimensionExpressions.length) {
        this.fail("array dimension missing", this.position(), "array-dimension-missing");
      }
      const created: Ast.NewArray = { kind: "NewArray", position: at, elementType: typeNode, dimensionExpressions, extraDimensions, initializer };
      return initializer ? this.selectors(created) : created;
    }
    if (!this.is("(")) this.fail("'(' or '[' expected", this.endOfPrevious(), "token-expected");
    const args = this.arguments();
    let hasBody = false;
    if (this.is("{")) { hasBody = true; this.skipBalanced("{", "}"); }
    return { kind: "New", position: at, typeNode, args, hasBody };
  }
}
