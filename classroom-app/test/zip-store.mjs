/* Guard the zip the game editor writes.

   "Export art" hands a child every picture and every sound in their game as
   one file. Nothing about a corrupt zip looks wrong until somebody tries to
   open it - which is at home, on a parent's laptop, after the lesson - and a
   zip is one wrong four-byte offset away from corrupt while still being the
   right size and downloading perfectly.

   So this does not read the archive with the same idea of the format that
   wrote it. It hands the bytes to Python's zipfile, which is a decoder nobody
   here wrote, and asks that for the names and the contents back. The CRC of
   every entry is checked a second time against node's own zlib.crc32, because
   the checksum is the one field a reader will happily believe and an unzip
   tool will refuse on.

       node test/zip-store.mjs
*/
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { crc32 } from "node:zlib";
import { transformSync } from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

/* The module under test, as the browser gets it: the real src/lib/zip.ts
   rather than a copy of it that could drift. It imports nothing, so stripping
   the types is the whole of the build. */
const source = readFileSync(here + "../src/lib/zip.ts", "utf8");
const { zipStore } = await import(
  "data:text/javascript;base64," +
  Buffer.from(transformSync(source, { loader: "ts", format: "esm" }).code).toString("base64"));

/* Three files that between them cover what a game actually holds: bytes with
   a zero in them and bytes with a 0xFF in them (a PNG has both, and a reader
   that treats the archive as text loses one of them), an empty file, and a
   name with an accent in it - which is a name a child in this class does
   type, and which only survives because the UTF-8 flag is set. */
const png = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0xFF, 0x7F, 0x80]);
const mp3 = Buffer.from(Array.from({ length: 5000 }, (_, i) => (i * 37) & 0xFF));
const entries = [
  { name: "monster.png", bytes: new Uint8Array(png) },
  { name: "sauté.mp3", bytes: new Uint8Array(mp3) },
  { name: "empty.webp", bytes: new Uint8Array(0) },
];

const blob = zipStore(entries, new Date(2026, 8, 20, 14, 30, 30));
check("the zip is a Blob of type application/zip", blob.type === "application/zip", blob.type);

const bytes = Buffer.from(await blob.arrayBuffer());
check("it starts with the local file header signature",
      bytes.readUInt32LE(0) === 0x04034B50,
      "0x" + bytes.readUInt32LE(0).toString(16));

const dir = mkdtempSync(join(tmpdir(), "utg-zip-"));
const file = join(dir, "game-art.zip");
writeFileSync(file, bytes);

/* Python's zipfile is the oracle: an unzip tool nobody here wrote, doing what
   a parent's laptop will do with this file. testzip() returns the name of the
   first entry whose stored CRC does not match its bytes, or None.
   A refusal is the answer, not a crash: python reports what it made of the
   file and leaves the verdict to the checks below, so "this archive is
   broken" never arrives looking like "python is not installed". */
const probe = `
import json, sys, zipfile
out = {"error": None, "names": [], "bad": None, "bodies": {}}
try:
    with zipfile.ZipFile(sys.argv[1]) as z:
        out["names"] = z.namelist()
        out["bad"] = z.testzip()
        out["bodies"] = {n: z.read(n).hex() for n in out["names"]}
except Exception as err:
    out["error"] = type(err).__name__ + ": " + str(err)
print(json.dumps(out))
`;
const run = spawnSync("python", ["-c", probe, file], { encoding: "utf8" });
if (run.error || run.status !== 0) {
  bad++;
  console.log("  FAIL  this test could not run\n        -> " +
              (run.error ? run.error.message : run.stderr.trim()) +
              "\n        it needs python on the PATH - the same one the course builds use");
} else {
  const got = JSON.parse(run.stdout);
  check("an unzip tool that is not this one opens the archive",
        !got.error && got.bad === null,
        got.error || "python says " + got.bad + " has the wrong CRC");
  check("the names come back as they went in",
        JSON.stringify(got.names) === JSON.stringify(entries.map((e) => e.name)),
        got.names.join(", "));
  for (const entry of entries) {
    const body = got.bodies[entry.name];
    check('"' + entry.name + '" comes back byte for byte',
          body === Buffer.from(entry.bytes).toString("hex"),
          "got " + (body === undefined ? "nothing" : body.length / 2 + " bytes") +
          ", wanted " + entry.bytes.length);
  }
}
rmSync(dir, { recursive: true, force: true });

/* And the checksums themselves, against an implementation in node rather than
   the one in the file being tested. A zip whose CRCs are all wrong in the
   same way would round-trip through its own reader perfectly. */
const central = bytes.lastIndexOf(Buffer.from([0x50, 0x4B, 0x05, 0x06]));
check("the archive ends with a central directory record", central > 0, String(central));
let at = bytes.readUInt32LE(central + 16);
let seen = 0;
for (let n = 0; n < entries.length; n++) {
  if (bytes.readUInt32LE(at) !== 0x02014B50) break;
  const nameLength = bytes.readUInt16LE(at + 28);
  const name = bytes.subarray(at + 46, at + 46 + nameLength).toString("utf8");
  const stored = bytes.readUInt32LE(at + 16);
  const entry = entries.find((e) => e.name === name);
  check('the CRC recorded for "' + name + '" is the CRC of its bytes',
        !!entry && stored === (crc32(Buffer.from(entry.bytes)) >>> 0),
        entry ? "0x" + stored.toString(16) : "no such entry went in");
  at += 46 + nameLength + bytes.readUInt16LE(at + 30) + bytes.readUInt16LE(at + 32);
  seen++;
}
check("the directory lists every file", seen === entries.length, seen + " of " + entries.length);

console.log(bad ? `\n${bad} problem(s)` : "\nthe exported zip opens anywhere");
process.exit(bad ? 1 : 0);
