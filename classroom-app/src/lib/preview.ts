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

/** Escapes a closing script tag so student content cannot break out of the
 *  <script> or <style> block it is being embedded in. The original only did
 *  this for JS; HTML and CSS could both end a block early and blank the page. */
function safe(source: string): string {
  return String(source ?? "").replaceAll("</script", "<\\/script");
}

/* The shim is injected as the FIRST script so it captures errors thrown by the
   student's own code further down the document. Everything is inside one
   try/catch: a broken shim must never stop the project from running. */
function shim(nonce: string): string {
  return `
try {
  var __utgNonce = ${JSON.stringify(nonce)};
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
    if (event.message) __utgPost("error", event.message + (event.lineno ? " (line " + event.lineno + ")" : ""));
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

/** Assembles the three web files into one document, shim first.
 *  `nonce` identifies this run: a setTimeout scheduled by an earlier run can
 *  fire after Stop and after the next run has mounted, and the parent uses the
 *  nonce to drop that stale output instead of showing it under the new run. */
export function buildPreview(files: Record<string, string>, nonce: string): string {
  const html = files["index.html"] || "<main><h1>Start your project</h1></main>";
  const css = files["style.css"] || "";
  const js = files["script.js"] || "";
  return `<script>${shim(nonce)}<\/script>${safe(html)}<style>${safe(css)}<\/style><script>${safe(js)}<\/script>`;
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
