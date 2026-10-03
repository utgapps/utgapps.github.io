// Python Coding Challenges, at /pcc/.
//
// A library of game mechanics to build from scratch. Each challenge page
// runs a finished example you can play but not read, says what your own game
// has to do, and takes a Python game project from your account to be checked.
// The first passing project for a challenge earns 1000 points; a project that
// does not pass gets a list of what is missing, and can be handed in again as
// often as it takes.
//
// It is the classroom bundle again (App renders this when the path ends in
// /pcc), signed in with the account the hub saved.

import { useEffect, useMemo, useRef, useState } from "react";
import {
  apiChallengeKey, apiChallengeProgress, apiGetProjectById, apiListProjects, apiSubmitChallenge,
  type ApiProjectSummary, type ChallengeAttempt, type ChallengeProgress,
} from "./lib/api";
import { CHALLENGES, CHALLENGE_POINTS, DIFFICULTIES, challengeById, type Challenge } from "./lib/challenges";
import { askChecker, errorVerdict, type Verdict } from "./lib/challengeCheck";
import { buildGamePreview } from "./lib/game-project";
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

function routeId(): string | null {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  return id ? id : null;
}

function points(value: number) {
  return value.toLocaleString("en-US");
}

export function ChallengesApp() {
  const token = useMemo(savedToken, []);
  const [progress, setProgress] = useState<ChallengeProgress | null>(null);
  const [problem, setProblem] = useState("");
  const [openId, setOpenId] = useState<string | null>(routeId);

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
    const follow = () => { setOpenId(routeId()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", follow);
    return () => window.removeEventListener("hashchange", follow);
  }, []);

  if (!token) return null;
  const challenge = openId ? challengeById(openId) : null;

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
          return <a className={`pcc-card${state?.passed ? " done" : ""}`} href={`#/${challenge.id}`} key={challenge.id}>
            <strong>{challenge.title}</strong>
            <span>{challenge.summary}</span>
            <small>{state?.passed
              ? `Complete ✓ +${points(CHALLENGE_POINTS)}`
              : state?.attempts
                ? `${state.attempts} ${state.attempts === 1 ? "try" : "tries"} so far`
                : `${points(CHALLENGE_POINTS)} points`}</small>
          </a>;
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
  return <div className={`pcc-last ${attempt.passed ? "passed" : "failed"}`}>
    <h2>{attempt.passed ? "Your last project passed" : "Your last try"}</h2>
    <p className="small">"{attempt.projectTitle}" · {attempts} {attempts === 1 ? "try" : "tries"} in all</p>
    {attempt.notes.length > 0 && <ul>{attempt.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>}
  </div>;
}

type Stage =
  | { step: "choose" }
  | { step: "running"; projectTitle: string; files: Record<string, string>; nonce: string; projectId: string }
  | { step: "asking"; projectTitle: string }
  | { step: "result"; verdict: Verdict; earned: number; projectTitle: string }
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

  async function submit() {
    const summary = projects?.find((project) => project.id === chosen);
    if (!summary) return;
    try {
      const project = await apiGetProjectById(token, summary.id);
      if (!project) throw new Error("That project is not there any more.");
      errorsRef.current = [];
      setStage({ step: "running", projectTitle: project.title, files: project.files, nonce: crypto.randomUUID(), projectId: project.id });
      window.setTimeout(() => { void check(project.id, project.title, project.files); }, TEST_RUN_MS);
    } catch (error) { setStage({ step: "error", message: (error as Error).message || "That project could not be opened." }); }
  }

  async function check(projectId: string, projectTitle: string, files: Record<string, string>) {
    if (closedRef.current) return;
    try {
      let verdict = errorVerdict(errorsRef.current);
      if (!verdict) {
        setStage({ step: "asking", projectTitle });
        const key = await apiChallengeKey(token);
        if (!key) throw new Error("The challenge checker has not been switched on yet. Ask your teacher.");
        verdict = await askChecker(key, challenge, files);
      }
      if (closedRef.current) return;
      const saved = await apiSubmitChallenge(token, challenge.id, { projectId, passed: verdict.passed, notes: verdict.notes });
      onProgress({ points: saved.points, challenges: saved.challenges });
      if (!closedRef.current) setStage({ step: "result", verdict, earned: saved.earned, projectTitle });
    } catch (error) {
      if (!closedRef.current) setStage({ step: "error", message: (error as Error).message || "Something went wrong. Nothing was counted - try again." });
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
                        onClick={() => setChosen(project.id)}>
                  <span className="kind-badge game">Game</span>
                  <strong>{project.title}</strong>
                  {project.owner && <small>Shared by {project.owner}</small>}
                </button>)}</div>
            : <p className="notice">{listError || "You have no Python game projects yet. Press Create a new project, choose Python game, and build the mechanic there."}</p>}
        <div className="dialog-actions">
          <button className="text-button" onClick={onClose}>Cancel</button>
          <button className="primary" disabled={!chosen} onClick={submit}>Submit</button>
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
        <p className="small">The checker is reading your code against every line of the challenge. This can take up to a minute.</p>
        <div className="pcc-spinner" aria-hidden="true" />
      </>}

      {stage.step === "result" && (stage.verdict.passed
        ? <div className="pcc-result passed">
            <h2>{"✓"} Challenge complete!</h2>
            <p className="pcc-earned">{stage.earned > 0 ? `+${points(stage.earned)} points` : alreadyEarned ? "You already earned these points - nice work doing it again." : "Passed."}</p>
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
