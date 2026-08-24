/* Check what is actually published, not what the build wrote.

   The build can be perfect and the site still be wrong: a file not committed,
   a stale bundle, a path that only resolves locally. This fetches every AI101
   deliverable from the live origin and checks the pieces a teacher or student
   depends on.

       node published.mjs [origin]
*/

const ORIGIN = process.argv[2] || "https://utgapps.github.io";
let pass = 0;
const problems = [];

function check(label, ok, detail) {
  if (ok) { pass++; console.log("  ok    " + label); }
  else { problems.push(label); console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
}

// GitHub Pages 503s occasionally under a burst; a transient blip is not a
// content failure, so give each URL a couple of goes before believing it.
async function get(path) {
  let last = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(ORIGIN + path + (path.includes("?") ? "&" : "?") + "cb=" + attempt);
    if (res.status === 200) return { status: 200, text: await res.text() };
    last = { status: res.status, text: "" };
    await new Promise((done) => setTimeout(done, 1500));
  }
  return last;
}

const pad = (n) => String(n).padStart(2, "0");

console.log(`AI101 deliverables at ${ORIGIN}\n`);

// ---------------------------------------------------------------- week pages
console.log("Week pages");
for (let n = 1; n <= 15; n++) {
  const { status, text } = await get(`/ai101/week-${pad(n)}.html`);
  const issues = [];
  if (status !== 200) issues.push("HTTP " + status);
  else {
    if (!text.includes(`slides/week-${pad(n)}.html`)) issues.push("no link to its deck");
    if (!text.includes(`teacher.html#week-${n}`)) issues.push("no link to its lesson plan");
    if (!/class="snip"|class="code"/.test(text)) issues.push("no code on the page");
    if (n > 1 && !text.includes('class="new"')) issues.push("nothing marked as new this week");
    if (/[-￿]/.test(text)) issues.push("non-ascii byte (mojibake risk)");
    if (text.includes("sk-class-") && !text.includes("put-your-own-key-here")) issues.push("a real-looking key");
  }
  check(`week ${pad(n)}`, issues.length === 0, issues.join("; "));
}

// -------------------------------------------------------------------- decks
console.log("\nSlide decks");
let slideTotal = 0;
for (let n = 1; n <= 15; n++) {
  const { status, text } = await get(`/ai101/slides/week-${pad(n)}.html`);
  const issues = [];
  if (status !== 200) issues.push("HTTP " + status);
  else {
    const slides = (text.match(/class="slide/g) || []).length;
    const dots = (text.match(/<i><\/i>/g) || []).length;
    slideTotal += slides;
    if (slides < 4) issues.push(`only ${slides} slides`);
    if (dots !== slides) issues.push(`${dots} dots for ${slides} slides`);
    if (!/class="slide dark"/.test(text)) issues.push("no code slide");
    if (!text.includes("../../guard.js")) issues.push("guard path does not resolve from slides/");
    if (!text.includes("../../class-codes.js")) issues.push("class-codes path does not resolve");
    if (!text.includes("postMessage")) issues.push("no escape-to-close message for the classroom");
    if (/[-￿]/.test(text)) issues.push("non-ascii byte");
  }
  check(`week ${pad(n)} deck`, issues.length === 0, issues.join("; "));
}
check(`decks total ${slideTotal} slides`, slideTotal === 201, `expected 201, got ${slideTotal}`);

// the .pptx must still be there for Google Slides
console.log("\nPowerPoint decks");
let pptxOk = 0;
for (let n = 1; n <= 15; n++) {
  const res = await fetch(`${ORIGIN}/ai101/slides/week-${pad(n)}.pptx`, { method: "HEAD" });
  if (res.status === 200 && Number(res.headers.get("content-length")) > 20000) pptxOk++;
}
check(`all 15 .pptx published and non-trivial`, pptxOk === 15, `${pptxOk}/15 ok`);

// ------------------------------------------------------------ teacher guide
console.log("\nTeacher guide");
{
  const { status, text } = await get("/ai101/teacher.html");
  check("teacher.html loads", status === 200, "HTTP " + status);
  if (status === 200) {
    const anchors = (text.match(/id="week-\d+"/g) || []).length;
    check("every week has an anchor to scroll to", anchors === 15, `${anchors} anchors`);
    check("the 1-15 jump bar is there", /class="jump"/.test(text));
    check("embed mode strips the site furniture", text.includes("embedded"));
    check("the anchor clears the sticky header", text.includes("scroll-margin-top"));
    check("deletions are shown, not only additions", /class="gone"/.test(text));
    check("every week names the lines to type", (text.match(/Everything typed this week/g) || []).length >= 14);
    check("no mojibake", !/[-￿]/.test(text));
  }
}

// ----------------------------------------------------------- homework book
console.log("\nStudent homework book");
{
  const { status, text } = await get("/ai101/workbook.html");
  check("workbook.html loads", status === 200, "HTTP " + status);
  if (status === 200) {
    const chapters = (text.match(/class="chapter"/g) || []).length;
    check("fifteen chapters", chapters === 15, `${chapters} chapters`);
    check("challenges have a done-when line", (text.match(/Done when:/g) || []).length >= 30);
    check("printable", text.includes("window.print()"));
    check("no mojibake", !/[-￿]/.test(text));
  }
}

// -------------------------------------------------------------- milestones
console.log("\nMilestones feed (what the classroom seeds from)");
{
  const res = await fetch(`${ORIGIN}/ai101/milestones.json?cb=1`);
  const data = res.status === 200 ? await res.json() : null;
  check("milestones.json loads", !!data, "HTTP " + res.status);
  if (data) {
    check("fifteen weeks", data.weeks?.length === 15, `${data.weeks?.length} weeks`);
    const names = new Set(data.weeks.flatMap((w) => Object.keys(w.files)));
    check("three files per week", [...names].sort().join(",") === "index.html,script.js,style.css",
          [...names].join(","));
    const grows = data.weeks.every((w, i) =>
      i === 0 || JSON.stringify(w.files).length >= JSON.stringify(data.weeks[i - 1].files).length * 0.9);
    check("each week builds on the last", grows);
    const leaked = data.weeks.filter((w) => JSON.stringify(w.files).includes("sk-class-")
      && !JSON.stringify(w.files).includes("put-your-own-key-here"));
    check("no real key in any milestone", leaked.length === 0, `weeks ${leaked.map((w) => w.n)}`);
    const final = data.weeks[14].files;
    const lines = Object.values(final).reduce((sum, t) => sum + t.split("\n").length, 0);
    check(`the finished project is under 1000 lines (${lines})`, lines < 1000, `${lines} lines`);
  }
}

// ------------------------------------------------------------- landing page
console.log("\nCourse landing page");
{
  const { status, text } = await get("/ai101/");
  check("index loads", status === 200, "HTTP " + status);
  if (status === 200) {
    check("links all fifteen weeks", (text.match(/href="week-\d\d\.html"/g) || []).length === 15);
    check("links the teacher guide and the workbook",
          text.includes('href="teacher.html"') && text.includes('href="workbook.html"'));
    check("carries the off-network disclaimer", /school network|own key|api key/i.test(text));
  }
}

console.log(`\n${pass} checks passed, ${problems.length} failed`);
if (problems.length) console.log("failed: " + problems.join(", "));
process.exit(problems.length ? 1 : 0);
