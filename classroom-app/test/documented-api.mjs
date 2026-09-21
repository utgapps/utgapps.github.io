/* Hold the game preview to PixelPAD's own documentation.

   A child in this class is taught from https://pixelpad.io/docs, and copies
   lines out of it. Every name in there is a promise: type it and the game
   does the thing the page says. Our engine is a rewrite - it runs in the
   classroom editor with no network and no pixelpad.io account - so the only
   thing keeping that promise is a list, and a list nobody checks is a list
   that drifts. draw_ellipse was documented for years and was never here;
   text(t, x, y) took the x and the y and threw them away. Neither looked
   broken. Both left a child staring at a page that lied to them.

   So this boots the real engine - the cut the preview frame runs, not a
   description of it - in a stub browser, runs Python through it, and asks
   for what the documentation says happens. Where we deliberately differ,
   the difference is listed below WITH its reason and is checked too: an
   offline preview cannot reach a multiplayer server, and saying so in one
   sentence is the behaviour, not a gap.

       node test/documented-api.mjs

   When pixelpad.io documents something new, add it here first and watch it
   go red.
*/
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

/* ---------------------------------------------------------------- *
 * A browser, in the smallest amount that lets the engine run.       *
 * The 2D context records what it was asked to draw, because some of *
 * the documentation is about what ends up on the canvas.            *
 * ---------------------------------------------------------------- */
function stubBrowser() {
  const drawn = [];
  const context = () => new Proxy({}, {
    get(target, key) {
      if (key === "canvas") return { width: 1280, height: 720 };
      if (key === "measureText") return (t) => ({ width: String(t).length * 8, fontBoundingBoxAscent: 10, fontBoundingBoxDescent: 3 });
      if (key in target) return target[key];
      return (...args) => { drawn.push({ call: String(key), args }); };
    },
    set(target, key, value) { drawn.push({ set: String(key), value }); target[key] = value; return true; },
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
    drawn,
    document: {
      createElement: element, getElementById: element, querySelector: element,
      addEventListener() {}, body: element(),
    },
    window: { devicePixelRatio: 1, addEventListener() {}, removeEventListener() {} },
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
      get length() { return store.size; },
      key: (i) => [...store.keys()][i],
    },
  };
}

/* The engine is a classic script: everything in it is top level. Wrapping it
   in a function body makes those names locals, and the tail hands back the
   few the preview frame itself uses. */
function boot() {
  const source = readFileSync(here + "../src/lib/pixelpad-engine.js", "utf8");
  const stub = stubBrowser();
  const make = new Function(
    "document", "window", "localStorage", "performance", "requestAnimationFrame", "cancelAnimationFrame",
    source + "\n;return { Engine: Engine, INTERP: INTERP, PyError: PyError, PyObj: PyObj, str: str };");
  const engine = make(stub.document, stub.window, stub.localStorage,
                      { now: () => Date.now() }, () => 0, () => {});
  /* the preview frame hands the engine its stage; so does this */
  const stage = stub.document.createElement("canvas");
  engine.Engine.canvas = stage;
  engine.Engine.ctx = stage.getContext("2d");
  return { ...engine, drawn: stub.drawn };
}

const E = boot();

/* Run one Python program as the Game's start(), and hand back what it
   printed, what went wrong, and the game object it hung its answers on. */
function run(code, extra = {}) {
  const out = [];
  const errors = [];
  E.Engine.onError = (where, err) => errors.push(where + ": " + err.message);
  const project = {
    name: "test",
    classes: [{ name: "Game", isGame: true, start: code, loop: "" },
              ...(extra.classes || [])],
    rooms: extra.rooms || [], sprites: [], sounds: [], functions: extra.functions || [],
  };
  E.Engine.start(project, (s) => out.push(s));
  return { out: out.join(""), errors, game: E.Engine.gameObj, engine: E.Engine };
}

/* `answer` is whatever the program leaves on game.answer. Anything that
   raised is a failure with its own message, which is far more useful than
   "expected 100, got None". */
function ask(label, code, want) {
  const got = run(code);
  if (got.errors.length) return check(label, false, got.errors[0]);
  const answer = got.game.attrs.get("answer");
  const shown = answer === undefined ? "nothing" : E.str(answer);
  check(label, want(answer, got), "the game answered " + shown +
        (got.out ? ", and printed " + JSON.stringify(got.out.trim()) : ""));
}

