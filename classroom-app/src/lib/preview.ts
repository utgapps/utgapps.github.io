// Builds the document that runs inside the preview iframe, and the shim that
// reports what happens in there back to the parent.
//
// The iframe is sandbox="allow-scripts" with no allow-same-origin, so it is an
// opaque origin: no localStorage, no cookies, and postMessage is the only way
// anything gets out. That is deliberate - student code should not be able to
// reach the classroom app's own storage - and it is why the console panel needs
// a shim rather than just reading the frame's console.

export type PreviewMessageKind = "log" | "warn" | "error" | "net" | "info" | "system";
export type PreviewMessage = { __utg: string; kind: PreviewMessageKind; text: string; at: number };

const MAX_MESSAGES = 500;

export const ENTRY_FILE = "index.html";

/** The sandbox for every preview frame, in the editor and on the shared page.
 *
 *  allow-forms is here for a reason that cost a real fleet test to find. The
 *  chat box in every AI101 project from week 4 on is a <form>, and the whole
 *  lesson hangs off its submit handler (preventDefault, then call the AI). A
 *  sandbox WITHOUT allow-forms does not just block navigation - Chrome
 *  suppresses the submit event entirely, so the handler never runs. Send did
 *  nothing, Enter did nothing, and there was no error to see: the lesson was
 *  silently dead from week 4 to week 15. allow-forms lets the event fire; the
 *  handler still preventDefaults, so nothing actually navigates.
 *
 *  allow-same-origin stays OUT on purpose - that is what keeps the frame an
 *  opaque origin with no reach into the classroom app's localStorage. Adding
 *  allow-forms does not weaken that. */
export const PREVIEW_SANDBOX = "allow-scripts allow-forms";

/** Delegates permission to reach the school AI gateway into the preview frame.
 *
 *  The gateway sits on a Tailscale 100.x address, which Chrome treats as a
 *  private network. A page can reach it, but a frame with an OPAQUE origin
 *  cannot: an opaque origin has no permission to inherit. Measured on Chrome
 *  151 across ten variants - the sandboxed srcdoc frame was the only one
 *  blocked, and it cleared as soon as the permission was handed to it.
 *
 *  The alternative fixes both cost something this does not. Adding
 *  allow-same-origin would let one student's code read another's class token
 *  out of localStorage. A fleet Chrome policy would not travel home with them.
 *  This leaves the sandbox as opaque as it was.
 *
 *  "*" rather than "'self'" because the frame's origin IS opaque - there is no
 *  self to name. Browsers that do not know the token ignore the attribute. */
export const PREVIEW_ALLOW = "local-network-access *";

/** Escape a closing tag so file contents cannot end early the block they are
 *  being inlined into. JS goes inside <script>, CSS inside <style>. */
function safeIn(source: string, tag: "script" | "style"): string {
  return String(source ?? "").replaceAll(`</${tag}`, `<\\/${tag}`);
}

export function dirOf(path: string): string {
  const cut = path.lastIndexOf("/");
  return cut === -1 ? "" : path.slice(0, cut);
}

/** Resolve an href/src the way a browser would, against the folder the page
 *  is in: "style.css", "./css/style.css", "../shared/app.js", "/css/style.css".
 *  Returns null for anything aimed at the real internet, which is left alone. */
export function resolvePath(reference: string, fromDir: string): string | null {
  const raw = String(reference || "").trim().split(/[?#]/)[0];
  if (!raw) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) return null;  // http:, data:, //cdn
  const parts = raw.replace(/\\/g, "/").split("/");
  const out = raw.startsWith("/") ? [] : fromDir.split("/").filter(Boolean);
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") { out.pop(); continue; }
    out.push(part);
  }
  return out.join("/") || null;
}

function attr(tagText: string, name: string): string | null {
  const match = tagText.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? null;
}

/** Replace <link rel="stylesheet" href="x.css"> and <script src="x.js"> with
 *  the contents of those project files, in place.
 *
 *  This is what lets students wire their own files together instead of the
 *  preview silently gluing three fixed names in a fixed order. It matters
 *  pedagogically: a <script> in the <head> now really does run before the
 *  page exists, and getElementById really does come back null - which is a
 *  lesson, not a bug. It also matters technically: the frame is an opaque
 *  origin with no server behind it, so a relative href would never load. */
function inlineAssets(source: string, files: Record<string, string>, fromDir: string): { html: string; missing: string[] } {
  const missing: string[] = [];

  let html = source.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = (attr(tag, "rel") || "").toLowerCase();
    if (!rel.split(/\s+/).includes("stylesheet")) return tag;
    const href = attr(tag, "href");
    if (href === null) return tag;
    const name = resolvePath(href, fromDir);
    if (!name) return tag;                                  // a real URL: leave it
    if (!(name in files)) { missing.push(href); return tag; }
    return `<style data-from="${name}">${safeIn(files[name], "style")}</style>`;
  });

  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (tag, attrs, body) => {
    const src = attr(`<script${attrs}>`, "src");
    if (src === null) return tag;                           // already inline
    const name = resolvePath(src, fromDir);
    if (!name) return tag;
    if (!(name in files)) { missing.push(src); return tag; }
    void body;
    return `<script data-from="${name}">${safeIn(files[name], "script")}<\/script>`;
  });

  return { html, missing };
}

