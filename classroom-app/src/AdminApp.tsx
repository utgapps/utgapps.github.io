import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { apiMe, apiLogout, apiAdminList, apiAdminCreate, apiAdminUpdate, apiAdminDelete, apiAdminSetAccountAccess, apiAdminSetClassAccess, apiAdminClearAccessLockout, apiAdminListAccessLockouts, apiAdminListSiteAccess, apiAdminUpdateSiteAccess, apiAdminReplaceSiteAccessCode, apiAdminGetDemoKey, apiAdminSetDemoKey, apiAdminGetChallengeKey, apiAdminSetChallengeKey, type ApiAccessLockout, type ApiAccount, type ApiSiteAccess } from "./lib/api";

const TOKEN_KEY = "utg_admin_token";
const MODULES = [
  { id: "pixel-art", label: "Pixel Art" }, { id: "animator", label: "Animator" },
  { id: "digital-art", label: "Digital Art" }, { id: "modeling", label: "Modeling" },
  { id: "camp", label: "Camp Coding" }, { id: "vex", label: "VEX Build Center" }, { id: "classroom", label: "Curriculum Classroom" },
  { id: "ai101", label: "AI101 Course" }, { id: "ai102", label: "AI102 Course" },
  { id: "pxp101", label: "PXP101 Course" }, { id: "cs701", label: "CS701 Course" },
  { id: "py101", label: "PY101 Course" }, { id: "py102", label: "PY102 Course" },
  { id: "py201", label: "PY201 Course" }, { id: "py202", label: "PY202 Course" },
  { id: "py301", label: "PY301 Course" }, { id: "py302", label: "PY302 Course" },
  { id: "pcc", label: "Python Coding Challenges" },
];
const GAMES = ["catch", "whack", "flappy", "subway", "geo", "crossy", "pong", "brick", "doodle", "shooter", "heli", "slice", "dodge", "stack", "fishing", "rhythm", "lander", "platformer", "cookie", "pacman", "drift"];
type CodeDraft = { label: string; enabled: boolean; tools: string[]; print: boolean; play: string[]; hours: string; newCode: string };

// The admin dashboard has no sign-in of its own: an admin signs in on the
// hub with their username and password like everyone else, and the hub's
// "Admin dashboard" button brings them here. Anyone else is sent back there.
function savedToken(): string | null {
  try { return (JSON.parse(localStorage.getItem("utg_account") || "null") || {}).token || localStorage.getItem(TOKEN_KEY); }
  catch { return localStorage.getItem(TOKEN_KEY); }
}
function toHub() { window.location.replace("../"); }

export function AdminApp() {
  const [token] = useState(savedToken);
  const [me, setMe] = useState<ApiAccount | null>(null);

  useEffect(() => {
    if (!token) { toHub(); return; }
    apiMe(token).then((account) => { if (account.role === "admin") setMe(account); else toHub(); }).catch(toHub);
  }, [token]);

  // The same log out as the hub's: the session ends on the server and every
  // saved code and account is forgotten, so the hub opens on its sign-in.
  async function signOut() {
    if (token) await apiLogout(token).catch(() => {});
    for (const key of ["utg_account", TOKEN_KEY, "utg_class_code"]) localStorage.removeItem(key);
    sessionStorage.removeItem("utg_class_code");
    toHub();
  }

  if (!token || !me) return null;
  return <Dashboard token={token} me={me} onSignOut={signOut} />;
}

