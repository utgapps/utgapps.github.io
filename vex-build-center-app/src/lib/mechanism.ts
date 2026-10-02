import * as THREE from "three";
import type { Fill } from "./connections.ts";

// ---- What a build is made of, mechanically -------------------------------------------------
//
// Parts that cannot move against each other form one rigid BODY. Bodies meet at JOINTS:
//   - one pin (or one axle line) between two bodies is a hinge: they can swing about it;
//   - two different pin lines between the same two bodies lock them solid, as they do for real;
//   - an axle grips anything with a square bore (gears, wheels) and turns freely in round holes;
//   - an axle in a motor's socket is driven by that motor;
//   - two gears whose teeth touch turn together at the ratio of their tooth counts;
//   - sprockets wrapped by one chain turn the same way at the ratio of their tooth counts.
// The simulation is kinematic: motors are perfectly strong and nothing has weight, so what
// you see is how the mechanism is ALLOWED to move. If it cannot move at all, the motor stalls.

export const PITCH = 12.7;
// VEX IQ gears share one tooth size: 12T and 36T sit 2 holes apart, 12T and 60T 3 holes apart.
export const MM_PER_TOOTH_RADIUS = PITCH / 24;
export const SMART_MOTOR_RPM = 120;
// How far (in mm) the joints may be pulled apart before we call the build stuck. A build that
// can move solves to under 0.07 mm; one that is locked is past 0.2 within a few degrees.
const STUCK_MM = 0.2;

// The idler gear has the 36T's teeth; only its middle differs (it turns freely on its axle).
export function gearTeeth(partId: string): number {
  const match = /^gear-(\d+)t(-idler)?$/.exec(partId);
  return match ? Number(match[1]) : 0;
}

// VEX IQ chain has a quarter-inch pitch, so a sprocket's pitch circle grows with its teeth.
export const CHAIN_PITCH = 6.35;
export function sprocketTeeth(partId: string): number {
  const match = /^sprocket-(\d+)t$/.exec(partId);
  return match ? Number(match[1]) : 0;
}
export const sprocketPitchRadius = (teeth: number) => CHAIN_PITCH / (2 * Math.sin(Math.PI / teeth));

export type MechanismPart = {
  uid: string; id: string; name: string; category: string; isMotor: boolean;
  sizeMM: [number, number, number];
  object: THREE.Object3D;                 // the part's mesh; the simulation moves it
  geometry?: THREE.BufferGeometry;        // used to line gear teeth up
};
export type StudJoin = { studUid: string; holeUid: string; center: THREE.Vector3; axis: THREE.Vector3 };

type Line = { first: string; second: string; center: THREE.Vector3; axis: THREE.Vector3; drive: boolean; motorUid?: string };

class UnionFind {
  private parent = new Map<string, string>();
  find(item: string): string {
    let root = item;
    while (this.parent.has(root) && this.parent.get(root) !== root) root = this.parent.get(root)!;
    let walker = item;
    while (walker !== root) { const next = this.parent.get(walker) ?? root; this.parent.set(walker, root); walker = next; }
    return root;
  }
  union(first: string, second: string): boolean {
    const firstRoot = this.find(first), secondRoot = this.find(second);
    if (firstRoot === secondRoot) return false;
    this.parent.set(secondRoot, firstRoot);
    return true;
  }
}

function sameLine(line: Line, other: Line): boolean {
  if (Math.abs(line.axis.dot(other.axis)) < 0.98) return false;
  const offset = other.center.clone().sub(line.center);
  return offset.addScaledVector(line.axis, -offset.dot(line.axis)).length() < 1.0;
}

// ---- Simulation state ------------------------------------------------------------------------

export type Body = {
  index: number;
  partUids: string[];
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  inverseMass: number;
  inverseInertia: number;                 // isotropic: plenty for a kinematic solve
  members: { object: THREE.Object3D; localPosition: THREE.Vector3; localQuaternion: THREE.Quaternion }[];
  label: string;                          // the part that names this body in readouts
};

type Hinge = {
  first: number; second: number;
  anchorFirst: THREE.Vector3; anchorSecond: THREE.Vector3;     // body-local
  axisFirst: THREE.Vector3; axisSecond: THREE.Vector3;         // body-local
};

// How far a body has turned relative to the body that carries it, about one axis, unwrapped
// so it keeps counting past a full turn.
type Turn = {
  body: number; carrier: number;
  axisCarrier: THREE.Vector3;             // carrier-local
  referenceCarrier: THREE.Vector3;        // carrier-local, perpendicular to the axis
  referenceBody: THREE.Vector3;           // body-local, the same direction at the start
  lastRaw: number; angle: number;
  previous: number;                       // the angle at the last speed reading
  rpm: number;                            // smoothed, for the readouts
};

type Drive = { motorUid: string; motorName: string; turn: Turn; target: number; speedPercent: number; stalled: boolean };
// A chain turns both sprockets the same way, so its second radius is negative.
type GearMesh = { first: Turn; second: Turn; firstRadius: number; secondRadius: number; firstName: string; secondName: string; firstTeeth: number; secondTeeth: number; chain: boolean };

export type MotorInfo = { uid: string; name: string; speedPercent: number; rpm: number; stalled: boolean };
export type SpinInfo = { label: string; rpm: number };
export type MeshInfo = { driver: string; driven: string; driverTeeth: number; drivenTeeth: number; chain: boolean };

const scratchA = new THREE.Vector3(), scratchB = new THREE.Vector3(), scratchC = new THREE.Vector3();
const scratchQuaternion = new THREE.Quaternion();