/* The shim is injected as the FIRST script so it captures errors thrown by the
   student's own code further down the document. Everything is inside one
   try/catch: a broken shim must never stop the project from running. */
function shim(nonce: string, ranges: FileRange[]): string {
  return `
try {
  var __utgNonce = ${JSON.stringify(nonce)};
  /* The preview document is the shim, then index.html with style.css and
     script.js inlined into it. So a browser error on "line 148" means line 148
     of THAT document, not of anything the student wrote - and week 1 teaches
     them to read line numbers. This maps a document line back to the file and
     line the student is actually looking at. */
  var __utgRanges = ${JSON.stringify(ranges)};
  function __utgWhere(lineNumber) {
    if (!lineNumber) return "";
    for (var i = 0; i < __utgRanges.length; i++) {
      var r = __utgRanges[i];
      if (lineNumber >= r.from && lineNumber <= r.to) {
        return " (" + r.name + " line " + (lineNumber - r.from + 1) + ")";
      }
    }
    return "";
  }
  var __utgSent = 0;
  var __utgStopped = false;

  function __utgPost(kind, text) {
    if (__utgStopped) return;
    if (__utgSent >= ${MAX_MESSAGES}) {
      __utgStopped = true;
      // Said once, from inside the frame. A runaway loop queues faster than the
      // parent can drain, and the parent cannot stop a loop it is not running.
      try { parent.postMessage({ __utg: __utgNonce, kind: "system", at: Date.now(),
        text: "Too many messages - output stopped. Check for a loop that never ends." }, "*"); } catch (e) {}
      return;
    }
    __utgSent++;
    try { parent.postMessage({ __utg: __utgNonce, kind: kind, at: Date.now(), text: String(text).slice(0, 2000) }, "*"); } catch (e) {}
  }

  /* Values are formatted to a string in here rather than posted raw. Structured
     clone throws on functions, DOM nodes and proxies, and when it throws the
     whole message vanishes silently - which is exactly the invisible failure the
     console panel exists to prevent. */
  function __utgFmt(value, depth, seen) {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    var type = typeof value;
    if (type === "string") return depth === 0 ? value : JSON.stringify(value.slice(0, 200));
    if (type === "number" || type === "boolean" || type === "bigint") return String(value);
    if (type === "function") return "function " + (value.name || "(anonymous)") + "()";
    if (type === "symbol") return value.toString();
    if (value instanceof Error) {
      var line = (value.stack || "").split("\\n")[1];
      return value.name + ": " + value.message + (line ? " (" + line.trim() + ")" : "");
    }
    if (typeof Element !== "undefined" && value instanceof Element) return "<" + value.tagName.toLowerCase() + ">";
    if (depth > 2) return Array.isArray(value) ? "[...]" : "{...}";
    if (seen.has(value)) return "[circular]";
    seen.add(value);
    try {
      if (Array.isArray(value)) {
        var items = value.slice(0, 20).map(function (item) { return __utgFmt(item, depth + 1, seen); });
        if (value.length > 20) items.push("... " + (value.length - 20) + " more");
        return "[" + items.join(", ") + "]";
      }
      var keys = Object.keys(value).slice(0, 20);
      return "{ " + keys.map(function (key) { return key + ": " + __utgFmt(value[key], depth + 1, seen); }).join(", ") + " }";
    } catch (e) { return "[unreadable]"; }
    finally { seen.delete(value); }
  }
  function __utgJoin(args) {
    return Array.prototype.slice.call(args).map(function (a) { return __utgFmt(a, 0, new WeakSet()); }).join(" ");
  }

  ["log", "info", "warn", "error", "debug"].forEach(function (name) {
    var original = console[name] ? console[name].bind(console) : null;
    console[name] = function () {
      if (original) { try { original.apply(null, arguments); } catch (e) {} }
      __utgPost(name === "debug" ? "log" : name === "info" ? "info" : name === "warn" ? "warn" : name === "error" ? "error" : "log", __utgJoin(arguments));
    };
  });

  window.addEventListener("error", function (event) {
    if (event.message) __utgPost("error", event.message + __utgWhere(event.lineno));
    else if (event.target && event.target.src) __utgPost("error", "Could not load " + event.target.src);
  }, true);

  /* The one that catches an await'd fetch that rejected. Without it the most
     common failure in an API lesson produces absolutely no output at all. */
  window.addEventListener("unhandledrejection", function (event) {
    __utgPost("error", "Uncaught (in promise) " + __utgFmt(event.reason, 0, new WeakSet()));
  });

  /* Network tracing. Two courses in a row are almost entirely fetch(), and
     "did my request go, and what came back" is the question students actually
     have. A rejected fetch is reported here as well as by the handler above,
     because this is the one that knows the URL. */
  var __utgFetch = window.fetch;
  if (__utgFetch) {
    window.fetch = function (input, init) {
      var method = ((init && init.method) || (input && input.method) || "GET").toUpperCase();
      var url = String((input && input.url) || input);
      var started = Date.now();
      __utgPost("net", "\\u2192 " + method + " " + url);
      return __utgFetch.apply(this, arguments).then(function (res) {
        __utgPost("net", "\\u2190 " + res.status + " " + (res.statusText || "") + " in " + (Date.now() - started) + " ms");
        return res;
      }, function (err) {
        __utgPost("error", "Request to " + url + " failed: " + (err && err.message ? err.message : err) +
          " - the server may be unreachable, or the page may be blocked from calling it.");
        throw err;
      });
    };
  }

  window.addEventListener("load", function () { __utgPost("system", "Running."); });
} catch (e) {}
`.trim();
}