function Dashboard({ token, me, onSignOut }: { token: string; me: ApiAccount; onSignOut: () => void }) {
  const [accounts, setAccounts] = useState<ApiAccount[]>([]);
  const [lockouts, setLockouts] = useState<ApiAccessLockout[]>([]);
  const [profiles, setProfiles] = useState<ApiSiteAccess[]>([]);
  const [tab, setTab] = useState<"accounts" | "codes">("accounts");
  const [classId, setClassId] = useState("");
  const [msg, setMsg] = useState("");
  const [nc, setNc] = useState({ classId: "ai102", name: "", username: "", password: "", role: "student" as "student" | "instructor" });
  const [codes, setCodes] = useState({ classId: "ai102", studentCode: "", instructorCode: "" });
  const [demoKey, setDemoKey] = useState("");
  const [demoKeySet, setDemoKeySet] = useState(false);
  const [challengeKey, setChallengeKey] = useState("");
  const [challengeKeySet, setChallengeKeySet] = useState(false);

  async function refresh() {
    try {
      const [nextAccounts, nextLockouts, nextProfiles, key] = await Promise.all([apiAdminList(token, classId || undefined), apiAdminListAccessLockouts(token), apiAdminListSiteAccess(token), apiAdminGetDemoKey(token)]);
      setAccounts(nextAccounts); setLockouts(nextLockouts); setProfiles(nextProfiles); setDemoKeySet(!!key); setMsg("");
      setChallengeKeySet(!!(await apiAdminGetChallengeKey(token)));
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
  async function registerCodes(account: ApiAccount, codes: string[]) {
    setAccounts((current) => current.map((row) => row.id === account.id ? { ...row, access: codes } : row));
    try { await apiAdminSetAccountAccess(token, account.id, codes); }
    catch (e) { setMsg((e as Error).message); refresh(); }
  }
  async function saveCodes() {
    try { await apiAdminSetClassAccess(token, codes.classId.trim().toLowerCase(), codes.studentCode, codes.instructorCode); setCodes({ ...codes, studentCode: "", instructorCode: "" }); await refresh(); setMsg("Class access codes saved."); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function saveDemoKey(value?: string) {
    const key = (value !== undefined ? value : demoKey).trim();
    try { const saved = await apiAdminSetDemoKey(token, key); setDemoKeySet(!!saved); setDemoKey(""); setMsg(saved ? "Demo AI key saved." : "Demo AI key cleared."); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function saveChallengeKey(value?: string) {
    const key = (value !== undefined ? value : challengeKey).trim();
    try { const saved = await apiAdminSetChallengeKey(token, key); setChallengeKeySet(!!saved); setChallengeKey(""); setMsg(saved ? "Challenge checker key saved." : "Challenge checker key cleared."); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function clearLockout(browserKey: string) {
    try { await apiAdminClearAccessLockout(token, browserKey); refresh(); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function updateProfile(profile: ApiSiteAccess, body: { label: string; enabled: boolean; tools: string | string[]; print: boolean; play: string | string[]; hours: string }) {
    try { await apiAdminUpdateSiteAccess(token, profile.id, body); await refresh(); setMsg("Class code profile updated."); }
    catch (e) { setMsg((e as Error).message); }
  }
  async function replaceProfileCode(profile: ApiSiteAccess, code: string) {
    try { await apiAdminReplaceSiteAccessCode(token, profile.id, code); await refresh(); setMsg("Class code replaced."); }
    catch (e) { setMsg((e as Error).message); }
  }

  const guests = accounts.filter((a) => !a.isPermanent);
  const perms = accounts.filter((a) => a.isPermanent);

  return <main className="admin-shell">
    <header className="room-header"><div><a href="../"><img className="logo-img" src="https://s3.us-west-1.amazonaws.com/utg.pictures.videos/UTGWeb/utglogoh.svg" alt="UTG Academy" /></a><span className="slash">/</span><strong>Admin</strong></div>
      <div className="connection">{me.username ? `@${me.username}` : me.name}<button className="text-button" onClick={onSignOut}>Log out</button></div></header>

    <section className="admin-body">
      <div className="admin-tabs" role="tablist" aria-label="Admin sections">
        <button className={tab === "accounts" ? "tab active" : "tab"} onClick={() => setTab("accounts")}>Accounts</button>
        <button className={tab === "codes" ? "tab active" : "tab"} onClick={() => setTab("codes")}>Class Codes</button>
      </div>
      {tab === "codes" && msg && <p className="notice">{msg}</p>}
      {tab === "accounts" && <>
      <div className="admin-toolbar">
        <label>Filter by class<input value={classId} placeholder="all classes (e.g. ai101)" onChange={(e) => setClassId(e.target.value.trim())} /></label>
        <button className="secondary" onClick={refresh}>Refresh</button>
        <span className="muted">{perms.length} accounts · {guests.length} guests</span>
      </div>
      {msg && <p className="notice">{msg}</p>}

      <div className="admin-create">
        <h3>Create a student account</h3>
        <div className="row">
          <label>Class<input value={nc.classId} placeholder="ai101" onChange={(e) => setNc({ ...nc, classId: e.target.value })} /></label>
          <label>Name<input value={nc.name} onChange={(e) => setNc({ ...nc, name: e.target.value })} /></label>
          <label>Username<input value={nc.username} autoComplete="off" onChange={(e) => setNc({ ...nc, username: e.target.value })} /></label>
          <label>Password<input value={nc.password} autoComplete="new-password" onChange={(e) => setNc({ ...nc, password: e.target.value })} /></label>
          <label>Role<select value={nc.role} onChange={(e) => setNc({ ...nc, role: e.target.value as "student" | "instructor" })}><option value="student">Student</option><option value="instructor">Instructor</option></select></label>
          <button className="primary" onClick={create}>Create</button>
        </div>
      </div>
      </>}
      {tab === "codes" && <>
      <div className="admin-create">
        <h3>Set classroom codes</h3>
        <div className="row">
          <label>Class<input value={codes.classId} placeholder="ai101" onChange={(e) => setCodes({ ...codes, classId: e.target.value })} /></label>
          <label>Student code<input value={codes.studentCode} placeholder="4+ characters" onChange={(e) => setCodes({ ...codes, studentCode: e.target.value.toUpperCase() })} /></label>
          <label>Instructor code<input value={codes.instructorCode} placeholder="4+ characters" onChange={(e) => setCodes({ ...codes, instructorCode: e.target.value.toUpperCase() })} /></label>
          <button className="primary" onClick={saveCodes}>Save codes</button>
        </div>
      </div>

      <div className="admin-create">
        <h3>Checkpoint demo AI key</h3>
        <p className="muted">The key the checkpoint slides run with, so their "Show output" can reply for real. It is stored in the classroom database and handed only to a signed-in teacher — it is never written into the published slides. {demoKeySet ? "A key is set." : "No key set yet — checkpoints show the interface only."}</p>
        <div className="row">
          <input value={demoKey} type="password" placeholder={demoKeySet ? "enter a new key to replace it" : "sk-class-… demo key"} onChange={(e) => setDemoKey(e.target.value)} />
          <button className="primary" onClick={() => saveDemoKey()} disabled={!demoKey.trim()}>Save key</button>
          {demoKeySet && <button className="secondary" onClick={() => saveDemoKey("")}>Clear</button>}
        </div>
      </div>

      <div className="admin-create">
        <h3>Python Coding Challenges checker key</h3>
        <p className="muted">The key a student's browser uses to ask the classroom AI's smart model whether a challenge project passes. Unlike the demo key this one DOES reach students - anyone whose account can open Python Coding Challenges - so give it a budget of its own on the gateway. {challengeKeySet ? "A key is set." : "No key set yet — students cannot hand challenges in."}</p>
        <div className="row">
          <input value={challengeKey} type="password" placeholder={challengeKeySet ? "enter a new key to replace it" : "sk-class-… challenge key"} onChange={(e) => setChallengeKey(e.target.value)} />
          <button className="primary" onClick={() => saveChallengeKey()} disabled={!challengeKey.trim()}>Save key</button>
          {challengeKeySet && <button className="secondary" onClick={() => saveChallengeKey("")}>Clear</button>}
        </div>
      </div>

      <SiteAccessTable rows={profiles} onUpdate={updateProfile} onReplaceCode={replaceProfileCode} />
      <AccessLockoutTable rows={lockouts} onClear={clearLockout} />
      </>}
      {tab === "accounts" && <>
      <AccountTable title="Permanent accounts" rows={perms} profiles={profiles} onUpdate={update} onRemove={remove} onRegister={registerCodes} />
      <AccountTable title={`Guests (auto-deleted after 120 days)`} rows={guests} profiles={profiles} onUpdate={update} onRemove={remove} onRegister={registerCodes} isGuest />
      </>}
    </section>
  </main>;
}

function SiteAccessTable({ rows, onUpdate, onReplaceCode }: {
  rows: ApiSiteAccess[];
  onUpdate: (profile: ApiSiteAccess, body: { label: string; enabled: boolean; tools: string | string[]; print: boolean; play: string | string[]; hours: string }) => void;
  onReplaceCode: (profile: ApiSiteAccess, code: string) => void;
}) {
  const [drafts, setDrafts] = useState<Record<string, CodeDraft>>({});
  function ids(value: string | string[], allowed: string[]) { return value === "all" ? [...allowed] : Array.isArray(value) ? value.filter((item) => allowed.includes(item)) : []; }
  function draft(profile: ApiSiteAccess): CodeDraft {
    return drafts[profile.id] || { label: profile.label, enabled: profile.enabled, tools: ids(profile.tools, MODULES.map((module) => module.id)), print: profile.print, play: ids(profile.play, GAMES), hours: profile.hours, newCode: "" };
  }
  function toggle(values: string[], id: string) { return values.includes(id) ? values.filter((item) => item !== id) : [...values, id]; }
  function scope(values: string[], all: string[]) { return values.length === all.length ? "all" : values; }
  return <div className="admin-table">
    <div className="table-head">
      <h3>Access codes <span className="count">{rows.length}</span></h3>
      <p className="muted">Each code has its own permissions. The current letter code is shown on each row; to change one, enter a replacement below.</p>
    </div>
    {rows.length === 0 ? <p className="empty">No codes yet.</p> : <div className="code-list">{rows.map((profile) => {
        const value = draft(profile);
        const set = (next: Partial<typeof value>) => setDrafts({ ...drafts, [profile.id]: { ...value, ...next } });
        const role = profile.classroom ? `${profile.classroom.classId.toUpperCase()} · ${profile.classroom.role}` : "Resource code";
        const allMods = value.tools.length === MODULES.length;
        const allGames = value.play.length === GAMES.length;
        return <details className="code-card" key={profile.id}>
          <summary className="code-summary">
            <span className="code-title"><strong>{profile.label}</strong><span className="code-kind">{role}</span></span>
            {profile.code ? <span className="code-value" title="Current letter code">{profile.code}</span> : <span className="code-value none" title="Set a code below to show it here">— — — —</span>}
            <span className={value.enabled ? "pill on" : "pill off"}>{value.enabled ? "Active" : "Off"}</span>
          </summary>
          <div className="code-editor">
            <div className="field-row">
              <label className="field">Code name<input value={value.label} aria-label={`${profile.label} name`} onChange={(e) => set({ label: e.target.value })} /></label>
              <label className="field">Active hours <span className="hint">(blank = all day)</span><input value={value.hours} aria-label={`${profile.label} hours`} placeholder="e.g. 09:00-15:00" onChange={(e) => set({ hours: e.target.value })} /></label>
              <label className="switch-field"><span>Enabled</span><input type="checkbox" className="switch" aria-label={`${profile.label} enabled`} checked={value.enabled} onChange={(e) => set({ enabled: e.target.checked })} /></label>
            </div>

            <div className="perm-group">
              <div className="perm-head"><span className="perm-title">Modules this code unlocks</span><button type="button" className="link" onClick={() => set({ tools: allMods ? [] : MODULES.map((m) => m.id) })}>{allMods ? "Clear all" : "Select all"}</button></div>
              <div className="chip-grid">{MODULES.map((m) => { const on = value.tools.includes(m.id); return <label key={m.id} className={on ? "chip sel" : "chip"}><input type="checkbox" checked={on} onChange={() => set({ tools: toggle(value.tools, m.id) })} />{m.label}</label>; })}</div>
            </div>

            <label className="check-row"><input type="checkbox" checked={value.print} onChange={(e) => set({ print: e.target.checked })} /><span>Allow printing workbooks to PDF</span></label>

            <details className="games-fold">
              <summary className="perm-head"><span className="perm-title">Playable games</span><span className="muted">{allGames ? "All games" : `${value.play.length} of ${GAMES.length}`}</span></summary>
              <div className="games-body">
                <div className="perm-head"><button type="button" className="link" onClick={() => set({ play: allGames ? [] : [...GAMES] })}>{allGames ? "Clear all" : "Select all"}</button></div>
                <div className="chip-grid">{GAMES.map((game) => { const on = value.play.includes(game); return <label key={game} className={on ? "chip sel" : "chip"}><input type="checkbox" checked={on} onChange={() => set({ play: toggle(value.play, game) })} />{game}</label>; })}</div>
              </div>
            </details>

            <div className="replace-row">
              <label className="field grow">Replace this code<input value={value.newCode} aria-label={`${profile.label} replacement code`} placeholder="New 4-letter code" onChange={(e) => set({ newCode: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4) })} /></label>
              <button className="secondary" disabled={value.newCode.length < 4} onClick={() => onReplaceCode(profile, value.newCode)}>Replace code</button>
            </div>

            <div className="code-footer">
              <span className="muted">Changes take effect the next time the code is used.</span>
              <button className="primary" onClick={() => onUpdate(profile, { label: value.label, enabled: value.enabled, tools: scope(value.tools, MODULES.map((m) => m.id)), print: value.print, play: scope(value.play, GAMES), hours: value.hours })}>Save changes</button>
            </div>
          </div>
        </details>;
      })}</div>}
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

// A dropdown of every access code, one checkbox each. Ticking a code registers
// the account to it: signed in, they see everything that code unlocks without
// typing it. Each tick saves straight away.
// A panel pinned under its button and drawn into document.body, so a table's
// overflow cannot clip it. Clicking elsewhere, Escape, scrolling or resizing
// closes it. `alignRight` lines its right edge up with the button's.
function useFloatingPanel(width: number, height: number, alignRight = false) {
  const [open, setOpen] = useState<{ top: number; left: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => { if (!panel.current?.contains(event.target as Node) && !button.current?.contains(event.target as Node)) setOpen(null); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(null); };
    const away = (event: Event) => { if (!panel.current?.contains(event.target as Node)) setOpen(null); };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", escape); window.addEventListener("scroll", away, true); window.addEventListener("resize", away);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); window.removeEventListener("scroll", away, true); window.removeEventListener("resize", away); };
  }, [open]);
  function toggle() {
    if (open) { setOpen(null); return; }
    const box = button.current!.getBoundingClientRect();
    const preferredLeft = alignRight ? box.right - width : box.left;
    setOpen({ top: Math.min(box.bottom + 4, window.innerHeight - height - 10), left: Math.max(8, Math.min(preferredLeft, window.innerWidth - width - 8)) });
  }
  return { open, close: () => setOpen(null), toggle, button, panel };
}

function CodePicker({ account, profiles, onChange }: { account: ApiAccount; profiles: ApiSiteAccess[]; onChange: (codes: string[]) => void }) {
  const { open, toggle, button, panel } = useFloatingPanel(300, 330);
  const chosen = (account.access || []).filter((id) => profiles.some((profile) => profile.id === id));
  const names = chosen.map((id) => profiles.find((profile) => profile.id === id)!.label);
  const summary = names.length === 0 ? "No codes" : names.length === 1 ? names[0] : `${names.length} codes`;
  return <>
    <button ref={button} type="button" className={chosen.length ? "code-picker on" : "code-picker"} aria-haspopup="true" aria-expanded={!!open} title={names.join(", ") || "Not registered to any code"} onClick={toggle}>
      <span>{summary}</span><span aria-hidden="true">▾</span>
    </button>
    {open && createPortal(<div ref={panel} className="code-picker-panel" role="group" aria-label={`Codes for ${account.name}`} style={{ top: open.top, left: open.left }}>
      <p className="muted">{account.name} sees everything the ticked codes unlock.</p>
      {profiles.length === 0 ? <p className="empty">No codes yet.</p> : profiles.map((profile) => {
        const on = chosen.includes(profile.id);
        const kind = profile.classroom ? `${profile.classroom.classId.toUpperCase()} · ${profile.classroom.role}` : "Resource code";
        return <label key={profile.id} className={on ? "code-option sel" : "code-option"}>
          <input type="checkbox" checked={on} onChange={() => onChange(on ? chosen.filter((id) => id !== profile.id) : [...chosen, profile.id])} />
          <span className="code-option-name"><strong>{profile.label}</strong><span className="muted">{kind}{profile.enabled ? "" : " · off"}</span></span>
          {profile.code && <span className="code-value small">{profile.code}</span>}
        </label>;
      })}
    </div>, document.body)}
  </>;
}

function AccountTable({ title, rows, profiles, onUpdate, onRemove, onRegister, isGuest }: {
  title: string; rows: ApiAccount[]; profiles: ApiSiteAccess[]; onUpdate: (id: string, body: Record<string, unknown>) => void; onRemove: (a: ApiAccount) => void; onRegister: (a: ApiAccount, codes: string[]) => void; isGuest?: boolean;
}) {
  return <div className="admin-table">
    <h3>{title} <span className="muted">({rows.length})</span></h3>
    {rows.length === 0 ? <p className="empty">None.</p> : <table><thead><tr><th>Name</th><th>Username</th><th>Class</th><th>Codes</th><th>Last seen</th><th></th></tr></thead>
      <tbody>{rows.map((a) => <tr key={a.id}>
        <td>{a.name}</td>
        <td>{a.username || <span className="muted">—</span>}</td>
        <td>{a.classId}</td>
        <td>{a.role === "admin" ? <span className="muted">Everything</span> : <CodePicker account={a} profiles={profiles} onChange={(codes) => onRegister(a, codes)} />}</td>
        <td className="muted">{new Date(a.lastSeen).toLocaleDateString()}</td>
        <td className="admin-actions"><AccountMenu account={a} isGuest={isGuest} onUpdate={onUpdate} onRemove={onRemove} /></td>
      </tr>)}</tbody></table>}
  </div>;
}

// Every change to an account behind one button, so a long roster reads as
// names rather than as a wall of Rename / Username / Password / Delete.
function AccountMenu({ account, isGuest, onUpdate, onRemove }: {
  account: ApiAccount; isGuest?: boolean; onUpdate: (id: string, body: Record<string, unknown>) => void; onRemove: (a: ApiAccount) => void;
}) {
  const { open, close, toggle, button, panel } = useFloatingPanel(190, 200, true);
  const choose = (action: () => void) => () => { close(); action(); };
  const makePermanent = () => { const username = prompt(`Username for ${account.name}?`, account.name.toLowerCase().replace(/\s+/g, "")); if (!username) return; const password = prompt("Set a password:"); if (!password) return; onUpdate(account.id, { promote: true, username, password }); };
  const rename = () => { const name = prompt("Name:", account.name); if (name != null && name !== account.name) onUpdate(account.id, { name }); };
  const changeUsername = () => { const username = prompt("New username:", account.username || ""); if (username) onUpdate(account.id, { username }); };
  const resetPassword = () => { const password = prompt(`New password for ${account.name}:`); if (password) onUpdate(account.id, { password }); };
  return <>
    <button ref={button} type="button" className="row-menu-button" aria-haspopup="menu" aria-expanded={!!open} aria-label={`Change ${account.name}`} title="Change this account" onClick={toggle}>⋯</button>
    {open && createPortal(<div ref={panel} className="row-menu" role="menu" aria-label={`Change ${account.name}`} style={{ top: open.top, left: open.left }}>
      {isGuest && <button role="menuitem" onClick={choose(makePermanent)}>Make permanent…</button>}
      <button role="menuitem" onClick={choose(rename)}>Rename…</button>
      <button role="menuitem" onClick={choose(changeUsername)}>Change username…</button>
      <button role="menuitem" onClick={choose(resetPassword)}>Reset password…</button>
      <hr />
      <button role="menuitem" className="danger" onClick={choose(() => onRemove(account))}>Delete account</button>
    </div>, document.body)}
  </>;
}
