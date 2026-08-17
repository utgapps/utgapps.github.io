/* Run every AI101 milestone in a real DOM against a fake gateway, and check it
   does what that week claims. Parsing is not working - week 7 can parse fine and
   still send half a conversation. */

import { JSDOM, VirtualConsole } from "jsdom";
import { readFileSync } from "node:fs";

const MILES = JSON.parse(readFileSync(new URL("./milestones.json", import.meta.url), "utf8"));
const enc = new TextEncoder();

/* Mutation mode: break one line on purpose and confirm a check goes red. A
   suite that only ever passes is not evidence of anything. */
if (process.env.MUTATE) {
  const [wk, file, find, repl] = process.env.MUTATE.split("|||");
  for (let w = Number(wk); w <= 15; w++) {          // the break must persist forward
    const before = MILES[String(w)][file];
    MILES[String(w)][file] = before.split(find).join(repl);
    if (w === Number(wk) && MILES[String(w)][file] === before) {
      console.error("MUTATION DID NOT APPLY - the target text was not found");
      process.exit(2);
    }
  }
}

let failures = 0;
const results = [];

function assemble(files) {
  // Same inlining the editor's preview does: honour where the tags are.
  let html = files["index.html"];
  html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi,
    (m, n) => files[n] !== undefined ? `<style>${files[n]}</style>` : m);
  html = html.replace(/<script\b[^>]*src="([^"]+)"[^>]*>\s*<\/script>/gi,
    (m, n) => files[n] !== undefined ? `<script>${files[n]}<\/script>` : m);
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`;
}

/* A gateway that behaves like the real one: OpenAI-shaped JSON, or SSE when the
   request asked for a stream. Records every call so we can inspect what was sent. */
function makeFetch(calls, opts = {}) {
  return async function (url, init = {}) {
    const body = init.body ? JSON.parse(init.body) : null;
    calls.push({ url: String(url), method: init.method || "GET", headers: init.headers || {}, body });

    if (opts.status && opts.status !== 200) {
      return {
        ok: false, status: opts.status,
        json: async () => ({ error: { message: "simulated", type: "x", code: "y" } }),
      };
    }
    if (String(url).includes("/v1/models")) {
      return { ok: true, status: 200, json: async () => ({ data: [{ id: "fast" }, { id: "smart" }] }) };
    }
    const reply = opts.reply || "Hello there.";
    if (body && body.stream) {
      const parts = reply.match(/.{1,4}/g) || [reply];
      const frames = parts.map((p) =>
        `data: ${JSON.stringify({ choices: [{ delta: { content: p } }] })}\n\n`);
      frames.push("data: [DONE]\n\n");
      let i = 0;
      return {
        ok: true, status: 200,
        body: { getReader: () => ({ read: async () => i < frames.length
          ? { done: false, value: enc.encode(frames[i++]) } : { done: true, value: undefined } }) },
        json: async () => { throw new Error("streamed responses are not JSON"); },
      };
    }
    return {
      ok: true, status: 200,
      json: async () => ({ choices: [{ message: { role: "assistant", content: reply } }] }),
    };
  };
}

const tick = async (n = 8) => { for (let i = 0; i < n; i++) await new Promise((r) => setTimeout(r, 0)); };

async function boot(week, opts = {}) {
  const calls = [];
  const logs = [];
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("log", (...a) => logs.push(a.join(" ")));
  vc.on("error", (...a) => logs.push(a.join(" ")));
  vc.on("jsdomError", (e) => errors.push(e.message));

  const dom = new JSDOM(assemble(MILES[String(week)]), {
    runScripts: "dangerously", virtualConsole: vc, pretendToBeVisual: true,
    // The page's own scripts run while the document is parsed, so the fake
    // gateway has to exist before that - week 3 fetches on load.
    beforeParse(window) {
      window.fetch = makeFetch(calls, opts);
      window.TextDecoder = TextDecoder;
    },
  });
  const w = dom.window;
  await tick();
  return { dom, w, d: w.document, calls, logs, errors };
}

async function send(ctx, text) {
  const input = ctx.d.getElementById("prompt");
  input.value = text;
  ctx.d.getElementById("composer").dispatchEvent(
    new ctx.w.Event("submit", { bubbles: true, cancelable: true }));
  await tick(20);
}

const bubbleText = (ctx) =>
  Array.from(ctx.d.getElementById("chat").children).map((e) => e.textContent);

async function check(week, label, fn) {
  try {
    await fn();
    results.push([week, label, "PASS", ""]);
  } catch (e) {
    failures++;
    results.push([week, label, "FAIL", e.message]);
  }
}
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

// ---------------------------------------------------------------- week 1
await check(1, "page renders, script runs, no errors", async () => {
  const c = await boot(1);
  must(c.errors.length === 0, "JS errors: " + c.errors.join("; "));
  must(c.d.querySelector("h1"), "no <h1>");
  must(c.d.getElementById("chat"), "no #chat");
  must(c.d.getElementById("prompt"), "no #prompt");
  must(c.logs.some((l) => /starting up/i.test(l)), "console.log did not run");
  must(c.d.querySelector("style"), "stylesheet was not linked in");
});

// ---------------------------------------------------------------- week 2
await check(2, "Send echoes what you typed", async () => {
  const c = await boot(2);
  await send(c, "hello there");
  const lines = bubbleText(c);
  must(lines.length === 2, `expected 2 lines, got ${lines.length}: ${JSON.stringify(lines)}`);
  must(lines[0].includes("hello there"), "your message missing");
  must(/You said: hello there/.test(lines[1]), "echo missing: " + lines[1]);
  must(c.d.getElementById("prompt").value === "", "input was not cleared");
  must(c.errors.length === 0, "JS errors: " + c.errors.join("; "));
});
await check(2, "empty message is ignored", async () => {
  const c = await boot(2);
  await send(c, "   ");
  must(bubbleText(c).length === 0, "empty message produced output");
});

// ---------------------------------------------------------------- week 3
await check(3, "asks the server for its models, with the key", async () => {
  const c = await boot(3);
  const call = c.calls.find((x) => x.url.includes("/v1/models"));
  must(call, "never called /v1/models");
  must(/^Bearer /.test(call.headers.Authorization || ""), "no Bearer key sent");
  must(c.logs.some((l) => /server offers/i.test(l)), "did not log the model list");
});

// ---------------------------------------------------------------- week 4
await check(4, "sends a chat request and shows the reply", async () => {
  const c = await boot(4, { reply: "A comet is ice and dust." });
  await send(c, "what is a comet?");
  const call = c.calls.find((x) => x.url.includes("/chat/completions"));
  must(call, "no chat request");
  must(call.method === "POST", "not a POST");
  must(call.body.messages[0].role === "user", "first message is not from the user");
  must(call.body.messages[0].content === "what is a comet?", "question not sent");
  const lines = bubbleText(c);
  must(lines.some((l) => l.includes("A comet is ice and dust.")), "reply not shown: " + JSON.stringify(lines));
  must(!lines.some((l) => /thinking/.test(l)), "the 'thinking' line was left behind");
});
await check(4, "no longer calls /v1/models on load", async () => {
  const c = await boot(4);
  must(!c.calls.some((x) => x.url.includes("/v1/models")), "still calling listModels()");
});

// ---------------------------------------------------------------- week 5
for (const [status, needle] of [[401, /key/i], [429, /too fast/i], [400, /could not use/i]]) {
  await check(5, `${status} becomes a readable message`, async () => {
    const c = await boot(5, { status });
    await send(c, "hi");
    const lines = bubbleText(c);
    must(lines.some((l) => needle.test(l)), `no friendly ${status} message: ` + JSON.stringify(lines));
    must(!lines.some((l) => /thinking/.test(l)), "'thinking' left behind after an error");
    must(c.errors.length === 0, "an error escaped to the page: " + c.errors.join("; "));
  });
}

// ---------------------------------------------------------------- week 6
await check(6, "sends the personality as a system message", async () => {
  const c = await boot(6);
  c.d.getElementById("persona").value = "You are a pirate.";
  await send(c, "hi");
  const call = c.calls.find((x) => x.url.includes("/chat/completions"));
  must(call.body.messages[0].role === "system", "first message is not the system one");
  must(call.body.messages[0].content === "You are a pirate.", "persona not sent");
  must(call.body.messages[1].role === "user", "user message missing");
});

// ---------------------------------------------------------------- week 7
await check(7, "remembers the conversation across turns", async () => {
  const c = await boot(7, { reply: "First answer." });
  await send(c, "my name is Ada");
  await send(c, "what is my name?");
  const last = c.calls.filter((x) => x.url.includes("/chat/completions")).pop();
  const roles = last.body.messages.map((m) => m.role);
  must(roles.length === 4, `expected system+user+assistant+user, got ${JSON.stringify(roles)}`);
  must(roles[0] === "system" && roles[1] === "user" && roles[2] === "assistant" && roles[3] === "user",
       "wrong order: " + JSON.stringify(roles));
  must(last.body.messages[1].content === "my name is Ada", "first turn missing");
  must(last.body.messages[2].content === "First answer.", "the AI's own reply was not stored");
});
await check(7, "your messages and its messages look different", async () => {
  const c = await boot(7);
  await send(c, "hi");
  const kids = Array.from(c.d.getElementById("chat").children);
  must(kids.some((e) => e.className.includes("you")), "no 'you' bubble");
  must(kids.some((e) => e.className.includes("bot")), "no 'bot' bubble");
});

// ---------------------------------------------------------------- week 8
await check(8, "trims old messages instead of failing", async () => {
  const c = await boot(8, { reply: "x".repeat(400) });
  for (let i = 0; i < 12; i++) await send(c, "a question ".repeat(20));
  const last = c.calls.filter((x) => x.url.includes("/chat/completions")).pop();
  const size = last.body.messages.reduce((n, m) => n + m.content.length, 0);
  must(size <= 4000, `conversation sent was ${size} chars, over the server's limit`);
  must(last.body.messages.length >= 3, "trimmed away too much - nothing left to answer");
  must(c.logs.some((l) => /Forgot an old message/.test(l)), "never reported trimming");
});

