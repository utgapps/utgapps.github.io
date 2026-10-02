// The tower most mechanisms hang on: a plate standing up at layer 0, with a Smart Motor
// pinned flat against its back and its axle coming out toward you.
import { Build, at, LAYER, PITCH, X, Y, Z } from "./assembler.mjs";

const FRAME_BACK = -3.05; // the back face of a layer-0 plate

/**
 * A Build with a standing plate whose first hole is lattice (0, 0), and a motor whose socket
 * sits behind hole `motorHole`. The motor's body reaches toward `motorBody` (default down, so its pins stand above and below the socket and leave the row free).
 */
export function tower({ plate = "plate-6x12", along = X, motorHole = [1, 1], motorBody = Y.clone().negate() } = {}) {
  const build = new Build();
  const frame = build.grid(plate, { first: at(0, 0), along, normal: Z });
  const socket = at(...motorHole).setZ(FRAME_BACK);
  const motor = build.motor({ socket, out: Z, body: motorBody });
  build.join(motor, frame);
  return { build, frame, motor, socket };
}

/** The motor's own axle, from inside the socket out to the front of layer `lastLayer`. */
export function motorAxle(build, motorHole, lastLayer) {
  return build.axle({ through: at(...motorHole), from: FRAME_BACK - 5, to: lastLayer * LAYER + LAYER / 2, motor: true });
}

/** A free axle through the frame at `hole`, out to the front of layer `lastLayer`. */
export function frameAxle(build, hole, lastLayer, firstLayer = 0) {
  return build.axle({ through: at(...hole), from: firstLayer * LAYER - LAYER / 2 - 1, to: lastLayer * LAYER + LAYER / 2 + 1 });
}

export { at, LAYER, PITCH, X, Y, Z };
