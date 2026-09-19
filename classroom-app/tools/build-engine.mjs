/* Cut the runnable engine out of the offline PixelPAD IDE.

   vendor/pixelpad-offline.html is a single-file clone of pixelpad.io: its own
   Python tokenizer, parser and evaluator, its own canvas renderer, AND a whole
   IDE around them - sidebar, tabs, code editor, .pp2d import/export, browser
   storage. The classroom already has an editor, so it needs the first half and
   none of the second.

   The file is written in numbered sections, one or more per <script> block, and
   sections 2 to 5 are exactly the runnable half:

       1. ICONS     IDE toolbar glyphs                     dropped
       2. ASSETS    procedural sprites + sound synthesis   kept
       3. PYTHON    tokenizer + parser                     kept
       4. PYTHON    evaluator                              kept
       5. ENGINE    world, objects, rooms, renderer, API   kept
       6. EDITOR    the IDE's own code pane                dropped
       7. .pp2d     import / export                        dropped
       8. IDE       project model, sidebar, persistence    dropped

   The cut is checked, not trusted: every marker must be found exactly once, the
   result must not mention anything the IDE owns, and it must parse. If the
   vendored file is ever updated and its shape has moved, this fails loudly
   rather than emitting a half-engine that dies at the first student's Run.

       node tools/build-engine.mjs
*/
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
export const SOURCE = "vendor/pixelpad-offline.html";
export const OUT = "src/lib/pixelpad-engine.js";

export function cutEngine() {
/* Normalised to \n: the vendored file is CRLF on Windows, and every marker
   below is anchored to a line start. */
const html = readFileSync(here + "../" + SOURCE, "utf8").replace(/\r\n/g, "\n");

const fail = (why) => { console.error("build-engine: " + why); process.exit(1); };

/* Each <script> block, in document order. */
const blocks = [...html.matchAll(/<script>\n([\s\S]*?)\n<\/script>/g)].map((m) => m[1]);
if (blocks.length < 5) fail("expected at least five <script> blocks, found " + blocks.length);

/* A section header looks like:
       /* ====...
          2. ASSETS - ...
   so the start of a section is the comment opener on the line above its number. */
function sliceFrom(text, number) {
  const header = new RegExp("^ {3}" + number + "\. ", "m");
  const at = text.search(header);
  if (at < 0) return -1;
  const opener = text.lastIndexOf("/* =", at);
  return opener < 0 ? -1 : opener;
}

function sectionOnly(number) {
  const found = blocks.filter((b) => sliceFrom(b, number) >= 0);
  if (found.length !== 1) fail("section " + number + " appears in " + found.length + " script blocks, expected 1");
  return found[0];
}

/* Section 2 shares a block with section 1, so that block is cut at 2's header.
   Sections 3, 4 and 5 each have a block to themselves and are taken whole. */
const withAssets = sectionOnly(2);
const assets = withAssets.slice(sliceFrom(withAssets, 2));
if (/ICONS/.test(assets)) fail("the cut kept section 1 (ICONS) - the header shape has moved");

const parts = [assets];
for (const number of [3, 4, 5]) {
  const block = sectionOnly(number);
  if (sliceFrom(block, number) !== 0) fail("section " + number + " does not start its own <script> block");
  parts.push(block);
}

const engine = parts.join("\n\n");

/* Nothing the IDE owns may have come along. Each of these is defined only in
   sections 6 to 8, so a mention here means the cut caught too much. */
for (const name of ["logLine", "renderSidebar", "markDirty", "syncEditors", "currentTarget",
                    "saveProject", "Project.classes", "Editors.", "highlightPython", "STORE_KEY"]) {
  if (engine.includes(name)) fail("the cut mentions " + name + ", which belongs to the IDE");
}
for (const marker of ["6. EDITOR", "7. .pp2d", "8. IDE"]) {
  if (engine.includes(marker)) fail("the cut reaches into section " + marker);
}
/* It has to be real JavaScript. new Function compiles without running. */
try { new Function(engine); } catch (e) { fail("the cut does not parse: " + e.message); }

/* The three ids the engine expects the page around it to provide. Listed here
   so a change in the vendored file shows up as a diff in this line rather than
   as a blank canvas. */
const needs = ["canvasContainer", "debugPanel", "output"]
  .filter((id) => engine.includes("getElementById('" + id + "')"));

const header =
  "/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.\n" +
  " *\n" +
  " * Sections 2 to 5 of " + SOURCE + ": the procedural sprite and\n" +
  " * sound assets, the Python tokenizer, parser and evaluator, and the 2D\n" +
  " * engine - everything needed to RUN a game, and none of the IDE around it.\n" +
  " *\n" +
  " * This is loaded as text and inlined into the preview frame as a classic\n" +
  " * <script>, so its top-level `Engine`, `INTERP` and `ART` are visible to the\n" +
  " * runner script that follows it. It expects the page to provide: " + needs.join(", ") + ".\n" +
  " */\n";

return { text: header + engine + "\n", lines: engine.split("\n").length,
           bytes: Buffer.byteLength(engine), needs };
}

/* Only when run as a command, so test/offline-engine.mjs can import the cut and
   compare it with what is committed without rewriting anything. */
if (process.argv[1] && process.argv[1].endsWith("build-engine.mjs")) {
  const cut = cutEngine();
  writeFileSync(here + "../" + OUT, cut.text, "utf8");
  console.log("wrote " + OUT + "  " + cut.lines + " lines, " + Math.round(cut.bytes / 1024) + " KB");
  console.log("page must provide: " + cut.needs.join(", "));
}
