import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { STLExporter } from "three/addons/exporters/STLExporter.js";
import { ADDITION, SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";

const viewport = document.getElementById("viewport");
const statusEl = document.getElementById("status");
const selectedName = document.getElementById("selectedName");
const selectedHint = document.getElementById("selectedHint");
const projectName = document.getElementById("projectName");
const gridSnap = document.getElementById("gridSnap");
const planeSnap = document.getElementById("planeSnap");
const hardAngle = document.getElementById("hardAngle");
const warnAngle = document.getElementById("warnAngle");
const showPrintCheck = document.getElementById("showPrintCheck");
const printSummary = document.getElementById("printSummary");
const hardAlert = document.getElementById("hardAlert");
const warningAlert = document.getElementById("warningAlert");
const settingsDialog = document.getElementById("settingsDialog");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const clayList = document.getElementById("clayList");
const clayControls = document.getElementById("clayControls");
const clayBrushSize = document.getElementById("clayBrushSize");
const clayBrushStrength = document.getElementById("clayBrushStrength");
const clayBrushSizeValue = document.getElementById("clayBrushSizeValue");
const clayBrushStrengthValue = document.getElementById("clayBrushStrengthValue");
const fields = {
  posX: document.getElementById("posX"), posY: document.getElementById("posY"), posZ: document.getElementById("posZ"),
  sizeX: document.getElementById("sizeX"), sizeY: document.getElementById("sizeY"), sizeZ: document.getElementById("sizeZ"),
  rotX: document.getElementById("rotX"), rotY: document.getElementById("rotY"), rotZ: document.getElementById("rotZ")
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe8eef3);
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
viewport.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.target.set(0, 0, 0);
const transform = new TransformControls(camera, renderer.domElement);
transform.setTranslationSnap(Number(gridSnap.value));
transform.setRotationSnap(THREE.MathUtils.degToRad(15));
transform.addEventListener("dragging-changed", (event) => { if (event.value) recordHistory(); orbit.enabled = !event.value; });
transform.addEventListener("objectChange", handleTransformChange);
scene.add(transform.getHelper());

const modelGroup = new THREE.Group();
scene.add(modelGroup);
const selectionPivot = new THREE.Object3D();
scene.add(selectionPivot);
const analysisGroup = new THREE.Group();
scene.add(analysisGroup);
const grid = new THREE.GridHelper(200, 20, 0x9db0c0, 0xc6d3dc);
scene.add(grid);
scene.add(new THREE.AxesHelper(18));
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: 0xeaf1f5, roughness: 1 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8ca0ad, 2.4));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(90, 120, 60);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
scene.add(keyLight);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const selection = new Set();
const evaluator = new Evaluator();
evaluator.useGroups = false;
const exporter = new STLExporter();
const liveUnions = new Map();
const unionDelta = new THREE.Matrix4();
const unionPreviousInverse = new THREE.Matrix4();
const unionAnchorInverse = new THREE.Matrix4();
const unionPivotMatrix = new THREE.Matrix4();
const selectionPivotPreviousMatrix = new THREE.Matrix4();
const selectionTransformDelta = new THREE.Matrix4();
let itemNumber = 0;
let unionNumber = 0;
let clayNumber = 0;
let analysisTimer = 0;
let selectionPivotActive = false;
let clayMode = "grow";
let clayBrushActive = false;
let sculpting = false;
let sculptedMesh = null;
let ignoreMouseUntil = 0;
const undoStack = [];
const redoStack = [];
const historyLimit = 24;
let restoringHistory = false;

function cloneUserData(userData) {
  return { ...userData, baseSize: userData.baseSize ? userData.baseSize.clone() : undefined };
}

function captureHistoryState() {
  const meshes = [...modelGroup.children];
  return {
    meshes: meshes.map((mesh) => ({
      geometry: mesh.geometry.clone(),
      userData: cloneUserData(mesh.userData),
      position: mesh.position.clone(),
      quaternion: mesh.quaternion.clone(),
      scale: mesh.scale.clone(),
      visible: mesh.visible,
      castShadow: mesh.castShadow,
      receiveShadow: mesh.receiveShadow
    })),
    unions: [...liveUnions.entries()].map(([id, union]) => ({
      id,
      sources: union.sources.map((source) => meshes.indexOf(source)),
      result: meshes.indexOf(union.result),
      lastMatrix: union.lastMatrix.clone()
    })),
    selection: [...selection].map((mesh) => meshes.indexOf(mesh)),
    itemNumber,
    unionNumber,
    clayNumber
  };
}

function disposeHistoryState(state) {
  state.meshes.forEach((mesh) => mesh.geometry.dispose());
}

function clearHistory(stack) {
  while (stack.length) disposeHistoryState(stack.pop());
}

function syncHistoryControls() {
  undoButton.disabled = !undoStack.length;
  redoButton.disabled = !redoStack.length;
}

function recordHistory() {
  if (restoringHistory) return;
  undoStack.push(captureHistoryState());
  if (undoStack.length > historyLimit) disposeHistoryState(undoStack.shift());
  clearHistory(redoStack);
  syncHistoryControls();
}

