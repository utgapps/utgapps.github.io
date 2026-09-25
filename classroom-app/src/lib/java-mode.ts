import { StreamLanguage, type StringStream } from "@codemirror/language";

/* Java colouring and indentation for the editor. A small stream tokenizer
   rather than another package: it only has to tell keywords, types, strings,
   numbers and comments apart, and indent one level inside each brace. */

const KEYWORDS = new Set(("abstract assert break case catch class const continue default do else enum extends final finally " +
  "for goto if implements import instanceof interface native new package private protected public return static " +
  "strictfp super switch synchronized this throw throws transient try volatile while var yield record sealed permits").split(" "));
const TYPES = new Set("boolean byte char double float int long short void".split(" "));
const ATOMS = new Set(["true", "false", "null"]);

type JavaState = { depth: number; inComment: boolean; inTextBlock: boolean };

function readString(stream: StringStream, quote: string) {
  let escaped = false;
  for (let next = stream.next(); next !== undefined && next !== null; next = stream.next()) {
    if (next === quote && !escaped) return;
    escaped = !escaped && next === "\\";
  }
}

export const javaLanguage = StreamLanguage.define<JavaState>({
  name: "java",
  startState: () => ({ depth: 0, inComment: false, inTextBlock: false }),
  token(stream, state) {
    if (state.inComment) {
      if (stream.skipTo("*/")) { stream.match("*/"); state.inComment = false; } else stream.skipToEnd();
      return "comment";
    }
    if (state.inTextBlock) {
      if (stream.skipTo('"""')) { stream.match('"""'); state.inTextBlock = false; } else stream.skipToEnd();
      return "string";
    }
    if (stream.eatSpace()) return null;
    if (stream.match("//")) { stream.skipToEnd(); return "comment"; }
    if (stream.match("/*")) { state.inComment = true; return "comment"; }
    if (stream.match('"""')) { state.inTextBlock = true; return "string"; }
    const character = stream.peek()!;
    if (character === '"' || character === "'") { stream.next(); readString(stream, character); return "string"; }
    if (/\d/.test(character) || (character === "." && /\d/.test(stream.string.charAt(stream.pos + 1)))) {
      stream.match(/^(0[xX][0-9a-fA-F_]+|0[bB][01_]+|(\d[\d_]*)?\.?\d*([eE][+-]?\d+)?)[lLfFdD]?/);
      return "number";
    }
    if (character === "@") { stream.next(); stream.match(/^[\w.]+/); return "meta"; }
    if (/[A-Za-z_$]/.test(character)) {
      const word = stream.match(/^[\w$]+/) as RegExpMatchArray;
      const text = word[0];
      if (KEYWORDS.has(text)) return "keyword";
      if (TYPES.has(text)) return "typeName";
      if (ATOMS.has(text)) return "atom";
      if (/^[A-Z]/.test(text)) return "className";
      return "variableName";
    }
    stream.next();
    if (character === "{" || character === "(" || character === "[") state.depth++;
    else if (character === "}" || character === ")" || character === "]") state.depth = Math.max(0, state.depth - 1);
    return /[{}()[\];,.]/.test(character) ? "punctuation" : "operator";
  },
  indent(state, textAfter, context) {
    const closing = /^\s*[}\])]/.test(textAfter) ? 1 : 0;
    return Math.max(0, state.depth - closing) * context.unit;
  },
  languageData: {
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*[}\])]$/,
    closeBrackets: { brackets: ["(", "[", "{", "'", '"'] },
  },
});
