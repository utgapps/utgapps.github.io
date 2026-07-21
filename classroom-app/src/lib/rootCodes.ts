export type RootClassCode = {
  code: string;
  label?: string;
  enabled: boolean;
  classroom?: { classId: string; role: "instructor" | "student" };
};

export type ClassroomDefinition = {
  id: string;
  courseId: string;
  className: string;
  roomCode: string;
  instructorCode: string;
  studentCode: string;
};

declare global {
  interface Window {
    CLASS_CODES?: RootClassCode[];
    UTG_CLASSROOMS?: ClassroomDefinition[];
    UTG_isActive?: (entry: RootClassCode) => boolean;
  }
}

export function classroomAssignment(code: string) {
  const normalized = code.trim().toUpperCase();
  const entry = (window.CLASS_CODES || []).find((item) => item.code.toUpperCase() === normalized);
  const active = window.UTG_isActive ? window.UTG_isActive(entry as RootClassCode) : entry?.enabled;
  const classroom = (window.UTG_CLASSROOMS || []).find((item) => item.id === entry?.classroom?.classId);
  return active && entry?.classroom && classroom
    ? { loginCode: normalized, role: entry.classroom.role, ...classroom }
    : null;
}

export function classroomForRoomCode(roomCode: string) {
  return (window.UTG_CLASSROOMS || []).find((item) => item.roomCode === roomCode.trim().toUpperCase()) || null;
}
