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
  const stored = storedIceServers(token);
  if (stored) { iceCache = [...base, ...stored]; return iceCache; }
  const fetched = await apiGetTurnCredentials(token);
  storeIceServers(token, fetched);
  iceCache = [...base, ...fetched];
  return iceCache;
}

/* The relay credentials last a day. Each fresh fetch costs a TURN Worker
   request, a Classroom API request and a Cloudflare credentials call, and every
   page load used to make one - so they are kept for the session's token and
   reused while at least four hours of the day are left. */
const ICE_KEY = "utg_ice_servers", ICE_REUSE_MS = 20 * 60 * 60 * 1000;
function storedIceServers(token: string): RTCIceServer[] | null {
  try {
    const saved = JSON.parse(localStorage.getItem(ICE_KEY) || "null");
    if (!saved || saved.token !== token || !Array.isArray(saved.servers)) return null;
    const age = Date.now() - saved.at;
    return age >= 0 && age < ICE_REUSE_MS ? saved.servers : null;
  } catch { return null; }
}
function storeIceServers(token: string, servers: RTCIceServer[]) {
  if (!servers.length) return;
  try { localStorage.setItem(ICE_KEY, JSON.stringify({ token, servers, at: Date.now() })); } catch { /* private mode: fetch again next time */ }
}

// Options for every Peer we create. Resolves to PeerJS defaults (STUN-only,
// which many school firewalls block) unless a TURN relay is configured.
export async function peerOptions(token?: string): Promise<import("peerjs").PeerOptions> {
  return { config: { iceServers: await loadIceServers(token) } };
}

export function classroomForId(classId: string) {
  // Kept in step with window.UTG_CLASSROOMS in /class-codes.js. A class missing
  // from here cannot sign in at all - StudentJoin rejects the login outright.
  const known: ClassroomDefinition[] = [
    { id: "ai101", courseId: "AI101", className: "AI101 - Talk to the Machine" },
    { id: "ai102", courseId: "AI102", className: "AI102 - AI Creative Studio" },
    { id: "ccl", courseId: "CCL", className: "CCL - Canadian Coding League" },
    { id: "wb601", courseId: "WB601", className: "WB601 - Web Development Level 1" },
    { id: "cs701", courseId: "CS701", className: "CS701 - AP Computer Science Prep Level 1" },
    { id: "pcc", courseId: "PCC", className: "PCC - Python Coding Challenges" },
  ];
  return known.find((item) => item.id === classId) || null;
}
import { apiGetTurnCredentials } from "./api";
