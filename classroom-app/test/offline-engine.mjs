/* Guard the game preview against ever needing a network again.

   A game project used to boot from a CDN script. One blocked domain on a
   school network, or one bad afternoon at a third party, and every game in the
   room stops at once - during the lesson, with nothing the teacher can do. The
   engine now ships inside the bundle, and these checks are what keep it that
   way, because nothing about a preview frame LOOKS broken until a child presses
   Run.

   It also holds every generated file to its generator: the engine, the word
   list, the stylesheet, the glyphs and the two sound helpers are all cut out
   of vendor/game-editor-offline.html, and a hand-edit to any of them would be
   invisible - it would work, right up until the next regeneration silently
   threw it away. The stylesheet is the one that would hurt most quietly: the
   game editor is meant to BE the offline IDE, so a rule tuned by hand here
   makes the two drift apart one afternoon at a time.

       node test/offline-engine.mjs
*/
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { cutEngine, cutApi, cutIdeCss, cutIcons,
         OUT, API_OUT, CSS_OUT, ICONS_OUT } from "../tools/build-engine.mjs";

const here = fileURLToPath(new URL(".", import.meta.url));
const read = (p) => readFileSync(here + p, "utf8");
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

// 1. the committed engine is exactly what the generator produces
const cut = cutEngine();
const committed = read("../" + OUT);
check(OUT + " is what tools/build-engine.mjs produces",
      committed === cut.text,
      "re-run `node tools/build-engine.mjs`; if you meant to change the engine, " +
      "change vendor/game-editor-offline.html and regenerate");

// 1b. and so is the word list the editor suggests from
const api = cutApi();
check(API_OUT + " is what tools/build-engine.mjs produces",
      read("../" + API_OUT) === api.text,
      "re-run `node tools/build-engine.mjs`; the suggestions in the classroom " +
      "editor are the offline IDE's own list and are not maintained by hand");

// 1c. and so is the stylesheet the game editor wears
const css = cutIdeCss();
check(CSS_OUT + " is what tools/build-engine.mjs produces",
      read("../" + CSS_OUT) === css.text,
      "re-run `node tools/build-engine.mjs`; the game editor's look is the " +
      "offline IDE's own stylesheet and is not tuned by hand");

// 1d. and so are its glyphs
check(ICONS_OUT + " is what tools/build-engine.mjs produces",
      read("../" + ICONS_OUT) === cutIcons().text,
      "re-run `node tools/build-engine.mjs`");

/* 1f. The Sounds list is what the student uploaded and nothing else. The
       engine still makes a noise for a name it has never been given a file
       for, which is its own business - but nothing in the editor may offer a
       sound as if it were part of the project, the way two synthesised ones
       used to sit at the top of that list. */
check("the Sounds list offers nothing nobody put there",
      !read("../src/GameEditor.tsx").includes("BUILT_IN_SOUNDS"),
      "the editor lists sounds the engine makes up, which are not files and cannot be deleted");

// 1e. every rule in it stays inside the editor. Unscoped, one of these would
//     repaint the rest of the classroom - and only on the pages a game is on.
const loose = css.text.split("\n")
  .filter((line) => /^[.#a-zA-Z:*\\[]/.test(line) && !line.includes(".pge-ide"));
check("the IDE stylesheet touches nothing outside .pge-ide", loose.length === 0, loose[0]);

// 2. it reaches nothing outside the frame
check("the engine has no http(s) URL in it", !/https?:\/\//.test(committed),
      (committed.match(/https?:\/\/\S*/) || [])[0]);
check("the engine never fetches", !/\bfetch\s*\(|XMLHttpRequest|importScripts/.test(committed),
      (committed.match(/\bfetch\s*\(|XMLHttpRequest|importScripts/) || [])[0]);

// 3. neither does the page built around it
const lib = read("../src/lib/game-project.ts");
const body = lib.replace(/^\s*(\/\/.*|\*.*|\/\*.*)$/gm, "");   // comments may cite a url
check("buildGamePreview loads no script from anywhere", !/<script src=/.test(body),
      (body.match(/<script src=[^"]*"[^"]*"/) || [])[0]);
check("no CDN host survives in the source", !/cdn\.|jsdelivr|unpkg|cdnjs/.test(body),
      (body.match(/\S*(cdn\.|jsdelivr|unpkg|cdnjs)\S*/) || [])[0]);

// 4. the frame still provides every element the engine reaches for. A new
//    vendored build that wants a fourth one would otherwise show a blank canvas.
for (const id of cut.needs) {
  check('the preview page provides #' + id, lib.includes('id="' + id + '"'),
        "the engine calls getElementById('" + id + "') but the page has no such element");
}

// 4b. the frame is handed everything it needs rather than asking for it. A
//     sound has to be read as bytes, which the classroom server will not let a
//     frame with no origin do - so the page outside fetches it and inlines it,
//     and a preview that started fetching for itself would be silently broken
//     for every student while working perfectly on this machine.
const runner = lib.slice(lib.indexOf("function runner("), lib.indexOf("export function buildGamePreview"));
check("the preview frame never fetches", !/fetch\s*\(|XMLHttpRequest|importScripts/.test(runner),
      (runner.match(/fetch\s*\(|XMLHttpRequest|importScripts/) || [])[0]);
check("a game's sounds reach the engine", /SOUNDS\.set\(name/.test(runner) && /decodeAudioData/.test(runner),
      "the runner never hands the engine a sound, so play_sound() can only ever blip");

// 5. a game is more than its panels now: shared functions run before any
//    start() does, and the debug bar is wired inside the frame because every
//    switch on it is a field on the Engine running there.
check("shared .fn.py files reach the engine", /functions: CONFIG\.functions/.test(lib),
      "the runner hands the engine an empty functions list, so a Functions panel does nothing");
check("the debug bar is part of the stage", lib.includes('id="debugPanel"') && lib.includes('id="debugReadout"'),
      "the engine writes its readout into #debugPanel and #debugReadout");

console.log(bad ? `\n${bad} problem(s)` : "\nthe game preview runs with no network at all");
process.exit(bad ? 1 : 0);
