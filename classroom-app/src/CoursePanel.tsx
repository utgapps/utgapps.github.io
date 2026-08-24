import { useEffect, useState } from "react";
import { CourseViewer, type ViewerTab } from "./CourseViewer";
import { apiClassStudents, apiSeedProject, apiCourseWeeks, apiEnrolStudent, apiResetStudentPassword,
         apiListProjects, apiCreateProject, apiGetProjectById,
         type ApiClassStudent, type ApiProjectSummary, type CourseWeek } from "./lib/api";

/* The instructor's own panel: the course weeks, the class list, and the two
   ways to hand code to somebody.

   Copies never come from another student's project. A peer's file carries their
   API key, so the receiving student would be spending someone else's rate limit
   under someone else's name, and would inherit their half-finished experiments.
   The two allowed sources are the published course milestone and the teacher's
   own project, and the worker resets any key it finds either way. */

type Source = { kind: "week"; n: number } | { kind: "mine"; id: string };

/* Readable on purpose. A teacher reads this out or writes it on a slip, so it
   avoids characters that look alike and words that are hard to spell. */
const WORDS = ["maple", "harbour", "lantern", "copper", "willow", "quartz",
               "beacon", "cedar", "falcon", "meadow", "anchor", "pebble"];
function suggestPassword() {
  const pick = () => WORDS[Math.floor(Math.random() * WORDS.length)];
  return `${pick()}-${pick()}-${10 + Math.floor(Math.random() * 90)}`;
}

