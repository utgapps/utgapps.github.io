import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadGeometry, CATEGORY_COLOR, type PartMeta } from "./lib/parts";

const PITCH = 12.7;
const HALF = PITCH / 2; // snap step (mm)
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

let uidSeq = 1;

export class Editor {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  onChange: (s: EditorState) => void = () => {};

  private container: HTMLElement;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private parts = new Map<string, PlacedPart>();
  private selected: PlacedPart | null = null;
  private helper: THREE.BoxHelper | null = null;
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
    this.select(part);
    this.emit();
  }

  private restOnGrid(mesh: THREE.Mesh) {
    // Drop the part so its lowest point rests flush on the grid (y = 0).
    mesh.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(mesh);
    mesh.position.y += -box.min.y;
    mesh.position.y = Math.max(0, mesh.position.y);
    mesh.updateMatrixWorld(true);
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
      this.parts.set(uid, { uid, meta, mesh });
    }
    this.select(null);
    this.emit();
  }

  // ---- rules ---------------------------------------------------------------

  private computeState(): EditorState {
    const box = new THREE.Box3();
    let motors = 0;
    for (const part of this.parts.values()) {
      box.expandByObject(part.mesh);
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
    if (e.button !== 0) return; // left button only starts a part drag
    this.setPointer(e);
    const meshes = [...this.parts.values()].map((p) => p.mesh);
    const hits = this.raycaster.intersectObjects(meshes, false);
    if (hits.length) {
      const uid = hits[0].object.userData.uid as string;
      const part = this.parts.get(uid) || null;
      this.select(part);
      // begin drag on a horizontal plane through the hit point
      this.dragging = true;
      this.controls.enabled = false;
      this.dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), hits[0].point);
      this.dragOffset.copy(hits[0].point).sub(part!.mesh.position);
      e.stopPropagation();
      this.emit();
    } else {
      // clicked empty space: deselect, let OrbitControls orbit
      if (this.selected) { this.select(null); this.emit(); }
    }
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.dragging || !this.selected) return;
    this.setPointer(e);
    if (this.raycaster.ray.intersectPlane(this.dragPlane, this.hit)) {
      const nx = snap(this.hit.x - this.dragOffset.x);
      const nz = snap(this.hit.z - this.dragOffset.z);
      this.selected.mesh.position.x = nx;
      this.selected.mesh.position.z = nz;
      this.selected.mesh.updateMatrixWorld(true);
      this.helper?.update();
    }
  };

  private onPointerUp = () => {
    if (this.dragging) {
      this.dragging = false;
      this.controls.enabled = true;
      this.emit();
    }
  };

  private resize() {
    const w = this.container.clientWidth, h = this.container.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private animate = () => {
    this.raf = requestAnimationFrame(this.animate);
    this.controls.update();
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
