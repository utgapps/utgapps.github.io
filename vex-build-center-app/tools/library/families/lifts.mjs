// Lifts: an arm turned by a gear, slowed down so the motor has the strength to raise it, and the
// four-bar that keeps whatever is on the end level as it goes up.
import { tower, motorAxle, frameAxle, at, LAYER, X, Y, Z } from "../frame.mjs";

const apart = (first, second) => (first + second) / 24;
export const LIFT_GAMES = ["Squared Away", "Rise Above", "Mix & Match"];

// The motor's small gear drives the big gear at `pivot`. Returns the big gear and the input gear.
// The big gear is on layer 1 for one stage, layer 2 for two; the arm goes on the layer after.
function gearDown(build, pivot, stages) {
  if (stages.length === 1) {
    const [driver, driven] = stages[0];
    const motorHole = [pivot[0] - apart(driver, driven), pivot[1]];
    const input = build.spinner(`gear-${driver}t`, { center: at(...motorHole, 1) });
    return { motorHole, input, output: build.spinner(`gear-${driven}t`, { center: at(...pivot, 1) }), armLayer: 2 };
  }
  // Two stages in a row: motor, middle axle, pivot.
  const [[firstDriver, firstDriven], [secondDriver, secondDriven]] = stages;
  const middle = [pivot[0] - apart(secondDriver, secondDriven), pivot[1]];
  const motorHole = [middle[0] - apart(firstDriver, firstDriven), middle[1]];
  const input = build.spinner(`gear-${firstDriver}t`, { center: at(...motorHole, 1) });
  frameAxle(build, middle, 2);
  build.spinner(`gear-${firstDriven}t`, { center: at(...middle, 1) });
  build.spinner(`gear-${secondDriver}t`, { center: at(...middle, 2) });
  return { motorHole, input, output: build.spinner(`gear-${secondDriven}t`, { center: at(...pivot, 2) }), armLayer: 3 };
}

export const REDUCTIONS = [
  { key: "3to1", stages: [[12, 36]], label: "3:1", difficulty: 1 },
  { key: "5to1", stages: [[12, 60]], label: "5:1", difficulty: 1 },
  { key: "9to1", stages: [[12, 36], [12, 36]], label: "9:1", difficulty: 2 },
  { key: "15to1", stages: [[12, 36], [12, 60]], label: "15:1", difficulty: 2 },
];
const ratioOf = (stages) => stages.reduce((product, [driver, driven]) => product * (driven / driver), 1);

// `attach` may put something on the end of the arm: it gets the build, the arm, the layer just in
// front of the arm, and the arm's last hole, and returns the part that must move with it.
export function singleArm(reduction, armLength, attach) {
  return () => {
    const pivot = [6, 4];
    const { build, frameHoleMotor } = startTower(pivot, reduction.stages);
    const { input, output, armLayer, motorHole } = frameHoleMotor;
    // The arm's first hole goes over the big gear's axle; one pin through the gear beside the
    // axle locks them, since the axle and the pin are two different lines.
    const arm = build.grid(`beam-1x${armLength}`, { first: at(...pivot, armLayer), along: X, normal: Z });
    build.join(output, arm, { count: 1 });
    const carried = attach ? attach(build, arm, armLayer + 1, [pivot[0] + armLength - 1, pivot[1]]) : null;
    const turns = 1 / ratioOf(reduction.stages);
    return { saved: build.toSaved(), expect: { moves: carried ? [arm.index, carried.index] : [arm.index], ratio: [input.index, arm.index, reduction.stages.length === 1 ? -turns : turns] } };
  };
}

// A tower with the motor in place for the gear-down that turns `pivot`.
function startTower(pivot, stages) {
  const motorHoleFor = stages.length === 1
    ? [pivot[0] - apart(...stages[0]), pivot[1]]
    : [pivot[0] - apart(...stages[0]) - apart(...stages[1]), pivot[1]];
  const { build } = tower({ plate: "plate-6x12", motorHole: motorHoleFor });
  motorAxle(build, motorHoleFor, 1);
  const frameHoleMotor = gearDown(build, pivot, stages);
  frameAxle(build, pivot, frameHoleMotor.armLayer);
  return { build, frameHoleMotor };
}

