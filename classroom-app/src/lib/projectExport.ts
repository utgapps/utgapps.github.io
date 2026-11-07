/* A web or Java project, as a .zip of its files, to open in another editor.

   "Export backup" hands back a .json, which is for opening the project here
   again. This is the project as a folder: every file in the file tree, under
   the same name and in the same folders, byte for byte as the student typed
   it, and nothing else - so it opens in VS Code, IntelliJ or anything else
   as the same project. */
import { zipStore } from "./zip";

export function exportFileName(title: string): string {
  const slug = title.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return (slug || "my-project") + ".zip";
}

/** Every file in the project, zipped under its own path. */
export function exportProject(files: Record<string, string>, title: string): { name: string; blob: Blob } {
  const encoder = new TextEncoder();
  const entries = Object.keys(files).sort().map((path) => ({ name: path, bytes: encoder.encode(files[path]) }));
  return { name: exportFileName(title), blob: zipStore(entries) };
}
