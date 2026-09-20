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

   Four more things come out of it, for the classroom's game editor, which is
   a copy of this IDE: the word lists section 6 suggests as you type, section
   1's glyphs, the IDE's stylesheet, and the two helpers section 7 uses to turn
   a synthesised sound into a file you can play. Copying any of them by hand
   would put a second version in the repo that nobody remembers to update.

       node tools/build-engine.mjs
*/
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
export const SOURCE = "vendor/pixelpad-offline.html";
export const OUT = "src/lib/pixelpad-engine.js";
export const API_OUT = "src/lib/pixelpad-api.ts";
export const CSS_OUT = "src/pixelpad-ide.css";
export const ICONS_OUT = "src/lib/pixelpad-icons.ts";
export const SYNTH_OUT = "src/lib/pixelpad-synth.ts";


/* Normalised to \n: the vendored file is CRLF on Windows, and every marker
   below is anchored to a line start. */
const source = () => readFileSync(here + "../" + SOURCE, "utf8").replace(/\r\n/g, "\n");
const fail = (why) => { console.error("build-engine: " + why); process.exit(1); };

/* The three lists the IDE's suggestion box is built from: what the engine can
   be asked to do, what a thing in the world has on it, and Python itself. */
export function cutApi() {
  const html = source();
  const names = ["API_NAMES", "ATTR_NAMES", "PY_KEYWORDS"];
  const decls = names.map((name) => {
    const found = [...html.matchAll(new RegExp("^const " + name + " = \\[[^\\]]*\\];$", "gm"))];
    if (found.length !== 1) fail(name + " appears " + found.length + " times in " + SOURCE + ", expected 1");
    return found[0][0];
  });
  /* Real JavaScript before it becomes TypeScript, so a half-copied list fails
     here rather than at the next `npm run check`. */
  try { new Function(decls.join("\n")); } catch (e) { fail("the word lists do not parse: " + e.message); }
  const text =
    "/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.\n" +
    " *\n" +
    " * The words " + SOURCE + " suggests while you type, so the\n" +
    " * classroom editor suggests exactly the same ones. A name added to the\n" +
    " * engine reaches both editors by regenerating this file, and neither by\n" +
    " * editing it.\n" +
    " */\n" +
    decls.map((decl) => "export " + decl.replace(" = [", ": string[] = [")).join("\n\n") + "\n";
  return { text, count: decls.length };
}

/* The IDE's own stylesheet. The classroom's game editor is meant to be the
   offline IDE to look at, and the only way to be sure of that is to use its
   stylesheet rather than a careful imitation of it.

   Two things have to change on the way through, both mechanical:

     - every selector is scoped under .pp3d-ide, because this CSS is loaded
       into an app that has a page around the editor. `body` and `:root` become
       that element: they are where the offline file keeps the IDE's font and
       its colour variables. The rules for `html` are dropped - the app owns
       the page.
     - rem becomes px. The offline file sets html{font-size:14px} and every rem
       in it counts on that; the classroom's root is 16px and changing it would
       resize the whole app.

   Anything else - a colour, a border, a width - comes through untouched, and
   the check below refuses a cut that quietly kept a rem or lost the scope. */
const CSS_ROOT = ".pp3d-ide";

function scopeSelector(list) {
  return list.split(",").map((one) => {
    const sel = one.trim();
    if (sel === ":root" || sel === "body" || sel === "#pp3d-ide") return CSS_ROOT;
    if (sel === "body.pp-dark") return CSS_ROOT + ".pp-dark";
    if (sel.startsWith("body.pp-dark ")) return CSS_ROOT + ".pp-dark " + sel.slice(13);
    if (sel.startsWith("#pp3d-ide")) return CSS_ROOT + sel.slice(9);
    return CSS_ROOT + " " + sel;
  }).join(",");
}

/* The page itself, which the app owns and this stylesheet must not touch. */
const DROPPED = ["html", "html,body"];

