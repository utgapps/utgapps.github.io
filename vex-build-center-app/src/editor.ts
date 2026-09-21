import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBB } from "three/examples/jsm/math/OBB.js";
import { loadGeometry, CATEGORY_COLOR, type PartMeta } from "./lib/parts";
import { holesFor, hasHoles } from "./lib/holes";

const PITCH = 12.7;
const HALF = PITCH / 2; // snap step (mm)
const PROUD = 1.0; // how far a hole marker sits off the face (mm) — clears shallow recesses
const snap = (v: number) => Math.round(v / HALF) * HALF;

// Categories that fill holes when placed (so those holes become occupied).
const OCCUPIER = new Set(["pin", "shaft"]);
// Pins with a cap on one end (0xN connector pins, sheet pins): the head goes on
// the side the pin enters from.
const isHeaded = (id: string) => id.startsWith("pin-connector-0x") || id.startsWith("pin-sheet");

export type PlacedPart = { uid: string; meta: PartMeta; mesh: THREE.Mesh };
export type SavedPart = {
  id: string;
  p: [number, number, number];
  q: [number, number, number, number];
  off?: true;                       // this pin was disabled (it doesn't bind its parts)
  sj?: [number, number, number][];  // built-in-pin joins: [thisStudCore, otherPartIndex, otherHoleCore]
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
};

// One line of the build's parts list.
export type InventoryRow = { id: string; name: string; category: string; count: number };

// A point in the undo history: the whole build plus which part was selected.
type Snapshot = { parts: SavedPart[]; selected: number | null };

export type ViewName = "corner" | "front" | "side" | "top";

