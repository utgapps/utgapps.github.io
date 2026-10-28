/* Every Python game the site ships has its pictures and plays.

   course-weeks.mjs boots each week and leaves it alone. This one goes further,
   for every week of every game course, every challenge and the new-game
   starter: each picture the code names is in game.txt (a name built as
   tag + 'Splash.png' must match at least one), each picture gets a texture,
   and the game plays for 30 seconds with random keys and clicks. Any error,
   or any picture asked for that is not there, fails the game.

   Run: node test/all-games.mjs */
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
const site = here + "../../";

// A canvas that remembers its size, for solidPng and the stage.
const canvasEl = () => ({
  width: 1280, height: 720, style: {}, getContext: () => new Proxy({}, { get: (t, k) => k in t ? t[k] : k === "measureText" ? (s) => ({ width: String(s).length * 8, fontBoundingBoxAscent: 10, fontBoundingBoxDescent: 3 }) : () => {}, set: (t, k, v) => { t[k] = v; return true; } }),
  toDataURL: () => "data:image/png;base64,AAAA", appendChild() {}, removeChild() {}, addEventListener() {}, removeEventListener() {},
  setAttribute() {}, focus() {}, clientWidth: 1280, clientHeight: 720,
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
  classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
});
const store = new Map();
globalThis.document = { createElement: canvasEl, getElementById: canvasEl, querySelector: canvasEl, addEventListener() {}, body: canvasEl() };
const win = { devicePixelRatio: 1, addEventListener() {}, removeEventListener() {} };
const ls = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k), get length() { return store.size; }, key: (i) => [...store.keys()][i] };

const entry = `export { weeksFromMilestones } from "./src/lib/courseWeeks";
export { CHALLENGES } from "./src/lib/challenges";
export { assembleGame, parseManifest } from "./src/lib/game-project";
export { starterFiles, GAME_KIND } from "./src/lib/types";`;
const out = await build({ stdin: { contents: entry, resolveDir: here + "..", loader: "ts" }, bundle: true, format: "esm", platform: "neutral", write: false, logLevel: "silent",
  plugins: [{ name: "raw", setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (a) => ({ path: join(a.resolveDir, a.path.replace(/\?raw$/, "")), namespace: "raw" }));
    b.onLoad({ filter: /.*/, namespace: "raw" }, (a) => ({ contents: readFileSync(a.path, "utf8"), loader: "text" }));
  } }] });
const dir = mkdtempSync(join(tmpdir(), "all-games-"));
writeFileSync(join(dir, "b.mjs"), out.outputFiles[0].text);
const lib = await import(pathToFileURL(join(dir, "b.mjs")).href);
rmSync(dir, { recursive: true, force: true });

const source = readFileSync(here + "../src/lib/game-engine.js", "utf8");
const { Engine } = new Function("document", "window", "localStorage", "performance", "requestAnimationFrame", "cancelAnimationFrame",
  source + "\n;return { Engine };")(globalThis.document, win, ls, { now: () => Date.now() }, () => 0, () => {});
Engine.canvas = canvasEl(); Engine.ctx = Engine.canvas.getContext("2d");

// Every picture asked for while playing, found or not.
const asked = new Set();
const handle = Engine.spriteHandle.bind(Engine);
Engine.spriteHandle = (name, ...rest) => { asked.add(name); return handle(name, ...rest); };

function project(config) {
  const p = { classes: [{ name: "Game", isGame: true, start: config.start, loop: config.loop }], rooms: [], functions: config.functions || [], sprites: [], sounds: [] };
  for (const [name, c] of Object.entries(config.classes)) p.classes.push({ name, ...c });
  for (const [name, c] of Object.entries(config.rooms)) p.rooms.push({ name, ...c });
  return p;
}

const KEYS = ["left", "right", "up", "down", "space", "a", "d", "w", "s", "enter", "1", "2", "3", "e", "q", "r"];
let seed = 7;
const rand = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

