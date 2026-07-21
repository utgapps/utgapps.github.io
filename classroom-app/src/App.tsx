import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import * as Y from "yjs";
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from "y-protocols/awareness";
import { downloadFile, hostId, makeClass, makeStudent, normalizeCode } from "./lib/classroom";
import { seedDoc, docToFiles, fileNames, b64encode, b64decode, userColor } from "./lib/collab";
import { CollabEditor } from "./CollabEditor";
import { AdminApp } from "./AdminApp";
import { apiLoginGuest, apiLoginInstructor, apiGetProject, apiSaveProject, apiGetClassroom, apiSaveClassroom, apiOpenLiveRoom, apiGetLiveRoom, apiCloseLiveRoom, apiListMedia, apiUploadMedia, apiDeleteMedia, type ApiAccount, type ApiMedia } from "./lib/api";
import { compressImage, compressAudio } from "./lib/media";
import { classroomForId, peerOptions } from "./lib/rootCodes";
import { getClassByCode, getClasses, persistentStorage, saveClass } from "./lib/storage";
import { starterFiles } from "./lib/types";
import type { ClassRecord, PendingJoin, Project, Student } from "./lib/types";

type Mode = "home" | "instructor" | "student";
type WireMessage =
  | { type: "join"; name: string; deviceId: string; deviceLabel: string; fingerprint: string }
  | { type: "approved"; studentId: string; projectId: string; title: string; className: string }
  | { type: "wait"; message: string }
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

function buildPreview(files: Record<string, string>) {
  const html = files["index.html"] || "<main><h1>Start your project</h1></main>";
  const css = files["style.css"] || "";
  const js = files["script.js"] || "";
  return `${html}<style>${css}</style><script>${js.replaceAll("</script>", "<\\/script>")}<\/script>`;
}

function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [activeClass, setActiveClass] = useState<ClassRecord | null>(null);
  const [message, setMessage] = useState("");
  const classSaveTimers = useRef(new Map<string, number>());

  useEffect(() => {
    const account = savedAccount();
    if (account?.account.role === "student") setMode("student");
  }, []);

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

  if (new URLSearchParams(window.location.search).has("admin")) return <AdminApp />;
  if (mode === "instructor" && activeClass) {
    const account = savedAccount();
    if (!account) return <Home classes={classes} message="Sign in with an instructor code first." onStudent={() => setMode("student")} onOpen={useClass} onImport={useClass} />;
    return <InstructorRoom record={activeClass} token={account.token} onChange={persistClass} onExit={() => setMode("home")} />;
  }
  if (mode === "student") return <StudentJoin onExit={() => setMode("home")} />;

  return <Home
    classes={classes}
    message={message}
    onStudent={() => setMode("student")}
    onOpen={useClass}
    onImport={useClass}
  />;
}

