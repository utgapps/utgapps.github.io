import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import * as Y from "yjs";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from "y-protocols/awareness";
import { downloadFile, hostId, makeClass, makeStudent, normalizeCode } from "./lib/classroom";
import { seedDoc, docToFiles, fileNames, filesMap, b64encode, b64decode, userColor } from "./lib/collab";
import { FileTree } from "./FileTree";
import { CollabEditor } from "./CollabEditor";
import { AdminApp } from "./AdminApp";
import { apiLoginGuest, apiLoginInstructor, apiGetClassroom, apiSaveClassroom, apiOpenLiveRoom, apiGetLiveRoom, apiCloseLiveRoom, apiListMedia, apiUploadMedia, apiDeleteMedia, apiMyClassrooms, apiForgetClassroom, apiListProjects, apiCreateProject, apiGetProjectById, apiSaveProjectById, apiDeleteProject, apiSaveProjectBeacon, type ApiAccount, type ApiMedia, type ApiClassroomLink } from "./lib/api";
import { compressImage, compressAudio } from "./lib/media";
import { classroomForId, peerOptions } from "./lib/rootCodes";
import { getClassByCode, getClasses, persistentStorage, saveClass } from "./lib/storage";
import { buildPreview, isPreviewMessage, ENTRY_FILE, type PreviewMessage } from "./lib/preview";
import { ProjectPicker } from "./ProjectPicker";
import type { ClassRecord, PendingJoin, ProjectKind, Student } from "./lib/types";

type Mode = "home" | "instructor" | "student";
type WireMessage =
  | { type: "join"; name: string; deviceId: string; deviceLabel: string; fingerprint: string }
  | { type: "approved"; studentId: string; projectId: string; title: string; className: string }
  | { type: "wait"; message: string }
  // Sent by the student immediately BEFORE the full state, on approval and on
  // every project switch. Without it the teacher applies a second project's
  // state onto the first project's Y.Doc and both files interleave.
  | { type: "project"; projectId: string; title: string; kind: ProjectKind; epoch: string }
  | { type: "ydoc"; projectId: string; u: string }        // base64 Yjs document update
  | { type: "awareness"; projectId: string; u: string }   // base64 awareness (cursors/presence) update
  | { type: "close"; message: string };

const deviceKey = "utg-classroom-device-v1";
const accountKey = "utg_account";

type StoredAccount = { token: string; account: ApiAccount };

function savedAccount(): StoredAccount | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(accountKey) || "null") as StoredAccount | null;
    return parsed && parsed.token && parsed.account ? parsed : null;
  } catch { return null; }
}
function saveAccount(value: StoredAccount) { localStorage.setItem(accountKey, JSON.stringify(value)); }

function localDevice() {
  const saved = localStorage.getItem(deviceKey);
  if (saved) return JSON.parse(saved) as { id: string; fingerprint: string };
  const device = { id: crypto.randomUUID(), fingerprint: crypto.randomUUID().replaceAll("-", "").slice(0, 16) };
  localStorage.setItem(deviceKey, JSON.stringify(device));
  return device;
}

function sameFiles(a: Record<string, string>, b: Record<string, string>) {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((key) => a[key] === b[key]);
}

function App() {
  const rootParams = new URLSearchParams(window.location.search);
  const rootClassId = rootParams.get("classId") || "";
  const rootRole = rootParams.get("role");
  const rootGrant = rootParams.get("grant") || "";
  // The root gate sets this same-tab value after the API verifies the code.
  // It keeps a four-character code out of the classroom URL and avoids a
  // stale persisted code selecting the wrong classroom.
  const rootCode = sessionStorage.getItem("utg_class_code") || localStorage.getItem("utg_class_code") || "";
  const rootClass = classroomForId(rootClassId);
  const rootStudentCode = rootClass && rootRole === "student" ? rootCode : "";
  const rootInstructorCode = rootClass && rootRole === "instructor" ? rootCode : "";
  const rootStudentGrant = rootClass && rootRole === "student" ? rootGrant : "";
  const rootInstructorGrant = rootClass && rootRole === "instructor" ? rootGrant : "";
  const [mode, setMode] = useState<Mode>(() => {
    if (rootStudentCode || rootStudentGrant) return "student";
    return savedAccount()?.account.role === "student" ? "student" : "home";
  });
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [activeClass, setActiveClass] = useState<ClassRecord | null>(null);
  const [message, setMessage] = useState("");
  const classSaveTimers = useRef(new Map<string, number>());

  useEffect(() => { getClasses().then(setClasses).catch(() => setMessage("Your browser could not open local class storage.")); }, []);
  useEffect(() => { persistentStorage(); }, []);

  function persistClass(record: ClassRecord) {
    saveClass(record).then(() => getClasses()).then(setClasses)
      .catch(() => setMessage("Your latest classroom changes could not be saved in this browser."));
    const account = savedAccount();
    const classId = record.classId || record.courseId.toLowerCase();
    if (!account || !(account.account.role === "admin" || (account.account.role === "instructor" && account.account.classId === classId))) return;
    const prior = classSaveTimers.current.get(classId);
    if (prior) window.clearTimeout(prior);
    classSaveTimers.current.set(classId, window.setTimeout(() => {
      classSaveTimers.current.delete(classId);
      apiSaveClassroom(account.token, classId, record).catch(() => setMessage("Your classroom changes could not be saved to the shared classroom."));
    }, 700));
  }

  async function useClass(record: ClassRecord, account: StoredAccount) {
    const classId = record.classId || record.courseId.toLowerCase();
    const course = classroomForId(classId);
    if (!course || !(account.account.role === "admin" || (account.account.role === "instructor" && account.account.classId === classId))) {
      setMessage("This account cannot open that classroom.");
      setMode("home");
      return;
    }
    const shared = await apiGetClassroom(account.token, classId);
    const opened = shared && shared.record && typeof shared.record === "object" ? shared.record as ClassRecord : { ...record, classId };
    await saveClass(opened);
    setActiveClass(opened);
    setClasses(await getClasses());
    setMode("instructor");
  }

  if (window.location.pathname.replace(/\/+$/, "").endsWith("/admin")) return <AdminApp />;
  // The classroom has no standalone landing page. Arriving without a role, an
  // instructor entry, or an account sends you back to the modules hub.
  if (!rootRole && !new URLSearchParams(window.location.search).has("instructor") && !savedAccount()) {
    window.location.replace("../");
    return null;
  }
  if (mode === "instructor" && activeClass) {
    const account = savedAccount();
    if (!account) return <Home classes={classes} message="Sign in with an instructor code first." onOpen={useClass} onImport={useClass} initialInstructorCode={rootInstructorCode} initialInstructorGrant={rootInstructorGrant} />;
    return <InstructorRoom record={activeClass} token={account.token} onChange={persistClass} onExit={() => setMode("home")} />;
  }
  if (mode === "student") return <StudentJoin initialCode={rootStudentCode} initialGrant={rootStudentGrant} onExit={() => window.location.replace("../")} />;

  return <Home
    classes={classes}
    message={message}
    onOpen={useClass}
    onImport={useClass}
    initialInstructorCode={rootInstructorCode}
    initialInstructorGrant={rootInstructorGrant}
  />;
}

