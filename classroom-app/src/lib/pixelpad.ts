// Builds and runs a PixelPad game project.
//
// PixelPad (https://pixelpad.io) is a browser Python 2D engine: every class and
// every room owns a start() that runs once and a loop() that runs every frame.
// This project kind keeps that shape and spells each panel as its own file -
// "Monster.loop.py" - so line numbers start again in every panel and an error
// that says "on line 2" means the second line of the file the student has open.
// Dots, not spaces: the API rejects a path with a space in it.
//
// The engine itself is ours, not a CDN's. src/lib/pixelpad-engine.js is cut out
// of vendor/pixelpad-offline.html by tools/build-engine.mjs and inlined into the
// preview frame, so a game runs with no network at all. That matters in a
// classroom: thirty children press Run in the same minute on a school network
// that may block a CDN outright, and a lesson that a third party's outage can
// cancel is not a lesson you can timetable. It is a clone rather than a wrapper
// - its own tokenizer, parser, evaluator and renderer - written so its error
// text matches the real IDE's word for word.

import ENGINE from "./pixelpad-engine.js?raw";

export const MANIFEST_FILE = "game.txt";
export const GAME_ENTRY = "Game.start.py";

/** "Monster.loop.py" -> { asset: "Monster", tab: "loop" }. A folder is ignored,
 *  so the same panel means the same thing wherever a student drags it. */
const PANEL = /^([A-Za-z][A-Za-z0-9_]*)\.(start|loop)\.py$/;

export function panelOf(path: string): { asset: string; tab: "start" | "loop" } | null {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const match = PANEL.exec(base);
  return match ? { asset: match[1], tab: match[2] as "start" | "loop" } : null;
}

/** "Helpers.fn.py" -> "Helpers". Shared code rather than a thing in the world:
 *  a function file runs once, before any start() does, so a `def` written in
 *  one is callable from every panel. The IDE lists these under Functions. */
const FUNCTION = /^([A-Za-z][A-Za-z0-9_]*)\.fn\.py$/;

export function functionOf(path: string): string | null {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const match = FUNCTION.exec(base);
  return match ? match[1] : null;
}

/** Colour names shared with the PXP101 textbook, so "green, 48 by 48" in the
 *  book and `sprite monster.png green 48 48` here mean the same square. */
export const RGB: Record<string, [number, number, number]> = {
  white: [255, 255, 255], dark: [20, 24, 31], yellow: [244, 208, 63],
  green: [90, 208, 107], red: [230, 75, 75], blue: [74, 163, 255],
  brown: [156, 107, 63], gray: [138, 147, 163], orange: [239, 139, 59],
  purple: [168, 107, 214], dgreen: [47, 107, 58], cyan: [80, 220, 200],
};

export type Sprite = { name: string; source: string; width: number; height: number };
export type Manifest = { rooms: string[]; sprites: Sprite[]; problems: string[] };

/** game.txt: one instruction a line, `#` starts a comment.
 *
 *      room Play
 *      sprite monster.png green 48 48
 *
 *  Deliberately not JSON. An eight-year-old can add a line here; a misplaced
 *  brace or a trailing comma in JSON is a dead game with a cryptic message. */
export function parseManifest(text: string): Manifest {
  const rooms: string[] = [];
  const sprites: Sprite[] = [];
  const problems: string[] = [];
  (text || "").split(/\r?\n/).forEach((raw, index) => {
    const line = raw.split("#")[0].trim();
    if (!line) return;
    const where = MANIFEST_FILE + " line " + (index + 1);
    const parts = line.split(/\s+/);
    const word = parts[0];
    const rest = parts.slice(1);
    if (word === "room") {
      if (rest.length !== 1) { problems.push(where + ': write "room" and one name, like "room Play".'); return; }
      rooms.push(rest[0]);
    } else if (word === "sprite") {
      if (rest.length !== 4) {
        problems.push(where + ': write "sprite", a name, a colour, a width and a height, like "sprite monster.png green 48 48".');
        return;
      }
      const [name, source, width, height] = rest;
      const w = Number(width), h = Number(height);
      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
        problems.push(where + ": the width and the height have to be numbers bigger than zero.");
        return;
      }
      // A colour makes a plain coloured rectangle to build against; a link uses
      // the picture the student actually drew, uploaded from the media panel.
      if (!isLink(source) && !(source in RGB)) {
        problems.push(where + ': "' + source + '" is not a colour I know. Try one of: ' +
          Object.keys(RGB).join(", ") + " - or paste a link to your own picture.");
        return;
      }
      sprites.push({ name, source, width: w, height: h });
    } else {
      problems.push(where + ': I do not understand "' + word + '". A line starts with "room" or "sprite".');
    }
  });
  return { rooms, sprites, problems };
}

