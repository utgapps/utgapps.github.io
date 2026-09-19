import Peer, { DataConnection } from "peerjs";
import * as Y from "yjs";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate, removeAwarenessStates } from "y-protocols/awareness";
import { b64encode, b64decode } from "./collab";
import { peerOptions } from "./rootCodes";

/* Student-to-student co-editing.

   One student owns the project and hosts; friends redeem an eight-character
   code for the host's peer id and connect straight to them. Everything below a
   connection is the same machinery the teacher's live room already uses - a
   Y.Doc of Y.Texts, cursors over y-protocols awareness - so a co-editor, a
   teacher watching, and the autosave all read one document.

   Two things this file is careful about, both of which cost real bandwidth on a
   school connection:

   1. Updates are BATCHED. A keystroke produces a Yjs update of a few bytes, and
      sending one WebRTC message per keystroke means a message every ~80ms per
      typing child, each with its own base64 and JSON overhead. Updates are
      collected for 50ms and merged with Y.mergeUpdates into one payload. 50ms
      is under the threshold where a person reads their friend's typing as
      delayed, and it collapses a fast typist's burst into a single send.

   2. Nothing is echoed back to where it came from. Each queued update remembers
      which connection it arrived on, and the flush skips that connection. The
      host relays guest A's typing to guest B without bouncing it back to A.

   Full state crosses only on connect - after that it is deltas. */

export const COEDIT_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/** Clean up a code a child typed or pasted. Crockford base32: the alphabet has
 *  no I, L, O or U, so those glyphs can only be a misread and fold onto 0 and 1
 *  rather than being rejected. A dash, a space or lower case is fine. */
export function normalizeCoeditCode(raw: string): string {
  const text = String(raw || "").toUpperCase().replace(/[^0-9A-Z]/g, "")
    .replace(/O/g, "0").replace(/[IL]/g, "1");
  if (text.length !== 8) return "";
  for (const ch of text) if (!COEDIT_ALPHABET.includes(ch)) return "";
  return text;
}

/** XXXX - XXXX. The gap is what makes eight characters readable out loud. */
export function formatCoeditCode(code: string): string {
  return code.length === 8 ? `${code.slice(0, 4)} - ${code.slice(4)}` : code;
}

const FLUSH_MS = 50;
const RETRY_MS = 8000;
/* How many failed dials before a guest is told plainly that their friend is not
   there. Three attempts is about twenty seconds - long enough to ride out a
   host reloading their page, short enough that a child does not keep typing
   into a document nobody is saving. */
const STRAND_AFTER = 3;
/* Ticks of silence before a connection that still says open is treated as
   gone: about twenty-four seconds. Counted in ticks rather than milliseconds
   because that is what it means - three chances to say something, all missed -
   and because a clock cannot be wound forward by a test the way a timer can. */
const SILENT_TICKS = 3;
/* A host that cannot claim its signalling id asks the API to move the code onto
   a fresh one. Bounded: a renew that also fails means something else is wrong,
   and a loop would only hammer the API. */
const RENEW_TRIES = 3;

/* Every document message carries the identity of the document it came from.
   An owner who steps back to their projects list and returns builds a NEW
   Y.Doc from the saved files, which shares no history with the copy their
   friend still has on screen. Merging those two is not a merge: the file map
   picks one winner and the loser keeps an editor bound to a Y.Text nobody
   sends any more. Both children then type happily into documents that will
   never meet again - the transport says "live", and nothing crosses.

   So a document says who it is. The owner's copy is always the real one; a
   guest holding any other rebuilds itself around the one that arrives. */
type CoeditWire =
  | { t: "hello"; name: string; client: number }
  | { t: "state"; u: string; doc?: string }     // whole document, on connect only
  | { t: "ydoc"; u: string; doc?: string }      // merged delta
  | { t: "aware"; u: string }     // cursors and names
  | { t: "bye"; reason: string }
  /* Proof of life. A closed tab does not always close its connections: the
     other end keeps a DataConnection that says open, receives nothing, sends
     into nothing, and reports "Live with your friend" for the rest of the
     lesson while nothing anybody types is saved. So each end asks, and an end
     that has answered nothing for three ticks is treated as gone. */
  | { t: "ping" }
  | { t: "pong" };

export type CoeditPeer = { name: string; client: number };

