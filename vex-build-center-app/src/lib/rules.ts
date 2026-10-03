import * as THREE from "three";
import { OBB } from "three/examples/jsm/math/OBB.js";
import type { Fill, PartPose } from "./connections.ts";
import { longAxisIndex } from "./connections.ts";
import { planCables, type CablePlan } from "./cables.ts";

// The things a real robot needs that a 3D model does not: an axle held in two places so it
// cannot tip, nothing on an axle free to slide along it or off the end, and every motor and
// sensor plugged into a Brain port that a cable can actually reach.

export type Rule = "support" | "slides" | "brain" | "cable" | "port" | "band";
export type BuildProblem = { rule: Rule; uids: string[]; text: string };

const TIGHT = 1.6;  // mm a part on an axle may slide before it counts as loose
const STRUCTURE = new Set(["beam", "plate", "angle", "corner", "attachment", "motion", "brain"]);

type Interval = { lo: number; hi: number };
export type AxleItem = Interval & {
  uid: string; name: string; group: string;
  anchored: boolean; // part of the frame: it does not slide
  collar: boolean;   // grips the axle (a rubber collar, or the cap of a capped axle)
  socket: boolean;   // the motor this axle is plugged into
  support: boolean;  // a beam or plate the axle turns in
};

// How far a part reaches along a line: its box's shadow on the line.
function shadowOn(pose: PartPose, origin: THREE.Vector3, axis: THREE.Vector3): Interval {
  const center = new THREE.Vector3().setFromMatrixPosition(pose.matrixWorld).sub(origin).dot(axis);
  const elements = pose.matrixWorld.elements;
  let half = 0;
  for (let index = 0; index < 3; index++) {
    const column = new THREE.Vector3(elements[index * 4], elements[index * 4 + 1], elements[index * 4 + 2]).normalize();
    half += Math.abs(column.dot(axis)) * pose.meta.sizeMM[index] / 2;
  }
  return { lo: center - half, hi: center + half };
}

const isCollar = (pose: PartPose) => pose.meta.id === "rubber-collar";
const capSign = (pose: PartPose) => (pose.meta.id.startsWith("shaft-cap-") ? 1 : 0); // which end has the cap, along the axle's own length

export type AxleStack = {
  axle: PartPose; axis: THREE.Vector3; origin: THREE.Vector3; half: number;
  items: AxleItem[];               // what is on it, in order along `axis`, measured from `origin`
  blocked: (sign: 1 | -1) => boolean; // a motor socket or the frame stops it sliding out that end
  frame: string;                   // the group the frame belongs to
};

/** Parts held together by pins and built-in pins move as one: a group id for every part. */
function groupsOf(poses: PartPose[], fills: Fill[], studs: { studUid: string; holeUid: string }[]) {
  const parent = new Map(poses.map((pose) => [pose.uid, pose.uid]));
  const find = (uid: string): string => { let root = uid; while (parent.get(root) !== root) root = parent.get(root)!; parent.set(uid, root); return root; };
  const unite = (first: string, second: string) => { if (parent.has(first) && parent.has(second)) parent.set(find(first), find(second)); };
  for (const fill of fills) if (fill.occupierCategory === "pin") unite(fill.occupierUid, fill.partUid);
  for (const stud of studs) unite(stud.studUid, stud.holeUid);
  return find;
}

