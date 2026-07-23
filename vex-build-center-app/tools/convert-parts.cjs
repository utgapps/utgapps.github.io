// STEP -> compact web-mesh pipeline for VEX Build Center.
// Tessellates curated parts from the VEX IQ CAD zips (structural kit +
// electronics) with occt-import-js into base64 mesh JSON + a manifest.
//   node tools/convert-parts.cjs "<downloads-dir>" public/parts
const fs = require("fs"), path = require("path"), cp = require("child_process");

const DL = process.argv[2];
const OUT = process.argv[3] || path.join(__dirname, "..", "public", "parts");
const TMP = path.join(__dirname, "steps");
const PITCH = 12.7;

// Zip files live in the Downloads dir. The kit name carries a date, so glob it.
function zip(nameOrGlob) {
  if (!/[*]/.test(nameOrGlob)) return path.join(DL, nameOrGlob);
  const rx = new RegExp("^" + nameOrGlob.replace(/[.]/g, "\\.").replace(/[*]/g, ".*") + "$", "i");
  const hit = fs.readdirSync(DL).find((f) => rx.test(f));
  if (!hit) throw new Error("zip not found: " + nameOrGlob);
  return path.join(DL, hit);
}
const ZIPS = {
  kit: () => zip("VEX-IQ-All-Parts*.zip"),
  motor: () => zip("*Smart-Motor-STEP.zip"),
  brain: () => zip("*Robot-Brain-STEP.zip"),
  sensors: () => zip("*Smart-Sensors-STEP.zip"),
};

