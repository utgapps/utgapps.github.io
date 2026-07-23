import type { PartMeta, PartCategory } from "./parts";

export const PITCH = 12.7;

// A hole HANDLE in a part's LOCAL (recentered) frame: a point on an open face
// of a hole, the outward normal (the direction a pin enters from), and a
// tangent (a fixed in-plane direction, e.g. the part's length) used to align
// orientation on connect. A through-hole yields two handles — one per face.
export type Hole = { p: [number, number, number]; axis: [number, number, number]; tan: [number, number, number] };

const AXES: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// Categories whose parts host holes that connectors plug into.
const HOLED: PartCategory[] = ["beam", "plate", "standoff", "corner", "gear", "wheel"];
export function hasHoles(meta: PartMeta): boolean { return HOLED.includes(meta.category); }

// VEX parts sit on a 12.7 mm pitch; holes are half-a-pitch in from each edge,
// so a run of n holes is centered at (i - (n-1)/2) * pitch.
const nAlong = (mm: number) => Math.max(1, Math.round(mm / PITCH));
const centered = (i: number, n: number) => (i - (n - 1) / 2) * PITCH;

// Compute hole handles from a part's size + category. Derived (not from CAD)
// so it can be tuned without re-converting meshes.
export function holesFor(meta: PartMeta): Hole[] {
  const s = meta.sizeMM;
  const order = [0, 1, 2].sort((a, b) => s[a] - s[b]);
  const short = order[0], mid = order[1], long = order[2]; // thickness / width / length
  const holes: Hole[] = [];

  // A through-hole at `center` along axis `ax`, with in-plane tangent `tanIdx`:
  // a handle on each face, the normal pointing out of that face.
  const through = (center: [number, number, number], ax: number, tanIdx: number) => {
    const half = s[ax] / 2, a = AXES[ax], t = AXES[tanIdx];
    const plus: [number, number, number] = [...center]; plus[ax] += half;
    const minus: [number, number, number] = [...center]; minus[ax] -= half;
    holes.push({ p: plus, axis: a, tan: t });
    holes.push({ p: minus, axis: [-a[0], -a[1], -a[2]], tan: t });
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
  } else if (meta.category === "gear" || meta.category === "wheel") {
    through([0, 0, 0], short, long); // centre bore, both faces
  }
  return holes;
}
