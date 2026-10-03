import * as THREE from "three";
import { OBB } from "three/examples/jsm/math/OBB.js";
import type { PartMeta } from "./parts";
import { PartShape, Ball, Rod, overlaps, type Shape } from "./contact.ts";

// Smart Cables: every Smart Motor and sensor is plugged into one of the Brain's twelve Smart
// Ports with a 200, 300 or 400 mm cable. Nothing here is saved: the cables are worked out from
// where the parts are, the way a builder would plug them in, every time the build changes.
// A cable is routed round the parts in its way, never through them, and its slack hangs down
// wherever there is room for it.

export const CABLE_LENGTHS = [200, 300, 400];
const PLUG_DEPTH = 8;    // mm of each plug that disappears into its port
const PLUG_STRAIGHT = 12; // mm a cable runs straight out of a port before it can bend
const OPENING = { across: 11, up: 12, out: 18 }; // the space a plug and a hand need in front of a port
export const CABLE_RADIUS = 1.5;
const CLEARANCE = CABLE_RADIUS + 1; // how far the routed centre line keeps from any part
const CELL = 5;                     // mm between the points the router may pass through
const MOST_STEPS = 40000;           // give up routing after looking at this many points

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
// its back, the face away from what it senses. The pneumatic solenoid is cabled like a sensor
// (the pump plugs into the solenoid, not the Brain).
function devicePort(meta: PartMeta): Port | null {
  if (meta.isMotor || meta.category === "motor") return { point: new THREE.Vector3(meta.sizeMM[0] / 2, 0, 0), out: new THREE.Vector3(1, 0, 0) };
  if (meta.category === "sensor" || meta.id === "pneumatic-solenoid") return { point: new THREE.Vector3(0, 0, -meta.sizeMM[2] / 2), out: new THREE.Vector3(0, 0, -1) };
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
  clear: boolean;        // false: there is no way round the parts in its way
  blockedBy: string[];   // then, the parts it would have to go through
  points: THREE.Vector3[]; // the cable's centre line, port to port
  plugs: { point: THREE.Vector3; out: THREE.Vector3 }[];
};
export type PortProblem = { brainUid: string; port: number; blockedBy: string };
export type CablePlan = { cables: Cable[]; blocked: PortProblem[]; noBrain: string[]; noPort: string[] };

function worldPort(port: Port, matrix: THREE.Matrix4): Port {
  return { point: port.point.clone().applyMatrix4(matrix), out: port.out.clone().transformDirection(matrix) };
}

const pathLength = (points: THREE.Vector3[]) => points.reduce((sum, point, index) => (index ? sum + point.distanceTo(points[index - 1]) : 0), 0);

// ---- routing ---------------------------------------------------------------------------------

// The parts a cable must go round, as solids.
class Obstacles {
  shapes: { uid: string; shape: PartShape }[];
  constructor(parts: CablePart[], slop: number) {
    this.shapes = parts.filter((part) => part.meta.category !== "band").map((part) => ({ uid: part.uid, shape: new PartShape(part.meta, part.matrixWorld, slop) }));
  }
  hit(probe: Shape): string | null {
    for (const { uid, shape } of this.shapes) if (overlaps(probe, shape)) return uid;
    return null;
  }
  free(point: THREE.Vector3, clearance = CLEARANCE): boolean { return this.hit(new Ball(point, clearance)) === null; }
  clearRun(from: THREE.Vector3, to: THREE.Vector3, clearance = CLEARANCE): boolean { return this.hit(new Rod(from, to, clearance)) === null; }
  /** Every part a cable drawn along `points` passes through. */
  through(points: THREE.Vector3[]): string[] {
    const found = new Set<string>();
    for (let index = 1; index < points.length; index++) {
      const rod = new Rod(points[index - 1], points[index], CABLE_RADIUS);
      for (const { uid, shape } of this.shapes) if (!found.has(uid) && overlaps(rod, shape)) found.add(uid);
    }
    return [...found];
  }
  bounds(): THREE.Box3 {
    const box = new THREE.Box3();
    for (const { shape } of this.shapes) box.expandByPoint(shape.center.clone().addScalar(shape.reach)).expandByPoint(shape.center.clone().subScalar(shape.reach));
    return box;
  }
}

// Where the cable can start to bend: straight out of the port, or further out if a part is there.
function leaving(port: Port, obstacles: Obstacles): THREE.Vector3 {
  for (let distance = PLUG_STRAIGHT; distance <= PLUG_STRAIGHT + 30; distance += 3) {
    const point = port.point.clone().addScaledVector(port.out, distance);
    if (obstacles.free(point)) return point;
  }
  return port.point.clone().addScaledVector(port.out, PLUG_STRAIGHT);
}

