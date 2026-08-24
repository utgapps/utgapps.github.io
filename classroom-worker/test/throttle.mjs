/* Sign-in throttling, from the classroom's point of view.

   The case that matters is thirty students in one room behind one school NAT
   address all signing in at the start of a lesson. Counting every attempt
   against the IP locked the class out after eight of them got it RIGHT, which
   is the opposite of what a throttle is for.

       npx wrangler d1 execute utg-classroom --remote --file test/seed.sql
       node test/throttle.mjs
       npx wrangler d1 execute utg-classroom --remote --file test/clean.sql
*/

const API = process.argv[2] || "https://utg-classroom-api.utgapps.workers.dev";
let pass = 0;
const failed = [];

const login = async (username, password) => (await fetch(API + "/login/account", {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ username, password }),
})).status;

function check(label, ok, detail) {
  if (ok) { pass++; console.log("  ok    " + label); }
  else { failed.push(label); console.log("  FAIL  " + label + (detail !== undefined ? "\n        -> " + JSON.stringify(detail) : "")); }
}

// --- a whole class signs in, all from this one address ---------------------
console.log("A class signing in together");
const statuses = [];
for (let i = 1; i <= 12; i++) {
  statuses.push(await login(`zz.test.stu${String(i).padStart(2, "0")}`, "test-pw-stu"));
}
const okCount = statuses.filter((s) => s === 200).length;
check(`all twelve get in (${okCount}/12)`, okCount === 12,
      `statuses: ${statuses.join(",")} - a 429 here is the whole class locked out`);

// --- one student fumbling their password must not affect the others --------
console.log("\nOne student typing it wrong");
const wrong = [];
for (let i = 0; i < 8; i++) wrong.push(await login("zz.test.stu01", "not-my-password"));
check("wrong passwords are refused", wrong.every((s) => s === 401 || s === 429), wrong.join(","));
check("that account is now throttled", (await login("zz.test.stu01", "not-my-password")) === 429);
check("and stays throttled even with the RIGHT password",
      (await login("zz.test.stu01", "test-pw-stu")) === 429);
check("their classmate is unaffected", (await login("zz.test.stu02", "test-pw-stu")) === 200);
check("so is a student who has not signed in yet",
      (await login("zz.test.spare", "test-pw-stu")) === 200);
check("and so is the teacher", (await login("zz.test.t101", "test-pw-101")) === 200);

// --- a near miss should not leave a student half locked out ----------------
console.log("\nA near miss, then getting it right");
check("two wrong tries are refused",
      (await login("zz.test.stu03", "oops")) === 401 && (await login("zz.test.stu03", "oops")) === 401);
check("the right password still works", (await login("zz.test.stu03", "test-pw-stu")) === 200);
const after = [];
for (let i = 0; i < 7; i++) after.push(await login("zz.test.stu03", "oops"));
check("and the count was cleared, so they get a full budget again",
      after.filter((s) => s === 401).length === 7, after.join(","));

// --- an unknown username must not be a free oracle -------------------------
console.log("\nGuessing at usernames");
check("an unknown username is refused like a wrong password",
      (await login("zz.test.ghost", "whatever")) === 401);

console.log(`\n${pass} checks passed, ${failed.length} failed`);
if (failed.length) console.log("failed: " + failed.join(", "));
process.exit(failed.length ? 1 : 0);
