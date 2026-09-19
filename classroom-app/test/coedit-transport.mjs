/* Drive a real co-edit session over fake connections.

   Co-editing is the one feature in this app whose bugs are invisible until two
   children are in the same file: a duplicated document, a cursor that never
   moves, or - the expensive one - an echo loop that sends every keystroke back
   where it came from and floods a school's uplink. None of that shows up in a
   type check, and none of it can be tested against a real PeerJS mesh from a
   command line.

   So this builds the transport with esbuild, hands it stand-in connections that
   record what was SENT, and asserts on the wire: how many messages crossed,
   which way, and whether both documents ended up saying the same thing.

       node test/coedit-transport.mjs
*/
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";

const here = fileURLToPath(new URL(".", import.meta.url));
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

/* The module is TypeScript and reaches for peerjs and the browser. Bundle it,
   stub the browser, and what is left is exactly the logic under test.

   Built inside node_modules on purpose: the bundle keeps its imports of yjs and
   y-protocols, and has to resolve them to the very same copies this file
   imported - two Yjs instances would not share a type registry. */
const out = mkdtempSync(join(here, "../node_modules/.utg-coedit-"));
const bundle = join(out, "coedit.mjs");
/* A stand-in signalling network. The real PeerJS needs a browser and a broker;
   what the code under test actually depends on is narrow: an id can be refused
   because somebody still holds it, a dial can fail because nobody is there, and
   a connection is a pair of endpoints. That is all this provides - and it is
   what makes the reconnection paths testable, which is where the bugs were. */
const stub = join(out, "peerjs-stub.mjs");
writeFileSync(stub, `
const registry = (globalThis.__peers ||= new Map());
const held = (globalThis.__held ||= new Set());     // ids the broker has not let go of yet

class Conn {
  constructor(label) { this.label = label; this.open = false; this.sent = []; this.handlers = {}; }
  on(event, fn) { (this.handlers[event] ||= []).push(fn); }
  emit(event, arg) { for (const fn of this.handlers[event] || []) fn(arg); }
  send(msg) { this.sent.push(msg); queueMicrotask(() => { if (this.other.open) this.other.emit("data", msg); }); }
  close() { if (!this.open) return; this.open = false; this.other.open = false; this.emit("close"); this.other.emit("close"); }
  // What a dropped data channel looked like: both ends stop, neither is told.
  stall() { this.open = false; this.other.open = false; }
}

export default class Peer {
  constructor(id, _options) {
    this.handlers = {}; this.open = false; this.destroyed = false; this.links = [];
    this.id = typeof id === "string" ? id : "anon-" + Math.random().toString(36).slice(2);
    queueMicrotask(() => {
      if (this.destroyed) return;
      if (typeof id === "string" && (held.has(id) || registry.has(id))) {
        const error = new Error("ID is taken"); error.type = "unavailable-id";
        this.emit("error", error);
        return;
      }
      registry.set(this.id, this); this.open = true; this.emit("open", this.id);
    });
  }
  on(event, fn) { (this.handlers[event] ||= []).push(fn); }
  emit(event, arg) { for (const fn of this.handlers[event] || []) fn(arg); }
  connect(targetId) {
    const mine = new Conn("to:" + targetId), theirs = new Conn("from:" + this.id);
    mine.other = theirs; theirs.other = mine;
    queueMicrotask(() => {
      const target = registry.get(targetId);
      if (!target || !target.open) {
        const error = new Error("Could not connect to peer"); error.type = "peer-unavailable";
        this.emit("error", error);
        return;
      }
      mine.open = true; theirs.open = true;
      this.links.push(mine); target.links.push(theirs);
      target.emit("connection", theirs);
      queueMicrotask(() => { theirs.emit("open"); mine.emit("open"); });
    });
    return mine;
  }
  reconnect() {
    if (this.destroyed || this.open) return;
    registry.set(this.id, this); this.open = true;
    queueMicrotask(() => this.emit("open", this.id));
  }
  // What a dropped signalling socket looked like in a browser: the peer stops
  // working and says nothing at all about it.
  loseBroker() { this.open = false; registry.delete(this.id); }
  /* Worse than dieQuietly, and what a closed tab really looked like: the id is
     gone from the broker, nothing is delivered either way, and yet the other
     end's connection still reports open and is never told a thing. A guest
     with no proof of life sits on "Live with your friend" for the rest of the
     lesson while nothing they type is being saved by anybody. */
  vanish() {
    this.open = false; registry.delete(this.id);
    for (const link of this.links) { link.open = false; link.handlers = {}; }
    this.links = [];
  }
  dieQuietly() {
    this.open = false; registry.delete(this.id);
    // The far end notices; this end just stops, which is the whole problem.
    for (const link of this.links) { link.open = false; link.other.open = false; link.other.emit("close"); }
    this.links = [];
  }
  destroy() {
    this.destroyed = true; this.open = false; registry.delete(this.id);
    for (const link of this.links) { link.open = false; link.other.open = false; link.emit("close"); link.other.emit("close"); }
    this.links = [];
  }
}
`);
const esbuild = await import("esbuild");
await esbuild.build({
  entryPoints: [join(here, "../src/lib/coedit.ts")], outfile: bundle,
  bundle: true, format: "esm", platform: "neutral", logLevel: "warning",
  external: ["yjs", "y-protocols/awareness"], alias: { peerjs: stub },
});
// Enough browser for the module to load: its timers, and the location the API
// client reads at import time to decide whether it is talking to a dev worker.
globalThis.window = {
  // The guest's retry is eight seconds apart in a classroom, which is right for
  // a child and wrong for a test. Long waits are compressed; the short flush
  // tick, which is the thing under test in the batching checks, is not.
  setTimeout: (fn, ms) => setTimeout(fn, ms > 1000 ? 25 : ms), clearTimeout: (id) => clearTimeout(id),
  location: { hostname: "test.invalid", origin: "https://test.invalid" },
};
const { CoeditSession, normalizeCoeditCode, formatCoeditCode, COEDIT_ALPHABET } = await import(pathToFileURL(bundle).href);
const b64 = (bytes) => Buffer.from(bytes).toString("base64");