function Home({ classes, message, onStudent, onOpen, onImport }: {
  classes: ClassRecord[]; message: string; onStudent: () => void;
  onOpen: (record: ClassRecord, account: StoredAccount) => void; onImport: (record: ClassRecord, account: StoredAccount) => void;
}) {
  const [teacherPanel, setTeacherPanel] = useState(new URLSearchParams(window.location.search).has("instructor"));
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState(message);

  async function openInstructor() {
    try {
      const session = await apiLoginInstructor(code);
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
    <section className="welcome-copy">
      <p className="eyebrow">Browser coding classroom</p>
      <h1>Teach live. Keep every project safe.</h1>
      <p>One classroom code connects a teacher and their students. Each student has a separate project, saved on their device and synchronized when class is open.</p>
      <div className="choice-row">
        <button className="primary" onClick={onStudent}>Join a class</button>
        <button className="secondary" onClick={() => setTeacherPanel(true)}>Instructor access</button>
      </div>
    </section>
    <section className="home-grid">
      <article className="feature"><strong>1</strong><h2>Private class code</h2><p>Students use a private code issued by their Classroom admin. The code finds the class; teacher approval controls live entry.</p></article>
      <article className="feature"><strong>2</strong><h2>Individual projects</h2><p>Students cannot browse each other's code. Teachers can open any project to help in real time.</p></article>
      <article className="feature"><strong>3</strong><h2>Portable class file</h2><p>Export one class file with your roster, projects, checkpoints, and private notes for a safe handoff.</p></article>
    </section>
    {teacherPanel && <div className="modal-backdrop"><section className="modal teacher-modal">
      <button className="icon-button" aria-label="Close" onClick={() => setTeacherPanel(false)}>x</button>
      <p className="eyebrow">Instructor workspace</p><h2>Open a curriculum classroom</h2>
      <div className="teacher-options">
        <div><h3>Open a curriculum classroom</h3><label>Instructor code<input value={code} maxLength={32} placeholder="Your private instructor code" onChange={(e) => setCode(e.target.value.toUpperCase())} /></label><button className="primary" onClick={openInstructor}>Open classroom</button><p className="small">Instructor codes are created by a Classroom admin and are not the live room address.</p></div>
        <div><h3>Classroom backup</h3><p>Import a .classpack only when recovering an existing class. Opening it saves the recovered record to the shared classroom.</p><label className="file-button">Choose .classpack<input type="file" accept=".classpack,.json" onChange={importPack} /></label><p className="small">Local backups: {classes.length ? classes.map((item) => item.courseId).join(", ") : "none yet"}</p></div>
      </div>
      {notice && <p className="notice warning">{notice}</p>}
    </section></div>}
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
  const docs = useRef(new Map<string, { doc: Y.Doc; awareness: Awareness }>()); // projectId -> live shared doc
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
  function getDoc(projectId: string) {
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
      entry = { doc, awareness };
      docs.current.set(projectId, entry);
      setDocsTick((n) => n + 1);
    }
    return entry;
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
      <section className="workspace">{selected && selectedProject ? <><div className="workspace-top"><div><p className="eyebrow">Individual project</p><h2>{selected.name}</h2></div><div><button className="secondary" onClick={checkpoint}>Save checkpoint</button><button className="secondary" onClick={() => downloadFile(`${selected.name.replaceAll(" ", "-").toLowerCase()}-backup.json`, JSON.stringify(selectedProject, null, 2))}>Personal backup</button></div></div>{selectedEntry && fileNames(selectedEntry.doc).length > 0 ? <CollabWorkspace doc={selectedEntry.doc} awareness={selectedEntry.awareness} files={selectedProject.files} /> : <div className="offline-view"><p className="empty">{selectedEntry ? "Connected — loading this student's code…" : "This student is offline. Their last saved work is shown here; live co-editing resumes when they open their project."}</p><iframe title="Last saved preview" sandbox="allow-scripts" srcDoc={buildPreview(selectedProject.files)} /></div>}<div className="workspace-status"><span><i className={isOpen ? "online" : "offline"}></i>{isOpen ? "Changes are syncing to this device." : "Saved in the instructor's browser."}</span><span>{room.checkpoints.filter((item) => item.projectId === selectedProject.id).length} checkpoints</span></div></> : <div className="empty-workspace"><h2>Choose a student</h2><p>Start by adding a student, or open the class and approve a student device.</p></div>}</section>
      <aside className="details"><h2>Class controls</h2><dl><dt>Course</dt><dd>{room.courseId}</dd><dt>Instructor login</dt><dd>Private instructor code</dd><dt>Student login</dt><dd>Private student code</dd><dt>Room address</dt><dd className="small-code">Fresh and private for each live class</dd><dt>Class record</dt><dd>Saved to the shared classroom</dd></dl><label>Private instructor notes<textarea value={room.notes} placeholder="Notes never appear in a student project." onChange={(event) => updateRoom((current) => ({ ...current, notes: event.target.value }))} /></label><div className="safety"><strong>Recovery ready</strong><p>Every student can export a personal backup. The shared class record is also available to authorized instructor devices.</p></div></aside>
    </div>
    <footer className="room-footer">{status}</footer>
  </main>;
}

function StudentJoin({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<"join" | "waiting" | "room">("join");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Enter the private student code from your teacher.");
  const [className, setClassName] = useState("");
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
  const projectIdRef = useRef<string>("");
  const apiTokenRef = useRef<string | null>(null);
  const titleRef = useRef<string>("My project");
  const [files, setFiles] = useState<Record<string, string>>({});
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
  function scheduleSave() {
    if (!apiTokenRef.current || saveTimer.current !== null) return;
    saveTimer.current = window.setTimeout(async () => {
      saveTimer.current = null;
      const token = apiTokenRef.current, doc = docRef.current;
      if (!token || !doc) return;
      try { await apiSaveProject(token, titleRef.current, docToFiles(doc)); setStatus("Saved to your account."); }
      catch { /* keep working; retry on next change */ }
    }, 8000);
  }
  useEffect(() => () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); awarenessRef.current?.destroy(); docRef.current?.destroy(); }, []);

  async function join() {
    if (!code.trim() || !name.trim()) { setStatus("Add your name and student class code first."); return; }
    setStep("waiting"); setStatus("Signing in…");
    try {
      const session = await apiLoginGuest(code, name.trim());
      saveAccount(session);
      const course = classroomForId(session.account.classId);
      if (!course) throw new Error("This student code is not linked to a configured curriculum classroom.");
      await openSession(session.token, session.account.name, course.className, session.account.classId);
    } catch (e) { setStep("join"); setStatus((e as Error).message || "Could not sign in. Try again."); }
  }

  // Open the editor for a signed-in session (guest OR a real account from the root login).
  async function openSession(token: string, displayName: string, cls: string, classId: string) {
    setStep("waiting"); setStatus("Opening your project…");
    let startFiles: Record<string, string> = starterFiles();
    let loaded = false;
    try {
      const saved = await apiGetProject(token); loaded = true;
      if (saved && saved.files && Object.keys(saved.files).length) { startFiles = saved.files; titleRef.current = saved.title || titleRef.current; }
    } catch { loaded = false; }
    apiTokenRef.current = loaded ? token : null; // only autosave once we know the saved state (never clobber on a failed load)
    setAccountToken(loaded ? token : null);
    const doc = new Y.Doc();
    seedDoc(doc, startFiles);
    const awareness = new Awareness(doc);
    awareness.setLocalStateField("user", { name: displayName || "Student", color: userColor(device.id) });
    doc.on("update", (u: Uint8Array, origin: unknown) => {
      if (origin !== "remote") sendConn({ type: "ydoc", projectId: projectIdRef.current, u: b64encode(u) });
      scheduleDerive(); scheduleSave();
    });
    awareness.on("update", ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
      sendConn({ type: "awareness", projectId: projectIdRef.current, u: b64encode(encodeAwarenessUpdate(awareness, added.concat(updated, removed))) });
    });
    docRef.current = doc; awarenessRef.current = awareness;
    setFiles(docToFiles(doc)); setTitle(titleRef.current); setClassName(cls);
    setStep("room"); setStatus(apiTokenRef.current ? "Your work is saved to your account." : "Working on this device.");
    if (classId) connectToTeacher(classId, token, displayName);
  }

  // Auto sign-in from an account stored by the root login page.
  useEffect(() => {
    const raw = localStorage.getItem("utg_account");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { token?: string; account?: { name?: string; classId?: string; role?: string } };
      if (!parsed.token || !parsed.account || parsed.account.role === "admin") return;
       if (parsed.account.role !== "student") return;
       const c = classroomForId(parsed.account.classId || "");
       setName(parsed.account.name || "");
       if (c) openSession(parsed.token, parsed.account.name || "Student", c.className, c.id);
    } catch { /* ignore */ }
    // eslint-disable-next-line
  }, []);

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
      const doc = docRef.current;
      if (doc) sendConn({ type: "ydoc", projectId: data.projectId, u: b64encode(Y.encodeStateAsUpdate(doc)) });
      setLive(true); setStatus("Live with your teacher — they can see and help.");
    }
    if (data.type === "ydoc") { if (docRef.current && data.projectId === projectIdRef.current) { Y.applyUpdate(docRef.current, b64decode(data.u), "remote"); scheduleDerive(); scheduleSave(); } }
    if (data.type === "awareness") { if (awarenessRef.current && data.projectId === projectIdRef.current) applyAwarenessUpdate(awarenessRef.current, b64decode(data.u), "remote"); }
    if (data.type === "close") setStatus(data.message);
  }

  if (step !== "room" || !docRef.current || !awarenessRef.current) return <main className="join-screen"><section className="join-card"><a className="back" onClick={onExit}><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><p className="eyebrow">Student classroom</p><h1>Open your project</h1><p>Enter the private student code from your teacher. Your browser remembers this guest session so you can safely return to your own project.</p><label>Your name<input value={name} placeholder="Your first name" onChange={(event) => setName(event.target.value)} /></label><label>Student code<input className="code-input" value={code} maxLength={32} placeholder="Your student code" onChange={(event) => setCode(event.target.value.toUpperCase())} /></label><button className="primary full" onClick={join}>Open my project</button><p className="notice">{status}</p><small>Use a permanent account when a project needs to follow you to another browser or computer.</small></section></main>;
  return <main className="student-shell"><header className="room-header"><div><a href="../"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span className="slash">/</span><strong>{className}</strong></div><div className="connection"><i className={live ? "online" : "offline"}></i>{live ? "Live with teacher" : "Saved to your account"}<button className="text-button" onClick={() => downloadFile("my-utg-project.json", JSON.stringify({ title, files }, null, 2))}>Export backup</button><button className="text-button" onClick={() => { localStorage.removeItem("utg_account"); window.location.href = "../"; }}>Sign out</button></div></header><section className="student-project"><div className="workspace-top"><div><p className="eyebrow">My individual project</p><h1>{title}</h1></div><span className="save-label">{status}</span></div><CollabWorkspace doc={docRef.current} awareness={awarenessRef.current} files={files} />{accountToken && <MediaPanel token={accountToken} />}</section></main>;
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

function CollabWorkspace({ doc, awareness, files, readOnly }: { doc: Y.Doc; awareness: Awareness; files: Record<string, string>; readOnly?: boolean }) {
  const names = Object.keys(files).length ? Object.keys(files) : fileNames(doc);
  const [file, setFile] = useState(names[0] || "index.html");
  const [running, setRunning] = useState(true);
  useEffect(() => { if (names.length && !names.includes(file)) setFile(names[0]); }, [names, file]);
  return <div className="editor-grid"><section className="code-panel"><div className="tabs">{names.map((name) => <button key={name} className={name === file ? "tab active" : "tab"} onClick={() => setFile(name)}>{name}</button>)}</div><CollabEditor doc={doc} file={file} awareness={awareness} readOnly={readOnly} /></section><section className="preview-panel"><div className="preview-top"><strong>Preview</strong><button className="text-button" onClick={() => setRunning((value) => !value)}>{running ? "Refresh" : "Run project"}</button></div>{running && <iframe title="Project preview" sandbox="allow-scripts" srcDoc={buildPreview(files)} />}</section></div>;
}

export default App;
