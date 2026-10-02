// Stand-ins for VEX IQ parts that are not in the CAD library (VEX-IQ-All-Parts-2024-11-08.zip):
// omni and mecanum wheels, the 2nd-generation Brain, the Optical and AI Vision sensors, and the
// pneumatics kit. Each is drawn from simple shapes at the real part's size, with its pin holes
// and axle bore on the same pitch grid as the real one, so it builds and connects like the real
// part even though it does not look exactly like it.
//   node tools/make-substitutes.mjs
//
// Writes public/parts/<id>.json and adds or replaces the parts' entries in the manifest. Run it
// again after tools/convert-parts.cjs, which rewrites the manifest from the zip.
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { readFileSync, writeFileSync } from "node:fs";

const PITCH = 12.7;
const here = new URL(".", import.meta.url);
const partsDir = new URL("../public/parts/", here);
const manifestUrl = new URL("manifest.json", partsDir);
const manifest = JSON.parse(readFileSync(manifestUrl, "utf8"));
const realPart = (id) => manifest.parts.find((part) => part.id === id && !part.substitute);

// ---- shapes -------------------------------------------------------------------------------

const box = (width, height, depth, at = [0, 0, 0]) => new THREE.BoxGeometry(width, height, depth).translate(...at);
// A cylinder whose axis runs along local `axis` ("x", "y" or "z").
function cylinder(radius, length, axis, at = [0, 0, 0], segments = 28) {
  const shape = new THREE.CylinderGeometry(radius, radius, length, segments);
  if (axis === "x") shape.rotateZ(Math.PI / 2);
  if (axis === "z") shape.rotateX(Math.PI / 2);
  return shape.translate(...at);
}
// A hub with a ring of pin holes' worth of bosses, shared by the omni and mecanum wheels.
function wheelHub(radius, width) {
  return [cylinder(radius, width * 0.86, "z", [0, 0, 0], 32), cylinder(radius * 0.55, width, "z", [0, 0, 0], 24)];
}
// One barrel-shaped roller: the parts of an omni or mecanum wheel that touch the floor.
function roller(length, radius) {
  const outline = [];
  for (let step = 0; step <= 8; step++) {
    const along = -length / 2 + (length * step) / 8;
    outline.push(new THREE.Vector2(radius * (0.62 + 0.38 * Math.cos((along / length) * Math.PI)), along));
  }
  outline.unshift(new THREE.Vector2(0, -length / 2));
  outline.push(new THREE.Vector2(0, length / 2));
  return new THREE.LatheGeometry(outline, 14);
}

// Rollers around the rim. `tilt` is the angle between each roller and the wheel's axle: 90 degrees
// for an omni wheel (the rollers run around the rim), 45 for mecanum.
function rollers({ count, rows, radius, rollerRadius, rollerLength, width, tilt }) {
  const pieces = [];
  for (let row = 0; row < rows; row++) {
    const z = rows === 1 ? 0 : (row - (rows - 1) / 2) * (width / rows);
    for (let index = 0; index < count; index++) {
      const angle = ((index + (row % 2) * 0.5) / count) * Math.PI * 2;
      const piece = roller(rollerLength, rollerRadius);
      // The lathe's axis is local y. Lay it along the rim's direction of travel, then lean it.
      piece.rotateZ(Math.PI / 2);                      // along x
      piece.rotateY(-(Math.PI / 2 - tilt));            // lean toward the axle
      piece.translate(0, radius - rollerRadius, z);
      piece.rotateZ(angle);
      pieces.push(piece);
    }
  }
  return pieces;
}

// Through-holes along local z at each [x, y], on both faces of a part `thickness` thick.
const throughZ = (thickness, spots) => spots.flatMap(([x, y]) => [
  { p: [x, y, thickness / 2], axis: [0, 0, 1], kind: "hole" },
  { p: [x, y, -thickness / 2], axis: [0, 0, -1], kind: "hole" },
]);

// ---- the parts ----------------------------------------------------------------------------

const WHEEL_DIAMETER = 63.66, WHEEL_WIDTH = 25.4; // 200 mm travel, like the 200 mm Travel Wheel
const wheelPins = [[-6.35, -6.35], [6.35, -6.35], [-6.35, 6.35], [6.35, 6.35]];
const wheelHoles = throughZ(WHEEL_WIDTH, [[0, 0], ...wheelPins]);

