/* A web or Java project, as a .zip that runs in another editor as it is.

   "Export backup" hands back a .json, which is for opening the project here
   again. This is the project as a folder: every file in the file tree, under
   the same name and in the same folders, so it opens in VS Code, IntelliJ or
   anything else as the same project and runs without being touched.

   The one thing that would not run as it is: a picture or a sound from My
   media. Its tag points at the classroom, so the page would only work online
   and only while the classroom keeps the file. Each one is downloaded into
   media/ and its link is pointed at that copy, the way a page on disk finds a
   file beside it. Nothing else in any file changes, byte for byte.

   Where the link points from depends on who reads it. An HTML page or a
   stylesheet reads a path from its own folder, so css/style.css gets
   ../media/. A script does not: a path in JavaScript is read from the page
   that runs it - in the preview as on disk - so js/game.js gets media/.

   A link that will not download is left exactly as it was and counted, so it
   can be said out loud rather than quietly turning into a broken picture. */
import { zipStore, type ZipEntry } from "./zip";
import type { ProjectKind } from "./types";

/* A signed link to /media/file/<id> on the classroom API, as "Copy tag" in My
   media writes it. Inside HTML the & may have been typed as &amp;. When the
   tag goes on with alt="<file name>", as Copy tag writes it, that is caught
   too, so the copy can keep the name the student gave the picture. */
const SIGNED_MEDIA = /https?:\/\/[^\s"'()<>`]+?\/media\/file\/([0-9a-f-]{36})\?expires=\d+&(?:amp;)?sig=[0-9a-f]+/g;
const NAMED_BY_ALT = /^\s+alt\s*=\s*"([^"]*)"/;

const EXTENSIONS: Record<string, string> = {
  "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/svg+xml": "svg",
  "audio/mpeg": "mp3", "audio/ogg": "ogg", "audio/wav": "wav", "audio/webm": "webm",
};

/** Files that read a path from their own folder. Everything else in a web
    project is read from the page, which is at the top of the project. */
const READS_FROM_OWN_FOLDER = /\.(html?|css|svg)$/i;

export type ProjectExport = {
  /** What the download is called: the project's title, made safe for a file name. */
  name: string;
  blob: Blob;
  /** Pictures and sounds copied into media/. */
  copied: number;
  /** Media links that would not download, left pointing at the classroom. */
  missed: number;
};

export type DownloadMedia = (url: string) => Promise<{ type: string; bytes: Uint8Array<ArrayBuffer> }>;

async function downloadMedia(url: string) {
  const reply = await fetch(url, { cache: "no-store" });
  if (!reply.ok) throw new Error(String(reply.status));
  const blob = await reply.blob();
  return { type: blob.type, bytes: new Uint8Array(await blob.arrayBuffer()) };
}

export function exportFileName(title: string): string {
  return (slug(title) || "my-project") + ".zip";
}

function slug(text: string): string {
  return text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

/** The first free path for a copy, beside the student's own files. */
function freePath(stem: string, extension: string, taken: Set<string>): string {
  let path = `media/${stem}.${extension}`;
  for (let copy = 2; taken.has(path.toLowerCase()); copy++) path = `media/${stem}-${copy}.${extension}`;
  taken.add(path.toLowerCase());
  return path;
}

/** Every file in the project, zipped under its own path, with its media
    copied in beside it. */
export async function exportProject(files: Record<string, string>, kind: ProjectKind, title: string,
                                    download: DownloadMedia = downloadMedia): Promise<ProjectExport> {
  const paths = Object.keys(files).sort();
  // Case-blind, because Windows and macOS are: media/Cat.png and media/cat.png
  // would be one file once unzipped there.
  const taken = new Set(paths.map((path) => path.toLowerCase()));

  /* Each picture once, however many times and however it is linked: by id,
     in the order the files mention them, with the first link that works. */
  const found = new Map<string, { links: string[]; alt: string }>();
  if (kind === "web") {
    for (const path of paths) {
      for (const match of files[path].matchAll(SIGNED_MEDIA)) {
        const entry = found.get(match[1]) ?? { links: [], alt: "" };
        entry.links.push(match[0].replaceAll("&amp;", "&"));
        if (!entry.alt) entry.alt = files[path].slice(match.index! + match[0].length + 1).match(NAMED_BY_ALT)?.[1] ?? "";
        found.set(match[1], entry);
      }
    }
  }

  const copies = new Map<string, string>();   // media id -> its path in the zip
  const mediaEntries: ZipEntry[] = [];
  const counters = { picture: 0, sound: 0 };
  let missed = 0;
  for (const [id, entry] of found) {
    let fetched: Awaited<ReturnType<DownloadMedia>> | null = null;
    for (const link of new Set(entry.links)) {
      try { fetched = await download(link); break; } catch { /* the next spelling of it, if any */ }
    }
    if (!fetched) { missed++; continue; }
    const type = fetched.type.split(";")[0].trim().toLowerCase();
    const sort = type.startsWith("audio/") ? "sound" : "picture";
    const extension = EXTENSIONS[type] || (sort === "sound" ? "mp3" : "png");
    const named = slug(entry.alt.replace(/\.[a-z0-9]{2,4}$/i, ""));
    const path = freePath(named || `${sort}-${++counters[sort]}`, extension, taken);
    copies.set(id, path);
    mediaEntries.push({ name: path, bytes: fetched.bytes });
  }

  const encoder = new TextEncoder();
  const entries: ZipEntry[] = paths.map((path) => {
    const up = READS_FROM_OWN_FOLDER.test(path) ? "../".repeat(path.split("/").length - 1) : "";
    const text = copies.size
      ? files[path].replace(SIGNED_MEDIA, (link, id: string) => (copies.has(id) ? up + copies.get(id) : link))
      : files[path];
    return { name: path, bytes: encoder.encode(text) };
  });
  entries.push(...mediaEntries);
  return { name: exportFileName(title), blob: zipStore(entries), copied: mediaEntries.length, missed };
}