/** Assembles the project into one document, shim first.
 *
 *  index.html is the page. Whatever it links to with <link> or <script src>
 *  gets pulled in from the project's own files, wherever the student put the
 *  tag. Nothing is added behind their back - a stylesheet they never linked
 *  is a stylesheet that does not apply, exactly as on the real web.
 *
 *  `nonce` identifies this run: a setTimeout scheduled by an earlier run can
 *  fire after Stop and after the next run has mounted, and the parent uses the
 *  nonce to drop that stale output instead of showing it under the new run. */
type FileRange = { name: string; from: number; to: number };

/** Which lines of the assembled document came from which student file.
 *  Counted from the real assembled text, so it cannot drift from what the
 *  browser actually sees. */
function fileRanges(before: string, html: string): FileRange[] {
  const lines = (text: string) => text.split(/\r?\n/).length;
  const offset = lines(before) - 1;          // lines used up before the HTML starts
  const ranges: FileRange[] = [];
  const pattern = /<(script|style) data-from="([^"]+)">/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const contentStart = match.index + match[0].length;
    const closeTag = match[1] === "script" ? "<\/script>" : "</style>";
    const closer = html.indexOf(closeTag, contentStart);
    if (closer === -1) continue;
    const body = html.slice(contentStart, closer);
    const startLine = offset + lines(html.slice(0, contentStart));
    ranges.push({ name: match[2], from: startLine, to: startLine + lines(body) - 1 });
  }
  return ranges;
}

export function buildPreview(files: Record<string, string>, nonce: string): string {
  const source = files[ENTRY_FILE];
  if (source === undefined) {
    return `<script>${shim(nonce, [])}<\/script>` +
      `<main style="font:16px/1.6 system-ui;padding:2rem;color:#5b7178">` +
      `<h1 style="font-size:20px;color:#1f2a37">No ${ENTRY_FILE} yet</h1>` +
      `<p>The preview shows <b>${ENTRY_FILE}</b>. Make a file with that exact name and press Run again.</p>` +
      `</main>`;
  }
  const { html, missing } = inlineAssets(source, files, dirOf(ENTRY_FILE));
  // Reported through the console panel, because a stylesheet that silently
  // does nothing is the single most baffling thing that can happen to a
  // beginner. Naming the file turns it into a two-second fix.
  const warn = missing.length
    ? `<script>${missing.map((name) =>
        `console.error(${JSON.stringify(`${ENTRY_FILE} asks for "${name}", but this project has no file at that path.`)});`
      ).join("")}<\/script>`
    : "";
  // Two passes: the shim needs the ranges, and the ranges depend on how many
  // lines the shim itself takes. Measure with an empty map, then emit for real.
  // JSON.stringify puts the map on one line, so the shift is normally zero -
  // this just refuses to depend on that staying true.
  const countLines = (text: string) => text.split(/\r?\n/).length;
  const probe = `<script>${shim(nonce, [])}<\/script>${warn}`;
  const ranges = fileRanges(probe, html);
  const real = `<script>${shim(nonce, ranges)}<\/script>${warn}`;
  const shift = countLines(real) - countLines(probe);
  const fixed = shift ? ranges.map((r) => ({ ...r, from: r.from + shift, to: r.to + shift })) : ranges;
  return `<script>${shim(nonce, fixed)}<\/script>${warn}${html}`;
}

/** True when the message really came from the running preview.
 *
 *  Deliberately NOT an event.origin check. A srcdoc frame with sandbox and no
 *  allow-same-origin reports its origin as the literal string "null", and so
 *  does every other opaque-origin frame on the page - it proves nothing. The
 *  load-bearing test is object identity against the exact Window we created,
 *  which cannot be forged, because only that window can be a message's source. */
export function isPreviewMessage(event: MessageEvent, frame: HTMLIFrameElement | null, nonce: string): PreviewMessage | null {
  if (!frame || event.source !== frame.contentWindow) return null;
  const data = event.data as Partial<PreviewMessage> | null;
  if (!data || typeof data !== "object") return null;
  if (data.__utg !== nonce) return null;
  if (typeof data.text !== "string" || typeof data.kind !== "string") return null;
  return data as PreviewMessage;
}
