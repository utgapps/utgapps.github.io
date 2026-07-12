/* ============================================================
   Figure Maker — build a custom jointed figure for the Animator.

   You shape a skeleton out of connected "bones". We track each joint
   as an (x,y) dot while building; on "Add to Scene" we convert the
   dots into a fig (parent / length / rest-angle / head) — the same
   shape the Animator uses — normalized to a friendly size.
   ============================================================ */
(function () {
  "use strict";

  var W = 760, H = 480;
  var $ = function (id) { return document.getElementById(id); };
  var modal, canvas, ctx;
  var nodes = [];        // { x, y, parent, head:bool }
  var mode = "move";
  var activeParent = 0;  // "grow from" joint in Add mode
  var drag = null, lastPt = null, undoStack = [];

  var HINTS = {
    move: "Drag the dots to stretch and bend the bones.",
    add: "Tap a dot to start there, then tap empty space to add a bone. Tap again to keep going.",
    head: "Tap a dot to give it a head (a circle). Tap again to remove it.",
    erase: "Tap a dot to erase that bone and anything hanging off it."
  };

  // ---- build the starting skeletons ---------------------------
  function personNodes() {
    // use the Animator's own default figure, laid out centered here
    var A = window.UTGAnim, fig = A.defaultFig();
    var pose = { x: W / 2, y: H * 0.46, rel: fig.map(function (b) { return b.rel; }) };
    var P = A.positions(pose, fig).pos;
    return P.map(function (p, i) { return { x: p.x, y: p.y, parent: fig[i].parent, head: !!fig[i].head }; });
  }
  function blankNodes() {
    return [ { x: W / 2, y: H * 0.62, parent: -1, head: false },
             { x: W / 2, y: H * 0.40, parent: 0, head: false } ];
  }

  // ---- geometry helpers ---------------------------------------
  function descendants(idx) {
    var out = [idx], changed = true;
    while (changed) {
      changed = false;
      for (var i = 0; i < nodes.length; i++) {
        if (out.indexOf(i) < 0 && out.indexOf(nodes[i].parent) >= 0) { out.push(i); changed = true; }
      }
    }
    return out;
  }
  function boneLen(i) { var p = nodes[i].parent; if (p < 0) return 60; return Math.hypot(nodes[i].x - nodes[p].x, nodes[i].y - nodes[p].y); }
  function headRadius(i) { return Math.max(16, Math.min(55, 0.45 * boneLen(i))); }
  function hitNode(pt) {
    var best = -1, bd = 22 * 22;
    for (var i = 0; i < nodes.length; i++) {
      var d = (nodes[i].x - pt.x) * (nodes[i].x - pt.x) + (nodes[i].y - pt.y) * (nodes[i].y - pt.y);
      if (d < bd) { bd = d; best = i; }
    }
    return best;
  }

  // ---- undo ----------------------------------------------------
  function snap() { return nodes.map(function (n) { return { x: n.x, y: n.y, parent: n.parent, head: n.head }; }); }
  function pushUndo() { undoStack.push(snap()); if (undoStack.length > 40) undoStack.shift(); $("figUndo").disabled = false; }
  function undo() { if (!undoStack.length) return; nodes = undoStack.pop(); activeParent = Math.min(activeParent, nodes.length - 1); $("figUndo").disabled = !undoStack.length; draw(); }

  // ---- drawing -------------------------------------------------
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    // bones
    ctx.strokeStyle = "#1f2a37"; ctx.fillStyle = "#1f2a37";
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 14;
    for (var i = 1; i < nodes.length; i++) {
      var p = nodes[i].parent;
      ctx.beginPath(); ctx.moveTo(nodes[p].x, nodes[p].y); ctx.lineTo(nodes[i].x, nodes[i].y); ctx.stroke();
    }
    for (var h = 0; h < nodes.length; h++) {
      if (nodes[h].head) { ctx.beginPath(); ctx.arc(nodes[h].x, nodes[h].y, headRadius(h), 0, Math.PI * 2); ctx.fill(); }
    }
    // joint dots
    for (var j = 0; j < nodes.length; j++) {
      var root = j === 0, isActive = mode === "add" && j === activeParent;
      ctx.beginPath(); ctx.arc(nodes[j].x, nodes[j].y, root ? 10 : 8, 0, Math.PI * 2);
      ctx.fillStyle = root ? "#ffd633" : "#ffffff"; ctx.fill();
      ctx.lineWidth = isActive ? 4.5 : 3;
      ctx.strokeStyle = isActive ? "#ff9f1c" : (root ? "#e0b400" : "#01aefd"); ctx.stroke();
    }
  }

  // ---- pointer -------------------------------------------------
  function xy(e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
  }
  function onDown(e) {
    var pt = xy(e), hit = hitNode(pt);
    if (mode === "move") {
      if (hit >= 0) { pushUndo(); drag = { subtree: descendants(hit) }; lastPt = pt; try { canvas.setPointerCapture(e.pointerId); } catch (_) {} }
    } else if (mode === "add") {
      if (hit >= 0) { activeParent = hit; draw(); }
      else { pushUndo(); nodes.push({ x: pt.x, y: pt.y, parent: activeParent, head: false }); activeParent = nodes.length - 1; draw(); }
    } else if (mode === "head") {
      if (hit >= 0) { pushUndo(); nodes[hit].head = !nodes[hit].head; draw(); }
    } else if (mode === "erase") {
      if (hit > 0) { pushUndo(); var rm = descendants(hit); removeNodes(rm); draw(); }
    }
    e.preventDefault();
  }
  function onMove(e) {
    if (!drag) return;
    var pt = xy(e), dx = pt.x - lastPt.x, dy = pt.y - lastPt.y; lastPt = pt;
    for (var k = 0; k < drag.subtree.length; k++) { var n = nodes[drag.subtree[k]]; n.x += dx; n.y += dy; }
    draw(); e.preventDefault();
  }
  function onUp(e) { drag = null; if (e && e.pointerId != null) { try { canvas.releasePointerCapture(e.pointerId); } catch (_) {} } }

  function removeNodes(rm) {
    var keep = [], map = {};
    for (var i = 0; i < nodes.length; i++) if (rm.indexOf(i) < 0) { map[i] = keep.length; keep.push(nodes[i]); }
    for (var j = 0; j < keep.length; j++) if (keep[j].parent >= 0) keep[j].parent = map[keep[j].parent];
    nodes = keep;
    activeParent = 0;
  }

  // ---- convert nodes -> fig -----------------------------------
  function nodesToFig() {
    var n = nodes.length, fig = new Array(n), world = new Array(n);
    fig[0] = { parent: -1, len: 0, rel: 0, head: nodes[0].head ? headRadius(0) : 0 };
    world[0] = 0;
    for (var i = 1; i < n; i++) {
      var par = nodes[i].parent, dx = nodes[i].x - nodes[par].x, dy = nodes[i].y - nodes[par].y;
      var len = Math.hypot(dx, dy), w = Math.atan2(dy, dx);
      world[i] = w;
      fig[i] = { parent: par, len: len, rel: w - world[par], head: nodes[i].head ? headRadius(i) : 0 };
    }
    // normalize to a friendly stage size (~340px tall)
    var ys = nodes.map(function (p) { return p.y; });
    var height = Math.max(1, Math.max.apply(null, ys) - Math.min.apply(null, ys));
    var s = Math.max(0.15, Math.min(6, 340 / height));
    for (var k = 0; k < n; k++) { fig[k].len *= s; fig[k].head *= s; }
    return fig;
  }

  // ---- modes / buttons ----------------------------------------
  function setMode(m) {
    mode = m;
    if (m === "add") activeParent = 0;
    var btns = modal.querySelectorAll(".ftool[data-mode]");
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle("on", btns[i].dataset.mode === m);
    $("figHint").textContent = HINTS[m];
    draw();
  }
  function reset(kind) { pushUndoClear(); nodes = kind === "blank" ? blankNodes() : personNodes(); activeParent = 0; draw(); }
  function pushUndoClear() { undoStack = []; $("figUndo").disabled = true; }

  function open() {
    if (!modal) return;
    nodes = personNodes(); activeParent = 0; undoStack = []; $("figUndo").disabled = true;
    setMode("move");
    modal.classList.remove("hidden");
    draw();
  }
  function close() { modal.classList.add("hidden"); }
  function addToScene() {
    if (nodes.length < 2) { $("figHint").textContent = "Add at least one bone first!"; return; }
    window.UTGAnim.addActorFromFig(nodesToFig());
    close();
  }

  // ---- init ----------------------------------------------------
  function init() {
    modal = $("figMaker"); if (!modal) return;
    canvas = $("figCanvas"); ctx = canvas.getContext("2d");
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    var btns = modal.querySelectorAll(".ftool[data-mode]");
    for (var i = 0; i < btns.length; i++) (function (b) { b.addEventListener("click", function () { setMode(b.dataset.mode); }); })(btns[i]);
    $("figUndo").addEventListener("click", undo);
    $("figReset").addEventListener("click", function () { reset("person"); });
    $("figBlank").addEventListener("click", function () { reset("blank"); });
    $("figCancel").addEventListener("click", close);
    $("figAdd").addEventListener("click", addToScene);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.FigMaker = { open: open };
})();
