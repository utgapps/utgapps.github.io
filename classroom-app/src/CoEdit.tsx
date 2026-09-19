import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { docToFiles, userColor } from "./lib/collab";
import { CoeditSession, formatCoeditCode, normalizeCoeditCode, type CoeditPeer } from "./lib/coedit";
import { apiOpenCoedit, apiCloseCoedit, apiCreateProject, apiEnterProject, apiGetCoedit, type ApiCoeditRoom } from "./lib/api";
import type { ProjectKind } from "./lib/types";

/* The two ends of a live editing session, plus the dialog that joins one.

   Sharing is permanent: redeeming a code puts the project on that student's own
   projects screen for good, and either of them can open it any day. What is not
   permanent is who is doing the SAVING. Whole files go to the account on a
   debounce, so two browsers saving the same project would throw away each
   other's work; instead one browser holds the room and writes, and everybody
   else types through its document.

   CoEditBox is the holder's side: the code to read out, who is connected, and
   the half-minute heartbeat that says the room is still in use. CoEditGuest is
   the whole screen for somebody typing through the holder - which is why it
   never saves - and the way to take the room over when the holder goes away. */

type Editor = (props: { doc: Y.Doc; awareness: Awareness; files: Record<string, string>; kind: ProjectKind }) => ReactNode;

/** Same files, same text: nothing was typed in the gap that did not come back. */
function sameFiles(a: Record<string, string>, b: Record<string, string>): boolean {
  const names = Object.keys(a);
  if (names.length !== Object.keys(b).length) return false;
  return names.every((name) => a[name] === b[name]);
}

/** What the gear menu holds on to so that it can start a session. */
export type CoEditHandle = { start: () => void };

/* Owner side: open a room on this project and show the code.

   Starting is no longer a button of its own - it is an item in the header
   menu, so the editor screen carries nothing until there is a code to read
   out. This box therefore shows only what a started session produces. */
