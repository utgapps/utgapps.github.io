/* Every CS701 week runs in the classroom console exactly as its checkpoint
   slide says it does. The slides' transcripts were written against the course's
   reference output; here the same Main.java, the same typing and the same
   Random seed have to reproduce them character for character, colours included
   (<<green>> and ((yellow)) are how a slide writes the two ANSI colours). */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadJava, runJava } from "./java-load.mjs";

const courseFolder = fileURLToPath(new URL("../../cs701/", import.meta.url));
const java = await loadJava();
const milestones = JSON.parse(readFileSync(courseFolder + "milestones.json", "utf8"));
const checkpoints = JSON.parse(execFileSync("python", ["-c", `
import json, sys
sys.path.insert(0, ".")
import course
found = []
for week in course.WEEKS:
    for slide in week["slides"]:
        if slide.get("checkpoint"):
            found.append({"week": slide.get("checkpoint_week", week["n"]), "title": slide["title"],
                          "seed": slide.get("seed"), "run": slide["run"].strip(chr(10))})
print(json.dumps(found))
`], { cwd: courseFolder, encoding: "utf8" }));

let failures = 0;
// Every week compiles, checkpoint or not: a student may press Run on any of them.
milestones.weeks.forEach((week, index) => {
  const compiled = java.compileJava([{ name: "Main.java", source: week.files["Main.java"] }]);
  if (compiled.ok) return;
  failures++;
  console.log(`  WRONG  week ${index + 1} does not compile\n${compiled.text}`);
});
for (const checkpoint of checkpoints) {
  let source = milestones.weeks[checkpoint.week - 1].files["Main.java"];
  if (checkpoint.seed != null) source = source.replace("new Random()", `new Random(${checkpoint.seed}L)`);
  const compiled = java.compileJava([{ name: "Main.java", source }]);
  if (!compiled.ok) continue;
  const typed = [...checkpoint.run.matchAll(/\[\[(.*?)\]\]/g)].map((match) => match[1]);
  const run = await runJava(java, compiled.code, typed);
  const shown = run.output
    .replace(/\x1b\[32m(.*?)\x1b\[0m/g, "<<$1>>")
    .replace(/\x1b\[33m(.*?)\x1b\[0m/g, "(($1))")
    .replace(/\n+$/, "");
  if (shown === checkpoint.run) { console.log(`  ok     week ${checkpoint.week}: ${checkpoint.title}`); continue; }
  failures++;
  console.log(`  WRONG  week ${checkpoint.week}: ${checkpoint.title} (exit ${run.status})`);
  const slideLines = checkpoint.run.split("\n"), consoleLines = shown.split("\n");
  for (let line = 0, shownCount = 0; line < Math.max(slideLines.length, consoleLines.length) && shownCount < 6; line++) {
    if (slideLines[line] === consoleLines[line]) continue;
    shownCount++;
    console.log(`         slide   ${JSON.stringify(slideLines[line])}\n         console ${JSON.stringify(consoleLines[line])}`);
  }
}
console.log(failures ? `${failures} problems` : `all ${milestones.weeks.length} weeks compile, all ${checkpoints.length} checkpoints match`);
process.exit(failures ? 1 : 0);
