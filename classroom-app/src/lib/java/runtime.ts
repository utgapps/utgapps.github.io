/* The Java library, as the generated code sees it: `$r` in codegen.ts.

   Every runtime name library.ts declares is a method here (test/java-runtime.mjs
   checks), and each keeps Java's observable behaviour rather than JavaScript's:
   Java's exception classes and messages, Scanner's tokenising, Random's exact
   number sequence for a given seed, printf's rounding, split's quirks.

   How Java values are held:
     int, short, byte, char, float, double -> number (char is its UTF-16 code)
     long -> bigint                     boolean -> boolean
     String -> a JS string, or a String object when built at run time, so that
               == compares references the way Java does ("a" == "a", but a
               string read from the keyboard is never == a literal)
     arrays -> JS arrays tagged with their Java type in `$d` ("[I")
     boxes -> JInteger etc. holding `.v`; everything else -> a JObject subclass
*/
import { javaDoubleToString, javaFloatToString } from "./format";

// ---- the host: where output goes -------------------------------------------------
export type Stream = "out" | "err";
export type RuntimeHost = { write(stream: Stream, text: string): void };
export type WaitRequest = { wait: "input" } | { wait: "sleep"; ms: number };

/** System.exit: unwinds the whole program; no catch or finally of the student's sees it. */
export class ExitSignal {
  constructor(public status: number) {}
}

const WAIT_FOR_INPUT: WaitRequest = { wait: "input" };

// ---- the running program's state ---------------------------------------------------
/** The runtime the classes below belong to: one program runs at a time. */
let active: JavaRuntime;

// ---- strings -------------------------------------------------------------------------
type JString = string | String;
export const isStr = (value: unknown): value is JString => typeof value === "string" || value instanceof String;
/** A String made at run time: its own object, so == against another string is false. */
const S = (text: string): JString => new String(text);
const text = (value: JString): string => (typeof value === "string" ? value : value.valueOf());

// ---- Object and friends ----------------------------------------------------------------
let nextIdentityHash = 0x1b6d3586;
const identityHashes = new WeakMap<object, number>();
function identityHash(value: object): number {
  let hash = identityHashes.get(value);
  if (hash === undefined) {
    // xorshift: looks like a JVM's hashes, but the same program prints the same ones every run.
    nextIdentityHash ^= nextIdentityHash << 13; nextIdentityHash ^= nextIdentityHash >>> 17; nextIdentityHash ^= nextIdentityHash << 5;
    hash = (nextIdentityHash >>> 1) & 0x7fffffff;
    identityHashes.set(value, hash);
  }
  return hash;
}

export class JObject {
  static $jn = "java.lang.Object";
  static $i?: Set<unknown>;
  $jn?: string;
  $c_(): this { return this; }
  toString(): JString { return S(className(this) + "@" + (this.hashCode() >>> 0).toString(16)); }
  equals(other: unknown): boolean { return this === other; }
  hashCode(): number { return identityHash(this); }
}

export function className(value: any): string {
  if (isStr(value)) return "java.lang.String";
  if (Array.isArray(value)) return (value as any).$d ?? "[Ljava.lang.Object;";
  return value.$jn ?? value.constructor?.$jn ?? "java.lang.Object";
}

/** The name Java's messages use for an array type: int[], String[][]. */
function arrayTypeName(descriptor: string): string {
  let dimensions = 0;
  while (descriptor[dimensions] === "[") dimensions++;
  const element = descriptor.slice(dimensions);
  const names: Record<string, string> = { I: "int", J: "long", D: "double", F: "float", Z: "boolean", C: "char", B: "byte", S: "short" };
  const base = names[element] ?? "object";
  return base + "[]".repeat(dimensions);
}

// ---- boxes ------------------------------------------------------------------------------
export class JNumber extends JObject { static $jn = "java.lang.Number"; v: any; }
export class JInteger extends JNumber {
  static $jn = "java.lang.Integer";
  constructor(public v: number) { super(); }
  toString(): JString { return S(String(this.v)); }
  equals(other: unknown) { return other instanceof JInteger && other.v === this.v; }
  hashCode() { return this.v; }
}
export class JLong extends JNumber {
  static $jn = "java.lang.Long";
  constructor(public v: bigint) { super(); }
  toString(): JString { return S(String(this.v)); }
  equals(other: unknown) { return other instanceof JLong && other.v === this.v; }
  hashCode() { return Number(BigInt.asIntN(32, this.v ^ (BigInt.asUintN(64, this.v) >> 32n))); }
}
export class JDouble extends JNumber {
  static $jn = "java.lang.Double";
  constructor(public v: number) { super(); }
  toString(): JString { return S(javaDoubleToString(this.v)); }
  equals(other: unknown) { return other instanceof JDouble && (Object.is(other.v, this.v) || (Number.isNaN(other.v) && Number.isNaN(this.v))); }
  hashCode() { const bits = doubleBits(this.v); return Number(BigInt.asIntN(32, bits ^ (bits >> 32n))); }
}
export class JFloat extends JNumber {
  static $jn = "java.lang.Float";
  constructor(public v: number) { super(); }
  toString(): JString { return S(javaFloatToString(this.v)); }
  equals(other: unknown) { return other instanceof JFloat && (Object.is(other.v, this.v) || (Number.isNaN(other.v) && Number.isNaN(this.v))); }
  hashCode() { const view = new DataView(new ArrayBuffer(4)); view.setFloat32(0, this.v); return view.getInt32(0); }
}
export class JShort extends JNumber {
  static $jn = "java.lang.Short";
  constructor(public v: number) { super(); }
  toString(): JString { return S(String(this.v)); }
  equals(other: unknown) { return other instanceof JShort && other.v === this.v; }
  hashCode() { return this.v; }
}
export class JByte extends JNumber {
  static $jn = "java.lang.Byte";
  constructor(public v: number) { super(); }
  toString(): JString { return S(String(this.v)); }
  equals(other: unknown) { return other instanceof JByte && other.v === this.v; }
  hashCode() { return this.v; }
}
export class JBoolean extends JObject {
  static $jn = "java.lang.Boolean";
  constructor(public v: boolean) { super(); }
  toString(): JString { return this.v ? "true" : "false"; }
  equals(other: unknown) { return other instanceof JBoolean && other.v === this.v; }
  hashCode() { return this.v ? 1231 : 1237; }
}
export class JCharacter extends JObject {
  static $jn = "java.lang.Character";
  constructor(public v: number) { super(); }
  toString(): JString { return S(String.fromCharCode(this.v)); }
  equals(other: unknown) { return other instanceof JCharacter && other.v === this.v; }
  hashCode() { return this.v; }
}

function doubleBits(value: number): bigint {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, Number.isNaN(value) ? NaN : value);
  return view.getBigInt64(0);
}

const integerCache = Array.from({ length: 256 }, (_unused, index) => new JInteger(index - 128));
const longCache = Array.from({ length: 256 }, (_unused, index) => new JLong(BigInt(index - 128)));
const shortCache = Array.from({ length: 256 }, (_unused, index) => new JShort(index - 128));
const byteCache = Array.from({ length: 256 }, (_unused, index) => new JByte(index - 128));
const characterCache = Array.from({ length: 128 }, (_unused, index) => new JCharacter(index));
const TRUE = new JBoolean(true), FALSE = new JBoolean(false);

// ---- Throwable -----------------------------------------------------------------------------
type Frame = { method: string; file: string; line: number };

export class JThrowable extends JObject {
  static $jn = "java.lang.Throwable";
  message: JString | null = null;
  cause: JThrowable | null = null;
  trace: Frame[];
  constructor() {
    super();
    this.trace = active ? active.snapshot() : [];
  }
  $c_java_lang_String(message: JString | null) { this.message = message; return this; }
  $c_java_lang_String$java_lang_Throwable(message: JString | null, cause: JThrowable | null) { this.message = message; this.cause = cause; return this; }
  $c_java_lang_Throwable(cause: JThrowable | null) { this.cause = cause; this.message = cause === null ? null : active.str(cause); return this; }
  m_getMessage(): JString | null { return this.message; }
  m_getLocalizedMessage(): JString | null { return this.m_getMessage(); }
  m_getCause(): JThrowable | null { return this.cause; }
  m_printStackTrace() { active.writeText("err", stackTraceText(this)); }
  toString(): JString {
    const message = this.m_getLocalizedMessage();
    return message !== null && message !== undefined ? S(className(this) + ": " + active.str(message)) : className(this);
  }
}

/** Java prints at most this many frames of one trace. */
const MAX_PRINTED_FRAMES = 1024;

export function stackTraceText(throwable: JThrowable): string {
  const lines = [active.str(throwable.toString())];
  const frames = throwable.trace;
  for (const frame of frames.slice(0, MAX_PRINTED_FRAMES)) lines.push(`\tat ${frame.method}(${frame.file}:${frame.line})`);
  let enclosing = frames;
  let cause = throwable.m_getCause();
  const seen = new Set<JThrowable>([throwable]);
  while (cause && !seen.has(cause)) {
    seen.add(cause);
    const causeFrames = cause.trace;
    // Frames the cause shares with the trace around it are summarised as "... n more".
    let common = 0;
    while (common < causeFrames.length && common < enclosing.length) {
      const mine = causeFrames[causeFrames.length - 1 - common], theirs = enclosing[enclosing.length - 1 - common];
      if (mine.method !== theirs.method || mine.file !== theirs.file || mine.line !== theirs.line) break;
      common++;
    }
    lines.push("Caused by: " + active.str(cause.toString()));
    for (const frame of causeFrames.slice(0, causeFrames.length - common)) lines.push(`\tat ${frame.method}(${frame.file}:${frame.line})`);
    if (common) lines.push(`\t... ${common} more`);
    enclosing = causeFrames;
    cause = cause.m_getCause();
  }
  return lines.join("\n") + "\n";
}

/** The library's exception classes, each with its superclass: "java.lang.X extends Y". */
const EXCEPTIONS: [string, string][] = [
  ["java.lang.Exception", "Throwable"], ["java.lang.RuntimeException", "Exception"], ["java.lang.Error", "Throwable"],
  ["java.lang.StackOverflowError", "Error"], ["java.lang.OutOfMemoryError", "Error"], ["java.lang.AssertionError", "Error"],
  ["java.lang.ArithmeticException", "RuntimeException"], ["java.lang.IndexOutOfBoundsException", "RuntimeException"],
  ["java.lang.ArrayIndexOutOfBoundsException", "IndexOutOfBoundsException"],
  ["java.lang.StringIndexOutOfBoundsException", "IndexOutOfBoundsException"],
  ["java.lang.NullPointerException", "RuntimeException"], ["java.lang.IllegalArgumentException", "RuntimeException"],
  ["java.lang.NumberFormatException", "IllegalArgumentException"], ["java.lang.IllegalStateException", "RuntimeException"],
  ["java.lang.ClassCastException", "RuntimeException"], ["java.lang.NegativeArraySizeException", "RuntimeException"],
  ["java.lang.UnsupportedOperationException", "RuntimeException"], ["java.lang.ArrayStoreException", "RuntimeException"],
  ["java.lang.InterruptedException", "Exception"], ["java.lang.CloneNotSupportedException", "Exception"],
  ["java.util.NoSuchElementException", "RuntimeException"], ["java.util.InputMismatchException", "NoSuchElementException"],
  ["java.util.ConcurrentModificationException", "RuntimeException"],
  ["java.util.IllegalFormatException", "IllegalArgumentException"],
  ["java.util.MissingFormatArgumentException", "IllegalFormatException"],
  ["java.util.UnknownFormatConversionException", "IllegalFormatException"],
  ["java.util.IllegalFormatConversionException", "IllegalFormatException"],
  ["java.util.DuplicateFormatFlagsException", "IllegalFormatException"],
  ["java.util.FormatFlagsConversionMismatchException", "IllegalFormatException"],
  ["java.util.IllegalFormatPrecisionException", "IllegalFormatException"],
  ["java.util.MissingFormatWidthException", "IllegalFormatException"],
  ["java.io.IOException", "Exception"], ["java.io.FileNotFoundException", "IOException"],
  ["java.io.UncheckedIOException", "RuntimeException"],
];

type ThrowableClass = new () => JThrowable;
const throwableClasses: Record<string, ThrowableClass & { $jn: string }> = { Throwable: JThrowable };
for (const [qualifiedName, parentName] of EXCEPTIONS) {
  const parent = throwableClasses[parentName];
  const simpleName = qualifiedName.split(".").pop()!;
  const created = { [simpleName]: class extends parent {} }[simpleName] as any;
  created.$jn = qualifiedName;
  throwableClasses[simpleName] = created;
}

function exception(simpleName: string, message: string | null = null): JThrowable {
  const created = new throwableClasses[simpleName]();
  created.message = message;
  return created;
}

// ---- lists ------------------------------------------------------------------------------------
const enum ListKind { Growable, FixedSize, Immutable, UnmodifiableView }

