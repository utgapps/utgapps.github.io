import * as THREE from "three";

// Whether two solid things overlap: parts, the cables between them, the strands of a rubber
// band. Beams, plates and motors are boxes; gears, wheels, sprockets and spacers are round, so a
// gear that turns does not sweep its square corners through its neighbours; a cable or a band
// strand is a thin tube along a line. Any two of these are tested the same way (GJK: the two
// overlap when the shape made of every difference between their points contains the origin).

export const COLLIDE_SLOP = 1.4; // mm trimmed off each part before it counts as touching: flush faces and snug pins do not

const ROUND = new Set(["gear", "sprocket", "wheel", "spacer"]);
type PartLike = { id: string; category: string; sizeMM: number[] };
export const isRound = (part: PartLike) => ROUND.has(part.category) || part.id.startsWith("ratchet-");

export interface Shape {
  center: THREE.Vector3; // middle of a sphere the shape fits in
  reach: number;         // that sphere's radius
  /** The point of the shape farthest along `direction`, written into `out`. */
  support(direction: THREE.Vector3, out: THREE.Vector3): THREE.Vector3;
}

const scratch = new THREE.Vector3();

/** A part's solid, placed by its world matrix and trimmed by `slop` mm all round. */
export class PartShape implements Shape {
  center = new THREE.Vector3();
  reach = 0;
  private axes = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  private half: number[];
  private round: number; // which axis a round part turns about, or -1 for a box
  private radius = 0;

  constructor(part: PartLike, matrix: THREE.Matrix4, slop = COLLIDE_SLOP) {
    const size = part.sizeMM;
    this.round = isRound(part) ? size.indexOf(Math.min(...size)) : -1;
    this.half = size.map((length) => Math.max(0.1, length / 2 - slop));
    if (this.round >= 0) {
      const across = [0, 1, 2].filter((index) => index !== this.round).map((index) => this.half[index]);
      this.radius = Math.max(...across);
      this.reach = Math.hypot(this.radius, this.half[this.round]);
    } else {
      this.reach = Math.hypot(...this.half);
    }
    this.place(matrix);
  }

  place(matrix: THREE.Matrix4): this {
    const elements = matrix.elements;
    for (let index = 0; index < 3; index++) this.axes[index].set(elements[index * 4], elements[index * 4 + 1], elements[index * 4 + 2]).normalize();
    this.center.set(elements[12], elements[13], elements[14]);
    return this;
  }

  support(direction: THREE.Vector3, out: THREE.Vector3): THREE.Vector3 {
    out.copy(this.center);
    if (this.round < 0) {
      for (let index = 0; index < 3; index++) out.addScaledVector(this.axes[index], Math.sign(direction.dot(this.axes[index])) * this.half[index]);
      return out;
    }
    const axis = this.axes[this.round];
    const along = direction.dot(axis);
    out.addScaledVector(axis, Math.sign(along) * this.half[this.round]);
    scratch.copy(direction).addScaledVector(axis, -along);
    const length = scratch.length();
    if (length > 1e-9) out.addScaledVector(scratch, this.radius / length);
    return out;
  }
}

/** A thin round rod from `start` to `end`: a stretch of cable, or of a band. */
export class Rod implements Shape {
  center = new THREE.Vector3();
  reach: number;
  start: THREE.Vector3; end: THREE.Vector3; radius: number;
  constructor(start: THREE.Vector3, end: THREE.Vector3, radius: number) {
    this.start = start; this.end = end; this.radius = radius;
    this.center.addVectors(start, end).multiplyScalar(0.5);
    this.reach = start.distanceTo(end) / 2 + radius;
  }
  support(direction: THREE.Vector3, out: THREE.Vector3): THREE.Vector3 {
    out.copy(scratch.subVectors(this.end, this.start).dot(direction) > 0 ? this.end : this.start);
    const length = direction.length();
    if (length > 1e-9) out.addScaledVector(direction, this.radius / length);
    return out;
  }
}

/** A point, grown to a ball: for asking whether a spot is free. */
export class Ball implements Shape {
  center: THREE.Vector3; reach: number;
  constructor(center: THREE.Vector3, reach: number) { this.center = center; this.reach = reach; }
  support(direction: THREE.Vector3, out: THREE.Vector3): THREE.Vector3 {
    const length = direction.length();
    return out.copy(this.center).addScaledVector(direction, length > 1e-9 ? this.reach / length : 0);
  }
}

