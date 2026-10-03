import * as THREE from "three";
import type { PartPose } from "./connections.ts";
import { longAxisIndex } from "./connections.ts";
import { PartShape, rodsAlong, overlaps } from "./contact.ts";
import type { PartMeta } from "./parts.ts";

// A VEX IQ rubber band, stretched around two or more posts: pins, standoffs or axles that stand
// side by side. It takes the shortest loop round them in the order you put it on, hugging each
// post on the outside, or on the inside where the loop bends in round it. A band too long for
// its posts is wrapped twice or three times, the way you would double it up by hand.

// The three sizes in the VEX IQ kit, by how far round the band is when it is not stretched.
export const BAND_SIZES: Record<string, { number: string; circumference: number }> = {
  "rubber-band-32": { number: "#32", circumference: 152 },
  "rubber-band-64": { number: "#64", circumference: 178 },
  "rubber-band-117": { number: "#117B", circumference: 356 },
};
export const isBand = (id: string) => id in BAND_SIZES;

const SNUG = 1.1;     // stretched less than this, a band hangs loose and falls off
const SNAPS = 3;      // stretched more than this, it snaps or pulls its posts out
export const MOST_WRAPS = 3;
const PARALLEL = Math.cos((12 * Math.PI) / 180);
const STRAND_GAP = 1.4; // mm between the turns of a band wrapped more than once

export type BandPost = { uid: string; name: string; center: THREE.Vector3; axis: THREE.Vector3; half: number; radius: number };

/** A part a band can go round, as a line with a thickness, or null if it is not a post. */
export function postOf(pose: PartPose): BandPost | null {
  const category = pose.meta.category;
  if (category !== "pin" && category !== "standoff" && category !== "shaft") return null;
  const long = longAxisIndex(pose.meta);
  const elements = pose.matrixWorld.elements;
  return {
    uid: pose.uid, name: pose.meta.name,
    center: new THREE.Vector3().setFromMatrixPosition(pose.matrixWorld),
    axis: new THREE.Vector3(elements[long * 4], elements[long * 4 + 1], elements[long * 4 + 2]).normalize(),
    half: pose.meta.sizeMM[long] / 2,
    // a standoff is square, 6.35 mm across; a pin's barrel is round; an axle is a thin square
    radius: category === "standoff" ? 3.3 : category === "pin" ? 2.4 : 2,
  };
}

export type BandShape = {
  strands: THREE.Vector3[][]; // one closed loop per turn round the posts
  path: number;               // mm once round the posts
  wraps: number;
  stretch: number;            // how many times its own length the band is pulled to
  bent: boolean;              // it bends in round a post instead of going straight past
  problems: string[];
};

/**
 * How a band of `circumference` lies on `posts` (in the order it goes round them), in the plane
 * square to the first post `along` mm from its middle.
 */