type Options = {
  role: "host" | "guest";
  doc: Y.Doc;
  awareness: Awareness;
  token: string;
  name: string;
  onPeers?: (peers: CoeditPeer[]) => void;
  onStatus?: (text: string, live: boolean) => void;
  /** Guest only: the host's document has arrived and the editor can open. */
  onReady?: () => void;
  /** Host only: the signalling id could not be claimed. Ask the API for a new
   *  one behind the same code and return it. */
  renewPeerId?: () => Promise<string>;
  /** Guest only: look the code up again and return the host's CURRENT peer id.
   *  A host that restarts comes back on a new id behind the same code, so the
   *  code - not the id handed out at redemption - is what a retry must follow. */
  resolveHost?: () => Promise<string>;
  /** Guest only: the host has been unreachable long enough that typing on is
   *  no longer safe, or is reachable again. */
  onStranded?: (stranded: boolean) => void;
  /** Guest only: the owner came back with a different document - they reopened
   *  the project - so this session must be rebuilt around theirs. */
  onFreshDoc?: () => void;
};

export class CoeditSession {
  private readonly role: "host" | "guest";
  private readonly doc: Y.Doc;
  private readonly awareness: Awareness;
  private readonly token: string;
  private readonly name: string;
  private readonly opts: Options;

  private peer: Peer | null = null;
  private conns = new Set<DataConnection>();
  private peers = new Map<DataConnection, CoeditPeer>();
  /** Ticks since each connection last proved somebody was on the other end. */
  private silent = new Map<DataConnection, number>();
  private queue: { from: DataConnection | null; u: Uint8Array }[] = [];
  private awareQueue = new Set<number>();
  private timer: number | null = null;
  private retry: number | null = null;
  private hostPeerId = "";
  private closed = false;
  private ready = false;
  private renews = 0;
  private rejoining = false;
  private failures = 0;
  private stranded = false;
  /** Guest only: the guid of the host document this session adopted. */
  private hostDoc = "";

  private readonly onDocUpdate: (u: Uint8Array, origin: unknown) => void;
  private readonly onAwareUpdate: (changed: { added: number[]; updated: number[]; removed: number[] }, origin: unknown) => void;

  constructor(opts: Options) {
    this.opts = opts;
    this.role = opts.role;
    this.doc = opts.doc;
    this.awareness = opts.awareness;
    this.token = opts.token;
    this.name = opts.name;

    this.onDocUpdate = (u, origin) => {
      // An update applied from a peer carries that peer's connection as its
      // origin, which is exactly what the flush needs to avoid echoing it back.
      const from = this.conns.has(origin as DataConnection) ? (origin as DataConnection) : null;
      this.queue.push({ from, u });
      this.schedule();
    };
    this.onAwareUpdate = ({ added, updated, removed }, origin) => {
      /* Awareness carries no per-connection origin, so unlike a document update
         it cannot be filtered at the flush. A guest that relayed what it just
         received would bounce every cursor move straight back at the host. The
         host does relay: that is how two guests see each other's cursors. */
      if (origin === "coedit" && this.role === "guest") return;
      for (const id of added.concat(updated, removed)) this.awareQueue.add(id);
      this.schedule();
    };
    this.doc.on("update", this.onDocUpdate);
    this.awareness.on("update", this.onAwareUpdate);
  }

  /** Host: claim the peer id the API handed out and wait for friends. */
  async host(peerId: string) {
    if (this.closed) return;
    this.status("Opening your project to a friend…", false);
    try {
      const peer = new Peer(peerId, await peerOptions(this.token));
      if (this.closed) { peer.destroy(); return; }
      this.peer = peer;
      peer.on("open", () => { this.renews = 0; this.announce(); });
      peer.on("connection", (conn) => this.accept(conn));
      this.scheduleRetry();
      peer.on("disconnected", () => { try { peer.reconnect(); } catch { /* the next event retries */ } });
      peer.on("error", (error: Error & { type?: string }) => {
        /* "unavailable-id" is not the second tab it looks like. The signalling
           broker keeps a disconnected id for about a minute, so a child who
           steps back to their projects list and returns is refused the id they
           just had. Move the code onto a fresh id instead of telling them to
           close a tab that is not open: what they read out does not change,
           and their friend follows the code, not the id. */
        if (error.type === "unavailable-id") void this.rehost();
        else this.status("Connection trouble. Still trying…", false);
      });
    } catch { this.status("Could not start co-editing. Check your connection.", false); }
  }

