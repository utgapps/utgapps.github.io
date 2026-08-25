/* UTG Classroom API: private class-code login, saved projects, and live rooms. */

const enc = new TextEncoder();
const dec = new TextDecoder();
const DAY = 86400000;
const HOUR = 60 * 60 * 1000;
const JSON_LIMIT = 750000;
const CLASSROOM_LIMIT = 1200000;
const SITE_TOOLS = ["pixel-art", "animator", "digital-art", "modeling", "camp", "vex", "classroom", "ai101", "ai102"];
const PROJECT_KINDS = ["web", "java"];
const PROJECT_LIMIT = 30;
const PLAY_GAMES = ["catch", "whack", "flappy", "subway", "geo", "crossy", "pong", "brick", "doodle", "shooter", "heli", "slice", "dodge", "stack", "fishing", "rhythm", "lander", "platformer", "cookie", "pacman", "drift"];

class HttpError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

function configuredOrigins(env) {
  return (env.ALLOWED_ORIGINS || "https://utgapps.github.io,http://localhost:5173,http://127.0.0.1:5173,http://localhost:8000,http://127.0.0.1:8000,http://localhost:8001,http://127.0.0.1:8001")
    .split(",").map((value) => value.trim()).filter(Boolean);
}
function cors(request, env) {
  const origin = request.headers.get("origin");
  if (!origin) return {};
  if (!configuredOrigins(env).includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, x-utg-access-device",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
function response(request, env, body, status = 200) {
  const headers = cors(request, env);
  if (headers === null) return new Response(JSON.stringify({ error: "Origin is not allowed." }), { status: 403, headers: { "Content-Type": "application/json" } });
  return new Response(JSON.stringify(body), { status, headers: { ...headers, "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
function bad(request, env, message, status = 400) { return response(request, env, { error: message }, status); }

function toHex(buf) { return [...new Uint8Array(buf)].map((byte) => byte.toString(16).padStart(2, "0")).join(""); }
function fromHex(hex) { return new Uint8Array(hex.match(/.{1,2}/g).map((part) => parseInt(part, 16))); }
function rndHex(bytes) { return toHex(crypto.getRandomValues(new Uint8Array(bytes))); }
function normalizeCode(value) { return String(value || "").trim().toUpperCase(); }
function validCode(value) { return /^(?:[A-Z0-9]{4}|[A-Z0-9-]{8,32})$/.test(value); }

async function sha256(text) { return toHex(await crypto.subtle.digest("SHA-256", enc.encode(text))); }
async function codeHash(role, code) { return sha256(`${role}:${normalizeCode(code)}`); }
async function siteCodeHash(code) { return sha256(`site:${normalizeCode(code)}`); }
async function hmac(secret, message) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(message)));
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index++) result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  return result === 0;
}
async function hashPassword(password, saltHex) {
  const salt = saltHex ? fromHex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
  return { hash: toHex(bits), salt: toHex(salt) };
}

async function readBytes(request, maxBytes) {
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > maxBytes) throw new HttpError(`Request is too large. Maximum is ${Math.round(maxBytes / 1000)} KB.`, 413);
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new HttpError(`Request is too large. Maximum is ${Math.round(maxBytes / 1000)} KB.`, 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const out = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { out.set(chunk, offset); offset += chunk.byteLength; }
  return out;
}
async function readJson(request, maxBytes = JSON_LIMIT) {
  const bytes = await readBytes(request, maxBytes);
  try { return JSON.parse(dec.decode(bytes)); }
  catch { throw new HttpError("Invalid JSON."); }
}

/* ---- sharing ----------------------------------------------------------
   A shared page is a static snapshot rendered from the project's own files.
   Three rules it must never break:
     1. No username anywhere in the slug or the page. A stranger who finds a
        link learns what was built, not who built it.
     2. API keys are stripped. A student's script.js has their class key in it
        and the whole point of a share link is that other people read it.
     3. The page is assembled here rather than in the browser, so the redaction
        cannot be skipped by whoever is doing the rendering.
   The <link>/<script src> resolution below intentionally mirrors
   classroom-app/src/lib/preview.ts - change one, change the other. */

const SLUG_RANDOM = "abcdefghjkmnpqrstuvwxyz23456789";   // no look-alike characters
function shareSlug(title) {
  const stem = String(title || "project").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32) || "project";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let tail = "";
  for (const byte of bytes) tail += SLUG_RANDOM[byte % SLUG_RANDOM.length];
  return `${stem}-${tail}`;
}

/* Anything shaped like an API key goes. Deliberately broad - a false positive
   costs a shared demo one working request, a false negative leaks a key. */
function redactKeys(text) {
  return String(text)
    .replace(/sk-[A-Za-z0-9_-]{6,}/g, "sk-REDACTED-BEFORE-SHARING")
    .replace(/\b(api[_-]?key|apikey|token|secret)(\s*[:=]\s*)(["'])(?:(?!\3).){8,}\3/gi,
             (_m, name, mid, quote) => `${name}${mid}${quote}REDACTED${quote}`);
}

function resolveSharedPath(reference, fromDir) {
  const raw = String(reference || "").trim().split(/[?#]/)[0];
  if (!raw) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) return null;
  const out = raw.startsWith("/") ? [] : fromDir.split("/").filter(Boolean);
  for (const part of raw.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") { out.pop(); continue; }
    out.push(part);
  }
  return out.join("/") || null;
}
function sharedAttr(tagText, name) {
  const match = tagText.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? (match[2] ?? match[3] ?? match[4] ?? null) : null;
}

function assembleSharedPage(files) {
  const source = files["index.html"];
  if (source === undefined) return null;
  const safe = {};
  for (const name of Object.keys(files)) safe[name] = redactKeys(files[name]);

  let html = safe["index.html"].replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = (sharedAttr(tag, "rel") || "").toLowerCase();
    if (!rel.split(/\s+/).includes("stylesheet")) return tag;
    const href = sharedAttr(tag, "href");
    if (href === null) return tag;
    const name = resolveSharedPath(href, "");
    if (!name || !(name in safe)) return tag;
    return `<style>${safe[name].replaceAll("</style", "<\\/style")}</style>`;
  });
  html = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (tag, attrs) => {
    const src = sharedAttr(`<script${attrs}>`, "src");
    if (src === null) return tag;
    const name = resolveSharedPath(src, "");
    if (!name || !(name in safe)) return tag;
    return `<script>${safe[name].replaceAll("</script", "<\\/script")}<\/script>`;
  });
  return html;
}

function projectTitle(value) { return String(value || "My project").trim().slice(0, 80) || "My project"; }
function projectKind(value) { return PROJECT_KINDS.includes(value) ? value : "web"; }
/* Rows written before multi-project support have kind NULL and created_at 0. */
function projectSummary(row) {
  return { id: row.id, title: row.title, kind: projectKind(row.kind), size: row.size || 0, createdAt: row.created_at || row.updated_at, updatedAt: row.updated_at, shareSlug: row.share_slug || null };
}
function projectFull(row) {
  return { ...projectSummary({ ...row, size: row.files.length }), files: JSON.parse(row.files) };
}
/* Shared by the legacy /project PUT and the per-id PUT so the size rule is stated once.
   Paths are checked here as well as in the editor: the editor's check is there to
   give a helpful message, this one is there because anything can call the API. */
const MAX_PROJECT_FILES = 40;
const PATH_OK = /^(?!\/)(?!.*\/\/)(?!.*(^|\/)\.\.?(\/|$))[A-Za-z0-9._/-]{1,120}$/;
function projectFilesJson(files) {
  if (!files || typeof files !== "object" || Array.isArray(files)) throw new HttpError("Missing project files.");
  const names = Object.keys(files);
  if (names.length > MAX_PROJECT_FILES) throw new HttpError(`A project can hold at most ${MAX_PROJECT_FILES} files.`);
  for (const name of names) {
    if (!PATH_OK.test(name) || name.endsWith("/")) throw new HttpError(`"${name}" is not a usable file name.`);
    if (name.split("/").length > 4) throw new HttpError(`"${name}" is nested too deeply.`);
    if (typeof files[name] !== "string") throw new HttpError(`"${name}" does not contain text.`);
  }
  const json = JSON.stringify(files);
  if (enc.encode(json).byteLength > JSON_LIMIT) throw new HttpError("Project is too large.", 413);
  return json;
}

async function newSession(db, accountId, days) {
  const token = rndHex(32), now = Date.now();
  await db.prepare("INSERT INTO sessions (token, account_id, created_at, expires_at) VALUES (?,?,?,?)")
    .bind(token, accountId, now, now + days * DAY).run();
  return token;
}
async function accountFromToken(db, token) {
  if (!token) return null;
  const session = await db.prepare("SELECT account_id, expires_at FROM sessions WHERE token = ?").bind(token).first();
  if (!session || session.expires_at < Date.now()) return null;
  return db.prepare("SELECT * FROM accounts WHERE id = ?").bind(session.account_id).first();
}
async function accountFromRequest(db, request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return accountFromToken(db, token);
}
function publicAccount(account) {
  return {
    id: account.id, classId: account.class_id, name: account.name,
    username: account.username || null, isPermanent: !!account.is_permanent,
    role: account.role, createdAt: account.created_at, lastSeen: account.last_seen,
  };
}
function canUseClass(account, classId) {
  return account && (account.role === "admin" || account.class_id === classId);
}
function canHostClass(account, classId) {
  return account && (account.role === "admin" || (account.role === "instructor" && account.class_id === classId));
}
// Record that an account has connected to a classroom, so it can re-enter from
// a saved list instead of retyping the code. Idempotent (refreshes last_used).
async function rememberClassroom(db, accountId, classId, role, label) {
  if (!accountId || !classId || (role !== "student" && role !== "instructor")) return;
  let name = label;
  if (!name) {
    const row = await db.prepare("SELECT label FROM site_access WHERE classroom_class_id = ? LIMIT 1").bind(classId).first();
    name = (row && row.label) || String(classId).toUpperCase();
  }
  await db.prepare("INSERT INTO account_classrooms (account_id, class_id, role, label, last_used) VALUES (?,?,?,?,?) ON CONFLICT(account_id, class_id, role) DO UPDATE SET label=excluded.label, last_used=excluded.last_used")
    .bind(accountId, classId, role, name, Date.now()).run();
}
async function rateLimit(db, request, bucket, limit = 12) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const key = `${bucket}:${await sha256(ip)}`;
  const now = Date.now();
  const row = await db.prepare("SELECT count, reset_at FROM rate_limits WHERE key = ?").bind(key).first();
  if (!row || row.reset_at < now) {
    await db.prepare("INSERT OR REPLACE INTO rate_limits (key, count, reset_at) VALUES (?,?,?)").bind(key, 1, now + 10 * 60 * 1000).run();
    return;
  }
  if (row.count >= limit) throw new HttpError("Too many attempts. Try again in a few minutes.", 429);
  await db.prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?").bind(key).run();
}
/* Sign-in throttling: FAILED attempts only, counted per account as well as
   per address.

   The old rule was eight attempts per ten minutes against the caller's IP,
   counting successes. Thirty students in one room share one school NAT
   address, so the ninth to sign in was told "too many attempts" without
   anybody having typed anything wrong - the whole class locked out of the
   lesson by the first eight people getting it right.

   Now a correct password costs nothing and clears the count, a wrong one is
   charged to (address, username) so one student mistyping cannot lock out
   their classmates, and a much looser per-address failure cap still stops
   somebody spraying passwords across many usernames from one machine. */