/* A pair of stand-in DataConnections. Delivery is asynchronous, like the real
   thing, and every message is kept so the test can count what crossed. */
function link(nameA, nameB) {
  const make = (label) => ({
    label, open: true, sent: [], handlers: {},
    on(event, fn) { (this.handlers[event] ||= []).push(fn); },
    emit(event, arg) { for (const fn of this.handlers[event] || []) fn(arg); },
    send(msg) { this.sent.push(msg); queueMicrotask(() => { if (this.peer.open) this.peer.emit("data", msg); }); },
    close() { this.open = false; this.peer.open = false; this.emit("close"); this.peer.emit("close"); },
  });
  const a = make(nameA), b = make(nameB);
  a.peer = b; b.peer = a;
  return [a, b];
}
const settle = () => new Promise((resolve) => setTimeout(resolve, 120));   // > one flush tick
const session = (role, doc, awareness, name) => new CoeditSession({ role, doc, awareness, token: "", name });
/* Exactly what the two ends do for real, minus the PeerJS handshake: the host
   accepts a connection, the guest wires one it dialled, and the guest opens by
   introducing itself and offering whatever it already has. */
function connect(host, hostConn, guest, guestConn, name) {
  host.accept(hostConn);   // what peer.on("connection") does
  guest.conns.add(guestConn);
  guestConn.on("data", (msg) => guest.receive(guestConn, msg));
  guestConn.on("close", () => guest.drop(guestConn));
  hostConn.emit("open");
  guestConn.send({ t: "hello", name, client: guest.doc.clientID });
  guestConn.send({ t: "state", u: b64(Y.encodeStateAsUpdate(guest.doc)) });
}

