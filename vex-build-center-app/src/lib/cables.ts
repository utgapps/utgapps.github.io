import * as THREE from "three";
import { OBB } from "three/examples/jsm/math/OBB.js";
import type { PartMeta } from "./parts";

// Smart Cables: every Smart Motor and sensor is plugged into one of the Brain's twelve Smart
// Ports with a 200, 300 or 400 mm cable. Nothing here is saved: the cables are worked out from
// where the parts are, the way a builder would plug them in, every time the build changes.

export const CABLE_LENGTHS = [200, 300, 400];
const PLUG_DEPTH = 8;    // mm of each plug that disappears into its port
const PLUG_STRAIGHT = 12; // mm a cable runs straight out of a port before it can bend
const OPENING = { across: 11, up: 12, out: 18 }; // the space a plug and a hand need in front of a port

// A port in its part's own frame: the middle of its opening and the way it faces.
type Port = { point: THREE.Vector3; out: THREE.Vector3 };

// Measured off the Brain's model: six ports along each long side, above the row of pin holes.
// The +z side holds ports 1-6, front to back; the -z side holds 7-12.
const BRAIN_PORT_X = [-32, -18, -4, 10, 24, 38];
const BRAIN_PORT_Y = 7;
function brainPorts(meta: PartMeta): Port[] {
  const halfDepth = meta.sizeMM[2] / 2;
  return [1, -1].flatMap((side) => BRAIN_PORT_X.map((x) => ({ point: new THREE.Vector3(x, BRAIN_PORT_Y, side * halfDepth), out: new THREE.Vector3(0, 0, side) })));
}

// A Smart Motor's port is on the end of its body, across from the axle socket. A sensor's is on
// its back, the face away from what it senses.
function devicePort(meta: PartMeta): Port | null {
  if (meta.isMotor || meta.category === "motor") return { point: new THREE.Vector3(meta.sizeMM[0] / 2, 0, 0), out: new THREE.Vector3(1, 0, 0) };
  if (meta.category === "sensor") return { point: new THREE.Vector3(0, 0, -meta.sizeMM[2] / 2), out: new THREE.Vector3(0, 0, -1) };
  return null;
}

export const isBrain = (meta: PartMeta) => meta.category === "brain" && /brain/.test(meta.id);
export const needsCable = (meta: PartMeta) => devicePort(meta) !== null;

export type CablePart = { uid: string; meta: PartMeta; matrixWorld: THREE.Matrix4 };
export type Cable = {
  deviceUid: string; deviceName: string; brainUid: string;
  port: number;          // 1-12, as printed on the Brain
  length: number;        // the cable you need: 200, 300 or 400 mm
  reaches: boolean;      // false: even the 400 mm cable is too short (it is drawn stretched, in red)
  points: THREE.Vector3[]; // the cable's centre line, port to port
  plugs: { point: THREE.Vector3; out: THREE.Vector3 }[];
};
export type PortProblem = { brainUid: string; port: number; blockedBy: string };
export type CablePlan = { cables: Cable[]; blocked: PortProblem[]; noBrain: string[]; noPort: string[] };

function worldPort(port: Port, matrix: THREE.Matrix4): Port {
  return { point: port.point.clone().applyMatrix4(matrix), out: port.out.clone().transformDirection(matrix) };
}

// The cable's path for a given sag: straight out of each plug, then a curve between that hangs
// `sag` mm below the straight line.
function cablePath(from: Port, to: Port, sag: number): THREE.Vector3[] {
  const leaveFrom = from.point.clone().addScaledVector(from.out, PLUG_STRAIGHT);
  const leaveTo = to.point.clone().addScaledVector(to.out, PLUG_STRAIGHT);
  const middle = leaveFrom.clone().add(leaveTo).multiplyScalar(0.5);
  middle.y -= sag;
  const curve = new THREE.CatmullRomCurve3([
    from.point, from.point.clone().addScaledVector(from.out, PLUG_STRAIGHT / 2), leaveFrom,
    middle,
    leaveTo, to.point.clone().addScaledVector(to.out, PLUG_STRAIGHT / 2), to.point,
  ], false, "centripetal");
  return curve.getSpacedPoints(48);
}
const pathLength = (points: THREE.Vector3[]) => points.reduce((sum, point, index) => (index ? sum + point.distanceTo(points[index - 1]) : 0), 0);

// The cable drawn at its true length: the slack between the plugs hangs down until the line is
// exactly as long as the cable (less the bits inside the plugs).
function hang(from: Port, to: Port, length: number): THREE.Vector3[] {
  const target = length - 2 * PLUG_DEPTH;
  let low = 0, high = length;
  for (let step = 0; step < 30; step++) {
    const sag = (low + high) / 2;
    if (pathLength(cablePath(from, to, sag)) < target) low = sag; else high = sag;
  }
  return cablePath(from, to, low);
}

