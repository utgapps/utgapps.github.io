import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { seedDoc, docToFiles, userColor } from "./lib/collab";
import { apiGetProjectById, apiSaveProjectById, apiSaveProjectBeacon } from "./lib/api";
import { ProjectPicker } from "./ProjectPicker";
import type { ProjectKind } from "./lib/types";

/* The teacher's own projects.

   Same picker and same editor a student gets, minus the live-collaboration
   half: there is no peer to sync with, so this owns a plain local Y.Doc. The
   doc is still a Y.Doc rather than plain strings because CollabEditor binds to
   one - keeping that interface identical is what makes this ~100 lines instead
   of a second editor. */

export function SoloWorkspace({ token, who, onExit, children }: {
  token: string;
  who: string;
  onExit: () => void;
  children: (props: { doc: Y.Doc; awareness: Awareness; files: Record<string, string>; kind: ProjectKind }) => React.ReactNode;
}) {
  const [step, setStep] = useState<"picker" | "room">("picker");
  const [files, setFiles] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<ProjectKind>("web");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Choose a project, or start a new one.");
  const docRef = useRef<Y.Doc | null>(null);
  const awarenessRef = useRef<Awareness | null>(null);
  const idRef = useRef("");
  const deriveTimer = useRef<number | null>(null);
  const saveTimer = useRef<number | null>(null);

  async function saveNow() {
    const doc = docRef.current;
    if (!doc || !idRef.current) return;
    try {
      await apiSaveProjectById(token, idRef.current, { title, files: docToFiles(doc) });
      setStatus("Saved.");
    } catch { /* keep working; the next change retries */ }
  }
  function scheduleSave() {
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
    setTitle(project.title);
    setKind(project.kind);
    setFiles(docToFiles(doc));
    setStep("room");
    setStatus("Saved to your account.");
  }

  async function back() { await flush(); setStep("picker"); setStatus("Choose a project, or start a new one."); }

  if (step === "picker") {
    return <ProjectPicker token={token} className={`${who} · my projects`} status={status}
                          live={false} onOpen={open} onSignOut={onExit} />;
  }
  if (!docRef.current || !awarenessRef.current) return null;

  return <main className="student-shell">
    <header className="room-header">
      <div><strong>{title}</strong></div>
      <div className="connection">
        <span className="save-label">{status}</span>
        <button className="text-button" onClick={back}>My projects</button>
        <button className="text-button" onClick={() => { void flush().then(onExit); }}>Back to the class</button>
      </div>
    </header>
    <section className="student-project">
      {children({ doc: docRef.current, awareness: awarenessRef.current, files, kind })}
    </section>
  </main>;
}
