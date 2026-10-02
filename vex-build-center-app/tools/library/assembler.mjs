// Puts VEX IQ parts together the way a builder does: by their holes.
//
// A Build places beams and plates by where their first hole goes, gears and wheels by their
// middle, axles by the stretch of the axle line they must cover, and the Smart Motor by its
// socket. join() and hinge() then put pins wherever two parts' holes line up face to face, so
// a mechanism is described by what touches what, not by millimetres worked out by hand.
//
// Mechanisms are drawn in the XY plane with Y up. Layer k sits at z = k * LAYER: the frame is
// layer 0, the motor hangs behind it, and moving parts stack toward you.
import * as THREE from "three";
import { readFileSync } from "node:fs";
import { holesFor } from "../../src/lib/holes.ts";
import { sprocketTeeth, sprocketPitchRadius, CHAIN_PITCH } from "../../src/lib/mechanism.ts";

export const PITCH = 12.7, LAYER = 6.35;
export const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);

const manifest = JSON.parse(readFileSync(new URL("../../public/parts/manifest.json", import.meta.url), "utf8"));
export const metaById = new Map(manifest.parts.map((meta) => [meta.id, meta]));
export function metaOf(id) {
  const meta = metaById.get(id);
  if (!meta) throw new Error(`no part "${id}" in the catalog`);
  return meta;
}

const vector = (value) => (value instanceof THREE.Vector3 ? value.clone() : new THREE.Vector3(...value));
/** Lattice point: (column, row) holes from the origin, on layer `layer`. */
export const at = (column, row, layer = 0) => new THREE.Vector3(column * PITCH, row * PITCH, layer * LAYER);

// The rotation that sends the part's local axes to the given world directions. `axes` maps a
// local axis index (0 = x, 1 = y, 2 = z) to where it must point; a missing third axis is
// filled in so the result is a turn, never a mirror.
function rotationFor(axes) {
  const columns = [null, null, null];
  for (const [index, direction] of Object.entries(axes)) columns[index] = vector(direction).normalize();
  const missing = columns.findIndex((column) => column === null);
  if (missing >= 0) {
    const next = columns[(missing + 1) % 3], after = columns[(missing + 2) % 3];
    columns[missing] = new THREE.Vector3().crossVectors(next, after).normalize();
  }
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(...columns));
}

// The bores of a part in its own frame: one entry per physical hole, at its middle.
const localCoreCache = new Map();
function localCores(meta) {
  if (localCoreCache.has(meta.id)) return localCoreCache.get(meta.id);
  const byCore = new Map();
  for (const hole of holesFor(meta)) {
    if (hole.kind === "stud") continue;
    const entry = byCore.get(hole.core) || byCore.set(hole.core, { faces: [], axis: vector(hole.axis), bore: hole.bore }).get(hole.core);
    entry.faces.push(vector(hole.p));
  }
  const cores = [...byCore.values()].map((entry) => ({
    center: entry.faces.reduce((sum, face) => sum.add(face), new THREE.Vector3()).multiplyScalar(1 / entry.faces.length),
    axis: entry.axis, bore: entry.bore, faces: entry.faces.length,
  }));
  localCoreCache.set(meta.id, cores);
  return cores;
}

const sortedAxes = (meta) => [0, 1, 2].sort((a, b) => meta.sizeMM[b] - meta.sizeMM[a]); // long, mid, thin
const holeCount = (millimetres) => Math.max(1, Math.round(millimetres / PITCH));
const SHAFTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24].map((pitches) => `shaft-${pitches}x`);
const MOTOR_SHAFTS = ["shaft-motor-2x", "shaft-motor-3x", "shaft-motor-4x"];
const SOCKET = new THREE.Vector3(-9.52, 25.24, -0.02); // the Smart Motor's output, in its own frame

export class Build {
  constructor() { this.parts = []; this.lines = []; }

  /** Place a part by position and turn. Returns its handle. */
  add(id, position, quaternion = new THREE.Quaternion()) {
    const meta = metaOf(id);
    const matrix = new THREE.Matrix4().compose(vector(position), quaternion.clone(), new THREE.Vector3(1, 1, 1));
    const handle = { index: this.parts.length, id, meta, matrix };
    this.parts.push(handle);
    return handle;
  }