// A parallelogram: the driven lower arm and a free upper arm, the same length, joined at their
// ends by an upright that stays upright however high the arms go.
// `attach` is as for singleArm, given the upright and its top hole; what it adds must stay level.
export function fourBar(reduction, armLength, height, attach) {
  return () => {
    const lower = [6, 1];
    const upper = [6, 1 + height];
    const { build, frameHoleMotor } = startTower(lower, reduction.stages);
    const { output, armLayer } = frameHoleMotor;
    const lowerArm = build.grid(`beam-1x${armLength}`, { first: at(...lower, armLayer), along: X, normal: Z });
    build.join(output, lowerArm, { count: 1 });
    const upperArm = build.grid(`beam-1x${armLength}`, { first: at(...upper, armLayer), along: X, normal: Z });
    frameAxle(build, upper, armLayer);
    const end = armLength - 1;
    const upright = build.grid(`beam-1x${height + 2}`, { first: at(lower[0] + end, lower[1] - 1, armLayer + 1), along: Y, normal: Z });
    build.hinge(lowerArm, upright, { near: at(lower[0] + end, lower[1], armLayer + 1) });
    build.hinge(upperArm, upright, { near: at(upper[0] + end, upper[1], armLayer + 1) });
    const carried = attach ? attach(build, upright, armLayer + 2, [lower[0] + end, lower[1] - 1 + height + 1]) : null;
    return { saved: build.toSaved(), expect: { moves: [upright.index], level: carried ? carried.index : upright.index, seconds: 0.4 * ratioOf(reduction.stages) / 5 } };
  };
}

const entries = [];
for (const reduction of REDUCTIONS) {
  for (const armLength of [6, 8, 10, 12, 16]) {
    entries.push({
      slug: `arm-lift-${reduction.key}-${armLength}`,
      name: `Arm lift, ${reduction.label}, ${armLength}-hole arm`,
      blurb: `The motor's 12T turns a big gear ${reduction.label} slower, and the arm is pinned to that gear. `
        + (armLength >= 12 ? "A long arm reaches high but is heavy to lift, so it needs the slow, strong gearing." : "A short arm is light and quick."),
      category: "lifts", difficulty: reduction.difficulty, motors: 1, principle: "gear reduction for torque",
      games: LIFT_GAMES,
      make: singleArm(reduction, armLength),
    });
  }
}
// A rubber band from a post at the top corner of the frame to a post on the arm pulls the arm up,
// so the motor only has to hold part of its weight. The arm is short enough to swing clear of
// the frame's post.
const bandAssist = (build, arm, frontLayer) => {
  const frame = build.parts[0];
  const top = build.post(frame, { near: at(10, 5, 0), out: Z, id: "standoff-2x" });
  // The first arm hole the gear's pin is not already in.
  for (const column of [7, 8, 9]) {
    const onArm = build.post(arm, { near: at(column, 4, frontLayer - 1), out: Z, id: "standoff-1x" });
    if (!build.clips(onArm, new Set([arm]))) { build.band("rubber-band-32", [top, onArm]); return onArm; }
    build.parts.pop();
  }
  throw new Error("every hole on the arm is taken");
};
for (const reduction of REDUCTIONS) {
  entries.push({
    slug: `band-assisted-arm-${reduction.key}`,
    name: `Rubber band assisted arm, ${reduction.label}`,
    blurb: `A #32 rubber band, wrapped round two standoffs until it is snug, pulls the arm up while the motor's 12T turns it ${reduction.label} slower. `
      + "The band carries part of the arm's weight, so the motor lifts more before it stalls.",
    category: "lifts", difficulty: reduction.difficulty + 1, motors: 1, principle: "a stretched band stores energy",
    games: LIFT_GAMES,
    make: singleArm(reduction, 4, bandAssist),
  });
}
for (const reduction of REDUCTIONS.slice(1)) {
  for (const armLength of [6, 8, 10]) {
    for (const height of [3, 4]) {
      entries.push({
        slug: `four-bar-${reduction.key}-${armLength}-${height}`,
        name: `Four-bar lift, ${reduction.label}, ${armLength}-hole arms, ${height} holes apart`,
        blurb: "Two arms the same length, one above the other, joined by an upright. As they lift, the upright never tilts, so a claw or tray on it stays level.",
        category: "lifts", difficulty: reduction.difficulty + 1, motors: 1, principle: "parallel linkage",
        games: LIFT_GAMES,
        make: fourBar(reduction, armLength, height),
      });
    }
  }
}
export default entries;
