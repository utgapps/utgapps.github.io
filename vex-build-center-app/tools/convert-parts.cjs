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

// The rest of the kit that mechanisms are built from: every straight beam length, the
// angled beams, wider plates, sprockets and chain, wheels, and the motion parts (racks,
// slides, ratchets, cams) and attachments (intake flaps, buckets, hooks).
function MORE_PARTS() {
  const kit = (id, category, name, internal, flags) => [id, category, name, "kit", internal || name, flags];
  return [
    ...[7, 9, 10, 11, 13, 14, 16, 18, 20].map((n) => kit(`beam-1x${n}`, "beam", `1x${n} Beam`)),
    ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20].map((n) => kit(`beam-2x${n}`, "beam", `2x${n} Beam`)),
    kit("angle-2x3-right", "angle", "2x3 Right Angle Beam"),
    kit("angle-3x3-right", "angle", "3x3 Right Angle Beam"),
    kit("angle-3x5-right", "angle", "3x5 Right Angle Beam"),
    kit("angle-4x4-offset", "angle", "4x4 Offset Right Angle Beam"),
    kit("angle-3x3-30", "angle", "3x3 30° Angle Beam", "3x3 30 Degree Angle Beam"),
    kit("angle-3x3-45", "angle", "3x3 45° Angle Beam", "3x3 45 Degree Angle Beam"),
    kit("angle-3x3-60", "angle", "3x3 60° Angle Beam", "3x3 60 Degreee Angle Beam"),
    kit("angle-2x2-30", "angle", "2x2 30° Beam", "2x2 30 Degree Beam"),
    kit("angle-2x2-45", "angle", "2x2 45° Beam", "2x2 45 Degree Beam"),
    kit("angle-3x4-tee", "angle", "3x4 Tee Beam"),
    kit("angle-plus-3x3", "angle", "3x3 Plus Beam", "3x3 Plus Gusset Beam"),
    kit("arm-12x", "angle", "12x Robot Arm Beam"),
    kit("arm-17x", "angle", "17x Robot Arm Beam"),
    ...["3x4", "3x8", "3x10", "3x16", "4x4", "4x6", "4x8", "4x10", "4x12", "4x16", "6x12", "12x12"].map((size) => kit(`plate-${size}`, "plate", `${size} Plate`)),
    kit("pin-idler-0x2", "pin", "0x2 Idler Pin"),
    kit("pin-idler-0x3", "pin", "0x3 Idler Pin"),
    kit("pin-idler-1x2", "pin", "1x2 Idler Pin"),
    kit("pin-idler-2x3", "pin", "2x3 Smooth Idler Pin"),
    ...[3, 4, 6, 8].map((n) => kit(`standoff-${n}x`, "standoff", `${n}x Standoff`, `${n}x Pitch Standoff`)),
    kit("rubber-collar", "spacer", "Rubber Shaft Collar"),
    kit("shaft-bushing", "spacer", "Shaft Bushing"),
    kit("gear-36t-idler", "gear", "36T Idler Gear", "36 Tooth Idler Gear", { roundBore: true }),
    kit("gear-crown-36t", "gear", "36T Crown Gear", "36 Tooth Crown Gear"),
    kit("gear-worm", "gear", "Worm Gear"),
    kit("gear-bevel-18t", "gear", "18T Bevel Gear", "18 Tooth Bevel Gear"),
    kit("gear-differential", "gear", "Differential Gear"),
    kit("gear-ring-60t", "gear", "60T Ring Gear", "60 Tooth Internal Ring Gear"),
    ...[8, 16, 24, 32, 40].map((n) => kit(`sprocket-${n}t`, "sprocket", `${n}T Sprocket`, `${n} Tooth Sprocket`)),
    kit("chain-link", "chain", "Chain Link"),
    kit("tread-link", "chain", "Tank Tread Link", "Tank Tread, Attachment Link"),
    kit("traction-link", "chain", "Traction Link"),
    // A tire stretches over its hub: the 200 mm tire (20.4 mm inside radius) over the small
    // 44 mm hub, the 250 mm tire (30.4) over the large 64 mm hub. The hub's CAD origin sits
    // on one face, so each piece is centred before they are put together.
    kit("wheel-200", "wheel", "200mm Travel Wheel", ["Small Wheel Hub (44 mm)", "Tire (200 mm Travel)"], { centreEach: true }),
    kit("wheel-250", "wheel", "250mm Travel Wheel", ["Large Wheel Hub (64 mm)", "Tire (250 mm Travel)"], { centreEach: true }),
    kit("wheel-low-friction-160", "wheel", "160mm Low-Friction Wheel", "4x Pitch Diameter (160 mm Travel) Low-Friction Wheel"),
    kit("rack-1x20", "motion", "1x20 Rack Gear", "1x20 Linear Motion Rack Gear"),
    kit("rack", "motion", "Rack Gear"),
    kit("linear-slide", "motion", "Linear Slide"),
    kit("linear-beam-1x5", "motion", "1x5 Linear Motion Beam"),
    kit("ratchet-16t", "motion", "16T Ratchet", "16 Tooth Ratchet"),
    kit("ratchet-40t", "motion", "40T Ratchet", "40 Tooth Ratchet"),
    kit("pawl", "motion", "Ratchet Pawl", "Short Low-Profile Pawl"),
    kit("cam-small", "motion", "Small Drop Cam", "Small 2x Pitch Drop Cam"),
    kit("cam-large", "motion", "Large Drop Cam", "Large 1x Pitch Drop Cam"),
    kit("cam-follower", "motion", "Cam Follower"),
    kit("flap-short", "attachment", "Short Intake Flap"),
    kit("flap-medium", "attachment", "Medium Intake Flap"),
    kit("flap-long", "attachment", "Long Intake Flap"),
    kit("bucket-loader", "attachment", "Front Loader Bucket", "10x Pitch Wide Front Loader Bucket"),
    kit("bucket-excavator", "attachment", "Excavator Bucket", "4x Pitch Wide Excavator Bucket"),
    kit("crane-hook", "attachment", "Crane Hook", "1x3 Large Crane Hook"),
    kit("fork-lift", "attachment", "Fork Lift Beam"),
    kit("flywheel", "attachment", "Flywheel (75 g)", "6x Pitch Flywheel (75 g)"),
    kit("shooter-plate", "attachment", "Ball Shooter Plate", "2x4 25mm Ball Shooter Plate (Strong)"),
    kit("rubber-band-32", "band", "Rubber Band #32", "Silicone Rubber Band #32"),
    kit("rubber-band-64", "band", "Rubber Band #64", "Silicone Rubber Band #64"),
    kit("rubber-band-117", "band", "Rubber Band #117", "Silicone Rubber Band #117B"),
    kit("rubber-band-anchor", "attachment", "Rubber Band Anchor"),
  ];
}

