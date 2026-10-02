// Linkages: a gear turning round and round, and beams pinned to it that turn that into a swing
// back and forth (a crank and rocker), or a push in and out (a crank and slider-like pusher).
import * as THREE from "three";
import { tower, motorAxle, frameAxle, at, PITCH, LAYER, X, Z } from "../frame.mjs";

// Where two circles cross, the crossing above the line between their centres (in XY).
function crossing(firstCenter, firstRadius, secondCenter, secondRadius, upper = true) {
  const gap = secondCenter.clone().sub(firstCenter);
  const distance = Math.hypot(gap.x, gap.y);
  const along = (firstRadius ** 2 - secondRadius ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(firstRadius ** 2 - along ** 2);
  if (!Number.isFinite(height)) throw new Error("the beams cannot reach each other");
  const unit = new THREE.Vector3(gap.x / distance, gap.y / distance, 0);
  const side = new THREE.Vector3(-unit.y, unit.x, 0).multiplyScalar(upper ? 1 : -1);
  return firstCenter.clone().addScaledVector(unit, along).addScaledVector(side, height);
}

// Crank: a 60T on its own axle, driven by the motor's 12T. The crank pin goes through the gear's
// hole `crank` holes from its middle. The coupler (layer 2) runs from that pin to the rocker's
// tip; the rocker (layer 3) swings on an axle through the frame at `rockerPivot`.
function crankRocker({ crank, coupler, rocker, rockerPivot }) {
  return () => {
    const crankCenter = [4, 2];
    const motorHole = [1, 2];
    const { build } = tower({ plate: "plate-6x12", motorHole });
    motorAxle(build, motorHole, 1);
    const input = build.spinner("gear-12t", { center: at(...motorHole, 1) });
    frameAxle(build, crankCenter, 1);
    const wheel = build.spinner("gear-60t", { center: at(...crankCenter, 1), turn: Math.PI / 2 });
    const crankPin = at(crankCenter[0], crankCenter[1] + crank, 2);
    const pivot = at(...rockerPivot, 3);
    const tip = crossing(crankPin.clone().setZ(pivot.z), coupler * PITCH, pivot, rocker * PITCH, true);
    const couplerBeam = build.beam(`beam-1x${coupler + 1}`, { first: crankPin, toward: tip.clone().setZ(crankPin.z), normal: Z });
    const rockerBeam = build.beam(`beam-1x${rocker + 1}`, { first: pivot, toward: tip, normal: Z });
    build.hinge(wheel, couplerBeam, { near: crankPin });
    build.hinge(couplerBeam, rockerBeam, { near: tip.clone().setZ(crankPin.z + LAYER / 2) });
    frameAxle(build, rockerPivot, 3);
    return { saved: build.toSaved(), expect: { moves: [couplerBeam.index, rockerBeam.index], seconds: 2 } };
  };
}

// Grashof: with the crank the shortest link and shortest + longest <= the other two, the crank
// goes all the way round and the rocker swings.
const grashof = ({ crank, coupler, rocker, rockerPivot }) => {
  const ground = Math.hypot(rockerPivot[0] - 4, rockerPivot[1] - 2);
  const lengths = [crank, coupler, rocker, ground].sort((a, b) => a - b);
  return lengths[0] === crank && lengths[0] + lengths[3] < lengths[1] + lengths[2] - 0.3;
};

const VARIANTS = [];
for (const crank of [1, 2]) {
  for (const coupler of [4, 5, 6, 7]) {
    for (const rocker of [3, 4, 5]) {
      for (const rockerPivot of [[9, 2], [10, 2], [9, 1]]) {
        const variant = { crank, coupler, rocker, rockerPivot };
        if (grashof(variant)) VARIANTS.push(variant);
      }
    }
  }
}

export default VARIANTS.filter((_, index) => index % 2 === 0).slice(0, 16).map((variant) => ({
  slug: `crank-rocker-${variant.crank}-${variant.coupler}-${variant.rocker}-${variant.rockerPivot.join("-")}`,
  name: `Crank and rocker: ${variant.crank}-hole crank, ${variant.coupler}-hole link, ${variant.rocker}-hole rocker`,
  blurb: `The gear goes round and round, and the pin ${variant.crank} hole${variant.crank > 1 ? "s" : ""} out from its middle drags the link. The rocker can only swing back and forth. `
    + "A longer crank makes a bigger swing. Use it for a waving arm, a flapper or a pusher.",
  category: "linkages", difficulty: 2, motors: 1, principle: "four-bar linkage (crank-rocker)",
  games: ["Slapshot", "Pitching In"],
  make: crankRocker(variant),
}));
