/* The Java console's engine room: compiles and runs one program, then is thrown
   away. Stop is the page terminating this worker, which is the only stop that
   also works on `while (true) {}`, so nothing in here has to be interruptible.

   page -> worker   { type: "run", files }   { type: "input", text }   { type: "eof" }
   worker -> page   { type: "compiled", ok, text }        compile errors, javac-style
                    { type: "output", chunks }            [{ stream: "out" | "err", text }]
                    { type: "waiting" }                   the program is reading the keyboard
                    { type: "exit", status }
*/
import { compileJava, type JavaFile } from "./index";
import { JavaSession } from "./session";
import type { Stream } from "./runtime";

export type ToWorker = { type: "run"; files: JavaFile[] } | { type: "input"; text: string } | { type: "eof" };
export type OutputChunk = { stream: Stream; text: string };
export type FromWorker =
  | { type: "compiled"; ok: boolean; text: string; onlyUnsupported: boolean }
  | { type: "output"; chunks: OutputChunk[] }
  | { type: "waiting" }
  | { type: "exit"; status: number };

const scope = self as unknown as {
  postMessage(message: FromWorker): void;
  onmessage: ((event: MessageEvent<ToWorker>) => void) | null;
  [name: string]: unknown;
};

/* A program only ever calls what the compiler emitted, but nothing in here
   needs the network or storage either, so they are not left lying about. */
for (const name of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "indexedDB", "caches", "importScripts", "BroadcastChannel"]) {
  try { Object.defineProperty(scope, name, { value: undefined, configurable: false, writable: false }); } catch { /* not present */ }
}

// ---- output, batched: one message per burst rather than one per println ----
const FLUSH_BYTES = 4096;
const FLUSH_MS = 30;
let pending: OutputChunk[] = [];
let pendingBytes = 0;
let lastFlush = Date.now();
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (flushTimer !== null) { clearTimeout(flushTimer); flushTimer = null; }
  if (!pending.length) return;
  scope.postMessage({ type: "output", chunks: pending });
  pending = [];
  pendingBytes = 0;
  lastFlush = Date.now();
}

function write(stream: Stream, text: string) {
  const last = pending[pending.length - 1];
  if (last && last.stream === stream) last.text += text;
  else pending.push({ stream, text });
  pendingBytes += text.length;
  // A long computation never returns to the event loop, so the clock is checked here too.
  if (pendingBytes >= FLUSH_BYTES || Date.now() - lastFlush >= FLUSH_MS) flush();
  else if (flushTimer === null) flushTimer = setTimeout(flush, FLUSH_MS);
}

// ---- the program ----
let session: JavaSession | null = null;
let waitingForInput = false;

function pump() {
  if (!session) return;
  const step = session.step();
  if (step.state === "input") {
    flush();
    waitingForInput = true;
    scope.postMessage({ type: "waiting" });
  } else if (step.state === "sleep") {
    flush();
    setTimeout(pump, Math.max(0, step.ms));
  } else {
    flush();
    scope.postMessage({ type: "exit", status: step.status });
    session = null;
  }
}

function resume() {
  if (!waitingForInput) return;   // typed ahead: the program will find it when it next reads
  waitingForInput = false;
  pump();
}

scope.onmessage = (event) => {
  const message = event.data;
  if (message.type === "run") {
    if (session) return;
    const compiled = compileJava(message.files);
    scope.postMessage({ type: "compiled", ok: compiled.ok, text: compiled.ok ? "" : compiled.text,
                        onlyUnsupported: compiled.ok ? false : compiled.onlyUnsupported });
    if (!compiled.ok) { scope.postMessage({ type: "exit", status: 1 }); return; }
    session = new JavaSession(compiled.code, { write });
    pump();
  } else if (message.type === "input") {
    session?.feed(message.text);
    resume();
  } else if (message.type === "eof") {
    session?.endInput();
    resume();
  }
};
