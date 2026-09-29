/* The Java parser: tokens in, a CompilationUnit out.

   Recursive descent, one method per grammar rule. Error wording and caret
   positions follow javac - "';' expected" points just past the token before
   the gap, not at whatever happens to come next.

   After a mistake it carries on the way javac's parser does, so a file with
   three missing semicolons gets three errors, not one run per semicolon:
   a missing token is reported and taken as read (javac's accept()), a damaged
   statement or member is skipped to where the next one can start (skip()),
   and nothing is reported at or before the place of the last complaint.
   Mistakes javac recovers from in some cleverer way stop the file instead,
   so what is printed is always the start of javac's own list.

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
/** Where javac points at a whole expression: its operator, dot or bracket, else its start. */
function operatorOf(expression: Ast.Expression): Ast.Position {
  switch (expression.kind) {
    case "Binary": case "Assign": case "InstanceOf": return expression.operatorPosition;
    case "FieldAccess": return expression.dotPosition;
    case "ArrayAccess": return expression.bracketPosition;
    case "Conditional": return expression.questionPosition;
    default: return expression.position;
  }
}

// The expression javac's illegal() gives back: the one that ends the expression at once.
const ILLEGAL_START = "an illegal start of expression";
// What javac takes for a statement, even where only members belong.
const DEFINITE_STATEMENT_STARTS = new Set(["if", "while", "do", "switch", "return", "try", "for", "assert", "break", "continue", "throw"]);
// The tokens javac's skip() stops at, by what it is looking for.
const SKIP_ALWAYS_STOPS_AT = new Set(["public", "final", "abstract", "@", "class", "interface", "enum"]);
const SKIP_MEMBER_STARTS = new Set(["{", "}", "private", "protected", "static", "transient", "native", "volatile",
  "synchronized", "strictfp", "<", "byte", "short", "char", "int", "long", "float", "double", "boolean", "void"]);
const SKIP_STATEMENT_STARTS = new Set(["case", "default", "if", "for", "while", "do", "try", "switch", "return",
  "throw", "break", "continue", "else", "finally", "catch", "this", "super", "new", "assert"]);
const MODIFIERS = new Set(["public", "private", "protected", "static", "final", "abstract", "native",
  "synchronized", "transient", "volatile", "strictfp", "default", "sealed", "non-sealed"]);

/** Every syntax error in one file, in the order javac prints them. */
export class JavaSyntaxErrors extends Error {
  constructor(readonly errors: JavaSyntaxError[]) {
    super(errors[0].message);
  }
}

/** Thrown to abandon a file after a mistake the parser does not step past. */
class ParseStopped extends Error {}

export function parse(source: string, file: string): Ast.CompilationUnit {
  const parser = new Parser(tokenize(source), file);
  let unit: Ast.CompilationUnit | null = null;
  try {
    unit = parser.compilationUnit();
  } catch (error) {
    if (!(error instanceof ParseStopped)) throw error;
  }
  if (parser.errors.length) {
    // javac's log shows only the first error at any one place.
    const places = new Set<string>();
    const errors = parser.errors.filter((error) => {
      const place = `${error.line}:${error.column}`;
      if (places.has(place)) return false;
      places.add(place);
      return true;
    });
    throw new JavaSyntaxErrors(errors);
  }
  if (!unit) throw new Error("the Java parser stopped without saying why");
  return unit;
}

class Parser {
  private index = 0;
  readonly errors: JavaSyntaxError[] = [];
  /** javac's errPos: nothing is reported at or before the last complaint's place. */
  private lastErrorOffset = -1;
  /** javac's errorEndPos: the token a complaint was made in front of. A statement or
      member that stops at or before it was damaged, and what follows is skipped. */
  private errorEndOffset = -1;
  private stuckIndex = -1;
  private stuckCount = 0;
  private reportedMalformed = new Set<number>();
  constructor(private tokens: Token[], private file: string) {}

