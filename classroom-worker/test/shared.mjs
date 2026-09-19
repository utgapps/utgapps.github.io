/* A project that two students share, end to end against a deployed worker.

       npx wrangler d1 execute utg-classroom --remote --file test/seed.sql
       node test/shared.mjs
       npx wrangler d1 execute utg-classroom --remote --file test/clean.sql

   Pass a URL as the first argument to run it against `wrangler dev` instead.

   Sharing is the one feature here that hands one child write access to another
   child's work, so the checks that matter most are the ones that say no: a
   stranger with the project id, a member reaching for delete, a second browser
   trying to save over the one that is already saving. The happy path is easy
   and was never where the bugs were.

   The last check reaches into D1 directly. A card nobody can see is not the
   same as a row that is gone, and the difference shows up the day a project is
   restored from a backup with somebody else's membership still attached. */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const API = process.argv[2] || "https://utg-classroom-api.utgapps.workers.dev";
const LOCAL = /\/\/(127\.0\.0\.1|localhost)/.test(API);
const WORKER = fileURLToPath(new URL("..", import.meta.url));
let failures = 0;

/* Only ever used to age a heartbeat or count what is left: the alternative is
   a suite that sits still for seventy-five seconds to watch a room go stale. */
function sql(command) {
  const out = execSync(
    `npx --no-install wrangler d1 execute utg-classroom ${LOCAL ? "--local" : "--remote"} --json --command "${command}"`,
    { cwd: WORKER, stdio: "pipe", shell: true, encoding: "utf8" });
  return JSON.parse(out.slice(out.indexOf("[")))[0].results;
}

async function call(token, path, init = {}) {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: "Bearer " + token } : {}),
      ...(init.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}
function ok(what, cond, extra) {
  if (cond) { console.log("  ok   " + what); return; }
  failures++;
  console.log("  FAIL " + what + (extra === undefined ? "" : "  <- " + JSON.stringify(extra)));
}
async function login(username) {
  const r = await call(null, "/login/account", { method: "POST", body: JSON.stringify({ username, password: "test-pw-stu" }) });
  if (!r.body.token) throw new Error("login " + username + ": " + JSON.stringify(r.body));
  return r.body.token;
}

const A = await login("zz.test.stu01");   // the owner
const B = await login("zz.test.stu02");   // joins by code
const C = await login("zz.test.stu03");   // never invited, and must stay out

console.log("\n-- a project of A's, shared with B by code");
const made = await call(A, "/projects", { method: "POST", body: JSON.stringify({ title: "ZZ shared test", kind: "web", files: { "index.html": "<h1>one</h1>" } }) });
const pid = made.body.project.id;
ok("created", !!pid, made.body);

const opened = await call(A, "/coedit/open", { method: "POST", body: JSON.stringify({ projectId: pid }) });
const code = opened.body.room?.code;
ok("A opened a code", !!code, opened.body);

const redeemed = await call(B, "/coedit/" + code);
ok("B redeemed it", redeemed.body.room?.projectId === pid, redeemed.body);

console.log("\n-- it is on B's projects screen, and stays there");
let list = await call(B, "/projects");
let card = (list.body.projects || []).find((p) => p.id === pid);
ok("B's list holds it", !!card, list.body.projects);
ok("the card says whose it is", typeof card?.owner === "string", card);

list = await call(A, "/projects");
card = (list.body.projects || []).find((p) => p.id === pid);
ok("A's card counts one member", card?.members === 1, card);
ok("and A is not told their own project belongs to somebody", card?.owner === null, card);

console.log("\n-- B may read and write it; only A may delete it");
let got = await call(B, "/projects/" + pid);
ok("B can open it", got.body.project?.files?.["index.html"] === "<h1>one</h1>", got.body);
const put = await call(B, "/projects/" + pid, { method: "PUT", body: JSON.stringify({ files: { "index.html": "<h1>two</h1>" } }) });
ok("B can save it", put.status === 200, put.body);
got = await call(A, "/projects/" + pid);
ok("A sees what B wrote", got.body.project?.files?.["index.html"] === "<h1>two</h1>", got.body);

console.log("\n-- a stranger still sees nothing at all");
const peek = await call(C, "/projects/" + pid);
ok("a stranger with the id is refused", peek.status === 404, peek.status);
const strangerList = await call(C, "/projects");
ok("and it is not on their screen", !(strangerList.body.projects || []).some((p) => p.id === pid), strangerList.body.projects);
const strangerWrite = await call(C, "/projects/" + pid, { method: "PUT", body: JSON.stringify({ files: { "index.html": "<h1>mine now</h1>" } }) });
ok("a stranger cannot write into it", strangerWrite.status === 404, strangerWrite.status);

