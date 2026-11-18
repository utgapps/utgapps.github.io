// Writes vex-mechanisms/drive-base-<design>.json for the step-by-step page: one of the drive base
// designs in tools/library/families/drive-base-modular.mjs, every part with the step it goes on
// in and, for parts that turn, the axle they turn with. Gears carry one entry per ratio. The page
// draws the build from this file and quotes its hole numbers from `info`, so it shows exactly the
// build the library verifier passed, at every ratio.
//   node tools/export-drive-base.mjs tied
import { writeFileSync } from "node:fs";
import * as THREE from "three";
import { PITCH } from "./library/assembler.mjs";
import { verifiedVersions } from "./library/drive-base-versions.mjs";
import { DESIGNS, STEPS, crossZ } from "./library/families/drive-base-modular.mjs";

const key = process.argv[2] ?? "tied";
const design = DESIGNS.find((entry) => entry.key === key);
if (!design) { console.error(`no design "${key}": try ${DESIGNS.map((entry) => entry.key).join(", ")}`); process.exit(1); }
const versions = verifiedVersions(design);
const { build, saved, stepOf, axles, cross, corners, holeX, gearHoles, strength } = versions[0].made;

const round = (value) => Math.round(value * 1000) / 1000;
// Rail holes are counted 1-20 from the back; cross beam holes 1-20 from the robot's left.
const railHole = (x) => Math.round((x - holeX(0)) / PITCH) + 1;
const crossHole = (z) => Math.round((z - crossZ(0)) / PITCH) + 1;
const ROWS = { top: -9.5, bottom: -22.2 };
const rowOf = (y) => (Math.abs(y - ROWS.top) < 1 ? "top" : "bottom");
const byHole = (first, second) => first.hole - second.hole || (first.row === "top" ? -1 : 1);
const INNER_RAIL = 66.4, OUTER_RAIL = 111.4, BEAM = 6.1; // the rails' centres, as in drive-base-modular.mjs

// Each axle turns with everything on it. Along a row of gears every other one turns the other
// way: the motor's size one way, the wheels' size the other.
const spins = axles.map((axle) => {
  const center = new THREE.Vector3().setFromMatrixPosition(axle.handle.matrix);
  const meshes = Math.abs(gearHoles.indexOf(axle.hole) - gearHoles.indexOf(design.motorHole));
  const motorSize = meshes % 2 === 0;
  return { x: round(center.x), y: round(center.y), side: axle.side, hole: axle.hole + 1, motorSize, sign: motorSize ? 1 : -1, wheel: axle.wheel };
});
const TURNS = new Set(["gear", "wheel", "shaft", "spacer"]);
const parts = build.parts.map((handle, index) => {
  const entry = saved[index];
  const part = { id: entry.id, p: entry.p.map(round), q: entry.q.map(round), step: STEPS.indexOf(stepOf.get(index)) };
  if (part.step < 0) throw new Error(`part ${index} (${entry.id}) is in no step`);
  if (TURNS.has(handle.meta.category)) {
    const spin = spins.findIndex((axle) => Math.abs(axle.x - entry.p[0]) < 1 && Math.abs(axle.y - entry.p[1]) < 1 && Math.sign(entry.p[2]) === axle.side);
    if (spin >= 0) part.spin = spin;
  }
  if (handle.meta.category === "gear") {
    part.gear = spins[part.spin].motorSize ? "motor" : "wheel";
    // Where this gear goes at each ratio: its size, and its exact place.
    part.versions = versions.map(({ made }) => { const gear = made.saved[index]; return { id: gear.id, p: gear.p.map(round), q: gear.q.map(round) }; });
  }
  if (strength.has(index)) part.strong = true;
  return part;
});

// Which cross beam holes the corners' built-in pins fill, inner rails' and outer rails'.
const cornerColumns = (step) => [...new Set(corners.filter((corner) => corner.step === step && corner.handle.studs)
  .flatMap((corner) => corner.handle.studs.map(([, crossIndex, core]) => {
    const target = build.cores(build.parts[crossIndex]).find((candidate) => candidate.core === core);
    if (!target) throw new Error(`no core ${core} on the cross beam`);
    return crossHole(target.center.z);
  })))].sort((first, second) => first - second);
// The right side's parts of one step and kind, as rail holes and rows.
const placesOf = (step, id, test = () => true) => parts.filter((part) => part.id === id && part.step === STEPS.indexOf(step) && part.p[2] > 0 && test(part))
  .map((part) => ({ hole: railHole(part.p[0]), row: rowOf(part.p[1]) })).sort(byHole);