// Grid points waiting to be looked at, cheapest estimated route first.
class Queue {
  private keys: number[] = [];
  private costs: number[] = [];
  get size() { return this.keys.length; }
  push(key: number, cost: number) {
    const keys = this.keys, costs = this.costs;
    let index = keys.length;
    keys.push(key); costs.push(cost);
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (costs[parent] <= cost) break;
      keys[index] = keys[parent]; costs[index] = costs[parent];
      index = parent;
    }
    keys[index] = key; costs[index] = cost;
  }
  pop(): number {
    const keys = this.keys, costs = this.costs;
    const top = keys[0], lastKey = keys.pop()!, lastCost = costs.pop()!;
    if (keys.length) {
      let index = 0;
      for (;;) {
        let child = 2 * index + 1;
        if (child >= keys.length) break;
        if (child + 1 < keys.length && costs[child + 1] < costs[child]) child++;
        if (costs[child] >= lastCost) break;
        keys[index] = keys[child]; costs[index] = costs[child];
        index = child;
      }
      keys[index] = lastKey; costs[index] = lastCost;
    }
    return top;
  }
}

type Cell = [number, number, number];
const NEIGHBOURS: Cell[] = [];
for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) if (x || y || z) NEIGHBOURS.push([x, y, z]);
const OFFSET = 512;
const pack = (x: number, y: number, z: number) => ((x + OFFSET) * 1024 + (y + OFFSET)) * 1024 + (z + OFFSET);
const unpack = (key: number): Cell => [Math.floor(key / 1048576) - OFFSET, (Math.floor(key / 1024) % 1024) - OFFSET, (key % 1024) - OFFSET];

/** The shortest way from `start` to `goal` that keeps clear of every part, pulled tight; or null. */
function findWay(start: THREE.Vector3, goal: THREE.Vector3, obstacles: Obstacles): THREE.Vector3[] | null {
  if (obstacles.clearRun(start, goal)) return [start, goal];
  const room = obstacles.bounds().expandByPoint(start).expandByPoint(goal).expandByScalar(40);
  const at = (x: number, y: number, z: number) => new THREE.Vector3(start.x + x * CELL, start.y + y * CELL, start.z + z * CELL);
  const freeCache = new Map<number, boolean>();
  const isFree = (key: number) => {
    let known = freeCache.get(key);
    if (known === undefined) {
      const point = at(...unpack(key));
      known = room.containsPoint(point) && obstacles.free(point);
      freeCache.set(key, known);
    }
    return known;
  };
  // Grid points near the goal that it can be reached from in a straight run.
  const goalCell: Cell = [Math.round((goal.x - start.x) / CELL), Math.round((goal.y - start.y) / CELL), Math.round((goal.z - start.z) / CELL)];
  const ends = new Set<number>();
  for (const [x, y, z] of [[0, 0, 0] as Cell, ...NEIGHBOURS]) {
    const key = pack(goalCell[0] + x, goalCell[1] + y, goalCell[2] + z);
    if (isFree(key) && obstacles.clearRun(at(...unpack(key)), goal)) ends.add(key);
  }
  if (!ends.size) return null;
  const startKey = pack(0, 0, 0);
  const cost = new Map<number, number>([[startKey, 0]]);
  const cameFrom = new Map<number, number>();
  const closed = new Set<number>();
  const queue = new Queue();
  const guess = (key: number) => at(...unpack(key)).distanceTo(goal);
  queue.push(startKey, guess(startKey));
  let found = -1;
  for (let steps = 0; queue.size && steps < MOST_STEPS; steps++) {
    const key = queue.pop();
    if (closed.has(key)) continue;
    closed.add(key);
    if (ends.has(key)) { found = key; break; }
    const [x, y, z] = unpack(key);
    const here = cost.get(key)!;
    for (const [stepX, stepY, stepZ] of NEIGHBOURS) {
      const next = pack(x + stepX, y + stepY, z + stepZ);
      if (closed.has(next) || !isFree(next)) continue;
      // A diagonal step must not cut the corner of a part.
      if (Math.abs(stepX) + Math.abs(stepY) + Math.abs(stepZ) > 1 && !obstacles.free(at(x + stepX / 2, y + stepY / 2, z + stepZ / 2))) continue;
      const total = here + CELL * Math.hypot(stepX, stepY, stepZ);
      if (total >= (cost.get(next) ?? Infinity)) continue;
      cost.set(next, total);
      cameFrom.set(next, key);
      queue.push(next, total + guess(next));
    }
  }
  if (found < 0) return null;
  const cells: THREE.Vector3[] = [goal.clone()];
  for (let key: number | undefined = found; key !== undefined; key = cameFrom.get(key)) cells.push(key === startKey ? start.clone() : at(...unpack(key)));
  cells.reverse();
  // Pull it tight: from each corner, run straight to the farthest point still in view.
  const tight = [cells[0]];
  for (let index = 0; index < cells.length - 1;) {
    let farthest = index + 1;
    for (let next = cells.length - 1; next > index + 1; next--) if (obstacles.clearRun(cells[index], cells[next])) { farthest = next; break; }
    tight.push(cells[farthest]);
    index = farthest;
  }
  return tight;
}