// A saved list of the classrooms this account has connected to, so teachers and
// students re-enter without retyping a code. Each row can be forgotten (removes
// the account's record; it never changes the class code itself).
function SavedClassrooms({ token, role, actionLabel, onPick }: {
  token: string; role: "student" | "instructor"; actionLabel: string; onPick: (link: ApiClassroomLink) => void;
}) {
  const [links, setLinks] = useState<ApiClassroomLink[] | null>(null);
  useEffect(() => {
    let live = true;
    apiMyClassrooms(token).then((all) => { if (live) setLinks(all.filter((l) => l.role === role)); }).catch(() => { if (live) setLinks([]); });
    return () => { live = false; };
  }, [token, role]);
  async function forget(link: ApiClassroomLink) {
    setLinks((cur) => (cur || []).filter((l) => !(l.classId === link.classId && l.role === link.role)));
    try { await apiForgetClassroom(token, link.classId, link.role); } catch { /* removed locally; reappears on reload if the server call failed */ }
  }
  if (!links || !links.length) return null;
  return <div className="saved-classrooms">
    <h3>Your classrooms</h3>
    <ul className="saved-list">
      {links.map((l) => <li key={l.classId + l.role} className="saved-item">
        <button className="saved-open" onClick={() => onPick(l)}><span className="saved-name">{l.label}</span><span className="saved-go">{actionLabel} →</span></button>
        <button className="saved-forget" title="Forget this classroom" aria-label={`Forget ${l.label}`} onClick={() => forget(l)}>×</button>
      </li>)}
    </ul>
    <p className="small">Removing a classroom only clears it from your account — it does not change the class code.</p>
  </div>;
}

function Home({ classes, message, onOpen, onImport, initialInstructorCode, initialInstructorGrant }: {
  classes: ClassRecord[]; message: string;
  onOpen: (record: ClassRecord, account: StoredAccount) => void; onImport: (record: ClassRecord, account: StoredAccount) => void;
  initialInstructorCode: string; initialInstructorGrant: string;
}) {
  const [code, setCode] = useState(initialInstructorCode);
  const [notice, setNotice] = useState(message);
  const account = savedAccount();

  function openSaved(link: ApiClassroomLink) {
    const course = classroomForId(link.classId);
    if (!account || !course) { setNotice("This classroom is no longer configured."); return; }
    const local = classes.find((item) => (item.classId || item.courseId.toLowerCase()) === course.id);
    onOpen(local || makeClass(course.className, course.courseId, course.id), account);
  }

  async function openInstructor() {
    try {
      const session = await apiLoginInstructor(code, initialInstructorGrant);
      saveAccount(session);
      const course = classroomForId(session.account.classId);
      if (!course) throw new Error("This instructor code is not linked to a configured curriculum classroom.");
      const local = classes.find((item) => (item.classId || item.courseId.toLowerCase()) === course.id);
      await onOpen(local || makeClass(course.className, course.courseId, course.id), session);
    } catch (error) { setNotice((error as Error).message || "Could not open the classroom."); }
  }
  function importPack(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as ClassRecord;
        const account = savedAccount();
        const classId = parsed.classId || parsed.courseId.toLowerCase();
        if (!account || parsed.schemaVersion !== 1 || !parsed.projects || !classroomForId(classId)) throw new Error();
        onImport({ ...parsed, id: crypto.randomUUID(), classId }, account);
      } catch { setNotice("That file is not a compatible UTG .classpack. Your current classes were not changed."); }
    };
    reader.readAsText(file);
  }

  return <main className="welcome">
    <header className="brand"><a href="../"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span>Classroom</span></header>
    <section className="teacher-entry">
      <p className="eyebrow">Instructor workspace</p>
      <h2>Open a curriculum classroom</h2>
      {account && <SavedClassrooms token={account.token} role="instructor" actionLabel="Open" onPick={openSaved} />}
      <div className="teacher-options">
        <div><h3>Curriculum classroom</h3>{initialInstructorGrant ? <p className="small">Instructor access was verified at the class gate.</p> : <label>Instructor code<input value={code} maxLength={32} placeholder="Your four-character instructor code" onChange={(e) => setCode(e.target.value.toUpperCase())} /></label>}<button className="primary" onClick={openInstructor}>Open classroom</button><p className="small">Instructor codes are created by a Classroom admin and are not the live room address.</p></div>
        <div><h3>Classroom backup</h3><p className="small">Import a .classpack only when recovering an existing class. Opening it saves the recovered record to the shared classroom.</p><label className="file-button">Choose .classpack<input type="file" accept=".classpack,.json" onChange={importPack} /></label><p className="small">Local backups: {classes.length ? classes.map((item) => item.courseId).join(", ") : "none yet"}</p></div>
      </div>
      {notice && <p className="notice warning">{notice}</p>}
    </section>
  </main>;
}

