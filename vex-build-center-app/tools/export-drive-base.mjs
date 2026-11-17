// Writes vex-mechanisms/drive-base.json: the modular drive base from
// tools/library/families/drive-base-modular.mjs, every part with the step it goes on in and,
// for parts that turn, the axle they turn with. The step-by-step page draws it from this file
// and quotes its hole numbers from `info`, so the page shows exactly the build the library
// verifier passed.
//   node tools/export-drive-base.mjs
import { writeFileSync } from "node:fs";
import * as THREE from "three";
import { verify } from "./library/verify.mjs";
import { PITCH } from "./library/assembler.mjs";
import { modularDriveBase, STEPS, GEAR_HOLES, MOTOR_HOLE, WHEEL_HOLES, STANDOFF_HOLES, BRAIN_HOLES, holeX, crossZ } from "./library/families/drive-base-modular.mjs";

const { build, saved, stepOf, axles, cross, corners, expect } = modularDriveBase();
const problems = verify(saved, expect);
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }

const round = (value) => Math.round(value * 1000) / 1000;
// Rail holes are counted 1-20 from the back; cross beam holes 1-20 from the robot's left.
const railHole = (x) => Math.round((x - holeX(0)) / PITCH) + 1;
const crossHole = (z) => Math.round((z - crossZ(0)) / PITCH) + 1;
const ROWS = { top: -9.5, bottom: -22.2 };
const rowOf = (y) => (Math.abs(y - ROWS.top) < 1 ? "top" : "bottom");

// Each axle turns with everything on it. In a row of gears every other one turns the other way:
// the motor's gear and the wheels' gears (1st, 3rd, 5th) one way, the two between them the other.
const spins = axles.map((info) => {
  const center = new THREE.Vector3().setFromMatrixPosition(info.handle.matrix);
  const hole = railHole(center.x) - 1;
  const chainPlace = GEAR_HOLES.indexOf(hole) - GEAR_HOLES.indexOf(MOTOR_HOLE);
  return { x: round(center.x), y: round(center.y), side: info.side, hole, sign: chainPlace % 2 === 0 ? 1 : -1, wheel: WHEEL_HOLES.includes(hole) };
});
const TURNS = new Set(["gear", "wheel", "shaft", "spacer"]);
const parts = build.parts.map((handle, index) => {
  const entry = saved[index];
  const part = { id: entry.id, p: entry.p.map(round), q: entry.q.map(round), step: STEPS.indexOf(stepOf.get(index)) };
  if (part.step < 0) throw new Error(`part ${index} (${entry.id}) is in no step`);
  if (TURNS.has(handle.meta.category)) {
    const position = new THREE.Vector3(...entry.p);
    const spin = spins.findIndex((axle) => Math.abs(axle.x - position.x) < 1 && Math.abs(axle.y - position.y) < 1 && Math.sign(position.z) === axle.side);
    if (spin >= 0) part.spin = spin;
  }
  return part;
});

// Which cross beam holes the corners' built-in pins fill, inner rails' and outer rails'.
const cornerColumns = (step) => [...new Set(corners.filter((corner) => corner.step === step && corner.handle.studs)
  .flatMap((corner) => corner.handle.studs.map(([, crossIndex, core]) => {
    const target = build.cores(build.parts[crossIndex]).find((candidate) => candidate.core === core);
    if (!target) throw new Error(`no core ${core} on the cross beam`);
    return crossHole(target.center.z);
  })))].sort((first, second) => first - second);
const pinsIn = (step, test = () => true) => parts.filter((part) => part.id === "pin-connector-1x1" && part.step === STEPS.indexOf(step) && part.p[2] > 0 && test(part));
const cornerPins = pinsIn("frame").map((part) => ({ hole: railHole(part.p[0]), row: rowOf(part.p[1]) })).sort((first, second) => first.hole - second.hole);
const brainRailFirst = BRAIN_HOLES[0] + 1;
const brainPins = pinsIn("brain").map((part) => railHole(part.p[0]) - brainRailFirst + 1).sort((first, second) => first - second);
const motorPin = pinsIn("motors").map((part) => ({ hole: railHole(part.p[0]), row: rowOf(part.p[1]) }))[0];

// Mounting zones: every cross beam hole no corner pin is in (both rows), and the outer rails'
// top row between their corners. Bottom row holes there carry the axles' collars.
const usedColumns = new Set([...cornerColumns("frame"), ...cornerColumns("outer")]);
const runs = [];
for (let column = 1; column <= 20; column++) {
  if (usedColumns.has(column)) continue;
  const last = runs[runs.length - 1];
  if (last && last[1] === column - 1) last[1] = column; else runs.push([column, column]);
}
const outerPins = pinsIn("outer").map((part) => railHole(part.p[0]));
const sideZone = [Math.max(...outerPins.filter((hole) => hole < 10)) + 1, Math.min(...outerPins.filter((hole) => hole > 10)) - 1];

// Overall size, from the cross beams (they are the ends and the full width).
const crossLength = 20 * PITCH;
const frontX = new THREE.Vector3().setFromMatrixPosition(cross.front.matrix).x, backX = new THREE.Vector3().setFromMatrixPosition(cross.back.matrix).x;
const size = { length: round(Math.abs(frontX - backX) + 6.1), width: round(crossLength) };

// Where the page draws the zones: the cross beams' outer faces, the outer rails' outer faces.
const outerFace = Math.max(...axles.map((axle) => Math.abs(axle.outerFace)));
const faces = { front: round(frontX + 6.1 / 2), back: round(backX - 6.1 / 2), side: round(outerFace) };

const info = {
  innerColumns: cornerColumns("frame"), outerColumns: cornerColumns("outer"), cornerPins,
  brainRail: [brainRailFirst, brainRailFirst + 7], brainPins, standoffs: STANDOFF_HOLES.map((hole) => hole + 1),
  motor: MOTOR_HOLE + 1, motorPin, gears: GEAR_HOLES.map((hole) => hole + 1), wheels: WHEEL_HOLES.map((hole) => hole + 1),
  zones: { cross: runs, side: sideZone }, size, faces, rows: ROWS, firstHoleX: round(holeX(0)), firstCrossZ: round(crossZ(0)),
};
const out = new URL("../../vex-mechanisms/drive-base.json", import.meta.url);
writeFileSync(out, JSON.stringify({ note: "Generated by vex-build-center-app/tools/export-drive-base.mjs. Do not edit.", steps: STEPS, info, spins, parts }) + "\n");
console.log(`wrote ${parts.length} parts`, JSON.stringify(info));