function mecanum(side) {
  return {
    id: `wheel-mecanum-200-${side}`, name: `200mm Mecanum Wheel, ${side} (stand-in)`, category: "wheel",
    sizeMM: [WHEEL_DIAMETER, WHEEL_DIAMETER, WHEEL_WIDTH], holes: wheelHoles,
    shapes: () => [
      ...wheelHub(21, WHEEL_WIDTH),
      cylinder(24, 2, "z", [0, 0, WHEEL_WIDTH / 2 - 1]), cylinder(24, 2, "z", [0, 0, -WHEEL_WIDTH / 2 + 1]),
      ...rollers({ count: 10, rows: 1, radius: WHEEL_DIAMETER / 2, rollerRadius: 5.4, rollerLength: 27, width: WHEEL_WIDTH, tilt: (side === "left" ? 1 : -1) * Math.PI / 4 }),
    ],
  };
}

const brain = realPart("robot-brain");
const color = realPart("sensor-color");
const distance = realPart("sensor-distance");

const SUBSTITUTES = [
  {
    id: "wheel-omni-200", name: "200mm Omni Wheel (stand-in)", category: "wheel",
    sizeMM: [WHEEL_DIAMETER, WHEEL_DIAMETER, WHEEL_WIDTH], holes: wheelHoles,
    shapes: () => [
      ...wheelHub(22, WHEEL_WIDTH),
      ...rollers({ count: 9, rows: 2, radius: WHEEL_DIAMETER / 2, rollerRadius: 5, rollerLength: 13, width: WHEEL_WIDTH * 0.92, tilt: Math.PI / 2 }),
    ],
  },
  mecanum("left"),
  mecanum("right"),
  {
    // Same footprint, holes and Smart Port layout as the 1st-generation Brain.
    id: "robot-brain-2", name: "Robot Brain, 2nd gen (stand-in)", category: "brain",
    sizeMM: brain.sizeMM, holes: brain.holes,
    shapes: () => {
      const [width, height, depth] = brain.sizeMM;
      const ports = [-32, -18, -4, 10, 24, 38].flatMap((x) => [1, -1].map((side) => box(10, 9, 2, [x, 7, side * (depth / 2 + 0.5)])));
      return [
        box(width - 4, height - 4, depth - 4), box(width, height - 10, depth - 8), box(width - 8, height - 10, depth),
        box(width * 0.62, 1.5, depth * 0.58, [-6, height / 2 - 1.2, 0]),             // the screen
        cylinder(5.5, 2.4, "y", [width / 2 - 14, height / 2 - 1, 0]),               // the check button
        box(9, 1.6, 6, [width / 2 - 14, height / 2 - 1, -16]), box(9, 1.6, 6, [width / 2 - 14, height / 2 - 1, 16]),
        ...ports,
      ];
    },
  },
  {
    // The Color Sensor's footprint and holes: mounting face down (-y), lens up (+y).
    id: "sensor-optical", name: "Optical Sensor (stand-in)", category: "sensor",
    sizeMM: color.sizeMM, holes: color.holes,
    shapes: () => {
      const [width, height, depth] = color.sizeMM;
      return [box(width, height - 3, depth, [0, -1.5, 0]), cylinder(8, 3, "y", [0, height / 2 - 1.5, 0]), cylinder(4, 1, "y", [0, height / 2, 0])];
    },
  },
  {
    // The Distance Sensor's footprint and holes, with a camera on top.
    id: "sensor-ai-vision", name: "AI Vision Sensor (stand-in)", category: "sensor",
    sizeMM: distance.sizeMM, holes: distance.holes,
    shapes: () => {
      const [width, height, depth] = distance.sizeMM;
      return [
        box(width, height - 3, depth, [0, -1.5, 0]), cylinder(7.5, 3, "y", [-6, height / 2 - 1.5, 0]),
        cylinder(3.5, 1, "y", [-6, height / 2, 0]), cylinder(2, 2, "y", [12, height / 2 - 1, -5]), cylinder(2, 2, "y", [12, height / 2 - 1, 5]),
      ];
    },
  },
  {
    // A double-acting cylinder: base clevis on the left, rod clevis on the right, 5 holes apart.
    id: "pneumatic-cylinder", name: "Pneumatic Cylinder (stand-in)", category: "pneumatic",
    sizeMM: [6 * PITCH, PITCH, PITCH], holes: throughZ(PITCH, [[-2.5 * PITCH, 0], [2.5 * PITCH, 0]]),
    shapes: () => [
      box(PITCH, PITCH, PITCH, [-2.5 * PITCH, 0, 0]),
      cylinder(5.6, 3 * PITCH, "x", [-0.5 * PITCH, 0, 0]),
      cylinder(1.6, 1.6 * PITCH, "x", [1.5 * PITCH, 0, 0], 12),
      box(PITCH, PITCH * 0.8, PITCH, [2.5 * PITCH, 0, 0]),
      cylinder(1.6, 5, "y", [-1.5 * PITCH, 6, 0], 10), cylinder(1.6, 5, "y", [0.5 * PITCH, 6, 0], 10), // air fittings
    ],
  },
  {
    // The air pump. It plugs into the solenoid, not the Brain.
    id: "pneumatic-pump", name: "Pneumatic Pump (stand-in)", category: "pneumatic",
    sizeMM: [3 * PITCH, 2 * PITCH, 2 * PITCH], holes: throughZ(2 * PITCH, [[-PITCH, -PITCH / 2], [PITCH, -PITCH / 2], [0, -PITCH / 2]]),
    shapes: () => [
      box(3 * PITCH, PITCH, 2 * PITCH, [0, -PITCH / 2, 0]),
      cylinder(PITCH * 0.9, 2.6 * PITCH, "x", [0, PITCH / 2, 0]),
      cylinder(1.6, 5, "y", [PITCH, PITCH + 1, 0], 10),
    ],
  },
  {
    id: "pneumatic-tank", name: "Air Tank (stand-in)", category: "pneumatic",
    sizeMM: [5 * PITCH, 2 * PITCH, PITCH], holes: throughZ(PITCH, [[-2 * PITCH, -PITCH / 2], [-PITCH, -PITCH / 2], [PITCH, -PITCH / 2], [2 * PITCH, -PITCH / 2]]),
    shapes: () => [
      box(5 * PITCH, PITCH * 0.5, PITCH, [0, -PITCH * 0.75, 0]),
      cylinder(PITCH * 0.5, 4.4 * PITCH, "x", [0, PITCH / 2, 0]),
      new THREE.SphereGeometry(PITCH * 0.5, 20, 12).translate(-2.2 * PITCH, PITCH / 2, 0),
      new THREE.SphereGeometry(PITCH * 0.5, 20, 12).translate(2.2 * PITCH, PITCH / 2, 0),
      cylinder(1.6, 5, "x", [2.8 * PITCH, PITCH / 2, 0], 10),
    ],
  },
  {
    // Switches the air to up to two cylinders. Its Smart Port is on the back face (-z), like a sensor's.
    id: "pneumatic-solenoid", name: "Pneumatic Solenoid (stand-in)", category: "pneumatic",
    sizeMM: [3 * PITCH, 2 * PITCH, PITCH], holes: throughZ(PITCH, [[-PITCH, -PITCH / 2], [0, -PITCH / 2], [PITCH, -PITCH / 2]]),
    shapes: () => [
      box(3 * PITCH, 2 * PITCH, PITCH),
      ...[-PITCH, -PITCH / 3, PITCH / 3, PITCH].map((x) => cylinder(1.6, 5, "y", [x, PITCH + 2, 0], 10)),
      box(10, 9, 2, [0, PITCH / 2, -PITCH / 2 - 0.5]),
    ],
  },
];