// id, category, name, zipKey, internalPath (inside the zip), extra flags
const PARTS = [
  ["beam-1x1", "beam", "1x1 Beam", "kit", "1x1 Beam (228-2500-154).step"],
  ["beam-1x2", "beam", "1x2 Beam", "kit", "1x2 Beam (228-2500-001).step"],
  ["beam-1x3", "beam", "1x3 Beam", "kit", "1x3 Beam (228-2500-002).step"],
  ["beam-1x4", "beam", "1x4 Beam", "kit", "1x4 Beam (228-2500-003).step"],
  ["beam-1x5", "beam", "1x5 Beam", "kit", "1x5 Beam (228-2500-004).step"],
  ["beam-1x6", "beam", "1x6 Beam", "kit", "1x6 Beam (228-2500-005).step"],
  ["beam-1x8", "beam", "1x8 Beam", "kit", "1x8 Beam (228-2500-007).step"],
  ["beam-1x12", "beam", "1x12 Beam", "kit", "1x12 Beam (228-2500-011).step"],
  ["plate-3x3", "plate", "3x3 Plate", "kit", "3x3 Plate (228-2500-031).step"],
  ["plate-3x6", "plate", "3x6 Plate", "kit", "3x6 Plate (228-2500-034).step"],
  ["plate-3x12", "plate", "3x12 Plate", "kit", "3x12 Plate (228-2500-037).step"],
  ["pin-connector-0x2", "pin", "0x2 Connector Pin", "kit", "0x2 Connector Pin (228-2500-086).step"],
  ["pin-connector-1x1", "pin", "1x1 Connector Pin", "kit", "1x1 Connector Pin (228-2500-060).step"],
  ["pin-connector-0x3", "pin", "0x3 Connector Pin", "kit", "0x3 Connector Pin (228-2500-087).step"],
  ["pin-connector-1x2", "pin", "1x2 Connector Pin", "kit", "1x2 Connector Pin (228-2500-061).step"],
  ["pin-connector-2x2", "pin", "2x2 Connector Pin", "kit", "2x2 Connector Pin (228-2500-062).step"],
  ["pin-connector-3x3", "pin", "3x3 Connector Pin", "kit", "3x3 Connector Pin (228-2500-089).step"],
  ["pin-idler-1x1", "pin", "1x1 Idler Pin", "kit", "1x1 Idler Pin (228-2500-073).step"],
  ["pin-sheet-0x1", "pin", "0x1 Sheet Pin", "kit", "0x1 Sheet Pin (228-2500-099).step"],
  ["standoff-025x", "standoff", "0.25x Standoff", "kit", "0.25x Pitch Standoff (228-2500-063).step"],
  ["standoff-05x", "standoff", "0.5x Standoff", "kit", "0.5x Pitch Standoff (228-2500-064).step"],
  ["standoff-1x", "standoff", "1x Standoff", "kit", "1x Pitch Standoff (228-2500-065).step"],
  ["standoff-15x", "standoff", "1.5x Standoff", "kit", "1.5x Pitch Standoff (228-2500-066).step"],
  ["standoff-2x", "standoff", "2x Standoff", "kit", "2x Pitch Standoff (228-2500-067).step"],
  ["corner-1x1", "corner", "1x1 Corner", "kit", "1x Wide, 1x1 Corner Connector (228-2500-129).step"],
  ["corner-1x2", "corner", "1x2 Corner", "kit", "1x Wide, 1x2 Corner Connector (228-2500-279).step"],
  ["corner-2x2", "corner", "2x2 Corner", "kit", "2x Wide, 2x2 Corner Connector (228-2500-134).step"],
  ["gear-12t", "gear", "12T Gear", "kit", "12 Tooth Gear (228-2500-213).step"],
  ["gear-24t", "gear", "24T Gear", "kit", "24 Tooth Gear (228-2500-227).step"],
  ["gear-36t", "gear", "36T Gear", "kit", "36 Tooth Gear (228-2500-214).step"],
  ["gear-48t", "gear", "48T Gear", "kit", "48 Tooth Gear (228-2500-228).step"],
  ["gear-60t", "gear", "60T Gear", "kit", "60 Tooth Gear (228-2500-215).step"],
  ["wheel-ant-86", "wheel", "Ant Wheel 86mm", "kit", "Ant Wheel - 86mm (228-2500-319).step"],
  ["wheel-ant-96", "wheel", "Ant Wheel 96mm", "kit", "Ant Wheel - 96mm (228-2500-318).step"],
  ["wheel-smooth-160", "wheel", "160mm Smooth Wheel", "kit", "4x Pitch Diameter (160mm Travel) Smooth Wheel (228-2500-1383).step"],
  // Steel axles (VEX calls them "shafts") — the full length range in the kit.
  ["shaft-2x", "shaft", "2x Axle", "kit", "2x Pitch Shaft (228-2500-117).step"],
  ["shaft-3x", "shaft", "3x Axle", "kit", "3x Pitch Shaft (228-2500-119).step"],
  ["shaft-4x", "shaft", "4x Axle", "kit", "4x Pitch Shaft (228-2500-120).step"],
  ["shaft-5x", "shaft", "5x Axle", "kit", "5x Pitch Shaft (228-2500-121).step"],
  ["shaft-6x", "shaft", "6x Axle", "kit", "6x Pitch Shaft (228-2500-122).step"],
  ["shaft-7x", "shaft", "7x Axle", "kit", "7x Pitch Shaft (228-2500-123).step"],
  ["shaft-8x", "shaft", "8x Axle", "kit", "8x Pitch Shaft (228-2500-124).step"],
  ["shaft-9x", "shaft", "9x Axle", "kit", "9x Pitch Shaft (228-2500-260).step"],
  ["shaft-10x", "shaft", "10x Axle", "kit", "10x Pitch Shaft (228-2500-261).step"],
  ["shaft-11x", "shaft", "11x Axle", "kit", "11x Pitch Shaft (228-2500-262).step"],
  ["shaft-12x", "shaft", "12x Axle", "kit", "12x Pitch Shaft (228-2500-263).step"],
  ["shaft-14x", "shaft", "14x Axle", "kit", "14x Pitch Shaft (228-2500-264).step"],
  ["shaft-16x", "shaft", "16x Axle", "kit", "16x Pitch Shaft (228-2500-265).step"],
  ["shaft-18x", "shaft", "18x Axle", "kit", "18x Pitch Shaft (228-2500-266).step"],
  ["shaft-20x", "shaft", "20x Axle", "kit", "20x Pitch Shaft (228-2500-267).step"],
  ["shaft-22x", "shaft", "22x Axle", "kit", "22x Pitch Shaft (228-2500-268).step"],
  ["shaft-24x", "shaft", "24x Axle", "kit", "24x Pitch Shaft (228-2500-269).step"],
  ["spacer-025x", "spacer", "0.25x Spacer", "kit", "0.25x Pitch Spacer (228-2500-114).step"],
  ["washer", "spacer", "Washer", "kit", "Washer (228-2500-112).step"],
  // electronics (real CAD)
  ["smart-motor", "motor", "Smart Motor", "motor", "228-2560.STEP", { isMotor: true }],
  ["robot-brain", "brain", "Robot Brain", "brain", "228-2540 VEX IQ Robot Brain/228-2540.STEP"],
  ["robot-battery", "brain", "Robot Battery", "brain", "228-2604 VEX IQ Robot Battery/228-2604.STEP"],
  ["sensor-touch", "sensor", "Touch LED", "sensors", "228-3010 VEX IQ Touch Sensor/228-3010.STEP"],
  ["sensor-distance", "sensor", "Distance Sensor", "sensors", "228-3011 VEX IQ Distance Sensor/228-3011.STEP"],
  ["sensor-color", "sensor", "Color Sensor", "sensors", "228-3012 VEX IQ Color Sensor/228-3012.STEP"],
  ["sensor-gyro", "sensor", "Gyro Sensor", "sensors", "228-3014 VEX IQ Gyro Sensor/228-3014.STEP"],
  ["sensor-bumper", "sensor", "Bumper Switch", "sensors", "228-2677 VEX IQ Bumper Switch/228-2677.STEP"],
];

function b64(a) { return Buffer.from(a.buffer, a.byteOffset, a.byteLength).toString("base64"); }

(async () => {
  if (!DL) { console.error("usage: node convert-parts.cjs <downloadsDir> [outDir]"); process.exit(1); }
  fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const zipPath = {};
  for (const k of Object.keys(ZIPS)) zipPath[k] = ZIPS[k]();

  const occt = await require("occt-import-js")();
  const manifest = { pitchMM: PITCH, parts: [] };
  let ok = 0, fail = 0;
  for (const [id, category, name, zipKey, internal, flags] of PARTS) {
    try {
      const stepBytes = cp.execSync(`unzip -p "${zipPath[zipKey]}" "${internal}"`, { maxBuffer: 1 << 28 });
      const buf = new Uint8Array(stepBytes);
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
      const entry = { id, name, category, sizeMM, tris: I.length / 3 };
      if (flags && flags.isMotor) entry.isMotor = true;
      manifest.parts.push(entry);
      ok++;
    } catch (e) { console.log("ERR", id, e.message); fail++; }
  }
  fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 1));
  console.log(JSON.stringify({ converted: ok, failed: fail, total: manifest.parts.length }));
})();