  // ---- token helpers -----------------------------------------------------
  private get token(): Token {
    const token = this.tokens[this.index];
    if (token.kind === "error" && !this.reportedMalformed.has(this.index)) {
      // A malformed token (an unclosed string...) is reported as the parser reaches it, as javac's scanner does.
      this.reportedMalformed.add(this.index);
      this.errors.push(token.error!);
      this.lastErrorOffset = Math.max(this.lastErrorOffset, token.offset);
      if (token.fatal) throw new ParseStopped();
    }
    return token;
  }
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
  /** javac's reportSyntaxError: one complaint per place, none at or before the last one. */
  private report(message: string, at: Ast.Position, code: string) {
    // Recovery that keeps complaining without moving on has nothing more to say.
    if (this.index === this.stuckIndex) {
      if (++this.stuckCount > 20) throw new ParseStopped();
    } else {
      this.stuckIndex = this.index;
      this.stuckCount = 0;
    }
    if (at.offset > this.lastErrorOffset && !this.reportedAt(at)) {
      const atEnd = this.tokens[this.index].kind === "end";
      this.errors.push(atEnd ? new JavaSyntaxError("reached end of file while parsing", at.line, at.column, "end-of-file")
                             : new JavaSyntaxError(message, at.line, at.column, code));
    }
    // Even a quieter, earlier complaint moves the place back, as javac's errPos does.
    this.lastErrorOffset = at.offset;
    if (this.errors.length >= 100) throw new ParseStopped();
  }
  /** javac's log.error(): no bookkeeping, so shown even where a syntax error would be kept quiet,
      and even from a speculative parse, which only silences syntax errors. */
  private logDirectly(message: string, at: { line: number; column: number }, code: string) {
    if (this.reportedAt(at)) return;
    const error = new JavaSyntaxError(message, at.line, at.column, code);
    this.errors.push(error);
    this.loggedDirectly.add(error);
  }
  /** javac's Log shows one error per place in a file, whichever came first. */
  private reportedAt(at: { line: number; column: number }): boolean {
    return this.errors.some((error) => error.line === at.line && error.column === at.column);
  }
  private loggedDirectly = new WeakSet<JavaSyntaxError>();