// ---- GJK -----------------------------------------------------------------------------------

const pointA = new THREE.Vector3(), pointB = new THREE.Vector3(), negated = new THREE.Vector3();
function minkowski(first: Shape, second: Shape, direction: THREE.Vector3): THREE.Vector3 {
  first.support(direction, pointA);
  second.support(negated.copy(direction).negate(), pointB);
  return new THREE.Vector3().subVectors(pointA, pointB);
}
const cross = (first: THREE.Vector3, second: THREE.Vector3) => new THREE.Vector3().crossVectors(first, second);
// (first × second) × first: the direction square to `first`, toward `second`.
const tripleToward = (first: THREE.Vector3, second: THREE.Vector3) => cross(cross(first, second), first);

/** Do the two shapes overlap? */
export function overlaps(first: Shape, second: Shape): boolean {
  if (first.center.distanceTo(second.center) > first.reach + second.reach) return false;
  const direction = new THREE.Vector3().subVectors(second.center, first.center);
  if (direction.lengthSq() < 1e-12) direction.set(1, 0, 0);
  // Newest point first.
  let simplex: THREE.Vector3[] = [minkowski(first, second, direction)];
  direction.copy(simplex[0]).negate();
  for (let iteration = 0; iteration < 48; iteration++) {
    if (direction.lengthSq() < 1e-14) return true; // the origin is on the simplex: they touch
    const point = minkowski(first, second, direction);
    if (point.dot(direction) < 0) return false;  // nothing reaches past the origin that way
    simplex = [point, ...simplex];
    const next = nearOrigin(simplex, direction);
    if (next === null) return true;
    simplex = next;
  }
  return true;
}

// Cut the simplex down to the part nearest the origin and point `direction` at the origin from
// there. Returns null when the simplex (a tetrahedron) holds the origin.
function nearOrigin(simplex: THREE.Vector3[], direction: THREE.Vector3): THREE.Vector3[] | null {
  const [a, b, c, d] = simplex;
  const toOrigin = a.clone().negate();
  if (simplex.length === 2) return line(a, b, toOrigin, direction);
  if (simplex.length === 3) return triangle(a, b, c, toOrigin, direction);
  const ab = b.clone().sub(a), ac = c.clone().sub(a), ad = d.clone().sub(a);
  if (cross(ab, ac).dot(toOrigin) > 0) return triangle(a, b, c, toOrigin, direction);
  if (cross(ac, ad).dot(toOrigin) > 0) return triangle(a, c, d, toOrigin, direction);
  if (cross(ad, ab).dot(toOrigin) > 0) return triangle(a, d, b, toOrigin, direction);
  return null;
}

function line(a: THREE.Vector3, b: THREE.Vector3, toOrigin: THREE.Vector3, direction: THREE.Vector3): THREE.Vector3[] {
  const ab = b.clone().sub(a);
  if (ab.dot(toOrigin) > 0) { direction.copy(tripleToward(ab, toOrigin)); return [a, b]; }
  direction.copy(toOrigin);
  return [a];
}

function triangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, toOrigin: THREE.Vector3, direction: THREE.Vector3): THREE.Vector3[] {
  const ab = b.clone().sub(a), ac = c.clone().sub(a);
  const face = cross(ab, ac);
  if (cross(face, ac).dot(toOrigin) > 0) {
    if (ac.dot(toOrigin) > 0) { direction.copy(tripleToward(ac, toOrigin)); return [a, c]; }
    return line(a, b, toOrigin, direction);
  }
  if (cross(ab, face).dot(toOrigin) > 0) return line(a, b, toOrigin, direction);
  if (face.dot(toOrigin) > 0) { direction.copy(face); return [a, b, c]; }
  direction.copy(face).negate();
  return [a, c, b];
}

/** Rods along a polyline, one per stretch. */
export function rodsAlong(points: THREE.Vector3[], radius: number, closed = false): Rod[] {
  const rods: Rod[] = [];
  const count = closed ? points.length : points.length - 1;
  for (let index = 0; index < count; index++) rods.push(new Rod(points[index], points[(index + 1) % points.length], radius));
  return rods;
}
