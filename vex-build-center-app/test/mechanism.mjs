// The builder's Run mode, checked against mechanisms whose motion is known.
//   node test/mechanism.mjs
//
// - The windshield wiper example: the 60T turns a fifth as fast as the motor, the other
//   way, and the wiper sweeps exactly the angle the four-bar's own geometry gives.
// - One pin between two beams is a hinge; two pins hold them solid.
// - A linkage that cannot move stalls its motor instead of tearing itself apart.
// - The wiper builds for real: every axle in two holes, nothing can slide off, and the motor
//   has a cable to a Brain port nothing is in front of.
import * as THREE from "three";
import { readFileSync } from "node:fs";
import { boreCores, fillsOf, OCCUPIER } from "../src/lib/connections.ts";
import { Mechanism } from "../src/lib/mechanism.ts";
import { checkBuild } from "../src/lib/rules.ts";
import { planCables } from "../src/lib/cables.ts";
import { layout } from "../tools/library/layout.mjs";

const here = new URL(".", import.meta.url);
const manifest = JSON.parse(readFileSync(new URL("../public/parts/manifest.json", here), "utf8"));
const metaById = new Map(manifest.parts.map((meta) => [meta.id, meta]));
let failures = 0;
function check(condition, message) {
  console.log(`${condition ? "ok  " : "FAIL"} ${message}`);
  if (!condition) failures++;
}

// Lay a saved build out the way the editor does and hand it to the mechanism.
function build(saved, extraStuds = () => []) {
  const parts = saved.map((entry, index) => {
    const meta = metaById.get(entry.id);
    const object = new THREE.Object3D();
    object.position.fromArray(entry.p);
    object.quaternion.fromArray(entry.q);
    object.updateMatrixWorld(true);
    return { uid: `p${index}`, id: meta.id, name: meta.name, category: meta.category, isMotor: !!meta.isMotor, sizeMM: meta.sizeMM, meta, object };
  });
  const poses = parts.map((part) => ({ uid: part.uid, meta: part.meta, matrixWorld: part.object.matrixWorld }));
  const cores = boreCores(poses);
  const fills = poses.filter((pose) => OCCUPIER.has(pose.meta.category)).flatMap((pose) => fillsOf(pose, cores));
  const studs = [];
  saved.forEach((entry, index) => {
    for (const [, holeIndex, holeCore] of entry.sj || []) {
      const core = cores.find((candidate) => candidate.key === `p${holeIndex}:${holeCore}`);
      if (core) studs.push({ studUid: `p${index}`, holeUid: `p${holeIndex}`, center: core.center, axis: core.axis });
    }
  });
  studs.push(...extraStuds(parts));
  return { parts, mechanism: new Mechanism(parts, fills, studs) };
}

// How far an object has turned about world z since `start`, unwrapped.
function turnTracker(object) {
  const direction = () => new THREE.Vector3(1, 0, 0).applyQuaternion(object.quaternion);
  let last = Math.atan2(direction().y, direction().x), total = 0;
  return () => {
    const now = Math.atan2(direction().y, direction().x);
    total += Math.atan2(Math.sin(now - last), Math.cos(now - last));
    last = now;
    return total;
  };
}

const wiperSaved = JSON.parse(readFileSync(new URL("../public/examples/windshield-wiper.json", here), "utf8"));