function restoreHistoryState(state) {
  restoringHistory = true;
  transform.detach();
  removeMeshes([...modelGroup.children]);
  liveUnions.clear();
  const meshes = state.meshes.map((saved) => {
    const mesh = new THREE.Mesh(saved.geometry.clone(), baseMaterial(Boolean(saved.userData.hole)));
    mesh.userData = cloneUserData(saved.userData);
    mesh.position.copy(saved.position);
    mesh.quaternion.copy(saved.quaternion);
    mesh.scale.copy(saved.scale);
    mesh.visible = saved.visible;
    mesh.castShadow = saved.castShadow;
    mesh.receiveShadow = saved.receiveShadow;
    modelGroup.add(mesh);
    return mesh;
  });
  state.unions.forEach((saved) => {
    liveUnions.set(saved.id, {
      sources: saved.sources.map((index) => meshes[index]),
      result: meshes[saved.result],
      lastMatrix: saved.lastMatrix.clone()
    });
  });
  itemNumber = state.itemNumber;
  unionNumber = state.unionNumber;
  clayNumber = state.clayNumber || 0;
  select(state.selection.map((index) => meshes[index]).filter(Boolean));
  restoringHistory = false;
  scheduleAnalysis();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(captureHistoryState());
  restoreHistoryState(undoStack.pop());
  syncHistoryControls();
  setStatus("Undid the last model change.");
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(captureHistoryState());
  restoreHistoryState(redoStack.pop());
  syncHistoryControls();
  setStatus("Redid the last model change.");
}

function baseMaterial(hole = false) {
  return new THREE.MeshStandardMaterial(hole ? {
    color: 0xd45764, transparent: true, opacity: 0.38, roughness: 0.45, metalness: 0.04, side: THREE.DoubleSide
  } : { color: 0x20a7dd, roughness: 0.45, metalness: 0.04 });
}

function createGeometry(kind) {
  if (kind === "clay") return new THREE.IcosahedronGeometry(18, 4);
  if (kind === "cylinder") return new THREE.CylinderGeometry(12, 12, 20, 48);
  if (kind === "sphere") return new THREE.SphereGeometry(14, 32, 20);
  if (kind === "roof") return new THREE.ConeGeometry(18, 28, 4);
  return new THREE.BoxGeometry(30, 20, 30);
}

function addShape(kind) {
  recordHistory();
  const geometry = createGeometry(kind);
  geometry.computeBoundingBox();
  const mesh = new THREE.Mesh(geometry, baseMaterial());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  const name = kind === "clay" ? `Clay shape ${++clayNumber}` : `${kind[0].toUpperCase()}${kind.slice(1)} ${++itemNumber}`;
  mesh.userData = { kind, name, hole: false, baseSize: geometry.boundingBox.getSize(new THREE.Vector3()), clayRadius: kind === "clay" ? 18 : undefined };
  mesh.position.y = mesh.userData.baseSize.y / 2;
  if (kind === "roof") mesh.rotation.y = Math.PI / 4;
  modelGroup.add(mesh);
  select([mesh]);
  setStatus(kind === "clay" ? "Clay shape added. Choose a clay brush, then drag on the shape." : `${mesh.userData.name} added. Drag its arrows or type exact measurements.`);
  scheduleAnalysis();
}

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

function setMaterial(mesh) {
  mesh.material.dispose();
  mesh.material = baseMaterial(Boolean(mesh.userData.hole));
}

function select(meshes) {
  selection.clear();
  meshes.forEach((mesh) => selection.add(mesh));
  updateSelectionUI();
}

function toggleSelect(mesh) {
  if (selection.has(mesh)) selection.delete(mesh); else selection.add(mesh);
  updateSelectionUI();
}

function updateSelectionPivot(meshes) {
  const sources = [...new Set(meshes.flatMap((mesh) => collectUnionSources(mesh)))];
  const fallback = meshes.reduce((center, mesh) => center.add(mesh.position), new THREE.Vector3()).multiplyScalar(1 / meshes.length);
  selectionPivot.position.copy(getUnionPivot(sources, fallback));
  selectionPivot.quaternion.identity();
  selectionPivot.scale.set(1, 1, 1);
  selectionPivot.updateMatrix();
  selectionPivotPreviousMatrix.copy(selectionPivot.matrix);
  selectionPivotActive = true;
  attachTransformControls(selectionPivot);
}

function attachTransformControls(mesh) {
  mesh.updateWorldMatrix(true, false);
  transform.attach(mesh);
  transform.enabled = true;
  transform.visible = true;
  transform.getHelper().visible = true;
  window.requestAnimationFrame(() => {
    const isCurrentTarget = mesh === selectionPivot ? selection.size > 1 && selectionPivotActive : selection.size === 1 && selection.has(mesh);
    if (!isCurrentTarget) return;
    mesh.updateWorldMatrix(true, false);
    transform.attach(mesh);
    transform.getHelper().visible = true;
  });
}

function isClay(mesh) {
  return Boolean(mesh && mesh.userData.kind === "clay" && !mesh.userData.unionResult);
}

function syncClayList() {
  const clayShapes = modelGroup.children.filter(isClay);
  clayList.replaceChildren();
  if (!clayShapes.length) {
    const note = document.createElement("p");
    note.className = "tiny-note";
    note.textContent = "Make a soft clay shape, then drag on it to sculpt.";
    clayList.appendChild(note);
    return;
  }
  clayShapes.forEach((mesh) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `clay-item${selection.has(mesh) ? " active" : ""}`;
    button.textContent = mesh.userData.name;
    button.addEventListener("click", () => select([mesh]));
    clayList.appendChild(button);
  });
}

