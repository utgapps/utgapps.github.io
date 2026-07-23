import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadGeometry, CATEGORY_COLOR, type PartMeta } from "./lib/parts";
import { holesFor, hasHoles } from "./lib/holes";

const PITCH = 12.7;
const HALF = PITCH / 2; // snap step (mm)
const PROUD = 0.6; // how far a hole marker sits off the face (mm), to avoid z-fighting
const snap = (v: number) => Math.round(v / HALF) * HALF;

export type PlacedPart = { uid: string; meta: PartMeta; mesh: THREE.Mesh };
export type SavedPart = { id: string; p: [number, number, number]; q: [number, number, number, number] };
export type EditorState = {
  count: number;
  selectedUid: string | null;
  selectedName: string | null;
  bboxMM: { w: number; h: number; d: number };
  motors: number;
};

// A hole marker identifies a hole on a placed part.
type HoleRef = { partUid: string; holeIndex: number };
// Emitted when the user clicks a hole (to === null) or drags between two holes.
export type ConnectRequest = { from: HoleRef; to: HoleRef | null; screen: { x: number; y: number } };

let uidSeq = 1;

export class Editor {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  onChange: (s: EditorState) => void = () => {};
  onConnect: (req: ConnectRequest) => void = () => {};

  private container: HTMLElement;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private parts = new Map<string, PlacedPart>();
  private selected: PlacedPart | null = null;
  private helper: THREE.BoxHelper | null = null;