function InstructorRoom({ record, token, onChange, onExit }: { record: ClassRecord; token: string; onChange: (record: ClassRecord) => void; onExit: () => void }) {
  const [room, setRoom] = useState(record);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState<PendingJoin[]>([]);
  const [selectedId, setSelectedId] = useState(record.students[0]?.id || "");
  const [status, setStatus] = useState("Class is closed. Projects are still saved locally.");
  const [newStudent, setNewStudent] = useState("");
  const peerRef = useRef<Peer | null>(null);
  const connections = useRef(new Map<string, DataConnection>());
  const roomRef = useRef(room);
  // projectId -> live shared doc. `epoch` identifies WHICH of the student's
  // projects the doc currently holds; see the "project" message in receive().
  const docs = useRef(new Map<string, { doc: Y.Doc; awareness: Awareness; epoch: string }>());
  const connMeta = useRef(new Map<string, string>()); // connection.peer -> projectId (routing + authorization)
  const deriveTimers = useRef(new Map<string, number>());
  const [docsTick, setDocsTick] = useState(0); // bump to re-render when a doc is (de)registered

  useEffect(() => { setRoom(record); }, [record]);
  useEffect(() => { onChange(room); roomRef.current = room; }, [room]);
  useEffect(() => () => { peerRef.current?.destroy(); docs.current.forEach((e) => { e.awareness.destroy(); e.doc.destroy(); }); }, []);

  const selected = room.students.find((student) => student.id === selectedId);
  const selectedProject = selected ? room.projects[selected.projectId] : undefined;
  // The student owns their doc; the teacher's live doc for a student exists only
  // while that student is connected (created on approve, filled by their state).
  const selectedEntry = selectedProject ? docs.current.get(selectedProject.id) : undefined;
  void docsTick;
  const onlineCount = room.students.filter((student) => student.status === "connected" || student.status === "syncing").length;
  const classId = room.classId || room.courseId.toLowerCase();
  const courseInfo = classroomForId(classId);

  function updateRoom(change: (current: ClassRecord) => ClassRecord) { setRoom((current) => change(current)); }
  function addStudent() {
    if (!newStudent.trim()) return;
    const made = makeStudent(newStudent.trim());
    updateRoom((current) => ({ ...current, students: [...current.students, made.student], projects: { ...current.projects, [made.project.id]: made.project } }));
    setSelectedId(made.student.id); setNewStudent("");
  }
  async function openRoom() {
    if (peerRef.current) return;
    try {
      setStatus("Opening your classroom connection...");
      const liveRoom = await apiOpenLiveRoom(token, classId);
      const peer = new Peer(liveRoom.peerId, await peerOptions(token));
      peerRef.current = peer;
      peer.on("open", () => { setIsOpen(true); setStatus("Class is open. Students may now use their private student code."); });
      peer.on("error", () => { setStatus("The live classroom could not start. Try opening it again."); peer.destroy(); peerRef.current = null; });
      peer.on("connection", (connection) => {
        connections.current.set(connection.peer, connection);
        connection.on("data", (data) => receive(connection, data as WireMessage));
        connection.on("close", () => markDisconnected(connection.peer));
      });
    } catch (error) { setStatus((error as Error).message || "The live classroom could not start."); }
  }
  function markDisconnected(peerId: string) {
    connections.current.delete(peerId);
    connMeta.current.delete(peerId);
    updateRoom((current) => ({ ...current, students: current.students.map((student) => student.deviceIds.includes(peerId) ? { ...student, status: "offline" } : student) }));
  }
  // A live shared doc per project, seeded ONCE from the stored files. Students
  // receive it as an encoded state (they never re-seed), so text can't duplicate.
  function getDoc(projectId: string, epoch = "") {
    let entry = docs.current.get(projectId);
    if (!entry) {
      const doc = new Y.Doc(); // empty — the student (owner) sends the initial state
      const awareness = new Awareness(doc);
      awareness.setLocalStateField("user", { name: "Teacher", color: "#12202b" });
      doc.on("update", (u: Uint8Array, origin: unknown) => {
        if (origin !== "remote") sendToOwner(projectId, { type: "ydoc", projectId, u: b64encode(u) });
        scheduleDerive(projectId);
      });
      awareness.on("update", ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
        sendToOwner(projectId, { type: "awareness", projectId, u: b64encode(encodeAwarenessUpdate(awareness, added.concat(updated, removed))) });
      });
      entry = { doc, awareness, epoch };
      docs.current.set(projectId, entry);
      setDocsTick((n) => n + 1);
    }
    return entry;
  }
  /* Yjs merges, it does not replace. Applying a second project's state onto the
     doc that already holds the first gives you both projects' text interleaved
     inside every file. So when the student says they have switched, throw the
     doc away and build an empty one for their next full state to land in. */
  function resetDoc(projectId: string, epoch: string) {
    const prior = docs.current.get(projectId);
    if (prior && prior.epoch === epoch) return prior;
    if (prior) { prior.awareness.destroy(); prior.doc.destroy(); docs.current.delete(projectId); }
    return getDoc(projectId, epoch);
  }
  function sendToOwner(projectId: string, msg: WireMessage) {
    const owner = roomRef.current.students.find((s) => s.projectId === projectId);
    if (!owner) return;
    for (const id of owner.deviceIds) { const conn = connections.current.get(id); if (conn && conn.open) conn.send(msg); }
  }
  function scheduleDerive(projectId: string) {
    if (deriveTimers.current.has(projectId)) return;
    deriveTimers.current.set(projectId, window.setTimeout(() => {
      deriveTimers.current.delete(projectId);
      const entry = docs.current.get(projectId);
      if (!entry) return;
      const files = docToFiles(entry.doc);
      updateRoom((current) => current.projects[projectId]
        ? { ...current, projects: { ...current.projects, [projectId]: { ...current.projects[projectId], files, updatedAt: new Date().toISOString() } } }
        : current);
    }, 500));
  }
  function receive(connection: DataConnection, data: WireMessage) {
    if (data.type === "join") {
      const currentRoom = roomRef.current;
      const recognized = currentRoom.devices.find((device) => device.id === data.deviceId && !device.revoked);
      if (recognized) approve({ connectionId: connection.peer, studentName: data.name, deviceId: data.deviceId, deviceLabel: data.deviceLabel, fingerprint: data.fingerprint }, recognized.studentId, connection);
      else if (currentRoom.admissionsOpen) { setPending((items) => [...items.filter((item) => item.connectionId !== connection.peer), { connectionId: connection.peer, studentName: data.name, deviceId: data.deviceId, deviceLabel: data.deviceLabel, fingerprint: data.fingerprint }]); connection.send({ type: "wait", message: "Your teacher needs to approve this device." } satisfies WireMessage); }
      else connection.send({ type: "wait", message: "Admissions are closed. Ask your teacher to open admissions." } satisfies WireMessage);
    }
    if (data.type === "project") {
      const pid = connMeta.current.get(connection.peer);
      if (!pid || pid !== data.projectId) return; // same authorization rule as ydoc
      resetDoc(pid, data.epoch);
      setDocsTick((n) => n + 1);
      // Adopt the student's real title and kind; the teacher's slot was a placeholder.
      updateRoom((current) => current.projects[pid]
        ? { ...current, projects: { ...current.projects, [pid]: { ...current.projects[pid], title: data.title, kind: data.kind, files: {}, updatedAt: new Date().toISOString() } } }
        : current);
    }
    if (data.type === "ydoc" || data.type === "awareness") {
      const pid = connMeta.current.get(connection.peer);
      if (!pid || pid !== data.projectId) return; // a student may only edit their own project
      const entry = docs.current.get(pid);
      if (!entry) return;
      if (data.type === "ydoc") { Y.applyUpdate(entry.doc, b64decode(data.u), "remote"); scheduleDerive(pid); }
      else applyAwarenessUpdate(entry.awareness, b64decode(data.u), "remote");
      updateRoom((current) => ({ ...current, students: current.students.map((s) => s.projectId === pid ? { ...s, status: "connected", lastSeen: new Date().toISOString() } : s) }));
    }
  }
  function approve(join: PendingJoin, existingStudentId?: string, connection?: DataConnection) {
    let target = connection || connections.current.get(join.connectionId);
    let nextRoom = roomRef.current;
    let student = existingStudentId ? nextRoom.students.find((item) => item.id === existingStudentId) : nextRoom.students.find((item) => item.name.toLowerCase() === join.studentName.toLowerCase());
    if (!student) {
      const made = makeStudent(join.studentName);
      student = made.student;
      nextRoom = { ...nextRoom, students: [...nextRoom.students, student], projects: { ...nextRoom.projects, [made.project.id]: made.project } };
    }
    const device = { id: join.deviceId, studentId: student.id, label: join.deviceLabel, fingerprint: join.fingerprint, approvedAt: new Date().toISOString() };
    const hasDevice = nextRoom.devices.some((item) => item.id === device.id);
    nextRoom = { ...nextRoom, devices: hasDevice ? nextRoom.devices : [...nextRoom.devices, device], students: nextRoom.students.map((item) => item.id === student!.id ? { ...item, status: "connected", deviceIds: Array.from(new Set([...item.deviceIds, join.connectionId])) } : item) };
    setRoom(nextRoom); roomRef.current = nextRoom; setSelectedId(student.id); setPending((items) => items.filter((item) => item.connectionId !== join.connectionId));
    const initial = nextRoom.projects[student.projectId];
    getDoc(student.projectId); // empty doc; the student sends their state next
    connMeta.current.set(join.connectionId, student.projectId);
    target?.send({ type: "approved", studentId: student.id, projectId: student.projectId, title: initial.title, className: nextRoom.name } satisfies WireMessage);
  }
  function checkpoint() {
    if (!selectedProject) return;
    const label = window.prompt("Checkpoint name", "Before next activity");
    if (!label) return;
    updateRoom((current) => ({ ...current, checkpoints: [...current.checkpoints, { id: crypto.randomUUID(), projectId: selectedProject.id, label, createdAt: new Date().toISOString(), files: selectedProject.files }] }));
    setStatus(`Checkpoint "${label}" saved for ${selected?.name}.`);
  }
  function exportClass() {
    downloadFile(`${room.code.toLowerCase()}-${room.courseId.toLowerCase()}.classpack`, JSON.stringify(room, null, 2));
    setStatus("Classpack exported. It includes student projects and private class records; transfer it securely.");
  }
  async function closeRoom() {
    connections.current.forEach((connection) => connection.send({ type: "close", message: "Class has ended. Your project is saved on this device." } satisfies WireMessage));
    peerRef.current?.destroy(); peerRef.current = null; connections.current.clear(); setIsOpen(false); setStatus("Class closed. Export a classpack before handing the class to another instructor.");
    updateRoom((current) => ({ ...current, students: current.students.map((student) => ({ ...student, status: "offline" })) }));
    try { await apiCloseLiveRoom(token, classId); } catch { /* the live room expires automatically */ }
  }

  return <main className="room-shell">
    <header className="room-header"><div><a href="../"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span className="slash">/</span><strong>{room.courseId}</strong></div><div className="connection"><i className={isOpen ? "online" : "offline"}></i>{isOpen ? "Live class" : "Class closed"}<button className="text-button" onClick={onExit}>Exit</button></div></header>
    <section className="class-banner"><div><p className="eyebrow">Instructor classroom</p><h1>{room.name}</h1><p><strong className="code-pill">Instructor access verified</strong> <span className="muted">{isOpen ? "Students can join now with their student login code. Keep this page open while they join." : "Open class when you are ready."}</span></p></div><div className="banner-actions"><button className="secondary" onClick={() => updateRoom((current) => ({ ...current, admissionsOpen: !current.admissionsOpen }))}>{room.admissionsOpen ? "Close admissions" : "Open admissions"}</button>{isOpen ? <button className="danger" onClick={closeRoom}>End class</button> : <button className="primary" onClick={openRoom}>Open class</button>}</div></section>
    {pending.length > 0 && <section className="pending-strip"><strong>Waiting for approval</strong>{pending.map((join) => <div key={join.connectionId}><span>{join.studentName}<small>{join.deviceLabel}</small></span><button className="primary compact" onClick={() => approve(join)}>Approve and remember</button><button className="text-button" onClick={() => setPending((items) => items.filter((item) => item.connectionId !== join.connectionId))}>Reject</button></div>)}</section>}
    <div className="class-layout"><aside className="roster"><div className="panel-title"><h2>Students <span>{onlineCount}/{room.students.length}</span></h2></div><div className="add-student"><input value={newStudent} placeholder="Add student" onChange={(event) => setNewStudent(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addStudent()} /><button onClick={addStudent} aria-label="Add student">+</button></div><div className="student-list">{room.students.length ? room.students.map((student) => <button className={student.id === selectedId ? "student active" : "student"} key={student.id} onClick={() => setSelectedId(student.id)}><i className={student.status}></i><span>{student.name}<small>{student.status === "offline" ? "saved locally" : student.status}</small></span></button>) : <p className="empty">Students appear here after you add them or approve a join.</p>}</div><div className="roster-footer"><button className="secondary full" onClick={exportClass}>Export classpack</button><button className="text-button full" onClick={() => downloadFile(`${room.code}-roster.csv`, "Student,Status\n" + room.students.map((student) => `${student.name},${student.status}`).join("\n"), "text/csv")}>Download roster</button></div></aside>
      <section className="workspace">{selected && selectedProject ? <><div className="workspace-top"><div><p className="eyebrow">Individual project</p><h2>{selected.name}</h2></div><div><button className="secondary" onClick={checkpoint}>Save checkpoint</button><button className="secondary" onClick={() => downloadFile(`${selected.name.replaceAll(" ", "-").toLowerCase()}-backup.json`, JSON.stringify(selectedProject, null, 2))}>Personal backup</button></div></div>{selectedEntry && fileNames(selectedEntry.doc).length > 0 ? <CollabWorkspace key={selectedEntry.epoch} doc={selectedEntry.doc} awareness={selectedEntry.awareness} files={selectedProject.files} kind={selectedProject.kind ?? "web"} /> : <div className="offline-view"><p className="empty">{selectedEntry ? "Connected — loading this student's code…" : "This student is offline. Their last saved work is shown here; live co-editing resumes when they open their project."}</p><StaticPreview files={selectedProject.files} kind={selectedProject.kind ?? "web"} /></div>}<div className="workspace-status"><span><i className={isOpen ? "online" : "offline"}></i>{isOpen ? "Changes are syncing to this device." : "Saved in the instructor's browser."}</span><span>{room.checkpoints.filter((item) => item.projectId === selectedProject.id).length} checkpoints</span></div></> : <div className="empty-workspace"><h2>Choose a student</h2><p>Start by adding a student, or open the class and approve a student device.</p></div>}</section>
      <aside className="details"><h2>Class controls</h2><dl><dt>Course</dt><dd>{room.courseId}</dd><dt>Instructor login</dt><dd>Four-character instructor code</dd><dt>Student login</dt><dd>Four-character student code</dd><dt>Room address</dt><dd className="small-code">Fresh and private for each live class</dd><dt>Class record</dt><dd>Saved to the shared classroom</dd></dl><label>Private instructor notes<textarea value={room.notes} placeholder="Notes never appear in a student project." onChange={(event) => updateRoom((current) => ({ ...current, notes: event.target.value }))} /></label><div className="safety"><strong>Recovery ready</strong><p>Every student can export a personal backup. The shared class record is also available to authorized instructor devices.</p></div></aside>
    </div>
    <footer className="room-footer">{status}</footer>
  </main>;
}

