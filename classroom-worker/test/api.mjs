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

// ------------------------------------------- reading & editing a student's work
section("A teacher reads and edits a student's saved work");
const roster1 = await call(`/class/ai101/students/${SID}/projects`, { token: T1 });
check("a teacher lists a student's saved projects",
      roster1.status === 200 && Array.isArray(roster1.data?.projects) && roster1.data.projects.length >= 1, roster1);
const SPID = (roster1.data?.projects || [])[0]?.id;
check("another class's teacher cannot list them",
      (await call(`/class/ai101/students/${SID}/projects`, { token: T2 })).status === 403);
check("a student cannot list a classmate's projects",
      (await call(`/class/ai101/students/${SID}/projects`, { token: S1 })).status === 403);
check("signed out cannot list a student's projects",
      (await call(`/class/ai101/students/${SID}/projects`)).status === 401);
check("listing an unknown student is 404",
      (await call(`/class/ai101/students/no-such-id/projects`, { token: T1 })).status === 404);
check("relabelling the class in the list URL does not reach them",
      (await call(`/class/ai102/students/${SID}/projects`, { token: T2 })).status === 404);

check("a teacher reads a student's project files", await (async () => {
  const full = await call(`/class/ai101/students/${SID}/projects/${SPID}`, { token: T1 });
  return full.status === 200 && typeof full.data?.project?.files?.["script.js"] === "string";
})());
check("another class's teacher cannot read it",
      (await call(`/class/ai101/students/${SID}/projects/${SPID}`, { token: T2 })).status === 403);
check("reading an unknown project is 404",
      (await call(`/class/ai101/students/${SID}/projects/00000000-0000-0000-0000-000000000000`, { token: T1 })).status === 404);

check("a teacher edits a student's project", await (async () => {
  const put = await call(`/class/ai101/students/${SID}/projects/${SPID}`, { method: "PUT", token: T1,
    body: { files: { "script.js": "const x = 1;" } } });
  if (put.status !== 200) return false;
  const full = await call(`/class/ai101/students/${SID}/projects/${SPID}`, { token: T1 });
  return full.data?.project?.files?.["script.js"] === "const x = 1;";
})());
check("the edit reaches the student's own account", await (async () => {
  const full = await call("/projects/" + SPID, { token: S1 });
  return full.data?.project?.files?.["script.js"] === "const x = 1;";
})());
check("a teacher's key is scrubbed out on edit too", await (async () => {
  await call(`/class/ai101/students/${SID}/projects/${SPID}`, { method: "PUT", token: T1,
    body: { files: { "script.js": 'const K = "sk-teachers-real-key-zzz999";' } } });
  const text = (await call("/projects/" + SPID, { token: S1 })).data?.project?.files?.["script.js"] || "";
  return text.includes("put-your-own-key-here") && !text.includes("teachers-real-key");
})());
check("a student cannot edit a classmate's project",
      (await call(`/class/ai101/students/${SID}/projects/${SPID}`, { method: "PUT", token: S1, body: { files: { "script.js": "1" } } })).status === 403);
check("another class's teacher cannot edit it",
      (await call(`/class/ai101/students/${SID}/projects/${SPID}`, { method: "PUT", token: T2, body: { files: { "script.js": "1" } } })).status === 403);
check("editing an unknown project is 404",
      (await call(`/class/ai101/students/${SID}/projects/00000000-0000-0000-0000-000000000000`, { method: "PUT", token: T1, body: { files: { "a.js": "1" } } })).status === 404);

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
/* A site of more than one page, one of them in a folder: a stranger clicking
   through a shared link needs every page, each with its own stylesheet. */
check("save a site with two pages", (await call("/projects/" + PID, { method: "PUT", token: T1,
      body: { title: "ZZ Suite Project", files: {
        "index.html": '<a href="pages/about.html">About</a><script src="script.js"></script>',
        "pages/about.html": '<link rel="stylesheet" href="../style.css"><h1>About</h1>',
        "style.css": "h1 { color: teal; }",
        "script.js": 'const API_KEY = "sk-zz-shared-page-key-123456";' } } })).status === 200);
