import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import { createCode, downloadFile, hostId, makeClass, makeStudent, normalizeCode } from "./lib/classroom";
import { getClassByCode, getClasses, persistentStorage, saveClass } from "./lib/storage";
import type { ClassRecord, PendingJoin, Project, Student } from "./lib/types";

type Mode = "home" | "instructor" | "student";
type WireMessage =
  | { type: "join"; name: string; deviceId: string; deviceLabel: string; fingerprint: string }
  | { type: "approved"; studentId: string; project: Project; className: string }
  | { type: "wait"; message: string }
  | { type: "project"; project: Project }
  | { type: "close"; message: string };

const deviceKey = "utg-classroom-device-v1";

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

  useEffect(() => { getClasses().then(setClasses).catch(() => setMessage("Your browser could not open local class storage.")); }, []);
  useEffect(() => { persistentStorage(); }, []);

  async function useClass(record: ClassRecord) {
    await saveClass(record);
    setActiveClass(record);
    setClasses(await getClasses());
    setMode("instructor");
  }

  if (mode === "instructor" && activeClass) {
    return <InstructorRoom record={activeClass} onChange={useClass} onExit={() => setMode("home")} />;
  }
  if (mode === "student") return <StudentJoin onExit={() => setMode("home")} />;

  return <Home
    classes={classes}
    message={message}
    onInstructor={() => setMode("instructor")}
    onStudent={() => setMode("student")}
    onOpen={useClass}
    onCreate={async (name, course) => useClass(makeClass(name, course))}
    onImport={async (record) => useClass(record)}
  />;
}

function Home({ classes, message, onInstructor, onStudent, onOpen, onCreate, onImport }: {
  classes: ClassRecord[]; message: string; onInstructor: () => void; onStudent: () => void;
  onOpen: (record: ClassRecord) => void; onCreate: (name: string, course: string) => void; onImport: (record: ClassRecord) => void;
}) {
  const [teacherPanel, setTeacherPanel] = useState(false);
  const [name, setName] = useState("AI102 - Introduction to AI Integration");
  const [course, setCourse] = useState("AI102");
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState(message);

  async function openSaved() {
    const record = await getClassByCode(normalizeCode(code));
    if (record) onOpen(record); else setNotice("This browser does not have that class file yet. Import its .classpack first.");
  }
  function importPack(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as ClassRecord;
        if (parsed.schemaVersion !== 1 || !parsed.code || !parsed.projects) throw new Error();
        onImport({ ...parsed, id: crypto.randomUUID() });
      } catch { setNotice("That file is not a compatible UTG .classpack. Your current classes were not changed."); }
    };
    reader.readAsText(file);
  }

  return <main className="welcome">
    <header className="brand"><a href="../">UTG Academy</a><span>Classroom</span></header>
    <section className="welcome-copy">
      <p className="eyebrow">Browser coding classroom</p>
      <h1>Teach live. Keep every project safe.</h1>
      <p>One classroom code connects a teacher and their students. Each student has a separate project, saved on their device and synchronized when class is open.</p>
      <div className="choice-row">
        <button className="primary" onClick={onStudent}>Join a class</button>
        <button className="secondary" onClick={() => { setTeacherPanel(true); onInstructor(); }}>Instructor access</button>
      </div>
    </section>
    <section className="home-grid">
      <article className="feature"><strong>1</strong><h2>Permanent class code</h2><p>Students use the same four-character code each week. The code finds the room; teacher approval controls entry.</p></article>
      <article className="feature"><strong>2</strong><h2>Individual projects</h2><p>Students cannot browse each other's code. Teachers can open any project to help in real time.</p></article>
      <article className="feature"><strong>3</strong><h2>Portable class file</h2><p>Export one class file with your roster, projects, checkpoints, and private notes for a safe handoff.</p></article>
    </section>
    {teacherPanel && <div className="modal-backdrop"><section className="modal teacher-modal">
      <button className="icon-button" aria-label="Close" onClick={() => setTeacherPanel(false)}>x</button>
      <p className="eyebrow">Instructor workspace</p><h2>Open a curriculum classroom</h2>
      <div className="teacher-options">
        <div><h3>Start a new class</h3><label>Class name<input value={name} onChange={(e) => setName(e.target.value)} /></label><label>Course code<input value={course} onChange={(e) => setCourse(e.target.value.toUpperCase())} /></label><button className="primary" onClick={() => onCreate(name, course)}>Create classroom</button></div>
        <div><h3>Open a saved class</h3><label>Class code<input value={code} maxLength={4} placeholder="K7F3" onChange={(e) => setCode(normalizeCode(e.target.value))} /></label><button className="secondary" onClick={openSaved}>Open this class</button><p className="small">Available here: {classes.length ? classes.map((item) => item.code).join(", ") : "none yet"}</p></div>
        <div><h3>Import a class file</h3><p>Use a .classpack exported by another UTG instructor. Imported classes remain local until you open them.</p><label className="file-button">Choose .classpack<input type="file" accept=".classpack,.json" onChange={importPack} /></label></div>
      </div>
      {notice && <p className="notice warning">{notice}</p>}
    </section></div>}
  </main>;
}

