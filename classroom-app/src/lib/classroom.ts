import type { ClassRecord, Project, Student } from "./types";
import { starterFiles } from "./types";

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function normalizeCode(value: string) {
  return value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 4);
}

export function createCode() {
  const random = crypto.getRandomValues(new Uint32Array(4));
  return Array.from(random, (value) => alphabet[value % alphabet.length]).join("");
}

export function hostId(code: string) {
  return `utg-academy-kitsilano-class-v1-${normalizeCode(code).toLowerCase()}-host`;
}

export function makeClass(name: string, courseId: string): ClassRecord {
  return {
    schemaVersion: 1,
    id: crypto.randomUUID(),
    code: createCode(),
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

export function downloadFile(name: string, contents: string, type = "application/json") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}