const brainFirst = design.brainFirst + 1;

// Mounting zones: every cross beam hole no corner pin is in (both rows), and the outer rails'
// top row between their corners. Bottom row holes there carry the axles' collars.
const usedColumns = new Set([...cornerColumns("frame"), ...cornerColumns("outer")]);
const runs = [];
for (let column = 1; column <= 20; column++) {
  if (usedColumns.has(column)) continue;
  const last = runs[runs.length - 1];
  if (last && last[1] === column - 1) last[1] = column; else runs.push([column, column]);
}
const outerCornerPins = placesOf("outer", "pin-connector-1x1", (part) => part.p[2] > OUTER_RAIL);
const outerHoles = outerCornerPins.map((place) => place.hole);
const sideZone = [Math.max(...outerHoles.filter((hole) => hole < 10)) + 1, Math.min(...outerHoles.filter((hole) => hole > 10)) - 1];

// What each right-side axle carries, counted from the inside: collars inside the robot, and
// collars filling the pod between the rails (beside the gear).
const collarsOn = (spinIndex, test) => parts.filter((part) => part.id === "rubber-collar" && part.spin === spinIndex && test(Math.abs(part.p[2]))).length;
const axleFill = spins.filter((spin) => spin.side === 1).map((spin) => {
  const spinIndex = spins.indexOf(spin);
  return {
    hole: spin.hole, wheel: spin.wheel, motorSize: spin.motorSize,
    inside: collarsOn(spinIndex, (z) => z < INNER_RAIL - BEAM / 2),
    pod: collarsOn(spinIndex, (z) => z > INNER_RAIL + BEAM / 2 && z < OUTER_RAIL - BEAM / 2),
    outside: collarsOn(spinIndex, (z) => z > OUTER_RAIL + BEAM / 2),
  };
}).sort((first, second) => first.hole - second.hole);

// Overall size, from the cross beams (they are the ends and the full width).
const frontX = new THREE.Vector3().setFromMatrixPosition(cross.front.matrix).x, backX = new THREE.Vector3().setFromMatrixPosition(cross.back.matrix).x;
const size = { length: round(Math.abs(frontX - backX) + BEAM), width: round(20 * PITCH) };
const sideFace = Math.max(...axles.map((axle) => Math.abs(axle.outerFace)));
const faces = { front: round(frontX + BEAM / 2), back: round(backX - BEAM / 2), side: round(sideFace) };

const rightSpins = spins.filter((spin) => spin.side === 1);
const info = {
  design: { key: design.key, title: design.title },
  innerColumns: cornerColumns("frame"), outerColumns: cornerColumns("outer"),
  innerCornerPins: placesOf("frame", "pin-connector-1x1"), outerCornerPins,
  brainRail: [brainFirst, brainFirst + 7],
  brainPins: placesOf("brain", "pin-connector-1x1").map((place) => place.hole - brainFirst + 1),
  standoffs: design.standoffHoles.map((hole) => hole + 1),
  motor: design.motorHole + 1, motorPin: placesOf("motors", "pin-connector-1x1")[0],
  gears: gearHoles.map((hole) => hole + 1),
  motorGears: rightSpins.filter((spin) => spin.motorSize).map((spin) => spin.hole).sort((first, second) => first - second),
  wheelGears: rightSpins.filter((spin) => !spin.motorSize).map((spin) => spin.hole).sort((first, second) => first - second),
  wheels: rightSpins.filter((spin) => spin.wheel).map((spin) => spin.hole).sort((first, second) => first - second),
  ties: [...new Set(placesOf("outer", "standoff-3x").map((place) => place.hole))], axleFill,
  ratios: versions.map(({ motorTeeth, made }) => ({ motorTeeth, wheelTeeth: made.wheelTeeth, turns: Math.abs(made.ratio) })),
  zones: { cross: runs, side: sideZone }, size, faces, rows: ROWS, firstHoleX: round(holeX(0)), firstCrossZ: round(crossZ(0)),
};
const out = new URL(`../../vex-mechanisms/drive-base-${design.key}.json`, import.meta.url);
writeFileSync(out, JSON.stringify({ note: "Generated by vex-build-center-app/tools/export-drive-base.mjs. Do not edit.", steps: STEPS, info, spins, parts }) + "\n");
console.log(`wrote ${parts.length} parts`, JSON.stringify(info, null, 1));
