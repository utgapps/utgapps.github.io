// The modular drive base: one standard base that every mechanism can be pinned onto, in the
// spirit of the Hero Bot's (2x20 beams on all four sides, the motors inside, a gear train turning
// both wheels on each side), but designed here from its holes up.
//
// The frame is a ladder: two 2x20 cross beams, one across the front and one across the back,
// and four 2x20 rails running front to back, joined to the cross beams by 2x2 corner connectors.
// Each side is a "pod" of two rails: the inner rail, and the outer rail that is the robot's side
// wall. Between them, a row of gears and two omni wheels. The motor sits inside the robot and
// turns one gear in the row; the row passes the turn to both wheels. With an odd number of gears
// the 1st and the last turn the same way, so both wheels drive forward together. (An even number
// would not work: the wheels would fight.) The Brain sits between two short beams, held off the
// inner rails by standoffs.
//
// A design (DESIGNS below) chooses how far apart the gears are, which one the motor turns, how
// many teeth it has, and what strengthens the frame. Two gears mesh when their teeth add up to
// 24 for each hole between them, so along a row the gears alternate between the motor's size and
// the size that makes up that sum. With the motor on a gear that is not a wheel's, the wheels'
// gears are the other size, and swapping both sizes changes the ratio without moving an axle.
//
// X is forward, Y up, and Z to the robot's right. Frame holes count 0 (back) to 19 (front).
import * as THREE from "three";
import { Build, LAYER, PITCH, X, Y, Z } from "../assembler.mjs";
import { holesFor } from "../../../src/lib/holes.ts";

const BRAIN_HOLE_X = -41.8;     // x of the Brain's rearmost side hole (the Brain sits at the origin)
const TOP_ROW = -9.5;           // y of the Brain's side holes: every beam's top row
const BOTTOM_ROW = TOP_ROW - PITCH;
const BEAM = 6.1;               // a beam's thickness
// Cross beam holes, counted across from the robot's left (0) to its right (19).
export const crossZ = (index) => (index - 9.5) * PITCH;

// The 2x2 corner connector, in its own frame: its two built-in pins point along +z, the four
// holes of its flat flange along y. The flange's back face (y = -6.2) lies on a rail; the hole
// column nearest the pins (z = 3.2) is the rail's end hole, and the pins' tips (z = 15.69) come
// out through the cross beam's far face.
const CORNER_FACE = -6.2, CORNER_END_HOLE = 3.21, CORNER_PIN_TIP = 15.69;

const WHEEL_HOLES = [3, 15];  // rear and front wheel axles: twelve holes apart
const INNER_RAIL = 66.4;      // centre z of the inner rails (their corners' pins: cross beam holes 5 and 14)
const OUTER_RAIL = 111.4;     // centre z of the outer rails (their corners' pins: the cross beams' end holes)
const BRAIN_RAIL = INNER_RAIL - BEAM / 2 - 19.05 - BEAM / 2; // a 1.5x standoff's gap inside the inner rail

// What a builder does, in order. Every part is tagged with the step it arrives in.
// The Brain comes first: its standoffs point sideways, so the inner rails have to be pushed onto
// them before the cross beams make the frame rigid.
export const STEPS = ["brain", "frame", "motors", "gears", "wheels", "outer"];

// The base the step-by-step page shows: the motor on the rear wheel's axle, five 36T gears.
export const CURRENT = {
  spacing: 3, motorHole: 3, motorTeeth: 36, brainFirst: 6, standoffHoles: [7, 13],
  bumpers: false, doubleWalls: false, tiedPods: false, extraPins: false,
};

// The five candidates for a base whose ratio can be changed. In each, the motor turns the 2nd
// gear of the row on its own axle, behind the Brain, so the wheels' gears are a different size
// from the motor's whenever the motor's is not the middle size.
const RATIO_BASE = { ...CURRENT, motorHole: 6, brainFirst: 8, standoffHoles: [8, 14] };
export const DESIGNS = [
  { key: "swap", ...RATIO_BASE,
    title: "Swap-Ratio Ladder", ratios: [36, 24, 48] },
  { key: "bumper", ...RATIO_BASE, bumpers: true, extraPins: true,
    title: "Bumper Ladder", ratios: [36, 24, 48] },
  { key: "armored", ...RATIO_BASE, doubleWalls: true, extraPins: true,
    title: "Armored Sides", ratios: [36, 24, 48] },
  { key: "tied", ...RATIO_BASE, tiedPods: true,
    title: "Tied Pods", ratios: [36, 24, 48] },
  { key: "fortress", ...RATIO_BASE, bumpers: true, doubleWalls: true, tiedPods: true,
    title: "Fortress", ratios: [36, 24, 48] },
];

