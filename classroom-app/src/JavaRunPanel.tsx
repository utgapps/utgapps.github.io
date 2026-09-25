import { useEffect, useRef, useState, type ReactNode } from "react";
import type { FromWorker, ToWorker } from "./lib/java/worker";

/* The Java console: a terminal, because that is what a Java program talks to.
   Compiling and running happen in a worker (src/lib/java/worker.ts), so a
   `while (true)` never freezes the editor, and Stop simply throws the worker
   away. The program sees typing through System.in exactly as a terminal
   delivers it: a line at a time, on Enter, and a student may type ahead. */

type Stream = "out" | "err" | "in" | "note" | "system";
type Segment = { stream: Stream; text: string };
type Status = "idle" | "running" | "waiting" | "finished" | "failed" | "uncompiled" | "unsupported" | "stopped";

/** A program that prints forever keeps only the tail, as a terminal's scrollback does. */
const MAX_CONSOLE_CHARACTERS = 200_000;

function javaFiles(files: Record<string, string>) {
  // Main.java first: with several files, it is the one `java Main` would start.
  return Object.keys(files).filter((name) => name.endsWith(".java"))
    .sort((first, second) => Number(second.endsWith("Main.java")) - Number(first.endsWith("Main.java")) || first.localeCompare(second))
    .map((name) => ({ name, source: files[name] }));
}

const TYPE_DECLARATION = /\b(?:class|interface|enum|record)\s+([A-Za-z_$][\w$]*)/g;

/** What a run compiles: the open .java file first, then every other .java file
    whose class it names, and the ones those name in turn. A CS701 week is one
    project holding several separate programs, each with its own main. Compiling
    all of them would let one half-typed program stop the finished one beside it
    from running, and would start whichever file happened to sort first. With no
    .java file open, the run starts at Main.java, as `java Main` would. */
export function runnableFiles(files: Record<string, string>, active?: string) {
  const all = javaFiles(files);
  const start = all.find((file) => file.name === active) ?? all[0];
  if (!start) return [];
  const declared = all.map((file) => ({ file, types: [...file.source.matchAll(TYPE_DECLARATION)].map((match) => match[1]) }));
  const chosen = [start];
  for (let index = 0; index < chosen.length; index++) {
    const source = chosen[index].source;
    for (const { file, types } of declared) {
      if (chosen.includes(file)) continue;
      if (types.some((type) => new RegExp(`\\b${type.replace(/\$/g, "\\$")}\\b`).test(source))) chosen.push(file);
    }
  }
  return chosen;
}

function sameSources(first: { name: string; source: string }[], second: { name: string; source: string }[]) {
  return first.length === second.length
    && first.every((file, index) => file.name === second[index].name && file.source === second[index].source);
}

