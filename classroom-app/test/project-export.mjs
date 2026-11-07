/* Guard "Export .zip" on web and Java projects.

   The promise is the project as a folder that runs in another editor as it
   is: every file under its own path, nothing added, and every picture from My
   media copied in beside it with its link pointed at the copy - from the
   folder that reads the link. Everything else byte for byte as typed. The
   archive is read back by Python's zipfile - a decoder nobody here wrote -
   rather than with the same idea of the format that wrote it.

       node test/project-export.mjs
*/
import { writeFileSync, mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
let failures = 0;
const check = (label, passed, detail) => {
  if (passed) console.log("  ok    " + label);
  else { failures++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

/* The real module, bundled with the real zip writer it imports. */
const bundled = buildSync({ entryPoints: [here + "../src/lib/projectExport.ts"], bundle: true, format: "esm", write: false });
const { exportProject, exportFileName } = await import(
  "data:text/javascript;base64," + Buffer.from(bundled.outputFiles[0].text).toString("base64"));

const scratch = mkdtempSync(join(tmpdir(), "utg-project-export-"));

/** Every entry of a zip, as Python's zipfile reads it: name -> Buffer. */
async function unzip(blob, label) {
  const path = join(scratch, label + ".zip");
  writeFileSync(path, Buffer.from(await blob.arrayBuffer()));
  const read = spawnSync("python", ["-I", "-c",
    "import base64, json, sys, zipfile\n" +
    "archive = zipfile.ZipFile(sys.argv[1])\n" +
    "assert archive.testzip() is None\n" +
    "print(json.dumps({name: base64.b64encode(archive.read(name)).decode() for name in archive.namelist()}))",
    path], { encoding: "utf8" });
  if (read.status !== 0) throw new Error("zipfile refused the archive: " + read.stderr);
  return Object.fromEntries(Object.entries(JSON.parse(read.stdout)).map(([name, data]) => [name, Buffer.from(data, "base64")]));
}

/* Three pictures and a sound on the classroom API, as Copy tag writes them.
   The broken one stands for a link that will not download. */
const api = "https://utg-classroom-api.utgapps.workers.dev/media/file/";
const ids = {
  cat: "11111111-1111-4111-8111-111111111111",
  song: "22222222-2222-4222-8222-222222222222",
  broken: "33333333-3333-4333-8333-333333333333",
  unnamed: "44444444-4444-4444-8444-444444444444",
};
const link = (id, amp = "&") => `${api}${id}?expires=1793000000${amp}sig=${"ab".repeat(32)}`;
const stored = {
  [ids.cat]: { type: "image/webp", bytes: new Uint8Array([82, 73, 70, 70, 0, 255, 1, 2]) },
  [ids.song]: { type: "audio/mpeg", bytes: new Uint8Array([73, 68, 51, 4, 0, 128]) },
  [ids.unnamed]: { type: "image/png", bytes: new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]) },
};
const asked = [];
const download = async (url) => {
  asked.push(url);
  if (url.includes("&amp;")) throw new Error("asked with &amp; still in it");
  const id = url.match(/media\/file\/([0-9a-f-]{36})/)[1];
  if (!stored[id]) throw new Error("404");
  return stored[id];
};

console.log("\nA web project with pictures from My media");
const web = {
  "index.html": `<!DOCTYPE html>\n<h1>My café</h1>\n<img src="${link(ids.cat, "&amp;")}" alt="Cat Pic.webp">\n` +
    `<audio controls src="${link(ids.song)}"></audio>\n<img src="${link(ids.broken)}" alt="gone.webp">\n` +
    `<link rel="stylesheet" href="css/style.css">\n<script src="js/game/loop.js"></script>\n`,
  "css/style.css": `body {\r\n  background: url(${link(ids.cat)});\r\n}\r\n`,
  "js/game/loop.js": `const hero = new Image();\nhero.src = "${link(ids.cat)}";\nconst tile = '${link(ids.unnamed)}';\n`,
  "media/sound-1.mp3": "the student's own file, already at that name",
  "NOTES.md": "# notes\n",
};
const made = await exportProject(web, "web", "Week 7 – Mon Café!", download);
const zip = await unzip(made.blob, "web");
const text = (name) => zip[name]?.toString("utf8");
const expectedNames = [...Object.keys(web), "media/cat-pic.webp", "media/sound-1-2.mp3", "media/picture-1.png"].sort();
check("every file is there under its own path, with each picture once in media/", JSON.stringify(Object.keys(zip).sort()) === JSON.stringify(expectedNames), Object.keys(zip).sort().join(", "));
check("each picture is downloaded once, however many times it is linked", asked.filter((url) => url.includes(ids.cat)).length === 1, asked.join("\n           "));
check("no link is asked for with &amp; still in it", asked.every((url) => !url.includes("&amp;")));
check("the copies are the bytes the classroom sent",
  Buffer.compare(zip["media/cat-pic.webp"] ?? Buffer.alloc(0), Buffer.from(stored[ids.cat].bytes)) === 0 &&
  Buffer.compare(zip["media/sound-1-2.mp3"] ?? Buffer.alloc(0), Buffer.from(stored[ids.song].bytes)) === 0);
check("the page points at its pictures from its own folder",
  text("index.html") === web["index.html"].replace(link(ids.cat, "&amp;"), "media/cat-pic.webp").replace(link(ids.song), "media/sound-1-2.mp3"), text("index.html"));
check("a stylesheet in css/ points up a folder, and keeps its line endings",
  text("css/style.css") === "body {\r\n  background: url(../media/cat-pic.webp);\r\n}\r\n", JSON.stringify(text("css/style.css")));
check("a script points from the page, not from its own folder",
  text("js/game/loop.js") === `const hero = new Image();\nhero.src = "media/cat-pic.webp";\nconst tile = 'media/picture-1.png';\n`, text("js/game/loop.js"));
check("a picture that would not download keeps its link, and is counted", text("index.html").includes(link(ids.broken)) && made.missed === 1 && made.copied === 3, `missed ${made.missed}, copied ${made.copied}`);
check("the student's own media/sound-1.mp3 is not overwritten", text("media/sound-1.mp3") === web["media/sound-1.mp3"]);
check("a file with no media in it is exactly as typed", text("NOTES.md") === web["NOTES.md"]);

console.log("\nA Java project");
asked.length = 0;
const java = {
  "Main.java": 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, " + Helper.name() + "!");\n  }\n}\n',
  "Helper.java": `public class Helper {\n  static String name() { return "UTG"; }\n  // ${link(ids.cat)}\n}\n`,
  "app/shapes/Box.java": "package app.shapes;\n\npublic class Box {}\n",
};
const javaZip = await unzip((await exportProject(java, "java", "Hello Java", download)).blob, "java");
check("every file is there under its own path, folders and all, and nothing is added", JSON.stringify(Object.keys(javaZip).sort()) === JSON.stringify(Object.keys(java).sort()), Object.keys(javaZip).join(", "));
check("every file is exactly as typed", Object.keys(java).every((name) => javaZip[name]?.toString("utf8") === java[name]));
check("nothing is downloaded for a Java project", asked.length === 0);

/* The point of all of the above: unzipped anywhere, the page finds its
   pictures with no classroom and no network. A double-click has to be tried
   in a real browser, so this writes one export, unzipped, for doing that:

       node test/project-export.mjs --unzip-to <folder>

   then open <folder>/index.html. The page shows "1,1,1" when the picture in
   the page, in the stylesheet and in the script all loaded from media/. */
const unzipTo = process.argv.indexOf("--unzip-to") > 0 ? process.argv[process.argv.indexOf("--unzip-to") + 1] : null;
if (unzipTo) {
  const onePixel = {
    webp: Buffer.from("UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==", "base64"),
    png: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64"),
  };
  const pictures = {
    [ids.cat]: { type: "image/webp", bytes: new Uint8Array(onePixel.webp) },
    [ids.unnamed]: { type: "image/png", bytes: new Uint8Array(onePixel.png) },
  };
  const page = {
    "index.html": `<!DOCTYPE html>\n<link rel="stylesheet" href="css/style.css">\n<img id="cat" src="${link(ids.cat, "&amp;")}" alt="cat.webp">\n` +
      `<div id="wall"></div>\n<script src="js/game.js"></script>\n`,
    "css/style.css": `#wall { width: 4px; height: 4px; background-image: url(${link(ids.unnamed)}); }\n`,
    "js/game.js": `const tile = new Image();\ntile.src = "${link(ids.cat)}";\n` +
      `window.addEventListener("load", () => {\n` +
      `  const wall = new Image();\n  wall.src = getComputedStyle(document.getElementById("wall")).backgroundImage.slice(5, -2);\n` +
      `  wall.onload = wall.onerror = () => { document.body.append(document.body.dataset.result = [document.getElementById("cat").naturalWidth, tile.naturalWidth, wall.naturalWidth].join(",")); };\n});\n`,
  };
  const exported = await exportProject(page, "web", "On disk", async (url) => {
    const found = pictures[url.match(/media\/file\/([0-9a-f-]{36})/)[1]];
    if (!found) throw new Error("404");
    return found;
  });
  const unzipped = await unzip(exported.blob, "on-disk");
  for (const [name, bytes] of Object.entries(unzipped)) {
    mkdirSync(dirname(join(unzipTo, name)), { recursive: true });
    writeFileSync(join(unzipTo, name), bytes);
  }
  console.log(`\nWrote an export, unzipped, to ${unzipTo} - open its index.html in a browser.`);
}

console.log("\nThe file name");
check("it is named after the project", made.name === "week-7-mon-cafe.zip", made.name);
check("a title with nothing usable still makes a file name", exportFileName("  !!  ") === "my-project.zip", exportFileName("  !!  "));
check("an empty project is still a zip that opens", Object.keys(await unzip((await exportProject({}, "web", "empty", download)).blob, "empty")).length === 0);

rmSync(scratch, { recursive: true, force: true });
console.log(failures ? `\n${failures} check(s) failed` : "\nall good");
process.exit(failures ? 1 : 0);
