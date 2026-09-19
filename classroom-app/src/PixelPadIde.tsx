import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import * as Y from "yjs";
import type { Awareness } from "y-protocols/awareness";
import { CollabEditor } from "./CollabEditor";
import { RunPanel } from "./RunPanel";
import { docToFiles, fileText, filesMap } from "./lib/collab";
import { MANIFEST_FILE, RGB, functionOf, panelOf, parseManifest, type Sprite } from "./lib/pixelpad";
import { apiUploadMedia } from "./lib/api";
import { compressImage } from "./lib/media";

/* The PixelPad editor, laid out like the offline one in
   vendor/pixelpad-offline.html: the things in the game down the left, the code
   for whichever one is selected in the middle - start above, loop below - and
   the stage with its console on the right.

   What is different is underneath. The offline IDE keeps its project in one
   browser's localStorage; here every panel is a file in the shared document,
   so the same code autosaves to the student's account, syncs to whoever they
   are sharing with, and appears live on the teacher's screen. This screen
   holds no state of its own except which thing is selected: press ＋ and a
   file appears, because the sidebar is a view of the files.

       Classes     Monster.start.py  +  Monster.loop.py
       Rooms       Play.start.py     +  Play.loop.py      + "room Play" in game.txt
       Functions   Helpers.fn.py
       Sprites     a "sprite" line in game.txt

   game.txt stays a file a child can open and read, because the PXP101 textbook
   teaches it as one. The sidebar writes the same lines they would type. */

type Selection =
  | { kind: "panels"; name: string }      // a class or a room: start and loop
  | { kind: "function"; name: string }    // shared code: one body
  | { kind: "sprite"; name: string }      // "" while a new one is being made
  | { kind: "file"; name: string };       // game.txt, or anything else in there

const GAME = "Game";

const startPath = (name: string) => name + ".start.py";
const loopPath = (name: string) => name + ".loop.py";
const fnPath = (name: string) => name + ".fn.py";

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
const STARTER_MANIFEST =
  "# This file tells the game about your screens and your pictures.\n" +
  "# Anything after a # is a note to yourself - the game ignores it.\n" +
  "\n" +
  "room Play\n";