/** `active` is the file open in the editor: Run starts there. */
export function JavaRunPanel({ files, active }: { files: Record<string, string>; active?: string }) {
  const workerRef = useRef<Worker | null>(null);
  const segmentsRef = useRef<Segment[]>([]);
  const lengthRef = useRef(0);
  const frameRef = useRef(0);
  const [, setVersion] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [exitStatus, setExitStatus] = useState(0);
  const [ranFiles, setRanFiles] = useState<{ name: string; source: string }[] | null>(null);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const live = status === "running" || status === "waiting";
  const sources = runnableFiles(files, active);
  const startName = sources.length ? sources[0].name : "Main.java";
  // Switching to another program is not "your code changed": that one has not run yet.
  const ranThis = ranFiles !== null && ranFiles.length > 0 && ranFiles[0].name === startName;
  const stale = ranThis && !sameSources(ranFiles!, sources);

  /** Redraw at most once a frame, however fast the program prints. */
  function redraw() {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => { frameRef.current = 0; setVersion((version) => version + 1); });
  }
  function append(stream: Stream, text: string) {
    if (!text) return;
    const segments = segmentsRef.current;
    const last = segments[segments.length - 1];
    if (last && last.stream === stream) last.text += text;
    else segments.push({ stream, text });
    lengthRef.current += text.length;
    while (lengthRef.current > MAX_CONSOLE_CHARACTERS && segments.length) {
      const extra = lengthRef.current - MAX_CONSOLE_CHARACTERS;
      const first = segments[0];
      if (first.text.length <= extra) { segments.shift(); lengthRef.current -= first.text.length; }
      else { first.text = first.text.slice(extra); lengthRef.current -= extra; }
    }
    redraw();
  }
  function clear() { segmentsRef.current = []; lengthRef.current = 0; redraw(); }

  function send(message: ToWorker) { workerRef.current?.postMessage(message); }

  function stopWorker() {
    workerRef.current?.terminate();
    workerRef.current = null;
  }

  function run() {
    stopWorker();
    clear();
    setTyped("");
    setRanFiles(sources);
    if (!sources.length) {
      append("err", "There is no .java file in this project to run.\n");
      setStatus("failed");
      return;
    }
    const worker = new Worker(new URL("./lib/java/worker.ts", import.meta.url), { type: "module" });
    workerRef.current = worker;
    setStatus("running");
    let compiledStatus: Status | null = null;     // set when the program never got as far as running
    worker.onmessage = (event: MessageEvent<FromWorker>) => {
      if (workerRef.current !== worker) return;     // a run that was already replaced
      const message = event.data;
      if (message.type === "compiled") {
        if (!message.ok) {
          append(message.onlyUnsupported ? "note" : "err", message.text);
          compiledStatus = message.onlyUnsupported ? "unsupported" : "uncompiled";
        }
      } else if (message.type === "output") {
        for (const chunk of message.chunks) append(chunk.stream, chunk.text);
      } else if (message.type === "waiting") {
        setStatus("waiting");
      } else if (message.type === "exit") {
        setExitStatus(message.status);
        setStatus(compiledStatus ?? (message.status === 0 ? "finished" : "failed"));
        stopWorker();
      }
    };
    worker.onerror = (event) => {
      append("err", `The Java runner could not start: ${event.message || "unknown error"}\n`);
      setStatus("failed");
      stopWorker();
    };
    worker.postMessage({ type: "run", files: sources } satisfies ToWorker);
  }

  function stop() {
    if (!live) return;
    stopWorker();
    append("system", (endsWithNewline(segmentsRef.current) ? "" : "\n") + "Stopped.\n");
    setStatus("stopped");
  }

  function submitLine() {
    if (!live) return;
    append("in", typed + "\n");
    send({ type: "input", text: typed + "\n" });
    setTyped("");
    setStatus("running");
  }

  useEffect(() => () => { stopWorker(); cancelAnimationFrame(frameRef.current); }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); run(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Keep the newest line in view, and the cursor where the program is asking.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  });
  useEffect(() => {
    if (status === "waiting") inputRef.current?.focus({ preventScroll: true });
  }, [status]);

  const segments = segmentsRef.current;
  const statusText = status === "running" ? "Running"
    : status === "waiting" ? "Waiting for you to type"
    : status === "finished" ? "Finished"
    : status === "failed" ? (exitStatus === 0 ? "Did not run" : `Ended with exit status ${exitStatus}`)
    : status === "uncompiled" ? "Did not compile"
    : status === "unsupported" ? "Can't run here yet"
    : status === "stopped" ? "Stopped" : "";

  return <section className="preview-panel java-panel">
    <div className="preview-top">
      <strong>Java console</strong>
      {sources.length > 0 && <span className="java-file" title="Run starts this file">{startName}</span>}
      {stale && <span className="stale-hint">Your code changed since you last ran it</span>}
      {statusText && <span className={`java-status ${status}`}>{statusText}</span>}
      <button className={stale || !ranThis || !live ? "primary compact" : "text-button"} onClick={run}
              title={`Run ${startName} (Ctrl+Enter)`}>{ranThis ? "Run again" : "▶ Run"}</button>
      {live && <button className="text-button" onClick={stop}>Stop</button>}
      {!live && segments.length > 0 && <button className="text-button" onClick={clear}>Clear</button>}
    </div>
    <div className="java-console" ref={bodyRef}
         onMouseUp={() => { if (live && !window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true }); }}>
      {!ranFiles && segments.length === 0
        ? <div className="java-idle">
            <p>Press <strong>{"▶"} Run</strong> (or Ctrl+Enter) to compile and run <code>{startName}</code>, the file open in the editor.</p>
            <p className="muted">Anything your program prints appears here. When it reads from a <code>Scanner</code>, type your answer here and press Enter.</p>
          </div>
        : <pre className="java-output">
            {renderSegments(segments)}
            {live && <input ref={inputRef} className="java-stdin" value={typed} spellCheck={false} autoComplete="off"
                            aria-label="Type input for your program" size={Math.max(typed.length + 1, 2)}
                            onChange={(event) => setTyped(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") { event.preventDefault(); submitLine(); }
                              // Ctrl+D (Ctrl+Z on Windows) ends the input, as it does in a terminal.
                              else if (event.ctrlKey && (event.key === "d" || event.key === "z") && !typed) {
                                event.preventDefault(); send({ type: "eof" });
                              }
                            }} />}
          </pre>}
    </div>
  </section>;
}