function anyPerpendicular(axis: THREE.Vector3): THREE.Vector3 {
  const helper = Math.abs(axis.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  return new THREE.Vector3().crossVectors(axis, helper).normalize();
}
const wrapAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

export class Mechanism {
  bodies: Body[] = [];
  ground = 0;
  private hinges: Hinge[] = [];
  private drives: Drive[] = [];
  private meshes: GearMesh[] = [];
  // Meshes in order out from the motors, each with the body on the far side of it.
  private meshesFromMotors: { mesh: GearMesh; follower: number }[] = [];
  private spins: Turn[] = [];
  private bodyOfPart = new Map<string, number>();
  private drag: { body: number; anchor: THREE.Vector3; target: THREE.Vector3 } | null = null;
  notes: string[] = [];

  constructor(parts: MechanismPart[], fills: Fill[], studs: StudJoin[], options: { groundUid?: string } = {}) {
    const byUid = new Map(parts.map((part) => [part.uid, part]));
    const unionFind = new UnionFind();
    const lines: Line[] = [];

    // Who each pin and axle passes through, and how.
    const fillsBy = new Map<string, Fill[]>();
    for (const fill of fills) {
      if (!byUid.has(fill.partUid) || !byUid.has(fill.occupierUid)) continue;
      (fillsBy.get(fill.occupierUid) || fillsBy.set(fill.occupierUid, []).get(fill.occupierUid)!).push(fill);
    }
    for (const [occupierUid, occupierFills] of fillsBy) {
      const occupier = byUid.get(occupierUid)!;
      const occupierAxis = new THREE.Vector3().setComponent(occupier.sizeMM.indexOf(Math.max(...occupier.sizeMM)), 1)
        .applyQuaternion(occupier.object.getWorldQuaternion(new THREE.Quaternion())).normalize();
      const occupierCenter = occupier.object.getWorldPosition(new THREE.Vector3());
      const uniqueParts = (list: Fill[]) => [...new Map(list.map((fill) => [fill.partUid, fill])).values()];
      if (occupier.category === "shaft") {
        // An axle grips square bores, turns in round ones, and is turned by a motor's socket.
        const gripped = uniqueParts(occupierFills.filter((fill) => fill.bore === "square"));
        const loose = uniqueParts(occupierFills.filter((fill) => fill.bore === "round"));
        const sockets = uniqueParts(occupierFills.filter((fill) => fill.bore === "socket"));
        for (const fill of gripped) unionFind.union(occupierUid, fill.partUid);
        for (const fill of loose) lines.push({ first: occupierUid, second: fill.partUid, center: fill.center, axis: occupierAxis, drive: false });
        for (let index = 0; index < loose.length; index++)
          for (let other = index + 1; other < loose.length; other++)
            lines.push({ first: loose[index].partUid, second: loose[other].partUid, center: loose[index].center, axis: occupierAxis, drive: false });
        for (const fill of sockets) {
          const socketAxis = fill.axis.clone().normalize();
          lines.push({ first: fill.partUid, second: occupierUid, center: fill.center, axis: socketAxis, drive: true, motorUid: fill.partUid });
        }
      } else {
        // A pin is a hinge line between everything it passes through. It rides with the first.
        const held = uniqueParts(occupierFills);
        if (held.length) unionFind.union(held[0].partUid, occupierUid);
        for (let index = 0; index < held.length; index++)
          for (let other = index + 1; other < held.length; other++)
            lines.push({ first: held[index].partUid, second: held[other].partUid, center: occupierCenter, axis: occupierAxis, drive: false });
      }
    }
    // A corner's built-in pin is a pin like any other.
    for (const stud of studs) {
      if (byUid.has(stud.studUid) && byUid.has(stud.holeUid))
        lines.push({ first: stud.studUid, second: stud.holeUid, center: stud.center, axis: stud.axis.clone().normalize(), drive: false });
    }

    // Two different pin lines between the same two bodies lock them together. Merging can
    // make new pairs lockable, so repeat until nothing changes.
    for (let changed = true; changed;) {
      changed = false;
      const between = new Map<string, Line[]>();
      for (const line of lines) {
        const first = unionFind.find(line.first), second = unionFind.find(line.second);
        if (first === second) continue;
        const key = first < second ? `${first}|${second}` : `${second}|${first}`;
        const known = between.get(key) || between.set(key, []).get(key)!;
        if (!known.some((other) => sameLine(line, other))) known.push(line);
      }
      for (const known of between.values()) {
        if (known.length >= 2 && unionFind.union(known[0].first, known[0].second)) changed = true;
      }
    }

    // Bodies.
    const rootIndex = new Map<string, number>();
    for (const part of parts) {
      const root = unionFind.find(part.uid);
      let index = rootIndex.get(root);
      if (index === undefined) {
        index = this.bodies.length;
        rootIndex.set(root, index);
        this.bodies.push({ index, partUids: [], position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), inverseMass: 1, inverseInertia: 1, members: [], label: "" });
      }
      this.bodies[index].partUids.push(part.uid);
      this.bodyOfPart.set(part.uid, index);
    }

    // Which body holds still: the Brain's, else a motor's, else the biggest.
    const pick = (predicate: (part: MechanismPart) => boolean) => {
      const candidates = parts.filter(predicate).map((part) => this.bodyOfPart.get(part.uid)!);
      return candidates.sort((first, second) => this.bodies[second].partUids.length - this.bodies[first].partUids.length)[0];
    };
    this.ground = (options.groundUid && this.bodyOfPart.has(options.groundUid) ? this.bodyOfPart.get(options.groundUid) : undefined)
      ?? pick((part) => part.id === "robot-brain")
      ?? pick((part) => part.isMotor)
      ?? pick(() => true) ?? 0;

    // Gear teeth: turn each meshing gear by under half a tooth so the teeth fall between each other.
    const gearMeshPairs = this.findGearMeshes(parts);
    this.lineUpTeeth(gearMeshPairs);

    // Body frames, mass and the parts' places in them.
    for (const body of this.bodies) {
      const objects = body.partUids.map((uid) => byUid.get(uid)!.object);
      for (const object of objects) object.updateMatrixWorld(true);
      for (const object of objects) body.position.add(object.getWorldPosition(scratchA));
      body.position.multiplyScalar(1 / objects.length);
      let radius = 10;
      for (const object of objects) radius = Math.max(radius, object.getWorldPosition(scratchA).distanceTo(body.position) + 10);
      const grounded = body.index === this.ground;
      body.inverseMass = grounded ? 0 : 1 / objects.length;
      body.inverseInertia = grounded ? 0 : 1 / (objects.length * radius * radius * 0.4);
      for (const object of objects) {
        const worldQuaternion = object.getWorldQuaternion(new THREE.Quaternion());
        body.members.push({ object, localPosition: object.getWorldPosition(new THREE.Vector3()).sub(body.position), localQuaternion: worldQuaternion });
      }
      const named = body.partUids.map((uid) => byUid.get(uid)!);
      const namer = named.find((part) => part.category === "gear") || named.find((part) => part.category === "sprocket") || named.find((part) => part.category === "wheel")
        || named.find((part) => part.isMotor) || named.find((part) => part.category !== "pin" && part.category !== "shaft") || named[0];
      body.label = namer.name;
    }

    // Hinges and drives between different bodies.
    const seenHinges: { first: number; second: number; line: Line }[] = [];
    for (const line of lines) {
      const firstBody = this.bodyOfPart.get(line.first)!, second = this.bodyOfPart.get(line.second)!;
      if (firstBody === second) {
        if (line.drive) this.notes.push(`The ${byUid.get(line.motorUid!)!.name} can't turn its axle: something holds the axle to the motor.`);
        continue;
      }
      if (!seenHinges.some((seen) => ((seen.first === firstBody && seen.second === second) || (seen.first === second && seen.second === firstBody)) && sameLine(seen.line, line))) {
        seenHinges.push({ first: firstBody, second, line });
        this.hinges.push(this.makeHinge(firstBody, second, line));
      }
      if (line.drive) {
        const motor = byUid.get(line.motorUid!)!;
        this.drives.push({ motorUid: motor.uid, motorName: motor.name, turn: this.makeTurn(second, firstBody, line.axis), target: 0, speedPercent: 100, stalled: false });
      }
    }
    if (!this.drives.length && parts.some((part) => part.isMotor)) this.notes.push("Your motor has no axle in its square socket yet, so it has nothing to turn.");

    // Gear meshes, each measured against the body its axle turns in.
    for (const [first, second] of gearMeshPairs) {
      const firstBody = this.bodyOfPart.get(first.uid)!, secondBody = this.bodyOfPart.get(second.uid)!;
      const firstAxis = this.gearAxis(first), secondAxis = this.gearAxis(second);
      if (secondAxis.dot(firstAxis) < 0) secondAxis.negate();
      this.meshes.push({
        first: this.makeTurn(firstBody, this.carrierOf(firstBody, first), firstAxis),
        second: this.makeTurn(secondBody, this.carrierOf(secondBody, second), secondAxis),
        firstRadius: gearTeeth(first.id) * MM_PER_TOOTH_RADIUS, secondRadius: gearTeeth(second.id) * MM_PER_TOOTH_RADIUS,
        firstName: first.name, secondName: second.name, firstTeeth: gearTeeth(first.id), secondTeeth: gearTeeth(second.id), chain: false,
      });
    }
    for (const [first, second] of this.findChainLoops(parts)) {
      const firstBody = this.bodyOfPart.get(first.uid)!, secondBody = this.bodyOfPart.get(second.uid)!;
      const firstAxis = this.gearAxis(first), secondAxis = this.gearAxis(second);
      if (secondAxis.dot(firstAxis) < 0) secondAxis.negate();
      const firstTeeth = sprocketTeeth(first.id), secondTeeth = sprocketTeeth(second.id);
      this.meshes.push({
        first: this.makeTurn(firstBody, this.carrierOf(firstBody, first), firstAxis),
        second: this.makeTurn(secondBody, this.carrierOf(secondBody, second), secondAxis),
        firstRadius: sprocketPitchRadius(firstTeeth), secondRadius: -sprocketPitchRadius(secondTeeth),
        firstName: first.name, secondName: second.name, firstTeeth, secondTeeth, chain: true,
      });
    }

    // Walk out from the motors through the meshes, so a step can turn each gear train forward
    // before the general solve. Without that, every mesh pushes its driver back as hard as it
    // pulls the follower, and a fast train (two stages up) never settles in time.
    const reached = new Set(this.drives.map((drive) => drive.turn.body));
    for (let progressed = true; progressed;) {
      progressed = false;
      for (const mesh of this.meshes) {
        if (this.meshesFromMotors.some((entry) => entry.mesh === mesh)) continue;
        const firstIn = reached.has(mesh.first.body), secondIn = reached.has(mesh.second.body);
        if (firstIn === secondIn) continue;
        const follower = firstIn ? mesh.second.body : mesh.first.body;
        this.meshesFromMotors.push({ mesh, follower });
        reached.add(follower);
        progressed = true;
      }
    }

    // Spin readouts for everything that turns on an axle: gears, wheels, motor shafts.
    const counted = new Set<number>();
    for (const drive of this.drives) counted.add(drive.turn.body);
    for (const mesh of this.meshes) { counted.add(mesh.first.body); counted.add(mesh.second.body); }
    for (const body of counted) {
      if (body === this.ground) continue;
      const hinge = this.hinges.find((candidate) => candidate.first === body || candidate.second === body);
      if (!hinge) continue;
      const carrier = hinge.first === body ? hinge.second : hinge.first;
      const axisLocal = hinge.first === body ? hinge.axisFirst : hinge.axisSecond;
      this.spins.push(this.makeTurn(body, carrier, axisLocal.clone().applyQuaternion(this.bodies[body].quaternion)));
    }
    for (const part of parts) {
      if (part.category !== "wheel") continue;
      const body = this.bodyOfPart.get(part.uid)!;
      if (counted.has(body) || body === this.ground) continue;
      const hinge = this.hinges.find((candidate) => candidate.first === body || candidate.second === body);
      if (!hinge) continue;
      counted.add(body);
      const carrier = hinge.first === body ? hinge.second : hinge.first;
      this.spins.push(this.makeTurn(body, carrier, (hinge.first === body ? hinge.axisFirst : hinge.axisSecond).clone()));
    }
  }

  // ---- building the joints --------------------------------------------------------------------

  private makeHinge(first: number, second: number, line: Line): Hinge {
    const firstBody = this.bodies[first], secondBody = this.bodies[second];
    const toLocal = (body: Body, point: THREE.Vector3) => point.clone().sub(body.position).applyQuaternion(body.quaternion.clone().invert());
    const directionLocal = (body: Body, direction: THREE.Vector3) => direction.clone().applyQuaternion(body.quaternion.clone().invert());
    return {
      first, second,
      anchorFirst: toLocal(firstBody, line.center), anchorSecond: toLocal(secondBody, line.center),
      axisFirst: directionLocal(firstBody, line.axis), axisSecond: directionLocal(secondBody, line.axis),
    };
  }

  private makeTurn(body: number, carrier: number, axisWorld: THREE.Vector3): Turn {
    const carrierBody = this.bodies[carrier], turningBody = this.bodies[body];
    const inverseCarrier = carrierBody.quaternion.clone().invert();
    const reference = anyPerpendicular(axisWorld);
    return {
      body, carrier,
      axisCarrier: axisWorld.clone().normalize().applyQuaternion(inverseCarrier),
      referenceCarrier: reference.clone().applyQuaternion(inverseCarrier),
      referenceBody: reference.clone().applyQuaternion(turningBody.quaternion.clone().invert()),
      lastRaw: 0, angle: 0, previous: 0, rpm: 0,
    };
  }

  private gearAxis(part: MechanismPart): THREE.Vector3 {
    const thin = part.sizeMM.indexOf(Math.min(...part.sizeMM));
    return new THREE.Vector3().setComponent(thin, 1).applyQuaternion(part.object.getWorldQuaternion(new THREE.Quaternion())).normalize();
  }

  // The body a gear's own body turns in: across the hinge on the gear's axis line.
  private carrierOf(body: number, gear: MechanismPart): number {
    const center = gear.object.getWorldPosition(new THREE.Vector3());
    const axis = this.gearAxis(gear);
    for (const hinge of this.hinges) {
      if (hinge.first !== body && hinge.second !== body) continue;
      const own = this.bodies[body];
      const anchor = (hinge.first === body ? hinge.anchorFirst : hinge.anchorSecond).clone().applyQuaternion(own.quaternion).add(own.position);
      const hingeAxis = (hinge.first === body ? hinge.axisFirst : hinge.axisSecond).clone().applyQuaternion(own.quaternion);
      if (Math.abs(hingeAxis.dot(axis)) < 0.98) continue;
      const offset = anchor.sub(center);
      if (offset.addScaledVector(axis, -offset.dot(axis)).length() < 2) return hinge.first === body ? hinge.second : hinge.first;
    }
    return this.ground;
  }

  // Gears in different bodies whose axles are parallel, in the same layer, and whose pitch
  // circles touch.
  private findGearMeshes(parts: MechanismPart[]): [MechanismPart, MechanismPart][] {
    const gears = parts.filter((part) => gearTeeth(part.id) > 0);
    const pairs: [MechanismPart, MechanismPart][] = [];
    for (let index = 0; index < gears.length; index++) {
      for (let other = index + 1; other < gears.length; other++) {
        const first = gears[index], second = gears[other];
        if (this.bodyOfPart.get(first.uid) === this.bodyOfPart.get(second.uid)) continue;
        if (meshingDistance(first, second) === null) continue;
        pairs.push([first, second]);
      }
    }
    return pairs;
  }

  // A chain is a loop of links lying in one plane. Every sprocket in that plane with a link on
  // its pitch circle is wrapped by it, so neighbouring sprockets along the loop turn together.
  private findChainLoops(parts: MechanismPart[]): [MechanismPart, MechanismPart][] {
    const sprockets = parts.filter((part) => sprocketTeeth(part.id) > 0);
    const links = parts.filter((part) => part.category === "chain").map((part) => part.object.getWorldPosition(new THREE.Vector3()));
    if (sprockets.length < 2 || !links.length) return [];
    const wrapped = sprockets.filter((sprocket) => {
      const center = sprocket.object.getWorldPosition(new THREE.Vector3()), axis = this.gearAxis(sprocket);
      const radius = sprocketPitchRadius(sprocketTeeth(sprocket.id));
      return links.some((link) => {
        const offset = link.clone().sub(center), along = offset.dot(axis);
        return Math.abs(along) < 4 && Math.abs(offset.addScaledVector(axis, -along).length() - radius) < 4;
      });
    });
    const pairs: [MechanismPart, MechanismPart][] = [];
    const joined = new Set<string>();
    for (const first of wrapped) {
      const center = first.object.getWorldPosition(new THREE.Vector3()), axis = this.gearAxis(first);
      // The nearest wrapped sprocket in the same plane that this loop has not reached yet.
      const next = wrapped
        .filter((second) => second !== first && !joined.has(second.uid) && this.bodyOfPart.get(second.uid) !== this.bodyOfPart.get(first.uid))
        .filter((second) => Math.abs(this.gearAxis(second).dot(axis)) > 0.98 && Math.abs(second.object.getWorldPosition(new THREE.Vector3()).sub(center).dot(axis)) < 3)
        .sort((a, b) => a.object.getWorldPosition(new THREE.Vector3()).distanceTo(center) - b.object.getWorldPosition(new THREE.Vector3()).distanceTo(center))[0];
      if (!next) continue;
      joined.add(first.uid);
      pairs.push([first, next]);
    }
    return pairs;
  }

  private lineUpTeeth(pairs: [MechanismPart, MechanismPart][]) {
    if (!pairs.length) return;
    // Start from the biggest gear in each train: it is the one most likely to carry a crank pin,
    // so it is the one that must not be turned.
    const fixed = new Set<string>();
    const remaining = [...pairs];
    while (remaining.length) {
      let progressed = false;
      for (let index = 0; index < remaining.length; index++) {
        const [first, second] = remaining[index];
        let anchor: MechanismPart | null = null, turned: MechanismPart | null = null;
        if (fixed.has(first.uid) && !fixed.has(second.uid)) { anchor = first; turned = second; }
        else if (fixed.has(second.uid) && !fixed.has(first.uid)) { anchor = second; turned = first; }
        else if (fixed.has(first.uid) && fixed.has(second.uid)) { remaining.splice(index--, 1); continue; }
        if (!anchor || !turned) continue;
        lineUpPair(anchor, turned);
        fixed.add(turned.uid);
        remaining.splice(index--, 1);
        progressed = true;
      }
      if (!progressed && remaining.length) {
        const [first, second] = remaining[0];
        fixed.add(gearTeeth(first.id) >= gearTeeth(second.id) ? first.uid : second.uid);
      }
    }
  }

  // ---- reading the state ----------------------------------------------------------------------

  bodyIndexOf(partUid: string): number | undefined { return this.bodyOfPart.get(partUid); }
  isGround(body: number): boolean { return body === this.ground; }
  hasMotion(): boolean { return this.bodies.length > 1; }

  motors(): MotorInfo[] {
    return this.drives.map((drive) => ({ uid: drive.motorUid, name: drive.motorName, speedPercent: drive.speedPercent, rpm: drive.turn.rpm, stalled: drive.stalled }));
  }
  spinRates(): SpinInfo[] {
    return this.spins.map((turn) => ({ label: this.bodies[turn.body].label, rpm: turn.rpm }));
  }
  /** Each gear mesh, written driver first: the side nearer a motor. */
  gearMeshes(): MeshInfo[] {
    const distance = new Map<number, number>();
    const queue: number[] = [];
    for (const drive of this.drives) { distance.set(drive.turn.body, 0); queue.push(drive.turn.body); }
    while (queue.length) {
      const body = queue.shift()!;
      for (const mesh of this.meshes) {
        const next = mesh.first.body === body ? mesh.second.body : mesh.second.body === body ? mesh.first.body : -1;
        if (next >= 0 && !distance.has(next)) { distance.set(next, distance.get(body)! + 1); queue.push(next); }
      }
    }
    return this.meshes.map((mesh) => {
      const firstDistance = distance.get(mesh.first.body) ?? Infinity, secondDistance = distance.get(mesh.second.body) ?? Infinity;
      return secondDistance < firstDistance
        ? { driver: mesh.secondName, driven: mesh.firstName, driverTeeth: mesh.secondTeeth, drivenTeeth: mesh.firstTeeth, chain: mesh.chain }
        : { driver: mesh.firstName, driven: mesh.secondName, driverTeeth: mesh.firstTeeth, drivenTeeth: mesh.secondTeeth, chain: mesh.chain };
    });
  }
  /** Where each hinge is right now, for drawing pivot markers. */
  hingePoses(): { position: THREE.Vector3; axis: THREE.Vector3; driven: boolean }[] {
    return this.hinges.map((hinge) => {
      const body = this.bodies[hinge.first];
      return {
        position: hinge.anchorFirst.clone().applyQuaternion(body.quaternion).add(body.position),
        axis: hinge.axisFirst.clone().applyQuaternion(body.quaternion),
        driven: this.drives.some((drive) => (drive.turn.body === hinge.first && drive.turn.carrier === hinge.second) || (drive.turn.body === hinge.second && drive.turn.carrier === hinge.first)),
      };
    });
  }
  worldPoint(body: number, local: THREE.Vector3): THREE.Vector3 {
    const owner = this.bodies[body];
    return local.clone().applyQuaternion(owner.quaternion).add(owner.position);
  }
  localPoint(body: number, world: THREE.Vector3): THREE.Vector3 {
    const owner = this.bodies[body];
    return world.clone().sub(owner.position).applyQuaternion(owner.quaternion.clone().invert());
  }

  // ---- driving it -----------------------------------------------------------------------------

  setMotorSpeed(motorUid: string, percent: number) {
    for (const drive of this.drives) if (drive.motorUid === motorUid) drive.speedPercent = percent;
  }
  startDrag(body: number, worldPoint: THREE.Vector3) {
    if (body === this.ground) return;
    this.drag = { body, anchor: this.localPoint(body, worldPoint), target: worldPoint.clone() };
  }
  moveDrag(target: THREE.Vector3) { if (this.drag) this.drag.target.copy(target); }
  endDrag() { this.drag = null; }

  /** Advance by `seconds`. Returns false when something is stuck. */
  step(seconds: number): boolean {
    let moving = true;
    if (this.drag) {
      // A hand on a part turns everything it is connected to, motors included. Walk the hand
      // there a few millimetres at a time so a fast drag can't flip a linkage inside out.
      const start = this.worldPoint(this.drag.body, this.drag.anchor), goal = this.drag.target.clone();
      const substeps = Math.min(12, Math.max(1, Math.ceil(start.distanceTo(goal) / 3)));
      for (let substep = 1; substep <= substeps; substep++) {
        const saved = this.save();
        this.drag.target.lerpVectors(start, goal, substep / substeps);
        if (this.solve() > STUCK_MM) { this.restore(saved); moving = false; break; }
      }
      this.drag.target.copy(goal);
      for (const drive of this.drives) { this.readTurn(drive.turn); drive.target = drive.turn.angle; drive.stalled = false; }
    } else {
      const radiansPerSecond = (drive: Drive) => (SMART_MOTOR_RPM / 60) * (drive.speedPercent / 100) * 2 * Math.PI;
      const largestStep = Math.max(0, ...this.drives.map((drive) => Math.abs(radiansPerSecond(drive) * seconds)));
      const substeps = Math.min(16, Math.max(1, Math.ceil(largestStep / 0.03)));
      for (let substep = 0; substep < substeps; substep++) {
        const saved = this.save();
        for (const drive of this.drives) drive.target += radiansPerSecond(drive) * (seconds / substeps);
        if (this.solve() > STUCK_MM && this.drives.length) {
          // The motors can't get there: something in the build is locked. Stay put and say so.
          this.restore(saved);
          for (const drive of this.drives) drive.stalled = drive.speedPercent !== 0;
          moving = false;
          break;
        }
        for (const drive of this.drives) drive.stalled = false;
      }
    }
    this.measureSpeeds(seconds);
    this.applyToParts();
    return moving;
  }

  private save() {
    return {
      bodies: this.bodies.map((body) => [body.position.clone(), body.quaternion.clone()] as const),
      turns: this.allTurns().map((turn) => [turn.lastRaw, turn.angle] as const),
      targets: this.drives.map((drive) => drive.target),
    };
  }
  private restore(saved: ReturnType<Mechanism["save"]>) {
    this.bodies.forEach((body, index) => { body.position.copy(saved.bodies[index][0]); body.quaternion.copy(saved.bodies[index][1]); });
    this.allTurns().forEach((turn, index) => { [turn.lastRaw, turn.angle] = saved.turns[index]; });
    this.drives.forEach((drive, index) => { drive.target = saved.targets[index]; });
  }
  private allTurns(): Turn[] {
    return [...this.drives.map((drive) => drive.turn), ...this.meshes.flatMap((mesh) => [mesh.first, mesh.second]), ...this.spins];
  }

  private measureSpeeds(seconds: number) {
    if (seconds <= 0) return;
    for (const turn of this.allTurns()) {
      this.readTurn(turn);
      const rpm = ((turn.angle - turn.previous) / seconds) * (60 / (2 * Math.PI));
      turn.previous = turn.angle;
      turn.rpm += (rpm - turn.rpm) * Math.min(1, seconds * 6);
    }
  }

  // Gauss-Seidel over every constraint until they all hold (or we give up). Returns what is
  // left over, in mm. A hand pulls only during the first stretch, so the joints get the last word.
  solve(): number {
    const dragging = this.drag !== null;
    const iterations = dragging ? 160 : 120, handIterations = dragging ? 80 : 0;
    let remaining = Infinity;
    if (!dragging) {
      for (const drive of this.drives) this.holdAngle([[drive.turn, 1]], drive.target);
      for (const { mesh, follower } of this.meshesFromMotors) this.holdAngle([[mesh.first, mesh.firstRadius], [mesh.second, mesh.secondRadius]], 0, follower);
    }
    for (let iteration = 0; iteration < iterations; iteration++) {
      if (iteration < handIterations) this.pullDrag(0.2);
      if (!dragging) for (const drive of this.drives) this.holdAngle([[drive.turn, 1]], drive.target);
      for (const hinge of this.hinges) { this.alignAxes(hinge); this.joinPoints(hinge); }
      for (const mesh of this.meshes) this.holdAngle([[mesh.first, mesh.firstRadius], [mesh.second, mesh.secondRadius]], 0);
      if (iteration >= handIterations && iteration % 10 === 9) {
        remaining = this.residual(!dragging);
        if (remaining < 0.02) break;
      }
    }
    return remaining === Infinity ? this.residual(!dragging) : remaining;
  }

  residual(includeMotors = true): number {
    let worst = 0;
    for (const hinge of this.hinges) {
      const first = this.bodies[hinge.first], second = this.bodies[hinge.second];
      const pointFirst = scratchA.copy(hinge.anchorFirst).applyQuaternion(first.quaternion).add(first.position);
      const pointSecond = scratchB.copy(hinge.anchorSecond).applyQuaternion(second.quaternion).add(second.position);
      worst = Math.max(worst, pointFirst.distanceTo(pointSecond));
      const axisFirst = scratchA.copy(hinge.axisFirst).applyQuaternion(first.quaternion);
      const axisSecond = scratchB.copy(hinge.axisSecond).applyQuaternion(second.quaternion);
      worst = Math.max(worst, scratchC.crossVectors(axisFirst, axisSecond).length() * 20);
    }
    if (includeMotors) for (const drive of this.drives) { this.readTurn(drive.turn); worst = Math.max(worst, Math.abs(drive.turn.angle - drive.target) * 10); }
    for (const mesh of this.meshes) {
      this.readTurn(mesh.first); this.readTurn(mesh.second);
      worst = Math.max(worst, Math.abs(mesh.first.angle * mesh.firstRadius + mesh.second.angle * mesh.secondRadius));
    }
    return worst;
  }

  // ---- the constraints --------------------------------------------------------------------

  private rotate(body: Body, rotationVector: THREE.Vector3) {
    const angle = rotationVector.length();
    if (angle < 1e-12) return;
    scratchQuaternion.setFromAxisAngle(scratchC.copy(rotationVector).divideScalar(angle), angle);
    body.quaternion.premultiply(scratchQuaternion).normalize();
  }

  // Pull two points together, moving and turning each body as much as it is free to.
  private joinPoints(hinge: Hinge) {
    const first = this.bodies[hinge.first], second = this.bodies[hinge.second];
    const leverFirst = hinge.anchorFirst.clone().applyQuaternion(first.quaternion);
    const leverSecond = hinge.anchorSecond.clone().applyQuaternion(second.quaternion);
    const gap = leverSecond.clone().add(second.position).sub(leverFirst.clone().add(first.position));
    const distance = gap.length();
    if (distance < 1e-7) return;
    const direction = gap.divideScalar(distance);
    const weightFirst = first.inverseMass + first.inverseInertia * scratchA.crossVectors(leverFirst, direction).lengthSq();
    const weightSecond = second.inverseMass + second.inverseInertia * scratchA.crossVectors(leverSecond, direction).lengthSq();
    const total = weightFirst + weightSecond;
    if (total < 1e-12) return;
    const impulse = direction.multiplyScalar(distance / total);
    first.position.addScaledVector(impulse, first.inverseMass);
    this.rotate(first, scratchB.crossVectors(leverFirst, impulse).multiplyScalar(first.inverseInertia));
    second.position.addScaledVector(impulse, -second.inverseMass);
    this.rotate(second, scratchB.crossVectors(leverSecond, impulse).multiplyScalar(-second.inverseInertia));
  }

  // Turn two bodies so a hinge's axis is the same line in both.
  private alignAxes(hinge: Hinge) {
    const first = this.bodies[hinge.first], second = this.bodies[hinge.second];
    const total = first.inverseInertia + second.inverseInertia;
    if (total < 1e-12) return;
    const axisFirst = hinge.axisFirst.clone().applyQuaternion(first.quaternion);
    const axisSecond = hinge.axisSecond.clone().applyQuaternion(second.quaternion);
    const cross = new THREE.Vector3().crossVectors(axisFirst, axisSecond);
    const sine = cross.length();
    if (sine < 1e-9) return;
    const angle = Math.atan2(sine, axisFirst.dot(axisSecond));
    cross.divideScalar(sine);
    this.rotate(first, cross.clone().multiplyScalar(angle * first.inverseInertia / total));
    this.rotate(second, cross.multiplyScalar(-angle * second.inverseInertia / total));
  }

  private readTurn(turn: Turn) {
    const carrier = this.bodies[turn.carrier], body = this.bodies[turn.body];
    const axis = scratchA.copy(turn.axisCarrier).applyQuaternion(carrier.quaternion);
    const from = scratchB.copy(turn.referenceCarrier).applyQuaternion(carrier.quaternion);
    const to = scratchC.copy(turn.referenceBody).applyQuaternion(body.quaternion);
    to.addScaledVector(axis, -to.dot(axis));
    const raw = Math.atan2(axis.dot(new THREE.Vector3().crossVectors(from, to)), from.dot(to));
    turn.angle += wrapAngle(raw - turn.lastRaw);
    turn.lastRaw = raw;
  }

  // Make sum(weight * angle) equal target, turning each body and its carrier about the turn's axis
  // (or only the body `only`, leaving the rest where they are).
  private holdAngle(terms: [Turn, number][], target: number, only?: number) {
    let value = 0;
    const gradients = new Map<number, THREE.Vector3>();
    for (const [turn, weight] of terms) {
      this.readTurn(turn);
      value += weight * turn.angle;
      const axis = turn.axisCarrier.clone().applyQuaternion(this.bodies[turn.carrier].quaternion);
      (gradients.get(turn.body) || gradients.set(turn.body, new THREE.Vector3()).get(turn.body)!).addScaledVector(axis, weight);
      (gradients.get(turn.carrier) || gradients.set(turn.carrier, new THREE.Vector3()).get(turn.carrier)!).addScaledVector(axis, -weight);
    }
    const error = value - target;
    if (Math.abs(error) < 1e-9) return;
    if (only !== undefined) for (const body of [...gradients.keys()]) if (body !== only) gradients.delete(body);
    let total = 0;
    for (const [body, gradient] of gradients) total += this.bodies[body].inverseInertia * gradient.lengthSq();
    if (total < 1e-12) return;
    const multiplier = -error / total;
    for (const [body, gradient] of gradients) {
      const owner = this.bodies[body];
      if (owner.inverseInertia) this.rotate(owner, gradient.clone().multiplyScalar(owner.inverseInertia * multiplier));
    }
  }

  private pullDrag(stiffness: number) {
    if (!this.drag) return;
    const body = this.bodies[this.drag.body];
    const lever = this.drag.anchor.clone().applyQuaternion(body.quaternion);
    const gap = this.drag.target.clone().sub(lever.clone().add(body.position));
    const distance = gap.length();
    if (distance < 1e-6) return;
    const direction = gap.divideScalar(distance);
    const weight = body.inverseMass + body.inverseInertia * scratchA.crossVectors(lever, direction).lengthSq();
    if (weight < 1e-12) return;
    const impulse = direction.multiplyScalar((stiffness * distance) / weight);
    body.position.addScaledVector(impulse, body.inverseMass);
    this.rotate(body, scratchB.crossVectors(lever, impulse).multiplyScalar(body.inverseInertia));
  }

  applyToParts() {
    for (const body of this.bodies) {
      for (const member of body.members) {
        member.object.position.copy(member.localPosition).applyQuaternion(body.quaternion).add(body.position);
        member.object.quaternion.copy(body.quaternion).multiply(member.localQuaternion);
        member.object.updateMatrixWorld(true);
      }
    }
  }
}