function scopeCss(css) {
  let out = "", at = 0;
  for (;;) {
    const open = css.indexOf("{", at);
    if (open < 0) { out += css.slice(at); break; }
    const close = css.indexOf("}", open);
    if (close < 0) { fail("unbalanced braces in the stylesheet"); break; }
    const head = css.slice(at, open);
    const body = css.slice(open + 1, close);
    /* A comment above a rule belongs to it, so it travels with it - and goes
       with it when the rule is dropped. */
    const ends = head.lastIndexOf("*/");
    const lead = ends >= 0 ? head.slice(0, ends + 2) : "";
    const tail = ends >= 0 ? head.slice(ends + 2) : head;
    const selector = tail.trim();
    if (DROPPED.includes(selector)) { at = close + 1; continue; }
    out += lead + tail.replace(selector, scopeSelector(selector)) + "{" + body + "}";
    at = close + 1;
  }
  return out;
}

export function cutIdeCss() {
  const html = source();
  const blocks = [...html.matchAll(/<style>\n([\s\S]*?)\n<\/style>/g)];
  if (blocks.length !== 1) fail("expected one <style> block in " + SOURCE + ", found " + blocks.length);
  const scoped = scopeCss(blocks[0][1])
    .replace(/(-?[\d.]+)rem/g, (whole, size) => String(Math.round(Number(size) * 14000) / 1000) + "px");

  if (/[^-\w]rem[^-\w]/.test(scoped)) fail("a rem survived the cut: " + (scoped.match(/[^;{]*rem[^;}]*/) || [])[0]);
  for (const selector of scoped.matchAll(/(^|\})([^{}@]+)\{/g)) {
    const sel = selector[2].replace(/\/\*[\s\S]*?\*\//g, "").trim();
    if (sel && !sel.split(",").every((one) => one.trim().startsWith(CSS_ROOT))) {
      fail("this selector escaped the scope: " + sel);
    }
  }
  /* The three columns the editor is made of. If the vendored file renames one,
     the markup in src/PixelPadIde.tsx is wrong too, and silently: it would
     render as an unstyled list of divs. */
  for (const id of ["#pp-block0", "#pp-block1", "#pp-block2", "#debugPanel", "#pp-console"]) {
    if (!scoped.includes(id)) fail("the stylesheet no longer styles " + id);
  }

  const text =
    "/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.\n" +
    " *\n" +
    " * The offline IDE's stylesheet, from " + SOURCE + ", scoped\n" +
    " * under .pp3d-ide and with its rem values resolved against the 14px root\n" +
    " * that file sets. Nothing else is changed, because the classroom's game\n" +
    " * editor is meant to BE that IDE rather than resemble it.\n" +
    " */\n" + scoped.trim() + "\n";
  return { text, bytes: Buffer.byteLength(text) };
}

/* The IDE's glyphs. Font Awesome by way of hand-drawn paths in the vendored
   file, so the classroom does not load a webfont either. */
export function cutIcons() {
  const html = source();
  const found = [...html.matchAll(/^const ICONS = \{[\s\S]*?^\};$/gm)];
  if (found.length !== 1) fail("ICONS appears " + found.length + " times in " + SOURCE + ", expected 1");
  const decl = found[0][0];
  let icons;
  try { icons = new Function(decl + " return ICONS;")(); }
  catch (e) { fail("the icon table does not parse: " + e.message); }
  for (const name of ["plus", "trash", "university", "cube", "image", "volume", "flag", "redo"]) {
    if (!icons[name]) fail("the icon table has lost " + name);
  }
  const text =
    "/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.\n" +
    " *\n" +
    " * The offline IDE's own glyphs, from " + SOURCE + ". Every one\n" +
    " * is a path inside a 0 0 16 16 box that inherits the current colour.\n" +
    " */\n" +
    "export const ICONS: Record<string, string> = " +
    JSON.stringify(icons, null, 2) + ";\n";
  return { text, count: Object.keys(icons).length };
}

/* The sound the engine makes out of nothing, as a file.

   The engine synthesises blip and crunch live, through WebAudio nodes, and
   never makes a file of either - so the Sounds pane cannot hand one to an
   <audio> element without the two helpers section 7 keeps for its exporter.
   The classroom's pane IS that pane, so it needs them too.

   The copy is verbatim, which is why this one artefact opts out of type
   checking: every complaint TypeScript has about it is a complaint about how
   the vendored file is written, and the only way to answer one would be to
   edit the copy. What the rest of the app sees is synthWav below, which is
   written here and typed. */
export function cutSynth() {
  const html = source();
  const parts = ["renderSynth", "wavDataUri"].map((name) => {
    const found = [...html.matchAll(new RegExp("^function " + name + "[(][\\s\\S]*?^[}]$", "gm"))];
    if (found.length !== 1) fail(name + " appears " + found.length + " times in " + SOURCE + ", expected 1");
    return found[0][0];
  });
  try { new Function(parts.join("\n")); } catch (e) { fail("the sound helpers do not parse: " + e.message); }
  if (!parts[1].includes("data:audio/wav;base64,")) fail("wavDataUri no longer returns a playable data URI");

  /* The names come from the engine's own table rather than from a list here,
     so a third synthesised sound appears in the classroom sidebar by being
     added to the vendored file. */
  const table = [...html.matchAll(/^const SYNTH = [{][\s\S]*?^[}];$/gm)];
  if (table.length !== 1) fail("SYNTH appears " + table.length + " times in " + SOURCE + ", expected 1");
  let names;
  try { names = new Function(table[0][0] + " return Object.keys(SYNTH);")(); }
  catch (e) { fail("the synthesised sound table does not parse: " + e.message); }
  if (!names.length) fail("the engine synthesises nothing at all now");
  /* Run them. A renderer that has quietly stopped being able to make one of
     these would otherwise reach the Sounds pane as a player with nothing in
     it, which is exactly the kind of thing nobody notices until a lesson. */
  const made = new Function(parts.join("\n") + "\nreturn { renderSynth, wavDataUri };")();
  for (const name of names) {
    const uri = made.wavDataUri(made.renderSynth(name));
    if (!uri.startsWith("data:audio/wav;base64,") || uri.length < 1000) {
      fail("the helpers make no playable file for " + name);
    }
  }

  const text =
    "// @ts-nocheck - see tools/build-engine.mjs. The two functions below are a\n" +
    "// verbatim copy; answering a type complaint about one would mean editing it.\n" +
    "/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.\n" +
    " *\n" +
    " * From " + SOURCE + ": a PCM WAV writer and the renderer that\n" +
    " * turns one of the engine's synthesised sounds into samples. The engine\n" +
    " * plays blip and crunch as WebAudio nodes and never makes a file of\n" +
    " * either, so this is what lets the Sounds pane play one.\n" +
    " */\n" +
    parts.join("\n") + "\n\n" +
    "/** The sounds the engine makes itself, in the order it declares them.\n" +
    " *  They need no file and cannot be deleted. */\n" +
    "export const BUILT_IN_SOUNDS: string[] = " + JSON.stringify(names) + ";\n\n" +
    "/** One of those as something an <audio> element can play, exactly as the\n" +
    " *  offline IDE's own soundPreviewSrc makes it. Empty for anything else. */\n" +
    "export function synthWav(name: string): string {\n" +
    "  return BUILT_IN_SOUNDS.includes(name) ? wavDataUri(renderSynth(name)) : \"\";\n" +
    "}\n";
  return { text, names };
}

export function cutEngine() {
const html = source();

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
  const api = cutApi();
  writeFileSync(here + "../" + API_OUT, api.text, "utf8");
  console.log("wrote " + API_OUT + "  " + api.count + " word lists");
  const css = cutIdeCss();
  writeFileSync(here + "../" + CSS_OUT, css.text, "utf8");
  console.log("wrote " + CSS_OUT + "  " + Math.round(css.bytes / 1024) + " KB of IDE styles");
  const icons = cutIcons();
  writeFileSync(here + "../" + ICONS_OUT, icons.text, "utf8");
  console.log("wrote " + ICONS_OUT + "  " + icons.count + " glyphs");
  const synth = cutSynth();
  writeFileSync(here + "../" + SYNTH_OUT, synth.text, "utf8");
  console.log("wrote " + SYNTH_OUT + "  plays " + synth.names.join(", "));
}
