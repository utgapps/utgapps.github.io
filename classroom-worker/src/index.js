/* UTG Classroom API: private class-code login, saved projects, and live rooms. */

const enc = new TextEncoder();
const dec = new TextDecoder();
const DAY = 86400000;
const HOUR = 60 * 60 * 1000;
const JSON_LIMIT = 750000;
const CLASSROOM_LIMIT = 1200000;

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
    "Access-Control-Allow-Headers": "content-type, authorization",
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
        const { code, name } = await readJson(request);
        const cleanCode = normalizeCode(code);
        const cleanName = String(name || "").trim().slice(0, 40);
        if (!validCode(cleanCode) || !cleanName) throw new HttpError("Enter your class code and name.");
        const lock = await checkCodeLock(db, request);
        const access = await db.prepare("SELECT class_id FROM class_access WHERE student_code_hash = ?").bind(await codeHash("student", cleanCode)).first();
        if (!access) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That student code is not valid.", 401); }
        await clearCodeAttempts(db, lock.browserKey);
        const now = Date.now(), id = crypto.randomUUID();
        await db.prepare("INSERT INTO accounts (id, class_id, name, is_permanent, role, created_at, last_seen) VALUES (?,?,?,0,'student',?,?)")
          .bind(id, access.class_id, cleanName, now, now).run();
        const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
        return response(request, env, { token: await newSession(db, id, 4), account: publicAccount(account) });
      }

      if (path === "/login/instructor" && request.method === "POST") {
        const { code } = await readJson(request);
        const cleanCode = normalizeCode(code);
        if (!validCode(cleanCode)) throw new HttpError("Enter your instructor code.");
        const lock = await checkCodeLock(db, request);
        const access = await db.prepare("SELECT class_id, instructor_account_id FROM class_access WHERE instructor_code_hash = ?")
          .bind(await codeHash("instructor", cleanCode)).first();
        if (!access) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That instructor code is not valid.", 401); }
        await clearCodeAttempts(db, lock.browserKey);
        const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(access.instructor_account_id).first();
        if (!account) throw new HttpError("This instructor account needs to be recreated by an admin.", 409);
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(Date.now(), account.id).run();
        return response(request, env, { token: await newSession(db, account.id, 1), account: publicAccount(account) });
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
        await rateLimit(db, request, "account-login", 8);
        const { username, password } = await readJson(request);
        if (!username || !password) throw new HttpError("Username and password required.");
        const account = await db.prepare("SELECT * FROM accounts WHERE username = ?").bind(String(username).trim()).first();
        if (!account || !account.password_hash) throw new HttpError("Wrong username or password.", 401);
        const { hash } = await hashPassword(password, account.password_salt);
        if (!timingSafeEqual(hash, account.password_hash)) throw new HttpError("Wrong username or password.", 401);
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(Date.now(), account.id).run();
        return response(request, env, { token: await newSession(db, account.id, 30), account: publicAccount(account) });
      }

      // The root four-character class-code gate verifies Classroom codes here
      // before revealing the Classroom link, so lockouts cannot be bypassed by
      // reloading the static home page.
      if (path === "/access/verify" && request.method === "POST") {
        const { code } = await readJson(request, 200);
        const cleanCode = normalizeCode(code);
        if (!validCode(cleanCode)) throw new HttpError("Enter a valid class code.");
        const lock = await checkCodeLock(db, request);
        const student = await db.prepare("SELECT class_id FROM class_access WHERE student_code_hash = ?").bind(await codeHash("student", cleanCode)).first();
        const instructor = student ? null : await db.prepare("SELECT class_id FROM class_access WHERE instructor_code_hash = ?").bind(await codeHash("instructor", cleanCode)).first();
        const access = student || instructor;
        if (!access) { await recordWrongCode(db, request, cleanCode); throw new HttpError("That class code is not valid.", 401); }
        await clearCodeAttempts(db, lock.browserKey);
        return response(request, env, { classId: access.class_id, role: student ? "student" : "instructor" });
      }

      // Used only by the TURN credential Worker. It deliberately returns no
      // account data, just whether the supplied opaque session is still valid.
      if (path === "/turn/verify" && request.method === "POST") {
        const { token } = await readJson(request, 200);
        const account = await accountFromToken(db, String(token || ""));
        return account ? response(request, env, { ok: true }) : bad(request, env, "Not signed in.", 401);
      }

      const me = await accountFromRequest(db, request);
      if (path === "/me") return me ? response(request, env, { account: publicAccount(me) }) : bad(request, env, "Not signed in.", 401);
      if (path === "/logout" && request.method === "POST") {
        const auth = request.headers.get("authorization") || "";
        if (auth.startsWith("Bearer ")) await db.prepare("DELETE FROM sessions WHERE token = ?").bind(auth.slice(7)).run();
        return response(request, env, { ok: true });
      }
      if (!me) return bad(request, env, "Not signed in.", 401);

      if (path === "/project" && request.method === "GET") {
        const project = await db.prepare("SELECT * FROM projects WHERE account_id = ? ORDER BY updated_at DESC LIMIT 1").bind(me.id).first();
        return response(request, env, { project: project ? { id: project.id, title: project.title, files: JSON.parse(project.files), updatedAt: project.updated_at } : null });
      }
      if (path === "/project" && request.method === "PUT") {
        const { title, files } = await readJson(request, JSON_LIMIT);
        if (!files || typeof files !== "object" || Array.isArray(files)) throw new HttpError("Missing project files.");
        const filesJson = JSON.stringify(files);
        if (enc.encode(filesJson).byteLength > JSON_LIMIT) throw new HttpError("Project is too large.", 413);
        const now = Date.now();
        const existing = await db.prepare("SELECT id FROM projects WHERE account_id = ? LIMIT 1").bind(me.id).first();
        if (existing) await db.prepare("UPDATE projects SET title = ?, files = ?, updated_at = ? WHERE id = ?").bind(String(title || "My project").slice(0, 80), filesJson, now, existing.id).run();
        else await db.prepare("INSERT INTO projects (id, account_id, title, files, updated_at) VALUES (?,?,?,?,?)").bind(crypto.randomUUID(), me.id, String(title || "My project").slice(0, 80), filesJson, now).run();
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, me.id).run();
        return response(request, env, { ok: true, updatedAt: now });
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
          await db.prepare("INSERT INTO class_access (class_id, student_code_hash, instructor_code_hash, instructor_account_id, updated_at) VALUES (?,?,?,?,?) ON CONFLICT(class_id) DO UPDATE SET student_code_hash=excluded.student_code_hash, instructor_code_hash=excluded.instructor_code_hash, updated_at=excluded.updated_at")
            .bind(classId, await codeHash("student", student), await codeHash("instructor", instructor), instructorAccountId, now).run();
          return response(request, env, { ok: true });
        }
        const accountMatch = path.match(/^\/admin\/account\/([^/]+)$/);
        if (accountMatch) {
          const id = accountMatch[1];
          const account = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
          if (!account) throw new HttpError("No such account.", 404);
          if (request.method === "DELETE") {
            if (env.MEDIA) for (const { r2_key } of (await db.prepare("SELECT r2_key FROM media WHERE account_id = ?").bind(id).all()).results) await env.MEDIA.delete(r2_key);
            await db.batch([db.prepare("DELETE FROM projects WHERE account_id = ?").bind(id), db.prepare("DELETE FROM media WHERE account_id = ?").bind(id), db.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id), db.prepare("DELETE FROM accounts WHERE id = ?").bind(id)]);
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
        await env.DB.batch([env.DB.prepare("DELETE FROM projects WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM media WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id), env.DB.prepare("DELETE FROM accounts WHERE id = ?").bind(id)]);
      }
      await env.DB.batch([env.DB.prepare("DELETE FROM sessions WHERE expires_at < ?").bind(now), env.DB.prepare("DELETE FROM live_rooms WHERE expires_at < ?").bind(now), env.DB.prepare("DELETE FROM rate_limits WHERE reset_at < ?").bind(now)]);
    })());
  },
};
