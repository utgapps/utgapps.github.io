// Writes the example builds the builder offers under "Examples".
//   node tools/make-examples.mjs
//
// The windshield wiper is the one the /vex-mechanisms/ guide teaches, part for part: the
// same constants, the same placements, posed at the guide's opening crank angle. Keep the
// two in step: if the guide's build changes, change it here and re-run.
import * as THREE from "three";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { holesFor } from "../src/lib/holes.ts";

const here = new URL(".", import.meta.url);
const manifest = JSON.parse(readFileSync(new URL("../public/parts/manifest.json", here), "utf8"));
const metaById = new Map(manifest.parts.map((meta) => [meta.id, meta]));

const PITCH = 12.7, LAYER = 6.35;
const FOOT_TOP = 6.1;
const POST_BOTTOM_HOLE = FOOT_TOP + 6.19;
const GEAR_AXLE = new THREE.Vector2(0, POST_BOTTOM_HOLE + 3 * PITCH);
const MOTOR_AXLE = new THREE.Vector2(0, GEAR_AXLE.y + 3 * PITCH);
const WIPER_PIVOT = new THREE.Vector2(7 * PITCH, GEAR_AXLE.y + 2 * PITCH);
const LEFT_POST_X = -4 * PITCH, RIGHT_POST_X = 7 * PITCH;
const FOOT_CENTER_Z = -22.99;
const CRANK = 2 * PITCH, COUPLER = 7 * PITCH, ROCKER = 3 * PITCH;
const CAP = 0.8, SHAFT_CAP_2_5X = 30.77; // a capped axle's cap, and its whole length

const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);
function basis(localXGoesTo, localYGoesTo) {
  const localZGoesTo = new THREE.Vector3().crossVectors(localXGoesTo, localYGoesTo);
  return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(localXGoesTo, localYGoesTo, localZGoesTo));
}
const AS_IS = new THREE.Quaternion();
const LYING_FRONT_TO_BACK = basis(Z, X);
const STANDING_UP = basis(Y, X.clone().negate());
const POINTING_UP = basis(X, Z.clone().negate());
const AXLE_REVERSED = basis(X.clone().negate(), Y);
const MOTOR_FACING_WALL = basis(X.clone().negate(), Z);
const BRAIN_ON_ITS_SIDE = basis(Y, X);
const COLLAR_ON_AXLE = basis(X, Z.clone().negate());