  // hole markers
  private markers: THREE.Mesh[] = [];
  private discGeo = new THREE.CircleGeometry(4.3, 24);
  // depthTest so solids occlude markers; depthWrite off so translucent discs
  // don't fight each other.
  private markerMat = new THREE.MeshBasicMaterial({ color: 0x18a0ff, transparent: true, opacity: 0.6, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  private markerHotMat = new THREE.MeshBasicMaterial({ color: 0xffb020, transparent: true, opacity: 0.95, depthTest: true, depthWrite: false, side: THREE.DoubleSide });
  private hovered: THREE.Mesh | null = null;
  private markersVisible = true;
  // connect drag
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
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);

    this.animate();
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
      const m = new THREE.Mesh(this.discGeo, this.markerMat);
      const axis = new THREE.Vector3(h.axis[0], h.axis[1], h.axis[2]).normalize();
      m.position.set(h.p[0] + axis.x * PROUD, h.p[1] + axis.y * PROUD, h.p[2] + axis.z * PROUD);
      m.quaternion.setFromUnitVectors(zAxis, axis);
      m.visible = this.markersVisible;
      m.userData.holeRef = { partUid: part.uid, holeIndex: i } as HoleRef;
      m.userData.localTan = h.tan;
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

  rotateSelected(axis: "x" | "y" | "z") {
    if (!this.selected) return;
    const q = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(axis === "x" ? 1 : 0, axis === "y" ? 1 : 0, axis === "z" ? 1 : 0),
      Math.PI / 2,
    );
    this.selected.mesh.quaternion.premultiply(q);
    this.restOnGrid(this.selected.mesh);
    this.helper?.update();
    this.emit();
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
    };
  }

  private emit() {
    this.helper?.update();
    this.onChange(this.computeState());
  }

  // ---- interaction ----------------------------------------------------------

  private setPointer(e: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
  }

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
      this.dragging = true;
      this.controls.enabled = false;
      this.dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), hits[0].point);
      this.dragOffset.copy(hits[0].point).sub(part!.mesh.position);
      e.stopPropagation();
      this.emit();
    } else if (this.selected) {
      this.select(null); this.emit();
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    this.setPointer(e);
    if (this.connectFrom) {
      this.movedDuringDrag = true;
      const target = this.markerUnderPointer(this.connectFrom);
      if (target !== this.hovered) {
        if (this.hovered && this.hovered !== this.connectFrom) this.setHot(this.hovered, false);
        this.hovered = target; if (target) this.setHot(target, true);
      }
      const from = this.worldOf(this.connectFrom);
      this.updateConnectLine(from, target ? this.worldOf(target) : this.pointerOnPlane(from));
      return;
    }
    if (this.dragging && this.selected) {
      if (this.raycaster.ray.intersectPlane(this.dragPlane, this.hit)) {
        this.selected.mesh.position.x = snap(this.hit.x - this.dragOffset.x);
        this.selected.mesh.position.z = snap(this.hit.z - this.dragOffset.z);
        this.selected.mesh.updateMatrixWorld(true);
        this.helper?.update();
      }
      return;
    }
    // idle: hover-highlight a hole marker
    if (this.markersVisible) {
      const m = (this.raycaster.intersectObjects(this.visibleMarkers(), false)[0]?.object as THREE.Mesh) || null;
      if (m !== this.hovered) {
        if (this.hovered) this.setHot(this.hovered, false);
        this.hovered = m; if (m) this.setHot(m, true);
      }
    }
  };

  private onPointerUp = (e: PointerEvent) => {
    if (this.connectFrom) {
      const fromRef = this.connectFrom.userData.holeRef as HoleRef;
      const target = this.hovered && this.hovered !== this.connectFrom ? this.hovered : null;
      const toRef = target ? (target.userData.holeRef as HoleRef) : null;
      const to = toRef && toRef.partUid !== fromRef.partUid ? toRef : null;
      this.setHot(this.connectFrom, false); if (this.hovered) this.setHot(this.hovered, false);
      this.connectLine.visible = false;
      this.controls.enabled = true;
      const clicked = !this.movedDuringDrag;
      this.connectFrom = null; this.hovered = null;
      if (to || clicked) this.onConnect({ from: fromRef, to, screen: { x: e.clientX, y: e.clientY } });
      return;
    }
    if (this.dragging) { this.dragging = false; this.controls.enabled = true; this.emit(); }
  };

  // ---- connection helpers ---------------------------------------------------

  private worldOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldPosition(new THREE.Vector3()); }
  private axisOf(marker: THREE.Mesh): THREE.Vector3 { return marker.getWorldDirection(new THREE.Vector3()).normalize(); }
  private setHot(marker: THREE.Mesh, hot: boolean) { marker.material = hot ? this.markerHotMat : this.markerMat; marker.scale.setScalar(hot ? 1.5 : 1); }
  private markerFor(ref: HoleRef): THREE.Mesh | null {
    return this.markers.find((m) => { const r = m.userData.holeRef as HoleRef; return r.partUid === ref.partUid && r.holeIndex === ref.holeIndex; }) || null;
  }
  private visibleMarkers(): THREE.Mesh[] { return this.markers.filter((m) => m.visible); }
  private markerUnderPointer(exclude: THREE.Mesh): THREE.Mesh | null {
    for (const h of this.raycaster.intersectObjects(this.visibleMarkers(), false)) if (h.object !== exclude) return h.object as THREE.Mesh;
    return null;
  }
  // World point of a hole's face (marker sits PROUD off it along the normal).
  private faceOf(marker: THREE.Mesh): THREE.Vector3 { return this.worldOf(marker).addScaledVector(this.axisOf(marker), -PROUD); }
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

  // Connect two holes with a chosen connector (aligning the second part to the
  // first), or drop a connector into a single hole when toRef is null.
  async connect(fromRef: HoleRef, toRef: HoleRef | null, connectorMeta: PartMeta) {
    const mFrom = this.markerFor(fromRef); if (!mFrom) return;
    if (!this.parts.get(fromRef.partUid)) return;
    const nA = this.axisOf(mFrom), pA = this.faceOf(mFrom);
    if (toRef) {
      const mTo = this.markerFor(toRef), partTo = this.parts.get(toRef.partUid);
      if (mTo && partTo) {
        // Rotate part 2 so its hole FRAME (normal + tangent) maps onto part 1's:
        // normal opposes (faces meet), tangent aligns (no unexpected mirroring).
        const nB = this.axisOf(mTo), tB = this.tanOf(mTo), tA = this.tanOf(mFrom);
        const v1 = nA.clone().negate(), v2 = tA.clone(), v3 = new THREE.Vector3().crossVectors(v1, v2).normalize();
        const u1 = nB.clone(), u2 = tB.clone(), u3 = new THREE.Vector3().crossVectors(u1, u2).normalize();
        const target = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(v1, v2, v3));
        const source = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(u1, u2, u3));
        partTo.mesh.quaternion.premultiply(target.multiply(source.invert()));
        partTo.mesh.updateMatrixWorld(true);
        // slide part 2 so the two grabbed faces coincide (holes coaxial, parts flush)
        partTo.mesh.position.add(pA.clone().sub(this.faceOf(mTo)));
        partTo.mesh.updateMatrixWorld(true);
        await this.placeConnector(connectorMeta, pA, nA);
        this.select(partTo); this.emit();
        return;
      }
    }
    await this.placeConnector(connectorMeta, pA, nA);
    this.emit();
  }

  private async placeConnector(meta: PartMeta, worldPos: THREE.Vector3, worldAxis: THREE.Vector3) {
    const geo = await loadGeometry(meta);
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: CATEGORY_COLOR[meta.category] || "#e0a13a", metalness: 0.2, roughness: 0.5 }));
    mesh.castShadow = mesh.receiveShadow = true;
    const uid = `p${uidSeq++}`; mesh.userData.uid = uid;
    mesh.quaternion.setFromUnitVectors(this.longAxis(meta), worldAxis);
    mesh.position.copy(worldPos);
    mesh.updateMatrixWorld(true);
    this.scene.add(mesh);
    const part: PlacedPart = { uid, meta, mesh };
    this.parts.set(uid, part);
    this.addMarkers(part);
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
      m.visible = wd.dot(toCam) > 0;
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
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    el.remove();
  }
}
