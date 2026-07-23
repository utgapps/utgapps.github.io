// Find a part's REAL connection features by ray-casting its tessellated mesh.
//
// For each of the 6 axis-aligned face directions we march a grid of rays into
// the part. At each sample we compare the centre ray's first hit against a ring
// of rays around it:
//   centre much DEEPER than the ring  -> a hole opening (bore going inward)
//   centre much SHALLOWER than ring   -> a stud / built-in pin sticking out
// Detections are clustered and returned as handles {p, axis, kind} in the
// part's local (recentered) frame — the same shape the app uses for markers.
//
//   node tools/detect-features.cjs <partsDir> [id ...]
const fs = require("fs"), path = require("path");
const THREE = require("three");
const { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } = require("three-mesh-bvh");
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const RING_R = 3.2;   // ring radius (mm) — just outside a VEX bore (~4.8mm dia)
const STEP = 0.6;     // scan step (mm) — fine enough to centre features accurately
const EPS = 1.2;      // depth difference that counts as a feature (mm)
const CLUSTER = 3.0;  // merge detections closer than this (mm)

function typed(b64, Ctor) {
  const buf = Buffer.from(b64, "base64");
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return new Ctor(ab);
}

function loadMesh(partsDir, id) {
  const d = JSON.parse(fs.readFileSync(path.join(partsDir, id + ".json"), "utf8"));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(typed(d.position, Float32Array), 3));
  g.setIndex(new THREE.BufferAttribute(typed(d.index, Uint32Array), 1));
  g.computeBoundingBox();
  g.computeBoundsTree();
  return { mesh: new THREE.Mesh(g, new THREE.MeshBasicMaterial()), geo: g, meta: d };
}

function firstHit(mesh, ray, origin, dir) {
  ray.set(origin, dir);
  ray.firstHitOnly = true;
  const hits = ray.intersectObject(mesh, false);
  return hits.length ? hits[0].distance : null;
}

function detect(mesh, geo) {
  const size = geo.boundingBox.getSize(new THREE.Vector3());
  const ray = new THREE.Raycaster();
  ray.far = 1e4;
  const out = [];
  for (let ai = 0; ai < 3; ai++) {
    const uAx = (ai + 1) % 3, vAx = (ai + 2) % 3;
    const uVec = new THREE.Vector3().setComponent(uAx, 1);
    const vVec = new THREE.Vector3().setComponent(vAx, 1);
    for (const sign of [1, -1]) {
      const dir = new THREE.Vector3().setComponent(ai, sign);   // outward face normal
      const into = dir.clone().negate();                        // ray direction
      const start = size.getComponent(ai) / 2 + 5;
      const uMax = size.getComponent(uAx) / 2, vMax = size.getComponent(vAx) / 2;
      for (let uu = -uMax; uu <= uMax; uu += STEP) {
        for (let vv = -vMax; vv <= vMax; vv += STEP) {
          const base = dir.clone().multiplyScalar(start).addScaledVector(uVec, uu).addScaledVector(vVec, vv);
          const dc = firstHit(mesh, ray, base, into); // null = ray passed clean through (a through-hole)
          const ring = [];
          for (let k = 0; k < 8; k++) {
            const a = (k / 8) * Math.PI * 2;
            const o = base.clone().addScaledVector(uVec, Math.cos(a) * RING_R).addScaledVector(vVec, Math.sin(a) * RING_R);
            const dr = firstHit(mesh, ray, o, into);
            if (dr != null) ring.push(dr);
          }
          if (ring.length < 7) continue;
          ring.sort((a, b) => a - b);
          const dr = ring[Math.floor(ring.length / 2)];
          if (dc == null || dc > dr + EPS) out.push({ kind: "hole", ai, sign, uu, vv, face: dr });
          else if (dc < dr - EPS) out.push({ kind: "stud", ai, sign, uu, vv, face: dc });
        }
      }
    }
  }
  return cluster(out, size);
}

function cluster(raw, size) {
  const groups = [];
  for (const r of raw) {
    const g = groups.find((g) => g.kind === r.kind && g.ai === r.ai && g.sign === r.sign
      && Math.hypot(g.uu - r.uu, g.vv - r.vv) < CLUSTER);
    if (g) { g.n++; g.uu += (r.uu - g.uu) / g.n; g.vv += (r.vv - g.vv) / g.n; g.face = Math.min(g.face, r.face); }
    else groups.push({ ...r, n: 1 });
  }
  return groups.filter((g) => g.n >= 6).map((g) => {
    const uAx = (g.ai + 1) % 3, vAx = (g.ai + 2) % 3;
    const p = [0, 0, 0];
    p[g.ai] = g.sign * (size.getComponent(g.ai) / 2 + 5) - g.sign * g.face;
    p[uAx] = g.uu; p[vAx] = g.vv;
    const axis = [0, 0, 0]; axis[g.ai] = g.sign;
    return { kind: g.kind, p: p.map((v) => +v.toFixed(2)), axis, samples: g.n };
  });
}

