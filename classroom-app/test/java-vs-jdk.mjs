/* The classroom Java runner against a REAL JDK, case by case.

   java-conformance.mjs proves the runner still prints what expected.txt says;
   this proves expected.txt says what Java says. Every case in java-cases/ is
   compiled with javac and run with java, and the two consoles are compared
   after removing only the differences we chose (see java-conformance.mjs):

     - the "  → ..." hint lines under a compile error
     - typed input echoed as [[line]] (a pipe does not echo what was typed)
     - stack frames inside the JDK itself (java.base/...), which the classroom
       never shows
     - "Separately, ... can't run it yet" notes: javac must instead accept that code

   Needs a JDK, so it is not part of the everyday suite:

     node test/java-vs-jdk.mjs <jdk folder>     or set JAVA_HOME
     node test/java-vs-jdk.mjs <jdk folder> <folder of cases to try>

   The target is JDK 25, the IDE the class uses: its compile and runtime
   messages are the ones the classroom prints. Run it against 17 and 21 too:
   students are told "Java 17 or newer", and a message that differs between
   JDKs is reported as such rather than as a mistake. One difference is
   chosen: once code falls outside a class, the classroom keeps the 17/21
   "class, interface, enum, or record expected" and stops there, where 25
   reads the stray code as the start of an implicit class. */
