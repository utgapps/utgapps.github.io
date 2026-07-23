import type { PartMeta, PartCategory } from "./parts";

export const PITCH = 12.7;

// A hole in a part's LOCAL (recentered) frame: a point and the axis a
// pin/axle passes through it along.
export type Hole = { p: [number, number, number]; axis: [number, number, number] };

const AXES: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

// Categories whose parts host holes that connectors plug into.
const HOLED: PartCategory[] = ["beam", "plate", "standoff", "corner", "gear", "wheel"];
export function hasHoles(meta: PartMeta): boolean { return HOLED.includes(meta.category); }

// VEX parts sit on a 12.7 mm pitch; holes are half-a-pitch in from each edge,
// so a run of n holes is centered at (i - (n-1)/2) * pitch.
const nAlong = (mm: number) => Math.max(1, Math.round(mm / PITCH));
const centered = (i: number, n: number) => (i - (n - 1) / 2) * PITCH;

// Compute hole positions/axes from a part's size + category. Derived (not from
// CAD) so it can be tuned without re-converting meshes.
export function holesFor(meta: PartMeta): Hole[] {
  const s = meta.sizeMM;
  const order = [0, 1, 2].sort((a, b) => s[a] - s[b]);
  const short = order[0], mid = order[1], long = order[2]; // thickness / width / length
  const holes: Hole[] = [];
  const at = (dim: number, v: number) => { const p: [number, number, number] = [0, 0, 0]; p[dim] = v; return p; };

  if (meta.category === "beam") {
    const n = nAlong(s[long]);
    for (let i = 0; i < n; i++) holes.push({ p: at(long, centered(i, n)), axis: AXES[short] });
  } else if (meta.category === "plate" || meta.category === "corner") {
    const nL = nAlong(s[long]), nM = nAlong(s[mid]);
    for (let i = 0; i < nL; i++) for (let j = 0; j < nM; j++) {
      const p: [number, number, number] = [0, 0, 0];
      p[long] = centered(i, nL); p[mid] = centered(j, nM);
      holes.push({ p, axis: AXES[short] });
    }
  } else if (meta.category === "standoff") {
    const half = s[long] / 2;
    holes.push({ p: at(long, -half), axis: AXES[long] });
    holes.push({ p: at(long, half), axis: AXES[long] });
  } else if (meta.category === "gear" || meta.category === "wheel") {
    holes.push({ p: [0, 0, 0], axis: AXES[short] });
  }
  return holes;
}
