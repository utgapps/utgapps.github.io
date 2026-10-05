import { useEffect, useState, type ReactNode } from "react";
import { CourseViewer, type ViewerTab } from "./CourseViewer";
import { apiClassStudents, apiSeedProject, apiCourseWeeks, apiEnrolStudent, apiResetStudentPassword,
         apiListProjects, apiCreateProject, apiGetProjectById,
         type ApiClassStudent, type ApiProjectSummary, type CourseWeek } from "./lib/api";
import type { ProjectKind } from "./lib/types";

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

export function CoursePanel({ token, classId, onSlide }: { token: string; classId: string; onSlide?: (week: number, index: number) => void }) {
  const [weeks, setWeeks] = useState<CourseWeek[] | null>(null);
  const [students, setStudents] = useState<ApiClassStudent[]>([]);
  const [mine, setMine] = useState<ApiProjectSummary[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [mineId, setMineId] = useState("");
  const [who, setWho] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [adding, setAdding] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [viewing, setViewing] = useState<ViewerTab | null>(null);

  function refresh() {
    apiClassStudents(token, classId).then(setStudents).catch(() => {});
    apiListProjects(token).then(setMine).catch(() => {});
  }
  useEffect(() => { apiCourseWeeks(classId).then(setWeeks).catch(() => setWeeks([])); }, [classId]);
  useEffect(refresh, [token, classId]);

  const week = weeks?.find((w) => w.n === picked) || null;
  const chosen = students.find((s) => s.id === who);

  /* The kind travels with the files. It used to be guessed from them, which
     turned a teacher's Python game into a web project on the student's side. */
  async function filesFor(from: Source): Promise<{ files: Record<string, string>; kind: ProjectKind; label: string }> {
    if (from.kind === "week") {
      const w = weeks?.find((x) => x.n === from.n);
      if (!w) throw new Error("That week is not published.");
      return { files: w.files, kind: w.kind, label: "week " + w.n };
    }
    const project = await apiGetProjectById(token, from.id);
    if (!project) throw new Error("That project is gone.");
    return { files: project.files, kind: project.kind, label: project.title };
  }

  async function copyToStudent(from: Source) {
    if (!who) { setNote("Choose a student first."); return; }
    setBusy(true);
    setNote("");
    try {
      const { files, kind, label } = await filesFor(from);
      const title = from.kind === "week" ? "Caught up to week " + from.n : label;
      await apiSeedProject(token, classId, who, title, files, kind);
      setNote("Copied " + label + " into " + (chosen ? chosen.name : "them") +
              " as a NEW project. Nothing they already had was touched." +
              (from.kind === "mine" && kind === "web" ? " Your API key was not copied across." : ""));
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
      await apiCreateProject(token, { title: "Week " + n + " - " + w.title, kind: w.kind, files: w.files });
      setNote("Week " + n + " is now in your own projects. Open it from My projects.");
      refresh();
    } catch (error) { setNote((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  if (weeks === null) return <div className="course-panel"><p className="muted">Loading the course&hellip;</p></div>;

  /* Two sections, folded by what they act on: the week (present it, keep a
     copy) and one student (give them a week, copy them a project, reset their
     password). Every student action used to be laid out at once under a
     second class list, whether or not anybody had been chosen. */
  return <div className="course-panel">
    <PanelSection title="Weeks" initiallyOpen>
      {weeks.length === 0
        ? <p className="muted">No published weeks for <code>{classId}</code> yet.</p>
        : <>
          <div className="week-grid">
            {weeks.map((w) => (
              <button key={w.n} className={w.n === picked ? "week-chip active" : "week-chip"} title={w.title}
                      onClick={() => { setPicked(w.n === picked ? null : w.n); setNote(""); }}>
                <span className="wk-n">{w.n}</span>
              </button>
            ))}
          </div>
          {week
            ? <div className="week-open">
                <p className="week-open-head"><strong>Week {week.n} &middot; {week.title}</strong></p>
                <div className="catch-row two">
                  <button className="primary compact" onClick={() => setViewing("slides")}>Present slides</button>
                  <button className="secondary compact" onClick={() => setViewing("plan")}>Lesson plan</button>
                </div>
                <div className="week-links">
                  <a href={"../" + classId + "/week-" + String(week.n).padStart(2, "0") + ".html"}
                     target="_blank" rel="noreferrer">Week page &#8599;</a>
                  <button className="text-button" disabled={busy} onClick={() => copyToMe(week.n)}>Copy to my projects</button>
                </div>
              </div>
            : <p className="muted week-hint">Pick a week to present it.</p>}
        </>}
    </PanelSection>

    <PanelSection title="Student accounts" badge={students.length || undefined}>
      {students.length === 0
        ? <p className="muted">Nobody has joined yet.</p>
        : <select className="student-select" value={who}
                  onChange={(event) => { setWho(event.target.value); setResetting(false); setNote(""); }}>
            <option value="">Choose a student&hellip;</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}{s.username ? " (" + s.username + ")" : " - guest"} &middot; {s.projects} project{s.projects === 1 ? "" : "s"}
              </option>
            ))}
          </select>}

      {chosen && <div className="catch-up">
        {week
          ? <button className="primary compact" disabled={busy} onClick={() => copyToStudent({ kind: "week", n: week.n })}>
              Give {chosen.name} week {week.n}
            </button>
          : weeks.length > 0 && <p className="muted">Pick a week above to give {chosen.name} a fresh copy of it.</p>}
        {mine.length > 0 && <div className="catch-row">
          <select className="student-select" value={mineId} onChange={(event) => setMineId(event.target.value)}>
            <option value="">Copy one of my projects&hellip;</option>
            {mine.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          {mineId && <button className="secondary compact" disabled={busy}
                             onClick={() => copyToStudent({ kind: "mine", id: mineId })}>Copy it to {chosen.name}</button>}
        </div>}
        {chosen.hasAccount
          ? resetting
            ? <ResetForm token={token} classId={classId} student={chosen}
                         onDone={(message) => { setResetting(false); setNote(message); refresh(); }}
                         onCancel={() => setResetting(false)} />
            : <button className="text-button align-start" onClick={() => setResetting(true)}>Reset their password</button>
          : <p className="muted">{chosen.name} joined as a guest, so there is no password to reset.</p>}
      </div>}

      <div className="catch-up">
        {adding
          ? <EnrolForm token={token} classId={classId}
                       onDone={(message) => { setAdding(false); setNote(message); refresh(); }}
                       onCancel={() => setAdding(false)} />
          : <button className="text-button align-start" onClick={() => { setAdding(true); setNote(""); }}>
              &#43; Add a student account
            </button>}
      </div>
    </PanelSection>
    {note && <p className="notice">{note}</p>}

    {week && viewing && <CourseViewer classId={classId} week={week.n} title={week.title}
                                      tab={viewing} onTab={setViewing} onSlide={onSlide}
                                      onClose={() => setViewing(null)} />}
  </div>;
}

/* A heading that folds what is under it away. Folded sections unmount, so a
   half-typed form inside one is dropped when it closes - which is what closing
   it means. */
export function PanelSection({ title, badge, initiallyOpen = false, children }: {
  title: string; badge?: number; initiallyOpen?: boolean; children: ReactNode;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  return <section className={open ? "panel-section open" : "panel-section"}>
    <button className="panel-section-head" aria-expanded={open} onClick={() => setOpen((was) => !was)}>
      <span>{title}</span>
      {badge !== undefined && <span className="count">{badge}</span>}
      <span className="chevron" aria-hidden="true"></span>
    </button>
    {open && <div className="panel-section-body">{children}</div>}
  </section>;
}

function ResetForm({ token, classId, student, onDone, onCancel }: {
  token: string; classId: string; student: ApiClassStudent; onDone: (message: string) => void; onCancel: () => void;
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

  return <div className="enrol">
    <label>New password for {student.name}<input value={password} onChange={(event) => setPassword(event.target.value)} /></label>
    {problem && <p className="tf-problem">{problem}</p>}
    <div className="catch-row">
      <button className="secondary compact" disabled={busy || password.length < 6} onClick={submit}>
        {busy ? "Resetting…" : "Set this password"}
      </button>
      <div className="form-links">
        <button className="text-button" onClick={() => setPassword(suggestPassword())}>Suggest another</button>
        <button className="text-button" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>;
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
