import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ChangeEvent, type MouseEvent as ReactMouseEvent } from "react";
import * as Y from "yjs";
import type { Awareness } from "y-protocols/awareness";
import { CollabEditor } from "./CollabEditor";
import { docToFiles, fileText, filesMap } from "./lib/collab";
import { MANIFEST_FILE, RGB, artPath, buildGamePreview, fromPp2d, functionOf, isBookkeeping, panelOf,
         parseManifest, splitName, toPp2d, useGameAudio, type Sound, type Sprite } from "./lib/game-project";
import { zipStore, type ZipEntry } from "./lib/zip";
import { isPreviewMessage, PREVIEW_ALLOW, PREVIEW_SANDBOX, type PreviewMessage } from "./lib/preview";
import { ICONS } from "./lib/game-icons";
import { downloadFile } from "./lib/classroom";
import { apiUploadMedia } from "./lib/api";
import { compressAudio, compressImage } from "./lib/media";
import "./game-editor.css";

/* The Python Game Editor.
 *
 * This is the offline IDE - vendor/game-editor-offline.html - rather than a
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
 *
 * art/ is the same kind of thing: one file per drawn picture, holding the
 * drawing rather than the PNG of it, so Edit the drawing opens the same
 * squares the child left. Also not on the sidebar, for the same reason.
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

export function GameEditor({ doc, awareness, files, token, readOnly, saved = true, onSave }: {
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
     because the console it would otherwise go to is behind it.

     `drawing.editing` is the picture being changed, or "" for a new one, and
     `drawing.art` is the drawing to open it with. Both are held together so
     the window cannot be up for a picture it has forgotten the name of. */
  const pictureRef = useRef<HTMLInputElement>(null);
  const artRef = useRef<HTMLIFrameElement>(null);
  const [adding, setAdding] = useState(false);
  const [drawing, setDrawing] = useState<{ editing: string; art: string } | null>(null);
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
      if (!isBookkeeping(path)) loose.push(path);
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
    text: "Python Game Editor - press PLAY to run your game. Everything you type saves to your account.",
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

  /* makeFile leaves a file that already exists alone, because it is what a
     child pressing Write does. These two are for the files the editor owns:
     game.txt and the drawings under art/, which are rewritten and moved
     whenever the thing they describe changes. */
  function writeFile(path: string, text: string) {
    const body = fileText(doc, path);
    doc.transact(() => { body.delete(0, body.length); body.insert(0, text); });
  }

  function moveFile(from: string, to: string) {
    doc.transact(() => {
      const map = filesMap(doc);
      const body = map.get(from);
      if (!body) return;
      const text = body.toString();
      const moved = new Y.Text();
      map.set(to, moved);
      moved.insert(0, text);
      map.delete(from);
    });
  }

  function setManifest(text: string) {
    writeFile(MANIFEST_FILE, text);
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
    // The drawing is named after the picture, so a rename has to take it with
    // it or Edit the drawing would open the wrong squares - or nothing.
    if (sprite.name !== was.name) moveFile(artPath(was.name), artPath(sprite.name));
    touched();
    setSelected({ kind: "sprite", name: sprite.name });
  }

  /* Renaming a sound is the whole of editing one: there is nothing else about
     a sound to change here, because the file itself is in the student's own
     media and a different noise is a different upload. */
  function saveSound(was: Sound, name: string) {
    editManifestLine("sound", was.name, "sound " + name + " " + was.source);
    touched();
    setSelected({ kind: "sound", name });
  }

  /* A name nothing else in this list has. A second monster.png would make one
     of the two unreachable from code, since a game asks for a picture by
     name. */
  function freeName(wanted: string, taken: Set<string>): string {
    if (!taken.has(wanted)) return wanted;
    const [stem, ext] = splitName(wanted);
    let name = wanted;
    for (let n = 2; taken.has(name); n++) name = stem + "-" + n + ext;
    return name;
  }

  /* How big the picture really is. The engine measures a picture every frame,
     so these two numbers only decide how big a plain colour is - but the line
     in game.txt has to be honest about what ends up on screen. */
  function pictureSize(url: string): Promise<{ w: number; h: number }> {
    return new Promise((done) => {
      const probe = new Image();
      probe.onload = () => done({ w: probe.naturalWidth, h: probe.naturalHeight });
      probe.onerror = () => done({ w: 48, h: 48 });
      probe.src = url;
    });
  }

  /* A picture that has just arrived - drawn in the overlay, or chosen off the
     disk - becoming a sprite: the file goes to the student's own media, and
     the line a child would have typed goes into game.txt.

     `art` is the drawing behind it, which only a drawn picture has. It is kept
     beside the picture so the drawing window can open it again. */
  async function addPicture(wanted: string, mime: string, blob: Blob, art?: string) {
    if (!token) return;
    const name = freeName(wanted, new Set(manifest.sprites.map((sprite) => sprite.name)));
    const media = await apiUploadMedia(token, "image", mime, name, blob);
    const size = await pictureSize(media.url);
    addManifestLine("sprite", name + " " + media.url + " " + size.w + " " + size.h);
    if (art) writeFile(artPath(name), art);
    touched();
    setSelected({ kind: "sprite", name });
    say("system", 'Added ' + name + '. Draw it with sprite("' + name + '").');
  }

  /* The same thing for a drawing that was already in the game and has just
     been changed. The picture keeps its place on the Sprites list rather than
     turning into a second one called monster-2.png, so code that already asks
     for it goes on working - and if the child renamed it in the drawing
     window, the line and the drawing move together. */
  async function replacePicture(was: string, wanted: string, blob: Blob, art: string) {
    if (!token) return;
    const others = new Set(manifest.sprites.map((sprite) => sprite.name).filter((name) => name !== was));
    const name = freeName(wanted, others);
    const media = await apiUploadMedia(token, "image", "image/png", name, blob);
    const size = await pictureSize(media.url);
    editManifestLine("sprite", was, "sprite " + name + " " + media.url + " " + size.w + " " + size.h);
    if (name !== was) filesMap(doc).delete(artPath(was));
    writeFile(artPath(name), art);
    touched();
    setSelected({ kind: "sprite", name });
    say("system", "Saved your changes to " + name + ".");
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
  async function savePixelArt(wanted: string, png: string, art: string) {
    setSavingArt(true);
    setArtProblem("");
    try {
      const blob = await (await fetch(png)).blob();
      const editing = drawing?.editing ?? "";
      if (editing) await replacePicture(editing, wanted, blob, art);
      else await addPicture(wanted, "image/png", blob, art);
      setDrawing(null);
    } catch (err) {
      setArtProblem((err as Error).message || "That picture would not save. Try Save again.");
    }
    setSavingArt(false);
  }

  /* Closing throws the drawing away, so it asks first - but only if there is
     a drawing. The window sets UTG_DRAWN the first time anything is painted,
     and it is the same origin as this page, so that is a plain read. Opening
     a drawing to change it does not paint anything, so closing one straight
     back out again does not nag. */
  function closeDrawing() {
    const drawn = (artRef.current?.contentWindow as (Window & { UTG_DRAWN?: boolean }) | null)?.UTG_DRAWN;
    const lost = drawing?.editing
      ? "Close without saving? Your changes to " + drawing.editing + " are thrown away."
      : "Close without saving? The picture you drew is thrown away.";
    if (drawn && !window.confirm(lost)) return;
    setDrawing(null);
  }

  /* Kept on refs rather than in the listener below, so the listener can be
     registered once when the window opens and still write into the project as
     it is now, not as it was then. */
  const artSaved = useRef(savePixelArt);
  artSaved.current = savePixelArt;
  const artOpening = useRef(drawing);
  artOpening.current = drawing;

  useEffect(() => {
    if (!drawing) return;
    function onArt(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.source !== artRef.current?.contentWindow) return;
      const sent = event.data as { utgPixelArt?: string; name?: string; png?: string; art?: unknown };
      /* The drawing window says when it is ready, and a drawing being changed
         goes back in that reply. Waiting for it rather than posting on the
         frame's load event is the difference between a child seeing their
         monster and a child seeing an empty grid: the page has to have run
         before it can be given anything. */
      if (sent?.utgPixelArt === "ready") {
        const art = artOpening.current?.art;
        if (art) {
          try {
            artRef.current?.contentWindow?.postMessage(
              { utgPixelArt: "open", art: JSON.parse(art) }, window.location.origin);
          } catch {
            setArtProblem("This picture's drawing could not be opened, so this is a blank one. " +
                          "Saving it will replace the picture.");
          }
        }
        return;
      }
      if (sent?.utgPixelArt !== "save" || !sent.png) return;
      void artSaved.current(sent.name || "my-art.png", sent.png, JSON.stringify(sent.art ?? null));
    }
    window.addEventListener("message", onArt);
    return () => window.removeEventListener("message", onArt);
  }, [drawing]);

  function deleteSprite(name: string) {
    if (!window.confirm("Delete the picture " + name + "? Any code that asks for it will stop working.")) return;
    editManifestLine("sprite", name, null);
    filesMap(doc).delete(artPath(name));
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
      const name = freeName(small.name, new Set(manifest.sounds.map((sound) => sound.name)));
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
    say("system", "Exported game.pp2d - your whole game in one file.");
  }

  /* Every picture and every sound in the game, as one zip.
     A .pp2d is for opening a game again; this is for the pictures themselves -
     a monster on a poster, a sprite sheet handed to a partner, a term's work
     collected by a teacher. Without it the only way out is right-clicking
     eleven signed links one at a time, and a signed link expires.

     A picture that is a plain colour rather than a file has nothing to put in
     the zip, so it is counted and said out loud instead of quietly missing. */
  async function exportArt() {
    const wanted = [
      ...manifest.sprites.map((sprite) => ({ name: sprite.name, source: sprite.source })),
      ...manifest.sounds.map((sound) => ({ name: sound.name, source: sound.source })),
    ];
    const real = wanted.filter((entry) => isLink(entry.source));
    if (!real.length) {
      say("system", "There are no pictures or sounds in this game yet. Add one with + next to Sprites.");
      return;
    }
    say("system", "Collecting " + real.length + " file" + (real.length === 1 ? "" : "s") + "...");
    const entries: ZipEntry[] = [];
    const missed: string[] = [];
    const used = new Set<string>();
    for (const entry of real) {
      try {
        const reply = await fetch(entry.source);
        if (!reply.ok) throw new Error(String(reply.status));
        const blob = await reply.blob();
        entries.push({
          name: freeName(zipName(entry.name, blob.type), used),
          bytes: new Uint8Array(await blob.arrayBuffer()),
        });
        used.add(entries[entries.length - 1].name);
      } catch { missed.push(entry.name); }
    }
    if (!entries.length) {
      say("error", "None of those files would download. Check you are still signed in, then try again.");
      return;
    }
    const url = URL.createObjectURL(zipStore(entries));
    const link = document.createElement("a");
    link.href = url;
    link.download = "game-art.zip";
    link.click();
    URL.revokeObjectURL(url);
    say("system", "Exported game-art.zip with " + entries.length + " file" + (entries.length === 1 ? "" : "s") + ".");
    if (missed.length) say("error", "These would not download: " + missed.join(", ") + ".");
    const colours = wanted.length - real.length;
    if (colours) say("system", colours + " picture" + (colours === 1 ? " is a plain colour" : "s are plain colours") +
      " rather than a drawing, so there is no file to put in a zip.");
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
  const soundShown = selected.kind === "sound"
    ? manifest.sounds.find((s) => s.name === selected.name) ?? null
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

  return <div id="pge-ide" ref={ideRef} className={dark ? "pge-ide pp-dark" : "pge-ide"}
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
          {/* "Export code" rather than "Export", now that there are two of
              them: this one is the game itself - the code, the rooms and the
              list of pictures - and the one below is the pictures. */}
          <SideItem name="Export code" icon="download" active={false}
                    title="Save your whole game as a file"
                    onOpen={exportProject} />
          <SideItem name="Export art" icon="image" active={false}
                    title="Save a zip of every picture and sound in this game"
                    onOpen={() => { void exportArt(); }} />
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
                        drawn={!!snapshot[artPath(spriteShown.name)]}
                        onEdit={() => {
                          setArtProblem("");
                          setDrawing({ editing: spriteShown.name, art: snapshot[artPath(spriteShown.name)] ?? "" });
                        }}
                        onSave={(sprite) => saveSprite(spriteShown, sprite)}
                        onCancel={() => setSelected({ kind: "panels", name: GAME })} />
          : selected.kind === "sound" && soundShown
          ? <SoundPane sound={soundShown} data={audio[soundShown.name]}
                       taken={manifest.sounds.map((s) => s.name)} readOnly={readOnly}
                       onSave={(name) => saveSound(soundShown, name)}
                       onCancel={() => setSelected({ kind: "panels", name: GAME })} />
          : null}
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
      onDraw={() => { setAdding(false); setArtProblem(""); setDrawing({ editing: "", art: "" }); }} />}

    {/* The drawing window. It is the Pixel Art Maker itself in a frame, not a
        second drawing tool written to look like it, so a child who has drawn
        in one has drawn in both - and there is one place to fix a brush. */}
    {drawing && <div className="pp-art">
      <div className="pp-art-bar">
        <Icon name="image" />
        <span>{drawing.editing
          ? "Change " + drawing.editing + ", then press Save to my game."
          : "Draw a picture for your game, then press Save to my game."}</span>
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

/* Inside a game a picture's name is only a key - a child may call a WebP
   monster.png and the game draws it either way, because an <img> reads the
   bytes and not the name. Outside a game the name is the file, and a WebP
   called .png is one a paint program refuses to open and a parent cannot
   print. So a file on its way into the zip is named after what it actually
   is, whatever the game calls it. */
const ZIP_EXT: Record<string, string> = {
  "image/png": ".png", "image/webp": ".webp", "image/jpeg": ".jpg",
  "image/gif": ".gif", "image/svg+xml": ".svg",
  "audio/mpeg": ".mp3", "audio/wav": ".wav", "audio/ogg": ".ogg",
};

function zipName(name: string, type: string): string {
  const real = ZIP_EXT[(type || "").split(";")[0].trim().toLowerCase()];
  const [stem, had] = splitName(name);
  return real && real !== had.toLowerCase() ? stem + real : name;
}

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
function SpritePane({ sprite, taken, token, readOnly, drawn, onEdit, onSave, onCancel }: {
  sprite: Sprite; taken: string[]; token?: string; readOnly?: boolean;
  /** Whether this picture was drawn here and the drawing was kept, which is
   *  the only way Edit the drawing can open anything. */
  drawn: boolean;
  onEdit: () => void;
  onSave: (sprite: Sprite) => void; onCancel: () => void;
}) {
  /* The name a child types and the ending it is saved as are two different
     things, so they are two different pieces of state. The box holds the
     name; the ending is printed beside it and changes only when the picture
     itself does - a .png swapped for a photograph becomes a .webp, because
     that is what the file now is. */
  const [stem, setStem] = useState(splitName(sprite.name)[0]);
  const [ext, setExt] = useState(splitName(sprite.name)[1]);
  const [source, setSource] = useState(sprite.source);
  const [width, setWidth] = useState(String(sprite.width));
  const [height, setHeight] = useState(String(sprite.height));
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const name = dropExt(stem, ext) + ext;

  useEffect(() => {
    setStem(splitName(sprite.name)[0]); setExt(splitName(sprite.name)[1]);
    setSource(sprite.source);
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
      // A photograph comes back re-encoded, so the ending changes with it
      // rather than leaving a WebP called monster.png.
      setExt(splitName(small.name)[1] || ext);
      if (!stem.trim()) setStem(splitName(media.name)[0]);
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
    const problem = namingProblem(dropExt(stem, ext), ext, sprite.name, taken, "picture");
    if (problem) { setProblem(problem); return; }
    const w = Number(width), h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) { setProblem("The width and the height have to be numbers bigger than zero."); return; }
    if (!picture && !(source in RGB)) { setProblem("Upload a picture, or draw one with +."); return; }
    onSave({ name, source, width: Math.round(w), height: Math.round(h) });
  }

  return <>
    <div id="assetPreviewTab"><Icon name="image" /><span>{sprite.name}</span></div>
    <div id="assetPreviewBody" ref={bodyRef}><canvas id="spritePreview" ref={canvasRef} style={{ display: "block" }} /></div>
    <div id="assetPreviewInfo">{info}</div>
    <div className="pp-sprite-form">
      <NameField label="Name" value={stem} ext={ext} readOnly={readOnly} placeholder="monster"
                 onChange={(next) => { setStem(next); setProblem(""); }} />
      {/* Wide and High only decide how big a plain colour is - the engine
          reads a real picture's own size every frame - so they are here for
          the older projects that still name a colour, and are filled in from
          the picture for every other one. */}
      <label>Wide<input value={width} disabled={readOnly} onChange={(event) => setWidth(event.target.value)} /></label>
      <label>High<input value={height} disabled={readOnly} onChange={(event) => setHeight(event.target.value)} /></label>
      {/* A picture drawn here stays a drawing. The PNG in the game is what
          the drawing looked like when it was saved; this opens the squares
          themselves again, so changing one is changing one - not drawing the
          whole monster a second time. A picture that came off a computer has
          no drawing behind it, so it has no button either. */}
      {drawn && !readOnly && <div className="pp-form-row pp-form-left">
        <span className="btn btn-sec" onClick={onEdit}><Icon name="image" /> Edit the drawing</span>
      </div>}
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

/* The name of a picture or a sound, with what it is saved as printed next to
   the box instead of inside it.

   A child renaming monster.png used to be handed "monster.png" to edit, which
   is an invitation to delete the .png - and a picture called "monster" is a
   picture the browser will not display and the game cannot draw. The ending
   belongs to the file, so it is shown and not offered. */
function NameField({ label, value, ext, readOnly, placeholder, onChange }: {
  label: string; value: string; ext: string; readOnly?: boolean; placeholder?: string;
  onChange: (value: string) => void;
}) {
  return <label>{label}
    <span className="pp-name-row">
      <input value={value} disabled={readOnly} placeholder={placeholder}
             onChange={(event) => onChange(event.target.value)} />
      {ext && <span className="pp-name-ext" title={"Saved as a " + ext.slice(1).toUpperCase() + " file"}>{ext}</span>}
    </span>
  </label>;
}

/* The ending is printed beside the box rather than in it, and a child who
   reads it there does sometimes type it in as well. monster.png.png is not a
   lesson about anything, so the second one comes off - the same thing the
   drawing window does when its name box loses focus. */
function dropExt(stem: string, ext: string): string {
  const clean = stem.trim();
  return ext && clean.length > ext.length && clean.toLowerCase().endsWith(ext.toLowerCase())
    ? clean.slice(0, -ext.length)
    : clean;
}

/* What is wrong with a typed name, or "". The name is the one a child's code
   asks for - sprite("monster.png") - so the rules are the file's rules, and
   each complaint says what to do rather than quoting them. */
function namingProblem(stem: string, ext: string, was: string, taken: string[], what: string): string {
  const clean = stem.trim();
  if (!clean) return "Give the " + what + " a name. That is the name your code asks for.";
  if (/\s/.test(clean)) return "A " + what + "'s name cannot have a space in it.";
  if (/[\\/:*?"<>|]/.test(clean)) return 'A ' + what + '\'s name cannot have \\ / : * ? " < > or | in it.';
  const full = clean + ext;
  if (full !== was && taken.includes(full)) return "There is already a " + what + " called " + full + ".";
  return "";
}

/* A sound, as the offline IDE shows one: a player, how big it is, and the
   line of code that plays it. Every sound here is a file in the student's own
   media, so there is always something to hand the <audio> element - unless it
   has not finished arriving, which the info line says.

   The name can be changed here, the way a picture's can, and for the same
   reason: a child who uploads Recording 12.mp3 off a phone should not have to
   live with it in every line of code that plays it. The .mp3 is not part of
   what they type - it is what the file is, and every sound in a game is one,
   because they are all re-encoded on the way up. */
function SoundPane({ sound, data, taken, readOnly, onSave, onCancel }: {
  sound: Sound; data?: string; taken: string[]; readOnly?: boolean;
  onSave: (name: string) => void; onCancel: () => void;
}) {
  const [stem, setStem] = useState(splitName(sound.name)[0]);
  const [problem, setProblem] = useState("");
  const ext = splitName(sound.name)[1];
  const src = data ?? "";
  const size = Math.round(src.length * 0.75 / 1024);

  useEffect(() => { setStem(splitName(sound.name)[0]); setProblem(""); }, [sound]);

  function save() {
    const clean = dropExt(stem, ext);
    const wrong = namingProblem(clean, ext, sound.name, taken, "sound");
    if (wrong) { setProblem(wrong); return; }
    onSave(clean + ext);
  }

  return <>
    <div id="assetPreviewTab"><Icon name="volume" /><span>{sound.name}</span></div>
    <div id="assetPreviewBody">
      <audio id="pp-audio" controls style={{ display: "block" }} src={src || undefined} />
    </div>
    <div id="assetPreviewInfo">{sound.name + "\n" +
      (src ? "playable \u00b7 about " + size + " KB" : "still arriving - it will play in a moment") +
      "\n\nplay_sound(\"" + sound.name + "\")"}</div>
    <div className="pp-sprite-form">
      <NameField label="Name" value={stem} ext={ext} readOnly={readOnly} placeholder="jump"
                 onChange={(next) => { setStem(next); setProblem(""); }} />
      {problem && <p className="pp-problem">{problem}</p>}
      {!readOnly && <div className="pp-form-row">
        <span className="btn btn-sec" onClick={onCancel}>Cancel</span>
        <span className="btn btn-success" onClick={save}>Save</span>
      </div>}
    </div>
  </>;
}