const LOGIN_FAILS_PER_ACCOUNT = 8;
const LOGIN_FAILS_PER_ADDRESS = 50;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

async function loginKeys(request, username) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const who = String(username || "").trim().toLowerCase();
  return {
    account: "login-fail:" + await sha256(ip + "|" + who),
    address: "login-fail-ip:" + await sha256(ip),
  };
}

async function loginTooManyFailures(db, keys) {
  const now = Date.now();
  const rows = await db.batch([
    db.prepare("SELECT count, reset_at FROM rate_limits WHERE key = ?").bind(keys.account),
    db.prepare("SELECT count, reset_at FROM rate_limits WHERE key = ?").bind(keys.address),
  ]);
  const live = (result, limit) => {
    const row = result.results && result.results[0];
    return row && row.reset_at >= now && row.count >= limit;
  };
  if (live(rows[0], LOGIN_FAILS_PER_ACCOUNT)) {
    throw new HttpError("Too many wrong passwords for that account. Try again in a few minutes, "
                        + "or ask your teacher to reset it.", 429);
  }
  if (live(rows[1], LOGIN_FAILS_PER_ADDRESS)) {
    throw new HttpError("Too many failed sign-ins from this network. Try again in a few minutes.", 429);
  }
}

async function countLoginFailure(db, keys) {
  const now = Date.now();
  const reset = now + LOGIN_WINDOW_MS;
  const bump = (key) => db.prepare(
    "INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?) "
    + "ON CONFLICT(key) DO UPDATE SET "
    + "count = CASE WHEN rate_limits.reset_at < ? THEN 1 ELSE rate_limits.count + 1 END, "
    + "reset_at = CASE WHEN rate_limits.reset_at < ? THEN ? ELSE rate_limits.reset_at END"
  ).bind(key, reset, now, now, reset);
  await db.batch([bump(keys.account), bump(keys.address)]);
}

async function clearLoginFailures(db, keys) {
  await db.prepare("DELETE FROM rate_limits WHERE key = ?").bind(keys.account).run();
}