function updateSelectionUI() {
  modelGroup.children.forEach((mesh) => {
    mesh.material.emissive.set(selection.has(mesh) ? 0x5b4200 : 0x000000);
    mesh.material.emissiveIntensity = selection.has(mesh) ? 0.32 : 0;
  });
  const one = selection.size === 1 ? [...selection][0] : null;
  transform.detach();
  selectionPivotActive = false;
  if (one) attachTransformControls(one);
  else if (selection.size > 1) updateSelectionPivot([...selection]);
  selectedName.textContent = one ? one.userData.name : selection.size ? `${selection.size} shapes selected` : "Nothing selected";
  selectedHint.textContent = one ? (isClay(one) ? "Pick a clay brush below, then drag directly on this shape." : isUnionResult(one) ? "Move, rotate, or scale this live union. Break union restores its source shapes here." : one.userData.hole ? "This is a hole. Union it with a solid to remove material." : "Use the arrows or type exact measurements.") : selection.size ? "Choose Union to keep source shapes together, including any holes." : "Click a shape in the workplane.";
  clayControls.hidden = !isClay(one);
  syncClayList();
  syncInspector();
}

function syncInspector() {
  const one = selection.size === 1 ? [...selection][0] : null;
  Object.values(fields).forEach((field) => { field.disabled = !one; });
  if (!one) {
    Object.values(fields).forEach((field) => { field.value = ""; });
    return;
  }
  const size = one.userData.baseSize;
  fields.posX.value = round(one.position.x); fields.posY.value = round(one.position.y); fields.posZ.value = round(one.position.z);
  fields.sizeX.value = round(size.x * Math.abs(one.scale.x)); fields.sizeY.value = round(size.y * Math.abs(one.scale.y)); fields.sizeZ.value = round(size.z * Math.abs(one.scale.z));
  fields.rotX.value = round(THREE.MathUtils.radToDeg(one.rotation.x)); fields.rotY.value = round(THREE.MathUtils.radToDeg(one.rotation.y)); fields.rotZ.value = round(THREE.MathUtils.radToDeg(one.rotation.z));
}

function round(value) { return Math.round(value * 10) / 10; }

function visibleMeshes() {
  return modelGroup.children.filter((mesh) => mesh.visible);
}

function isUnionResult(mesh) {
  return Boolean(mesh && mesh.userData.unionResult);
}

function getBox(mesh) {
  mesh.updateWorldMatrix(true, false);
  return new THREE.Box3().setFromObject(mesh);
}

function rangesOverlap(minA, maxA, minB, maxB, tolerance = 0.5) {
  return Math.min(maxA, maxB) - Math.max(minA, minB) > tolerance;
}

function snapToPlanes(mesh) {
  if (!planeSnap.checked) return;
  const threshold = Math.max(1, Number(gridSnap.value) * 0.3);
  let box = getBox(mesh);
  if (Math.abs(box.min.y) <= threshold) {
    mesh.position.y -= box.min.y;
    box = getBox(mesh);
  }
  visibleMeshes().filter((other) => other !== mesh).some((other) => {
    const otherBox = getBox(other);
    const candidates = [
      { axis: "x", delta: box.min.x - otherBox.max.x, overlap: rangesOverlap(box.min.y, box.max.y, otherBox.min.y, otherBox.max.y) && rangesOverlap(box.min.z, box.max.z, otherBox.min.z, otherBox.max.z) },
      { axis: "x", delta: box.max.x - otherBox.min.x, overlap: rangesOverlap(box.min.y, box.max.y, otherBox.min.y, otherBox.max.y) && rangesOverlap(box.min.z, box.max.z, otherBox.min.z, otherBox.max.z) },
      { axis: "z", delta: box.min.z - otherBox.max.z, overlap: rangesOverlap(box.min.x, box.max.x, otherBox.min.x, otherBox.max.x) && rangesOverlap(box.min.y, box.max.y, otherBox.min.y, otherBox.max.y) },
      { axis: "z", delta: box.max.z - otherBox.min.z, overlap: rangesOverlap(box.min.x, box.max.x, otherBox.min.x, otherBox.max.x) && rangesOverlap(box.min.y, box.max.y, otherBox.min.y, otherBox.max.y) },
      { axis: "y", delta: box.min.y - otherBox.max.y, overlap: rangesOverlap(box.min.x, box.max.x, otherBox.min.x, otherBox.max.x) && rangesOverlap(box.min.z, box.max.z, otherBox.min.z, otherBox.max.z) }
    ].filter((item) => item.overlap && Math.abs(item.delta) <= threshold).sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta));
    if (!candidates.length) return false;
    mesh.position[candidates[0].axis] -= candidates[0].delta;
    box = getBox(mesh);
    return true;
  });
}

function placeOnWorkplane(mesh) {
  const box = getBox(mesh);
  mesh.position.y -= box.min.y;
  syncUnionSources(mesh);
}

function getBroadestFaceNormal(mesh) {
  const position = mesh.geometry.attributes.position;
  const index = mesh.geometry.index;
  const triangleCount = index ? index.count / 3 : position.count / 3;
  const clusters = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3(), normal = new THREE.Vector3();
  const sharedDirection = Math.cos(THREE.MathUtils.degToRad(12));

  for (let tri = 0; tri < triangleCount; tri += 1) {
    const ia = index ? index.getX(tri * 3) : tri * 3;
    const ib = index ? index.getX(tri * 3 + 1) : tri * 3 + 1;
    const ic = index ? index.getX(tri * 3 + 2) : tri * 3 + 2;
    a.fromBufferAttribute(position, ia);
    b.fromBufferAttribute(position, ib);
    c.fromBufferAttribute(position, ic);
    normal.crossVectors(ab.subVectors(b, a), ac.subVectors(c, a));
    const twiceArea = normal.length();
    if (twiceArea < 0.00001) continue;
    normal.multiplyScalar(1 / twiceArea);
    const area = twiceArea * 0.5;
    let cluster = clusters.find((candidate) => candidate.normal.dot(normal) >= sharedDirection);
    if (!cluster) {
      cluster = { normal: normal.clone(), weightedNormal: new THREE.Vector3(), area: 0 };
      clusters.push(cluster);
    }
    cluster.weightedNormal.addScaledVector(normal, area);
    cluster.area += area;
    cluster.normal.copy(cluster.weightedNormal).normalize();
  }

  if (!clusters.length) return null;
  clusters.sort((aCluster, bCluster) => bCluster.area - aCluster.area);
  return clusters[0].normal.clone().normalize();
}