export const CoEditBox = forwardRef<CoEditHandle, {
  token: string; projectId: string; doc: Y.Doc; awareness: Awareness; name: string;
  /** Lets the menu drop its own start item while a session is already on. */
  onOpenChange?: (open: boolean) => void;
  /** A room this browser was already given when it opened a shared project:
   *  host it straight away rather than waiting to be asked. */
  initialRoom?: ApiCoeditRoom | null;
  /** How many people this project is shared with. */
  members?: number;
  /** Set when the project belongs to somebody else, which changes what this
   *  box can truthfully say about who it is shared with. */
  ownerName?: string | null;
  /** Somebody else now holds the room - this browser has stopped saving. */
  onUsurped?: (room: ApiCoeditRoom) => void;
}>(function CoEditBox({ token, projectId, doc, awareness, name, onOpenChange, initialRoom, members = 0, ownerName, onUsurped }, ref) {
  const [room, setRoom] = useState<ApiCoeditRoom | null>(null);
  const [peers, setPeers] = useState<CoeditPeer[]>([]);
  const [note, setNote] = useState("");
  const [live, setLive] = useState(false);
  const [busy, setBusy] = useState(false);
  const sessionRef = useRef<CoeditSession | null>(null);

  /* Leaving the editor closes the session. The room in D1 is left to expire on
     its own: a tab that crashes must not strand a code that its owner can no
     longer turn off, and re-opening the same project hands back the same code. */
  useEffect(() => () => { sessionRef.current?.close(); sessionRef.current = null; }, []);

  useImperativeHandle(ref, () => ({ start: () => { void start(); } }));

  /* Opening a shared project already asked the server who saves it, and this
     browser was told it does. Host the room that came back rather than asking
     a second time - and never for a project nobody shares, which stays exactly
     as quiet as it was before any of this existed. */
  useEffect(() => { if (initialRoom) void start(initialRoom); }, [initialRoom]);

  /* The heartbeat. It says "still here" so that nobody takes the room, and the
     answer says whether anybody already has: a laptop that slept through two
     beats comes back to find a partner saving, and must stop saving itself
     before the two of them write over each other. */
  /* Through refs, and NOT in the dependencies: these arrive as fresh closures
     on every render, and this component re-renders on every keystroke its
     partner sends. In the dependency list they would clear and restart the
     interval before it ever reached thirty seconds - a heartbeat that never
     beats, which is exactly the failure it exists to prevent. */
  const beatRef = useRef({ onUsurped, onOpenChange });
  beatRef.current = { onUsurped, onOpenChange };
  useEffect(() => {
    if (!room) return;
    const timer = window.setInterval(async () => {
      try {
        const beat = await apiEnterProject(token, projectId);
        if (beat.role === "host") return;
        sessionRef.current?.close();
        sessionRef.current = null;
        setRoom(null); setPeers([]); setLive(false);
        beatRef.current.onOpenChange?.(false);
        beatRef.current.onUsurped?.(beat.room);
      } catch { /* a missed beat is not proof of anything; try again in 30s */ }
    }, 30000);
    return () => window.clearInterval(timer);
  }, [room, token, projectId]);

  async function start(given?: ApiCoeditRoom) {
    setBusy(true);
    setNote("Opening…");
    try {
      const opened = given || await apiOpenCoedit(token, projectId);
      const session = new CoeditSession({
        role: "host", doc, awareness, token, name,
        onPeers: setPeers,
        onStatus: (text, isLive) => { setNote(text); setLive(isLive); },
        // The signalling broker holds an id for about a minute after its owner
        // disconnects, so re-opening a project you just left is refused. Ask
        // for a new id behind the same code rather than making a child wait.
        renewPeerId: async () => (await apiOpenCoedit(token, projectId, true)).peerId,
      });
      sessionRef.current = session;
      setRoom(opened);
      onOpenChange?.(true);
      await session.host(opened.peerId);
    } catch (error) { setNote((error as Error).message || "Could not start co-editing."); }
    setBusy(false);
  }

  /* Turning the code off. It stops NEW people joining and ends the session on
     screen; it does not un-share the project, because the people already in it
     have it on their own projects screen and taking that away silently would
     be a worse surprise than a code that stopped working. They leave from
     their own card, the owner removes nobody. */
  async function stop() {
    const session = sessionRef.current;
    sessionRef.current = null;
    session?.close("Your partner closed the session. Your copy stops updating now.");
    const code = room?.code;
    setRoom(null); setPeers([]); setLive(false); onOpenChange?.(false);
    setNote("That code is off. Anyone already sharing this project still has it.");
    if (code) { try { await apiCloseCoedit(token, code); } catch { /* it expires on its own */ } }
  }

  // Nothing to show until there is something to say: no code, no clutter.
  if (!room) return note || busy
    ? <div className="coedit-box"><span className="share-note">{busy ? "Opening…" : note}</span></div>
    : null;

  return <div className="coedit-box open">
    <div className="coedit-code-row">
      <span className="coedit-label">Share code</span>
      <strong className="coedit-code">{formatCoeditCode(room.code)}</strong>
      <button className="text-button" onClick={() => { navigator.clipboard?.writeText(formatCoeditCode(room.code)); setNote("Code copied."); }}>Copy</button>
      <button className="text-button danger" onClick={stop}>Turn the code off</button>
    </div>
    <div className="coedit-status">
      <i className={live ? "online" : "offline"}></i>
      <span>{note || (members > 0 ? "Nobody else is here right now." : "Waiting for somebody to join.")}</span>
      {peers.map((peer) => <span className="peer-chip" key={peer.client} style={{ borderColor: userColor(peer.name) }}>{peer.name}</span>)}
    </div>
    <small className="muted">{ownerName
      ? <>{ownerName}&rsquo;s project, shared with you. This computer is the one saving it at the moment.</>
      : members > 0
        ? <>Shared with {members} {members === 1 ? "person" : "people"}. It is on their projects screen too, and this computer is the one saving it.</>
        : <>Read the code to the person you are sharing with. They press <strong>＋ Shared project</strong> on their projects screen, and it stays on that screen for good.</>}</small>
  </div>;
});

