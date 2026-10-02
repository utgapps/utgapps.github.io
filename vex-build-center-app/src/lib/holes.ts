import type { PartMeta, PartCategory } from "./parts";

export const PITCH = 12.7;

// What a bore does to whatever goes through it. A round hole lets a pin or an
// axle turn in it; a square bore (the middle of a gear or wheel) grips an axle
// so they turn together; the motor's socket turns the axle itself.
export type Bore = "round" | "square" | "socket";

// A hole HANDLE in a part's LOCAL (recentered) frame: a point on an open face
// of a hole, the outward normal (the direction a pin enters from), and a
// tangent (a fixed in-plane direction, e.g. the part's length) used to align
// orientation on connect. A through-hole yields two handles — one per face.
//
// `kind` is "hole" (female, takes a pin) or "stud" (a corner connector's
// built-in male pin, which plugs straight into someone else's hole).
// `core` identifies the physical bore: the two handles of one through-hole
// share a core, so filling it from either side hides both.
export type Hole = {
  p: [number, number, number]; axis: [number, number, number]; tan: [number, number, number];
  kind: "hole" | "stud"; core: number; bore: Bore;
};

const AXES: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// Categories whose parts host holes that connectors plug into (fallback only —
// most parts now carry handles measured from the real mesh).
const HOLED: PartCategory[] = ["beam", "plate", "standoff", "corner", "gear", "sprocket", "wheel"];
export function hasHoles(meta: PartMeta): boolean {
  return (meta.holes && meta.holes.length > 0) || HOLED.includes(meta.category);
}

// Gears, sprockets and wheels turn with their axle, and so do a ratchet and a flywheel. The
// 60T ring gear is a fixed ring, and the differential is a box of gears, not one gear.
const SPINS: PartCategory[] = ["gear", "sprocket", "wheel"];
const ALSO_SPIN = /^(ratchet-\d+t|flywheel)$/;
const NEVER_SPIN = /^gear-(ring-60t|differential)$/;
export function spinsWithAxle(meta: PartMeta): boolean {
  if (NEVER_SPIN.test(meta.id)) return false;
  return SPINS.includes(meta.category) || ALSO_SPIN.test(meta.id);
}
// The idler gear has a round middle: it turns freely on whatever goes through it.
const FREE_SPINNING = new Set(["gear-36t-idler"]);
// Most spinning parts turn about their thinnest dimension. The worm gear is the exception: it
// is a screw, and it turns about its length.
export function spinAxisIndex(meta: PartMeta): number {
  const sizes = meta.sizeMM;
  return meta.id === "gear-worm" ? sizes.indexOf(Math.max(...sizes)) : sizes.indexOf(Math.min(...sizes));
}
const thinAxis = spinAxisIndex;

// A fixed in-plane direction for a detected handle: the part's longest axis
// perpendicular to the hole axis (used to align orientation on connect).
function tangentFor(meta: PartMeta, axis: [number, number, number]): [number, number, number] {
  const ai = axis.findIndex((v) => v !== 0);
  const perp = [0, 1, 2].filter((i) => i !== ai);
  const pick = meta.sizeMM[perp[0]] >= meta.sizeMM[perp[1]] ? perp[0] : perp[1];
  return AXES[pick];
}

// VEX parts sit on a 12.7 mm pitch; holes are half-a-pitch in from each edge,
// so a run of n holes is centered at (i - (n-1)/2) * pitch.
const nAlong = (mm: number) => Math.max(1, Math.round(mm / PITCH));
const centered = (i: number, n: number) => (i - (n - 1) / 2) * PITCH;

// The middle of a gear or wheel is its axle bore.
function isCenterBore(meta: PartMeta, p: [number, number, number], axisIndex: number): boolean {
  if (!spinsWithAxle(meta) || axisIndex !== thinAxis(meta)) return false;
  const perp = [0, 1, 2].filter((i) => i !== axisIndex);
  return Math.hypot(p[perp[0]], p[perp[1]]) < 1.5;
}

// Beams and plates are an exact 12.7 mm grid of holes. The mesh detector read the gap between
// the middle two holes of every even-length beam (and the 3x6 and 3x12 plates) as a hole of
// its own, and others up to 0.2 mm off, so a click there joined parts half a hole out. Snap
// each detected hole onto the grid and drop the ones that are not on it.
const GRID_SLOP = 3;
type Detected = NonNullable<PartMeta["holes"]>[number];
function onPitchGrid(meta: PartMeta, detected: Detected[]): Detected[] {
  if (meta.category !== "beam" && meta.category !== "plate") return detected;
  const out: Detected[] = [];
  for (const hole of detected) {
    const axisIndex = hole.axis.findIndex((v) => v !== 0);
    const p: [number, number, number] = [hole.p[0], hole.p[1], hole.p[2]];
    let onGrid = true;
    for (const index of [0, 1, 2]) {
      if (index === axisIndex) continue;
      const count = nAlong(meta.sizeMM[index]);
      const step = Math.round(p[index] / PITCH + (count - 1) / 2);
      const nearest = centered(Math.max(0, Math.min(count - 1, step)), count);
      if (Math.abs(nearest - p[index]) > GRID_SLOP) { onGrid = false; break; }
      p[index] = nearest;
    }
    if (onGrid) out.push({ ...hole, p });
  }
  return out;
}

