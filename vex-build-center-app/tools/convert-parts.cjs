// STEP -> compact web-mesh pipeline for VEX Build Center.
// Reads curated parts from the VEX IQ CAD zip, tessellates each with
// occt-import-js, recenters to its bounding-box center, and writes a
// base64-packed mesh JSON per part plus a manifest. Re-run to add parts:
//   node tools/convert-parts.cjs "<path-to-VEX-IQ-All-Parts.zip>" public/parts
const fs = require("fs"), path = require("path"), cp = require("child_process");

const ZIP = process.argv[2];
const OUT = process.argv[3] || path.join(__dirname, "..", "public", "parts");
const TMP = path.join(__dirname, "steps");
const PITCH = 12.7; // VEX IQ grid pitch (mm)

// id, category, display name, source STEP filename
const PARTS = [
  ["beam-1x1", "beam", "1x1 Beam", "1x1 Beam (228-2500-154).step"],
  ["beam-1x2", "beam", "1x2 Beam", "1x2 Beam (228-2500-001).step"],
  ["beam-1x3", "beam", "1x3 Beam", "1x3 Beam (228-2500-002).step"],
  ["beam-1x4", "beam", "1x4 Beam", "1x4 Beam (228-2500-003).step"],
  ["beam-1x5", "beam", "1x5 Beam", "1x5 Beam (228-2500-004).step"],
  ["beam-1x6", "beam", "1x6 Beam", "1x6 Beam (228-2500-005).step"],
  ["beam-1x8", "beam", "1x8 Beam", "1x8 Beam (228-2500-007).step"],
  ["beam-1x12", "beam", "1x12 Beam", "1x12 Beam (228-2500-011).step"],
  ["plate-3x3", "plate", "3x3 Plate", "3x3 Plate (228-2500-031).step"],
  ["plate-3x6", "plate", "3x6 Plate", "3x6 Plate (228-2500-034).step"],
  ["plate-3x12", "plate", "3x12 Plate", "3x12 Plate (228-2500-037).step"],
  ["pin-connector-0x2", "pin", "0x2 Connector Pin", "0x2 Connector Pin (228-2500-086).step"],
  ["pin-connector-1x1", "pin", "1x1 Connector Pin", "1x1 Connector Pin (228-2500-060).step"],
  ["pin-connector-1x2", "pin", "1x2 Connector Pin", "1x2 Connector Pin (228-2500-061).step"],
  ["pin-idler-1x1", "pin", "1x1 Idler Pin", "1x1 Idler Pin (228-2500-073).step"],
  ["pin-sheet-0x1", "pin", "0x1 Sheet Pin", "0x1 Sheet Pin (228-2500-099).step"],
  ["standoff-025x", "standoff", "0.25x Standoff", "0.25x Pitch Standoff (228-2500-063).step"],
  ["standoff-05x", "standoff", "0.5x Standoff", "0.5x Pitch Standoff (228-2500-064).step"],
  ["standoff-1x", "standoff", "1x Standoff", "1x Pitch Standoff (228-2500-065).step"],
  ["standoff-15x", "standoff", "1.5x Standoff", "1.5x Pitch Standoff (228-2500-066).step"],
  ["standoff-2x", "standoff", "2x Standoff", "2x Pitch Standoff (228-2500-067).step"],
  ["corner-1x1", "corner", "1x1 Corner", "1x Wide, 1x1 Corner Connector (228-2500-129).step"],
  ["corner-1x2", "corner", "1x2 Corner", "1x Wide, 1x2 Corner Connector (228-2500-279).step"],
  ["corner-2x2", "corner", "2x2 Corner", "2x Wide, 2x2 Corner Connector (228-2500-134).step"],
  ["gear-12t", "gear", "12T Gear", "12 Tooth Gear (228-2500-213).step"],
  ["gear-24t", "gear", "24T Gear", "24 Tooth Gear (228-2500-227).step"],
  ["gear-36t", "gear", "36T Gear", "36 Tooth Gear (228-2500-214).step"],
  ["gear-48t", "gear", "48T Gear", "48 Tooth Gear (228-2500-228).step"],
  ["gear-60t", "gear", "60T Gear", "60 Tooth Gear (228-2500-215).step"],
  ["wheel-ant-86", "wheel", "Ant Wheel 86mm", "Ant Wheel - 86mm (228-2500-319).step"],
  ["wheel-ant-96", "wheel", "Ant Wheel 96mm", "Ant Wheel - 96mm (228-2500-318).step"],
  ["wheel-smooth-160", "wheel", "160mm Smooth Wheel", "4x Pitch Diameter (160mm Travel) Smooth Wheel (228-2500-1383).step"],
  ["shaft-2x", "shaft", "2x Shaft", "2x Pitch Shaft (228-2500-117).step"],
  ["shaft-3x", "shaft", "3x Shaft", "3x Pitch Shaft (228-2500-119).step"],
  ["shaft-4x", "shaft", "4x Shaft", "4x Pitch Shaft (228-2500-120).step"],
  ["spacer-025x", "spacer", "0.25x Spacer", "0.25x Pitch Spacer (228-2500-114).step"],
  ["washer", "spacer", "Washer", "Washer (228-2500-112).step"],
];