function isLink(source: string): boolean {
  return /^(https?:|data:)/i.test(source);
}

/** A solid-colour PNG, as a data URI: the stand-in art a game runs with before
 *  anyone has drawn anything. */
function solidPng(rgb: [number, number, number], width: number, height: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  ctx.fillRect(0, 0, width, height);
  return canvas.toDataURL("image/png");
}

export type Panels = { start: string; loop: string };
export type SharedFunction = { name: string; body: string };
export type GameConfig = {
  textures: Record<string, string>;
  start: string; loop: string;
  classes: Record<string, Panels>;
  rooms: Record<string, Panels>;
  functions: SharedFunction[];
};

/** Panel files + game.txt -> the project the engine runs.
 *
 *  Game is the engine's own globals holder rather than an object in the world,
 *  so its panels are the config's top-level start/loop. Everything else is a
 *  room if game.txt named it one, and a class - a thing you can make many of -
 *  if it did not. */
export function assembleGame(files: Record<string, string>): { config: GameConfig; problems: string[] } {
  const manifest = parseManifest(files[MANIFEST_FILE] ?? "");
  const problems = manifest.problems.slice();
  if (!(MANIFEST_FILE in files)) {
    problems.push("This game has no " + MANIFEST_FILE + ", so it does not know which of your screens is a room. " +
      'Make a file called ' + MANIFEST_FILE + ' with a line like "room Play" in it.');
  }

  const classes: Record<string, Panels> = {};
  const rooms: Record<string, Panels> = {};
  const functions: SharedFunction[] = [];
  let start = "", loop = "", panels = 0;

  for (const path of Object.keys(files)) {
    const shared = functionOf(path);
    if (shared) { functions.push({ name: shared, body: files[path] ?? "" }); continue; }
    const panel = panelOf(path);
    if (!panel) continue;
    panels++;
    const body = files[path] ?? "";
    if (panel.asset === "Game") {
      if (panel.tab === "start") start = body; else loop = body;
      continue;
    }
    const bucket = manifest.rooms.includes(panel.asset) ? rooms : classes;
    if (!bucket[panel.asset]) bucket[panel.asset] = { start: "", loop: "" };
    bucket[panel.asset][panel.tab] = body;
  }

  if (!panels) {
    problems.push('This game has no code panels yet. A panel is a file like "Monster.loop.py" or ' +
      '"Play.start.py" - the name before the first dot is the thing, and start or loop is when it runs.');
  }
  for (const name of manifest.rooms) {
    if (!(name in rooms)) {
      problems.push(MANIFEST_FILE + " says there is a room called " + name +
        ", but there is no " + name + ".start.py to say what is in it.");
    }
  }

  const textures: Record<string, string> = {};
  for (const sprite of manifest.sprites) {
    textures[sprite.name] = isLink(sprite.source)
      ? sprite.source
      : solidPng(RGB[sprite.source], sprite.width, sprite.height);
  }

  /* By name, so a game runs the same way twice. Object key order would hand
     the engine whichever function happened to be created first. */
  functions.sort((a, b) => a.name.localeCompare(b.name));

  return { config: { textures, start, loop, classes, rooms, functions }, problems };
}

/* Console plumbing, injected before the engine loads.
 *
 * print() and Python errors arrive on the callbacks the runner installs, so
 * unlike the CDN build there is nothing to scrape out of the page. This covers
 * the other half: a JavaScript-level failure, which would otherwise leave a
 * black rectangle and no explanation at all. */
