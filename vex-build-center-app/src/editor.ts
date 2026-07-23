import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
export type SavedPart = { id: string; p: [number, number, number]; q: [number, number, number, number] };
export type EditorState = {
  count: number;
  selectedUid: string | null;
  selectedName: string | null;
  bboxMM: { w: number; h: number; d: number };
  motors: number;
  canPivot: boolean; // selected part is held by exactly one pin (a hinge)
};

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
  private dragGroup: { mesh: THREE.Mesh; start: THREE.Vector3 }[] = [];
  private dragGrabStart = new THREE.Vector3();

  private container: HTMLElement;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private parts = new Map<string, PlacedPart>();
  private selected: PlacedPart | null = null;
  private helper: THREE.BoxHelper | null = null;

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
  private movedDuringDrag = false;
  private ground: THREE.Mesh;
  private dragging = false;
  private dragPlane = new THREE.Plane();
  private dragOffset = new THREE.Vector3();
  private hit = new THREE.Vector3();
  private raf = 0;
  private ro: ResizeObserver;

  constructor(container: HTMLElement) {
    this.container = container;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 600;

    this.scene.background = new THREE.Color("#eaeef4");
    this.scene.fog = new THREE.Fog(0xeaeef4, 900, 2000);

    this.camera = new THREE.PerspectiveCamera(45, w / h, 1, 6000);
    this.camera.position.set(220, 190, 260);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    const grid = new THREE.GridHelper(span, 48, 0xa9b6c6, 0xd0d8e2);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.75;
    this.scene.add(grid);

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

    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", this.onPointerDown, { capture: true });
    el.addEventListener("contextmenu", this.onContextMenu);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);

    this.animate();
    // dev-only handle for driving the editor from tests; stripped from builds
    if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__vex = this;
  }

  // ---- placing / editing ----------------------------------------------------

  async addPart(meta: PartMeta): Promise<void> {
    const geo = await loadGeometry(meta);
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
      m.userData.proud = off;
      part.mesh.add(m);
      this.markers.push(m);
    });
  }

  setMarkersVisible(v: boolean) {
    this.markersVisible = v;
    for (const m of this.markers) m.visible = v;
  }

  private select(part: PlacedPart | null) {
    this.selected = part;
    if (this.helper) { this.scene.remove(this.helper); this.helper.geometry.dispose(); this.helper = null; }
    if (part) {
      this.helper = new THREE.BoxHelper(part.mesh, new THREE.Color("#ffb020"));
      (this.helper.material as THREE.LineBasicMaterial).linewidth = 2;
      this.scene.add(this.helper);
    }
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
    this.helper?.update();
    this.emit(); // emit settles the group back onto the base plane
  }

  nudgeSelectedY(dir: 1 | -1) {
    if (!this.selected) return;
    this.selected.mesh.position.y = Math.max(0, this.selected.mesh.position.y + dir * HALF);
    this.selected.mesh.updateMatrixWorld(true);
    this.helper?.update();
    this.emit();
  }

  deleteSelected() {
    if (!this.selected) return;
    this.removePart(this.selected);
    this.select(null);
    this.emit();
  }

  private removePart(part: PlacedPart) {
    this.markers = this.markers.filter((m) => (m.userData.holeRef as HoleRef).partUid !== part.uid);
    this.scene.remove(part.mesh);
    (part.mesh.material as THREE.Material).dispose();
    this.parts.delete(part.uid);
    this.disabledPins.delete(part.uid);
  }

  clear() {
    for (const part of [...this.parts.values()]) this.removePart(part);
    this.select(null);
    this.emit();
  }

  // ---- save / load ----------------------------------------------------------

  serialize(): SavedPart[] {
    return [...this.parts.values()].map((p) => ({
      id: p.meta.id,
      p: [p.mesh.position.x, p.mesh.position.y, p.mesh.position.z],
      q: [p.mesh.quaternion.x, p.mesh.quaternion.y, p.mesh.quaternion.z, p.mesh.quaternion.w],
    }));
  }

  async load(saved: SavedPart[], metaById: Map<string, PartMeta>) {
    this.clear();
    for (const s of saved) {
      const meta = metaById.get(s.id);
      if (!meta) continue;
      const geo = await loadGeometry(meta);
      const color = meta.color || CATEGORY_COLOR[meta.category] || "#6b7787";
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, metalness: 0.18, roughness: 0.55 }));
      mesh.castShadow = mesh.receiveShadow = true;
      const uid = `p${uidSeq++}`;
      mesh.userData.uid = uid;
      mesh.position.set(s.p[0], s.p[1], s.p[2]);
      mesh.quaternion.set(s.q[0], s.q[1], s.q[2], s.q[3]);
      mesh.updateMatrixWorld(true);
      this.scene.add(mesh);
      const part: PlacedPart = { uid, meta, mesh };
      this.parts.set(uid, part);
      this.addMarkers(part);
    }
    this.select(null);
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
    };
  }

  // Shift each connected group in Y so its lowest point rests on the base
  // plane — dropping it if it floats, lifting it if it clips through.
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
      if (!isFinite(minY) || Math.abs(minY) < 0.01) continue;
      for (const m of members) { m.mesh.position.y -= minY; m.mesh.updateMatrixWorld(true); }
    }
  }

  private emit() {
    this.recomputeOccupancy(); // builds the connection graph settling relies on
    this.settleGroups();
    this.helper?.update();
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
    this.setPointer(e);
    // 1) a hole marker starts a connection
    if (this.markersVisible) {
      const mh = this.raycaster.intersectObjects(this.visibleMarkers(), false);
      if (mh.length) {
        this.connectFrom = mh[0].object as THREE.Mesh;
        this.movedDuringDrag = false;
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
      this.select(part);
      this.emit(); // refresh graph + settle first, so the starts below are final
      this.dragging = true;
      this.controls.enabled = false;
      this.dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), hits[0].point);
      this.dragOffset.copy(hits[0].point).sub(part!.mesh.position);
      this.dragGrabStart.copy(part!.mesh.position);
      // drag the whole rigid group (connected parts + their pins) together
      this.dragGroup = [...this.componentOf(part!.uid)].map((u) => this.parts.get(u)).filter(Boolean)
        .map((p) => ({ mesh: p!.mesh, start: p!.mesh.position.clone() }));
      e.stopPropagation();
    } else {
      // Empty space: don't cancel yet — this may be the start of an orbit drag.
      // Decided on pointerup (a click cancels, a drag just orbits).
      this.emptyDown = { x: e.clientX, y: e.clientY };
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    this.setPointer(e);
    if (this.connectFrom) {
      this.movedDuringDrag = true;
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
        this.helper?.update();
      }
      return;
    }
    // idle: hover-highlight a hole marker
    if (this.markersVisible) {
      const m = (this.raycaster.intersectObjects(this.visibleMarkers(), false)[0]?.object as THREE.Mesh) || null;
      if (m !== this.hovered) {
        if (this.hovered && this.hovered !== this.armed) this.setHot(this.hovered, false);
        this.hovered = m; if (m) this.setHot(m, true);
      }
    }
  };

  private onPointerUp = (e: PointerEvent) => {
    if (this.connectFrom) {
      const fromMarker = this.connectFrom;
      const fromRef = fromMarker.userData.holeRef as HoleRef;
      const target = this.hovered && this.hovered !== fromMarker ? this.hovered : null;
      const toRef = target ? (target.userData.holeRef as HoleRef) : null;
      const draggedTo = toRef && toRef.partUid !== fromRef.partUid ? toRef : null;
      const clicked = !this.movedDuringDrag;
      const screen = { x: e.clientX, y: e.clientY };
      if (fromMarker !== this.armed) this.setHot(fromMarker, false);
      if (this.hovered && this.hovered !== this.armed) this.setHot(this.hovered, false);
      this.connectLine.visible = false;
      this.controls.enabled = true;
      this.connectFrom = null; this.hovered = null;

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
    if (this.dragging) { this.dragging = false; this.controls.enabled = true; this.emit(); return; }
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

  // ---- connection helpers ---------------------------------------------------

  private worldOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldPosition(new THREE.Vector3()); }
  private axisOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldDirection(new THREE.Vector3()).normalize(); }
  private setHot(marker: THREE.Mesh, hot: boolean) {
    const base = marker.userData.kind === "stud" ? this.studMat : this.markerMat;
    marker.material = hot ? this.markerHotMat : base;
    marker.scale.setScalar(hot ? 1.5 : 1);
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
  private visibleMarkers(): THREE.Mesh[] { return this.markers.filter((m) => m.visible); }
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
  private coreKey(m: THREE.Mesh): string { const r = m.userData.holeRef as HoleRef; return `${r.partUid}:${m.userData.core}`; }

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
    const mover = moverUid === studRef.partUid ? mStud : mHole;
    this.alignGroupTo(mover, mover === mStud ? mHole : mStud);
    this.studJoins.push({
      studPart: studRef.partUid, studCore: this.coreKey(mStud),
      holePart: holeRef.partUid, holeCore: this.coreKey(mHole),
    });
    this.select(this.parts.get(moverUid) || null);
    this.emit();
  }

  // Connect two holes with a chosen connector (moving the FIRST-clicked part
  // into the second), or drop a connector into a single hole when toRef is null.
  async connect(fromRef: HoleRef, toRef: HoleRef | null, meta: PartMeta) {
    const mFrom = this.markerFor(fromRef); if (!mFrom) return;
    const fromPart = this.parts.get(fromRef.partUid); if (!fromPart) return;
    if (this.occupied.has(this.coreKey(mFrom))) return; // hole already filled
    const geo = await loadGeometry(meta);
    if (toRef) {
      const mTo = this.markerFor(toRef), partTo = this.parts.get(toRef.partUid);
      if (mTo && partTo && !this.occupied.has(this.coreKey(mTo))) {
        this.alignGroupTo(mFrom, mTo);           // part 1 travels; part 2 holds still
        const pJoin = this.faceOf(mTo);          // where the two faces now meet
        const nJoin = this.axisOf(mFrom);        // out of part 1 at the junction
        // headed pin: head on part 1's OUTER face; else centered at the junction
        if (isHeaded(meta.id)) await this.addHeadedPin(meta, geo, pJoin.clone().addScaledVector(nJoin, -this.extentAlong(fromPart, nJoin)), nJoin);
        else await this.addCenteredConnector(meta, pJoin, nJoin);
        this.select(fromPart); this.emit();
        return;
      }
    }
    // single hole: head at the grabbed (outer) face, shaft into the part
    const nA = this.axisOf(mFrom), pA = this.faceOf(mFrom);
    if (isHeaded(meta.id)) await this.addHeadedPin(meta, geo, pA, nA.clone().negate());
    else await this.addCenteredConnector(meta, pA, nA);
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
    const byCore = new Map<string, THREE.Mesh[]>();
    for (const m of this.markers) {
      if (this.isStud(m)) continue; // a stud is male — no pin goes into it
      const k = this.coreKey(m); (byCore.get(k) || byCore.set(k, []).get(k)!).push(m);
    }
    const cores = [...byCore.entries()].map(([key, ms]) => {
      const c = new THREE.Vector3();
      for (const m of ms) c.add(m.getWorldPosition(new THREE.Vector3()));
      return { key, c: c.multiplyScalar(1 / ms.length), a: this.axisOf(ms[0]) };
    });
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
    if (enabled) this.disabledPins.delete(uid); else this.disabledPins.add(uid);
    const mat = part.mesh.material as THREE.MeshStandardMaterial;
    mat.transparent = !enabled; mat.opacity = enabled ? 1 : 0.35; mat.needsUpdate = true;
    this.emit();
  }
  isPinDisabled(uid: string): boolean { return this.disabledPins.has(uid); }

  // ---- connection depth (how many holed parts a pin must span) --------------
  // Distinct parts with a hole coaxial with (point, axis) within a stack window.
  private stackAt(point: THREE.Vector3, axis: THREE.Vector3): number {
    const parts = new Set<string>();
    const byCore = new Map<string, THREE.Mesh[]>();
    for (const m of this.markers) {
      if (this.isStud(m)) continue; // studs aren't layers a pin passes through
      const k = this.coreKey(m); (byCore.get(k) || byCore.set(k, []).get(k)!).push(m);
    }
    for (const [key, ms] of byCore) {
      const c = new THREE.Vector3();
      for (const m of ms) c.add(m.getWorldPosition(new THREE.Vector3()));
      c.multiplyScalar(1 / ms.length);
      if (Math.abs(this.axisOf(ms[0]).dot(axis)) < 0.9) continue;
      const rel = c.sub(point), t = rel.dot(axis);
      if (Math.abs(t) > 45) continue;
      if (rel.addScaledVector(axis, -t).length() > 3.5) continue;
      parts.add(key.slice(0, key.lastIndexOf(":")));
    }
    return Math.max(1, parts.size);
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
  private futureBox(part: PlacedPart, pos: THREE.Vector3, quat: THREE.Quaternion): THREE.Box3 {
    const m = new THREE.Matrix4().compose(pos, quat, new THREE.Vector3(1, 1, 1));
    return part.mesh.geometry.boundingBox!.clone().applyMatrix4(m);
  }
  private worldBox(part: PlacedPart): THREE.Box3 {
    part.mesh.updateMatrixWorld(true);
    return part.mesh.geometry.boundingBox!.clone().applyMatrix4(part.mesh.matrixWorld);
  }
  private flashRed(parts: PlacedPart[]) {
    for (const p of parts) {
      const mat = p.mesh.material as THREE.MeshStandardMaterial;
      const orig = mat.emissive.clone();
      mat.emissive.setHex(0xd23b2a); mat.needsUpdate = true;
      window.setTimeout(() => { mat.emissive.copy(orig); mat.needsUpdate = true; }, 450);
    }
  }

  // Rotate the selected part's movable sub-group 90° around its single pin.
  // Blocked (returns false) if it would clip another part; the whole build
  // lifts if the rotation would dip a part below the base plane.
  pivotSelected(): boolean {
    const sel = this.selected; if (!sel) return false;
    const pins = this.pinsAdjacent(sel.uid); if (pins.length !== 1) return false;
    const pin = this.parts.get(pins[0])!;
    const axis = this.longAxis(pin.meta).applyQuaternion(pin.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
    const pivot = pin.mesh.getWorldPosition(new THREE.Vector3());
    const cut = this.componentWithout(sel.uid, pin.uid);
    const movable = [...cut].map((u) => this.parts.get(u)).filter(Boolean) as PlacedPart[];
    // exclude the hinge itself and the parts it directly joins (they share the
    // pivot hole and are meant to touch there) from the clip test.
    const hingeNeighbors = this.pinLinks.get(pin.uid) || new Set<string>();
    const statics = [...this.parts.values()].filter((p) => !cut.has(p.uid) && p.uid !== pin.uid && !hingeNeighbors.has(p.uid));

    const q = new THREE.Quaternion().setFromAxisAngle(axis, Math.PI / 2);
    const nextPos = new Map<string, THREE.Vector3>(), nextQuat = new Map<string, THREE.Quaternion>();
    for (const p of movable) {
      nextPos.set(p.uid, p.mesh.position.clone().sub(pivot).applyQuaternion(q).add(pivot));
      nextQuat.set(p.uid, q.clone().multiply(p.mesh.quaternion));
    }
    const movedBoxes = movable.map((p) => this.futureBox(p, nextPos.get(p.uid)!, nextQuat.get(p.uid)!).expandByScalar(-1.5));
    const staticBoxes = statics.map((p) => this.worldBox(p).expandByScalar(-1.5));
    if (movedBoxes.some((mb) => staticBoxes.some((sb) => mb.intersectsBox(sb)))) { this.flashRed(movable); return false; }

    for (const p of movable) { p.mesh.position.copy(nextPos.get(p.uid)!); p.mesh.quaternion.copy(nextQuat.get(p.uid)!); p.mesh.updateMatrixWorld(true); }
    this.helper?.update();
    this.emit(); // settles the group back onto the base plane (lifts it if the turn dipped below)
    return true;
  }

  deletePartByUid(uid: string) {
    const part = this.parts.get(uid); if (!part) return;
    if (this.selected === part) this.select(null);
    this.removePart(part);
    this.emit();
  }
  // Swap a placed connector for another at the same spot.
  async replaceConnector(uid: string, meta: PartMeta) {
    const old = this.parts.get(uid); if (!old) return;
    const center = old.mesh.getWorldPosition(new THREE.Vector3());
    const axis = this.longAxis(old.meta).applyQuaternion(old.mesh.getWorldQuaternion(new THREE.Quaternion())).normalize();
    this.removePart(old);
    await this.addCenteredConnector(meta, center, axis);
    this.select(null); this.emit();
  }

  private resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  // Hide hole markers whose face points away from the camera (the far side of
  // a piece); depthTest hides the rest that sit behind other solid pieces.
  private cullMarkers() {
    if (!this.markersVisible || !this.markers.length) return;
    const cam = this.camera.position;
    const wp = new THREE.Vector3(), wd = new THREE.Vector3(), toCam = new THREE.Vector3();
    for (const m of this.markers) {
      m.getWorldPosition(wp);
      m.getWorldDirection(wd);
      toCam.subVectors(cam, wp);
      m.visible = m === this.armed || (wd.dot(toCam) > 0 && !this.occupied.has(this.coreKey(m)));
    }
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate);
    this.controls.update();
    this.cullMarkers();
    this.renderer.render(this.scene, this.camera);
  };

  frameAll() {
    if (!this.parts.size) { this.camera.position.set(220, 190, 260); this.controls.target.set(0, 25, 0); return; }
    const box = new THREE.Box3();
    for (const p of this.parts.values()) box.expandByObject(p.mesh);
    const c = box.getCenter(new THREE.Vector3());
    const r = box.getSize(new THREE.Vector3()).length() * 0.6 + 60;
    this.controls.target.copy(c);
    this.camera.position.set(c.x + r, c.y + r * 0.8, c.z + r);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    const el = this.renderer.domElement;
    el.removeEventListener("pointerdown", this.onPointerDown, { capture: true } as EventListenerOptions);
    el.removeEventListener("contextmenu", this.onContextMenu);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    el.remove();
  }
}