// A polyline with points no more than 6 mm apart, so a curve drawn through them stays on it.
function dense(route: THREE.Vector3[]): THREE.Vector3[] {
  const points = [route[0]];
  for (let index = 1; index < route.length; index++) {
    const pieces = Math.max(1, Math.ceil(route[index].distanceTo(route[index - 1]) / 6));
    for (let piece = 1; piece <= pieces; piece++) points.push(route[index - 1].clone().lerp(route[index], piece / pieces));
  }
  return points;
}

// Round the corners of a tight route where there is room, keeping clear of every part.
function smooth(route: THREE.Vector3[], obstacles: Obstacles): THREE.Vector3[] {
  if (route.length < 3) return dense(route);
  const curve = new THREE.CatmullRomCurve3(route, false, "centripetal");
  const points = curve.getSpacedPoints(Math.max(16, Math.ceil(pathLength(route) / 4)));
  for (let index = 1; index < points.length; index++) if (!obstacles.clearRun(points[index - 1], points[index], CABLE_RADIUS + 0.5)) return dense(route);
  return points;
}

// Let `slack` mm of extra cable hang: bow the longest straight runs downward (or sideways, if
// there is no room below) as far as they go without touching anything.
function hangSlack(points: THREE.Vector3[], slack: number, obstacles: Obstacles): THREE.Vector3[] {
  let result = points;
  for (let attempt = 0; attempt < 4 && slack > 2; attempt++) {
    let bestStart = -1, bestEnd = -1, bestLength = 0;
    for (let first = 0; first < result.length - 1;) {
      let last = first + 1;
      const direction = result[first + 1].clone().sub(result[first]).normalize();
      while (last + 1 < result.length && result[last + 1].clone().sub(result[last]).normalize().dot(direction) > 0.995) last++;
      const length = result[first].distanceTo(result[last]);
      if (length > bestLength) { bestLength = length; bestStart = first; bestEnd = last; }
      first = last;
    }
    if (bestLength < 20) break;
    const from = result[bestStart], to = result[bestEnd];
    const along = to.clone().sub(from).normalize();
    const down = new THREE.Vector3(0, -1, 0).addScaledVector(along, along.y);
    const sideways = new THREE.Vector3().crossVectors(along, new THREE.Vector3(0, 1, 0));
    const directions = [down, sideways, sideways.clone().negate()].filter((direction) => direction.lengthSq() > 0.25).map((direction) => direction.normalize());
    const bow = (direction: THREE.Vector3, depth: number) => {
      const bowed: THREE.Vector3[] = [];
      const pieces = Math.max(8, Math.ceil(bestLength / 5));
      for (let piece = 0; piece <= pieces; piece++) {
        const t = piece / pieces;
        bowed.push(from.clone().lerp(to, t).addScaledVector(direction, depth * Math.sin(Math.PI * t)));
      }
      return bowed;
    };
    const fits = (bowed: THREE.Vector3[]) => bowed.every((point, index) => !index || obstacles.clearRun(bowed[index - 1], point, CABLE_RADIUS + 0.5));
    let used = false;
    for (const direction of directions) {
      // The deepest bow that fits and uses no more than the slack there is.
      let low = 0, high = bestLength;
      for (let step = 0; step < 16; step++) {
        const depth = (low + high) / 2;
        const bowed = bow(direction, depth);
        if (pathLength(bowed) - bestLength <= slack && fits(bowed)) low = depth; else high = depth;
      }
      if (low < 1) continue;
      const bowed = bow(direction, low);
      slack -= pathLength(bowed) - bestLength;
      result = [...result.slice(0, bestStart), ...bowed, ...result.slice(bestEnd + 1)];
      used = true;
      break;
    }
    if (!used) break;
  }
  return result;
}

type Route = { points: THREE.Vector3[]; length: number; clear: boolean };

