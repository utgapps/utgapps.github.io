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

import { useEffect, useMemo, useRef, useState } from "react";
import ENGINE from "./pixelpad-engine.js?raw";
import { ICONS } from "./pixelpad-icons";

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
/** A sound is a name and a link to the file. Unlike a picture it has no
 *  stand-in to build against - there is no "green" for a noise - so a sound
 *  in a game is always one the student put there. */
export type Sound = { name: string; source: string };
export type Manifest = { rooms: string[]; sprites: Sprite[]; sounds: Sound[]; problems: string[] };

/** game.txt: one instruction a line, `#` starts a comment.
 *
 *      room Play
 *      sprite monster.png green 48 48
 *      sound jump.mp3 https://...
 *
 *  Deliberately not JSON. An eight-year-old can add a line here; a misplaced
 *  brace or a trailing comma in JSON is a dead game with a cryptic message. */
export function parseManifest(text: string): Manifest {
  const rooms: string[] = [];
  const sprites: Sprite[] = [];
  const sounds: Sound[] = [];
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
    } else if (word === "sound") {
      // The + next to Sounds writes this line. A link to a sound is a long
      // signed address that nobody should be copying by hand, but it is
      // still a line in a file a child can read, delete and ask about.
      if (rest.length !== 2) {
        problems.push(where + ': write "sound", a name and a link, like "sound jump.mp3 https://...". ' +
          "Press + next to Sounds and this line writes itself.");
        return;
      }
      const [name, source] = rest;
      if (!isLink(source)) {
        problems.push(where + ': "' + source + '" is not a link to a sound file. ' +
          "Press + next to Sounds to add one, and it goes to your own media.");
        return;
      }
      sounds.push({ name, source });
    } else {
      problems.push(where + ': I do not understand "' + word + '". A line starts with "room", "sprite" or "sound".');
    }
  });
  return { rooms, sprites, sounds, problems };
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
  /** Every sound the game can play, as the bytes of the file in base64.
   *  Bytes rather than links: the preview frame is sandboxed, so it has no
   *  origin of its own, and the classroom server will not let a request
   *  from nowhere read the reply - even though the student is signed in.
   *  The page around the frame does the asking and hands the bytes down. */
  sounds: Record<string, string>;
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
/** @param audio each sound by name, as a data URI - see useGameAudio. */
export function assembleGame(files: Record<string, string>, audio: Record<string, string> = {}):
    { config: GameConfig; problems: string[] } {
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

  /* A sound the page has not fetched yet is not a broken game, it is a game
     that started a second too early - so this says what the engine will do
     about it rather than refusing to run. What the engine does about a sound
     it has never heard of is to make one of its own instead. */
  const sounds: Record<string, string> = {};
  for (const sound of manifest.sounds) {
    const uri = audio[sound.name];
    if (!uri) {
      problems.push('The sound "' + sound.name + '" has not arrived yet, so play_sound("' + sound.name +
        '") makes the built-in blip for now. Press PLAY again in a moment.');
      continue;
    }
    sounds[sound.name] = uri.slice(uri.indexOf(",") + 1);
  }

  /* By name, so a game runs the same way twice. Object key order would hand
     the engine whichever function happened to be created first. */
  functions.sort((a, b) => a.name.localeCompare(b.name));

  return { config: { textures, sounds, start, loop, classes, rooms, functions }, problems };
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
  "html,body{margin:0;height:100%;overflow:hidden;background:#343A40}" +
  "#canvasContainer{display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#343A40}" +
  "#debugContainer{margin:auto;position:relative;max-width:100%;max-height:100%}" +
  "#stage{display:block;margin:auto;outline:none;touch-action:none;image-rendering:auto;background:#000}" +
  "#debugPanel{width:100%;height:30px;background:#2F1C40;display:none;align-items:center;padding:0 2px}" +
  "#debugPanel.on{display:flex}" +
  ".debugButton{width:25px;height:25px;background:#6D399F;color:#fff;margin-left:2px;margin-right:2px;" +
  "display:flex;align-items:center;justify-content:center;border-radius:2.8px;cursor:pointer;border:0;padding:0}" +
  ".debugButton.on{background:#17A2B8}" +
  "svg.i{width:1em;height:1em;fill:currentColor;vertical-align:-.125em;flex:none}" +
  '#debugReadout{margin-left:auto;padding-right:7px;font:11px Rubik,"Segoe UI",system-ui,sans-serif;' +
  "color:#fff;opacity:.8;white-space:nowrap}" +
  "#output{display:none}";

/* The bar itself. Four switches, each one a single Engine field, in the order
   the offline IDE puts them: what the game thinks is happening, what one thing
   is holding, hold still, and where the middle of the screen is. */
const glyph = (name: string) => '<svg class="i" viewBox="0 0 16 16">' + (ICONS[name] || "") + "</svg>";

const DEBUG_BAR =
  '<div id="debugPanel">' +
  '<button class="debugButton" id="generalDebug" title="Show what the game is doing">' + glyph("info") + "</button>" +
  '<button class="debugButton" id="objectDebug" title="Click a thing to look inside it">' + glyph("hand") + "</button>" +
  '<button class="debugButton" id="pauseDebug" title="Freeze the game">' + glyph("pause") + "</button>" +
  '<button class="debugButton" id="rulerDebug" title="Show the grid">' + glyph("ruler") + "</button>" +
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
"  /* Sounds arrive as bytes and are decoded here rather than fetched: a frame\n" +
"     with no origin of its own cannot read a reply from the classroom server,\n" +
"     and the page outside has already done the asking. Until a decode\n" +
"     finishes the engine does what it does for a sound it has never heard of,\n" +
"     which is to make one of its own instead - so an early play_sound() is a\n" +
"     different noise rather than silence. */\n" +
"  var actx = audioCtx();\n" +
"  Object.keys(CONFIG.sounds).forEach(function (name) {\n" +
"    SOUNDS.set(name, { data: null, buffer: null });\n" +
"    if (!actx) return;\n" +
"    var raw = atob(CONFIG.sounds[name]);\n" +
"    var bytes = new Uint8Array(raw.length);\n" +
"    for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);\n" +
"    actx.decodeAudioData(bytes.buffer, function (buffer) {\n" +
"      var entry = SOUNDS.get(name);\n" +
"      if (entry) entry.buffer = buffer;\n" +
"    }, function () { post(\"error\", 'The sound \"' + name + '\" would not play. Is it really a sound file?'); });\n" +
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
"    el(\"debugReadout\").textContent = Engine.running ? Engine.fps + \" fps \\u00b7 \" + Engine.objects.length + \" objs\" : \"\";\n" +
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
export function buildGamePreview(files: Record<string, string>, nonce: string,
                                 audio: Record<string, string> = {}): string {
  const { config, problems } = assembleGame(files, audio);
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


/** Every sound a project names, fetched once and kept as a data URI.
 *
 *  A picture reaches the preview frame as a link, because an <img> may load a
 *  picture from anywhere. A sound may not: the engine needs the samples, which
 *  means reading the bytes, which the classroom server allows only to a page
 *  it recognises. The preview frame is sandboxed and so has no origin at all -
 *  it is nobody - and a game that asks for its own sound would be refused.
 *
 *  So the page asks, and hands the bytes down. It also means a sound is
 *  fetched once no matter how many times a child presses PLAY.
 */
export function useGameAudio(files: Record<string, string>): Record<string, string> {
  const manifest = files[MANIFEST_FILE] ?? "";
  const sounds = useMemo(() => parseManifest(manifest).sounds, [manifest]);
  /* By link rather than by name: renaming a sound must not fetch it again,
     and two names for one file are one download. */
  const cache = useRef<Record<string, string>>({});
  const [arrived, setArrived] = useState(0);

  useEffect(() => {
    let dropped = false;
    const missing = sounds.filter((sound) => !(sound.source in cache.current));
    if (!missing.length) return;
    void (async () => {
      for (const sound of missing) {
        /* A sound that will not come is remembered as one that will not come.
           Retrying every render would be a request a second, for ever. */
        let uri = "";
        try {
          const reply = await fetch(sound.source);
          if (reply.ok) uri = await asDataUri(await reply.blob());
        } catch { uri = ""; }
        if (dropped) return;
        cache.current[sound.source] = uri;
        setArrived((n) => n + 1);
      }
    })();
    return () => { dropped = true; };
  }, [sounds]);

  return useMemo(() => {
    const out: Record<string, string> = {};
    for (const sound of sounds) {
      const uri = cache.current[sound.source];
      if (uri) out[sound.name] = uri;
    }
    return out;
  }, [sounds, arrived]);
}

function asDataUri(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("unreadable"));
    reader.readAsDataURL(blob);
  });
}