function layFlat() {
  const one = selection.size === 1 ? [...selection][0] : null;
  if (!one) return setStatus("Select one object to place on the workplane.", true);
  recordHistory();
  placeOnWorkplane(one);
  syncInspector();
  setStatus("Selected object placed on the workplane.");
  scheduleAnalysis();
}

function optimizePrintOrientation() {
  const one = selection.size === 1 ? [...selection][0] : null;
  if (!one) return setStatus("Select one object to optimize for printing.", true);
  const localNormal = getBroadestFaceNormal(one);
  if (!localNormal) return setStatus("This object has no printable face to orient.", true);
  recordHistory();
  one.updateWorldMatrix(true, false);
  const worldNormal = localNormal.applyMatrix3(new THREE.Matrix3().getNormalMatrix(one.matrixWorld)).normalize();
  const turn = new THREE.Quaternion().setFromUnitVectors(worldNormal, new THREE.Vector3(0, -1, 0));
  one.quaternion.premultiply(turn);
  placeOnWorkplane(one);
  syncInspector();
  setStatus("Rotated onto its broadest face and placed on the workplane.");
  scheduleAnalysis();
}

function syncUnionSources(result) {
  if (!isUnionResult(result)) return;
  const union = liveUnions.get(result.userData.unionId);
  if (!union) return;
  result.updateMatrix();
  unionDelta.copy(result.matrix).multiply(unionPreviousInverse.copy(union.lastMatrix).invert());
  union.sources.forEach((source) => {
    source.applyMatrix4(unionDelta);
    source.updateWorldMatrix(true, false);
  });
  union.lastMatrix.copy(result.matrix);
}

function handleTransformChange() {
  if (selectionPivotActive && selection.size > 1) {
    selectionPivot.updateMatrix();
    selectionTransformDelta.copy(selectionPivot.matrix).multiply(unionPreviousInverse.copy(selectionPivotPreviousMatrix).invert());
    selection.forEach((mesh) => {
      mesh.applyMatrix4(selectionTransformDelta);
      mesh.updateWorldMatrix(true, false);
      syncUnionSources(mesh);
    });
    selectionPivotPreviousMatrix.copy(selectionPivot.matrix);
    scheduleAnalysis();
    return;
  }
  const one = selection.size === 1 ? [...selection][0] : null;
  if (one) {
    snapToPlanes(one);
    syncUnionSources(one);
  }
  syncInspector();
  scheduleAnalysis();
}

function scheduleAnalysis() {
  window.clearTimeout(analysisTimer);
  analysisTimer = window.setTimeout(updatePrintAnalysis, 90);
}

function clearAnalysisOverlay() {
  while (analysisGroup.children.length) {
    const child = analysisGroup.children.pop();
    child.geometry.dispose();
    child.material.dispose();
  }
}

function addOverlay(positions, color) {
  if (!positions.length || !showPrintCheck.checked) return;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72, side: THREE.DoubleSide, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
  analysisGroup.add(new THREE.Mesh(geometry, material));
}

function updateExportAlerts(hardIssues, warningFaces) {
  hardAlert.hidden = !hardIssues;
  warningAlert.hidden = !warningFaces;
  hardAlert.title = `${hardIssues} hard print ${hardIssues === 1 ? "issue" : "issues"}. Open settings for details.`;
  warningAlert.title = `${warningFaces} ${warningFaces === 1 ? "surface may" : "surfaces may"} need support. Open settings for details.`;
  hardAlert.setAttribute("aria-label", hardAlert.title);
  warningAlert.setAttribute("aria-label", warningAlert.title);
}