  /** javac's syntaxError(): a complaint about the current place, which what follows is skipped past. */
  private complain(message: string, at: Ast.Position, code: string) {
    this.errorEndOffset = Math.max(this.errorEndOffset, at.offset);
    this.report(message, at, code);
  }
  /** A mistake this parser does not step past: report it and stop the file. */
  private fail(message: string, at: Ast.Position, code: string): never {
    this.report(message, at, code);
    throw new ParseStopped();
  }
  /** javac's accept(): say what is missing, just after the last token that was fine, then carry on as if it were there. */
  private missing(message: string, code: string) {
    this.errorEndOffset = Math.max(this.errorEndOffset, this.token.offset);
    this.report(message, this.endOfPrevious(), code);
  }
  private expect(text: string): Token {
    if (this.is(text)) return this.tokens[this.index++];
    if (this.atEnd()) this.endOfFile();
    this.missing(`'${text}' expected`, text === ";" ? "semicolon-expected" : "token-expected");
    return this.previous;
  }
  private endOfFile(): never {
    return this.fail("reached end of file while parsing", this.endOfPrevious(), "end-of-file");
  }
  private identifier(): Token {
    if (this.isIdentifier()) return this.tokens[this.index++];
    if (this.atEnd()) this.endOfFile();
    this.missing("<identifier> expected", "identifier-expected");
    return { ...this.previous, kind: "identifier", text: "<error>" };
  }
  /** Recovery that stays in one place would loop for ever: stop the file instead. */
  private madeProgress(before: number) {
    if (this.index === before) throw new ParseStopped();
  }
  /** javac's skip(): step over a damaged stretch to a token something can start again at. */
  private skip(stopAt: { imports?: boolean; members?: boolean; identifiers?: boolean; statements?: boolean }) {
    while (true) {
      const token = this.token;
      if (token.kind === "end") return;
      if (token.kind === "identifier") {
        if (stopAt.identifiers) return;
      } else if (token.kind === "operator" || token.kind === "keyword") {
        if (token.text === ";") { this.index++; return; }
        if (SKIP_ALWAYS_STOPS_AT.has(token.text)) return;
        if (token.text === "import" && stopAt.imports) return;
        if (SKIP_MEMBER_STARTS.has(token.text) && stopAt.members) return;
        if (SKIP_STATEMENT_STARTS.has(token.text) && stopAt.statements) return;
      }
      this.index++;
    }
  }
  /** The ">" that ends type arguments, or (listEnd false) type parameters, as javac asks for each. */
  private closeAngle(listEnd: boolean) {
    const current = this.token;
    if (this.is(">")) { this.index++; return; }
    const rest: Record<string, string> = { ">>": ">", ">>>": ">>", ">=": "=", ">>=": ">=", ">>>=": ">>=" };
    if (current.kind === "operator" && rest[current.text]) {
      this.tokens[this.index] = { ...current, text: rest[current.text], offset: current.offset + 1, column: current.column + 1 };
      return;
    }
    // javac says so and reads on as if the ">" were there.
    if (listEnd) this.complain("> or ',' expected", this.position(), "token-expected");
    else this.missing("> expected", "token-expected");
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
      // javac points at the dot before the last name: java.util<.>Scanner, or for java.util.*, java<.>util.
      let namePosition = this.position(), packagePosition = namePosition;
      let name = this.identifier().text;
      let star = false;
      while (this.is(".")) {
        packagePosition = namePosition;
        namePosition = this.position();
        this.index++;
        if (this.accept("*")) { star = true; break; }
        name += "." + this.identifier().text;
      }
      this.expect(";");
      unit.imports.push({ name, star, isStatic, position: at, namePosition: star ? packagePosition : namePosition });
      if (this.token.offset <= this.errorEndOffset) this.skip({ imports: true });
    }
    while (this.token.kind !== "end") {
      const before = this.index;
      if (this.token.offset <= this.errorEndOffset) {
        this.skip({});
        if (this.atEnd()) break;
      }
      if (this.accept(";")) continue;
      const modifiers = this.modifiers();
      if (this.is("class") || this.is("interface") || this.is("enum") || this.isContextual("record")) {
        unit.types.push(this.classDeclaration(modifiers));
        this.madeProgress(before);
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
        // javac logs this one straight away, outside its syntax-error bookkeeping, and reads on.
        if (result.names.has(word)) this.logDirectly("repeated modifier", this.position(), "repeated-modifier");
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
    if (this.token.offset <= this.errorEndOffset) {
      // A damaged header: the body starts at the next "{", or there is none.
      if (keyword === "enum") throw new ParseStopped();
      this.skip({ members: true });
      if (!this.accept("{")) return declaration;
    }
    if (keyword === "enum") this.enumConstants(declaration);
    while (!this.is("}")) {
      if (this.atEnd()) this.endOfFile();
      const before = this.index;
      this.member(declaration);
      if (this.token.offset <= this.errorEndOffset) this.skip({ members: true, identifiers: true });
      this.madeProgress(before);
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
    this.closeAngle(false);
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
    // A statement where a member belongs: javac reads it as one, then says so.
    if (this.token.kind === "keyword" && DEFINITE_STATEMENT_STARTS.has(this.token.text)) {
      const at = this.position();
      this.blockStatement();
      this.complain("statements not expected outside of methods and initializers", at, "statement-outside-method");
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
    let returnType: Ast.TypeNode;
    let nameToken: Token;
    if (this.isIdentifier() && this.is("(", this.lookAhead(1))) {
      // javac says so at the name, always, and reads on as if it were a constructor.
      const at = this.position();
      this.logDirectly("invalid method declaration; return type required", at, "return-type-required");
      returnType = { kind: "Type", position: at, name: "void", typeArguments: null, dimensions: 0 };
      nameToken = this.tokens[this.index++];
    } else {
      if (this.is("void")) {
        returnType = { kind: "Type", position: this.position(), name: "void", typeArguments: null, dimensions: 0 };
        this.index++;
      } else {
        if (!this.startsType()) {
          if (this.atEnd()) this.endOfFile();
          // javac then looks for a name it cannot find, quietly, and reads on as a field.
          returnType = { kind: "Type", position: this.position(), name: "<error>", typeArguments: null, dimensions: 0 };
          this.complain("illegal start of type", this.position(), "illegal-start-of-type");
        } else {
          returnType = this.type();
        }
      }
      nameToken = this.identifier();
    }
    if (this.is("(")) {
      const parameters = this.parameters();
      // javac's unclosedParameterList: the list ended in a complaint about the token it stopped at.
      const unclosedParameters = this.token.offset === this.errorEndOffset;
      while (this.is("[")) { this.index++; this.expect("]"); returnType = { ...returnType, dimensions: returnType.dimensions + 1 }; }
      const throwsTypes = this.throwsClause();
      let body: Ast.Block | null = null;
      if (this.is("{")) body = this.block();
      else if (this.is("default")) { this.index++; this.expression(); this.expect(";"); }
      else {
        if (!this.accept(";")) {
          if (this.atEnd()) this.endOfFile();
          this.missing("'{' or ';' expected", "token-expected");
        }
        if (this.token.offset <= this.errorEndOffset && this.openingBraceMissing(unclosedParameters)) body = this.block();
      }
      owner.members.push({
        kind: "Method", position: start, namePosition: this.position(nameToken), modifiers, typeParameters,
        returnType, name: nameToken.text, parameters, throwsTypes, body,
      });
      return;
    }
    if (returnType.name === "void") {
      // javac points at what came instead of the "(", and skips on to the next member.
      this.errorEndOffset = Math.max(this.errorEndOffset, this.token.offset);
      this.report("'(' expected", this.position(), "token-expected");
      return;
    }
    const declarators = this.declaratorsAfterFirstName(nameToken);
    this.expect(";");
    owner.members.push({ kind: "Field", position: start, modifiers, typeNode: returnType, declarators });
  }

  /** javac's openingBraceMissing(): a method header with no "{" after it. Was the "{" forgotten, so
      that what follows is the method's body? javac guesses, and so must this parser to find what javac finds. */
  private openingBraceMissing(unclosedParameters: boolean): boolean {
    this.skip({ members: true, identifiers: !unclosedParameters, statements: !unclosedParameters });
    if (this.is("{")) return true;
    if (unclosedParameters) return false;
    if (this.token.kind === "keyword" && SKIP_STATEMENT_STARTS.has(this.token.text) && this.token.text !== "assert") return true;
    if (this.is("}")) {
      // Would one more "{" balance the braces in the rest of the file?
      let balance = 1;
      for (let at = this.index + 1; this.tokens[at].kind !== "end"; at++) {
        if (this.is("{", this.tokens[at])) balance++;
        else if (this.is("}", this.tokens[at])) balance--;
      }
      return balance === 0;
    }
    // Read on as a block, quietly, and see whether it holds anything a class body could not.
    const statements = this.speculatively(() => {
      const found: Ast.Statement[] = [];
      let skippedTo = -1;
      try {
        while (!this.is("}") && !this.atEnd() && !this.is("case") && !this.is("default")) {
          const before = this.index;
          found.push(this.blockStatement());
          if (this.index === before || this.token.offset === skippedTo) break;
          if (this.token.offset <= this.errorEndOffset) {
            this.skip({ members: true, identifiers: true, statements: true });
            skippedTo = this.token.offset;
          }
        }
      } catch (error) {
        if (!(error instanceof ParseStopped)) throw error;
      }
      return found;
    });
    if (!statements.length) return false;
    const last = statements[statements.length - 1];
    const declarationLike = (statement: Ast.Statement) => statement.kind === "LocalVar" || statement.kind === "Block"
      || (statement.kind === "UnsupportedStmt" && statement.feature === "a class declared inside a method");
    const lastIsBroken = last.kind === "ExprStmt" && last.expression.kind === "Unsupported" && last.expression.feature === ILLEGAL_START;
    return !statements.every((statement) => declarationLike(statement) || statement === last) || !lastIsBroken;
  }

  /** Run a parse that leaves no trace but the errors javac logs directly: no tokens split, and back where it started. */
  private speculatively<T>(parse: () => T): T {
    const saved = {
      index: this.index, errors: this.errors.length, lastErrorOffset: this.lastErrorOffset, errorEndOffset: this.errorEndOffset,
      stuckIndex: this.stuckIndex, stuckCount: this.stuckCount, reportedMalformed: new Set(this.reportedMalformed),
      tokens: this.tokens, pendingCloses: this.pendingCloses,
    };
    this.tokens = [...this.tokens];
    try {
      return parse();
    } finally {
      this.index = saved.index;
      // javac's VirtualParser silences only its syntax errors; what it logs directly stays logged.
      const kept = this.errors.slice(saved.errors).filter((error) => this.loggedDirectly.has(error));
      this.errors.length = saved.errors;
      this.errors.push(...kept);
      this.lastErrorOffset = saved.lastErrorOffset;
      this.errorEndOffset = saved.errorEndOffset;
      this.stuckIndex = saved.stuckIndex;
      this.stuckCount = saved.stuckCount;
      this.reportedMalformed = saved.reportedMalformed;
      this.tokens = saved.tokens;
      this.pendingCloses = saved.pendingCloses;
    }
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
    const statements = this.blockStatements(() => this.is("}"));
    const closePosition = this.closeBrace();
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
        let typeNode: Ast.TypeNode;
        if (this.startsType()) typeNode = this.type();
        else {
          // "main([] args)": javac says so where the type is not, and reads on for the name.
          if (this.atEnd()) this.endOfFile();
          this.complain("illegal start of type", this.position(), "illegal-start-of-type");
          typeNode = { kind: "Type", position: this.position(), name: "<error>", typeArguments: null, dimensions: 0 };
        }
        const varargs = this.accept("...");
        const nameToken = this.identifier();
        let extra = 0;
        while (this.is("[")) { this.index++; this.expect("]"); extra++; }
        if (extra) typeNode = { ...typeNode, dimensions: typeNode.dimensions + extra };
        if (varargs) typeNode = { ...typeNode, dimensions: typeNode.dimensions + 1 };
        parameters.push({ typeNode, name: nameToken.text, position: this.position(nameToken), isFinal: modifiers.names.has("final"), varargs });
      } while (this.accept(","));
    }
    if (!this.accept(")")) {
      if (this.atEnd()) this.endOfFile();
      this.missing("',', ')', or '[' expected", "token-expected");
    }
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
    if (!this.accept("}")) {
      if (this.atEnd()) this.endOfFile();
      this.missing("'}' expected", "token-expected");
    }
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
    while (this.is("[")) {
      this.index++;
      // Where only a type can be, "[" makes an array type whatever follows, as javac reads it.
      if (!this.accept("]")) {
        if (this.atEnd()) this.endOfFile();
        this.missing("']' expected", "token-expected");
      }
      count++;
    }
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
    this.closeAngle(true);
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
      // "String name" then anything else is still a declaration, missing its ';', as javac reads it.
      return true;
    } finally {
      this.index = saved;
    }
  }

