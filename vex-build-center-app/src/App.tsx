import { useEffect, useMemo, useRef, useState } from "react";
import { Editor, type EditorState, type SavedPart, type ConnectRequest, type PartMenu, type ViewName } from "./editor";
import { loadManifest, CATEGORY_LABEL, CATEGORY_ORDER, type Manifest, type PartMeta, type PartCategory } from "./lib/parts";

const MM_PER_IN = 25.4;
const SAVE_KEY = "utg_vex_build";
const inch = (mm: number) => +(mm / MM_PER_IN).toFixed(1);

type Limits = { w: number; h: number; d: number; motors: number }; // w/h/d in inches

const DEFAULT_LIMITS: Limits = { w: 11, h: 15, d: 11, motors: 6 };

const EMPTY_STATE: EditorState = {
  count: 0, selectedUid: null, selectedName: null, bboxMM: { w: 0, h: 0, d: 0 },
  motors: 0, canPivot: false, overlaps: 0, canUndo: false, canRedo: false, inventory: [],
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
          <button className="tool" onClick={duplicate} disabled={!hasSel} title="Duplicate the selected part and everything pinned to it (Ctrl+D)">⧉ Copy</button>
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
          <div className="stage-hint">Click a hole then another to connect (or drag between them) · click the same hole twice for one connector · drag a part to move</div>
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
            <div className="picker-head">{connectReq.to ? `Connect ${connectReq.depth} stacked holes with…` : "Put in this hole…"}</div>
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
        </ol>
        <p className="muted small">Parts glowing red are overlapping — move one out of the way. Right-click a pin to disable it if you want to pull parts apart again.</p>

        <h2>Keys</h2>
        <div className="keys">
          {[
            ["Ctrl + Z", "Undo"], ["Ctrl + Y", "Redo"], ["Ctrl + D", "Copy the selected part"],
            ["Arrow keys", "Slide one hole"], ["] and [", "Raise / lower"],
            ["R", "Turn (Y)"], ["X", "Turn (X)"], ["Z", "Turn (Z)"],
            ["Delete", "Remove"], ["F", "Fit the view"], ["Esc", "Cancel / deselect"],
          ].map(([k, what]) => <div className="key-row" key={k}><kbd>{k}</kbd><span>{what}</span></div>)}
        </div>
        <p className="muted small">Drag on empty space to spin the view · scroll to zoom · right-drag to slide it.</p>
      </div>
    </>
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
  const map: Record<string, string> = { beam: "#2f6fb0", plate: "#3f8fd0", pin: "#e0a13a", standoff: "#8a94a6", corner: "#356fa8", gear: "#c85c3c", wheel: "#2b2f36", shaft: "#9aa3b0", spacer: "#b9c0cb", motor: "#2b7de0", brain: "#3a3f47", sensor: "#7a5cc0" };
  return p.color || map[p.category] || "#6b7787";
}
