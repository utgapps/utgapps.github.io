import { useEffect, useState } from "react";
import { apiLoginAccount, apiBootstrapAdmin, apiAdminList, apiAdminCreate, apiAdminUpdate, apiAdminDelete, apiAdminSetClassAccess, apiAdminClearAccessLockout, apiAdminListAccessLockouts, apiAdminListSiteAccess, apiAdminUpdateSiteAccess, type ApiAccessLockout, type ApiAccount, type ApiSiteAccess } from "./lib/api";

const TOKEN_KEY = "utg_admin_token";

export function AdminApp() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [me, setMe] = useState<ApiAccount | null>(null);
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [msg, setMsg] = useState("");

  function signOut() { localStorage.removeItem(TOKEN_KEY); setToken(null); setMe(null); }
  function onAuthed(t: string, account: ApiAccount) {
    if (account.role !== "admin") { setMsg("That account is not an admin."); return; }
    localStorage.setItem(TOKEN_KEY, t); setToken(t); setMe(account); setMsg("");
  }

  if (token && me) return <Dashboard token={token} me={me} onSignOut={signOut} />;
  if (token && !me) return <Dashboard token={token} me={null} onSignOut={signOut} />; // token from storage; dashboard validates

  return <main className="admin-auth"><section className="join-card">
    <a className="back" href="./"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a>
    <p className="eyebrow">Classroom admin</p>
    <h1>{mode === "login" ? "Admin sign in" : "First-time setup"}</h1>
    {mode === "login" ? <LoginForm onAuthed={onAuthed} setMsg={setMsg} /> : <SetupForm onAuthed={onAuthed} setMsg={setMsg} />}
    <p className="notice">{msg}</p>
    <button className="text-button" onClick={() => { setMsg(""); setMode(mode === "login" ? "setup" : "login"); }}>
      {mode === "login" ? "First time? Set up the admin account →" : "← Back to sign in"}
    </button>
  </section></main>;
}

function LoginForm({ onAuthed, setMsg }: { onAuthed: (t: string, a: ApiAccount) => void; setMsg: (s: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    try { const { token, account } = await apiLoginAccount(username.trim(), password); onAuthed(token, account); }
    catch (e) { setMsg((e as Error).message); }
  }
  return <>
    <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
    <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} /></label>
    <button className="primary full" onClick={submit}>Sign in</button>
  </>;
}

function SetupForm({ onAuthed, setMsg }: { onAuthed: (t: string, a: ApiAccount) => void; setMsg: (s: string) => void }) {
  const [setupSecret, setSecret] = useState("");
  const [name, setName] = useState("Teacher");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function submit() {
    try { const { token, account } = await apiBootstrapAdmin({ setupSecret: setupSecret.trim(), classId: "*", name: name.trim(), username: username.trim(), password }); onAuthed(token, account); }
    catch (e) { setMsg((e as Error).message); }
  }
  return <>
    <label>Setup secret<input value={setupSecret} onChange={(e) => setSecret(e.target.value)} placeholder="one-time code" /></label>
    <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} /></label>
    <label>Admin username<input value={username} onChange={(e) => setUsername(e.target.value)} /></label>
    <label>Admin password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
    <button className="primary full" onClick={submit}>Create admin</button>
  </>;
}

