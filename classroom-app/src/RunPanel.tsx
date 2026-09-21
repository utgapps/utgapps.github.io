import { useEffect, useRef, useState } from "react";
import { GAME_KIND } from "./lib/types";
import type { ProjectKind } from "./lib/types";
import { buildPreview, isPreviewMessage, PREVIEW_ALLOW, PREVIEW_SANDBOX, type PreviewMessage } from "./lib/preview";
import { buildGamePreview, useGameAudio } from "./lib/game-project";

function sameFiles(a: Record<string, string>, b: Record<string, string>) {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((key) => a[key] === b[key]);
}

/* Execution is manual and runs a SNAPSHOT of the files, not the live `files`
   object. The old preview re-read `files` - refreshed on a 300ms debounce by
   scheduleDerive - so script.js re-executed on essentially every keystroke.
   For a course whose whole point is calling a rate-limited API, that spends a
   student's 40-requests-per-minute budget while they are still typing the call. */
export function RunPanel({ files, kind = "web" }: { files: Record<string, string>; kind?: ProjectKind }) {
  const game = kind === GAME_KIND;
  /* A game's sounds are fetched out here, because the frame they play in
     has no origin of its own to fetch them with. */
  const audio = useGameAudio(files);
  const [runFiles, setRunFiles] = useState<Record<string, string> | null>(null);
  const [runId, setRunId] = useState(0);       // key bump: forces a real unmount
  const [nonce, setNonce] = useState("");      // identifies this run's messages
  const [log, setLog] = useState<PreviewMessage[]>([]);
  const [onlyErrors, setOnlyErrors] = useState(false);
  /* A web project runs full screen: the page a student wrote is the thing they
     came to see, and a third of a column is not a web page. A game already
     fills its own canvas at the size it was designed for, so it stays put. */
  const [full, setFull] = useState(false);
  /* The game engine's own debug bar - info, inspect, pause, grid - lives
     inside the running frame, because every switch on it is a field on the
     Engine running there. Out here it is one button, so a child sees a row of
     purple squares only when they ask for it. The frame is told again on every
     load: pressing Run builds a new document, which knows nothing. */
  const [debug, setDebug] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const tailRef = useRef<HTMLDivElement | null>(null);
  const stale = runFiles !== null && !sameFiles(runFiles, files);
  const errorCount = log.filter((entry) => entry.kind === "error").length;

  function run() {
    const next = crypto.randomUUID();
    setLog([]); setNonce(next); setRunFiles({ ...files }); setRunId((id) => id + 1);
    if (!game) setFull(true);
  }
  function tellFrameDebug(on: boolean) {
    frameRef.current?.contentWindow?.postMessage({ __utg: nonce, debug: on }, "*");
  }
  function stop() {
    // Unmounting is the only reliable way to stop a page's timers, listeners
    // and in-flight requests. Clearing srcDoc would leave them running.
    setRunFiles(null); setNonce(""); setFull(false);
    setLog((prev) => [...prev, { __utg: "", kind: "system", text: "Stopped.", at: Date.now() }]);
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const msg = isPreviewMessage(event, frameRef.current, nonce);
      if (!msg) return; // includes stale output from a previous run, dropped by nonce
      setLog((prev) => (prev.length >= 300 ? [...prev.slice(-299), msg] : [...prev, msg]));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [nonce]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); run(); }
      if (event.key === "Escape" && full) { event.preventDefault(); setFull(false); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  useEffect(() => { tailRef.current?.scrollIntoView({ block: "end" }); }, [log.length]);
  /* Nothing behind the running page should scroll, and without this the page
     is a scrollbar's width short of the screen - a strip of the app showing
     down one side of what is supposed to be full screen. */
  useEffect(() => {
    if (!full) return;
    document.body.classList.add("running-full");
    return () => document.body.classList.remove("running-full");
  }, [full]);

  const shown = onlyErrors ? log.filter((entry) => entry.kind === "error") : log;
  /* Full screen is a class on the panel that is already here, not a second
     copy of it somewhere else in the tree. Moving the iframe to a new parent
     would unmount it, and unmounting is how this panel STOPS a run - a child
     pressing Exit would silently restart their page from the top. */
  return <section className={`preview-panel${full ? " preview-full" : ""}`}>
    <div className="preview-top">
      <strong>{game ? "Game" : "Preview"}</strong>
      {stale && <span className="stale-hint">Your code changed since you last ran it</span>}
      <button className={stale || !runFiles ? "primary compact" : "text-button"} onClick={run}>{runFiles ? "Run again" : "▶ Run"}</button>
      {runFiles && !game && <button className="text-button" onClick={() => setFull(true)}>Full screen</button>}
      {runFiles && game && <button className={debug ? "text-button pressed" : "text-button"} title="Show the game's own debug bar"
                                   onClick={() => { setDebug(!debug); tellFrameDebug(!debug); }}>Debug</button>}
      {runFiles && <button className="text-button" onClick={stop}>Stop</button>}
    </div>
    {/* The way out sits over the page, in the middle of the top edge, and never
        hides: a student whose own code covers the screen must not have to guess
        where the exit went. The console is hidden while full screen, so an
        error says so here rather than waiting silently underneath. */}
    {full && <div className="preview-exit">
      <button className="secondary" onClick={() => setFull(false)}>✕ Exit full screen</button>
      {errorCount > 0 && <button className="exit-errors" onClick={() => setFull(false)}>
        {errorCount === 1 ? "1 error — exit to read it" : `${errorCount} errors — exit to read them`}
      </button>}
    </div>}
    {runFiles
      ? <iframe key={runId} ref={frameRef} title="Project preview" sandbox={PREVIEW_SANDBOX} allow={PREVIEW_ALLOW}
                onLoad={() => { if (game && debug) tellFrameDebug(true); }}
                srcDoc={game ? buildGamePreview(runFiles, nonce, audio) : buildPreview(runFiles, nonce)} />
      : <div className="preview-idle">
          <p>Press <strong>▶ Run</strong> to {game ? "play your game" : "see your project"}.</p>
          <p className="muted">{game
            ? "Your game starts fresh every time you run it, so you always see exactly what your code does now."
            : "Nothing runs until you ask it to, so your project never sends a request you did not mean to send."}</p>
        </div>}
    <div className="console-panel">
      <div className="console-head">
        <strong>Console</strong>
        {errorCount > 0 && <span className="console-badge">{errorCount}</span>}
        <label className="console-filter"><input type="checkbox" checked={onlyErrors} onChange={(event) => setOnlyErrors(event.target.checked)} />Errors only</label>
        <button className="text-button" onClick={() => setLog([])}>Clear</button>
      </div>
      <div className="console-body">
        {shown.length === 0
          ? (game
              ? <span className="muted">Anything you <code>print()</code> shows up here, and so does every mistake the game finds - it tells you which panel and which line.</span>
              : <span className="muted">Anything you <code>console.log()</code> shows up here, along with errors and network requests.</span>)
          : shown.map((entry, index) => <div className={`console-row ${entry.kind}`} key={index}>{entry.text}</div>)}
        <div ref={tailRef} />
      </div>
    </div>
  </section>;
}
