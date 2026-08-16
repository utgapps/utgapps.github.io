import { useMemo, useState } from "react";
import { ENTRY_FILE } from "./lib/preview";

/* The project's files, as a tree, down the left of the workspace.

   Folders are implicit - exactly like git. There is no folder object anywhere;
   a file called "css/style.css" IS the css folder. That keeps the shared
   document a flat map of path -> text, which is what makes live co-editing and
   saving work unchanged, and it means a folder can never get out of step with
   what is in it. The cost is that a folder with nothing in it cannot exist, so
   "New folder" asks for the first file at the same time. */

const ALLOWED = [".html", ".css", ".js", ".json", ".svg", ".txt", ".md"];
const MAX_FILES = 40;
const MAX_DEPTH = 4;

export function checkPath(path: string, existing: string[]): string | null {
  const clean = path.trim().replace(/^\/+/, "").replace(/\\/g, "/");
  if (!clean) return "Give the file a name.";
  if (clean.endsWith("/")) return "That is a folder. Add a file name after the slash.";
  if (/\/\//.test(clean)) return "There is an empty folder name in there.";
  if (clean.split("/").some((part) => part === "." || part === "..")) return "Paths cannot contain . or ..";
  if (!/^[A-Za-z0-9._/-]+$/.test(clean)) return "Use letters, numbers, dots, dashes and slashes only.";
  if (clean.split("/").length > MAX_DEPTH) return `Keep folders at most ${MAX_DEPTH - 1} deep.`;
  if (!ALLOWED.some((ext) => clean.toLowerCase().endsWith(ext))) {
    return `The name has to end with ${ALLOWED.join(", ")}.`;
  }
  if (existing.includes(clean)) return "There is already a file with that name.";
  if (existing.length >= MAX_FILES) return `That is ${MAX_FILES} files already - delete one first.`;
  return null;
}

export function normalizePath(path: string): string {
  return path.trim().replace(/^\/+/, "").replace(/\\/g, "/");
}

type Node = { name: string; path: string; children: Node[]; isFile: boolean };

function toTree(paths: string[]): Node[] {
  const root: Node = { name: "", path: "", children: [], isFile: false };
  for (const path of [...paths].sort()) {
    let node = root;
    const parts = path.split("/");
    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      const full = parts.slice(0, index + 1).join("/");
      let next = node.children.find((child) => child.name === part && child.isFile === isFile);
      if (!next) {
        next = { name: part, path: full, children: [], isFile };
        node.children.push(next);
      }
      node = next;
    });
  }
  // folders first, then files, alphabetical within each
  const order = (nodes: Node[]) => {
    nodes.sort((a, b) => (a.isFile === b.isFile ? a.name.localeCompare(b.name) : a.isFile ? 1 : -1));
    nodes.forEach((child) => order(child.children));
  };
  order(root.children);
  return root.children;
}

function icon(name: string) {
  if (name.endsWith(".html")) return "◧";
  if (name.endsWith(".css")) return "◆";
  if (name.endsWith(".js")) return "▸";
  return "•";
}

export function FileTree({ files, active, onOpen, onAdd, onRename, onDelete, readOnly }: {
  files: string[];
  active: string;
  onOpen: (path: string) => void;
  onAdd: (path: string) => void;
  onRename: (from: string, to: string) => void;
  onDelete: (path: string) => void;
  readOnly?: boolean;
}) {
  const [adding, setAdding] = useState<string | null>(null);   // prefix being added into
  const [draft, setDraft] = useState("");
  const [problem, setProblem] = useState("");
  const tree = useMemo(() => toTree(files), [files]);

  function startAdd(prefix: string) {
    setAdding(prefix);
    setDraft(prefix);
    setProblem("");
  }
  function commit() {
    const path = normalizePath(draft);
    const bad = checkPath(path, files);
    if (bad) { setProblem(bad); return; }
    onAdd(path);
    setAdding(null);
    setDraft("");
    setProblem("");
  }

  function render(nodes: Node[], depth: number) {
    return nodes.map((node) => node.isFile ? (
      <div key={node.path} className={node.path === active ? "tf-row file active" : "tf-row file"}
           style={{ paddingLeft: 10 + depth * 13 }}>
        <button className="tf-open" onClick={() => onOpen(node.path)} title={node.path}>
          <span className="tf-icon">{icon(node.name)}</span>{node.name}
          {node.path === ENTRY_FILE && <span className="tf-entry" title="This is the page the preview shows">start</span>}
        </button>
        {!readOnly && (
          <span className="tf-actions">
            <button title="Rename" onClick={() => {
              const next = window.prompt("New name (you can include folders)", node.path);
              if (next && normalizePath(next) !== node.path) onRename(node.path, normalizePath(next));
            }}>✎</button>
            <button title="Delete" onClick={() => onDelete(node.path)}>✕</button>
          </span>
        )}
      </div>
    ) : (
      <div key={node.path}>
        <div className="tf-row folder" style={{ paddingLeft: 10 + depth * 13 }}>
          <span className="tf-icon">▾</span>{node.name}
          {!readOnly && <span className="tf-actions">
            <button title={`New file in ${node.path}`} onClick={() => startAdd(node.path + "/")}>＋</button>
          </span>}
        </div>
        {render(node.children, depth + 1)}
      </div>
    ));
  }

  return <aside className="filetree">
    <div className="tf-head">
      <strong>Files</strong>
      {!readOnly && <>
        <button title="New file" onClick={() => startAdd("")}>＋ File</button>
        <button title="New folder" onClick={() => startAdd("new-folder/")}>＋ Folder</button>
      </>}
    </div>
    <div className="tf-list">{render(tree, 0)}</div>
    {adding !== null && (
      <div className="tf-new">
        <input autoFocus value={draft} placeholder="style.css or css/style.css"
               onChange={(event) => { setDraft(event.target.value); setProblem(""); }}
               onKeyDown={(event) => {
                 if (event.key === "Enter") commit();
                 if (event.key === "Escape") { setAdding(null); setProblem(""); }
               }} />
        <div className="tf-new-actions">
          <button className="primary compact" onClick={commit}>Create</button>
          <button className="text-button" onClick={() => { setAdding(null); setProblem(""); }}>Cancel</button>
        </div>
        {problem
          ? <p className="tf-problem">{problem}</p>
          : <p className="tf-hint">Type a folder in the name to make one: <code>css/style.css</code></p>}
      </div>
    )}
  </aside>;
}