// Synthetic electronics placeholders (not in the structural CAD kit).
const SYNTH = [
  ["smart-motor", "motor", "Smart Motor", { primitive: "box", sizeMM: [50.8, 38.1, 25.4], color: "#2b7de0", isMotor: true }],
  ["robot-brain", "brain", "Robot Brain", { primitive: "box", sizeMM: [88.9, 63.5, 19.0], color: "#3a3f47" }],
];

function b64(a) { return Buffer.from(a.buffer, a.byteOffset, a.byteLength).toString("base64"); }

(async () => {
  if (!ZIP) { console.error("usage: node convert-parts.cjs <zip> [outDir]"); process.exit(1); }
  fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const names = PARTS.map((p) => p[3]);
  cp.execSync(`unzip -j -o "${ZIP}" ${names.map((n) => `"${n}"`).join(" ")} -d "${TMP}"`, { stdio: "ignore" });

  const occt = await require("occt-import-js")();
  const manifest = { pitchMM: PITCH, parts: [] };
  let ok = 0, fail = 0;
  for (const [id, category, name, file] of PARTS) {
    try {
      const buf = new Uint8Array(fs.readFileSync(path.join(TMP, file)));
      const r = occt.ReadStepFile(buf, { linearDeflection: 0.08, angularDeflection: 0.4 });
      if (!r || !r.success || !r.meshes.length) { console.log("FAIL", id); fail++; continue; }
      let pos = [], nor = [], idx = [], base = 0;
      for (const m of r.meshes) {
        const p = m.attributes.position.array;
        const n = (m.attributes.normal && m.attributes.normal.array) || null;
        for (let i = 0; i < p.length; i++) pos.push(p[i]);
        if (n) for (let i = 0; i < n.length; i++) nor.push(n[i]);
        for (let i = 0; i < m.index.array.length; i++) idx.push(m.index.array[i] + base);
        base += p.length / 3;
      }
      let mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
      for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], pos[i + k]); mx[k] = Math.max(mx[k], pos[i + k]); }
      const c = mx.map((v, k) => (v + mn[k]) / 2);
      for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) pos[i + k] -= c[k];
      const sizeMM = mx.map((v, k) => +(v - mn[k]).toFixed(2));
      const P = new Float32Array(pos), N = nor.length === pos.length ? new Float32Array(nor) : null, I = new Uint32Array(idx);
      fs.writeFileSync(path.join(OUT, id + ".json"), JSON.stringify({ id, name, category, sizeMM, vertexCount: P.length / 3, position: b64(P), normal: N ? b64(N) : null, index: b64(I) }));
      manifest.parts.push({ id, name, category, sizeMM, tris: I.length / 3 });
      ok++;
    } catch (e) { console.log("ERR", id, e.message); fail++; }
  }
  for (const [id, category, name, spec] of SYNTH) manifest.parts.push({ id, name, category, primitive: spec.primitive, sizeMM: spec.sizeMM, color: spec.color, isMotor: !!spec.isMotor });
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 1));
  console.log(JSON.stringify({ converted: ok, failed: fail, synthetic: SYNTH.length, total: manifest.parts.length }));
})();