// ---- the cast: one owner, two friends ----
const ownerDoc = new Y.Doc(), guestADoc = new Y.Doc(), guestBDoc = new Y.Doc();
const ownerAw = new Awareness(ownerDoc), guestAAw = new Awareness(guestADoc), guestBAw = new Awareness(guestBDoc);
ownerDoc.getMap("files").set("index.html", new Y.Text());
ownerDoc.getMap("files").get("index.html").insert(0, "<h1>Hi</h1>");

const owner = session("host", ownerDoc, ownerAw, "Ann");
const guestA = session("guest", guestADoc, guestAAw, "Bo");
const guestB = session("guest", guestBDoc, guestBAw, "Cy");
const [hostSideA, guestSideA] = link("host->A", "A->host");
const [hostSideB, guestSideB] = link("host->B", "B->host");
connect(owner, hostSideA, guestA, guestSideA, "Bo");
connect(owner, hostSideB, guestB, guestSideB, "Cy");
await settle();

const text = (doc) => doc.getMap("files").get("index.html")?.toString() ?? "(no file)";
const countFrom = (conn, kind) => conn.sent.filter((m) => m.t === kind).length;

// 1. a guest is SEEDED, never seeds itself - one whole-document message each
check("each guest is sent the document exactly once", countFrom(hostSideA, "state") === 1 && countFrom(hostSideB, "state") === 1,
      `A got ${countFrom(hostSideA, "state")}, B got ${countFrom(hostSideB, "state")}`);
check("the guests start from the owner's document", text(guestADoc) === "<h1>Hi</h1>" && text(guestBDoc) === "<h1>Hi</h1>",
      `A has ${JSON.stringify(text(guestADoc))}, B has ${JSON.stringify(text(guestBDoc))}`);

// 2. a burst of typing is ONE message, not one per keystroke
const before = countFrom(hostSideA, "ydoc");
const owned = ownerDoc.getMap("files").get("index.html");
for (const ch of "Hello there") owned.insert(owned.length, ch);
await settle();
const sentForBurst = countFrom(hostSideA, "ydoc") - before;
check("eleven keystrokes cross as one merged update", sentForBurst === 1, `sent ${sentForBurst} messages`);
check("the friends see what was typed", text(guestADoc).includes("Hello there") && text(guestBDoc).includes("Hello there"),
      `A has ${JSON.stringify(text(guestADoc))}`);

// 3. a guest's typing reaches the other guest, and does NOT come back to them
const backToA = countFrom(hostSideA, "ydoc");
const sentByA = countFrom(guestSideA, "ydoc");
const toB = countFrom(hostSideB, "ydoc");
const guestText = guestADoc.getMap("files").get("index.html");
guestText.insert(0, "Bo was here. ");
await settle();
check("what a guest types reaches the owner and the other guest",
      text(ownerDoc).startsWith("Bo was here.") && text(guestBDoc).startsWith("Bo was here."),
      `owner has ${JSON.stringify(text(ownerDoc))}, B has ${JSON.stringify(text(guestBDoc))}`);
check("the owner relays it to the other guest", countFrom(hostSideB, "ydoc") - toB === 1,
      `${countFrom(hostSideB, "ydoc") - toB} messages to B`);
check("the owner never echoes it back to the guest who typed it", countFrom(hostSideA, "ydoc") === backToA,
      `${countFrom(hostSideA, "ydoc") - backToA} echoed message(s)`);
check("a guest does not re-send what it was given", countFrom(guestSideA, "ydoc") - sentByA === 1,
      `guest A sent ${countFrom(guestSideA, "ydoc") - sentByA} messages for one edit`);

// 4. everyone agrees, which is the whole point
check("all three documents agree", text(ownerDoc) === text(guestADoc) && text(guestADoc) === text(guestBDoc),
      `${JSON.stringify(text(ownerDoc))} vs ${JSON.stringify(text(guestADoc))} vs ${JSON.stringify(text(guestBDoc))}`);