/* ================================================================ *
 * 1. Every name the documentation defines is a name a game can call *
 * ================================================================ */
console.log("\nnames the documentation defines");

const DOCUMENTED = {
  objects: ["new_object", "destroy"],
  sprites: ["sprite", "get_bounds", "get_width", "get_height"],
  animation: ["animation", "set_animation"],
  sounds: ["sound", "play_sound", "loop_sound", "stop_sound", "set_volume"],
  rooms: ["set_room", "get_room"],
  input: ["key_is_pressed", "key_was_pressed", "key_was_released",
          "mouse_is_pressed", "mouse_was_pressed", "mouse_x", "mouse_y"],
  collision: ["get_collision", "get_collision_list"],
  camera: ["move_camera", "set_camera", "camera_x", "camera_y", "zoom_camera"],
  fps: ["get_fps"],
  text: ["text"],
  graphics: ["draw_rectangle", "draw_ellipse", "draw_polygon", "draw_arc", "draw_line"],
  filters: ["add_filter", "remove_filter",
            "new_adjustment_filter", "new_adv_bloom_filter", "new_ascii_filter",
            "new_bevel_filter", "new_bulge_pinch_filter", "new_color_map_filter",
            "new_color_replace_filter", "new_convolution_filter", "new_cross_hatch_filter",
            "new_crt_filter", "new_dot_filter", "new_drop_shadow_filter", "new_emboss_filter",
            "new_glitch_filter", "new_glow_filter", "new_godray_filter",
            "new_kawase_blur_filter", "new_motion_blur_filter", "new_multicolor_replace_filter",
            "new_old_film_filter", "new_outline_filter", "new_pixelate_filter",
            "new_radial_blur_filter", "new_reflection_filter", "new_rgb_split_filter",
            "new_shockwave_filter", "new_simple_lightmap_filter", "new_tilt_shift_filter",
            "new_twist_filter", "new_zoom_blur_filter"],
  multiplayer: ["init_multiplayer", "create_server", "join_server", "inspect_server",
                "get_server_event", "send_message", "get_messages", "get_player_count",
                "leave_server", "get_servers"],
  ai: ["prompt_ai", "poll_ai"],
};

run("");   /* installs the API into the globals */
for (const [section, names] of Object.entries(DOCUMENTED)) {
  const missing = names.filter((name) => !E.INTERP.globals.has(name));
  check("the " + section + " section: " + names.length + " name" + (names.length === 1 ? "" : "s"),
        missing.length === 0,
        "documented at https://pixelpad.io/docs/?c=" + section + " and not here: " + missing.join(", "));
}

/* ================================================================ *
 * 2. What the documentation says those names DO                     *
 * ================================================================ */
console.log("\nwhat the documentation says happens");

ask("text(t, x, y) puts the words where it was asked to",
    'label = text("hi", 120, -40)\ngame.answer = [label.x, label.y]',
    (a) => Array.isArray(a) && a[0] === 120 && a[1] === -40);

ask("a text object starts in Roboto and can be given another font",
    'label = text("hi", 0, 0)\nfirst = label.fontFamily\nlabel.fontFamily = "Rubik"\ngame.answer = [first, label.fontFamily]',
    (a) => Array.isArray(a) && a[0] === "Roboto" && a[1] === "Rubik");

ask("the text properties in the table are all there",
    'label = text("hi", 0, 0)\n' +
    'label.scaleX = 2\nlabel.scaleY = 2\nlabel.skewX = 45\nlabel.skewY = 45\n' +
    'label.z = 10\nlabel.visible = False\nlabel.angle = 45\nlabel.fontSize = 16\n' +
    'label.color = "#fff"\nlabel.persistent = True\nlabel.halign = "center"\nlabel.valign = "top"\n' +
    'game.answer = [label.scaleX, label.skewX, label.fontSize, label.halign]',
    (a) => Array.isArray(a) && a[0] === 2 && a[1] === 45 && a[2] === 16 && a[3] === "center");

