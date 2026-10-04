// Python Coding Challenges, at /pcc/.
//
// A library of game mechanics to build from scratch. Each challenge page
// runs a finished example you can play but not read, says what your own game
// has to do, and takes a Python game project from your account to be checked.
// The first passing project for a challenge earns 1000 points; a project that
// does not pass gets a list of what is missing, and can be handed in again as
// often as it takes.
//
// An admin also gets each challenge's submissions log: every project handed
// in, opened to read and run, passed by hand, or taken back. A project passed
// by hand is kept, and a later project the checker turns down still passes if
// the worker finds it a close match for one of those.
//
// It is the classroom bundle again (App renders this when the path ends in
// /pcc), signed in with the account the hub saved.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  apiApproveSubmission, apiApprovedSolution, apiChallengeKey, apiChallengeLog, apiChallengeProgress, apiChallengeSubmission,
  apiDeleteApproved, apiGetProjectById, apiListProjects, apiRevokeSubmission, apiSubmitChallenge,
  type ApiProjectSummary, type ApprovedSolution, type ChallengeAttempt, type ChallengeLogEntry, type ChallengeProgress,
  type ChallengeSubmission,
} from "./lib/api";
import { CHALLENGES, CHALLENGE_POINTS, DIFFICULTIES, challengeById, type Challenge } from "./lib/challenges";
import { askChecker, errorVerdict, NO_ANSWER, NO_ANSWER_MS, type Verdict } from "./lib/challengeCheck";
import { buildGamePreview, useGameAudio } from "./lib/game-project";
import { isPreviewMessage, PREVIEW_ALLOW, PREVIEW_SANDBOX } from "./lib/preview";
import { GAME_KIND } from "./lib/types";

const LOGO = "https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg";
/* How long a handed-in game runs before the checker reads it. Long enough for
   every start panel and a couple of seconds of loops; short enough that a
   child does not wonder whether anything is happening. */
const TEST_RUN_MS = 3500;

function savedToken(): string | null {
  try {
    const saved = JSON.parse(localStorage.getItem("utg_account") || "null") as { token?: string } | null;
    return saved && saved.token ? saved.token : null;
  } catch { return null; }
}

/* #/<challenge>, and for an admin #/<challenge>/submissions,
   #/<challenge>/submissions/<id> and #/<challenge>/approved/<id>. */