// ---- write -------------------------------------------------------------------------------

const base64 = (array) => Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("base64");
for (const part of SUBSTITUTES) {
  const pieces = part.shapes().map((piece) => (piece.index ? piece : piece.setIndex([...Array(piece.attributes.position.count).keys()])));
  for (const piece of pieces) for (const name of Object.keys(piece.attributes)) if (name !== "position" && name !== "normal") piece.deleteAttribute(name);
  const merged = mergeGeometries(pieces);
  merged.computeBoundingBox();
  // Centre on the bounding box and scale to the real part's size, so the holes land where they should.
  const size = merged.boundingBox.getSize(new THREE.Vector3()), centre = merged.boundingBox.getCenter(new THREE.Vector3());
  merged.translate(-centre.x, -centre.y, -centre.z);
  merged.scale(part.sizeMM[0] / size.x, part.sizeMM[1] / size.y, part.sizeMM[2] / size.z);
  merged.computeVertexNormals();
  const position = new Float32Array(merged.attributes.position.array);
  const normal = new Float32Array(merged.attributes.normal.array);
  const index = new Uint32Array(merged.index.array);
  const round = (value) => Math.round(value * 100) / 100;
  writeFileSync(new URL(`${part.id}.json`, partsDir), JSON.stringify({
    id: part.id, name: part.name, category: part.category, sizeMM: part.sizeMM.map(round),
    vertexCount: position.length / 3, position: base64(position), normal: base64(normal), index: base64(index),
  }));
  const entry = { id: part.id, name: part.name, category: part.category, sizeMM: part.sizeMM.map(round), tris: index.length / 3, substitute: true, holes: part.holes };
  const existing = manifest.parts.findIndex((candidate) => candidate.id === part.id);
  if (existing >= 0) manifest.parts[existing] = entry; else manifest.parts.push(entry);
  console.log(`${part.id}: ${index.length / 3} triangles, ${part.holes.length} hole faces`);
}
writeFileSync(manifestUrl, JSON.stringify(manifest, null, 1) + "\n");