// Measure a feature's radius by probing outward until it stops behaving like a
// hole/stud. Real VEX bores are ~2.1-2.4mm radius and round; surface ribs and
// texture are not, so this filters detector noise.
function measure(mesh, geo, f) {
  const ray = new THREE.Raycaster(); ray.far = 1e4;
  const size = geo.boundingBox.getSize(new THREE.Vector3());
  const ai = f.axis.findIndex((v) => v !== 0), sign = f.axis[ai];
  const uAx = (ai + 1) % 3, vAx = (ai + 2) % 3;
  const uVec = new THREE.Vector3().setComponent(uAx, 1), vVec = new THREE.Vector3().setComponent(vAx, 1);
  const dir = new THREE.Vector3().setComponent(ai, sign), into = dir.clone().negate();
  const start = size.getComponent(ai) / 2 + 5;
  const centre = dir.clone().multiplyScalar(start).addScaledVector(uVec, f.p[uAx]).addScaledVector(vVec, f.p[vAx]);
  const faceD = start - sign * f.p[ai];
  const radii = [];
  for (let k = 0; k < 8; k++) {
    const a = (k / 8) * Math.PI * 2;
    let r = 0.4;
    for (; r <= 4.0; r += 0.2) {
      const o = centre.clone().addScaledVector(uVec, Math.cos(a) * r).addScaledVector(vVec, Math.sin(a) * r);
      const d = firstHit(mesh, ray, o, into);
      const isFeature = f.kind === "hole" ? (d == null || d > faceD + EPS) : (d != null && d < faceD - EPS);
      if (!isFeature) break;
    }
    radii.push(r);
  }
  const mn = Math.min(...radii), mx = Math.max(...radii);
  return { radius: +((mn + mx) / 2).toFixed(2), round: +(mx / Math.max(mn, 0.01)).toFixed(2) };
}

const partsDir = process.argv[2];
const args = process.argv.slice(3);
const WRITE = args.includes("--write");
let ids = args.filter((a) => !a.startsWith("--"));

// --write: detect for every part in the manifest and store the handles there.
if (WRITE) {
  const mfPath = path.join(partsDir, "manifest.json");
  const mf = JSON.parse(fs.readFileSync(mfPath, "utf8"));
  let done = 0;
  for (const part of mf.parts) {
    try {
      const { mesh, geo } = loadMesh(partsDir, part.id);
      const feats = detect(mesh, geo)
        .map((f) => ({ ...f, ...measure(mesh, geo, f) }))
        .filter((f) => f.radius >= 1.7 && f.radius <= 3.0 && f.round <= 1.6);
      part.holes = feats.map((f) => ({ p: f.p, axis: f.axis, kind: f.kind }));
      done++;
      process.stdout.write(`${part.id}:${feats.length} `);
    } catch (e) { process.stdout.write(`${part.id}:ERR `); }
  }
  fs.writeFileSync(mfPath, JSON.stringify(mf, null, 1));
  console.log(`\nwrote handles for ${done} parts`);
  process.exit(0);
}

for (const id of ids) {
  const { mesh, geo, meta } = loadMesh(partsDir, id);
  const t0 = Date.now();
  let feats = detect(mesh, geo);
  feats = feats.map((f) => ({ ...f, ...measure(mesh, geo, f) }))
    .filter((f) => f.radius >= 1.7 && f.radius <= 3.0 && f.round <= 1.6);
  const holes = feats.filter((f) => f.kind === "hole"), studs = feats.filter((f) => f.kind === "stud");
  console.log(`\n=== ${id}  size=${JSON.stringify(meta.sizeMM)}  (${Date.now() - t0}ms) ===`);
  console.log(`  holes: ${holes.length}   studs: ${studs.length}`);
  for (const f of feats) console.log(`   ${f.kind.padEnd(5)} p=${JSON.stringify(f.p)} axis=${JSON.stringify(f.axis)} r=${f.radius} round=${f.round}`);
}