function lockError(level, until) {
  if (level >= 4 && !until) return new HttpError("This browser is permanently locked after repeated code lockouts. Ask an admin to clear it.", 429);
  const remaining = Math.max(1, Math.ceil((until - Date.now()) / 60000));
  return new HttpError(`Too many distinct incorrect codes. This browser is locked for ${remaining < 60 ? `${remaining} minutes` : `${Math.ceil(remaining / 60)} hours`}.`, 429);
}
async function browserLockKey(request) {
  const device = String(request.headers.get("X-UTG-Access-Device") || "").trim();
  const browser = /^[a-zA-Z0-9-]{16,64}$/.test(device) ? `browser:${device}` : `ip:${request.headers.get("CF-Connecting-IP") || "unknown"}`;
  return sha256(`class-code-lock:${browser}`);
}
function attemptedHashes(value) {
  try { const parsed = JSON.parse(value || "[]"); return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string").slice(0, 5) : []; }
  catch { return []; }
}
async function checkCodeLock(db, request) {
  const browserKey = await browserLockKey(request), now = Date.now();
  const row = await db.prepare("SELECT * FROM access_lockouts WHERE browser_key = ?").bind(browserKey).first();
  if (!row) return { browserKey, attemptCount: 0, lockLevel: 0, hashes: [] };
  if (row.lock_level >= 4 && row.locked_until == null) throw lockError(row.lock_level, null);
  if (row.locked_until && row.locked_until > now) throw lockError(row.lock_level, row.locked_until);
  if (row.locked_until && row.locked_until <= now) {
    await db.prepare("UPDATE access_lockouts SET attempted_code_hashes = '[]', attempt_count = 0, locked_until = NULL, updated_at = ? WHERE browser_key = ?").bind(now, browserKey).run();
    return { browserKey, attemptCount: 0, lockLevel: row.lock_level, hashes: [] };
  }
  return { browserKey, attemptCount: row.attempt_count, lockLevel: row.lock_level, hashes: attemptedHashes(row.attempted_code_hashes) };
}
async function clearCodeAttempts(db, browserKey) {
  await db.prepare("DELETE FROM access_lockouts WHERE browser_key = ? AND lock_level = 0").bind(browserKey).run();
  await db.prepare("UPDATE access_lockouts SET attempted_code_hashes = '[]', attempt_count = 0, locked_until = NULL, updated_at = ? WHERE browser_key = ?").bind(Date.now(), browserKey).run();
}
async function recordWrongCode(db, request, cleanCode) {
  const state = await checkCodeLock(db, request), code = await sha256(cleanCode);
  if (state.hashes.includes(code)) return;
  const hashes = [...state.hashes, code], now = Date.now();
  if (hashes.length < 5) {
    await db.prepare("INSERT INTO access_lockouts (browser_key, attempted_code_hashes, attempt_count, lock_level, locked_until, updated_at) VALUES (?,?,?,?,NULL,?) ON CONFLICT(browser_key) DO UPDATE SET attempted_code_hashes=excluded.attempted_code_hashes, attempt_count=excluded.attempt_count, updated_at=excluded.updated_at")
      .bind(state.browserKey, JSON.stringify(hashes), hashes.length, state.lockLevel, now).run();
    return;
  }
  const nextLevel = state.lockLevel + 1;
  const lockedUntil = nextLevel >= 4 ? null : now + [HOUR, DAY, 7 * DAY][nextLevel - 1];
  await db.prepare("INSERT INTO access_lockouts (browser_key, attempted_code_hashes, attempt_count, lock_level, locked_until, updated_at) VALUES (?, '[]', 0, ?, ?, ?) ON CONFLICT(browser_key) DO UPDATE SET attempted_code_hashes='[]', attempt_count=0, lock_level=excluded.lock_level, locked_until=excluded.locked_until, updated_at=excluded.updated_at")
    .bind(state.browserKey, nextLevel, lockedUntil, now).run();
  throw lockError(nextLevel, lockedUntil);
}
function profileActive(profile) {
  if (!profile.enabled) return false;
  if (!profile.hours) return true;
  const match = /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/.exec(profile.hours);
  if (!match) return true;
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    const hour = Number(parts.find((part) => part.type === "hour")?.value || 0) % 24;
    const minute = Number(parts.find((part) => part.type === "minute")?.value || 0);
    const now = hour * 60 + minute, start = Number(match[1]) * 60 + Number(match[2]), end = Number(match[3]) * 60 + Number(match[4]);
    return now >= start && now < end;
  } catch { return true; }
}
function profileTools(profile) {
  try {
    const tools = JSON.parse(profile.tools || "[]");
    return tools === "all" ? "all" : Array.isArray(tools) ? tools.filter((tool) => typeof tool === "string") : [];
  } catch { return []; }
}
function allowedScope(value, allowed, label) {
  if (value === "all") return "all";
  if (!Array.isArray(value)) throw new HttpError(`${label} must be a list or all.`, 400);
  const unique = [...new Set(value.filter((item) => typeof item === "string"))];
  if (unique.some((item) => !allowed.includes(item))) throw new HttpError(`One or more ${label.toLowerCase()} are not recognized.`, 400);
  return unique;
}
function scopeAllows(scope, item) { return scope === "all" || (Array.isArray(scope) && scope.includes(item)); }
function profileAllows(profile, tool) {
  const tools = profileTools(profile);
  return scopeAllows(tools, tool);
}
function classroomTools(profile, enabled) {
  const tools = profileTools(profile);
  if (tools === "all") return enabled ? "all" : [];
  const withoutClassroom = tools.filter((tool) => tool !== "classroom");
  return enabled ? [...withoutClassroom, "classroom"] : withoutClassroom;
}
function publicProfile(profile) {
  return {
    label: profile.label, tools: profileTools(profile), print: !!profile.print_allowed, play: JSON.parse(profile.play),
    classroom: profile.classroom_class_id ? { classId: profile.classroom_class_id, role: profile.classroom_role } : null,
  };
}
async function newClassroomGrant(db, profile) {
  if (!profile.classroom_class_id || !profile.classroom_role || !profileAllows(profile, "classroom")) return null;
  const token = rndHex(24), now = Date.now();
  await db.prepare("INSERT INTO classroom_access_grants (token, class_id, role, expires_at, used_at) VALUES (?,?,?,?,NULL)")
    .bind(token, profile.classroom_class_id, profile.classroom_role, now + 5 * 60 * 1000).run();
  return token;
}
async function useClassroomGrant(db, value, role) {
  const token = String(value || "").trim();
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  const now = Date.now();
  const grant = await db.prepare("SELECT * FROM classroom_access_grants WHERE token = ? AND used_at IS NULL AND expires_at > ?").bind(token, now).first();
  if (!grant || grant.role !== role) return null;
  const profile = await db.prepare("SELECT * FROM site_access WHERE classroom_class_id = ? AND classroom_role = ?").bind(grant.class_id, role).first();
  if (!profile || !profileActive(profile) || !profileAllows(profile, "classroom")) return null;
  await db.prepare("UPDATE classroom_access_grants SET used_at = ? WHERE token = ? AND used_at IS NULL").bind(now, token).run();
  return grant;
}
async function classroomProfileForCode(db, code, classId, role) {
  const profile = await db.prepare("SELECT * FROM site_access WHERE code_hash = ?").bind(await siteCodeHash(code)).first();
  if (!profile || profile.classroom_class_id !== classId || profile.classroom_role !== role) return null;
  return profileActive(profile) && profileAllows(profile, "classroom") ? profile : null;
}
async function signedMediaUrl(url, env, id, accountId) {
  if (!env.SETUP_SECRET) throw new HttpError("Media signing is not configured.", 503);
  const expires = Date.now() + 7 * DAY;
  const sig = await hmac(env.SETUP_SECRET, `media:${id}:${accountId}:${expires}`);
  return `${url.origin}/media/file/${id}?expires=${expires}&sig=${sig}`;
}

