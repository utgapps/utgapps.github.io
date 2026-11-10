/* Play every Python Coding Challenge example, for real.

   A challenge page runs a finished example that the student cannot read, and
   the student builds the mechanic by watching it. So the example IS the
   specification a child works from: a fireball that never bounces, or a
   double jump that quietly allows a triple, teaches the wrong game and no
   error would ever say so.

   This boots the real engine - the cut the preview frame runs - in a stub
   browser, loads each example the way the preview does, then plays it: it
   holds and taps keys frame by frame and checks that what moved, appeared and
   disappeared matches the challenge's own requirements.

       node test/challenge-examples.mjs
*/
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { CHALLENGES } from "../src/lib/challenges.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail !== undefined ? "\n        -> " + JSON.stringify(detail) : "")); }
};

/* The smallest browser the engine will run in; see documented-api.mjs. */
function stubBrowser() {
  const context = () => new Proxy({}, {
    get(target, key) {
      if (key === "canvas") return { width: 1280, height: 720 };
      if (key === "measureText") return (t) => ({ width: String(t).length * 8, fontBoundingBoxAscent: 10, fontBoundingBoxDescent: 3 });
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
      getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k), get length() { return store.size; }, key: (i) => [...store.keys()][i],
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
function load(files) {
  const rooms = [], classes = new Map();
  for (const line of files["game.txt"].split("\n")) {
    const [word, name, , width, height] = line.trim().split(/\s+/);
    if (word === "room") rooms.push(name);
    if (word === "sprite") Engine.loadSprite(name, { width: Number(width), height: Number(height), naturalWidth: Number(width), naturalHeight: Number(height), complete: true });
  }
  for (const [path, code] of Object.entries(files)) {
    const match = path.match(/^([A-Za-z][A-Za-z0-9_]*)\.(start|loop)\.py$/);
    if (!match) continue;
    const entry = classes.get(match[1]) || { start: "", loop: "" };
    entry[match[2]] = code;
    classes.set(match[1], entry);
  }
  const project = { classes: [], rooms: [], functions: [], sprites: [], sounds: [] };
  for (const [name, panels] of classes) {
    if (name === "Game") project.classes.push({ name, isGame: true, ...panels });
    else if (rooms.includes(name)) project.rooms.push({ name, ...panels });
    else project.classes.push({ name, ...panels });
  }
  if (!classes.has("Game")) project.classes.push({ name: "Game", isGame: true, start: "", loop: "" });
  return project;
}

let errors = [];
let clock = 0;
Engine.onError = (where, error) => errors.push(where + ": " + error.message);
function play(challenge) {
  errors = [];
  Engine.start(load(challenge.files), () => {});
}
const frames = (count = 1, between) => {
  for (let index = 0; index < count; index++) {
    clock += 16.7;
    Engine.tick(clock);
    if (between) between(index);
  }
};
const hold = (key) => { if (!Engine.keys.has(key)) Engine.keysDown.add(key); Engine.keys.add(key); };
const release = (key) => { Engine.keys.delete(key); Engine.keysUp.add(key); };
const tap = (key) => { hold(key); frames(1); release(key); };
const all = (name) => Engine.objectsOf(name);
const one = (name) => all(name)[0];
const get = (object, attribute) => object && object.attrs.get(attribute);
const game = (attribute) => Engine.gameObj.attrs.get(attribute);
const imageOf = (object) => get(object, "sprite")?.name;
const ran = (label) => check(label + " runs with no errors", errors.length === 0, errors.slice(0, 3));
const byId = Object.fromEntries(CHALLENGES.map((challenge) => [challenge.id, challenge]));

console.log("\nevery challenge");
const perLevel = Object.fromEntries(["starter", "explorer", "master"].map((level) => [level, CHALLENGES.filter((c) => c.difficulty === level).length]));
check("there are 29 challenges: 9 starter, 10 explorer, 10 master",
      CHALLENGES.length === 29 && perLevel.starter === 9 && perLevel.explorer === 10 && perLevel.master === 10, perLevel);
check("every id is one the worker accepts", CHALLENGES.every((c) => /^[a-z0-9-]{1,40}$/.test(c.id)), CHALLENGES.map((c) => c.id));
check("no two challenges share an id or a title",
      new Set(CHALLENGES.map((c) => c.id)).size === CHALLENGES.length && new Set(CHALLENGES.map((c) => c.title)).size === CHALLENGES.length);
check("each level is listed together, in order",
      CHALLENGES.map((c) => c.difficulty).join() === CHALLENGES.map((c) => c.difficulty).sort((a, b) => ["starter", "explorer", "master"].indexOf(a) - ["starter", "explorer", "master"].indexOf(b)).join());
/* The camp workbooks never use lists, so an example that does would teach
   a child a game they cannot build yet. */
check("no example uses a list", CHALLENGES.every((c) => Object.entries(c.files).every(([path, code]) => !path.endsWith(".py") || !/\[|\bfor\b|\bwhile\b/.test(code))),
      CHALLENGES.filter((c) => Object.entries(c.files).some(([path, code]) => path.endsWith(".py") && /\[|\bfor\b|\bwhile\b/.test(code))).map((c) => c.id));
check("every challenge has requirements and controls",
      CHALLENGES.every((c) => c.requirements.length >= 3 && c.controls.length >= 1 && c.description && c.summary));

/* The checker reads the requirements and the code in one question that has
   to fit the gateway. A student's version of a mechanic is nearly always
   longer than the example, so the example has to leave room for that - an
   example that only just fits leaves the class nothing. */
const checker = await build({
  stdin: { contents: 'export { askChecker } from "./src/lib/challengeCheck";', resolveDir: here + "..", loader: "ts" },
  bundle: true, format: "esm", platform: "neutral", write: false, logLevel: "silent",
  plugins: [{ name: "raw", setup(builder) {
    builder.onResolve({ filter: /\?raw$/ }, (args) => ({ path: join(args.resolveDir, args.path.replace(/\?raw$/, "")), namespace: "raw" }));
    builder.onLoad({ filter: /.*/, namespace: "raw" }, (args) => ({ contents: readFileSync(args.path, "utf8"), loader: "text" }));
  } }],
});
const { askChecker } = await import("data:text/javascript;base64," + Buffer.from(checker.outputFiles[0].text).toString("base64"));
const SPARE = 150;
const tight = [];
for (const challenge of CHALLENGES) {
  // Pad the example the way a student's longer version would be, and see
  // whether the checker would still take it.
  const padded = { ...challenge.files, "Notes.loop.py": "x".repeat(SPARE) + "\n" };
  try { await askChecker(async () => '{"requirements":[]}', challenge, padded); }
  catch (error) { tight.push(challenge.id + ": " + error.message.slice(0, 90)); }
}
check(`every example leaves the checker room for ${SPARE} more characters of a student's code`, tight.length === 0, tight);

console.log("\nWalk and Face");
play(byId["walk-and-face"]);
hold("right"); frames(30); release("right"); frames(1);
check("holding right walks right, facing right", get(one("Hero"), "x") === 180 && get(one("Hero"), "scaleX") === 1, get(one("Hero"), "x"));
hold("left"); frames(10); release("left"); frames(1);
check("walking left turns the hero round", get(one("Hero"), "scaleX") === -1 && get(one("Hero"), "x") === 120);
hold("up"); frames(200); release("up"); frames(1);
hold("right"); frames(200); release("right"); frames(1);
check("the hero stops at the top and right edges", get(one("Hero"), "y") === 330 && get(one("Hero"), "x") === 620, [get(one("Hero"), "x"), get(one("Hero"), "y")]);
hold("down"); hold("left"); frames(400); release("down"); release("left"); frames(1);
check("and at the bottom and left edges", get(one("Hero"), "y") === -330 && get(one("Hero"), "x") === -620);
ran("Walk and Face");

console.log("\nJump with Gravity");
play(byId["jump-with-gravity"]);
frames(5);
check("the hero stands on the ground", get(one("Hero"), "y") === -292);
tap("space");
const heights = [];
frames(60, () => heights.push(get(one("Hero"), "y")));
const peak = Math.max(...heights);
check("space jumps up and gravity brings the hero back down", peak > -150 && heights.at(-1) === -292, { peak, last: heights.at(-1) });
const rises = heights.slice(0, heights.indexOf(peak)).map((y, index, list) => index ? y - list[index - 1] : 0).slice(1);
check("the jump slows as it rises (gravity, not a teleport)", rises.every((step, index) => index === 0 || step < rises[index - 1]), rises);
tap("space"); frames(10);
const midAir = get(one("Hero"), "y");
tap("space"); frames(1);
check("a second press in the air does not jump again", get(one("Hero"), "speedY") < 20 - 11, get(one("Hero"), "speedY"));
frames(60);
check("the hero lands and stays on the ground", get(one("Hero"), "y") === -292 && midAir > -292);
ran("Jump with Gravity");

console.log("\nCoin Collector");
play(byId["coin-collector"]);
frames(2);
check("three coins start on the screen", all("Coin").length === 3);
const coin = one("Coin");
// The others somewhere the hero is not: a coin can be born on top of them.
for (const other of all("Coin")) { other.attrs.set("x", 500); other.attrs.set("y", 300); }
Engine.gameObj.attrs.set("score", 0);
coin.attrs.set("x", get(one("Hero"), "x")); coin.attrs.set("y", get(one("Hero"), "y"));
frames(1);
check("touching a coin scores one", game("score") === 1, game("score"));
check("the coin jumps somewhere new", Math.hypot(get(coin, "x") - get(one("Hero"), "x"), get(coin, "y") - get(one("Hero"), "y")) > 0 && all("Coin").length === 3);
// Where it jumped to may be under the hero again; the label is read next frame.
coin.attrs.set("x", -500); coin.attrs.set("y", 300); frames(1);
check("the score is on the screen", get(game("label"), "text") === "Coins: 1", get(game("label"), "text"));
ran("Coin Collector");

console.log("\nDouble Jump");
play(byId["double-jump"]);
frames(3);
tap("space"); frames(12);
const before = get(one("Hero"), "y");
tap("space");
check("a second press in mid-air jumps again", get(one("Hero"), "speedY") >= 15 && get(one("Hero"), "jumpsLeft") === 0, get(one("Hero"), "speedY"));
frames(8);
tap("space");
check("a third press does nothing", get(one("Hero"), "speedY") < 15 && get(one("Hero"), "jumpsLeft") === 0, get(one("Hero"), "speedY"));
frames(120);
check("landing gives both jumps back", get(one("Hero"), "y") === -292 && get(one("Hero"), "jumpsLeft") === 2 && before > -292);
check("the jumps left are on the screen", get(game("label"), "text") === "Jumps left: 2");
ran("Double Jump");

console.log("\nBouncing Fireball");
play(byId["bouncing-fireball"]);
frames(2);
tap("f"); frames(1);
check("F throws a fireball", all("Fireball").length === 1);
const ball = one("Fireball");
check("it flies the way the hero faces", get(ball, "speedX") > 0 && get(ball, "x") > get(one("Hero"), "x"));
const ballHeights = [];
frames(80, () => ballHeights.push(get(ball, "y")));
const lowest = Math.min(...ballHeights);
const bounces = ballHeights.filter((y, index) => index > 0 && y > ballHeights[index - 1] && ballHeights[index - 1] === lowest).length;
check("it falls and bounces along the floor", lowest === -311 && bounces >= 2, { lowest, bounces });
tap("f"); frames(1); tap("f"); frames(1); tap("f"); frames(1);
check("never more than two at once", all("Fireball").length <= 2, all("Fireball").length);
frames(200);
check("fireballs that leave the screen are gone", all("Fireball").length === 0, all("Fireball").map((o) => get(o, "x")));
hold("left"); frames(2); release("left");
tap("f"); frames(1);
check("facing left throws it left", get(one("Fireball"), "speedX") < 0);
ran("Bouncing Fireball");

console.log("\nDash with Cooldown");
play(byId["dash-with-cooldown"]);
frames(2);
tap("shift"); frames(12);
check("shift dashes far, fast", get(one("Hero"), "x") >= 230, get(one("Hero"), "x"));
check("the hero looks tired while the dash recharges", imageOf(one("Hero")) === "tired.png", imageOf(one("Hero")));
const tiredAt = get(one("Hero"), "x");
tap("shift"); frames(5);
check("shift does nothing during the cooldown", get(one("Hero"), "x") === tiredAt);
frames(50);
check("the dash comes back", imageOf(one("Hero")) === "hero.png");
tap("shift"); frames(2);
check("and works again", get(one("Hero"), "x") > tiredAt);
frames(200);
hold("right"); frames(100); release("right"); tap("shift"); frames(20);
check("a dash cannot leave the screen", get(one("Hero"), "x") <= 620);
ran("Dash with Cooldown");

console.log("\nStomp the Patrol");
play(byId["stomp-the-patrol"]);
frames(2);
const enemy = one("Enemy");
const hero = one("Hero");
hero.attrs.set("x", get(enemy, "x")); hero.attrs.set("y", get(enemy, "y") + 60); hero.attrs.set("speedY", -6);
frames(4);
check("landing on the enemy squashes it and scores", all("Enemy").length === 0 && game("score") === 1, { enemies: all("Enemy").length, score: game("score") });
check("and bounces the hero up", get(hero, "speedY") > 0 || get(hero, "y") > -250);
frames(70);
check("a new enemy turns up after a moment", all("Enemy").length === 1);
const next = one("Enemy");
hero.attrs.set("x", get(next, "x") + 20); hero.attrs.set("y", -292); hero.attrs.set("speedY", 0);
frames(1);
check("walking into one sends the hero back to the start", get(hero, "x") === -500 && all("Enemy").length === 1 && game("score") === 1, get(hero, "x"));
check("the score is on the screen", get(game("label"), "text") === "Stomped: 1");
const patrol = [];
frames(1000, () => patrol.push(get(next, "x")));
check("the enemy patrols back and forth, turning at both edges",
      Math.max(...patrol) >= 600 && Math.max(...patrol) <= 610 && Math.min(...patrol) <= -600 && Math.min(...patrol) >= -610,
      [Math.min(...patrol), Math.max(...patrol)]);
ran("Stomp the Patrol");

console.log("\nCharge Shot");
play(byId["charge-shot"]);
frames(2);
hold("space"); frames(30);
check("holding space charges", get(one("Hero"), "charge") === 30 && get(one("Bar"), "visible") === true, get(one("Hero"), "charge"));
release("space"); frames(1);
const small = one("Shot");
check("letting go fires a shot and resets the charge", all("Shot").length === 1 && get(one("Hero"), "charge") === 0);
hold("space"); frames(200);
check("the charge stops at its maximum", get(one("Hero"), "charge") === 60);
release("space"); frames(1);
const big = all("Shot").find((shot) => shot !== small);
check("more charge makes a bigger, faster shot",
      big && get(big, "scaleX") > get(small, "scaleX") && Math.abs(get(big, "speedX")) > Math.abs(get(small, "speedX")),
      big && [get(small, "scaleX"), get(big, "scaleX")]);
check("a full charge looks different", big && imageOf(big) === "bigshot.png" && imageOf(small) === "shot.png");
frames(200);
check("shots that leave the screen are gone", all("Shot").length === 0);
ran("Charge Shot");

console.log("\nHoming Missile");
play(byId["homing-missile"]);
frames(2);
tap("space"); frames(1);
const missile = one("Missile");
check("space launches a missile", !!missile);
const headings = [];
frames(40, () => { if (missile.__alive) headings.push(get(missile, "heading")); });
check("and points the way it flies", get(missile, "angle") === get(missile, "heading") || !missile.__alive);
/* Every missile, every frame, both ways round: a limit that only holds when
   the target happens to be on one side is not a limit. */
const lastHeading = new Map();
const turns = [];
const watch = () => {
  for (const flying of all("Missile")) {
    const heading = get(flying, "heading");
    if (lastHeading.has(flying)) turns.push(heading - lastHeading.get(flying));
    lastHeading.set(flying, heading);
  }
};
for (let shot = 0; shot < 8; shot++) {
  Engine.gameObj.attrs.get("launcher").attrs.set("x", shot % 2 ? 560 : -560);
  tap("space"); frames(160, watch);
}
check("it turns a little at a time, never snapping, whichever way it turns",
      Math.max(...turns) <= 4.0001 && Math.min(...turns) >= -4.0001 && turns.some((turn) => turn > 1) && turns.some((turn) => turn < -1),
      [Math.min(...turns), Math.max(...turns)]);
check("missiles find the target and score", game("score") >= 1, game("score"));
frames(200);
/* A target nothing can touch: the missile chases where it was and has to
   give up on its own. */
game("target").__alive = false;
tap("space"); frames(10);
check("a missile is chasing", all("Missile").length === 1);
frames(200);
check("a missile that misses burns out", all("Missile").length === 0);
check("the score is on the screen", get(game("label"), "text") === "Hits: " + game("score"));
ran("Homing Missile");

/* ------------------------------------------------------------ starters */

console.log("\nScreen Wrap");
play(byId["screen-wrap"]);
frames(2);
const ship = one("Ship");
hold("right"); frames(10); release("right"); frames(1);
check("the arrow keys fly the ship", get(ship, "x") === 60, get(ship, "x"));
ship.attrs.set("x", 655); hold("right"); frames(1); release("right"); frames(1);
check("off the right edge, back in on the left", get(ship, "x") === -660, get(ship, "x"));
hold("left"); frames(1); release("left"); frames(1);
check("off the left edge, back in on the right", get(ship, "x") === 660, get(ship, "x"));
ship.attrs.set("y", 378); hold("up"); frames(1); release("up"); frames(1);
check("off the top, back in at the bottom", get(ship, "y") === -380, get(ship, "y"));
hold("down"); frames(1); release("down"); frames(1);
check("off the bottom, back in at the top", get(ship, "y") === 380, get(ship, "y"));
const cometXs = [];
frames(400, () => cometXs.push(get(one("Comet"), "x")));
check("the comet drifts and wraps the same way",
      cometXs.some((x, index) => index > 0 && x < cometXs[index - 1]) && Math.max(...cometXs) <= 665 && Math.min(...cometXs) >= -665,
      [Math.min(...cometXs), Math.max(...cometXs)]);
ran("Screen Wrap");

console.log("\nBouncing Ball");
play(byId["bouncing-ball"]);
frames(1);
const firstBall = one("Ball");
const ballXs = [], ballYs = [];
frames(1500, () => { ballXs.push(get(firstBall, "x")); ballYs.push(get(firstBall, "y")); });
check("the ball moves on its own and stays in the box",
      Math.max(...ballXs) <= 640 && Math.min(...ballXs) >= -640 && Math.max(...ballYs) <= 360 && Math.min(...ballYs) >= -360 && Math.max(...ballXs) > 600 && Math.min(...ballYs) < -330,
      [Math.min(...ballXs), Math.max(...ballXs), Math.min(...ballYs), Math.max(...ballYs)]);
const turnsX = ballXs.filter((x, index) => index > 1 && Math.sign(x - ballXs[index - 1]) !== Math.sign(ballXs[index - 1] - ballXs[index - 2])).length;
const turnsY = ballYs.filter((y, index) => index > 1 && Math.sign(y - ballYs[index - 1]) !== Math.sign(ballYs[index - 1] - ballYs[index - 2])).length;
check("it bounces off the sides and off the top and bottom", turnsX >= 2 && turnsY >= 2, { turnsX, turnsY });
check("every bounce is counted", game("bounces") === turnsX + turnsY, { counted: game("bounces"), seen: turnsX + turnsY });
check("the count is on the screen", get(game("label"), "text") === "Bounces: " + game("bounces"));
tap("space"); frames(1);
check("space throws in another ball", all("Ball").length === 2);
ran("Bouncing Ball");

console.log("\nSlippery Ice");
play(byId["slippery-ice"]);
frames(2);
one("Hero").attrs.set("x", -600);
hold("right"); frames(5);
check("the hero speeds up a little at a time", Math.abs(get(one("Hero"), "speedX") - 2) < 1e-9, get(one("Hero"), "speedX"));
frames(35);
check("up to a top speed", get(one("Hero"), "speedX") === 10, get(one("Hero"), "speedX"));
one("Hero").attrs.set("x", -600);
release("right"); frames(1);
const slideXs = [];
frames(200, () => slideXs.push(get(one("Hero"), "x")));
const slideSteps = slideXs.slice(1).map((x, index) => x - slideXs[index]);
check("letting go slides on, slowing down", slideSteps[0] > 5 && slideSteps.every((step, index) => step >= 0 && (index === 0 || step < slideSteps[index - 1] || step < 1e-6)), slideSteps.slice(0, 5));
check("until the hero stops, well before the far edge", Math.abs(get(one("Hero"), "speedX")) < 0.01 && get(one("Hero"), "x") < 0, [get(one("Hero"), "speedX"), get(one("Hero"), "x")]);
hold("right"); frames(400); release("right"); frames(1);
check("the hero stops at the edge", get(one("Hero"), "x") === 620);
hold("left"); frames(400); release("left"); frames(1);
check("both edges", get(one("Hero"), "x") === -620);
ran("Slippery Ice");

console.log("\nFollow the Leader");
play(byId["follow-the-leader"]);
frames(2);
const pet = one("Pet");
const petSteps = [];
let petWas = get(pet, "x");
frames(60, () => { petSteps.push(Math.abs(get(pet, "x") - petWas)); petWas = get(pet, "x"); });
check("the pet moves fast when far and slows as it gets close", petSteps[0] > 20 && petSteps.at(-1) < 1 && petSteps.every((step, index) => index === 0 || step <= petSteps[index - 1] + 1e-9), [petSteps[0], petSteps.at(-1)]);
hold("right"); frames(60); release("right"); frames(200);
const heroAt = one("Hero");
check("it stops a little behind the hero, not on top of them",
      Math.abs(get(pet, "x") - (get(heroAt, "x") - 60)) < 2 && Math.abs(get(pet, "y") - (get(heroAt, "y") - 16)) < 2, [get(pet, "x"), get(heroAt, "x")]);
check("it faces the hero", get(pet, "scaleX") === 1);
hold("left"); frames(120); release("left"); frames(5);
check("and turns round when the hero passes it", get(pet, "scaleX") === -1 && get(pet, "x") > get(heroAt, "x"));
ran("Follow the Leader");

console.log("\nDodge the Rocks");
play(byId["dodge-the-rocks"]);
frames(2);
check("three rocks, starting above the screen at different places", all("Rock").length === 3 && all("Rock").every((rock) => get(rock, "y") > 360), all("Rock").map((rock) => get(rock, "y")));
const rockXs = new Set();
const rock = one("Rock");
let fell = false, recycled = false, lastRockY = get(rock, "y");
for (let round = 0; round < 6; round++) {
  rock.attrs.set("x", 500 * (round % 2 ? 1 : -1)); one("Hero").attrs.set("x", 0);
  frames(220, () => {
    const y = get(rock, "y");
    if (y < lastRockY) fell = true;
    if (y > lastRockY) { recycled = true; rockXs.add(get(rock, "x")); }
    lastRockY = y;
  });
}
check("rocks fall, and go back to the top at a new place", fell && recycled && rockXs.size >= 3, [...rockXs]);
for (const falling of all("Rock")) falling.attrs.set("y", 5000);
Engine.gameObj.attrs.set("time", 0);
frames(60);
check("the timer counts the time survived, on the screen", game("time") === 60 && get(game("label"), "text") === "Survived: 1 s", get(game("label"), "text"));
rock.attrs.set("x", get(one("Hero"), "x")); rock.attrs.set("y", get(one("Hero"), "y") + 20);
frames(1);
check("a hit sends the timer back to zero, and the rock back to the top", game("time") <= 1 && get(rock, "y") >= 390, [game("time"), get(rock, "y")]);
hold("left"); frames(300); release("left"); frames(1);
check("the hero cannot leave the screen", get(one("Hero"), "x") === -620);
ran("Dodge the Rocks");

console.log("\nGrow by Eating");
play(byId["grow-by-eating"]);
frames(2);
const food = one("Food");
const eater = one("Hero");
const feed = () => { food.attrs.set("x", get(eater, "x")); food.attrs.set("y", get(eater, "y")); frames(1); };
feed();
check("eating makes the hero bigger", get(eater, "scaleX") === 1.25 && get(eater, "scaleY") === 1.25 && game("bites") === 1, get(eater, "scaleX"));
check("the food pops up somewhere new", Math.hypot(get(food, "x") - get(eater, "x"), get(food, "y") - get(eater, "y")) > 0);
for (let bite = 0; bite < 12; bite++) feed();
check("the hero stops growing at a maximum size", get(eater, "scaleX") === 3 && get(eater, "scaleY") === 3, get(eater, "scaleX"));
// The food can pop up on a hero this big, so park it before counting.
food.attrs.set("x", get(eater, "x") + 400); frames(1);
check("the bites are on the screen", game("bites") >= 13 && get(game("label"), "text") === "Bites: " + game("bites"), get(game("label"), "text"));
hold("up"); frames(10); release("up"); frames(1);
check("the arrow keys move the hero", get(eater, "y") !== 0);
ran("Grow by Eating");

/* ------------------------------------------------------------ explorers */

console.log("\nHold to Jump Higher");
play(byId["hold-to-jump-higher"]);
frames(3);
const peakOf = (heldFrames) => {
  hold("space"); const heights = []; frames(heldFrames, () => heights.push(get(one("Hero"), "y")));
  release("space"); frames(60, () => heights.push(get(one("Hero"), "y")));
  return Math.max(...heights);
};
const hop = peakOf(1);
const leap = peakOf(40);
check("a tap makes a small hop and a long hold a high jump", hop < -250 && leap > -120, { hop, leap });
check("the hero lands again", get(one("Hero"), "y") === -292);
tap("space"); frames(8); release("space"); tap("space"); frames(1);
check("no second jump in the air", get(one("Hero"), "speedY") <= 5, get(one("Hero"), "speedY"));
ran("Hold to Jump Higher");

console.log("\nLadder Climb");
play(byId["ladder-climb"]);
frames(3);
const climber = one("Hero");
hold("up"); frames(20); release("up"); frames(1);
check("away from the ladder, Up does nothing", get(climber, "y") === -292, get(climber, "y"));
climber.attrs.set("x", 0);
hold("up"); frames(30); release("up"); frames(1);
check("on the ladder, Up climbs", get(climber, "y") === -292 + 120, get(climber, "y"));
frames(60);
check("and the hero can stop halfway without falling", get(climber, "y") === -292 + 120, get(climber, "y"));
hold("down"); frames(10); release("down"); frames(1);
check("Down climbs back down", get(climber, "y") === -292 + 80, get(climber, "y"));
hold("up"); frames(200); release("up");
hold("right"); frames(25); release("right"); frames(30);
check("at the top the hero steps off onto the ledge and stands on it", get(climber, "y") === 138 && get(climber, "x") > 60, [get(climber, "x"), get(climber, "y")]);
hold("right"); frames(100); release("right"); frames(60);
check("walking off the ledge falls back to the ground", get(climber, "y") === -292, get(climber, "y"));
ran("Ladder Climb");

console.log("\nGravity Flip");
play(byId["gravity-flip"]);
frames(3);
const flipper = one("Hero");
tap("space"); frames(60);
check("space flips gravity: the hero falls up to the ceiling, upside down", get(flipper, "y") === 292 && get(flipper, "scaleY") === -1, [get(flipper, "y"), get(flipper, "scaleY")]);
hold("left"); frames(10); release("left"); frames(1);
check("and walks along it", get(flipper, "x") === -60 && get(flipper, "scaleX") === -1);
tap("space"); frames(10);
const flipFalling = get(flipper, "y");
tap("space"); frames(60);
check("no flipping in mid-air", flipFalling < 292 && flipFalling > -292 && get(flipper, "y") === -292 && get(flipper, "scaleY") === 1, [flipFalling, get(flipper, "y")]);
ran("Gravity Flip");

console.log("\nKey and Door");
play(byId["key-and-door"]);
frames(2);
const opener = one("Hero");
hold("right"); frames(150); release("right"); frames(1);
check("without the key, the door stops the hero", get(opener, "x") <= 266 && all("Door").length === 1, get(opener, "x"));
opener.attrs.set("x", -500); frames(1);
check("touching the key picks it up", all("Key").length === 0 && get(opener, "hasKey") === true);
check("not yet a winner", get(game("label"), "text") !== "You made it!");
hold("right"); frames(250); release("right"); frames(1);
check("with the key, the door opens and the hero walks on", all("Door").length === 0 && get(opener, "x") === 620, get(opener, "x"));
check("reaching the flag wins", get(game("label"), "text") === "You made it!", get(game("label"), "text"));
ran("Key and Door");

console.log("\nSprint with Stamina");
play(byId["sprint-with-stamina"]);
frames(2);
const runner = one("Hero");
hold("shift"); frames(10);
check("shift alone does not use stamina", get(runner, "stamina") === 100 && get(runner, "x") === 0);
hold("right"); frames(20);
check("shift while walking runs fast and uses stamina", get(runner, "x") === 240 && get(runner, "stamina") === 80, [get(runner, "x"), get(runner, "stamina")]);
runner.attrs.set("x", -600); frames(80);
const tiredX = get(runner, "x"); frames(10);
check("out of stamina, the hero can only walk, even holding shift", get(runner, "stamina") === 0 && get(runner, "x") - tiredX === 50, [get(runner, "stamina"), get(runner, "x") - tiredX]);
release("right"); frames(30);
check("stamina does not come back while shift is held", get(runner, "stamina") === 0);
release("shift"); frames(400);
check("standing still refills stamina, up to its maximum", get(runner, "stamina") === 100, get(runner, "stamina"));
runner.attrs.set("stamina", 50); frames(1);
check("the bar shows the stamina", Math.abs(get(one("Bar"), "scaleX") - 0.515) < 0.02 && get(one("Bar"), "x") === get(runner, "x"), get(one("Bar"), "scaleX"));
ran("Sprint with Stamina");

console.log("\nMagnet Coins");
play(byId["magnet-coins"]);
frames(2);
const magnet = one("Hero");
const coins = all("Coin");
for (const [index, each] of coins.entries()) { each.attrs.set("x", -600 + index * 40); each.attrs.set("y", 300); }
const near = coins[0], far = coins[1];
near.attrs.set("x", 100); near.attrs.set("y", 60);
far.attrs.set("x", 500); far.attrs.set("y", 0);
frames(3);
check("a far coin stays still", get(far, "x") === 500 && get(far, "y") === 0);
check("a near coin flies towards the hero", Math.hypot(get(near, "x"), get(near, "y")) < Math.hypot(100, 60) - 20, [get(near, "x"), get(near, "y")]);
frames(20);
check("catching it scores, and it pops up somewhere new", game("score") >= 1 && Math.hypot(get(near, "x"), get(near, "y")) > 0, game("score"));
for (const each of coins) { each.attrs.set("x", -600); each.attrs.set("y", 300); }
frames(1);
check("the score is on the screen", get(game("label"), "text") === "Coins: " + game("score"), get(game("label"), "text"));
hold("left"); frames(10); release("left"); frames(1);
check("the arrow keys move the hero", get(magnet, "x") === -60);
ran("Magnet Coins");

console.log("\nCheckpoints");
play(byId["checkpoints"]);
frames(3);
const jumper = one("Hero");
check("the hero stands on the ground", get(jumper, "y") === -292);
hold("right"); frames(45); release("right"); frames(40);
check("walking into a pit before any flag comes back at the start", get(jumper, "x") === -560 && get(jumper, "y") >= -293, [get(jumper, "x"), get(jumper, "y")]);
jumper.attrs.set("x", -360); tap("space");
hold("right"); frames(40); release("right"); frames(20);
check("a jump clears the pit", get(jumper, "y") === -292 && get(jumper, "x") > -150, [get(jumper, "x"), get(jumper, "y")]);
jumper.attrs.set("x", 0); frames(2);
const middleFlag = all("Flag").find((flag) => get(flag, "x") === 0);
check("touching a flag makes it the checkpoint, and it lights up", game("comeBackX") === 0 && imageOf(middleFlag) === "flagon.png");
check("the other flag is not lit", all("Flag").filter((flag) => imageOf(flag) === "flagon.png").length === 1);
hold("right"); frames(35); release("right"); frames(40);
check("falling in now comes back at that flag", get(jumper, "x") === 0, get(jumper, "x"));
ran("Checkpoints");

/* ------------------------------------------------------------ masters */

console.log("\nMoving Platform");
play(byId["moving-platform"]);
frames(2);
const rider = one("Hero");
const platform = one("Platform");
const platformXs = [];
frames(400, () => platformXs.push(get(platform, "x")));
check("the platform glides back and forth, turning at each end", Math.max(...platformXs) >= 300 && Math.max(...platformXs) <= 303 && Math.min(...platformXs) <= -300 && Math.min(...platformXs) >= -303, [Math.min(...platformXs), Math.max(...platformXs)]);
rider.attrs.set("x", get(platform, "x")); rider.attrs.set("y", get(platform, "y") + 70); rider.attrs.set("speedY", 0);
frames(15);
check("the hero lands on it and stands there", get(rider, "y") === get(platform, "y") + 38, [get(rider, "y"), get(platform, "y")]);
const offsets = [];
frames(150, () => offsets.push(get(rider, "x") - get(platform, "x")));
check("and rides along with it", Math.max(...offsets) - Math.min(...offsets) < 1e-9 && get(rider, "y") === get(platform, "y") + 38, [Math.min(...offsets), Math.max(...offsets)]);
tap("space"); frames(3);
check("the hero can jump from the platform", get(rider, "y") > get(platform, "y") + 60);
hold("right"); frames(120); release("right"); frames(60);
check("and come back down to the ground", get(rider, "y") === -292, get(rider, "y"));
ran("Moving Platform");

console.log("\nWall Jump");
play(byId["wall-jump"]);
frames(2);
const climberHero = one("Hero");
hold("left"); frames(40);
check("walls stop the hero", get(climberHero, "x") === -91, get(climberHero, "x"));
tap("space"); frames(10);
const fallSpeeds = [];
frames(40, () => fallSpeeds.push(get(climberHero, "speedY")));
check("touching a wall in mid-air slides slowly down it", Math.min(...fallSpeeds) === -2 && get(climberHero, "x") === -91, [Math.min(...fallSpeeds), get(climberHero, "x")]);
release("left");
climberHero.attrs.set("y", -100); climberHero.attrs.set("speedY", -2); frames(1);
const kickFrom = get(climberHero, "y");
tap("space"); frames(22);
check("space on a wall kicks up and away, across to the other wall", get(climberHero, "x") === 91 && get(climberHero, "y") > kickFrom + 60, [get(climberHero, "x"), get(climberHero, "y") - kickFrom]);
let highest = -292;
for (let kick = 0; kick < 8; kick++) { tap("space"); frames(22, () => { highest = Math.max(highest, get(climberHero, "y")); }); }
check("kicking from wall to wall climbs the shaft to the star", highest > 250 && get(game("label"), "text") === "You reached the star!", [highest, get(game("label"), "text")]);
ran("Wall Jump");

console.log("\nPick Up and Throw");
play(byId["pick-up-and-throw"]);
frames(2);
const thrower = one("Hero");
const crates = all("Crate");
const crateA = crates.find((crate) => get(crate, "x") === 200);
tap("e"); frames(1);
check("E away from a crate picks up nothing", !get(thrower, "carrying"));
hold("right"); frames(30); release("right"); frames(1);
tap("e"); frames(1);
check("E at a crate lifts it over the hero's head", get(crateA, "held") === true && get(crateA, "y") === get(thrower, "y") + 50);
hold("left"); frames(40); release("left"); frames(1);
check("it comes along as the hero walks", get(crateA, "x") === get(thrower, "x") && get(thrower, "scaleX") === -1);
const crateB = crates.find((crate) => crate !== crateA);
crateB.attrs.set("x", get(thrower, "x"));
const throwFrom = get(thrower, "x");
tap("e");
const arc = [];
frames(60, () => arc.push(get(crateA, "y")));
check("only one crate at a time: E now throws instead of picking up another", get(crateB, "held") === false && get(crateA, "held") === false);
check("the throw goes the way the hero faces, up and then down in an arc, and lands",
      get(crateA, "x") < throwFrom - 150 && Math.max(...arc) > get(thrower, "y") + 100 && arc.at(-1) === -300 && get(crateA, "speedX") === 0,
      [get(crateA, "x") - throwFrom, Math.max(...arc), arc.at(-1)]);
thrower.attrs.set("x", -600); crateA.attrs.set("x", -600); frames(1); tap("e"); frames(1); tap("e"); frames(60);
check("a crate thrown at the edge stays on the screen", get(crateA, "x") === -620, get(crateA, "x"));
ran("Pick Up and Throw");

console.log("\nGuard Chase");
play(byId["guard-chase"]);
frames(2);
const guard = one("Guard");
const patrolXs = [];
frames(400, () => patrolXs.push(get(guard, "x")));
check("far away, the guard patrols between two points", Math.min(...patrolXs) >= 148 && Math.min(...patrolXs) <= 152 && Math.max(...patrolXs) >= 448 && Math.max(...patrolXs) <= 452 && imageOf(guard) === "guard.png", [Math.min(...patrolXs), Math.max(...patrolXs)]);
const sneak = one("Hero");
sneak.attrs.set("x", get(guard, "x") - 200);
const spottedAt = get(guard, "x");
frames(5);
check("close up, the guard spots the hero and chases, faster", get(guard, "chasing") === true && imageOf(guard) === "alert.png" && spottedAt - get(guard, "x") === 20, [spottedAt - get(guard, "x"), imageOf(guard)]);
frames(60);
check("a caught hero goes back to the start", get(sneak, "x") === -550, get(sneak, "x"));
frames(5);
check("far away again, the guard calms down", get(guard, "chasing") === false && imageOf(guard) === "guard.png");
frames(200);
check("and walks back to its beat", get(guard, "x") >= 150 && get(guard, "x") <= 450, get(guard, "x"));
sneak.attrs.set("x", get(guard, "x") - 240); frames(1);
const chased = [];
hold("left"); frames(120, () => chased.push(get(guard, "chasing"))); release("left"); frames(1);
check("the hero can outrun the guard", chased[0] === true && chased.at(-1) === false && get(guard, "x") - get(sneak, "x") > 400, [get(sneak, "x"), get(guard, "x")]);
ran("Guard Chase");

console.log("\nKnockback");
play(byId["knockback"]);
frames(2);
const victim = one("Hero");
const enemyK = one("Enemy");
enemyK.attrs.set("speedX", 0);
victim.attrs.set("x", get(enemyK, "x") - 40); frames(1);
check("touching the enemy counts a hit, on the screen", game("hits") === 1 && get(victim, "safeTime") > 0, game("hits"));
const hitFrom = get(victim, "x");
frames(12);
check("and knocks the hero up and away (to the left, away from it)", get(victim, "x") < hitFrom - 80 && get(victim, "y") > -292, [get(victim, "x") - hitFrom, get(victim, "y")]);
const shown = [];
frames(20, () => shown.push(get(victim, "visible")));
victim.attrs.set("x", get(enemyK, "x")); frames(5, () => shown.push(get(victim, "visible")));
check("while safe, the hero blinks and touching does nothing", shown.includes(true) && shown.includes(false) && game("hits") === 1, game("hits"));
victim.attrs.set("x", -500); frames(80);
check("when safe time ends the hero stops blinking", get(victim, "visible") === true && get(victim, "safeTime") === 0);
check("the hits are on the screen", get(game("label"), "text") === "Hits: 1");
victim.attrs.set("x", get(enemyK, "x") + 40); victim.attrs.set("y", -292); frames(1);
check("then a hit counts again, and from the right knocks the hero right", game("hits") === 2 && get(victim, "speedX") === 10, [game("hits"), get(victim, "speedX")]);
ran("Knockback");

console.log("\nCannon Arc");
play(byId["cannon-arc"]);
frames(2);
const cannon = one("Cannon");
hold("up"); frames(100); release("up"); frames(1);
check("Up tilts the cannon, up to a biggest angle, and it is drawn tilted", get(cannon, "aim") === 80 && get(cannon, "angle") === 80, get(cannon, "aim"));
hold("down"); frames(100); release("down"); frames(1);
check("Down tilts it back, down to a smallest angle", get(cannon, "aim") === 10, get(cannon, "aim"));
for (let press = 0; press < 30; press++) { tap("right"); frames(1); }
check("Right adds power, up to a biggest power", get(cannon, "power") === 25, get(cannon, "power"));
for (let press = 0; press < 30; press++) { tap("left"); frames(1); }
check("Left takes power away, down to a smallest power", get(cannon, "power") === 5, get(cannon, "power"));
check("angle and power are on the screen", get(game("label"), "text").startsWith("Angle: 10   Power: 5"), get(game("label"), "text"));
cannon.attrs.set("aim", 60); cannon.attrs.set("power", 18); game("target").attrs.set("x", 2000);
tap("space"); frames(0);
const cannonball = one("Ball");
check("space fires along the barrel", Math.abs(get(cannonball, "speedX") - 18 * Math.cos(Math.PI / 3)) < 1e-6, get(cannonball, "speedX"));
const flight = [];
frames(200, () => { if (cannonball.__alive) flight.push(get(cannonball, "y")); });
const top = Math.max(...flight);
check("gravity bends it into a curve, and it is gone when it lands", top > -100 && flight.indexOf(top) > 5 && flight.indexOf(top) < flight.length - 5 && !cannonball.__alive && all("Ball").length === 0, [top, flight.length]);
game("target").attrs.set("x", 200);
tap("space"); frames(10);
game("target").attrs.set("x", get(one("Ball"), "x")); game("target").attrs.set("y", get(one("Ball"), "y")); frames(2);
check("a hit scores, and the target moves", game("score") === 1 && all("Ball").length === 0 && get(game("label"), "text").endsWith("Hits: 1"), game("score"));
ran("Cannon Arc");

console.log("\nEnemy Waves");
play(byId["enemy-waves"]);
frames(5);
check("wave 1 has three enemies", game("wave") === 1 && all("Enemy").length === 3 && get(game("label"), "text") === "Wave 1", [game("wave"), all("Enemy").length]);
const player = one("Player");
const target = one("Enemy");
for (const each of all("Enemy")) each.attrs.set("speedX", 0);
target.attrs.set("x", get(player, "x")); target.attrs.set("y", 0);
for (const each of all("Enemy")) if (each !== target) each.attrs.set("x", get(player, "x") + 300);
tap("space"); frames(40);
check("a shot destroys the enemy it hits, and itself", all("Enemy").length === 2 && all("Shot").length === 0);
player.attrs.set("x", -500); tap("space"); frames(60);
check("a shot that misses is gone when it leaves the screen", all("Shot").length === 0 && all("Enemy").length === 2);
for (const each of all("Enemy")) Engine.destroy(each);
frames(6);
check("clearing a wave brings the next, with one more enemy", game("wave") === 2 && all("Enemy").length === 4 && get(game("label"), "text") === "Wave 2", [game("wave"), all("Enemy").length]);
for (const each of all("Enemy")) Engine.destroy(each);
frames(7);
check("and the next", game("wave") === 3 && all("Enemy").length === 5);
hold("right"); frames(300); release("right"); frames(1);
check("the player stays on the screen", get(player, "x") <= 616);
ran("Enemy Waves");

console.log(bad ? `\n${bad} failed` : "\nall green");
process.exit(bad ? 1 : 0);