import { readdirSync, readFileSync, existsSync, mkdtempSync, cpSync, rmSync, openSync, closeSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { consoleFor } from "./java-conformance.mjs";

const jdkFolder = process.argv[2] ?? process.env.JAVA_HOME;
if (!jdkFolder || !existsSync(join(jdkFolder, "bin"))) {
  console.error("usage: node test/java-vs-jdk.mjs <jdk folder> [cases folder]   (or set JAVA_HOME)");
  process.exit(2);
}
const tool = (name) => join(jdkFolder, "bin", process.platform === "win32" ? `${name}.exe` : name);
const version = spawnSync(tool("java"), ["-version"], { encoding: "utf8" }).stderr.split("\n")[0];
console.log(`against ${version}`);

/** Cases the classroom answers differently on purpose. */
const DELIBERATE = {
  "no-main": "the classroom explains the missing main; java prints its launcher error",
};

// A second argument points at another folder of cases, for trying out new ones.
const casesFolder = process.argv[3] ?? fileURLToPath(new URL("./java-cases/", import.meta.url));
const cases = readdirSync(casesFolder, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

function realJava(caseFolder) {
  const work = mkdtempSync(join(tmpdir(), "java-vs-jdk-"));
  try {
    cpSync(caseFolder, work, { recursive: true });
    const sources = readdirSync(work).filter((name) => name.endsWith(".java")).sort();
    // -g keeps local variable names, so a helpful NullPointerException names them as an IDE build does.
    const compiled = spawnSync(tool("javac"), ["-g", "-encoding", "UTF-8", "-d", "classes", ...sources], { cwd: work, encoding: "utf8" });
    if (compiled.status !== 0) return { compiled: false, text: compiled.stderr.replace(/\r\n/g, "\n") };
    const entry = sources[0].replace(/\.java$/, "");
    const inputFile = join(work, "input.txt");
    // One file for both streams keeps System.out and System.err in the order they were written.
    const consolePath = join(work, "console.txt");
    const console = openSync(consolePath, "w");
    const input = existsSync(inputFile) ? readFileSync(inputFile, "utf8").replace(/\r\n/g, "\n") : "";
    const ran = spawnSync(tool("java"), ["-cp", "classes", entry], { cwd: work, input, stdio: ["pipe", console, console], timeout: 20000 });
    closeSync(console);
    return { compiled: true, text: readFileSync(consolePath, "utf8").replace(/\r\n/g, "\n"), status: ran.status };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

/** The classroom's console with the chosen differences taken out. */
function classroomComparable(text, typed) {
  const compiled = !text.endsWith("[did not compile]\n");
  let body = text.replace(/\[did not compile\]\n$/, "");
  const status = compiled ? Number(/\[exit (\d+)\]\n$/.exec(body)?.[1]) : null;
  body = body.replace(/\[exit \d+\]\n$/, "");
  // Each typed line was echoed once, in order; only those are taken out.
  let from = 0;
  for (const line of typed) {
    const echo = `[[${line}]]\n`, at = body.indexOf(echo, from);
    if (at === -1) break;
    body = body.slice(0, at) + body.slice(at + echo.length);
    from = at;
  }
  body = body.split("\n").filter((line) => !line.startsWith("  → ")).join("\n");
  const unsupported = /(^|\n)(Separately, this part of your Java is fine|Your Java is fine – the classroom runner)/.exec(body);
  if (unsupported) body = body.slice(0, unsupported.index).replace(/\n+$/, "\n").replace(/^\n$/, "");
  return { compiled, status, text: body, unsupported: !!unsupported };
}

function jdkComparable(text) {
  // A JDK frame: java.base/java.util.Scanner.throwFor(Scanner.java:939) and the like.
  return text.split("\n").filter((line) => !/^\tat [\w.]+\/|^\tat (java|jdk|sun)\./.test(line)).join("\n");
}

/** The separate errors in javac's output, without the count and notes at the end. */
function errorsIn(text) {
  const errors = [];
  for (const line of text.split("\n")) {
    if (/^\S+\.java:\d+: error: /.test(line)) errors.push(line);
    else if (errors.length && !/^\d+ errors?$|^Note: /.test(line)) errors[errors.length - 1] += "\n" + line;
  }
  return errors.map((error) => error.replace(/\n+$/, ""));
}

let differences = 0, partial = 0, chosen = 0;
for (const name of cases) {
  const folder = join(casesFolder, name);
  const inputFile = join(folder, "input.txt");
  const typed = existsSync(inputFile) ? readFileSync(inputFile, "utf8").replace(/\r\n/g, "\n").replace(/\n$/, "").split("\n") : [];
  const classroom = classroomComparable(await consoleFor(folder), typed);
  const jdk = realJava(folder);
  if (DELIBERATE[name]) {
    const agrees = !classroom.compiled && jdk.compiled && jdk.status !== 0;
    console.log(`  ${agrees ? "chosen" : "WRONG "} ${name}: ${DELIBERATE[name]}`);
    if (!agrees) differences++;
    continue;
  }
  if (classroom.unsupported && !classroom.text) {
    if (jdk.compiled) { console.log(`  ok     ${name} (javac accepts what the classroom cannot run yet)`); continue; }
    differences++;
    console.log(`  WRONG  ${name}: the classroom calls this correct Java, but javac says\n${jdk.text.replace(/^/gm, "           ")}`);
    continue;
  }
  const expected = jdkComparable(jdk.text);
  const sameOutcome = classroom.compiled === jdk.compiled && (!jdk.compiled || classroom.status === jdk.status);
  if (sameOutcome && expected === classroom.text) { console.log(`  ok     ${name}`); continue; }
  // Stopping early is allowed: the classroom may print only the start of javac's list.
  let which = "";
  if (!classroom.compiled && !jdk.compiled) {
    const shown = errorsIn(classroom.text), all = errorsIn(expected);
    if (shown.length < all.length && shown.every((error, at) => error === all[at])) {
      partial++;
      console.log(`  first  ${name} (${shown.length} of javac's ${all.length} errors)`);
      continue;
    }
    const first = shown.findIndex((error, at) => error !== all[at]);
    // After a stray closing brace the classroom says what Java 17 and 21 say, and stops.
    if (first !== -1 && / error: class, interface, enum, or record expected\n/.test(shown[first] + "\n") && first === shown.length - 1) {
      chosen++;
      console.log(`  chosen ${name} (error ${first + 1}: the Java 17 and 21 message for code outside a class)`);
      continue;
    }
    which =` (error ${(first === -1 ? shown.length : first) + 1} differs; javac ${all.length}, classroom ${shown.length})`;
  }
  differences++;
  console.log(`  DIFF   ${name}${which}`);
  if (!sameOutcome) {
    console.log(`           java: ${jdk.compiled ? `ran, exit ${jdk.status}` : "did not compile"}   classroom: ${classroom.compiled ? `ran, exit ${classroom.status}` : "did not compile"}`);
  }
  const javaLines = expected.split("\n"), classroomLines = classroom.text.split("\n");
  for (let line = 0, shown = 0; line < Math.max(javaLines.length, classroomLines.length) && shown < 12; line++) {
    if (javaLines[line] === classroomLines[line]) continue;
    shown++;
    console.log(`         line ${line + 1}\n           java      ${JSON.stringify(javaLines[line])}\n           classroom ${JSON.stringify(classroomLines[line])}`);
  }
}
if (partial) console.log(`${partial} of ${cases.length} cases show only the first of javac's errors`);
if (chosen) console.log(`${chosen} of ${cases.length} cases stop at code outside a class, as chosen`);
console.log(differences ? `${differences} of ${cases.length} cases differ from ${version}` : `all ${cases.length - partial - chosen} other cases match ${version}`);
process.exit(differences ? 1 : 0);
