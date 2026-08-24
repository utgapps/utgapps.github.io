// Client for the UTG Classroom API (Cloudflare Worker + D1).
// Persists each student's code project so they can resume outside live class.

const localApi = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://127.0.0.1:8787" : "";
const API = ((typeof window !== "undefined" && (window as Window & { UTG_API_URL?: string }).UTG_API_URL) as string) || localApi ||
  "https://utg-classroom-api.utgapps.workers.dev";
const TURN = ((typeof window !== "undefined" && (window as Window & { UTG_TURN_URL?: string }).UTG_TURN_URL) as string) || "";
const accessDeviceKey = "utg_classroom_access_device";

function accessDevice() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(accessDeviceKey);
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(accessDeviceKey, id); }
  return id;
}

export type ApiAccount = { id: string; classId: string; name: string; username: string | null; isPermanent: boolean; role: string; createdAt: number; lastSeen: number };
export type ProjectKind = "web" | "java";
// The picker list deliberately carries no files - see the worker's GET /projects.
export type ApiProjectSummary = { id: string; title: string; kind: ProjectKind; size: number; createdAt: number; updatedAt: number; shareSlug: string | null };
export type ApiProject = ApiProjectSummary & { files: Record<string, string> };
export type ApiSharedProject = { title: string; html: string; updatedAt: number };
export type ApiClassStudent = { id: string; name: string; lastSeen: number; projects: number;
                                username: string | null; hasAccount: boolean };

/** Enrol a student into the class with a real account. Guest accounts are keyed
 *  by (class, name), so two students called Alex share one - this avoids that. */
export async function apiEnrolStudent(token: string, classId: string,
                                      body: { name: string; username: string; password: string }):
                                      Promise<{ id: string; name: string; username: string }> {
  return (await req(`/class/${encodeURIComponent(classId)}/students`, {
    method: "POST", body: JSON.stringify(body),
  }, token)).student;
}

/** The roster for a class, from the accounts table rather than from whoever
 *  happens to be in the live room right now. */
export async function apiClassStudents(token: string, classId: string): Promise<ApiClassStudent[]> {
  return (await req(`/class/${encodeURIComponent(classId)}/students`, {}, token)).students || [];
}
/** Put a fresh project into a student's account. Only ever creates - it cannot
 *  overwrite what a student already has. */
export async function apiSeedProject(token: string, classId: string, accountId: string,
                                     title: string, files: Record<string, string>): Promise<{ id: string; title: string }> {
  return (await req(`/class/${encodeURIComponent(classId)}/seed`, {
    method: "POST", body: JSON.stringify({ accountId, title, files }),
  }, token)).project;
}

export type CourseWeek = { n: number; title: string; files: Record<string, string> };
/** The generated course milestones. Cached - it is 120 KB and never changes
 *  between deploys. Returns [] for a course that has no milestones published. */
