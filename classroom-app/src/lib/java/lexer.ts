/* The Java tokenizer.

   Turns source text into tokens, and reports the mistakes javac reports at
   this stage in javac's own words - "unclosed string literal", "illegal
   character" - so a student who later meets a real JDK has already seen them.
*/

export type TokenKind =
  | "identifier" | "keyword" | "int" | "long" | "float" | "double"
  | "char" | "string" | "operator" | "end";

export type Token = {
  kind: TokenKind;
  text: string;          // exactly as written (for operators, the operator)
  value?: string | number | bigint;
  line: number;          // 1-based
  column: number;        // 1-based
  offset: number;        // index into the source
  endOffset: number;
  endLine: number;
  endColumn: number;
};

export class JavaSyntaxError extends Error {
  constructor(message: string, readonly line: number, readonly column: number, readonly code: string) {
    super(message);
  }
}

export const KEYWORDS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class", "const",
  "continue", "default", "do", "double", "else", "enum", "extends", "final", "finally", "float",
  "for", "goto", "if", "implements", "import", "instanceof", "int", "interface", "long", "native",
  "new", "package", "private", "protected", "public", "return", "short", "static", "strictfp",
  "super", "switch", "synchronized", "this", "throw", "throws", "transient", "try", "void",
  "volatile", "while", "true", "false", "null",
]);

// Longest first, so ">>>=" is never read as ">>" then ">=".
const OPERATORS = [
  ">>>=", "<<=", ">>=", ">>>", "...", "->", "::", "++", "--", "&&", "||", "==", "!=", "<=", ">=",
  "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<", ">>",
  "(", ")", "{", "}", "[", "]", ";", ",", ".", "@", "=", ">", "<", "!", "~", "?", ":",
  "+", "-", "*", "/", "&", "|", "^", "%",
];