/** Every axle, with what is on it and what stops it, for the rules and for finishing builds. */
export function axleStacks(poses: PartPose[], fills: Fill[], studs: { studUid: string; holeUid: string }[]): AxleStack[] {
  const byUid = new Map(poses.map((pose) => [pose.uid, pose]));
  const find = groupsOf(poses, fills, studs);
  // The frame is the group that holds the Brain (or, without one, a motor, or the most parts).
  const groupSize = new Map<string, number>();
  for (const pose of poses) groupSize.set(find(pose.uid), (groupSize.get(find(pose.uid)) ?? 0) + 1);
  const anchor = poses.find((pose) => pose.meta.category === "brain") ?? poses.find((pose) => pose.meta.isMotor)
    ?? poses.reduce<PartPose | undefined>((best, pose) => (!best || groupSize.get(find(pose.uid))! > groupSize.get(find(best.uid))! ? pose : best), undefined);
  const frame = anchor ? find(anchor.uid) : "";
  const boxes = new Map<string, OBB>();
  const boxOf = (pose: PartPose) => {
    let box = boxes.get(pose.uid);
    if (!box) { box = new OBB(new THREE.Vector3(), new THREE.Vector3(...pose.meta.sizeMM).multiplyScalar(0.5)).applyMatrix4(pose.matrixWorld); boxes.set(pose.uid, box); }
    return box;
  };

  const stacks: AxleStack[] = [];
  for (const axle of poses) {
    if (axle.meta.category !== "shaft") continue;
    const own = fills.filter((fill) => fill.occupierUid === axle.uid);
    if (!own.length) continue;
    const longIndex = longAxisIndex(axle.meta);
    const axis = new THREE.Vector3().setComponent(longIndex, 1).transformDirection(axle.matrixWorld);
    const origin = new THREE.Vector3().setFromMatrixPosition(axle.matrixWorld);
    const half = axle.meta.sizeMM[longIndex] / 2;

    const items: AxleItem[] = [];
    for (const uid of new Set(own.map((fill) => fill.partUid))) {
      const pose = byUid.get(uid)!;
      const span = shadowOn(pose, origin, axis);
      const collar = isCollar(pose) && Math.abs((span.lo + span.hi) / 2) <= half - 2; // half off the end grips nothing
      const socket = own.some((fill) => fill.partUid === uid && fill.bore === "socket");
      const support = STRUCTURE.has(pose.meta.category) && own.some((fill) => fill.partUid === uid && fill.bore === "round");
      items.push({ ...span, uid, name: pose.meta.name, anchored: find(uid) === frame, collar, socket, support, group: find(uid) });
    }
    items.sort((first, second) => first.lo + first.hi - second.lo - second.hi);
    // A capped axle's cap pushes like a collar that cannot come off.
    if (capSign(axle)) {
      const sign = new THREE.Vector3().setComponent(longIndex, capSign(axle)).transformDirection(axle.matrixWorld).dot(axis) > 0 ? 1 : -1;
      const cap: AxleItem = { lo: sign > 0 ? half - 1.5 : -half, hi: sign > 0 ? half : -half + 1.5, uid: axle.uid, name: "cap", anchored: false, collar: true, socket: false, support: false, group: find(axle.uid) };
      if (sign > 0) items.push(cap); else items.unshift(cap);
    }
    // A motor socket is a dead end, and a part of the frame just past the end of the axle is a
    // wall: either stops the axle sliding out that way.
    const blocked = (sign: 1 | -1) => {
      if (items.some((item) => item.socket && (sign > 0 ? item.hi > half - 2 : item.lo < -half + 2))) return true;
      const tip = origin.clone().addScaledVector(axis, sign * (half + TIGHT));
      return poses.some((pose) => pose !== axle && find(pose.uid) === frame && !items.some((item) => item.uid === pose.uid) && boxOf(pose).containsPoint(tip));
    };
    stacks.push({ axle, axis, origin, half, items, blocked, frame });
  }
  return stacks;
}

