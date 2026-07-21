import * as Y from "yjs";

/* Shared-document helpers for live co-editing.

   A project is backed by a Y.Doc whose "files" Y.Map holds one Y.Text per
   file. IMPORTANT: only ONE peer seeds a doc from plain files; every other
   peer must receive that doc as an encoded Yjs *state update* and apply it to
   an EMPTY doc. If two peers seed independently from the same text, Yjs treats
   them as concurrent inserts and the content DUPLICATES on merge. */

export type Files = Record<string, string>;

export function filesMap(doc: Y.Doc) { return doc.getMap<Y.Text>("files"); }

// Seed an empty doc from plain files (call once, on the authoritative side).
export function seedDoc(doc: Y.Doc, files: Files) {
  const map = filesMap(doc);
  doc.transact(() => {
    for (const name of Object.keys(files)) {
      let t = map.get(name);
      if (!t) { t = new Y.Text(); map.set(name, t); }
      if (t.toString() !== files[name]) { t.delete(0, t.length); t.insert(0, files[name]); }
    }
  });
}

export function docToFiles(doc: Y.Doc): Files {
  const out: Files = {};
  filesMap(doc).forEach((t, name) => { out[name] = t.toString(); });
  return out;
}

export function fileText(doc: Y.Doc, name: string): Y.Text {
  const map = filesMap(doc);
  let t = map.get(name);
  if (!t) { t = new Y.Text(); map.set(name, t); }
  return t;
}

export function fileNames(doc: Y.Doc): string[] { return Array.from(filesMap(doc).keys()); }

// ---- transport encoding (base64 so it survives JSON over PeerJS) ----
export function b64encode(bytes: Uint8Array): string {
  let s = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) s += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  return btoa(s);
}
export function b64decode(str: string): Uint8Array {
  const s = atob(str);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
}

// ---- presence colors (stable per user id/name) ----
const COLORS = ["#e63946", "#f3722c", "#f8961e", "#f9a03f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#9b5de5", "#ff70a6"];
export function userColor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}
