import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBB } from "three/examples/jsm/math/OBB.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import { loadGeometry, CATEGORY_COLOR, type PartMeta } from "./lib/parts";
import { holesFor, hasHoles } from "./lib/holes";
import { OCCUPIER, boreCores, fillsOf, stackAt as stackOnLine, type Core, type Fill, type PartPose } from "./lib/connections";
import { Mechanism, meshingDistance, gearTeeth, type MechanismPart, type StudJoin, type MotorInfo, type SpinInfo, type MeshInfo } from "./lib/mechanism";
import { planCables, rehang, cableLabel, type Cable, type CablePlan } from "./lib/cables";
import { checkBuild, type BuildProblem } from "./lib/rules";
import { BAND_SIZES, isBand, postOf, shapeBand, alongPost, bandLabel, type BandShape } from "./lib/bands";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const PITCH = 12.7;
const HALF = PITCH / 2; // snap step (mm)
const PROUD = 1.0; // how far a hole marker sits off the face (mm) — clears shallow recesses
const snap = (v: number) => Math.round(v / HALF) * HALF;

// How many points the path a traced point leaves behind keeps.
const TRACE_POINTS = 1500;
// How far above the selected part its move arrows float, in mm.
const GIZMO_LIFT = 16;
// How near a click must land to a hole, in screen pixels, to pick it.
const PICK_PIXELS = 16;
// Pins with a cap on one end (0xN connector pins, sheet pins): the head goes on
// the side the pin enters from.
const isHeaded = (id: string) => id.startsWith("pin-connector-0x") || id.startsWith("pin-sheet");
// Parts that wrap around others instead of bumping into them: chain and tread over sprocket
// teeth, a rubber band over the pins it is stretched between.
const WRAPS = (meta: PartMeta) => meta.category === "chain" || meta.id.startsWith("rubber-band-") && meta.id !== "rubber-band-anchor";

export type PlacedPart = { uid: string; meta: PartMeta; mesh: THREE.Mesh };
// A rubber band is not placed like a part: it is stretched round the posts it was put on, so its
// shape is worked out from where they are, every time they move.
type Band = { uid: string; meta: PartMeta; posts: string[]; along: number; mesh: THREE.Mesh; shape: BandShape };
export type BandDraft = { name: string; posts: number };
export type SavedPart = {
  id: string;
  p: [number, number, number];
  q: [number, number, number, number];
  off?: true;                       // this pin was disabled (it doesn't bind its parts)
  sj?: [number, number, number][];  // built-in-pin joins: [thisStudCore, otherPartIndex, otherHoleCore]
  band?: { posts: number[]; at: number }; // a rubber band: the parts it goes round, and how far along the first one
};
export type EditorState = {
  count: number;
  selectedUid: string | null;
  selectedName: string | null;
  bboxMM: { w: number; h: number; d: number };
  motors: number;
  canPivot: boolean; // selected part is held by exactly one pin (a hinge)
  overlaps: number; // parts currently clipping into another part (highlighted red)
  canUndo: boolean;
  canRedo: boolean;
  inventory: InventoryRow[]; // what you'd need off the shelf to build this for real
  gearInfo: string | null;   // for a selected gear: what it meshes with, or how to make it mesh
  running: boolean;
  problems: BuildProblem[];  // what would stop it working for real: loose axles, missing cables...
};

// What Run mode reports to the panel, a few times a second.
export type RunInfo = {
  running: boolean;
  moving: boolean;            // false when a motor is stuck
  movingParts: number;        // groups of parts that can move at all
  motors: MotorInfo[];
  spins: SpinInfo[];
  meshes: MeshInfo[];
  notes: string[];
  tracing: boolean;
};
export const STOPPED: RunInfo = { running: false, moving: true, movingParts: 0, motors: [], spins: [], meshes: [], notes: [], tracing: false };

// One line of the build's parts list.
export type InventoryRow = { id: string; name: string; category: string; count: number };

// A point in the undo history: the whole build plus which part was selected.
type Snapshot = { parts: SavedPart[]; selected: number | null };

export type ViewName = "corner" | "front" | "side" | "top";

// A hole marker identifies a hole on a placed part.
type HoleRef = { partUid: string; holeIndex: number };
// Emitted when the user clicks a hole (to === null) or drags between two holes.
// depth = how many aligned holes the connector must span (for filtering pins).
// axle = one of the holes is square (a gear or wheel's middle) or a motor's socket, so only an
// axle fits; socket = it is the motor's socket, which wants a motor axle.
export type ConnectRequest = { from: HoleRef; to: HoleRef | null; depth: number; axle: boolean; socket: boolean; screen: { x: number; y: number } };
// Emitted when the user right-clicks a placed pin/connector.
export type PartMenu = { uid: string; name: string; disabled: boolean; screen: { x: number; y: number } };

let uidSeq = 1;

export class Editor {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  onChange: (s: EditorState) => void = () => {};
  onConnect: (req: ConnectRequest) => void = () => {};
  onPartMenu: (m: PartMenu) => void = () => {};
  onArmChange: (armed: boolean) => void = () => {};
  onRun: (info: RunInfo) => void = () => {};
  onBandDraft: (draft: BandDraft | null) => void = () => {};

  private occupied = new Set<string>(); // core-keys "<partUid>:<coreIndex>" filled by a pin
  private headAxisCache = new Map<string, THREE.Vector3>();
  private disabledPins = new Set<string>(); // pins that don't bind their parts
  private pinLinks = new Map<string, Set<string>>(); // pin uid -> part uids it fills
  private adj = new Map<string, Set<string>>(); // rigid-connection graph (enabled pins only)
  // A corner's built-in pin plugged straight into another part's hole. There's
  // no separate connector part, so the join is recorded here instead.
  private studJoins: { studPart: string; studCore: string; holePart: string; holeCore: string }[] = [];
  private cores: Core[] = [];  // every bore in the build, world space, as of the last edit
  private fills: Fill[] = [];  // which bores each ENABLED pin and axle passes through
  private colliding = new Set<string>(); // part uids currently clipping another part
  private obbCache = new Map<string, OBB>(); // per-geometry local OBB (center+halfSize)
  private dragGroup: { mesh: THREE.Mesh; start: THREE.Vector3 }[] = [];
  private dragGrabStart = new THREE.Vector3();

  private container: HTMLElement;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private parts = new Map<string, PlacedPart>();
  private selected: PlacedPart | null = null;
  // One reusable selection outline. A fresh BoxHelper per click leaked a
  // geometry every selection, and it boxed the hole markers too (they're
  // children), so the outline sat visibly proud of the part.
  private selBox = new THREE.Box3();
  private helper = new THREE.Box3Helper(this.selBox, new THREE.Color("#ffb020"));

  // hole markers
  private markers: THREE.Mesh[] = [];
  private discGeo = new THREE.CircleGeometry(2.6, 20); // ~the real bore, so it sits inside recessed hole bosses
  // depthTest so solids occlude markers; depthWrite off so translucent discs
  // don't fight each other.
  private markerMat = new THREE.MeshBasicMaterial({ color: 0x18a0ff, transparent: true, opacity: 0.6, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  private markerHotMat = new THREE.MeshBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.95, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  // a corner's built-in pin is male, so it reads gold and sits a touch proud
  private studGeo = new THREE.CircleGeometry(3.1, 20);
  private studMat = new THREE.MeshBasicMaterial({ color: 0xf0a020, transparent: true, opacity: 0.75, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  // a square bore (the middle of a gear or wheel) or a motor's socket takes an axle: green squares
  private squareGeo = new THREE.PlaneGeometry(4.4, 4.4);
  private socketGeo = new THREE.PlaneGeometry(5.4, 5.4);
  private axleMat = new THREE.MeshBasicMaterial({ color: 0x1fae55, transparent: true, opacity: 0.8, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  private hovered: THREE.Mesh | null = null;
  private markersVisible = true;
  // connect drag
  private armed: THREE.Mesh | null = null; // first hole picked in a click-click connect
  private emptyDown: { x: number; y: number } | null = null; // press started on empty space
  private connectFrom: THREE.Mesh | null = null;
  private connectLine: THREE.Line;
  private ground: THREE.Mesh;
  private dragging = false;
  private dragPlane = new THREE.Plane();
  private dragOffset = new THREE.Vector3();
  private hit = new THREE.Vector3();
  private raf = 0;
  private ro: ResizeObserver;
  private grid: THREE.GridHelper;
  // Render-on-demand bookkeeping. Nothing in this scene animates on its own,
  // so painting 60 fps of an identical frame just heats up the GPU.
  private needsRender = true;
  private contextLost = false;
  // Marker facing/occupancy cull, and the visible-marker list raycasts use.
  private cullDirty = true;
  private lastCullCam = new THREE.Vector3(NaN, NaN, NaN);
  private visibleCache: THREE.Mesh[] = [];
  // Pointer gesture state.
  private activePointer: number | null = null; // the pointer that owns the gesture
  private downAt = { x: 0, y: 0 };
  private pendingMove: { clientX: number; clientY: number; buttons: number } | null = null;
  // Undo/redo. Snapshots are just the save format, so a step is small and a
  // restore is exactly a load — no separate "inverse operation" to get wrong.
  private static HISTORY_LIMIT = 80;
  private past: Snapshot[] = [];
  private future: Snapshot[] = [];
  private restoring = false;           // suppress history while replaying a snapshot
  private dragUndo: Snapshot | null = null; // taken at drag start, kept if the part moved
  // Every part definition the editor has seen, so undo/duplicate can rebuild a
  // part without the caller handing the catalogue back each time.
  private catalog = new Map<string, PartMeta>();

  // Move arrows and turn rings on the selected part. They drive an invisible stand-in at the
  // part's centre; the part's whole group follows it, snapped to half a hole and quarter turns.
  private gizmo: TransformControls;
  private gizmoProxy = new THREE.Object3D();
  private gizmoMode: "translate" | "rotate" = "translate";
  private gizmoDrag: { undo: Snapshot; start: THREE.Vector3; pivot: THREE.Vector3; members: { mesh: THREE.Mesh; position: THREE.Vector3; quaternion: THREE.Quaternion }[] } | null = null;
  private gizmoPress = false;

  // Run mode: the build moves the way its pins, axles, gears and motors let it.
  private running = false;
  private mechanism: Mechanism | null = null;
  private runPoses = new Map<string, { position: THREE.Vector3; quaternion: THREE.Quaternion }>();
  private markersBeforeRun = true;
  private runGrab: { body: number; local: THREE.Vector3; plane: THREE.Plane } | null = null;
  private runMoving = true;
  private lastFrame = 0;
  private runInfoClock = 0;
  private pivotRings = new THREE.Group();
  private ringGeo = new THREE.TorusGeometry(4.6, 0.8, 8, 28);
  private ringMat = new THREE.MeshBasicMaterial({ color: 0xff8a1f, depthTest: false, transparent: true, opacity: 0.95 });
  private driveRingMat = new THREE.MeshBasicMaterial({ color: 0x1fbf5a, depthTest: false, transparent: true, opacity: 0.95 });
  private trace: THREE.Line;
  private tracePoints = new Float32Array(TRACE_POINTS * 3);
  private traceCount = 0;
  private traceTarget: { body: number; local: THREE.Vector3 } | null = null;
  // Smart Cables from every motor and sensor to the Brain, worked out from where things are.
  private cablePlan: CablePlan = { cables: [], blocked: [], noBrain: [], noPort: [] };
  private cables = new THREE.Group();
  private cableMat = new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.7, metalness: 0.05 });
  private cableShortMat = new THREE.MeshStandardMaterial({ color: 0xd4343a, roughness: 0.7 });
  private plugMat = new THREE.MeshStandardMaterial({ color: 0xe9ecef, roughness: 0.4 });
  private plugGeo = new THREE.BoxGeometry(7.5, 9, 13);
  private cableClock = 0;
  private problems: BuildProblem[] = [];
  // The name of whatever is under the mouse.
  private tip!: HTMLDivElement;
  private tipClock = 0;
  // Rubber bands, and the one being put on post by post.
  private bands = new Map<string, Band>();
  private selectedBand: Band | null = null;
  private bandDraft: { meta: PartMeta; posts: string[]; along: number; preview: THREE.Mesh | null } | null = null;
  private bandRings = new THREE.Group();

  constructor(container: HTMLElement) {
    this.container = container;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;

    this.scene.background = new THREE.Color("#eaeef4");
    this.scene.fog = new THREE.Fog(0xeaeef4, 900, 2000);

    this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 6000);
    this.camera.position.set(220, 190, 260);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(w, h);
    // Classroom machines run integrated graphics. At ratio 2 a HiDPI panel
    // shades 4x the pixels, which is where most of the stutter came from.
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.target.set(0, 25, 0);
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.minDistance = 60;
    this.controls.maxDistance = 1600;

    // lights
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa7b6, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 1.15);
    dir.position.set(160, 260, 180);
    dir.castShadow = true;
    dir.shadow.mapSize.set(2048, 2048);
    const cam = dir.shadow.camera as THREE.OrthographicCamera;
    cam.near = 10; cam.far = 900; cam.left = -350; cam.right = 350; cam.top = 350; cam.bottom = -350;
    dir.shadow.bias = -0.0005;
    this.scene.add(dir);

    // grid + shadow ground
    const span = PITCH * 48;
    this.grid = new THREE.GridHelper(span, 48, 0xa9b6c6, 0xd0d8e2);
    (this.grid.material as THREE.Material).transparent = true;
    (this.grid.material as THREE.Material).opacity = 0.75;
    this.scene.add(this.grid);

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(span, span),
      new THREE.ShadowMaterial({ opacity: 0.16 }),
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.ground.name = "ground";
    this.scene.add(this.ground);

    // rubber-band line shown while dragging a connection between holes
    this.connectLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
      new THREE.LineBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.9, depthTest: false }),
    );
    this.connectLine.visible = false;
    this.connectLine.renderOrder = 999;
    this.scene.add(this.connectLine);