export default {
  async fetch(request, env) {
    const headers = cors(request, env);
    if (headers === null) return bad(request, env, "Origin is not allowed.", 403);
    if (request.method === "OPTIONS") return new Response(null, { headers });

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const db = env.DB;
    try {
      if (path === "/" || path === "/health") return response(request, env, { ok: true, service: "utg-classroom-api" });

      // Signed media URLs work inside a sandboxed project preview without exposing a bearer token.
      const fileMatch = path.match(/^\/media\/file\/([^/]+)$/);
      if (fileMatch && request.method === "GET") {
        if (!env.MEDIA || !env.SETUP_SECRET) return new Response("Not found", { status: 404, headers });
        const media = await db.prepare("SELECT r2_key, mime, account_id FROM media WHERE id = ?").bind(fileMatch[1]).first();
        const expires = Number(url.searchParams.get("expires") || 0);
        const sig = url.searchParams.get("sig") || "";
        const expected = media && expires > Date.now() ? await hmac(env.SETUP_SECRET, `media:${fileMatch[1]}:${media.account_id}:${expires}`) : "";
        if (!media || !sig || !expires || expires <= Date.now() || !timingSafeEqual(sig, expected)) return new Response("Not found", { status: 404, headers });
        const object = await env.MEDIA.get(media.r2_key);
        if (!object) return new Response("Not found", { status: 404, headers });
        return new Response(object.body, { headers: { ...headers, "Content-Type": media.mime, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
      }

      if (path === "/login/guest" && request.method === "POST") {
        const { code, name, grant } = await readJson(request);
        const cleanCode = normalizeCode(code);
        const cleanName = String(name || "").trim().slice(0, 40);
        if (!cleanName) throw new HttpError("Enter your name.");
        const granted = await useClassroomGrant(db, grant, "student");
        let classId = granted && granted.class_id;
        if (!classId) {
          if (!validCode(cleanCode)) throw new HttpError("Enter your class code and name.");
          const lock = await checkCodeLock(db, request);
          const access = await db.prepare("SELECT class_id FROM class_access WHERE student_code_hash = ?").bind(await codeHash("student", cleanCode)).first();
          if (!access) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That student code is not valid.", 401); }
          if (!await classroomProfileForCode(db, cleanCode, access.class_id, "student")) throw new HttpError("Curriculum access is not enabled for this student code.", 403);
          await clearCodeAttempts(db, lock.browserKey);
          classId = access.class_id;
        }
        const now = Date.now();
        // A guest is identified by (class, name): signing in with the same name
        // returns the same guest account, so their projects, media, and saved
        // classrooms persist. Only guest (non-permanent) accounts match by name
        // — once promoted to permanent, an account must sign in with a password.
        let account = await db.prepare("SELECT * FROM accounts WHERE class_id = ? AND name = ? AND is_permanent = 0 AND role = 'student' ORDER BY last_seen DESC LIMIT 1").bind(classId, cleanName).first();
        let id;
        if (account) {
          id = account.id;
          await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, id).run();
        } else {
          id = crypto.randomUUID();
          await db.prepare("INSERT INTO accounts (id, class_id, name, is_permanent, role, created_at, last_seen) VALUES (?,?,?,0,'student',?,?)").bind(id, classId, cleanName, now, now).run();
          account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
        }
        await rememberClassroom(db, id, classId, "student");
        return response(request, env, { token: await newSession(db, id, 4), account: publicAccount(account) });
      }

      if (path === "/login/instructor" && request.method === "POST") {
        const { code, grant } = await readJson(request);
        const cleanCode = normalizeCode(code);
        const granted = await useClassroomGrant(db, grant, "instructor");
        let access = null;
        if (granted) access = await db.prepare("SELECT class_id, instructor_account_id FROM class_access WHERE class_id = ?").bind(granted.class_id).first();
        else {
          if (!validCode(cleanCode)) throw new HttpError("Enter your instructor code.");
          const lock = await checkCodeLock(db, request);
          access = await db.prepare("SELECT class_id, instructor_account_id FROM class_access WHERE instructor_code_hash = ?").bind(await codeHash("instructor", cleanCode)).first();
          if (!access) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That instructor code is not valid.", 401); }
          if (!await classroomProfileForCode(db, cleanCode, access.class_id, "instructor")) throw new HttpError("Curriculum access is not enabled for this instructor code.", 403);
          await clearCodeAttempts(db, lock.browserKey);
        }
        if (!access) throw new HttpError("That classroom pass is not valid.", 401);
        const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(access.instructor_account_id).first();
        if (!account) throw new HttpError("This instructor account needs to be recreated by an admin.", 409);
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(Date.now(), account.id).run();
        await rememberClassroom(db, account.id, access.class_id, "instructor");
        return response(request, env, { token: await newSession(db, account.id, 30), account: publicAccount(account) });
      }

      if (path === "/admin/bootstrap" && request.method === "POST") {
        await rateLimit(db, request, "admin-bootstrap", 5);
        const { setupSecret, classId, name, username, password } = await readJson(request);
        if (!env.SETUP_SECRET || !timingSafeEqual(String(setupSecret || ""), env.SETUP_SECRET)) throw new HttpError("Bad setup secret.", 403);
        if (await db.prepare("SELECT id FROM accounts WHERE role='admin' LIMIT 1").first()) throw new HttpError("An admin already exists.", 409);
        if (!username || !password) throw new HttpError("Username and password required.");
        const { hash, salt } = await hashPassword(password);
        const id = crypto.randomUUID(), now = Date.now();
        await db.prepare("INSERT INTO accounts (id, class_id, name, username, password_hash, password_salt, is_permanent, role, created_at, last_seen) VALUES (?,?,?,?,?,?,1,'admin',?,?)")
          .bind(id, classId || "*", name || "Teacher", String(username).trim(), hash, salt, now, now).run();
        const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
        return response(request, env, { token: await newSession(db, id, 30), account: publicAccount(account) });
      }

      if (path === "/login/account" && request.method === "POST") {
        const { username, password } = await readJson(request);
        if (!username || !password) throw new HttpError("Username and password required.");
        const keys = await loginKeys(request, username);
        await loginTooManyFailures(db, keys);
        const account = await db.prepare("SELECT * FROM accounts WHERE username = ?").bind(String(username).trim()).first();
        if (!account || !account.password_hash) {
          await countLoginFailure(db, keys);
          throw new HttpError("Wrong username or password.", 401);
        }
        const { hash } = await hashPassword(password, account.password_salt);
        if (!timingSafeEqual(hash, account.password_hash)) {
          await countLoginFailure(db, keys);
          throw new HttpError("Wrong username or password.", 401);
        }
        await clearLoginFailures(db, keys);
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(Date.now(), account.id).run();
        return response(request, env, { token: await newSession(db, account.id, 30), account: publicAccount(account) });
      }

      // The root four-character class-code gate verifies Classroom codes here
      // before revealing the Classroom link, so lockouts cannot be bypassed by
      // reloading the static home page.
      if (path === "/access/verify" && request.method === "POST") {
        await rateLimit(db, request, "code-verify", 60);
        const { code } = await readJson(request, 200);
        const cleanCode = normalizeCode(code);
        if (!validCode(cleanCode)) throw new HttpError("Enter a valid class code.");
        const lock = await checkCodeLock(db, request);
        const profile = await db.prepare("SELECT * FROM site_access WHERE code_hash = ?").bind(await siteCodeHash(cleanCode)).first();
        if (!profile || !profileActive(profile)) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That class code is not valid.", 401); }
        await clearCodeAttempts(db, lock.browserKey);
        return response(request, env, { profile: publicProfile(profile), classroomGrant: await newClassroomGrant(db, profile) });
      }

      // Used only by the TURN credential Worker. It deliberately returns no
      // account data, just whether the supplied opaque session is still valid.
      if (path === "/turn/verify" && request.method === "POST") {
        const { token } = await readJson(request, 200);
        const account = await accountFromToken(db, String(token || ""));
        return account ? response(request, env, { ok: true }) : bad(request, env, "Not signed in.", 401);
      }

      /* Public, deliberately: a share link has to work for someone with no
         account. It returns an assembled, key-redacted page and nothing about
         who made it - no account id, no name, no class. */
      const sharedMatch = path.match(/^\/shared\/([A-Za-z0-9-]{3,64})$/);
      if (sharedMatch && request.method === "GET") {
        const row = await db.prepare("SELECT title, kind, files, updated_at FROM projects WHERE share_slug = ? AND deleted_at IS NULL").bind(sharedMatch[1]).first();
        if (!row) throw new HttpError("That shared project is not there any more.", 404);
        if (row.kind !== "web") throw new HttpError("Only web projects can be shared.", 404);
        const html = assembleSharedPage(JSON.parse(row.files));
        if (html === null) throw new HttpError("That project has no index.html to show.", 404);
        return response(request, env, { title: row.title, html, updatedAt: row.updated_at });
      }

      const me = await accountFromRequest(db, request);
      if (path === "/me") return me ? response(request, env, { account: publicAccount(me) }) : bad(request, env, "Not signed in.", 401);

      // The demo AI key for checkpoint slides, handed only to a signed-in teacher
      // (or admin). A student holds a class code, not an account token, so this
      // 401s for them - the key never reaches a student's browser, and it is
      // never in the published slides. Returns { key: null } when none is set.
      if (path === "/demo-key" && request.method === "GET") {
        if (!me || (me.role !== "instructor" && me.role !== "admin")) throw new HttpError("Teachers only.", 403);
        const row = await db.prepare("SELECT value FROM settings WHERE key = 'demo_ai_key'").first();
        return response(request, env, { key: (row && row.value) || null });
      }

      // The classrooms this account has connected to, for a saved re-entry list.
      if (path === "/me/classrooms" && request.method === "GET") {
        if (!me) throw new HttpError("Not signed in.", 401);
        // Self-heal: every student/instructor always has at least their own
        // class listed, even accounts created before saved classrooms existed.
        if ((me.role === "student" || me.role === "instructor") && me.class_id && me.class_id !== "*") {
          const has = await db.prepare("SELECT 1 FROM account_classrooms WHERE account_id = ? AND class_id = ? AND role = ?").bind(me.id, me.class_id, me.role).first();
          if (!has) await rememberClassroom(db, me.id, me.class_id, me.role);
        }
        const rows = (await db.prepare("SELECT class_id, role, label, last_used FROM account_classrooms WHERE account_id = ? ORDER BY last_used DESC").bind(me.id).all()).results;
        return response(request, env, { classrooms: rows.map((r) => ({ classId: r.class_id, role: r.role, label: r.label, lastUsed: r.last_used })) });
      }
      // Forget a saved classroom (removes the record, never the class code).
      if (path === "/me/classrooms" && request.method === "DELETE") {
        if (!me) throw new HttpError("Not signed in.", 401);
        const { classId, role } = await readJson(request);
        await db.prepare("DELETE FROM account_classrooms WHERE account_id = ? AND class_id = ? AND role = ?").bind(me.id, String(classId || ""), String(role || "")).run();
        return response(request, env, { ok: true });
      }
      if (path === "/logout" && request.method === "POST") {
        const auth = request.headers.get("authorization") || "";
        if (auth.startsWith("Bearer ")) await db.prepare("DELETE FROM sessions WHERE token = ?").bind(auth.slice(7)).run();
        return response(request, env, { ok: true });
      }
      if (!me) return bad(request, env, "Not signed in.", 401);

      /* Legacy single-project routes. A browser holding a cached pre-picker bundle
         still autosaves through these, so they stay until that cache cannot exist.
         Both ends deliberately target the SAME row - most recently updated - so a
         stale bundle round-trips its own project instead of overwriting whichever
         row SQLite happened to return for an unordered LIMIT 1. */
      if (path === "/project" && request.method === "GET") {
        const project = await db.prepare("SELECT * FROM projects WHERE account_id = ? AND deleted_at IS NULL ORDER BY updated_at DESC LIMIT 1").bind(me.id).first();
        return response(request, env, { project: project ? projectFull(project) : null });
      }
      if (path === "/project" && request.method === "PUT") {
        const { title, files } = await readJson(request, JSON_LIMIT);
        const filesJson = projectFilesJson(files);
        const now = Date.now();
        const existing = await db.prepare("SELECT id FROM projects WHERE account_id = ? AND deleted_at IS NULL ORDER BY updated_at DESC LIMIT 1").bind(me.id).first();
        if (existing) await db.prepare("UPDATE projects SET title = ?, files = ?, updated_at = ? WHERE id = ?").bind(projectTitle(title), filesJson, now, existing.id).run();
        else await db.prepare("INSERT INTO projects (id, account_id, title, kind, files, created_at, updated_at) VALUES (?,?,?,?,?,?,?)").bind(crypto.randomUUID(), me.id, projectTitle(title), "web", filesJson, now, now).run();
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, me.id).run();
        return response(request, env, { ok: true, updatedAt: now });
      }

      /* The list never carries files: at 750 KB a project, a class set would be
         megabytes on every visit to the picker. length() is computed in SQLite. */
      if (path === "/projects" && request.method === "GET") {
        const rows = (await db.prepare("SELECT id, title, kind, created_at, updated_at, share_slug, length(files) AS size FROM projects WHERE account_id = ? AND deleted_at IS NULL ORDER BY updated_at DESC").bind(me.id).all()).results;
        return response(request, env, { projects: rows.map(projectSummary) });
      }
      if (path === "/projects" && request.method === "POST") {
        const { title, kind, files } = await readJson(request, JSON_LIMIT);
        const filesJson = projectFilesJson(files);
        const open = await db.prepare("SELECT COUNT(*) AS total FROM projects WHERE account_id = ? AND deleted_at IS NULL").bind(me.id).first();
        if ((open?.total || 0) >= PROJECT_LIMIT) throw new HttpError(`That is ${PROJECT_LIMIT} projects already. Delete one to make room for a new one.`);
        const id = crypto.randomUUID(), now = Date.now();
        await db.prepare("INSERT INTO projects (id, account_id, title, kind, files, created_at, updated_at) VALUES (?,?,?,?,?,?,?)")
          .bind(id, me.id, projectTitle(title), projectKind(kind), filesJson, now, now).run();
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, me.id).run();
        return response(request, env, { project: { id, title: projectTitle(title), kind: projectKind(kind), files: JSON.parse(filesJson), size: filesJson.length, createdAt: now, updatedAt: now } });
      }
      /* Every per-id route scopes on account_id in the WHERE rather than checking
         ownership afterwards, and answers 404 rather than 403 - a guessed id must
         not confirm that somebody else's project exists. */
      /* ---- instructor: see your class, and catch a student up ----
         An instructor may read the roster for their OWN class and seed a
         project into a student in it. That is the first place in this API where
         one account writes into another, so the class match is checked against
         the signed-in account's own class_id rather than anything in the body,
         and it only ever CREATES a project - it can never overwrite work a
         student already has. */
      const classStaff = (classId) =>
        me.role === "admin" || (me.role === "instructor" && me.class_id === classId);

      const rosterMatch = path.match(/^\/class\/([^/]+)\/students$/);
      if (rosterMatch && request.method === "GET") {
        const classId = rosterMatch[1];
        if (!classStaff(classId)) throw new HttpError("Not your class.", 403);
        const rows = (await db.prepare(
          "SELECT a.id, a.name, a.last_seen, a.username, a.is_permanent, " +
          "(SELECT COUNT(*) FROM projects p WHERE p.account_id = a.id AND p.deleted_at IS NULL) AS projects " +
          "FROM accounts a WHERE a.class_id = ? AND a.role = 'student' ORDER BY a.name"
        ).bind(classId).all()).results;
        return response(request, env, { students: rows.map((r) => ({
          id: r.id, name: r.name, lastSeen: r.last_seen, projects: r.projects,
          username: r.username || null, hasAccount: !!r.is_permanent })) });
      }

      // An instructor may enrol a student into their own class. A real account
      // rather than a guest one, because guests are keyed by (class, name) - two
      // students called Alex silently share one account and overwrite each other.
      if (rosterMatch && request.method === "POST") {
        const classId = rosterMatch[1];
        if (!classStaff(classId)) throw new HttpError("Not your class.", 403);
        const { name, username, password } = await readJson(request);
        const cleanName = String(name || "").trim().slice(0, 40);
        const cleanUser = String(username || "").trim().toLowerCase();
        if (!cleanName || !cleanUser || !password) throw new HttpError("Need a name, a username and a password.");
        if (!/^[a-z0-9._-]{3,32}$/.test(cleanUser)) throw new HttpError("Usernames are 3-32 characters: letters, numbers, dot, dash, underscore.");
        if (String(password).length < 6) throw new HttpError("Passwords need at least 6 characters.");
        if (await db.prepare("SELECT id FROM accounts WHERE username = ?").bind(cleanUser).first()) {
          throw new HttpError("That username is taken.", 409);
        }
        const { hash, salt } = await hashPassword(String(password));
        const id = crypto.randomUUID(), now = Date.now();
        await db.prepare("INSERT INTO accounts (id, class_id, name, username, password_hash, password_salt, is_permanent, role, created_at, last_seen) VALUES (?,?,?,?,?,?,1,'student',?,?)")
          .bind(id, classId, cleanName, cleanUser, hash, salt, now, now).run();
        await rememberClassroom(db, id, classId, "student");
        return response(request, env, { student: { id, name: cleanName, username: cleanUser } });
      }

      // Reset a student's password. Only for accounts the teacher made - a
      // guest has no password to reset. Every existing session is dropped, so a
      // device left signed in somewhere does not keep working afterwards.
      const pwMatch = path.match(/^\/class\/([^/]+)\/students\/([^/]+)\/password$/);
      if (pwMatch && request.method === "POST") {
        const classId = pwMatch[1];
        if (!classStaff(classId)) throw new HttpError("Not your class.", 403);
        const { password } = await readJson(request);
        if (String(password || "").length < 6) throw new HttpError("Passwords need at least 6 characters.");
        const student = await db.prepare(
          "SELECT id, name, username FROM accounts WHERE id = ? AND class_id = ? AND role = 'student'"
        ).bind(pwMatch[2], classId).first();
        if (!student) throw new HttpError("No such student in this class.", 404);
        if (!student.username) {
          throw new HttpError("They joined as a guest, so there is no password to reset. Add them as a student to give them an account.");
        }
        const { hash, salt } = await hashPassword(String(password));
        await db.batch([
          db.prepare("UPDATE accounts SET password_hash = ?, password_salt = ? WHERE id = ?").bind(hash, salt, student.id),
          db.prepare("DELETE FROM sessions WHERE account_id = ?").bind(student.id),
        ]);
        return response(request, env, { ok: true, name: student.name, username: student.username });
      }

      const seedMatch = path.match(/^\/class\/([^/]+)\/seed$/);
      if (seedMatch && request.method === "POST") {
        const classId = seedMatch[1];
        if (!classStaff(classId)) throw new HttpError("Not your class.", 403);
        const { accountId, title, files } = await readJson(request, JSON_LIMIT);
        const student = await db.prepare(
          "SELECT id FROM accounts WHERE id = ? AND class_id = ? AND role = 'student'"
        ).bind(String(accountId || ""), classId).first();
        if (!student) throw new HttpError("No such student in this class.", 404);
        // Whatever the source, the key never travels. A teacher copying one of
        // their own projects would otherwise hand the student their key, and the
        // student would be spending the teacher's rate limit under the teacher's
        // name. Reset to the placeholder the course tells them to replace.
        const clean = {};
        for (const [name, text] of Object.entries(files || {})) {
          clean[name] = typeof text === "string"
            ? text.replace(/sk-[A-Za-z0-9_-]{6,}/g, "sk-class-put-your-own-key-here")
            : text;
        }
        const filesJson = projectFilesJson(clean);
        const open = await db.prepare(
          "SELECT COUNT(*) AS total FROM projects WHERE account_id = ? AND deleted_at IS NULL"
        ).bind(student.id).first();
        if ((open?.total || 0) >= PROJECT_LIMIT) throw new HttpError("That student has no room for another project.");
        const id = crypto.randomUUID(), now = Date.now();
        await db.prepare("INSERT INTO projects (id, account_id, title, kind, files, created_at, updated_at) VALUES (?,?,?,?,?,?,?)")
          .bind(id, student.id, projectTitle(title), "web", filesJson, now, now).run();
        return response(request, env, { project: { id, title: projectTitle(title) } });
      }

      /* Sharing is off until a student turns it on, and revoking really revokes:
         the slug is cleared, so the old link 404s rather than going stale. */
      const shareMatch = path.match(/^\/projects\/([^/]+)\/share$/);
      if (shareMatch) {
        const row = await db.prepare("SELECT id, title, kind, share_slug FROM projects WHERE id = ? AND account_id = ? AND deleted_at IS NULL").bind(shareMatch[1], me.id).first();
        if (!row) throw new HttpError("No such project.", 404);
        if (request.method === "POST") {
          if (row.kind !== "web") throw new HttpError("Only web projects can be shared.");
          if (row.share_slug) return response(request, env, { slug: row.share_slug });
          // Retry on the astronomically unlikely slug collision rather than 500.
          for (let attempt = 0; attempt < 5; attempt++) {
            const slug = shareSlug(row.title);
            try {
              await db.prepare("UPDATE projects SET share_slug = ?, shared_at = ? WHERE id = ?").bind(slug, Date.now(), row.id).run();
              return response(request, env, { slug });
            } catch { /* UNIQUE clash - try another */ }
          }
          throw new HttpError("Could not make a share link. Try again.", 500);
        }
        if (request.method === "DELETE") {
          await db.prepare("UPDATE projects SET share_slug = NULL, shared_at = NULL WHERE id = ?").bind(row.id).run();
          return response(request, env, { ok: true });
        }
      }

      const projectMatch = path.match(/^\/projects\/([^/]+)$/);
      if (projectMatch) {
        const projectId = projectMatch[1];
        if (request.method === "GET") {
          const row = await db.prepare("SELECT * FROM projects WHERE id = ? AND account_id = ? AND deleted_at IS NULL").bind(projectId, me.id).first();
          if (!row) throw new HttpError("No such project.", 404);
          return response(request, env, { project: projectFull(row) });
        }
        if (request.method === "PUT") {
          const body = await readJson(request, JSON_LIMIT);
          const row = await db.prepare("SELECT id FROM projects WHERE id = ? AND account_id = ? AND deleted_at IS NULL").bind(projectId, me.id).first();
          if (!row) throw new HttpError("No such project.", 404);
          const now = Date.now();
          // kind is fixed at creation: a Java project must not quietly become a web one.
          if (body.files !== undefined) await db.prepare("UPDATE projects SET files = ?, updated_at = ? WHERE id = ?").bind(projectFilesJson(body.files), now, projectId).run();
          if (body.title !== undefined) await db.prepare("UPDATE projects SET title = ?, updated_at = ? WHERE id = ?").bind(projectTitle(body.title), now, projectId).run();
          await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, me.id).run();
          return response(request, env, { ok: true, updatedAt: now });
        }
        if (request.method === "DELETE") {
          const row = await db.prepare("SELECT id FROM projects WHERE id = ? AND account_id = ? AND deleted_at IS NULL").bind(projectId, me.id).first();
          if (!row) throw new HttpError("No such project.", 404);
          // Soft delete. A 12-year-old deleting the wrong card has 30 days of grace.
          await db.prepare("UPDATE projects SET deleted_at = ? WHERE id = ?").bind(Date.now(), projectId).run();
          return response(request, env, { ok: true });
        }
      }

      if (path === "/media" && request.method === "GET") {
        const rows = (await db.prepare("SELECT id, name, kind, mime, size, created_at FROM media WHERE account_id = ? ORDER BY created_at DESC").bind(me.id).all()).results;
        const media = await Promise.all(rows.map(async (item) => ({ ...item, createdAt: item.created_at, url: await signedMediaUrl(url, env, item.id, me.id) })));
        return response(request, env, { media });
      }
      if (path === "/media" && request.method === "POST") {
        if (!env.MEDIA) throw new HttpError("Media storage is not enabled.", 503);
        const kind = url.searchParams.get("kind");
        const mime = url.searchParams.get("mime") || "application/octet-stream";
        const name = (url.searchParams.get("name") || "upload").slice(0, 80);
        if ((kind !== "image" && kind !== "audio") || (kind === "image" && mime !== "image/webp") || (kind === "audio" && mime !== "audio/mpeg")) throw new HttpError("Unsupported media type.");
        const body = await readBytes(request, parseInt(env.MAX_MEDIA_BYTES || "4000000", 10));
        if (!body.byteLength) throw new HttpError("Empty file.");
        const id = crypto.randomUUID(), now = Date.now(), key = `${me.id}/${id}`;
        await env.MEDIA.put(key, body, { httpMetadata: { contentType: mime, cacheControl: "private, no-store" } });
        await db.prepare("INSERT INTO media (id, account_id, name, kind, mime, size, r2_key, created_at) VALUES (?,?,?,?,?,?,?,?)")
          .bind(id, me.id, name, kind, mime, body.byteLength, key, now).run();
        return response(request, env, { media: { id, name, kind, mime, size: body.byteLength, url: await signedMediaUrl(url, env, id, me.id), createdAt: now } });
      }
      const mediaMatch = path.match(/^\/media\/([^/]+)$/);
      if (mediaMatch && request.method === "DELETE") {
        const media = await db.prepare("SELECT * FROM media WHERE id = ? AND account_id = ?").bind(mediaMatch[1], me.id).first();
        if (!media) throw new HttpError("No such file.", 404);
        if (env.MEDIA) await env.MEDIA.delete(media.r2_key);
        await db.prepare("DELETE FROM media WHERE id = ?").bind(media.id).run();
        return response(request, env, { ok: true });
      }

      const roomMatch = path.match(/^\/classroom\/([^/]+)$/);
      if (roomMatch) {
        const classId = roomMatch[1];
        if (!canHostClass(me, classId)) throw new HttpError("Instructors only.", 403);
        if (request.method === "GET") {
          const saved = await db.prepare("SELECT record, updated_at FROM classrooms WHERE class_id = ?").bind(classId).first();
          return response(request, env, { classroom: saved ? { record: JSON.parse(saved.record), updatedAt: saved.updated_at } : null });
        }
        if (request.method === "PUT") {
          const { record } = await readJson(request, CLASSROOM_LIMIT);
          if (!record || typeof record !== "object" || Array.isArray(record)) throw new HttpError("Missing classroom record.");
          const text = JSON.stringify(record);
          if (enc.encode(text).byteLength > CLASSROOM_LIMIT) throw new HttpError("Classroom record is too large.", 413);
          const now = Date.now();
          await db.prepare("INSERT INTO classrooms (class_id, record, updated_at, updated_by) VALUES (?,?,?,?) ON CONFLICT(class_id) DO UPDATE SET record=excluded.record, updated_at=excluded.updated_at, updated_by=excluded.updated_by")
            .bind(classId, text, now, me.id).run();
          return response(request, env, { ok: true, updatedAt: now });
        }
      }

      if (path === "/live/open" && request.method === "POST") {
        const { classId } = await readJson(request);
        if (!canHostClass(me, classId)) throw new HttpError("Instructors only.", 403);
        const now = Date.now();
        const current = await db.prepare("SELECT * FROM live_rooms WHERE class_id = ?").bind(classId).first();
        if (current && current.expires_at > now && current.opened_by !== me.id) throw new HttpError("This classroom is already open by another instructor.", 409);
        const peerId = current && current.expires_at > now ? current.peer_id : `utg-live-${rndHex(24)}`;
        await db.prepare("INSERT INTO live_rooms (class_id, peer_id, opened_by, opened_at, expires_at) VALUES (?,?,?,?,?) ON CONFLICT(class_id) DO UPDATE SET peer_id=excluded.peer_id, opened_by=excluded.opened_by, opened_at=excluded.opened_at, expires_at=excluded.expires_at")
          .bind(classId, peerId, me.id, now, now + 4 * 60 * 60 * 1000).run();
        await rememberClassroom(db, me.id, classId, "instructor");
        return response(request, env, { room: { classId, peerId, expiresAt: now + 4 * 60 * 60 * 1000 } });
      }
      const liveMatch = path.match(/^\/live\/([^/]+)$/);
      if (liveMatch) {
        const classId = liveMatch[1];
        if (!canUseClass(me, classId)) throw new HttpError("This account cannot access that classroom.", 403);
        if (request.method === "GET") {
          const room = await db.prepare("SELECT peer_id, expires_at FROM live_rooms WHERE class_id = ?").bind(classId).first();
          if (!room || room.expires_at < Date.now()) return response(request, env, { room: null });
          return response(request, env, { room: { classId, peerId: room.peer_id, expiresAt: room.expires_at } });
        }
        if (request.method === "DELETE") {
          if (!canHostClass(me, classId)) throw new HttpError("Instructors only.", 403);
          await db.prepare("DELETE FROM live_rooms WHERE class_id = ? AND (opened_by = ? OR ? = 'admin')").bind(classId, me.id, me.role).run();
          return response(request, env, { ok: true });
        }
      }

      if (path.startsWith("/admin/")) {
        if (me.role !== "admin") throw new HttpError("Admins only.", 403);

        // The demo AI key that checkpoint slides run with. Stored server-side,
        // set here by an admin, read back for confirmation (the admin who sets
        // it may see it; nobody else does).
        if (path === "/admin/demo-key" && request.method === "GET") {
          const row = await db.prepare("SELECT value FROM settings WHERE key = 'demo_ai_key'").first();
          return response(request, env, { key: (row && row.value) || null });
        }
        if (path === "/admin/demo-key" && request.method === "PUT") {
          const { key } = await readJson(request, 4000);
          const clean = String(key || "").trim();
          if (clean) {
            await db.prepare("INSERT INTO settings (key, value, updated_at, updated_by) VALUES ('demo_ai_key', ?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at, updated_by = excluded.updated_by")
              .bind(clean, Date.now(), me.id).run();
          } else {
            await db.prepare("DELETE FROM settings WHERE key = 'demo_ai_key'").run();
          }
          return response(request, env, { key: clean || null });
        }

        if (path === "/admin/site-access" && request.method === "GET") {
          const rows = (await db.prepare("SELECT * FROM site_access ORDER BY classroom_class_id, label").all()).results;
          return response(request, env, { profiles: rows.map((row) => ({
            id: row.code_hash, code: row.code_plain || null, label: row.label, enabled: !!row.enabled, tools: JSON.parse(row.tools), print: !!row.print_allowed,
            play: JSON.parse(row.play), classroom: row.classroom_class_id ? { classId: row.classroom_class_id, role: row.classroom_role } : null,
            curriculumEnabled: !!row.classroom_class_id && profileAllows(row, "classroom"), hours: row.hours || "", updatedAt: row.updated_at,
          })) });
        }
        const siteAccessMatch = path.match(/^\/admin\/site-access\/([a-f0-9]{64})$/);
        if (siteAccessMatch && request.method === "PATCH") {
          const current = await db.prepare("SELECT * FROM site_access WHERE code_hash = ?").bind(siteAccessMatch[1]).first();
          if (!current) throw new HttpError("No such access profile.", 404);
          const body = await readJson(request, 2000);
          const label = body.label == null ? current.label : String(body.label).trim().slice(0, 80);
          const hours = body.hours == null ? current.hours : String(body.hours).trim().slice(0, 20);
          if (!label) throw new HttpError("Profile label is required.");
          if (hours && !/^(\d{1,2}):\d{2}\s*-\s*(\d{1,2}):\d{2}$/.test(hours)) throw new HttpError("Hours must look like 09:00-12:15.");
          const enabled = body.enabled == null ? !!current.enabled : !!body.enabled;
          let tools = body.tools == null ? current.tools : JSON.stringify(allowedScope(body.tools, SITE_TOOLS, "Modules"));
          if (current.classroom_class_id && body.curriculumEnabled != null && body.tools == null) tools = JSON.stringify(classroomTools(current, !!body.curriculumEnabled));
          const play = body.play == null ? current.play : JSON.stringify(allowedScope(body.play, PLAY_GAMES, "Games"));
          const classroomEnabled = profileAllows({ tools }, "classroom");
          await db.prepare("UPDATE site_access SET label = ?, enabled = ?, tools = ?, print_allowed = ?, play = ?, hours = ?, updated_at = ? WHERE code_hash = ?")
            .bind(label, enabled ? 1 : 0, tools, body.print == null ? current.print_allowed : body.print ? 1 : 0, play, hours || null, Date.now(), current.code_hash).run();
          if (current.classroom_class_id && (!enabled || !classroomEnabled)) {
            await db.prepare("DELETE FROM sessions WHERE account_id IN (SELECT id FROM accounts WHERE class_id = ? AND role = ?)")
              .bind(current.classroom_class_id, current.classroom_role).run();
          }
          return response(request, env, { ok: true });
        }
        const siteAccessCodeMatch = path.match(/^\/admin\/site-access\/([a-f0-9]{64})\/code$/);
        if (siteAccessCodeMatch && request.method === "PUT") {
          const current = await db.prepare("SELECT * FROM site_access WHERE code_hash = ?").bind(siteAccessCodeMatch[1]).first();
          if (!current) throw new HttpError("No such access profile.", 404);
          const code = normalizeCode((await readJson(request, 200)).code);
          if (!validCode(code)) throw new HttpError("Codes must be 4 letters/numbers, or 8-32 letters, numbers, or hyphens.");
          const nextSiteHash = await siteCodeHash(code);
          if (nextSiteHash !== current.code_hash && await db.prepare("SELECT code_hash FROM site_access WHERE code_hash = ?").bind(nextSiteHash).first()) throw new HttpError("That code is already in use.", 409);
          const statements = [db.prepare("UPDATE site_access SET code_hash = ?, code_plain = ?, updated_at = ? WHERE code_hash = ?").bind(nextSiteHash, code, Date.now(), current.code_hash)];
          if (current.classroom_class_id && (current.classroom_role === "student" || current.classroom_role === "instructor")) {
            const column = current.classroom_role === "student" ? "student_code_hash" : "instructor_code_hash";
            statements.push(db.prepare(`UPDATE class_access SET ${column} = ?, updated_at = ? WHERE class_id = ?`).bind(await codeHash(current.classroom_role, code), Date.now(), current.classroom_class_id));
          }
          await db.batch(statements);
          return response(request, env, { ok: true });
        }
        if (path === "/admin/accounts" && request.method === "GET") {
          const classId = url.searchParams.get("classId");
          const rows = classId ? (await db.prepare("SELECT * FROM accounts WHERE class_id = ? ORDER BY is_permanent DESC, last_seen DESC").bind(classId).all()).results : (await db.prepare("SELECT * FROM accounts ORDER BY is_permanent DESC, last_seen DESC").all()).results;
          return response(request, env, { accounts: rows.map(publicAccount) });
        }
        if (path === "/admin/access-lockouts" && request.method === "GET") {
          const rows = (await db.prepare("SELECT browser_key, attempt_count, lock_level, locked_until, updated_at FROM access_lockouts ORDER BY updated_at DESC").all()).results;
          return response(request, env, { lockouts: rows.map((row) => ({ browserKey: row.browser_key, attemptCount: row.attempt_count, lockLevel: row.lock_level, lockedUntil: row.locked_until, updatedAt: row.updated_at })) });
        }
        const lockoutMatch = path.match(/^\/admin\/access-lockouts\/([^/]+)$/);
        if (lockoutMatch && request.method === "DELETE") {
          await db.prepare("DELETE FROM access_lockouts WHERE browser_key = ?").bind(lockoutMatch[1]).run();
          return response(request, env, { ok: true });
        }
        if (path === "/admin/account" && request.method === "POST") {
          const { classId, name, username, password, role } = await readJson(request);
          const cleanRole = role === "instructor" ? "instructor" : "student";
          if (!classId || !name || !username || !password) throw new HttpError("Need class, name, username, and password.");
          if (await db.prepare("SELECT id FROM accounts WHERE username = ?").bind(String(username).trim()).first()) throw new HttpError("That username is taken.", 409);
          const { hash, salt } = await hashPassword(password), id = crypto.randomUUID(), now = Date.now();
          await db.prepare("INSERT INTO accounts (id, class_id, name, username, password_hash, password_salt, is_permanent, role, created_at, last_seen) VALUES (?,?,?,?,?,?,1,?,?,?)")
            .bind(id, String(classId).trim(), String(name).trim().slice(0, 40), String(username).trim(), hash, salt, cleanRole, now, now).run();
          await rememberClassroom(db, id, String(classId).trim(), cleanRole);
          return response(request, env, { account: publicAccount(await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first()) });
        }
        const accessMatch = path.match(/^\/admin\/class-access\/([^/]+)$/);
        if (accessMatch && request.method === "PUT") {
          const classId = accessMatch[1];
          const { studentCode, instructorCode } = await readJson(request);
          const student = normalizeCode(studentCode), instructor = normalizeCode(instructorCode);
          if (!validCode(student) || !validCode(instructor)) throw new HttpError("Codes must be 4 letters/numbers, or 8-32 letters, numbers, or hyphens.");
          const now = Date.now();
          const old = await db.prepare("SELECT instructor_account_id FROM class_access WHERE class_id = ?").bind(classId).first();
          let instructorAccountId = old && old.instructor_account_id;
          if (!instructorAccountId) {
            instructorAccountId = crypto.randomUUID();
            await db.prepare("INSERT INTO accounts (id, class_id, name, is_permanent, role, created_at, last_seen) VALUES (?,?,?,1,'instructor',?,?)")
              .bind(instructorAccountId, classId, `${classId.toUpperCase()} Instructor`, now, now).run();
          }
          await rememberClassroom(db, instructorAccountId, classId, "instructor");
          await db.prepare("INSERT INTO class_access (class_id, student_code_hash, instructor_code_hash, instructor_account_id, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(class_id) DO UPDATE SET student_code_hash=excluded.student_code_hash, instructor_code_hash=excluded.instructor_code_hash, updated_at=excluded.updated_at")
            .bind(classId, await codeHash("student", student), await codeHash("instructor", instructor), instructorAccountId, now).run();
          for (const [role, code] of [["student", student], ["instructor", instructor]]) {
            const existing = await db.prepare("SELECT * FROM site_access WHERE classroom_class_id = ? AND classroom_role = ?").bind(classId, role).first();
            const profile = existing || { label: `${classId.toUpperCase()} ${role === "student" ? "Students" : "Instructor"}`, tools: JSON.stringify(["classroom"]), print_allowed: role === "instructor" ? 1 : 0, play: "[]", hours: null };
            await db.prepare("DELETE FROM site_access WHERE classroom_class_id = ? AND classroom_role = ?").bind(classId, role).run();
            await db.prepare("INSERT INTO site_access (code_hash, code_plain, label, enabled, tools, print_allowed, play, classroom_class_id, classroom_role, hours, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
              .bind(await siteCodeHash(code), code, profile.label, profile.enabled == null ? 1 : profile.enabled, profile.tools, profile.print_allowed, profile.play, classId, role, profile.hours, now).run();
          }
          return response(request, env, { ok: true });
        }
        const accountMatch = path.match(/^\/admin\/account\/([^/]+)$/);
        if (accountMatch) {
          const id = accountMatch[1];
          const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
          if (!account) throw new HttpError("No such account.", 404);
          if (request.method === "DELETE") {
            if (env.MEDIA) for (const { r2_key } of (await db.prepare("SELECT r2_key FROM media WHERE account_id = ?").bind(id).all()).results) await env.MEDIA.delete(r2_key);
            await db.batch([db.prepare("DELETE FROM projects WHERE account_id = ?").bind(id), db.prepare("DELETE FROM media WHERE account_id = ?").bind(id), db.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id), db.prepare("DELETE FROM account_classrooms WHERE account_id = ?").bind(id), db.prepare("DELETE FROM accounts WHERE id = ?").bind(id)]);
            return response(request, env, { ok: true });
          }
          if (request.method === "PATCH") {
            const body = await readJson(request), sets = [], values = [];
            if (body.name != null) { sets.push("name = ?"); values.push(String(body.name).trim().slice(0, 40)); }
            if (body.promote === true) sets.push("is_permanent = 1");
            if (body.username != null) {
              if (await db.prepare("SELECT id FROM accounts WHERE username = ? AND id != ?").bind(String(body.username).trim(), id).first()) throw new HttpError("That username is taken.", 409);
              sets.push("username = ?"); values.push(String(body.username).trim());
            }
            if (body.password) { const { hash, salt } = await hashPassword(String(body.password)); sets.push("password_hash = ?", "password_salt = ?"); values.push(hash, salt); }
            if (!sets.length) throw new HttpError("Nothing to change.");
            values.push(id);
            await db.prepare(`UPDATE accounts SET ${sets.join(", ")} WHERE id = ?`).bind(...values).run();
            if (body.promote === true || body.password) await db.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id).run();
            return response(request, env, { account: publicAccount(await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first()) });
          }
        }
      }

      return bad(request, env, "Not found.", 404);
    } catch (error) {
      if (error instanceof HttpError) return bad(request, env, error.message, error.status);
      return bad(request, env, "Server error.", 500);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil((async () => {
      const now = Date.now(), cutoff = now - parseInt(env.GUEST_TTL_DAYS || "120", 10) * DAY;
      const stale = (await env.DB.prepare("SELECT id FROM accounts WHERE is_permanent = 0 AND last_seen < ?").bind(cutoff).all()).results;
      for (const { id } of stale) {
        if (env.MEDIA) for (const { r2_key } of (await env.DB.prepare("SELECT r2_key FROM media WHERE account_id = ?").bind(id).all()).results) await env.MEDIA.delete(r2_key);
        await env.DB.batch([env.DB.prepare("DELETE FROM projects WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM media WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM account_classrooms WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM accounts WHERE id = ?").bind(id)]);
      }
      await env.DB.batch([env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(now), env.DB.prepare("DELETE FROM live_rooms WHERE expires_at < ?").bind(now), env.DB.prepare("DELETE FROM rate_limits WHERE reset_at < ?").bind(now), env.DB.prepare("DELETE FROM classroom_access_grants WHERE expires_at < ? OR used_at IS NOT NULL").bind(now), env.DB.prepare("DELETE FROM projects WHERE deleted_at IS NOT NULL AND deleted_at < ?").bind(now - 30 * DAY)]);
    })());
  },
};