/* ---------- .pp2d ---------------------------------------------------------

   The file pixelpad.io itself reads and writes, so a game made here opens
   there and a game made there opens here. Its shape, verified against a live
   export and mirrored in vendor/pixelpad-offline.html:

     { "pythonAssets": {
         "script":   [ {"Game": {"type":"game script",    "start":"", "loop":""}} ],
         "room":     [ {"Play": {"type":"room script",    "start":"", "loop":""}} ],
         "texture":  [ {"a.png": {"type":"image", "uri":"..."}} ],
         "sound":    [ {"a.wav": {"type":"audio", "uri":"..."}} ],
         "function": [ {"helpers.py": {"type":"function script", "head":""}} ]
     } }

   Every entry is a one-key object, and a folder is the same shape with an
   array for its value - so folders flatten on the way in and keep what is in
   them. */

type Pp2dDef = { type?: string; start?: string; loop?: string; head?: string; uri?: string };
type Pp2dEntry = Record<string, Pp2dDef>;

/** A plain colour as a picture, for a project that leaves this IDE. game.txt
 *  can say "green"; a .pp2d has nowhere to put that, only a uri. */
function colourUri(rgb: [number, number, number], width: number, height: number): string {
  return "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
    '<rect width="100%" height="100%" fill="rgb(' + rgb.join(",") + ')"/></svg>');
}