console.log("\n-- one writer: whoever holds the room");
/* Whole files go to D1 on a debounce, so two browsers saving the same project
   would take turns overwriting each other. Exactly one holds the room. */
const aHost = await call(A, "/projects/" + pid + "/session", { method: "POST", body: "{}" });
ok("A takes the room", aHost.body.role === "host", aHost.body);
ok("the code is unchanged", aHost.body.room?.code === code, aHost.body.room);
const bGuest = await call(B, "/projects/" + pid + "/session", { method: "POST", body: "{}" });
ok("B is sent to join A rather than saving too", bGuest.body.role === "guest", bGuest.body);
ok("B is given A's peer id", bGuest.body.room?.peerId === aHost.body.room.peerId, bGuest.body.room);

const aBeat = await call(A, "/projects/" + pid + "/session", { method: "POST", body: "{}" });
ok("A's heartbeat keeps the peer id it is hosting on", aBeat.body.room?.peerId === aHost.body.room.peerId, aBeat.body.room);
ok("and keeps A hosting", aBeat.body.role === "host", aBeat.body);

sql(`UPDATE coedit_rooms SET beat_at = 1 WHERE project_id = '${pid}'`);
const aBack = await call(A, "/projects/" + pid + "/session", { method: "POST", body: "{}" });
ok("A reclaims its own room after a sleep", aBack.body.role === "host", aBack.body);
ok("and is still on the id it is hosting", aBack.body.room?.peerId === aHost.body.room.peerId, aBack.body.room);

const bOpen = await call(B, "/coedit/open", { method: "POST", body: JSON.stringify({ projectId: pid }) });
ok("B cannot open a second room over a live one", bOpen.status === 409, bOpen.status);

console.log("\n-- taking over from a partner who stopped answering");
const bClaim = await call(B, "/projects/" + pid + "/session", { method: "POST", body: JSON.stringify({ claim: true }) });
ok("B claims the room", bClaim.body.role === "host", bClaim.body);
ok("B gets a fresh peer id", bClaim.body.room?.peerId !== aHost.body.room.peerId, bClaim.body.room);
ok("the code still did not change", bClaim.body.room?.code === code, bClaim.body.room);
const aDemoted = await call(A, "/projects/" + pid + "/session", { method: "POST", body: "{}" });
ok("A's next beat says B holds it now", aDemoted.body.role === "guest", aDemoted.body);
ok("and points A at B's peer id", aDemoted.body.room?.peerId === bClaim.body.room.peerId, aDemoted.body.room);

console.log("\n-- leaving and deleting are not the same thing");
const bLeaves = await call(B, "/projects/" + pid, { method: "DELETE" });
ok("B leaves rather than deletes", bLeaves.body.left === true, bLeaves.body);
list = await call(B, "/projects");
ok("it is off B's screen", !(list.body.projects || []).some((p) => p.id === pid), list.body.projects);
got = await call(A, "/projects/" + pid);
ok("A still has the project", got.status === 200, got.status);
ok("with everything B wrote in it", got.body.project?.files?.["index.html"] === "<h1>two</h1>", got.body.project?.files);
const bAfter = await call(B, "/projects/" + pid);
ok("B cannot read it after leaving", bAfter.status === 404, bAfter.status);

console.log("\n-- the code lets them back in");
const again = await call(B, "/coedit/" + code);
ok("B redeems the same code again", again.status === 200, again.body);
list = await call(B, "/projects");
ok("and it is back on their screen", (list.body.projects || []).some((p) => p.id === pid), list.body.projects);

console.log("\n-- deleting the project takes the sharing with it");
const del = await call(A, "/projects/" + pid, { method: "DELETE" });
ok("A deletes it", del.status === 200, del.body);
list = await call(B, "/projects");
ok("it leaves B's screen too", !(list.body.projects || []).some((p) => p.id === pid), list.body.projects);
const deadCode = await call(B, "/coedit/" + code);
ok("its code stops working", deadCode.status === 404, deadCode.status);
ok("and no membership rows are left behind",
   sql(`SELECT COUNT(*) AS n FROM project_members WHERE project_id = '${pid}'`)[0].n === 0);

console.log(failures ? `\n${failures} FAILED` : "\nall green");
process.exit(failures ? 1 : 0);