function Dashboard({ token, me, onSignOut }: { token: string; me: ApiAccount | null; onSignOut: () => void }) {
  const [accounts, setAccounts] = useState<ApiAccount[]>([]);
  const [lockouts, setLockouts] = useState<ApiAccessLockout[]>([]);
  const [profiles, setProfiles] = useState<ApiSiteAccess[]>([]);
  const [tab, setTab] = useState<"accounts" | "codes">("accounts");
  const [classId, setClassId] = useState("");
  const [msg, setMsg] = useState("");
  const [nc, setNc] = useState({ classId: "ai102", name: "", username: "", password: "", role: "student" as "student" | "instructor" });
  const [codes, setCodes] = useState({ classId: "ai102", studentCode: "", instructorCode: "" });

  async function refresh() {
    try {
      const [nextAccounts, nextLockouts, nextProfiles] = await Promise.all([apiAdminList(token, classId || undefined), apiAdminListAccessLockouts(token), apiAdminListSiteAccess(token)]);
      setAccounts(nextAccounts); setLockouts(nextLockouts); setProfiles(nextProfiles); setMsg("");
    }
    catch (e) { setMsg((e as Error).message); if ((e as Error).message.toLowerCase().includes("sign")) onSignOut(); }
  }
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [classId]);

  async function create() {
    if (!nc.name || !nc.username || !nc.password) { setMsg("Name, username and password are required."); return; }
    try { await apiAdminCreate(token, nc); setNc({ ...nc, name: "", username: "", password: "" }); refresh(); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function update(id: string, body: Record<string, unknown>) {
    try { await apiAdminUpdate(token, id, body); refresh(); } catch (e) { setMsg((e as Error).message); }
  }
  async function remove(a: ApiAccount) {
    if (!confirm(`Delete "${a.name}"${a.username ? ` (@${a.username})` : ""} and all their work? This cannot be undone.`)) return;
    try { await apiAdminDelete(token, a.id); refresh(); } catch (e) { setMsg((e as Error).message); }
  }
  async function saveCodes() {
    try { await apiAdminSetClassAccess(token, codes.classId.trim().toLowerCase(), codes.studentCode, codes.instructorCode); setCodes({ ...codes, studentCode: "", instructorCode: "" }); setMsg("Class access codes saved."); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function clearLockout(browserKey: string) {
    try { await apiAdminClearAccessLockout(token, browserKey); refresh(); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function updateProfile(profile: ApiSiteAccess, body: { label: string; enabled: boolean; hours: string }) {
    try { await apiAdminUpdateSiteAccess(token, profile.id, body); await refresh(); setMsg("Class code profile updated."); }
    catch (e) { setMsg((e as Error).message); }
  }

  const guests = accounts.filter((a) => !a.isPermanent);
  const perms = accounts.filter((a) => a.isPermanent);

  return <main className="admin-shell">
    <header className="room-header"><div><a href="./"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span className="slash">/</span><strong>Admin</strong></div>
      <div className="connection">{me?.username ? `@${me.username}` : "signed in"}<button className="text-button" onClick={onSignOut}>Sign out</button></div></header>

    <section className="admin-body">
      <div className="admin-tabs" role="tablist" aria-label="Admin sections">
        <button className={tab === "accounts" ? "tab active" : "tab"} onClick={() => setTab("accounts")}>Accounts</button>
        <button className={tab === "codes" ? "tab active" : "tab"} onClick={() => setTab("codes")}>Class Codes</button>
      </div>
      {tab === "codes" && msg && <p className="notice">{msg}</p>}
      {tab === "accounts" && <>
      <div className="admin-toolbar">
        <label>Filter by class<input value={classId} placeholder="all classes (e.g. ai102)" onChange={(e) => setClassId(e.target.value.trim())} /></label>
        <button className="secondary" onClick={refresh}>Refresh</button>
        <span className="muted">{perms.length} accounts · {guests.length} guests</span>
      </div>
      {msg && <p className="notice">{msg}</p>}

      <div className="admin-create">
        <h3>Create a student account</h3>
        <div className="row">
          <input value={nc.classId} placeholder="class (ai102)" onChange={(e) => setNc({ ...nc, classId: e.target.value })} />
          <input value={nc.name} placeholder="name" onChange={(e) => setNc({ ...nc, name: e.target.value })} />
          <input value={nc.username} placeholder="username" onChange={(e) => setNc({ ...nc, username: e.target.value })} />
          <input value={nc.password} placeholder="password" onChange={(e) => setNc({ ...nc, password: e.target.value })} />
          <select value={nc.role} onChange={(e) => setNc({ ...nc, role: e.target.value as "student" | "instructor" })}><option value="student">Student</option><option value="instructor">Instructor</option></select>
          <button className="primary" onClick={create}>Create</button>
        </div>
      </div>
      </>}
      {tab === "codes" && <>
      <div className="admin-create">
        <h3>Set classroom codes</h3>
        <div className="row">
          <input value={codes.classId} placeholder="class (ai102)" onChange={(e) => setCodes({ ...codes, classId: e.target.value })} />
          <input value={codes.studentCode} placeholder="student code (4+ characters)" onChange={(e) => setCodes({ ...codes, studentCode: e.target.value.toUpperCase() })} />
          <input value={codes.instructorCode} placeholder="instructor code (4+ characters)" onChange={(e) => setCodes({ ...codes, instructorCode: e.target.value.toUpperCase() })} />
          <button className="primary" onClick={saveCodes}>Save codes</button>
        </div>
      </div>

      <SiteAccessTable rows={profiles} onUpdate={updateProfile} />
      <AccessLockoutTable rows={lockouts} onClear={clearLockout} />
      </>}
      {tab === "accounts" && <>
      <AccountTable title="Permanent accounts" rows={perms} onUpdate={update} onRemove={remove} />
      <AccountTable title={`Guests (auto-deleted after 120 days)`} rows={guests} onUpdate={update} onRemove={remove} isGuest />
      </>}
    </section>
  </main>;
}

function SiteAccessTable({ rows, onUpdate }: { rows: ApiSiteAccess[]; onUpdate: (profile: ApiSiteAccess, body: { label: string; enabled: boolean; hours: string }) => void }) {
  const [drafts, setDrafts] = useState<Record<string, { label: string; enabled: boolean; hours: string }>>({});
  function draft(profile: ApiSiteAccess) { return drafts[profile.id] || { label: profile.label, enabled: profile.enabled, hours: profile.hours }; }
  function tools(profile: ApiSiteAccess) { return Array.isArray(profile.tools) ? profile.tools.join(", ") : profile.tools; }
  return <div className="admin-table">
    <h3>Access profiles <span className="muted">({rows.length})</span></h3>
    <p className="muted">Codes are never displayed again. Changes take effect when the code is next checked.</p>
    {rows.length === 0 ? <p className="empty">No code profiles.</p> : <table><thead><tr><th>Profile</th><th>Classroom role</th><th>Resources</th><th>Hours</th><th>Active</th><th></th></tr></thead>
      <tbody>{rows.map((profile) => {
        const value = draft(profile);
        const set = (next: Partial<typeof value>) => setDrafts({ ...drafts, [profile.id]: { ...value, ...next } });
        return <tr key={profile.id}>
          <td><input value={value.label} aria-label={`${profile.label} label`} onChange={(e) => set({ label: e.target.value })} /></td>
          <td>{profile.classroom ? `${profile.classroom.classId.toUpperCase()} ${profile.classroom.role}` : <span className="muted">Resource code</span>}</td>
          <td className="muted">{tools(profile)}</td>
          <td><input value={value.hours} aria-label={`${profile.label} hours`} placeholder="all day" onChange={(e) => set({ hours: e.target.value })} /></td>
          <td><input type="checkbox" aria-label={`${profile.label} active`} checked={value.enabled} onChange={(e) => set({ enabled: e.target.checked })} /></td>
          <td className="admin-actions"><button className="text-button" onClick={() => onUpdate(profile, value)}>Save</button></td>
        </tr>;
      })}</tbody></table>}
  </div>;
}

function AccessLockoutTable({ rows, onClear }: { rows: ApiAccessLockout[]; onClear: (browserKey: string) => void }) {
  function status(row: ApiAccessLockout) {
    if (row.lockLevel >= 4 && row.lockedUntil == null) return "Permanent lock";
    if (row.lockedUntil && row.lockedUntil > Date.now()) return `Locked until ${new Date(row.lockedUntil).toLocaleString()}`;
    return `${row.attemptCount}/5 distinct incorrect codes`;
  }
  return <div className="admin-table">
    <h3>Class code lockouts <span className="muted">({rows.length})</span></h3>
    {rows.length === 0 ? <p className="empty">No active browser code records.</p> : <table><thead><tr><th>Browser</th><th>Status</th><th>Lock level</th><th>Updated</th><th></th></tr></thead>
      <tbody>{rows.map((row) => <tr key={row.browserKey}>
        <td className="muted">{row.browserKey.slice(0, 12)}</td><td>{status(row)}</td><td>{row.lockLevel}/4</td><td className="muted">{new Date(row.updatedAt).toLocaleString()}</td>
        <td className="admin-actions"><button className="text-button danger" onClick={() => onClear(row.browserKey)}>Clear lock</button></td>
      </tr>)}</tbody></table>}
  </div>;
}

function AccountTable({ title, rows, onUpdate, onRemove, isGuest }: {
  title: string; rows: ApiAccount[]; onUpdate: (id: string, body: Record<string, unknown>) => void; onRemove: (a: ApiAccount) => void; isGuest?: boolean;
}) {
  return <div className="admin-table">
    <h3>{title} <span className="muted">({rows.length})</span></h3>
    {rows.length === 0 ? <p className="empty">None.</p> : <table><thead><tr><th>Name</th><th>Username</th><th>Class</th><th>Last seen</th><th></th></tr></thead>
      <tbody>{rows.map((a) => <tr key={a.id}>
        <td>{a.name}</td>
        <td>{a.username || <span className="muted">—</span>}</td>
        <td>{a.classId}</td>
        <td className="muted">{new Date(a.lastSeen).toLocaleDateString()}</td>
        <td className="admin-actions">
          {isGuest && <button className="text-button" onClick={() => { const u = prompt(`Username for ${a.name}?`, a.name.toLowerCase().replace(/\s+/g, "")); if (!u) return; const p = prompt("Set a password:"); if (!p) return; onUpdate(a.id, { promote: true, username: u, password: p }); }}>Make permanent</button>}
          <button className="text-button" onClick={() => { const n = prompt("Name:", a.name); if (n != null && n !== a.name) onUpdate(a.id, { name: n }); }}>Rename</button>
          <button className="text-button" onClick={() => { const u = prompt("New username:", a.username || ""); if (u) onUpdate(a.id, { username: u }); }}>Username</button>
          <button className="text-button" onClick={() => { const p = prompt(`New password for ${a.name}:`); if (p) onUpdate(a.id, { password: p }); }}>Password</button>
          <button className="text-button danger" onClick={() => onRemove(a)}>Delete</button>
        </td>
      </tr>)}</tbody></table>}
  </div>;
}
