import { useEffect, useMemo, useRef, useState } from "react";
import { Editor, STOPPED, type EditorState, type SavedPart, type ConnectRequest, type PartMenu, type ViewName, type RunInfo } from "./editor";
import { Gallery, type Example } from "./Gallery";
import { loadManifest, CATEGORY_COLOR, CATEGORY_LABEL, CATEGORY_ORDER, type Manifest, type PartMeta, type PartCategory } from "./lib/parts";

const MM_PER_IN = 25.4;
const SAVE_KEY = "utg_vex_build";
const inch = (mm: number) => +(mm / MM_PER_IN).toFixed(1);

type Limits = { w: number; h: number; d: number; motors: number }; // w/h/d in inches

const DEFAULT_LIMITS: Limits = { w: 11, h: 15, d: 11, motors: 6 };

const EMPTY_STATE: EditorState = {
  count: 0, selectedUid: null, selectedName: null, bboxMM: { w: 0, h: 0, d: 0 },
  motors: 0, canPivot: false, overlaps: 0, canUndo: false, canRedo: false, inventory: [],
  gearInfo: null, running: false,
};

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [state, setState] = useState<EditorState>(EMPTY_STATE);
  const [limits, setLimits] = useState<Limits>(() => {
    try { return { ...DEFAULT_LIMITS, ...JSON.parse(localStorage.getItem("utg_vex_limits") || "{}") }; } catch { return DEFAULT_LIMITS; }
  });
  const [status, setStatus] = useState("Loading parts…");
  const [error, setError] = useState("");
  const [connectReq, setConnectReq] = useState<ConnectRequest | null>(null);
  const [partMenu, setPartMenu] = useState<PartMenu | null>(null);
  const [search, setSearch] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [run, setRun] = useState<RunInfo>(STOPPED);
  const [gizmoMode, setGizmoMode] = useState<"translate" | "rotate">("translate");

  const metaById = useMemo(() => new Map((manifest?.parts || []).map((p) => [p.id, p])), [manifest]);

  useEffect(() => {
    loadManifest().then(setManifest).catch(() => setError("The parts library failed to load."));
  }, []);

  useEffect(() => {
    if (!manifest || !mountRef.current) return;
    let ed: Editor;
    try {
      // A locked-down or driver-broken machine throws here. Without the catch
      // the whole page went blank instead of saying what was wrong.
      ed = new Editor(mountRef.current);
    } catch {
      setError("This computer could not start 3D graphics (WebGL). Try updating the graphics driver, or open the tool in a different browser.");
      return;
    }
    ed.setCatalog(metaById); // so Undo and Duplicate can rebuild any part
    ed.onChange = setState;
    ed.onConnect = setConnectReq;
    ed.onPartMenu = setPartMenu;
    ed.onRun = (info) => {
      setRun(info);
      // An edit made while running ends the run; don't leave "Running!" up after it.
      if (!info.running) setStatus("Stopped. Everything is back where you built it.");
    };
    ed.onArmChange = (armed) => setStatus(armed
      ? "First hole picked — click another hole to connect, or click it again for a single connector. (Esc cancels)"
      : "Pick a part on the left, or click a hole to start a connection.");
    editorRef.current = ed;
    setStatus("Pick a part on the left to start building.");
    return () => { ed.dispose(); editorRef.current = null; };
  }, [manifest, metaById]);

  useEffect(() => { localStorage.setItem("utg_vex_limits", JSON.stringify(limits)); }, [limits]);

  async function undo() {
    if (await editorRef.current?.undo()) setStatus("Undone. (Ctrl+Y puts it back)");
    else setStatus("Nothing left to undo.");
  }
  async function redo() {
    if (await editorRef.current?.redo()) setStatus("Redone.");
    else setStatus("Nothing left to redo.");
  }
  async function duplicate() {
    const ed = editorRef.current;
    if (!ed || !state.selectedUid) return;
    await ed.duplicateSelected();
    setStatus("Copied — the new one is sitting next to the original.");
  }
  function toggleRun() {
    const ed = editorRef.current;
    if (!ed) return;
    if (ed.isRunning()) { ed.stopRun(); setStatus("Stopped. Everything is back where you built it."); return; }
    setConnectReq(null); setPartMenu(null);
    const info = ed.startRun();
    setStatus(info.movingParts
      ? "Running! Drag a moving part to turn it by hand. Press Stop to go back to building."
      : "Nothing in your build can move yet. Join parts with ONE pin to make a hinge, or put a gear on an axle.");
  }
  function chooseGizmo(mode: "translate" | "rotate") {
    setGizmoMode(mode);
    editorRef.current?.setGizmoMode(mode);
    setStatus(mode === "translate"
      ? "Move: drag an arrow to slide the part along it, one half hole at a time."
      : "Turn: drag a ring to turn the part a quarter turn at a time.");
  }
  async function openExample({ file, name }: Example) {
    setShowExamples(false);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}examples/${file}`);
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json() as SavedPart[];
      await editorRef.current?.load(data, metaById);
      editorRef.current?.frameAll();
      setStatus(`Opened "${name}". Press \u25B6 Run to watch it move. Ctrl+Z puts your old build back.`);
    } catch { setStatus("That example could not be opened. Check the internet connection."); }
  }
  function view(v: ViewName, label: string) {
    editorRef.current?.setView(v);
    setStatus(`${label} view.`);
  }

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ed = editorRef.current; if (!ed) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;

      if (e.ctrlKey || e.metaKey) {
        const k = e.key.toLowerCase();
        if (k === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
        else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
        else if (k === "d") { e.preventDefault(); duplicate(); }
        return; // every other Ctrl/Cmd combo belongs to the browser
      }
      if (e.altKey) return;
      if (e.key === " ") { e.preventDefault(); toggleRun(); return; }
      if (ed.isRunning()) { if (e.key === "Escape") toggleRun(); return; } // building keys wait until Stop

      if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); ed.deleteSelected(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); ed.moveSelected(-1, 0); }
      else if (e.key === "ArrowRight") { e.preventDefault(); ed.moveSelected(1, 0); }
      else if (e.key === "ArrowUp") { e.preventDefault(); ed.moveSelected(0, 1); }
      else if (e.key === "ArrowDown") { e.preventDefault(); ed.moveSelected(0, -1); }
      else if (e.key === "r" || e.key === "R") ed.rotateSelected("y");
      else if (e.key === "x" || e.key === "X") ed.rotateSelected("x");
      else if (e.key === "z" || e.key === "Z") ed.rotateSelected("z");
      else if (e.key === "]") ed.nudgeSelectedY(1);
      else if (e.key === "[") ed.nudgeSelectedY(-1);
      else if (e.key === "f" || e.key === "F") ed.frameAll();
      else if (e.key === "m" || e.key === "M") chooseGizmo("translate");
      else if (e.key === "t" || e.key === "T") chooseGizmo("rotate");
      else if (e.key === "?") setShowHelp(true);
      else if (e.key === "Escape") { ed.clearArm(); ed.selectByUid(null); setConnectReq(null); setPartMenu(null); setShowHelp(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.selectedUid]);

  function add(meta: PartMeta) { editorRef.current?.addPart(meta); setStatus(`Added ${meta.name}. Drag to move · R to rotate · Del to remove.`); }
  function save() {
    const data: SavedPart[] = editorRef.current?.serialize() || [];
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    setStatus(`Saved your build (${data.length} parts) to this device.`);
  }
  async function load() {
    try {
      const data = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]") as SavedPart[];
      if (!data.length) { setStatus("No saved build on this device yet."); return; }
      await editorRef.current?.load(data, metaById);
      editorRef.current?.frameAll();
      setStatus(`Loaded your saved build (${data.length} parts). Ctrl+Z undoes it.`);
    } catch { setStatus("That saved build could not be opened."); }
  }
  // A file the student can keep, take home, or hand in.
  function exportFile() {
    const data = editorRef.current?.serialize() || [];
    if (!data.length) { setStatus("Nothing to export yet — build something first."); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `vex-build-${data.length}-parts.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus(`Exported ${data.length} parts to your Downloads folder.`);
  }
  async function importFile(file: File) {
    try {
      const data = JSON.parse(await file.text()) as SavedPart[];
      if (!Array.isArray(data) || !data.every((s) => s && typeof s.id === "string")) throw new Error("bad shape");
      await editorRef.current?.load(data, metaById);
      editorRef.current?.frameAll();
      const missing = data.filter((s) => !metaById.has(s.id)).length;
      setStatus(missing
        ? `Opened ${data.length - missing} parts — ${missing} weren't in this parts library.`
        : `Opened ${file.name} (${data.length} parts).`);
    } catch { setStatus("That file isn't a VEX Build Center build."); }
  }
  function clear() { if (confirm("Clear the whole build?")) { editorRef.current?.clear(); setStatus("Cleared — Ctrl+Z brings it back if that was a mistake."); } }

  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const by = new Map<PartCategory, PartMeta[]>();
    for (const p of manifest?.parts || []) {
      if (q && !p.name.toLowerCase().includes(q) && !p.id.includes(q)) continue;
      const a = by.get(p.category) || []; a.push(p); by.set(p.category, a);
    }
    return CATEGORY_ORDER.filter((c) => by.has(c)).map((c) => ({ category: c, parts: by.get(c)! }));
  }, [manifest, search]);

  const connectors = useMemo(() => (manifest?.parts || []).filter((p) => p.category === "pin" || p.category === "shaft" || p.category === "standoff"), [manifest]);

  // Connector choices for the open request, shortest-pin-that-reaches first.
  // A kid shouldn't have to work out which of thirty pins is long enough.
  const choices = useMemo(() => {
    if (!connectReq) return [];
    const depth = connectReq.depth;
    if (connectReq.axle) {
      // A square hole only takes an axle. A motor's socket wants a motor axle, which reaches
      // two half holes deeper because part of it sits inside the motor.
      const shafts = connectors.filter((c) => c.category === "shaft").sort((a, b) => holeSpan(a) - holeSpan(b));
      const isMotorShaft = (c: PartMeta) => c.id.startsWith("shaft-motor");
      const isPlainShaft = (c: PartMeta) => /^shaft-\d+x$/.test(c.id);
      const ordered = connectReq.socket
        ? [...shafts.filter(isMotorShaft), ...shafts.filter((c) => !isMotorShaft(c))]
        : [...shafts.filter(isPlainShaft), ...shafts.filter((c) => !isPlainShaft(c))];
      const best = connectReq.socket
        ? ordered.find((c) => isMotorShaft(c) && holeSpan(c) >= depth + 2) || ordered.find(isMotorShaft)
        : ordered.find((c) => isPlainShaft(c) && holeSpan(c) >= depth);
      const first = best ? [best, ...ordered.filter((c) => c !== best)] : ordered;
      return first.map((meta) => ({ meta, best: meta === best }));
    }
    const usable = connectors.filter((c) => c.category !== "pin" || holeSpan(c) >= depth);
    const pins = usable.filter((c) => c.category === "pin").sort((a, b) => holeSpan(a) - holeSpan(b));
    const rest = usable.filter((c) => c.category !== "pin");
    return [...pins, ...rest].map((meta, i) => ({ meta, best: i === 0 && pins.length > 0 }));
  }, [connectReq, connectors]);

  const inventory = useMemo(() => {
    const order = new Map(CATEGORY_ORDER.map((c, i) => [c as string, i]));
    return [...state.inventory].sort((a, b) => (order.get(a.category) ?? 99) - (order.get(b.category) ?? 99) || a.name.localeCompare(b.name));
  }, [state.inventory]);

  const sizeIn = { w: inch(state.bboxMM.w), h: inch(state.bboxMM.h), d: inch(state.bboxMM.d) };
  const over = { w: sizeIn.w > limits.w, h: sizeIn.h > limits.h, d: sizeIn.d > limits.d, motors: state.motors > limits.motors };
  const anyOver = over.w || over.h || over.d || over.motors;
  const hasSel = !!state.selectedUid;

  if (error) return <main className="shell"><div className="fatal">{error}</div></main>;

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="../"><img src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /><span>VEX Build Center</span></a>
        <div className="toolbar">
          <button className="tool" onClick={undo} disabled={!state.canUndo} title="Undo (Ctrl+Z)">↶ Undo</button>
          <button className="tool" onClick={redo} disabled={!state.canRedo} title="Redo (Ctrl+Y)">↷ Redo</button>
          <button className="tool" onClick={duplicate} disabled={!hasSel || run.running} title="Duplicate the selected part and everything pinned to it (Ctrl+D)">⧉ Copy</button>
          <button className={`tool run-btn ${run.running ? "stop" : ""}`} onClick={toggleRun} disabled={!state.count} title="Watch your build move (Space)">
            {run.running ? "■ Stop" : "▶ Run"}
          </button>
          <button className="tool" onClick={() => setShowExamples(true)} title="Open a ready-made build">Examples</button>
        </div>
        <div className="badges">
          {state.overlaps > 0 && (
            <div className="legality warn" title="Parts highlighted red are clipping into each other">
              ⚠ {state.overlaps} part{state.overlaps === 1 ? "" : "s"} overlapping
            </div>
          )}
          <div className={`legality ${anyOver ? "bad" : "good"}`}>{state.count ? (anyOver ? "Over the limits" : "Within the limits") : "Empty build"}</div>
          <button className="tool help-btn" onClick={() => setShowHelp(true)} title="How to build · keyboard shortcuts">? Help</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="palette">
          <h2>Parts</h2>
          <input className="pal-search" type="search" placeholder="Search parts…" value={search} onChange={(e) => setSearch(e.target.value)} />
          {!manifest && <p className="muted">Loading…</p>}
          {manifest && !groups.length && <p className="muted small">No part matches “{search}”.</p>}
          {groups.map((g) => (
            <section key={g.category} className="pal-group">
              <h3>{CATEGORY_LABEL[g.category]}</h3>
              <div className="pal-grid">
                {g.parts.map((p) => (
                  <button key={p.id} className="pal-item" onClick={() => add(p)} title={p.name}>
                    <span className="pal-swatch" style={{ background: swatch(p) }} />
                    <span className="pal-name">{p.name}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </aside>

        <div className="stage">
          <div className="canvas-host" ref={mountRef} />
          <div className="view-bar">
            <button onClick={() => view("corner", "3D")} title="Three-quarter view (F)">3D</button>
            <button onClick={() => view("front", "Front")} title="Look at the front">Front</button>
            <button onClick={() => view("side", "Side")} title="Look at the side">Side</button>
            <button onClick={() => view("top", "Top")} title="Look from above">Top</button>
          </div>
          {!run.running && (
            <div className="gizmo-bar">
              <button className={gizmoMode === "translate" ? "on" : ""} onClick={() => chooseGizmo("translate")} title="Arrows on the selected part slide it (M)">✥ Move</button>
              <button className={gizmoMode === "rotate" ? "on" : ""} onClick={() => chooseGizmo("rotate")} title="Rings on the selected part turn it (T)">⟳ Turn</button>
            </div>
          )}
          {run.running && <RunPanel run={run} editor={editorRef.current} />}
          <div className="stage-hint">{run.running
            ? "Drag a moving part to turn it by hand · click one to draw its path · orange rings are pivots"
            : "Click a hole, then another, to connect them · blue = pin hole, green = axle hole · drag a part or its arrows to move it"}</div>
        </div>

        <aside className="inspector">
          <section className="card">
            <h3>Robot size</h3>
            <div className="dims">
              <Dim label="Width" mm={state.bboxMM.w} inV={sizeIn.w} limit={limits.w} over={over.w} onLimit={(v) => setLimits({ ...limits, w: v })} />
              <Dim label="Height" mm={state.bboxMM.h} inV={sizeIn.h} limit={limits.h} over={over.h} onLimit={(v) => setLimits({ ...limits, h: v })} />
              <Dim label="Depth" mm={state.bboxMM.d} inV={sizeIn.d} limit={limits.d} over={over.d} onLimit={(v) => setLimits({ ...limits, d: v })} />
            </div>
            <p className="muted small">Limits are in inches — set them to your season's rules.</p>
          </section>

          <section className="card">
            <h3>Motors</h3>
            <div className={`motor-row ${over.motors ? "over" : ""}`}>
              <span className="motor-count">{state.motors}</span>
              <span className="muted">of</span>
              <input type="number" min={0} value={limits.motors} onChange={(e) => setLimits({ ...limits, motors: Math.max(0, +e.target.value || 0) })} />
              <span className="muted">max</span>
            </div>
          </section>

          <section className="card">
            <h3>Selected part</h3>
            {hasSel ? (
              <>
                <p className="sel-name">{state.selectedName}</p>
                {state.gearInfo && <p className="gear-info">{state.gearInfo}</p>}
                {state.canPivot && (
                  <div className="btn-row">
                    <button className="pivot" onClick={() => { editorRef.current?.pivotSelected(); setStatus("Pivoted 90° around the pin."); }}>⟳ Pivot on pin 90°</button>
                  </div>
                )}
                <div className="btn-row">
                  <button onClick={() => editorRef.current?.rotateSelected("x")}>Rotate X</button>
                  <button onClick={() => editorRef.current?.rotateSelected("y")}>Rotate Y</button>
                  <button onClick={() => editorRef.current?.rotateSelected("z")}>Rotate Z</button>
                </div>
                <div className="btn-row">
                  <button onClick={() => editorRef.current?.nudgeSelectedY(1)}>Raise</button>
                  <button onClick={() => editorRef.current?.nudgeSelectedY(-1)}>Lower</button>
                  <button onClick={duplicate}>Copy</button>
                </div>
                <div className="btn-row">
                  <button className="danger" onClick={() => editorRef.current?.deleteSelected()}>Delete</button>
                </div>
                <p className="muted small">Arrow keys slide it one hole at a time.</p>
              </>
            ) : <p className="muted small">Click a part in the scene to select it.</p>}
          </section>

          <section className="card">
            <h3>Parts list · {state.count} total</h3>
            {inventory.length ? (
              <>
                <ul className="bom">
                  {inventory.map((row) => (
                    <li key={row.id}><span className="bom-n">{row.count}×</span><span className="bom-name">{row.name}</span></li>
                  ))}
                </ul>
                <div className="btn-row">
                  <button onClick={() => copyList(inventory.map((r) => `${r.count} x ${r.name}`).join("\n"), setStatus)}>Copy list</button>
                </div>
                <p className="muted small">Everything you'd take off the shelf to build this for real.</p>
              </>
            ) : <p className="muted small">Add parts and they'll be counted up here.</p>}
          </section>

          <section className="card">
            <h3>Your build</h3>
            <div className="btn-row">
              <button onClick={save}>Save</button>
              <button onClick={load}>Load</button>
              <button onClick={() => editorRef.current?.frameAll()}>Fit view</button>
            </div>
            <div className="btn-row">
              <button onClick={exportFile}>Export file</button>
              <button onClick={() => fileRef.current?.click()}>Open file</button>
            </div>
            <div className="btn-row">
              <button className="danger" onClick={clear}>Clear all</button>
            </div>
            <input
              ref={fileRef} type="file" accept="application/json,.json" hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) importFile(f); e.target.value = ""; }}
            />
            <p className="muted small">Save keeps it on this computer. Export makes a file you can take with you.</p>
          </section>
        </aside>
      </div>

      {connectReq && (
        <>
          <div className="picker-scrim" onClick={() => setConnectReq(null)} />
          <div className="picker" style={{ left: Math.min(connectReq.screen.x, window.innerWidth - 210), top: Math.min(connectReq.screen.y, window.innerHeight - 260) }}>
            <div className="picker-head">{connectReq.axle
              ? (connectReq.socket ? "Put an axle in the motor…" : "Square hole: it takes an axle…")
              : connectReq.to ? `Connect ${connectReq.depth} stacked holes with…` : "Put in this hole…"}</div>
            <div className="picker-grid">
              {choices.map(({ meta: c, best }) => (
                <button key={c.id} className={`picker-item ${best ? "best" : ""}`} onClick={() => { editorRef.current?.connect(connectReq.from, connectReq.to, c); setConnectReq(null); setStatus(`Placed ${c.name}.`); }}>
                  <span className="pal-swatch" style={{ background: swatch(c) }} />
                  <span className="picker-name">{c.name}</span>
                  {best && <span className="pill">best fit</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {partMenu && (
        <>
          <div className="picker-scrim" onClick={() => setPartMenu(null)} />
          <div className="picker" style={{ left: Math.min(partMenu.screen.x, window.innerWidth - 210), top: Math.min(partMenu.screen.y, window.innerHeight - 300) }}>
            <div className="picker-head">{partMenu.name}{partMenu.disabled ? " · disabled" : ""}</div>
            <button className="picker-item" onClick={() => { editorRef.current?.setPinEnabled(partMenu.uid, partMenu.disabled); setPartMenu(null); setStatus(partMenu.disabled ? "Pin enabled — parts are stuck together." : "Pin disabled — you can pull the parts apart."); }}>{partMenu.disabled ? "Enable (stick parts)" : "Disable (release parts)"}</button>
            <button className="picker-item danger" onClick={() => { editorRef.current?.deletePartByUid(partMenu.uid); setPartMenu(null); setStatus("Removed the pin."); }}>Delete pin</button>
            <div className="picker-head" style={{ paddingTop: 8 }}>Replace with…</div>
            <div className="picker-grid">
              {connectors.map((c) => (
                <button key={c.id} className="picker-item" onClick={() => { editorRef.current?.replaceConnector(partMenu.uid, c); setPartMenu(null); setStatus(`Replaced with ${c.name}.`); }}>
                  <span className="pal-swatch" style={{ background: swatch(c) }} /><span className="picker-name">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {showHelp && <Help onClose={() => setShowHelp(false)} />}

      {showExamples && <Gallery onOpen={openExample} onClose={() => setShowExamples(false)} />}

      <footer className="statusbar">{status}</footer>
    </main>
  );
}

function Help({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="modal-scrim" onClick={onClose} />
      <div className="modal" role="dialog" aria-label="How to build">
        <button className="modal-x" onClick={onClose} aria-label="Close">×</button>
        <h2>How to build</h2>
        <ol className="steps">
          <li><b>Pick a part</b> from the left. It lands on the grid.</li>
          <li><b>Drag it</b> to move it. It snaps to the grid so parts line up.</li>
          <li><b>Click a blue hole</b>, then click another hole on a different part. The first part you clicked flies over and lines up.</li>
          <li><b>Choose a pin</b> from the little menu — the top one is already the right length.</li>
          <li><b>Gold circles</b> are built-in pins on corner brackets. Click one, then a hole, and they plug straight together.</li>
          <li><b>Green squares</b> are axle holes: the middle of a gear or wheel, and the motor's socket. An axle turns whatever has a square hole on it.</li>
        </ol>

        <h2>Make it move</h2>
        <ol className="steps">
          <li><b>One pin</b> between two parts makes a hinge: they can swing. <b>Two pins</b> hold them solid.</li>
          <li><b>Gears mesh</b> when they sit side by side in the same layer and their teeth touch. Select a gear and it tells you if it is meshing.</li>
          <li>Put an axle in the <b>motor's green socket</b> and through a gear, then press <b>▶ Run</b>.</li>
          <li>While it runs, <b>drag</b> a moving part to turn it by hand, and <b>click</b> one to draw the path it makes.</li>
        </ol>
        <p className="muted small">Parts glowing red are overlapping — move one out of the way. Right-click a pin to disable it if you want to pull parts apart again.</p>

        <h2>Keys</h2>
        <div className="keys">
          {[
            ["Ctrl + Z", "Undo"], ["Ctrl + Y", "Redo"], ["Ctrl + D", "Copy the selected part"],
            ["Arrow keys", "Slide one hole"], ["] and [", "Raise / lower"],
            ["R", "Turn (Y)"], ["X", "Turn (X)"], ["Z", "Turn (Z)"],
            ["Delete", "Remove"], ["F", "Fit the view"], ["Esc", "Cancel / deselect"],
            ["M", "Move arrows"], ["T", "Turn rings"], ["Space", "Run / Stop"],
          ].map(([k, what]) => <div className="key-row" key={k}><kbd>{k}</kbd><span>{what}</span></div>)}
        </div>
        <p className="muted small">Drag on empty space to spin the view · scroll to zoom · right-drag to slide it.</p>
      </div>
    </>
  );
}

// What the build is doing while it runs: motor speeds, how fast each part spins, and why.
function RunPanel({ run, editor }: { run: RunInfo; editor: Editor | null }) {
  const turnsPerMinute = (rpm: number) => `${Math.abs(rpm) < 0.5 ? 0 : Math.round(Math.abs(rpm))} rpm`;
  return (
    <div className="run-panel">
      <h3>{run.moving ? "Running" : "Stuck!"}</h3>
      {!run.moving && <p className="run-stuck">The motor is stuck: something in your build stops it from turning. Look for a part held by two pins that needs to swing.</p>}
      {run.movingParts === 0 && <p className="run-note">Nothing can move yet. One pin between two parts makes a hinge, and an axle in the motor turns what is on it.</p>}
      {run.motors.map((motor) => (
        <div className="run-motor" key={motor.uid}>
          <div className="run-row"><b>{motor.name}</b><span>{motor.stalled ? "stuck" : turnsPerMinute(motor.rpm)}</span></div>
          <input
            type="range" min={-100} max={100} step={5} value={motor.speedPercent}
            onChange={(e) => editor?.setMotorSpeed(motor.uid, +e.target.value)}
            aria-label={`${motor.name} speed`}
          />
          <div className="run-scale"><span>backward</span><span>{motor.speedPercent}%</span><span>forward</span></div>
        </div>
      ))}
      {run.meshes.map((mesh, index) => {
        const ratio = mesh.drivenTeeth / mesh.driverTeeth;
        const shown = Math.round(ratio * 10) / 10;
        return (
          <p className="run-mesh" key={index}>
            <b>{mesh.driver}</b> turns <b>{mesh.driven}</b>: {ratio > 1.01
              ? `${shown}\u00d7 slower, ${shown}\u00d7 the turning force`
              : ratio < 0.99 ? `${Math.round(10 / ratio) / 10}\u00d7 faster, less turning force` : "same speed"}, {mesh.chain ? "the same way round, through the chain" : "the other way round"}.
          </p>
        );
      })}
      {run.spins.length > 0 && (
        <ul className="run-spins">
          {run.spins.map((spin, index) => <li key={index}><span>{spin.label}</span><span>{turnsPerMinute(spin.rpm)}</span></li>)}
        </ul>
      )}
      {run.notes.map((note, index) => <p className="run-note" key={index}>{note}</p>)}
      {run.tracing && <button className="tool" onClick={() => editor?.clearTrace()}>Clear path</button>}
    </div>
  );
}

function Dim({ label, mm, inV, limit, over, onLimit }: { label: string; mm: number; inV: number; limit: number; over: boolean; onLimit: (v: number) => void }) {
  return (
    <div className={`dim ${over ? "over" : ""}`}>
      <span className="dim-label">{label}</span>
      <span className="dim-val">{inV}<small>in</small> <span className="muted">/ {mm}mm</span></span>
      <label className="dim-limit">≤ <input type="number" min={0} step={0.5} value={limit} onChange={(e) => onLimit(Math.max(0, +e.target.value || 0))} /> in</label>
    </div>
  );
}

function copyList(text: string, setStatus: (s: string) => void) {
  navigator.clipboard?.writeText(text)
    .then(() => setStatus("Parts list copied — paste it into your notes."))
    .catch(() => setStatus("Couldn't copy the list on this computer."));
}

// How many aligned holes a connector spans (half-pitch = 6.35mm per hole).
function holeSpan(m: PartMeta): number { return Math.round(Math.max(...m.sizeMM) / 6.35); }

function swatch(p: PartMeta): string {
  return p.color || CATEGORY_COLOR[p.category] || "#6b7787";
}
