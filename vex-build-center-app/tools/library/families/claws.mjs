// Claws: two gears that mesh always turn opposite ways, so a finger pinned to each one closes
// toward the other. The motor's 12T slows the first gear down so the claw grips hard.
import { tower, motorAxle, frameAxle, at, Y, Z } from "../frame.mjs";

const apart = (first, second) => (first + second) / 24;
const CLAW_GAMES = ["Squared Away", "Mix & Match", "Rise Above"];

function claw({ gear, finger, wide }) {
  return () => {
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const leftHole = [motorHole[0] + apart(12, gear), 2];
    const rightHole = [leftHole[0] + apart(gear, gear), 2];
    motorAxle(build, motorHole, 1);
    build.spinner("gear-12t", { center: at(...motorHole, 1) });
    const left = build.spinner(`gear-${gear}t`, { center: at(...leftHole, 1) });
    const right = build.spinner(`gear-${gear}t`, { center: at(...rightHole, 1) });
    frameAxle(build, leftHole, 2);
    frameAxle(build, rightHole, 2);
    // Each finger stands up from its gear's axle and is pinned through the gear one hole up.
    const fingerId = wide ? `beam-2x${finger}` : `beam-1x${finger}`;
    const leftFinger = build.grid(fingerId, { first: at(...leftHole, 2), along: Y, normal: Z });
    const rightFinger = build.grid(fingerId, { first: at(...rightHole, 2), along: Y, normal: Z.clone().negate() });
    build.join(left, leftFinger, { count: 1 });
    build.join(right, rightFinger, { count: 1 });
    return { saved: build.toSaved(), expect: { moves: [leftFinger.index, rightFinger.index], ratio: [leftFinger.index, rightFinger.index, -1], seconds: 0.3 } };
  };
}

const entries = [];
for (const gear of [36, 60]) {
  for (const finger of [4, 5, 6, 8, 10]) {
    for (const wide of [false, true]) {
      if (wide && finger > 8) continue;
      entries.push({
        slug: `claw-${gear}-${wide ? "wide-" : ""}${finger}`,
        name: `Gear claw: ${gear}T gears, ${wide ? "wide " : ""}${finger}-hole fingers`,
        blurb: `Two ${gear}T gears mesh, so they always turn opposite ways and the fingers close together. `
          + (gear === 60 ? "Big gears put the fingers far apart: a wide grab." : "Small gears put the fingers close: a tight grab for small game pieces."),
        category: "claws", difficulty: 2, motors: 1, principle: "meshing gears turn opposite ways",
        games: CLAW_GAMES,
        make: claw({ gear, finger, wide }),
      });
    }
  }
}
export default entries;