/* The teacher's view of an offline student's last save. This used to mount the
   iframe the instant a student was selected, so clicking down a roster of
   fifteen ran fifteen students' API-calling code from the teacher's browser. */
function StaticPreview({ files, kind }: { files: Record<string, string>; kind: ProjectKind }) {
  const [nonce, setNonce] = useState("");
  if (kind === "java") return <div className="not-runnable"><p className="muted">Java projects do not run in the browser yet.</p></div>;
  return nonce
    ? <iframe title="Last saved preview" sandbox="allow-scripts" srcDoc={buildPreview(files, nonce)} />
    : <button className="secondary" onClick={() => setNonce(crypto.randomUUID())}>▶ Run this student's last save</button>;
}

function StudentJoin({ onExit, initialCode, initialGrant }: { onExit: () => void; initialCode: string; initialGrant: string }) {
  const [step, setStep] = useState<"join" | "waiting" | "picker" | "room">("join");
  const [code, setCode] = useState(initialCode);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Enter the private student code from your teacher.");
  const [className, setClassName] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const connectionRef = useRef<DataConnection | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const liveClassIdRef = useRef("");
  const liveTokenRef = useRef("");
  const liveNameRef = useRef("");
  const reconnectTimer = useRef<number | null>(null);
  const device = useMemo(localDevice, []);
  useEffect(() => () => { if (reconnectTimer.current) window.clearTimeout(reconnectTimer.current); peerRef.current?.destroy(); }, []);

  // --- the student's own project doc (source of truth), backed by D1 ---
  const docRef = useRef<Y.Doc | null>(null);
  const awarenessRef = useRef<Awareness | null>(null);
  // The teacher's slot id, used for wire routing and authorization. Deliberately
  // NOT the same value as the D1 project id below - connMeta authorizes against
  // this one, and collapsing the two breaks that check in a hard-to-see way.
  const projectIdRef = useRef<string>("");
  const localProjectIdRef = useRef<string>("");   // the D1 project actually open
  const apiTokenRef = useRef<string | null>(null);
  const titleRef = useRef<string>("My project");
  const kindRef = useRef<ProjectKind>("web");
  const epochRef = useRef<string>("");
  const sessionRef = useRef<{ token: string; name: string; className: string; classId: string } | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [kind, setKind] = useState<ProjectKind>("web");
  const [title, setTitle] = useState("My project");
  const [live, setLive] = useState(false);
  const [accountToken, setAccountToken] = useState<string | null>(null);
  const deriveTimer = useRef<number | null>(null);
  const saveTimer = useRef<number | null>(null);
  function sendConn(msg: WireMessage) { const c = connectionRef.current; if (c && c.open) c.send(msg); }
  function scheduleDerive() {
    if (deriveTimer.current !== null) return;
    deriveTimer.current = window.setTimeout(() => { deriveTimer.current = null; if (docRef.current) setFiles(docToFiles(docRef.current)); }, 300);
  }
  async function saveNow() {
    const token = apiTokenRef.current, doc = docRef.current, id = localProjectIdRef.current;
    if (!token || !doc || !id) return;
    try { await apiSaveProjectById(token, id, { title: titleRef.current, files: docToFiles(doc) }); setStatus("Saved to your account."); }
    catch { /* keep working; retry on next change */ }
  }
  function scheduleSave() {
    if (!apiTokenRef.current || saveTimer.current !== null) return;
    saveTimer.current = window.setTimeout(() => { saveTimer.current = null; void saveNow(); }, 8000);
  }
  /* Anything that leaves the current project has to flush first. With one
     project per account the 8-second debounce only ever lost work if the tab
     closed; with a picker, "type then switch" is a normal move that would
     silently drop up to 8 seconds. */
  async function flushSave() {
    if (saveTimer.current !== null) { window.clearTimeout(saveTimer.current); saveTimer.current = null; await saveNow(); }
  }
  useEffect(() => () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); awarenessRef.current?.destroy(); docRef.current?.destroy(); }, []);
  useEffect(() => {
    function onHidden() {
      if (document.visibilityState !== "hidden") return;
      const token = apiTokenRef.current, doc = docRef.current, id = localProjectIdRef.current;
      // keepalive rather than sendBeacon: a beacon cannot set Authorization.
      if (token && doc && id && saveTimer.current !== null) {
        window.clearTimeout(saveTimer.current); saveTimer.current = null;
        apiSaveProjectBeacon(token, id, docToFiles(doc));
      }
    }
    document.addEventListener("visibilitychange", onHidden);
    return () => document.removeEventListener("visibilitychange", onHidden);
  }, []);

  async function join() {
    if ((!code.trim() && !initialGrant) || !name.trim()) { setStatus(initialGrant ? "Add your name first." : "Add your name and student class code first."); return; }
    setStep("waiting"); setStatus("Signing in…");
    try {
      const session = await apiLoginGuest(code, name.trim(), initialGrant);
      saveAccount(session);
      const course = classroomForId(session.account.classId);
      if (!course) throw new Error("This student code is not linked to a configured curriculum classroom.");
      await openSession(session.token, session.account.name, course.className, session.account.classId);
    } catch (e) { setStep("join"); setStatus((e as Error).message || "Could not sign in. Try again."); }
  }

  // Sign-in lands on the project picker, not straight in the editor. Connecting
  // to the teacher happens here so the student shows as present while choosing.
  async function openSession(token: string, displayName: string, cls: string, classId: string) {
    sessionRef.current = { token, name: displayName || "Student", className: cls, classId };
    setAccountToken(token); setClassName(cls);
    setStep("picker"); setStatus("Choose a project, or start a new one.");
    if (classId) connectToTeacher(classId, token, displayName);
  }

  async function openProject(id: string) {
    const session = sessionRef.current;
    if (!session) return;
    await flushSave();
    setStep("waiting"); setStatus("Opening your project…");
    let project;
    try { project = await apiGetProjectById(session.token, id); }
    catch { setStep("picker"); setStatus("That project could not be opened. Try again."); return; }
    if (!project) { setStep("picker"); setStatus("That project is not there any more."); return; }

    // Explicit teardown: the unmount cleanup only fires when the whole component
    // goes away, so without this every switch leaks a Y.Doc and its listeners.
    awarenessRef.current?.destroy(); docRef.current?.destroy();

    const doc = new Y.Doc();
    seedDoc(doc, project.files);
    const awareness = new Awareness(doc);
    awareness.setLocalStateField("user", { name: session.name, color: userColor(device.id) });
    doc.on("update", (u: Uint8Array, origin: unknown) => {
      if (origin !== "remote") sendConn({ type: "ydoc", projectId: projectIdRef.current, u: b64encode(u) });
      scheduleDerive(); scheduleSave();
    });
    awareness.on("update", ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
      sendConn({ type: "awareness", projectId: projectIdRef.current, u: b64encode(encodeAwarenessUpdate(awareness, added.concat(updated, removed))) });
    });
    docRef.current = doc; awarenessRef.current = awareness;
    localProjectIdRef.current = project.id;
    titleRef.current = project.title;
    kindRef.current = project.kind;
    epochRef.current = crypto.randomUUID();
    // Only armed after a successful load, so a failed read can never lead to a
    // save that overwrites good work with an empty document.
    apiTokenRef.current = session.token;
    setFiles(docToFiles(doc)); setTitle(project.title); setKind(project.kind);
    setStep("room"); setStatus("Your work is saved to your account.");
    announceProject();
  }

  // Tell the teacher which project this is BEFORE sending its state, so they
  // drop the previous doc rather than merging two projects into one.
  function announceProject() {
    const doc = docRef.current;
    if (!doc || !projectIdRef.current) return;
    sendConn({ type: "project", projectId: projectIdRef.current, title: titleRef.current, kind: kindRef.current, epoch: epochRef.current });
    sendConn({ type: "ydoc", projectId: projectIdRef.current, u: b64encode(Y.encodeStateAsUpdate(doc)) });
  }

  async function backToPicker() {
    await flushSave();
    setStep("picker"); setStatus("Choose a project, or start a new one.");
  }

  // A signed-in student sees their saved classrooms (rendered below) and picks
  // one to open, instead of retyping a code. We intentionally do not auto-jump
  // into a class, so they can also see and forget saved classrooms here.
  useEffect(() => {
    const raw = localStorage.getItem("utg_account");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { token?: string; account?: { name?: string; role?: string } };
      if (!parsed.token || parsed.account?.role !== "student") return;
      setSavedToken(parsed.token);
      setName(parsed.account.name || "");
    } catch { /* ignore */ }
  }, []);

  function enterSaved(link: ApiClassroomLink) {
    const course = classroomForId(link.classId);
    if (!savedToken || !course) { setStatus("Sign in again to open this classroom."); return; }
    openSession(savedToken, name || "Student", course.className, link.classId);
  }

  // Connect to the teacher's live session — and keep quietly retrying if they
  // haven't opened the class yet (or they close it). Failed attempts are just a
  // tiny signaling check ("peer-unavailable"); no relay bandwidth is used until
  // a real connection exists, so a slow retry loop is essentially free.
  async function connectToTeacher(classId: string, token: string, studentName: string) {
    liveClassIdRef.current = classId; liveTokenRef.current = token; liveNameRef.current = studentName;
    await attemptConnect();
  }
  async function attemptConnect() {
    let room;
    try { room = await apiGetLiveRoom(liveTokenRef.current, liveClassIdRef.current); }
    catch { scheduleReconnect(); return; }
    if (!room) { setLive(false); setStatus("Your classroom is not open yet. Your project is still saved."); scheduleReconnect(); return; }
    const peer = peerRef.current;
    if (!peer || peer.destroyed) {
      try {
        const created = new Peer(await peerOptions(liveTokenRef.current));
        peerRef.current = created;
        created.on("open", () => { void attemptConnect(); });
        created.on("error", () => { setLive(false); scheduleReconnect(); });
        created.on("disconnected", () => { try { created.reconnect(); } catch { /* reconnect on the next poll */ } });
      } catch { scheduleReconnect(); }
      return;
    }
    if (!peer.open) { scheduleReconnect(); return; }
    if (connectionRef.current && connectionRef.current.open) return; // already live
    const connection = peer.connect(room.peerId); connectionRef.current = connection;
    connection.on("open", () => {
      if (reconnectTimer.current !== null) { window.clearTimeout(reconnectTimer.current); reconnectTimer.current = null; }
      setLive(true); setStatus("Live with your teacher — they can see and help.");
      connection.send({ type: "join", name: liveNameRef.current, deviceId: device.id, deviceLabel: `${navigator.platform || "Desktop"} browser`, fingerprint: device.fingerprint } satisfies WireMessage);
    });
    connection.on("data", (data) => receive(data as WireMessage));
    connection.on("close", () => { setLive(false); setStatus("Teacher went offline — your work is saved. Will reconnect when they return."); scheduleReconnect(); });
    connection.on("error", () => { setLive(false); scheduleReconnect(); });
  }
  function scheduleReconnect() {
    if (reconnectTimer.current !== null) return;
    reconnectTimer.current = window.setTimeout(() => {
      reconnectTimer.current = null;
      if (!connectionRef.current || !connectionRef.current.open) void attemptConnect();
    }, 15000);
  }

  function receive(data: WireMessage) {
    if (data.type === "wait") setStatus(data.message);
    if (data.type === "approved") {
      // teacher is helping live: send them MY project so they join my doc
      projectIdRef.current = data.projectId;
      announceProject(); // no-op while the student is still on the picker
      setLive(true); setStatus("Live with your teacher — they can see and help.");
    }
    if (data.type === "ydoc") { if (docRef.current && data.projectId === projectIdRef.current) { Y.applyUpdate(docRef.current, b64decode(data.u), "remote"); scheduleDerive(); scheduleSave(); } }
    if (data.type === "awareness") { if (awarenessRef.current && data.projectId === projectIdRef.current) applyAwarenessUpdate(awarenessRef.current, b64decode(data.u), "remote"); }
    if (data.type === "close") setStatus(data.message);
  }

  if (step === "picker" && sessionRef.current) return <ProjectPicker token={sessionRef.current.token} className={className} status={status} live={live} onOpen={openProject} onSignOut={() => { localStorage.removeItem("utg_account"); window.location.href = "../"; }} />;
  if (step !== "room" || !docRef.current || !awarenessRef.current) return <main className="join-screen"><section className="join-card"><a className="back" onClick={onExit}><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><p className="eyebrow">Student classroom</p><h1>Open your project</h1>{savedToken && <SavedClassrooms token={savedToken} role="student" actionLabel="Open" onPick={enterSaved} />}<p>{initialGrant ? "Class access is verified. Enter your name to open your project." : savedToken ? "Or join a new class with a student code." : "Enter your student code and name. Sign in with the same name next time to return to your saved project."}</p><label>Your name<input value={name} placeholder="Your first name" onChange={(event) => setName(event.target.value)} /></label>{!initialGrant && <label>Student code<input className="code-input" value={code} maxLength={32} placeholder="Your four-character student code" onChange={(event) => setCode(event.target.value.toUpperCase())} /></label>}<button className="primary full" onClick={join}>Open my project</button><p className="notice">{status}</p><small>Use a permanent account when a project needs to follow you to another browser or computer.</small></section></main>;
  return <main className="student-shell"><header className="room-header"><div><a href="../"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span className="slash">/</span><strong>{className}</strong></div><div className="connection"><i className={live ? "online" : "offline"}></i>{live ? "Live with teacher" : "Saved to your account"}<button className="text-button" onClick={backToPicker}>My projects</button><button className="text-button" onClick={() => downloadFile("my-utg-project.json", JSON.stringify({ title, files }, null, 2))}>Export backup</button><button className="text-button" onClick={() => { localStorage.removeItem("utg_account"); window.location.href = "../"; }}>Sign out</button></div></header><section className="student-project"><div className="workspace-top"><div><p className="eyebrow">My individual project</p><h1>{title}</h1></div><span className="save-label">{status}</span></div><CollabWorkspace doc={docRef.current} awareness={awarenessRef.current} files={files} kind={kind} />{accountToken && <MediaPanel token={accountToken} />}</section></main>;
}

