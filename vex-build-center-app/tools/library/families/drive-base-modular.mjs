// The modular drive base: one standard base that every mechanism can be pinned onto, in the
// spirit of the Hero Bot's (2x20 beams on all four sides, the motors inside, a gear train turning
// both wheels on each side), but designed here from its holes up.
//
// The frame is a ladder: two 2x20 cross beams, one across the front and one across the back,
// and four 2x20 rails running front to back, joined to the cross beams by 2x2 corner connectors.
// Each side is a "pod" of two rails: the inner rail, and the outer rail that is the robot's side
// wall. Between them, five 36T gears three holes apart and two omni wheels. The motor sits
// inside the robot and turns the rear wheel's axle; the gears pass the turn forward to the front
// wheel. Five gears in a row: the 1st, 3rd and 5th all turn the same way, so both wheels drive
// forward together. (Four or six would not work: the wheels would fight.) The Brain sits in the
// middle between two short beams, held off the inner rails by standoffs.
//
// X is forward, Y up, and Z to the robot's right. Frame holes count 0 (back) to 19 (front).
import * as THREE from "three";
import { Build, LAYER, PITCH, X, Y, Z } from "../assembler.mjs";
import { holesFor } from "../../../src/lib/holes.ts";

const BRAIN_FIRST_HOLE = -41.8; // x of the Brain's rearmost side hole, which is frame hole 6
const TOP_ROW = -9.5;           // y of the Brain's side holes: every beam's top row
const BOTTOM_ROW = TOP_ROW - PITCH;
const BRAIN_SIDE = 37.2;        // z of the Brain's side faces
const BEAM = 6.1;               // a beam's thickness
export const holeX = (index) => BRAIN_FIRST_HOLE + (index - 6) * PITCH;
// Cross beam holes, counted across from the robot's left (0) to its right (19).
export const crossZ = (index) => (index - 9.5) * PITCH;

// The 2x2 corner connector, in its own frame: its two built-in pins point along +z, the four
// holes of its flat flange along y. The flange's back face (y = -6.2) lies on a rail; the hole
// column nearest the pins (z = 3.2) is the rail's end hole, and the pins' tips (z = 15.69) come
// out through the cross beam's far face.
const CORNER_FACE = -6.2, CORNER_END_HOLE = 3.21, CORNER_PIN_TIP = 15.69;

export const WHEEL_HOLES = [3, 15];         // rear and front wheel axles: twelve holes apart
export const GEAR_HOLES = [3, 6, 9, 12, 15]; // a 36T meets a 36T three holes away
export const MOTOR_HOLE = 3;                // the motor turns the rear wheel's axle, behind the Brain
export const BRAIN_HOLES = [6, 13];         // the Brain's eight side holes
export const STANDOFF_HOLES = [7, 13];      // bottom row, clear of the idler axles at 6, 9 and 12
const INNER_RAIL = 66.4;                    // centre z of the inner rails (their corners' pins: cross beam holes 5 and 14)
const OUTER_RAIL = 111.4;                   // centre z of the outer rails (their corners' pins: the cross beams' end holes)
const BRAIN_RAIL = INNER_RAIL - BEAM / 2 - 19.05 - BEAM / 2; // a 1.5x standoff's gap inside the inner rail

// What a builder does, in order. Every part is tagged with the step it arrives in.
// The Brain comes first: its standoffs point sideways, so the inner rails have to be pushed onto
// them before the cross beams make the frame rigid.
export const STEPS = ["brain", "frame", "motors", "gears", "wheels", "outer"];

