/* The classroom Java runner against a corpus of programs whose console output
   was checked line by line against the Java language rules: java-cases/<case>/
   holds the .java files, an optional input.txt (one typed line per line) and
   expected.txt, the whole console with typing echoed as [[line]].

     node test/java-conformance.mjs            check every case
     node test/java-conformance.mjs --update   rewrite expected.txt from the runner;
                                               read every changed line before committing it

   Deliberate differences from a real JDK, so nobody "fixes" them:
   - a helpful NullPointerException names the variable ("n"), as an IDE build
     does; plain javac without -g says "<local4>".
   - an uncaught exception's trace lists only the student's frames, never the
     JDK's own (java.base/java.util.Scanner.throwFor and the like). */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadJava, runJava } from "./java-load.mjs";

const casesFolder = fileURLToPath(new URL("./java-cases/", import.meta.url));
const update = process.argv.includes("--update");
const java = await loadJava();

export async function consoleFor(caseFolder) {
  const files = readdirSync(caseFolder).filter((name) => name.endsWith(".java")).sort()
    .map((name) => ({ name, source: readFileSync(join(caseFolder, name), "utf8") }));
  const inputFile = join(caseFolder, "input.txt");
  const typed = existsSync(inputFile) ? readFileSync(inputFile, "utf8").replace(/\r\n/g, "\n").replace(/\n$/, "").split("\n") : [];
  const compiled = java.compileJava(files);
  if (!compiled.ok) return compiled.text.replace(/\n*$/, "\n") + "[did not compile]\n";
  const run = await runJava(java, compiled.code, typed, { maxSteps: 1000 });
  return run.output + (run.output.endsWith("\n") || !run.output ? "" : "\n") + `[exit ${run.status}]\n`;
}

let failures = 0;
const cases = readdirSync(casesFolder, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
for (const name of cases) {
  const folder = join(casesFolder, name);
  const actual = await consoleFor(folder);
  const expectedFile = join(folder, "expected.txt");
  if (update) {
    writeFileSync(expectedFile, actual);
    console.log(`  wrote  ${name}`);
    continue;
  }
  const expected = existsSync(expectedFile) ? readFileSync(expectedFile, "utf8").replace(/\r\n/g, "\n") : null;
  if (expected === actual) { console.log(`  ok     ${name}`); continue; }
  failures++;
  console.log(`  WRONG  ${name}`);
  const expectedLines = (expected ?? "").split("\n"), actualLines = actual.split("\n");
  for (let line = 0, shown = 0; line < Math.max(expectedLines.length, actualLines.length) && shown < 6; line++) {
    if (expectedLines[line] === actualLines[line]) continue;
    shown++;
    console.log(`         line ${line + 1}\n           expected ${JSON.stringify(expectedLines[line])}\n           actual   ${JSON.stringify(actualLines[line])}`);
  }
}
if (!update) console.log(failures ? `${failures} of ${cases.length} cases differ` : `all ${cases.length} cases match`);
process.exit(failures ? 1 : 0);