// ---------------------------------------------------------------- week 9
await check(9, "model and temperature come from the page", async () => {
  const c = await boot(9);
  c.d.getElementById("model").value = "smart";
  const temp = c.d.getElementById("temp");
  temp.value = "1.2";
  temp.dispatchEvent(new c.w.Event("input", { bubbles: true }));
  must(c.d.getElementById("tempOut").textContent === "1.2", "slider readout did not update");
  await send(c, "hi");
  const call = c.calls.find((x) => x.url.includes("/chat/completions"));
  must(call.body.model === "smart", "model not read from the dropdown: " + call.body.model);
  must(call.body.temperature === 1.2, `temperature is ${JSON.stringify(call.body.temperature)}, want the number 1.2`);
});

// ---------------------------------------------------------------- week 10
await check(10, "asks for a stream and rebuilds the answer", async () => {
  const c = await boot(10, { reply: "Streaming works nicely." });
  await send(c, "hi");
  const call = c.calls.find((x) => x.url.includes("/chat/completions"));
  must(call.body.stream === true, "did not ask for a stream");
  must(bubbleText(c).some((l) => l.includes("Streaming works nicely.")),
       "stream not reassembled: " + JSON.stringify(bubbleText(c)));
});

// ---------------------------------------------------------------- week 11
await check(11, "types the answer out instead of waiting", async () => {
  const c = await boot(11, { reply: "Typing effect." });
  const seen = [];
  const chat = c.d.getElementById("chat");
  const obs = new c.w.MutationObserver(() => {
    const bot = Array.from(chat.children).find((e) => e.className.includes("bot"));
    if (bot) seen.push(bot.textContent);
  });
  obs.observe(chat, { childList: true, subtree: true, characterData: true });
  await send(c, "hi");
  obs.disconnect();
  const distinct = [...new Set(seen.filter(Boolean))];
  must(distinct.length > 1, `bubble only updated once - not streaming to the page: ${JSON.stringify(distinct)}`);
  must(bubbleText(c).some((l) => l.includes("Typing effect.")), "final text wrong");
});
await check(11, "cleans up the empty bubble when it fails", async () => {
  const c = await boot(11, { status: 429 });
  await send(c, "hi");
  const kids = Array.from(c.d.getElementById("chat").children);
  must(!kids.some((e) => e.className.includes("bot") && e.textContent === ""),
       "an empty bubble was left on screen after an error");
  must(kids.some((e) => /too fast/i.test(e.textContent)), "no error message shown");
});