function updatePrintAnalysis() {
  clearAnalysisOverlay();
  const meshes = visibleMeshes();
  if (!meshes.length) {
    printSummary.textContent = "No model to check yet.";
    printSummary.className = "print-summary";
    updateExportAlerts(0, 0);
    return;
  }
  const hard = Math.max(0, Math.min(89, Number(hardAngle.value) || 45));
  const warning = Math.max(hard, Math.min(90, Number(warnAngle.value) || 60));
  warnAngle.value = warning;
  const boxes = new Map(meshes.map((mesh) => [mesh, getBox(mesh)]));
  const red = [], yellow = [];
  let hardFaces = 0, warningFaces = 0, floating = 0;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), ab = new THREE.Vector3(), ac = new THREE.Vector3(), normal = new THREE.Vector3(), center = new THREE.Vector3();
  const isSupportedBelow = (mesh, point) => {
    if (point.y <= 0.75) return true;
    return meshes.some((other) => {
      if (other === mesh) return false;
      const box = boxes.get(other);
      return point.x >= box.min.x - 0.75 && point.x <= box.max.x + 0.75 && point.z >= box.min.z - 0.75 && point.z <= box.max.z + 0.75 && point.y >= box.max.y - 0.75 && point.y - box.max.y <= 1.5;
    });
  };
  meshes.forEach((mesh) => {
    const box = boxes.get(mesh);
    const floorContact = box.min.y <= 0.75;
    const objectContact = meshes.some((other) => {
      if (other === mesh) return false;
      const otherBox = boxes.get(other);
      return rangesOverlap(box.min.x, box.max.x, otherBox.min.x, otherBox.max.x) && rangesOverlap(box.min.z, box.max.z, otherBox.min.z, otherBox.max.z) && Math.abs(box.min.y - otherBox.max.y) <= 0.75;
    });
    if (!floorContact && !objectContact) floating += 1;
    const position = mesh.geometry.attributes.position;
    const index = mesh.geometry.index;
    const triangleCount = index ? index.count / 3 : position.count / 3;
    for (let tri = 0; tri < triangleCount; tri += 1) {
      const ia = index ? index.getX(tri * 3) : tri * 3;
      const ib = index ? index.getX(tri * 3 + 1) : tri * 3 + 1;
      const ic = index ? index.getX(tri * 3 + 2) : tri * 3 + 2;
      a.fromBufferAttribute(position, ia).applyMatrix4(mesh.matrixWorld);
      b.fromBufferAttribute(position, ib).applyMatrix4(mesh.matrixWorld);
      c.fromBufferAttribute(position, ic).applyMatrix4(mesh.matrixWorld);
      ab.subVectors(b, a); ac.subVectors(c, a); normal.crossVectors(ab, ac).normalize();
      if (normal.y >= -0.001) continue;
      const angle = THREE.MathUtils.radToDeg(Math.acos(THREE.MathUtils.clamp(-normal.y, -1, 1)));
      if (angle > warning) continue;
      center.addVectors(a, b).add(c).multiplyScalar(1 / 3);
      if (isSupportedBelow(mesh, center)) continue;
      const target = angle <= hard ? red : yellow;
      target.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      if (angle <= hard) hardFaces += 1; else warningFaces += 1;
    }
  });
  addOverlay(red, 0xe63845);
  addOverlay(yellow, 0xf2c037);
  const notes = [];
  if (floating) notes.push(`${floating} floating ${floating === 1 ? "shape" : "shapes"}`);
  if (hardFaces) notes.push(`${hardFaces} hard overhang faces`);
  if (warningFaces) notes.push(`${warningFaces} faces may need support`);
  printSummary.textContent = notes.length ? notes.join(". ") + "." : "No unsupported downward faces found at these thresholds.";
  printSummary.className = `print-summary${hardFaces || floating ? " issue" : warningFaces ? " warning" : ""}`;
  updateExportAlerts(hardFaces + floating, warningFaces);
}

function changeType(hole) {
  if (!selection.size) return setStatus("Select a shape first.", true);
  if ([...selection].some(isUnionResult)) return setStatus("Break a live union before changing its source shapes.", true);
  recordHistory();
  selection.forEach((mesh) => { mesh.userData.hole = hole; setMaterial(mesh); });
  setStatus(hole ? "Hole shape ready. Select it with a solid, then choose Union." : "Selected shape changed to solid.");
  updateSelectionUI();
  scheduleAnalysis();
}

function duplicateSelected() {
  if (!selection.size) return setStatus("Select a shape first.", true);
  if ([...selection].some(isUnionResult)) return setStatus("Break a live union before duplicating its source shapes.", true);
  recordHistory();
  const copies = [...selection].map((mesh) => {
    const copy = new THREE.Mesh(mesh.geometry.clone(), baseMaterial(mesh.userData.hole));
    copy.position.copy(mesh.position).add(new THREE.Vector3(8, 0, 8));
    copy.rotation.copy(mesh.rotation); copy.scale.copy(mesh.scale);
    copy.castShadow = true; copy.receiveShadow = true;
    const name = mesh.userData.kind === "clay" ? `Clay shape ${++clayNumber}` : `${mesh.userData.kind[0].toUpperCase()}${mesh.userData.kind.slice(1)} ${++itemNumber}`;
    copy.userData = { ...mesh.userData, name, baseSize: mesh.userData.baseSize.clone() };
    modelGroup.add(copy);
    return copy;
  });
  select(copies);
  setStatus("Copy made. Move it into place.");
  scheduleAnalysis();
}

function toBrush(mesh) {
  const brush = new Brush(mesh.geometry.clone(), baseMaterial(false));
  brush.position.copy(mesh.position); brush.rotation.copy(mesh.rotation); brush.scale.copy(mesh.scale);
  brush.updateMatrixWorld(true);
  return brush;
}

function getMeshVolume(mesh) {
  const position = mesh.geometry.attributes.position;
  const index = mesh.geometry.index;
  const triangleCount = index ? index.count / 3 : position.count / 3;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let volume = 0;
  for (let tri = 0; tri < triangleCount; tri += 1) {
    const ia = index ? index.getX(tri * 3) : tri * 3;
    const ib = index ? index.getX(tri * 3 + 1) : tri * 3 + 1;
    const ic = index ? index.getX(tri * 3 + 2) : tri * 3 + 2;
    a.fromBufferAttribute(position, ia);
    b.fromBufferAttribute(position, ib);
    c.fromBufferAttribute(position, ic);
    volume += a.dot(b.cross(c)) / 6;
  }
  return Math.abs(volume * mesh.scale.x * mesh.scale.y * mesh.scale.z);
}

function getUnionPivot(sources, fallback) {
  const weightedPosition = new THREE.Vector3();
  let totalWeight = 0;
  sources.forEach((source) => {
    const weight = getMeshVolume(source) * (source.userData.hole ? -1 : 1);
    weightedPosition.addScaledVector(source.position, weight);
    totalWeight += weight;
  });
  if (Math.abs(totalWeight) > 0.00001) return weightedPosition.multiplyScalar(1 / totalWeight);

  weightedPosition.set(0, 0, 0);
  totalWeight = 0;
  sources.filter((source) => !source.userData.hole).forEach((source) => {
    const weight = getMeshVolume(source);
    weightedPosition.addScaledVector(source.position, weight);
    totalWeight += weight;
  });
  return totalWeight ? weightedPosition.multiplyScalar(1 / totalWeight) : fallback.clone();
}