  /** Host: move the code onto a fresh signalling id and claim that instead. */
  private async rehost() {
    if (this.closed) return;
    if (!this.opts.renewPeerId || this.renews >= RENEW_TRIES) {
      this.status("Co-editing could not start. Close any other tab with this project open, then try again.", false);
      return;
    }
    this.renews++;
    this.status("Reconnecting your code…", false);
    try { this.peer?.destroy(); } catch { /* replacing it anyway */ }
    this.peer = null;
    try {
      const next = await this.opts.renewPeerId();
      if (this.closed) return;
      await this.host(next);
    } catch { this.status("Co-editing could not start. Check your connection.", false); }
  }

  /** Guest: dial the host and keep dialling if they are not there yet. */
  async join(hostPeerId: string) {
    if (this.closed) return;
    this.hostPeerId = hostPeerId;
    this.status("Connecting…", false);
    try {
      const peer = new Peer(await peerOptions(this.token));
      if (this.closed) { peer.destroy(); return; }
      this.peer = peer;
      peer.on("open", () => void this.dial());
      this.scheduleRetry();
      peer.on("disconnected", () => { try { peer.reconnect(); } catch { /* the next event retries */ } });
      peer.on("error", () => { this.note("Your friend does not have the project open."); this.scheduleRetry(); });
    } catch { this.status("Could not connect. Check your connection.", false); }
  }

  close(reason = "") {
    if (this.closed) return;
    this.closed = true;
    if (this.timer !== null) window.clearTimeout(this.timer);
    if (this.retry !== null) window.clearTimeout(this.retry);
    this.doc.off("update", this.onDocUpdate);
    this.awareness.off("update", this.onAwareUpdate);
    // Take every visiting cursor off the screen; otherwise a name sits blinking
    // in the margin of a document nobody is editing any more.
    const others = Array.from(this.peers.values()).map((p) => p.client).filter((id) => this.awareness.meta.has(id));
    if (others.length) removeAwarenessStates(this.awareness, others, "coedit");
    for (const conn of this.conns) {
      try { if (conn.open && reason) conn.send({ t: "bye", reason } satisfies CoeditWire); } catch { /* going away anyway */ }
      try { conn.close(); } catch { /* going away anyway */ }
    }
    this.conns.clear(); this.peers.clear();
    try { this.peer?.destroy(); } catch { /* going away anyway */ }
    this.peer = null;
  }

  // ---- transport ----

  private async dial() {
    if (this.closed) return;
    /* A retry that gives up quietly is the same as no retry at all. Twice now
       the guest's own link to the signalling server has died without a
       "disconnected" event, and every later attempt returned here and
       scheduled nothing - the child sat on "still trying" for ever while their
       friend waited. Whatever state the peer is in, this leaves a next attempt
       booked. */
    if (!this.peer || this.peer.destroyed) { this.rejoin(); return; }
    if (!this.peer.open) {
      try { this.peer.reconnect(); } catch { /* rejoin catches a peer too far gone */ }
      this.scheduleRetry();
      return;
    }
    /* A connection that still says open has to earn it. Every tick asks the
       host to say something; an end that has said nothing at all for three of
       them is dropped, and the dial below starts again from the code - which
       is how a guest finds out their partner has gone, and how the offer to
       carry on without them ever appears. */
    const open = Array.from(this.conns).filter((conn) => conn.open);
    if (open.length) {
      for (const conn of open) {
        const missed = (this.silent.get(conn) || 0) + 1;
        this.silent.set(conn, missed);
        if (missed >= SILENT_TICKS) {
          this.drop(conn);
          try { conn.close(); } catch { /* it was not listening anyway */ }
          continue;
        }
        try { conn.send({ t: "ping" } satisfies CoeditWire); } catch { this.drop(conn); }
      }
      if (Array.from(this.conns).some((conn) => conn.open)) return;
      this.note("Your friend went offline.");
    }
    /* Follow the CODE, not the id handed out at redemption. A host who reloads
       or steps away comes back on a new peer id behind the same code; without
       this, a guest would dial a dead id politely, for ever. */
    if (this.opts.resolveHost) {
      try {
        const current = await this.opts.resolveHost();
        if (this.closed || !this.peer || !this.peer.open) return;
        if (current) this.hostPeerId = current;
      } catch {
        // The room is gone, or the network is. Either way it is a failed
        // attempt, and the retry asks again.
        this.note("Your friend closed the project.");
        this.scheduleRetry();
        return;
      }
    }
    const conn = this.peer.connect(this.hostPeerId, { reliable: true });
    conn.on("open", () => {
      // The heartbeat stays booked even while connected: it is the only thing
      // that notices a peer which stops working without saying so.
      this.failures = 0;
      this.setStranded(false);
      this.conns.add(conn);
      this.silent.set(conn, 0);
      conn.send({ t: "hello", name: this.name, client: this.doc.clientID } satisfies CoeditWire);
      // Anything typed while disconnected travels now. On a first join this is
      // an empty document and costs nothing.
      conn.send({ t: "state", u: b64encode(Y.encodeStateAsUpdate(this.doc)), doc: this.identity() } satisfies CoeditWire);
      this.sendAwarenessTo(conn);
      this.status("Live with your friend.", true);
    });
    conn.on("data", (data) => this.receive(conn, data as CoeditWire));
    conn.on("close", () => {
      this.drop(conn);
      if (!this.closed) { this.note("Your friend went offline."); this.scheduleRetry(); }
    });
    conn.on("error", () => { this.drop(conn); if (!this.closed) this.note("Your friend went offline."); this.scheduleRetry(); });
  }