function endsWithNewline(segments: Segment[]) {
  const last = segments[segments.length - 1];
  return !last || last.text.endsWith("\n");
}

// ---- ANSI colours: the escapes a Java console game uses --------------------------
type Style = { bold: boolean; foreground: number | null; background: number | null };
const PLAIN: Style = { bold: false, foreground: null, background: null };

function applyCodes(style: Style, codes: number[]): Style {
  let next = { ...style };
  if (!codes.length) codes = [0];
  for (const code of codes) {
    if (code === 0) next = { ...PLAIN };
    else if (code === 1) next.bold = true;
    else if (code === 22) next.bold = false;
    else if ((code >= 30 && code <= 37) || (code >= 90 && code <= 97)) next.foreground = code;
    else if (code === 39) next.foreground = null;
    else if ((code >= 40 && code <= 47) || (code >= 100 && code <= 107)) next.background = code;
    else if (code === 49) next.background = null;
  }
  return next;
}

function styleClass(stream: Stream, style: Style) {
  const classes = [`java-${stream}`];
  if (style.bold) classes.push("ansi-bold");
  if (style.foreground !== null) classes.push(`ansi-fg-${style.foreground}`);
  if (style.background !== null) classes.push(`ansi-bg-${style.background}`);
  return classes.join(" ");
}

// eslint-disable-next-line no-control-regex
const ESCAPE = /\u001B\[([0-9;?]*)([A-Za-z])/g;

function renderSegments(segments: Segment[]): ReactNode[] {
  const nodes: ReactNode[] = [];
  let style = PLAIN;
  let key = 0;
  // A program that clears the screen (ESC[2J) gets a clear console: only what follows is shown.
  let start = 0;
  segments.forEach((segment, index) => {
    if ((segment.stream === "out" || segment.stream === "err") && /\u001B\[2J/.test(segment.text)) start = index;
  });
  for (const segment of segments.slice(start)) {
    let text = segment.text.replace(/\r\n/g, "\n");
    if (segment.stream !== "out" && segment.stream !== "err") {
      nodes.push(<span key={key++} className={`java-${segment.stream}`}>{text}</span>);
      continue;
    }
    if (segment === segments[start]) {
      const clearAt = text.lastIndexOf("\u001B[2J");
      if (clearAt >= 0) text = text.slice(clearAt);
    }
    let last = 0;
    ESCAPE.lastIndex = 0;
    for (let match = ESCAPE.exec(text); match; match = ESCAPE.exec(text)) {
      if (match.index > last) nodes.push(<span key={key++} className={styleClass(segment.stream, style)}>{text.slice(last, match.index)}</span>);
      if (match[2] === "m") style = applyCodes(style, match[1].split(";").filter(Boolean).map(Number));
      last = ESCAPE.lastIndex;
    }
    if (last < text.length) nodes.push(<span key={key++} className={styleClass(segment.stream, style)}>{text.slice(last)}</span>);
  }
  return nodes;
}
