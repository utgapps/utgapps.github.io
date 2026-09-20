import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent as ReactMouseEvent } from "react";
import * as Y from "yjs";
import type { Awareness } from "y-protocols/awareness";
import { CollabEditor } from "./CollabEditor";
import { docToFiles, fileText, filesMap } from "./lib/collab";
import { MANIFEST_FILE, RGB, buildGamePreview, fromPp2d, functionOf, panelOf, parseManifest, toPp2d, useGameAudio, type Sprite } from "./lib/pixelpad";
import { isPreviewMessage, PREVIEW_ALLOW, PREVIEW_SANDBOX, type PreviewMessage } from "./lib/preview";
import { ICONS } from "./lib/pixelpad-icons";
import { downloadFile } from "./lib/classroom";
import { apiUploadMedia } from "./lib/api";
import { compressAudio, compressImage } from "./lib/media";
import "./pixelpad-ide.css";

/* The PixelPad editor.
 *
 * This is the offline IDE - vendor/pixelpad-offline.html - rather than a
 * screen that resembles it. Its stylesheet and its glyphs are cut out of that
 * file by tools/build-engine.mjs, and the markup below is the markup in it,
 * id for id: #pp-block0 down the left with the things in the game, #pp-block1
 * in the middle with start above and loop below, #pp-block2 on the right with
 * the stage over the console, and two draggable dividers between them. A child
 * who learns one of these two editors has learned the other.
 *
 * What is different is underneath, and none of it shows:
 *
 *   - the project is not in localStorage, it is the shared document. Every
 *     panel is a file in it, so the same code autosaves to the student's
 *     account, syncs to whoever they are sharing with, and appears live on the
 *     teacher's screen. This screen holds no state of its own beyond which
 *     thing is selected - press + and a file appears, because the sidebar is a
 *     view of the files.
 *   - the game runs in a sandboxed frame rather than in this page, so a
 *     runaway loop takes the frame down and not the editor. The debug bar is
 *     inside that frame because every switch on it is a field on the Engine
 *     running there; PLAY, the console and the four toggles are out here.
 *   - a picture or a sound goes to the student's own media on the server,
 *     which is what makes it survive the next laptop they sit down at. The
 *     offline IDE keeps them inside the project file instead, which is why a
 *     project that leaves this editor leaves its sounds behind.
 *
 *       Classes     Monster.start.py  +  Monster.loop.py
 *       Rooms       Play.start.py     +  Play.loop.py      + "room Play" in game.txt
 *       Functions   Helpers.fn.py
 *       Sprites     a "sprite" line in game.txt
 *       Sounds      a "sound" line in game.txt
 *
 * game.txt is bookkeeping and the sidebar does not show it. A project is a bag
 * of named strings, so the one thing panel files cannot say - which of them is
 * a room, and where a picture lives - has to be written down somewhere, and it
 * is written there. Every line in it is machine-written by a + in this sidebar
 * and read back into Rooms, Sprites and Sounds, so the file was a second,
 * worse copy of the sidebar with nothing in it to learn. No course teaches it.
 */

type Selection =
  | { kind: "panels"; name: string }      // a class or a room: start and loop
  | { kind: "function"; name: string }    // shared code: one body
  | { kind: "sprite"; name: string }      // always one that exists: uploaded or drawn
  | { kind: "sound"; name: string }       // always one the student uploaded
  | { kind: "file"; name: string };       // anything else in the project, but never game.txt

const GAME = "Game";

const startPath = (name: string) => name + ".start.py";
const loopPath = (name: string) => name + ".loop.py";
const fnPath = (name: string) => name + ".fn.py";
const isLink = (source: string) => /^(https?:|data:)/i.test(source);
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

/* The site's own Pixel Art Maker, which sits one directory up from this build
   and is the drawing tool these children already use in class. Resolved
   against BASE_URL rather than against wherever the page happens to be, so it
   is the same address from /classroom/ and from /admin/. embed=1 is what tells
   that page it is inside an editor: it skips the class-code guard, and its
   Save button hands the picture back here instead of downloading it. */
const ART_URL = new URL(import.meta.env.BASE_URL + "../pixel-art-maker/index.html?embed=1",
                        window.location.href).toString();

/* A name has to work as a Python class name: somebody's code will say
   Monster(). The message says what to do rather than quoting the rule. */
function nameProblem(name: string, taken: string[]): string {
  if (!name) return "Type a name first.";
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) return "A name is letters and numbers with no spaces, like Monster or BigRock.";
  if (name[0] !== name[0].toUpperCase()) return "Start the name with a capital letter, like " + name[0].toUpperCase() + name.slice(1) + ".";
  if (taken.includes(name)) return "There is already something called " + name + ".";
  return "";
}

const starterStart = (name: string) =>
  "# One " + name + " is being made. What does it look like, and where is it?\n";
const starterLoop = (name: string) =>
  "# This runs over and over, about sixty times a second.\n" +
  "# Nothing in here yet, so " + name + " does nothing but sit there.\n";
const starterRoomStart = (name: string) =>
  "# The " + name + " screen is being made. Put your things in it.\n";
const starterFunction = (name: string) =>
  "# Code every panel can use. This runs once, before the game starts.\n" +
  "#\n" +
  "# def " + name.toLowerCase() + "(a, b):\n" +
  "#     return a + b\n";
/* The note at the top of game.txt. A new game has no game.txt at all, so this
   is what the first picture or the first room writes above itself. Nobody
   using the editor is shown this file, but it travels: it is in an export, in
   a checkpoint, and in what a teacher reads, so it says what it is. */
const MANIFEST_HEADER =
  "# The editor writes this file. It lists your rooms and your pictures so the\n" +
  "# game knows about them - the Rooms and Sprites lists in the editor are it.\n";

/** One of the offline IDE's glyphs. They are paths in a 16x16 box that take
 *  the colour of whatever they sit in, cut out of the vendored file. */
function Icon({ name, className }: { name: string; className?: string }) {
  return <svg className={className ? "i " + className : "i"} viewBox="0 0 16 16"
              dangerouslySetInnerHTML={{ __html: ICONS[name] ?? "" }} />;
}

