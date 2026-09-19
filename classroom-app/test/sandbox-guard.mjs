/* Guard the preview sandbox against losing allow-forms.

   The chat box in every AI101 project from week 4 on is a <form>, and the
   lesson runs entirely from its submit handler. A preview sandbox without
   allow-forms does not error - Chrome silently suppresses the submit event, so
   Send and Enter do nothing and there is no message to debug. It killed weeks
   4-15 and was only found on a real fleet PC, because jsdom does not enforce
   sandbox and no unit test could see it.

   This is a cheap source check so it cannot come back unnoticed. It also holds
   the two copies together: the React preview (PREVIEW_SANDBOX in preview.ts,
   used by every frame in src/) and the standalone shared-page renderer in
   404.html, which cannot import from the app.

       node test/sandbox-guard.mjs
*/
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const read = (p) => readFileSync(here + p, "utf8");
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

// 1. the shared constant carries both tokens, in the app
const preview = read("../src/lib/preview.ts");
const m = preview.match(/PREVIEW_SANDBOX\s*=\s*"([^"]*)"/);
check("preview.ts defines PREVIEW_SANDBOX", !!m, "constant not found");
if (m) {
  const tokens = m[1].split(/\s+/);
  check("PREVIEW_SANDBOX has allow-scripts", tokens.includes("allow-scripts"), m[1]);
  check("PREVIEW_SANDBOX has allow-forms (the week-4-to-15 blocker)", tokens.includes("allow-forms"), m[1]);
  check("PREVIEW_SANDBOX stays opaque (no allow-same-origin)", !tokens.includes("allow-same-origin"),
        "allow-same-origin would let one student read another's token");
}

/* 2. EVERY frame in the app uses the constant, not a hand-written string.
      Counting the frames in one file was the earlier version of this, and it
      went red for the wrong reason the day the run panel moved into its own
      module - a guard that fails when code moves teaches people to edit the
      guard. So walk the source and hold each <iframe> to the rule instead. */
const sources = [];
(function walk(dir) {
  for (const entry of readdirSync(here + dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walk(dir + entry.name + "/");
    else if (/\.tsx?$/.test(entry.name)) sources.push([dir + entry.name, read(dir + entry.name)]);
  }
})("../src/");

const frames = [];
for (const [path, text] of sources) {
  for (const tag of text.match(/<iframe\b[\s\S]*?\/>/g) || []) {
    // A frame showing a document the app built out of somebody's files.
    // The course viewer's frame is not one: it shows our own slides from
    // our own origin, and sandboxing those would break the deck.
    if (/srcDoc=/.test(tag)) frames.push([path, tag]);
  }
}
const wrong = frames.filter(([, tag]) => !/sandbox=\{PREVIEW_SANDBOX\}/.test(tag));
check("every srcDoc frame in src/ uses PREVIEW_SANDBOX",
      frames.length > 0 && wrong.length === 0,
      wrong.map(([path, tag]) => path + ": " + tag.replace(/\s+/g, " ").slice(0, 90)).join(" ; "));
// A frame that stopped existing is not a frame that is safe: the app runs a
// project in one and shows the last saved version in another, and losing one
// silently would leave this check passing over nothing. (Full screen is the
// same frame made bigger, deliberately - reloading it would restart the game.)
check("the app still has both of its preview frames", frames.length >= 2, frames.length + " found");

// 3. the standalone share renderer matches, since it cannot import the constant
const share = read("../../404.html");
const s = share.match(/setAttribute\("sandbox",\s*"([^"]*)"\)/);
check("404.html sets a sandbox", !!s, "not found");
if (s) {
  const tokens = s[1].split(/\s+/);
  check("404.html share frame has allow-forms too", tokens.includes("allow-forms"), s[1]);
  check("404.html share frame stays opaque", !tokens.includes("allow-same-origin"), s[1]);
  if (m) check("the two sandboxes agree", s[1] === m[1], `app="${m[1]}" vs 404="${s[1]}"`);
}

console.log(bad ? `\n${bad} problem(s)` : "\nthe preview sandbox is intact in every copy");
process.exit(bad ? 1 : 0);