export function PixelPadIde({ doc, awareness, files, token, readOnly }: {
  doc: Y.Doc; awareness: Awareness; files: Record<string, string>; token?: string; readOnly?: boolean;
}) {
  /* The parent re-derives `files` on a debounce, which is soon enough for the
     stage but not for a sidebar that has to show a new class the instant a
     child makes one. So the lists read the document directly, and this counter
     is what says "I have just written to it". */
  const [version, setVersion] = useState(0);
  const snapshot = useMemo(() => docToFiles(doc), [doc, files, version]);
  const touched = () => setVersion((n) => n + 1);

  const [selected, setSelected] = useState<Selection>({ kind: "panels", name: GAME });
  const [tabbed, setTabbed] = useState(() => localStorage.getItem("utg_pp_layout") === "tabbed");
  const [half, setHalf] = useState<"start" | "loop">("start");
  const [ask, setAsk] = useState<AskState | null>(null);

  const manifest = useMemo(() => parseManifest(snapshot[MANIFEST_FILE] ?? ""), [snapshot]);
  const hasManifest = MANIFEST_FILE in snapshot;

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
      (selected.kind === "file" && selected.name !== MANIFEST_FILE && !others.includes(selected.name));
    if (gone) setSelected({ kind: "panels", name: GAME });
  }, [classes, rooms, functions, others, manifest, selected]);

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
  function addManifestLine(word: "room" | "sprite", rest: string) {
    const lines = manifestLines();
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
  function editManifestLine(word: "room" | "sprite", name: string, replacement: string | null) {
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

  function saveSprite(was: Sprite | null, sprite: Sprite) {
    if (was) editManifestLine("sprite", was.name, "sprite " + spriteLine(sprite));
    else addManifestLine("sprite", spriteLine(sprite));
    touched();
    setSelected({ kind: "sprite", name: sprite.name });
  }

  function deleteSprite(name: string) {
    if (!window.confirm("Delete the picture " + name + "? Any code that asks for it will stop working.")) return;
    editManifestLine("sprite", name, null);
    touched();
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
    ? manifest.sprites.find((s) => s.name === selected.name) || null
    : null;

  const codeFiles: { path: string; label: string }[] =
    selected.kind === "panels" ? [
      { path: startPath(selected.name), label: selected.name + " Start" },
      { path: loopPath(selected.name), label: selected.name + " Loop" },
    ]
    : selected.kind === "function" ? [{ path: fnPath(selected.name), label: selected.name }]
    : selected.kind === "file" ? [{ path: selected.name, label: selected.name }]
    : [];

  const one = codeFiles.length === 1;

  /* A panel nobody has written yet. The starter has Game.start.py and no
     Game.loop.py, because a game with nothing moving needs no loop - so this
     is the ordinary state of a new project, not an error. Writing it is one
     press, and the file appears with the same note in it a new panel gets. */
  function pane(path: string) {
    if (path in snapshot) return <CollabEditor doc={doc} file={path} awareness={awareness} readOnly={readOnly} />;
    const name = path.slice(0, path.indexOf("."));
    const starter = path.endsWith(".fn.py") ? starterFunction(name)
      : path.endsWith(".loop.py") ? starterLoop(name)
      : rooms.includes(name) ? starterRoomStart(name) : starterStart(name);
    return <div className="pp-blank">
      <p>{path.endsWith(".loop.py")
        ? name + " does nothing over and over yet."
        : "Nothing happens when " + name + " is made yet."}</p>
      {!readOnly && <button className="secondary" onClick={() => { makeFile(path, starter); touched(); }}>Write {path}</button>}
    </div>;
  }

  return <div className="pp-ide">
    <aside className="pp-side">
      <div className="pp-layout-row">
        <button className={tabbed ? "pp-layout" : "pp-layout on"} title="Start and loop, one above the other"
                onClick={() => { setTabbed(false); localStorage.setItem("utg_pp_layout", "split"); }}>Split</button>
        <button className={tabbed ? "pp-layout on" : "pp-layout"} title="One panel at a time"
                onClick={() => { setTabbed(true); localStorage.setItem("utg_pp_layout", "tabbed"); }}>Tabs</button>
      </div>

      <SideHead title="Classes" add="New class" onAdd={readOnly ? undefined : askNewClass} />
      <ul className="pp-list">
        <SideItem name={GAME} active={selected.kind === "panels" && selected.name === GAME}
                  onOpen={() => setSelected({ kind: "panels", name: GAME })} />
        {classes.map((name) => <SideItem key={name} name={name}
          active={selected.kind === "panels" && selected.name === name}
          onOpen={() => setSelected({ kind: "panels", name })}
          onRename={readOnly ? undefined : () => askRename(name, "panels")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "panels")} />)}
      </ul>

      <SideHead title="Rooms" add="New room" onAdd={readOnly ? undefined : askNewRoom} />
      <ul className="pp-list">
        {rooms.length === 0 && <li className="pp-empty">No screens yet.</li>}
        {rooms.map((name) => <SideItem key={name} name={name}
          active={selected.kind === "panels" && selected.name === name}
          onOpen={() => setSelected({ kind: "panels", name })}
          onRename={readOnly ? undefined : () => askRename(name, "panels")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "panels")} />)}
      </ul>

      <SideHead title="Sprites" add="New picture" onAdd={readOnly ? undefined : () => setSelected({ kind: "sprite", name: "" })} />
      <ul className="pp-list">
        {manifest.sprites.length === 0 && <li className="pp-empty">No pictures yet.</li>}
        {manifest.sprites.map((sprite) => <SideItem key={sprite.name} name={sprite.name}
          active={selected.kind === "sprite" && selected.name === sprite.name}
          onOpen={() => setSelected({ kind: "sprite", name: sprite.name })}
          onDelete={readOnly ? undefined : () => deleteSprite(sprite.name)} />)}
      </ul>

      <SideHead title="Functions" add="New function" onAdd={readOnly ? undefined : askNewFunction} />
      <ul className="pp-list">
        {functions.length === 0 && <li className="pp-empty">None yet.</li>}
        {functions.map((name) => <SideItem key={name} name={name}
          active={selected.kind === "function" && selected.name === name}
          onOpen={() => setSelected({ kind: "function", name })}
          onRename={readOnly ? undefined : () => askRename(name, "function")}
          onDelete={readOnly ? undefined : () => deleteThing(name, "function")} />)}
      </ul>

      <SideHead title="Project" />
      <ul className="pp-list">
        <SideItem name={MANIFEST_FILE} active={selected.kind === "file" && selected.name === MANIFEST_FILE}
                  onOpen={() => setSelected({ kind: "file", name: MANIFEST_FILE })} />
        {others.map((path) => <SideItem key={path} name={path}
          active={selected.kind === "file" && selected.name === path}
          onOpen={() => setSelected({ kind: "file", name: path })}
          onDelete={readOnly ? undefined : () => deleteFile(path)} />)}
      </ul>
    </aside>

    <section className="pp-code">
      {selected.kind === "sprite"
        ? <SpriteBox sprite={spriteShown} taken={manifest.sprites.map((s) => s.name)} token={token} readOnly={readOnly}
                     onSave={(sprite) => saveSprite(spriteShown, sprite)}
                     onCancel={() => setSelected({ kind: "panels", name: GAME })} />
        : selected.kind === "file" && selected.name === MANIFEST_FILE && !hasManifest
          ? <div className="pp-blank">
              <h3>This game has no {MANIFEST_FILE}</h3>
              <p>That is the file that says which of your screens is a room, and what your pictures are called.</p>
              {!readOnly && <button className="primary" onClick={() => { makeFile(MANIFEST_FILE, STARTER_MANIFEST); touched(); }}>Make {MANIFEST_FILE}</button>}
            </div>
        : tabbed || one
          ? <div className="pp-panes">
              <div className="pp-tabs">
                {codeFiles.map((file, index) => <button key={file.path}
                  className={one || (half === "start") === (index === 0) ? "pp-tab active" : "pp-tab"}
                  onClick={() => setHalf(index === 0 ? "start" : "loop")}>{file.label}</button>)}
              </div>
              <div className="pp-host">{pane(one || half === "start" ? codeFiles[0].path : codeFiles[1].path)}</div>
            </div>
          : <div className="pp-panes split">
              {codeFiles.map((file, index) => <div key={file.path} className="pp-half">
                <button className={(half === "start") === (index === 0) ? "pp-tab active" : "pp-tab"}
                        onClick={() => setHalf(index === 0 ? "start" : "loop")}>{file.label}</button>
                <div className="pp-host">{pane(file.path)}</div>
              </div>)}
            </div>}
    </section>

    <RunPanel files={snapshot} kind="pixelpad" />

    {ask && <AskBox state={ask} onClose={() => setAsk(null)} />}
  </div>;
}

