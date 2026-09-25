/* Every CS701 checkpoint runs in the classroom console exactly as its slide
   says it does. A week is several small programs, and the guide changes one
   more than once in a lesson, so each checkpoint runs ITS program as it stands
   at that slide - build.checkpoint_list() hands over the exact source. The
   same typing and the same Random seed have to reproduce the slide line for
   line, colours included: <<green>> and ((yellow)) are how a slide writes the
   two ANSI colours, and {{clear}} is where the program clears the screen.
   Trailing spaces are the one thing not compared - a loop that prints each
   letter and a space leaves one at the end of the line, invisible on a slide. */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadJava, runJava } from "./java-load.mjs";

const courseFolder = fileURLToPath(new URL("../../cs701/", import.meta.url));
const java = await loadJava();
const slideStates = JSON.parse(readFileSync(courseFolder + "slide-states.json", "utf8"));
const checkpoints = JSON.parse(execFileSync("python", ["-c", `
import json, sys
sys.path.insert(0, ".")
import build
print(json.dumps(build.checkpoint_list()))
`], { cwd: courseFolder, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));

const lines = (text) => text.split("\n").map((line) => line.trimEnd());
let failures = 0;

// Every program compiles at every slide, checkpoint or not: a student may
// press Run on any of them at any point in the lesson. One exception, on
// purpose: week 13 types the letter loop before answer is a field, and asks
// the class why it will not compile - the guide's own way into scope. It must
// fail with exactly that error, and nothing else may.
const DELIBERATE = [{ week: 13, file: "Wordle.java", error: "cannot find symbol", symbol: "variable answer" }];
const deliberateSeen = new Set();
const compiledSources = new Set();
for (const week of slideStates.weeks) {
  for (const state of week.states) {
    for (const [name, source] of Object.entries(state.files)) {
      if (compiledSources.has(name + "\n" + source)) continue;
      compiledSources.add(name + "\n" + source);
      const compiled = java.compileJava([{ name, source }]);
      if (compiled.ok) continue;
      const deliberate = DELIBERATE.find((expected) => expected.week === week.n && expected.file === name
        && compiled.text.includes(expected.error) && compiled.text.includes(expected.symbol)
        && compiled.text.includes("1 error"));
      if (deliberate) { deliberateSeen.add(deliberate); continue; }
      failures++;
      console.log(`  WRONG  week ${week.n} slide ${state.slide}: ${name} does not compile\n${compiled.text}`);
    }
  }
}

for (const expected of DELIBERATE) {
  if (deliberateSeen.has(expected)) continue;
  failures++;
  console.log(`  WRONG  week ${expected.week}: ${expected.file} was meant to fail once with ${expected.symbol} - it never does`);
}

for (const checkpoint of checkpoints) {
  let source = checkpoint.source;
  if (checkpoint.seed != null) source = source.replace("new Random()", `new Random(${checkpoint.seed}L)`);
  const label = `week ${checkpoint.week}: ${checkpoint.file} - ${checkpoint.title}`;
  const compiled = java.compileJava([{ name: checkpoint.file, source }]);
  if (!compiled.ok) {
    failures++;
    console.log(`  WRONG  ${label} does not compile\n${compiled.text}`);
    continue;
  }
  const typed = [...checkpoint.run.matchAll(/\[\[(.*?)\]\]/g)].map((match) => match[1]);
  const run = await runJava(java, compiled.code, typed);
  const shown = run.output
    .replace(/\x1b\[H\x1b\[2J/g, "{{clear}}\n")
    .replace(/\x1b\[32m(.*?)\x1b\[0m/g, "<<$1>>")
    .replace(/\x1b\[33m(.*?)\x1b\[0m/g, "(($1))")
    .replace(/\n+$/, "");
  const slideLines = lines(checkpoint.run), consoleLines = lines(shown);
  if (slideLines.join("\n") === consoleLines.join("\n")) { console.log(`  ok     ${label}`); continue; }
  failures++;
  console.log(`  WRONG  ${label} (exit ${run.status})`);
  for (let line = 0, shownCount = 0; line < Math.max(slideLines.length, consoleLines.length) && shownCount < 6; line++) {
    if (slideLines[line] === consoleLines[line]) continue;
    shownCount++;
    console.log(`         line ${line + 1}\n         slide   ${JSON.stringify(slideLines[line])}\n         console ${JSON.stringify(consoleLines[line])}`);
  }
}
console.log(failures ? `${failures} problems`
  : `${compiledSources.size - deliberateSeen.size} program versions compile and ${deliberateSeen.size} fails on purpose; `
    + `all ${checkpoints.length} checkpoints match`);
process.exit(failures ? 1 : 0);
