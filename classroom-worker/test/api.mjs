/* The classroom API, end to end against a deployed worker.

   Two throwaway instructors have to exist first - seed.sql makes them, and
   clean.sql removes everything this suite touched:

       npx wrangler d1 execute utg-classroom --remote --file test/seed.sql
       node test/api.mjs
       npx wrangler d1 execute utg-classroom --remote --file test/clean.sql

   The boundary cases matter more than the happy paths here. One account
   writing into another is the only place this API does that, and every check
   below that expects a 403 or a 404 is guarding a real way for a student to
   read or overwrite someone else's work.
*/

const API = process.argv[2] || "https://utg-classroom-api.utgapps.workers.dev";
let pass = 0;
const failed = [];

async function call(path, { method = "GET", token, body, raw } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: { "content-type": "application/json", ...(token ? { authorization: "Bearer " + token } : {}) },
    body: body === undefined ? undefined : (raw ? body : JSON.stringify(body)),
  });
  let data = null;
  try { data = await res.json(); } catch { /* some errors have no body */ }
  return { status: res.status, data };
}

function check(label, ok, detail) {
  if (ok) { pass++; console.log("  ok    " + label); }
  else { failed.push(label); console.log("  FAIL  " + label + (detail !== undefined ? "\n        -> " + JSON.stringify(detail) : "")); }
}
function section(name) { console.log("\n" + name); }

// ---------------------------------------------------------------- sign in
section("Sign in");
const health = await call("/health");
check("the worker is up", health.status === 200 && health.data?.ok, health);

const t1 = await call("/login/account", { method: "POST", body: { username: "zz.test.t101", password: "test-pw-101" } });
const t2 = await call("/login/account", { method: "POST", body: { username: "zz.test.t102", password: "test-pw-102" } });
check("the ai101 instructor signs in", t1.status === 200 && !!t1.data?.token, t1);
check("the ai102 instructor signs in", t2.status === 200 && !!t2.data?.token, t2);
if (!t1.data?.token || !t2.data?.token) {
  console.log("\nCannot continue without both instructors - run seed.sql first.");
  process.exit(1);
}
const T1 = t1.data.token, T2 = t2.data.token;

check("a wrong password is refused",
      (await call("/login/account", { method: "POST", body: { username: "zz.test.t101", password: "nope" } })).status === 401);
check("an unknown username is refused the same way",
      (await call("/login/account", { method: "POST", body: { username: "zz.nobody", password: "test-pw-101" } })).status === 401);
check("who am I", (await call("/me", { token: T1 })).data?.account?.classId === "ai101");
check("a made-up token is not a session", (await call("/me", { token: "0".repeat(64) })).status === 401);
check("no token at all is 401", (await call("/me")).status === 401);

// ----------------------------------------------------------- own projects
section("A teacher's own projects");
const made = await call("/projects", { method: "POST", token: T1,
  body: { title: "ZZ Suite Project", kind: "web", files: { "index.html": "<p>hi</p>", "script.js": "// x" } } });
check("create", made.status === 200 && !!made.data?.project?.id, made);
const PID = made.data?.project?.id;

const list = await call("/projects", { token: T1 });
check("it appears in the list", (list.data?.projects || []).some((p) => p.id === PID));
check("the list carries no file contents (it would be megabytes)",
      !JSON.stringify(list.data).includes("<p>hi</p>"));

const got = await call("/projects/" + PID, { token: T1 });
check("open it again and the files are there", got.data?.project?.files?.["index.html"] === "<p>hi</p>", got.data?.project?.files);

check("save an edit", (await call("/projects/" + PID, { method: "PUT", token: T1,
      body: { title: "ZZ Suite Project", files: { "index.html": "<p>edited</p>" } } })).status === 200);
check("the edit stuck",
      (await call("/projects/" + PID, { token: T1 })).data?.project?.files?.["index.html"] === "<p>edited</p>");

check("kind cannot be changed after creation",
      (await call("/projects/" + PID, { method: "PUT", token: T1, body: { kind: "java" } })).status === 200
      && (await call("/projects/" + PID, { token: T1 })).data?.project?.kind === "web");

// --------------------------------------------------------------- isolation
section("One account cannot reach another's work");
check("another teacher reading it gets 404, not 403",
      (await call("/projects/" + PID, { token: T2 })).status === 404);
check("another teacher cannot write to it",
      (await call("/projects/" + PID, { method: "PUT", token: T2, body: { files: { "index.html": "<p>owned</p>" } } })).status === 404);
