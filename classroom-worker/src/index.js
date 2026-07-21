/* ============================================================
   UTG Classroom API  (Cloudflare Worker + D1)
   - Guest login: class code + name -> passwordless account (wiped after TTL).
   - Permanent accounts: username + password (admin-managed).
   - Code projects saved per account. Media metadata (blobs go to R2, later).
   - Admin dashboard endpoints (role = 'admin').
   - Nightly cron wipes expired guest accounts + all their data.
   Passwords are PBKDF2-SHA256 hashed; sessions are random bearer tokens.
   ============================================================ */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, authorization",
  "Access-Control-Max-Age": "86400",
};
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json", "Cache-Control": "no-store" } });
const bad = (msg, status = 400) => json({ error: msg }, status);

// ---- crypto helpers -----------------------------------------
const enc = new TextEncoder();
const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const fromHex = (hex) => new Uint8Array(hex.match(/.{1,2}/g).map((h) => parseInt(h, 16)));
function rndHex(n) { return toHex(crypto.getRandomValues(new Uint8Array(n))); }
function uuid() { return crypto.randomUUID(); }
async function hashPassword(password, saltHex) {
  const salt = saltHex ? fromHex(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
  return { hash: toHex(bits), salt: toHex(salt) };
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

// ---- sessions -----------------------------------------------
async function newSession(db, accountId, days = 30) {
  const token = rndHex(24), now = Date.now();
  await db.prepare("INSERT INTO sessions (token, account_id, created_at, expires_at) VALUES (?,?,?,?)")
    .bind(token, accountId, now, now + days * 86400000).run();
  return token;
}
async function accountFromRequest(db, request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return null;
  const s = await db.prepare("SELECT account_id, expires_at FROM sessions WHERE token = ?").bind(token).first();
  if (!s || s.expires_at < Date.now()) return null;
  return await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(s.account_id).first();
}
function publicAccount(a) {
  return { id: a.id, classId: a.class_id, name: a.name, username: a.username || null, isPermanent: !!a.is_permanent, role: a.role, createdAt: a.created_at, lastSeen: a.last_seen };
}

// ---- routing ------------------------------------------------
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const db = env.DB;
    try {
      if (path === "/" || path === "/health") return json({ ok: true, service: "utg-classroom-api" });

      // ---- guest login: class code + name ----
      if (path === "/login/guest" && request.method === "POST") {
        const { classId, name } = await request.json();
        if (!classId || !name || !name.trim()) return bad("Need a class and a name.");
        const allowed = (env.ALLOWED_CLASSES || "*").split(",").map((s) => s.trim());
        if (!allowed.includes("*") && !allowed.includes(classId)) return bad("Unknown class.", 403);
        const cleanName = name.trim().slice(0, 40);
        const now = Date.now();
        let acc = await db.prepare("SELECT * FROM accounts WHERE class_id = ? AND lower(name) = lower(?) ORDER BY is_permanent DESC LIMIT 1")
          .bind(classId, cleanName).first();
        if (acc && acc.is_permanent && acc.password_hash) return bad("That name has a permanent account. Log in with a password.", 409);
        if (!acc) {
          const id = uuid();
          await db.prepare("INSERT INTO accounts (id, class_id, name, is_permanent, role, created_at, last_seen) VALUES (?,?,?,0,'student',?,?)")
            .bind(id, classId, cleanName, now, now).run();
          acc = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
        } else {
          await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, acc.id).run();
        }
        const token = await newSession(db, acc.id, acc.is_permanent ? 30 : 4);
        return json({ token, account: publicAccount(acc) });
      }

      // ---- account login: username + password ----
      if (path === "/login/account" && request.method === "POST") {
        const { username, password } = await request.json();
        if (!username || !password) return bad("Username and password required.");
        const acc = await db.prepare("SELECT * FROM accounts WHERE username = ?").bind(String(username).trim()).first();
        if (!acc || !acc.password_hash) return bad("Wrong username or password.", 401);
        const { hash } = await hashPassword(password, acc.password_salt);
        if (!timingSafeEqual(hash, acc.password_hash)) return bad("Wrong username or password.", 401);
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(Date.now(), acc.id).run();
        return json({ token: await newSession(db, acc.id, 30), account: publicAccount(acc) });
      }

      // ---- everything below needs a session ----
      const me = await accountFromRequest(db, request);
      if (path === "/me") { return me ? json({ account: publicAccount(me) }) : bad("Not signed in.", 401); }
      if (path === "/logout" && request.method === "POST") {
        const auth = request.headers.get("authorization") || "";
        if (auth.startsWith("Bearer ")) await db.prepare("DELETE FROM sessions WHERE token = ?").bind(auth.slice(7)).run();
        return json({ ok: true });
      }
      if (!me) return bad("Not signed in.", 401);

      // ---- my code project ----
      if (path === "/project" && request.method === "GET") {
        const p = await db.prepare("SELECT * FROM projects WHERE account_id = ? ORDER BY updated_at DESC LIMIT 1").bind(me.id).first();
        return json({ project: p ? { id: p.id, title: p.title, files: JSON.parse(p.files), updatedAt: p.updated_at } : null });
      }
      if (path === "/project" && request.method === "PUT") {
        const { title, files } = await request.json();
        if (!files || typeof files !== "object") return bad("Missing files.");
        const now = Date.now();
        const existing = await db.prepare("SELECT id FROM projects WHERE account_id = ? LIMIT 1").bind(me.id).first();
        const filesJson = JSON.stringify(files);
        if (existing) await db.prepare("UPDATE projects SET title = ?, files = ?, updated_at = ? WHERE id = ?").bind(title || "My project", filesJson, now, existing.id).run();
        else await db.prepare("INSERT INTO projects (id, account_id, title, files, updated_at) VALUES (?,?,?,?,?)").bind(uuid(), me.id, title || "My project", filesJson, now).run();
        await db.prepare("UPDATE accounts SET last_seen = ? WHERE id = ?").bind(now, me.id).run();
        return json({ ok: true, updatedAt: now });
      }

      // ---- admin (role = 'admin') ----
      if (path.startsWith("/admin/")) {
        if (me.role !== "admin") return bad("Admins only.", 403);

        if (path === "/admin/accounts" && request.method === "GET") {
          const cls = url.searchParams.get("classId");
          const rows = cls
            ? (await db.prepare("SELECT * FROM accounts WHERE class_id = ? ORDER BY is_permanent DESC, last_seen DESC").bind(cls).all()).results
            : (await db.prepare("SELECT * FROM accounts ORDER BY is_permanent DESC, last_seen DESC").all()).results;
          return json({ accounts: rows.map(publicAccount) });
        }
        if (path === "/admin/account" && request.method === "POST") {
          // create a permanent student account
          const { classId, name, username, password } = await request.json();
          if (!classId || !name || !username || !password) return bad("Need classId, name, username, password.");
          const dupe = await db.prepare("SELECT id FROM accounts WHERE username = ?").bind(username.trim()).first();
          if (dupe) return bad("That username is taken.", 409);
          const { hash, salt } = await hashPassword(password);
          const id = uuid(), now = Date.now();
          await db.prepare("INSERT INTO accounts (id, class_id, name, username, password_hash, password_salt, is_permanent, role, created_at, last_seen) VALUES (?,?,?,?,?,?,1,'student',?,?)")
            .bind(id, classId, name.trim(), username.trim(), hash, salt, now, now).run();
          return json({ account: publicAccount(await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first()) });
        }
        const m = path.match(/^\/admin\/account\/([^/]+)$/);
        if (m) {
          const id = m[1];
          const acc = await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first();
          if (!acc) return bad("No such account.", 404);
          if (request.method === "DELETE") {
            await db.batch([
              db.prepare("DELETE FROM projects WHERE account_id = ?").bind(id),
              db.prepare("DELETE FROM media WHERE account_id = ?").bind(id),
              db.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id),
              db.prepare("DELETE FROM accounts WHERE id = ?").bind(id),
            ]);
            return json({ ok: true });
          }
          if (request.method === "PATCH") {
            const body = await request.json();
            const sets = [], vals = [];
            if (body.name != null) { sets.push("name = ?"); vals.push(String(body.name).trim()); }
            if (body.promote === true) { sets.push("is_permanent = 1"); }
            if (body.username != null) {
              const dupe = await db.prepare("SELECT id FROM accounts WHERE username = ? AND id != ?").bind(String(body.username).trim(), id).first();
              if (dupe) return bad("That username is taken.", 409);
              sets.push("username = ?"); vals.push(String(body.username).trim());
            }
            if (body.password != null && body.password !== "") {
              const { hash, salt } = await hashPassword(String(body.password));
              sets.push("password_hash = ?", "password_salt = ?"); vals.push(hash, salt);
            }
            if (!sets.length) return bad("Nothing to change.");
            vals.push(id);
            await db.prepare(`UPDATE accounts SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();
            return json({ account: publicAccount(await db.prepare("SELECT * FROM accounts WHERE id = ?").bind(id).first()) });
          }
        }
      }

      return bad("Not found.", 404);
    } catch (e) {
      return json({ error: "Server error", detail: String(e && e.message || e) }, 500);
    }
  },

  // nightly: delete guest accounts past their TTL + all their data
  async scheduled(_event, env, ctx) {
    ctx.waitUntil((async () => {
      const ttlDays = parseInt(env.GUEST_TTL_DAYS || "120", 10);
      const cutoff = Date.now() - ttlDays * 86400000;
      const stale = (await env.DB.prepare("SELECT id FROM accounts WHERE is_permanent = 0 AND last_seen < ?").bind(cutoff).all()).results;
      for (const { id } of stale) {
        // TODO(media): also delete this account's R2 objects once R2 is enabled.
        await env.DB.batch([
          env.DB.prepare("DELETE FROM projects WHERE account_id = ?").bind(id),
          env.DB.prepare("DELETE FROM media WHERE account_id = ?").bind(id),
          env.DB.prepare("DELETE FROM sessions WHERE account_id = ?").bind(id),
          env.DB.prepare("DELETE FROM accounts WHERE id = ?").bind(id),
        ]);
      }
    })());
  },
};