/** Guest side: the whole editor screen for a project somebody else is saving. */
export function CoEditGuest({ token, name, room, owned, onLeave, onCopied, onTakeOver, children }: {
  token: string; name: string; room: ApiCoeditRoom; onLeave: () => void;
  /** True when this student owns the project and is merely not the one saving
   *  it at the moment - which changes what the screen can honestly say. */
  owned?: boolean;
  /** Called with the id of the copy a stranded guest saved to their own account. */
  onCopied?: (projectId: string) => void;
  /** Take the room over and become the browser that saves, keeping this text. */
  onTakeOver?: (files: Record<string, string>) => void;
  children: Editor;
}) {
  /* The document is created inside the effect, not in a ref, so that React's
     double-invoked mount in development cannot leave the screen bound to a doc
     its own cleanup already destroyed. */
  const [shared, setShared] = useState<{ doc: Y.Doc; awareness: Awareness } | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const [live, setLive] = useState(false);
  const [stranded, setStranded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [note, setNote] = useState("Connecting…");
  /* Bumped to throw this screen's document away and take the owner's instead.
     They reopened the project, which builds a new document on their side; the
     two cannot be merged, so the owner's wins and what was typed in the gap is
     kept aside to be saved as the guest's own copy. */
  const [generation, setGeneration] = useState(0);
  const [orphan, setOrphan] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    // Deliberately EMPTY: the host's state is the only seed. Two sides seeding
    // the same files independently makes Yjs duplicate every line on merge.
    const doc = new Y.Doc();
    const awareness = new Awareness(doc);
    awareness.setLocalStateField("user", { name, color: userColor(name + room.code) });
    let timer: number | null = null;
    const derive = () => {
      if (timer !== null) return;
      timer = window.setTimeout(() => { timer = null; setFiles(docToFiles(doc)); }, 300);
    };
    doc.on("update", derive);
    const session = new CoeditSession({
      role: "guest", doc, awareness, token, name,
      onStatus: (text, isLive) => { setNote(text); setLive(isLive); },
      onReady: () => {
        setReady(true);
        const now = docToFiles(doc);
        setFiles(now);
        // If everything typed in the gap came back anyway, say nothing.
        setOrphan((kept) => (kept && sameFiles(kept, now) ? null : kept));
      },
      // The code outlives any one peer id: ask what the host's id is NOW.
      resolveHost: async () => (await apiGetCoedit(token, room.code)).peerId,
      onStranded: setStranded,
      onFreshDoc: () => { setOrphan(docToFiles(doc)); setGeneration((n) => n + 1); },
    });
    setShared({ doc, awareness });
    void session.join(room.peerId);
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      doc.off("update", derive);
      session.close();
      awareness.destroy();
      doc.destroy();
      setShared(null); setReady(false); setFiles({}); setStranded(false); setSaved("");
    };
  }, [room.peerId, room.code, token, name, generation]);

  async function saveCopy(what?: Record<string, string>) {
    const files = what || (shared ? docToFiles(shared.doc) : null);
    if (!files || saving) return;
    setSaving(true);
    try {
      const made = await apiCreateProject(token, {
        title: `${room.title} (my copy)`, kind: room.kind, files,
      });
      setSaved("Saved to your projects.");
      // A stranded guest has nothing left here, so take them to their copy. A
      // guest whose friend just came back is still typing with them: saving
      // what they wrote alone must not pull them out of the session.
      if (!what) onCopied?.(made.id);
    } catch (error) { setSaved((error as Error).message || "That copy could not be saved."); }
    setSaving(false);
  }

  return <main className="student-shell">
    <header className="room-header">
      <div><button className="text-button projects-button" onClick={onLeave}>◀ Projects</button><span className="slash">/</span><strong>{room.title}</strong></div>
      <div className="connection">
        <i className={live ? "online" : "offline"}></i>
        {live ? `Editing with ${room.host}` : "Not connected"}
        <button className="text-button" onClick={onLeave}>Leave</button>
      </div>
    </header>
    <section className="student-project">
      <div className="workspace-top">
        <div><p className="eyebrow">{owned ? "Your project" : "Shared project"}</p><h1>{room.title}</h1></div>
        <span className="save-label">{note}</span>
      </div>
      {/* Not a warning any more: the project is on this student's own projects
          screen from the moment they joined it. What they do need to know is
          whose computer is doing the saving, because only one is. */}
      <p className="notice">{owned
        ? <>This is your project. {room.host} has it open, so their computer is the one saving what you both type &mdash; it is still saved to you.</>
        : <>This project is shared with you and stays on your projects screen. {room.host} has it open, so their computer is the one saving what you both type.</>}</p>
      {/* The one moment a guest needs to own something: their friend has gone,
          nothing more will be saved to that account, and the work on screen is
          about to be lost. Copying it costs one button and keeps the afternoon. */}
      {stranded && <div className="coedit-rescue">
        <strong>{room.host} is not connected.</strong>
        <span>Nothing you type is being saved while nobody is holding the project.</span>
        {saved
          ? <span className="saved-note">{saved}</span>
          : <>
              {onTakeOver && <button className="primary" onClick={() => onTakeOver(shared ? docToFiles(shared.doc) : files)}>Carry on without {room.host}</button>}
              <button className="text-button" disabled={saving} onClick={() => saveCopy()}>{saving ? "Saving…" : "Save a copy instead"}</button>
            </>}
      </div>}
      {/* The owner reopened the project, so the document on screen is theirs
          again. Anything typed while they were away is in no account at all -
          offer it before it goes. */}
      {orphan && <div className="coedit-rescue">
        <strong>{room.host} reopened this project.</strong>
        <span>What you typed while they were away is not in it.</span>
        {saved
          ? <span className="saved-note">{saved}</span>
          : <button className="primary" disabled={saving} onClick={() => saveCopy(orphan)}>{saving ? "Saving…" : "Save what I typed to my projects"}</button>}
        <button className="text-button" onClick={() => setOrphan(null)}>Hide</button>
      </div>}
      {shared && ready
        ? children({ doc: shared.doc, awareness: shared.awareness, files, kind: room.kind })
        : <p className="empty">Waiting for {room.host} to send the project&hellip;</p>}
    </section>
  </main>;
}