/** This project as a .pp2d document. */
export function toPp2d(files: Record<string, string>): string {
  const manifest = parseManifest(files[MANIFEST_FILE] ?? "");
  const panels = new Map<string, Panels>();
  const functions: Pp2dEntry[] = [];
  for (const path of Object.keys(files).sort()) {
    const shared = functionOf(path);
    if (shared) { functions.push({ [shared + ".py"]: { type: "function script", head: files[path] ?? "" } }); continue; }
    const panel = panelOf(path);
    if (!panel) continue;
    const both = panels.get(panel.asset) ?? { start: "", loop: "" };
    both[panel.tab] = files[path] ?? "";
    panels.set(panel.asset, both);
  }
  const script: Pp2dEntry[] = [];
  const room: Pp2dEntry[] = [];
  for (const [name, both] of panels) {
    if (manifest.rooms.includes(name)) room.push({ [name]: { type: "room script", start: both.start, loop: both.loop } });
    else script.push({ [name]: { type: name === "Game" ? "game script" : "object script", start: both.start, loop: both.loop } });
  }
  /* The game script leads, as it does in a live export. */
  script.sort((a, b) => Number(Object.values(b)[0].type === "game script") - Number(Object.values(a)[0].type === "game script"));
  const texture: Pp2dEntry[] = manifest.sprites.map((sprite) => ({
    [sprite.name]: {
      type: "image",
      uri: isLink(sprite.source) ? sprite.source : colourUri(RGB[sprite.source], sprite.width, sprite.height),
    },
  }));
  const sound: Pp2dEntry[] = manifest.sounds.map((entry) => ({
    [entry.name]: { type: "audio", uri: entry.source },
  }));
  return JSON.stringify({ pythonAssets: { script, room, texture, sound, function: functions } });
}