/** Every rule a build breaks, in words a student can act on. */
export function checkBuild(poses: PartPose[], fills: Fill[], studs: { studUid: string; holeUid: string }[], plan?: CablePlan): BuildProblem[] {
  const problems: BuildProblem[] = [];
  const byUid = new Map(poses.map((pose) => [pose.uid, pose]));
  const nameOf = (uid: string) => byUid.get(uid)?.meta.name ?? "part";

  for (const { axle, items, blocked } of axleStacks(poses, fills, studs)) {
    // Held in two places, so it cannot tip: two beams or plates, or a motor and one beam.
    const supports = items.filter((item) => item.support);
    const socketed = items.some((item) => item.socket);
    const spread = supports.length ? Math.max(...supports.map((item) => item.hi)) - Math.min(...supports.map((item) => item.lo)) : 0;
    if (supports.length + (socketed ? 1 : 0) < 2 || (!socketed && spread < 10)) {
      problems.push({
        rule: "support", uids: [axle.uid],
        text: socketed
          ? `The ${axle.meta.name} from the motor goes through ${supports.length ? "no other" : "no"} beam. Put it through a beam or plate too, so it cannot tip.`
          : `The ${axle.meta.name} is held by ${supports.length === 1 ? "only one beam" : "no beam"}. Put it through the holes of two beams or plates so it cannot tip.`,
      });
    }

    // Otherwise a collar has to stop it: how far the axle slides before one of its collars
    // pushes, through anything loose, up against the frame.
    const playFrom = (start: number, direction: 1 | -1): number => {
      let gap = 0;
      for (let index = start + direction; index >= 0 && index < items.length; index += direction) {
        const previous = items[index - direction], next = items[index];
        gap += Math.max(0, direction > 0 ? next.lo - previous.hi : previous.lo - next.hi);
        if (next.anchored) return gap;
        if (next.collar) return Infinity; // another collar: it is that one's job
      }
      return Infinity;
    };
    const slide = (direction: 1 | -1) => {
      if (items.some((item) => item.socket)) return 0; // the motor holds its end of the axle
      if (blocked(direction)) return 0;
      let best = Infinity;
      items.forEach((item, index) => { if (item.collar) best = Math.min(best, playFrom(index, direction)); });
      return best;
    };
    const towardPlus = slide(1), towardMinus = slide(-1);
    if (towardPlus === Infinity || towardMinus === Infinity) {
      const last = towardPlus === Infinity ? items[items.length - 1] : items[0];
      problems.push({
        rule: "slides", uids: [axle.uid],
        text: `The ${axle.meta.name} can slide out${last ? ` past the ${last.name}` : ""}. Put a rubber shaft collar on ${towardPlus === Infinity && towardMinus === Infinity ? "both ends" : "that end"}, tight against the parts.`,
      });
    } else if (towardPlus + towardMinus > TIGHT) {
      problems.push({ rule: "slides", uids: [axle.uid], text: `The ${axle.meta.name} slides ${(towardPlus + towardMinus).toFixed(0)} mm back and forth. Push its collars up tight.` });
    }

    // Loose parts: everything that is not part of the frame must be trapped between stops.
    const seen = new Set<string>();
    items.forEach((item) => {
      if (item.anchored || item.collar || item.socket || item.uid === axle.uid) return;
      const group = item.group;
      if (seen.has(group)) return;
      seen.add(group);
      // A gear and the arm pinned to it slide as one: judge the group's whole run on this axle.
      const members = items.map((other, at) => ({ other, at })).filter(({ other }) => other.group === group);
      const first = members[0].at, last = members[members.length - 1].at;
      if (items.slice(first, last + 1).some((other) => other.anchored)) return; // it straddles the frame: trapped
      const room = (from: number, direction: 1 | -1): number => {
        let gap = 0;
        for (let next = from + direction; next >= 0 && next < items.length; next += direction) {
          const previous = items[next - direction], other = items[next];
          gap += Math.max(0, direction > 0 ? other.lo - previous.hi : previous.lo - other.hi);
          if (other.anchored || other.collar || other.socket) return gap;
        }
        return Infinity;
      };
      const before = room(first, -1), after = room(last, 1);
      if (before === Infinity || after === Infinity) {
        problems.push({ rule: "slides", uids: [item.uid, axle.uid], text: `The ${item.name} can slide off the end of the ${axle.meta.name}. Put a rubber shaft collar past it.` });
      } else if (before + after > TIGHT) {
        problems.push({ rule: "slides", uids: [item.uid, axle.uid], text: `The ${item.name} can slide ${(before + after).toFixed(0)} mm along the ${axle.meta.name}. Fill the gap with spacers or a rubber shaft collar.` });
      }
    });
  }

  // Cables.
  const cables = plan ?? planCables(poses);
  if (cables.noBrain.length) problems.push({ rule: "brain", uids: cables.noBrain, text: `Add a Robot Brain: every motor and sensor needs a Smart Cable to one of its ports.` });
  for (const cable of cables.cables) {
    if (!cable.reaches) problems.push({ rule: "cable", uids: [cable.deviceUid], text: `The ${cable.deviceName} is too far from the Brain: even a 400 mm Smart Cable will not reach. Move them closer.` });
    else if (!cable.clear) problems.push({ rule: "cable", uids: [cable.deviceUid, ...cable.blockedBy], text: `The ${cable.deviceName}'s cable has no way round the ${nameOf(cable.blockedBy[0])} to the Brain. Leave a gap a cable can pass through.` });
  }
  for (const uid of cables.noPort) problems.push({ rule: "cable", uids: [uid], text: `There is no free Brain port left for the ${nameOf(uid)}.` });
  for (const blocked of cables.blocked) {
    problems.push({ rule: "port", uids: [blocked.blockedBy], text: `The ${nameOf(blocked.blockedBy)} is in front of Brain port ${blocked.port}, so no cable can be plugged in there. Leave the ports clear.` });
  }
  return problems;
}
