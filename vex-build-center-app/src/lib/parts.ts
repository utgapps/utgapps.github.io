import * as THREE from "three";

export type PartCategory =
  | "beam" | "plate" | "pin" | "standoff" | "corner"
  | "gear" | "wheel" | "shaft" | "spacer" | "motor" | "brain" | "sensor";

// A connection handle detected from the real mesh: a point on an open face
// plus the outward normal. kind "stud" is a built-in pin sticking out.
// kind: "hole" takes a pin · "stud" is a built-in pin sticking out ·
// "axle" is a driven socket (e.g. the Smart Motor output) — reserved for the
// spinning-axle feature, so it gets no pin marker yet.
export type DetectedHandle = { p: [number, number, number]; axis: [number, number, number]; kind: "hole" | "stud" | "axle" };

export type PartMeta = {
  id: string;
  name: string;
  category: PartCategory;
  sizeMM: [number, number, number];
  tris?: number;
  primitive?: "box";
  color?: string;
  isMotor?: boolean;
  holes?: DetectedHandle[]; // measured from the CAD mesh; preferred over the parametric guess
};

export type Manifest = { pitchMM: number; parts: PartMeta[] };

const BASE = import.meta.env.BASE_URL; // "/vex-build-center/"

export async function loadManifest(): Promise<Manifest> {
  const r = await fetch(`${BASE}parts/manifest.json`, { cache: "force-cache" });
  if (!r.ok) throw new Error("Could not load the parts library.");
  return r.json();
}

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

const geomCache = new Map<string, Promise<THREE.BufferGeometry>>();

export function loadGeometry(meta: PartMeta): Promise<THREE.BufferGeometry> {
  const cached = geomCache.get(meta.id);
  if (cached) return cached;
  const p = (async () => {
    if (meta.primitive === "box") {
      const [x, y, z] = meta.sizeMM;
      const g = new THREE.BoxGeometry(x, y, z);
      g.computeBoundingBox();
      return g;
    }
    const data = await (await fetch(`${BASE}parts/${meta.id}.json`, { cache: "force-cache" })).json();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(b64ToBytes(data.position).buffer), 3));
    if (data.normal) g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(b64ToBytes(data.normal).buffer), 3));
    g.setIndex(new THREE.BufferAttribute(new Uint32Array(b64ToBytes(data.index).buffer), 1));
    if (!data.normal) g.computeVertexNormals();
    g.computeBoundingBox();
    return g;
  })();
  geomCache.set(meta.id, p);
  return p;
}

export const CATEGORY_COLOR: Record<PartCategory, string> = {
  beam: "#2f6fb0", plate: "#3f8fd0", pin: "#e0a13a", standoff: "#8a94a6", corner: "#356fa8",
  gear: "#c85c3c", wheel: "#2b2f36", shaft: "#9aa3b0", spacer: "#b9c0cb", motor: "#2b7de0", brain: "#3a3f47", sensor: "#7a5cc0",
};

export const CATEGORY_LABEL: Record<PartCategory, string> = {
  beam: "Beams", plate: "Plates", pin: "Pins", standoff: "Standoffs", corner: "Corners",
  gear: "Gears", wheel: "Wheels", shaft: "Shafts", spacer: "Spacers", motor: "Motors", brain: "Brain & Battery", sensor: "Sensors",
};

export const CATEGORY_ORDER: PartCategory[] = [
  "beam", "plate", "corner", "pin", "standoff", "gear", "wheel", "shaft", "spacer", "motor", "sensor", "brain",
];