const share = await call(`/projects/${PID}/share`, { method: "POST", token: T1 });
check("turn sharing on", share.status === 200 && !!share.data?.slug, share);
const slug = share.data?.slug;
check("the slug does not contain the owner's name", !!slug && !/zz\.test|t101/i.test(slug), slug);
const shared = await call("/shared/" + slug);
check("anyone can read the shared copy", shared.status === 200 && !!shared.data, shared.status);
check("the shared copy carries no account id",
      !JSON.stringify(shared.data || {}).includes("zz-t101"));
check("every page of the site is in the shared copy",
      Object.keys(shared.data?.pages || {}).sort().join() === "index.html,pages/about.html", shared.data?.pages);
check("a page in a folder gets the stylesheet from the folder above",
      (shared.data?.pages?.["pages/about.html"] || "").includes("<style>h1 { color: teal; }</style>"), shared.data?.pages);
check("html is still index.html, for a share page cached from before pages",
      !!shared.data?.html && shared.data.html === shared.data.pages?.["index.html"]);
check("files names every file, so a link to a picture is not a link to nothing",
      (shared.data?.files || []).slice().sort().join() === "index.html,pages/about.html,script.js,style.css", shared.data?.files);
check("the key is gone from every page", !JSON.stringify(shared.data || {}).includes("sk-zz-shared"));
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

// ------------------------------------------- codes an account is registered to
section("Codes an account is registered to");
const registeredPupil = await call("/login/account", { method: "POST", body: { username: "zz.test.stu03", password: "test-pw-stu" } });
const unregisteredPupil = await call("/login/account", { method: "POST", body: { username: "zz.test.stu04", password: "test-pw-stu" } });
const registered = (await call("/me/access", { token: registeredPupil.data?.token })).data?.access;
check("a registered student sees what their code unlocks",
      JSON.stringify(registered?.tools) === '["pixel-art","vex"]' && JSON.stringify(registered?.play) === '["pong"]' && registered?.print === true, registered);
check("a code that is switched off unlocks nothing, not even its games",
      JSON.stringify(registered?.labels) === '["ZZ Test Code"]', registered);
const unregistered = (await call("/me/access", { token: unregisteredPupil.data?.token })).data?.access;
check("a student registered to nothing sees nothing", unregistered?.labels?.length === 0 && unregistered?.tools?.length === 0, unregistered);
check("no token, no access list", (await call("/me/access")).status === 401);
const sneak = { method: "PUT", body: { codes: ["0000000000000000000000000000000000000000000000000000000000000001"] } };
check("a student cannot register themselves to a code",
      (await call("/admin/account/zz-stu-04/access", { ...sneak, token: unregisteredPupil.data?.token })).status === 403);
check("an instructor cannot register anyone either",
      (await call("/admin/account/zz-stu-04/access", { ...sneak, token: T1 })).status === 403);
check("and the student still sees nothing",
      (await call("/me/access", { token: unregisteredPupil.data?.token })).data?.access?.labels?.length === 0);

// ------------------------------------------------- Python Coding Challenges
section("Python Coding Challenges");
const challenger = (await call("/login/account", { method: "POST", body: { username: "zz.test.stu05", password: "test-pw-stu" } })).data?.token;
const outsider = unregisteredPupil.data?.token;
check("a student without the PCC code is turned away",
      (await call("/challenges/progress", { token: outsider })).status === 403 &&
      (await call("/challenges/key", { token: outsider })).status === 403);
check("and so is nobody at all", (await call("/challenges/progress")).status === 401);
check("a teacher is let in without a code", (await call("/challenges/progress", { token: T1 })).status === 200);
const fresh = (await call("/challenges/progress", { token: challenger })).data;
check("a registered student starts on zero", fresh?.points === 0 && Object.keys(fresh?.challenges || {}).length === 0, fresh);
const keyReply = await call("/challenges/key", { token: challenger });
check("a registered student can fetch the checker key", keyReply.status === 200 && "key" in (keyReply.data || {}), keyReply);

