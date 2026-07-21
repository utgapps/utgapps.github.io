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
    // Optional extra ICE servers (especially a TURN relay) so students on
    // locked-down school/home networks can reach the teacher. Set in class-codes.js.
    UTG_TURN?: RTCIceServer[];
  }
}

// Options for every Peer we create. When a TURN relay is configured in
// class-codes.js (window.UTG_TURN), it is used so the WebRTC data channel can
// still form on networks that block direct/STUN connections. With none set,
// PeerJS falls back to its own defaults (which many school firewalls block).
export function peerOptions(): import("peerjs").PeerOptions {
  const extra = window.UTG_TURN;
  if (!Array.isArray(extra) || extra.length === 0) return {};
  return {
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        ...extra,
      ],
    },
  };
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