// A hole marker identifies a hole on a placed part.
type HoleRef = { partUid: string; holeIndex: number };
// Emitted when the user clicks a hole (to === null) or drags between two holes.
// depth = how many aligned holes the connector must span (for filtering pins).
export type ConnectRequest = { from: HoleRef; to: HoleRef | null; depth: number; screen: { x: number; y: number } };
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

  private occupied = new Set<string>(); // core-keys "<partUid>:<coreIndex>" filled by a pin
  private headAxisCache = new Map<string, THREE.Vector3>();
  private disabledPins = new Set<string>(); // pins that don't bind their parts
  private pinLinks = new Map<string, Set<string>>(); // pin uid -> part uids it fills
  private adj = new Map<string, Set<string>>(); // rigid-connection graph (enabled pins only)
  // A corner's built-in pin plugged straight into another part's hole. There's
  // no separate connector part, so the join is recorded here instead.
  private studJoins: { studPart: string; studCore: string; holePart: string; holeCore: string }[] = [];
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

    // rest on the grid, near the camera target, offset a touch so stacked adds don't overlap exactly
    const off = (this.parts.size % 4) * HALF;
    mesh.position.set(snap(this.controls.target.x) + off, 0, snap(this.controls.target.z) + off);
    this.restOnGrid(mesh);

    this.scene.add(mesh);
    const part: PlacedPart = { uid, meta, mesh };
    this.parts.set(uid, part);
    this.addMarkers(part);
    this.select(part);
    this.commit(before);
    this.emit();
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
      const m = new THREE.Mesh(stud ? this.studGeo : this.discGeo, stud ? this.studMat : this.markerMat);
      const axis = new THREE.Vector3(h.axis[0], h.axis[1], h.axis[2]).normalize();
      const off = stud ? PROUD * 1.6 : PROUD;
      m.position.set(h.p[0] + axis.x * off, h.p[1] + axis.y * off, h.p[2] + axis.z * off);
      m.quaternion.setFromUnitVectors(zAxis, axis);
      m.visible = this.markersVisible;
      m.userData.holeRef = { partUid: part.uid, holeIndex: i } as HoleRef;
      m.userData.localTan = h.tan;
      m.userData.kind = h.kind;
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
    this.updateHelper();
  }

  // Re-fit the selection outline to the selected part's own geometry box.
  private updateHelper() {
    const part = this.selected;
    if (!part || !part.mesh.geometry.boundingBox) { this.helper.visible = false; this.invalidate(); return; }
    part.mesh.updateMatrixWorld(true);
    this.selBox.copy(part.mesh.geometry.boundingBox).applyMatrix4(part.mesh.matrixWorld);
    this.helper.visible = true;
    this.helper.updateMatrixWorld(true);
    this.invalidate();
  }

  selectByUid(uid: string | null) {
    this.select(uid ? this.parts.get(uid) || null : null);
    this.emit();
  }

  // Rotate the selected part together with everything it's connected to,
  // about the group's centre (so an assembly turns as one piece).
  rotateSelected(axis: "x" | "y" | "z") {
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
    const before = this.snapshot();
    this.wipe();
    this.select(null);
    this.commit(before);
    this.emit();
  }

  // Tear the build down without touching the undo history — the callers that
  // replace the whole build (load, undo, redo) record their own step.
  private wipe() {
    for (const part of [...this.parts.values()]) this.removePart(part);
    this.studJoins = [];
  }

  // ---- save / load ----------------------------------------------------------

  serialize(): SavedPart[] {
    const list = [...this.parts.values()];
    const indexOf = new Map(list.map((p, i) => [p.uid, i]));
    const coreOf = (key: string) => +key.slice(key.lastIndexOf(":") + 1);
    return list.map((p) => {
      const out: SavedPart = {
        id: p.meta.id,
        p: [p.mesh.position.x, p.mesh.position.y, p.mesh.position.z],
        q: [p.mesh.quaternion.x, p.mesh.quaternion.y, p.mesh.quaternion.z, p.mesh.quaternion.w],
      };
      if (this.disabledPins.has(p.uid)) out.off = true;
      // A corner's built-in pin has no separate connector part, so nothing in
      // the geometry re-derives the join. Saving only positions meant every
      // corner bracket came apart the moment a build was loaded back.
      const joins = this.studJoins.filter((j) => j.studPart === p.uid && indexOf.has(j.holePart));
      if (joins.length) out.sj = joins.map((j): [number, number, number] => [coreOf(j.studCore), indexOf.get(j.holePart)!, coreOf(j.holeCore)]);
      return out;
    });
  }

  /** Tell the editor about every part in the library, once. Undo and Duplicate
   *  rebuild parts from this, so they don't need the catalogue passed in. */
  setCatalog(metaById: Map<string, PartMeta>) {
    for (const [id, meta] of metaById) this.catalog.set(id, meta);
  }

  async load(saved: SavedPart[], metaById?: Map<string, PartMeta>) {
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
      if (!meta) { made.push(null); continue; }
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
    const prev = this.past.pop();
    if (!prev) return false;
    this.future.push(this.snapshot());
    await this.replay(prev);
    return true;
  }
  async redo(): Promise<boolean> {
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
      count: this.parts.size,
      selectedUid: this.selected?.uid ?? null,
      selectedName: this.selected?.meta.name ?? null,
      bboxMM: { w: +size.x.toFixed(1), h: +size.y.toFixed(1), d: +size.z.toFixed(1) },
      motors,
      canPivot: this.canPivot(this.selected?.uid),
      overlaps: this.colliding.size,
      canUndo: this.past.length > 0,
      canRedo: this.future.length > 0,
      inventory: this.inventory(),
    };
  }

  // What you'd have to pull off the shelf to build this for real.
  private inventory(): InventoryRow[] {
    const by = new Map<string, InventoryRow>();
    for (const p of this.parts.values()) {
      const row = by.get(p.meta.id);
      if (row) row.count++;
      else by.set(p.meta.id, { id: p.meta.id, name: p.meta.name, category: p.meta.category, count: 1 });
    }
    return [...by.values()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
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
    // 1) a hole marker starts a connection
    if (this.markersVisible) {
      const mh = this.raycaster.intersectObjects(this.visibleMarkers(), false);
      if (mh.length) {
        this.capturePointer(e);
        this.connectFrom = mh[0].object as THREE.Mesh;
        this.controls.enabled = false;
        this.setHot(this.connectFrom, true);
        this.connectLine.visible = true;
        this.updateConnectLine(this.worldOf(this.connectFrom));
        e.stopPropagation();
        return;
      }
    }
    // 2) a part body starts a move
    const meshes = [...this.parts.values()].map((p) => p.mesh);
    const hits = this.raycaster.intersectObjects(meshes, false);
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
      const m = (this.raycaster.intersectObjects(this.visibleMarkers(), false)[0]?.object as THREE.Mesh) || null;
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
        if (!this.isStud(fromMarker)) this.onConnect({ from: fromRef, to: null, depth: this.stackAtHole(fromRef), screen });
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
        if (this.selected) { this.select(null); this.emit(); }
      }
    }
  };

  // Ends the current gesture cleanly however it died — a cancelled touch, a
  // window that lost focus mid-drag, a pointer the browser took back.
  private onPointerCancel = () => {
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
  private setHot(marker: THREE.Mesh, hot: boolean) {
    const base = marker.userData.kind === "stud" ? this.studMat : this.markerMat;
    marker.material = hot ? this.markerHotMat : base;
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
    this.onConnect({ from: a, to: b, depth: this.connectionDepth(a, b), screen });
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
    for (const h of this.raycaster.intersectObjects(this.visibleMarkers(), false)) if (h.object !== exclude) return h.object as THREE.Mesh;
    return null;
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

  // Plug a corner's built-in pin straight into another part's hole. No separate
  // connector is created — the stud IS the pin.
  joinStud(studRef: HoleRef, holeRef: HoleRef, moverUid: string) {
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
    const occupiers = [...this.parts.values()].filter((p) => OCCUPIER.has(p.meta.category));
    const cores = this.buildCores();
    for (const pin of occupiers) {
      const axis = this.longAxis(pin.meta).applyQuaternion(pin.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
      const pc = pin.mesh.getWorldPosition(new THREE.Vector3());
      const half = this.extentAlong(pin, axis) / 2 + 1.5;
      const links = new Set<string>();
      for (const core of cores) {
        if (Math.abs(core.a.dot(axis)) < 0.9) continue;
        const rel = core.c.clone().sub(pc), t = rel.dot(axis);
        if (Math.abs(t) > half) continue;
        if (rel.addScaledVector(axis, -t).length() > 3.5) continue;
        this.occupied.add(core.key);
        links.add(core.key.slice(0, core.key.lastIndexOf(":")));
      }
      this.pinLinks.set(pin.uid, links);
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
  // Distinct parts with a hole coaxial with (point, axis) within a stack window.
  private stackAt(point: THREE.Vector3, axis: THREE.Vector3): number {
    const parts = new Set<string>();
    for (const core of this.buildCores()) {
      if (Math.abs(core.a.dot(axis)) < 0.9) continue;
      const rel = core.c.clone().sub(point), t = rel.dot(axis);
      if (Math.abs(t) > 45) continue;
      if (rel.addScaledVector(axis, -t).length() > 3.5) continue;
      parts.add(core.key.slice(0, core.key.lastIndexOf(":")));
    }
    return Math.max(1, parts.size);
  }

  // Every physical bore in the scene, in world space: both faces of a
  // through-hole average to one core. Reads matrixWorld directly instead of
  // calling getWorldPosition/getWorldDirection per marker — each of those walks
  // the ancestor chain and allocates, and this runs over every marker in the
  // build on every edit.
  private buildCores(): { key: string; c: THREE.Vector3; a: THREE.Vector3 }[] {
    this.scene.updateMatrixWorld(false);
    const byCore = new Map<string, THREE.Mesh[]>();
    for (const m of this.markers) {
      if (this.isStud(m)) continue; // a stud is male — no pin goes into it
      const k = this.coreKey(m); (byCore.get(k) || byCore.set(k, []).get(k)!).push(m);
    }
    const out: { key: string; c: THREE.Vector3; a: THREE.Vector3 }[] = [];
    for (const [key, ms] of byCore) {
      const c = new THREE.Vector3();
      for (const m of ms) { const e = m.matrixWorld.elements; c.x += e[12]; c.y += e[13]; c.z += e[14]; }
      c.multiplyScalar(1 / ms.length);
      const e0 = ms[0].matrixWorld.elements;
      out.push({ key, c, a: new THREE.Vector3(e0[8], e0[9], e0[10]).normalize() });
    }
    return out;
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
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        const a = parts[i], b = parts[j];
        if (this.adj.get(a.uid)?.has(b.uid)) continue; // directly connected → allowed
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
    const part = this.parts.get(uid); if (!part) return;
    const before = this.snapshot();
    if (this.selected === part) this.select(null);
    this.removePart(part);
    this.commit(before);
    this.emit();
  }
  // Swap a placed connector for another at the same spot.
  async replaceConnector(uid: string, meta: PartMeta) {
    const old = this.parts.get(uid); if (!old) return;
    this.catalog.set(meta.id, meta);
    const before = this.snapshot();
    const center = old.mesh.getWorldPosition(new THREE.Vector3());
    const axis = this.longAxis(old.meta).applyQuaternion(old.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
    this.removePart(old);
    await this.addCenteredConnector(meta, center, axis);
    this.select(null); this.commit(before); this.emit();
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

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate);
    if (this.contextLost) return;
    if (this.pendingMove) this.flushPointerMove();
    if (this.controls.update()) this.needsRender = true; // damping still settling
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
