/* Guard the game preview against ever needing a network again.

   A PixelPad project used to boot from a CDN script. One blocked domain on a
   school network, or one bad afternoon at a third party, and every game in the
   room stops at once - during the lesson, with nothing the teacher can do. The
   engine now ships inside the bundle, and these checks are what keep it that
   way, because nothing about a preview frame LOOKS broken until a child presses
   Run.

   It also holds the generated file to its generator: src/lib/pixelpad-engine.js
   is cut out of vendor/pixelpad-offline.html, and a hand-edit there would be
   invisible - it would work, right up until the next regeneration silently
   threw it away.

       node test/offline-engine.mjs
*/
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { cutEngine, OUT } from "../tools/build-engine.mjs";

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
      "change vendor/pixelpad-offline.html and regenerate");

// 2. it reaches nothing outside the frame
check("the engine has no http(s) URL in it", !/https?:\/\//.test(committed),
      (committed.match(/https?:\/\/\S*/) || [])[0]);
check("the engine never fetches", !/\bfetch\s*\(|XMLHttpRequest|importScripts/.test(committed),
      (committed.match(/\bfetch\s*\(|XMLHttpRequest|importScripts/) || [])[0]);

// 3. neither does the page built around it
const lib = read("../src/lib/pixelpad.ts");
const body = lib.replace(/^\s*(\/\/.*|\*.*|\/\*.*)$/gm, "");   // comments may cite pixelpad.io
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

console.log(bad ? `\n${bad} problem(s)` : "\nthe game preview runs with no network at all");
process.exit(bad ? 1 : 0);