// ---- gear geometry -------------------------------------------------------------------------

/** Centre distance check: returns the gap from a perfect mesh in mm, or null when they don't mesh. */
export function meshingDistance(first: MechanismPart, second: MechanismPart): number | null {
  const thinFirst = first.sizeMM.indexOf(Math.min(...first.sizeMM)), thinSecond = second.sizeMM.indexOf(Math.min(...second.sizeMM));
  const axisFirst = new THREE.Vector3().setComponent(thinFirst, 1).applyQuaternion(first.object.getWorldQuaternion(new THREE.Quaternion()));
  const axisSecond = new THREE.Vector3().setComponent(thinSecond, 1).applyQuaternion(second.object.getWorldQuaternion(new THREE.Quaternion()));
  if (Math.abs(axisFirst.dot(axisSecond)) < 0.98) return null;
  const offset = second.object.getWorldPosition(new THREE.Vector3()).sub(first.object.getWorldPosition(new THREE.Vector3()));
  const along = offset.dot(axisFirst);
  if (Math.abs(along) > 3) return null;
  const across = offset.addScaledVector(axisFirst, -along).length();
  const perfect = (gearTeeth(first.id) + gearTeeth(second.id)) * MM_PER_TOOTH_RADIUS;
  const gap = across - perfect;
  return Math.abs(gap) <= 1.2 ? gap : null;
}