function MediaPanel({ token }: { token: string }) {
  const [items, setItems] = useState<ApiMedia[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => { apiListMedia(token).then(setItems).catch(() => {}); }, [token]);
  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    const isImg = file.type.startsWith("image/"), isAud = file.type.startsWith("audio/");
    if (!isImg && !isAud) { setNote("Only images or sound files can be uploaded."); return; }
    setBusy(true); setNote(isImg ? "Compressing image…" : "Re-encoding sound (this can take a moment)…");
    try {
      const c = isImg ? await compressImage(file) : await compressAudio(file);
      const m = await apiUploadMedia(token, isImg ? "image" : "audio", c.mime, c.name, c.blob);
      setItems((prev) => [m, ...prev]);
      setNote(`Uploaded ${m.name} (${Math.round(m.size / 1024)} KB).`);
    } catch (err) { setNote((err as Error).message || "Upload failed."); }
    setBusy(false);
  }
  async function del(id: string) { try { await apiDeleteMedia(token, id); setItems((p) => p.filter((m) => m.id !== id)); } catch { /* ignore */ } }
  function copyTag(m: ApiMedia) {
    const tag = m.kind === "image" ? `<img src="${m.url}" alt="${m.name}">` : `<audio controls src="${m.url}"></audio>`;
    if (navigator.clipboard) navigator.clipboard.writeText(tag);
    setNote("Copied the tag — paste it into your code (index.html).");
  }
  return <div className="media-panel">
    <div className="media-head">
      <strong>My media</strong>
      <label className="file-button">{busy ? "Working…" : "＋ Upload image or sound"}<input type="file" accept="image/*,audio/*" onChange={onFile} disabled={busy} /></label>
      <span className="muted">Images become WebP, sound becomes small MP3. Keep files small.</span>
    </div>
    {note && <p className="notice">{note}</p>}
    <div className="media-list">{items.length === 0 ? <span className="muted">No media yet — upload a picture or a sound.</span> : items.map((m) =>
      <div className="media-item" key={m.id}>
        {m.kind === "image" ? <img src={m.url} alt={m.name} /> : <audio controls src={m.url} />}
        <div className="media-meta"><span className="media-name" title={m.name}>{m.name}</span><span className="muted">{Math.round(m.size / 1024)} KB</span></div>
        <div className="media-actions"><button className="text-button" onClick={() => copyTag(m)}>Copy tag</button><button className="text-button danger" onClick={() => del(m.id)}>Delete</button></div>
      </div>)}</div>
  </div>;
}

