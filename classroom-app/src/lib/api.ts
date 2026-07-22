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
export type ApiProject = { id: string; title: string; files: Record<string, string>; updatedAt: number };

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
export async function apiGetProject(token: string): Promise<ApiProject | null> {
  const d = await req("/project", {}, token);
  return d.project || null;
}
export async function apiSaveProject(token: string, title: string, files: Record<string, string>): Promise<void> {
  await req("/project", { method: "PUT", body: JSON.stringify({ title, files }) }, token);
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
export type ApiSiteAccess = { id: string; label: string; enabled: boolean; tools: string | string[]; print: boolean; play: string | string[]; classroom: { classId: string; role: "student" | "instructor" } | null; hours: string; updatedAt: number };
export async function apiAdminListSiteAccess(token: string): Promise<ApiSiteAccess[]> {
  return (await req("/admin/site-access", {}, token)).profiles || [];
}
export async function apiAdminUpdateSiteAccess(token: string, id: string, body: { label: string; enabled: boolean; hours: string }): Promise<void> {
  await req(`/admin/site-access/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(body) }, token);
}
export type ApiAccessLockout = { browserKey: string; attemptCount: number; lockLevel: number; lockedUntil: number | null; updatedAt: number };
export async function apiAdminListAccessLockouts(token: string): Promise<ApiAccessLockout[]> {
  return (await req("/admin/access-lockouts", {}, token)).lockouts || [];
}
export async function apiAdminClearAccessLockout(token: string, browserKey: string): Promise<void> {
  await req(`/admin/access-lockouts/${encodeURIComponent(browserKey)}`, { method: "DELETE" }, token);
}
