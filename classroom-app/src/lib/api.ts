// Client for the UTG Classroom API (Cloudflare Worker + D1).
// Persists each student's code project so they can resume outside live class.

const API = ((typeof window !== "undefined" && (window as Window & { UTG_API_URL?: string }).UTG_API_URL) as string) ||
  "https://utg-classroom-api.utgapps.workers.dev";

export type ApiAccount = { id: string; classId: string; name: string; username: string | null; isPermanent: boolean; role: string };
export type ApiProject = { id: string; title: string; files: Record<string, string>; updatedAt: number };

async function req(path: string, opts: RequestInit = {}, token?: string) {
  const headers: Record<string, string> = { "content-type": "application/json", ...(opts.headers as Record<string, string>) };
  if (token) headers.authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data;
}

export async function apiLoginGuest(classId: string, name: string): Promise<{ token: string; account: ApiAccount }> {
  return req("/login/guest", { method: "POST", body: JSON.stringify({ classId, name }) });
}
export async function apiLoginAccount(username: string, password: string): Promise<{ token: string; account: ApiAccount }> {
  return req("/login/account", { method: "POST", body: JSON.stringify({ username, password }) });
}
export async function apiGetProject(token: string): Promise<ApiProject | null> {
  const d = await req("/project", {}, token);
  return d.project || null;
}
export async function apiSaveProject(token: string, title: string, files: Record<string, string>): Promise<void> {
  await req("/project", { method: "PUT", body: JSON.stringify({ title, files }) }, token);
}

// ---- admin ----
export async function apiAdminList(token: string, classId?: string): Promise<ApiAccount[]> {
  const d = await req(`/admin/accounts${classId ? `?classId=${encodeURIComponent(classId)}` : ""}`, {}, token);
  return d.accounts || [];
}
export async function apiAdminCreate(token: string, body: { classId: string; name: string; username: string; password: string }): Promise<ApiAccount> {
  return (await req("/admin/account", { method: "POST", body: JSON.stringify(body) }, token)).account;
}
export async function apiAdminUpdate(token: string, id: string, body: Record<string, unknown>): Promise<ApiAccount> {
  return (await req(`/admin/account/${id}`, { method: "PATCH", body: JSON.stringify(body) }, token)).account;
}
export async function apiAdminDelete(token: string, id: string): Promise<void> {
  await req(`/admin/account/${id}`, { method: "DELETE" }, token);
}