  /** A part's bores in the world. */
  cores(handle) {
    return localCores(handle.meta).map((core) => ({
      center: core.center.clone().applyMatrix4(handle.matrix),
      axis: core.axis.clone().transformDirection(handle.matrix),
      bore: core.bore, faces: core.faces,
    }));
  }

  /**
   * A beam or plate with its first hole at `first`, its holes counting along `along` (and,
   * for a plate, across), and its holes pointing along `normal`. hole(i, j) gives the world
   * point of any hole.
   */
  grid(id, { first, along = X, normal = Z }) {
    const meta = metaOf(id);
    const [long, mid, thin] = sortedAxes(meta);
    const quaternion = rotationFor({ [long]: along, [thin]: normal });
    const across = new THREE.Vector3(...[0, 0, 0].map((_, index) => (index === mid ? 1 : 0))).applyQuaternion(quaternion);
    const alongWorld = vector(along).normalize();
    const lengthHoles = holeCount(meta.sizeMM[long]), widthHoles = holeCount(meta.sizeMM[mid]);
    const center = vector(first)
      .addScaledVector(alongWorld, ((lengthHoles - 1) / 2) * PITCH)
      .addScaledVector(across, ((widthHoles - 1) / 2) * PITCH);
    const handle = this.add(id, center, quaternion);
    handle.hole = (i, j = 0) => vector(first).addScaledVector(alongWorld, i * PITCH).addScaledVector(across, j * PITCH);
    handle.length = lengthHoles; handle.width = widthHoles;
    return handle;
  }

  /** A beam from hole `first` to hole `last` (they must be a whole number of holes apart). */
  beam(id, { first, toward, normal = Z }) {
    return this.grid(id, { first, along: vector(toward).sub(vector(first)).normalize(), normal });
  }

  /**
   * A part placed by two of its own holes: the hole nearest local point `firstHole` goes to
   * `first`, and the part turns about `normal` until its hole nearest `secondHole` lies toward
   * `toward`. For angle beams, arms, buckets and hooks, whose holes are not a plain grid.
   */
  byHoles(id, { firstHole, first, secondHole, toward, normal = Z }) {
    const meta = metaOf(id);
    const cores = localCores(meta);
    const nearest = (point) => cores.reduce((best, core) => (core.center.distanceTo(vector(point)) < best.center.distanceTo(vector(point)) ? core : best));
    const a = nearest(firstHole), b = nearest(secondHole);
    const localDirection = b.center.clone().sub(a.center);
    localDirection.addScaledVector(a.axis, -localDirection.dot(a.axis)).normalize();
    const localSide = new THREE.Vector3().crossVectors(a.axis, localDirection);
    const worldDirection = vector(toward).sub(vector(first));
    worldDirection.addScaledVector(vector(normal), -worldDirection.dot(vector(normal))).normalize();
    const worldSide = new THREE.Vector3().crossVectors(vector(normal), worldDirection);
    const localFrame = new THREE.Matrix4().makeBasis(localDirection, localSide, a.axis);
    const worldFrame = new THREE.Matrix4().makeBasis(worldDirection, worldSide, vector(normal).normalize());
    const rotation = new THREE.Matrix4().multiplyMatrices(worldFrame, localFrame.clone().transpose());
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(rotation);
    const position = vector(first).sub(a.center.clone().applyQuaternion(quaternion));
    return this.add(id, position, quaternion);
  }

  /** A gear, sprocket, wheel or anything else that spins, centred on `center`, turning about `axis`. */
  spinner(id, { center, axis = Z, turn = 0 }) {
    const meta = metaOf(id);
    const sizes = meta.sizeMM;
    const spinIndex = id === "gear-worm" ? sizes.indexOf(Math.max(...sizes)) : sizes.indexOf(Math.min(...sizes));
    const other = (spinIndex + 1) % 3;
    const reference = Math.abs(vector(axis).normalize().dot(Y)) > 0.9 ? X : Y;
    const quaternion = rotationFor({ [spinIndex]: axis, [other]: reference.clone().applyAxisAngle(vector(axis).normalize(), turn) });
    // A wheel's bore sits off its middle along the axle (a hub on one side of the tire), so
    // centre the bore, not the box, on the axle line the caller asked for.
    const handle = this.add(id, vector(center), quaternion);
    const bores = this.cores(handle).filter((core) => Math.abs(core.axis.dot(vector(axis))) > 0.98);
    const unit = vector(axis).normalize();
    const radial = (core) => { const offset = core.center.clone().sub(vector(center)); return offset.addScaledVector(unit, -offset.dot(unit)).length(); };
    const middle = bores.sort((first, second) => radial(first) - radial(second))[0];
    if (middle) {
      const offset = middle.center.clone().sub(vector(center));
      offset.addScaledVector(vector(axis).normalize(), -offset.dot(vector(axis).normalize()));
      handle.matrix.setPosition(new THREE.Vector3().setFromMatrixPosition(handle.matrix).sub(offset));
    }
    return handle;
  }