export class JList extends JObject {
  static $jn = "java.util.ArrayList";
  modCount = 0;
  /** `items` is never replaced, only changed in place: views and Arrays.asList share it. */
  constructor(public items: any[], public kind: ListKind = ListKind.Growable, jn?: string) {
    super();
    if (jn) this.$jn = jn;
  }
  toString(): JString {
    return S("[" + this.items.map((item) => (item === this ? "(this Collection)" : text(active.str(item)))).join(", ") + "]");
  }
  equals(other: unknown): boolean {
    if (other === this) return true;
    if (!(other instanceof JList) || other.items.length !== this.items.length) return false;
    return this.items.every((item, index) => objectsEqual(item, other.items[index]));
  }
  hashCode(): number {
    let hash = 1;
    for (const item of this.items) hash = (Math.imul(31, hash) + (item === null ? 0 : hashOf(item))) | 0;
    return hash;
  }
  modifiable() {
    if (this.kind !== ListKind.Growable) throw exception("UnsupportedOperationException");
  }
  settable() {
    if (this.kind === ListKind.Immutable || this.kind === ListKind.UnmodifiableView) throw exception("UnsupportedOperationException");
  }
  checkIndex(index: number) {
    if (index < 0 || index >= this.items.length) {
      throw exception(this.kind === ListKind.FixedSize ? "ArrayIndexOutOfBoundsException" : "IndexOutOfBoundsException",
        `Index ${index} out of bounds for length ${this.items.length}`);
    }
  }
  iterator() { return new ListIterator(this); }
}

class ListIterator {
  cursor = 0;
  expected: number;
  constructor(private list: JList) { this.expected = list.modCount; }
  hasNext() { return this.cursor !== this.list.items.length; }
  next() {
    if (this.list.modCount !== this.expected) throw exception("ConcurrentModificationException");
    if (this.cursor >= this.list.items.length) throw exception("NoSuchElementException");
    return this.list.items[this.cursor++];
  }
}

function objectsEqual(first: any, second: any): boolean {
  if (first === second) return true;
  if (first === null || second === null) return false;
  return equalsOf(first, second);
}
function equalsOf(receiver: any, other: any): boolean {
  if (isStr(receiver)) return isStr(other) && text(receiver) === text(other);
  if (Array.isArray(receiver)) return receiver === other;
  return !!receiver.equals(other);
}
function hashOf(value: any): number {
  if (isStr(value)) return stringHash(text(value));
  if (Array.isArray(value)) return identityHash(value);
  return value.hashCode();
}
function stringHash(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index++) hash = (Math.imul(31, hash) + value.charCodeAt(index)) | 0;
  return hash;
}

// ---- natural ordering (Comparable) ----------------------------------------------------------
function compareStrings(first: string, second: string): number {
  const length = Math.min(first.length, second.length);
  for (let index = 0; index < length; index++) {
    const difference = first.charCodeAt(index) - second.charCodeAt(index);
    if (difference) return difference;
  }
  return first.length - second.length;
}
function compareDoubles(first: number, second: number): number {
  if (first < second) return -1;
  if (first > second) return 1;
  const firstBits = doubleBits(first), secondBits = doubleBits(second);
  return firstBits === secondBits ? 0 : firstBits < secondBits ? -1 : 1;
}
const COMPARABLE = "java.lang.Comparable";
function compareNatural(first: any, second: any): number {
  if (first === null || second === null) throw exception("NullPointerException");
  if (isStr(first)) {
    if (!isStr(second)) throw classCast(second, "java.lang.String");
    return compareStrings(text(first), text(second));
  }
  if (first instanceof JNumber || first instanceof JBoolean || first instanceof JCharacter) {
    if (second.constructor !== first.constructor) throw classCast(second, className(first));
    if (first instanceof JLong) return first.v < second.v ? -1 : first.v > second.v ? 1 : 0;
    if (first instanceof JDouble || first instanceof JFloat) return compareDoubles(first.v, second.v);
    if (first instanceof JBoolean) return first.v === second.v ? 0 : first.v ? 1 : -1;
    if (first instanceof JCharacter || first instanceof JShort || first instanceof JByte) return first.v - second.v;
    return first.v < second.v ? -1 : first.v > second.v ? 1 : 0;
  }
  if (typeof first.compareTo === "function" && first.constructor.$i?.has(COMPARABLE)) return first.compareTo(second);
  throw classCast(first, COMPARABLE);
}