  /** Move past a type if one is here; false (position undefined) if not. */
  private scanType(): boolean {
    if (this.token.kind === "keyword" && PRIMITIVES.has(this.token.text)) {
      this.index++;
      // After int, "[" can only make an array type: javac reads "int[ numbers" as one missing its "]".
      while (this.is("[")) this.index += this.is("]", this.lookAhead(1)) ? 2 : 1;
      return true;
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
      // "List<String names": javac misses the ">" and still reads a declaration.
      return this.isIdentifier();
    }
  }

  // ---- statements ----------------------------------------------------------
  block(): Ast.Block {
    const at = this.position();
    this.expect("{");
    const statements = this.blockStatements(() => this.is("}"));
    const closePosition = this.closeBrace();
    return { kind: "Block", position: at, statements, closePosition };
  }

  /** javac's blockStatements(): statements until `done`, skipping past any that were damaged. */
  private blockStatements(done: () => boolean): Ast.Statement[] {
    const statements: Ast.Statement[] = [];
    let skippedTo = -1;
    while (!done()) {
      if (this.atEnd()) this.endOfFile();
      const before = this.index;
      const statement = this.blockStatement();
      // Stuck where the last skip stopped (at `static`, say): javac ends the block there and
      // leaves the rest to its caller, which reads it as the class's next member.
      if (this.token.offset === skippedTo) return statements;
      if (this.index === before && this.token.offset > this.errorEndOffset) throw new ParseStopped();
      if (this.token.offset <= this.errorEndOffset) {
        this.skip({ members: true, identifiers: true, statements: true });
        skippedTo = this.token.offset;
      }
      statements.push(statement);
    }
    return statements;
  }
  /** javac's accept(RBRACE) at the end of a block, which may have ended early. */
  private closeBrace(): Ast.Position {
    const at = this.position();
    if (this.is("}")) this.index++;
    else if (this.atEnd()) this.endOfFile();
    else this.missing("'}' expected", "token-expected");
    return at;
  }