  /**
   * An axle on the line through `through` along `axis`, covering from `from` to `to` (mm
   * along the axis, measured from `through`). The shortest axle that reaches is used.
   */
  axle({ through, axis = Z, from, to, motor = false }) {
    const span = to - from;
    const choices = motor ? MOTOR_SHAFTS : SHAFTS;
    const id = choices.find((candidate) => Math.max(...metaOf(candidate).sizeMM) >= span - 0.5);
    if (!id) throw new Error(`no axle is ${span.toFixed(1)} mm long`);
    const length = Math.max(...metaOf(id).sizeMM);
    // A motor axle's shaped end goes into the socket, so it points back at the motor. Extra
    // length sticks out past the far end, where a builder would leave it.
    const direction = vector(axis).normalize();
    const start = motor ? from : (from + to) / 2 - length / 2;
    const center = vector(through).addScaledVector(direction, start + length / 2);
    const quaternion = rotationFor({ 2: motor ? direction.clone().negate() : direction, 0: Math.abs(direction.dot(X)) > 0.9 ? Y : X });
    this.lines.push({ point: center.clone(), axis: direction, reach: length / 2 + 2 });
    return this.add(id, center, quaternion);
  }

  /**
   * The Smart Motor with its socket at `socket` (a point on the face it is mounted against),
   * its axle coming out along `out`, and its body reaching from the socket toward `body`.
   */
  motor({ socket, out = Z, body = X.clone().negate() }) {
    const quaternion = rotationFor({ 1: out, 0: vector(body) });
    const position = vector(socket).sub(SOCKET.clone().applyQuaternion(quaternion));
    return this.add("smart-motor", position, quaternion);
  }

  /** A pin of `id` centred at `center`, lying along `axis`. */
  pin(id, { center, axis = Z }) {
    this.lines.push({ point: vector(center), axis: vector(axis).normalize() });
    return this.add(id, center, rotationFor({ 2: axis, 0: Math.abs(vector(axis).normalize().dot(X)) > 0.9 ? Y : X }));
  }

  // Hole pairs where a pin could join `first` to `second`: the same line, face to face.
  pairs(first, second) {
    const found = [];
    for (const a of this.cores(first)) {
      if (a.bore !== "round") continue;
      for (const b of this.cores(second)) {
        if (b.bore !== "round" || Math.abs(a.axis.dot(b.axis)) < 0.98) continue;
        const offset = b.center.clone().sub(a.center);
        const along = offset.dot(a.axis);
        if (Math.abs(along) < 0.5 || Math.abs(along) > 7.5) continue;
        if (offset.addScaledVector(a.axis, -along).length() > 0.8) continue;
        const middle = a.center.clone().add(b.center).multiplyScalar(0.5);
        if (this.lines.some((line) => {
          if (Math.abs(line.axis.dot(a.axis)) < 0.98) return false;
          // Only nearby: the same line on the far side of a robot is a different hole.
          const gap = middle.clone().sub(line.point);
          const along = gap.dot(line.axis);
          return Math.abs(along) < (line.reach ?? 10) && gap.addScaledVector(line.axis, -along).length() < 1;
        })) continue;
        found.push({ center: middle, axis: a.axis.clone() });
      }
    }
    return found;
  }