export function CoursePanel({ token, classId }: { token: string; classId: string }) {
  const [weeks, setWeeks] = useState<CourseWeek[] | null>(null);
  const [students, setStudents] = useState<ApiClassStudent[]>([]);
  const [mine, setMine] = useState<ApiProjectSummary[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [mineId, setMineId] = useState("");
  const [who, setWho] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [adding, setAdding] = useState(false);
  const [viewing, setViewing] = useState<ViewerTab | null>(null);

  function refresh() {
    apiClassStudents(token, classId).then(setStudents).catch(() => {});
    apiListProjects(token).then(setMine).catch(() => {});
  }
  useEffect(() => { apiCourseWeeks(classId).then(setWeeks).catch(() => setWeeks([])); }, [classId]);
  useEffect(refresh, [token, classId]);

  const week = weeks?.find((w) => w.n === picked) || null;
  const chosen = students.find((s) => s.id === who);

  async function filesFor(from: Source): Promise<{ files: Record<string, string>; label: string }> {
    if (from.kind === "week") {
      const w = weeks?.find((x) => x.n === from.n);
      if (!w) throw new Error("That week is not published.");
      return { files: w.files, label: "week " + w.n };
    }
    const project = await apiGetProjectById(token, from.id);
    if (!project) throw new Error("That project is gone.");
    return { files: project.files, label: project.title };
  }

  async function copyToStudent(from: Source) {
    if (!who) { setNote("Choose a student first."); return; }
    setBusy(true);
    setNote("");
    try {
      const { files, label } = await filesFor(from);
      const title = from.kind === "week" ? "Caught up to week " + from.n : label;
      await apiSeedProject(token, classId, who, title, files);
      setNote("Copied " + label + " into " + (chosen ? chosen.name : "them") +
              " as a NEW project. Nothing they already had was touched." +
              (from.kind === "mine" ? " Your API key was not copied across." : ""));
      setWho("");
      refresh();
    } catch (error) { setNote((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  async function copyToMe(n: number) {
    setBusy(true);
    setNote("");
    try {
      const w = weeks?.find((x) => x.n === n);
      if (!w) throw new Error("That week is not published.");
      await apiCreateProject(token, { title: "Week " + n + " - " + w.title, kind: "web", files: w.files });
      setNote("Week " + n + " is now in your own projects. Open it from My projects.");
      refresh();
    } catch (error) { setNote((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  if (weeks === null) return <div className="course-panel"><p className="muted">Loading the course&hellip;</p></div>;

  return <div className="course-panel">
    <h3>Course weeks</h3>
    {weeks.length === 0
      ? <p className="muted">No published weeks for <code>{classId}</code> yet.</p>
      : <>
        <div className="week-grid">
          {weeks.map((w) => (
            <button key={w.n} className={w.n === picked ? "week-chip active" : "week-chip"}
                    onClick={() => { setPicked(w.n === picked ? null : w.n); setNote(""); }}>
              <span className="wk-n">{w.n}</span>
            </button>
          ))}
        </div>
        {week && <div className="week-open">
          <p className="week-open-head">
            <strong>Week {week.n} &middot; {week.title}</strong>
            <a href={"../" + classId + "/week-" + String(week.n).padStart(2, "0") + ".html"}
               target="_blank" rel="noreferrer">Week page &rarr;</a>
          </p>
          <p className="muted">
            {Object.entries(week.files).map(([n, t]) => n + " " + t.split("\n").length).join(" · ")} lines
          </p>
          <div className="catch-row two">
            <button className="primary compact" onClick={() => setViewing("slides")}>
              Present slides
            </button>
            <button className="secondary compact" onClick={() => setViewing("plan")}>
              Lesson plan
            </button>
          </div>
          <div className="catch-row">
            <button className="secondary compact" disabled={busy} onClick={() => copyToMe(week.n)}>
              Add week {week.n} to my projects
            </button>
            <button className="primary compact" disabled={busy || !who}
                    onClick={() => copyToStudent({ kind: "week", n: week.n })}>
              {who ? "Give week " + week.n + " to " + (chosen ? chosen.name : "") : "Choose a student below"}
            </button>
          </div>
        </div>}
      </>}

    <h3 className="course-sub">Class list</h3>
    {students.length === 0
      ? <p className="muted">Nobody has joined yet.</p>
      : <select className="student-select" value={who}
                onChange={(event) => { setWho(event.target.value); setNote(""); }}>
          <option value="">Choose a student&hellip;</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}{s.username ? " (" + s.username + ")" : " - guest"} &middot; {s.projects} project{s.projects === 1 ? "" : "s"}
            </option>
          ))}
        </select>}

    {chosen && chosen.hasAccount && <div className="catch-up">
      <strong>Reset {chosen.name}&rsquo;s password</strong>
      <ResetForm token={token} classId={classId} student={chosen}
                 onDone={(message) => { setNote(message); refresh(); }} />
    </div>}

    {chosen && !chosen.hasAccount && <p className="muted" style={{ marginTop: 10 }}>
      {chosen.name} joined as a guest, so there is no password to reset. Add them as a
      student to give them an account that follows them between computers.
    </p>}

    {mine.length > 0 && <div className="catch-up">
      <strong>Copy one of my projects to them</strong>
      <select className="student-select" value={mineId}
              onChange={(event) => setMineId(event.target.value)}>
        <option value="">Choose one of my projects&hellip;</option>
        {mine.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
      </select>
      <button className="secondary compact" disabled={busy || !who || !mineId}
              onClick={() => copyToStudent({ kind: "mine", id: mineId })}>Copy it across</button>
      <p className="muted">Your API key is replaced with the placeholder on the way, so they use their own.</p>
    </div>}

    <div className="catch-up">
      {adding
        ? <EnrolForm token={token} classId={classId}
                     onDone={(message) => { setAdding(false); setNote(message); refresh(); }}
                     onCancel={() => setAdding(false)} />
        : <button className="secondary compact full" onClick={() => { setAdding(true); setNote(""); }}>
            &#43; Add a student to this class
          </button>}
    </div>
    {note && <p className="notice">{note}</p>}

    {week && viewing && <CourseViewer classId={classId} week={week.n} title={week.title}
                                      tab={viewing} onTab={setViewing}
                                      onClose={() => setViewing(null)} />}
  </div>;
}

function ResetForm({ token, classId, student, onDone }: {
  token: string; classId: string; student: ApiClassStudent; onDone: (message: string) => void;
}) {
  const [password, setPassword] = useState(suggestPassword());
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");

  async function submit() {
    if (!window.confirm(`Reset the password for ${student.name}? They will be signed out everywhere.`)) return;
    setBusy(true);
    setProblem("");
    try {
      await apiResetStudentPassword(token, classId, student.id, password);
      onDone(`${student.name} now signs in as ${student.username} with: ${password} - `
             + `write it down now, it cannot be read back. They have been signed out everywhere.`);
      setPassword(suggestPassword());
    } catch (error) { setProblem((error as Error).message || "Could not reset it."); }
    setBusy(false);
  }

  return <>
    <input value={password} onChange={(event) => setPassword(event.target.value)} />
    {problem && <p className="tf-problem">{problem}</p>}
    <div className="catch-row">
      <button className="secondary compact" disabled={busy || password.length < 6} onClick={submit}>
        {busy ? "Resetting…" : "Set this password"}
      </button>
      <button className="text-button" onClick={() => setPassword(suggestPassword())}>Suggest another</button>
    </div>
  </>;
}

/* A real account rather than a guest one. Guests are keyed by (class, name), so
   two students called Alex would share one account and overwrite each other. */
function EnrolForm({ token, classId, onDone, onCancel }: {
  token: string; classId: string; onDone: (message: string) => void; onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(suggestPassword());
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState("");

  const suggest = (full: string) =>
    full.trim().toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");

  async function submit() {
    setBusy(true);
    setProblem("");
    try {
      const made = await apiEnrolStudent(token, classId,
        { name: name.trim(), username: username.trim(), password });
      onDone("Added " + made.name + ". They sign in at the classroom under “I have an account” with " +
             "username " + made.username + " and the password you just set. Write it down for them now - " +
             "it cannot be read back.");
    } catch (error) { setProblem((error as Error).message || "Could not add them."); }
    setBusy(false);
  }

  return <div className="enrol">
    <strong>Add a student</strong>
    <label>Their name<input value={name} onChange={(event) => {
      const next = event.target.value;
      if (!username || username === suggest(name)) setUsername(suggest(next));
      setName(next);
    }} /></label>
    <label>Username<input value={username}
      onChange={(event) => setUsername(event.target.value.toLowerCase())} /></label>
    <label>Password<input value={password}
      onChange={(event) => setPassword(event.target.value)} /></label>
    <p className="muted">Shown once, and never readable again. Write it down before you press Add.</p>
    {problem && <p className="tf-problem">{problem}</p>}
    <div className="catch-row">
      <button className="primary compact"
              disabled={busy || !name.trim() || !username.trim() || password.length < 6}
              onClick={submit}>{busy ? "Adding…" : "Add student"}</button>
      <button className="text-button" onClick={onCancel}>Cancel</button>
    </div>
  </div>;
}