  private blockStatement(): Ast.Statement {
    const at = this.position();
    if (this.is("final") || this.is("@")) {
      const modifiers = this.modifiers();
      if (this.is("class") || this.is("interface") || this.is("enum")) return this.localClass(at, modifiers);
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
    // A modifier here (usually a method started before the last one's closing brace) is an
    // illegal start of expression; blockStatements() then ends the block at it, as javac does.
    return this.statement();
  }

  private startsNonYield(next: Token): boolean {
    return this.is("=", next) || this.is(".", next) || this.is("[", next) || this.is("++", next)
      || this.is("--", next) || this.is("(", next) || ASSIGNMENT_OPERATORS.has(next.text) && next.kind === "operator";
  }

  private localClass(at: Ast.Position, modifiers = this.modifiers()): Ast.Statement {
    // Read like any class, so a mistake in it is found as javac finds it; the runner cannot run it yet.
    this.classDeclaration(modifiers);
    return { kind: "UnsupportedStmt", position: at, feature: "a class declared inside a method" };
  }

  private localVariable(at: Ast.Position, isFinal: boolean): Ast.LocalVariableDeclaration {
    if (!this.isContextual("var") && !this.startsType()) {
      // "final return x": javac wants a type after the modifiers, says so where it is not, and reads on.
      if (this.atEnd()) this.endOfFile();
      this.complain("illegal start of type", this.position(), "illegal-start-of-type");
    }
    const typeNode = this.isContextual("var")
      ? (() => { const position = this.position(); this.index++; return { kind: "Type", position, name: "var", typeArguments: null, dimensions: 0 } as Ast.TypeNode; })()
      : this.startsType() ? this.type() : { kind: "Type", position: this.position(), name: "<error>", typeArguments: null, dimensions: 0 } as Ast.TypeNode;
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
        case "else": {
          // javac reads the statement after the else first, then complains at the else,
          // and takes its place back there, the way its doRecover() does.
          this.index++;
          const lastComplaint = this.lastErrorOffset;
          const body = this.embeddedStatement();
          if (at.offset > lastComplaint) this.errors.push(new JavaSyntaxError("'else' without 'if'", at.line, at.column, "else-without-if"));
          this.lastErrorOffset = at.offset;
          this.errorEndOffset = Math.max(this.errorEndOffset, at.offset);
          return body;
        }
        case "while": {
          this.index++;
          const condition = this.parenthesized();
          return { kind: "While", position: at, condition, body: this.embeddedStatement() };
        }
        case "do": {
          this.index++;
          const body = this.embeddedStatement();
          this.expect("while");
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
    const expression = this.statementExpression();
    this.expect(";");
    return { kind: "ExprStmt", position: at, expression };
  }

  /** An expression that has to do something: a call, an assignment, ++ or --, new. */
  private statementExpression(typeAllowed = true): Ast.Expression {
    // javac reads the start of a statement as a type or an expression, whichever fits,
    // except in a for loop's last part, which can only be an expression.
    const at = this.position();
    if (!typeAllowed) return this.checkedStatement(this.expression());
    let afterType = this.index + 1;
    while (this.is("[", this.tokens[afterType]) || this.is("]", this.tokens[afterType])) afterType++;
    if (this.token.kind === "keyword" && PRIMITIVES.has(this.token.text) && !this.is(".", this.tokens[afterType])) {
      // "int" standing alone is a type, which is not a statement; "int." goes on to ask for .class.
      this.type();
      this.logDirectly("not a statement", at, "not-a-statement");
      return { kind: "Unsupported", position: at, feature: "a type where a statement belongs" };
    }
    const misread = this.misreadTypeArguments();
    if (misread) {
      this.logDirectly("not a statement", misread.position, "not-a-statement");
      return misread;
    }
    return this.checkedStatement(this.expression());
  }

  /** javac's checkExprStat: only some expressions can stand as a statement. */
  private checkedStatement(expression: Ast.Expression): Ast.Expression {
    const neverAStatement = expression.kind === "Unsupported"
      && (expression.feature === "class literals (.class)" || expression.feature === "lambda expressions (->)");
    if (neverAStatement || !["Assign", "Call", "New", "Unsupported"].includes(expression.kind)
        && !((expression.kind === "Unary" && (expression.operator === "++" || expression.operator === "--")) || expression.kind === "Postfix")) {
      // javac logs this one directly: it is always shown, and moves nothing on.
      const place = operatorOf(expression);
      this.logDirectly("not a statement", place, "not-a-statement");
    }
    return expression;
  }

  /** `a < b;` starts like the type List<String>, and javac reads it that way until it cannot. */
  private misreadTypeArguments(): Ast.Expression | null {
    if (!this.isIdentifier()) return null;
    let look = this.index + 1;
    while (this.is(".", this.tokens[look]) && this.isIdentifier(this.tokens[look + 1])) look += 2;
    if (!this.is("<", this.tokens[look])) return null;
    const saved = this.index;
    this.index = look;
    const at = this.position();
    this.index++;
    do {
      if (!this.startsType()) {
        if (this.is("?") || this.atEnd()) { this.index = saved; return null; }
        this.complain("illegal start of type", this.position(), "illegal-start-of-type");
        break;
      }
      this.type();
    } while (this.accept(","));
    if ([">", ">>", ">>>", ">=", ">>=", ">>>="].some((closing) => this.is(closing))) {
      // A whole type argument list after all: read it as the expression it must be.
      this.index = saved;
      return null;
    }
    this.complain("> or ',' expected", this.position(), "token-expected");
    return { kind: "Unsupported", position: at, feature: "a misread type" };
  }

  /** The body of an if/while/for: a declaration is not allowed on its own there. */
  private embeddedStatement(): Ast.Statement {
    if (this.is("final") || this.is("abstract") || this.is("@") || this.is("class") || this.is("interface") || this.is("enum")) {
      // javac's parseStatementAsBlock(): it reads any block statement here, then says a declaration is not allowed.
      const start = this.index;
      const statement = this.blockStatement();
      if (statement.kind === "LocalVar") {
        this.logDirectly("variable declaration not allowed here", statement.declarators[0].position, "declaration-not-allowed");
      } else if (statement.kind === "UnsupportedStmt" && statement.feature === "a class declared inside a method") {
        let keyword = start;
        while (!(this.is("class", this.tokens[keyword]) || this.is("interface", this.tokens[keyword]) || this.is("enum", this.tokens[keyword]))) keyword++;
        this.logDirectly("class, interface or enum declaration not allowed here", this.position(this.tokens[keyword]), "class-not-allowed");
      }
      return statement;
    }
    if (this.looksLikeDeclaration(false) && !this.isContextual("var")) {
      // javac reads the whole declaration first, then says so at its name.
      const declaration = this.localVariable(this.position(), false);
      const name = declaration.declarators[0].position;
      this.logDirectly("variable declaration not allowed here", name, "declaration-not-allowed");
      return declaration;
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
        init.push({ kind: "ExprStmt", position: expressionAt, expression: this.statementExpression() });
      } while (this.accept(","));
    }
    return this.forRest(at, init);
  }

  private forRest(at: Ast.Position, init: Ast.Statement[]): Ast.ForStatement {
    this.expect(";");
    const condition = this.is(";") ? null : this.expression();
    this.expect(";");
    const update: Ast.Expression[] = [];
    if (!this.is(")")) do update.push(this.statementExpression(false)); while (this.accept(","));
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
        switchCase.body = this.blockStatements(() => this.is("case") || this.is("default") || this.is("}"));
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
      else if ((this.isIdentifier(this.lookAhead(1)) || PRIMITIVES.has(this.lookAhead(1).text) && this.lookAhead(1).kind === "keyword")
               && this.isIdentifier(this.lookAhead(2))) {
        // "(int index" can only begin a lambda's parameters to javac.
        this.index++;
        do { this.type(); this.identifier(); } while (this.accept(","));
        if (!this.accept(")")) this.missing("',', ')', or '[' expected", "token-expected");
        if (!this.accept("->")) this.missing("-> expected", "token-expected");
        isLambda = true;
      }
      else if (this.is(")", this.lookAhead(1))) {
        // "()" can only begin a lambda, so javac asks for its arrow, and reads on.
        this.index += 2;
        this.missing("-> expected", "token-expected");
        isLambda = true;
      }
    }
    if (!isLambda) return null;
    if (this.is("{")) this.skipBalanced("{", "}");
    else this.expression();
    return { kind: "Unsupported", position: at, feature: "lambda expressions (->)" };
  }

