import { useEffect, useMemo, useRef, useState } from "react";
import { Editor, type EditorState, type SavedPart, type ConnectRequest } from "./editor";
import { loadManifest, CATEGORY_LABEL, CATEGORY_ORDER, type Manifest, type PartMeta } from "./lib/parts";

const MM_PER_IN = 25.4;
const SAVE_KEY = "utg_vex_build";
const inch = (mm: number) => +(mm / MM_PER_IN).toFixed(1);

type Limits = { w: number; h: number; d: number; motors: number }; // w/h/d in inches

const DEFAULT_LIMITS: Limits = { w: 11, h: 15, d: 11, motors: 6 };

export default function App() {
  const mountRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [state, setState] = useState<EditorState>({ count: 0, selectedUid: null, selectedName: null, bboxMM: { w: 0, h: 0, d: 0 }, motors: 0 });
  const [limits, setLimits] = useState<Limits>(() => {
    try { return { ...DEFAULT_LIMITS, ...JSON.parse(localStorage.getItem("utg_vex_limits") || "{}") }; } catch { return DEFAULT_LIMITS; }
  });
  const [status, setStatus] = useState("Loading parts…");
  const [error, setError] = useState("");
  const [connectReq, setConnectReq] = useState<ConnectRequest | null>(null);

  const metaById = useMemo(() => new Map((manifest?.parts || []).map((p) => [p.id, p])), [manifest]);

  useEffect(() => {
    loadManifest().then(setManifest).catch(() => setError("The parts library failed to load."));
  }, []);

  useEffect(() => {
    if (!manifest || !mountRef.current) return;
    const ed = new Editor(mountRef.current);
    ed.onChange = setState;
    ed.onConnect = setConnectReq;
    editorRef.current = ed;
    setStatus("Pick a part on the left to start building.");
    return () => { ed.dispose(); editorRef.current = null; };
  }, [manifest]);

  useEffect(() => { localStorage.setItem("utg_vex_limits", JSON.stringify(limits)); }, [limits]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ed = editorRef.current; if (!ed) return;
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;
      if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); ed.deleteSelected(); }
      else if (e.key === "r" || e.key === "R") ed.rotateSelected("y");
      else if (e.key === "x" || e.key === "X") ed.rotateSelected("x");
      else if (e.key === "z" || e.key === "Z") ed.rotateSelected("z");
      else if (e.key === "]") ed.nudgeSelectedY(1);
      else if (e.key === "[") ed.nudgeSelectedY(-1);
      else if (e.key === "f" || e.key === "F") ed.frameAll();
      else if (e.key === "Escape") ed.selectByUid(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      setStatus(`Loaded your saved build (${data.length} parts).`);
    } catch { setStatus("That saved build could not be opened."); }
  }
  function clear() { if (confirm("Clear the whole build?")) { editorRef.current?.clear(); setStatus("Cleared. Start a new build."); } }

  const groups = useMemo(() => {
    const by = new Map<string, PartMeta[]>();
    for (const p of manifest?.parts || []) { const a = by.get(p.category) || []; a.push(p); by.set(p.category, a); }
    return CATEGORY_ORDER.filter((c) => by.has(c)).map((c) => ({ category: c, parts: by.get(c)! }));
  }, [manifest]);

  const connectors = useMemo(() => (manifest?.parts || []).filter((p) => p.category === "pin" || p.category === "shaft" || p.category === "standoff"), [manifest]);

  const sizeIn = { w: inch(state.bboxMM.w), h: inch(state.bboxMM.h), d: inch(state.bboxMM.d) };
  const over = { w: sizeIn.w > limits.w, h: sizeIn.h > limits.h, d: sizeIn.d > limits.d, motors: state.motors > limits.motors };
  const anyOver = over.w || over.h || over.d || over.motors;
  const hasSel = !!state.selectedUid;

  if (error) return <main className="shell"><div className="fatal">{error}</div></main>;

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="../"><img src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /><span>VEX Build Center</span></a>
        <div className={`legality ${anyOver ? "bad" : "good"}`}>{state.count ? (anyOver ? "Over the limits" : "Within the limits") : "Empty build"}</div>
      </header>

      <div className="workspace">
        <aside className="palette">
          <h2>Parts</h2>
          {!manifest && <p className="muted">Loading…</p>}
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
          <div className="stage-hint">Drag between hole dots to connect · click a hole for a connector · drag a part to move · scroll to zoom</div>
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
                <div className="btn-row">
                  <button onClick={() => editorRef.current?.rotateSelected("x")}>Rotate X</button>
                  <button onClick={() => editorRef.current?.rotateSelected("y")}>Rotate Y</button>
                  <button onClick={() => editorRef.current?.rotateSelected("z")}>Rotate Z</button>
                </div>
                <div className="btn-row">
                  <button onClick={() => editorRef.current?.nudgeSelectedY(1)}>Raise</button>
                  <button onClick={() => editorRef.current?.nudgeSelectedY(-1)}>Lower</button>
                  <button className="danger" onClick={() => editorRef.current?.deleteSelected()}>Delete</button>
                </div>
              </>
            ) : <p className="muted small">Click a part in the scene to select it.</p>}
          </section>

          <section className="card">
            <h3>Build · {state.count} parts</h3>
            <div className="btn-row">
              <button onClick={save}>Save</button>
              <button onClick={load}>Load</button>
              <button onClick={() => editorRef.current?.frameAll()}>Fit view</button>
            </div>
            <div className="btn-row">
              <button className="danger" onClick={clear}>Clear all</button>
            </div>
          </section>
        </aside>
      </div>

      {connectReq && (
        <>
          <div className="picker-scrim" onClick={() => setConnectReq(null)} />
          <div className="picker" style={{ left: Math.min(connectReq.screen.x, window.innerWidth - 210), top: Math.min(connectReq.screen.y, window.innerHeight - 260) }}>
            <div className="picker-head">{connectReq.to ? "Connect the two holes with…" : "Put in this hole…"}</div>
            <div className="picker-grid">
              {connectors.map((c) => (
                <button key={c.id} className="picker-item" onClick={() => { editorRef.current?.connect(connectReq.from, connectReq.to, c); setConnectReq(null); setStatus(`Placed ${c.name}.`); }}>
                  <span className="pal-swatch" style={{ background: swatch(c) }} />{c.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <footer className="statusbar">{status}</footer>
    </main>
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

function swatch(p: PartMeta): string {
  const map: Record<string, string> = { beam: "#2f6fb0", plate: "#3f8fd0", pin: "#e0a13a", standoff: "#8a94a6", corner: "#356fa8", gear: "#c85c3c", wheel: "#2b2f36", shaft: "#9aa3b0", spacer: "#b9c0cb", motor: "#2b7de0", brain: "#3a3f47", sensor: "#7a5cc0" };
  return p.color || map[p.category] || "#6b7787";
}
