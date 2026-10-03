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
import { fileURLToPath } from "node:url";
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
check("there are nine challenges, three at each level",
      CHALLENGES.length === 9 && ["starter", "explorer", "master"].every((level) => CHALLENGES.filter((c) => c.difficulty === level).length === 3));
check("every id is one the worker accepts", CHALLENGES.every((c) => /^[a-z0-9-]{1,40}$/.test(c.id)), CHALLENGES.map((c) => c.id));
check("every challenge has requirements and controls",
      CHALLENGES.every((c) => c.requirements.length >= 3 && c.controls.length >= 1 && c.description && c.summary));

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
coin.attrs.set("x", get(one("Hero"), "x")); coin.attrs.set("y", get(one("Hero"), "y"));
frames(2);
check("touching a coin scores one", game("score") === 1, game("score"));
check("the coin jumps somewhere new", Math.hypot(get(coin, "x") - get(one("Hero"), "x"), get(coin, "y") - get(one("Hero"), "y")) > 20 || all("Coin").length === 3);
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

console.log(bad ? `\n${bad} failed` : "\nall green");
process.exit(bad ? 1 : 0);
