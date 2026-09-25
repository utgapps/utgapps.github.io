import { useEffect, useState } from "react";
import { apiListProjects, apiCreateProject, apiDeleteProject, apiSaveProjectById, type ApiProjectSummary, type ApiCoeditRoom } from "./lib/api";
import { CoEditJoinDialog } from "./CoEdit";
import { GAME_KIND, starterFiles, type ProjectKind } from "./lib/types";

const LOGO = "https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg";

/* Module scope on purpose: it is per browsing session, not per mount. */
let offeredFirstProject = false;

const KIND_LABEL: Record<ProjectKind, string> = { web: "Web", java: "Java", [GAME_KIND]: "Game" };
/* The badge colour is picked by class name, and the stored kind is not a
   name anybody should read - see GAME_KIND. */
const KIND_CLASS: Record<ProjectKind, string> = { web: "web", java: "java", [GAME_KIND]: "game" };

function edited(at: number) {
  const minutes = Math.round((Date.now() - at) / 60000);
  if (minutes < 1) return "edited just now";
  if (minutes < 60) return `edited ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `edited ${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `edited ${days} day${days === 1 ? "" : "s"} ago`;
}

export function ProjectPicker({ token, className, status, live, onOpen, onSignOut, onJoinCoedit, exitLabel = "Sign out" }: {
  token: string; className: string; status: string; live: boolean;
  onOpen: (id: string) => void; onSignOut: () => void;
  // Redeeming a friend's code. Optional so a screen that has nowhere to put a
  // co-edit session simply does not offer one.
  onJoinCoedit?: (room: ApiCoeditRoom) => void;
  // A teacher browsing their own projects is stepping out of the class, not
  // out of their account - the same control needs a different name there.
  exitLabel?: string;
}) {
  const [projects, setProjects] = useState<ApiProjectSummary[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    apiListProjects(token)
      .then((list) => {
        setProjects(list);
        /* A student signing in for the first time should never meet an empty
           screen with a button on it; go straight to naming their first
           project. Once only: a child who is here to join somebody else's
           project owns nothing yet, and meeting this dialog every time they
           leave a session is an obstacle, not a shortcut. */
        if (list.length === 0 && !offeredFirstProject) { offeredFirstProject = true; setCreating(true); }
      })
      .catch(() => { setProjects([]); setNote("Your projects could not be loaded. Check your connection and refresh."); });
  }, [token]);

  async function create(title: string, kind: ProjectKind) {
    setCreating(false); setNote("Creating…");
    try {
      const made = await apiCreateProject(token, { title, kind, files: starterFiles(kind) });
      onOpen(made.id);
    } catch (error) { setNote((error as Error).message || "That project could not be created."); }
  }
  /* Leaving and deleting are the same request - the server knows which of the
     two this student is - but they are not the same thing to ask a child, so
     the wording has to be the truth: a shared project you leave is still
     there, and its owner still has it. */
  async function remove(project: ApiProjectSummary) {
    const question = project.owner
      ? `Leave "${project.title}"? It stays on ${project.owner}'s projects screen, and you would need their code again to come back.`
      : `Delete "${project.title}"? You have 30 days to ask your teacher to get it back.`;
    if (!window.confirm(question)) return;
    try {
      await apiDeleteProject(token, project.id);
      setProjects((list) => (list || []).filter((item) => item.id !== project.id));
      setNote(project.owner ? `You left "${project.title}".` : `Deleted "${project.title}".`);
    } catch (error) { setNote((error as Error).message || "That project could not be deleted."); }
  }
  async function rename(project: ApiProjectSummary) {
    const next = window.prompt("New name", project.title);
    if (!next || next.trim() === project.title) return;
    try {
      await apiSaveProjectById(token, project.id, { title: next.trim() });
      setProjects((list) => (list || []).map((item) => item.id === project.id ? { ...item, title: next.trim() } : item));
    } catch (error) { setNote((error as Error).message || "That project could not be renamed."); }
  }

  return <main className="picker-shell">
    <header className="room-header">
      <div><a href="../"><img className="logo-img" src={LOGO} alt="UTG Academy" /></a><span className="slash">/</span><strong>{className}</strong></div>
      <div className="connection"><i className={live ? "online" : "offline"}></i>{live ? "Live with teacher" : "Saved to your account"}<button className="text-button" onClick={onSignOut}>{exitLabel}</button></div>
    </header>
    <section className="picker-body">
      <div className="workspace-top"><div><p className="eyebrow">My projects</p><h1>Choose a project</h1></div></div>
      {note && <p className="notice">{note}</p>}
      {projects === null
        ? <p className="empty">Loading your projects…</p>
        : <div className="project-grid">
            {/* Shared projects sit in the same grid as your own, because that
                is what they are now: yours to open on any day. The card says
                whose it is, so that renaming or leaving one is never a
                surprise. */}
            {projects.map((project) => <div className={`project-card${project.owner ? " shared" : ""}`} key={project.id}>
              <button className="project-open" onClick={() => onOpen(project.id)}>
                <span className={`kind-badge ${KIND_CLASS[project.kind] ?? "web"}`}>{KIND_LABEL[project.kind] ?? "Web"}</span>
                <strong>{project.title}</strong>
                <small>{edited(project.updatedAt)}</small>
                {project.owner
                  ? <small className="shared-by">Shared by {project.owner}</small>
                  : project.members > 0 && <small className="shared-by">Shared with {project.members} {project.members === 1 ? "person" : "people"}</small>}
              </button>
              <div className="project-actions">
                <button className="text-button" onClick={() => rename(project)}>Rename</button>
                <button className="text-button danger" onClick={() => remove(project)}>{project.owner ? "Leave" : "Delete"}</button>
              </div>
            </div>)}
            <button className="project-card new" onClick={() => setCreating(true)}><span className="plus">＋</span><strong>Project</strong><small>Start your own</small></button>
            {onJoinCoedit && <button className="project-card coedit" onClick={() => setJoining(true)}><span className="plus">＋</span><strong>Shared project</strong><small>Type a code you were given</small></button>}
          </div>}
      <p className="notice">{status}</p>
    </section>
    {creating && <NewProjectDialog
      suggested={`Project ${(projects?.length || 0) + 1}`}
      onCreate={create}
      onCancel={() => setCreating(false)}
      // A child who signed in only to join a friend's code must be able to get
      // out of this dialog, even though they own nothing yet.
      canCancel={(projects?.length || 0) > 0 || !!onJoinCoedit}
    />}
    {joining && onJoinCoedit && <CoEditJoinDialog
      token={token}
      onJoined={(room) => { setJoining(false); onJoinCoedit(room); }}
      onCancel={() => setJoining(false)}
    />}
  </main>;
}

