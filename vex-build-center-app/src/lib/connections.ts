import * as THREE from "three";
import type { PartMeta } from "./parts";
import { holesFor, hasHoles, type Bore } from "./holes.ts";

// Which parts go THROUGH holes (and so fill them) rather than having holes.
export const OCCUPIER = new Set(["pin", "shaft"]);

// A placed part as far as connections care: what it is and where it sits.
export type PartPose = { uid: string; meta: PartMeta; matrixWorld: THREE.Matrix4 };

// One physical bore in the scene, in world space. Both faces of a through-hole
// make one core, keyed "<partUid>:<coreIndex>" like the hole markers.
export type Core = { key: string; partUid: string; center: THREE.Vector3; axis: THREE.Vector3; bore: Bore };

// A pin or axle sitting in somebody's bore.
export type Fill = {
  occupierUid: string; occupierCategory: string; partUid: string;
  coreKey: string; center: THREE.Vector3; axis: THREE.Vector3; bore: Bore;
};

const RADIAL_SLOP = 3.5;   // mm off the bore's line and still "in" it
const END_SLOP = 1.5;      // mm a pin may fall short of a hole and still reach it

export function longAxisIndex(meta: PartMeta): number {
  const s = meta.sizeMM;
  return s[0] >= s[1] && s[0] >= s[2] ? 0 : s[1] >= s[2] ? 1 : 2;
}

/** Every bore that a pin or axle can go into (built-in studs are male, so they are left out). */
export function boreCores(parts: PartPose[]): Core[] {
  const out: Core[] = [];
  for (const part of parts) {
    if (!hasHoles(part.meta)) continue;
    const byCore = new Map<number, { faces: THREE.Vector3[]; axis: THREE.Vector3; bore: Bore }>();
    for (const hole of holesFor(part.meta)) {
      if (hole.kind === "stud") continue;
      const face = new THREE.Vector3(...hole.p).applyMatrix4(part.matrixWorld);
      const entry = byCore.get(hole.core);
      if (entry) entry.faces.push(face);
      else byCore.set(hole.core, { faces: [face], axis: new THREE.Vector3(...hole.axis).transformDirection(part.matrixWorld), bore: hole.bore });
    }
    for (const [core, entry] of byCore) {
      const center = new THREE.Vector3();
      for (const face of entry.faces) center.add(face);
      center.multiplyScalar(1 / entry.faces.length);
      out.push({ key: `${part.uid}:${core}`, partUid: part.uid, center, axis: entry.axis, bore: entry.bore });
    }
  }
  return out;
}

/** The bores a pin or axle passes through: coaxial with it and within its length. */
export function fillsOf(occupier: PartPose, cores: Core[]): Fill[] {
  const longIndex = longAxisIndex(occupier.meta);
  const local = new THREE.Vector3().setComponent(longIndex, 1);
  const axis = local.transformDirection(occupier.matrixWorld);
  const center = new THREE.Vector3().setFromMatrixPosition(occupier.matrixWorld);
  const reach = occupier.meta.sizeMM[longIndex] / 2 + END_SLOP;
  const fills: Fill[] = [];
  const offset = new THREE.Vector3();
  for (const core of cores) {
    if (core.partUid === occupier.uid) continue;
    if (Math.abs(core.axis.dot(axis)) < 0.9) continue;
    offset.copy(core.center).sub(center);
    const along = offset.dot(axis);
    if (Math.abs(along) > reach) continue;
    if (offset.addScaledVector(axis, -along).length() > RADIAL_SLOP) continue;
    fills.push({
      occupierUid: occupier.uid, occupierCategory: occupier.meta.category, partUid: core.partUid,
      coreKey: core.key, center: core.center.clone(), axis: core.axis.clone(), bore: core.bore,
    });
  }
  return fills;
}

/** How many different parts have a bore on this line near this point: how deep a pin must reach. */
export function stackAt(cores: Core[], point: THREE.Vector3, axis: THREE.Vector3): number {
  const parts = new Set<string>();
  const offset = new THREE.Vector3();
  for (const core of cores) {
    if (Math.abs(core.axis.dot(axis)) < 0.9) continue;
    offset.copy(core.center).sub(point);
    const along = offset.dot(axis);
    if (Math.abs(along) > 45) continue;
    if (offset.addScaledVector(axis, -along).length() > RADIAL_SLOP) continue;
    parts.add(core.partUid);
  }
  return Math.max(1, parts.size);
}