ask("every draw function hands back a graphic you can move",
    'shapes = [draw_rectangle(0, 0, 10, 10, 2, 0xFF0000, 0x00FF00),\n' +
    '          draw_ellipse(0, 0, 20, 10, 2, 0xFF0000, 0x00FF00),\n' +
    '          draw_polygon([[0, 0], [10, 0], [5, 8]], 2, 0xFF0000, 0x00FF00),\n' +
    '          draw_arc(0, 0, 30, 0, 90, 2, 0xFF0000),\n' +
    '          draw_line(0, 0, 10, 10, 2, 0xFF0000)]\n' +
    /* Read every property first: a shape that only grows an x when one is
       assigned is not a shape you can move, it is a shape you can label. */
    'moved = []\n' +
    'for s in shapes:\n' +
    '    start = [s.x, s.y, s.z, s.angle, s.alpha, s.visible, s.scaleX, s.scaleY]\n' +
    '    s.x = 100\n    s.y = 50\n    s.z = 1000\n    s.angle = 45\n    s.alpha = 0.5\n' +
    '    s.visible = False\n    s.scaleX = 2\n    s.scaleY = 2\n' +
    '    moved.append([start, s.x, s.z])\n' +
    'game.answer = moved',
    (a) => Array.isArray(a) && a.length === 5 && a.every(([start, x, z]) =>
      x === 100 && z === 1000 &&
      JSON.stringify(start) === JSON.stringify([0, 0, 0, 0, 1, true, 1, 1])));

ask("destroy() takes a graphic away, the way it takes an object away",
    'box = draw_rectangle(0, 0, 10, 10, 2, 0xFF0000, 0x00FF00)\n' +
    'draw_line(0, 0, 10, 10, 2, 0xFF0000)\n' +
    'destroy(box)\n' +
    'game.answer = "gone"',
    (a, got) => a === "gone" && got.engine.graphics.length === 1);

ask("get_collision() answers False when nothing is touching",
    'game.answer = get_collision(text("x", 0, 0), "Nothing")',
    (a) => a === false);

ask("get_collision() can be pointed at one particular object",
    'a = text("a", 0, 0)\nb = text("b", 0, 0)\nc = text("c", 900, 900)\n' +
    'game.answer = [get_collision(a, b) is b, get_collision(a, c)]',
    (a) => Array.isArray(a) && a[0] === true && a[1] === false);

/* Nothing a filter does is visible on this canvas, so the only honest place
   to look is the object itself. Two are put on and one taken off, because an
   add_filter that quietly kept nothing and a remove_filter that quietly
   removed nothing would agree with each other and with a single count. */
const filtersOn = (got) => (got.engine.objects.find((o) => o.__filters) || {}).__filters || new Map();

ask("a filter can be made, added and removed",
    'glow = new_glow_filter({"distance": 15, "outerStrength": 2})\n' +
    'blur = new_kawase_blur_filter()\n' +
    'label = text("hi", 0, 0)\n' +
    'first = add_filter(label, glow)\n' +
    'second = add_filter(label, blur)\n' +
    'remove_filter(label, first)\n' +
    'game.answer = [first, second]',
    (a, got) => {
      const kept = filtersOn(got);
      return Array.isArray(a) && a[0] > 0 && a[1] > 0 && a[0] !== a[1] &&
             kept.size === 1 && kept.get(a[1]) && kept.get(a[1]).kind === "kawase_blur";
    });

ask("camera_x() and camera_y() are the camera's own two numbers",
    'set_camera(40, -20)\ngame.answer = [camera_x(), camera_y()]',
    (a) => Array.isArray(a) && a[0] === 40 && a[1] === -20);

ask("prompt_ai() asks without stopping the game, and poll_ai() is a string",
    /* Asking again replaces the question, which is the part a game loop
       depends on - poll_ai() has to be about the last thing that was asked
       and not about the first thing that ever was. */
    'before = poll_ai()\n' +
    'prompt_ai("who are you?", "Guard")\nfirst = poll_ai()\n' +
    'prompt_ai("and you?", "Wizard")\n' +
    'game.answer = [before, first, poll_ai()]',
    (a) => Array.isArray(a) && a[0] === "" &&
           /Guard/.test(a[1]) && /Wizard/.test(a[2]) && !/Guard/.test(a[2]));

/* ================================================================ *
 * 2b. And the frame actually gets painted                           *
 * ================================================================ *
 * Everything above asks the game a question. A renderer that threw on the
 * first shape would leave every one of those answers correct and the screen
 * black, so this section paints a frame and reads what the canvas was told. */
console.log("\nwhat reaches the canvas");