export function PixelPadIde({ doc, awareness, files, token, readOnly, saved = true, onSave }: {
  doc: Y.Doc; awareness: Awareness; files: Record<string, string>; token?: string; readOnly?: boolean;
  /** Whether everything typed has reached the server. The offline IDE's SAVE
   *  button is the one thing on this screen that cannot be copied honestly:
   *  saving here is automatic, so the button reports it and forces it. */
  saved?: boolean;
  onSave?: () => void;
}) {
  /* The parent re-derives `files` on a debounce, which is soon enough for the
     stage but not for a sidebar that has to show a new class the instant a
     child makes one. So the lists read the document directly, and this counter
     is what says "I have just written to it". */
  const [version, setVersion] = useState(0);
  const snapshot = useMemo(() => docToFiles(doc), [doc, files, version]);
  const touched = () => setVersion((n) => n + 1);

  const [selected, setSelected] = useState<Selection>({ kind: "panels", name: GAME });
  const [half, setHalf] = useState<"start" | "loop">("start");
  const [ask, setAsk] = useState<AskState | null>(null);

  /* The four switches along the top of the sidebar, remembered per browser the
     way the offline IDE remembers them: a child who works in the dark theme
     should not have to turn it on every morning. */
  const [dark, setDark] = useState(() => localStorage.getItem("utg_pp_theme") === "dark");
  const [tabbed, setTabbed] = useState(() => localStorage.getItem("utg_pp_layout") === "tabbed");
  const [debug, setDebug] = useState(() => localStorage.getItem("utg_pp_debug") === "on");
  const [suggest, setSuggest] = useState(() => localStorage.getItem("utg_pp_suggest") !== "off");

  /* Column widths, as percentages of the whole editor, clamped where the
     offline IDE clamps them. */
  const [sideWidth, setSideWidth] = useState(12);
  const [codeWidth, setCodeWidth] = useState(45);
  const sideRef = useRef(sideWidth);
  sideRef.current = sideWidth;

  const importRef = useRef<HTMLInputElement>(null);
  const soundRef = useRef<HTMLInputElement>(null);
  const [busySound, setBusySound] = useState(false);
  /* Where a new picture comes from. `adding` is the little box the + opens,
     `drawing` is the Pixel Art Maker over the whole editor, and `artProblem`
     is why a drawing did not save - which has to be said on that window,
     because the console it would otherwise go to is behind it. */
  const pictureRef = useRef<HTMLInputElement>(null);
  const artRef = useRef<HTMLIFrameElement>(null);
  const [adding, setAdding] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [artProblem, setArtProblem] = useState("");
  const [savingArt, setSavingArt] = useState(false);
  const ideRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  /* The offline IDE is the whole window. Here there is a classroom page above
     it - a title, the share box - so it takes the rest of the window instead,
     measured rather than guessed at, because how tall that page is depends on
     whether this student is sharing and whether their teacher is watching. */
  useLayoutEffect(() => {
    const element = ideRef.current;
    if (!element) return;
    function measure() {
      if (!element) return;
      const top = element.getBoundingClientRect().top + window.scrollY;
      setHeight(Math.max(520, window.innerHeight - top - 16));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const manifest = useMemo(() => parseManifest(snapshot[MANIFEST_FILE] ?? ""), [snapshot]);

  /* The bytes of every sound in the project. The preview frame cannot fetch
     them for itself and neither can the player in the Sounds pane show a size
     without them, so they are fetched once, here, and both use the same copy. */
  const audio = useGameAudio(snapshot);

  /* Everything in the project, sorted into the sidebar's sections. A panel
     whose name game.txt calls a room is a room; anything else is a thing you
     can make many of, which is a class. */
  const { classes, rooms, functions, others } = useMemo(() => {
    const panelNames = new Set<string>();
    const fnNames: string[] = [];
    const loose: string[] = [];
    for (const path of Object.keys(snapshot)) {
      const panel = panelOf(path);
      if (panel) { panelNames.add(panel.asset); continue; }
      const shared = functionOf(path);
      if (shared) { fnNames.push(shared); continue; }
      if (path !== MANIFEST_FILE) loose.push(path);
    }
    const roomNames = [...new Set(manifest.rooms.filter((name) => name !== GAME))].sort();
    const classNames = [...panelNames].filter((name) => name !== GAME && !roomNames.includes(name)).sort();
    // A room game.txt names but nothing implements still belongs on the list.
    // That is how a child finds the one they misspelled.
    return { classes: classNames, rooms: roomNames, functions: fnNames.sort(), others: loose.sort() };
  }, [snapshot, manifest]);

  const taken = useMemo(() => [GAME, ...classes, ...rooms, ...functions], [classes, rooms, functions]);

  /* A deleted thing must not leave the middle column pointing at nothing. */
  useEffect(() => {
    const gone =
      (selected.kind === "panels" && selected.name !== GAME && !classes.includes(selected.name) && !rooms.includes(selected.name)) ||
      (selected.kind === "function" && !functions.includes(selected.name)) ||
      (selected.kind === "sprite" && selected.name !== "" && !manifest.sprites.some((s) => s.name === selected.name)) ||
      (selected.kind === "sound" && !manifest.sounds.some((s) => s.name === selected.name)) ||
      (selected.kind === "file" && !others.includes(selected.name));
    if (gone) setSelected({ kind: "panels", name: GAME });
  }, [classes, rooms, functions, others, manifest, selected]);

  // ---- running the game ----------------------------------------------------

  const [runFiles, setRunFiles] = useState<Record<string, string> | null>(null);
  const [runId, setRunId] = useState(0);        // key bump: forces a real unmount
  const [nonce, setNonce] = useState("");       // identifies this run's messages
  // The greeting is the console's first line in the offline editor too, and it
  // is the initial state rather than an effect because StrictMode would run an
  // effect twice and say hello twice.
  const [log, setLog] = useState<PreviewMessage[]>([{
    __utg: "", kind: "system", at: Date.now(),
    text: "PixelPad - press PLAY to run your game. Everything you type saves to your account.",
  }]);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const outRef = useRef<HTMLPreElement>(null);

  function play() {
    const next = crypto.randomUUID();
    setLog([]); setNonce(next); setRunFiles({ ...snapshot }); setRunId((id) => id + 1);
  }
  function stop() {
    // Unmounting is the only reliable way to stop a page's timers, listeners
    // and in-flight requests. Clearing srcDoc would leave them running.
    setRunFiles(null); setNonce("");
    say("system", "Your game stopped.");
  }
  function say(kind: PreviewMessage["kind"], text: string) {
    setLog((prev) => [...prev, { __utg: "", kind, text, at: Date.now() }]);
  }
  function tellFrameDebug(on: boolean) {
    frameRef.current?.contentWindow?.postMessage({ __utg: nonce, debug: on }, "*");
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const message = isPreviewMessage(event, frameRef.current, nonce);
      if (!message) return;   // includes stale output from a previous run, dropped by nonce
      setLog((prev) => (prev.length >= 300 ? [...prev.slice(-299), message] : [...prev, message]));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [nonce]);
  useEffect(() => { if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight; }, [log.length]);

  // ---- writing to the shared document -------------------------------------

  function makeFile(path: string, text: string) {
    doc.transact(() => {
      const map = filesMap(doc);
      if (map.has(path)) return;
      const body = new Y.Text();
      map.set(path, body);
      body.insert(0, text);
    });
  }

  function setManifest(text: string) {
    const body = fileText(doc, MANIFEST_FILE);
    doc.transact(() => { body.delete(0, body.length); body.insert(0, text); });
  }

  const manifestLines = () => (snapshot[MANIFEST_FILE] ?? "").split(/\r?\n/);

  /* Writes the line a child would have typed, next to the lines like it. The
     starter file has a note above the rooms and another above the pictures,
     and a new room landing under the picture note would make the notes lie. */
  function addManifestLine(word: "room" | "sprite" | "sound", rest: string) {
    /* A game with no game.txt - which is every new game - gets the file the
       moment it has something to put in it, with the note at the top saying
       what the file is. */
    const lines = (snapshot[MANIFEST_FILE] ?? "").trim() ? manifestLines() : MANIFEST_HEADER.split("\n");
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    let at = -1;
    lines.forEach((line, index) => { if (line.split("#")[0].trim().split(/\s+/)[0] === word) at = index; });
    if (at >= 0) lines.splice(at + 1, 0, word + " " + rest);
    else lines.push("", word + " " + rest);
    lines.push("");
    setManifest(lines.join("\n"));
  }

  /* Rewrites the one line that declares this room or picture. Matching on the
     instruction and the name rather than on the whole line leaves a child's
     own comment at the end of it alone. */
  function editManifestLine(word: "room" | "sprite" | "sound", name: string, replacement: string | null) {
    const out: string[] = [];
    for (const line of manifestLines()) {
      const parts = line.split("#")[0].trim().split(/\s+/);
      if (parts[0] === word && parts[1] === name) {
        if (replacement !== null) out.push(replacement);
        continue;
      }
      out.push(line);
    }
    setManifest(out.join("\n"));
  }

  function newPanels(name: string, room: boolean) {
    makeFile(startPath(name), room ? starterRoomStart(name) : starterStart(name));
    makeFile(loopPath(name), starterLoop(name));
    if (room) addManifestLine("room", name);
    touched();
    setSelected({ kind: "panels", name });
    setHalf("start");
  }

  function newFunction(name: string) {
    makeFile(fnPath(name), starterFunction(name));
    touched();
    setSelected({ kind: "function", name });
  }

  function renameThing(from: string, to: string, kind: "panels" | "function") {
    doc.transact(() => {
      const map = filesMap(doc);
      const pairs: [string, string][] = kind === "function"
        ? [[fnPath(from), fnPath(to)]]
        : [[startPath(from), startPath(to)], [loopPath(from), loopPath(to)]];
      for (const [was, now] of pairs) {
        const body = map.get(was);
        if (!body || map.has(now)) continue;
        const text = body.toString();
        const moved = new Y.Text();
        map.set(now, moved);
        moved.insert(0, text);
        map.delete(was);
      }
    });
    if (kind === "panels" && rooms.includes(from)) editManifestLine("room", from, "room " + to);
    touched();
    setSelected(kind === "function" ? { kind: "function", name: to } : { kind: "panels", name: to });
  }

  function deleteThing(name: string, kind: "panels" | "function") {
    const what = kind === "function" ? "the function " + name : name;
    if (!window.confirm("Delete " + what + "? The code in it goes too, and that cannot be undone.")) return;
    doc.transact(() => {
      const map = filesMap(doc);
      for (const path of kind === "function" ? [fnPath(name)] : [startPath(name), loopPath(name)]) map.delete(path);
    });
    if (kind === "panels" && rooms.includes(name)) editManifestLine("room", name, null);
    touched();
  }

  function deleteFile(path: string) {
    if (!window.confirm("Delete " + path + "? This cannot be undone.")) return;
    filesMap(doc).delete(path);
    touched();
  }

  function saveSprite(was: Sprite, sprite: Sprite) {
    editManifestLine("sprite", was.name, "sprite " + spriteLine(sprite));
    touched();
    setSelected({ kind: "sprite", name: sprite.name });
  }

  /* A picture that has just arrived - drawn in the overlay, or chosen off the
     disk - becoming a sprite: the file goes to the student's own media, and
     the line a child would have typed goes into game.txt. The width and the
     height are the picture's own, because that line has to be honest about
     what ends up on screen. */
  async function addPicture(wanted: string, mime: string, blob: Blob) {
    if (!token) return;
    const taken = new Set(manifest.sprites.map((sprite) => sprite.name));
    let name = wanted;
    if (taken.has(name)) {
      const stem = name.replace(/\.[^.]+$/, ""), ext = name.slice(stem.length);
      for (let n = 2; taken.has(name); n++) name = stem + "-" + n + ext;
    }
    const media = await apiUploadMedia(token, "image", mime, name, blob);
    const size = await new Promise<{ w: number; h: number }>((done) => {
      const probe = new Image();
      probe.onload = () => done({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.onerror = () => done({ w: 48, h: 48 });
      probe.src = media.url;
    });
    addManifestLine("sprite", name + " " + media.url + " " + size.w + " " + size.h);
    touched();
    setSelected({ kind: "sprite", name });
    say("system", 'Added ' + name + '. Draw it with sprite("' + name + '").');
  }

  /* A picture already on the computer. It is re-encoded to WebP on the way,
     exactly as an uploaded sound is re-encoded to MP3: a phone photograph is
     thirty times the size a game needs. A drawing takes the other path below
     and stays a PNG, because that re-encoding would soften every hard pixel
     edge the child drew on purpose. */
  async function uploadPicture(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !token) return;
    say("system", "Adding " + file.name + "...");
    try {
      const small = await compressImage(file);
      await addPicture(small.name, small.mime, small.blob);
    } catch (err) {
      say("error", (err as Error).message || "That picture would not upload.");
    }
  }

  /* The drawing window saved. The overlay stays up until the picture is
     safely in the project - a child who has just spent ten minutes on a
     monster must not lose it to a dropped connection. */
  async function savePixelArt(wanted: string, png: string) {
    setSavingArt(true);
    setArtProblem("");
    try {
      const blob = await (await fetch(png)).blob();
      await addPicture(wanted, "image/png", blob);
      setDrawing(false);
    } catch (err) {
      setArtProblem((err as Error).message || "That picture would not save. Try Save again.");
    }
    setSavingArt(false);
  }

  /* Closing throws the drawing away, so it asks first - but only if there is
     a drawing. The window sets UTG_DRAWN the first time anything is painted,
     and it is the same origin as this page, so that is a plain read. */
  function closeDrawing() {
    const drawn = (artRef.current?.contentWindow as (Window & { UTG_DRAWN?: boolean }) | null)?.UTG_DRAWN;
    if (drawn && !window.confirm("Close without saving? The picture you drew is thrown away.")) return;
    setDrawing(false);
  }

  /* Kept on a ref rather than in the listener below, so the listener can be
     registered once when the window opens and still write into the project as
     it is now, not as it was then. */
  const artSaved = useRef(savePixelArt);
  artSaved.current = savePixelArt;

  useEffect(() => {
    if (!drawing) return;
    function onArt(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.source !== artRef.current?.contentWindow) return;
      const sent = event.data as { utgPixelArt?: string; name?: string; png?: string };
      if (sent?.utgPixelArt !== "save" || !sent.png) return;
      void artSaved.current(sent.name || "my-art.png", sent.png);
    }
    window.addEventListener("message", onArt);
    return () => window.removeEventListener("message", onArt);
  }, [drawing]);

  function deleteSprite(name: string) {
    if (!window.confirm("Delete the picture " + name + "? Any code that asks for it will stop working.")) return;
    editManifestLine("sprite", name, null);
    touched();
  }

  /* Upload sound, which is what the offline IDE's + does too - except that
     there the file goes into the project in the browser, and here it goes to
     the student's own media, so it is still there on Monday and on whichever
     laptop they end up at.

     Everything is re-encoded to one small mono MP3 first, exactly as a picture
     is re-encoded to WebP: a phone recording is thirty times the size of what
     a game needs, thirty of them are a class, and the server takes MP3 for a
     sound the way it takes WebP for a picture. */
  async function uploadSound(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !token) return;
    setBusySound(true);
    say("system", "Adding " + file.name + "...");
    try {
      const small = await compressAudio(file);
      const taken = new Set(manifest.sounds.map((sound) => sound.name));
      let name = small.name;
      for (let n = 2; taken.has(name); n++) name = small.name.replace(/\.mp3$/, "") + "-" + n + ".mp3";
      const media = await apiUploadMedia(token, "audio", small.mime, name, small.blob);
      addManifestLine("sound", name + " " + media.url);
      touched();
      setSelected({ kind: "sound", name });
      say("system", 'Added ' + name + '. Play it with play_sound("' + name + '").');
    } catch (err) {
      say("error", (err as Error).message || "That sound would not upload.");
    }
    setBusySound(false);
  }

  function deleteSound(name: string) {
    if (!window.confirm("Delete the sound " + name + "? Any code that plays it will make the built-in blip instead.")) return;
    editManifestLine("sound", name, null);
    touched();
  }

  // ---- the Project list ----------------------------------------------------

  /* There is no New here, though the offline IDE has one. That editor holds
     one project in this browser, so New is the only way to start another. A
     game here is one of the student's projects on their account, made and
     thrown away on the screen that lists them - where it is named, where it
     can be deleted on purpose, and where it is not one press away from a
     partner's work while they are both typing in it. */

  function exportProject() {
    downloadFile("game.pp2d", toPp2d(snapshot), "application/json");
    say("system", "Exported game.pp2d - it opens here and on pixelpad.io.");
  }

  async function importProject(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    let brought;
    try { brought = fromPp2d(await file.text()); }
    catch (err) { say("error", (err as Error).message); return; }
    if (!window.confirm("Open " + file.name + "? Everything in this project is replaced by what is in that file.")) return;
    doc.transact(() => {
      const map = filesMap(doc);
      for (const path of [...map.keys()]) map.delete(path);
      for (const [path, text] of Object.entries(brought.files)) {
        const body = new Y.Text();
        map.set(path, body);
        body.insert(0, text);
      }
    });
    touched();
    setSelected({ kind: "panels", name: GAME });
    say("system", "Imported " + file.name + ".");
    for (const note of brought.notes) say("system", note);
  }

  // ---- the naming box ------------------------------------------------------

  const askNewClass = () => setAsk({
    title: "New class", label: "A thing you can make lots of, like Monster.", value: "",
    ok: (name) => nameProblem(name, taken) || (newPanels(name, false), ""),
  });
  const askNewRoom = () => setAsk({
    title: "New room", label: "One screen of your game, like Play or Menu.", value: "",
    ok: (name) => nameProblem(name, taken) || (newPanels(name, true), ""),
  });
  const askNewFunction = () => setAsk({
    title: "New function", label: "Code every panel can use, like Helpers.", value: "",
    ok: (name) => nameProblem(name, taken) || (newFunction(name), ""),
  });
  const askRename = (from: string, kind: "panels" | "function") => setAsk({
    title: "Rename " + from, label: "Code that says " + from + "() will need the new name too.", value: from,
    ok: (to) => (to === from ? "" : nameProblem(to, taken)) || (renameThing(from, to, kind), ""),
  });

  // ---- what the middle column shows ----------------------------------------

  const spriteShown = selected.kind === "sprite" && selected.name
    ? manifest.sprites.find((s) => s.name === selected.name) ?? null
    : null;
  const showingAsset = selected.kind === "sprite" || selected.kind === "sound";

  const codeFiles: { path: string; label: string }[] =
    selected.kind === "panels" ? [
      { path: startPath(selected.name), label: selected.name },
      { path: loopPath(selected.name), label: selected.name },
    ]
    : selected.kind === "function" ? [{ path: fnPath(selected.name), label: selected.name }]
    : selected.kind === "file" ? [{ path: selected.name, label: selected.name }]
    : [];
  /* One editor, not two. A picture or a sound has no panels at all, and the
     code column is still mounted behind it - hidden, the way the offline IDE
     hides it - so this has to be true of nothing as well as of one. */
  const one = codeFiles.length <= 1;
  const shownName = codeFiles.length ? codeFiles[0].label : GAME;

  /* A panel nobody has written yet. The starter has Game.start.py and no
     Game.loop.py, because a game with nothing moving needs no loop - so this
     is the ordinary state of a new project, not an error. Writing it is one
     press, and the file appears with the same note in it a new panel gets. */
  function pane(path: string) {
    if (path in snapshot) return <CollabEditor doc={doc} file={path} awareness={awareness} readOnly={readOnly} ppe suggest={suggest} />;
    const name = path.slice(0, path.indexOf("."));
    const starter = path.endsWith(".fn.py") ? starterFunction(name)
      : path.endsWith(".loop.py") ? starterLoop(name)
      : rooms.includes(name) ? starterRoomStart(name) : starterStart(name);
    return <div className="pp-blank">
      <p>{path.endsWith(".loop.py") ? name + " does nothing over and over yet."
        : "Nothing happens when " + name + " is made yet."}</p>
      {!readOnly && <span className="btn btn-success" onClick={() => { makeFile(path, starter); touched(); }}>Write {path}</span>}
    </div>;
  }

  function drag(which: "code" | "canvas") {
    return (event: ReactMouseEvent) => {
      event.preventDefault();
      const ide = ideRef.current;
      if (!ide) return;
      function move(moved: globalThis.MouseEvent) {
        if (!ide) return;
        const total = ide.clientWidth;
        const x = moved.clientX - ide.getBoundingClientRect().left;
        if (which === "code") setSideWidth(clamp(x / total * 100, 6, 40));
        else setCodeWidth(clamp((x - total * sideRef.current / 100 - 12) / total * 100, 15, 75));
      }
      function up() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        document.body.style.cursor = "";
      }
      document.body.style.cursor = "col-resize";
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
  }

  const startTab = <><Icon name="flag" /><span><span>{shownName}</span> Start</span></>;
  const loopTab = <><Icon name="redo" /><span><span>{shownName}</span> Loop</span></>;

  return <div id="pp3d-ide" ref={ideRef} className={dark ? "pp3d-ide pp-dark" : "pp3d-ide"}
              style={height ? { height: height + "px" } : undefined}>

    {/* ============ assets sidebar ============ */}
    <div id="pp-block0" className="ide-ui usel" style={{ width: sideWidth + "%" }}>
      <div className="toggle-row">
        {/* The icon is a <label> because that is what the offline editor's own
            stylesheet spaces away from the checkbox; a <span> here sat flush
            against it. The outer box is a <span> so the labels are not nested. */}
        <span className="form-check-inline" title="Dark theme">
          <label htmlFor="pp-toggle-theme"><Icon name="adjust" /></label>
          <input id="pp-toggle-theme" type="checkbox" checked={dark}
                 onChange={(event) => { setDark(event.target.checked); localStorage.setItem("utg_pp_theme", event.target.checked ? "dark" : "light"); }} />
        </span>
        <span className="form-check-inline" title="Tabbed layout">
          <label htmlFor="pp-toggle-layout"><Icon name="columns" /></label>
          <input id="pp-toggle-layout" type="checkbox" checked={tabbed}
                 onChange={(event) => { setTabbed(event.target.checked); localStorage.setItem("utg_pp_layout", event.target.checked ? "tabbed" : "split"); }} />
        </span>
        <span className="form-check-inline" title="Debug overlay">
          <label htmlFor="pp-toggle-debug"><Icon name="bug" /></label>
          <input id="pp-toggle-debug" type="checkbox" checked={debug}
                 onChange={(event) => {
                   setDebug(event.target.checked);
                   localStorage.setItem("utg_pp_debug", event.target.checked ? "on" : "off");
                   tellFrameDebug(event.target.checked);
                 }} />
        </span>
        <span className="form-check-inline" title="Suggestions">
          <label htmlFor="pp-toggle-suggest"><Icon name="lightbulb" /></label>
          <input id="pp-toggle-suggest" type="checkbox" checked={suggest}
                 onChange={(event) => { setSuggest(event.target.checked); localStorage.setItem("utg_pp_suggest", event.target.checked ? "on" : "off"); }} />
        </span>
      </div>

      <SideHead title="Classes" add="New class" onAdd={readOnly ? undefined : askNewClass} />
      <ul className="pp-asset-list">
        <SideItem name={GAME} icon="university" active={selected.kind === "panels" && selected.name === GAME}
                  onOpen={() => setSelected({ kind: "panels", name: GAME })} />
        {classes.map((name) => <SideItem key={name} name={name} icon="cube"
          active={selected.kind === "panels" && selected.name === name}
          onOpen={() => setSelected({ kind: "panels", name })}
          onRename={readOnly ? undefined : () => askRename(name, "panels")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "panels")} />)}
      </ul>

      <SideHead title="Rooms" add="New room" onAdd={readOnly ? undefined : askNewRoom} />
      <ul className="pp-asset-list">
        {rooms.map((name) => <SideItem key={name} name={name} icon="university"
          active={selected.kind === "panels" && selected.name === name}
          onOpen={() => setSelected({ kind: "panels", name })}
          onRename={readOnly ? undefined : () => askRename(name, "panels")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "panels")} />)}
      </ul>

      {/* + asks where the picture is coming from: off this computer, or drawn
          here. Those are the only two ways a picture gets into a game. */}
      <SideHead title="Sprites" add="New picture"
                onAdd={readOnly ? undefined : () => setAdding(true)} />
      <ul className="pp-asset-list">
        {manifest.sprites.map((sprite) => <SideItem key={sprite.name} name={sprite.name} icon="image"
          active={selected.kind === "sprite" && selected.name === sprite.name}
          onOpen={() => setSelected({ kind: "sprite", name: sprite.name })}
          onDelete={readOnly ? undefined : () => deleteSprite(sprite.name)} />)}
      </ul>
      <input ref={pictureRef} type="file" accept="image/*" style={{ display: "none" }}
             onChange={(event) => { void uploadPicture(event); }} />

      {/* Only sounds the student put there. The engine can still make a noise
          for a name it has never heard, which is what a game does before
          anybody has recorded anything - but two of them sitting at the top of
          this list read as part of the project, and they are not: they are not
          files, they cannot be deleted, and nobody chose them. */}
      <SideHead title="Sounds" add="Upload sound"
                onAdd={readOnly || !token ? undefined : () => soundRef.current?.click()} />
      <ul className="pp-asset-list">
        {manifest.sounds.map((sound) => <SideItem key={sound.name} name={sound.name} icon="volume"
          active={selected.kind === "sound" && selected.name === sound.name}
          onOpen={() => setSelected({ kind: "sound", name: sound.name })}
          onDelete={readOnly ? undefined : () => deleteSound(sound.name)} />)}
      </ul>
      <input ref={soundRef} type="file" accept="audio/*" style={{ display: "none" }}
             disabled={busySound} onChange={(event) => { void uploadSound(event); }} />

      <SideHead title="Functions" add="New function" onAdd={readOnly ? undefined : askNewFunction} />
      <ul className="pp-asset-list">
        {functions.map((name) => <SideItem key={name} name={name} icon="cube"
          active={selected.kind === "function" && selected.name === name}
          onOpen={() => setSelected({ kind: "function", name })}
          onRename={readOnly ? undefined : () => askRename(name, "function")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "function")} />)}
      </ul>

      {/* game.txt is not on this list. It is the sidebar written down - every
          line in it comes from a + up there - so showing it offered a child a
          second, harder way to do what the lists above already do, and a way
          to break a working game with a typo in a file nobody taught them. */}
      <SideHead title="Project" />
      <ul className="pp-asset-list" style={{ paddingBottom: "42px" }}>
        {others.map((path) => <SideItem key={path} name={path} icon="file"
          active={selected.kind === "file" && selected.name === path}
          onOpen={() => setSelected({ kind: "file", name: path })}
          onDelete={readOnly ? undefined : () => deleteFile(path)} />)}
        {!readOnly && <>
          <SideItem name="Export" icon="download" active={false} title="Save a .pp2d file - it opens on pixelpad.io" onOpen={exportProject} />
          <SideItem name="Import" icon="upload" active={false} title="Open a .pp2d file"
                    onOpen={() => importRef.current?.click()} />
        </>}
      </ul>
      <input ref={importRef} type="file" accept=".pp2d,application/json" style={{ display: "none" }} onChange={(event) => { void importProject(event); }} />
    </div>

    <div id="pp-col-adjust-code" onMouseDown={drag("code")}><span className="text-vert">• • •</span></div>

    {/* ============ code column ============ */}
    <div id="pp-block1" style={{ width: codeWidth + "%" }}>
      <div id="pp-block1-child" style={showingAsset ? { display: "none" } : undefined}>

        {tabbed
          ? <div id="hLayout" className="on">
              <div className="startloop-row">
                <div className={half === "start" ? "startloop start active" : "startloop start"}
                     onClick={() => setHalf("start")}>{startTab}</div>
                {!one && <div className={half === "loop" ? "startloop loop active" : "startloop loop"}
                     onClick={() => setHalf("loop")}>{loopTab}</div>}
              </div>
              <div id="startloop-container">
                {codeFiles.length > 0 && pane(one || half === "start" ? codeFiles[0].path : codeFiles[1].path)}
              </div>
            </div>
          : <div id="vLayout">
              <div id="vLayoutStartTab" className={half === "start" ? "active" : undefined}
                   onClick={() => setHalf("start")}>{startTab}</div>
              <div id="pp-block1code" className={half === "start" ? "pp-code-host active" : "pp-code-host"}
                   style={one ? { height: "100%" } : undefined}>
                {codeFiles.length > 0 && pane(codeFiles[0].path)}
              </div>
              {!one && <>
                <div id="vLayoutLoopTab" className={half === "loop" ? "active" : undefined}
                     onClick={() => setHalf("loop")}><div>{loopTab}</div></div>
                <div id="pp-block1loop" className={half === "loop" ? "pp-code-host active" : "pp-code-host"}>
                  {pane(codeFiles[1].path)}
                </div>
              </>}
            </div>}

      </div>

      {/* the asset preview replaces the code column, as in the original */}
      <div id="pp-block1-asset" className={showingAsset ? undefined : "hidden"}>
        {selected.kind === "sprite" && spriteShown
          ? <SpritePane sprite={spriteShown} taken={manifest.sprites.map((s) => s.name)} token={token} readOnly={readOnly}
                        onSave={(sprite) => saveSprite(spriteShown, sprite)}
                        onCancel={() => setSelected({ kind: "panels", name: GAME })} />
          : selected.kind === "sound" ? <SoundPane name={selected.name} data={audio[selected.name]} /> : null}
      </div>
    </div>

    <div id="pp-col-adjust-canvas" onMouseDown={drag("canvas")}><span className="text-vert">• • •</span></div>

    {/* ============ stage column ============ */}
    <div id="pp-block2">
      <div id="pp-block2-child">
        <div id="toolbar">
          <div id="pp-save" className={saved ? "btn btn-success" : "btn btn-danger"}
               title={saved ? "Everything you have typed is saved to your account" : "Save now"}
               onClick={() => onSave?.()}>{saved ? "SAVED" : "SAVE"}</div>
          <div id="pp-start" className={runFiles ? "btn btn-danger" : "btn btn-success"}
               onClick={() => (runFiles ? stop() : play())}>{runFiles ? "STOP" : "PLAY"}</div>
        </div>
        <div id="canvasContainer">
          {runFiles
            ? <iframe key={runId} ref={frameRef} title="Game" sandbox={PREVIEW_SANDBOX} allow={PREVIEW_ALLOW}
                      onLoad={() => { if (debug) tellFrameDebug(true); }}
                      srcDoc={buildGamePreview(runFiles, nonce, audio)} />
            : <div className="pp-stage-idle" />}
        </div>
        <div id="pp-console" className="ide-ui">
          <pre id="output" ref={outRef}>
            {log.map((entry, index) => <div key={index}
              className={entry.kind === "error" ? "err" : entry.kind === "system" ? "sys" : undefined}>{entry.text}</div>)}
          </pre>
        </div>
      </div>
    </div>

    {ask && <AskBox state={ask} onClose={() => setAsk(null)} />}
    {adding && <PictureChoice token={token}
      onClose={() => setAdding(false)}
      /* The file box is opened straight from this click. Asked for any later
         than that - from an effect, once React has re-rendered - a browser
         treats it as a page opening a file box by itself, and refuses. */
      onUpload={() => { setAdding(false); pictureRef.current?.click(); }}
      onDraw={() => { setAdding(false); setArtProblem(""); setDrawing(true); }} />}

    {/* The drawing window. It is the Pixel Art Maker itself in a frame, not a
        second drawing tool written to look like it, so a child who has drawn
        in one has drawn in both - and there is one place to fix a brush. */}
    {drawing && <div className="pp-art">
      <div className="pp-art-bar">
        <Icon name="image" />
        <span>Draw a picture for your game, then press Save to my game.</span>
        {artProblem && <span className="pp-problem">{artProblem}</span>}
        <span className="spacer" />
        {savingArt && <span className="pp-art-busy">Saving…</span>}
        <span className="btn btn-sec" onClick={closeDrawing}>Close</span>
      </div>
      <iframe ref={artRef} className="pp-art-frame" title="Pixel Art Maker" src={ART_URL} />
    </div>}
  </div>;
}