export function modularDriveBase(design = CURRENT) {
  const { spacing, motorHole, motorTeeth, brainFirst, standoffHoles } = design;
  const holeX = (index) => BRAIN_HOLE_X + (index - brainFirst) * PITCH;
  const gearHoles = [];
  for (let hole = WHEEL_HOLES[0]; hole <= WHEEL_HOLES[1]; hole += spacing) gearHoles.push(hole);
  if (gearHoles[gearHoles.length - 1] !== WHEEL_HOLES[1] || gearHoles.length % 2 === 0) throw new Error(`gears ${spacing} holes apart do not make an odd row from wheel to wheel`);
  if (!gearHoles.includes(motorHole)) throw new Error(`the motor's hole ${motorHole} is not in the gear row`);
  const pairTeeth = 24 * spacing;
  const teethAt = (hole) => (Math.abs(gearHoles.indexOf(hole) - gearHoles.indexOf(motorHole)) % 2 === 0 ? motorTeeth : pairTeeth - motorTeeth);
  const wheelTeeth = teethAt(WHEEL_HOLES[0]);

  const build = new Build();
  const stepOf = new Map();
  const tag = (handles, step) => { for (const handle of [handles].flat()) stepOf.set(handle.index, step); return handles; };
  const wheels = [];
  const axleInfo = []; // { handle, step, wheel, side, outerFace, hole }
  const corners = [];
  const doubles = [];  // [extra beam, the beam it is pinned to, pins]
  const strength = new Set(); // what a design adds to the plain ladder to survive a drop
  const strong = (handles) => { for (const handle of [handles].flat()) strength.add(handle.index); return handles; };

  // A beam standing on edge, holes counting along `along` from `first`, rows going down.
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
  // Bumpers: a second 2x20 flat against each cross beam's outside, pinned all along it, so a
  // landing on either end is spread over the whole beam instead of the two corners.
  if (design.bumpers) {
    for (const [end, crossHandle, x] of [[1, cross.front, frontX], [-1, cross.back, backX]]) {
      const bumper = strong(tag(beam("beam-2x20", [x + end * BEAM, TOP_ROW, crossZ(0)], Z, X), "outer"));
      doubles.push([bumper, crossHandle, 6]);
    }
  }

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
    const brainRail = tag(rail("beam-2x8", brainFirst, side * BRAIN_RAIL), "brain");
    for (const index of standoffHoles) {
      if (gearHoles.includes(index)) throw new Error(`a standoff at hole ${index} is where an axle goes`);
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
    const wallOut = side * (OUTER_RAIL + BEAM / 2);        // outside face of the outer rail
    const outerFace = design.doubleWalls ? wallOut + side * BEAM : wallOut; // the robot's side
    const outerInside = side * (OUTER_RAIL - BEAM / 2);
    const gearZ = podInnerFace + side * LAYER / 2;
    const wheelZ = outerInside - side * 12.7;
    const span = Math.abs(outerFace - innerFace);
    const gears = [];
    let motor = null;
    for (const index of gearHoles) {
      const through = new THREE.Vector3(holeX(index), BOTTOM_ROW, innerFace);
      const isWheel = WHEEL_HOLES.includes(index), isMotor = index === motorHole;
      if (isMotor) {
        // The motor stands inside the robot, its axle out through the inner rail.
        motor = tag(build.motor({ socket: through.clone().addScaledVector(inward, 0.125), out: outward, body: Y }), "motors");
        const axle = tag(build.axle({ through, axis: outward, from: -5, to: span, motor: true }), "motors");
        axleInfo.push({ handle: axle, step: "motors", wheel: isWheel, side, outerFace, hole: index });
      } else {
        const axle = tag(build.axle({ through, axis: outward, from: -1, to: span + 1 }), "gears");
        axleInfo.push({ handle: axle, step: "gears", wheel: isWheel, side, outerFace, hole: index });
      }
      const gear = tag(build.spinner(`gear-${teethAt(index)}t`, { center: [holeX(index), BOTTOM_ROW, gearZ], axis: outward }), "gears");
      gears.push({ index, gear });
      if (isWheel) {
        const wheel = tag(build.spinner("wheel-omni-200", { center: [holeX(index), BOTTOM_ROW, wheelZ], axis: outward }), "wheels");
        wheels.push({ side, index, wheel });
      }
    }

    const outer = tag(rail("beam-2x20", 0, outerZ), "outer");
    for (const end of [1, -1]) corner(outer, outerZ, outward, end, "outer");
    // A doubled side wall: a 2x16 between the corners, so the axles go through three beams and a
    // landing on the side meets two layers.
    if (design.doubleWalls) doubles.push([strong(tag(rail("beam-2x16", 2, side * (OUTER_RAIL + BEAM)), "outer")), outer, 4]);
    // Tied pods: a 3x standoff across the pod at both rows of each end hole, so the side wall is
    // held to the inner rail by the frame itself, not only by the axles and their collars. (The
    // wheels and gears leave no room for one anywhere else.) The corners' pins then go in the
    // next holes along.
    if (design.tiedPods) {
      for (const index of [0, 19]) for (const row of [TOP_ROW, BOTTOM_ROW]) {
        const center = new THREE.Vector3(holeX(index), row, side * (INNER_RAIL + OUTER_RAIL) / 2);
        const tie = strong(tag(build.add("standoff-3x", center, new THREE.Quaternion()), "outer"));
        tie.studs = holesFor(tie.meta).filter((hole) => hole.kind === "stud").map((stud) => {
          const tip = new THREE.Vector3(...stud.p).applyMatrix4(tie.matrix);
          const target = Math.abs(tip.z) > Math.abs(center.z) ? outer : inner;
          const hole = build.cores(target).filter((core) => core.bore === "round" && Math.abs(core.axis.z) > 0.98)
            .sort((first, second) => first.center.distanceTo(tip) - second.center.distanceTo(tip))[0];
          return [stud.core, target.index, hole.core];
        });
        build.lines.push({ point: center, axis: Z.clone(), reach: 32 });
      }
    }
    pods.push({ side, inner, outer, brainRail, motor, gears });
  }

  // Pins last, so none goes where an axle, standoff or corner pin already is.
  // Extra pins: all four of a corner's flange holes, and four of the Brain's eight side holes.
  // Tied pods fill two of each corner's holes already, and get the Brain's extra pins.
  const cornerPins = design.extraPins && !design.tiedPods ? 4 : 2;
  const brainPins = design.extraPins || design.tiedPods ? 4 : 2;
  // Pins past the plain ladder's two count as strength.
  for (const { handle, railHandle, step } of corners) strong(tag(build.join(handle, railHandle, { count: cornerPins }), step).slice(2));
  for (const { brainRail, motor, inner } of pods) {
    strong(tag(build.join(brain, brainRail, { count: brainPins }), "brain").slice(2));
    // Standing up, the motor meets a 2-row rail at one pin hole; its axle through the rail is the second hold.
    tag(build.join(motor, inner, { count: 1 }), "motors");
  }
  for (const [extra, base, count] of doubles) strong(tag(build.join(extra, base, { count }), "outer"));

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
  const rightWheels = wheels.filter((entry) => entry.side === 1).sort((first, second) => first.index - second.index);
  const rightMotorGear = pods.find((pod) => pod.side === 1).gears.find((entry) => entry.index === motorHole).gear;
  // The motor's gear and the wheels' gears are an odd number of meshes apart (or none, when the
  // motor turns a wheel's axle), so the wheels turn the other way at motorTeeth / wheelTeeth.
  const meshes = gearHoles.indexOf(WHEEL_HOLES[1]) - gearHoles.indexOf(motorHole);
  const ratio = (meshes % 2 === 0 ? 1 : -1) * motorTeeth / wheelTeeth;
  return {
    build, saved, stepOf, axles: axleInfo, cross, corners, holeX, gearHoles, teethAt, wheelTeeth, ratio, strength,
    expect: {
      moves: wheels.map((entry) => entry.wheel.index),
      ratio: motorHole === WHEEL_HOLES[0] ? [rightWheels[0].wheel.index, rightWheels[1].wheel.index, 1] : [rightMotorGear.index, rightWheels[1].wheel.index, ratio],
    },
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