function paint(code) {
  const from = E.drawn.length;
  const got = run(code);
  if (!got.errors.length) E.Engine.render();
  return { ...got, calls: E.drawn.slice(from).filter((c) => c.call).map((c) => c.call) };
}

{
  const p = paint('draw_rectangle(0, 0, 10, 10, 2, 0xFF0000, 0x00FF00)\n' +
                  'draw_ellipse(0, 0, 20, 10, 2, 0xFF0000, 0x00FF00)\n' +
                  'draw_polygon([[0, 0], [10, 0], [5, 8]], 2, 0xFF0000, 0x00FF00)\n' +
                  'draw_arc(0, 0, 30, 0, 90, 2, 0xFF0000)\n' +
                  'draw_line(0, 0, 10, 10, 2, 0xFF0000)\n' +
                  'text("hi", 0, 0)');
  const drew = (name) => p.calls.filter((c) => c === name).length;
  check("every shape the documentation lists reaches the canvas",
        !p.errors.length && drew("rect") === 1 && drew("ellipse") === 1 &&
        drew("arc") === 1 && drew("closePath") === 1 && drew("fillText") === 1 &&
        drew("stroke") === 5,
        p.errors[0] || "the canvas was told: " + [...new Set(p.calls)].join(", "));

  /* draw_arc and draw_line are documented without a fill colour, and a shape
     nobody asked to fill must not quietly pick one up from a default. */
  check("a shape given no fill colour is not filled in",
        drew("fill") === 3,
        "three of the five shapes were given a fill, but " + drew("fill") + " were painted");
}

{
  const behind = paint('t = text("hi", 0, 0)\ng = draw_rectangle(0, 0, 10, 10, 2, 0xFF0000, 0x00FF00)\ng.z = -5');
  const front = paint('t = text("hi", 0, 0)\ng = draw_rectangle(0, 0, 10, 10, 2, 0xFF0000, 0x00FF00)\ng.z = 5');
  const order = (p) => p.calls.indexOf("rect") < p.calls.indexOf("fillText");
  check("a graphic's z decides what it sits behind, the way an object's does",
        !behind.errors.length && !front.errors.length && order(behind) && !order(front),
        behind.errors[0] || front.errors[0] ||
        "a shape sent behind the words was painted " + (order(behind) ? "first" : "last") +
        " and one sent in front was painted " + (order(front) ? "first" : "last"));
}

/* The two places we knowingly differ from the page. Both are checked, because
   an offline preview that quietly did nothing here would be worse than one
   that says why - a child would be left thinking their code was wrong. */
console.log("\nwhere the preview cannot do what the page says, and says so");

ask("a multiplayer game says it needs a server rather than failing as a typo",
    'try:\n    create_server(4)\n    game.answer = "no complaint"\nexcept Exception as err:\n    game.answer = str(err)',
    (a) => typeof a === "string" && /server/i.test(a) && !/not defined/.test(a));

ask("the AI answer says the preview cannot reach it, in a sentence a child can read",
    'prompt_ai("hello")\ngame.answer = poll_ai()',
    (a) => typeof a === "string" && /preview|offline|pixelpad\.io/i.test(a));

/* ================================================================ *
 * 3. The editor suggests the documented spellings                   *
 * ================================================================ */
console.log("\nwhat the editor offers while a child types");

const api = readFileSync(here + "../src/lib/pixelpad-api.ts", "utf8");
const suggested = new Set([...api.matchAll(/'([^']+)'/g)].map((m) => m[1]));
const everyName = Object.values(DOCUMENTED).flat();
const unsuggested = everyName.filter((name) => !suggested.has(name));
check("every documented function is a suggestion too", unsuggested.length === 0,
      "typed by a child reading the docs and not offered: " + unsuggested.join(", "));

const ATTRS = ["x", "y", "z", "sprite", "scaleX", "scaleY", "skewX", "skewY",
               "angle", "visible", "alpha", "persistent",
               "text", "fontSize", "fontFamily", "color", "halign", "valign"];
const unlisted = ATTRS.filter((name) => !suggested.has(name));
check("every documented property is a suggestion too", unlisted.length === 0,
      "not offered after a dot: " + unlisted.join(", "));

console.log(bad ? `\n${bad} problem(s)` : "\nthe preview does what pixelpad.io documents");
process.exit(bad ? 1 : 0);