const wiperParts = [
  { id: "plate-3x12", body: "frame", at: [LEFT_POST_X, FOOT_TOP / 2, FOOT_CENTER_Z], turn: LYING_FRONT_TO_BACK },
  { id: "plate-3x12", body: "frame", at: [RIGHT_POST_X, FOOT_TOP / 2, FOOT_CENTER_Z], turn: LYING_FRONT_TO_BACK },
  { id: "corner-1x1", body: "frame", at: [LEFT_POST_X, POST_BOTTOM_HOLE - 0.905, -13.5], turn: AS_IS },
  { id: "corner-1x1", body: "frame", at: [RIGHT_POST_X, POST_BOTTOM_HOLE - 0.905, -13.5], turn: AS_IS },
  { id: "pin-connector-1x1", body: "frame", at: [LEFT_POST_X, FOOT_TOP, -16.64], turn: POINTING_UP },
  { id: "pin-connector-1x1", body: "frame", at: [RIGHT_POST_X, FOOT_TOP, -16.64], turn: POINTING_UP },
  { id: "beam-1x8", body: "frame", at: [LEFT_POST_X, POST_BOTTOM_HOLE + 3.5 * PITCH, -LAYER], turn: STANDING_UP },
  { id: "beam-1x8", body: "frame", at: [RIGHT_POST_X, POST_BOTTOM_HOLE + 3.5 * PITCH, -LAYER], turn: STANDING_UP },
  { id: "plate-3x12", body: "frame", at: [1.5 * PITCH, GEAR_AXLE.y + PITCH, 0], turn: AS_IS },
  { id: "beam-1x12", body: "frame", at: [1.5 * PITCH, MOTOR_AXLE.y, 0], turn: AS_IS },
  ...[[LEFT_POST_X, 0], [LEFT_POST_X, 2], [LEFT_POST_X, 3], [RIGHT_POST_X, 0], [RIGHT_POST_X, 1], [RIGHT_POST_X, 3]].map(([x, row]) => (
    { id: "pin-connector-1x1", body: "frame", at: [x, GEAR_AXLE.y + row * PITCH, -LAYER / 2], turn: AS_IS })),
  // A second beam behind the wall's bottom row, so the big gear's axle sits in two holes and cannot tip.
  { id: "beam-1x10", body: "frame", at: [1.5 * PITCH, GEAR_AXLE.y, -LAYER], turn: AS_IS },
  ...[-2, 4].map((column) => ({ id: "pin-connector-1x1", body: "frame", at: [column * PITCH, GEAR_AXLE.y, -LAYER / 2], turn: AS_IS })),
  { id: "smart-motor", body: "frame", at: [MOTOR_AXLE.x - 9.52, MOTOR_AXLE.y + 0.02, -3.05 - 25.24], turn: MOTOR_FACING_WALL },
  { id: "pin-connector-1x1", body: "frame", at: [MOTOR_AXLE.x - PITCH, MOTOR_AXLE.y, -3.05], turn: AS_IS },
  { id: "pin-connector-1x1", body: "frame", at: [MOTOR_AXLE.x + PITCH, MOTOR_AXLE.y, -3.05], turn: AS_IS },
  { id: "shaft-motor-2x", body: "drive", at: [0, 0, 6.95], turn: AXLE_REVERSED },
  { id: "gear-12t", body: "drive", at: [0, 0, LAYER], turn: AS_IS },
  { id: "rubber-collar", body: "drive", at: [0, 0, 2 * LAYER], turn: COLLAR_ON_AXLE },
  // The coupler sweeps right over the big gear's axle, so its front end is held by the axle's
  // cap instead of a collar, and a collar behind the back beam holds the other end.
  { id: "shaft-cap-2_5x", body: "driven", at: [0, 0, 1.5 * LAYER + CAP - SHAFT_CAP_2_5X / 2], turn: AS_IS },
  { id: "gear-60t", body: "driven", at: [0, 0, LAYER], turn: AS_IS },
  { id: "rubber-collar", body: "driven", at: [0, 0, -2 * LAYER], turn: COLLAR_ON_AXLE },
  { id: "pin-idler-1x1", body: "frame", at: [WIPER_PIVOT.x, WIPER_PIVOT.y, LAYER / 2], turn: AS_IS },
  { id: "beam-1x12", body: "wiper", at: [2.5 * PITCH, 0, LAYER], turn: AS_IS },
  { id: "pin-idler-1x1", body: "driven", at: [0, CRANK, 1.5 * LAYER], turn: AS_IS },
  { id: "beam-1x8", body: "coupler", at: [3.5 * PITCH, 0, 2 * LAYER], turn: AS_IS },
  { id: "pin-idler-1x1", body: "wiper", at: [-3 * PITCH, 0, 1.5 * LAYER], turn: AS_IS },
  // The Brain, on its side behind the right post, one beam further back so its front ports
  // stay clear of the swinging wiper arm.
  { id: "beam-1x6", body: "frame", at: [RIGHT_POST_X, POST_BOTTOM_HOLE + 4.5 * PITCH, -2 * LAYER], turn: STANDING_UP },
  ...[2, 7].map((row) => ({ id: "pin-connector-1x1", body: "frame", at: [RIGHT_POST_X, POST_BOTTOM_HOLE + row * PITCH, -1.5 * LAYER], turn: AS_IS })),
  { id: "robot-brain", body: "frame", at: [RIGHT_POST_X + 9.49, POST_BOTTOM_HOLE + 3 * PITCH + 29.1, -2 * LAYER - 3.05 - 37.21], turn: BRAIN_ON_ITS_SIDE },
  ...[3, 6].map((row) => ({ id: "pin-connector-1x1", body: "frame", at: [RIGHT_POST_X, POST_BOTTOM_HOLE + row * PITCH, -2.5 * LAYER], turn: AS_IS })),
];

