// Proves a saved build is a working mechanism, the way the builder will treat it:
//   - every pin and axle goes through at least two parts (nothing is held by a pin in mid-air);
//   - it would hold together for real: every axle is held in two places and nothing on it can
//     slide, and every motor and sensor has a Smart Cable to a Brain port it can reach
//     (src/lib/rules.ts, the same rules the builder shows students);
//   - every rubber band sits on its posts, snug but not about to snap, and cuts through no
//     other part, however the build moves (src/lib/bands.ts);
//   - every cable finds a way round the parts to its Brain port, however the build moves;
//   - every part is connected, through pins, axles and gear teeth, to the motor;
//   - nothing clips into a part it is not connected to (the builder would paint both red);
//   - when the motors run, it moves, and the parts that should move do. Parts are solid: one
//     that swings into another stops there, and the motors turn round, the way a program drives
//     a real arm between its stops. Stopped both ways at once, or locked, it fails.
import * as THREE from "three";
import { OBB } from "three/examples/jsm/math/OBB.js";
import { OCCUPIER } from "../../src/lib/connections.ts";
import { Mechanism, meshingDistance, gearTeeth } from "../../src/lib/mechanism.ts";
import { checkBuild } from "../../src/lib/rules.ts";
import { planCables, rehang } from "../../src/lib/cables.ts";
import { layout as place, bands } from "./layout.mjs";

const COLLIDE_SLOP = 1.4; // the builder's: mm trimmed off each half-size before boxes count as touching
const wraps = (meta) => meta.category === "chain" || (meta.id.startsWith("rubber-band-") && meta.id !== "rubber-band-anchor");

/** Lay a saved build out as the builder does, and make its mechanism. */
export function layout(saved) {
  const { parts, poses, fills, studs } = place(saved);
  return { parts, poses, fills, studs, mechanism: new Mechanism(parts, fills, studs) };
}

/**
 * Check a build. `expect` may say:
 *   moves: part indexes that must move when the motors run;
 *   still: part indexes that must not;
 *   ratio: [inputIndex, outputIndex, turnsOfOutputPerTurnOfInput] (negative: the other way);
 *   level: a part index that must keep its tilt while it moves (a parallel linkage);
 *   seconds: how long to run (default 1).
 * Returns a list of problems; empty means it works.
 */