{
  const { parts, mechanism } = build(wiperSaved);
  const find = (id, nth = 0) => parts.filter((part) => part.id === id)[nth];
  const motorBody = mechanism.bodyIndexOf(find("smart-motor").uid);
  check(mechanism.isGround(motorBody), "the wiper's frame (with the motor) holds still");
  check(mechanism.motors().length === 1, "the motor axle in the socket makes one drive");
  const meshes = mechanism.gearMeshes();
  check(meshes.length === 1 && meshes[0].driverTeeth === 12 && meshes[0].drivenTeeth === 60, `the 12T drives the 60T (${JSON.stringify(meshes)})`);
  const gear = find("gear-60t"), smallGear = find("gear-12t"), wiper = find("beam-1x12", 1), coupler = find("beam-1x8", 2);
  check(new Set([gear, smallGear, wiper, coupler].map((part) => mechanism.bodyIndexOf(part.uid))).size === 4, "gear, pinion, coupler and wiper each move on their own");

  const gearTurn = turnTracker(gear.object), smallTurn = turnTracker(smallGear.object), wiperTurn = turnTracker(wiper.object);
  const frameRate = 60;
  for (let frame = 0; frame < frameRate; frame++) { mechanism.step(1 / frameRate); gearTurn(); smallTurn(); }
  const degrees = (radians) => (radians * 180) / Math.PI;
  const smallDegrees = degrees(smallTurn()), gearDegrees = degrees(gearTurn());
  check(Math.abs(Math.abs(smallDegrees) - 720) < 5, `the motor turns 2 turns in 1 s at 120 rpm (${smallDegrees.toFixed(1)} deg)`);
  check(Math.abs(gearDegrees + smallDegrees / 5) < 3, `the 60T turns a fifth as far, the other way (${gearDegrees.toFixed(1)} deg)`);
  check(mechanism.motors().every((motor) => !motor.stalled), "nothing stalls");
  const spin = mechanism.spinRates().find((entry) => entry.label === "60T Gear");
  check(spin && Math.abs(Math.abs(spin.rpm) - 24) < 2, `the 60T reads 24 rpm (${spin && spin.rpm.toFixed(1)})`);

  // Sweep: run a full turn of the 60T and compare with the four-bar's exact range.
  let lowest = Infinity, highest = -Infinity;
  for (let frame = 0; frame < frameRate * 2.6; frame++) {
    mechanism.step(1 / frameRate);
    const angle = wiperTurn();
    lowest = Math.min(lowest, angle); highest = Math.max(highest, angle);
  }
  const PITCH = 12.7, crank = 2 * PITCH, coupling = 7 * PITCH, rocker = 3 * PITCH;
  const gearAxle = new THREE.Vector2(0, 6.1 + 6.19 + 3 * PITCH), pivot = new THREE.Vector2(7 * PITCH, gearAxle.y + 2 * PITCH);
  let exactLow = Infinity, exactHigh = -Infinity, reference = null;
  for (let degree = 0; degree < 360; degree += 0.5) {
    const radians = (degree * Math.PI) / 180;
    const crankPin = new THREE.Vector2(crank * Math.cos(radians), crank * Math.sin(radians)).add(gearAxle);
    const toCrank = crankPin.clone().sub(pivot), distance = toCrank.length();
    const rockerAngle = Math.atan2(toCrank.y, toCrank.x) + Math.acos((rocker * rocker + distance * distance - coupling * coupling) / (2 * rocker * distance));
    reference ??= rockerAngle;
    const relative = Math.atan2(Math.sin(rockerAngle - reference), Math.cos(rockerAngle - reference));
    exactLow = Math.min(exactLow, relative); exactHigh = Math.max(exactHigh, relative);
  }
  const sweep = degrees(highest - lowest), exactSweep = degrees(exactHigh - exactLow);
  check(Math.abs(sweep - exactSweep) < 1.5, `the wiper sweeps ${sweep.toFixed(1)} deg; the four-bar says ${exactSweep.toFixed(1)} deg`);

  // Turning by hand: grab the wiper's tip and pull it. The motor follows.
  const tip = new THREE.Vector3(8 * PITCH, 0, 0).applyQuaternion(wiper.object.quaternion).add(pivot.x ? new THREE.Vector3(pivot.x, pivot.y, wiper.object.position.z) : new THREE.Vector3());
  const before = smallTurn();
  const wiperBody = mechanism.bodyIndexOf(wiper.uid);
  mechanism.startDrag(wiperBody, tip);
  const goal = tip.clone().add(new THREE.Vector3(0, -15, 0));
  for (let frame = 0; frame < 30; frame++) { mechanism.moveDrag(goal); mechanism.step(1 / frameRate); }
  mechanism.endDrag();
  check(Math.abs(smallTurn() - before) > 0.2, "pulling the wiper by hand turns the gears and the motor with it");
}

{
  // Lock the wiper arm to the wall with a second pin: the linkage can no longer move.
  const { parts, mechanism } = build(wiperSaved, (parts) => {
    const wiper = parts.filter((part) => part.id === "beam-1x12")[1], wall = parts.find((part) => part.id === "plate-3x12" && part.object.position.z === 0);
    const point = new THREE.Vector3(5 * 12.7, 0, 0).applyQuaternion(wiper.object.quaternion).add(wiper.object.position);
    return [{ studUid: wiper.uid, holeUid: wall.uid, center: point, axis: new THREE.Vector3(0, 0, 1) }];
  });
  const gear = parts.find((part) => part.id === "gear-60t");
  const start = gear.object.quaternion.clone();
  for (let frame = 0; frame < 20; frame++) mechanism.step(1 / 60);
  check(mechanism.motors()[0].stalled, "a wiper pinned twice to the wall stalls the motor");
  check(gear.object.quaternion.angleTo(start) < (2 * Math.PI) / 180, `and nothing moves more than a jiggle (${((gear.object.quaternion.angleTo(start) * 180) / Math.PI).toFixed(2)} deg)`);
}

{
  // Two 1x8 beams stacked flat, joined by one pin, then by two.
  const beam = metaById.get("beam-1x8"), pin = metaById.get("pin-connector-1x1");
  const holeX = (index) => -44.45 + index * 12.7;
  const layer = beam.sizeMM[2];
  const pinAt = (index) => ({ id: pin.id, p: [holeX(index), 0, layer / 2], q: new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3().setComponent(pin.sizeMM.indexOf(Math.max(...pin.sizeMM)), 1), new THREE.Vector3(0, 0, 1)).toArray() });
  const beams = [{ id: beam.id, p: [0, 0, 0], q: [0, 0, 0, 1] }, { id: beam.id, p: [0, 0, layer], q: [0, 0, 0, 1] }];
  const one = build([...beams, pinAt(0)]).mechanism;
  check(one.bodies.length === 2, `one pin makes a hinge (${one.bodies.length} bodies)`);
  const two = build([...beams, pinAt(0), pinAt(3)]).mechanism;
  check(two.bodies.length === 1, `two pins hold the beams solid (${two.bodies.length} body)`);
}

{
  const { poses, fills, studs } = layout(wiperSaved);
  const plan = planCables(poses);
  const problems = checkBuild(poses, fills, studs, plan);
  check(!problems.length, `the wiper passes the build check${problems.length ? `: ${problems.map((problem) => problem.text).join(" / ")}` : ""}`);
  check(plan.cables.length === 1 && plan.cables[0].reaches, `its motor is cabled to the Brain (${plan.cables.map((cable) => `port ${cable.port}, ${cable.length} mm`).join(", ")})`);
}

console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