function classCast(value: any, target: string): JThrowable {
  const source = className(value);
  const isLibrary = (name: string) => /^(java|\[)/.test(name) && !/^\[+L(?!java)/.test(name);
  const where = (name: string) => (isLibrary(name) ? "module java.base of loader 'bootstrap'" : "unnamed module of loader 'app'");
  const detail = where(source) === where(target)
    ? `${source} and ${target} are in ${where(source)}`
    : `${source} is in ${where(source)}; ${target} is in ${where(target)}`;
  return exception("ClassCastException", `class ${source} cannot be cast to class ${target} (${detail})`);
}

// ---- the keyboard ------------------------------------------------------------------------------
type InputSource = { buffer: string; position: number; ended: boolean; interactive: boolean };

const WHITESPACE = /[\t\n\u000B\f\r\u001C-\u001F \u1680\u2000-\u2006\u2008-\u200A\u2028\u2029\u205F\u3000]/;
const LINE_SEPARATOR = /\r\n|[\n\r\u2028\u2029\u0085]/g;
const INTEGER_TOKEN = /^[-+]?(\d+|\d{1,3}(,\d{3})+)$/;
const DECIMAL_TOKEN = /^[-+]?((\d+|\d{1,3}(,\d{3})+)(\.\d*)?|\.\d+)([eE][-+]?\d+)?$|^[-+]?(NaN|Infinity)$/;
const BOOLEAN_TOKEN = /^(true|false)$/i;

class JInputStream extends JObject { static $jn = "java.io.BufferedInputStream"; }
class JPrintStream extends JObject {
  static $jn = "java.io.PrintStream";
  constructor(public stream: Stream) { super(); }
}

export class JScanner extends JObject {
  static $jn = "java.util.Scanner";
  closed = false;
  constructor(public source: InputSource, public ownsSystemIn: boolean) { super(); }
}

export class JRandom extends JObject {
  static $jn = "java.util.Random";
  seed = 0n;
  nextNextGaussian = 0;
  haveNextNextGaussian = false;
  constructor(seed: bigint) { super(); this.setSeed(seed); }
  setSeed(seed: bigint) {
    this.seed = (seed ^ 0x5DEECE66Dn) & ((1n << 48n) - 1n);
    this.haveNextNextGaussian = false;
  }
  next(bits: number): number {
    this.seed = (this.seed * 0x5DEECE66Dn + 0xBn) & ((1n << 48n) - 1n);
    return Number(BigInt.asIntN(32, this.seed >> BigInt(48 - bits)));
  }
  nextInt(): number { return this.next(32); }
  nextIntBounded(bound: number): number {
    if (bound <= 0) throw exception("IllegalArgumentException", "bound must be positive");
    let random = this.next(31);
    const mask = bound - 1;
    if ((bound & mask) === 0) return Number((BigInt(bound) * BigInt(random)) >> 31n);
    for (let candidate = random; ((candidate - (random = candidate % bound) + mask) | 0) < 0; candidate = this.next(31));
    return random;
  }
  nextDouble(): number { return (this.next(26) * 134217728 + this.next(27)) / 9007199254740992; }
}

class JStringBuilder extends JObject {
  static $jn = "java.lang.StringBuilder";
  capacity: number;
  constructor(public value: string, capacity?: number) { super(); this.capacity = capacity ?? value.length + 16; }
  toString(): JString { return S(this.value); }
  grow() {
    if (this.value.length > this.capacity) this.capacity = Math.max(this.capacity * 2 + 2, this.value.length);
  }
}

// ---- formatting (printf, String.format) -------------------------------------------------------------
/** Round a decimal digit string half-up to `keep` digits. Returns the new digits and whether a carry added one. */
function roundDigits(digits: string, keep: number): { digits: string; carried: boolean } {
  if (keep >= digits.length) return { digits: digits.padEnd(Math.max(keep, 0), "0"), carried: false };
  if (keep < 0) return { digits: "", carried: false };
  const roundUp = digits.charCodeAt(keep) >= 53;   // '5'
  let kept = digits.slice(0, keep).split("").map(Number);
  if (roundUp) {
    let index = kept.length - 1;
    while (index >= 0 && kept[index] === 9) { kept[index] = 0; index--; }
    if (index < 0) { kept.unshift(1); return { digits: kept.join(""), carried: true }; }
    kept[index]++;
  }
  return { digits: kept.join(""), carried: false };
}

/** The shortest digits of |value| and its decimal exponent: 123.45 -> "12345", 2. */
function shortestDigits(value: number): { digits: string; exponent: number } {
  const [mantissa, exponentText] = Math.abs(value).toExponential().split("e");
  return { digits: mantissa.replace(".", ""), exponent: Number(exponentText) };
}

/** %f: Java rounds the shortest decimal form half-up, so %.2f of 1.005 is 1.01. */
function fixedDigits(value: number, precision: number): string {
  if (value === 0) return precision ? "0." + "0".repeat(precision) : "0";
  const { digits, exponent } = shortestDigits(value);
  // The digits before the point are exponent + 1; keep that many plus the precision.
  const keep = exponent + 1 + precision;
  let whole: string, fraction: string;
  if (keep <= 0) {
    // All the digits fall below the last kept place: it rounds to 0, or up to one unit of it.
    const roundsUp = keep === 0 && digits.charCodeAt(0) >= 53;
    const units = roundsUp ? "1" : "0";
    const padded = units.padStart(precision + 1, "0");
    whole = padded.slice(0, padded.length - precision) || "0";
    fraction = padded.slice(padded.length - precision);
  } else {
    const rounded = roundDigits(digits, keep);
    const allDigits = rounded.digits;
    const wholeLength = exponent + 1 + (rounded.carried ? 1 : 0);
    if (wholeLength <= 0) {
      whole = "0";
      fraction = ("0".repeat(-wholeLength) + allDigits).slice(0, precision).padEnd(precision, "0");
    } else {
      whole = allDigits.slice(0, wholeLength).padEnd(wholeLength, "0");
      fraction = allDigits.slice(wholeLength).padEnd(precision, "0");
    }
  }
  return precision ? `${whole}.${fraction}` : whole;
}

/** %e: d.ddddde+xx */
function scientificDigits(value: number, precision: number, upper: boolean): string {
  let mantissa: string, exponent: number;
  if (value === 0) { mantissa = "0" + (precision ? "." + "0".repeat(precision) : ""); exponent = 0; }
  else {
    const shortest = shortestDigits(value);
    const rounded = roundDigits(shortest.digits, precision + 1);
    exponent = shortest.exponent + (rounded.carried ? 1 : 0);
    const kept = rounded.digits.slice(0, precision + 1);
    mantissa = kept[0] + (precision ? "." + kept.slice(1) : "");
  }
  const exponentText = (exponent < 0 ? "-" : "+") + String(Math.abs(exponent)).padStart(2, "0");
  return mantissa + (upper ? "E" : "e") + exponentText;
}

function groupThousands(whole: string): string {
  return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ---- regular expressions: Java's syntax, run by JavaScript's engine --------------------------------------
const POSIX_CLASSES: Record<string, string> = {
  Lower: "a-z", Upper: "A-Z", Alpha: "A-Za-z", Digit: "0-9", Alnum: "A-Za-z0-9", XDigit: "0-9a-fA-F",
  Punct: "!-\\/:-@\\[-`{-~", Graph: "!-~", Print: " -~", Blank: " \\t", Space: " \\t\\n\\x0B\\f\\r", Cntrl: "\\x00-\\x1F\\x7F",
  ASCII: "\\x00-\\x7F", javaLowerCase: "a-z", javaUpperCase: "A-Z", javaWhitespace: "\\t\\n\\x0B\\f\\r\\x1C-\\x1F ",
};
const regexCache = new Map<string, RegExp>();
function javaRegex(pattern: string, flags = ""): RegExp {
  const key = flags + "\u0000" + pattern;
  let compiled = regexCache.get(key);
  if (compiled) return new RegExp(compiled.source, compiled.flags);
  let source = pattern;
  let extraFlags = "";
  const inline = source.match(/^\(\?([imsx]+)\)/);
  if (inline) { extraFlags = inline[1].replace(/x/g, ""); source = source.slice(inline[0].length); }
  source = source
    .replace(/\\p\{(?:Is)?(\w+)\}/g, (whole, name) => (POSIX_CLASSES[name] ? `[${POSIX_CLASSES[name]}]` : whole))
    .replace(/\\P\{(?:Is)?(\w+)\}/g, (whole, name) => (POSIX_CLASSES[name] ? `[^${POSIX_CLASSES[name]}]` : whole))
    .replace(/\\A/g, "^").replace(/\\[Zz]/g, "$")
    .replace(/([*+?}])\+/g, "$1");   // possessive quantifiers: JavaScript has none; greedy matches the same strings
  const unicode = /\\[pP]\{/.test(source) ? "u" : "";
  try {
    compiled = new RegExp(source, [...new Set((flags + extraFlags + unicode).split(""))].join(""));
  } catch (error) {
    throw exception("IllegalArgumentException", `bad regular expression ${JSON.stringify(pattern)}: ${(error as Error).message}`);
  }
  regexCache.set(key, compiled);
  return new RegExp(compiled.source, compiled.flags);
}

/** Java's replacement string: $1 and ${name} are groups, \x is a literal x. */
function javaReplacement(replacement: string): (match: string[], groups: Record<string, string> | undefined) => string {
  const parts: (string | number | { name: string })[] = [];
  let literal = "";
  for (let index = 0; index < replacement.length; index++) {
    const character = replacement[index];
    if (character === "\\") {
      index++;
      if (index >= replacement.length) throw exception("IllegalArgumentException", "character to be escaped is missing");
      literal += replacement[index];
    } else if (character === "$") {
      if (index + 1 >= replacement.length) throw exception("IllegalArgumentException", "Illegal group reference: group index is missing");
      if (replacement[index + 1] === "{") {
        const end = replacement.indexOf("}", index);
        if (end < 0) throw exception("IllegalArgumentException", "named capturing group is missing trailing '}'");
        parts.push(literal); literal = "";
        parts.push({ name: replacement.slice(index + 2, end) });
        index = end;
      } else if (/\d/.test(replacement[index + 1])) {
        parts.push(literal); literal = "";
        parts.push(Number(replacement[index + 1]));
        index++;
      } else {
        throw exception("IllegalArgumentException", "Illegal group reference");
      }
    } else literal += character;
  }
  parts.push(literal);
  return (match, groups) => parts.map((part) => {
    if (typeof part === "string") return part;
    if (typeof part === "number") {
      if (part >= match.length) throw exception("IndexOutOfBoundsException", `No group ${part}`);
      return match[part] ?? "";
    }
    if (!groups || !(part.name in groups)) throw exception("IllegalArgumentException", `No group with name {${part.name}}`);
    return groups[part.name] ?? "";
  }).join("");
}

// ---- parsing numbers ------------------------------------------------------------------------------------
function forInputString(value: string, radix = 10): JThrowable {
  return exception("NumberFormatException", `For input string: "${value}"${radix === 10 ? "" : ` under radix ${radix}`}`);
}
function parseInteger(input: JString | null, radix: number, minimum: bigint, maximum: bigint): bigint {
  if (input === null) throw exception("NumberFormatException", "Cannot parse null string: null");
  if (radix < 2) throw exception("NumberFormatException", `radix ${radix} less than Character.MIN_RADIX`);
  if (radix > 36) throw exception("NumberFormatException", `radix ${radix} greater than Character.MAX_RADIX`);
  const value = text(input);
  if (!value.length) throw exception("NumberFormatException", `For input string: ""${radix === 10 ? "" : ` under radix ${radix}`}`);
  const negative = value[0] === "-";
  const digits = value[0] === "-" || value[0] === "+" ? value.slice(1) : value;
  if (!digits.length) throw forInputString(value, radix);
  let result = 0n;
  for (const character of digits) {
    const digit = digitValue(character.charCodeAt(0), radix);
    if (digit < 0) throw forInputString(value, radix);
    result = result * BigInt(radix) + BigInt(digit);
  }
  if (negative) result = -result;
  if (result < minimum || result > maximum) throw forInputString(value, radix);
  return result;
}
function digitValue(code: number, radix: number): number {
  let value = -1;
  if (code >= 48 && code <= 57) value = code - 48;
  else if (code >= 97 && code <= 122) value = code - 87;
  else if (code >= 65 && code <= 90) value = code - 55;
  return value >= 0 && value < radix ? value : -1;
}
const DOUBLE_TEXT = /^[+-]?(NaN|Infinity|((\d+\.?\d*|\.\d+)([eE][+-]?\d+)?)[fFdD]?)$/;
function parseDoubleText(input: JString | null): number {
  if (input === null) throw exception("NullPointerException");
  const value = text(input).replace(/^[\x00-\x20]+|[\x00-\x20]+$/g, "");
  if (!value.length) throw exception("NumberFormatException", "empty String");
  if (!DOUBLE_TEXT.test(value)) throw forInputString(text(input));
  return Number(value.replace(/[fFdD]$/, "").replace(/^\+/, ""));
}

const INT_MIN = -2147483648n, INT_MAX = 2147483647n;
const LONG_MIN = -(1n << 63n), LONG_MAX = (1n << 63n) - 1n;

const JAVA_WHITESPACE = (code: number) => WHITESPACE.test(String.fromCharCode(code));

// ================================================================================================
export class JavaRuntime {
  // The shadow stack: which method each frame is in, and on which line.
  sp = 0;
  st: string[] = [];
  fl: string[] = [];
  ln: number[] = [];
  maxDepth = 3000;
  exiting = false;

  C: Record<string, any> = {
    ...throwableClasses, Object: JObject, Number: JNumber, Integer: JInteger, Long: JLong, Double: JDouble, Float: JFloat,
    Short: JShort, Byte: JByte, Boolean: JBoolean, Character: JCharacter, ArrayList: JList, Scanner: JScanner,
    Random: JRandom, StringBuilder: JStringBuilder, PrintStream: JPrintStream, InputStream: JInputStream,
  };
  F: Record<string, any>;
  stdin: InputSource = { buffer: "", position: 0, ended: false, interactive: true };
  private sharedRandom: JRandom | null = null;
  private startTime = typeof performance !== "undefined" ? performance.now() : Date.now();

  constructor(private host: RuntimeHost) {
    active = this;
    this.F = {
      System_out: new JPrintStream("out"), System_err: new JPrintStream("err"), System_in: new JInputStream(),
      Boolean_TRUE: TRUE, Boolean_FALSE: FALSE,
    };
  }

  // ---- keyboard input from the host ----
  feed(input: string) { this.stdin.buffer += input; }
  endInput() { this.stdin.ended = true; }

  writeText(stream: Stream, value: string) { this.host.write(stream, value); }

  // ---- frames and exceptions ----
  snapshot(): Frame[] {
    const frames: Frame[] = [];
    for (let index = this.sp - 1; index >= 0; index--) frames.push({ method: this.st[index], file: this.fl[index], line: this.ln[index] });
    return frames;
  }
  soe(): never { throw exception("StackOverflowError"); }
  /** Whatever was thrown, as the Java exception it stands for. */
  jex(error: any): any {
    if (error instanceof JThrowable) return error;
    if (error instanceof ExitSignal) throw error;
    if (error instanceof RangeError || (error && error.name === "InternalError")) {
      if (/stack|recursion/i.test(error.message)) return exception("StackOverflowError");
      if (/array length|allocation|memory/i.test(error.message)) return exception("OutOfMemoryError", "Java heap space");
    }
    if (error instanceof TypeError) return exception("NullPointerException");
    throw error;
  }
  thr(value: any): any { return value === null ? exception("NullPointerException", 'Cannot throw exception because the value is null') : value; }
  nn<T>(value: T, message?: string): T {
    if (value === null || value === undefined) throw exception("NullPointerException", message ?? null);
    return value;
  }
  cce(value: any, target: string): never { throw classCast(value, target); }
  unsupported(feature: string): never { throw exception("UnsupportedOperationException", feature); }
  uncaughtText(error: JThrowable): string { return 'Exception in thread "main" ' + stackTraceText(error); }

  // ---- values ----
  S = S;
  isStr = isStr;
  str(value: any): string | String {
    if (value === null || value === undefined) return "null";
    if (isStr(value)) return value;
    if (Array.isArray(value)) return S(className(value) + "@" + identityHash(value).toString(16));
    const result = value.toString();
    return result === null || result === undefined ? "null" : result;
  }
  ds = javaDoubleToString;
  fs = javaFloatToString;
  is(value: any, qualifiedName: string): boolean {
    switch (qualifiedName) {
      case "java.lang.Object": return true;
      case "java.lang.String": return isStr(value);
      case "java.lang.CharSequence": return isStr(value) || value instanceof JStringBuilder;
      case COMPARABLE:
        return isStr(value) || value instanceof JNumber || value instanceof JBoolean || value instanceof JCharacter
          || !!value.constructor?.$i?.has(COMPARABLE);
      case "java.lang.Iterable": case "java.util.Collection": case "java.util.List": return value instanceof JList;
      case "java.lang.Runnable": return !!value.constructor?.$i?.has(qualifiedName);
    }
    const jsClass = this.C[qualifiedName.split(".").pop()!];
    return !!jsClass && value instanceof jsClass;
  }
  io(value: any, jsInterface: unknown): boolean { return !!value?.constructor?.$i?.has(jsInterface); }

  // boxing
  bI(value: number) { return value >= -128 && value <= 127 ? integerCache[value + 128] : new JInteger(value); }
  bJ(value: bigint) { return value >= -128n && value <= 127n ? longCache[Number(value) + 128] : new JLong(value); }
  bD(value: number) { return new JDouble(value); }
  bF(value: number) { return new JFloat(value); }
  bZ(value: boolean) { return value ? TRUE : FALSE; }
  bC(value: number) { return value < 128 ? characterCache[value] : new JCharacter(value); }
  bS(value: number) { return value >= -128 && value <= 127 ? shortCache[value + 128] : new JShort(value); }
  bB(value: number) { return byteCache[value + 128]; }
  ub(box: any) {
    if (box === null || box === undefined) throw exception("NullPointerException");
    return box.v;
  }
  ubx(box: any) { return this.ub(box); }

  // arithmetic
  d2i(value: number): number {
    if (Number.isNaN(value)) return 0;
    if (value >= 2147483647) return 2147483647;
    if (value <= -2147483648) return -2147483648;
    return Math.trunc(value) | 0;
  }
  d2l(value: number): bigint {
    if (Number.isNaN(value)) return 0n;
    if (value >= 9223372036854775807) return LONG_MAX;
    if (value <= -9223372036854775808) return LONG_MIN;
    return BigInt(Math.trunc(value));
  }
  idiv(left: number, right: number): number {
    if (right === 0) throw exception("ArithmeticException", "/ by zero");
    return (left / right) | 0;
  }
  imod(left: number, right: number): number {
    if (right === 0) throw exception("ArithmeticException", "/ by zero");
    return (left % right) | 0;
  }
  ldiv(left: bigint, right: bigint): bigint {
    if (right === 0n) throw exception("ArithmeticException", "/ by zero");
    return BigInt.asIntN(64, left / right);
  }
  lmod(left: bigint, right: bigint): bigint {
    if (right === 0n) throw exception("ArithmeticException", "/ by zero");
    return left % right;
  }
  band(left: boolean, right: boolean) { return left && right; }
  bor(left: boolean, right: boolean) { return left || right; }

  // ---- arrays ----
  arr(descriptor: string, elements: any[]): any[] { (elements as any).$d = descriptor; return elements; }
  newArr(descriptor: string, sizes: number[]): any[] {
    for (const size of sizes) if (size < 0) throw exception("NegativeArraySizeException", String(size));
    const build = (depth: number, typeDescriptor: string): any[] => {
      const length = sizes[depth];
      const elementDescriptor = typeDescriptor.slice(1);
      let array: any[];
      if (depth + 1 < sizes.length) {
        array = new Array(length);
        for (let index = 0; index < length; index++) array[index] = build(depth + 1, elementDescriptor);
      } else {
        array = new Array(length).fill(defaultOf(elementDescriptor));
      }
      (array as any).$d = typeDescriptor;
      return array;
    };
    return build(0, descriptor);
  }
  aget(array: any[], index: number) {
    if (array === null) throw exception("NullPointerException", `Cannot load from ${arrayTypeName("[").replace("[]", "") || "an"} array`.replace("object array", "array"));
    if (index < 0 || index >= array.length) throw exception("ArrayIndexOutOfBoundsException", `Index ${index} out of bounds for length ${array.length}`);
    return array[index];
  }
  ast(array: any[], index: number, value: any) {
    if (array === null) throw exception("NullPointerException", "Cannot store to array");
    if (index < 0 || index >= array.length) throw exception("ArrayIndexOutOfBoundsException", `Index ${index} out of bounds for length ${array.length}`);
    return (array[index] = value);
  }
  aclone(array: any[]) { return this.arr((array as any).$d, array.slice()); }
  isArr(value: any, descriptor: string): boolean {
    if (!Array.isArray(value)) return false;
    const actual: string = (value as any).$d;
    if (actual === descriptor) return true;
    // Object[] holds any array of references; String[][] is an Object[].
    return descriptor === "[Ljava.lang.Object;" && (actual[1] === "L" || actual[1] === "[");
  }
  iter(iterable: any) {
    if (iterable instanceof JList) return iterable.iterator();
    throw exception("UnsupportedOperationException", "not iterable");
  }

  // =========================================================================================
  // java.lang.Object, Comparable, CharSequence
  Object_new_() { return new JObject(); }
  Object_equals(receiver: any, other: any) { return equalsOf(receiver, other); }
  Object_hashCode(receiver: any) { return hashOf(receiver); }
  Object_toString(receiver: any) { return this.str(receiver); }
  Object_hashCode_identity(value: any) { return value === null ? 0 : typeof value === "object" ? identityHash(value) : stringHash(value); }
  Comparable_compareTo(receiver: any, other: any) { return compareNatural(receiver, other); }
  CharSequence_length(receiver: any) { return isStr(receiver) ? receiver.length : receiver.value.length; }
  CharSequence_charAt(receiver: any, index: number) {
    return isStr(receiver) ? this.String_charAt(receiver, index) : this.StringBuilder_charAt(receiver, index);
  }
  CharSequence_isEmpty(receiver: any) { return this.CharSequence_length(receiver) === 0; }
  private seq(value: any): string {
    if (value === null) throw exception("NullPointerException");
    return isStr(value) ? text(value) : value.value;
  }

  // ---- String ----
  String_new_() { return S(""); }
  String_new_String(value: JString) { return S(text(this.nn(value))); }
  String_new_AC(chars: number[]) { return S(String.fromCharCode(...this.nn(chars))); }
  String_new_ACII(chars: number[], offset: number, count: number) {
    this.nn(chars);
    if (offset < 0 || count < 0 || offset > chars.length - count) {
      throw exception("StringIndexOutOfBoundsException", `offset ${offset}, count ${count}, length ${chars.length}`);
    }
    return S(String.fromCharCode(...chars.slice(offset, offset + count)));
  }
  String_length(value: JString) { return value.length; }
  String_charAt(value: JString, index: number) {
    if (index < 0 || index >= value.length) throw exception("StringIndexOutOfBoundsException", `Index ${index} out of bounds for length ${value.length}`);
    return text(value).charCodeAt(index);
  }
  String_charAt_I(value: JString, index: number) { return this.String_charAt(value, index); }
  String_isEmpty(value: JString) { return value.length === 0; }
  String_isBlank(value: JString) { return [...text(value)].every((character) => JAVA_WHITESPACE(character.charCodeAt(0))); }
  String_substring_I(value: JString, begin: number) { return this.String_substring_II(value, begin, value.length); }
  String_substring_II(value: JString, begin: number, end: number) {
    const length = value.length;
    if (begin < 0 || begin > end || end > length) {
      throw exception("StringIndexOutOfBoundsException", `begin ${begin}, end ${end}, length ${length}`);
    }
    if (begin === 0 && end === length) return value;
    return S(text(value).slice(begin, end));
  }
  String_indexOf_I(value: JString, character: number) { return text(value).indexOf(String.fromCodePoint(character)); }
  String_indexOf_String(value: JString, target: JString) { return text(value).indexOf(text(this.nn(target))); }
  String_indexOf_II(value: JString, character: number, from: number) { return text(value).indexOf(String.fromCodePoint(character), Math.max(from, 0)); }
  String_indexOf_StringI(value: JString, target: JString, from: number) {
    const found = text(value).indexOf(text(this.nn(target)), Math.max(from, 0));
    return found;
  }
  String_lastIndexOf_I(value: JString, character: number) { return text(value).lastIndexOf(String.fromCodePoint(character)); }
  String_lastIndexOf_String(value: JString, target: JString) { return text(value).lastIndexOf(text(this.nn(target))); }
  String_lastIndexOf_II(value: JString, character: number, from: number) {
    return from < 0 ? -1 : text(value).lastIndexOf(String.fromCodePoint(character), from);
  }
  String_lastIndexOf_StringI(value: JString, target: JString, from: number) {
    return from < 0 ? -1 : text(value).lastIndexOf(text(this.nn(target)), from);
  }
  String_contains(value: JString, target: any) { return text(value).includes(this.seq(target)); }
  String_equals(value: JString, other: any) { return isStr(other) && text(value) === text(other); }
  String_equalsIgnoreCase(value: JString, other: JString | null) {
    if (other === null || other.length !== value.length) return false;
    return this.String_compareToIgnoreCase(value, other) === 0;
  }
  String_compareTo(value: JString, other: JString) { return compareStrings(text(value), text(this.nn(other))); }
  String_compareToIgnoreCase(value: JString, other: JString) {
    const first = text(value), second = text(this.nn(other));
    const length = Math.min(first.length, second.length);
    for (let index = 0; index < length; index++) {
      let a = first.charCodeAt(index), b = second.charCodeAt(index);
      if (a === b) continue;
      a = this.Character_toUpperCase(a); b = this.Character_toUpperCase(b);
      if (a === b) continue;
      a = this.Character_toLowerCase(a); b = this.Character_toLowerCase(b);
      if (a !== b) return a - b;
    }
    return first.length - second.length;
  }
  private sameOrNew(original: JString, changed: string): JString { return changed === text(original) ? original : S(changed); }
  String_toUpperCase(value: JString) { return this.sameOrNew(value, text(value).toUpperCase()); }
  String_toLowerCase(value: JString) { return this.sameOrNew(value, text(value).toLowerCase()); }
  String_trim(value: JString) { return this.sameOrNew(value, text(value).replace(/^[\x00-\x20]+|[\x00-\x20]+$/g, "")); }
  private stripEnds(value: string, leading: boolean, trailing: boolean) {
    let start = 0, end = value.length;
    if (leading) while (start < end && JAVA_WHITESPACE(value.charCodeAt(start))) start++;
    if (trailing) while (end > start && JAVA_WHITESPACE(value.charCodeAt(end - 1))) end--;
    return value.slice(start, end);
  }
  String_strip(value: JString) { return this.sameOrNew(value, this.stripEnds(text(value), true, true)); }
  String_stripLeading(value: JString) { return this.sameOrNew(value, this.stripEnds(text(value), true, false)); }
  String_stripTrailing(value: JString) { return this.sameOrNew(value, this.stripEnds(text(value), false, true)); }
  String_startsWith_String(value: JString, prefix: JString) { return text(value).startsWith(text(this.nn(prefix))); }
  String_startsWith_StringI(value: JString, prefix: JString, offset: number) {
    if (offset < 0 || offset > value.length) return false;
    return text(value).startsWith(text(this.nn(prefix)), offset);
  }
  String_endsWith(value: JString, suffix: JString) { return text(value).endsWith(text(this.nn(suffix))); }
  String_replace_CC(value: JString, from: number, to: number) {
    return this.sameOrNew(value, text(value).split(String.fromCharCode(from)).join(String.fromCharCode(to)));
  }
  String_replace_CharSequenceCharSequence(value: JString, target: any, replacement: any) {
    const from = this.seq(target), to = this.seq(replacement);
    return this.sameOrNew(value, text(value).split(from).join(to));
  }
  String_replaceAll(value: JString, regex: JString, replacement: JString) {
    const pattern = javaRegex(text(this.nn(regex)), "g");
    const build = javaReplacement(text(this.nn(replacement)));
    return S(text(value).replace(pattern, (...args: any[]) => this.replacementFor(args, build)));
  }
  String_replaceFirst(value: JString, regex: JString, replacement: JString) {
    const pattern = javaRegex(text(this.nn(regex)));
    const build = javaReplacement(text(this.nn(replacement)));
    return S(text(value).replace(pattern, (...args: any[]) => this.replacementFor(args, build)));
  }
  private replacementFor(args: any[], build: ReturnType<typeof javaReplacement>) {
    const hasGroups = typeof args[args.length - 1] === "object" && args[args.length - 1] !== null;
    const groups = hasGroups ? args[args.length - 1] : undefined;
    const match = args.slice(0, hasGroups ? -3 : -2);
    return build(match, groups);
  }
  String_split_String(value: JString, regex: JString) { return this.String_split_StringI(value, regex, 0); }
  String_split_StringI(value: JString, regex: JString, limit: number) {
    const input = text(value);
    const pattern = javaRegex(text(this.nn(regex)), "g");
    const pieces: string[] = [];
    let index = 0;
    const limited = limit > 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(input)) !== null) {
      const start = match.index, end = start + match[0].length;
      if (match[0].length === 0) pattern.lastIndex++;
      if (match[0].length === 0 && start >= input.length) break;
      if (!limited || pieces.length < limit - 1) {
        if (index === 0 && start === 0 && start === end) continue;
        pieces.push(input.slice(index, start));
        index = end;
      } else if (pieces.length === limit - 1) {
        break;
      }
    }
    if (index === 0 && !pieces.length) return this.arr("[Ljava.lang.String;", [value]);
    pieces.push(input.slice(index));
    let size = pieces.length;
    if (limit === 0) while (size > 0 && pieces[size - 1] === "") size--;
    return this.arr("[Ljava.lang.String;", pieces.slice(0, size).map(S));
  }
  String_toCharArray(value: JString) {
    const source = text(value);
    const chars = new Array(source.length);
    for (let index = 0; index < source.length; index++) chars[index] = source.charCodeAt(index);
    return this.arr("[C", chars);
  }
  String_concat(value: JString, other: JString) {
    const addition = text(this.nn(other));
    return addition.length ? S(text(value) + addition) : value;
  }
  String_repeat(value: JString, count: number) {
    if (count < 0) throw exception("IllegalArgumentException", "count is negative: " + count);
    if (count === 1) return value;
    return S(text(value).repeat(count));
  }
  String_matches(value: JString, regex: JString) {
    const pattern = javaRegex(`^(?:${text(this.nn(regex))})$`);
    return pattern.test(text(value));
  }
  String_hashCode(value: JString) { return stringHash(text(value)); }
  String_toString(value: JString) { return value; }
  String_intern(value: JString) { return text(value); }
  String_formatted(value: JString, args: any[]) { return S(this.format(text(value), args)); }
  String_valueOf_I(value: number) { return S(String(value)); }
  String_valueOf_J(value: bigint) { return S(String(value)); }
  String_valueOf_D(value: number) { return S(javaDoubleToString(value)); }
  String_valueOf_F(value: number) { return S(javaFloatToString(value)); }
  String_valueOf_C(value: number) { return S(String.fromCharCode(value)); }
  String_valueOf_Z(value: boolean) { return value ? "true" : "false"; }
  String_valueOf_AC(chars: number[]) { return S(String.fromCharCode(...this.nn(chars))); }
  String_valueOf_Object(value: any) { return this.str(value); }
  String_format(format: JString, args: any[]) { return S(this.format(text(this.nn(format)), args)); }
  String_join_array(delimiter: any, elements: any[]) {
    const separator = this.seq(delimiter);
    return S(this.nn(elements).map((element) => (element === null ? "null" : this.seq(element))).join(separator));
  }
  String_join_iterable(delimiter: any, elements: JList) {
    const separator = this.seq(delimiter);
    return S(this.nn(elements).items.map((element) => (element === null ? "null" : this.seq(element))).join(separator));
  }

  // ---- StringBuilder ----
  StringBuilder_new_() { return new JStringBuilder(""); }
  StringBuilder_new_String(value: any) { return new JStringBuilder(this.seq(value)); }
  StringBuilder_new_I(capacity: number) {
    if (capacity < 0) throw exception("NegativeArraySizeException", String(capacity));
    return new JStringBuilder("", capacity);
  }
  private appended(builder: JStringBuilder, addition: string) {
    builder.value += addition;
    builder.grow();
    return builder;
  }
  StringBuilder_append_Object(builder: JStringBuilder, value: any) { return this.appended(builder, text(this.str(value))); }
  StringBuilder_append_C(builder: JStringBuilder, value: number) { return this.appended(builder, String.fromCharCode(value)); }
  StringBuilder_append_I(builder: JStringBuilder, value: number | bigint) { return this.appended(builder, String(value)); }
  StringBuilder_append_D(builder: JStringBuilder, value: number) { return this.appended(builder, javaDoubleToString(value)); }
  StringBuilder_append_F(builder: JStringBuilder, value: number) { return this.appended(builder, javaFloatToString(value)); }
  StringBuilder_append_Z(builder: JStringBuilder, value: boolean) { return this.appended(builder, String(value)); }
  StringBuilder_append_AC(builder: JStringBuilder, chars: number[]) { return this.appended(builder, String.fromCharCode(...this.nn(chars))); }
  private inserted(builder: JStringBuilder, offset: number, addition: string) {
    if (offset < 0 || offset > builder.value.length) {
      throw exception("StringIndexOutOfBoundsException", `offset ${offset}, length ${builder.value.length}`);
    }
    builder.value = builder.value.slice(0, offset) + addition + builder.value.slice(offset);
    builder.grow();
    return builder;
  }
  StringBuilder_insert_Object(builder: JStringBuilder, offset: number, value: any) { return this.inserted(builder, offset, text(this.str(value))); }
  StringBuilder_insert_C(builder: JStringBuilder, offset: number, value: number) { return this.inserted(builder, offset, String.fromCharCode(value)); }
  StringBuilder_insert_I(builder: JStringBuilder, offset: number, value: number | bigint) { return this.inserted(builder, offset, String(value)); }
  StringBuilder_insert_D(builder: JStringBuilder, offset: number, value: number) { return this.inserted(builder, offset, javaDoubleToString(value)); }
  StringBuilder_insert_Z(builder: JStringBuilder, offset: number, value: boolean) { return this.inserted(builder, offset, String(value)); }
  StringBuilder_toString(builder: JStringBuilder) { return S(builder.value); }
  StringBuilder_length(builder: JStringBuilder) { return builder.value.length; }
  private builderIndex(builder: JStringBuilder, index: number) {
    if (index < 0 || index >= builder.value.length) {
      throw exception("StringIndexOutOfBoundsException", `index ${index},length ${builder.value.length}`);
    }
  }
  StringBuilder_charAt(builder: JStringBuilder, index: number) { this.builderIndex(builder, index); return builder.value.charCodeAt(index); }
  StringBuilder_isEmpty(builder: JStringBuilder) { return builder.value.length === 0; }
  StringBuilder_setCharAt(builder: JStringBuilder, index: number, value: number) {
    this.builderIndex(builder, index);
    builder.value = builder.value.slice(0, index) + String.fromCharCode(value) + builder.value.slice(index + 1);
  }
  StringBuilder_reverse(builder: JStringBuilder) { builder.value = [...builder.value].reverse().join(""); return builder; }
  StringBuilder_deleteCharAt(builder: JStringBuilder, index: number) {
    this.builderIndex(builder, index);
    builder.value = builder.value.slice(0, index) + builder.value.slice(index + 1);
    return builder;
  }
  StringBuilder_delete(builder: JStringBuilder, start: number, end: number) {
    const length = builder.value.length;
    if (end > length) end = length;
    if (start < 0 || start > end) throw exception("StringIndexOutOfBoundsException", `start ${start}, end ${end}, length ${length}`);
    builder.value = builder.value.slice(0, start) + builder.value.slice(end);
    return builder;
  }
  StringBuilder_replace(builder: JStringBuilder, start: number, end: number, replacement: JString) {
    const length = builder.value.length;
    if (start < 0 || start > length || start > end) throw exception("StringIndexOutOfBoundsException", `start ${start}, end ${end}, length ${length}`);
    if (end > length) end = length;
    builder.value = builder.value.slice(0, start) + text(this.nn(replacement)) + builder.value.slice(end);
    builder.grow();
    return builder;
  }
  StringBuilder_indexOf_String(builder: JStringBuilder, target: JString) { return builder.value.indexOf(text(this.nn(target))); }
  StringBuilder_indexOf_StringI(builder: JStringBuilder, target: JString, from: number) { return builder.value.indexOf(text(this.nn(target)), Math.max(0, from)); }
  StringBuilder_lastIndexOf(builder: JStringBuilder, target: JString) { return builder.value.lastIndexOf(text(this.nn(target))); }
  StringBuilder_substring_I(builder: JStringBuilder, start: number) { return this.StringBuilder_substring_II(builder, start, builder.value.length); }
  StringBuilder_substring_II(builder: JStringBuilder, start: number, end: number) {
    const length = builder.value.length;
    if (start < 0 || start > end || end > length) throw exception("StringIndexOutOfBoundsException", `start ${start}, end ${end}, length ${length}`);
    return S(builder.value.slice(start, end));
  }
  StringBuilder_setLength(builder: JStringBuilder, length: number) {
    if (length < 0) throw exception("StringIndexOutOfBoundsException", `String index out of range: ${length}`);
    builder.value = length <= builder.value.length ? builder.value.slice(0, length) : builder.value.padEnd(length, "\u0000");
    builder.grow();
  }
  StringBuilder_capacity(builder: JStringBuilder) { return builder.capacity; }
  StringBuilder_compareTo(builder: JStringBuilder, other: JStringBuilder) { return compareStrings(builder.value, this.nn(other).value); }

  // ---- Number and the boxes ----
  Number_intValue(box: any) { return box instanceof JLong ? Number(BigInt.asIntN(32, box.v)) : box instanceof JDouble || box instanceof JFloat ? this.d2i(box.v) : box.v; }
  Number_longValue(box: any) { return box instanceof JLong ? box.v : box instanceof JDouble || box instanceof JFloat ? this.d2l(box.v) : BigInt(box.v); }
  Number_doubleValue(box: any) { return box instanceof JLong ? Number(box.v) : box.v; }
  Number_floatValue(box: any) { return Math.fround(this.Number_doubleValue(box)); }

  Integer_parseInt_String(value: JString) { return Number(parseInteger(value, 10, INT_MIN, INT_MAX)); }
  Integer_parseInt_StringI(value: JString, radix: number) { return Number(parseInteger(value, radix, INT_MIN, INT_MAX)); }
  Integer_valueOf_I(value: number) { return this.bI(value); }
  Integer_valueOf_String(value: JString) { return this.bI(this.Integer_parseInt_String(value)); }
  Integer_toString_I(value: number) { return S(String(value)); }
  Integer_toString_II(value: number, radix: number) { return S(value.toString(radix < 2 || radix > 36 ? 10 : radix)); }
  Integer_toBinaryString(value: number) { return S((value >>> 0).toString(2)); }
  Integer_toHexString(value: number) { return S((value >>> 0).toString(16)); }
  Integer_toOctalString(value: number) { return S((value >>> 0).toString(8)); }
  Integer_compare(first: number, second: number) { return first < second ? -1 : first === second ? 0 : 1; }
  Integer_max(first: number, second: number) { return Math.max(first, second); }
  Integer_min(first: number, second: number) { return Math.min(first, second); }
  Integer_sum(first: number, second: number) { return (first + second) | 0; }
  Integer_signum(value: number) { return value > 0 ? 1 : value < 0 ? -1 : 0; }
  Integer_bitCount(value: number) { let count = 0; for (let bits = value >>> 0; bits; bits >>>= 1) count += bits & 1; return count; }
  Integer_reverse(value: number) { let result = 0; for (let bit = 0; bit < 32; bit++) { result = (result << 1) | ((value >>> bit) & 1); } return result | 0; }
  Integer_intValue(box: JInteger) { return box.v; }
  Integer_longValue(box: JInteger) { return BigInt(box.v); }
  Integer_doubleValue(box: JInteger) { return box.v; }
  Integer_floatValue(box: JInteger) { return Math.fround(box.v); }
  Integer_compareTo(box: JInteger, other: JInteger) { return this.Integer_compare(box.v, this.ub(other)); }
  Integer_equals(box: JInteger, other: any) { return box.equals(other); }
  Integer_hashCode(box: JInteger) { return box.v; }

  Long_parseLong(value: JString) { return parseInteger(value, 10, LONG_MIN, LONG_MAX); }
  Long_valueOf_J(value: bigint) { return this.bJ(value); }
  Long_valueOf_String(value: JString) { return this.bJ(this.Long_parseLong(value)); }
  Long_toString_J(value: bigint) { return S(String(value)); }
  Long_compare(first: bigint, second: bigint) { return first < second ? -1 : first === second ? 0 : 1; }
  Long_max(first: bigint, second: bigint) { return first > second ? first : second; }
  Long_min(first: bigint, second: bigint) { return first < second ? first : second; }
  Long_sum(first: bigint, second: bigint) { return BigInt.asIntN(64, first + second); }
  Long_toBinaryString(value: bigint) { return S(BigInt.asUintN(64, value).toString(2)); }
  Long_toHexString(value: bigint) { return S(BigInt.asUintN(64, value).toString(16)); }
  Long_intValue(box: JLong) { return Number(BigInt.asIntN(32, box.v)); }
  Long_longValue(box: JLong) { return box.v; }
  Long_doubleValue(box: JLong) { return Number(box.v); }
  Long_floatValue(box: JLong) { return Math.fround(Number(box.v)); }
  Long_compareTo(box: JLong, other: JLong) { return this.Long_compare(box.v, this.ub(other)); }
  Long_equals(box: JLong, other: any) { return box.equals(other); }
  Long_hashCode(box: JLong) { return box.hashCode(); }

  Double_parseDouble(value: JString) { return parseDoubleText(value); }
  Double_valueOf_D(value: number) { return this.bD(value); }
  Double_valueOf_String(value: JString) { return this.bD(parseDoubleText(value)); }
  Double_toString_D(value: number) { return S(javaDoubleToString(value)); }
  Double_compare(first: number, second: number) { return compareDoubles(first, second); }
  Double_isNaN_D(value: number) { return Number.isNaN(value); }
  Double_isInfinite_D(value: number) { return value === Infinity || value === -Infinity; }
  Double_isFinite(value: number) { return Number.isFinite(value); }
  Double_max(first: number, second: number) { return Math.max(first, second); }
  Double_min(first: number, second: number) { return Math.min(first, second); }
  Double_sum(first: number, second: number) { return first + second; }
  Double_isNaN_(box: JDouble) { return Number.isNaN(box.v); }
  Double_isInfinite_(box: JDouble) { return this.Double_isInfinite_D(box.v); }
  Double_intValue(box: JDouble) { return this.d2i(box.v); }
  Double_longValue(box: JDouble) { return this.d2l(box.v); }
  Double_doubleValue(box: JDouble) { return box.v; }
  Double_floatValue(box: JDouble) { return Math.fround(box.v); }
  Double_compareTo(box: JDouble, other: JDouble) { return compareDoubles(box.v, this.ub(other)); }
  Double_equals(box: JDouble, other: any) { return box.equals(other); }
  Double_hashCode(box: JDouble) { return box.hashCode(); }

  Float_parseFloat(value: JString) { return Math.fround(parseDoubleText(value)); }
  Float_valueOf_F(value: number) { return this.bF(value); }
  Float_toString_F(value: number) { return S(javaFloatToString(value)); }
  Float_compare(first: number, second: number) { return compareDoubles(first, second); }
  Float_intValue(box: JFloat) { return this.d2i(box.v); }
  Float_longValue(box: JFloat) { return this.d2l(box.v); }
  Float_doubleValue(box: JFloat) { return box.v; }
  Float_floatValue(box: JFloat) { return box.v; }
  Float_compareTo(box: JFloat, other: JFloat) { return compareDoubles(box.v, this.ub(other)); }
  Float_equals(box: JFloat, other: any) { return box.equals(other); }

  private parseSmall(value: JString, minimum: number, maximum: number): number {
    const parsed = Number(parseInteger(value, 10, INT_MIN, INT_MAX));
    if (parsed < minimum || parsed > maximum) {
      throw exception("NumberFormatException", `Value out of range. Value:"${text(value)}" Radix:10`);
    }
    return parsed;
  }
  Short_parseShort(value: JString) { return this.parseSmall(value, -32768, 32767); }
  Short_valueOf_S(value: number) { return this.bS(value); }
  Short_intValue(box: JShort) { return box.v; }
  Short_longValue(box: JShort) { return BigInt(box.v); }
  Short_doubleValue(box: JShort) { return box.v; }
  Short_floatValue(box: JShort) { return box.v; }
  Short_shortValue(box: JShort) { return box.v; }
  Short_compareTo(box: JShort, other: JShort) { return box.v - this.ub(other); }
  Short_equals(box: JShort, other: any) { return box.equals(other); }
  Byte_parseByte(value: JString) { return this.parseSmall(value, -128, 127); }
  Byte_valueOf_B(value: number) { return this.bB(value); }
  Byte_intValue(box: JByte) { return box.v; }
  Byte_longValue(box: JByte) { return BigInt(box.v); }
  Byte_doubleValue(box: JByte) { return box.v; }
  Byte_floatValue(box: JByte) { return box.v; }
  Byte_byteValue(box: JByte) { return box.v; }
  Byte_compareTo(box: JByte, other: JByte) { return box.v - this.ub(other); }
  Byte_equals(box: JByte, other: any) { return box.equals(other); }

  Boolean_parseBoolean(value: JString | null) { return value !== null && text(value).toLowerCase() === "true"; }
  Boolean_valueOf_Z(value: boolean) { return this.bZ(value); }
  Boolean_valueOf_String(value: JString | null) { return this.bZ(this.Boolean_parseBoolean(value)); }
  Boolean_toString_Z(value: boolean) { return value ? "true" : "false"; }
  Boolean_compare(first: boolean, second: boolean) { return first === second ? 0 : first ? 1 : -1; }
  Boolean_logicalAnd(first: boolean, second: boolean) { return first && second; }
  Boolean_logicalOr(first: boolean, second: boolean) { return first || second; }
  Boolean_logicalXor(first: boolean, second: boolean) { return first !== second; }
  Boolean_booleanValue(box: JBoolean) { return box.v; }
  Boolean_compareTo(box: JBoolean, other: JBoolean) { return this.Boolean_compare(box.v, this.ub(other)); }
  Boolean_equals(box: JBoolean, other: any) { return box.equals(other); }
  Boolean_hashCode(box: JBoolean) { return box.hashCode(); }

  // ---- Character ----
  private charTest(pattern: RegExp, code: number) { return pattern.test(String.fromCharCode(code)); }
  Character_isLetter(code: number) { return this.charTest(/\p{L}/u, code); }
  Character_isDigit(code: number) { return this.charTest(/\p{Nd}/u, code); }
  Character_isLetterOrDigit(code: number) { return this.charTest(/[\p{L}\p{Nd}]/u, code); }
  Character_isAlphabetic(code: number) { return /\p{Alphabetic}/u.test(String.fromCodePoint(code)); }
  Character_isUpperCase(code: number) { return this.charTest(/\p{Uppercase}/u, code); }
  Character_isLowerCase(code: number) { return this.charTest(/\p{Lowercase}/u, code); }
  Character_isWhitespace(code: number) { return JAVA_WHITESPACE(code); }
  Character_isSpaceChar(code: number) { return this.charTest(/[\p{Zs}\p{Zl}\p{Zp}]/u, code); }
  Character_toUpperCase(code: number) {
    const upper = String.fromCharCode(code).toUpperCase();
    return upper.length === 1 ? upper.charCodeAt(0) : code;
  }
  Character_toLowerCase(code: number) {
    const lower = String.fromCharCode(code).toLowerCase();
    return lower.length === 1 ? lower.charCodeAt(0) : code;
  }
  Character_getNumericValue(code: number) {
    if (this.Character_isDigit(code)) return Number(String.fromCharCode(code).normalize("NFKD")) || digitValue(code, 10);
    const letter = digitValue(code, 36);
    return letter >= 10 ? letter : -1;
  }
  Character_digit(code: number, radix: number) { return radix < 2 || radix > 36 ? -1 : digitValue(code, radix); }
  Character_forDigit(digit: number, radix: number) {
    if (radix < 2 || radix > 36 || digit < 0 || digit >= radix) return 0;
    return digit < 10 ? 48 + digit : 87 + digit;
  }
  Character_toString_C(code: number) { return S(String.fromCharCode(code)); }
  Character_valueOf_C(code: number) { return this.bC(code); }
  Character_compare(first: number, second: number) { return first - second; }
  Character_reverseBytes(code: number) { return ((code & 0xff) << 8) | ((code >> 8) & 0xff); }
  Character_charValue(box: JCharacter) { return box.v; }
  Character_compareTo(box: JCharacter, other: JCharacter) { return box.v - this.ub(other); }
  Character_equals(box: JCharacter, other: any) { return box.equals(other); }
  Character_hashCode(box: JCharacter) { return box.v; }

  // ---- Math ----
  Math_abs_I(value: number) { return Math.abs(value) | 0; }
  Math_abs_J(value: bigint) { return value < 0n ? BigInt.asIntN(64, -value) : value; }
  Math_abs_D(value: number) { return Math.abs(value); }
  Math_max_D(first: number, second: number) { return Math.max(first, second); }
  Math_max_J(first: bigint, second: bigint) { return first > second ? first : second; }
  Math_min_D(first: number, second: number) { return Math.min(first, second); }
  Math_min_J(first: bigint, second: bigint) { return first < second ? first : second; }
  Math_pow(base: number, exponent: number) { return Math.pow(base, exponent); }
  Math_sqrt(value: number) { return Math.sqrt(value); }
  Math_cbrt(value: number) { return Math.cbrt(value); }
  Math_random() { return this.randomSource().nextDouble(); }
  Math_round_D(value: number) { return Number.isNaN(value) ? 0n : this.d2l(Math.floor(value + 0.5) === Math.round(value) ? Math.round(value) : Math.floor(value)); }
  Math_round_F(value: number) { return Number.isNaN(value) ? 0 : this.d2i(Math.round(value)); }
  Math_floor(value: number) { return Math.floor(value); }
  Math_ceil(value: number) { return Math.ceil(value); }
  Math_rint(value: number) {
    if (!Number.isFinite(value)) return value;
    const floor = Math.floor(value), difference = value - floor;
    if (difference < 0.5) return floor === 0 && value < 0 ? -0 : floor;
    if (difference > 0.5) return floor + 1 === 0 && value < 0 ? -0 : floor + 1;
    return floor % 2 === 0 ? floor : floor + 1;
  }
  Math_floorDiv_I(first: number, second: number) {
    const quotient = this.idiv(first, second);
    return (first % second !== 0 && (first ^ second) < 0) ? (quotient - 1) | 0 : quotient;
  }
  Math_floorDiv_J(first: bigint, second: bigint) {
    const quotient = this.ldiv(first, second);
    return (first % second !== 0n && (first < 0n) !== (second < 0n)) ? quotient - 1n : quotient;
  }
  Math_floorMod_I(first: number, second: number) {
    const remainder = this.imod(first, second);
    return remainder !== 0 && (remainder ^ second) < 0 ? remainder + second : remainder;
  }
  Math_floorMod_J(first: bigint, second: bigint) {
    const remainder = this.lmod(first, second);
    return remainder !== 0n && (remainder < 0n) !== (second < 0n) ? remainder + second : remainder;
  }
  Math_hypot(first: number, second: number) { return Math.hypot(first, second); }
  Math_exp(value: number) { return Math.exp(value); }
  Math_log(value: number) { return Math.log(value); }
  Math_log10(value: number) { return Math.log10(value); }
  Math_sin(value: number) { return Math.sin(value); }
  Math_cos(value: number) { return Math.cos(value); }
  Math_tan(value: number) { return Math.tan(value); }
  Math_asin(value: number) { return Math.asin(value); }
  Math_acos(value: number) { return Math.acos(value); }
  Math_atan(value: number) { return Math.atan(value); }
  Math_atan2(first: number, second: number) { return Math.atan2(first, second); }
  Math_toRadians(degrees: number) { return degrees * 0.017453292519943295; }
  Math_toDegrees(radians: number) { return radians * 57.29577951308232; }
  Math_signum(value: number) { return value > 0 ? 1 : value < 0 ? -1 : value; }
  private exactInt(value: number) {
    if (value > 2147483647 || value < -2147483648) throw exception("ArithmeticException", "integer overflow");
    return value;
  }
  private exactLong(value: bigint) {
    if (value > LONG_MAX || value < LONG_MIN) throw exception("ArithmeticException", "long overflow");
    return value;
  }
  Math_addExact_I(first: number, second: number) { return this.exactInt(first + second); }
  Math_addExact_J(first: bigint, second: bigint) { return this.exactLong(first + second); }
  Math_subtractExact_I(first: number, second: number) { return this.exactInt(first - second); }
  Math_multiplyExact_I(first: number, second: number) { return this.exactInt(first * second); }
  Math_multiplyExact_J(first: bigint, second: bigint) { return this.exactLong(first * second); }
  Math_negateExact(value: number) { return this.exactInt(-value); }
  Math_toIntExact(value: bigint) {
    if (value > INT_MAX || value < INT_MIN) throw exception("ArithmeticException", "integer overflow");
    return Number(value);
  }
  Math_absExact(value: number) {
    if (value === -2147483648) throw exception("ArithmeticException", "Overflow to represent absolute value of Integer.MIN_VALUE");
    return Math.abs(value);
  }

  // ---- System ----
  System_currentTimeMillis() { return BigInt(Date.now()); }
  System_nanoTime() {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    return BigInt(Math.round((now - this.startTime) * 1e6)) + 1_000_000_000_000n;
  }
  System_exit(status: number): never {
    this.exiting = true;
    throw new ExitSignal(status);
  }
  System_lineSeparator() { return "\n"; }
  System_arraycopy(source: any[], sourcePosition: number, destination: any[], destinationPosition: number, length: number) {
    if (source === null || destination === null) throw exception("NullPointerException");
    if (!Array.isArray(source)) throw exception("ArrayStoreException", `arraycopy: source type ${className(source)} is not an array`);
    if (!Array.isArray(destination)) throw exception("ArrayStoreException", `arraycopy: destination type ${className(destination)} is not an array`);
    const sourceType: string = (source as any).$d, destinationType: string = (destination as any).$d;
    const primitiveArray = (descriptor: string) => descriptor.length === 2;
    if ((primitiveArray(sourceType) || primitiveArray(destinationType)) && sourceType !== destinationType) {
      throw exception("ArrayStoreException", `arraycopy: type mismatch: can not copy ${arrayTypeName(sourceType)} into ${arrayTypeName(destinationType)}`);
    }
    const describe = (array: any[]) => `${arrayTypeName((array as any).$d).replace(/\[\]$/, "")}[${array.length}]`;
    if (sourcePosition < 0) throw exception("ArrayIndexOutOfBoundsException", `arraycopy: source index ${sourcePosition} out of bounds for ${describe(source)}`);
    if (destinationPosition < 0) throw exception("ArrayIndexOutOfBoundsException", `arraycopy: destination index ${destinationPosition} out of bounds for ${describe(destination)}`);
    if (length < 0) throw exception("ArrayIndexOutOfBoundsException", `arraycopy: length ${length} is negative`);
    if (sourcePosition + length > source.length) {
      throw exception("ArrayIndexOutOfBoundsException", `arraycopy: last source index ${sourcePosition + length} out of bounds for ${describe(source)}`);
    }
    if (destinationPosition + length > destination.length) {
      throw exception("ArrayIndexOutOfBoundsException", `arraycopy: last destination index ${destinationPosition + length} out of bounds for ${describe(destination)}`);
    }
    const copied = source.slice(sourcePosition, sourcePosition + length);
    for (let index = 0; index < length; index++) destination[destinationPosition + index] = copied[index];
  }

  // ---- PrintStream ----
  PrintStream_print_Z(stream: JPrintStream, value: boolean) { this.writeText(stream.stream, String(value)); }
  PrintStream_print_C(stream: JPrintStream, value: number) { this.writeText(stream.stream, String.fromCharCode(value)); }
  PrintStream_print_I(stream: JPrintStream, value: number | bigint) { this.writeText(stream.stream, String(value)); }
  PrintStream_print_F(stream: JPrintStream, value: number) { this.writeText(stream.stream, javaFloatToString(value)); }
  PrintStream_print_D(stream: JPrintStream, value: number) { this.writeText(stream.stream, javaDoubleToString(value)); }
  PrintStream_print_AC(stream: JPrintStream, chars: number[]) { this.writeText(stream.stream, String.fromCharCode(...this.nn(chars))); }
  PrintStream_print_Object(stream: JPrintStream, value: any) { this.writeText(stream.stream, text(this.str(value))); }
  PrintStream_println_(stream: JPrintStream) { this.writeText(stream.stream, "\n"); }
  PrintStream_println_Z(stream: JPrintStream, value: boolean) { this.writeText(stream.stream, String(value) + "\n"); }
  PrintStream_println_C(stream: JPrintStream, value: number) { this.writeText(stream.stream, String.fromCharCode(value) + "\n"); }
  PrintStream_println_I(stream: JPrintStream, value: number | bigint) { this.writeText(stream.stream, String(value) + "\n"); }
  PrintStream_println_F(stream: JPrintStream, value: number) { this.writeText(stream.stream, javaFloatToString(value) + "\n"); }
  PrintStream_println_D(stream: JPrintStream, value: number) { this.writeText(stream.stream, javaDoubleToString(value) + "\n"); }
  PrintStream_println_AC(stream: JPrintStream, chars: number[]) { this.writeText(stream.stream, String.fromCharCode(...this.nn(chars)) + "\n"); }
  PrintStream_println_Object(stream: JPrintStream, value: any) { this.writeText(stream.stream, text(this.str(value)) + "\n"); }
  PrintStream_printf(stream: JPrintStream, format: JString, args: any[]) {
    this.writeText(stream.stream, this.format(text(this.nn(format)), args ?? [null]));
    return stream;
  }
  PrintStream_flush(_stream: JPrintStream) {}
  PrintStream_write(stream: JPrintStream, byte: number) { this.writeText(stream.stream, String.fromCharCode(byte & 0xff)); }

  // ---- Thread ----
  *Thread_sleep(milliseconds: bigint): Generator<WaitRequest, void, unknown> {
    if (milliseconds < 0n) throw exception("IllegalArgumentException", "timeout value is negative");
    yield { wait: "sleep", ms: Number(milliseconds) };
  }

  // ---- Scanner ----
  Scanner_new_InputStream(stream: JInputStream) {
    this.nn(stream);
    return new JScanner(this.stdin, true);
  }
  Scanner_new_String(source: JString) {
    return new JScanner({ buffer: text(this.nn(source)), position: 0, ended: true, interactive: false }, false);
  }
  private open(scanner: JScanner) {
    if (scanner.closed) throw exception("IllegalStateException", "Scanner closed");
  }
  private ended(source: InputSource) { return source.ended || !source.interactive; }
  /** The next token's bounds, once it is complete: followed by a delimiter, or the input has ended. */
  private findToken(source: InputSource): { start: number; end: number } | "more" | null {
    const buffer = source.buffer;
    let start = source.position;
    while (start < buffer.length && JAVA_WHITESPACE(buffer.charCodeAt(start))) start++;
    if (start >= buffer.length) return this.ended(source) ? null : "more";
    let end = start;
    while (end < buffer.length && !JAVA_WHITESPACE(buffer.charCodeAt(end))) end++;
    if (end >= buffer.length && !this.ended(source)) return "more";
    return { start, end };
  }
  private *token(scanner: JScanner): Generator<WaitRequest, { start: number; end: number } | null, unknown> {
    for (;;) {
      this.open(scanner);
      const found = this.findToken(scanner.source);
      if (found !== "more") return found;
      yield WAIT_FOR_INPUT;
    }
  }
  private compact(source: InputSource) {
    if (source.position > 4096) { source.buffer = source.buffer.slice(source.position); source.position = 0; }
  }
  /** Scanner.next(pattern): the leading delimiters are consumed even when the token does not match. */
  private *nextMatching(scanner: JScanner, pattern: RegExp | null): Generator<WaitRequest, string, unknown> {
    const found = yield* this.token(scanner);
    if (!found) throw exception("NoSuchElementException");
    const source = scanner.source;
    source.position = found.start;
    const token = source.buffer.slice(found.start, found.end);
    if (pattern && !pattern.test(token)) throw exception("InputMismatchException");
    source.position = found.end;
    this.compact(source);
    return token;
  }
  private *hasMatching(scanner: JScanner, pattern: RegExp | null): Generator<WaitRequest, boolean, unknown> {
    const found = yield* this.token(scanner);
    if (!found) return false;
    return !pattern || pattern.test(scanner.source.buffer.slice(found.start, found.end));
  }
  private *integerToken(scanner: JScanner, minimum: bigint, maximum: bigint): Generator<WaitRequest, bigint, unknown> {
    const source = scanner.source;
    const token = yield* this.nextMatching(scanner, INTEGER_TOKEN);
    const digits = token.replace(/,/g, "");
    const value = BigInt(digits);
    if (value < minimum || value > maximum) {
      source.position -= token.length;
      throw exception("InputMismatchException", `For input string: "${digits}"`);
    }
    return value;
  }
  *Scanner_nextLine(scanner: JScanner): Generator<WaitRequest, JString, unknown> {
    for (;;) {
      this.open(scanner);
      const source = scanner.source;
      LINE_SEPARATOR.lastIndex = source.position;
      const separator = LINE_SEPARATOR.exec(source.buffer);
      if (separator && !(separator[0] === "\r" && separator.index === source.buffer.length - 1 && !this.ended(source))) {
        const line = source.buffer.slice(source.position, separator.index);
        source.position = separator.index + separator[0].length;
        this.compact(source);
        return S(line);
      }
      if (this.ended(source)) {
        if (source.position >= source.buffer.length) throw exception("NoSuchElementException", "No line found");
        const line = source.buffer.slice(source.position);
        source.position = source.buffer.length;
        return S(line);
      }
      yield WAIT_FOR_INPUT;
    }
  }
  *Scanner_next(scanner: JScanner) { return S(yield* this.nextMatching(scanner, null)); }
  *Scanner_nextInt(scanner: JScanner) { return Number(yield* this.integerToken(scanner, INT_MIN, INT_MAX)); }
  *Scanner_nextLong(scanner: JScanner) { return yield* this.integerToken(scanner, LONG_MIN, LONG_MAX); }
  *Scanner_nextShort(scanner: JScanner) { return Number(yield* this.integerToken(scanner, -32768n, 32767n)); }
  *Scanner_nextByte(scanner: JScanner) { return Number(yield* this.integerToken(scanner, -128n, 127n)); }
  *Scanner_nextDouble(scanner: JScanner) {
    const token = yield* this.nextMatching(scanner, DECIMAL_TOKEN);
    return Number(token.replace(/,/g, "").replace(/^\+/, ""));
  }
  *Scanner_nextFloat(scanner: JScanner) { return Math.fround(yield* this.Scanner_nextDouble(scanner)); }
  *Scanner_nextBoolean(scanner: JScanner) { return (yield* this.nextMatching(scanner, BOOLEAN_TOKEN)).toLowerCase() === "true"; }
  *Scanner_hasNext(scanner: JScanner) { return yield* this.hasMatching(scanner, null); }
  *Scanner_hasNextInt(scanner: JScanner) {
    const found = yield* this.token(scanner);
    if (!found) return false;
    const token = scanner.source.buffer.slice(found.start, found.end);
    if (!INTEGER_TOKEN.test(token)) return false;
    const value = BigInt(token.replace(/,/g, ""));
    return value >= INT_MIN && value <= INT_MAX;
  }
  *Scanner_hasNextLong(scanner: JScanner) {
    const found = yield* this.token(scanner);
    if (!found) return false;
    const token = scanner.source.buffer.slice(found.start, found.end);
    if (!INTEGER_TOKEN.test(token)) return false;
    const value = BigInt(token.replace(/,/g, ""));
    return value >= LONG_MIN && value <= LONG_MAX;
  }
  *Scanner_hasNextDouble(scanner: JScanner) { return yield* this.hasMatching(scanner, DECIMAL_TOKEN); }
  *Scanner_hasNextBoolean(scanner: JScanner) { return yield* this.hasMatching(scanner, BOOLEAN_TOKEN); }
  *Scanner_hasNextLine(scanner: JScanner): Generator<WaitRequest, boolean, unknown> {
    for (;;) {
      this.open(scanner);
      const source = scanner.source;
      LINE_SEPARATOR.lastIndex = source.position;
      if (LINE_SEPARATOR.exec(source.buffer)) return true;
      if (this.ended(source)) return source.position < source.buffer.length;
      yield WAIT_FOR_INPUT;
    }
  }
  Scanner_close(scanner: JScanner) {
    scanner.closed = true;
    // Closing a Scanner on System.in closes System.in: no later Scanner can read the keyboard.
    if (scanner.ownsSystemIn) this.stdin.ended = true;
  }

  // ---- Random ----
  Random_new_() { return new JRandom(BigInt(Math.floor(Math.random() * 2 ** 48)) ^ this.System_nanoTime()); }
  Random_new_J(seed: bigint) { return new JRandom(seed); }
  Random_nextInt_(random: JRandom) { return random.nextInt(); }
  Random_nextInt_I(random: JRandom, bound: number) { return random.nextIntBounded(bound); }
  Random_nextInt_II(random: JRandom, origin: number, bound: number) {
    if (origin >= bound) throw exception("IllegalArgumentException", "bound must be greater than origin");
    let result = random.nextInt();
    const range = (bound - origin) | 0, mask = (range - 1) | 0;
    if ((range & mask) === 0) return ((result & mask) + origin) | 0;
    if (range > 0) {
      for (let candidate = result >>> 1; ((candidate + mask - (result = candidate % range)) | 0) < 0; candidate = random.nextInt() >>> 1);
      return (result + origin) | 0;
    }
    while (result < origin || result >= bound) result = random.nextInt();
    return result;
  }
  Random_nextLong(random: JRandom) { return BigInt.asIntN(64, (BigInt(random.next(32)) << 32n) + BigInt(random.next(32))); }
  Random_nextDouble(random: JRandom) { return random.nextDouble(); }
  Random_nextFloat(random: JRandom) { return random.next(24) / 16777216; }
  Random_nextBoolean(random: JRandom) { return random.next(1) !== 0; }
  Random_nextGaussian(random: JRandom) {
    if (random.haveNextNextGaussian) { random.haveNextNextGaussian = false; return random.nextNextGaussian; }
    let first: number, second: number, sum: number;
    do {
      first = 2 * random.nextDouble() - 1;
      second = 2 * random.nextDouble() - 1;
      sum = first * first + second * second;
    } while (sum >= 1 || sum === 0);
    const multiplier = Math.sqrt(-2 * Math.log(sum) / sum);
    random.nextNextGaussian = second * multiplier;
    random.haveNextNextGaussian = true;
    return first * multiplier;
  }
  Random_setSeed(random: JRandom, seed: bigint) { random.setSeed(seed); }
  private randomSource() {
    if (!this.sharedRandom) this.sharedRandom = this.Random_new_();
    return this.sharedRandom;
  }

  // ---- Collection, List, ArrayList ----
  Collection_size(list: JList) { return list.items.length; }
  Collection_isEmpty(list: JList) { return list.items.length === 0; }
  Collection_contains(list: JList, value: any) {
    if (value === null && list.kind === ListKind.Immutable) throw exception("NullPointerException");
    return list.items.some((item) => objectsEqual(value, item));
  }
  Collection_add(list: JList, value: any) {
    list.modifiable();
    list.items.push(value);
    list.modCount++;
    return true;
  }
  Collection_remove_Object(list: JList, value: any) {
    const index = list.items.findIndex((item) => objectsEqual(value, item));
    if (list.kind !== ListKind.Growable && (index >= 0 || list.kind !== ListKind.FixedSize)) list.modifiable();
    if (index < 0) return false;
    list.items.splice(index, 1);
    list.modCount++;
    return true;
  }
  Collection_clear(list: JList) {
    if (list.kind !== ListKind.Growable && (list.items.length || list.kind !== ListKind.FixedSize)) list.modifiable();
    list.items.length = 0;
    list.modCount++;
  }
  Collection_addAll(list: JList, other: JList) {
    const additions = this.nn(other).items.slice();
    list.modifiable();
    list.items.push(...additions);
    list.modCount++;
    return additions.length > 0;
  }
  Collection_removeAll(list: JList, other: JList) {
    this.nn(other);
    return this.removeWhere(list, (item) => other.items.some((candidate) => objectsEqual(candidate, item)));
  }
  Collection_retainAll(list: JList, other: JList) {
    this.nn(other);
    return this.removeWhere(list, (item) => !other.items.some((candidate) => objectsEqual(candidate, item)));
  }
  private removeWhere(list: JList, test: (item: any) => boolean) {
    const kept = list.items.filter((item) => !test(item));
    if (kept.length === list.items.length) return false;
    list.modifiable();
    list.items.length = 0;
    list.items.push(...kept);
    list.modCount++;
    return true;
  }
  Collection_containsAll(list: JList, other: JList) {
    return this.nn(other).items.every((candidate) => list.items.some((item) => objectsEqual(candidate, item)));
  }
  List_get(list: JList, index: number) { list.checkIndex(index); return list.items[index]; }
  List_set(list: JList, index: number, value: any) {
    list.settable();
    list.checkIndex(index);
    const previous = list.items[index];
    list.items[index] = value;
    return previous;
  }
  List_add_IE(list: JList, index: number, value: any) {
    list.modifiable();
    if (index < 0 || index > list.items.length) throw exception("IndexOutOfBoundsException", `Index: ${index}, Size: ${list.items.length}`);
    list.items.splice(index, 0, value);
    list.modCount++;
  }
  List_remove_I(list: JList, index: number) {
    list.modifiable();
    list.checkIndex(index);
    const [removed] = list.items.splice(index, 1);
    list.modCount++;
    return removed;
  }
  List_indexOf(list: JList, value: any) { return list.items.findIndex((item) => objectsEqual(value, item)); }
  List_lastIndexOf(list: JList, value: any) {
    for (let index = list.items.length - 1; index >= 0; index--) if (objectsEqual(value, list.items[index])) return index;
    return -1;
  }
  List_subList(list: JList, from: number, to: number) {
    if (from < 0) throw exception("IndexOutOfBoundsException", "fromIndex = " + from);
    if (to > list.items.length) throw exception("IndexOutOfBoundsException", "toIndex = " + to);
    if (from > to) throw exception("IllegalArgumentException", `fromIndex(${from}) > toIndex(${to})`);
    return new JList(list.items.slice(from, to), list.kind === ListKind.Growable ? ListKind.Growable : list.kind, "java.util.ArrayList$SubList");
  }
  List_of(elements: any[]) {
    if (elements.some((element) => element === null)) throw exception("NullPointerException");
    return new JList(elements.slice(), ListKind.Immutable, elements.length <= 2 ? "java.util.ImmutableCollections$List12" : "java.util.ImmutableCollections$ListN");
  }
  List_copyOf(collection: JList) {
    if (this.nn(collection).kind === ListKind.Immutable) return collection;
    return this.List_of(collection.items);
  }
  ArrayList_new_() { return new JList([]); }
  ArrayList_new_I(capacity: number) {
    if (capacity < 0) throw exception("IllegalArgumentException", "Illegal Capacity: " + capacity);
    return new JList([]);
  }
  ArrayList_new_Collection(collection: JList) { return new JList(this.nn(collection).items.slice()); }
  ArrayList_ensureCapacity(_list: JList, _capacity: number) {}
  ArrayList_trimToSize(list: JList) { list.modCount++; }

  // ---- Arrays ----
  private elementText(array: any[]): (value: any) => string {
    const descriptor: string = (array as any).$d ?? "[L";
    switch (descriptor[1]) {
      case "D": return (value) => javaDoubleToString(value);
      case "F": return (value) => javaFloatToString(value);
      case "C": return (value) => String.fromCharCode(value);
      case "I": case "J": case "S": case "B": case "Z": return (value) => String(value);
      default: return (value) => text(this.str(value));
    }
  }
  Arrays_toString(array: any[] | null) {
    if (array === null) return "null";
    const format = this.elementText(array);
    return S("[" + array.map(format).join(", ") + "]");
  }
  Arrays_deepToString(array: any[] | null) {
    if (array === null) return "null";
    const seen = new Set<any[]>();
    const render = (current: any[]): string => {
      seen.add(current);
      const format = this.elementText(current);
      const parts = current.map((element) => {
        if (Array.isArray(element)) return seen.has(element) ? "[...]" : render(element);
        return format(element);
      });
      seen.delete(current);
      return "[" + parts.join(", ") + "]";
    };
    return S(render(array));
  }
  private rangeCheck(length: number, from: number, to: number) {
    if (from > to) throw exception("IllegalArgumentException", `fromIndex(${from}) > toIndex(${to})`);
    if (from < 0) throw exception("ArrayIndexOutOfBoundsException", `Array index out of range: ${from}`);
    if (to > length) throw exception("ArrayIndexOutOfBoundsException", `Array index out of range: ${to}`);
  }
  private sortRange(array: any[], from: number, to: number, compare: (first: any, second: any) => number) {
    this.rangeCheck(array.length, from, to);
    const sorted = array.slice(from, to).sort(compare);
    for (let index = 0; index < sorted.length; index++) array[from + index] = sorted[index];
  }
  Arrays_sort_numbers(array: any[], from?: number, to?: number) {
    this.nn(array);
    const isLong = (array as any).$d === "[J";
    const compare = isLong
      ? (first: bigint, second: bigint) => (first < second ? -1 : first > second ? 1 : 0)
      : (array as any).$d === "[D" || (array as any).$d === "[F" ? compareDoubles : (first: number, second: number) => first - second;
    this.sortRange(array, from ?? 0, to ?? array.length, compare as any);
  }
  Arrays_sort_objects(array: any[], from?: number, to?: number) {
    this.nn(array);
    this.sortRange(array, from ?? 0, to ?? array.length, compareNatural);
  }
  Arrays_fill(array: any[], value: any) { this.nn(array).fill(value); }
  Arrays_fill_range(array: any[], from: number, to: number, value: any) {
    this.rangeCheck(this.nn(array).length, from, to);
    array.fill(value, from, to);
  }
  Arrays_copyOf(array: any[], length: number) {
    this.nn(array);
    if (length < 0) throw exception("NegativeArraySizeException", String(length));
    const descriptor: string = (array as any).$d;
    const copy = array.slice(0, length);
    while (copy.length < length) copy.push(defaultOf(descriptor.slice(1)));
    return this.arr(descriptor, copy);
  }
  Arrays_copyOfRange(array: any[], from: number, to: number) {
    this.nn(array);
    if (from > to) throw exception("IllegalArgumentException", `${from} > ${to}`);
    const descriptor: string = (array as any).$d;
    const copy = this.newArr(descriptor, [to - from]);
    this.System_arraycopy(array, from, copy, 0, Math.min(array.length - from, to - from));
    return copy;
  }
  Arrays_equals(first: any[] | null, second: any[] | null) {
    if (first === second) return true;
    if (first === null || second === null || first.length !== second.length) return false;
    const descriptor: string = (first as any).$d;
    if (descriptor === "[D" || descriptor === "[F") return first.every((value, index) => compareDoubles(value, second[index]) === 0);
    if (descriptor.length === 2) return first.every((value, index) => value === second[index]);
    return first.every((value, index) => objectsEqual(value, second[index]));
  }
  Arrays_deepEquals(first: any[] | null, second: any[] | null): boolean {
    if (first === second) return true;
    if (first === null || second === null || first.length !== second.length) return false;
    return first.every((value, index) => {
      const other = second[index];
      if (Array.isArray(value) && Array.isArray(other)) {
        return (value as any).$d.length === 2 ? this.Arrays_equals(value, other) : this.Arrays_deepEquals(value, other);
      }
      return objectsEqual(value, other);
    });
  }
  Arrays_binarySearch(array: any[], key: any) {
    this.nn(array);
    const descriptor: string = (array as any).$d;
    const compare = descriptor.length === 2
      ? (descriptor === "[D" || descriptor === "[F" ? compareDoubles : (first: any, second: any) => (first < second ? -1 : first > second ? 1 : 0))
      : compareNatural;
    let low = 0, high = array.length - 1;
    while (low <= high) {
      const middle = (low + high) >>> 1;
      const order = compare(array[middle], key);
      if (order < 0) low = middle + 1;
      else if (order > 0) high = middle - 1;
      else return middle;
    }
    return -(low + 1);
  }
  Arrays_asList(array: any[]) { return new JList(this.nn(array), ListKind.FixedSize, "java.util.Arrays$ArrayList"); }
  Arrays_hashCode(array: number[] | null) {
    if (array === null) return 0;
    let hash = 1;
    for (const value of array) hash = (Math.imul(31, hash) + value) | 0;
    return hash;
  }

  // ---- Collections ----
  Collections_sort(list: JList) {
    list.settable();
    const sorted = list.items.slice().sort(compareNatural);
    for (let index = 0; index < sorted.length; index++) list.items[index] = sorted[index];
    list.modCount++;
  }
  Collections_reverse(list: JList) {
    if (list.items.length > 1) list.settable();
    list.items.reverse();
  }
  Collections_shuffle_(list: JList) { this.Collections_shuffle_Random(list, this.randomSource()); }
  Collections_shuffle_Random(list: JList, random: JRandom) {
    this.nn(random);
    if (list.items.length > 1) list.settable();
    for (let index = list.items.length; index > 1; index--) {
      const other = random.nextIntBounded(index);
      const held = list.items[index - 1];
      list.items[index - 1] = list.items[other];
      list.items[other] = held;
    }
  }
  Collections_max(list: JList) {
    if (!this.nn(list).items.length) throw exception("NoSuchElementException");
    return list.items.reduce((best, item) => (compareNatural(item, best) > 0 ? item : best));
  }
  Collections_min(list: JList) {
    if (!this.nn(list).items.length) throw exception("NoSuchElementException");
    return list.items.reduce((best, item) => (compareNatural(item, best) < 0 ? item : best));
  }
  Collections_swap(list: JList, first: number, second: number) {
    const held = this.List_set(list, first, list.items[second] ?? (list.checkIndex(second), null));
    this.List_set(list, second, held);
  }
  Collections_frequency(list: JList, value: any) { return this.nn(list).items.filter((item) => objectsEqual(value, item)).length; }
  Collections_nCopies(count: number, value: any) {
    if (count < 0) throw exception("IllegalArgumentException", "List length = " + count);
    return new JList(new Array(count).fill(value), ListKind.Immutable, "java.util.Collections$CopiesList");
  }
  Collections_unmodifiableList(list: JList) {
    return new JList(this.nn(list).items, ListKind.UnmodifiableView, "java.util.Collections$UnmodifiableRandomAccessList");
  }
  Collections_emptyList() { return new JList([], ListKind.Immutable, "java.util.Collections$EmptyList"); }
  Collections_addAll(list: JList, elements: any[]) {
    let changed = false;
    for (const element of this.nn(elements)) changed = this.Collection_add(list, element) || changed;
    return changed;
  }
  Collections_fill(list: JList, value: any) {
    list.settable();
    list.items.fill(value);
  }
  Collections_binarySearch(list: JList, key: any) {
    const items = this.nn(list).items;
    let low = 0, high = items.length - 1;
    while (low <= high) {
      const middle = (low + high) >>> 1;
      const order = compareNatural(items[middle], key);
      if (order < 0) low = middle + 1;
      else if (order > 0) high = middle - 1;
      else return middle;
    }
    return -(low + 1);
  }

  // ---- Throwable ----
  Throwable_getMessage(throwable: JThrowable) { return throwable.m_getMessage(); }
  Throwable_getCause(throwable: JThrowable) { return throwable.m_getCause(); }
  Throwable_printStackTrace(throwable: JThrowable) { throwable.m_printStackTrace(); }

  // ---- arrays' clone() ----
  Array_clone(array: any[]) { return this.aclone(array); }

  // =========================================================================================
  // printf and String.format
  format(format: string, args: any[]): string {
    const out: string[] = [];
    let ordinary = 0;
    let previous: any = undefined;
    let hasPrevious = false;
    const specifier = /%(\d+\$)?([-#+ 0,(<]*)(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/y;
    let index = 0;
    while (index < format.length) {
      const percent = format.indexOf("%", index);
      if (percent < 0) { out.push(format.slice(index)); break; }
      out.push(format.slice(index, percent));
      specifier.lastIndex = percent;
      const match = specifier.exec(format);
      if (!match) {
        const next = format[percent + 1];
        throw exception("UnknownFormatConversionException", `Conversion = '${next === undefined ? "%" : next}'`);
      }
      index = specifier.lastIndex;
      const [whole, explicitIndex, flags, widthText, precisionText, dateTime, conversionLetter] = match;
      if (dateTime) throw exception("UnknownFormatConversionException", `Conversion = '${dateTime}${conversionLetter}'`);
      const width = widthText ? Number(widthText) : -1;
      const precision = precisionText ? Number(precisionText.slice(1)) : -1;
      for (const flag of new Set(flags)) {
        if (flags.split(flag).length > 2) throw exception("DuplicateFormatFlagsException", `Flags = '${flag}'`);
      }
      const leftAlign = flags.includes("-"), zeroPad = flags.includes("0");
      if ((leftAlign || zeroPad) && width < 0) throw exception("MissingFormatWidthException", whole.replace(/\.\d+/, ""));
      if (conversionLetter === "n") { out.push("\n"); continue; }
      if (conversionLetter === "%") {
        out.push(this.pad("%", width, leftAlign, false));
        continue;
      }
      const conversion = conversionLetter.toLowerCase();
      if (!"bhscdoxefga".includes(conversion)) throw exception("UnknownFormatConversionException", `Conversion = '${conversionLetter}'`);
      // Which argument this specifier formats.
      let argument: any;
      if (flags.includes("<")) {
        if (!hasPrevious) throw exception("MissingFormatArgumentException", `Format specifier '${whole}'`);
        argument = previous;
      } else {
        const position = explicitIndex ? Number(explicitIndex.slice(0, -1)) - 1 : ordinary++;
        if (position < 0 || position >= args.length) throw exception("MissingFormatArgumentException", `Format specifier '${whole}'`);
        argument = args[position];
      }
      previous = argument; hasPrevious = true;
      const upper = conversionLetter !== conversion;
      let result = this.formatOne(conversion, argument, flags, width, precision, whole);
      if (upper) result = result.toUpperCase();
      out.push(result);
    }
    return out.join("");
  }

  private pad(value: string, width: number, leftAlign: boolean, zeroPad: boolean, signLength = 0): string {
    if (width <= value.length) return value;
    if (leftAlign) return value.padEnd(width, " ");
    if (zeroPad) return value.slice(0, signLength) + value.slice(signLength).padStart(width - signLength, "0");
    return value.padStart(width, " ");
  }

  private formatOne(conversion: string, argument: any, flags: string, width: number, precision: number, whole: string): string {
    const leftAlign = flags.includes("-");
    const mismatch = (flag: string) => exception("FormatFlagsConversionMismatchException", `Conversion = ${conversion}, Flags = ${flag}`);
    const general = (value: string) => {
      for (const flag of "+ 0,(") if (flags.includes(flag)) throw mismatch(flag);
      if (flags.includes("#")) throw mismatch("#");
      const truncated = precision >= 0 ? value.slice(0, precision) : value;
      return this.pad(truncated, width, leftAlign, false);
    };
    switch (conversion) {
      case "b": return general(argument === null ? "false" : argument instanceof JBoolean ? String(argument.v) : "true");
      case "h": return general(argument === null ? "null" : (hashOf(argument) >>> 0).toString(16));
      case "s": return general(text(this.str(argument)));
      case "c": {
        if (precision >= 0) throw exception("IllegalFormatPrecisionException", String(precision));
        if (argument === null) return general("null");
        let code: number;
        if (argument instanceof JCharacter) code = argument.v;
        else if (argument instanceof JInteger || argument instanceof JShort || argument instanceof JByte) code = argument.v;
        else throw exception("IllegalFormatConversionException", `c != ${className(argument)}`);
        return general(String.fromCodePoint(code));
      }
      case "d": case "o": case "x": {
        if (precision >= 0) throw exception("IllegalFormatPrecisionException", String(precision));
        if (argument === null) return this.pad("null", width, leftAlign, false);
        const isIntegral = argument instanceof JInteger || argument instanceof JLong || argument instanceof JShort || argument instanceof JByte;
        if (!isIntegral) throw exception("IllegalFormatConversionException", `${conversion} != ${className(argument)}`);
        const value = BigInt(argument.v);
        if (conversion === "d") return this.decimalInteger(value, flags, width);
        for (const flag of "+ ,(") if (flags.includes(flag)) throw mismatch(flag);
        const bits = argument instanceof JLong ? 64 : argument instanceof JInteger ? 32 : argument instanceof JShort ? 16 : 8;
        const unsigned = BigInt.asUintN(bits, value);
        let digits = unsigned.toString(conversion === "o" ? 8 : 16);
        if (flags.includes("#")) digits = (conversion === "o" ? "0" : "0x") + digits;
        return this.pad(digits, width, leftAlign, flags.includes("0"), flags.includes("#") && conversion === "x" ? 2 : 0);
      }
      case "e": case "f": case "g": case "a": {
        if (argument === null) return this.pad("null", width, leftAlign, false);
        if (!(argument instanceof JDouble || argument instanceof JFloat)) {
          throw exception("IllegalFormatConversionException", `${conversion} != ${className(argument)}`);
        }
        return this.floating(conversion, argument.v, flags, width, precision);
      }
    }
    void whole;
    return "";
  }

  private signed(negative: boolean, magnitude: string, flags: string, width: number): string {
    let prefix = "", suffix = "";
    if (negative) { if (flags.includes("(")) { prefix = "("; suffix = ")"; } else prefix = "-"; }
    else if (flags.includes("+")) prefix = "+";
    else if (flags.includes(" ")) prefix = " ";
    const leftAlign = flags.includes("-");
    if (flags.includes("0") && width > 0) {
      const room = width - prefix.length - suffix.length;
      if (magnitude.length < room) magnitude = magnitude.padStart(room, "0");
    }
    return this.pad(prefix + magnitude + suffix, width, leftAlign, false);
  }

  private decimalInteger(value: bigint, flags: string, width: number): string {
    const negative = value < 0n;
    let magnitude = (negative ? -value : value).toString();
    if (flags.includes(",")) magnitude = groupThousands(magnitude);
    return this.signed(negative, magnitude, flags, width);
  }

  private floating(conversion: string, value: number, flags: string, width: number, precision: number): string {
    const negative = value < 0 || Object.is(value, -0);
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      const word = Number.isNaN(value) ? "NaN" : "Infinity";
      if (Number.isNaN(value)) return this.pad(word, width, flags.includes("-"), false);
      return this.signed(negative, word, flags.replace("0", ""), width);
    }
    const magnitude = Math.abs(value);
    let body: string;
    if (conversion === "f") {
      body = fixedDigits(magnitude, precision < 0 ? 6 : precision);
      if (flags.includes(",")) {
        const [whole, fraction] = body.split(".");
        body = groupThousands(whole) + (fraction !== undefined ? "." + fraction : "");
      }
    } else if (conversion === "e") {
      body = scientificDigits(magnitude, precision < 0 ? 6 : precision, false);
    } else if (conversion === "g") {
      const significant = precision < 0 ? 6 : precision === 0 ? 1 : precision;
      if (magnitude === 0) body = fixedDigits(0, significant - 1);
      else {
        const scientific = scientificDigits(magnitude, significant - 1, false);
        const exponent = Number(scientific.split("e")[1]);
        const rounded = Number(scientific);
        if (rounded >= 1e-4 && exponent < significant) {
          body = fixedDigits(magnitude, significant - 1 - exponent);
          if (flags.includes(",")) {
            const [whole, fraction] = body.split(".");
            body = groupThousands(whole) + (fraction !== undefined ? "." + fraction : "");
          }
        } else body = scientific;
      }
    } else {
      body = hexFloat(magnitude, precision);
    }
    return this.signed(negative, body, flags, width);
  }
}

function hexFloat(value: number, precision: number): string {
  if (value === 0) return "0x0.0p0";
  const bits = doubleBits(value);
  const exponentBits = Number((bits >> 52n) & 0x7ffn);
  let mantissa = (bits & ((1n << 52n) - 1n)).toString(16).padStart(13, "0");
  const subnormal = exponentBits === 0;
  if (precision >= 0 && precision < 13) mantissa = mantissa.slice(0, Math.max(precision, 1));
  else mantissa = mantissa.replace(/0+$/, "") || "0";
  return `0x${subnormal ? "0" : "1"}.${mantissa}p${subnormal ? -1022 : exponentBits - 1023}`;
}

function defaultOf(elementDescriptor: string): any {
  switch (elementDescriptor) {
    case "I": case "D": case "F": case "C": case "S": case "B": return 0;
    case "J": return 0n;
    case "Z": return false;
    default: return null;
  }
}

export function createRuntime(host: RuntimeHost): JavaRuntime {
  return new JavaRuntime(host);
}