function NewProjectDialog({ suggested, onCreate, onCancel, canCancel }: {
  suggested: string; onCreate: (title: string, kind: ProjectKind) => void; onCancel: () => void; canCancel: boolean;
}) {
  const [title, setTitle] = useState(suggested);
  const [kind, setKind] = useState<ProjectKind>("web");
  return <div className="dialog-backdrop">
    <div className="dialog" role="dialog" aria-modal="true" aria-label="New project">
      <h2>New project</h2>
      <label>Project name<input value={title} maxLength={80} onChange={(event) => setTitle(event.target.value)} onKeyDown={(event) => event.key === "Enter" && title.trim() && onCreate(title.trim(), kind)} /></label>
      <p className="eyebrow">What are you writing?</p>
      <div className="kind-choices">
        <button className={kind === "web" ? "kind-card selected" : "kind-card"} onClick={() => setKind("web")}>
          <strong>HTML / CSS / JavaScript</strong>
          <span>Web pages that run right here, with a preview and a console.</span>
        </button>
        <button className={kind === GAME_KIND ? "kind-card selected" : "kind-card"} onClick={() => setKind(GAME_KIND)}>
          <strong>Python game</strong>
          <span>Python games that run right here. You get a monster on the screen the moment you press Run.</span>
        </button>
        <button className={kind === "java" ? "kind-card selected" : "kind-card"} onClick={() => setKind("java")}>
          <strong>Java</strong>
          <span>Java programs that run right here, in a console you can type into.</span>
        </button>
      </div>
      <div className="dialog-actions">
        {canCancel && <button className="text-button" onClick={onCancel}>Cancel</button>}
        <button className="primary" disabled={!title.trim()} onClick={() => onCreate(title.trim(), kind)}>Create project</button>
      </div>
    </div>
  </div>;
}