const isIdentifierStart = (character: string) => /[\p{L}_$]/u.test(character);
const isIdentifierPart = (character: string) => /[\p{L}\p{N}_$]/u.test(character);

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let offset = 0;
  let line = 1;
  let column = 1;

  const peek = (ahead = 0) => source[offset + ahead] ?? "";
  function advance(count = 1) {
    for (let step = 0; step < count; step++) {
      if (source[offset] === "\n") { line++; column = 1; } else column++;
      offset++;
    }
  }
  const fail = (message: string, atLine: number, atColumn: number, code: string): never => {
    throw new JavaSyntaxError(message, atLine, atColumn, code);
  };

  /* One escape inside a string or char literal, the backslash already
     consumed by the caller's look-ahead. Returns the character it stands for. */
  function readEscape(): string {
    const escapeLine = line, escapeColumn = column;
    advance();                              // the backslash
    const letter = peek();
    const simple: Record<string, string> = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", s: " ", "0": "\0", "'": "'", '"': '"', "\\": "\\" };
    if (letter === "u") {
      while (peek() === "u") advance();
      const hex = source.slice(offset, offset + 4);
      if (!/^[0-9a-fA-F]{4}$/.test(hex)) fail("illegal unicode escape", escapeLine, escapeColumn, "illegal-unicode-escape");
      advance(4);
      return String.fromCharCode(parseInt(hex, 16));
    }
    if (/[0-7]/.test(letter)) {
      // Octal: up to three digits, and at most \377.
      let digits = "";
      while (digits.length < 3 && /[0-7]/.test(peek()) && parseInt(digits + peek(), 8) <= 0o377) { digits += peek(); advance(); }
      return String.fromCharCode(parseInt(digits, 8));
    }
    if (letter in simple) { advance(); return simple[letter]; }
    return fail("illegal escape character", line, column, "illegal-escape");
  }

  while (offset < source.length) {
    const character = peek();
    // Whitespace
    if (character === " " || character === "\t" || character === "\n" || character === "\r" || character === "\f") { advance(); continue; }
    // Comments
    if (character === "/" && peek(1) === "/") {
      while (offset < source.length && peek() !== "\n") advance();
      continue;
    }
    if (character === "/" && peek(1) === "*") {
      const startLine = line, startColumn = column;
      advance(2);
      while (offset < source.length && !(peek() === "*" && peek(1) === "/")) advance();
      if (offset >= source.length) fail("unclosed comment", startLine, startColumn, "unclosed-comment");
      advance(2);
      continue;
    }

    const start = { offset, line, column };
    const push = (kind: TokenKind, text: string, value?: string | number | bigint) => {
      tokens.push({ kind, text, value, line: start.line, column: start.column, offset: start.offset,
                    endOffset: offset, endLine: line, endColumn: column });
    };

    // Identifiers and keywords
    if (isIdentifierStart(character)) {
      while (offset < source.length && isIdentifierPart(peek())) advance();
      const word = source.slice(start.offset, offset);
      push(KEYWORDS.has(word) ? "keyword" : "identifier", word);
      continue;
    }

    // Numbers
    if (/[0-9]/.test(character) || (character === "." && /[0-9]/.test(peek(1)))) {
      readNumber(start, push);
      continue;
    }

    // Text blocks, then strings
    if (character === '"' && peek(1) === '"' && peek(2) === '"') {
      advance(3);
      while (peek() === " " || peek() === "\t" || peek() === "\f") advance();
      if (peek() === "\r") advance();
      if (peek() !== "\n") fail("illegal text block open delimiter sequence, missing line terminator", line, column, "text-block-open");
      advance();
      const rawLines: string[] = [];
      let current = "";
      let closed = false;
      while (offset < source.length) {
        if (peek() === '"' && peek(1) === '"' && peek(2) === '"') { advance(3); closed = true; break; }
        if (peek() === "\\") {
          // Escapes are processed after indentation is stripped; keep them marked.
          if (peek(1) === "\n") { advance(2); current += "\u0000JOIN"; continue; }
          current += "\u0000ESC" + source.slice(offset, offset + 2); advance(2); continue;
        }
        if (peek() === "\n") { rawLines.push(current); current = ""; advance(); continue; }
        if (peek() === "\r") { advance(); continue; }
        current += peek(); advance();
      }
      if (!closed) fail("unclosed text block", start.line, start.column, "unclosed-text-block");
      rawLines.push(current);
      push("string", source.slice(start.offset, offset), textBlockValue(rawLines));
      continue;
    }
    if (character === '"') {
      advance();
      let value = "";
      while (true) {
        const next = peek();
        if (next === "" || next === "\n" || next === "\r") fail("unclosed string literal", start.line, start.column, "unclosed-string");
        if (next === '"') { advance(); break; }
        if (next === "\\") { value += readEscape(); continue; }
        value += next; advance();
      }
      push("string", source.slice(start.offset, offset), value);
      continue;
    }
    if (character === "'") {
      advance();
      if (peek() === "'") fail("empty character literal", start.line, start.column, "empty-char");
      if (peek() === "\n" || peek() === "") fail("illegal line end in character literal", start.line, start.column, "unclosed-char");
      const value = peek() === "\\" ? readEscape() : (() => { const single = peek(); advance(); return single; })();
      if (peek() !== "'") fail("unclosed character literal", start.line, start.column, "unclosed-char");
      advance();
      push("char", source.slice(start.offset, offset), value.charCodeAt(0));
      continue;
    }

    // Operators
    const operator = OPERATORS.find((candidate) => source.startsWith(candidate, offset));
    if (operator) {
      advance(operator.length);
      push("operator", operator);
      continue;
    }
    const shown = character === "#" || character === "`" || /\S/.test(character) ? character : `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`;
    fail(`illegal character: '${shown}'`, line, column, "illegal-character");
  }
  tokens.push({ kind: "end", text: "<EOF>", line, column, offset, endOffset: offset, endLine: line, endColumn: column });
  return tokens;

  function readNumber(start: { offset: number; line: number; column: number },
                      push: (kind: TokenKind, text: string, value?: string | number | bigint) => void) {
    const digitsOf = (pattern: RegExp) => {
      let text = "";
      while (pattern.test(peek()) || (peek() === "_" && text !== "")) { text += peek(); advance(); }
      if (text.endsWith("_")) fail("illegal underscore", line, column, "illegal-underscore");
      return text.replaceAll("_", "");
    };
    const lower = (peek() + peek(1)).toLowerCase();
    if (lower === "0x" || lower === "0b") {
      advance(2);
      const radix = lower === "0x" ? 16 : 2;
      const digits = digitsOf(radix === 16 ? /[0-9a-fA-F]/ : /[01]/);
      if (!digits) fail(radix === 16 ? "hexadecimal numbers must contain at least one hexadecimal digit" : "binary numbers must contain at least one binary digit", start.line, start.column, "bad-number");
      const isLong = /[lL]/.test(peek());
      if (isLong) advance();
      finishInteger(BigInt((radix === 16 ? "0x" : "0b") + digits), isLong, true);
      return;
    }
    let whole = /[0-9]/.test(peek()) ? digitsOf(/[0-9]/) : "";
    let fraction = "";
    let exponent = "";
    let isFloating = false;
    if (peek() === "." && /[0-9]/.test(peek(1) || "") ) {
      isFloating = true; advance(); fraction = digitsOf(/[0-9]/);
    } else if (peek() === "." && whole !== "" && !isIdentifierStart(peek(1) || "") && peek(1) !== ".") {
      isFloating = true; advance();
    }
    if (/[eE]/.test(peek())) {
      isFloating = true; advance();
      let sign = "";
      if (peek() === "+" || peek() === "-") { sign = peek(); advance(); }
      const digits = digitsOf(/[0-9]/);
      if (!digits) fail("malformed floating-point literal", start.line, start.column, "bad-number");
      exponent = "e" + sign + digits;
    }
    const suffix = peek();
    if (/[fFdD]/.test(suffix)) {
      advance();
      const value = Number((whole || "0") + "." + (fraction || "0") + exponent);
      push(/[fF]/.test(suffix) ? "float" : "double", source.slice(start.offset, offset), /[fF]/.test(suffix) ? Math.fround(value) : value);
      return;
    }
    if (isFloating) {
      push("double", source.slice(start.offset, offset), Number((whole || "0") + "." + (fraction || "0") + exponent));
      return;
    }
    const isLong = /[lL]/.test(suffix);
    if (isLong) advance();
    // A leading zero makes it octal - 010 is eight, which surprises everyone once.
    const octal = whole.length > 1 && whole.startsWith("0");
    if (octal && /[89]/.test(whole)) fail("integer number too large", start.line, start.column, "bad-number");
    finishInteger(octal ? BigInt("0o" + whole.slice(1)) : BigInt(whole), isLong, octal);

    function finishInteger(value: bigint, isLong: boolean, unsigned: boolean) {
      if (isIdentifierPart(peek())) fail("';' expected", line, column, "semicolon-expected");
      const text = source.slice(start.offset, offset);
      if (isLong) {
        const limit = unsigned ? (1n << 64n) - 1n : 1n << 63n;
        if (value > limit) fail("integer number too large", start.line, start.column, "number-too-large");
        push("long", text, unsigned ? BigInt.asIntN(64, value) : value);
      } else {
        const limit = unsigned ? 0xFFFFFFFFn : 2147483648n;
        if (value > limit) fail("integer number too large", start.line, start.column, "number-too-large");
        // 2147483648 is legal only after a minus sign; the parser checks that.
        push("int", text, unsigned ? BigInt.asIntN(32, value) : value);
      }
    }
  }
}

/* A text block's value: strip the indentation every line shares (the closing
   delimiter's line counts), strip trailing spaces, then apply escapes. */
function textBlockValue(rawLines: string[]): string {
  const significant = rawLines.filter((text, index) => text.trim() !== "" || index === rawLines.length - 1);
  const indent = Math.min(...significant.map((text) => text.length - text.trimStart().length));
  const lastIsDelimiterOnly = rawLines[rawLines.length - 1].trim() === "";
  const lines = rawLines.map((text) => text.slice(Math.min(indent, text.length - text.trimStart().length)).replace(/[ \t\f]+$/, ""));
  let joined = lines.join("\n");
  if (lastIsDelimiterOnly) joined = joined.replace(/[^\n]*$/, "");
  const simple: Record<string, string> = { n: "\n", t: "\t", r: "\r", b: "\b", f: "\f", s: " ", "'": "'", '"': '"', "\\": "\\" };
  return joined
    .replaceAll("\u0000JOIN", "")
    .replace(/\u0000ESC\\(.)/g, (_match, letter: string) => simple[letter] ?? letter);
}