  private ternary(): Ast.Expression {
    const condition = this.binary(1);
    if (!this.is("?")) return condition;
    const questionPosition = this.position();
    this.index++;
    const whenTrue = this.lambdaAhead() ?? this.expression();
    this.expect(":");
    const whenFalse = this.lambdaAhead() ?? this.ternary();
    return { kind: "Conditional", position: condition.position, condition, whenTrue, whenFalse, questionPosition };
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
    const start = this.primary();
    // javac's illegal() leaves term3 at once: nothing after it is read as part of this expression.
    if (start.kind === "Unsupported" && start.feature === ILLEGAL_START) return start;
    return this.postfixSelectors(start);
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
          const isCreation = this.is("new"), isClassLiteral = this.is("class");
          this.index++;
          if (isClassLiteral) {
            // Where javac points at a class literal: the dot before "class".
            expression = { kind: "Unsupported", position: dotPosition, feature };
            continue;
          }
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
          // String[] names a type, which only String[].class can make a value of.
          if (expression.kind !== "Name" && expression.kind !== "FieldAccess") {
            // javac reads an index there, finds none before the "]", and reads on.
            this.complain("illegal start of expression", this.position(this.lookAhead(1)), "illegal-start-of-expression");
            this.index += 2;
            expression = { kind: "Unsupported", position: expression.position, feature: "an index that is missing" };
            continue;
          }
          const at = expression.position;
          while (this.is("[") && this.is("]", this.lookAhead(1))) this.index += 2;
          if (this.is("::")) { expression = { kind: "Unsupported", position: at, feature: "method references (::)" }; continue; }
          if (!this.is(".")) {
            this.complain("'.class' expected", this.position(), "class-expected");
            return { kind: "Unsupported", position: at, feature: "a type where a value belongs" };
          }
          const dotPosition = this.position();
          this.index++;
          if (this.accept("class")) { expression = { kind: "Unsupported", position: dotPosition, feature: "class literals (.class)" }; continue; }
          // javac asks for "class", and takes a name written in its place as part of the mistake.
          this.missing("class expected", "class-expected");
          if (this.isIdentifier()) this.index++;
          return { kind: "Unsupported", position: at, feature: "a type where a value belongs" };
        }
        const bracketPosition = this.position();
        this.index++;
        const index = this.expression();
        this.expect("]");
        expression = { kind: "ArrayAccess", position: expression.position, array: expression, index, bracketPosition };
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
    if (!this.accept(")")) {
      if (this.atEnd()) this.endOfFile();
      // Java 21's wording; 17 said only "')' expected".
      this.missing("')' or ',' expected", "token-expected");
    }
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
      case "error":
        // javac's illegal(): nothing new to say at the malformed token, and nothing is consumed.
        this.errorEndOffset = Math.max(this.errorEndOffset, token.offset);
        this.report("illegal start of expression", at, "illegal-start-of-expression");
        // Unsupported is the one node the statement rules accept as it is, like javac's Erroneous.
        return { kind: "Unsupported", position: at, feature: ILLEGAL_START };
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
      if (token.text === "void") {
        this.index++;
        if (this.is(".") && this.is("class", this.lookAhead(1))) {
          this.index += 2;
          return { kind: "Unsupported", position: at, feature: "class literals (.class)" };
        }
        // javac's illegal(): the void is read, and the expression ends there.
        this.complain("illegal start of expression", at, "illegal-start-of-expression");
        return { kind: "Unsupported", position: at, feature: ILLEGAL_START };
      }
      if (PRIMITIVES.has(token.text)) {
        // int.class, int[]::new ...
        this.index++;
        while (this.is("[") || this.is("]")) this.index++;
        if (this.accept(".")) {
          if (this.accept("class")) return { kind: "Unsupported", position: at, feature: "class literals (.class)" };
          // javac asks for "class", and takes a name written in its place as part of the mistake.
          this.missing("class expected", "class-expected");
          if (this.isIdentifier()) this.index++;
          return { kind: "Unsupported", position: at, feature: "a type where a value belongs" };
        }
        if (this.accept("::")) { this.accept("new"); return { kind: "Unsupported", position: at, feature: "method references (::)" }; }
        // javac points at what follows the type, and reads on.
        this.complain("'.class' expected", this.position(), "class-expected");
        return { kind: "Unsupported", position: at, feature: "a type where a value belongs" };
      }
    }
    if (this.is("<")) {
      // javac starts every term by reading type arguments, as for <String>of(): after "a < < b" it wants a ">".
      this.index++;
      do {
        if (!this.startsType()) { this.complain("illegal start of type", this.position(), "illegal-start-of-type"); break; }
        this.type();
      } while (this.accept(","));
      if (!this.is(">")) {
        this.complain("> or ',' expected", this.position(), "token-expected");
        return { kind: "Unsupported", position: at, feature: ILLEGAL_START };
      }
      this.fail("illegal start of expression", at, "illegal-start-of-expression");
    }
    if (this.is("(")) {
      this.index++;
      const inner = this.expression();
      this.expect(")");
      return inner;
    }
    // javac's illegal(): said once, nothing consumed, and the expression ends here.
    this.complain("illegal start of expression", at, "illegal-start-of-expression");
    return { kind: "Unsupported", position: at, feature: ILLEGAL_START };
  }

  private creator(): Ast.Expression {
    const at = this.position();
    this.index++;                                         // "new"
    // With no type after it, identifier() says "<identifier> expected" and the '(' check below reads on.
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
    if (!this.is("(")) {
      // javac points at what follows the class name, and reads on.
      this.complain("'(' or '[' expected", this.position(), "token-expected");
      return { kind: "Unsupported", position: at, feature: "a malformed creation" };
    }
    const args = this.arguments();
    let hasBody = false;
    if (this.is("{")) { hasBody = true; this.skipBalanced("{", "}"); }
    return { kind: "New", position: at, typeNode, args, hasBody };
  }
}