let bad = 0, total = 0;
function checkGame(label, files, { empty = false } = {}) {
  total++;
  const problems = [];
  const { config, problems: built } = lib.assembleGame(files);
  // The starter is empty on purpose, so its "no rooms yet" hints are expected.
  if (!empty) problems.push(...built);
  const manifest = lib.parseManifest(files["game.txt"] || "");
  const names = new Set(manifest.sprites.map((s) => s.name));
  const code = Object.entries(files).filter(([p]) => p.endsWith(".py")).map(([, t]) => t).join("\n");
  // Every literal picture name, either quote style, anywhere in the code.
  // A literal after "+" is the end of a built name (tag + 'Splash.png'): check every name it can make.
  for (const m of code.matchAll(/(\+\s*)?["']([\w.-]+\.(?:png|webp|jpe?g|gif))["']/g)) {
    if (m[1]) {
      if (![...names].some((n) => n.endsWith(m[2]) && n !== m[2])) problems.push(`no picture ends in "${m[2]}"`);
    } else if (!names.has(m[2])) problems.push(`code names "${m[2]}" but game.txt has no such picture`);
  }
  for (const s of manifest.sprites) {
    if (!/^(https?:|data:)/.test(s.source) && !config.textures[s.name]) problems.push(`${s.name} has no texture`);
  }
  // Pictures arrive at the size game.txt gives them, as the preview's decode would make them.
  Engine.sprites = new Map();
  for (const s of manifest.sprites) Engine.loadSprite(s.name, { width: s.width, height: s.height, naturalWidth: s.width, naturalHeight: s.height, complete: true });
  const errors = [];
  Engine.onError = (where, e) => errors.push(where + ": " + e.message);
  asked.clear();
  let clock = 0;
  try {
    Engine.start(project(config), () => {});
    for (let frame = 0; frame < 1800 && Engine.running && errors.length === 0; frame++) {
      Engine.keysDown.clear(); Engine.keysUp.clear();
      Engine.mouse.pressed = false; Engine.mouse.released = false;
      if (frame % 20 === 0) {
        for (const k of [...Engine.keys]) if (rand() < 0.5) { Engine.keys.delete(k); Engine.keysUp.add(k); }
        const k = KEYS[Math.floor(rand() * KEYS.length)];
        if (!Engine.keys.has(k)) Engine.keysDown.add(k); Engine.keys.add(k);
      }
      if (frame % 15 === 0) {
        Object.assign(Engine.mouse, { x: rand() * 1280 - 640, y: rand() * 720 - 360, over: true });
        Engine.mouse.down = !Engine.mouse.down;
        Engine.mouse[Engine.mouse.down ? "pressed" : "released"] = true;
      }
      clock += 16.7; Engine.tick(clock);
    }
  } catch (e) { errors.push("threw: " + e.message); }
  Engine.stopLoop?.();
  const missing = [...asked].filter((n) => !names.has(n));
  const all = [...problems, ...errors, ...missing.map((n) => `asked for picture "${n}" while playing`)];
  if (all.length) { bad++; console.log("  FAIL  " + label + "\n        -> " + all.slice(0, 4).join("\n        -> ")); }
  else console.log("  ok    " + label + `  (${manifest.sprites.length} pictures, ${asked.size} drawn)`);
}

for (const course of ["pxp101", "py101", "py102", "py201", "py202", "py301", "py302"]) {
  console.log("\n" + course);
  for (const week of lib.weeksFromMilestones(JSON.parse(readFileSync(site + course + "/milestones.json", "utf8")))) {
    checkGame(`${course} week ${String(week.n).padStart(2)} ${week.title}`, week.files);
  }
}
console.log("\nchallenges");
for (const c of lib.CHALLENGES) checkGame("challenge " + c.title, c.files);
console.log("\nstarter");
checkGame("new game starter", lib.starterFiles(lib.GAME_KIND), { empty: true });

console.log(`\n${total - bad}/${total} games clean`);
process.exit(bad ? 1 : 0);