export function verify(saved, expect = {}) {
  const problems = [];
  const { parts, poses, fills, studs, mechanism } = layout(saved);
  problems.push(...checkBuild(poses, fills, studs).map((problem) => `${problem.text} (${problem.uids.map((uid) => `#${uid}`).join(", ")})`));
  for (const band of bands(saved, poses)) {
    problems.push(...band.shape.problems);
    for (const uid of band.clashes) problems.push(`${band.meta.name} cuts through ${parts[Number(uid.slice(1))].name} #${uid}`);
  }

  // Pins and axles that hold nothing.
  const heldBy = new Map();
  for (const fill of fills) (heldBy.get(fill.occupierUid) || heldBy.set(fill.occupierUid, new Set()).get(fill.occupierUid)).add(fill.partUid);
  for (const part of parts) {
    if (!OCCUPIER.has(part.category)) continue;
    const held = heldBy.get(part.uid)?.size ?? 0;
    if (held < 2 && !(part.category === "shaft" && held === 1 && expect.looseAxles)) problems.push(`${part.name} #${part.uid} goes through ${held} part${held === 1 ? "" : "s"}`);
  }

  // Everything hangs together: pins and axles link what they go through, teeth link gears.
  const links = new Map(parts.map((part) => [part.uid, new Set()]));
  const link = (a, b) => { links.get(a).add(b); links.get(b).add(a); };
  for (const fill of fills) link(fill.occupierUid, fill.partUid);
  for (const stud of studs) link(stud.studUid, stud.holeUid);
  for (let first = 0; first < parts.length; first++) {
    for (let second = first + 1; second < parts.length; second++) {
      const a = parts[first], b = parts[second];
      if (gearTeeth(a.id) && gearTeeth(b.id) && meshingDistance(a, b) !== null) link(a.uid, b.uid);
    }
  }
  const start = parts.find((part) => part.isMotor) || parts[0];
  const reached = new Set([start.uid]);
  for (const queue = [start.uid]; queue.length;) for (const next of links.get(queue.pop())) if (!reached.has(next)) { reached.add(next); queue.push(next); }
  const loose = parts.filter((part) => !reached.has(part.uid) && part.category !== "chain");
  if (loose.length) problems.push(`not connected to the rest: ${loose.map((part) => `${part.name} #${part.uid}`).join(", ")}`);

  // Clipping, judged as the builder judges it: parts sharing a pin or axle are allowed to touch.
  const sharesPin = new Set();
  for (const held of heldBy.values()) for (const a of held) for (const b of held) sharesPin.add(`${a}|${b}`);
  const boxes = parts.map((part) => {
    const box = new OBB(new THREE.Vector3(), new THREE.Vector3(...part.sizeMM).multiplyScalar(0.5));
    box.halfSize.subScalar(COLLIDE_SLOP).max(new THREE.Vector3(0.1, 0.1, 0.1));
    return box.applyMatrix4(part.object.matrixWorld);
  });
  for (let first = 0; first < parts.length; first++) {
    for (let second = first + 1; second < parts.length; second++) {
      const a = parts[first], b = parts[second];
      if (links.get(a.uid).has(b.uid) || sharesPin.has(`${a.uid}|${b.uid}`) || wraps(a.meta) || wraps(b.meta)) continue;
      if (boxes[first].intersectsOBB(boxes[second])) problems.push(`${a.name} #${a.uid} clips into ${b.name} #${b.uid}`);
    }
  }

  // Run it.
  const startPoses = parts.map((part) => [part.object.position.clone(), part.object.quaternion.clone()]);
  const levelStart = expect.level !== undefined ? parts[expect.level].object.quaternion.clone() : null;
  let levelDrift = 0;
  if (mechanism.notes.length) problems.push(...mechanism.notes);
  if (!mechanism.motors().length) problems.push("no motor drives anything");
  // Both turns are measured about the same world direction, so "the other way" means what it
  // looks like, however each part happens to be flipped.
  let tracked = null;
  if (expect.ratio) {
    const [inputPart, outputPart] = [parts[expect.ratio[0]], parts[expect.ratio[1]]];
    const inputAxis = spinAxisOf(inputPart), outputAxis = spinAxisOf(outputPart);
    const world = (part, axis) => axis.clone().applyQuaternion(part.object.quaternion);
    if (world(inputPart, inputAxis).dot(world(outputPart, outputAxis)) < 0) outputAxis.negate();
    tracked = [turnTracker(inputPart.object, inputAxis), turnTracker(outputPart.object, outputAxis)];
  }
  const frames = Math.round((expect.seconds ?? 1) * 60);
  // The ratio is read up to the first stop, before anything turns round.
  let stalled = false, bumpedAt = -Infinity, ratioDone = false, ratioTurns = [0, 0];
  const bandClashes = new Set();
  let cables = planCables(poses).cables;
  const cableProblems = new Set();
  // A band, or a cable to a part that moves, gets swept through the whole of the motion (5 s,
  // turning round at each stop), not just the stretch that proves it moves.
  const savedBands = bands(saved, poses);
  const ground = mechanism.bodies.findIndex((_, index) => mechanism.isGround(index));
  const sweeps = savedBands.length > 0 || cables.some((cable) => mechanism.bodyIndexOf(cable.deviceUid) !== ground);
  const lastFrame = sweeps ? Math.max(frames, 300) : frames;
  // Judged every frame: a gear that has made a whole number of turns is back where it started.
  const everMoved = new Set();
  const movedNow = (index) => {
    const [position, quaternion] = startPoses[index];
    const object = parts[index].object;
    return object.position.distanceTo(position) > 0.5 || object.quaternion.angleTo(quaternion) > 0.02;
  };
  for (let frame = 0; frame < lastFrame; frame++) {
    const proving = frame < frames;
    if (!mechanism.step(1 / 60)) {
      const bump = mechanism.bump;
      if (!bump) { stalled = proving; break; }
      // Against a stop: run the motors the other way. Stopped again straight away, it is jammed.
      if (frame - bumpedAt <= 2) { problems.push(`it jams: the ${bump.first} #${bump.firstUid} runs into the ${bump.second} #${bump.secondUid} both ways`); break; }
      bumpedAt = frame;
      ratioDone = true;
      for (const motor of mechanism.motors()) mechanism.setMotorSpeed(motor.uid, -motor.speedPercent);
      continue;
    }
    if (frame % 3 === 0) {
      for (const band of bands(saved, poses)) for (const uid of band.clashes) bandClashes.add(`${band.meta.name} cuts through ${parts[Number(uid.slice(1))].name} #${uid} as it moves`);
      const byUid = new Map(poses.map((pose) => [pose.uid, pose]));
      cables = cables.map((cable) => rehang(cable, byUid.get(cable.deviceUid), byUid.get(cable.brainUid), poses));
      for (const cable of cables) {
        if (!cable.reaches) cableProblems.add(`the ${cable.deviceName}'s cable is too short once it moves`);
        else if (!cable.clear) cableProblems.add(`the ${cable.deviceName}'s cable has no way round ${cable.blockedBy.map((uid) => `#${uid}`).join(", ")} as it moves`);
      }
    }
    if (!proving) continue;
    if (tracked && !ratioDone) ratioTurns = tracked.map((track) => track());
    if (levelStart) levelDrift = Math.max(levelDrift, parts[expect.level].object.quaternion.angleTo(levelStart));
    parts.forEach((part, index) => { if (!everMoved.has(index) && movedNow(index)) everMoved.add(index); });
  }
  if (stalled) problems.push(`the motor stalls (${mechanism.motors().map((motor) => motor.name).join(", ")})`);
  problems.push(...bandClashes, ...cableProblems);
  const moved = (index) => everMoved.has(index);
  for (const index of expect.moves || []) if (!moved(index)) problems.push(`${parts[index].name} #p${index} should move but does not`);
  for (const index of expect.still || []) if (moved(index)) problems.push(`${parts[index].name} #p${index} should stay still but moves`);
  if (tracked) {
    const [inputTurn, outputTurn] = ratioTurns;
    const measured = outputTurn / inputTurn;
    if (!Number.isFinite(measured) || Math.abs(measured - expect.ratio[2]) > Math.abs(expect.ratio[2]) * 0.03 + 0.002)
      problems.push(`output turns ${measured.toFixed(3)}x the input, expected ${expect.ratio[2].toFixed(3)}x`);
  }
  if (levelStart && levelDrift > 0.02) problems.push(`${parts[expect.level].name} tilts ${(levelDrift * 180 / Math.PI).toFixed(1)} deg, should stay level`);
  return problems;
}

function spinAxisOf(part) {
  const sizes = part.sizeMM;
  const index = part.id === "gear-worm" ? sizes.indexOf(Math.max(...sizes)) : sizes.indexOf(Math.min(...sizes));
  return new THREE.Vector3().setComponent(index, 1);
}

// How far an object has turned about its own spin axis since the start, unwrapped.
function turnTracker(object, localAxis) {
  const startQuaternion = object.quaternion.clone();
  const worldAxis = localAxis.clone().applyQuaternion(startQuaternion);
  const reference = Math.abs(worldAxis.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  reference.addScaledVector(worldAxis, -reference.dot(worldAxis)).normalize();
  const localReference = reference.clone().applyQuaternion(startQuaternion.clone().invert());
  let last = 0, total = 0;
  return () => {
    const now = localReference.clone().applyQuaternion(object.quaternion);
    const axisNow = localAxis.clone().applyQuaternion(object.quaternion);
    const angle = Math.atan2(axisNow.dot(new THREE.Vector3().crossVectors(reference, now)), reference.dot(now));
    total += Math.atan2(Math.sin(angle - last), Math.cos(angle - last));
    last = angle;
    return total;
  };
}
