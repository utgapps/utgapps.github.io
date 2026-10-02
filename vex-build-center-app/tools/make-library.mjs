// Generates the mechanism library the builder offers under "Examples".
//   node tools/make-library.mjs            # write public/examples/library/*.json + index.json
//   node tools/make-library.mjs gear-pair  # only entries whose slug starts with this, no writing
//   node tools/make-library.mjs --check    # write nothing; fail if the committed files differ
//
// Each family in tools/library/families/ is a list of variants. Every variant is built from
// its holes up (tools/library/assembler.mjs), then run in the builder's own mechanism and
// refused unless it holds together and moves as its description says (tools/library/verify.mjs).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { verify } from "./library/verify.mjs";
import { metaOf } from "./library/assembler.mjs";
import { layout } from "./library/layout.mjs";
import { planCables } from "../src/lib/cables.ts";

const here = new URL(".", import.meta.url);
const checking = process.argv[2] === "--check";
const only = checking ? undefined : process.argv[2];
const families = [];
for (const file of readdirSync(new URL("library/families/", here)).filter((name) => name.endsWith(".mjs")).sort()) {
  families.push(...(await import(new URL(`library/families/${file}`, here))).default);
}

const slugs = new Set();
const index = [];
let refused = 0;
const outDir = new URL("../public/examples/library/", here);
// In --check mode every file is compared with what is committed instead of written.
let stale = 0;
function output(url, text) {
  if (!checking) return writeFileSync(url, text);
  if (!existsSync(url) || readFileSync(url, "utf8").replace(/\r\n/g, "\n") !== text) { stale++; console.log(`STALE ${url.pathname.split("/").pop()}`); }
}
if (!only && !checking) { rmSync(outDir, { recursive: true, force: true }); mkdirSync(outDir, { recursive: true }); }
for (const entry of families) {
  if (only && !entry.slug.startsWith(only)) continue;
  if (slugs.has(entry.slug)) throw new Error(`two entries are called ${entry.slug}`);
  slugs.add(entry.slug);
  let problems;
  let made;
  try {
    made = entry.make();
    problems = verify(made.saved, made.expect);
  } catch (error) {
    problems = [`could not be built: ${error.message}`];
  }
  if (problems.length) {
    refused++;
    console.log(`REFUSED ${entry.slug}\n  ${problems.join("\n  ")}`);
    continue;
  }
  const counts = new Map();
  for (const part of made.saved) counts.set(part.id, (counts.get(part.id) || 0) + 1);
  const parts = [...counts].map(([id, count]) => ({ id, name: metaOf(id).name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  // The cables are worked out from where the parts are, not saved, but you still need them.
  const cables = new Map();
  for (const cable of planCables(layout(made.saved).poses).cables) cables.set(cable.length, (cables.get(cable.length) || 0) + 1);
  for (const [length, count] of [...cables].sort((a, b) => a[0] - b[0])) parts.push({ id: `smart-cable-${length}`, name: `${length} mm Smart Cable`, count });
  const { make, ...tags } = entry;
  index.push({ ...tags, file: `library/${entry.slug}.json`, partCount: made.saved.length, parts });
  if (!only) output(new URL(`${entry.slug}.json`, outDir), JSON.stringify(made.saved) + "\n");
  if (only) console.log(`ok ${entry.slug} (${made.saved.length} parts)`);
}
// One entry per line, so a change to the library shows up as a readable diff.
if (!only) output(new URL("index.json", outDir), "[\n" + index.map((entry) => JSON.stringify(entry)).join(",\n") + "\n]\n");
if (checking) {
  const orphans = readdirSync(outDir).filter((name) => name !== "index.json" && !slugs.has(name.replace(/\.json$/, "")));
  for (const name of orphans) { stale++; console.log(`STALE ${name} is committed but no family makes it`); }
}
console.log(`${index.length} mechanisms${refused ? `, ${refused} REFUSED` : ""}${stale ? `, ${stale} STALE (run node tools/make-library.mjs)` : ""}`);
if (refused || stale) process.exit(1);
