export type ClassroomDefinition = {
  id: string;
  courseId: string;
  className: string;
};

declare global {
  interface Window {
    UTG_CLASSROOMS?: ClassroomDefinition[];
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
  const known: ClassroomDefinition[] = [
    { id: "ai102", courseId: "AI102", className: "AI102 - Introduction to AI Integration" },
  ];
  return known.find((item) => item.id === classId) || null;
}
import { apiGetTurnCredentials } from "./api";
