// Launchers: a heavy wheel spun up fast stores energy and flings a ball that touches it. The gears
// speed it up; a second wheel spinning the other way grips the ball from both sides.
import { tower, motorAxle, frameAxle, at } from "../frame.mjs";

const apart = (first, second) => (first + second) / 24;
const LAUNCH_GAMES = ["Full Volume", "Rapid Relay", "Pitching In"];
const WHEELS = [
  { id: "flywheel", name: "flywheel", layers: 1, across: 76 },
  { id: "wheel-smooth-160", name: "160 mm smooth wheel", layers: 3, across: 50.5 },
  { id: "wheel-200", name: "200 mm wheel", layers: 4, across: 63.7 },
  { id: "wheel-250", name: "250 mm wheel", layers: 4, across: 79.6 },
];
// Out past layer 2, clear of the gears and the motor axle's spare length.
const wheelLayer = (wheel) => 3.5 + wheel.layers / 2;

function single(wheel, driver) {
  return () => {
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const wheelHole = [motorHole[0] + apart(driver, 12), 2];
    motorAxle(build, motorHole, 1);
    const input = build.spinner(`gear-${driver}t`, { center: at(...motorHole, 1) });
    build.spinner("gear-12t", { center: at(...wheelHole, 1) });
    const spinning = build.spinner(wheel.id, { center: at(...wheelHole, wheelLayer(wheel)) });
    frameAxle(build, wheelHole, wheelLayer(wheel) + wheel.layers / 2);
    return { saved: build.toSaved(), expect: { moves: [spinning.index], ratio: [input.index, spinning.index, -driver / 12] } };
  };
}

// Two wheels side by side spinning opposite ways: the motor's 60T speeds up a 12T on layer 2,
// and a 60T on that axle meshes with a 60T beside it on layer 1. (The other way round, the
// motor axle's spare length would poke into the 60T.)
function double(wheel) {
  return () => {
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    const firstHole = [motorHole[0] + apart(60, 12), 2];
    const secondHole = [firstHole[0] + apart(60, 60), 2];
    motorAxle(build, motorHole, 2);
    build.spinner("gear-60t", { center: at(...motorHole, 2) });
    build.spinner("gear-12t", { center: at(...firstHole, 2) });
    build.spinner("gear-60t", { center: at(...firstHole, 1) });
    build.spinner("gear-60t", { center: at(...secondHole, 1) });
    const layer = wheelLayer(wheel) + 1;
    const first = build.spinner(wheel.id, { center: at(...firstHole, layer) });
    const second = build.spinner(wheel.id, { center: at(...secondHole, layer) });
    frameAxle(build, firstHole, layer + wheel.layers / 2);
    frameAxle(build, secondHole, layer + wheel.layers / 2);
    return { saved: build.toSaved(), expect: { moves: [first.index, second.index], ratio: [first.index, second.index, -1] } };
  };
}

const entries = [];
for (const wheel of WHEELS) {
  for (const driver of [12, 36, 60]) {
    const speed = driver / 12;
    entries.push({
      slug: `flywheel-${wheel.id}-${speed}x`,
      name: `Flywheel launcher: ${wheel.name}, ${speed === 1 ? "motor speed" : `${speed}× fast`}`,
      blurb: `A ${driver}T on the motor drives a 12T on the ${wheel.name}${speed > 1 ? `, so it spins ${speed}× faster than the motor` : ""}. `
        + "A ball pushed against the spinning wheel gets flung away. Faster and heavier wheels throw farther.",
      category: "launchers", difficulty: speed > 3 ? 2 : 1, motors: 1, principle: "stored spinning energy",
      games: LAUNCH_GAMES,
      make: single(wheel, driver),
    });
  }
  if (wheel.across <= 64) {
    entries.push({
      slug: `double-flywheel-${wheel.id}`,
      name: `Double flywheel: two ${wheel.name}s`,
      blurb: "Two wheels spin opposite ways, 5× faster than the motor. A ball fed between them is gripped on both sides and shot straight out.",
      category: "launchers", difficulty: 3, motors: 1, principle: "counter-rotating wheels",
      games: LAUNCH_GAMES,
      make: double(wheel),
    });
  }
}
export default entries;
