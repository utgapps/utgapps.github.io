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
    // Optional URL that returns fresh TURN credentials as { iceServers: [...] }.
    // Used for providers whose credentials expire (e.g. a Cloudflare TURN Worker).
    UTG_TURN_URL?: string;
  }
}

let iceCache: RTCIceServer[] | null = null;

// STUN is always tried first (WebRTC prefers direct/STUN candidates and only
// falls back to a TURN relay when those fail). We add TURN relays from either a
// static list (window.UTG_TURN) or a credentials endpoint (window.UTG_TURN_URL,
// e.g. a Cloudflare Worker that mints short-lived credentials).
async function loadIceServers(): Promise<RTCIceServer[]> {
  if (iceCache) return iceCache;
  const base: RTCIceServer[] = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ];
  const staticTurn = Array.isArray(window.UTG_TURN) ? window.UTG_TURN : [];
  let fetched: RTCIceServer[] = [];
  const url = window.UTG_TURN_URL;
  if (typeof url === "string" && url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data && data.iceServers;
      if (Array.isArray(list)) fetched = list;
    } catch {
      /* fall back to STUN + any static TURN */
    }
  }
  iceCache = [...base, ...staticTurn, ...fetched];
  return iceCache;
}

// Options for every Peer we create. Resolves to PeerJS defaults (STUN-only,
// which many school firewalls block) unless a TURN relay is configured.
export async function peerOptions(): Promise<import("peerjs").PeerOptions> {
  return { config: { iceServers: await loadIceServers() } };
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