/* What the + over Sprites asks, and the only two ways into a game a picture
   has. Each says what it gives you rather than what it is called.

   There is deliberately no third way. A picture used to be allowed to be a
   plain colour instead - the starter game's monster was a green square - and
   it meant two kinds of thing called a sprite, two halves of the form below,
   and a child whose "picture" was a rectangle. A game still draws a colour if
   an old project asks for one; nothing new makes one. */
function PictureChoice({ token, onUpload, onDraw, onClose }: {
  token?: string; onUpload: () => void; onDraw: () => void; onClose: () => void;
}) {
  return <div id="modal" className="on" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="box">
      <h5>New picture</h5>
      <p className="pp-modal-note">Where is this picture coming from?</p>
      {token ? <div className="pp-choice-row">
        <button className="pp-choice" onClick={onUpload}>
          <Icon name="upload" className="i2x" />
          <strong>Upload an image</strong>
          <span>A picture already on this computer.</span>
        </button>
        <button className="pp-choice" onClick={onDraw}>
          <Icon name="image" className="i2x" />
          <strong>Create pixel art</strong>
          <span>Draw one here, pixel by pixel.</span>
        </button>
      </div> : <span className="pp-note">A picture is kept with your account, so sign in first.</span>}
      <div className="row">
        <span className="btn btn-sec" onClick={onClose}>Cancel</span>
      </div>
    </div>
  </div>;
}