  /** Pin two parts solid: `count` pins at matching holes, spread as far apart as they go. */
  join(first, second, { count = 2, pin = "pin-connector-1x1" } = {}) {
    const candidates = this.pairs(first, second);
    if (candidates.length < count) throw new Error(`${first.id} and ${second.id} share only ${candidates.length} holes, need ${count}`);
    const chosen = [candidates[0]];
    while (chosen.length < count) {
      const spread = (candidate) => Math.min(...chosen.map((pick) => pick.center.distanceTo(candidate.center)));
      chosen.push(candidates.filter((candidate) => !chosen.includes(candidate)).sort((a, b) => spread(b) - spread(a))[0]);
    }
    return chosen.map((pick) => this.pin(pin, pick));
  }

  /** One pin between two parts at the hole nearest `near`: a hinge they swing about. */
  hinge(first, second, { near, pin = "pin-idler-1x1" }) {
    const candidates = this.pairs(first, second);
    if (!candidates.length) throw new Error(`${first.id} and ${second.id} have no holes face to face`);
    const pick = candidates.sort((a, b) => a.center.distanceTo(vector(near)) - b.center.distanceTo(vector(near)))[0];
    if (pick.center.clone().setZ(0).distanceTo(vector(near).setZ(0)) > 2) throw new Error(`no matching holes near ${vector(near).toArray()}`);
    return this.pin(pin, pick);
  }

  /** A chain (or tank tread) wrapped round sprockets, link by link along their pitch circles. */
  chain(sprockets, { link = "chain-link" } = {}) {
    const circles = sprockets.map((handle) => ({
      center: new THREE.Vector3().setFromMatrixPosition(handle.matrix),
      radius: sprocketPitchRadius(sprocketTeeth(handle.id)) + (link === "chain-link" ? 0 : 2.5),
    }));
    // The loop: around the outside of the circles in order, along their outer tangents.
    const path = [];
    for (let index = 0; index < circles.length; index++) {
      const previous = circles[(index + circles.length - 1) % circles.length], current = circles[index], next = circles[(index + 1) % circles.length];
      const arriving = tangentAngle(previous, current), leaving = tangentAngle(current, next);
      let sweep = leaving - arriving;
      while (sweep < 0) sweep += 2 * Math.PI;
      const steps = Math.max(2, Math.ceil(sweep / 0.05));
      for (let step = 0; step <= steps; step++) {
        const angle = arriving + (sweep * step) / steps;
        path.push(new THREE.Vector3(current.center.x + current.radius * Math.cos(angle), current.center.y + current.radius * Math.sin(angle), current.center.z));
      }
    }
    path.push(path[0].clone());
    const lengths = [0];
    for (let index = 1; index < path.length; index++) lengths.push(lengths[index - 1] + path[index].distanceTo(path[index - 1]));
    const total = lengths[lengths.length - 1];
    const pitch = link === "chain-link" ? CHAIN_PITCH : 2 * CHAIN_PITCH;
    const count = Math.round(total / pitch);
    const links = [];
    for (let linkIndex = 0; linkIndex < count; linkIndex++) {
      const distance = (linkIndex * total) / count;
      let segment = 1;
      while (lengths[segment] < distance) segment++;
      const fraction = (distance - lengths[segment - 1]) / (lengths[segment] - lengths[segment - 1] || 1);
      const point = path[segment - 1].clone().lerp(path[segment], fraction);
      const direction = path[segment].clone().sub(path[segment - 1]).normalize();
      links.push(this.add(link, point, rotationFor({ 0: direction, 2: Z })));
    }
    return links;
  }

  /** The build as the builder saves it. */
  toSaved() {
    const round = (value) => Math.round(value * 1000) / 1000;
    return this.parts.map((handle) => {
      const position = new THREE.Vector3(), quaternion = new THREE.Quaternion();
      handle.matrix.decompose(position, quaternion, new THREE.Vector3());
      return { id: handle.id, p: position.toArray().map(round), q: quaternion.toArray().map((value) => Math.round(value * 1e6) / 1e6) };
    });
  }
}

// The direction (as an angle) from the centre of `from` to where the outer tangent toward `to`
// touches `to`, for a loop running counterclockwise.
function tangentAngle(from, to) {
  const dx = to.center.x - from.center.x, dy = to.center.y - from.center.y;
  const distance = Math.hypot(dx, dy);
  const base = Math.atan2(dy, dx);
  const tilt = Math.asin(Math.max(-1, Math.min(1, (from.radius - to.radius) / distance)));
  return base - Math.PI / 2 + tilt;
}