// 5. cursors travel, and leave with the person
ownerAw.setLocalStateField("user", { name: "Ann", color: "#f00" });
guestAAw.setLocalStateField("user", { name: "Bo", color: "#0f0" });
await settle();
check("cursors and names cross the wire", countFrom(hostSideA, "aware") > 0 && countFrom(guestSideA, "aware") > 0,
      `owner sent ${countFrom(hostSideA, "aware")}, guest sent ${countFrom(guestSideA, "aware")}`);
check("the owner sees the guest as present", ownerAw.getStates().has(guestADoc.clientID),
      "the guest's awareness state never arrived");
/* A cursor the guest was GIVEN must not be sent back. Awareness carries no
   per-connection origin, so nothing downstream would break the loop. */
const bouncedFrom = countFrom(guestSideA, "aware");
ownerAw.setLocalStateField("user", { name: "Ann", color: "#00f" });
await settle();
check("a guest does not bounce a cursor back at the owner", countFrom(guestSideA, "aware") === bouncedFrom,
      `guest A sent ${countFrom(guestSideA, "aware") - bouncedFrom} awareness message(s) for somebody else's cursor`);
hostSideA.close();
await settle();
check("a guest who leaves takes their cursor with them", !ownerAw.getStates().has(guestADoc.clientID),
      "a name is still blinking in the margin of a document nobody is editing");

// 6. the code a child reads out loud
check("a typed code survives dashes, spaces and lower case", normalizeCoeditCode("7kx2 - m4p9") === "7KX2M4P9",
      normalizeCoeditCode("7kx2 - m4p9"));
check("misread letters fold onto their digits", normalizeCoeditCode("OI L23456") === "01123456",
      normalizeCoeditCode("OI L23456"));
check("a code of the wrong length is refused", normalizeCoeditCode("7KX2M4P") === "" && normalizeCoeditCode("7KX2M4P99") === "");
check("U is not in the alphabet, so it cannot be a code", normalizeCoeditCode("7KX2M4PU") === "");
check("the code is shown as XXXX - XXXX", formatCoeditCode("7KX2M4P9") === "7KX2 - M4P9", formatCoeditCode("7KX2M4P9"));
/* The folding above is only safe while the alphabet contains none of the
   glyphs it folds: put I back in, and a real code could hold an I that
   normalizing would quietly turn into a 1. The worker holds the same string. */
check("the alphabet leaves out every lookalike it folds", !/[ILOU]/.test(COEDIT_ALPHABET), COEDIT_ALPHABET);
const workerSource = readFileSync(here + "../../classroom-worker/src/index.js", "utf8");
check("the worker's alphabet is the same string", workerSource.includes(`COEDIT_ALPHABET = "${COEDIT_ALPHABET}"`),
      "a code the app accepts would be rejected by the API, or the other way round");

// ---- 7. coming back ----
/* The two failures that cost a child their work, both reproduced in a browser
   before they were fixed: an owner who steps back to their projects list cannot
   reclaim the signalling id they just had, and a guest goes on dialling an id
   that nobody is listening on any more. Both are fixed by making the CODE the
   thing that is followed, and both are invisible until somebody leaves. */
const words = (session) => session.__status || [];
function watched(role, doc, awareness, name, extra = {}) {
  const status = [];
  const session = new CoeditSession({
    role, doc, awareness, token: "", name,
    onStatus: (text) => status.push(text),
    ...extra,
  });
  session.__status = status;
  return session;
}
const held = (globalThis.__held ||= new Set());
const idle = () => new Promise((resolve) => setTimeout(resolve, 60));

