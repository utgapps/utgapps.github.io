// The tower most mechanisms hang on: two plates standing up, one behind the other at layers 0
// and -1 so every axle through the frame is held in two places and cannot tip, with a Smart
// Motor pinned flat against the back and its axle coming out toward you. The Robot Brain is
// pinned behind the top of the frame once everything else is in place.
import { Build, at, LAYER, PITCH, X, Y, Z } from "./assembler.mjs";

const FRAME_BACK = -3.05 - LAYER; // the back face of the back plate

/**
 * A Build with a standing plate whose first hole is lattice (0, 0), and a motor whose socket
 * sits behind hole `motorHole`. The motor's body reaches toward `motorBody` (default down, so its pins stand above and below the socket and leave the row free).
 */
export function tower({ plate = "plate-6x12", along = X, motorHole = [1, 1], motorBody = Y.clone().negate() } = {}) {
  const build = new Build();
  const frame = build.grid(plate, { first: at(0, 0), along, normal: Z });
  const back = build.grid(plate, { first: at(0, 0, -1), along, normal: Z });
  build.join(frame, back, { count: 4 });
  const socket = at(...motorHole).setZ(FRAME_BACK);
  const motor = build.motor({ socket, out: Z, body: motorBody });
  build.join(motor, back);
  build.brainBehind = { plate: back, motor };
  return { build, frame, back, motor, socket };
}

/** The motor's own axle, from inside the socket out to the front of layer `lastLayer`. */
export function motorAxle(build, motorHole, lastLayer) {
  return build.axle({ through: at(...motorHole), from: FRAME_BACK - 5, to: lastLayer * LAYER + LAYER / 2, motor: true });
}

/** A free axle through the frame at `hole`, out to the front of layer `lastLayer`. */
export function frameAxle(build, hole, lastLayer, firstLayer = 0) {
  const from = firstLayer > 0 ? firstLayer * LAYER - LAYER / 2 - 1 : FRAME_BACK - 1;
  return build.axle({ through: at(...hole), from, to: lastLayer * LAYER + LAYER / 2 + 1 });
}

export { at, LAYER, PITCH, X, Y, Z };