// Compute hole handles from a part's size + category. Derived (not from CAD)
// so it can be tuned without re-converting meshes.
const BLIND_DEPTH = 12.7; // a face this far from the middle is on a part too thick to pin through

export function holesFor(meta: PartMeta): Hole[] {
  // Prefer handles measured from the real CAD mesh (see tools/detect-features.cjs).
  if (meta.holes && meta.holes.length) {
    const usable = onPitchGrid(meta, meta.holes.filter((h) => h.kind === "hole" || h.kind === "stud" || h.kind === "axle"));
    if (usable.length) {
      // The detector emits handles face-by-face, so a through-hole's two
      // handles are far apart in the list. Pair them by the bore's axis line:
      // same axis, same in-plane position, opposite normals. Faces more than two
      // pitches apart are not one bore but two blind holes (the Brain's sides):
      // no pin is that long, and a pin in one must not count as filling the other.
      const cores = new Map<string, number>();
      const holes: Hole[] = usable.map((h) => {
        const ai = h.axis.findIndex((v) => v !== 0);
        const perp = [0, 1, 2].filter((i) => i !== ai);
        const key = h.kind === "stud"
          ? `s:${h.p.map((v) => Math.round(v)).join(",")}`             // a stud is its own core
          : `h:${ai}:${Math.round(h.p[perp[0]])}:${Math.round(h.p[perp[1]])}${Math.abs(h.p[ai]) > BLIND_DEPTH ? (h.p[ai] > 0 ? "+" : "-") : ""}`;
        let c = cores.get(key);
        if (c === undefined) { c = cores.size; cores.set(key, c); }
        const kind: "hole" | "stud" = h.kind === "stud" ? "stud" : "hole";
        const bore: Bore = h.kind === "axle" ? "socket" : isCenterBore(meta, h.p, ai) && !FREE_SPINNING.has(meta.id) ? "square" : "round";
        return { p: h.p, axis: h.axis, tan: tangentFor(meta, h.axis), kind, core: c, bore };
      });
      // The mesh detector missed the 36T's middle. Every gear and wheel has
      // one, and without it there is no way to put the gear on an axle.
      const hasCenter = holes.some((h) => isCenterBore(meta, h.p, h.axis.findIndex((v) => v !== 0)));
      if (spinsWithAxle(meta) && !hasCenter) {
        const axisIndex = thinAxis(meta), half = meta.sizeMM[axisIndex] / 2, core = cores.size;
        const front: [number, number, number] = [0, 0, 0], back: [number, number, number] = [0, 0, 0];
        front[axisIndex] = half; back[axisIndex] = -half;
        const out = AXES[axisIndex], into: [number, number, number] = [-out[0], -out[1], -out[2]];
        const bore: Bore = FREE_SPINNING.has(meta.id) ? "round" : "square";
        holes.push({ p: front, axis: out, tan: tangentFor(meta, out), kind: "hole", core, bore });
        holes.push({ p: back, axis: into, tan: tangentFor(meta, out), kind: "hole", core, bore });
      }
      return holes;
    }
  }
  const s = meta.sizeMM;
  const order = [0, 1, 2].sort((a, b) => s[a] - s[b]);
  const short = order[0], mid = order[1], long = order[2]; // thickness / width / length
  const holes: Hole[] = [];

  // A through-hole at `center` along axis `ax`, with in-plane tangent `tanIdx`:
  // a handle on each face, the normal pointing out of that face.
  let nextCore = 0;
  const through = (center: [number, number, number], ax: number, tanIdx: number, bore: Bore = "round") => {
    const half = s[ax] / 2, a = AXES[ax], t = AXES[tanIdx];
    const plus: [number, number, number] = [...center]; plus[ax] += half;
    const minus: [number, number, number] = [...center]; minus[ax] -= half;
    const core = nextCore++; // both faces are the same physical bore
    holes.push({ p: plus, axis: a, tan: t, kind: "hole", core, bore });
    holes.push({ p: minus, axis: [-a[0], -a[1], -a[2]], tan: t, kind: "hole", core, bore });
  };

  if (meta.category === "beam") {
    const n = nAlong(s[long]);
    for (let i = 0; i < n; i++) through([0, 0, 0].map((_, k) => (k === long ? centered(i, n) : 0)) as [number, number, number], short, long);
  } else if (meta.category === "plate" || meta.category === "corner") {
    const nL = nAlong(s[long]), nM = nAlong(s[mid]);
    for (let i = 0; i < nL; i++) for (let j = 0; j < nM; j++) {
      const c: [number, number, number] = [0, 0, 0];
      c[long] = centered(i, nL); c[mid] = centered(j, nM);
      through(c, short, long);
    }
  } else if (meta.category === "standoff") {
    through([0, 0, 0], long, mid); // hollow: an opening at each end
  } else if (spinsWithAxle(meta)) {
    through([0, 0, 0], short, long, "square"); // centre bore, both faces
  }
  return holes;
}