function CollabWorkspace({ doc, awareness, files, kind = "web", readOnly }: { doc: Y.Doc; awareness: Awareness; files: Record<string, string>; kind?: ProjectKind; readOnly?: boolean }) {
  const names = Object.keys(files).length ? Object.keys(files) : fileNames(doc);
  const [file, setFile] = useState(names.includes(ENTRY_FILE) ? ENTRY_FILE : (names[0] || ENTRY_FILE));
  useEffect(() => { if (names.length && !names.includes(file)) setFile(names[0]); }, [names, file]);

  /* File operations edit the shared document directly, so they sync to the
     teacher and reach autosave through the same update handler as typing.
     Folders are implicit: creating "css/style.css" creates the folder. */
  function addFile(path: string) {
    const map = filesMap(doc);
    if (!map.has(path)) map.set(path, new Y.Text());
    setFile(path);
  }
  function renameFile(from: string, to: string) {
    const map = filesMap(doc);
    const existing = map.get(from);
    if (!existing || map.has(to)) return;
    const contents = existing.toString();
    doc.transact(() => {
      const moved = new Y.Text();
      map.set(to, moved);
      moved.insert(0, contents);
      map.delete(from);
    });
    if (file === from) setFile(to);
  }
  function removeFile(path: string) {
    const warning = path === ENTRY_FILE
      ? `${ENTRY_FILE} is the page the preview shows. Delete it and there is nothing to run. Are you sure?`
      : `Delete ${path}? This cannot be undone.`;
    if (!window.confirm(warning)) return;
    filesMap(doc).delete(path);
  }

  return <div className="editor-grid">
    <FileTree files={names} active={file} onOpen={setFile} onAdd={addFile}
              onRename={renameFile} onDelete={removeFile} readOnly={readOnly} />
    <section className="code-panel">
      <div className="code-head"><span className="code-path">{file}</span></div>
      <CollabEditor doc={doc} file={file} awareness={awareness} readOnly={readOnly} />
    </section>
    {kind === "java"
      ? <section className="preview-panel"><div className="preview-top"><strong>Java</strong></div><div className="not-runnable">
          <h3>This is a Java project</h3>
          <p>Your code saves as you type, syncs to your account, and your teacher can see it live — everything works except running it here.</p>
          <p className="muted">Running Java in the browser is not built yet. Use this for writing practice and for code you will run somewhere else.</p>
        </div></section>
      : <RunPanel files={files} />}
  </div>;
}