function bridge(nonce: string): string {
  return "<script>(function () {\n" +
"  var NONCE = " + JSON.stringify(nonce) + ";\n" +
"  var sent = 0;\n" +
"  /* A game that prints inside loop() prints sixty times a second, so the\n" +
"     console has to stop somewhere. It says so when it does: silently going\n" +
"     quiet reads as the game having crashed. */\n" +
"  window.__utgPost = function (kind, text) {\n" +
"    if (sent > 400) return;\n" +
"    sent++;\n" +
"    if (sent > 400) {\n" +
"      try { parent.postMessage({ __utg: NONCE, kind: \"system\", at: Date.now(),\n" +
"        text: \"That is 400 messages. The rest are hidden - press Stop, or print less often.\" }, \"*\"); } catch (e) {}\n" +
"      return;\n" +
"    }\n" +
"    try { parent.postMessage({ __utg: NONCE, kind: kind, at: Date.now(),\n" +
"      text: String(text).slice(0, 2000) }, \"*\"); } catch (e) {}\n" +
"  };\n" +
"  function say(level, args) {\n" +
"    window.__utgPost(level, Array.prototype.map.call(args, function (a) {\n" +
"      if (a instanceof Error) return a.message;\n" +
"      if (a && typeof a === \"object\") { try { return JSON.stringify(a); } catch (e) { return String(a); } }\n" +
"      return String(a);\n" +
"    }).join(\" \"));\n" +
"  }\n" +
"  [\"log\", \"info\", \"warn\", \"error\"].forEach(function (name) {\n" +
"    var original = console[name];\n" +
"    console[name] = function () { say(name, arguments); if (original) original.apply(console, arguments); };\n" +
"  });\n" +
"  window.addEventListener(\"error\", function (event) {\n" +
"    if (event.message) window.__utgPost(\"error\", event.message);\n" +
"  }, true);\n" +
"  window.addEventListener(\"unhandledrejection\", function (event) {\n" +
"    var reason = event.reason;\n" +
"    window.__utgPost(\"error\", \"Uncaught (in promise) \" + (reason && reason.message ? reason.message : reason));\n" +
"  });\n" +
"})();<\/script>";
}

/* Just the stage. The engine measures itself against #canvasContainer, writes
   its debug readout into #debugPanel and empties #output when a game calls
   clear_console() - all three have to exist. The canvas keeps its 16:9 shape,
   so there is space left over above and below it; that gets painted the page
   colour rather than left white.

   The debug bar is the offline IDE's, colours and metrics included, and stays
   hidden until the app asks for it. It has to live in here: every switch on it
   is a field on the Engine running in this frame. */
const STAGE_CSS =
  "html,body{margin:0;height:100%;overflow:hidden;background:#0f1320}" +
  "#canvasContainer{display:flex;align-items:center;justify-content:center;width:100%;height:100%}" +
  "#debugContainer{margin:auto;position:relative;max-width:100%;max-height:100%}" +
  "#stage{display:block;outline:none}" +
  "#debugPanel{width:100%;height:30px;background:#2f1c40;display:none;align-items:center;padding:0 2px}" +
  "#debugPanel.on{display:flex}" +
  ".debugButton{width:25px;height:25px;margin:0 2px;border:0;border-radius:.2rem;background:#6d399f;color:#fff;" +
  "display:flex;align-items:center;justify-content:center;cursor:pointer;font:700 12px system-ui,sans-serif}" +
  ".debugButton.on{background:#17a2b8}" +
  "#debugReadout{margin-left:auto;padding-right:.5rem;color:#fff;opacity:.8;white-space:nowrap;font:11px system-ui,sans-serif}" +
  "#output{display:none}";

/* The bar itself. Four switches, each one a single Engine field, in the order
   the offline IDE puts them: what the game thinks is happening, what one thing
   is holding, hold still, and where the middle of the screen is. */
const DEBUG_BAR =
  '<div id="debugPanel">' +
  '<button class="debugButton" id="generalDebug" title="Show what the game is doing">i</button>' +
  '<button class="debugButton" id="objectDebug" title="Click a thing to look inside it">\u25ce</button>' +
  '<button class="debugButton" id="pauseDebug" title="Freeze the game">\u275a\u275a</button>' +
  '<button class="debugButton" id="rulerDebug" title="Show the grid">#</button>' +
  '<span id="debugReadout"></span></div>';

/** The script that turns one config into a running game.
 *
 *  It runs after the engine, as a second classic script in the same document,
 *  so the engine's top-level `Engine` and `normKey` are already in scope. */