const spriteLine = (sprite: Sprite) =>
  sprite.name + " " + sprite.source + " " + sprite.width + " " + sprite.height;

function SideHead({ title, add, onAdd }: { title: string; add?: string; onAdd?: () => void }) {
  return <div className="pp-head">
    <span>{title}</span>
    {onAdd && <button className="pp-add" title={add} aria-label={add} onClick={onAdd}>＋</button>}
  </div>;
}

function SideItem({ name, active, onOpen, onRename, onDelete }: {
  name: string; active: boolean; onOpen: () => void; onRename?: () => void; onDelete?: () => void;
}) {
  return <li className={active ? "pp-item active" : "pp-item"}>
    <button className="pp-open" onClick={onOpen} onDoubleClick={onRename}
            title={onRename ? name + " - double-click to rename" : name}>{name}</button>
    {onDelete && <button className="pp-kill" title={"Delete " + name} aria-label={"Delete " + name} onClick={onDelete}>✕</button>}
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
  return <div className="pp-modal" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="pp-box">
      <h3>{state.title}</h3>
      <label>{state.label}
        <input ref={input} value={value} onChange={(event) => { setValue(event.target.value); setProblem(""); }}
               onKeyDown={(event) => { if (event.key === "Enter") submit(); if (event.key === "Escape") onClose(); }} />
      </label>
      {problem && <p className="pp-problem">{problem}</p>}
      <div className="pp-box-row">
        <button className="text-button" onClick={onClose}>Cancel</button>
        <button className="primary" onClick={submit}>OK</button>
      </div>
    </div>
  </div>;
}

