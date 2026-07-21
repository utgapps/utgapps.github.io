import type { ClassRecord, Project, Student } from "./types";
import { starterFiles } from "./types";

export function normalizeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 4);
}

export function hostId(code: string) {
  return `utg-academy-kitsilano-class-v1-${normalizeCode(code).toLowerCase()}-host`;
}

export function makeClass(name: string, courseId: string, code: string): ClassRecord {
  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    code: normalizeCode(code),
    name,
    courseId,
    createdAt: new Date().toISOString(),
    admissionsOpen: true,
    students: [],
    devices: [],
    projects: {},
    checkpoints: [],
    notes: "",
  };
}

export function makeStudent(name: string): { student: Student; project: Project } {
  const projectId = crypto.randomUUID();
  return {
    student: { id: crypto.randomUUID(), name, projectId, status: "offline", deviceIds: [] },
    project: { id: projectId, title: `${name}'s project`, files: starterFiles(), updatedAt: new Date().toISOString() },
  };
}

// Only the files whose contents differ from the last-synced baseline. Used to
// send deltas over the wire instead of the whole project on every keystroke.
export function changedFiles(files: Record<string, string>, baseline: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name in files) if (files[name] !== baseline[name]) out[name] = files[name];
  return out;
}

export function downloadFile(name: string, contents: string, type = "application/json") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