const spriteLine = (sprite: Sprite) =>
  sprite.name + " " + sprite.source + " " + sprite.width + " " + sprite.height;

function SideHead({ title, add, onAdd }: { title: string; add?: string; onAdd?: () => void }) {
  return <div className="assetHeader">{title}
    {onAdd && <span className="add" title={add} onClick={onAdd}><Icon name="plus" /></span>}
  </div>;
}

function SideItem({ name, icon, active, title, onOpen, onRename, onDelete }: {
  name: string; icon: string; active: boolean; title?: string;
  onOpen: () => void; onRename?: () => void; onDelete?: () => void;
}) {
  return <li className={active ? "pp-script-active" : "pp-script-inactive"}
             title={title ?? (onRename ? name + " - double-click to rename" : name)}
             onClick={onOpen} onDoubleClick={onRename}>
    <Icon name={icon} />
    <span className="name">{name}</span>
    {onDelete && <span className="pp-asset-delete" title={"Delete " + name}
                       onClick={(event) => { event.stopPropagation(); onDelete(); }}><Icon name="trash" /></span>}
  </li>;
}

/* The naming box. It hands the typed name to whoever opened it and expects a
   complaint back, or an empty string - so every rule about what a name may be
   lives with the thing being named rather than in here. */
type AskState = { title: string; label: string; value: string; ok: (value: string) => string };

