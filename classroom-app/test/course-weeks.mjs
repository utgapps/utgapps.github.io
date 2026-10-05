/* Every course week a teacher can hand out opens as a working project.

   The course panel's "Give them week N" and "Copy to my projects" turn a
   course's milestones.json into a project. For a long time PXP101's weeks
   could not be handed out at all: their PixelPad panel names have a space in
   them, which the API refuses, and the kind was guessed from the file endings,
   so a game would have opened in the web editor anyway. Nobody saw it, because
   nothing ever tried.

   So this tries, for every week of every course: the files are names the
   worker accepts, the kind is the course's own, and every PXP101 week boots
   in the real engine - the cut the preview frame runs - and plays for two
   seconds without an error.

       node test/course-weeks.mjs
*/
import { build } from "esbuild";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

/* The classroom's own conversion, bundled the way java-load.mjs bundles the
   compiler: its imports name no extension, which node alone will not follow. */
async function loadCourseWeeks() {
  const result = await build({
    entryPoints: [join(here, "../src/lib/courseWeeks.ts")],
    bundle: true, format: "esm", platform: "neutral", write: false, logLevel: "silent",
  });
  const folder = mkdtempSync(join(tmpdir(), "course-weeks-"));
  const file = join(folder, "course-weeks.mjs");
  writeFileSync(file, result.outputFiles[0].text);
  try {
    return await import(pathToFileURL(file).href);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
}
const { weeksFromMilestones } = await loadCourseWeeks();
const site = here + "../../";
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail !== undefined ? "\n        -> " + JSON.stringify(detail) : "")); }
};

/* The worker's own rule for a file name, read out of its source so the two
   can never disagree. */
const worker = readFileSync(site + "classroom-worker/src/index.js", "utf8");
const pathRule = new RegExp(/const PATH_OK = \/(.+)\/;/.exec(worker)[1]);

/* The smallest browser the engine will run in; see documented-api.mjs. */
function stubBrowser() {
  const context = () => new Proxy({}, {
    get(target, key) {
      if (key === "canvas") return { width: 1280, height: 720 };
      if (key === "measureText") return (text) => ({ width: String(text).length * 8, fontBoundingBoxAscent: 10, fontBoundingBoxDescent: 3 });
      if (key in target) return target[key];
      return () => {};
    },
    set(target, key, value) { target[key] = value; return true; },
  });
  const element = () => ({
    width: 1280, height: 720, style: {}, textContent: "", className: "",
    getContext: context, appendChild() {}, removeChild() {}, addEventListener() {},
    removeEventListener() {}, setAttribute() {}, focus() {},
    clientWidth: 1280, clientHeight: 720,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
  });
  const store = new Map();
  return {
    document: { createElement: element, getElementById: element, querySelector: element, addEventListener() {}, body: element() },
    window: { devicePixelRatio: 1, addEventListener() {}, removeEventListener() {} },
    localStorage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null), setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key), get length() { return store.size; }, key: (index) => [...store.keys()][index],
    },
  };
}

const source = readFileSync(here + "../src/lib/game-engine.js", "utf8");
const stub = stubBrowser();
const { Engine } = new Function(
  "document", "window", "localStorage", "performance", "requestAnimationFrame", "cancelAnimationFrame",
  source + "\n;return { Engine: Engine };")(stub.document, stub.window, stub.localStorage, { now: () => Date.now() }, () => 0, () => {});
const stage = stub.document.createElement("canvas");
Engine.canvas = stage;
Engine.ctx = stage.getContext("2d");

/* game.txt and the panel files -> what the engine starts, as the preview's
   runner does it. Pictures are blocks of the size game.txt gives them. */
function manifestOf(files) {
  const rooms = [], sprites = [];
  for (const line of (files["game.txt"] || "").split("\n")) {
    const [word, name, , width, height] = line.trim().split(/\s+/);
    if (word === "room") rooms.push(name);
    if (word === "sprite") sprites.push({ name, width: Number(width), height: Number(height) });
  }
  return { rooms, sprites };
}
function load(files) {
  const { rooms, sprites } = manifestOf(files);
  for (const { name, width, height } of sprites) {
    Engine.loadSprite(name, { width, height, naturalWidth: width, naturalHeight: height, complete: true });
  }
  const panels = new Map();
  for (const [path, code] of Object.entries(files)) {
    const match = path.match(/^([A-Za-z][A-Za-z0-9_]*)\.(start|loop)\.py$/);
    if (!match) continue;
    const entry = panels.get(match[1]) || { start: "", loop: "" };
    entry[match[2]] = code;
    panels.set(match[1], entry);
  }
  const project = { classes: [], rooms: [], functions: [], sprites: [], sounds: [] };
  for (const [name, code] of panels) {
    if (name === "Game") project.classes.push({ name, isGame: true, ...code });
    else if (rooms.includes(name)) project.rooms.push({ name, ...code });
    else project.classes.push({ name, ...code });
  }
  if (!panels.has("Game")) project.classes.push({ name: "Game", isGame: true, start: "", loop: "" });
  return project;
}

let errors = [];
let clock = 0;
Engine.onError = (where, error) => errors.push(where + ": " + error.message);

const expectedKind = { ai101: "web", cs701: "java", pxp101: "pixelpad", py101: "pixelpad", py102: "pixelpad" };
for (const course of Object.keys(expectedKind)) {
  console.log("\n" + course);
  const weeks = weeksFromMilestones(JSON.parse(readFileSync(site + course + "/milestones.json", "utf8")));
  check("all fifteen weeks are there", weeks.length === 15, weeks.length);
  check("every week is a " + expectedKind[course] + " project",
        weeks.every((week) => week.kind === expectedKind[course]), weeks.map((week) => week.kind));
  const refused = weeks.flatMap((week) => Object.keys(week.files).filter((name) => !pathRule.test(name)).map((name) => `week ${week.n}: ${name}`));
  check("every file name is one the worker accepts", refused.length === 0, refused.slice(0, 5));
  if (expectedKind[course] !== "pixelpad") continue;

  for (const week of weeks) {
    const { rooms, sprites } = manifestOf(week.files);
    const code = Object.entries(week.files).filter(([path]) => path.endsWith(".py")).map(([, text]) => text).join("\n");
    const pictures = [...code.matchAll(/sprite\('([^']+)'\)/g)].map((match) => match[1]);
    const roomsAsked = [...code.matchAll(/set_room\('([^']+)'\)/g)].map((match) => match[1]);
    const problems = [
      ...rooms.filter((room) => !(`${room}.start.py` in week.files)).map((room) => `room ${room} has no start panel`),
      ...roomsAsked.filter((room) => !rooms.includes(room)).map((room) => `set_room('${room}') is not a room`),
      ...pictures.filter((picture) => !sprites.some((sprite) => sprite.name === picture)).map((picture) => `${picture} is not a sprite`),
    ];
    errors = [];
    try {
      Engine.start(load(week.files), () => {});
      for (let frame = 0; frame < 120; frame++) { clock += 16.7; Engine.tick(clock); }
    } catch (error) { errors.push("threw: " + error.message); }
    check(`week ${String(week.n).padStart(2)} boots and plays with every room and picture it uses`,
          problems.length === 0 && errors.length === 0, [...problems, ...errors].slice(0, 3));
  }
}

console.log(bad ? `\n${bad} failed` : "\nall passed");
process.exit(bad ? 1 : 0);