/* Execution is manual and runs a SNAPSHOT of the files, not the live `files`
   object. The old preview re-read `files` - refreshed on a 300ms debounce by
   scheduleDerive - so script.js re-executed on essentially every keystroke.
   For a course whose whole point is calling a rate-limited API, that spends a
   student's 40-requests-per-minute budget while they are still typing the call. */
function RunPanel({ files }: { files: Record<string, string> }) {
  const [runFiles, setRunFiles] = useState<Record<string, string> | null>(null);
  const [runId, setRunId] = useState(0);       // key bump: forces a real unmount
  const [nonce, setNonce] = useState("");      // identifies this run's messages
  const [log, setLog] = useState<PreviewMessage[]>([]);
  const [onlyErrors, setOnlyErrors] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const tailRef = useRef<HTMLDivElement | null>(null);
  const stale = runFiles !== null && !sameFiles(runFiles, files);
  const errorCount = log.filter((entry) => entry.kind === "error").length;

  function run() {
    const next = crypto.randomUUID();
    setLog([]); setNonce(next); setRunFiles({ ...files }); setRunId((id) => id + 1);
  }
  function stop() {
    // Unmounting is the only reliable way to stop a page's timers, listeners
    // and in-flight requests. Clearing srcDoc would leave them running.
    setRunFiles(null); setNonce("");
    setLog((prev) => [...prev, { __utg: "", kind: "system", text: "Stopped.", at: Date.now() }]);
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const msg = isPreviewMessage(event, frameRef.current, nonce);
      if (!msg) return; // includes stale output from a previous run, dropped by nonce
      setLog((prev) => (prev.length >= 300 ? [...prev.slice(-299), msg] : [...prev, msg]));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [nonce]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); run(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  useEffect(() => { tailRef.current?.scrollIntoView({ block: "end" }); }, [log.length]);

  const shown = onlyErrors ? log.filter((entry) => entry.kind === "error") : log;
  return <section className="preview-panel">
    <div className="preview-top">
      <strong>Preview</strong>
      {stale && <span className="stale-hint">Your code changed since you last ran it</span>}
      <button className={stale || !runFiles ? "primary compact" : "text-button"} onClick={run}>{runFiles ? "Run again" : "▶ Run"}</button>
      {runFiles && <button className="text-button" onClick={stop}>Stop</button>}
    </div>
    {runFiles
      ? <iframe key={runId} ref={frameRef} title="Project preview" sandbox="allow-scripts" srcDoc={buildPreview(runFiles, nonce)} />
      : <div className="preview-idle"><p>Press <strong>▶ Run</strong> to see your project.</p><p className="muted">Nothing runs until you ask it to, so your project never sends a request you did not mean to send.</p></div>}
    <div className="console-panel">
      <div className="console-head">
        <strong>Console</strong>
        {errorCount > 0 && <span className="console-badge">{errorCount}</span>}
        <label className="console-filter"><input type="checkbox" checked={onlyErrors} onChange={(event) => setOnlyErrors(event.target.checked)} />Errors only</label>
        <button className="text-button" onClick={() => setLog([])}>Clear</button>
      </div>
      <div className="console-body">
        {shown.length === 0
          ? <span className="muted">Anything you <code>console.log()</code> shows up here, along with errors and network requests.</span>
          : shown.map((entry, index) => <div className={`console-row ${entry.kind}`} key={index}>{entry.text}</div>)}
        <div ref={tailRef} />
      </div>
    </div>
  </section>;
}

export default App;