// id, category, name, zipKey, internalPath (inside the zip), extra flags.
// The internal path may be just the catalog name ("1x10 Beam"): the part number in
// brackets is looked up. A list of names merges several files into one part (a tire on
// its hub is one wheel to a student).
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
  // Capped axles — a molded cap on one end that snaps into a beam so the shaft
  // can't slide out. (The plastic-capped variants are the same geometry, so
  // they're omitted.)
  ["shaft-cap-2x", "shaft", "2x Capped Axle", "kit", "2x Pitch Capped Shaft (228-2500-2219).step"],
  ["shaft-cap-2_5x", "shaft", "2.5x Capped Axle", "kit", "2.5x Pitch Capped Shaft (228-2500-2220).step"],
  ["shaft-cap-3x", "shaft", "3x Capped Axle", "kit", "3x Pitch Capped Shaft (228-2500-2221).step"],
  ["shaft-cap-4x", "shaft", "4x Capped Axle", "kit", "4x Pitch Capped Shaft (228-2500-2223).step"],
  ["shaft-cap-4_5x", "shaft", "4.5x Capped Axle", "kit", "4.5x Pitch Capped Shaft (228-2500-2224).step"],
  ["shaft-cap-5x", "shaft", "5x Capped Axle", "kit", "5x Pitch Capped Shaft (228-2500-2225).step"],
  ["shaft-cap-6x", "shaft", "6x Capped Axle", "kit", "6x Pitch Capped Shaft (228-2500-2226).step"],
  ["shaft-cap-7x", "shaft", "7x Capped Axle", "kit", "7x Pitch Capped Shaft (228-2500-2227).step"],
  ["shaft-cap-8x", "shaft", "8x Capped Axle", "kit", "8x Pitch Capped Shaft (228-2500-2228).step"],
  ["shaft-cap-9x", "shaft", "9x Capped Axle", "kit", "9x Pitch Capped Shaft (228-2500-2229).step"],
  ["shaft-cap-10x", "shaft", "10x Capped Axle", "kit", "10x Pitch Capped Shaft (228-2500-2230).step"],
  ["shaft-cap-11x", "shaft", "11x Capped Axle", "kit", "11x Pitch Capped Shaft (228-2500-2231).step"],
  ["shaft-cap-12x", "shaft", "12x Capped Axle", "kit", "12x Pitch Capped Shaft (228-2500-2232).step"],
  // Motor axles — a shaped end that drives from a Smart Motor. (Plastic motor
  // shafts share this envelope, so only one per length is kept.)
  ["shaft-motor-2x", "shaft", "2x Motor Axle", "kit", "2x Pitch Motor Shaft (228-2500-2234).step"],
  ["shaft-motor-3x", "shaft", "3x Motor Axle", "kit", "3x Pitch Motor Shaft (228-2500-2236).step"],
  ["shaft-motor-4x", "shaft", "4x Motor Axle", "kit", "4x Pitch Motor Shaft (228-2500-2238).step"],
  // Snap axles — short shafts that snap into a motor/gear.
  ["shaft-snap-1x", "shaft", "1x Snap Axle", "kit", "1x Pitch Plastic Motor Snap Shaft (228-2500-328).step"],
  ["shaft-snap-1_5x", "shaft", "1.5x Snap Axle", "kit", "1.5x Pitch Plastic Motor Snap Shaft v1 (228-2500-091).step"],
  ["shaft-snap-2x", "shaft", "2x Snap Axle", "kit", "2x Pitch Plastic Motor Snap Shaft v1 (228-2500-092).step"],
  ["spacer-025x", "spacer", "0.25x Spacer", "kit", "0.25x Pitch Spacer (228-2500-114).step"],
  ["washer", "spacer", "Washer", "kit", "Washer (228-2500-112).step"],
  ...MORE_PARTS(),
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
  // A zip that is no longer downloaded keeps its parts from the last run: the electronics
  // CAD came as separate zips that need not be on hand every time the kit grows.
  const zipPath = {}, zipListing = {};
  for (const key of Object.keys(ZIPS)) {
    try {
      zipPath[key] = ZIPS[key]();
      zipListing[key] = cp.execSync(`unzip -Z1 "${zipPath[key]}"`, { maxBuffer: 1 << 26 }).toString().split(/\r?\n/).filter(Boolean);
    } catch { console.log("no zip for", key, "- keeping its parts from the last run"); }
  }
  const manifestPath = path.join(OUT, "manifest.json");
  const lastRun = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")).parts : [];
  // "1x10 Beam" -> "1x10 Beam (228-2500-009).step". Where VEX revised a part and both
  // revisions ship, the shorter part number is the original one the kits carry.
  const resolve = (zipKey, name) => {
    const listing = zipListing[zipKey];
    if (listing.includes(name)) return name;
    const prefix = (name + " (").toLowerCase();
    const hits = listing.filter((entry) => entry.toLowerCase().startsWith(prefix) && /\(228-[\d-]+\)\.step$/i.test(entry));
    if (!hits.length) throw new Error("not in the zip: " + name);
    return hits.sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
  };

  const occt = await require("occt-import-js")();
  const manifest = { pitchMM: PITCH, parts: [] };
  let ok = 0, fail = 0;
  for (const [id, category, name, zipKey, internal, flags] of PARTS) {
    try {
      if (!zipPath[zipKey]) {
        const kept = lastRun.find((entry) => entry.id === id);
        if (!kept || !fs.existsSync(path.join(OUT, id + ".json"))) { console.log("MISSING", id); fail++; continue; }
        const { holes, ...entry } = kept;
        manifest.parts.push(entry);
        ok++;
        continue;
      }
      // Several files merge into one part in their shared CAD frame (a tire on its hub).
      const meshes = [];
      for (const file of [].concat(internal)) {
        const stepBytes = cp.execSync(`unzip -p "${zipPath[zipKey]}" "${resolve(zipKey, file)}"`, { maxBuffer: 1 << 28 });
        const r = occt.ReadStepFile(new Uint8Array(stepBytes), { linearDeflection: 0.08, angularDeflection: 0.4 });
        if (!r || !r.success || !r.meshes.length) throw new Error("no mesh in " + file);
        if (flags && flags.centreEach) {
          const low = [1e9, 1e9, 1e9], high = [-1e9, -1e9, -1e9];
          for (const m of r.meshes) for (let i = 0; i < m.attributes.position.array.length; i += 3) for (let k = 0; k < 3; k++) {
            low[k] = Math.min(low[k], m.attributes.position.array[i + k]); high[k] = Math.max(high[k], m.attributes.position.array[i + k]);
          }
          for (const m of r.meshes) for (let i = 0; i < m.attributes.position.array.length; i += 3) for (let k = 0; k < 3; k++) {
            m.attributes.position.array[i + k] -= (low[k] + high[k]) / 2;
          }
        }
        meshes.push(...r.meshes);
      }
      let pos = [], nor = [], idx = [], base = 0;
      for (const m of meshes) {
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
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log(JSON.stringify({ converted: ok, failed: fail, total: manifest.parts.length }));
})();
