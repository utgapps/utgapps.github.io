// Intakes: spinning rollers that grab a game piece and pull it in, and conveyors that carry it
// up. Faster is better here, so the gears speed the rollers up instead of slowing them down.
import { tower, motorAxle, frameAxle, at, PITCH } from "../frame.mjs";
import { sprocketPitchRadius } from "../../../src/lib/mechanism.ts";

const apart = (first, second) => (first + second) / 24;
const INTAKE_GAMES = ["Slapshot", "Full Volume", "Rapid Relay", "Pitching In"];
const ROLLERS = [
  { id: "wheel-smooth-160", name: "smooth 160 mm wheels", layers: 3, across: 50.5 },
  { id: "wheel-low-friction-160", name: "low-friction 160 mm wheels", layers: 3, across: 50.5 },
  { id: "wheel-200", name: "200 mm wheels", layers: 4, across: 63.7 },
  { id: "wheel-ant-86", name: "small knobby wheels", layers: 3, across: 86 },
  { id: "wheel-ant-96", name: "big knobby wheels", layers: 5, across: 96 },
];
// The wheels start out past layer 2, clear of the gears and of the motor axle's spare length,
// which pokes out of the gear on layer 1 (in a wheel's hub hole it would lock the roller).
const firstRollerLayer = (roller) => 3.5 + roller.layers / 2;

// Roller wheels along an axle through `hole`, starting clear of the gears.
function rollersOn(build, hole, roller, count) {
  const placed = [];
  for (let index = 0; index < count; index++) {
    const layer = firstRollerLayer(roller) + index * (roller.layers + 1);
    placed.push(build.spinner(roller.id, { center: at(...hole, layer) }));
  }
  const last = firstRollerLayer(roller) + (count - 1) * (roller.layers + 1) + roller.layers / 2;
  return { placed, lastLayer: last };
}

// One roller on its own axle, sped up from the motor by `driver`:12.
function singleRoller(roller, count, driver) {
  return () => {
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const rollerHole = [motorHole[0] + apart(driver, 12), 2];
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`gear-${driver}t`, { center: at(...motorHole, 1) });
    build.spinner("gear-12t", { center: at(...rollerHole, 1) });
    const { placed, lastLayer } = rollersOn(build, rollerHole, roller, count);
    frameAxle(build, rollerHole, lastLayer);
    return { saved: build.toSaved(), expect: { moves: placed.map((wheel) => wheel.index), ratio: [input.index, placed[0].index, -driver / 12] } };
  };
}

// Two rollers geared together so they spin opposite ways and pull a piece in between them.
function pinchRollers(roller, count) {
  return () => {
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const lowerHole = [motorHole[0] + apart(12, 60), 2];
    const upperHole = [lowerHole[0] + apart(60, 60), 2];
    motorAxle(build, motorHole, 1);
    build.spinner("gear-12t", { center: at(...motorHole, 1) });
    build.spinner("gear-60t", { center: at(...lowerHole, 1) });
    build.spinner("gear-60t", { center: at(...upperHole, 1) });
    const first = rollersOn(build, lowerHole, roller, count), second = rollersOn(build, upperHole, roller, count);
    frameAxle(build, lowerHole, first.lastLayer);
    frameAxle(build, upperHole, second.lastLayer);
    return { saved: build.toSaved(), expect: { moves: [first.placed[0].index, second.placed[0].index], ratio: [first.placed[0].index, second.placed[0].index, -1] } };
  };
}

// A chain loop from the motor's sprocket up to a roller sprocket: a conveyor that lifts pieces.
function conveyor(sprocket, rows, link) {
  return () => {
    const bottom = [2, 1], top = [2, 1 + rows];
    const { build } = tower({ plate: "plate-6x12", motorHole: bottom });
    motorAxle(build, bottom, 1);
    const lower = build.spinner(`sprocket-${sprocket}t`, { center: at(...bottom, 1) });
    frameAxle(build, top, 1);
    const upper = build.spinner(`sprocket-${sprocket}t`, { center: at(...top, 1) });
    build.chain([lower, upper], { link });
    return { saved: build.toSaved(), expect: { moves: [upper.index], ratio: [lower.index, upper.index, 1] } };
  };
}

const entries = [];
for (const roller of ROLLERS) {
  // Two of the big knobby wheels reach too far out on an axle held only by the frame.
  for (const count of roller.layers >= 5 ? [1] : [1, 2]) {
    for (const driver of [12, 36]) {
      entries.push({
        slug: `roller-${roller.id}-${count}-${driver === 12 ? "direct" : "fast"}`,
        name: `Roller intake: ${count === 1 ? "one" : "two"} ${roller.name}${driver === 36 ? ", 3× fast" : ""}`,
        blurb: `${count === 1 ? "A spinning wheel" : "Two spinning wheels on one axle"} grab a game piece and pull it in. `
          + (driver === 36 ? "A 36T on the motor drives a 12T on the roller, so the roller spins 3× faster than the motor." : "The motor drives the roller through two 12T gears, at the motor's own speed."),
        category: "intakes", difficulty: 1, motors: 1, principle: "rolling contact",
        games: INTAKE_GAMES,
        make: singleRoller(roller, count, driver),
      });
    }
  }
  // Two 60T gears hold the rollers 63.5 mm apart: only wheels smaller than that fit side by side.
  if (roller.across <= 64) {
    for (const count of [1, 2]) {
      entries.push({
        slug: `pinch-${roller.id}-${count}`,
        name: `Pinch rollers: ${count === 1 ? "one" : "two"} pairs of ${roller.name}`,
        blurb: "Two 60T gears mesh, so the two rollers spin opposite ways and pull a game piece in through the gap between them.",
        category: "intakes", difficulty: 2, motors: 1, principle: "counter-rotating rollers",
        games: INTAKE_GAMES,
        make: pinchRollers(roller, count),
      });
    }
  }
}
for (const sprocket of [8, 16, 24]) {
  for (const rows of [2, 3, 4]) {
    if (rows * PITCH < 2 * sprocketPitchRadius(sprocket) + 8) continue;
    for (const link of ["chain-link", "tread-link"]) {
      entries.push({
        slug: `conveyor-${sprocket}-${rows}-${link === "chain-link" ? "chain" : "tread"}`,
        name: `${link === "chain-link" ? "Chain" : "Tread"} conveyor: ${sprocket}T sprockets, ${rows} holes tall`,
        blurb: `A loop of ${link === "chain-link" ? "chain" : "tank tread"} runs from the motor's sprocket up to another one. `
          + "Anything resting against it is carried up, like an escalator for game pieces.",
        category: "intakes", difficulty: 1, motors: 1, principle: "chain and sprocket",
        games: INTAKE_GAMES,
        make: conveyor(sprocket, rows, link),
      });
    }
  }
}
export default entries;