// ---------------------------------------------------------------- week 12
await check(12, "saves the chat and loads it back", async () => {
  const c = await boot(12, { reply: "Saved reply." });
  await send(c, "remember this");
  c.d.getElementById("save").click();
  const saved = c.d.getElementById("transcript").value;
  const parsed = JSON.parse(saved);
  must(Array.isArray(parsed) && parsed.length === 2, "saved data is not the conversation: " + saved.slice(0, 80));

  const fresh = await boot(12);
  fresh.d.getElementById("transcript").value = saved;
  fresh.d.getElementById("load").click();
  await tick();
  must(bubbleText(fresh).some((l) => l.includes("remember this")), "did not redraw the chat");
  await send(fresh, "and now?");
  const call = fresh.calls.filter((x) => x.url.includes("/chat/completions")).pop();
  must(call.body.messages.length === 4, "loaded the screen but not the memory: " +
       JSON.stringify(call.body.messages.map((m) => m.role)));
});
await check(12, "rubbish pasted into Load does not crash it", async () => {
  const c = await boot(12);
  for (const junk of ["not json at all", "5", '{"a":1}', ""]) {
    c.d.getElementById("transcript").value = junk;
    c.d.getElementById("load").click();
    await tick();
  }
  must(c.errors.length === 0, "Load threw: " + c.errors.join("; "));
  must(bubbleText(c).some((l) => /does not look like|should be a list/.test(l)), "no complaint shown");
});