const gameFiles = { "game.txt": "room Play\n", "Game.start.py": "set_room('Play')\n", "Play.start.py": "x = 1\n", "art/hero.json": "{\"big\": true}" };
const game = (await call("/projects", { method: "POST", token: challenger, body: { title: "ZZ PCC Game", kind: "pixelpad", files: gameFiles } })).data?.project;
const web = (await call("/projects", { method: "POST", token: challenger, body: { title: "ZZ PCC Web", kind: "web", files: { "index.html": "hi" } } })).data?.project;
const theirs = (await call("/projects", { method: "POST", token: outsider, body: { title: "ZZ PCC Not Yours", kind: "pixelpad", files: gameFiles } })).data?.project;
const submit = (challengeId, body, token = challenger) =>
  call(`/challenges/${challengeId}/submissions`, { method: "POST", token, body });

const miss = await submit("double-jump", { projectId: game?.id, passed: false, notes: ["You never count the jumps.", "", "Landing does not give them back."] });
check("a failed project earns nothing and keeps its notes",
      miss.status === 200 && miss.data?.earned === 0 && miss.data?.points === 0 &&
      JSON.stringify(miss.data?.challenges?.["double-jump"]?.last?.notes) === '["You never count the jumps.","Landing does not give them back."]', miss);
const hit = await submit("double-jump", { projectId: game?.id, passed: true, notes: ["Nice counting."] });
check("the first pass earns 1000", hit.data?.earned === 1000 && hit.data?.points === 1000 && hit.data?.challenges?.["double-jump"]?.passed === true, hit);
const again = await submit("double-jump", { projectId: game?.id, passed: true, notes: [] });
check("passing the same challenge again earns nothing more", again.data?.earned === 0 && again.data?.points === 1000 && again.data?.challenges?.["double-jump"]?.attempts === 3, again);
const racing = await Promise.all([1, 2, 3].map(() => submit("charge-shot", { projectId: game?.id, passed: true, notes: [] })));
check("three passes at once still pay out once",
      racing.reduce((sum, reply) => sum + (reply.data?.earned || 0), 0) === 1000 &&
      (await call("/challenges/progress", { token: challenger })).data?.points === 2000, racing.map((reply) => reply.data?.earned));
check("someone else's project cannot be handed in", (await submit("walk-and-face", { projectId: theirs?.id, passed: true })).status === 404);
check("a web project cannot be handed in", (await submit("walk-and-face", { projectId: web?.id, passed: true })).status === 400);
check("a challenge id that is not one is refused", (await submit("Not_A..Challenge", { projectId: game?.id, passed: true })).status === 404);
check("passed has to be exactly true to count",
      (await submit("homing-missile", { projectId: game?.id, passed: "true" })).data?.earned === 0);
const chatty = await submit("coin-collector", { projectId: game?.id, passed: false, notes: Array.from({ length: 20 }, (_, index) => "note " + index) });
check("a flood of notes is cut to twelve", chatty.data?.challenges?.["coin-collector"]?.last?.notes?.length === 12, chatty.data?.challenges?.["coin-collector"]);
check("the outsider still has no points to see", (await call("/challenges/progress", { token: outsider })).status === 403);

// ------------------------------------------- Reviewing challenges (admins)
section("Reviewing challenges");
const admin = (await call("/login/account", { method: "POST", body: { username: "zz.test.admin", password: "test-pw-stu" } })).data?.token;
check("the test admin can sign in", !!admin);
const walkCode = (speedName, speed) => ({
  "game.txt": "room Play\nobject Hero\n", "Game.start.py": "set_room('Play')\n",
  "Hero.start.py": `self.${speedName} = ${speed}\n`,
  "Hero.loop.py": `if key_is_pressed('right'):\n    self.x += self.${speedName}\n    self.scaleX = 1\n` +
                  `if key_is_pressed('left'):\n    self.x -= self.${speedName}\n    self.scaleX = -1\n`,
  "art/hero.json": "{\"big\": true}",
});
const otherWalk = {
  "game.txt": "room Play\nobject Hero\n", "Game.start.py": "set_room('Play')\n",
  "Hero.loop.py": "direction = 0\nif key_is_pressed('d'):\n    direction = 1\nif key_is_pressed('a'):\n    direction = -1\n" +
                  "self.x = self.x + direction * 3\nif direction != 0:\n    self.scaleX = direction\n",
};
const newGame = async (title, files) => (await call("/projects", { method: "POST", token: challenger, body: { title, kind: "pixelpad", files } })).data?.project;
const approvedWalk = await newGame("ZZ PCC Walk", walkCode("speed", 4));
const copiedWalk = await newGame("ZZ PCC Walk Copy", walkCode("pace", 7));
const ownWalk = await newGame("ZZ PCC Walk Own", otherWalk);