export function modularDriveBase() {
  const build = new Build();
  const stepOf = new Map();
  const tag = (handles, step) => { for (const handle of [handles].flat()) stepOf.set(handle.index, step); return handles; };
  const wheels = [];
  const axleInfo = []; // { handle, step, wheel, side, outerFace }
  const corners = [];

  // A 2x20 standing on edge, holes counting along `along` from `first`, rows going down.
  const beam = (id, first, along, normal) => {
    for (const facing of [normal, normal.clone().negate()]) {
      const handle = build.grid(id, { first, along, normal: facing });
      if (handle.hole(0, 1).y < handle.hole(0, 0).y) return handle;
      build.parts.pop();
    }
    throw new Error(`no way to stand the ${id} with its rows going down`);
  };
  const rail = (id, firstHole, z) => beam(id, [holeX(firstHole), TOP_ROW, z], X, Z);

  // The cross beams sit just past the rails' ends, where the corners' pins reach them.
  const frontX = holeX(19) - CORNER_END_HOLE + CORNER_PIN_TIP - BEAM / 2;
  const backX = holeX(0) + CORNER_END_HOLE - CORNER_PIN_TIP + BEAM / 2;
  const cross = {
    front: tag(beam("beam-2x20", [frontX, TOP_ROW, crossZ(0)], Z, X), "frame"),
    back: tag(beam("beam-2x20", [backX, TOP_ROW, crossZ(0)], Z, X), "frame"),
  };

  // A corner connector on `railHandle`'s face toward `away` (a unit z direction), at the `end`
  // (+1 front, -1 back), its pins in the cross beam there.
  const corner = (railHandle, railZ, away, end, step) => {
    const along = new THREE.Vector3(end, 0, 0);
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(
      new THREE.Vector3().crossVectors(away, along), away, along));
    const endHole = holeX(end > 0 ? 19 : 0);
    const middle = (TOP_ROW + BOTTOM_ROW) / 2;
    const face = railZ + away.z * BEAM / 2;
    const target = new THREE.Vector3(endHole, middle, face);
    const local = new THREE.Vector3(0, CORNER_FACE, CORNER_END_HOLE).applyQuaternion(quaternion);
    const handle = tag(build.add("corner-2x2", target.sub(local), quaternion), step);
    const crossHandle = end > 0 ? cross.front : cross.back;
    const crossCores = build.cores(crossHandle).filter((core) => core.bore === "round" && Math.abs(core.axis.x) > 0.98);
    handle.studs = holesFor(handle.meta).filter((hole) => hole.kind === "stud").map((stud) => {
      const tip = new THREE.Vector3(...stud.p).applyMatrix4(handle.matrix);
      const hole = crossCores.sort((first, second) => first.center.distanceTo(tip) - second.center.distanceTo(tip))[0];
      if (hole.center.distanceTo(tip) > 4.5) throw new Error(`a corner pin misses the cross beam's holes by ${hole.center.distanceTo(tip).toFixed(1)} mm`);
      build.lines.push({ point: hole.center.clone(), axis: X.clone(), reach: 8 });
      return [stud.core, crossHandle.index, hole.core];
    });
    corners.push({ handle, railHandle, step });
    return handle;
  };

  const brain = tag(build.add("robot-brain", [0, 0, 0]), "brain");
  const pods = [];
  for (const side of [1, -1]) {
    const outward = new THREE.Vector3(0, 0, side), inward = new THREE.Vector3(0, 0, -side);
    const innerZ = side * INNER_RAIL, outerZ = side * OUTER_RAIL;
    const inner = tag(rail("beam-2x20", 0, innerZ), "frame");
    for (const end of [1, -1]) corner(inner, innerZ, inward, end, "frame");

    // The Brain's beams, and the standoffs that hold them off the inner rail.
    const brainRail = tag(rail("beam-2x8", BRAIN_HOLES[0], side * BRAIN_RAIL), "brain");
    for (const index of STANDOFF_HOLES) {
      const center = new THREE.Vector3(holeX(index), BOTTOM_ROW, side * (BRAIN_RAIL + INNER_RAIL) / 2);
      const standoff = tag(build.add("standoff-15x", center, new THREE.Quaternion()), "brain");
      // A standoff's length is its own z: it lies along Z as placed.
      standoff.studs = holesFor(standoff.meta).filter((hole) => hole.kind === "stud").map((stud) => {
        const tip = new THREE.Vector3(...stud.p).applyMatrix4(standoff.matrix);
        const target = tip.z * side > Math.abs(center.z) ? inner : brainRail;
        const hole = build.cores(target).filter((core) => core.bore === "round" && Math.abs(core.axis.z) > 0.98)
          .sort((first, second) => first.center.distanceTo(tip) - second.center.distanceTo(tip))[0];
        return [stud.core, target.index, hole.core];
      });
      build.lines.push({ point: center, axis: Z.clone(), reach: 20 });
    }

    // The gear train against the inner rail's outside face, the wheels against the outer rail.
    const innerFace = side * (INNER_RAIL - BEAM / 2);      // inside face of the inner rail
    const podInnerFace = side * (INNER_RAIL + BEAM / 2);   // the inner rail's face toward the gears
    const outerFace = side * (OUTER_RAIL + BEAM / 2);      // outside face of the outer rail: the robot's side
    const outerInside = side * (OUTER_RAIL - BEAM / 2);
    const gearZ = podInnerFace + side * LAYER / 2;
    const wheelZ = outerInside - side * 12.7;
    const span = Math.abs(outerFace - innerFace);
    const gears = [];
    let motor = null;
    for (const index of GEAR_HOLES) {
      const through = new THREE.Vector3(holeX(index), BOTTOM_ROW, innerFace);
      const isWheel = WHEEL_HOLES.includes(index), isMotor = index === MOTOR_HOLE;
      if (isMotor) {
        // The motor stands inside the robot, its axle out through the inner rail.
        motor = tag(build.motor({ socket: through.clone().addScaledVector(inward, 0.125), out: outward, body: Y }), "motors");
        const axle = tag(build.axle({ through, axis: outward, from: -5, to: span, motor: true }), "motors");
        axleInfo.push({ handle: axle, step: "motors", wheel: isWheel, side, outerFace });
      } else {
        const axle = tag(build.axle({ through, axis: outward, from: -1, to: span + 1 }), "gears");
        axleInfo.push({ handle: axle, step: "gears", wheel: isWheel, side, outerFace });
      }
      gears.push(tag(build.spinner("gear-36t", { center: [holeX(index), BOTTOM_ROW, gearZ], axis: outward }), "gears"));
      if (isWheel) {
        const wheel = tag(build.spinner("wheel-omni-200", { center: [holeX(index), BOTTOM_ROW, wheelZ], axis: outward }), "wheels");
        wheels.push({ side, index, wheel });
      }
    }

    const outer = tag(rail("beam-2x20", 0, outerZ), "outer");
    for (const end of [1, -1]) corner(outer, outerZ, outward, end, "outer");
    pods.push({ side, inner, outer, brainRail, motor, gears });
  }

  // Pins last, so none goes where an axle, standoff or corner pin already is.
  for (const { handle, railHandle, step } of corners) tag(build.join(handle, railHandle, { count: 2 }), step);
  for (const { brainRail, motor, inner } of pods) {
    tag(build.join(brain, brainRail, { count: 2 }), "brain");
    // Standing up, the motor meets a 2-row rail at one pin hole; its axle through the rail is the second hold.
    tag(build.join(motor, inner, { count: 1 }), "motors");
  }

  const before = build.parts.length;
  const saved = build.toSaved();
  // Collars the finishing pass added go on in the order a builder can reach them: inside the robot
  // with their axle, in the pod beside the gears (a collar outboard of a gear can't go on before
  // it), and outside the outer rail after that rail.
  for (let index = before; index < build.parts.length; index++) {
    const position = new THREE.Vector3().setFromMatrixPosition(build.parts[index].matrix);
    const nearest = axleInfo.map((info) => {
      const center = new THREE.Vector3().setFromMatrixPosition(info.handle.matrix);
      return { info, distance: Math.hypot(position.x - center.x, position.y - center.y) };
    }).sort((first, second) => first.distance - second.distance)[0].info;
    const reach = Math.abs(position.z);
    stepOf.set(index, reach > Math.abs(nearest.outerFace) ? "outer" : reach > INNER_RAIL ? "gears" : nearest.step);
  }
  const rightSide = wheels.filter((entry) => entry.side === 1).sort((first, second) => first.index - second.index);
  return {
    build, saved, stepOf, axles: axleInfo, cross, corners,
    expect: { moves: wheels.map((entry) => entry.wheel.index), ratio: [rightSide[0].wheel.index, rightSide[1].wheel.index, 1] },
  };
}

export default [{
  slug: "drive-modular-gear-train",
  name: "Modular drive base: 2x20 frame, gear train to four omni wheels",
  blurb: "A ladder frame of 2x20 beams with a motor inside on each side. The motor turns the rear wheel, and five 36T gears "
    + "carry the turn to the front wheel. The front and back cross beams and the side walls are mounting zones any mechanism can pin onto.",
  category: "drive bases", difficulty: 2, motors: 2, principle: "gear train drivetrain",
  games: ["Squared Away", "Rise Above", "Pitching In", "Slapshot", "Full Volume", "Rapid Relay", "Mix & Match"],
  make: () => { const { saved, expect } = modularDriveBase(); return { saved, expect }; },
}];