  /** Build a whole new peer. The last one cannot be revived. */
  private rejoin() {
    if (this.closed || this.rejoining) return;
    this.rejoining = true;
    try { this.peer?.destroy(); } catch { /* going away anyway */ }
    this.peer = null;
    void this.join(this.hostPeerId).finally(() => { this.rejoining = false; });
  }

  /* A guest keeps one timer for as long as the session lives, and books the
     next tick from inside the last. Reacting only to events was not enough:
     a peer can stop working without emitting anything at all, and then there
     is nothing left to notice it. Each tick is a no-op while a connection is
     open, so the cost of the safety net is one check every eight seconds. */
  private scheduleRetry() {
    if (this.closed || this.retry !== null) return;
    this.retry = window.setTimeout(() => {
      this.retry = null;
      if (this.role === "guest") void this.dial();
      else this.sweep();
      this.scheduleRetry();
    }, RETRY_MS);
  }

  /* The owner's half of the lesson the guest learned the hard way: a peer can
     stop working without saying so. This costs no messages - it is a look at
     what is already known - and it keeps the panel honest. A friend who has
     gone stops being listed as editing, and a signalling link that died is
     rebuilt rather than leaving a code that nobody can join while the owner is
     told to read it out. */
  private sweep() {
    for (const conn of Array.from(this.conns)) {
      if (!conn.open) { this.drop(conn); continue; }
      // Guests ping on the same eight seconds this sweeps on, so silence here
      // means what it means there: a chip on screen for somebody who has gone
      // home. The host does not ping back unasked - a pong is the reply.
      const missed = (this.silent.get(conn) || 0) + 1;
      this.silent.set(conn, missed);
      if (missed >= SILENT_TICKS) {
        this.drop(conn);
        try { conn.close(); } catch { /* already gone */ }
      }
    }
    if (!this.peer || this.peer.destroyed) { void this.rehost(); return; }
    if (!this.peer.open) {
      try { this.peer.reconnect(); } catch { void this.rehost(); }
    }
  }

  /* One failed attempt. Up to a point this is "still trying", which is true and
     calm. Past it the app has to stop promising: nothing a guest types reaches
     an account until the owner is back, and saying otherwise is how an
     afternoon of work disappears. */
  private note(what: string) {
    this.failures++;
    if (this.failures < STRAND_AFTER) { this.status(`${what} Still trying…`, false); return; }
    this.setStranded(true);
    this.status(`${what} Nothing you type now is being saved.`, false);
  }

  private setStranded(stranded: boolean) {
    if (stranded === this.stranded) return;
    this.stranded = stranded;
    this.opts.onStranded?.(stranded);
  }

  private accept(conn: DataConnection) {
    conn.on("open", () => {
      if (this.closed) { conn.close(); return; }
      this.conns.add(conn);
      this.silent.set(conn, 0);
      conn.send({ t: "state", u: b64encode(Y.encodeStateAsUpdate(this.doc)), doc: this.identity() } satisfies CoeditWire);
      this.sendAwarenessTo(conn);
      this.announce();
    });
    conn.on("data", (data) => this.receive(conn, data as CoeditWire));
    conn.on("close", () => this.drop(conn));
    conn.on("error", () => this.drop(conn));
  }