    this.helper.visible = false;
    this.scene.add(this.helper);

    this.gizmo = new TransformControls(this.camera, this.renderer.domElement);
    this.gizmo.setSize(1);
    this.gizmo.setRotationSnap(Math.PI / 2);
    this.gizmo.setSpace("world");
    // Only the three coloured rings turn a part. The grey ball and the yellow outer ring spin
    // it freely, off the grid, so dragging them did nothing at all: take them away instead.
    const handles = (this.gizmo as unknown as { _gizmo: { gizmo: Record<string, THREE.Object3D>; picker: Record<string, THREE.Object3D> } })._gizmo;
    for (const set of [handles.gizmo.rotate, handles.picker.rotate]) {
      for (const handle of [...set.children]) if (handle.name === "E" || handle.name === "XYZE") set.remove(handle);
    }
    this.scene.add(this.gizmoProxy);
    this.scene.add(this.gizmo.getHelper());
    this.gizmo.addEventListener("change", this.invalidate);
    this.gizmo.addEventListener("dragging-changed", this.onGizmoDragging);
    this.gizmo.addEventListener("objectChange", this.onGizmoMove);

    this.pivotRings.renderOrder = 997;
    this.scene.add(this.pivotRings);
    const traceGeometry = new THREE.BufferGeometry();
    traceGeometry.setAttribute("position", new THREE.BufferAttribute(this.tracePoints, 3));
    traceGeometry.setDrawRange(0, 0);
    this.trace = new THREE.Line(traceGeometry, new THREE.LineBasicMaterial({ color: 0xff2d7a, depthTest: false, transparent: true }));
    this.trace.frustumCulled = false;
    this.trace.renderOrder = 998;
    this.trace.visible = false;
    this.scene.add(this.trace);
    this.scene.add(this.cables);
    this.bandRings.renderOrder = 997;
    this.scene.add(this.bandRings);
    this.tip = document.createElement("div");
    this.tip.className = "hover-tip";
    this.tip.hidden = true;
    container.appendChild(this.tip);

    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", this.onPointerDown, { capture: true });
    el.addEventListener("contextmenu", this.onContextMenu);
    // Scoped to the canvas (not window) so moving the mouse over the palette no
    // longer raycasts the whole marker set; pointer capture keeps a drag alive
    // when the cursor leaves the canvas.
    el.addEventListener("pointermove", this.onPointerMove);
    el.addEventListener("pointerup", this.onPointerUp);
    el.addEventListener("pointerleave", this.onPointerLeave);
    // A cancelled pointer (touch gesture, alt-tab mid-drag) used to strand the
    // editor in drag mode with OrbitControls off — the camera froze until reload.
    el.addEventListener("pointercancel", this.onPointerCancel);
    window.addEventListener("blur", this.onPointerCancel);
    // Driver resets happen on fleet machines; without this the canvas goes
    // black permanently.
    el.addEventListener("webglcontextlost", this.onContextLost);
    el.addEventListener("webglcontextrestored", this.onContextRestored);
    this.controls.addEventListener("change", this.invalidate);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);

    this.animate();
    // dev-only handle for driving the editor from tests; stripped from builds
    if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__vex = this;
  }

  // ---- placing / editing ----------------------------------------------------

  async addPart(meta: PartMeta): Promise<void> {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (isBand(meta.id)) { this.startBand(meta); return; }
    const geo = await loadGeometry(meta);
    this.catalog.set(meta.id, meta);
    const before = this.snapshot();
    const color = meta.color || CATEGORY_COLOR[meta.category] || "#6b7787";
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.55 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const uid = `p${uidSeq++}`;
    mesh.userData.uid = uid;

    // Rest on the grid near the middle of the view, in the nearest clear spot. Dropping it half a
    // hole off the last part hid one behind the other with holes that never lined up.
    mesh.position.set(snap(this.controls.target.x), 0, snap(this.controls.target.z));
    this.restOnGrid(mesh);
    this.moveToClearSpot(mesh);

    this.scene.add(mesh);
    const part: PlacedPart = { uid, meta, mesh };
    this.parts.set(uid, part);
    this.addMarkers(part);
    this.select(part);
    this.commit(before);
    this.emit();
  }

  // Nearest grid spot where the new part neither collides with the build nor sits in front of
  // or behind it on screen: a part dropped in front of another hides that part's holes.
  private moveToClearSpot(mesh: THREE.Mesh) {
    const boxes = [...this.parts.values()].map((p) => p.mesh.geometry.boundingBox!.clone().applyMatrix4(p.mesh.matrixWorld).expandByScalar(1));
    if (!boxes.length) return;
    this.camera.updateMatrixWorld();
    const screenRect = (box: THREE.Box3) => {
      const rect = new THREE.Box2();
      const corner = new THREE.Vector3();
      for (let index = 0; index < 8; index++) {
        corner.set(index & 1 ? box.max.x : box.min.x, index & 2 ? box.max.y : box.min.y, index & 4 ? box.max.z : box.min.z).project(this.camera);
        rect.expandByPoint(new THREE.Vector2(corner.x, corner.y));
      }
      return rect;
    };
    const onScreen = boxes.map(screenRect);
    const own = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
    const start = mesh.position.clone();
    const shifted = new THREE.Box3();
    let fallback: THREE.Vector3 | null = null;
    const offsets: [number, number][] = [];
    for (let across = -16; across <= 16; across++) for (let deep = -16; deep <= 16; deep++) offsets.push([across, deep]);
    offsets.sort((a, b) => Math.hypot(...a) - Math.hypot(...b) || b[1] - a[1] || b[0] - a[0]);
    for (const [across, deep] of offsets) {
      const step = new THREE.Vector3(across * PITCH, 0, deep * PITCH);
      shifted.copy(own).translate(step);
      if (boxes.some((box) => box.intersectsBox(shifted))) continue;
      fallback ??= step;
      const rect = screenRect(shifted);
      if (onScreen.some((other) => other.intersectsBox(rect))) continue;
      fallback = step;
      break;
    }
    if (!fallback) return;
    mesh.position.copy(start).add(fallback);
    mesh.updateMatrixWorld(true);
  }

  private restOnGrid(mesh: THREE.Mesh) {
    // Drop the part so its lowest point rests flush on the grid (y = 0).
    // Uses the geometry box so hole-marker children don't skew it.
    mesh.updateMatrixWorld(true);
    const box = mesh.geometry.boundingBox!.clone().applyMatrix4(mesh.matrixWorld);
    mesh.position.y += -box.min.y;
    mesh.position.y = Math.max(0, mesh.position.y);
    mesh.updateMatrixWorld(true);
  }

  // Attach a clickable ring marker at every hole (as children, so they follow
  // the part automatically). getWorldPosition/Direction of a marker give the
  // hole's world point and axis.
  private addMarkers(part: PlacedPart) {
    if (!hasHoles(part.meta)) return;
    const zAxis = new THREE.Vector3(0, 0, 1);
    holesFor(part.meta).forEach((h, i) => {
      const stud = h.kind === "stud";
      const geometry = stud ? this.studGeo : h.bore === "socket" ? this.socketGeo : h.bore === "square" ? this.squareGeo : this.discGeo;
      const m = new THREE.Mesh(geometry, this.baseMaterial(h.kind, h.bore));
      const axis = new THREE.Vector3(h.axis[0], h.axis[1], h.axis[2]).normalize();
      const off = stud ? PROUD * 1.6 : PROUD;
      m.position.set(h.p[0] + axis.x * off, h.p[1] + axis.y * off, h.p[2] + axis.z * off);
      m.quaternion.setFromUnitVectors(zAxis, axis);
      m.visible = this.markersVisible;
      m.userData.holeRef = { partUid: part.uid, holeIndex: i } as HoleRef;
      m.userData.localTan = h.tan;
      m.userData.kind = h.kind;
      m.userData.bore = h.bore;
      m.userData.core = h.core;
      m.userData.coreKey = `${part.uid}:${h.core}`; // fixed for the marker's life
      m.userData.proud = off;
      part.mesh.add(m);
      this.markers.push(m);
    });
    this.cullDirty = true;
  }

  setMarkersVisible(v: boolean) {
    this.markersVisible = v;
    for (const m of this.markers) m.visible = v;
    this.cullDirty = true;
    this.invalidate();
  }

  private select(part: PlacedPart | null) {
    this.selected = part;
    if (part) this.selectedBand = null;
    this.updateHelper();
  }

  // Re-fit the selection outline to the selected part's own geometry box.
  private updateHelper() {
    const part = this.selected;
    const band = this.selectedBand;
    if (band && !part && !this.running) {
      band.mesh.geometry.computeBoundingBox();
      this.selBox.copy(band.mesh.geometry.boundingBox!).expandByScalar(1.5);
      this.helper.visible = true;
      this.helper.updateMatrixWorld(true);
      if (!this.gizmoDrag) this.gizmo.detach(); // a band goes where its posts go
      this.invalidate();
      return;
    }
    if (!part || !part.mesh.geometry.boundingBox || this.running) {
      this.helper.visible = false;
      if (!this.gizmoDrag) this.gizmo.detach();
      this.invalidate();
      return;
    }
    part.mesh.updateMatrixWorld(true);
    this.selBox.copy(part.mesh.geometry.boundingBox).applyMatrix4(part.mesh.matrixWorld);
    this.helper.visible = true;
    this.helper.updateMatrixWorld(true);
    if (!this.gizmoDrag) {
      // The arrows float just above the part so they never cover its holes; the turn rings
      // stay round its middle, which is what it turns about.
      const center = this.selBox.getCenter(new THREE.Vector3());
      if (this.gizmoMode === "translate") center.y = this.selBox.max.y + GIZMO_LIFT;
      this.gizmoProxy.position.copy(center);
      this.gizmoProxy.quaternion.identity();
      this.gizmoProxy.updateMatrixWorld(true);
      this.gizmo.setMode(this.gizmoMode);
      this.gizmo.attach(this.gizmoProxy);
    }
    this.invalidate();
  }

  /** Show move arrows or turn rings on the selected part. */
  setGizmoMode(mode: "translate" | "rotate") {
    this.gizmoMode = mode;
    this.gizmo.setMode(mode);
    this.updateHelper();
  }

  private onGizmoDragging = (event: { value: unknown }) => {
    const dragging = !!event.value;
    this.controls.enabled = !dragging;
    if (dragging && this.selected) {
      this.gizmoDrag = {
        undo: this.snapshot(),
        start: this.gizmoProxy.position.clone(),
        pivot: this.selBox.getCenter(new THREE.Vector3()),
        members: this.groupOf(this.selected.uid).map((p) => ({ mesh: p.mesh, position: p.mesh.position.clone(), quaternion: p.mesh.quaternion.clone() })),
      };
      return;
    }
    const drag = this.gizmoDrag;
    this.gizmoDrag = null;
    if (!drag) return;
    const moved = drag.members.some((m) => !m.mesh.position.equals(m.position) || !m.mesh.quaternion.equals(m.quaternion));
    if (moved) this.commit(drag.undo);
    this.emit();
  };

  // The stand-in moved: carry the group with it, a half hole or a quarter turn at a time.
  private onGizmoMove = () => {
    const drag = this.gizmoDrag;
    if (!drag) return;
    if (this.gizmo.mode === "translate") {
      const delta = this.gizmoProxy.position.clone().sub(drag.start);
      delta.set(snap(delta.x), snap(delta.y), snap(delta.z));
      for (const m of drag.members) { m.mesh.position.copy(m.position).add(delta); m.mesh.updateMatrixWorld(true); }
    } else {
      // only the three coloured rings; the free-spin ring would turn parts off the grid
      if (this.gizmo.axis !== "X" && this.gizmo.axis !== "Y" && this.gizmo.axis !== "Z") return;
      const turn = this.gizmoProxy.quaternion;
      for (const m of drag.members) {
        m.mesh.position.copy(m.position).sub(drag.pivot).applyQuaternion(turn).add(drag.pivot);
        m.mesh.quaternion.copy(turn).multiply(m.quaternion);
        m.mesh.updateMatrixWorld(true);
      }
    }
    if (this.selected) this.selBox.copy(this.selected.mesh.geometry.boundingBox!).applyMatrix4(this.selected.mesh.matrixWorld);
    this.cullDirty = true;
    this.invalidate();
  };

  selectByUid(uid: string | null) {
    this.select(uid ? this.parts.get(uid) || null : null);
    this.selectedBand = uid ? this.bands.get(uid) || null : null;
    this.emit();
  }

  // Rotate the selected part together with everything it's connected to,
  // about the group's centre (so an assembly turns as one piece).
  rotateSelected(axis: "x" | "y" | "z") {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (!this.selected) return;
    const members = [...this.componentOf(this.selected.uid)].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
    if (!members.length) return;
    const before = this.snapshot();
    const box = new THREE.Box3();
    for (const m of members) box.union(this.worldBox(m));
    const pivot = box.getCenter(new THREE.Vector3());
    const q = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(axis === "x" ? 1 : 0, axis === "y" ? 1 : 0, axis === "z" ? 1 : 0),
      Math.PI / 2,
    );
    for (const m of members) {
      m.mesh.position.sub(pivot).applyQuaternion(q).add(pivot);
      m.mesh.quaternion.premultiply(q);
      m.mesh.updateMatrixWorld(true);
    }
    this.updateHelper();
    this.commit(before);
    this.emit(); // emit lifts the group back out of the base plane if it now clips through
  }

  // Raise or lower the selected part's whole rigid group by one hole.
  nudgeSelectedY(dir: 1 | -1) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (!this.selected) return;
    const group = this.groupOf(this.selected.uid);
    if (dir < 0 && group.some((p) => this.worldBox(p).min.y < HALF - 0.01)) return; // already on the floor
    const before = this.snapshot();
    for (const p of group) { p.mesh.position.y += dir * HALF; p.mesh.updateMatrixWorld(true); }
    this.updateHelper();
    this.commit(before);
    this.emit();
  }

  // Slide the selected group one hole across, in the direction that reads as
  // left/right/further/nearer from where the camera is right now — so the arrow
  // keys do what they look like they should whichever way the build is turned.
  moveSelected(right: number, away: number) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (!this.selected) return;
    const fwd = this.camera.getWorldDirection(new THREE.Vector3());
    fwd.y = 0;
    if (fwd.lengthSq() < 1e-6) return;
    fwd.normalize();
    // Snap the view direction to a world axis so parts stay on the grid.
    const ax = Math.abs(fwd.x) >= Math.abs(fwd.z)
      ? new THREE.Vector3(Math.sign(fwd.x) || 1, 0, 0)
      : new THREE.Vector3(0, 0, Math.sign(fwd.z) || 1);
    const rt = new THREE.Vector3(-ax.z, 0, ax.x);
    const d = new THREE.Vector3().addScaledVector(rt, right * HALF).addScaledVector(ax, away * HALF);
    if (!d.lengthSq()) return;
    const before = this.snapshot();
    for (const p of this.groupOf(this.selected.uid)) { p.mesh.position.add(d); p.mesh.updateMatrixWorld(true); }
    this.updateHelper();
    this.commit(before);
    this.emit();
  }

  // Copy the selected part together with everything pinned to it, and set the
  // copy down alongside — building four identical wheel assemblies shouldn't
  // mean placing every beam and pin four times.
  async duplicateSelected(): Promise<void> {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const sel = this.selected;
    if (!sel) return;
    const comp = this.componentOf(sel.uid);
    const all = [...this.parts.values()];
    const saved = this.serialize();
    const members = all.map((_, i) => i).filter((i) => comp.has(all[i].uid));
    const remap = new Map(members.map((old, now) => [old, now]));
    const subset: SavedPart[] = members.map((i) => {
      const src = saved[i];
      // stud joins address parts by index, so renumber them into the copy
      const sj = src.sj?.map(([a, other, b]): [number, number, number] => [a, remap.get(other) ?? -1, b])
        .filter(([, other]) => other >= 0);
      const out: SavedPart = { id: src.id, p: src.p, q: src.q };
      if (src.off) out.off = true;
      if (sj && sj.length) out.sj = sj;
      return out;
    });
    for (const entry of saved.slice(all.length)) {
      if (entry.band && entry.band.posts.every((post) => remap.has(post))) {
        subset.push({ ...entry, band: { posts: entry.band.posts.map((post) => remap.get(post)!), at: entry.band.at } });
      }
    }

    const box = new THREE.Box3();
    for (const i of members) box.union(this.worldBox(all[i]));
    const offset = new THREE.Vector3(snap(box.getSize(new THREE.Vector3()).x) + PITCH, 0, 0);

    const before = this.snapshot();
    const made = await this.instantiate(subset, offset);
    this.commit(before);
    const selIdx = members.indexOf(all.indexOf(sel));
    this.select(made[selIdx] || made.find(Boolean) || null);
    this.emit();
  }

  private groupOf(uid: string): PlacedPart[] {
    return [...this.componentOf(uid)].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
  }

  deleteSelected() {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (this.selectedBand) {
      const before = this.snapshot();
      this.removeBand(this.selectedBand);
      this.commit(before);
      this.emit();
      return;
    }
    if (!this.selected) return;
    const before = this.snapshot();
    this.removePart(this.selected);
    this.select(null);
    this.commit(before);
    this.emit();
  }

  private removePart(part: PlacedPart) {
    // Drop every reference to the part FIRST. An armed hole, a hover highlight
    // or a half-finished connection pointing at a deleted part used to leave
    // the editor in a dead state: the connector picker would open and do
    // nothing, or the camera would stay locked.
    if (this.armed && (this.armed.userData.holeRef as HoleRef).partUid === part.uid) this.clearArm();
    if (this.hovered && (this.hovered.userData.holeRef as HoleRef).partUid === part.uid) this.hovered = null;
    if (this.connectFrom && (this.connectFrom.userData.holeRef as HoleRef).partUid === part.uid) {
      this.connectFrom = null; this.connectLine.visible = false; this.controls.enabled = true;
    }
    if (this.selected === part) this.select(null);
    this.dragGroup = this.dragGroup.filter((g) => g.mesh !== part.mesh);
    this.studJoins = this.studJoins.filter((j) => j.studPart !== part.uid && j.holePart !== part.uid);
    this.markers = this.markers.filter((m) => (m.userData.holeRef as HoleRef).partUid !== part.uid);
    this.scene.remove(part.mesh);
    part.mesh.clear(); // release the marker children
    (part.mesh.material as THREE.Material).dispose();
    this.parts.delete(part.uid);
    this.disabledPins.delete(part.uid);
    this.pinLinks.delete(part.uid);
    this.colliding.delete(part.uid);
    this.cullDirty = true;
  }

  clear() {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const before = this.snapshot();
    this.wipe();
    this.select(null);
    this.commit(before);
    this.emit();
  }

  // Tear the build down without touching the undo history — the callers that
  // replace the whole build (load, undo, redo) record their own step.
  private wipe() {
    this.cancelBand();
    for (const band of [...this.bands.values()]) this.removeBand(band);
    for (const part of [...this.parts.values()]) this.removePart(part);
    this.studJoins = [];
  }

  // ---- save / load ----------------------------------------------------------

  serialize(): SavedPart[] {
    const list = [...this.parts.values()];
    const indexOf = new Map(list.map((p, i) => [p.uid, i]));
    const coreOf = (key: string) => +key.slice(key.lastIndexOf(":") + 1);
    return list.map((p) => {
      const pose = this.runPoses.get(p.uid); // mid-run, save the build as it was built
      const position = pose?.position ?? p.mesh.position, quaternion = pose?.quaternion ?? p.mesh.quaternion;
      const out: SavedPart = {
        id: p.meta.id,
        p: [position.x, position.y, position.z],
        q: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
      };
      if (this.disabledPins.has(p.uid)) out.off = true;
      // A corner's built-in pin has no separate connector part, so nothing in
      // the geometry re-derives the join. Saving only positions meant every
      // corner bracket came apart the moment a build was loaded back.
      const joins = this.studJoins.filter((j) => j.studPart === p.uid && indexOf.has(j.holePart));
      if (joins.length) out.sj = joins.map((j): [number, number, number] => [coreOf(j.studCore), indexOf.get(j.holePart)!, coreOf(j.holeCore)]);
      return out;
    }).concat([...this.bands.values()]
      .filter((band) => band.posts.every((uid) => indexOf.has(uid)))
      .map((band): SavedPart => ({ id: band.meta.id, p: [0, 0, 0], q: [0, 0, 0, 1], band: { posts: band.posts.map((uid) => indexOf.get(uid)!), at: Math.round(band.along * 100) / 100 } })));
  }

  /** Tell the editor about every part in the library, once. Undo and Duplicate
   *  rebuild parts from this, so they don't need the catalogue passed in. */
  setCatalog(metaById: Map<string, PartMeta>) {
    for (const [id, meta] of metaById) this.catalog.set(id, meta);
  }

  async load(saved: SavedPart[], metaById?: Map<string, PartMeta>) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    if (metaById) this.setCatalog(metaById);
    const before = this.snapshot();
    this.wipe();
    await this.instantiate(saved);
    this.select(null);
    this.commit(before);
    this.emit();
  }

  // Build parts from a saved list, optionally shifted. Shared by load,
  // undo/redo and duplicate so there is one place that knows how a saved part
  // becomes a live one. Returns them in the same order (null where the part id
  // isn't in the catalogue).
  private async instantiate(saved: SavedPart[], offset?: THREE.Vector3): Promise<(PlacedPart | null)[]> {
    const made: (PlacedPart | null)[] = [];
    for (const s of saved) {
      const meta = this.catalog.get(s.id);
      if (!meta || s.band) { made.push(null); continue; } // bands go on once their posts exist
      const geo = await loadGeometry(meta);
      const color = meta.color || CATEGORY_COLOR[meta.category] || "#6b7787";
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.55 }));
      mesh.castShadow = mesh.receiveShadow = true;
      const uid = `p${uidSeq++}`;
      mesh.userData.uid = uid;
      mesh.position.set(s.p[0], s.p[1], s.p[2]);
      if (offset) mesh.position.add(offset);
      mesh.quaternion.set(s.q[0], s.q[1], s.q[2], s.q[3]);
      mesh.updateMatrixWorld(true);
      this.scene.add(mesh);
      const part: PlacedPart = { uid, meta, mesh };
      this.parts.set(uid, part);
      this.addMarkers(part);
      if (s.off) {
        this.disabledPins.add(uid);
        const m = mesh.material as THREE.MeshStandardMaterial;
        m.transparent = true; m.opacity = 0.35; m.needsUpdate = true;
      }
      made.push(part);
    }
    // Second pass: joins point at parts by index, so they all have to exist.
    saved.forEach((s, i) => {
      const stud = made[i];
      if (!stud || !s.sj) return;
      for (const [studCore, holeIdx, holeCore] of s.sj) {
        const hole = made[holeIdx];
        if (!hole) continue;
        this.studJoins.push({
          studPart: stud.uid, studCore: `${stud.uid}:${studCore}`,
          holePart: hole.uid, holeCore: `${hole.uid}:${holeCore}`,
        });
      }
    });
    for (const s of saved) {
      const meta = this.catalog.get(s.id);
      if (!meta || !s.band) continue;
      const posts = s.band.posts.map((index) => made[index]?.uid).filter(Boolean) as string[];
      if (posts.length >= 2) this.makeBand(meta, posts, s.band.at);
    }
    return made;
  }

  // ---- undo / redo ----------------------------------------------------------

  private snapshot(): Snapshot {
    const list = [...this.parts.values()];
    const i = this.selected ? list.indexOf(this.selected) : -1;
    return { parts: this.serialize(), selected: i < 0 ? null : i };
  }
  // Record the state as it was BEFORE the edit that is about to happen.
  private commit(before: Snapshot) {
    if (this.restoring) return;
    this.past.push(before);
    if (this.past.length > Editor.HISTORY_LIMIT) this.past.shift();
    this.future.length = 0;
  }
  canUndo(): boolean { return this.past.length > 0; }
  canRedo(): boolean { return this.future.length > 0; }

  async undo(): Promise<boolean> {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const prev = this.past.pop();
    if (!prev) return false;
    this.future.push(this.snapshot());
    await this.replay(prev);
    return true;
  }
  async redo(): Promise<boolean> {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const next = this.future.pop();
    if (!next) return false;
    this.past.push(this.snapshot());
    await this.replay(next);
    return true;
  }
  private async replay(s: Snapshot) {
    this.restoring = true;
    try {
      this.clearArm();
      this.wipe();
      const made = await this.instantiate(s.parts);
      this.select(s.selected === null ? null : made[s.selected] || null);
    } finally {
      this.restoring = false;
    }
    this.emit();
  }

  // ---- rules ---------------------------------------------------------------

  private computeState(): EditorState {
    const box = new THREE.Box3();
    let motors = 0;
    for (const part of this.parts.values()) {
      part.mesh.updateMatrixWorld(true);
      if (part.mesh.geometry.boundingBox) box.union(part.mesh.geometry.boundingBox.clone().applyMatrix4(part.mesh.matrixWorld));
      if (part.meta.isMotor) motors++;
    }
    const size = this.parts.size ? box.getSize(new THREE.Vector3()) : new THREE.Vector3();
    return {
      count: this.parts.size + this.bands.size,
      selectedUid: this.selected?.uid ?? this.selectedBand?.uid ?? null,
      selectedName: this.selected?.meta.name ?? (this.selectedBand ? bandLabel(this.selectedBand.meta.id, this.selectedBand.shape, this.selectedBand.posts.length) : null),
      bboxMM: { w: +size.x.toFixed(1), h: +size.y.toFixed(1), d: +size.z.toFixed(1) },
      motors,
      canPivot: this.canPivot(this.selected?.uid),
      overlaps: this.colliding.size,
      canUndo: this.past.length > 0,
      canRedo: this.future.length > 0,
      inventory: this.inventory(),
      gearInfo: this.gearInfo(this.selected),
      running: this.running,
      problems: this.problems,
    };
  }

  // A kid placing a gear needs to know whether it is actually touching the next one.
  private gearInfo(part: PlacedPart | null): string | null {
    const teeth = part ? gearTeeth(part.meta.id) : 0;
    if (!part || !teeth) return null;
    const self = this.asMechanismPart(part);
    const meshing: string[] = [];
    let nearest: { part: PlacedPart; holes: number } | null = null;
    for (const other of this.parts.values()) {
      if (other === part || !gearTeeth(other.meta.id)) continue;
      if (meshingDistance(self, this.asMechanismPart(other)) !== null) { meshing.push(other.meta.name); continue; }
      const holes = other.mesh.position.distanceTo(part.mesh.position) / PITCH;
      if (!nearest || holes < nearest.holes) nearest = { part: other, holes };
    }
    if (meshing.length) return `Its teeth mesh with the ${meshing.join(" and the ")}.`;
    if (!nearest) return "Add another gear beside it. Two gears mesh when their middles are (teeth + teeth) \u00f7 24 holes apart.";
    const want = (teeth + gearTeeth(nearest.part.meta.id)) / 24;
    return `Not meshing yet. The ${nearest.part.meta.name} is ${Math.round(nearest.holes * 10) / 10} holes away: put their middles ${want} holes apart, side by side in the same layer.`;
  }

  // What you'd have to pull off the shelf to build this for real.
  private inventory(): InventoryRow[] {
    const by = new Map<string, InventoryRow>();
    for (const p of this.parts.values()) {
      const row = by.get(p.meta.id);
      if (row) row.count++;
      else by.set(p.meta.id, { id: p.meta.id, name: p.meta.name, category: p.meta.category, count: 1 });
    }
    for (const band of this.bands.values()) {
      const row = by.get(band.meta.id);
      if (row) row.count++;
      else by.set(band.meta.id, { id: band.meta.id, name: band.meta.name, category: band.meta.category, count: 1 });
    }
    // The cables are not parts you place, but you still take them off the shelf.
    for (const cable of this.cablePlan.cables) {
      const id = `smart-cable-${cable.length}`;
      const row = by.get(id);
      if (row) row.count++;
      else by.set(id, { id, name: `${cable.length} mm Smart Cable`, category: "cable", count: 1 });
    }
    return [...by.values()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  }

  // ---- cables and build rules -------------------------------------------------

  private recomputeRules() {
    const poses = this.poses();
    this.cablePlan = planCables(poses);
    this.problems = checkBuild(poses, this.fills, this.studJoins.map((join) => ({ studUid: join.studPart, holeUid: join.holePart })), this.cablePlan);
    this.drawCables();
    for (const band of [...this.bands.values()]) {
      band.posts = band.posts.filter((uid) => this.parts.has(uid));
      if (band.posts.length < 2) { this.removeBand(band); continue; } // its posts are gone
      this.reshapeBand(band);
      for (const text of band.shape.problems) this.problems.push({ rule: "band", uids: [band.uid, ...band.posts], text });
    }
  }

  // ---- rubber bands -----------------------------------------------------------

  private bandShapeFor(meta: PartMeta, posts: string[], along: number): BandShape {
    const found = posts.map((uid) => this.parts.get(uid)).filter(Boolean).map((part) => postOf(this.poseOf(part!))).filter(Boolean);
    return shapeBand(meta.name, BAND_SIZES[meta.id].circumference, found as NonNullable<ReturnType<typeof postOf>>[], along);
  }

  private bandGeometry(shape: BandShape, stretch: number): THREE.BufferGeometry {
    // Stretching a band thins it.
    const radius = Math.max(0.55, 1.1 / Math.sqrt(Math.max(1, stretch)));
    const strands = shape.strands.filter((strand) => strand.length > 2)
      .map((strand) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(strand, true), Math.max(48, strand.length * 2), radius, 6, true));
    if (!strands.length) return new THREE.BufferGeometry();
    const merged = strands.length === 1 ? strands[0] : mergeGeometries(strands)!;
    if (strands.length > 1) for (const strand of strands) strand.dispose();
    merged.computeBoundingBox();
    return merged;
  }

  private makeBand(meta: PartMeta, posts: string[], along: number): Band {
    this.scene.updateMatrixWorld(false);
    const shape = this.bandShapeFor(meta, posts, along);
    const color = meta.color || CATEGORY_COLOR[meta.category] || "#c0392b";
    const mesh = new THREE.Mesh(this.bandGeometry(shape, shape.stretch), new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
    mesh.castShadow = true;
    const uid = `p${uidSeq++}`;
    mesh.userData.uid = uid;
    mesh.userData.band = true;
    this.scene.add(mesh);
    const band: Band = { uid, meta, posts, along, mesh, shape };
    this.bands.set(uid, band);
    return band;
  }

  private reshapeBand(band: Band) {
    band.shape = this.bandShapeFor(band.meta, band.posts, band.along);
    band.mesh.geometry.dispose();
    band.mesh.geometry = this.bandGeometry(band.shape, band.shape.stretch);
  }

  private removeBand(band: Band) {
    if (this.selectedBand === band) { this.selectedBand = null; this.updateHelper(); }
    this.scene.remove(band.mesh);
    band.mesh.geometry.dispose();
    (band.mesh.material as THREE.Material).dispose();
    this.bands.delete(band.uid);
  }

  // Putting a band on: click the posts it goes round, in order, then Done (or the first post again).
  private startBand(meta: PartMeta) {
    this.cancelBand();
    this.clearArm();
    this.select(null);
    this.bandDraft = { meta, posts: [], along: 0, preview: null };
    this.onBandDraft({ name: meta.name, posts: 0 });
    this.updateHelper();
  }

  private bandPostClick(): boolean {
    const draft = this.bandDraft;
    if (!draft) return false;
    const hit = this.raycaster.intersectObjects([...this.parts.values()].map((part) => part.mesh), false)
      .find((candidate) => { const part = this.parts.get(candidate.object.userData.uid as string); return part && postOf(this.poseOf(part)); });
    if (!hit) return true;
    const part = this.parts.get(hit.object.userData.uid as string)!;
    if (draft.posts[0] === part.uid && draft.posts.length >= 2) { this.finishBand(); return true; }
    if (draft.posts.includes(part.uid)) return true;
    if (!draft.posts.length) draft.along = alongPost(postOf(this.poseOf(part))!, hit.point);
    draft.posts.push(part.uid);
    this.drawBandDraft();
    this.onBandDraft({ name: draft.meta.name, posts: draft.posts.length });
    return true;
  }

  private drawBandDraft() {
    const draft = this.bandDraft;
    this.bandRings.clear();
    if (draft?.preview) { this.scene.remove(draft.preview); draft.preview.geometry.dispose(); draft.preview = null; }
    if (!draft) { this.invalidate(); return; }
    this.scene.updateMatrixWorld(false);
    const posts = draft.posts.map((uid) => this.parts.get(uid)).filter(Boolean).map((part) => postOf(this.poseOf(part!))!).filter(Boolean);
    const plane = posts[0] ? posts[0].center.clone().addScaledVector(posts[0].axis, draft.along) : null;
    for (const post of posts) {
      const ring = new THREE.Mesh(this.ringGeo, this.driveRingMat);
      const facing = post.axis.dot(posts[0].axis);
      const reach = Math.abs(facing) > 0.5 ? plane!.clone().sub(post.center).dot(posts[0].axis) / facing : 0;
      ring.position.copy(post.center).addScaledVector(post.axis, reach);
      ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), post.axis);
      this.bandRings.add(ring);
    }
    if (draft.posts.length >= 2) {
      const shape = this.bandShapeFor(draft.meta, draft.posts, draft.along);
      draft.preview = new THREE.Mesh(this.bandGeometry(shape, shape.stretch), this.driveRingMat);
      this.scene.add(draft.preview);
    }
    this.invalidate();
  }

  /** Put the band being drawn on its posts. */
  finishBand() {
    const draft = this.bandDraft;
    if (!draft) return;
    const posts = draft.posts.slice();
    this.cancelBand();
    if (posts.length < 2) return;
    const before = this.snapshot();
    const band = this.makeBand(draft.meta, posts, draft.along);
    this.commit(before);
    this.selectedBand = band;
    this.emit();
  }

  cancelBand() {
    if (!this.bandDraft) return;
    const draft = this.bandDraft;
    draft.posts = [];
    this.drawBandDraft();
    this.bandDraft = null;
    this.onBandDraft(null);
  }

  private drawCables() {
    for (const child of this.cables.children) {
      const geometry = (child as THREE.Mesh).geometry;
      if (geometry !== this.plugGeo) geometry.dispose();
    }
    this.cables.clear();
    for (const cable of this.cablePlan.cables) {
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cable.points), 64, 1.5, 6, false), cable.reaches ? this.cableMat : this.cableShortMat);
      tube.castShadow = true;
      tube.userData.cable = cable;
      this.cables.add(tube);
      for (const plug of cable.plugs) {
        const box = new THREE.Mesh(this.plugGeo, this.plugMat);
        box.position.copy(plug.point).addScaledVector(plug.out, 2.5);
        box.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), plug.out);
        box.userData.cable = cable;
        this.cables.add(box);
      }
    }
  }

  // While it runs, the plugs stay in their ports and the cables follow the parts they are in.
  private followCables(seconds: number) {
    this.cableClock += seconds;
    if (this.cableClock < 0.05 || (!this.cablePlan.cables.length && !this.bands.size)) return;
    this.cableClock = 0;
    this.scene.updateMatrixWorld(false);
    for (const band of this.bands.values()) this.reshapeBand(band);
    this.cablePlan = {
      ...this.cablePlan,
      cables: this.cablePlan.cables.map((cable) => {
        const device = this.parts.get(cable.deviceUid), brain = this.parts.get(cable.brainUid);
        return device && brain ? rehang(cable, this.poseOf(device), this.poseOf(brain)) : cable;
      }),
    };
    this.drawCables();
  }

  // Point at a part or a cable and its name shows up beside the mouse.
  private updateTip(event: { clientX: number; clientY: number }) {
    const now = performance.now();
    if (now - this.tipClock < 60) return;
    this.tipClock = now;
    const bandMeshes = [...this.bands.values()].map((band) => band.mesh);
    const hit = this.raycaster.intersectObjects([...this.cables.children, ...bandMeshes, ...[...this.parts.values()].map((part) => part.mesh)], false)[0];
    // A cable is only 3 mm thick, so it counts as pointed at within a few pixels of it.
    const ray = this.raycaster.ray, onRay = new THREE.Vector3(), onCable = new THREE.Vector3();
    let nearCable: Cable | null = null, nearest = Infinity;
    for (const cable of this.cablePlan.cables) {
      for (let index = 1; index < cable.points.length; index++) {
        const missBy = Math.sqrt(ray.distanceSqToSegment(cable.points[index - 1], cable.points[index], onRay, onCable));
        const along = onRay.distanceTo(ray.origin);
        if (missBy < Math.max(2.5, along * 0.008) && along < nearest && (!hit || along <= hit.distance + 1)) { nearest = along; nearCable = cable; }
      }
    }
    // A band is thin too.
    let nearBand: Band | null = null;
    for (const band of this.bands.values()) {
      for (const strand of band.shape.strands) {
        for (let index = 0; index < strand.length; index++) {
          const missBy = Math.sqrt(ray.distanceSqToSegment(strand[index], strand[(index + 1) % strand.length], onRay, onCable));
          const along = onRay.distanceTo(ray.origin);
          if (missBy < Math.max(2, along * 0.007) && along < nearest && (!hit || along <= hit.distance + 1)) { nearest = along; nearBand = band; nearCable = null; }
        }
      }
    }
    const hitBand = hit ? this.bands.get(hit.object.userData.uid as string) : undefined;
    let text = "";
    if (nearBand || (hitBand && !nearCable)) { const band = (nearBand || hitBand)!; text = bandLabel(band.meta.id, band.shape, band.posts.length); }
    else if (nearCable) text = cableLabel(nearCable);
    else if (hit?.object.userData.cable) text = cableLabel(hit.object.userData.cable as Cable);
    else if (hit) {
      const part = this.parts.get(hit.object.userData.uid as string);
      if (part) {
        const cable = this.cablePlan.cables.find((candidate) => candidate.deviceUid === part.uid);
        const used = this.cablePlan.cables.filter((candidate) => candidate.brainUid === part.uid).map((candidate) => candidate.port).sort((first, second) => first - second);
        text = part.meta.name
          + (cable ? ` \u00b7 Brain port ${cable.port}, ${cable.length} mm Smart Cable` : "")
          + (used.length ? ` \u00b7 ports in use: ${used.join(", ")}` : "");
      }
    }
    this.tip.hidden = !text;
    if (!text) return;
    this.tip.textContent = text;
    const box = this.renderer.domElement.getBoundingClientRect();
    this.tip.style.left = `${Math.max(4, Math.min(event.clientX - box.left + 14, box.width - 280))}px`;
    this.tip.style.top = `${event.clientY - box.top + 18}px`;
  }

  // Lift any connected group that has sunk through the base plane back onto it.
  // It deliberately does NOT drop groups that float: dropping ran on every
  // state change, so parts jumped the moment you clicked them and "Raise" was
  // undone the instant it was pressed.
  private settleGroups() {
    const seen = new Set<string>();
    for (const part of this.parts.values()) {
      if (seen.has(part.uid)) continue;
      const comp = this.componentOf(part.uid);
      for (const u of comp) seen.add(u);
      const members = [...comp].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
      if (!members.length) continue;
      let minY = Infinity;
      for (const m of members) minY = Math.min(minY, this.worldBox(m).min.y);
      if (!isFinite(minY) || minY > -0.01) continue;
      for (const m of members) { m.mesh.position.y -= minY; m.mesh.updateMatrixWorld(true); }
    }
  }

  private emit() {
    this.recomputeOccupancy(); // builds the connection graph settling relies on
    this.settleGroups();
    this.recomputeCollisions(); // after settling, on final positions
    this.recomputeRules();
    this.updateHelper();
    this.cullDirty = true;
    this.invalidate();
    this.onChange(this.computeState());
  }

  // ---- interaction ----------------------------------------------------------

  private setPointer(e: { clientX: number; clientY: number }) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

  // Right-click a placed pin/connector to open its options menu.
  private onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    if (this.running) return;
    this.setPointer(e);
    const hits = this.raycaster.intersectObjects([...this.parts.values()].map((p) => p.mesh), false);
    for (const h of hits) {
      const part = this.parts.get(h.object.userData.uid as string);
      if (part && OCCUPIER.has(part.meta.category)) {
        this.onPartMenu({ uid: part.uid, name: part.meta.name, disabled: this.disabledPins.has(part.uid), screen: { x: e.clientX, y: e.clientY } });
        return;
      }
    }
  };

  private onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    if (this.activePointer !== null) return; // a second finger must not hijack the gesture
    this.pendingMove = null;
    this.emptyDown = null;
    this.downAt = { x: e.clientX, y: e.clientY };
    this.setPointer(e);
    if (this.running) { this.runPointerDown(e); return; }
    if (this.bandDraft) {
      // Clicking posts puts the band on them; a drag off the posts still turns the view.
      const before = this.bandDraft.posts.length;
      this.bandPostClick();
      if (this.bandDraft === null || this.bandDraft.posts.length !== before) e.stopImmediatePropagation();
      return;
    }
    // 1) a hole marker starts a connection: holes come first, even under the arrows
    if (this.markersVisible) {
      if (this.armed && this.slideArmedOntoConnector()) { e.stopImmediatePropagation(); return; }
      // the second hole of a pair is forgiving; the first is exact, so a part can still be grabbed
      const picked = this.pickMarker(null, this.armed !== null);
      const mh = picked ? [{ object: picked }] : [];
      if (mh.length) {
        this.capturePointer(e);
        this.connectFrom = mh[0].object as THREE.Mesh;
        this.controls.enabled = false;
        this.setHot(this.connectFrom, true);
        this.connectLine.visible = true;
        this.updateConnectLine(this.worldOf(this.connectFrom));
        // the arrows' grab zone is wider than the arrows: keep them from starting a move too
        e.stopImmediatePropagation();
        return;
      }
    }
    // 2) the move arrows / turn rings win over the part behind them
    if (this.gizmo.object) {
      this.gizmo.pointerHover({ x: this.pointer.x, y: this.pointer.y, button: 0 } as unknown as PointerEvent);
      if (this.gizmo.axis !== null) { this.gizmoPress = true; this.controls.enabled = false; return; }
    }
    // 3) a part body starts a move
    const meshes = [...this.parts.values()].map((p) => p.mesh);
    const hits = this.raycaster.intersectObjects([...meshes, ...[...this.bands.values()].map((band) => band.mesh)], false);
    const band = hits.length ? this.bands.get(hits[0].object.userData.uid as string) : undefined;
    if (band) { // a band only goes where its posts go: pick it, so it can be deleted
      this.select(null);
      this.selectedBand = band;
      this.emit();
      e.stopPropagation();
      return;
    }
    if (hits.length) {
      const part = this.parts.get(hits[0].object.userData.uid as string) || null;
      if (!part) return;
      this.capturePointer(e);
      this.select(part);
      this.emit(); // refresh graph + settle first, so the starts below are final
      this.dragUndo = this.snapshot(); // kept only if the drag actually moves it
      this.dragging = true;
      this.controls.enabled = false;
      this.dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), hits[0].point);
      this.dragOffset.copy(hits[0].point).sub(part.mesh.position);
      this.dragGrabStart.copy(part.mesh.position);
      // drag the whole rigid group (connected parts + their pins) together
      this.dragGroup = [...this.componentOf(part.uid)].map((u) => this.parts.get(u)).filter(Boolean)
        .map((p) => ({ mesh: p!.mesh, start: p!.mesh.position.clone() }));
      e.stopPropagation();
    } else {
      // Empty space: don't cancel yet — this may be the start of an orbit drag.
      // Decided on pointerup (a click cancels, a drag just orbits).
      this.emptyDown = { x: e.clientX, y: e.clientY };
    }
  };

  // Own the pointer for the rest of the gesture, so releasing outside the
  // canvas (or outside the window) still ends the drag.
  private capturePointer(e: PointerEvent) {
    this.activePointer = e.pointerId;
    try { this.renderer.domElement.setPointerCapture(e.pointerId); } catch { /* uncapturable pointer */ }
  }
  private releasePointer() {
    const id = this.activePointer;
    if (id === null) return;
    this.activePointer = null;
    try { this.renderer.domElement.releasePointerCapture(id); } catch { /* already released */ }
  }

  // Record the move and handle it once per rendered frame. A high-polling
  // mouse fired a dozen of these per frame, each one raycasting every marker
  // and rebuilding the drag group's matrices.
  private onPointerMove = (e: PointerEvent) => {
    if (this.activePointer !== null && e.pointerId !== this.activePointer) return;
    this.pendingMove = { clientX: e.clientX, clientY: e.clientY, buttons: e.buttons };
    this.invalidate();
  };

  private flushPointerMove() {
    const ev = this.pendingMove;
    if (!ev) return;
    this.pendingMove = null;
    this.setPointer(ev);
    if (ev.buttons === 0 && !this.connectFrom && !this.dragging) this.updateTip(ev);
    else this.tip.hidden = true;
    if (this.running) {
      const point = new THREE.Vector3();
      if (this.runGrab && this.mechanism && this.raycaster.ray.intersectPlane(this.runGrab.plane, point)) this.mechanism.moveDrag(point);
      return;
    }
    if (this.connectFrom) {
      const target = this.markerUnderPointer(this.connectFrom);
      if (target !== this.hovered) {
        if (this.hovered && this.hovered !== this.connectFrom && this.hovered !== this.armed) this.setHot(this.hovered, false);
        this.hovered = target; if (target) this.setHot(target, true);
      }
      const from = this.worldOf(this.connectFrom);
      this.updateConnectLine(from, target ? this.worldOf(target) : this.pointerOnPlane(from));
      return;
    }
    if (this.dragging && this.selected) {
      if (this.raycaster.ray.intersectPlane(this.dragPlane, this.hit)) {
        const dx = snap(this.hit.x - this.dragOffset.x) - this.dragGrabStart.x;
        const dz = snap(this.hit.z - this.dragOffset.z) - this.dragGrabStart.z;
        for (const g of this.dragGroup) { g.mesh.position.set(g.start.x + dx, g.start.y, g.start.z + dz); g.mesh.updateMatrixWorld(true); }
        this.updateHelper();
        this.cullDirty = true;
      }
      return;
    }
    // Idle: hover-highlight a hole marker. Skipped while a button is held —
    // that's an orbit or pan, and the highlight used to strobe as it swung.
    if (this.markersVisible && ev.buttons === 0) {
      const m = this.pickMarker(null, this.armed !== null);
      if (m !== this.hovered) {
        if (this.hovered && this.hovered !== this.armed) this.setHot(this.hovered, false);
        this.hovered = m; if (m) this.setHot(m, true);
      }
    }
  }

  private onPointerUp = (e: PointerEvent) => {
    if (this.activePointer !== null && e.pointerId !== this.activePointer) return;
    this.flushPointerMove(); // the last move may still be queued for this frame
    this.releasePointer();
    if (this.running) { this.runPointerUp(e); return; }
    if (this.gizmoPress) { this.gizmoPress = false; if (!this.gizmoDrag) this.controls.enabled = true; return; }
    if (this.connectFrom) {
      const fromMarker = this.connectFrom;
      const fromRef = fromMarker.userData.holeRef as HoleRef;
      const target = this.hovered && this.hovered !== fromMarker ? this.hovered : null;
      const toRef = target ? (target.userData.holeRef as HoleRef) : null;
      const draggedTo = toRef && toRef.partUid !== fromRef.partUid ? toRef : null;
      // A click, not a drag: judged by distance, not by whether a single
      // pointermove fired. One pixel of hand tremor used to turn the
      // click-a-hole-then-click-another connect into a silent no-op.
      const clicked = Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) < 4;
      const screen = { x: e.clientX, y: e.clientY };
      if (fromMarker !== this.armed) this.setHot(fromMarker, false);
      if (this.hovered && this.hovered !== this.armed) this.setHot(this.hovered, false);
      this.connectLine.visible = false;
      this.controls.enabled = true;
      this.connectFrom = null; this.hovered = null;
      this.invalidate(); // the rubber-band line just disappeared — repaint even
                         // on the paths below that don't reach emit()

      if (draggedTo) { // dragged straight onto another hole — connect now
        this.clearArm();
        this.pairUp(fromMarker, target!, screen);
        return;
      }
      if (!clicked) { return; } // dragged to nowhere — leave any armed hole alone

      // plain click: arm the first hole, or complete the pair
      if (!this.armed) { this.setArm(fromMarker); return; }
      const armedMarker = this.armed;
      const armedRef = armedMarker.userData.holeRef as HoleRef;
      const sameHandle = armedRef.partUid === fromRef.partUid && armedRef.holeIndex === fromRef.holeIndex;
      this.clearArm();
      if (sameHandle) {
        if (!this.isStud(fromMarker)) this.onConnect({ from: fromRef, to: null, depth: this.stackAtHole(fromRef), screen, axle: this.takesAxle(fromMarker), socket: fromMarker.userData.bore === "socket" });
      } else if (armedRef.partUid !== fromRef.partUid) this.pairUp(armedMarker, fromMarker, screen);
      else this.setArm(fromMarker); // another hole on the same part — start over from it
      return;
    }
    if (this.dragging) {
      this.dragging = false;
      const moved = this.dragGroup.some((g) => !g.mesh.position.equals(g.start));
      this.dragGroup = [];
      this.controls.enabled = true;
      if (moved && this.dragUndo) this.commit(this.dragUndo);
      this.dragUndo = null;
      this.emit();
      return;
    }
    // a click (not an orbit drag) on empty space cancels the armed hole
    if (this.emptyDown) {
      const moved = Math.hypot(e.clientX - this.emptyDown.x, e.clientY - this.emptyDown.y);
      this.emptyDown = null;
      if (moved < 4) {
        this.clearArm();
        if (this.selected || this.selectedBand) { this.selectedBand = null; this.select(null); this.emit(); }
      }
    }
  };

  // Ends the current gesture cleanly however it died — a cancelled touch, a
  // window that lost focus mid-drag, a pointer the browser took back.
  private onPointerCancel = () => {
    if (this.runGrab) { this.runGrab = null; this.mechanism?.endDrag(); this.controls.enabled = true; this.releasePointer(); return; }
    if (this.gizmoPress && !this.gizmoDrag) { this.gizmoPress = false; this.controls.enabled = true; }
    if (!this.connectFrom && !this.dragging && !this.emptyDown) return;
    const wasDragging = this.dragging;
    if (this.connectFrom && this.connectFrom !== this.armed) this.setHot(this.connectFrom, false);
    if (this.hovered && this.hovered !== this.armed) this.setHot(this.hovered, false);
    this.connectFrom = null;
    this.hovered = null;
    this.dragging = false;
    this.dragGroup = [];
    this.dragUndo = null;
    this.emptyDown = null;
    this.pendingMove = null;
    this.connectLine.visible = false;
    this.controls.enabled = true;
    this.releasePointer();
    if (wasDragging) this.emit(); else this.invalidate();
  };

  // Leaving the canvas with no gesture in flight: drop the stale highlight.
  private onPointerLeave = () => {
    this.tip.hidden = true;
    if (this.connectFrom || this.dragging) return;
    this.pendingMove = null;
    if (this.hovered && this.hovered !== this.armed) { this.setHot(this.hovered, false); this.hovered = null; this.invalidate(); }
  };

  private onContextLost = (e: Event) => { e.preventDefault(); this.contextLost = true; };
  // With render-on-demand nothing would repaint after a driver reset unless we
  // explicitly ask for a frame here.
  private onContextRestored = () => { this.contextLost = false; this.cullDirty = true; this.invalidate(); };

  // ---- connection helpers ---------------------------------------------------

  private worldOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldPosition(new THREE.Vector3()); }
  private axisOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldDirection(new THREE.Vector3()).normalize(); }
  private baseMaterial(kind: string, bore: string): THREE.Material {
    return kind === "stud" ? this.studMat : bore === "round" ? this.markerMat : this.axleMat;
  }
  private takesAxle(marker: THREE.Mesh): boolean { return marker.userData.bore === "square" || marker.userData.bore === "socket"; }
  private setHot(marker: THREE.Mesh, hot: boolean) {
    marker.material = hot ? this.markerHotMat : this.baseMaterial(marker.userData.kind, marker.userData.bore);
    marker.scale.setScalar(hot ? 1.5 : 1);
    this.invalidate();
  }
  private isStud(m: THREE.Mesh): boolean { return m.userData.kind === "stud"; }
  private markerFor(ref: HoleRef): THREE.Mesh | null {
    return this.markers.find((m) => { const r = m.userData.holeRef as HoleRef; return r.partUid === ref.partUid && r.holeIndex === ref.holeIndex; }) || null;
  }
  // Two handles on different parts have been paired. A stud is a pin already,
  // so stud+hole joins on the spot; hole+hole asks which connector to use.
  // Either way `first` is the mover — the part clicked first travels.
  private pairUp(first: THREE.Mesh, second: THREE.Mesh, screen: { x: number; y: number }) {
    const a = first.userData.holeRef as HoleRef, b = second.userData.holeRef as HoleRef;
    const sa = this.isStud(first), sb = this.isStud(second);
    if (sa && sb) return;                        // two male pins can't mate
    if (sa || sb) {
      this.joinStud(sa ? a : b, sa ? b : a, a.partUid);
      return;
    }
    this.onConnect({
      from: a, to: b, depth: this.connectionDepth(a, b), screen,
      axle: this.takesAxle(first) || this.takesAxle(second),
      socket: first.userData.bore === "socket" || second.userData.bore === "socket",
    });
  }
  private setArm(marker: THREE.Mesh) { this.armed = marker; this.setHot(marker, true); this.onArmChange(true); }
  clearArm() { if (this.armed) this.setHot(this.armed, false); this.armed = null; this.onArmChange(false); }
  // The cached list the cull pass produced, refreshed on demand so a raycast
  // never sees a stale one. Rebuilding it per pointer event was pure garbage.
  private visibleMarkers(): THREE.Mesh[] {
    this.cullMarkers();
    return this.visibleCache;
  }
  private markerUnderPointer(exclude: THREE.Mesh): THREE.Mesh | null {
    return this.pickMarker(exclude, true);
  }
  // The hole under the pointer, or (forgiving) the nearest one within a fingertip of it.
  // A hole is a few pixels across at a normal zoom: aiming the second hole of a pair that
  // precisely is too much to ask.
  private pickMarker(exclude: THREE.Mesh | null, forgiving: boolean): THREE.Mesh | null {
    const markers = this.visibleMarkers();
    for (const hit of this.raycaster.intersectObjects(markers, false)) if (hit.object !== exclude) return hit.object as THREE.Mesh;
    if (!forgiving) return null;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const surface = this.raycaster.intersectObjects([...this.parts.values()].map((p) => p.mesh), false)[0];
    const reach = surface ? surface.distance + 8 : Infinity; // not through the part in front
    const cameraAt = this.camera.position;
    const world = new THREE.Vector3(), screen = new THREE.Vector3();
    let best: THREE.Mesh | null = null, bestPixels = PICK_PIXELS;
    for (const marker of markers) {
      if (marker === exclude) continue;
      marker.getWorldPosition(world);
      if (world.distanceTo(cameraAt) > reach) continue;
      screen.copy(world).project(this.camera);
      const pixels = Math.hypot((screen.x - this.pointer.x) * rect.width / 2, (screen.y - this.pointer.y) * rect.height / 2);
      if (pixels < bestPixels) { bestPixels = pixels; best = marker; }
    }
    if (best || !this.armed || !surface) return best;
    // With a hole picked, clicking the other PART means "connect to that": a kid clicks the
    // axle, not the speck on its tip. Take that part's hole nearest the pointer.
    const armedUid = (this.armed.userData.holeRef as HoleRef).partUid;
    if (surface.object.userData.uid === armedUid) return null;
    bestPixels = Infinity;
    for (const marker of markers) {
      if (marker === exclude || marker.parent !== surface.object) continue;
      screen.copy(marker.getWorldPosition(world)).project(this.camera);
      const pixels = Math.hypot((screen.x - this.pointer.x) * rect.width / 2, (screen.y - this.pointer.y) * rect.height / 2);
      if (pixels < bestPixels) { bestPixels = pixels; best = marker; }
    }
    return best;
  }
  // World mating point: a hole's open face, or a stud's tip. The marker floats
  // that far off it along the normal.
  private faceOf(marker: THREE.Mesh): THREE.Vector3 {
    return this.worldOf(marker).addScaledVector(this.axisOf(marker), -(marker.userData.proud ?? PROUD));
  }
  // World tangent (a fixed in-plane direction of the part) at this handle.
  private tanOf(marker: THREE.Mesh): THREE.Vector3 {
    const q = new THREE.Quaternion(); (marker.parent as THREE.Object3D).getWorldQuaternion(q);
    const t = marker.userData.localTan as [number, number, number];
    return new THREE.Vector3(t[0], t[1], t[2]).applyQuaternion(q).normalize();
  }
  private pointerOnPlane(through: THREE.Vector3): THREE.Vector3 {
    const n = this.camera.getWorldDirection(new THREE.Vector3()).negate();
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(n, through);
    const out = new THREE.Vector3();
    return this.raycaster.ray.intersectPlane(plane, out) ? out : through.clone();
  }
  private updateConnectLine(a: THREE.Vector3, b?: THREE.Vector3) {
    const p = this.connectLine.geometry.attributes.position as THREE.BufferAttribute;
    const e = b || a;
    p.setXYZ(0, a.x, a.y, a.z); p.setXYZ(1, e.x, e.y, e.z); p.needsUpdate = true;
    this.invalidate();
  }
  private extentAlong(part: PlacedPart, axis: THREE.Vector3): number {
    const size = part.mesh.geometry.boundingBox!.clone().applyMatrix4(part.mesh.matrixWorld).getSize(new THREE.Vector3());
    return Math.abs(size.x * axis.x) + Math.abs(size.y * axis.y) + Math.abs(size.z * axis.z);
  }
  private longAxis(meta: PartMeta): THREE.Vector3 {
    const s = meta.sizeMM, i = s[0] >= s[1] && s[0] >= s[2] ? 0 : s[1] >= s[2] ? 1 : 2;
    return new THREE.Vector3(i === 0 ? 1 : 0, i === 1 ? 1 : 0, i === 2 ? 1 : 0);
  }

  // Identifies the physical bore a marker belongs to. Both faces of a
  // through-hole share one core, so filling it from either side hides both.
  private coreKey(m: THREE.Mesh): string { return m.userData.coreKey as string; }

  // Unit vector (local) toward a headed pin's cap — detected as the wider end.
  private headLocalAxis(meta: PartMeta, geo: THREE.BufferGeometry): THREE.Vector3 {
    const cached = this.headAxisCache.get(meta.id); if (cached) return cached.clone();
    const s = meta.sizeMM, li = s[0] >= s[1] && s[0] >= s[2] ? 0 : s[1] >= s[2] ? 1 : 2;
    const o = [0, 1, 2].filter((i) => i !== li);
    const pos = geo.attributes.position.array as ArrayLike<number>;
    let maxPos = 0, maxNeg = 0;
    for (let i = 0; i < pos.length; i += 3) {
      const perp = Math.hypot(pos[i + o[0]], pos[i + o[1]]);
      if (pos[i + li] > 0) maxPos = Math.max(maxPos, perp); else maxNeg = Math.max(maxNeg, perp);
    }
    const v = new THREE.Vector3().setComponent(li, maxPos >= maxNeg ? 1 : -1);
    this.headAxisCache.set(meta.id, v.clone());
    return v;
  }

  // Move the mover's whole rigid group so its handle mates with the anchor's:
  // normals oppose (the faces meet) and tangents align (no mirroring). The
  // anchor never moves — the part clicked FIRST is always the one that travels.
  private alignGroupTo(mover: THREE.Mesh, anchor: THREE.Mesh) {
    const moverUid = (mover.userData.holeRef as HoleRef).partUid;
    const nM = this.axisOf(mover), tM = this.tanOf(mover);
    const nA = this.axisOf(anchor), tA = this.tanOf(anchor);
    const v1 = nA.clone().negate(), v2 = tA.clone(), v3 = new THREE.Vector3().crossVectors(v1, v2).normalize();
    const u1 = nM.clone(), u2 = tM.clone(), u3 = new THREE.Vector3().crossVectors(u1, u2).normalize();
    const target = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(v1, v2, v3));
    const source = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(u1, u2, u3));
    const delta = target.multiply(source.invert());
    const group = [...this.componentOf(moverUid)].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
    const pivot = this.faceOf(mover);
    for (const p of group) {
      p.mesh.quaternion.premultiply(delta);
      p.mesh.position.sub(pivot).applyQuaternion(delta).add(pivot);
      p.mesh.updateMatrixWorld(true);
    }
    const shift = this.faceOf(anchor).sub(this.faceOf(mover));
    for (const p of group) { p.mesh.position.add(shift); p.mesh.updateMatrixWorld(true); }
  }

  // With a hole picked, a click on a pin or axle that is already in place slides the
  // picked part onto it: the hole lines up with the connector and stops at the spot along
  // it nearest the click. Pins and axles carry no holes of their own to click, so without
  // this a gear could never go onto the axle already sticking out of a motor.
  private slideArmedOntoConnector(): boolean {
    const hole = this.armed!;
    if (this.raycaster.intersectObjects(this.visibleMarkers(), false).length) return false; // an exact hole wins
    const surface = this.raycaster.intersectObjects([...this.parts.values()].map((p) => p.mesh), false)[0];
    const connector = surface && this.parts.get(surface.object.userData.uid as string);
    if (!connector || !OCCUPIER.has(connector.meta.category)) return false;
    const holeUid = (hole.userData.holeRef as HoleRef).partUid, holePart = this.parts.get(holeUid);
    if (!holePart || this.componentOf(holeUid).has(connector.uid)) return false;
    // a square hole turns with its axle; a pin has no flats to drive it
    if (hole.userData.bore === "square" && connector.meta.category === "pin") return false;
    const before = this.snapshot();
    const along = this.longAxis(connector.meta).applyQuaternion(connector.mesh.quaternion).normalize();
    const box = connector.mesh.geometry.boundingBox || (connector.mesh.geometry.computeBoundingBox(), connector.mesh.geometry.boundingBox!);
    const middle = box.getCenter(new THREE.Vector3()).applyMatrix4(connector.mesh.matrixWorld);
    const half = Math.max(...connector.meta.sizeMM) / 2;
    // turn the part (and whatever is pinned to it) so the hole runs along the connector
    const holeAxis = this.axisOf(hole);
    const turn = new THREE.Quaternion().setFromUnitVectors(holeAxis, holeAxis.dot(along) >= 0 ? along : along.clone().negate());
    const group = [...this.componentOf(holeUid)].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
    const pivot = this.worldOf(hole);
    for (const p of group) {
      p.mesh.quaternion.premultiply(turn);
      p.mesh.position.sub(pivot).applyQuaternion(turn).add(pivot);
      p.mesh.updateMatrixWorld(true);
    }
    // where along it: nearest the click, on the connector, its edge on a half-layer
    const thickness = this.extentAlong(holePart, along);
    const room = Math.max(0, half - thickness / 2);
    const nearClick = surface.point.clone().sub(middle).dot(along);
    const edge = Math.round((nearClick - thickness / 2 + half) / (HALF / 2)) * (HALF / 2);
    const spot = Math.max(-room, Math.min(room, edge - half + thickness / 2));
    const holeMiddle = this.faceOf(hole).addScaledVector(this.axisOf(hole), -thickness / 2);
    const shift = middle.addScaledVector(along, spot).sub(holeMiddle);
    for (const p of group) { p.mesh.position.add(shift); p.mesh.updateMatrixWorld(true); }
    this.clearArm();
    this.select(holePart);
    this.commit(before);
    this.emit();
    return true;
  }

  // Plug a corner's built-in pin straight into another part's hole. No separate
  // connector is created — the stud IS the pin.
  joinStud(studRef: HoleRef, holeRef: HoleRef, moverUid: string) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const mStud = this.markerFor(studRef), mHole = this.markerFor(holeRef);
    if (!mStud || !mHole) return;
    if (this.occupied.has(this.coreKey(mHole)) || this.occupied.has(this.coreKey(mStud))) return;
    const before = this.snapshot();
    const mover = moverUid === studRef.partUid ? mStud : mHole;
    this.alignGroupTo(mover, mover === mStud ? mHole : mStud);
    this.studJoins.push({
      studPart: studRef.partUid, studCore: this.coreKey(mStud),
      holePart: holeRef.partUid, holeCore: this.coreKey(mHole),
    });
    this.select(this.parts.get(moverUid) || null);
    this.commit(before);
    this.emit();
  }

  // Connect two holes with a chosen connector (moving the FIRST-clicked part
  // into the second), or drop a connector into a single hole when toRef is null.
  async connect(fromRef: HoleRef, toRef: HoleRef | null, meta: PartMeta) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const mFrom = this.markerFor(fromRef); if (!mFrom) return;
    const fromPart = this.parts.get(fromRef.partUid); if (!fromPart) return;
    if (this.occupied.has(this.coreKey(mFrom))) return; // hole already filled
    const geo = await loadGeometry(meta);
    this.catalog.set(meta.id, meta);
    const before = this.snapshot();
    if (toRef) {
      const mTo = this.markerFor(toRef), partTo = this.parts.get(toRef.partUid);
      if (mTo && partTo && !this.occupied.has(this.coreKey(mTo))) {
        this.alignGroupTo(mFrom, mTo);           // part 1 travels; part 2 holds still
        const pJoin = this.faceOf(mTo);          // where the two faces now meet
        const nJoin = this.axisOf(mFrom);        // out of part 1 at the junction
        // headed pin: head on part 1's OUTER face; else centered at the junction
        if (isHeaded(meta.id)) await this.addHeadedPin(meta, geo, pJoin.clone().addScaledVector(nJoin, -this.extentAlong(fromPart, nJoin)), nJoin);
        else await this.addCenteredConnector(meta, pJoin, nJoin);
        this.select(fromPart); this.commit(before); this.emit();
        return;
      }
    }
    // single hole: head at the grabbed (outer) face, shaft into the part
    const nA = this.axisOf(mFrom), pA = this.faceOf(mFrom);
    if (isHeaded(meta.id)) await this.addHeadedPin(meta, geo, pA, nA.clone().negate());
    else await this.addCenteredConnector(meta, pA, nA);
    this.commit(before);
    this.emit();
  }

  private async addHeadedPin(meta: PartMeta, geo: THREE.BufferGeometry, mouthWorld: THREE.Vector3, shaftDir: THREE.Vector3) {
    const half = Math.max(...meta.sizeMM) / 2;
    const q = new THREE.Quaternion().setFromUnitVectors(this.headLocalAxis(meta, geo), shaftDir.clone().negate());
    await this.addConnectorMesh(meta, mouthWorld.clone().addScaledVector(shaftDir, half), q);
  }
  private async addCenteredConnector(meta: PartMeta, centerWorld: THREE.Vector3, axisWorld: THREE.Vector3) {
    await this.addConnectorMesh(meta, centerWorld, new THREE.Quaternion().setFromUnitVectors(this.longAxis(meta), axisWorld));
  }
  private async addConnectorMesh(meta: PartMeta, position: THREE.Vector3, quaternion: THREE.Quaternion) {
    const geo = await loadGeometry(meta);
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: CATEGORY_COLOR[meta.category] || "#e0a13a", metalness: 0.2, roughness: 0.5 }));
    mesh.castShadow = mesh.receiveShadow = true;
    const uid = `p${uidSeq++}`; mesh.userData.uid = uid;
    mesh.position.copy(position); mesh.quaternion.copy(quaternion);
    mesh.updateMatrixWorld(true);
    this.scene.add(mesh);
    const part: PlacedPart = { uid, meta, mesh };
    this.parts.set(uid, part);
    this.addMarkers(part);
  }

  // Recompute which holes are filled by a pin/shaft (so their markers hide and
  // no second connector can be added). A long pin fills every coaxial hole it
  // spans, from either side.
  private recomputeOccupancy() {
    this.occupied.clear(); this.pinLinks.clear(); this.adj.clear();
    this.cores = boreCores(this.poses());
    this.fills = [];
    for (const pin of this.parts.values()) {
      if (!OCCUPIER.has(pin.meta.category)) continue;
      const fills = fillsOf(this.poseOf(pin), this.cores);
      const links = new Set<string>();
      for (const fill of fills) { this.occupied.add(fill.coreKey); links.add(fill.partUid); }
      this.pinLinks.set(pin.uid, links);
      if (!this.disabledPins.has(pin.uid)) this.fills.push(...fills);
    }
    // rigid-connection graph: an enabled pin binds itself to the parts it fills
    for (const [pinUid, parts] of this.pinLinks) {
      if (this.disabledPins.has(pinUid)) continue;
      for (const partUid of parts) this.link(pinUid, partUid);
    }
    // built-in pins: drop stale joins, then fill the hole and bind the parts
    this.studJoins = this.studJoins.filter((j) => this.parts.has(j.studPart) && this.parts.has(j.holePart));
    for (const j of this.studJoins) {
      this.occupied.add(j.holeCore);
      this.occupied.add(j.studCore); // the stud is spent too
      this.link(j.studPart, j.holePart);
    }
    // hide filled holes right away; the per-frame facing cull refines the rest
    for (const m of this.markers) if (this.occupied.has(this.coreKey(m))) m.visible = false;
  }

  private link(a: string, b: string) {
    (this.adj.get(a) || this.adj.set(a, new Set()).get(a)!).add(b);
    (this.adj.get(b) || this.adj.set(b, new Set()).get(b)!).add(a);
  }
  // All parts rigidly connected to `uid` (through enabled pins), including it.
  private componentOf(uid: string): Set<string> {
    const comp = new Set<string>([uid]), q = [uid];
    while (q.length) { const u = q.pop()!; for (const v of this.adj.get(u) || []) if (!comp.has(v)) { comp.add(v); q.push(v); } }
    return comp;
  }
  setPinEnabled(uid: string, enabled: boolean) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const part = this.parts.get(uid); if (!part) return;
    const before = this.snapshot();
    if (enabled) this.disabledPins.delete(uid); else this.disabledPins.add(uid);
    const mat = part.mesh.material as THREE.MeshStandardMaterial;
    mat.transparent = !enabled; mat.opacity = enabled ? 1 : 0.35; mat.needsUpdate = true;
    this.commit(before);
    this.emit();
  }
  isPinDisabled(uid: string): boolean { return this.disabledPins.has(uid); }

  // ---- connection depth (how many holed parts a pin must span) --------------
  private poseOf(part: PlacedPart): PartPose { return { uid: part.uid, meta: part.meta, matrixWorld: part.mesh.matrixWorld }; }
  private poses(): PartPose[] {
    this.scene.updateMatrixWorld(false);
    return [...this.parts.values()].map((part) => this.poseOf(part));
  }
  // Distinct parts with a hole coaxial with (point, axis) within a stack window.
  private stackAt(point: THREE.Vector3, axis: THREE.Vector3): number {
    return stackOnLine(boreCores(this.poses()), point, axis);
  }
  private connectionDepth(from: HoleRef, to: HoleRef): number {
    const mF = this.markerFor(from), mT = this.markerFor(to);
    if (!mF || !mT) return 2;
    return this.stackAt(this.faceOf(mF), this.axisOf(mF)) + this.stackAt(this.faceOf(mT), this.axisOf(mT));
  }
  private stackAtHole(ref: HoleRef): number {
    const m = this.markerFor(ref);
    return m ? this.stackAt(this.faceOf(m), this.axisOf(m)) : 1;
  }

  // ---- single-pin hinge (pivot) ---------------------------------------------
  private pinsAdjacent(uid: string): string[] {
    return [...(this.adj.get(uid) || [])].filter((u) => { const p = this.parts.get(u); return p && OCCUPIER.has(p.meta.category); });
  }
  private canPivot(uid: string | undefined): boolean {
    return !!uid && this.pinsAdjacent(uid).length === 1;
  }
  private componentWithout(startUid: string, excludeUid: string): Set<string> {
    const comp = new Set<string>([startUid]), q = [startUid];
    while (q.length) { const u = q.pop()!; for (const v of this.adj.get(u) || []) { if (v === excludeUid || comp.has(v)) continue; comp.add(v); q.push(v); } }
    return comp;
  }
  private worldBox(part: PlacedPart): THREE.Box3 {
    part.mesh.updateMatrixWorld(true);
    return part.mesh.geometry.boundingBox!.clone().applyMatrix4(part.mesh.matrixWorld);
  }
  // A part's oriented bounding box in world space, shrunk by COLLIDE_SLOP so
  // parts that merely touch (flush faces, a pin snug in its hole) don't count.
  private static COLLIDE_SLOP = 1.4; // mm trimmed off each half-extent
  private obbWorld(part: PlacedPart): OBB {
    let local = this.obbCache.get(part.meta.id);
    if (!local) {
      const box = part.mesh.geometry.boundingBox!;
      const half = box.getSize(new THREE.Vector3()).multiplyScalar(0.5);
      const center = box.getCenter(new THREE.Vector3());
      local = new OBB(center, half);
      this.obbCache.set(part.meta.id, local.clone());
    }
    const obb = local.clone();
    obb.halfSize.subScalar(Editor.COLLIDE_SLOP).max(new THREE.Vector3(0.1, 0.1, 0.1));
    part.mesh.updateMatrixWorld(true);
    return obb.applyMatrix4(part.mesh.matrixWorld);
  }

  private setColliding(part: PlacedPart, on: boolean) {
    const mat = part.mesh.material as THREE.MeshStandardMaterial;
    mat.emissive.setHex(on ? 0xe53935 : 0x000000);
    mat.emissiveIntensity = on ? 0.55 : 1;
    mat.needsUpdate = true;
    this.invalidate();
  }

  // Flag every part whose solid body clips into another part it isn't connected
  // to — pins included. Parts that are directly pinned/studded together are
  // meant to touch, so they're exempt. Highlight persists until it's resolved.
  private recomputeCollisions() {
    const parts = [...this.parts.values()];
    const obbs = new Map<string, OBB>();
    const aabbs = new Map<string, THREE.Box3>();
    for (const p of parts) { obbs.set(p.uid, this.obbWorld(p)); aabbs.set(p.uid, this.worldBox(p)); }
    const hit = new Set<string>();
    // Two parts on the same pin or axle are as directly connected as a part and its pin: a
    // bucket pinned over the end of an arm overlaps it by design.
    const sharePin = new Set<string>();
    for (const [pinUid, held] of this.pinLinks) {
      if (this.disabledPins.has(pinUid)) continue;
      for (const first of held) for (const second of held) sharePin.add(`${first}|${second}`);
    }
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        if (this.adj.get(a.uid)?.has(b.uid)) continue; // directly connected → allowed
        if (sharePin.has(`${a.uid}|${b.uid}`)) continue;
        // meshing gears' teeth interleave: their boxes overlap by design
        if (gearTeeth(a.meta.id) && gearTeeth(b.meta.id) && meshingDistance(this.asMechanismPart(a), this.asMechanismPart(b)) !== null) continue;
        // chain wraps over sprocket teeth, and a rubber band stretches over whatever it holds
        if (WRAPS(a.meta) || WRAPS(b.meta)) continue;
        // Cheap axis-aligned reject first; the OBB separating-axis test costs
        // far more, and this pass is O(n²) over the whole build.
        if (!aabbs.get(a.uid)!.intersectsBox(aabbs.get(b.uid)!)) continue;
        if (obbs.get(a.uid)!.intersectsOBB(obbs.get(b.uid)!)) { hit.add(a.uid); hit.add(b.uid); }
      }
    }
    for (const uid of this.colliding) if (!hit.has(uid)) { const p = this.parts.get(uid); if (p) this.setColliding(p, false); }
    for (const uid of hit) if (!this.colliding.has(uid)) { const p = this.parts.get(uid); if (p) this.setColliding(p, true); }
    this.colliding = hit;
  }

  // Rotate the selected part's movable sub-group 90° around its single pin.
  // Always turns — if the new position clips another part, the overlapping
  // pieces are highlighted red (by recomputeCollisions) rather than blocked.
  // The whole build lifts if the rotation would dip a part below the base plane.
  pivotSelected(): boolean {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const sel = this.selected; if (!sel) return false;
    const pins = this.pinsAdjacent(sel.uid); if (pins.length !== 1) return false;
    const pin = this.parts.get(pins[0])!;
    const before = this.snapshot();
    const axis = this.longAxis(pin.meta).applyQuaternion(pin.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
    const pivot = pin.mesh.getWorldPosition(new THREE.Vector3());
    const cut = this.componentWithout(sel.uid, pin.uid);
    const movable = [...cut].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];

    const q = new THREE.Quaternion().setFromAxisAngle(axis, Math.PI / 2);
    for (const p of movable) {
      p.mesh.position.copy(p.mesh.position.clone().sub(pivot).applyQuaternion(q).add(pivot));
      p.mesh.quaternion.premultiply(q);
      p.mesh.updateMatrixWorld(true);
    }
    this.updateHelper();
    this.commit(before);
    this.emit(); // settles the group onto the base plane + flags any overlaps
    return true;
  }

  deletePartByUid(uid: string) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const part = this.parts.get(uid); if (!part) return;
    const before = this.snapshot();
    if (this.selected === part) this.select(null);
    this.removePart(part);
    this.commit(before);
    this.emit();
  }
  // Swap a placed connector for another at the same spot.
  async replaceConnector(uid: string, meta: PartMeta) {
    this.stopRun(); // any edit ends a run, and the build goes back where it was
    const old = this.parts.get(uid); if (!old) return;
    this.catalog.set(meta.id, meta);
    const before = this.snapshot();
    const center = old.mesh.getWorldPosition(new THREE.Vector3());
    const axis = this.longAxis(old.meta).applyQuaternion(old.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
    this.removePart(old);
    await this.addCenteredConnector(meta, center, axis);
    this.select(null); this.commit(before); this.emit();
  }

  // ---- run mode ---------------------------------------------------------------

  private asMechanismPart(part: PlacedPart): MechanismPart {
    const meta = part.meta;
    return { uid: part.uid, id: meta.id, name: meta.name, category: meta.category, isMotor: !!meta.isMotor, sizeMM: meta.sizeMM, object: part.mesh, geometry: part.mesh.geometry };
  }

  isRunning(): boolean { return this.running; }

  /** Let the build move: motors turn, gears mesh, hinges swing. Stop puts everything back. */
  startRun(): RunInfo {
    if (this.running) return this.runInfo();
    this.onPointerCancel();
    this.clearArm();
    this.recomputeOccupancy();
    this.runPoses.clear();
    for (const part of this.parts.values()) this.runPoses.set(part.uid, { position: part.mesh.position.clone(), quaternion: part.mesh.quaternion.clone() });
    const studs: StudJoin[] = [];
    for (const join of this.studJoins) {
      const core = this.cores.find((candidate) => candidate.key === join.holeCore);
      if (core) studs.push({ studUid: join.studPart, holeUid: join.holePart, center: core.center, axis: core.axis });
    }
    this.mechanism = new Mechanism([...this.parts.values()].map((part) => this.asMechanismPart(part)), this.fills, studs);
    this.running = true;
    this.runMoving = true;
    this.lastFrame = 0;
    this.runInfoClock = 0;
    this.markersBeforeRun = this.markersVisible;
    this.setMarkersVisible(false);
    this.updateHelper();
    for (const pose of this.mechanism.hingePoses()) {
      const ring = new THREE.Mesh(this.ringGeo, pose.driven ? this.driveRingMat : this.ringMat);
      ring.renderOrder = 997;
      this.pivotRings.add(ring);
    }
    this.updateRings();
    this.clearTrace();
    const info = this.runInfo();
    this.onRun(info);
    this.invalidate();
    return info;
  }

  stopRun() {
    if (!this.running) return;
    this.running = false;
    if (this.runGrab) { this.runGrab = null; this.controls.enabled = true; this.releasePointer(); }
    this.mechanism = null;
    for (const [uid, pose] of this.runPoses) {
      const part = this.parts.get(uid);
      if (!part) continue;
      part.mesh.position.copy(pose.position);
      part.mesh.quaternion.copy(pose.quaternion);
      part.mesh.updateMatrixWorld(true);
    }
    this.runPoses.clear();
    this.pivotRings.clear();
    this.clearTrace();
    this.setMarkersVisible(this.markersBeforeRun);
    this.onRun(STOPPED);
    this.emit();
  }

  setMotorSpeed(motorUid: string, percent: number) {
    this.mechanism?.setMotorSpeed(motorUid, percent);
    this.onRun(this.runInfo());
  }

  clearTrace() {
    this.traceTarget = null;
    this.traceCount = 0;
    this.trace.geometry.setDrawRange(0, 0);
    this.trace.visible = false;
    if (this.running) this.onRun(this.runInfo());
    this.invalidate();
  }

  private runInfo(): RunInfo {
    const mechanism = this.mechanism;
    if (!this.running || !mechanism) return STOPPED;
    return {
      running: true,
      moving: this.runMoving,
      movingParts: mechanism.bodies.length - 1,
      motors: mechanism.motors(),
      spins: mechanism.spinRates(),
      meshes: mechanism.gearMeshes(),
      notes: mechanism.notes,
      tracing: this.traceTarget !== null,
    };
  }

  // Grab a moving part to turn it by hand. A click without a drag traces that point instead.
  private runPointerDown(e: PointerEvent) {
    const mechanism = this.mechanism;
    if (!mechanism) return;
    const hit = this.raycaster.intersectObjects([...this.parts.values()].map((p) => p.mesh), false)[0];
    if (!hit) return;
    const body = mechanism.bodyIndexOf(hit.object.userData.uid as string);
    if (body === undefined || mechanism.isGround(body)) return; // the frame holds still: let the view orbit
    this.capturePointer(e);
    this.controls.enabled = false;
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()).negate(), hit.point);
    this.runGrab = { body, local: mechanism.localPoint(body, hit.point), plane };
    mechanism.startDrag(body, hit.point);
    e.stopPropagation();
  }

  private runPointerUp(e: PointerEvent) {
    const grab = this.runGrab;
    if (!grab) return;
    this.runGrab = null;
    this.mechanism?.endDrag();
    this.controls.enabled = true;
    if (Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) < 4) {
      this.clearTrace();
      this.traceTarget = { body: grab.body, local: grab.local };
      this.trace.visible = true;
      this.onRun(this.runInfo());
    }
  }

  private advanceRun(time: number) {
    const mechanism = this.mechanism;
    if (!mechanism) return;
    const seconds = this.lastFrame ? Math.min(0.05, Math.max(0, (time - this.lastFrame) / 1000)) : 0;
    this.lastFrame = time;
    if (seconds > 0) this.runMoving = mechanism.step(seconds);
    this.followCables(seconds);
    this.updateRings();
    this.extendTrace();
    this.runInfoClock += seconds;
    if (this.runInfoClock >= 0.2) { this.runInfoClock = 0; this.onRun(this.runInfo()); }
  }

  private updateRings() {
    const poses = this.mechanism?.hingePoses() || [];
    const zAxis = new THREE.Vector3(0, 0, 1);
    this.pivotRings.children.forEach((ring, index) => {
      const pose = poses[index];
      if (!pose) return;
      ring.position.copy(pose.position);
      ring.quaternion.setFromUnitVectors(zAxis, pose.axis);
    });
  }

  private extendTrace() {
    if (!this.traceTarget || !this.mechanism) return;
    const point = this.mechanism.worldPoint(this.traceTarget.body, this.traceTarget.local);
    const points = this.tracePoints;
    if (this.traceCount) {
      const last = (this.traceCount - 1) * 3;
      if (Math.hypot(points[last] - point.x, points[last + 1] - point.y, points[last + 2] - point.z) < 0.4) return;
    }
    if (this.traceCount === TRACE_POINTS) { points.copyWithin(0, 3); this.traceCount--; }
    points.set([point.x, point.y, point.z], this.traceCount * 3);
    this.traceCount++;
    (this.trace.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    this.trace.geometry.setDrawRange(0, this.traceCount);
  }

  private resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5)); // window may have moved to another monitor
    this.renderer.setSize(w, h);
    this.invalidate();
  }

  // Hide hole markers whose face points away from the camera (the far side of
  // a piece); depthTest hides the rest that sit behind other solid pieces.
  // Only reruns when the camera moved or the build changed, and reads
  // matrixWorld directly — running the old version per frame over every marker
  // in a big build was the single largest source of frame stutter.
  private cullMarkers() {
    if (!this.cullDirty && this.lastCullCam.equals(this.camera.position)) return;
    this.lastCullCam.copy(this.camera.position);
    this.cullDirty = false;
    if (!this.markers.length) { this.visibleCache = []; return; }
    this.scene.updateMatrixWorld(false);
    const cam = this.camera.position;
    const vis: THREE.Mesh[] = [];
    for (const m of this.markers) {
      if (!this.markersVisible) { m.visible = false; continue; }
      // world position sits at elements 12..14, the marker's +Z axis at 8..10
      const e = m.matrixWorld.elements;
      const facing = e[8] * (cam.x - e[12]) + e[9] * (cam.y - e[13]) + e[10] * (cam.z - e[14]) > 0;
      m.visible = m === this.armed || (facing && !this.occupied.has(m.userData.coreKey as string));
      if (m.visible) vis.push(m);
    }
    this.visibleCache = vis;
    this.invalidate();
  }

  /** Ask for one more frame. Nothing here animates on its own, so the renderer
   *  idles until something actually changes. */
  invalidate = () => { this.needsRender = true; };

  private animate = (time: number = performance.now()) => {
    this.raf = requestAnimationFrame(this.animate);
    if (this.contextLost) return;
    if (this.pendingMove) this.flushPointerMove();
    if (this.controls.update()) this.needsRender = true; // damping still settling
    if (this.running) { this.advanceRun(time); this.needsRender = true; } // a running build moves every frame
    if (!this.needsRender) return;
    this.needsRender = false;
    this.cullMarkers();
    this.renderer.render(this.scene, this.camera);
  };

  frameAll() { this.setView("corner"); }

  // Straight-on views. Orbiting is the part kids lose themselves in; being able
  // to snap back to front/side/top makes the build readable again.
  setView(view: ViewName) {
    const box = new THREE.Box3();
    // geometry boxes only — expandByObject would fold in the hole markers and
    // their hover scaling, framing the build looser than it really is
    for (const p of this.parts.values()) box.union(this.worldBox(p));
    const empty = !this.parts.size || box.isEmpty();
    const c = empty ? new THREE.Vector3(0, 25, 0) : box.getCenter(new THREE.Vector3());
    const r = empty ? 380 : box.getSize(new THREE.Vector3()).length() * 0.6 + 90;
    const dir = view === "front" ? new THREE.Vector3(0, 0.001, 1)
      : view === "side" ? new THREE.Vector3(1, 0.001, 0)
      : view === "top" ? new THREE.Vector3(0, 1, 0.002)
        : new THREE.Vector3(0.85, 0.72, 1);
    this.controls.target.copy(c);
    this.camera.position.copy(c).addScaledVector(dir.normalize(), Math.min(Math.max(r, 70), 1500));
    this.camera.up.set(0, 1, 0);
    this.controls.update();
    this.invalidate();
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    const el = this.renderer.domElement;
    el.removeEventListener("pointerdown", this.onPointerDown, { capture: true } as EventListenerOptions);
    el.removeEventListener("contextmenu", this.onContextMenu);
    el.removeEventListener("pointermove", this.onPointerMove);
    el.removeEventListener("pointerup", this.onPointerUp);
    el.removeEventListener("pointerleave", this.onPointerLeave);
    el.removeEventListener("pointercancel", this.onPointerCancel);
    el.removeEventListener("webglcontextlost", this.onContextLost);
    el.removeEventListener("webglcontextrestored", this.onContextRestored);
    window.removeEventListener("blur", this.onPointerCancel);
    this.controls.removeEventListener("change", this.invalidate);
    this.ro.disconnect();
    this.controls.dispose();
    this.running = false;
    this.gizmo.detach();
    this.gizmo.dispose();
    this.pivotRings.clear();
    this.ringGeo.dispose(); this.ringMat.dispose(); this.driveRingMat.dispose();
    this.trace.geometry.dispose(); (this.trace.material as THREE.Material).dispose();
    this.squareGeo.dispose(); this.socketGeo.dispose(); this.axleMat.dispose();
    this.cablePlan = { cables: [], blocked: [], noBrain: [], noPort: [] };
    this.drawCables();
    this.plugGeo.dispose(); this.cableMat.dispose(); this.cableShortMat.dispose(); this.plugMat.dispose();
    this.tip.remove();
    this.bandRings.clear();
    // Hand the GPU back everything this editor made. Part geometries live in a
    // module-level cache shared with the next editor, so they stay. Without
    // this a remount (React StrictMode does one on every dev load) leaked a
    // whole scene of buffers, materials and a 2048² shadow map.
    this.wipe();
    this.discGeo.dispose(); this.studGeo.dispose();
    this.markerMat.dispose(); this.markerHotMat.dispose(); this.studMat.dispose();
    this.connectLine.geometry.dispose(); (this.connectLine.material as THREE.Material).dispose();
    this.ground.geometry.dispose(); (this.ground.material as THREE.Material).dispose();
    this.grid.geometry.dispose(); (this.grid.material as THREE.Material).dispose();
    this.helper.geometry.dispose(); (this.helper.material as THREE.Material).dispose();
    this.renderer.dispose();
    el.remove();
  }
}