type Route = { id: string | null; view: "page" | "log" | "submission" | "approved"; itemId: string };
function readRoute(): Route {
  const [id = "", section = "", itemId = ""] = decodeURIComponent(window.location.hash.replace(/^#\/?/, "")).split("/");
  if (!id) return { id: null, view: "page", itemId: "" };
  if (section === "submissions") return { id, view: itemId ? "submission" : "log", itemId };
  if (section === "approved" && itemId) return { id, view: "approved", itemId };
  return { id, view: "page", itemId: "" };
}

function points(value: number) {
  return value.toLocaleString("en-US");
}

function when(at: number) {
  return new Date(at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export function ChallengesApp() {
  const token = useMemo(savedToken, []);
  const [progress, setProgress] = useState<ChallengeProgress | null>(null);
  const [problem, setProblem] = useState("");
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    /* Projects belong to accounts, so there is nothing to do here without
       one. The hub is where you sign in. */
    if (!token) { window.location.replace("../"); return; }
    apiChallengeProgress(token).then(setProgress).catch((error) => {
      const message = (error as Error).message || "";
      setProblem(/not signed in/i.test(message)
        ? "You have been signed out. Go back to the start page and sign in again."
        : message || "Your challenges could not be loaded. Check your connection and refresh.");
    });
  }, [token]);

  useEffect(() => {
    const follow = () => { setRoute(readRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, []);

  if (!token) return null;
  const challenge = route.id ? challengeById(route.id) : null;
  const reviewing = !!progress?.admin && !!challenge && route.view !== "page";
  /* After a pass is granted or taken back, the counts on the library change. */
  const refresh = () => { apiChallengeProgress(token).then(setProgress).catch(() => undefined); };

  return <main className="pcc-shell">
    <header className="room-header">
      <div><a href="../"><img className="logo-img" src={LOGO} alt="UTG Academy" /></a><span className="slash">/</span>
        <a className="pcc-home" href="#/">Python Coding Challenges</a></div>
      <div className="connection">
        {progress && <span className="pcc-points" title="Your challenge points">{points(progress.points)} points</span>}
        <a className="text-button" href="../">Back to resources</a>
      </div>
    </header>
    {problem
      ? <section className="pcc-body"><p className="notice">{problem}</p></section>
      : !progress
        ? <section className="pcc-body"><p className="empty">Loading your challenges…</p></section>
        : challenge && reviewing
          ? route.view === "log"
            ? <SubmissionsLog key={challenge.id} token={token} challenge={challenge} />
            : route.view === "submission"
              ? <SubmissionView key={route.itemId} token={token} challenge={challenge} submissionId={route.itemId} onChanged={refresh} />
              : <ApprovedView key={route.itemId} token={token} challenge={challenge} approvedId={route.itemId} />
          : challenge
            ? <ChallengePage key={challenge.id} token={token} challenge={challenge} progress={progress} onProgress={setProgress} />
            : <Library progress={progress} />}
  </main>;
}

function Library({ progress }: { progress: ChallengeProgress }) {
  const done = CHALLENGES.filter((challenge) => progress.challenges[challenge.id]?.passed).length;
  return <section className="pcc-body">
    <p className="eyebrow">Python Coding Challenges</p>
    <h1>Build it from scratch</h1>
    <p className="pcc-lead">
      Every challenge is one game mechanic. Play the example, work out how it must be made, then build it
      yourself in a Python game project. Hand your project in and the checker reads your code: get it right
      and you earn {points(CHALLENGE_POINTS)} points.
    </p>
    <p className="pcc-tally">{done} of {CHALLENGES.length} challenges complete</p>
    {DIFFICULTIES.map((level) => <div className="pcc-level" key={level.id}>
      <h2><span className={`pcc-chip ${level.id}`}>{level.title}</span></h2>
      <p className="small">{level.blurb}</p>
      <div className="pcc-grid">
        {CHALLENGES.filter((challenge) => challenge.difficulty === level.id).map((challenge) => {
          const state = progress.challenges[challenge.id];
          const card = <a className={`pcc-card${state?.passed ? " done" : ""}`} href={`#/${challenge.id}`} key={challenge.id}>
            <strong>{challenge.title}</strong>
            <span>{challenge.summary}</span>
            <small>{state?.passed
              ? `Complete ✓ +${points(CHALLENGE_POINTS)}`
              : state?.attempts
                ? `${state.attempts} ${state.attempts === 1 ? "try" : "tries"} so far`
                : `${points(CHALLENGE_POINTS)} points`}</small>
          </a>;
          if (!progress.admin) return card;
          /* Beside the card, not inside it: a link inside a link is not one. */
          return <div className="pcc-card-wrap" key={challenge.id}>
            {card}
            <ReviewButton challengeId={challenge.id} total={progress.review?.[challenge.id]?.total || 0} />
          </div>;
        })}
      </div>
    </div>)}
  </section>;
}

function ChallengePage({ token, challenge, progress, onProgress }: {
  token: string; challenge: Challenge; progress: ChallengeProgress; onProgress: (next: ChallengeProgress) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const state = progress.challenges[challenge.id];
  const level = DIFFICULTIES.find((entry) => entry.id === challenge.difficulty)!;
  /* A fresh nonce per mount, so a restarted example cannot hear the last one. */
  const [runId, setRunId] = useState(0);
  const exampleDocument = useMemo(() => buildGamePreview(challenge.files, crypto.randomUUID()), [challenge, runId]);

  return <section className="pcc-body">
    <a className="text-button pcc-back" href="#/">{"←"} All challenges</a>
    <div className="pcc-title">
      <h1>{challenge.title}</h1>
      <span className={`pcc-chip ${challenge.difficulty}`}>{level.title}</span>
      {state?.passed && <span className="pcc-chip done">Complete {"✓"}</span>}
      {progress.admin && <a className="secondary pcc-title-review" href={`#/${challenge.id}/submissions`}>
        View submissions ({points(progress.review?.[challenge.id]?.total || 0)})</a>}
    </div>
    <p className="pcc-lead">{challenge.description}</p>

    <div className="pcc-stage">
      <iframe key={runId} title={`${challenge.title} example`} sandbox={PREVIEW_SANDBOX}
              srcDoc={exampleDocument} />
    </div>
    <div className="pcc-stage-bar">
      <span className="small">Click the game first, then use the controls below.</span>
      <button className="text-button" onClick={() => setRunId((value) => value + 1)}>Restart example</button>
    </div>

    <div className="pcc-columns">
      <div>
        <h2>Controls</h2>
        <table className="pcc-controls"><tbody>
          {challenge.controls.map(([keys, action]) => <tr key={keys}><th>{keys}</th><td>{action}</td></tr>)}
        </tbody></table>
      </div>
      <div>
        <h2>Your game must</h2>
        <ul className="pcc-requirements">{challenge.requirements.map((line) => <li key={line}>{line}</li>)}</ul>
      </div>
    </div>

    {state?.last && <LastAttempt attempt={state.last} attempts={state.attempts} />}

    <div className="pcc-actions">
      <p className="small">You cannot see the example's code - building it is the challenge. Make a <strong>Python game</strong> project, build the mechanic, then hand it in here.</p>
      <div>
        <a className="secondary" href="../classroom/?projects=1" target="_blank" rel="noopener">Create a new project</a>
        <button className="primary" onClick={() => setSubmitting(true)}>Submit an existing project</button>
      </div>
    </div>

    {submitting && <SubmitDialog token={token} challenge={challenge} alreadyEarned={!!state?.passed}
                                 onProgress={onProgress} onClose={() => setSubmitting(false)} />}
  </section>;
}

function LastAttempt({ attempt, attempts }: { attempt: ChallengeAttempt; attempts: number }) {
  /* The checker's notes on a project a teacher has since passed are not
     things to work on any more. */
  const byTeacher = attempt.passed && (attempt.approved || attempt.matched);
  return <div className={`pcc-last ${attempt.passed ? "passed" : "failed"}`}>
    <h2>{attempt.passed ? "Your last project passed" : "Your last try"}</h2>
    <p className="small">"{attempt.projectTitle}" · {attempts} {attempts === 1 ? "try" : "tries"} in all</p>
    {attempt.passed && attempt.approved && <p className="small">Your teacher looked at it and passed it.</p>}
    {attempt.passed && attempt.matched && <p className="small">It works the same way as a project your teacher approved.</p>}
    {!byTeacher && attempt.notes.length > 0 && <ul>{attempt.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>}
  </div>;
}

type Stage =
  | { step: "choose" }
  | { step: "running"; projectTitle: string; files: Record<string, string>; nonce: string; projectId: string }
  | { step: "asking"; projectTitle: string }
  | { step: "result"; verdict: Verdict; earned: number; projectTitle: string; matched: boolean }
  | { step: "error"; message: string };

function SubmitDialog({ token, challenge, alreadyEarned, onProgress, onClose }: {
  token: string; challenge: Challenge; alreadyEarned: boolean;
  onProgress: (next: ChallengeProgress) => void; onClose: () => void;
}) {
  const [projects, setProjects] = useState<ApiProjectSummary[] | null>(null);
  const [chosen, setChosen] = useState<string>("");
  const [stage, setStage] = useState<Stage>({ step: "choose" });
  const [listError, setListError] = useState("");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const errorsRef = useRef<string[]>([]);

  useEffect(() => {
    apiListProjects(token)
      .then((list) => setProjects(list.filter((project) => project.kind === GAME_KIND)))
      .catch((error) => { setProjects([]); setListError((error as Error).message || "Your projects could not be loaded."); });
  }, [token]);

  /* While the handed-in game runs, keep every error it reports. */
  const runNonce = stage.step === "running" ? stage.nonce : "";
  useEffect(() => {
    if (!runNonce) return;
    function onMessage(event: MessageEvent) {
      const message = isPreviewMessage(event, frameRef.current, runNonce);
      if (message && message.kind === "error") errorsRef.current.push(message.text);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [runNonce]);

  /* Closing the dialog mid-check must not carry on into a submission. */
  const closedRef = useRef(false);
  useEffect(() => { closedRef.current = false; return () => { closedRef.current = true; }; }, []);

  /* One hand-in at a time. Submit used to stay pressable while the project
     loaded, so an impatient double click started two checks and two
     submissions. The ref closes the gap before React has re-rendered the
     button as disabled; the number lets an attempt that has been given up on
     (a minute without an answer) notice it and stop, rather than landing a
     submission after the student has already pressed Submit again. */
  const [handingIn, setHandingIn] = useState(false);
  const handingInRef = useRef(false);
  const attemptRef = useRef(0);
  const abandoned = (attempt: number) => closedRef.current || attemptRef.current !== attempt;

  function endAttempt(attempt: number, next: Stage) {
    if (abandoned(attempt)) return;
    attemptRef.current++;
    handingInRef.current = false;
    setHandingIn(false);
    setStage(next);
  }

  /* The worker's own calls get the same minute the checker's do. */
  function withinMinute<T>(request: Promise<T>): Promise<T> {
    return Promise.race([request, new Promise<T>((_, reject) =>
      window.setTimeout(() => reject(new Error(NO_ANSWER)), NO_ANSWER_MS))]);
  }

  async function submit() {
    const summary = projects?.find((project) => project.id === chosen);
    if (!summary || handingInRef.current) return;
    handingInRef.current = true;
    setHandingIn(true);
    const attempt = ++attemptRef.current;
    try {
      const project = await withinMinute(apiGetProjectById(token, summary.id));
      if (!project) throw new Error("That project is not there any more.");
      if (abandoned(attempt)) return;
      errorsRef.current = [];
      setStage({ step: "running", projectTitle: project.title, files: project.files, nonce: crypto.randomUUID(), projectId: project.id });
      window.setTimeout(() => { void check(attempt, project.id, project.title, project.files); }, TEST_RUN_MS);
    } catch (error) { endAttempt(attempt, { step: "error", message: (error as Error).message || "That project could not be opened." }); }
  }

  async function check(attempt: number, projectId: string, projectTitle: string, files: Record<string, string>) {
    if (abandoned(attempt)) return;
    try {
      let verdict = errorVerdict(errorsRef.current);
      const ranClean = !verdict;
      if (!verdict) {
        setStage({ step: "asking", projectTitle });
        const key = await withinMinute(apiChallengeKey(token));
        if (!key) throw new Error("The challenge checker has not been switched on yet. Ask your teacher.");
        verdict = await askChecker(key, challenge, files);
      }
      if (abandoned(attempt)) return;
      const saved = await withinMinute(apiSubmitChallenge(token, challenge.id, { projectId, passed: verdict.passed, notes: verdict.notes, ranClean }));
      if (abandoned(attempt)) return;
      onProgress({ points: saved.points, challenges: saved.challenges, admin: saved.admin, review: saved.review });
      /* The worker has the last word: a project the checker turned down can
         still be a close match for one a teacher approved. */
      const matched = !verdict.passed && saved.passed && saved.matched;
      if (matched) verdict = { passed: true, notes: [] };
      endAttempt(attempt, { step: "result", verdict, earned: saved.earned, projectTitle, matched });
    } catch (error) {
      endAttempt(attempt, { step: "error", message: (error as Error).message || "Something went wrong. Nothing was counted - try again." });
    }
  }

  const busy = stage.step === "running" || stage.step === "asking";

  return <div className="dialog-backdrop">
    <div className="dialog pcc-dialog" role="dialog" aria-modal="true" aria-label="Submit a project">
      {stage.step === "choose" && <>
        <h2>Submit a project for {challenge.title}</h2>
        <p className="small">Pick one of your Python game projects. You can hand in again as often as you like, with this project or a different one.</p>
        {projects === null
          ? <p className="empty">Loading your projects…</p>
          : projects.length
            ? <div className="pcc-project-list">{projects.map((project) =>
                <button key={project.id} className={chosen === project.id ? "pcc-project selected" : "pcc-project"}
                        disabled={handingIn} onClick={() => setChosen(project.id)}>
                  <span className="kind-badge game">Game</span>
                  <strong>{project.title}</strong>
                  {project.owner && <small>Shared by {project.owner}</small>}
                </button>)}</div>
            : <p className="notice">{listError || "You have no Python game projects yet. Press Create a new project, choose Python game, and build the mechanic there."}</p>}
        <div className="dialog-actions">
          <button className="text-button" onClick={onClose}>Cancel</button>
          <button className="primary" disabled={!chosen || handingIn} onClick={submit}>{handingIn ? "Submitting…" : "Submit"}</button>
        </div>
      </>}

      {stage.step === "running" && <>
        <h2>Running "{stage.projectTitle}"…</h2>
        <p className="small">Your game runs for a few seconds first, to catch any errors.</p>
        <div className="pcc-test-stage">
          <iframe ref={frameRef} title="Your game" sandbox={PREVIEW_SANDBOX} allow={PREVIEW_ALLOW}
                  srcDoc={buildGamePreview(stage.files, stage.nonce)} />
        </div>
      </>}

      {stage.step === "asking" && <>
        <h2>Checking "{stage.projectTitle}"…</h2>
        <p className="small">The checker is reading your code against every line of the challenge. This can take a minute or two.</p>
        <div className="pcc-spinner" aria-hidden="true" />
      </>}

      {stage.step === "result" && (stage.verdict.passed
        ? <div className="pcc-result passed">
            <h2>{"✓"} Challenge complete!</h2>
            <p className="pcc-earned">{stage.earned > 0 ? `+${points(stage.earned)} points` : alreadyEarned ? "You already earned these points - nice work doing it again." : "Passed."}</p>
            {stage.matched && <p className="small">Your game works the same way as a project your teacher approved.</p>}
            {stage.verdict.notes.length > 0 && <ul>{stage.verdict.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>}
          </div>
        : <div className="pcc-result failed">
            <h2>Not yet</h2>
            <p className="small">"{stage.projectTitle}" does not do everything the challenge asks. No points this time - here is what to work on:</p>
            <ul>{stage.verdict.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
          </div>)}

      {stage.step === "error" && <>
        <h2>That did not work</h2>
        <p className="notice">{stage.message}</p>
      </>}

      {!busy && stage.step !== "choose" && <div className="dialog-actions">
        <button className="text-button" onClick={onClose}>Close</button>
        {!(stage.step === "result" && stage.verdict.passed) &&
          <button className="primary" onClick={() => setStage({ step: "choose" })}>Submit again</button>}
      </div>}
    </div>
  </div>;
}

/* ---------------------------------------------------------------- review */

function ReviewButton({ challengeId, total }: { challengeId: string; total: number }) {
  return <a className="pcc-review-button" href={`#/${challengeId}/submissions`}
            title="View submissions" aria-label={`View submissions (${total})`}>
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="currentColor" d="M5 3h10l4 4v14H5zm9 1.5V8h3.5zM8 11v1.6h8V11zm0 3.5v1.6h8v-1.6zm0 3.5v1.6h5V18z" />
    </svg>
    {total > 0 && <span>{total > 999 ? "999+" : total}</span>}
  </a>;
}

/** How a project in the log came to pass, or did not. */
function ResultChip({ entry }: { entry: Pick<ChallengeLogEntry, "passed" | "approvedAt" | "matchedId" | "matchScore"> }) {
  if (!entry.passed) return <span className="pcc-result-chip notyet">Not yet</span>;
  if (entry.approvedAt) return <span className="pcc-result-chip teacher">Approved by teacher</span>;
  if (entry.matchedId) return <span className="pcc-result-chip matched">Matched {Math.round((entry.matchScore || 0) * 100)}%</span>;
  return <span className="pcc-result-chip checker">AI checker</span>;
}

type Filter = "all" | "notyet" | "passed";

function SubmissionsLog({ token, challenge }: { token: string; challenge: Challenge }) {
  const [log, setLog] = useState<{ submissions: ChallengeLogEntry[]; approved: ApprovedSolution[] } | null>(null);
  const [problem, setProblem] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [latestOnly, setLatestOnly] = useState(false);

  const load = () => apiChallengeLog(token, challenge.id).then(setLog)
    .catch((error) => setProblem((error as Error).message || "The submissions could not be loaded."));
  useEffect(() => { void load(); }, [token, challenge.id]);

  async function removeApproved(solution: ApprovedSolution) {
    if (!window.confirm(`Remove "${solution.projectTitle}" by ${solution.student} from the approved projects?\n\n` +
                        "Its student keeps their points. New projects will no longer be compared with it.")) return;
    try { await apiDeleteApproved(token, solution.id); await load(); }
    catch (error) { window.alert((error as Error).message || "That did not work."); }
  }

  const rows = useMemo(() => {
    if (!log) return [];
    const needle = search.trim().toLowerCase();
    const seen = new Set<string>();
    return log.submissions.filter((entry) => {
      /* Newest first, so the first row seen for a student is their latest. */
      if (latestOnly) { if (seen.has(entry.accountId)) return false; seen.add(entry.accountId); }
      if (filter === "passed" && !entry.passed) return false;
      if (filter === "notyet" && entry.passed) return false;
      return !needle || entry.student.toLowerCase().includes(needle) || entry.projectTitle.toLowerCase().includes(needle);
    });
  }, [log, filter, search, latestOnly]);

  const students = log ? new Set(log.submissions.map((entry) => entry.accountId)).size : 0;
  const earned = log ? new Set(log.submissions.filter((entry) => entry.points > 0).map((entry) => entry.accountId)).size : 0;
  const total = log ? log.submissions.length : 0;
  const passedCount = log ? log.submissions.filter((entry) => entry.passed).length : 0;
  const tabs: [Filter, string][] = [["all", `All (${total})`], ["notyet", `Not yet (${total - passedCount})`], ["passed", `Passed (${passedCount})`]];

  return <section className="pcc-body">
    <a className="text-button pcc-back" href={`#/${challenge.id}`}>{"←"} {challenge.title}</a>
    <p className="eyebrow">Submissions log</p>
    <h1>{challenge.title}</h1>
    {problem && <p className="notice warning">{problem}</p>}
    {!log && !problem && <p className="empty">Loading submissions…</p>}
    {log && <>
      <p className="pcc-lead">{points(total)} {total === 1 ? "project" : "projects"} from {points(students)} {students === 1 ? "student" : "students"} · {points(earned)} earned the points</p>

      <div className="pcc-log-tools">
        <div className="pcc-tabs" role="tablist">
          {tabs.map(([value, label]) => <button key={value} role="tab" aria-selected={filter === value}
                                                className={filter === value ? "selected" : ""} onClick={() => setFilter(value)}>{label}</button>)}
        </div>
        <label className="pcc-latest"><input type="checkbox" checked={latestOnly} onChange={(event) => setLatestOnly(event.target.checked)} /> Latest per student</label>
        <input className="pcc-search" type="search" placeholder="Search student or project" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>

      {rows.length === 0
        ? <p className="empty">{total ? "Nothing matches." : "Nobody has handed in a project for this challenge yet."}</p>
        : <div className="pcc-log-table-wrap"><table className="pcc-log-table">
            <thead><tr><th>Student</th><th>Project</th><th>Handed in</th><th>Result</th><th>Points</th><th /></tr></thead>
            <tbody>{rows.map((entry) => <tr key={entry.id} className={entry.passed ? "passed" : ""}>
              <td><strong>{entry.student}</strong>{entry.classId && entry.classId !== "*" && <small>{entry.classId}</small>}</td>
              <td>{entry.projectTitle}</td>
              <td className="pcc-nowrap">{when(entry.at)}</td>
              <td><ResultChip entry={entry} /></td>
              <td>{entry.points ? `+${points(entry.points)}` : "–"}</td>
              <td><a className="secondary pcc-open" href={`#/${challenge.id}/submissions/${entry.id}`}>Open</a></td>
            </tr>)}</tbody>
          </table></div>}

      <h2 className="pcc-approved-heading">Approved projects ({log.approved.length})</h2>
      <p className="small">Projects you passed by hand. When the AI checker turns a project down and it ran with no errors, it is
        compared with each of these, and a close match passes.</p>
      {log.approved.length === 0
        ? <p className="empty">None yet. Open a project above and press Grant {points(CHALLENGE_POINTS)} points to add one.</p>
        : <ul className="pcc-approved-list">{log.approved.map((solution) => <li key={solution.id}>
            <div><strong>{solution.projectTitle}</strong><small>{solution.student} · approved by {solution.approvedBy || "an admin"}, {when(solution.at)}</small></div>
            <a className="secondary" href={`#/${challenge.id}/approved/${solution.id}`}>View</a>
            <button className="text-button pcc-remove" onClick={() => void removeApproved(solution)}>Remove</button>
          </li>)}</ul>}
    </>}
  </section>;
}

function SubmissionView({ token, challenge, submissionId, onChanged }: {
  token: string; challenge: Challenge; submissionId: string; onChanged: () => void;
}) {
  const [submission, setSubmission] = useState<ChallengeSubmission | null>(null);
  const [problem, setProblem] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => apiChallengeSubmission(token, submissionId).then(setSubmission)
    .catch((error) => setProblem((error as Error).message || "That submission could not be loaded."));
  useEffect(() => { void load(); }, [token, submissionId]);

  async function grant() {
    if (!submission) return;
    setBusy(true); setMessage("");
    try {
      const { earned } = await apiApproveSubmission(token, submission.id);
      setMessage((earned > 0
        ? `${submission.student} earned ${points(earned)} points.`
        : `${submission.student} already had the points for this challenge.`) +
        ` This project is now an approved project for ${challenge.title}.`);
      await load(); onChanged();
    } catch (error) { setMessage((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  async function takeBack() {
    if (!submission) return;
    if (!window.confirm(`Take back the pass for "${submission.projectTitle}" by ${submission.student}?\n\n` +
                        "Its points go too, unless they have another passing project for this challenge. " +
                        "If you approved it, it stops being an approved project.")) return;
    setBusy(true); setMessage("");
    try { await apiRevokeSubmission(token, submission.id); setMessage("The pass was taken back."); await load(); onChanged(); }
    catch (error) { setMessage((error as Error).message || "That did not work."); }
    setBusy(false);
  }

  return <section className="pcc-body">
    <a className="text-button pcc-back" href={`#/${challenge.id}/submissions`}>{"←"} {challenge.title} submissions</a>
    {problem && <p className="notice warning">{problem}</p>}
    {!submission && !problem && <p className="empty">Loading the project…</p>}
    {submission && <>
      <div className="pcc-title">
        <h1>{submission.projectTitle}</h1>
        <ResultChip entry={submission} />
      </div>
      <p className="small">{submission.student} · handed in {when(submission.at)}
        {submission.points > 0 && ` · earned ${points(submission.points)} points`}
        {submission.approvedAt && ` · approved by ${submission.approvedBy || "an admin"}, ${when(submission.approvedAt)}`}
        {submission.matchedId && ` · a ${Math.round((submission.matchScore || 0) * 100)}% match with ` +
          (submission.matchedStudent ? `${submission.matchedStudent}'s approved project` : "an approved project")}</p>

      <div className="pcc-review-actions">
        {!submission.approvedAt && <button className="primary" disabled={busy} onClick={() => void grant()}>
          {submission.passed ? "Add to approved projects" : `Grant ${points(CHALLENGE_POINTS)} points`}</button>}
        {submission.passed && <button className="secondary" disabled={busy} onClick={() => void takeBack()}>Take back the pass</button>}
        <span className="small">{submission.approvedAt
          ? "Projects the checker turns down are compared with this one."
          : submission.passed
            ? "Adding it keeps a copy of its code, to compare later projects with."
            : "Granting passes it and keeps a copy of its code, to compare later projects with."}</span>
      </div>
      {message && <p className="notice">{message}</p>}

      {submission.notes.length > 0 && <div className={`pcc-last ${submission.passed ? "passed" : "failed"}`}>
        <h2>What the student was told</h2>
        <ul>{submission.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
      </div>}

      <CodeAndRun files={submission.files} title={submission.projectTitle} />
    </>}
  </section>;
}

function ApprovedView({ token, challenge, approvedId }: { token: string; challenge: Challenge; approvedId: string }) {
  const [solution, setSolution] = useState<{ student: string; projectTitle: string; files: Record<string, string>; at: number } | null>(null);
  const [problem, setProblem] = useState("");
  useEffect(() => {
    apiApprovedSolution(token, approvedId).then(setSolution)
      .catch((error) => setProblem((error as Error).message || "That approved project could not be loaded."));
  }, [token, approvedId]);

  async function remove() {
    if (!solution || !window.confirm(`Remove "${solution.projectTitle}" from the approved projects?\n\nIts student keeps their points.`)) return;
    try { await apiDeleteApproved(token, approvedId); window.location.hash = `#/${challenge.id}/submissions`; }
    catch (error) { setProblem((error as Error).message || "That did not work."); }
  }

  return <section className="pcc-body">
    <a className="text-button pcc-back" href={`#/${challenge.id}/submissions`}>{"←"} {challenge.title} submissions</a>
    {problem && <p className="notice warning">{problem}</p>}
    {!solution && !problem && <p className="empty">Loading the project…</p>}
    {solution && <>
      <p className="eyebrow">Approved project</p>
      <div className="pcc-title"><h1>{solution.projectTitle}</h1></div>
      <p className="small">{solution.student} · approved {when(solution.at)}. This is the copy kept when it was approved, so it stays the same if the student keeps editing.</p>
      <div className="pcc-review-actions"><button className="secondary" onClick={() => void remove()}>Remove from approved projects</button></div>
      <CodeAndRun files={solution.files} title={solution.projectTitle} />
    </>}
  </section>;
}

/** A handed-in project's code, one file at a time, beside the game itself. */
function CodeAndRun({ files, title }: { files: Record<string, string>; title: string }) {
  const names = useMemo(() => Object.keys(files).sort((a, b) =>
    (a === "game.txt" ? -1 : b === "game.txt" ? 1 : 0) || a.localeCompare(b)), [files]);
  /* The longest panel first: that is where the mechanic is, not set_room. */
  const [open, setOpen] = useState(() => names.filter((name) => name.endsWith(".py"))
    .sort((a, b) => files[b].length - files[a].length)[0] || names[0] || "");
  const audio = useGameAudio(files);
  const [run, setRun] = useState<{ nonce: string } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const gameDocument = useMemo(() => run ? buildGamePreview(files, run.nonce, audio) : "", [run, files, audio]);

  useEffect(() => {
    if (!run) return;
    const nonce = run.nonce;
    function onMessage(event: MessageEvent) {
      const message = isPreviewMessage(event, frameRef.current, nonce);
      if (message && message.kind === "error") setErrors((list) => list.includes(message.text) ? list : [...list, message.text]);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [run]);

  const start = () => { setErrors([]); setRun({ nonce: crypto.randomUUID() }); };
  const lines = (files[open] || "").replace(/\n$/, "").split("\n");

  return <div className="pcc-review-grid">
    <div className="pcc-code">
      <div className="pcc-file-tabs">{names.map((name) =>
        <button key={name} className={name === open ? "selected" : ""} onClick={() => setOpen(name)}>{name}</button>)}</div>
      <pre><code>{lines.map((line, index) => <span key={index} className="pcc-code-line"><span className="pcc-line-number">{index + 1}</span>{line || " "}{"\n"}</span>)}</code></pre>
    </div>
    <div className="pcc-run">
      <div className="pcc-stage">
        {run
          ? <iframe ref={frameRef} key={run.nonce} title={`${title} running`} sandbox={PREVIEW_SANDBOX} allow={PREVIEW_ALLOW} srcDoc={gameDocument} />
          : <button className="primary pcc-run-button" onClick={start}>{"▶"} Run the game</button>}
      </div>
      <div className="pcc-stage-bar">
        <span className="small">{run ? "Click the game first, then use the challenge's controls." : "The game runs here, sounds and all."}</span>
        {run && <button className="text-button" onClick={start}>Restart</button>}
      </div>
      {run && (errors.length
        ? <div className="pcc-last failed"><h2>Errors while it ran</h2><ul>{errors.map((text) => <li key={text}>{text}</li>)}</ul></div>
        : <p className="small pcc-clean">No errors so far.</p>)}
    </div>
  </div>;
}