  private drop(conn: DataConnection) {
    const who = this.peers.get(conn);
    this.conns.delete(conn);
    this.peers.delete(conn);
    this.silent.delete(conn);
    if (who && this.awareness.meta.has(who.client)) removeAwarenessStates(this.awareness, [who.client], "coedit");
    if (!this.closed) this.announce();
  }

  private receive(conn: DataConnection, msg: CoeditWire) {
    if (this.closed || !msg || typeof msg !== "object") return;
    this.silent.set(conn, 0);
    if (msg.t === "ping") { try { conn.send({ t: "pong" } satisfies CoeditWire); } catch { this.drop(conn); } return; }
    if (msg.t === "pong") return;
    if (msg.t === "hello") { this.peers.set(conn, { name: msg.name || "A friend", client: msg.client }); this.announce(); return; }
    if (msg.t === "state" || msg.t === "ydoc") {
      if (this.foreign(msg.doc)) return;
      // The connection is the origin: it is what stops the flush sending this
      // straight back, and what lets the app tell a peer edit from its own.
      Y.applyUpdate(this.doc, b64decode(msg.u), conn);
      if (msg.t === "state" && !this.ready) { this.ready = true; this.opts.onReady?.(); }
      return;
    }
    if (msg.t === "aware") { applyAwarenessUpdate(this.awareness, b64decode(msg.u), "coedit"); return; }
    if (msg.t === "bye") { this.status(msg.reason, false); this.drop(conn); try { conn.close(); } catch { /* already gone */ } }
  }

  /** What document this end is speaking for. The owner's is its own; a guest
   *  speaks for whichever one it adopted, so its edits are never mistaken for a
   *  stale copy. */
  private identity(): string {
    return this.role === "host" ? this.doc.guid : this.hostDoc;
  }

  /* Is this update from some other document? A guest adopts the first one it is
     offered and rebuilds if the owner ever comes back with another. The owner
     simply drops a stale guest's update: their project must not gain a second
     copy of every file because a friend's tab was slow to notice. An untagged
     message has no opinion and is let through. */
  private foreign(id?: string): boolean {
    if (!id) return false;
    if (this.role === "host") return id !== this.doc.guid;
    if (!this.hostDoc) { this.hostDoc = id; return false; }
    if (id === this.hostDoc) return false;
    this.hostDoc = "";
    this.opts.onFreshDoc?.();
    return true;
  }

  private sendAwarenessTo(conn: DataConnection) {
    const ids = Array.from(this.awareness.getStates().keys()).filter((id) => this.awareness.meta.has(id));
    if (ids.length) conn.send({ t: "aware", u: b64encode(encodeAwarenessUpdate(this.awareness, ids)) } satisfies CoeditWire);
  }

  private schedule() {
    if (this.timer === null && !this.closed) this.timer = window.setTimeout(() => this.flush(), FLUSH_MS);
  }

  /* One send per connection per tick: the document deltas merged into a single
     update, plus one awareness frame. Updates queued while nobody is connected
     are dropped on purpose - whoever connects next is handed the whole document
     anyway, so keeping them would only send the same bytes twice. */
  private flush() {
    this.timer = null;
    const queue = this.queue;
    this.queue = [];
    // A client can leave between a cursor move and this flush, and encoding a
    // client with no meta entry throws inside y-protocols.
    const ids = Array.from(this.awareQueue).filter((id) => this.awareness.meta.has(id));
    this.awareQueue.clear();
    const aware = ids.length ? b64encode(encodeAwarenessUpdate(this.awareness, ids)) : "";
    for (const conn of this.conns) {
      if (!conn.open) continue;
      const mine = queue.filter((item) => item.from !== conn);
      try {
        if (mine.length) conn.send({ t: "ydoc", u: b64encode(Y.mergeUpdates(mine.map((item) => item.u))), doc: this.identity() } satisfies CoeditWire);
        if (aware) conn.send({ t: "aware", u: aware } satisfies CoeditWire);
      } catch { /* a connection closing mid-flush is handled by its close event */ }
    }
  }

  private announce() {
    this.opts.onPeers?.(Array.from(this.peers.values()));
    if (this.role !== "host") return;
    const n = this.peers.size;
    if (n === 0) this.status("Nobody has joined yet. Read out your code.", true);
    else this.status(n === 1 ? "1 friend is editing with you." : `${n} friends are editing with you.`, true);
  }

  private status(text: string, live: boolean) { this.opts.onStatus?.(text, live); }
}
