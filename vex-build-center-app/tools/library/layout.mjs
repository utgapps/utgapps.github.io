// A saved build laid out the way the builder lays it out: every part placed, every bore found,
// every pin and axle matched to the bores it goes through, and built-in pins (sj) joined up.
import * as THREE from "three";
import { boreCores, fillsOf, OCCUPIER } from "../../src/lib/connections.ts";
import { holesFor } from "../../src/lib/holes.ts";
import { metaOf } from "./assembler.mjs";
import { BAND_SIZES, postOf, shapeBand, bandClashes } from "../../src/lib/bands.ts";

export function layout(saved) {
  // Rubber bands come last and are drawn from their posts, not placed: see bands() below.
  const placed = saved.filter((entry) => !entry.band);
  const parts = placed.map((entry, index) => {
    const meta = metaOf(entry.id);
    const object = new THREE.Object3D();
    object.position.fromArray(entry.p);
    object.quaternion.fromArray(entry.q);
    object.updateMatrixWorld(true);
    return { uid: `p${index}`, id: meta.id, name: meta.name, category: meta.category, isMotor: !!meta.isMotor, sizeMM: meta.sizeMM, meta, object };
  });
  const poses = parts.map((part) => ({ uid: part.uid, meta: part.meta, matrixWorld: part.object.matrixWorld }));
  const cores = boreCores(poses);
  const fills = poses.filter((pose) => OCCUPIER.has(pose.meta.category)).flatMap((pose) => fillsOf(pose, cores));
  // A standoff's or corner's built-in pin, plugged into another part's hole.
  const studs = [];
  placed.forEach((entry, index) => {
    for (const [studCore, holeIndex] of entry.sj || []) {
      const stud = holesFor(parts[index].meta).find((hole) => hole.kind === "stud" && hole.core === studCore);
      if (!stud) continue;
      const matrix = parts[index].object.matrixWorld;
      studs.push({
        studUid: `p${index}`, holeUid: `p${holeIndex}`,
        center: new THREE.Vector3(...stud.p).applyMatrix4(matrix), axis: new THREE.Vector3(...stud.axis).transformDirection(matrix),
      });
    }
  });
  return { parts, poses, fills, studs };
}

/** The rubber bands of a laid-out build, each with the shape it takes on its posts and the parts it cuts through. */
export function bands(saved, poses) {
  return saved.filter((entry) => entry.band).map((entry) => {
    const meta = metaOf(entry.id);
    const posts = entry.band.posts.map((index) => postOf(poses[index]));
    const shape = shapeBand(meta.name, BAND_SIZES[meta.id].circumference, posts, entry.band.at);
    return { meta, posts: entry.band.posts, shape, clashes: bandClashes(shape, entry.band.posts.map((index) => `p${index}`), poses) };
  });
}