// The guide's opening pose, solved the way the guide solves it.
function wiperBodies(crankAngle) {
  const crankPin = new THREE.Vector2(CRANK * Math.cos(crankAngle), CRANK * Math.sin(crankAngle)).add(GEAR_AXLE);
  const pivotToCrank = crankPin.clone().sub(WIPER_PIVOT);
  const distance = pivotToCrank.length();
  const cosine = (ROCKER * ROCKER + distance * distance - COUPLER * COUPLER) / (2 * ROCKER * distance);
  const rockerAngle = Math.atan2(pivotToCrank.y, pivotToCrank.x) + Math.acos(Math.max(-1, Math.min(1, cosine)));
  const couplerPin = new THREE.Vector2(Math.cos(rockerAngle), Math.sin(rockerAngle)).multiplyScalar(ROCKER).add(WIPER_PIVOT);
  const gearTurn = crankAngle - Math.PI / 2;
  const couplerDirection = couplerPin.clone().sub(crankPin);
  const frame = (x, y, angle) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, 0), new THREE.Quaternion().setFromAxisAngle(Z, angle), new THREE.Vector3(1, 1, 1));
  return {
    frame: new THREE.Matrix4(),
    drive: frame(MOTOR_AXLE.x, MOTOR_AXLE.y, -5 * gearTurn),
    driven: frame(GEAR_AXLE.x, GEAR_AXLE.y, gearTurn),
    coupler: frame(crankPin.x, crankPin.y, Math.atan2(couplerDirection.y, couplerDirection.x)),
    wiper: frame(WIPER_PIVOT.x, WIPER_PIVOT.y, rockerAngle + Math.PI),
  };
}

// Place the parts, then record each corner's built-in pin plugged into the post above it:
// nothing in the geometry says a stud is in a hole, so a saved build has to.
function toSaved(parts, bodies) {
  const round = (value) => Math.round(value * 1000) / 1000;
  const placed = parts.map((part) => {
    const matrix = bodies[part.body].clone().multiply(new THREE.Matrix4().compose(new THREE.Vector3(...part.at), part.turn, new THREE.Vector3(1, 1, 1)));
    const position = new THREE.Vector3(), quaternion = new THREE.Quaternion();
    matrix.decompose(position, quaternion, new THREE.Vector3());
    return { part, matrix, saved: { id: part.id, p: position.toArray().map(round), q: quaternion.toArray().map((value) => Math.round(value * 1e6) / 1e6) } };
  });
  placed.forEach((stud, studIndex) => {
    const studHoles = holesFor(metaById.get(stud.part.id)).filter((hole) => hole.kind === "stud");
    for (const studHole of studHoles) {
      // The detected stud handle is not exact (it can sit at the wrong end of the corner), so
      // match any hole on the stud's line within a corner's length of it.
      const tip = new THREE.Vector3(...studHole.p).applyMatrix4(stud.matrix);
      const line = new THREE.Vector3(...studHole.axis).transformDirection(stud.matrix);
      placed.forEach((other, otherIndex) => {
        if (otherIndex === studIndex) return;
        for (const hole of holesFor(metaById.get(other.part.id))) {
          if (hole.kind !== "hole") continue;
          const offset = new THREE.Vector3(...hole.p).applyMatrix4(other.matrix).sub(tip);
          const along = offset.dot(line);
          if (Math.abs(along) > 20 || offset.addScaledVector(line, -along).length() > 3) continue;
          (stud.saved.sj ||= []).push([studHole.core, otherIndex, hole.core]);
          return;
        }
      });
    }
  });
  return placed.map((entry) => entry.saved);
}

mkdirSync(new URL("../public/examples/", here), { recursive: true });
const wiper = toSaved(wiperParts, wiperBodies(Math.PI * 0.62));
writeFileSync(new URL("../public/examples/windshield-wiper.json", here), JSON.stringify(wiper) + "\n");
console.log(`windshield-wiper.json: ${wiper.length} parts, ${wiper.filter((part) => part.sj).length} corner joins`);