// An id the broker has not released: exactly what an owner meets when they
// re-open a project seconds after leaving it.
held.add("utg-coedit-first");
let renews = 0;
const backDoc = new Y.Doc();
backDoc.getMap("files").set("index.html", new Y.Text());
backDoc.getMap("files").get("index.html").insert(0, "<h1>Mine</h1>");
const backHost = watched("host", backDoc, new Awareness(backDoc), "Ann", {
  renewPeerId: async () => { renews++; return "utg-coedit-second"; },
});
await backHost.host("utg-coedit-first");
await idle();
check("an owner refused their old signalling id is given a new one", renews === 1, `renewed ${renews} time(s)`);
check("and is told they are open, not that another tab has the project",
      words(backHost).some((t) => t.includes("Nobody has joined yet")) && !words(backHost).some((t) => t.includes("another tab")),
      JSON.stringify(words(backHost)));

/* The friend redeemed the code while the owner was still on the OLD id. They
   should end up connected without typing the code again. */
const followDoc = new Y.Doc();
let resolved = "utg-coedit-first";
const strandCalls = [];
const follower = watched("guest", followDoc, new Awareness(followDoc), "Bo", {
  resolveHost: async () => resolved,
  onStranded: (value) => strandCalls.push(value),
});
await follower.join("utg-coedit-first");
await new Promise((resolve) => setTimeout(resolve, 150));   // long enough to give up on the old id
check("a guest dialling an id nobody holds is not told it is fine",
      strandCalls.includes(true) && words(follower).some((t) => t.includes("does not have the project open") || t.includes("went offline")),
      JSON.stringify(words(follower)));
resolved = "utg-coedit-second";      // the API now answers with the host's new id
await new Promise((resolve) => setTimeout(resolve, 200));   // a retry or two
check("the guest follows the code to the owner's new id, on its own",
      text(followDoc) === "<h1>Mine</h1>", `guest has ${JSON.stringify(text(followDoc))}`);
check("and the warning goes away once they are back", strandCalls[strandCalls.length - 1] === false,
      JSON.stringify(strandCalls));

/* And when the owner really has gone, the app must say so rather than promise
   that the work is waiting to send. */
const lostDoc = new Y.Doc();
const lostCalls = [];
const lost = watched("guest", lostDoc, new Awareness(lostDoc), "Cy", {
  resolveHost: async () => { throw new Error("That code is not open."); },
  onStranded: (value) => lostCalls.push(value),
});
await lost.join("utg-coedit-gone");
await new Promise((resolve) => setTimeout(resolve, 250));
check("a guest whose friend has gone is told their typing is not being saved",
      lostCalls.includes(true) && words(lost).some((t) => t.includes("Nothing you type now is being saved")),
      JSON.stringify(words(lost)));
check("but only after a few tries, not at the first hiccup",
      words(lost).filter((t) => t.includes("Still trying")).length >= 2,
      JSON.stringify(words(lost)));
/* The guest's own link to the signalling server can die without a word. Every
   later attempt used to return early and book nothing, so the child sat on
   "still trying" for ever while their friend waited on the other side. */
const peers = (globalThis.__peers ||= new Map());
const dropDoc = new Y.Doc();
const dropped = watched("guest", dropDoc, new Awareness(dropDoc), "Di", {
  resolveHost: async () => "utg-coedit-second",
});
await dropped.join("utg-coedit-second");
await idle();
check("a fourth friend joins the host on its new id", text(dropDoc) === "<h1>Mine</h1>",
      `guest has ${JSON.stringify(text(dropDoc))}`);
const theirPeer = Array.from(peers.values()).reverse().find((peer) => peer.id.startsWith("anon-") && peer.open);
theirPeer.dieQuietly();
backDoc.getMap("files").get("index.html").insert(0, "<p>Still here?</p>\n");
await new Promise((resolve) => setTimeout(resolve, 250));
check("a guest whose own connection died silently gets itself back",
      text(dropDoc).includes("Still here?"), `guest has ${JSON.stringify(text(dropDoc))}`);
dropped.close();

