import { useEffect, useState } from "react";
import { apiClassStudents, apiSeedProject, apiCourseWeeks,
         type ApiClassStudent, type CourseWeek } from "./lib/api";

/* The instructor's view of the course itself: the fifteen weeks, and a way to
   put any of them into a student's account.

   The code comes from the published course milestones, not from another
   student's project. That matters for three reasons: week N's canonical code is
   correct where a classmate's may be half-finished, it exists even when nobody
   else has joined yet, and copying a peer would carry their API key across -
   the absent student would then be sending requests as them, sharing their rate
   limit and appearing as them in the logs. */

export function CoursePanel({ token, classId }: { token: string; classId: string }) {
  const [weeks, setWeeks] = useState<CourseWeek[] | null>(null);
  const [students, setStudents] = useState<ApiClassStudent[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [who, setWho] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => { apiCourseWeeks(classId).then(setWeeks).catch(() => setWeeks([])); }, [classId]);
  useEffect(() => {
    apiClassStudents(token, classId).then(setStudents)
      .catch((error) => setNote((error as Error).message || "Could not load the class list."));
  }, [token, classId]);

  const week = weeks?.find((w) => w.n === picked) || null;

  async function catchUp() {
    if (!week || !who) return;
    const student = students.find((s) => s.id === who);
    setBusy(true);
    setNote("");
    try {
      await apiSeedProject(token, classId, who, `Caught up to week ${week.n}`, week.files);
      setNote(`Put week ${week.n}'s code into ${student?.name}'s projects. It is a NEW project - `
              + `anything they already had is untouched. They will see it next time they sign in.`);
      setStudents(await apiClassStudents(token, classId));
      setWho("");
    } catch (error) { setNote((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  if (weeks === null) return <div className="course-panel"><p className="muted">Loading the course…</p></div>;
  if (weeks.length === 0) {
    return <div className="course-panel">
      <h3>Course weeks</h3>
      <p className="muted">No published weeks for <code>{classId}</code> yet.</p>
    </div>;
  }

  return <div className="course-panel">
    <h3>Course weeks</h3>
    <div className="week-grid">
      {weeks.map((w) => (
        <button key={w.n} className={w.n === picked ? "week-chip active" : "week-chip"}
                onClick={() => { setPicked(w.n === picked ? null : w.n); setNote(""); }}>
          <span className="wk-n">{w.n}</span>
          <span className="wk-t">{w.title}</span>
        </button>
      ))}
    </div>

    {week && <div className="week-open">
      <p className="week-open-head">
        <strong>Week {week.n} &middot; {week.title}</strong>
        <a href={`../${classId}/week-${String(week.n).padStart(2, "0")}.html`} target="_blank" rel="noreferrer">
          Open the week page &rarr;
        </a>
      </p>
      <p className="muted">
        {Object.entries(week.files).map(([name, text]) =>
          `${name} ${text.split("\n").length} lines`).join(" · ")}
      </p>

      <div className="catch-up">
        <strong>Catch a student up to week {week.n}</strong>
        <p className="muted">For anyone who missed a lesson. This adds week {week.n}&rsquo;s
          code as a <em>new</em> project in their account and never touches what they already have.</p>
        {students.length === 0
          ? <p className="muted">No students have signed in to this class yet.</p>
          : <div className="catch-row">
              <select value={who} onChange={(event) => setWho(event.target.value)}>
                <option value="">Choose a student&hellip;</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.projects} project{s.projects === 1 ? "" : "s"})
                  </option>
                ))}
              </select>
              <button className="primary compact" disabled={!who || busy} onClick={catchUp}>
                {busy ? "Working…" : `Give them week ${week.n}`}
              </button>
            </div>}
      </div>
    </div>}
    {note && <p className="notice">{note}</p>}
  </div>;
}
