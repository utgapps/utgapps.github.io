/* Break one thing at a time and confirm the right check notices.
   If a mutation passes, that check is decorative. */
import { execFileSync } from "node:child_process";

const MUTATIONS = [
  ["storing the AI's own reply", 7, "script.js",
   "history.push({ role: 'assistant', content: reply });", "// removed"],
  ["asking for a stream", 10, "script.js",
   "stream: true,", ""],
  ["calling trimHistory before sending", 8, "script.js",
   "trimHistory();", "// removed"],
  ["checking res.ok", 5, "script.js",
   "if (!res.ok) {", "if (false) {"],
  ["removing the empty bubble on failure", 11, "script.js",
   "bubble.remove();", "// removed"],
  ["converting the slider to a number", 9, "script.js",
   "Number(tempBox.value)", "tempBox.value"],
  ["clearing the input box", 2, "script.js",
   "promptBox.value = '';", "// removed"],
  ["the long-message guard", 14, "script.js",
   "if (text.length > 500) {", "if (false) {"],
  ["sending the persona as a system message", 6, "script.js",
   "{ role: 'system', content: personaBox.value },", ""],
  ["linking the stylesheet", 1, "index.html",
   '<link rel="stylesheet" href="style.css">', ""],
];

let missed = 0;
for (const [label, week, file, find, repl] of MUTATIONS) {
  let output = "", code = 0;
  try {
    output = execFileSync(process.execPath, ["run.mjs"], {
      encoding: "utf8",
      env: { ...process.env, MUTATE: [week, file, find, repl].join("|||") },
    });
  } catch (e) {
    output = (e.stdout || "") + (e.stderr || "");
    code = e.status;
  }
  if (code === 2) { console.log(`  ??  ${label} - mutation did not apply`); missed++; continue; }
  const failed = [...output.matchAll(/^  FAIL  (.+)$/gm)].map((m) => m[1]);
  // A non-zero exit is NOT proof on its own - a harness that crashed also exits
  // non-zero, and would otherwise be reported as ten successful catches.
  if (failed.length === 0) {
    console.log(`  MISSED  breaking ${label} (week ${week}) - ` +
                (code === 0 ? "every check still passed" : `the harness crashed (exit ${code}) instead of reporting a failure`));
    missed++;
  } else {
    console.log(`  caught  breaking ${label} (week ${week})`);
    console.log(`          -> ${failed.length} check(s) went red: ${failed.slice(0, 3).join("; ")}`);
  }
}
console.log(`\n${MUTATIONS.length} deliberate breakages, ${missed} slipped through unnoticed`);
process.exit(missed ? 1 : 0);