const adminProgress = (await call("/challenges/progress", { token: admin })).data;
check("an admin's progress carries the review counts", adminProgress?.admin === true && adminProgress?.review?.["double-jump"]?.total === 3 &&
      adminProgress?.review?.["double-jump"]?.earned === 1, adminProgress?.review);
check("a student's does not", fresh && !("admin" in fresh) && !("review" in ((await call("/challenges/progress", { token: challenger })).data || {})));
check("a teacher's does not either", !("review" in ((await call("/challenges/progress", { token: T1 })).data || {})));
check("a teacher cannot read the log", (await call("/challenges/double-jump/log", { token: T1 })).status === 403);
check("a student cannot read the log", (await call("/challenges/double-jump/log", { token: challenger })).status === 403);

const turnedDown = await submit("walk-and-face", { projectId: approvedWalk?.id, passed: false, notes: ["The checker missed it."], ranClean: true });
check("with nothing approved yet, a turned-down project stays turned down", turnedDown.data?.passed === false && turnedDown.data?.earned === 0, turnedDown.data);
let log = (await call("/challenges/walk-and-face/log", { token: admin })).data;
const firstRow = log?.submissions?.[0];
check("the log lists it, with the student and the AI's notes",
      log?.submissions?.length === 1 && firstRow?.student === "ZZ Pupil 05" && firstRow?.projectTitle === "ZZ PCC Walk" &&
      firstRow?.passed === false && firstRow?.notes?.[0] === "The checker missed it." && log?.approved?.length === 0, log);
const opened = await call(`/challenges/submissions/${firstRow?.id}`, { token: admin });
check("an admin can open it and see the code it was judged on, not the pictures",
      opened.status === 200 && opened.data?.files?.["Hero.loop.py"]?.includes("self.speed") && !("art/hero.json" in (opened.data?.files || {})), opened.data);
check("a teacher cannot open it", (await call(`/challenges/submissions/${firstRow?.id}`, { token: T1 })).status === 403);
check("a student cannot grant themselves the points",
      (await call(`/challenges/submissions/${firstRow?.id}/approve`, { method: "POST", token: challenger })).status === 403);
check("nobody can revoke a pass that is not one",
      (await call(`/challenges/submissions/${firstRow?.id}/revoke`, { method: "POST", token: admin })).status === 400);
check("a submission that is not there is a 404",
      (await call("/challenges/submissions/00000000-0000-0000-0000-000000000000", { token: admin })).status === 404);

const granted = await call(`/challenges/submissions/${firstRow?.id}/approve`, { method: "POST", token: admin });
check("granting it pays 1000", granted.status === 200 && granted.data?.earned === 1000, granted);
let studentView = (await call("/challenges/progress", { token: challenger })).data;
check("and the student sees it passed, by their teacher",
      studentView?.points === 3000 && studentView?.challenges?.["walk-and-face"]?.passed === true && studentView?.challenges?.["walk-and-face"]?.last?.approved === true, studentView);
const grantedTwice = await call(`/challenges/submissions/${firstRow?.id}/approve`, { method: "POST", token: admin });
log = (await call("/challenges/walk-and-face/log", { token: admin })).data;
check("granting it twice pays nothing more and keeps one copy",
      grantedTwice.data?.earned === 0 && log?.approved?.length === 1 && (await call("/challenges/progress", { token: challenger })).data?.points === 3000, { grantedTwice: grantedTwice.data, approved: log?.approved });
check("the copy keeps the student's name and the admin's",
      log?.approved?.[0]?.student === "ZZ Pupil 05" && log?.approved?.[0]?.approvedBy === "ZZ Test Admin" && log?.submissions?.[0]?.approvedBy === "ZZ Test Admin", log);
const snapshotId = log?.approved?.[0]?.id;
const snapshot = await call(`/challenges/approved/${snapshotId}`, { token: admin });
check("an admin can open the approved copy", snapshot.status === 200 && snapshot.data?.files?.["Hero.loop.py"]?.includes("key_is_pressed('left')"), snapshot.data);
check("a student cannot", (await call(`/challenges/approved/${snapshotId}`, { token: challenger })).status === 403);