// ---------------------------------------------------------------- week 13
await check(13, "builds a button per character and they work", async () => {
  const c = await boot(13);
  const buttons = Array.from(c.d.querySelectorAll("#presets .preset"));
  must(buttons.length === 4, `expected 4 character buttons, got ${buttons.length}`);
  buttons.find((b) => /storyteller/i.test(b.textContent)).click();
  must(/adventure stories/i.test(c.d.getElementById("persona").value),
       "clicking a character did not change the personality");
});

// ---------------------------------------------------------------- week 14
await check(14, "refuses an over-long message and warns on the page", async () => {
  const c = await boot(14);
  await send(c, "x".repeat(600));
  must(!c.calls.some((x) => x.url.includes("/chat/completions")), "sent a 600-character message anyway");
  must(bubbleText(c).some((l) => /too long/i.test(l)), "no warning shown");
  must(/confidently wrong/i.test(c.d.body.textContent), "the caution line is missing from the page");
  await send(c, "a normal question");
  must(c.calls.some((x) => x.url.includes("/chat/completions")), "normal messages are now blocked too");
});

// ---------------------------------------------------------------- week 15
await check(15, "the finished project still does everything", async () => {
  const c = await boot(15, { reply: "All good." });
  must(/UTG Academy/i.test(c.d.body.textContent), "credits missing");
  c.d.getElementById("model").value = "smart";
  await send(c, "hello");
  await send(c, "again");
  const call = c.calls.filter((x) => x.url.includes("/chat/completions")).pop();
  must(call.body.stream === true, "streaming lost");
  must(call.body.model === "smart", "model choice lost");
  must(call.body.messages.length === 4, "memory lost");
  must(call.body.messages[0].role === "system", "personality lost");
  must(bubbleText(c).some((l) => l.includes("All good.")), "no reply shown");
  must(c.errors.length === 0, "JS errors: " + c.errors.join("; "));
});

// ---------------------------------------------------------------- report
let week = 0;
for (const [w, label, verdict, msg] of results) {
  if (w !== week) { console.log(`\nWeek ${w}`); week = w; }
  console.log(`  ${verdict === "PASS" ? " ok " : "FAIL"}  ${label}${msg ? "\n         -> " + msg : ""}`);
}
console.log(`\n${results.length} behaviour checks across 15 milestones, ${failures} failed`);
process.exit(failures ? 1 : 0);