// Where a gear's teeth point, in its own frame: the angle of one tooth tip about its thin axis.
const toothAngleCache = new WeakMap<THREE.BufferGeometry, number>();
function toothTipAngle(geometry: THREE.BufferGeometry, teeth: number): number {
  const cached = toothAngleCache.get(geometry);
  if (cached !== undefined) return cached;
  const positions = geometry.attributes.position;
  let largest = 0;
  for (let index = 0; index < positions.count; index++) largest = Math.max(largest, Math.hypot(positions.getX(index), positions.getY(index)));
  let sumSine = 0, sumCosine = 0;
  for (let index = 0; index < positions.count; index++) {
    const x = positions.getX(index), y = positions.getY(index);
    if (Math.hypot(x, y) < largest - 0.3) continue;
    const angle = Math.atan2(y, x) * teeth;
    sumSine += Math.sin(angle); sumCosine += Math.cos(angle);
  }
  const tip = Math.atan2(sumSine, sumCosine) / teeth;
  toothAngleCache.set(geometry, tip);
  return tip;
}

// Turn `turned` about its own axle so one of its gaps faces a tooth of `anchor`.
function lineUpPair(anchor: MechanismPart, turned: MechanismPart) {
  if (!anchor.geometry || !turned.geometry) return;
  const anchorTeeth = gearTeeth(anchor.id), turnedTeeth = gearTeeth(turned.id);
  const anchorQuaternion = anchor.object.getWorldQuaternion(new THREE.Quaternion());
  const turnedQuaternion = turned.object.getWorldQuaternion(new THREE.Quaternion());
  const axis = new THREE.Vector3(0, 0, 1).applyQuaternion(anchorQuaternion).normalize();
  const toTurned = turned.object.getWorldPosition(new THREE.Vector3()).sub(anchor.object.getWorldPosition(new THREE.Vector3()));
  toTurned.addScaledVector(axis, -toTurned.dot(axis)).normalize();
  const tipDirection = (quaternion: THREE.Quaternion, tip: number) => new THREE.Vector3(Math.cos(tip), Math.sin(tip), 0).applyQuaternion(quaternion);
  const signedAngle = (from: THREE.Vector3, to: THREE.Vector3) => Math.atan2(axis.dot(new THREE.Vector3().crossVectors(from, to)), from.dot(to));
  const fraction = (angle: number, pitch: number) => (((angle % pitch) + pitch) % pitch) / pitch;
  const anchorPitch = (2 * Math.PI) / anchorTeeth, turnedPitch = (2 * Math.PI) / turnedTeeth;
  const anchorFraction = fraction(signedAngle(tipDirection(anchorQuaternion, toothTipAngle(anchor.geometry, anchorTeeth)), toTurned), anchorPitch);
  const turnedFraction = fraction(signedAngle(tipDirection(turnedQuaternion, toothTipAngle(turned.geometry, turnedTeeth)), toTurned.clone().negate()), turnedPitch);
  let shift = turnedFraction - (0.5 - anchorFraction);
  shift -= Math.round(shift);
  const correction = new THREE.Quaternion().setFromAxisAngle(axis, shift * turnedPitch);
  const parent = turned.object.parent;
  if (parent) {
    // rotate in world space, then express in the parent frame
    const parentQuaternion = parent.getWorldQuaternion(new THREE.Quaternion());
    const world = correction.multiply(turnedQuaternion);
    turned.object.quaternion.copy(parentQuaternion.invert().multiply(world));
  } else {
    turned.object.quaternion.premultiply(correction);
  }
  turned.object.updateMatrixWorld(true);
}
