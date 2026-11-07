/* Guard "Export .zip" on web and Java projects.

   The promise is the project as a folder, to open in another editor: every
   file under its own path, byte for byte as typed, and nothing added. So the
   archive is read back by Python's zipfile - a decoder nobody here wrote -
   rather than with the same idea of the format that wrote it.

       node test/project-export.mjs
*/
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSync } from "esbuild";

const here = fileURLToPath(new URL(".", import.meta.url));
let bad = 0;
const check = (label, ok, detail) => {
  if (ok) console.log("  ok    " + label);
  else { bad++; console.log("  FAIL  " + label + (detail ? "\n        -> " + detail : "")); }
};

/* The real module, bundled with the real zip writer it imports. */
const bundled = buildSync({ entryPoints: [here + "../src/lib/projectExport.ts"], bundle: true, format: "esm", write: false });
const { exportProject, exportFileName } = await import(
  "data:text/javascript;base64," + Buffer.from(bundled.outputFiles[0].text).toString("base64"));

const scratch = mkdtempSync(join(tmpdir(), "utg-project-export-"));

/** Every entry of a zip, as Python's zipfile reads it: name -> text. */
async function unzip(blob, label) {
  const path = join(scratch, label + ".zip");
  writeFileSync(path, Buffer.from(await blob.arrayBuffer()));
  const read = spawnSync("python", ["-I", "-c",
    "import json, sys, zipfile\n" +
    "archive = zipfile.ZipFile(sys.argv[1])\n" +
    "assert archive.testzip() is None\n" +
    "print(json.dumps({name: archive.read(name).decode('utf-8') for name in archive.namelist()}))",
    path], { encoding: "utf8" });
  if (read.status !== 0) throw new Error("zipfile refused the archive: " + read.stderr);
  return JSON.parse(read.stdout);
}

const projects = {
  web: {
    title: "Week 7 – Mon Café!",
    files: {
      "index.html": '<!DOCTYPE html>\n<h1>My café</h1>\n<img src="https://utg-classroom-api.utgapps.workers.dev/media/file/x?expires=1&amp;sig=ab">\n<link rel="stylesheet" href="css/style.css">\n',
      "css/style.css": "body {\r\n  color: teal;\r\n}\r\n",
      "js/game/loop.js": "let frame = 0;\n",
      "NOTES.md": "# notes\n",
    },
  },
  java: {
    title: "Hello Java",
    files: {
      "Main.java": 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, " + Helper.name() + "!");\n  }\n}\n',
      "Helper.java": 'public class Helper {\n  static String name() { return "UTG"; }\n}\n',
      "app/shapes/Box.java": "package app.shapes;\n\npublic class Box {}\n",
    },
  },
};

for (const [kind, project] of Object.entries(projects)) {
  console.log(`\nA ${kind} project`);
  const made = exportProject(project.files, project.title);
  const zip = await unzip(made.blob, kind);
  const names = Object.keys(project.files).sort();
  check("every file is there under its own path, folders and all", JSON.stringify(Object.keys(zip).sort()) === JSON.stringify(names), Object.keys(zip).join(", "));
  check("nothing is added", Object.keys(zip).length === names.length);
  const changed = names.filter((name) => zip[name] !== project.files[name]);
  check("every file is exactly as typed - line endings, accents, links and all", changed.length === 0, changed.join(", "));
}

console.log("\nThe file name");
check("it is named after the project", exportProject({}, "Week 7 – Mon Café!").name === "week-7-mon-cafe.zip", exportFileName("Week 7 – Mon Café!"));
check("a title with nothing usable still makes a file name", exportFileName("  !!  ") === "my-project.zip", exportFileName("  !!  "));
check("an empty project is still a zip that opens", Object.keys(await unzip(exportProject({}, "empty").blob, "empty")).length === 0);

rmSync(scratch, { recursive: true, force: true });
console.log(bad ? `\n${bad} check(s) failed` : "\nall good");
process.exit(bad ? 1 : 0);