/** The dialog behind "+ Shared project". Redeeming the code is what proves it
 *  is real AND what joins the project for good, so it happens here rather than
 *  on the screen behind it. */
export function CoEditJoinDialog({ token, onJoined, onCancel }: {
  token: string; onJoined: (room: ApiCoeditRoom) => void; onCancel: () => void;
}) {
  const [typed, setTyped] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const code = normalizeCoeditCode(typed);

  async function join() {
    if (!code || busy) return;
    setBusy(true); setNote("Looking for that project…");
    try { onJoined(await apiGetCoedit(token, code)); }
    catch (error) { setNote((error as Error).message || "That code did not work."); setBusy(false); }
  }

  return <div className="dialog-backdrop">
    <div className="dialog" role="dialog" aria-modal="true" aria-label="Join a shared project">
      <h2>Join a shared project</h2>
      <p>Ask the person sharing it to press <strong>Share this project</strong> in their project. They will read you a code like <code>7KX2 - M4P9</code>. Once you have typed it in, the project stays on your projects screen.</p>
      <label>Their code<input className="code-input coedit-input" value={typed} maxLength={16} autoFocus
                                placeholder="XXXX - XXXX"
                                onChange={(event) => setTyped(event.target.value.toUpperCase())}
                                onKeyDown={(event) => event.key === "Enter" && join()} /></label>
      {note && <p className="notice">{note}</p>}
      <div className="dialog-actions">
        <button className="text-button" onClick={onCancel}>Cancel</button>
        <button className="primary" disabled={!code || busy} onClick={join}>{busy ? "Joining…" : "Join"}</button>
      </div>
    </div>
  </div>;
}
