import { useEffect, useState } from "react";
import { apiListProjects, apiCreateProject, apiDeleteProject, apiSaveProjectById, type ApiProjectSummary } from "./lib/api";
import { starterFiles, type ProjectKind } from "./lib/types";

const LOGO = "https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg";

function edited(at: number) {
  const minutes = Math.round((Date.now() - at) / 60000);
  if (minutes < 1) return "edited just now";
  if (minutes < 60) return `edited ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `edited ${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `edited ${days} day${days === 1 ? "" : "s"} ago`;
}

export function ProjectPicker({ token, className, status, live, onOpen, onSignOut }: {
  token: string; className: string; status: string; live: boolean;
  onOpen: (id: string) => void; onSignOut: () => void;
}) {
  const [projects, setProjects] = useState<ApiProjectSummary[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    apiListProjects(token)
      .then((list) => {
        setProjects(list);
        // A student signing in for the first time should never meet an empty
        // screen with a button on it; go straight to naming their first project.
        if (list.length === 0) setCreating(true);
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
  async function remove(project: ApiProjectSummary) {
    if (!window.confirm(`Delete "${project.title}"? You have 30 days to ask your teacher to get it back.`)) return;
    try {
      await apiDeleteProject(token, project.id);
      setProjects((list) => (list || []).filter((item) => item.id !== project.id));
      setNote(`Deleted "${project.title}".`);
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
      <div className="connection"><i className={live ? "online" : "offline"}></i>{live ? "Live with teacher" : "Saved to your account"}<button className="text-button" onClick={onSignOut}>Sign out</button></div>
    </header>
    <section className="picker-body">
      <div className="workspace-top"><div><p className="eyebrow">My projects</p><h1>Choose a project</h1></div></div>
      {note && <p className="notice">{note}</p>}
      {projects === null
        ? <p className="empty">Loading your projects…</p>
        : <div className="project-grid">
            {projects.map((project) => <div className="project-card" key={project.id}>
              <button className="project-open" onClick={() => onOpen(project.id)}>
                <span className={`kind-badge ${project.kind}`}>{project.kind === "java" ? "Java" : "Web"}</span>
                <strong>{project.title}</strong>
                <small>{edited(project.updatedAt)}</small>
              </button>
              <div className="project-actions">
                <button className="text-button" onClick={() => rename(project)}>Rename</button>
                <button className="text-button danger" onClick={() => remove(project)}>Delete</button>
              </div>
            </div>)}
            <button className="project-card new" onClick={() => setCreating(true)}><span className="plus">＋</span><strong>New project</strong></button>
          </div>}
      <p className="notice">{status}</p>
    </section>
    {creating && <NewProjectDialog
      suggested={`Project ${(projects?.length || 0) + 1}`}
      onCreate={create}
      onCancel={() => setCreating(false)}
      canCancel={(projects?.length || 0) > 0}
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
        {/* Deliberately secondary, and honest about it. A chooser whose second
            option quietly does nothing reads as broken software to a 12-year-old. */}
        <button className={kind === "java" ? "kind-card secondary selected" : "kind-card secondary"} onClick={() => setKind("java")}>
          <strong>Java <em>· writing only</em></strong>
          <span>Write and save Java. Running it in the browser is not built yet.</span>
        </button>
      </div>
      <div className="dialog-actions">
        {canCancel && <button className="text-button" onClick={onCancel}>Cancel</button>}
        <button className="primary" disabled={!title.trim()} onClick={() => onCreate(title.trim(), kind)}>Create project</button>
      </div>
    </div>
  </div>;
}