/* A picture, as game.txt describes it: a name, something to draw, and how big
   it is. "Something to draw" is a colour while a game is being built - a plain
   square is enough to watch a thing move - or a picture the child drew. The
   offline IDE keeps that picture in this browser; here it goes to the
   student's own media on the server, which is what makes it survive the next
   laptop they sit down at. */
function SpriteBox({ sprite, taken, token, readOnly, onSave, onCancel }: {
  sprite: Sprite | null; taken: string[]; token?: string; readOnly?: boolean;
  onSave: (sprite: Sprite) => void; onCancel: () => void;
}) {
  const [name, setName] = useState(sprite?.name ?? "");
  const [source, setSource] = useState(sprite?.source ?? "green");
  const [width, setWidth] = useState(String(sprite?.width ?? 48));
  const [height, setHeight] = useState(String(sprite?.height ?? 48));
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setName(sprite?.name ?? ""); setSource(sprite?.source ?? "green");
    setWidth(String(sprite?.width ?? 48)); setHeight(String(sprite?.height ?? 48));
    setProblem("");
  }, [sprite]);

  const isLink = /^(https?:|data:)/i.test(source);

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
    if (clean !== sprite?.name && taken.includes(clean)) { setProblem("There is already a picture called " + clean + "."); return; }
    const w = Number(width), h = Number(height);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) { setProblem("The width and the height have to be numbers bigger than zero."); return; }
    if (!isLink && !(source in RGB)) { setProblem("Pick a colour, or upload a picture."); return; }
    onSave({ name: clean, source, width: Math.round(w), height: Math.round(h) });
  }

  return <div className="pp-sprite">
    <div className="pp-tabs"><span className="pp-tab active">{sprite ? sprite.name : "New picture"}</span></div>
    <div className="pp-sprite-body">
      {isLink
        ? <img src={source} alt={name || "picture"} />
        : <span className="pp-swatch" style={{
            background: "rgb(" + (RGB[source] || RGB.green).join(",") + ")",
            width: Math.min(220, Math.max(16, Number(width) || 48)) + "px",
            height: Math.min(220, Math.max(16, Number(height) || 48)) + "px",
          }} />}
    </div>
    <div className="pp-sprite-form">
      <label>Name<input value={name} disabled={readOnly} placeholder="monster.png" onChange={(event) => setName(event.target.value)} /></label>
      <label>Colour
        <select value={isLink ? "" : source} disabled={readOnly} onChange={(event) => setSource(event.target.value)}>
          {isLink && <option value="">your own picture</option>}
          {Object.keys(RGB).map((colour) => <option key={colour} value={colour}>{colour}</option>)}
        </select>
      </label>
      <label>Wide<input value={width} disabled={readOnly} onChange={(event) => setWidth(event.target.value)} /></label>
      <label>High<input value={height} disabled={readOnly} onChange={(event) => setHeight(event.target.value)} /></label>
      {token && !readOnly && <label className="file-button">{busy ? "Uploading…" : "Upload a picture"}
        <input type="file" accept="image/*" onChange={upload} disabled={busy} /></label>}
      {!token && <span className="muted">Drawn your own? Upload it under My media, then paste its link here.</span>}
      {problem && <p className="pp-problem">{problem}</p>}
      {!readOnly && <div className="pp-box-row">
        <button className="text-button" onClick={onCancel}>Cancel</button>
        <button className="primary" onClick={save}>{sprite ? "Save" : "Add picture"}</button>
      </div>}
      <p className="muted">Your code asks for it by name: <code>self.image = sprite('{name || "monster.png"}')</code></p>
    </div>
  </div>;
}