/* Worse than a quiet death: PeerJS decides the peer is beyond saving and
   destroys it. Nothing can be reconnected, so the only way back is a brand new
   peer - and the child must not have to type the code again to get one. */
const goneDoc = new Y.Doc();
const gone = watched("guest", goneDoc, new Awareness(goneDoc), "Ed", {
  resolveHost: async () => "utg-coedit-second",
});
await gone.join("utg-coedit-second");
await idle();
check("a fifth friend joins the same way", text(goneDoc) === text(backDoc),
      `guest has ${JSON.stringify(text(goneDoc))}`);
const doomed = Array.from(peers.values()).reverse().find((peer) => peer.id.startsWith("anon-") && peer.open);
doomed.destroy();
backDoc.getMap("files").get("index.html").insert(0, "<p>And now?</p>\n");
await new Promise((resolve) => setTimeout(resolve, 250));
check("a guest whose peer was thrown away builds a new one and comes back",
      text(goneDoc).includes("And now?"), `guest has ${JSON.stringify(text(goneDoc))}`);
gone.close();

backHost.close(); follower.close(); lost.close();

/* ---- 8. the owner reopens the project ----

   The one a browser found and none of the above catches. Stepping back to the
   projects list and returning builds the owner a NEW document from their saved
   files. It shares no history with the copy their friend has on screen, so the
   two do not merge: the file map picks a winner and the loser goes on typing
   into a Y.Text that nobody sends. Both children see "live" and neither sees
   the other. The owner's document is the real one; a guest holding any other
   has to be rebuilt around it, and what it typed in the gap kept aside. */
function seeded(html) {
  const doc = new Y.Doc();
  doc.getMap("files").set("index.html", new Y.Text());
  doc.getMap("files").get("index.html").insert(0, html);
  return doc;
}

let firstDoc = seeded("<h1>Before</h1>");
const firstHost = watched("host", firstDoc, new Awareness(firstDoc), "Ann");
await firstHost.host("utg-coedit-again");

/* The guest side is written the way the screen is: a fresh document, and a
   rebuild around the owner's when they come back with another one. */
let liveHostId = "utg-coedit-again";      // what the CODE points at right now
let guestDoc = new Y.Doc();
let guestSide = null;
let rebuilds = 0;
let kept = null;
async function joinAsGuest() {
  guestSide = watched("guest", guestDoc, new Awareness(guestDoc), "Bo", {
    resolveHost: async () => liveHostId,
    onFreshDoc: () => {
      rebuilds++;
      kept = text(guestDoc);            // what the child typed while alone
      guestSide.close();
      guestDoc = new Y.Doc();
      void joinAsGuest();
    },
  });
  await guestSide.join("utg-coedit-again");
}
await joinAsGuest();
await idle();
check("a friend starts from the owner's document", text(guestDoc) === "<h1>Before</h1>",
      `guest has ${JSON.stringify(text(guestDoc))}`);

// The owner leaves. The friend keeps typing into a document nobody is saving.
firstHost.close();
await idle();
guestDoc.getMap("files").get("index.html").insert(0, "<p>Alone</p>");
await idle();

// The owner returns: a new document, built from the files their account saved.
const secondDoc = seeded("<h1>Before</h1><p>Owner is back</p>");
const secondHost = watched("host", secondDoc, new Awareness(secondDoc), "Ann");
await secondHost.host("utg-coedit-again-2");
liveHostId = "utg-coedit-again-2";
await new Promise((resolve) => setTimeout(resolve, 200));
check("a guest whose friend reopened the project is rebuilt around their document",
      rebuilds === 1 && text(guestDoc) === "<h1>Before</h1><p>Owner is back</p>",
      `${rebuilds} rebuild(s), guest has ${JSON.stringify(text(guestDoc))}`);
check("and what they typed while alone is handed back to be saved",
      kept === "<p>Alone</p><h1>Before</h1>", JSON.stringify(kept));
