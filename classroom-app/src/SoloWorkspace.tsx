import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { seedDoc, docToFiles, userColor } from "./lib/collab";
import { apiGetProjectById, apiSaveProjectById, apiSaveProjectBeacon, type ApiCoeditRoom } from "./lib/api";
import { ProjectPicker } from "./ProjectPicker";
import { CoEditBox, CoEditGuest, type Editor } from "./CoEdit";
import type { ProjectKind } from "./lib/types";

/* The teacher's own projects.

   Same picker and same editor a student gets, minus the live-collaboration
   half: there is no peer to sync with, so this owns a plain local Y.Doc. The
   doc is still a Y.Doc rather than plain strings because CollabEditor binds to
   one - keeping that interface identical is what makes this ~100 lines instead
   of a second editor. */

export function SoloWorkspace({ token, who, onExit, exitLabel = "Back to the class", children }: {
  token: string;
  who: string;
  onExit: () => void;
  /* Where leaving goes back TO. A teacher who came from a live classroom is
     going back to the class; one who came from the entry screen is not, and
     being told they are is the kind of small lie that makes an app feel like
     it was written for somebody else. */
  exitLabel?: string;
  children: Editor;
}) {
  const [step, setStep] = useState<"picker" | "room" | "coedit">("picker");
  // A project somebody else owns, opened with their code. Teachers get this for
  // the same reason students do: sitting inside a child's code with them is the
  // fastest way to unstick it.
  const [coeditRoom, setCoeditRoom] = useState<ApiCoeditRoom | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<ProjectKind>("web");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Choose a project, or start a new one.");
  /* Whether everything typed has reached the server - what the game editor's
     SAVED button reports, and what pressing it fixes. */
  const [saved, setSaved] = useState(true);
  const docRef = useRef<Y.Doc | null>(null);
  const awarenessRef = useRef<Awareness | null>(null);
  const idRef = useRef("");
  /* The title has to live in a ref, not only in state. saveNow() is reached
     from the doc's update handler, which was registered inside open() and so
     closes over the render where title was still empty - and the API reads an
     empty title as "My project". A teacher's "Week 7 - Memory" silently lost
     its name on the first autosave. */
  const titleRef = useRef("");
  const deriveTimer = useRef<number | null>(null);
  const saveTimer = useRef<number | null>(null);

  async function saveNow() {
    const doc = docRef.current;
    if (!doc || !idRef.current) return;
    try {
      await apiSaveProjectById(token, idRef.current, { title: titleRef.current, files: docToFiles(doc) });
      setSaved(true);
      setStatus("Saved.");
    } catch { /* keep working; the next change retries */ }
  }
  function scheduleSave() {
    setSaved(false);
    if (saveTimer.current !== null) return;
    saveTimer.current = window.setTimeout(() => { saveTimer.current = null; void saveNow(); }, 8000);
  }
  async function flush() {
    if (saveTimer.current !== null) { window.clearTimeout(saveTimer.current); saveTimer.current = null; await saveNow(); }
  }

  useEffect(() => () => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    awarenessRef.current?.destroy();
    docRef.current?.destroy();
  }, []);
  useEffect(() => {
    function onHidden() {
      if (document.visibilityState !== "hidden") return;
      const doc = docRef.current;
      if (doc && idRef.current && saveTimer.current !== null) {
        window.clearTimeout(saveTimer.current);
        saveTimer.current = null;
        apiSaveProjectBeacon(token, idRef.current, docToFiles(doc));
      }
    }
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, [token]);

  async function open(id: string) {
    await flush();
    setStatus("Opening…");
    let project;
    try { project = await apiGetProjectById(token, id); }
    catch { setStatus("That project could not be opened."); return; }
    if (!project) { setStatus("That project is not there any more."); return; }

    awarenessRef.current?.destroy();
    docRef.current?.destroy();
    const doc = new Y.Doc();
    seedDoc(doc, project.files);
    const awareness = new Awareness(doc);
    awareness.setLocalStateField("user", { name: who, color: userColor(who) });
    doc.on("update", () => {
      if (deriveTimer.current === null) {
        deriveTimer.current = window.setTimeout(() => {
          deriveTimer.current = null;
          if (docRef.current) setFiles(docToFiles(docRef.current));
        }, 300);
      }
      scheduleSave();
    });
    docRef.current = doc;
    awarenessRef.current = awareness;
    idRef.current = project.id;
    titleRef.current = project.title;
    setTitle(project.title);
    setKind(project.kind);
    setFiles(docToFiles(doc));
    setStep("room");
    setStatus("Saved to your account.");
  }

  async function back() { await flush(); setStep("picker"); setStatus("Choose a project, or start a new one."); }

  if (step === "coedit" && coeditRoom) {
    return <CoEditGuest token={token} name={who} room={coeditRoom}
                        onLeave={() => { setCoeditRoom(null); setStep("picker"); }}
                        onCopied={(id) => { setCoeditRoom(null); void open(id); }}>
      {children}
    </CoEditGuest>;
  }
  if (step === "picker") {
    return <ProjectPicker token={token} className={`${who} · my projects`} status={status}
                          live={false} onOpen={open} onSignOut={onExit}
                          onJoinCoedit={(room) => { setCoeditRoom(room); setStep("coedit"); }}
                          exitLabel={exitLabel} />;
  }
  if (!docRef.current || !awarenessRef.current) return null;

  return <main className="student-shell">
    <header className="room-header">
      <div>
        <button className="text-button projects-button" onClick={back}>◀ Projects</button>
        <span className="slash">/</span><strong>{title}</strong>
      </div>
      <div className="connection">
        <span className="save-label">{status}</span>
        <button className="text-button" onClick={() => { void flush().then(onExit); }}>{exitLabel}</button>
      </div>
    </header>
    <section className="student-project">
      <CoEditBox key={idRef.current} token={token} projectId={idRef.current}
                 doc={docRef.current} awareness={awarenessRef.current} name={who} />
      {children({ doc: docRef.current, awareness: awarenessRef.current, files, kind, saved, save: () => { void flush(); } })}
    </section>
  </main>;
}