export function shapeBand(name: string, circumference: number, posts: BandPost[], along: number): BandShape {
  const problems: string[] = [];
  const empty: BandShape = { strands: [], path: 0, wraps: 1, stretch: 0, bent: false, problems };
  if (posts.length < 2) { problems.push(`The ${name} needs two posts to stretch between.`); return empty; }
  const normal = posts[0].axis.clone();
  const origin = posts[0].center.clone().addScaledVector(normal, along);
  // Where each post crosses the band's plane.
  const centers: THREE.Vector3[] = [];
  for (const post of posts) {
    const facing = post.axis.dot(normal);
    if (Math.abs(facing) < PARALLEL) {
      problems.push(`The ${name} is on posts that point different ways. Put it round posts that stand side by side.`);
      return empty;
    }
    const reach = origin.clone().sub(post.center).dot(normal) / facing;
    if (Math.abs(reach) > post.half - 1) problems.push(`The ${name} would slip off the end of the ${post.name}. Slide it onto the middle of the post.`);
    centers.push(post.center.clone().addScaledVector(post.axis, reach));
  }

  // Flatten into the plane, going round counterclockwise.
  const across = Math.abs(normal.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const first = across.addScaledVector(normal, -across.dot(normal)).normalize();
  const second = new THREE.Vector3().crossVectors(normal, first);
  let flat = centers.map((center) => {
    const offset = center.clone().sub(origin);
    return new THREE.Vector2(offset.dot(first), offset.dot(second));
  });
  let radii = posts.map((post) => post.radius);
  let area = 0;
  flat.forEach((point, index) => { const next = flat[(index + 1) % flat.length]; area += point.x * next.y - next.x * point.y; });
  if (area < 0) { flat = flat.reverse(); radii = radii.reverse(); }
  const count = flat.length;
  // +1: the band goes round the outside of the post. -1: the loop bends in round it.
  const sides = flat.map((point, index) => {
    if (count < 3) return 1;
    const before = flat[(index + count - 1) % count], after = flat[(index + 1) % count];
    const turn = (point.x - before.x) * (after.y - point.y) - (point.y - before.y) * (after.x - point.x);
    return turn < -1e-6 ? -1 : 1;
  });
  for (let index = 0; index < count; index++) {
    if (flat[index].distanceTo(flat[(index + 1) % count]) < radii[index] + radii[(index + 1) % count]) {
      problems.push(`Two of the posts the ${name} goes round are touching. Spread them out.`);
      return empty;
    }
  }

  // Each straight run touches the post it leaves and the post it reaches on the band's side.
  const touch: { leave: THREE.Vector2; arrive: THREE.Vector2 }[] = [];
  for (let index = 0; index < count; index++) {
    const next = (index + 1) % count;
    const from = flat[index], to = flat[next];
    const signedFrom = sides[index] * radii[index], signedTo = sides[next] * radii[next];
    const run = to.clone().sub(from), length = run.length();
    const unit = run.divideScalar(length), left = new THREE.Vector2(-unit.y, unit.x);
    const tilt = Math.max(-1, Math.min(1, (signedFrom - signedTo) / length));
    // On the right of travel, which is the outside of a counterclockwise loop.
    const out = unit.clone().multiplyScalar(tilt).addScaledVector(left, -Math.sqrt(1 - tilt * tilt));
    touch.push({ leave: from.clone().addScaledVector(out, signedFrom), arrive: to.clone().addScaledVector(out, signedTo) });
  }
  const loop: THREE.Vector2[] = [];
  let path = 0;
  for (let index = 0; index < count; index++) {
    const center = flat[index], radius = radii[index];
    const arrive = touch[(index + count - 1) % count].arrive, leave = touch[index].leave;
    const start = Math.atan2(arrive.y - center.y, arrive.x - center.x), end = Math.atan2(leave.y - center.y, leave.x - center.x);
    let sweep = sides[index] > 0 ? end - start : start - end;
    while (sweep < 0) sweep += 2 * Math.PI;
    while (sweep >= 2 * Math.PI) sweep -= 2 * Math.PI;
    path += sweep * radius;
    const steps = Math.max(2, Math.ceil(sweep / 0.2));
    for (let step = 0; step <= steps; step++) {
      const angle = start + sides[index] * (sweep * step) / steps;
      loop.push(new THREE.Vector2(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle)));
    }
    path += leave.distanceTo(touch[index].arrive);
  }

  // As few turns as keep it snug.
  let wraps = 1;
  while (wraps < MOST_WRAPS && (wraps * path) / circumference < SNUG) wraps++;
  const stretch = (wraps * path) / circumference;
  if (stretch < SNUG) problems.push(`The ${name} hangs loose even wrapped ${MOST_WRAPS} times. Use a smaller band or move the posts apart.`);
  if (stretch > SNAPS) problems.push(`The ${name} is stretched ${stretch.toFixed(1)}× and would snap. Use a bigger band or move the posts closer.`);

  const strands: THREE.Vector3[][] = [];
  for (let turn = 0; turn < wraps; turn++) {
    const lift = (turn - (wraps - 1) / 2) * STRAND_GAP;
    strands.push(loop.map((point) => origin.clone().addScaledVector(first, point.x).addScaledVector(second, point.y).addScaledVector(normal, lift)));
  }
  return { strands, path, wraps, stretch, bent: sides.some((side) => side < 0), problems };
}

const STRAND_RADIUS = 0.6; // a stretched band is about a millimetre thick

/** The parts, other than its own posts, that a band's strands pass through. */
export function bandClashes(shape: BandShape, postUids: string[], parts: { uid: string; meta: PartMeta; matrixWorld: THREE.Matrix4 }[]): string[] {
  const rods = shape.strands.flatMap((strand) => rodsAlong(strand, STRAND_RADIUS, true));
  const hit: string[] = [];
  for (const part of parts) {
    if (postUids.includes(part.uid) || part.meta.category === "band") continue;
    const solid = new PartShape(part.meta, part.matrixWorld, 0.6);
    if (rods.some((rod) => overlaps(rod, solid))) hit.push(part.uid);
  }
  return hit;
}

/** Where along the first post a band sits, from a point on (or near) the post. */
export function alongPost(post: BandPost, point: THREE.Vector3): number {
  const along = point.clone().sub(post.center).dot(post.axis);
  return Math.max(-post.half + 1.5, Math.min(post.half - 1.5, along));
}

const WRAP_WORDS = ["", "", "double wrapped", "triple wrapped"];

/** What the band is, said the way you would say it holding it. */
export function bandLabel(id: string, shape: BandShape, posts: number): string {
  const size = BAND_SIZES[id];
  const parts = [`Rubber Band ${size ? size.number : ""}`.trim()];
  if (shape.wraps > 1) parts.push(WRAP_WORDS[shape.wraps]);
  if (shape.stretch) parts.push(`stretched ${shape.stretch.toFixed(1)}×`);
  if (shape.bent) parts.push(`bent round ${posts} posts`);
  else if (posts > 2) parts.push(`round ${posts} posts`);
  return parts.join(" · ");
}