function walkPp2d(list: unknown, out: { name: string; def: Pp2dDef }[] = []): { name: string; def: Pp2dDef }[] {
  if (!Array.isArray(list)) return out;
  for (const entry of list) {
    if (!entry || typeof entry !== "object") continue;
    for (const name of Object.keys(entry)) {
      const value = (entry as Record<string, unknown>)[name];
      if (Array.isArray(value)) walkPp2d(value, out);                       // a folder
      else if (value && typeof value === "object") out.push({ name, def: value as Pp2dDef });
    }
  }
  return out;
}

/** A .pp2d document as files this editor can open. Anything it cannot bring
 *  across is said out loud rather than dropped quietly. */
export function fromPp2d(text: string): { files: Record<string, string>; notes: string[] } {
  let data: unknown;
  try { data = JSON.parse(text); }
  catch { throw new Error("That file is not a .pp2d - a .pp2d is JSON, and this would not parse."); }
  const holder = data as { pythonAssets?: unknown };
  const assets = (holder && holder.pythonAssets ? holder.pythonAssets : data) as Record<string, unknown>;
  if (!assets || typeof assets !== "object") throw new Error("That file has no pythonAssets section, so it is not a .pp2d.");
  const scripts = walkPp2d(assets.script);
  if (!scripts.length) throw new Error("There are no scripts in that file.");

  const files: Record<string, string> = {};
  const notes: string[] = [];
  const rooms: string[] = [];
  const sprites: string[] = [];

  const asPanels = (name: string, def: Pp2dDef) => {
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) { notes.push('Skipped "' + name + '": a name has to be letters and numbers.'); return false; }
    files[name + ".start.py"] = def.start ?? "";
    if ((def.loop ?? "").trim()) files[name + ".loop.py"] = def.loop as string;
    return true;
  };
  for (const { name, def } of scripts) asPanels(name, def);
  for (const { name, def } of walkPp2d(assets.room)) if (asPanels(name, def)) rooms.push(name);
  for (const { name, def } of walkPp2d(assets.function)) {
    const clean = name.replace(/\.py$/, "");
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(clean)) { notes.push('Skipped the function "' + name + '": a name has to be letters and numbers.'); continue; }
    files[clean + ".fn.py"] = def.head ?? "";
  }
  /* A picture's size is not in a .pp2d - the engine measures the real thing
     every frame, so the numbers here only decide how big a plain colour is. */
  for (const { name, def } of walkPp2d(assets.texture)) {
    const uri = def.uri ?? "";
    if (!uri) { notes.push('The picture "' + name + '" had no image in it, so it came across as a green square.'); }
    if (/\s/.test(name)) { notes.push('Skipped the picture "' + name + '": a name cannot have a space in it.'); continue; }
    sprites.push("sprite " + name + " " + (uri && isLink(uri) ? uri : "green") + " 48 48");
  }
  /* A sound could be a link to somewhere that will not let this page read
     it, or a megabyte of base64 that would fill game.txt - and a sound has to
     live in the student's own media to survive the next laptop anyway. So it
     stays behind, and the note says exactly what to do about it. */
  for (const { name } of walkPp2d(assets.sound)) {
    notes.push('The sound "' + name + '" stayed behind. Add it again with + next to Sounds and it goes to your own media.');
  }

  files[MANIFEST_FILE] =
    "# This file tells the game about your screens, your pictures and your sounds.\n" +
    "# Anything after a # is a note to yourself - the game ignores it.\n" +
    (rooms.length ? "\n# A room is one screen.\n" + rooms.map((name) => "room " + name).join("\n") + "\n" : "") +
    (sprites.length ? "\n# A picture: its name, a colour or a link, how wide, how tall.\n" + sprites.join("\n") + "\n" : "");
  return { files, notes };
}