function AskBox({ state, onClose }: { state: AskState; onClose: () => void }) {
  const [value, setValue] = useState(state.value);
  const [problem, setProblem] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { input.current?.focus(); input.current?.select(); }, []);
  function submit() {
    const complaint = state.ok(value.trim());
    if (complaint) { setProblem(complaint); return; }
    onClose();
  }
  return <div id="modal" className="on" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="box">
      <h5>{state.title}</h5>
      <p className="pp-modal-note">{state.label}</p>
      <input ref={input} autoComplete="off" value={value}
             onChange={(event) => { setValue(event.target.value); setProblem(""); }}
             onKeyDown={(event) => { if (event.key === "Enter") submit(); if (event.key === "Escape") onClose(); }} />
      {problem && <p className="pp-problem">{problem}</p>}
      <div className="row">
        <span className="btn btn-sec" onClick={onClose}>Cancel</span>
        <span className="btn btn-success" onClick={submit}>OK</span>
      </div>
    </div>
  </div>;
}

/* A picture, as game.txt describes it: a name, where the picture is, and how
   big it is. A picture is always a real picture now - uploaded or drawn - so
   this pane only ever edits one that exists. An older project may still name a
   plain colour where the link goes, and the preview below draws it, because a
   child's game from last term has to keep working.

   The offline IDE only ever shows a picture here, because there it is a file
   on a disk. Here it is a line in game.txt, so the same pane is where that
   line gets rewritten: the preview above is the offline one, checkerboard and
   all, and the form below it is the part that has nowhere else to live. */