check("another teacher cannot delete it",
      (await call("/projects/" + PID, { method: "DELETE", token: T2 })).status === 404);
check("it survived all that",
      (await call("/projects/" + PID, { token: T1 })).data?.project?.files?.["index.html"] === "<p>edited</p>");
check("a guessed id is 404", (await call("/projects/00000000-0000-0000-0000-000000000000", { token: T1 })).status === 404);
// Only encoded forms are worth sending: fetch resolves a literal "../.." before
// the request leaves, so that case measures the client, not the worker. (The
// router matches [^/]+ for an id, which cannot span a slash in any case.)
for (const nasty of ["..%2f..%2fprojects", "%2e%2e/admin", "%2e%2e%2f%2e%2e%2fadmin%2faccounts", "zz-t101"]) {
  const res = await call("/projects/" + nasty, { token: T1 });
  check(`a hostile id (${nasty}) does not escape`, res.status === 404 || res.status === 400, res.status);
}

// ------------------------------------------------------------------ roster
section("The class roster");
check("a teacher reads their own class", (await call("/class/ai101/students", { token: T1 })).status === 200);
check("a teacher cannot read another class", (await call("/class/ai102/students", { token: T1 })).status === 403);
check("signed out, nobody reads a roster", (await call("/class/ai101/students")).status === 401);

const pupil = await call("/class/ai101/students", { method: "POST", token: T1,
  body: { name: "ZZ Suite Pupil", username: "zz.test.pupil", password: "first-pw-1" } });
check("enrol a student", pupil.status === 200 && !!pupil.data?.student?.id, pupil);
const SID = pupil.data?.student?.id;

check("a duplicate username is refused",
      (await call("/class/ai101/students", { method: "POST", token: T1,
        body: { name: "Someone Else", username: "zz.test.pupil", password: "another-pw" } })).status === 409);
check("a short password is refused",
      (await call("/class/ai101/students", { method: "POST", token: T1,
        body: { name: "Short Pw", username: "zz.test.short", password: "abc" } })).status === 400);
check("a username with spaces is refused",
      (await call("/class/ai101/students", { method: "POST", token: T1,
        body: { name: "Spacey", username: "zz test spacey", password: "long-enough" } })).status === 400);
check("a teacher cannot enrol into another class",
      (await call("/class/ai102/students", { method: "POST", token: T1,
        body: { name: "Wrong Class", username: "zz.test.wrong", password: "long-enough" } })).status === 403);

const s1 = await call("/login/account", { method: "POST", body: { username: "zz.test.pupil", password: "first-pw-1" } });
check("the student can sign in", s1.status === 200 && !!s1.data?.token, s1);
const S1 = s1.data?.token;
check("the student sees themselves in ai101", (await call("/me", { token: S1 })).data?.account?.classId === "ai101");
check("a student cannot read the roster", (await call("/class/ai101/students", { token: S1 })).status === 403);

// -------------------------------------------------------------- seeding
section("Catching a student up");
const seeded = await call("/class/ai101/seed", { method: "POST", token: T1,
  body: { accountId: SID, title: "ZZ Caught up to week 4",
          files: { "script.js": 'const API_KEY = "sk-class-teachers-real-key-abc123";\nconsole.log(1);' } } });
check("seed a project into the student", seeded.status === 200, seeded);
check("the teacher's API key does NOT travel with it", await (async () => {
  const theirs = await call("/projects", { token: S1 });
  const id = (theirs.data?.projects || []).find((p) => p.title.includes("Caught up"))?.id;
  if (!id) return false;
  const full = await call("/projects/" + id, { token: S1 });
  const text = full.data?.project?.files?.["script.js"] || "";
  return text.includes("put-your-own-key-here") && !text.includes("teachers-real-key");
})());
check("a teacher cannot seed into another class's student",
      (await call("/class/ai102/seed", { method: "POST", token: T2,
        body: { accountId: SID, title: "ZZ Nope", files: { "a.js": "1" } } })).status === 404);
check("a student cannot seed into anyone",
      (await call("/class/ai101/seed", { method: "POST", token: S1,
        body: { accountId: SID, title: "ZZ Nope", files: { "a.js": "1" } } })).status === 403);
check("seeding an unknown student is 404",
      (await call("/class/ai101/seed", { method: "POST", token: T1,
        body: { accountId: "no-such-id", title: "ZZ Nope", files: { "a.js": "1" } } })).status === 404);

