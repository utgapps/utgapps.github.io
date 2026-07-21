export type RootClassCode = {
  code: string;
  label?: string;
  enabled: boolean;
  classroom?: { courseId: string; className: string };
};

declare global {
  interface Window {
    CLASS_CODES?: RootClassCode[];
    UTG_isActive?: (entry: RootClassCode) => boolean;
  }
}

export function classroomAssignment(code: string) {
  const normalized = code.trim().toUpperCase();
  const entry = (window.CLASS_CODES || []).find((item) => item.code.toUpperCase() === normalized);
  const active = window.UTG_isActive ? window.UTG_isActive(entry as RootClassCode) : entry?.enabled;
  return active && entry?.classroom ? { code: normalized, ...entry.classroom } : null;
}
