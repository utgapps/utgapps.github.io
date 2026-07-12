/* ============================================================
   UTG Academy · Animator
   A simple "pivot"-style stick-figure animator for kids.

   How it works:
   - The figure is a little skeleton of connected bones. Each bone
     knows its length and its angle RELATIVE to its parent bone, so
     when you turn one bone, everything attached below it turns with
     it (just like a real arm). Angles (not pixel positions) are what
     we store, so bones never stretch and playback can be smooth.
   - A "frame" is one pose (all the angles + where the hip is).
   - Play walks through the frames and gently blends between them.
   ============================================================ */
(function () {
  "use strict";

  var DEG = Math.PI / 180;
  var STAGE_W = 800, STAGE_H = 600;

  // ---- figure skeleton (constant structure) --------------------
  // rel = default angle of this bone relative to its parent bone (degrees)
  // rel of the root (index 0) is the whole-figure facing angle.
  var FIG = [
    { name: "hip",    parent: -1, len: 0,  rel: 0 },      // 0  root / move handle
    { name: "neck",   parent: 0,  len: 60, rel: -90 },    // 1  torso
    { name: "head",   parent: 1,  len: 44, rel: 0, head: 22 }, // 2  head (circle radius 22)
    { name: "lElbow", parent: 1,  len: 44, rel: -135 },   // 3  left upper arm
    { name: "lHand",  parent: 3,  len: 40, rel: 0 },      // 4  left fore-arm
    { name: "rElbow", parent: 1,  len: 44, rel: 135 },    // 5  right upper arm
    { name: "rHand",  parent: 5,  len: 40, rel: 0 },      // 6  right fore-arm
    { name: "lKnee",  parent: 0,  len: 58, rel: 100 },    // 7  left thigh
    { name: "lFoot",  parent: 7,  len: 52, rel: 0 },      // 8  left shin
    { name: "rKnee",  parent: 0,  len: 58, rel: 80 },     // 9  right thigh
    { name: "rFoot",  parent: 9,  len: 52, rel: 0 }       // 10 right shin
  ];
  var N = FIG.length;

  var COLORS = ["#1f2a37", "#01aefd", "#ff5a5a", "#2fbf71", "#9b5de5", "#ff9f1c"];

  // ---- state ---------------------------------------------------
  var state = {
    frames: [],        // each: { x, y, rel:[...] }  (rel in radians)
    cur: 0,
    fps: 8,
    loop: true,
    onion: false,
    color: COLORS[0],
    playing: false
  };

  var undoStack = [];

  // ---- DOM -----------------------------------------------------
  var canvas = document.getElementById("stage");
  var ctx = canvas.getContext("2d");
  var strip = document.getElementById("strip");
  var $ = function (id) { return document.getElementById(id); };

  // ---- pose helpers -------------------------------------------
  function defaultPose() {
    return {
      x: STAGE_W / 2,
      y: STAGE_H / 2 - 30,
      rel: FIG.map(function (n) { return (n.rel || 0) * DEG; })
    };
  }
  function clonePose(p) {
    return { x: p.x, y: p.y, rel: p.rel.slice() };
  }

  // Forward kinematics: world position of every node for a pose.
  function positions(p) {
    var pos = new Array(N), world = new Array(N);
    pos[0] = { x: p.x, y: p.y };
    world[0] = p.rel[0];
    for (var i = 1; i < N; i++) {
      var par = FIG[i].parent;
      world[i] = world[par] + p.rel[i];
      pos[i] = {
        x: pos[par].x + FIG[i].len * Math.cos(world[i]),
        y: pos[par].y + FIG[i].len * Math.sin(world[i])
      };
    }
    return { pos: pos, world: world };
  }

  // shortest-path angle blend (handles wrap-around)
  function lerpAngle(a, b, t) {
    var d = Math.atan2(Math.sin(b - a), Math.cos(b - a));
    return a + d * t;
  }
  function blendPose(a, b, t) {
    var out = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, rel: new Array(N) };
    for (var i = 0; i < N; i++) out.rel[i] = lerpAngle(a.rel[i], b.rel[i], t);
    return out;
  }

  // ---- drawing -------------------------------------------------
  function drawFigure(c, pose, opt) {
    opt = opt || {};
    var P = positions(pose).pos;
    var col = opt.color || state.color;
    var lw = opt.lw != null ? opt.lw : 12;

    c.save();
    if (opt.alpha != null) c.globalAlpha = opt.alpha;
    c.strokeStyle = col;
    c.fillStyle = col;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.lineWidth = lw;

    // bones (skip the head bone; we draw the head as a circle)
    for (var i = 1; i < N; i++) {
      if (FIG[i].head) continue;
      var par = FIG[i].parent;
      c.beginPath();
      c.moveTo(P[par].x, P[par].y);
      c.lineTo(P[i].x, P[i].y);
      c.stroke();
    }
    // neck line up to the head, then the head circle
    var hi = 2, ni = FIG[hi].parent;
    c.beginPath();
    c.moveTo(P[ni].x, P[ni].y);
    c.lineTo(P[hi].x, P[hi].y);
    c.stroke();
    c.beginPath();
    c.arc(P[hi].x, P[hi].y, FIG[hi].head, 0, Math.PI * 2);
    c.fill();

    c.restore();

    // joint handles (only while editing)
    if (opt.handles) {
      for (var j = 0; j < N; j++) {
        var isRoot = j === 0;
        if (j === 2) continue; // no handle on the head itself
        c.beginPath();
        c.arc(P[j].x, P[j].y, isRoot ? 11 : 9, 0, Math.PI * 2);
        c.fillStyle = isRoot ? "#ffd633" : "#ffffff";
        c.fill();
        c.lineWidth = 3;
        c.strokeStyle = isRoot ? "#e0b400" : "#01aefd";
        c.stroke();
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, STAGE_W, STAGE_H);
    // ground line
    ctx.save();
    ctx.strokeStyle = "#eef2f5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, STAGE_H - 60);
    ctx.lineTo(STAGE_W, STAGE_H - 60);
    ctx.stroke();
    ctx.restore();

    if (state.playing) {
      drawFigure(ctx, playPose(), { handles: false });
      return;
    }
    // onion skin: the frame before this one, faint
    if (state.onion && state.cur > 0) {
      drawFigure(ctx, state.frames[state.cur - 1], { color: "#c7d0d8", alpha: .55, handles: false });
    }
    drawFigure(ctx, state.frames[state.cur], { handles: true });
  }

  // ---- frame strip UI -----------------------------------------
  function rebuildStrip() {
    strip.innerHTML = "";
    for (var i = 0; i < state.frames.length; i++) {
      (function (i) {
        var btn = document.createElement("button");
        btn.className = "frame" + (i === state.cur ? " sel" : "");
        var tc = document.createElement("canvas");
        tc.width = 96; tc.height = 72;
        var tctx = tc.getContext("2d");
        tctx.fillStyle = "#fff"; tctx.fillRect(0, 0, 96, 72);
        tctx.save();
        tctx.scale(96 / STAGE_W, 96 / STAGE_W); // uniform scale
        drawFigure(tctx, state.frames[i], { handles: false, lw: 16 });
        tctx.restore();
        btn.appendChild(tc);
        var num = document.createElement("span");
        num.className = "num"; num.textContent = i + 1;
        btn.appendChild(num);
        btn.addEventListener("click", function () {
          if (state.playing) stop();
          state.cur = i; render(); refreshStripSel();
        });
        strip.appendChild(btn);
      })(i);
    }
    $("delFrame").disabled = state.frames.length <= 1;
  }
  function refreshStripSel() {
    var kids = strip.children;
    for (var i = 0; i < kids.length; i++) kids[i].classList.toggle("sel", i === state.cur);
    var sel = kids[state.cur];
    if (sel) sel.scrollIntoView({ inline: "nearest", block: "nearest" });
  }
  function refreshThumb(i) {
    var btn = strip.children[i];
    if (!btn) return;
    var tc = btn.querySelector("canvas");
    var tctx = tc.getContext("2d");
    tctx.clearRect(0, 0, 96, 72);
    tctx.fillStyle = "#fff"; tctx.fillRect(0, 0, 96, 72);
    tctx.save();
    tctx.scale(96 / STAGE_W, 96 / STAGE_W);
    drawFigure(tctx, state.frames[i], { handles: false, lw: 16 });
    tctx.restore();
  }

  // ---- undo ----------------------------------------------------
  function pushUndo() {
    undoStack.push({ frames: state.frames.map(clonePose), cur: state.cur });
    if (undoStack.length > 40) undoStack.shift();
    $("undoBtn").disabled = false;
  }
  function undo() {
    if (!undoStack.length) return;
    if (state.playing) stop();
    var s = undoStack.pop();
    state.frames = s.frames.map(clonePose);
    state.cur = Math.min(s.cur, state.frames.length - 1);
    $("undoBtn").disabled = undoStack.length === 0;
    rebuildStrip(); render(); save();
  }

  // ---- pointer / dragging -------------------------------------
  var drag = null; // { node, offx, offy }

  function stageXY(e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (STAGE_W / r.width),
      y: (e.clientY - r.top) * (STAGE_H / r.height)
    };
  }
  function hit(pt) {
    var P = positions(state.frames[state.cur]).pos;
    var best = -1, bestD = 22 * 22; // grab radius
    for (var i = 0; i < N; i++) {
      if (i === 2) continue; // head has no handle
      var dx = P[i].x - pt.x, dy = P[i].y - pt.y, d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = i; }
    }
    return best;
  }

  canvas.addEventListener("pointerdown", function (e) {
    if (state.playing) return;
    var pt = stageXY(e);
    var node = hit(pt);
    if (node < 0) return;
    pushUndo();
    var pose = state.frames[state.cur];
    var P = positions(pose).pos;
    drag = { node: node, offx: P[node].x - pt.x, offy: P[node].y - pt.y };
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    e.preventDefault();
  });

  canvas.addEventListener("pointermove", function (e) {
    if (!drag) return;
    var pt = stageXY(e);
    var pose = state.frames[state.cur];
    if (drag.node === 0) {
      // move the whole figure
      pose.x = pt.x + drag.offx;
      pose.y = pt.y + drag.offy;
    } else {
      // rotate this bone to aim at the cursor; children follow
      var info = positions(pose);
      var par = FIG[drag.node].parent;
      var want = Math.atan2(pt.y - info.pos[par].y, pt.x - info.pos[par].x);
      pose.rel[drag.node] = want - info.world[par];
    }
    render();
    e.preventDefault();
  });

  function endDrag(e) {
    if (!drag) return;
    drag = null;
    refreshThumb(state.cur);
    save();
    if (e && e.pointerId != null) { try { canvas.releasePointerCapture(e.pointerId); } catch (_) {} }
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  // ---- frame ops ----------------------------------------------
  function addFrame() {
    if (state.playing) stop();
    pushUndo();
    state.frames.splice(state.cur + 1, 0, clonePose(state.frames[state.cur]));
    state.cur++;
    rebuildStrip(); render(); save();
  }
  function delFrame() {
    if (state.frames.length <= 1) return;
    if (state.playing) stop();
    pushUndo();
    state.frames.splice(state.cur, 1);
    if (state.cur >= state.frames.length) state.cur = state.frames.length - 1;
    rebuildStrip(); render(); save();
  }
  function newAnim() {
    if (!confirm("Start a brand new animation? This clears your frames.")) return;
    if (state.playing) stop();
    pushUndo();
    state.frames = [defaultPose()];
    state.cur = 0;
    rebuildStrip(); render(); save();
  }

  // ---- playback ------------------------------------------------
  var playT = 0, lastTS = 0, rafId = 0;
  function playPose() {
    var n = state.frames.length;
    if (n === 1) return state.frames[0];
    var a = Math.floor(playT) % n;
    var b = (a + 1) % n;
    var frac = playT - Math.floor(playT);
    return blendPose(state.frames[a], state.frames[b], frac);
  }
  function tick(ts) {
    if (!state.playing) return;
    if (!lastTS) lastTS = ts;
    var dt = Math.min((ts - lastTS) / 1000, 0.1); lastTS = ts; // clamp so a hidden tab doesn't jump
    var n = state.frames.length;
    playT += state.fps * dt;
    if (n > 1) {
      if (state.loop) {
        playT = playT % n;
      } else if (playT >= n - 1) {
        playT = n - 1; render(); stop(); return;
      }
    }
    render();
    rafId = requestAnimationFrame(tick);
  }
  function play() {
    if (state.frames.length < 2) { flashHint("Add another frame first, then press Play!"); return; }
    state.playing = true;
    document.body.classList.add("playing-mode");
    var b = $("playBtn");
    b.textContent = "■ Stop"; b.classList.add("playing");
    playT = state.cur; lastTS = 0;
    rafId = requestAnimationFrame(tick);
  }
  function stop() {
    state.playing = false;
    document.body.classList.remove("playing-mode");
    if (rafId) cancelAnimationFrame(rafId);
    var b = $("playBtn");
    b.textContent = "▶ Play"; b.classList.remove("playing");
    render(); refreshStripSel();
  }
  function togglePlay() { state.playing ? stop() : play(); }

  var hintTimer = 0;
  function flashHint(msg) {
    var h = $("hint"); var prev = h.innerHTML;
    h.textContent = msg;
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { h.innerHTML = prev; }, 2200);
  }

  // ---- save / load (localStorage) -----------------------------
  var SKEY = "utg_animator";
  function save() {
    try {
      localStorage.setItem(SKEY, JSON.stringify({
        frames: state.frames, fps: state.fps, loop: state.loop,
        onion: state.onion, color: state.color
      }));
    } catch (_) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(SKEY);
      if (!raw) return false;
      var d = JSON.parse(raw);
      if (!d.frames || !d.frames.length) return false;
      // basic shape check
      for (var i = 0; i < d.frames.length; i++) {
        if (!d.frames[i].rel || d.frames[i].rel.length !== N) return false;
      }
      state.frames = d.frames;
      state.fps = d.fps || 8;
      state.loop = d.loop !== false;
      state.onion = !!d.onion;
      state.color = d.color || COLORS[0];
      return true;
    } catch (_) { return false; }
  }

  // ---- build controls -----------------------------------------
  function buildSwatches() {
    var wrap = $("swatches");
    COLORS.forEach(function (col) {
      var s = document.createElement("button");
      s.className = "swatch" + (col === state.color ? " sel" : "");
      s.style.background = col;
      s.title = "Use this color";
      s.addEventListener("click", function () {
        state.color = col;
        wrap.querySelectorAll(".swatch").forEach(function (x) { x.classList.remove("sel"); });
        s.classList.add("sel");
        render();
        for (var i = 0; i < state.frames.length; i++) refreshThumb(i);
        save();
      });
      wrap.appendChild(s);
    });
  }
  function setFps(v) {
    state.fps = Math.max(1, Math.min(24, v));
    $("fpsVal").textContent = state.fps;
    save();
  }

  function wire() {
    $("undoBtn").addEventListener("click", undo);
    $("undoBtn").disabled = true;
    $("addFrame").addEventListener("click", addFrame);
    $("delFrame").addEventListener("click", delFrame);
    $("newBtn").addEventListener("click", newAnim);
    $("playBtn").addEventListener("click", togglePlay);
    $("fpsUp").addEventListener("click", function () { setFps(state.fps + 1); });
    $("fpsDown").addEventListener("click", function () { setFps(state.fps - 1); });
    $("loopBtn").addEventListener("click", function () {
      state.loop = !state.loop;
      $("loopBtn").classList.toggle("on", state.loop);
      save();
    });
    $("onionBtn").addEventListener("click", function () {
      state.onion = !state.onion;
      $("onionBtn").classList.toggle("on", state.onion);
      render(); save();
    });

    // keyboard shortcuts
    document.addEventListener("keydown", function (e) {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); }
      else if (e.key === "ArrowRight" && !state.playing) { if (state.cur < state.frames.length - 1) { state.cur++; render(); refreshStripSel(); } }
      else if (e.key === "ArrowLeft" && !state.playing) { if (state.cur > 0) { state.cur--; render(); refreshStripSel(); } }
    });

    window.addEventListener("beforeunload", save);
  }

  // ---- init ----------------------------------------------------
  function init() {
    if (!load()) { state.frames = [defaultPose()]; state.cur = 0; }
    buildSwatches();
    setFps(state.fps);
    $("loopBtn").classList.toggle("on", state.loop);
    $("onionBtn").classList.toggle("on", state.onion);
    wire();
    rebuildStrip();
    render();
  }
  init();
})();