function InstructorRoom({ record, onChange, onExit }: { record: ClassRecord; onChange: (record: ClassRecord) => void; onExit: () => void }) {
  const [room, setRoom] = useState(record);
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState<PendingJoin[]>([]);
  const [selectedId, setSelectedId] = useState(record.students[0]?.id || "");
  const [status, setStatus] = useState("Class is closed. Projects are still saved locally.");
  const [newStudent, setNewStudent] = useState("");
  const peerRef = useRef<Peer | null>(null);
  const connections = useRef(new Map<string, DataConnection>());

  useEffect(() => { setRoom(record); }, [record]);
  useEffect(() => { onChange(room); }, [room]);
  useEffect(() => () => peerRef.current?.destroy(), []);

  const selected = room.students.find((student) => student.id === selectedId);
  const selectedProject = selected ? room.projects[selected.projectId] : undefined;
  const onlineCount = room.students.filter((student) => student.status === "connected" || student.status === "syncing").length;

  function updateRoom(change: (current: ClassRecord) => ClassRecord) { setRoom((current) => change(current)); }
  function addStudent() {
    if (!newStudent.trim()) return;
    const made = makeStudent(newStudent.trim());
    updateRoom((current) => ({ ...current, students: [...current.students, made.student], projects: { ...current.projects, [made.project.id]: made.project } }));
    setSelectedId(made.student.id); setNewStudent("");
  }
  function openRoom() {
    if (peerRef.current) return;
    setStatus("Opening your classroom connection...");
    const peer = new Peer(hostId(room.code));
    peerRef.current = peer;
    peer.on("open", () => { setIsOpen(true); setStatus(`Class is open. Students can join with ${room.code}.`); });
    peer.on("error", () => { setStatus("This class code is already being hosted. Check the other instructor device, then try again."); peer.destroy(); peerRef.current = null; });
    peer.on("connection", (connection) => {
      connections.current.set(connection.peer, connection);
      connection.on("data", (data) => receive(connection, data as WireMessage));
      connection.on("close", () => markDisconnected(connection.peer));
    });
  }
  function markDisconnected(peerId: string) {
    connections.current.delete(peerId);
    updateRoom((current) => ({ ...current, students: current.students.map((student) => student.deviceIds.includes(peerId) ? { ...student, status: "offline" } : student) }));
  }
  function receive(connection: DataConnection, data: WireMessage) {
    if (data.type === "join") {
      const recognized = room.devices.find((device) => device.id === data.deviceId && !device.revoked);
      if (recognized) approve({ connectionId: connection.peer, studentName: data.name, deviceId: data.deviceId, deviceLabel: data.deviceLabel, fingerprint: data.fingerprint }, recognized.studentId, connection);
      else if (room.admissionsOpen) { setPending((items) => [...items.filter((item) => item.connectionId !== connection.peer), { connectionId: connection.peer, studentName: data.name, deviceId: data.deviceId, deviceLabel: data.deviceLabel, fingerprint: data.fingerprint }]); connection.send({ type: "wait", message: "Your teacher needs to approve this device." } satisfies WireMessage); }
      else connection.send({ type: "wait", message: "Admissions are closed. Ask your teacher to open admissions." } satisfies WireMessage);
    }
    if (data.type === "project") {
      updateRoom((current) => ({ ...current, projects: { ...current.projects, [data.project.id]: data.project }, students: current.students.map((student) => student.projectId === data.project.id ? { ...student, status: "connected", lastSeen: new Date().toISOString() } : student) }));
    }
  }
  function approve(join: PendingJoin, existingStudentId?: string, connection?: DataConnection) {
    let target = connection || connections.current.get(join.connectionId);
    let nextRoom = room;
    let student = existingStudentId ? room.students.find((item) => item.id === existingStudentId) : room.students.find((item) => item.name.toLowerCase() === join.studentName.toLowerCase());
    if (!student) {
      const made = makeStudent(join.studentName);
      student = made.student;
      nextRoom = { ...nextRoom, students: [...nextRoom.students, student], projects: { ...nextRoom.projects, [made.project.id]: made.project } };
    }
    const device = { id: join.deviceId, studentId: student.id, label: join.deviceLabel, fingerprint: join.fingerprint, approvedAt: new Date().toISOString() };
    const hasDevice = nextRoom.devices.some((item) => item.id === device.id);
    nextRoom = { ...nextRoom, devices: hasDevice ? nextRoom.devices : [...nextRoom.devices, device], students: nextRoom.students.map((item) => item.id === student!.id ? { ...item, status: "connected", deviceIds: Array.from(new Set([...item.deviceIds, join.connectionId])) } : item) };
    setRoom(nextRoom); setSelectedId(student.id); setPending((items) => items.filter((item) => item.connectionId !== join.connectionId));
    target?.send({ type: "approved", studentId: student.id, project: nextRoom.projects[student.projectId], className: nextRoom.name } satisfies WireMessage);
  }
  function updateProject(project: Project) {
    updateRoom((current) => ({ ...current, projects: { ...current.projects, [project.id]: project } }));
    for (const connection of connections.current.values()) connection.send({ type: "project", project } satisfies WireMessage);
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
  function closeRoom() {
    connections.current.forEach((connection) => connection.send({ type: "close", message: "Class has ended. Your project is saved on this device." } satisfies WireMessage));
    peerRef.current?.destroy(); peerRef.current = null; connections.current.clear(); setIsOpen(false); setStatus("Class closed. Export a classpack before handing the class to another instructor.");
    updateRoom((current) => ({ ...current, students: current.students.map((student) => ({ ...student, status: "offline" })) }));
  }

  return <main className="room-shell">
    <header className="room-header"><div><a href="../">UTG Academy</a><span className="slash">/</span><strong>{room.courseId}</strong></div><div className="connection"><i className={isOpen ? "online" : "offline"}></i>{isOpen ? "Live class" : "Class closed"}<button className="text-button" onClick={onExit}>Exit</button></div></header>
    <section className="class-banner"><div><p className="eyebrow">Instructor classroom</p><h1>{room.name}</h1><p>Class code <strong className="code-pill">{room.code}</strong> <span className="muted">{isOpen ? "Students can join now." : "Open class when you are ready."}</span></p></div><div className="banner-actions"><button className="secondary" onClick={() => updateRoom((current) => ({ ...current, admissionsOpen: !current.admissionsOpen }))}>{room.admissionsOpen ? "Close admissions" : "Open admissions"}</button>{isOpen ? <button className="danger" onClick={closeRoom}>End class</button> : <button className="primary" onClick={openRoom}>Open class</button>}</div></section>
    {pending.length > 0 && <section className="pending-strip"><strong>Waiting for approval</strong>{pending.map((join) => <div key={join.connectionId}><span>{join.studentName}<small>{join.deviceLabel}</small></span><button className="primary compact" onClick={() => approve(join)}>Approve and remember</button><button className="text-button" onClick={() => setPending((items) => items.filter((item) => item.connectionId !== join.connectionId))}>Reject</button></div>)}</section>}
    <div className="class-layout"><aside className="roster"><div className="panel-title"><h2>Students <span>{onlineCount}/{room.students.length}</span></h2></div><div className="add-student"><input value={newStudent} placeholder="Add student" onChange={(event) => setNewStudent(event.target.value)} onKeyDown={(event) => event.key === "Enter" && addStudent()} /><button onClick={addStudent} aria-label="Add student">+</button></div><div className="student-list">{room.students.length ? room.students.map((student) => <button className={student.id === selectedId ? "student active" : "student"} key={student.id} onClick={() => setSelectedId(student.id)}><i className={student.status}></i><span>{student.name}<small>{student.status === "offline" ? "saved locally" : student.status}</small></span></button>) : <p className="empty">Students appear here after you add them or approve a join.</p>}</div><div className="roster-footer"><button className="secondary full" onClick={exportClass}>Export classpack</button><button className="text-button full" onClick={() => downloadFile(`${room.code}-roster.csv`, "Student,Status\n" + room.students.map((student) => `${student.name},${student.status}`).join("\n"), "text/csv")}>Download roster</button></div></aside>
      <section className="workspace">{selected && selectedProject ? <><div className="workspace-top"><div><p className="eyebrow">Individual project</p><h2>{selected.name}</h2></div><div><button className="secondary" onClick={checkpoint}>Save checkpoint</button><button className="secondary" onClick={() => downloadFile(`${selected.name.replaceAll(" ", "-").toLowerCase()}-backup.json`, JSON.stringify(selectedProject, null, 2))}>Personal backup</button></div></div><ProjectEditor project={selectedProject} onChange={updateProject} readOnly={false} /><div className="workspace-status"><span><i className={isOpen ? "online" : "offline"}></i>{isOpen ? "Changes are syncing to this device." : "Saved in the instructor's browser."}</span><span>{room.checkpoints.filter((item) => item.projectId === selectedProject.id).length} checkpoints</span></div></> : <div className="empty-workspace"><h2>Choose a student</h2><p>Start by adding a student, or open the class and approve a student device.</p></div>}</section>
      <aside className="details"><h2>Class controls</h2><dl><dt>Course</dt><dd>{room.courseId}</dd><dt>Class code</dt><dd>{room.code}</dd><dt>Host address</dt><dd className="small-code">{hostId(room.code)}</dd><dt>Local class file</dt><dd>Saved in this browser</dd></dl><label>Private instructor notes<textarea value={room.notes} placeholder="Notes never appear in a student project." onChange={(event) => updateRoom((current) => ({ ...current, notes: event.target.value }))} /></label><div className="safety"><strong>Recovery ready</strong><p>Every student can export a personal backup. Export a classpack at the end of class or before changing instructor devices.</p></div></aside>
    </div>
    <footer className="room-footer">{status}</footer>
  </main>;
}

function StudentJoin({ onExit }: { onExit: () => void }) {
  const [step, setStep] = useState<"join" | "waiting" | "room">("join");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Enter your teacher's permanent four-character class code.");
  const [project, setProject] = useState<Project | null>(null);
  const [className, setClassName] = useState("");
  const connectionRef = useRef<DataConnection | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const device = useMemo(localDevice, []);
  useEffect(() => () => peerRef.current?.destroy(), []);

  function join() {
    if (code.length !== 4 || !name.trim()) { setStatus("Add your name and a four-character class code first."); return; }
    setStep("waiting"); setStatus("Finding your classroom...");
    const peer = new Peer(); peerRef.current = peer;
    peer.on("open", () => {
      const connection = peer.connect(hostId(code)); connectionRef.current = connection;
      connection.on("open", () => connection.send({ type: "join", name: name.trim(), deviceId: device.id, deviceLabel: `${navigator.platform || "Desktop"} browser`, fingerprint: device.fingerprint } satisfies WireMessage));
      connection.on("data", (data) => receive(data as WireMessage));
      connection.on("close", () => setStatus("Connection interrupted. Your latest project remains saved in this browser."));
      connection.on("error", () => setStatus("We could not reach this classroom. Check the code and ask your teacher whether class is open."));
    });
    peer.on("error", () => setStatus("We could not start your classroom connection. Refresh and try again."));
  }
  function receive(data: WireMessage) {
    if (data.type === "wait") setStatus(data.message);
    if (data.type === "approved") { setProject(data.project); setClassName(data.className); setStep("room"); setStatus("Connected and saved locally."); }
    if (data.type === "project") setProject(data.project);
    if (data.type === "close") setStatus(data.message);
  }
  function updateProject(next: Project) { setProject(next); connectionRef.current?.open && connectionRef.current.send({ type: "project", project: next } satisfies WireMessage); }

  if (step !== "room" || !project) return <main className="join-screen"><section className="join-card"><a className="back" onClick={onExit}>UTG Academy</a><p className="eyebrow">Student classroom</p><h1>Join your class</h1><p>Use the code shown by your teacher. A new device waits for approval before it can open a project.</p><label>Your name<input value={name} placeholder="Your first name" onChange={(event) => setName(event.target.value)} /></label><label>Class code<input className="code-input" value={code} maxLength={4} placeholder="K7F3" onChange={(event) => setCode(normalizeCode(event.target.value))} /></label><button className="primary full" onClick={join}>Join classroom</button><p className="notice">{status}</p><small>This browser remembers approved devices. If your browser data is cleared, ask your teacher to approve this device again.</small></section></main>;
  return <main className="student-shell"><header className="room-header"><div><a href="../">UTG Academy</a><span className="slash">/</span><strong>{className}</strong></div><div className="connection"><i className={connectionRef.current?.open ? "online" : "offline"}></i>{connectionRef.current?.open ? "Synced to teacher" : "Saved locally"}<button className="text-button" onClick={() => downloadFile("my-utg-project.json", JSON.stringify(project, null, 2))}>Export backup</button></div></header><section className="student-project"><div className="workspace-top"><div><p className="eyebrow">My individual project</p><h1>{project.title}</h1></div><span className="save-label">{status}</span></div><ProjectEditor project={project} onChange={updateProject} readOnly={false} /></section></main>;
}

function ProjectEditor({ project, onChange, readOnly }: { project: Project; onChange: (project: Project) => void; readOnly: boolean }) {
  const [file, setFile] = useState("index.html");
  const [running, setRunning] = useState(true);
  useEffect(() => { if (!project.files[file]) setFile(Object.keys(project.files)[0]); }, [project, file]);
  const update = (contents: string) => onChange({ ...project, files: { ...project.files, [file]: contents }, updatedAt: new Date().toISOString() });
  return <div className="editor-grid"><section className="code-panel"><div className="tabs">{Object.keys(project.files).map((name) => <button key={name} className={name === file ? "tab active" : "tab"} onClick={() => setFile(name)}>{name}</button>)}</div><textarea className="editor" spellCheck="false" value={project.files[file] || ""} readOnly={readOnly} onChange={(event) => update(event.target.value)} aria-label={`${file} code editor`} /></section><section className="preview-panel"><div className="preview-top"><strong>Preview</strong><button className="text-button" onClick={() => setRunning((value) => !value)}>{running ? "Refresh" : "Run project"}</button></div>{running && <iframe title="Project preview" sandbox="allow-scripts" srcDoc={buildPreview(project.files)} />}</section></div>;
}

export default App;
