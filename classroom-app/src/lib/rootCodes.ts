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
};

declare global {
  interface Window {
    CLASS_CODES?: RootClassCode[];
    UTG_CLASSROOMS?: ClassroomDefinition[];
    UTG_isActive?: (entry: RootClassCode) => boolean;
    // This endpoint accepts a signed Classroom account session, then returns
    // short-lived TURN credentials. It never mints relay credentials publicly.
    UTG_TURN_URL?: string;
  }
}

let iceCache: RTCIceServer[] | null = null;

// STUN is tried first. A signed Classroom session is required before the app
// asks the TURN Worker for its short-lived relay credentials.
async function loadIceServers(token?: string): Promise<RTCIceServer[]> {
  if (iceCache && token) return iceCache;
  const base: RTCIceServer[] = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ];
  if (!token || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))) return base;
  const fetched = await apiGetTurnCredentials(token);
  iceCache = [...base, ...fetched];
  return iceCache;
}

// Options for every Peer we create. Resolves to PeerJS defaults (STUN-only,
// which many school firewalls block) unless a TURN relay is configured.
export async function peerOptions(token?: string): Promise<import("peerjs").PeerOptions> {
  return { config: { iceServers: await loadIceServers(token) } };
}

export function classroomForId(classId: string) {
  return (window.UTG_CLASSROOMS || []).find((item) => item.id === classId) || null;
}

// The root site hands a four-character access code to /classroom/?loginCode=.
// It identifies the curriculum and role, while the Worker checks the code and
// creates the authenticated session used for the actual live classroom.
export function classroomAccessForCode(value: string) {
  const code = String(value || "").trim().toUpperCase();
  const entry = (window.CLASS_CODES || []).find((item) => item.code.toUpperCase() === code);
  if (!entry || !entry.classroom || (window.UTG_isActive && !window.UTG_isActive(entry))) return null;
  return entry;
}
import { apiGetTurnCredentials } from "./api";