function collectUnionSources(mesh, collected = []) {
  if (!isUnionResult(mesh)) {
    collected.push(mesh);
    return collected;
  }
  const union = liveUnions.get(mesh.userData.unionId);
  if (!union) return collected;
  union.sources.forEach((source) => collectUnionSources(source, collected));
  return collected;
}

function removeUnionResult(mesh) {
  const union = liveUnions.get(mesh.userData.unionId);
  if (!union) return;
  modelGroup.remove(mesh);
  mesh.geometry.dispose();
  mesh.material.dispose();
  liveUnions.delete(mesh.userData.unionId);
}

function removeMeshes(meshes) {
  meshes.forEach((mesh) => {
    modelGroup.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
}

function createUnion() {
  if (selection.size < 2) return setStatus("Select at least two shapes to create a union.", true);
  const selectedMeshes = [...selection];
  const sources = [...new Set(selectedMeshes.flatMap((mesh) => collectUnionSources(mesh)))];
  const solids = sources.filter((mesh) => !mesh.userData.hole);
  const holes = sources.filter((mesh) => mesh.userData.hole);
  if (!solids.length) return setStatus("A union needs at least one solid shape.", true);
  try {
    recordHistory();
    let result = toBrush(solids[0]);
    for (let index = 1; index < solids.length; index += 1) result = evaluator.evaluate(result, toBrush(solids[index]), ADDITION);
    holes.forEach((hole) => { result = evaluator.evaluate(result, toBrush(hole), SUBTRACTION); });
    result.geometry = result.geometry.toNonIndexed();
    result.geometry.computeVertexNormals();
    const anchor = selectedMeshes.find(isUnionResult) ?? result;
    const pivot = getUnionPivot(sources, anchor.position);
    result.updateMatrix();
    anchor.updateMatrix();
    unionPivotMatrix.compose(pivot, anchor.quaternion, anchor.scale);
    result.geometry.applyMatrix4(unionAnchorInverse.copy(unionPivotMatrix).invert().multiply(result.matrix));
    result.geometry.computeBoundingBox();
    const id = `union-${++unionNumber}`;
    const mesh = new THREE.Mesh(result.geometry, baseMaterial(false));
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.userData = { kind: "union", name: `Union ${unionNumber}`, hole: false, baseSize: result.geometry.boundingBox.getSize(new THREE.Vector3()), unionId: id, unionResult: true };
    mesh.position.copy(pivot);
    mesh.quaternion.copy(anchor.quaternion);
    mesh.scale.copy(anchor.scale);
    selectedMeshes.filter(isUnionResult).forEach(removeUnionResult);
    sources.forEach((source) => { source.visible = false; source.userData.unionId = id; });
    modelGroup.add(mesh);
    mesh.updateMatrix();
    liveUnions.set(id, { sources, result: mesh, lastMatrix: mesh.matrix.clone() });
    select([mesh]);
    setStatus(holes.length ? "Live union created with hole cuts. Its position stays with the model." : "Live union created. Its position stays with the model.");
    scheduleAnalysis();
  } catch (error) {
    console.error(error);
    setStatus("Those shapes could not form a union. Make sure they overlap and try again.", true);
  }
}

function breakUnion() {
  const one = selection.size === 1 ? [...selection][0] : null;
  if (!isUnionResult(one)) return setStatus("Select one live union to break it apart.", true);
  const union = liveUnions.get(one.userData.unionId);
  if (!union) return setStatus("That union no longer has editable source shapes.", true);
  recordHistory();
  modelGroup.remove(one);
  one.geometry.dispose(); one.material.dispose();
  union.sources.forEach((source) => { source.visible = true; delete source.userData.unionId; });
  liveUnions.delete(one.userData.unionId);
  select(union.sources);
  setStatus("Original union shapes restored.");
  scheduleAnalysis();
}

function deleteSelected() {
  if (!selection.size) return setStatus("Select a shape first.", true);
  if ([...selection].some(isUnionResult)) return setStatus("Break a live union before deleting its source shapes.", true);
  recordHistory();
  removeMeshes([...selection]);
  select([]);
  setStatus("Selected shapes deleted.");
  scheduleAnalysis();
}

function applyFieldChanges() {
  const one = selection.size === 1 ? [...selection][0] : null;
  if (!one) return;
  const number = (input, fallback) => input.value.trim() !== "" && Number.isFinite(Number(input.value)) ? Number(input.value) : fallback;
  one.position.set(number(fields.posX, one.position.x), number(fields.posY, one.position.y), number(fields.posZ, one.position.z));
  one.scale.set(
    Math.max(1, number(fields.sizeX, one.userData.baseSize.x)) / one.userData.baseSize.x,
    Math.max(1, number(fields.sizeY, one.userData.baseSize.y)) / one.userData.baseSize.y,
    Math.max(1, number(fields.sizeZ, one.userData.baseSize.z)) / one.userData.baseSize.z
  );
  one.rotation.set(THREE.MathUtils.degToRad(number(fields.rotX, 0)), THREE.MathUtils.degToRad(number(fields.rotY, 0)), THREE.MathUtils.degToRad(number(fields.rotZ, 0)));
  snapToPlanes(one);
  syncUnionSources(one);
  syncInspector();
  scheduleAnalysis();
}

function exportStl() {
  const meshes = visibleMeshes();
  if (!meshes.length) return setStatus("Add a shape before exporting.", true);
  if (meshes.some((mesh) => mesh.userData.hole)) return setStatus("Union every hole with a solid before exporting.", true);
  const exportGroup = new THREE.Group();
  meshes.forEach((mesh) => exportGroup.add(mesh.clone()));
  const output = exporter.parse(exportGroup, { binary: true });
  const name = (projectName.value.trim() || "utg-model").replace(/[^a-z0-9-_]/gi, "-");
  const blob = new Blob([output], { type: "model/stl" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = `${name}.stl`; link.click();
  URL.revokeObjectURL(link.href);
  setStatus("STL exported. Keep it with your project files.");
}

function plainUserData(mesh) {
  const data = { ...mesh.userData };
  if (data.baseSize) data.baseSize = { x: data.baseSize.x, y: data.baseSize.y, z: data.baseSize.z };
  return data;
}

function saveModel() {
  const meshes = [...modelGroup.children];
  const model = {
    version: 1,
    projectName: projectName.value,
    itemNumber,
    unionNumber,
    clayNumber,
    selection: [...selection].map((mesh) => meshes.indexOf(mesh)),
    meshes: meshes.map((mesh) => ({
      geometry: mesh.geometry.toJSON(), userData: plainUserData(mesh), position: mesh.position.toArray(),
      quaternion: mesh.quaternion.toArray(), scale: mesh.scale.toArray(), visible: mesh.visible
    })),
    unions: [...liveUnions.entries()].map(([id, union]) => ({
      id, sources: union.sources.map((source) => meshes.indexOf(source)), result: meshes.indexOf(union.result), lastMatrix: union.lastMatrix.elements
    }))
  };
  const name = (projectName.value.trim() || "utg-model").replace(/[^a-z0-9-_]/gi, "-");
  downloadBlob(new Blob([JSON.stringify(model)], { type: "application/json" }), `${name}.utgmodel`);
  setStatus("Editable model saved. Open this .utgmodel file later to keep building.");
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url; link.download = filename; link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function readUserData(data, geometry) {
  geometry.computeBoundingBox();
  const base = data && data.baseSize;
  return { ...data, baseSize: base ? new THREE.Vector3(base.x, base.y, base.z) : geometry.boundingBox.getSize(new THREE.Vector3()) };
}

async function loadModel(file) {
  try {
    const saved = JSON.parse(await file.text());
    if (saved.version !== 1 || !Array.isArray(saved.meshes)) throw new Error("Not a UTG model file.");
    recordHistory();
    transform.detach(); removeMeshes([...modelGroup.children]); liveUnions.clear();
    const loader = new THREE.BufferGeometryLoader();
    const meshes = saved.meshes.map((item) => {
      const geometry = loader.parse(item.geometry);
      const mesh = new THREE.Mesh(geometry, baseMaterial(Boolean(item.userData && item.userData.hole)));
      mesh.userData = readUserData(item.userData || {}, geometry);
      mesh.position.fromArray(item.position || [0, 0, 0]);
      mesh.quaternion.fromArray(item.quaternion || [0, 0, 0, 1]);
      mesh.scale.fromArray(item.scale || [1, 1, 1]);
      mesh.visible = item.visible !== false; mesh.castShadow = true; mesh.receiveShadow = true;
      modelGroup.add(mesh);
      return mesh;
    });
    (saved.unions || []).forEach((item) => {
      const result = meshes[item.result];
      const sources = (item.sources || []).map((index) => meshes[index]).filter(Boolean);
      if (result && sources.length) liveUnions.set(item.id, { sources, result, lastMatrix: new THREE.Matrix4().fromArray(item.lastMatrix || []) });
    });
    projectName.value = String(saved.projectName || "my-derby-part").slice(0, 40);
    itemNumber = Number(saved.itemNumber) || meshes.length;
    unionNumber = Number(saved.unionNumber) || 0;
    clayNumber = Number(saved.clayNumber) || modelGroup.children.filter(isClay).length;
    select((saved.selection || []).map((index) => meshes[index]).filter(Boolean));
    setStatus("Model opened. Your shapes, clay details, and unions are ready to edit.");
    scheduleAnalysis();
  } catch (error) {
    console.error(error);
    setStatus("That file could not be opened. Choose a .utgmodel file saved by Modeling Studio.", true);
  }
}

function pointerFromEvent(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
}

function sculptClay(mesh, hit) {
  const geometry = mesh.geometry;
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  const point = mesh.worldToLocal(hit.point.clone());
  const radius = Number(clayBrushSize.value);
  const amount = Number(clayBrushStrength.value) * 0.12;
  const vertex = new THREE.Vector3(), surfaceNormal = new THREE.Vector3(), target = new THREE.Vector3();
  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index);
    const distance = vertex.distanceTo(point);
    if (distance > radius) continue;
    const falloff = (1 - distance / radius) ** 2;
    if (clayMode === "smooth") {
      target.copy(vertex).normalize().multiplyScalar(mesh.userData.clayRadius || 18);
      vertex.lerp(target, amount * falloff * 0.45);
    } else {
      surfaceNormal.fromBufferAttribute(normal, index);
      vertex.addScaledVector(surfaceNormal, amount * falloff * (clayMode === "carve" ? -1 : 1));
    }
    position.setXYZ(index, vertex.x, vertex.y, vertex.z);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  mesh.userData.baseSize = geometry.boundingBox.getSize(new THREE.Vector3());
  syncInspector();
  scheduleAnalysis();
}

function resetView() {
  camera.position.set(155, 125, 175);
  orbit.target.set(0, 0, 0);
  orbit.update();
}

function resize() {
  const rect = viewport.getBoundingClientRect();
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  renderer.setSize(rect.width, rect.height, false);
}

function beginSculpt(event, canCapture) {
  if (event.button !== 0 || transform.dragging) return;
  pointerFromEvent(event);
  const hit = raycaster.intersectObjects(visibleMeshes(), false)[0];
  const one = selection.size === 1 ? [...selection][0] : null;
  if (clayBrushActive && hit && hit.object === one && isClay(one) && !event.shiftKey) {
    event.stopImmediatePropagation();
    recordHistory(); sculpting = true; sculptedMesh = one; orbit.enabled = false;
    if (canCapture) renderer.domElement.setPointerCapture(event.pointerId);
    sculptClay(one, hit);
    return;
  }
  if (hit) event.shiftKey ? toggleSelect(hit.object) : select([hit.object]); else if (!event.shiftKey) select([]);
}

function moveSculpt(event) {
  if (!sculpting || !sculptedMesh) return;
  event.stopImmediatePropagation();
  pointerFromEvent(event);
  const hit = raycaster.intersectObject(sculptedMesh, false)[0];
  if (hit) sculptClay(sculptedMesh, hit);
}

function endSculpt(event, canRelease) {
  if (!sculpting) return;
  event.stopImmediatePropagation();
  sculpting = false; sculptedMesh = null; orbit.enabled = true;
  if (canRelease && renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
  setStatus("Clay changed. Keep sculpting, or use the arrows to move your shape.");
}

window.addEventListener("pointerdown", (event) => { ignoreMouseUntil = Date.now() + 700; beginSculpt(event, true); }, { capture: true });
window.addEventListener("pointermove", (event) => moveSculpt(event), { capture: true });
window.addEventListener("pointerup", (event) => endSculpt(event, true), { capture: true });
window.addEventListener("mousedown", (event) => { if (Date.now() >= ignoreMouseUntil) beginSculpt(event, false); }, { capture: true });
window.addEventListener("mousemove", (event) => { if (Date.now() >= ignoreMouseUntil) moveSculpt(event); }, { capture: true });
window.addEventListener("mouseup", (event) => { if (Date.now() >= ignoreMouseUntil) endSculpt(event, false); }, { capture: true });

document.querySelectorAll("[data-add]").forEach((button) => button.addEventListener("click", () => addShape(button.dataset.add)));
document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => {
  clayBrushActive = false;
  transform.setMode(button.dataset.mode);
  document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("active", item === button));
}));
document.querySelectorAll("[data-clay-mode]").forEach((button) => button.addEventListener("click", () => {
  clayMode = button.dataset.clayMode; clayBrushActive = true;
  document.querySelectorAll("[data-clay-mode]").forEach((item) => item.classList.toggle("active", item === button));
  setStatus(`${button.textContent} brush selected. Drag directly on your clay shape.`);
}));
document.getElementById("addClay").addEventListener("click", () => addShape("clay"));
document.getElementById("duplicate").addEventListener("click", duplicateSelected);
document.getElementById("makeSolid").addEventListener("click", () => changeType(false));
document.getElementById("makeHole").addEventListener("click", () => changeType(true));
document.getElementById("union").addEventListener("click", createUnion);
document.getElementById("breakUnion").addEventListener("click", breakUnion);
document.getElementById("layFlat").addEventListener("click", layFlat);
document.getElementById("optimizeOrientation").addEventListener("click", optimizePrintOrientation);
document.getElementById("deleteSelected").addEventListener("click", deleteSelected);
document.getElementById("exportStl").addEventListener("click", exportStl);
document.getElementById("saveModel").addEventListener("click", saveModel);
document.getElementById("loadModel").addEventListener("change", (event) => { const file = event.target.files && event.target.files[0]; if (file) loadModel(file); event.target.value = ""; });
document.getElementById("newProject").addEventListener("click", () => { recordHistory(); removeMeshes([...modelGroup.children]); liveUnions.clear(); clayNumber = 0; select([]); projectName.value = "my-derby-part"; setStatus("New model ready. Add a shape to begin."); scheduleAnalysis(); });
document.getElementById("homeView").addEventListener("click", resetView);
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);
document.getElementById("settingsButton").addEventListener("click", () => settingsDialog.showModal());
document.getElementById("closeSettings").addEventListener("click", () => settingsDialog.close());
[hardAlert, warningAlert].forEach((alert) => alert.addEventListener("click", () => settingsDialog.showModal()));
Object.values(fields).forEach((input) => {
  input.addEventListener("focus", recordHistory);
  input.addEventListener("input", applyFieldChanges);
  input.addEventListener("change", applyFieldChanges);
});
gridSnap.addEventListener("change", () => { transform.setTranslationSnap(Number(gridSnap.value)); setStatus(`Grid snapping set to ${gridSnap.value} mm.`); });
planeSnap.addEventListener("change", () => setStatus(planeSnap.checked ? "Plane snapping is on." : "Plane snapping is off."));
[hardAngle, warnAngle, showPrintCheck].forEach((input) => input.addEventListener("change", scheduleAnalysis));
[clayBrushSize, clayBrushStrength].forEach((input) => input.addEventListener("input", () => { clayBrushSizeValue.value = clayBrushSize.value; clayBrushStrengthValue.value = clayBrushStrength.value; }));
document.addEventListener("keydown", (event) => {
  if (event.target.matches("input")) return;
  if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); deleteSelected(); }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") { event.preventDefault(); duplicateSelected(); }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo(); }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") { event.preventDefault(); redo(); }
});
window.addEventListener("resize", resize);
resetView();
resize();
renderer.setAnimationLoop(() => { orbit.update(); renderer.render(scene, camera); });
syncInspector();
syncHistoryControls();
scheduleAnalysis();