const weekCache = new Map<string, CourseWeek[]>();
export async function apiCourseWeeks(classId: string): Promise<CourseWeek[]> {
  const cached = weekCache.get(classId);
  if (cached) return cached;
  try {
    const res = await fetch(`../${classId}/milestones.json`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const weeks: CourseWeek[] = Array.isArray(data.weeks) ? data.weeks : [];
    weekCache.set(classId, weeks);
    return weeks;
  } catch { return []; }
}

async function req(path: string, opts: RequestInit = {}, token?: string) {
  const headers: Record<string, string> = { "content-type": "application/json", "x-utg-access-device": accessDevice(), ...(opts.headers as Record<string, string>) };
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data;
}

export async function apiLoginGuest(code: string, name: string, grant = ""): Promise<{ token: string; account: ApiAccount }> {
  return req("/login/guest", { method: "POST", body: JSON.stringify({ code, name, grant }) });
}
export async function apiLoginInstructor(code: string, grant = ""): Promise<{ token: string; account: ApiAccount }> {
  return req("/login/instructor", { method: "POST", body: JSON.stringify({ code, grant }) });
}
export async function apiLoginAccount(username: string, password: string): Promise<{ token: string; account: ApiAccount }> {
  return req("/login/account", { method: "POST", body: JSON.stringify({ username, password }) });
}
export async function apiBootstrapAdmin(body: { setupSecret: string; classId: string; name: string; username: string; password: string }): Promise<{ token: string; account: ApiAccount }> {
  return req("/admin/bootstrap", { method: "POST", body: JSON.stringify(body) });
}
/** @deprecated Single-project routes. Kept so a browser holding a cached
 *  pre-picker bundle keeps saving; nothing in this app calls them any more.
 *  Remove once that cache cannot plausibly still exist. */
export async function apiGetProject(token: string): Promise<ApiProject | null> {
  const d = await req("/project", {}, token);
  return d.project || null;
}
/** @deprecated See apiGetProject. */
export async function apiSaveProject(token: string, title: string, files: Record<string, string>): Promise<void> {
  await req("/project", { method: "PUT", body: JSON.stringify({ title, files }) }, token);
}

export async function apiListProjects(token: string): Promise<ApiProjectSummary[]> {
  return (await req("/projects", {}, token)).projects || [];
}
export async function apiCreateProject(token: string, body: { title: string; kind: ProjectKind; files: Record<string, string> }): Promise<ApiProject> {
  return (await req("/projects", { method: "POST", body: JSON.stringify(body) }, token)).project;
}
export async function apiGetProjectById(token: string, id: string): Promise<ApiProject | null> {
  return (await req(`/projects/${encodeURIComponent(id)}`, {}, token)).project || null;
}
export async function apiSaveProjectById(token: string, id: string, body: { title?: string; files?: Record<string, string> }): Promise<void> {
  await req(`/projects/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(body) }, token);
}
export async function apiDeleteProject(token: string, id: string): Promise<void> {
  await req(`/projects/${encodeURIComponent(id)}`, { method: "DELETE" }, token);
}
/** Publish a snapshot at an unguessable link. Off until a student asks for it. */
export async function apiShareProject(token: string, id: string): Promise<string> {
  return (await req(`/projects/${encodeURIComponent(id)}/share`, { method: "POST" }, token)).slug;
}
export async function apiUnshareProject(token: string, id: string): Promise<void> {
  await req(`/projects/${encodeURIComponent(id)}/share`, { method: "DELETE" }, token);
}
/* Leaving the tab must not lose up to 8 seconds of the autosave debounce.
   sendBeacon cannot set an Authorization header, so this is fetch + keepalive. */
export function apiSaveProjectBeacon(token: string, id: string, files: Record<string, string>): void {
  fetch(`${API}/projects/${encodeURIComponent(id)}`, {
    method: "PUT", keepalive: true, cache: "no-store",
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: JSON.stringify({ files }),
  }).catch(() => {});
}

export type ApiClassroomLink = { classId: string; role: "student" | "instructor"; label: string; lastUsed: number };
export async function apiMyClassrooms(token: string): Promise<ApiClassroomLink[]> {
  return (await req("/me/classrooms", {}, token)).classrooms || [];
}
export async function apiForgetClassroom(token: string, classId: string, role: string): Promise<void> {
  await req("/me/classrooms", { method: "DELETE", body: JSON.stringify({ classId, role }) }, token);
}

export type ApiClassroom = { record: unknown; updatedAt: number };
export async function apiGetClassroom(token: string, classId: string): Promise<ApiClassroom | null> {
  const d = await req(`/classroom/${encodeURIComponent(classId)}`, {}, token);
  return d.classroom || null;
}
export async function apiSaveClassroom(token: string, classId: string, record: unknown): Promise<void> {
  await req(`/classroom/${encodeURIComponent(classId)}`, { method: "PUT", body: JSON.stringify({ record }) }, token);
}
export type ApiLiveRoom = { classId: string; peerId: string; expiresAt: number };
export async function apiOpenLiveRoom(token: string, classId: string): Promise<ApiLiveRoom> {
  return (await req("/live/open", { method: "POST", body: JSON.stringify({ classId }) }, token)).room;
}
export async function apiGetLiveRoom(token: string, classId: string): Promise<ApiLiveRoom | null> {
  return (await req(`/live/${encodeURIComponent(classId)}`, {}, token)).room || null;
}
export async function apiCloseLiveRoom(token: string, classId: string): Promise<void> {
  await req(`/live/${encodeURIComponent(classId)}`, { method: "DELETE" }, token);
}
export async function apiGetTurnCredentials(token: string): Promise<RTCIceServer[]> {
  if (!TURN) return [];
  const res = await fetch(TURN, { cache: "no-store", headers: { authorization: `Bearer ${token}` } });
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({}));
  return Array.isArray(data.iceServers) ? data.iceServers : [];
}

// ---- media ----
export type ApiMedia = { id: string; name: string; kind: "image" | "audio"; mime: string; size: number; url: string; createdAt: number };
export async function apiListMedia(token: string): Promise<ApiMedia[]> {
  const d = await req("/media", {}, token);
  return d.media || [];
}
export async function apiUploadMedia(token: string, kind: "image" | "audio", mime: string, name: string, blob: Blob): Promise<ApiMedia> {
  const res = await fetch(`${API}/media?kind=${kind}&mime=${encodeURIComponent(mime)}&name=${encodeURIComponent(name)}`, {
    method: "POST", cache: "no-store", headers: { authorization: `Bearer ${token}` }, body: blob,
  });
  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((d && d.error) || "Upload failed.");
  return d.media;
}
export async function apiDeleteMedia(token: string, id: string): Promise<void> {
  await req(`/media/${id}`, { method: "DELETE" }, token);
}

// ---- admin ----
export async function apiAdminList(token: string, classId?: string): Promise<ApiAccount[]> {
  const d = await req(`/admin/accounts${classId ? `?classId=${encodeURIComponent(classId)}` : ""}`, {}, token);
  return d.accounts || [];
}
export async function apiAdminCreate(token: string, body: { classId: string; name: string; username: string; password: string; role?: "student" | "instructor" }): Promise<ApiAccount> {
  return (await req("/admin/account", { method: "POST", body: JSON.stringify(body) }, token)).account;
}
export async function apiAdminUpdate(token: string, id: string, body: Record<string, unknown>): Promise<ApiAccount> {
  return (await req(`/admin/account/${id}`, { method: "PATCH", body: JSON.stringify(body) }, token)).account;
}
export async function apiAdminDelete(token: string, id: string): Promise<void> {
  await req(`/admin/account/${id}`, { method: "DELETE" }, token);
}
export async function apiAdminSetClassAccess(token: string, classId: string, studentCode: string, instructorCode: string): Promise<void> {
  await req(`/admin/class-access/${encodeURIComponent(classId)}`, { method: "PUT", body: JSON.stringify({ studentCode, instructorCode }) }, token);
}
export type ApiSiteAccess = { id: string; code?: string | null; label: string; enabled: boolean; tools: string | string[]; print: boolean; play: string | string[]; classroom: { classId: string; role: "student" | "instructor" } | null; curriculumEnabled: boolean; hours: string; updatedAt: number };
export async function apiAdminListSiteAccess(token: string): Promise<ApiSiteAccess[]> {
  return (await req("/admin/site-access", {}, token)).profiles || [];
}
export async function apiAdminUpdateSiteAccess(token: string, id: string, body: { label: string; enabled: boolean; tools: string | string[]; print: boolean; play: string | string[]; hours: string }): Promise<void> {
  await req(`/admin/site-access/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }, token);
}
export async function apiAdminReplaceSiteAccessCode(token: string, id: string, code: string): Promise<void> {
  await req(`/admin/site-access/${encodeURIComponent(id)}/code`, { method: "PUT", body: JSON.stringify({ code }) }, token);
}
export type ApiAccessLockout = { browserKey: string; attemptCount: number; lockLevel: number; lockedUntil: number | null; updatedAt: number };
export async function apiAdminListAccessLockouts(token: string): Promise<ApiAccessLockout[]> {
  return (await req("/admin/access-lockouts", {}, token)).lockouts || [];
}
export async function apiAdminClearAccessLockout(token: string, browserKey: string): Promise<void> {
  await req(`/admin/access-lockouts/${encodeURIComponent(browserKey)}`, { method: "DELETE" }, token);
}
