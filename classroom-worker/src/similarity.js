/* How alike two Python game projects are, from 0 to 1.

   A challenge project a teacher approved by hand is kept, and a later project
   the AI checker turned down is compared with each kept one. A child who
   builds the same mechanic the same way should match even though they named
   things differently and picked their own numbers, so names and numbers are
   not compared: every name that is the student's own becomes "v", every
   number "0" and every string that is not a key name "s". What is left is the
   shape of the code - which engine calls it makes, which keys it reads, how
   its ifs and loops nest - and two projects are compared as runs of five of
   those tokens, counted (Dice's coefficient over the multisets).

   Only the .py files count. game.txt is pictures and rooms, and every project
   has its own. */

const KEPT = new Set([
  // Python
  "False", "None", "True", "and", "as", "break", "class", "continue", "def", "del", "elif", "else", "for", "from",
  "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "return", "while", "with", "try", "except",
  "abs", "min", "max", "round", "int", "float", "len", "range", "str", "sum", "sorted", "list", "dict", "enumerate", "zip",
  "any", "all", "append", "pop",
  // the engine
  "self", "Game", "math", "random", "sprite", "destroy", "text", "get_collision", "count_objects", "get_objects", "set_room",
  "key_is_pressed", "key_was_pressed", "key_was_released", "x", "y", "scaleX", "scaleY", "angle", "image", "visible", "alpha",
  "color", "fontSize", "halign", "atan2", "degrees", "radians", "cos", "sin", "hypot", "sqrt", "randint", "choice", "copysign",
]);
const KEYS = new Set(["left", "right", "up", "down", "space", "shift", "enter", "escape", "control", "alt", "tab", "backspace"]);
const TOKEN = /[A-Za-z_]\w*|\d+(?:\.\d+)?|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|==|!=|<=|>=|[-+*/%]=|\/\/|\*\*|\S/g;

function withoutComment(line) {
  let quote = "";
  for (let index = 0; index < line.length; index++) {
    const character = line[index];
    if (quote) {
      if (character === "\\") index++;
      else if (character === quote) quote = "";
    } else if (character === "'" || character === '"') quote = character;
    else if (character === "#") return line.slice(0, index);
  }
  return line;
}

function normal(token) {
  if (/^[A-Za-z_]/.test(token)) return KEPT.has(token) ? token : "v";
  if (/^\d/.test(token)) return "0";
  if (token[0] === "'" || token[0] === '"') {
    const inside = token.slice(1, -1).toLowerCase();
    return KEYS.has(inside) || /^[a-z0-9]$/.test(inside) ? "'" + inside + "'" : "s";
  }
  return token;
}

/** One file as tokens, with each line's depth of indentation as a token of
 *  its own: "if a: b" and "if a:\n    b" do different things over a frame. */
function tokens(text) {
  const lines = String(text || "").replace(/\t/g, "    ").split(/\r?\n/).map(withoutComment).filter((line) => line.trim());
  const widths = lines.map((line) => line.length - line.trimStart().length).filter((width) => width > 0);
  const unit = widths.length ? Math.min(...widths) : 4;
  const out = [];
  for (const line of lines) {
    out.push("|" + Math.round((line.length - line.trimStart().length) / unit));
    for (const token of line.match(TOKEN) || []) out.push(normal(token));
  }
  return out;
}

const RUN = 5;

/** A project's runs of tokens, counted. `files` is { name: code }. */
export function codePrint(files) {
  const counts = new Map();
  for (const [name, text] of Object.entries(files || {})) {
    if (!name.endsWith(".py")) continue;
    const list = tokens(text);
    for (let index = 0; index + RUN <= list.length; index++) {
      const run = list.slice(index, index + RUN).join(" ");
      counts.set(run, (counts.get(run) || 0) + 1);
    }
  }
  return counts;
}

/** 1 for the same code under different names and numbers, near 0 for
 *  unrelated code. */
export function similarity(filesA, filesB) {
  const a = codePrint(filesA), b = codePrint(filesB);
  let sizeA = 0, sizeB = 0, shared = 0;
  for (const count of a.values()) sizeA += count;
  for (const count of b.values()) sizeB += count;
  if (!sizeA || !sizeB) return 0;
  for (const [run, count] of a) shared += Math.min(count, b.get(run) || 0);
  return (2 * shared) / (sizeA + sizeB);
}