// ------------------------------------------------------------ password reset
section("Resetting a student's password");
check("another class's teacher gets 403",
      (await call(`/class/ai101/students/${SID}/password`, { method: "POST", token: T2, body: { password: "hacked-pw" } })).status === 403);
check("a student cannot reset anyone",
      (await call(`/class/ai101/students/${SID}/password`, { method: "POST", token: S1, body: { password: "hacked-pw" } })).status === 403);
check("signed out is 401",
      (await call(`/class/ai101/students/${SID}/password`, { method: "POST", body: { password: "hacked-pw" } })).status === 401);
check("a short password is refused",
      (await call(`/class/ai101/students/${SID}/password`, { method: "POST", token: T1, body: { password: "abc" } })).status === 400);
check("an unknown student is 404",
      (await call("/class/ai101/students/no-such-id/password", { method: "POST", token: T1, body: { password: "long-enough" } })).status === 404);
check("relabelling the class in the URL does not reach them",
      (await call(`/class/ai102/students/${SID}/password`, { method: "POST", token: T2, body: { password: "long-enough" } })).status === 404);
const guestReset = await call("/class/ai101/students/zz-guest/password", { method: "POST", token: T1, body: { password: "long-enough" } });
check("a guest is refused, and told why", guestReset.status === 400 && /guest/i.test(guestReset.data?.error || ""), guestReset);
check("none of that changed the password",
      (await call("/login/account", { method: "POST", body: { username: "zz.test.pupil", password: "first-pw-1" } })).status === 200);

const reset = await call(`/class/ai101/students/${SID}/password`, { method: "POST", token: T1, body: { password: "second-pw-2" } });
check("the teacher resets it", reset.status === 200 && reset.data?.username === "zz.test.pupil", reset);
check("the old password stops working",
      (await call("/login/account", { method: "POST", body: { username: "zz.test.pupil", password: "first-pw-1" } })).status === 401);
check("the new password works",
      (await call("/login/account", { method: "POST", body: { username: "zz.test.pupil", password: "second-pw-2" } })).status === 200);
check("a session left open elsewhere is dead", (await call("/me", { token: S1 })).status === 401);

// ----------------------------------------------------------------- sharing
section("Sharing a project");
const share = await call(`/projects/${PID}/share`, { method: "POST", token: T1 });
check("turn sharing on", share.status === 200 && !!share.data?.slug, share);
const slug = share.data?.slug;
check("the slug does not contain the owner's name", !!slug && !/zz\.test|t101/i.test(slug), slug);
const shared = await call("/shared/" + slug);
check("anyone can read the shared copy", shared.status === 200 && !!shared.data, shared.status);
check("the shared copy carries no account id",
      !JSON.stringify(shared.data || {}).includes("zz-t101"));
check("another account cannot share your project",
      (await call(`/projects/${PID}/share`, { method: "POST", token: T2 })).status === 404);
check("revoke really revokes", (await call(`/projects/${PID}/share`, { method: "DELETE", token: T1 })).status === 200);
check("the old link is gone, not stale", (await call("/shared/" + slug)).status === 404);

// ------------------------------------------------------------------ limits
section("Limits");
const big = "x".repeat(800_000);
check("an over-sized project is refused",
      [400, 413].includes((await call("/projects", { method: "POST", token: T1,
        body: { title: "ZZ Huge", kind: "web", files: { "big.js": big } } })).status));
const spam = [];
for (let i = 0; i < 32; i++) {
  spam.push((await call("/projects", { method: "POST", token: T1,
    body: { title: "ZZ Filler " + i, kind: "web", files: { "a.js": "1" } } })).status);
}
check("the per-account project cap holds", spam.includes(400), `statuses seen: ${[...new Set(spam)].join(",")}`);

// ------------------------------------------------------------------ tidy up
section("Tidy up");
const mine = await call("/projects", { token: T1 });
let removed = 0;
for (const p of mine.data?.projects || []) {
  if (/^ZZ /.test(p.title)) { await call("/projects/" + p.id, { method: "DELETE", token: T1 }); removed++; }
}
check(`deleted ${removed} test project(s)`, removed > 0);
check("the list is empty again",
      ((await call("/projects", { token: T1 })).data?.projects || []).filter((p) => /^ZZ /.test(p.title)).length === 0);

console.log(`\n${pass} checks passed, ${failed.length} failed`);
if (failed.length) console.log("failed: " + failed.join(", "));
process.exit(failed.length ? 1 : 0);