function boxOf(part: CablePart, slop: number): OBB {
  const box = new OBB(new THREE.Vector3(), new THREE.Vector3(...part.meta.sizeMM).multiplyScalar(0.5));
  box.halfSize.subScalar(slop).max(new THREE.Vector3(0.1, 0.1, 0.1));
  return box.applyMatrix4(part.matrixWorld);
}

/** The space in front of a port that must stay empty to plug a cable in. */
export function portOpening(port: { point: THREE.Vector3; out: THREE.Vector3 }, brainMatrix: THREE.Matrix4): OBB {
  const rotation = new THREE.Matrix3().setFromMatrix4(brainMatrix);
  const center = port.point.clone().addScaledVector(port.out, OPENING.out / 2);
  const local = new OBB(new THREE.Vector3(), new THREE.Vector3(OPENING.across / 2, OPENING.up / 2, OPENING.out / 2));
  local.center.copy(center);
  local.rotation.copy(rotation);
  return local;
}

/**
 * Plug every motor and sensor into the Brain: the free port with the shortest run, and the
 * shortest cable that reaches it. Also reports ports that something sits in front of.
 */
export function planCables(parts: CablePart[]): CablePlan {
  const plan: CablePlan = { cables: [], blocked: [], noBrain: [], noPort: [] };
  const brain = parts.find((part) => isBrain(part.meta));
  const devices = parts.filter((part) => needsCable(part.meta));
  if (!brain) { plan.noBrain = devices.map((device) => device.uid); return plan; }

  const brainLocal = brainPorts(brain.meta);
  const ports = brainLocal.map((port) => worldPort(port, brain.matrixWorld));
  const free = ports.map(() => true);
  const others = parts.filter((part) => part !== brain);
  const boxes = others.map((part) => boxOf(part, 0.6));
  brainLocal.forEach((port, index) => {
    const opening = portOpening({ point: port.point.clone().applyMatrix4(brain.matrixWorld), out: ports[index].out }, brain.matrixWorld);
    const hit = others.findIndex((_, other) => boxes[other].intersectsOBB(opening));
    if (hit >= 0) { free[index] = false; plan.blocked.push({ brainUid: brain.uid, port: index + 1, blockedBy: others[hit].uid }); }
  });

  // Motors first (they are what students plug in first), then sensors, each in build order.
  const ordered = [...devices].sort((first, second) => Number(!!second.meta.isMotor) - Number(!!first.meta.isMotor));
  for (const device of ordered) {
    const from = worldPort(devicePort(device.meta)!, device.matrixWorld);
    let best = -1, shortest = Infinity;
    ports.forEach((port, index) => {
      if (!free[index]) return;
      const length = pathLength(cablePath(from, port, 0));
      if (length < shortest) { shortest = length; best = index; }
    });
    if (best < 0) { plan.noPort.push(device.uid); continue; }
    free[best] = false;
    const needed = shortest + 2 * PLUG_DEPTH + 4; // a little slack so the plugs are not pulled
    const length = CABLE_LENGTHS.find((candidate) => candidate >= needed) ?? CABLE_LENGTHS[CABLE_LENGTHS.length - 1];
    const reaches = length >= needed;
    plan.cables.push({
      deviceUid: device.uid, deviceName: device.meta.name, brainUid: brain.uid, port: best + 1, length, reaches,
      points: reaches ? hang(from, ports[best], length) : cablePath(from, ports[best], 0),
      plugs: [from, ports[best]],
    });
  }
  return plan;
}

/** The same cable, re-hung after its ends have moved (a running build keeps its plugs and lengths). */
export function rehang(cable: Cable, device: CablePart, brain: CablePart): Cable {
  const from = worldPort(devicePort(device.meta)!, device.matrixWorld);
  const to = worldPort(brainPorts(brain.meta)[cable.port - 1], brain.matrixWorld);
  const reaches = pathLength(cablePath(from, to, 0)) + 2 * PLUG_DEPTH <= cable.length;
  return { ...cable, reaches, points: reaches ? hang(from, to, cable.length) : cablePath(from, to, 0), plugs: [from, to] };
}

/** What a student reads when they point at a cable. */
export function cableLabel(cable: Cable): string {
  return cable.reaches
    ? `${cable.length} mm Smart Cable: ${cable.deviceName} → Brain port ${cable.port}`
    : `${cable.deviceName} is too far from the Brain: even a 400 mm Smart Cable does not reach port ${cable.port}`;
}
