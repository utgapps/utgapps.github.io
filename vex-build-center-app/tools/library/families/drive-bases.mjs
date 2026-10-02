// Drive bases: the Robot Brain in the middle, two long beams pinned to each side of it (one on
// top of the other, so every wheel axle is held in two places), and wheels in front of and
// behind the Brain. Each driven wheel sits on its own motor's axle; the motor hangs on the
// outside of the rails. The rails' second row of holes runs below the Brain's side holes, so the
// Smart Ports above them stay clear for cables. Seen from above, X is forward and Z is to the side.
import * as THREE from "three";
import { Build, LAYER, PITCH, X, Y, Z } from "../assembler.mjs";

const BRAIN_FIRST_HOLE = -41.8; // x of the Brain's rearmost side hole
const HOLE_ROW = -9.5;          // y of the Brain's side holes
const BRAIN_SIDE = 37.2;        // z of the Brain's side faces
const BRAIN_HALF_LENGTH = 53.35;
const DRIVE_GAMES = ["Squared Away", "Rise Above", "Pitching In", "Slapshot", "Full Volume", "Rapid Relay", "Mix & Match"];

const WHEELS = {
  "wheel-smooth-160": { name: "160 mm smooth", radius: 25.25, thickness: 18.7 },
  "wheel-low-friction-160": { name: "160 mm low-friction", radius: 25.25, thickness: 18.8 },
  "wheel-200": { name: "200 mm", radius: 31.8, thickness: 19.3 },
  "wheel-250": { name: "250 mm", radius: 39.8, thickness: 19.3 },
};

const holeX = (index) => BRAIN_FIRST_HOLE + index * PITCH;
// The first hole index (counting the Brain's rearmost hole as 0) where a wheel clears the Brain.
function clearIndex(radius, forward) {
  for (let step = 1; ; step++) {
    const index = forward ? 7 + step : -step;
    if (Math.abs(holeX(index)) - radius > BRAIN_HALF_LENGTH + 2) return index;
  }
}

function driveBase({ front, rear, drive, extra }) {
  return () => {
    const build = new Build();
    const frontWheel = WHEELS[front], rearWheel = WHEELS[rear];
    const frontIndex = clearIndex(frontWheel.radius, true) + extra;
    const rearIndex = clearIndex(rearWheel.radius, false) - extra;
    const brain = build.add("robot-brain", [0, 0, 0]);
    const railHoles = frontIndex - rearIndex + 1;
    const railId = [16, 18, 20].map((length) => `beam-2x${length}`).find((id) => Number(id.split("x")[1]) >= railHoles);
    if (!railId) throw new Error(`a ${railHoles}-hole side rail is longer than any beam`);
    const driven = [];
    for (const side of [1, -1]) {
      const railZ = side * (BRAIN_SIDE + LAYER / 2);
      // Facing in or out does not matter to a beam; facing -Z puts its second row below.
      const facing = Z.clone().negate();
      const rail = build.grid(railId, { first: [holeX(rearIndex), HOLE_ROW, railZ], along: X, normal: facing });
      build.join(brain, rail, { count: 2 });
      const outerRail = build.grid(railId, { first: [holeX(rearIndex), HOLE_ROW, railZ + side * LAYER], along: X, normal: facing });
      const inward = new THREE.Vector3(0, 0, -side);
      for (const [index, wheel, id, powered] of [[frontIndex, frontWheel, front, drive !== "rear"], [rearIndex, rearWheel, rear, drive !== "front"]]) {
        const wheelZ = side * (BRAIN_SIDE - 1 - wheel.thickness / 2);
        const outerFace = railZ + side * (LAYER / 2 + LAYER);
        if (powered) {
          const socket = new THREE.Vector3(holeX(index), HOLE_ROW, outerFace - side * 0.125);
          const motor = build.motor({ socket, out: inward, body: index > 3 ? X.clone().negate() : X });
          build.join(motor, outerRail);
          build.axle({ through: socket, axis: inward, from: -5, to: Math.abs(socket.z - wheelZ) + wheel.thickness / 2, motor: true });
        } else {
          const through = new THREE.Vector3(holeX(index), HOLE_ROW, outerFace);
          build.axle({ through, axis: inward, from: -1, to: Math.abs(outerFace - wheelZ) + wheel.thickness / 2 });
        }
        const placed = build.spinner(id, { center: [holeX(index), HOLE_ROW, wheelZ], axis: inward });
        if (powered) driven.push(placed.index);
      }
      build.join(rail, outerRail, { count: 4 }); // after the axles, so no pin goes where an axle does
    }
    return { saved: build.toSaved(), expect: { moves: driven } };
  };
}

const LAYOUTS = [
  { drive: "front", label: "front-wheel drive", motors: 2, blurb: "Two motors turn the front wheels; the back wheels just roll along." },
  { drive: "rear", label: "rear-wheel drive", motors: 2, blurb: "Two motors push from the back; the front wheels just roll along." },
  { drive: "all", label: "four-wheel drive", motors: 4, blurb: "A motor on every wheel: the most push, and the hardest to knock around." },
];
const PAIRS = [
  ["wheel-200", "wheel-200"], ["wheel-250", "wheel-250"], ["wheel-smooth-160", "wheel-smooth-160"],
  ["wheel-200", "wheel-low-friction-160"], ["wheel-250", "wheel-200"], ["wheel-200", "wheel-smooth-160"],
];

const entries = [];
for (const [front, rear] of PAIRS) {
  for (const layout of LAYOUTS) {
    for (const extra of [0, 1]) {
      if (front === "wheel-250" && rear === "wheel-250" && extra) continue;
      const same = front === rear;
      const lowFriction = rear === "wheel-low-friction-160";
      entries.push({
        slug: `drive-${layout.drive}-${front.replace("wheel-", "")}-${rear.replace("wheel-", "")}${extra ? "-long" : ""}`,
        name: `${layout.label[0].toUpperCase()}${layout.label.slice(1)}: ${same ? `${WHEELS[front].name} wheels` : `${WHEELS[front].name} front, ${WHEELS[rear].name} back`}${extra ? ", long" : ""}`,
        blurb: layout.blurb + " "
          + (lowFriction ? "Low-friction back wheels slide sideways easily, so the robot turns on the spot without scrubbing. " : "")
          + (extra ? "The wheels are farther apart: steadier going straight, slower to turn." : "Wheels close to the Brain make a short, quick-turning robot."),
        category: "drive bases", difficulty: layout.motors === 4 ? 2 : 1, motors: layout.motors, principle: "drivetrain layout",
        games: DRIVE_GAMES,
        make: driveBase({ front, rear, drive: layout.drive, extra }),
      });
    }
  }
}
export default entries;