function runner(config: GameConfig, nonce: string): string {
  return "<script>(function () {\n" +
"  var CONFIG = " + JSON.stringify(config).replaceAll("</script", "<\\/script") + ";\n" +
"  var NONCE = " + JSON.stringify(nonce) + ";\n" +
"  var post = window.__utgPost;\n" +
"  /* A mistake inside a loop() panel is reported again every frame, sixty times\n" +
"     a second, because this engine keeps running exactly as the real one does.\n" +
"     Showing it once, with a count when something else finally happens, keeps\n" +
"     the message that matters on screen instead of scrolling it away. */\n" +
"  var lastLine = null, repeats = 0;\n" +
"  function say(kind, text) {\n" +
"    if (!text || !String(text).trim()) return;\n" +
"    if (text === lastLine) { repeats++; return; }\n" +
"    if (repeats) post(\"system\", \"(the line above happened \" + (repeats + 1) + \" times)\");\n" +
"    lastLine = text;\n" +
"    repeats = 0;\n" +
"    post(kind, text);\n" +
"  }\n" +
"\n" +
"  var stage = document.getElementById(\"stage\");\n" +
"  Engine.canvas = stage;\n" +
"  Engine.ctx = stage.getContext(\"2d\");\n" +
"  /* The real IDE's wording: the bare message, then which panel it came from\n" +
"     and which line inside that panel - which is the file the student has open. */\n" +
"  Engine.onError = function (where, err, isPy) {\n" +
"    say(\"error\", isPy ? err.message + \" in \" + where + \" on line \" + err.line : err.message);\n" +
"  };\n" +
"  Engine.onStop = function () { say(\"system\", \"Your game stopped.\"); };\n" +
"\n" +
"  /* Pictures are handed over undecoded on purpose: the engine reads a sprite's\n" +
"     size live, every frame, so the game starts at once and the art appears as\n" +
"     it arrives rather than the game waiting on it. */\n" +
"  Object.keys(CONFIG.textures).forEach(function (name) {\n" +
"    var img = new Image();\n" +
"    img.onload = function () { if (!Engine.running) Engine.render(); };\n" +
"    img.onerror = function () { post(\"error\", 'The picture \"' + name + '\" would not load.'); };\n" +
"    img.src = CONFIG.textures[name];\n" +
"    Engine.loadSprite(name, img);\n" +
"  });\n" +
"\n" +
"  var project = { classes: [], rooms: [], functions: CONFIG.functions || [], sprites: [], sounds: [] };\n" +
"  project.classes.push({ name: \"Game\", isGame: true, start: CONFIG.start, loop: CONFIG.loop });\n" +
"  Object.keys(CONFIG.classes).forEach(function (name) {\n" +
"    project.classes.push({ name: name, start: CONFIG.classes[name].start, loop: CONFIG.classes[name].loop });\n" +
"  });\n" +
"  Object.keys(CONFIG.rooms).forEach(function (name) {\n" +
"    project.rooms.push({ name: name, start: CONFIG.rooms[name].start, loop: CONFIG.rooms[name].loop });\n" +
"  });\n" +
"\n" +
"  Engine.fit();\n" +
"  var started = Engine.start(project, function (text) { say(\"log\", String(text).replace(/\\n$/, \"\")); });\n" +
"  if (started) post(\"system\", \"Running.\");\n" +
"  else post(\"system\", \"Your game did not start. Fix the mistake above and press Run again.\");\n" +
"  window.addEventListener(\"resize\", function () { Engine.fit(); Engine.render(); });\n" +
"\n" +
"  /* Keyboard and mouse, wired the way the offline IDE wires them: the engine\n" +
"     reads these sets every frame and never listens for itself. */\n" +
"  function keyName(e) {\n" +
"    var k = e.key;\n" +
"    if (k === \" \") return \"space\";\n" +
"    if (k.length === 1) return k.toLowerCase();\n" +
"    return normKey(k);\n" +
"  }\n" +
"  window.addEventListener(\"keydown\", function (e) {\n" +
"    var k = keyName(e);\n" +
"    if (!Engine.keys.has(k)) Engine.keysDown.add(k);\n" +
"    Engine.keys.add(k);\n" +
"    /* Arrows and space scroll a page. In here they are how you play, and there\n" +
"       is nothing to scroll. */\n" +
"    if (Engine.running && [\"space\", \"up\", \"down\", \"left\", \"right\"].indexOf(k) >= 0) e.preventDefault();\n" +
"  });\n" +
"  window.addEventListener(\"keyup\", function (e) {\n" +
"    var k = keyName(e);\n" +
"    Engine.keys.delete(k); Engine.keysUp.add(k);\n" +
"  });\n" +
"  /* Clicking away mid-jump would otherwise leave the key held down for ever. */\n" +
"  window.addEventListener(\"blur\", function () { Engine.keys.clear(); });\n" +
"  stage.addEventListener(\"mousemove\", function (e) {\n" +
"    var w = Engine.s2w(e.clientX, e.clientY);\n" +
"    var r = stage.getBoundingClientRect();\n" +
"    Engine.mouse.x = w[0]; Engine.mouse.y = w[1];\n" +
"    Engine.mouse.sx = (e.clientX - r.left) / r.width * stage.width;\n" +
"    Engine.mouse.sy = (e.clientY - r.top) / r.height * stage.height;\n" +
"    Engine.mouse.over = true;\n" +
"  });\n" +
"  stage.addEventListener(\"mouseleave\", function () { Engine.mouse.over = false; });\n" +
"  stage.addEventListener(\"mousedown\", function (e) {\n" +
"    Engine.mouse.down = true; Engine.mouse.pressed = true;\n" +
"    /* With the inspector on, a click picks the topmost thing under it and the\n" +
"       engine draws what that thing is holding. */\n" +
"    if (Engine.debug.inspect) {\n" +
"      var w = Engine.s2w(e.clientX, e.clientY);\n" +
"      Engine.selected = Engine.objects.slice().reverse().find(function (o) {\n" +
"        var b = Engine.bbox(o);\n" +
"        return w[0] >= b.l && w[0] <= b.r && w[1] >= b.b && w[1] <= b.t;\n" +
"      }) || null;\n" +
"      Engine.render();\n" +
"    }\n" +
"  });\n" +
"  window.addEventListener(\"mouseup\", function () { Engine.mouse.down = false; Engine.mouse.released = true; });\n" +
"\n" +
"  /* The debug bar, wired as the offline IDE wires it. The switch that shows\n" +
"     the bar at all is in the app rather than in here, so a child sees one\n" +
"     Debug button instead of a row of purple squares over every game. */\n" +
"  function el(id) { return document.getElementById(id); }\n" +
"  function syncDebug() {\n" +
"    el(\"generalDebug\").classList.toggle(\"on\", Engine.debug.info);\n" +
"    el(\"objectDebug\").classList.toggle(\"on\", Engine.debug.inspect);\n" +
"    el(\"pauseDebug\").classList.toggle(\"on\", Engine.paused);\n" +
"    el(\"rulerDebug\").classList.toggle(\"on\", Engine.debug.grid);\n" +
"    el(\"debugReadout\").textContent = Engine.running ? Engine.fps + \" fps - \" + Engine.objects.length + \" things\" : \"\";\n" +
"  }\n" +
"  el(\"generalDebug\").onclick = function () { Engine.debug.info = !Engine.debug.info; syncDebug(); Engine.render(); };\n" +
"  el(\"objectDebug\").onclick = function () { Engine.debug.inspect = !Engine.debug.inspect; syncDebug(); Engine.render(); };\n" +
"  el(\"pauseDebug\").onclick = function () { Engine.paused = !Engine.paused; syncDebug(); };\n" +
"  el(\"rulerDebug\").onclick = function () { Engine.debug.grid = !Engine.debug.grid; syncDebug(); Engine.render(); };\n" +
"  setInterval(syncDebug, 500);\n" +
"  window.addEventListener(\"message\", function (event) {\n" +
"    var data = event.data;\n" +
"    if (!data || data.__utg !== NONCE || typeof data.debug !== \"boolean\") return;\n" +
"    Engine.debug.on = data.debug;\n" +
"    if (!data.debug) { Engine.debug.info = Engine.debug.inspect = Engine.debug.grid = false; Engine.paused = false; }\n" +
"    el(\"debugPanel\").classList.toggle(\"on\", data.debug);\n" +
"    syncDebug(); Engine.fit(); Engine.render();\n" +
"  });\n" +
"})();<\/script>";
}

/** The document that runs one game inside the preview frame. */
export function buildGamePreview(files: Record<string, string>, nonce: string): string {
  const { config, problems } = assembleGame(files);
  const complain = problems.length
    ? "<script>" + problems.map((text) => "console.error(" + JSON.stringify(text) + ");").join("") + "<\/script>"
    : "";
  return '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Game preview</title>' +
    "<style>" + STAGE_CSS + "</style>" + bridge(nonce) + complain + "</head>" +
    '<body><div id="canvasContainer"><div id="debugContainer">' + DEBUG_BAR +
    '<canvas id="stage" tabindex="0"></canvas></div></div><pre id="output"></pre>' +
    "<script>\n" + ENGINE.replaceAll("</script", "<\\/script") + "\n<\/script>" +
    runner(config, nonce) +
    "</body></html>";
}