/* Not just the text on screen: a losing Y.Text is still carried in the
   document, so a stale copy that merged in would ride along in every save and
   every later sync. Look at the bytes. */
const writers = secondDoc.store.clients.size;
check("the owner's project does not gain a stale copy of itself",
      text(secondDoc) === "<h1>Before</h1><p>Owner is back</p>" && writers === 1,
      `owner has ${JSON.stringify(text(secondDoc))} from ${writers} writer(s)`);

/* The other half of the same fault, and the one that costs the OWNER: a friend
   whose tab has not noticed yet dials the reopened project and offers the
   document it still has. Applying that would fold a whole second copy of every
   file into the child's account, invisibly - the file map shows one winner and
   carries the loser for ever. Whichever end notices first, the owner's document
   takes nothing from a document that is not theirs. */
const { default: StubPeer } = await import(pathToFileURL(stub).href);
const ghostPeer = new StubPeer();
await new Promise((resolve) => ghostPeer.on("open", resolve));
const ghostConn = ghostPeer.connect("utg-coedit-again-2");
await new Promise((resolve) => ghostConn.on("open", resolve));
const staleDoc = seeded("<p>A tab that has not noticed</p>");
ghostConn.send({ t: "hello", name: "Stale tab", client: staleDoc.clientID });
ghostConn.send({ t: "state", u: Buffer.from(Y.encodeStateAsUpdate(staleDoc)).toString("base64"),
                 doc: "a-document-that-is-not-theirs" });
await idle();
check("a stale tab cannot fold its copy into the owner's project",
      text(secondDoc) === "<h1>Before</h1><p>Owner is back</p>" && secondDoc.store.clients.size === 1,
      `owner has ${JSON.stringify(text(secondDoc))} from ${secondDoc.store.clients.size} writer(s)`);
ghostConn.close();
await idle();

// And from there it is an ordinary session again, in both directions.
secondDoc.getMap("files").get("index.html").insert(0, "<p>Hi again</p>");
await idle();
check("the two of them are typing in one document again", text(guestDoc) === text(secondDoc),
      `guest has ${JSON.stringify(text(guestDoc))}, owner has ${JSON.stringify(text(secondDoc))}`);
guestDoc.getMap("files").get("index.html").insert(0, "<p>Me too</p>");
await idle();
check("and the friend's typing reaches the owner", text(secondDoc).includes("Me too"),
      `owner has ${JSON.stringify(text(secondDoc))}`);
check("a reconnection to the SAME document throws nothing away", rebuilds === 1, `${rebuilds} rebuild(s)`);
guestSide.close(); secondHost.close();

/* ---- 9. the owner's side stops working ----

   Watched in a browser: the owner's link to the signalling server died, their
   panel went back to "Nobody has joined yet. Read out your code." - while a
   friend was still listed as editing, and while every attempt to join that
   code failed. Three lies in one line. The owner gets the same heartbeat the
   guest has: look at what is really there, then say it. */
const soloDoc = seeded("<h1>Mine alone</h1>");
let soloRenews = 0;
const solo = watched("host", soloDoc, new Awareness(soloDoc), "Ann", {
  renewPeerId: async () => { soloRenews++; return "utg-coedit-solo-2"; },
});
await solo.host("utg-coedit-solo");
await idle();

const tagDoc = new Y.Doc();
const tagAlong = watched("guest", tagDoc, new Awareness(tagDoc), "Bo", {
  resolveHost: async () => "utg-coedit-solo",
});
await tagAlong.join("utg-coedit-solo");
await idle();
check("a friend is listed while they are really there",
      words(solo)[words(solo).length - 1] === "1 friend is editing with you.", JSON.stringify(words(solo)));

// Their connection dies without a word to either end.
const said = words(solo).length;
const theirLink = Array.from(peers.values()).find((peer) => peer.id === "utg-coedit-solo").links[0];
theirLink.stall();
await new Promise((resolve) => setTimeout(resolve, 200));
/* The guest's own heartbeat brings them back a moment later, which is right -
   what matters is that the owner noticed the gap instead of listing a friend
   who was not there. */
