// Gear trains: how a pair of gears trades speed for turning force, why an idler gear keeps the
// direction, and how two stages multiply.
import { tower, motorAxle, frameAxle, at, LAYER } from "../frame.mjs";

const PAIRS = [
  [12, 36], [12, 60], [36, 12], [60, 12], [24, 48], [48, 24], [12, 12], [24, 24], [36, 36], [48, 48], [60, 60], [36, 60], [60, 36],
];

// Holes between two meshing gears' middles.
const apart = (first, second) => (first + second) / 24;

function describe(driver, driven) {
  if (driver === driven) return "Same size: the same speed, the other way round.";
  const ratio = driven / driver;
  const shown = Math.round((ratio > 1 ? ratio : 1 / ratio) * 100) / 100;
  return ratio > 1
    ? `The ${driven}T turns ${shown}× slower than the ${driver}T and pushes ${shown}× harder.`
    : `The ${driven}T turns ${shown}× faster than the ${driver}T, with less push.`;
}

function pair(driver, driven) {
  return () => {
    const motorHole = [1, 3];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const outputHole = [1 + apart(driver, driven), 3];
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`gear-${driver}t`, { center: at(...motorHole, 1) });
    frameAxle(build, outputHole, 1);
    const output = build.spinner(`gear-${driven}t`, { center: at(...outputHole, 1) });
    return { saved: build.toSaved(), expect: { ratio: [input.index, output.index, -driver / driven], moves: [output.index] } };
  };
}

function idler(driver, middle, driven) {
  return () => {
    const motorHole = [1, 3];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const middleHole = [1 + apart(driver, 36), 3], outputHole = [middleHole[0] + apart(36, driven), 3];
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`gear-${driver}t`, { center: at(...motorHole, 1) });
    frameAxle(build, middleHole, 1);
    build.spinner(middle, { center: at(...middleHole, 1) });
    frameAxle(build, outputHole, 1);
    const output = build.spinner(`gear-${driven}t`, { center: at(...outputHole, 1) });
    return { saved: build.toSaved(), expect: { ratio: [input.index, output.index, driver / driven], moves: [output.index] } };
  };
}

// Two stages: the first pair on layer 1, the second on layer 2, sharing the middle axle.
function compound([firstDriver, firstDriven], [secondDriver, secondDriven]) {
  return () => {
    const motorHole = [1, 3];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const middleHole = [1 + apart(firstDriver, firstDriven), 3];
    // The output axle crosses the first stage's layer, so it must clear both first-stage gears:
    // carry on along the row when that stays on the plate and clear, otherwise straight down or up.
    const reach = apart(secondDriver, secondDriven);
    const clears = (hole) => [[motorHole, firstDriver], [middleHole, firstDriven]].every(([gearHole, teeth]) => Math.hypot(hole[0] - gearHole[0], hole[1] - gearHole[1]) > teeth / 24 + 0.25);
    const outputHole = [[middleHole[0] + reach, 3], [middleHole[0], 3 - reach], [middleHole[0], 3 + reach]].find((hole) => hole[0] <= 11 && hole[1] >= 0 && hole[1] <= 5 && clears(hole));
    if (!outputHole) throw new Error("the second stage has nowhere to go");
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`gear-${firstDriver}t`, { center: at(...motorHole, 1) });
    frameAxle(build, middleHole, 2);
    build.spinner(`gear-${firstDriven}t`, { center: at(...middleHole, 1) });
    build.spinner(`gear-${secondDriver}t`, { center: at(...middleHole, 2) });
    frameAxle(build, outputHole, 2);
    const output = build.spinner(`gear-${secondDriven}t`, { center: at(...outputHole, 2) });
    const ratio = (firstDriver / firstDriven) * (secondDriver / secondDriven);
    return { saved: build.toSaved(), expect: { ratio: [input.index, output.index, ratio], moves: [output.index] } };
  };
}

const COMPOUNDS = [
  [[12, 36], [12, 36]], [[12, 60], [12, 60]], [[12, 36], [12, 60]], [[12, 36], [24, 48]],
  [[36, 12], [36, 12]], [[24, 48], [24, 48]], [[12, 36], [36, 60]],
];

export default [
  ...PAIRS.map(([driver, driven]) => ({
    slug: `gear-pair-${driver}-${driven}`,
    name: `${driver}T drives ${driven}T`,
    blurb: describe(driver, driven),
    category: "power", difficulty: 1, motors: 1, principle: "gear ratio",
    games: [],
    make: pair(driver, driven),
  })),
  ...[[12, 12], [12, 36], [36, 12], [12, 60], [60, 12]].map(([driver, driven]) => ({
    slug: `gear-idler-${driver}-${driven}`,
    name: `${driver}T to ${driven}T through an idler`,
    blurb: `A 36T idler gear in the middle: the ${driven}T now turns the SAME way as the ${driver}T. The idler changes direction, never the ratio.`,
    category: "power", difficulty: 1, motors: 1, principle: "idler gear",
    games: [],
    make: idler(driver, "gear-36t-idler", driven),
  })),
  ...COMPOUNDS.map(([first, second]) => {
    const ratio = (first[1] / first[0]) * (second[1] / second[0]);
    const shown = Math.round((ratio > 1 ? ratio : 1 / ratio) * 100) / 100;
    return {
      slug: `gear-compound-${first.join("-")}-${second.join("-")}`,
      name: `Compound ${first[0]}:${first[1]} then ${second[0]}:${second[1]}`,
      blurb: `Two gears on one axle make two stages, and the ratios multiply: ${shown}× ${ratio > 1 ? "slower and stronger" : "faster"}.`,
      category: "power", difficulty: 2, motors: 1, principle: "compound gear ratio",
      games: [],
      make: compound(first, second),
    };
  }),
];