/** The way a cable goes from `from` to `to`, round everything in `obstacles`. */
function route(from: Port, to: Port, obstacles: Obstacles): Route {
  const leaveFrom = leaving(from, obstacles), leaveTo = leaving(to, obstacles);
  const way = findWay(leaveFrom, leaveTo, obstacles);
  const middle = way ? smooth(way, obstacles) : dense([leaveFrom, leaveTo]);
  const points = [from.point.clone(), from.point.clone().addScaledVector(from.out, PLUG_STRAIGHT / 2), ...middle, to.point.clone().addScaledVector(to.out, PLUG_STRAIGHT / 2), to.point.clone()];
  return { points, length: pathLength(points), clear: way !== null };
}

// The routed cable at its true length, its slack hung where it fits.
function lay(routed: Route, length: number, obstacles: Obstacles): THREE.Vector3[] {
  const slack = length - 2 * PLUG_DEPTH - routed.length;
  if (!routed.clear || slack < 2) return routed.points;
  const ends = 2; // the plug and the point straight out of it stay put at each end
  const middle = routed.points.slice(ends, routed.points.length - ends);
  return [...routed.points.slice(0, ends), ...hangSlack(middle, slack, obstacles), ...routed.points.slice(routed.points.length - ends)];
}

// The stretch of a cable that must not touch anything: all of it but the plugs.
const between = (points: THREE.Vector3[]) => points.slice(2, -2);

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
 * Plug every motor and sensor into the Brain: the free port with the shortest route round the
 * parts, and the shortest cable that reaches it. Also reports ports that something sits in front of.
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
  // Each takes whichever of the three nearest free ports has the shortest route.
  const obstacles = new Obstacles(parts, 0), touching = new Obstacles(parts, 0.6);
  const ordered = [...devices].sort((first, second) => Number(!!second.meta.isMotor) - Number(!!first.meta.isMotor));
  for (const device of ordered) {
    const from = worldPort(devicePort(device.meta)!, device.matrixWorld);
    const nearest = ports.map((port, index) => ({ index, distance: port.point.distanceTo(from.point) }))
      .filter(({ index }) => free[index]).sort((first, second) => first.distance - second.distance).slice(0, 3);
    if (!nearest.length) { plan.noPort.push(device.uid); continue; }
    let best: { index: number; routed: Route } | null = null;
    for (const { index } of nearest) {
      const routed = route(from, ports[index], obstacles);
      if (!best || (routed.clear && !best.routed.clear) || (routed.clear === best.routed.clear && routed.length < best.routed.length)) best = { index, routed };
    }
    const { index, routed } = best!;
    free[index] = false;
    const needed = routed.length + 2 * PLUG_DEPTH + 4; // a little slack so the plugs are not pulled
    const length = CABLE_LENGTHS.find((candidate) => candidate >= needed) ?? CABLE_LENGTHS[CABLE_LENGTHS.length - 1];
    const reaches = length >= needed;
    const points = reaches ? lay(routed, length, obstacles) : routed.points;
    const blockedBy = touching.through(between(points));
    plan.cables.push({
      deviceUid: device.uid, deviceName: device.meta.name, brainUid: brain.uid, port: index + 1, length, reaches,
      clear: !blockedBy.length, blockedBy, points, plugs: [from, ports[index]],
    });
  }
  return plan;
}

/**
 * The same cable after the build has moved (a running build keeps its plugs and lengths). It
 * stays as it lies while its ends have not moved and nothing has moved into it.
 */
export function rehang(cable: Cable, device: CablePart, brain: CablePart, parts: CablePart[]): Cable {
  const from = worldPort(devicePort(device.meta)!, device.matrixWorld);
  const to = worldPort(brainPorts(brain.meta)[cable.port - 1], brain.matrixWorld);
  const touching = new Obstacles(parts, 0.6);
  const stayed = from.point.distanceTo(cable.plugs[0].point) < 0.5 && to.point.distanceTo(cable.plugs[1].point) < 0.5;
  if (stayed && !touching.through(between(cable.points)).length) return cable;
  const obstacles = new Obstacles(parts, 0);
  const routed = route(from, to, obstacles);
  const reaches = routed.length + 2 * PLUG_DEPTH <= cable.length;
  const points = reaches ? lay(routed, cable.length, obstacles) : routed.points;
  const blockedBy = touching.through(between(points));
  return { ...cable, reaches, clear: !blockedBy.length, blockedBy, points, plugs: [from, to] };
}

/** What a student reads when they point at a cable. */
export function cableLabel(cable: Cable): string {
  if (!cable.reaches) return `${cable.deviceName} is too far from the Brain: even a 400 mm Smart Cable does not reach port ${cable.port}`;
  if (!cable.clear) return `${cable.length} mm Smart Cable: ${cable.deviceName} → Brain port ${cable.port}, but there is no way round the parts in its way`;
  return `${cable.length} mm Smart Cable: ${cable.deviceName} → Brain port ${cable.port}`;
}