check("a friend who has gone stops being listed as editing",
      words(solo).slice(said).includes("Nobody has joined yet. Read out your code."),
      JSON.stringify(words(solo).slice(said)));
/* A signalling link is not a conversation. Losing the broker while a friend is
   still typing used to reset the panel to "Nobody has joined yet" the moment it
   came back - telling an owner to read out a code to the friend already in
   their project. */
const rejoined = words(solo).length;
peers.get("utg-coedit-solo").loseBroker();
await new Promise((resolve) => setTimeout(resolve, 200));
check("coming back to the broker does not forget the friend already there",
      words(solo).slice(rejoined).length > 0
        && !words(solo).slice(rejoined).includes("Nobody has joined yet. Read out your code."),
      JSON.stringify(words(solo).slice(rejoined)));
tagAlong.close();

// And now the owner's own link to the signalling server dies, quietly.
peers.get("utg-coedit-solo").dieQuietly();
await new Promise((resolve) => setTimeout(resolve, 200));
const lateDoc = new Y.Doc();
const late = watched("guest", lateDoc, new Awareness(lateDoc), "Cy", {
  resolveHost: async () => (registry_has("utg-coedit-solo-2") ? "utg-coedit-solo-2" : "utg-coedit-solo"),
});
function registry_has(id) { return peers.has(id) && peers.get(id).open; }
await late.join("utg-coedit-solo");
await new Promise((resolve) => setTimeout(resolve, 300));
check("a code stays joinable after the owner's signalling link dies quietly",
      text(lateDoc) === "<h1>Mine alone</h1>", `the friend who came late has ${JSON.stringify(text(lateDoc))}`);
late.close(); solo.close();

/* ---- 10. an open connection is not proof that anybody is there ----

   Watched in two browser tabs: the owner closed theirs, and the friend's panel
   went on saying "Live with your friend." for as long as it was left open. The
   connection still reported open, so the heartbeat returned early every eight
   seconds and never dialled again - which also meant the offer to carry on
   without the owner, the one thing that would have saved the work, could never
   appear. Nothing here is closed and nothing is told: only silence. */
const ghostDoc = seeded("<h1>Ours</h1>");
const ghost = watched("host", ghostDoc, new Awareness(ghostDoc), "Ann");
await ghost.host("utg-coedit-ghost");
const leftDoc = new Y.Doc();
let abandoned = false;
const left = watched("guest", leftDoc, new Awareness(leftDoc), "Bo", {
  resolveHost: async () => "utg-coedit-ghost",
  onStranded: (yes) => { abandoned = yes; },
});
await left.join("utg-coedit-ghost");
await new Promise((resolve) => setTimeout(resolve, 200));
check("a friend who joined is live", words(left)[words(left).length - 1] === "Live with your friend.",
      JSON.stringify(words(left)));

peers.get("utg-coedit-ghost").vanish();
/* The tab is shut: nothing on that side is watching, rehosting or answering.
   (vanish() first, so this closes nothing the guest can see.) */
ghost.close();
const sinceGone = words(left).length;
await new Promise((resolve) => setTimeout(resolve, 600));
check("a connection nobody answers on stops counting as live",
      !words(left).slice(sinceGone).includes("Live with your friend."),
      JSON.stringify(words(left).slice(sinceGone)));
check("and the friend is told their work is not being saved", abandoned,
      `the last thing said was ${JSON.stringify(words(left)[words(left).length - 1])}`);
left.close();

owner.close(); guestA.close(); guestB.close();
rmSync(out, { recursive: true, force: true });
console.log(bad ? `\n${bad} problem(s)` : "\ntwo friends can type in one project without shouting over each other");
process.exit(bad ? 1 : 0);