function SpritePane({ sprite, taken, token, readOnly, onSave, onCancel }: {
  sprite: Sprite; taken: string[]; token?: string; readOnly?: boolean;
  onSave: (sprite: Sprite) => void; onCancel: () => void;
}) {
  const [name, setName] = useState(sprite.name);
  const [source, setSource] = useState(sprite.source);
  const [width, setWidth] = useState(String(sprite.width));
  const [height, setHeight] = useState(String(sprite.height));
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setName(sprite.name); setSource(sprite.source);
    setWidth(String(sprite.width)); setHeight(String(sprite.height));
    setProblem("");
  }, [sprite]);

  const picture = isLink(source);

  /* The offline IDE's own preview: the picture at whatever zoom fits, on a
     checkerboard so a transparent edge is obvious, with its real size and the
     line of code that asks for it underneath. */
  useEffect(() => {
    let dropped = false;
    let image: HTMLImageElement | null = null;
    function draw() {
      const canvas = canvasRef.current, host = bodyRef.current;
      if (dropped || !canvas || !host) return;
      const wide = image ? image.naturalWidth : Math.max(1, Number(width) || 48);
      const high = image ? image.naturalHeight : Math.max(1, Number(height) || 48);
      const room = Math.max(40, host.clientWidth - 24), tall = Math.max(40, host.clientHeight - 24);
      const zoom = Math.max(0.05, Math.min(room / wide, tall / high, 4));
      canvas.width = Math.max(1, Math.round(wide * zoom));
      canvas.height = Math.max(1, Math.round(high * zoom));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const square = 8;
      for (let y = 0; y < canvas.height; y += square) for (let x = 0; x < canvas.width; x += square) {
        ctx.fillStyle = ((x / square + y / square) | 0) % 2 ? "#D8DCE0" : "#F0F2F4";
        ctx.fillRect(x, y, square, square);
      }
      ctx.imageSmoothingEnabled = zoom < 3;
      if (image) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      else {
        const rgb = RGB[source] ?? RGB.green;
        ctx.fillStyle = "rgb(" + rgb.join(",") + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      setInfo((name || "your picture") + "\n" + wide + " x " + high + " px  ·  zoom " + Math.round(zoom * 100) + "%" +
              '\n\nsprite("' + (name || "monster.png") + '")');
    }
    if (picture) {
      const probe = new Image();
      probe.onload = () => { image = probe; draw(); };
      probe.onerror = () => { setInfo((name || "your picture") + "\nthat picture would not load"); };
      probe.src = source;
    }
    draw();
    window.addEventListener("resize", draw);
    return () => { dropped = true; window.removeEventListener("resize", draw); };
  }, [source, width, height, name, picture]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !token) return;
    setBusy(true); setProblem("");
    try {
      const small = await compressImage(file);
      const media = await apiUploadMedia(token, "image", small.mime, small.name, small.blob);
      setSource(media.url);
      if (!name.trim()) setName(media.name);
      /* The engine reads a picture's real size every frame, so these two only
         decide how big a plain colour is. Filling them in from the picture
         keeps the line in game.txt honest about what is on screen. */
      const probe = new Image();
      probe.onload = () => { setWidth(String(probe.naturalWidth)); setHeight(String(probe.naturalHeight)); };
      probe.src = media.url;
    } catch (err) { setProblem((err as Error).message || "That picture would not upload."); }
    setBusy(false);
  }

  function save() {
    const clean = name.trim();
    if (!clean) { setProblem("Give the picture a name, like monster.png. That is the name your code asks for."); return; }
    if (/\s/.test(clean)) { setProblem("A picture's name cannot have a space in it."); return; }
    if (clean !== sprite.name && taken.includes(clean)) { setProblem("There is already a picture called " + clean + "."); return; }
    const w = Number(width), h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) { setProblem("The width and the height have to be numbers bigger than zero."); return; }
    if (!picture && !(source in RGB)) { setProblem("Upload a picture, or draw one with +."); return; }
    onSave({ name: clean, source, width: Math.round(w), height: Math.round(h) });
  }

  return <>
    <div id="assetPreviewTab"><Icon name="image" /><span>{sprite.name}</span></div>
    <div id="assetPreviewBody" ref={bodyRef}><canvas id="spritePreview" ref={canvasRef} style={{ display: "block" }} /></div>
    <div id="assetPreviewInfo">{info}</div>
    <div className="pp-sprite-form">
      <label>Name<input value={name} disabled={readOnly} placeholder="monster.png" onChange={(event) => setName(event.target.value)} /></label>
      {/* Wide and High only decide how big a plain colour is - the engine
          reads a real picture's own size every frame - so they are here for
          the older projects that still name a colour, and are filled in from
          the picture for every other one. */}
      <label>Wide<input value={width} disabled={readOnly} onChange={(event) => setWidth(event.target.value)} /></label>
      <label>High<input value={height} disabled={readOnly} onChange={(event) => setHeight(event.target.value)} /></label>
      {token && !readOnly && <label className="pp-file-button">{busy ? "Uploading…" : "Change the picture"}
        <input type="file" accept="image/*" onChange={(event) => { void upload(event); }} disabled={busy} /></label>}
      {problem && <p className="pp-problem">{problem}</p>}
      {!readOnly && <div className="pp-form-row">
        <span className="btn btn-sec" onClick={onCancel}>Cancel</span>
        <span className="btn btn-success" onClick={save}>Save</span>
      </div>}
    </div>
  </>;
}

/* A sound, as the offline IDE shows one: a player, how big it is, and the
   line of code that plays it. Every sound here is a file in the student's own
   media, so there is always something to hand the <audio> element - unless it
   has not finished arriving, which the info line says. */
function SoundPane({ name, data }: { name: string; data?: string }) {
  const src = data ?? "";
  const size = Math.round(src.length * 0.75 / 1024);
  return <>
    <div id="assetPreviewTab"><Icon name="volume" /><span>{name}</span></div>
    <div id="assetPreviewBody">
      <audio id="pp-audio" controls style={{ display: "block" }} src={src || undefined} />
    </div>
    <div id="assetPreviewInfo">{name + "\n" +
      (src ? "playable \u00b7 about " + size + " KB" : "still arriving - it will play in a moment") +
      "\n\nplay_sound(\"" + name + "\")"}</div>
  </>;
}
