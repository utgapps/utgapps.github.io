// Outtakes and grabbers on the end of a lift: a tray that tilts to slide game pieces off, a hook for hanging or pulling, and forks that stay level on a four-bar.
import { at, LAYER, X, Y, Z } from "../frame.mjs";
import { REDUCTIONS, LIFT_GAMES, singleArm, fourBar } from "./lifts.mjs";

const tray = (plate) => (build, arm, layer, [column, row]) => {
  const placed = build.grid(plate, { first: at(column - 2, row, layer), along: X, normal: Z });
  build.join(arm, placed, { count: 2 });
  return placed;
};

const hook = (build, arm, layer, [column, row]) => {
  const placed = build.byHoles("crane-hook", {
    firstHole: [0.8, -3.2, 0], first: at(column - 1, row, layer),
    secondHole: [0.9, 9.6, 0], toward: at(column, row, layer), normal: Z,
  });
  build.join(arm, placed, { count: 2 });
  return placed;
};

const forks = (build, upright, layer, [column, row]) => {
  const placed = build.byHoles("fork-lift", {
    firstHole: [-12.8, 5.9, -25.4], first: at(column, row - 2, layer),
    secondHole: [12.7, 5.9, -25.4], toward: at(column, row, layer), normal: Z,
  });
  build.join(upright, placed, { count: 2 });
  return placed;
};

const SLOW = REDUCTIONS.filter((reduction) => reduction.key === "5to1" || reduction.key === "15to1");
const entries = [];
for (const reduction of SLOW) {
  for (const armLength of [6, 8, 10]) {
    entries.push({
      slug: `hook-arm-${reduction.key}-${armLength + 2}`,
      name: `Hook arm, ${reduction.label}, ${armLength + 2}-hole arm`,
      blurb: "A hook on the end of a strong, slow arm: reach up, catch a bar or a game piece, and pull.",
      category: "outtakes", difficulty: reduction.difficulty, motors: 1, principle: "gear reduction for torque",
      games: ["Rise Above", "Squared Away", "Mix & Match"],
      make: singleArm(reduction, armLength + 2, hook),
    });
    for (const plate of ["plate-3x6", "plate-4x6"]) {
      entries.push({
        slug: `tilt-tray-${reduction.key}-${armLength}-${plate.replace("plate-", "")}`,
        name: `Tilting tray, ${reduction.label}, ${plate.replace("plate-", "")} plate on a ${armLength}-hole arm`,
        blurb: "Game pieces ride on a flat plate. Tilt it far enough and they slide off into the goal.",
        category: "outtakes", difficulty: reduction.difficulty, motors: 1, principle: "tilting slide",
        games: ["Squared Away", "Full Volume", "Mix & Match"],
        make: singleArm(reduction, armLength, tray(plate)),
      });
    }
  }
  for (const armLength of [6, 8]) {
    for (const height of [3, 4]) {
      entries.push({
        slug: `forklift-${reduction.key}-${armLength}-${height}`,
        name: `Forklift, ${reduction.label}, ${armLength}-hole arms`,
        blurb: "Forks on a four-bar lift. The four-bar keeps the forks flat all the way up, so whatever sits on them stays on.",
        category: "outtakes", difficulty: reduction.difficulty + 1, motors: 1, principle: "parallel linkage",
        games: LIFT_GAMES,
        make: fourBar(reduction, armLength, height, forks),
      });
    }
  }
}
export default entries;