const crashed = await submit("walk-and-face", { projectId: copiedWalk?.id, passed: false, notes: [], ranClean: false });
check("a close copy that crashed is not passed", crashed.data?.passed === false && crashed.data?.matched === false, crashed.data);
const unsaid = await submit("walk-and-face", { projectId: copiedWalk?.id, passed: false, notes: [] });
check("nor one that did not say it ran clean", unsaid.data?.passed === false, unsaid.data);
const matched = await submit("walk-and-face", { projectId: copiedWalk?.id, passed: false, notes: ["The checker missed it."], ranClean: true });
check("a close copy that ran clean passes as a match",
      matched.data?.passed === true && matched.data?.matched === true && matched.data?.challenges?.["walk-and-face"]?.last?.matched === true, matched.data);
check("but pays nothing twice", matched.data?.earned === 0 && matched.data?.points === 3000, matched.data);
const different = await submit("walk-and-face", { projectId: ownWalk?.id, passed: false, notes: [], ranClean: true });
check("a project built another way is not matched", different.data?.passed === false && different.data?.matched === false, different.data);
log = (await call("/challenges/walk-and-face/log", { token: admin })).data;
const matchRow = log?.submissions?.find((row) => row.matchedId);
const openedMatch = (await call(`/challenges/submissions/${log?.submissions?.find((row) => row.matchedId)?.id}`, { token: admin })).data;
check("so does the matched project, opened", openedMatch?.matchedId === snapshotId && openedMatch?.matchScore >= 0.9 && openedMatch?.approvedAt === null, openedMatch);
check("the log shows the match, its score and whose project it matched",
      log?.submissions?.length === 5 && matchRow?.matchedId === snapshotId && matchRow?.matchScore >= 0.9 && matchRow?.matchedStudent === "ZZ Pupil 05", log?.submissions);

const takenBack = await call(`/challenges/submissions/${firstRow?.id}/revoke`, { method: "POST", token: admin });
log = (await call("/challenges/walk-and-face/log", { token: admin })).data;
studentView = (await call("/challenges/progress", { token: challenger })).data;
check("taking back the approved pass removes its copy", takenBack.status === 200 && log?.approved?.length === 0, log?.approved);
check("and its points move to the student's other pass",
      studentView?.points === 3000 && studentView?.challenges?.["walk-and-face"]?.passed === true &&
      log?.submissions?.find((row) => row.id === matchRow?.id)?.points === 1000, studentView);
const revokedRow = log?.submissions?.find((row) => row.id === firstRow?.id);
check("the revoked project says the teacher looked", revokedRow?.passed === false && revokedRow?.points === 0 &&
      revokedRow?.notes?.[0]?.startsWith("Your teacher looked"), revokedRow);
await call(`/challenges/submissions/${matchRow?.id}/revoke`, { method: "POST", token: admin });
studentView = (await call("/challenges/progress", { token: challenger })).data;
check("taking back the last pass takes the points", studentView?.points === 2000 && studentView?.challenges?.["walk-and-face"]?.passed === false, studentView);
const noCopyLeft = await submit("walk-and-face", { projectId: copiedWalk?.id, passed: false, notes: [], ranClean: true });
check("with the copy gone, the same project no longer matches", noCopyLeft.data?.passed === false, noCopyLeft.data);

await call(`/challenges/submissions/${firstRow?.id}/approve`, { method: "POST", token: admin });
log = (await call("/challenges/walk-and-face/log", { token: admin })).data;
check("granting again makes a new copy", log?.approved?.length === 1, log?.approved);
check("a teacher cannot remove a copy", (await call(`/challenges/approved/${log?.approved?.[0]?.id}`, { method: "DELETE", token: T1 })).status === 403);
const removedCopy = await call(`/challenges/approved/${log?.approved?.[0]?.id}`, { method: "DELETE", token: admin });
check("an admin can remove a copy and keep the pass",
      removedCopy.status === 200 && (await call("/challenges/walk-and-face/log", { token: admin })).data?.approved?.length === 0 &&
      (await call("/challenges/progress", { token: challenger })).data?.challenges?.["walk-and-face"]?.passed === true);
check("a removed copy is gone", (await call(`/challenges/approved/${log?.approved?.[0]?.id}`, { token: admin })).status === 404);

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
