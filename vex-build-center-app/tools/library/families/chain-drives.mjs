// Chain drives: two sprockets and a loop of chain carry turning a long way, the same way round,
// with the ratio set by the sprockets' teeth just as with gears.
import { tower, motorAxle, frameAxle, at, PITCH } from "../frame.mjs";
import { sprocketPitchRadius } from "../../../src/lib/mechanism.ts";

const SIZES = [8, 16, 24, 32, 40];
const holesFor = (teeth) => sprocketPitchRadius(teeth) / PITCH;

// The shortest whole number of holes that leaves a gap between the two sprockets, plus `extra`.
const spacing = (driver, driven, extra) => Math.ceil(holesFor(driver) + holesFor(driven) + 0.6) + extra;

function drive(driver, driven, extra, link) {
  return () => {
    const motorHole = [1, 3];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const outputHole = [1 + spacing(driver, driven, extra), 3];
    if (outputHole[0] > 11) throw new Error("the sprockets do not fit on the plate");
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`sprocket-${driver}t`, { center: at(...motorHole, 1) });
    frameAxle(build, outputHole, 1);
    const output = build.spinner(`sprocket-${driven}t`, { center: at(...outputHole, 1) });
    build.chain([input, output], { link });
    return { saved: build.toSaved(), expect: { ratio: [input.index, output.index, driver / driven], moves: [output.index] } };
  };
}

function describe(driver, driven) {
  if (driver === driven) return `Two ${driver}T sprockets: the chain carries the motor's turning across at the same speed and the same way round.`;
  const ratio = driven / driver;
  const shown = Math.round((ratio > 1 ? ratio : 1 / ratio) * 100) / 100;
  return ratio > 1
    ? `A ${driver}T sprocket pulls the chain round a ${driven}T: ${shown}× slower and stronger, and it turns the same way as the motor.`
    : `A ${driver}T sprocket pulls the chain round a ${driven}T: ${shown}× faster, and it turns the same way as the motor.`;
}

const entries = [];
for (const driver of SIZES) {
  for (const driven of SIZES) {
    if (driver === 40 && driven === 40) continue;
    for (const extra of driver === driven ? [0, 2] : [0]) {
      if (1 + spacing(driver, driven, extra) > 11) continue;
      // A 40T in the middle of the plate rises over its top edge right where the Brain has to
      // go, with its Smart Ports facing it: no room left to plug a cable in.
      if (driven === 40 && driver > 8) continue;
      entries.push({
        slug: `chain-${driver}-${driven}${extra ? "-long" : ""}`,
        name: `Chain: ${driver}T drives ${driven}T${extra ? ", far apart" : ""}`,
        blurb: describe(driver, driven),
        category: "power", difficulty: 1, motors: 1, principle: "chain and sprocket",
        games: [],
        make: drive(driver, driven, extra, "chain-link"),
      });
    }
  }
}
export default entries;
