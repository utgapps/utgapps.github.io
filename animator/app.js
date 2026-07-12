/* ============================================================
   UTG Academy · Animator
   A simple "pivot"-style scene animator for kids.

   A SCENE has:
   - a background (color, and/or an imported photo),
   - one or more PEOPLE (jointed stick figures), and
   - any number of PICTURES (imported images you can move / scale / turn).

   A FRAME is one moment in time: it remembers every person's pose and
   every picture's spot/size/turn. Press Play and we gently blend from
   one frame to the next.

   Each bone stores its ANGLE relative to its parent (not pixel spots),
   so limbs never stretch and blending stays smooth.
   ============================================================ */
(function () {
  "use strict";

  var DEG = Math.PI / 180;
  var STAGE_W = 1280, STAGE_H = 720;

  // ---- person skeleton -----------------------------------------
  // A "fig" is the bone list for one actor: {parent, len, rel(rad), head(radius)}.
  // Each actor owns its own fig, so the Figure Maker can build custom ones.
  var DEFAULT_FIG_DEG = [
    { parent: -1, len: 0,  rel: 0 },
    { parent: 0,  len: 84, rel: -90 },
    { parent: 1,  len: 62, rel: 0, head: 30 },
    { parent: 1,  len: 62, rel: -135 },
    { parent: 3,  len: 56, rel: 0 },
    { parent: 1,  len: 62, rel: 135 },
    { parent: 5,  len: 56, rel: 0 },
    { parent: 0,  len: 81, rel: 100 },
    { parent: 7,  len: 73, rel: 0 },
    { parent: 0,  len: 81, rel: 80 },
    { parent: 9,  len: 73, rel: 0 }
  ];
  function cloneFig(fig) {
    return fig.map(function (b) { return { parent: b.parent, len: b.len, rel: b.rel, head: b.head || 0 }; });
  }
  function defaultFig() {
    return DEFAULT_FIG_DEG.map(function (b) { return { parent: b.parent, len: b.len, rel: (b.rel || 0) * DEG, head: b.head || 0 }; });
  }
  var COLORS = ["#1f2a37", "#01aefd", "#ff5a5a", "#2fbf71", "#9b5de5", "#ff9f1c"];

  // ---- state ---------------------------------------------------
  // frame = { poses:[ {x,y,rel[]} per person ], props:[ {x,y,scale,rot} per picture ] }
  var state = {
    bg: { img: null, dataURL: null },   // blank (white) or an imported image
    actors: [],        // [{ color }]   identity = index
    props: [],         // [{ name, img, dataURL, w, h }]
    frames: [],
    cur: 0,
    fps: 8, loop: true, onion: false, playing: false,
    sel: { type: null, index: -1 }   // 'actor' | 'prop' | null
  };
  var undoStack = [];

  // ---- DOM -----------------------------------------------------
  var canvas = document.getElementById("stage");
  var ctx = canvas.getContext("2d");
  var strip = document.getElementById("strip");
  var $ = function (id) { return document.getElementById(id); };

  // ---- poses ---------------------------------------------------
  function defaultPose(fig, cx, cy) {
    return { x: cx == null ? STAGE_W / 2 : cx, y: cy == null ? STAGE_H / 2 - 30 : cy,
             rel: fig.map(function (b) { return b.rel; }) };
  }
  var GRAB = 28; // joint grab radius (bigger canvas → bigger targets)
  function clonePose(p) { return { x: p.x, y: p.y, rel: p.rel.slice() }; }
  function cloneT(t) { return { x: t.x, y: t.y, scale: t.scale, rot: t.rot }; }

  function positions(p, fig) {
    var n = fig.length, pos = new Array(n), world = new Array(n);
    pos[0] = { x: p.x, y: p.y }; world[0] = p.rel[0];
    for (var i = 1; i < n; i++) {
      var par = fig[i].parent;
      world[i] = world[par] + p.rel[i];
      pos[i] = { x: pos[par].x + fig[i].len * Math.cos(world[i]),
                 y: pos[par].y + fig[i].len * Math.sin(world[i]) };
    }
    return { pos: pos, world: world };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpAngle(a, b, t) { return a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * t; }
  function blendPose(a, b, t) {
    var n = a.rel.length, o = { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), rel: new Array(n) };
    for (var i = 0; i < n; i++) o.rel[i] = lerpAngle(a.rel[i], b.rel[i], t);
    return o;
  }

  // ---- prop transform math ------------------------------------
  function propLocalToWorld(t, lx, ly) {
    var sx = lx * t.scale, sy = ly * t.scale;
    var c = Math.cos(t.rot), s = Math.sin(t.rot);
    return { x: t.x + sx * c - sy * s, y: t.y + sx * s + sy * c };
  }
  function propWorldToLocal(def, t, px, py) {
    var dx = px - t.x, dy = py - t.y;
    var c = Math.cos(-t.rot), s = Math.sin(-t.rot);
    return { lx: (dx * c - dy * s) / t.scale, ly: (dx * s + dy * c) / t.scale };
  }
  function propScaleHandle(def, t) { return propLocalToWorld(t, def.w / 2, def.h / 2); }
  function propRotateHandle(def, t) {
    var top = propLocalToWorld(t, 0, -def.h / 2);
    var ux = top.x - t.x, uy = top.y - t.y, m = Math.hypot(ux, uy) || 1;
    return { x: top.x + (ux / m) * 26, y: top.y + (uy / m) * 26 };
  }
  function propBodyHit(def, t, pt) {
    var l = propWorldToLocal(def, t, pt.x, pt.y);
    return Math.abs(l.lx) <= def.w / 2 && Math.abs(l.ly) <= def.h / 2;
  }

  // ---- drawing -------------------------------------------------
  function drawBackground(c) {
    c.save();
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, STAGE_W, STAGE_H);
    if (state.bg.img && state.bg.img.complete && state.bg.img.naturalWidth) {
      var im = state.bg.img, sc = Math.max(STAGE_W / im.naturalWidth, STAGE_H / im.naturalHeight);
      var dw = im.naturalWidth * sc, dh = im.naturalHeight * sc;
      c.drawImage(im, (STAGE_W - dw) / 2, (STAGE_H - dh) / 2, dw, dh);
    } else {
      c.strokeStyle = "rgba(0,0,0,.06)"; c.lineWidth = 2;
      c.beginPath(); c.moveTo(0, STAGE_H - 80); c.lineTo(STAGE_W, STAGE_H - 80); c.stroke();
    }
    c.restore();
  }

  function drawActor(c, pose, fig, color, handles, alpha) {
    var n = fig.length, P = positions(pose, fig).pos;
    c.save();
    if (alpha != null) c.globalAlpha = alpha;
    c.strokeStyle = color; c.fillStyle = color;
    c.lineCap = "round"; c.lineJoin = "round"; c.lineWidth = 16;
    // every bone as a rounded line (the head's bone becomes its "neck")
    for (var i = 1; i < n; i++) {
      var par = fig[i].parent;
      c.beginPath(); c.moveTo(P[par].x, P[par].y); c.lineTo(P[i].x, P[i].y); c.stroke();
    }
    // filled circle at every head node, on top
    for (var h = 0; h < n; h++) {
      if (fig[h].head) { c.beginPath(); c.arc(P[h].x, P[h].y, fig[h].head, 0, Math.PI * 2); c.fill(); }
    }
    c.restore();

    if (handles) {
      for (var j = 0; j < n; j++) {
        if (fig[j].head) continue; // head tips have no separate handle
        var root = j === 0;
        c.beginPath(); c.arc(P[j].x, P[j].y, root ? 14 : 11, 0, Math.PI * 2);
        c.fillStyle = root ? "#ffd633" : "#ffffff"; c.fill();
        c.lineWidth = 3.5; c.strokeStyle = root ? "#e0b400" : "#01aefd"; c.stroke();
      }
    }
  }

  function drawProp(c, def, t, selected, alpha) {
    c.save();
    if (alpha != null) c.globalAlpha = alpha;
    c.translate(t.x, t.y); c.rotate(t.rot); c.scale(t.scale, t.scale);
    if (def.img && def.img.complete && def.img.naturalWidth) {
      c.drawImage(def.img, -def.w / 2, -def.h / 2, def.w, def.h);
    } else {
      c.fillStyle = "#dbe4ea"; c.fillRect(-def.w / 2, -def.h / 2, def.w, def.h);
    }
    c.restore();

    if (selected) {
      var TL = propLocalToWorld(t, -def.w / 2, -def.h / 2), TR = propLocalToWorld(t, def.w / 2, -def.h / 2);
      var BR = propLocalToWorld(t, def.w / 2, def.h / 2), BL = propLocalToWorld(t, -def.w / 2, def.h / 2);
      c.save();
      c.strokeStyle = "#01aefd"; c.lineWidth = 2; c.setLineDash([6, 5]);
      c.beginPath(); c.moveTo(TL.x, TL.y); c.lineTo(TR.x, TR.y); c.lineTo(BR.x, BR.y); c.lineTo(BL.x, BL.y); c.closePath(); c.stroke();
      c.setLineDash([]);
      var rot = propRotateHandle(def, t), top = propLocalToWorld(t, 0, -def.h / 2);
      c.beginPath(); c.moveTo(top.x, top.y); c.lineTo(rot.x, rot.y); c.stroke();
      // rotate handle (gold)
      c.beginPath(); c.arc(rot.x, rot.y, 8, 0, Math.PI * 2); c.fillStyle = "#ffd633"; c.fill(); c.lineWidth = 2; c.strokeStyle = "#e0b400"; c.stroke();
      // scale handle (blue square) at bottom-right
      var sh = propScaleHandle(def, t);
      c.fillStyle = "#01aefd"; c.strokeStyle = "#fff"; c.lineWidth = 2;
      c.fillRect(sh.x - 7, sh.y - 7, 14, 14); c.strokeRect(sh.x - 7, sh.y - 7, 14, 14);
      c.restore();
    }
  }

  // draw people + pictures for a resolved frame (bg drawn separately)
  function drawScene(c, frame, handles, ghost) {
    var a = ghost ? 0.5 : 1;
    for (var i = 0; i < state.actors.length; i++) {
      var col = ghost ? "#c3ccd4" : state.actors[i].color;
      drawActor(c, frame.poses[i], state.actors[i].fig, col, !ghost && handles && state.sel.type === "actor" && state.sel.index === i, ghost ? a : null);
    }
    for (var j = 0; j < state.props.length; j++) {
      drawProp(c, state.props[j], frame.props[j], !ghost && handles && state.sel.type === "prop" && state.sel.index === j, ghost ? a : null);
    }
  }

  function render() {
    ctx.clearRect(0, 0, STAGE_W, STAGE_H);
    drawBackground(ctx);
    if (state.playing) { drawScene(ctx, playFrame(), false, false); return; }
    if (state.onion && state.cur > 0) drawScene(ctx, state.frames[state.cur - 1], false, true);
    drawScene(ctx, state.frames[state.cur], true, false);
  }

  // ---- frame strip --------------------------------------------
  var THUMB_W = 104, THUMB_H = Math.round(THUMB_W * STAGE_H / STAGE_W); // 16:9
  function renderThumb(tctx, frame) {
    tctx.save();
    tctx.scale(THUMB_W / STAGE_W, THUMB_W / STAGE_W);
    drawBackground(tctx);
    drawScene(tctx, frame, false, false);
    tctx.restore();
  }
  function rebuildStrip() {
    strip.innerHTML = "";
    state.frames.forEach(function (frame, i) {
      var btn = document.createElement("button");
      btn.className = "frame" + (i === state.cur ? " sel" : "");
      var tc = document.createElement("canvas"); tc.width = THUMB_W; tc.height = THUMB_H;
      renderThumb(tc.getContext("2d"), frame);
      btn.appendChild(tc);
      var num = document.createElement("span"); num.className = "num"; num.textContent = i + 1;
      btn.appendChild(num);
      btn.addEventListener("click", function () {
        if (state.playing) stop();
        state.cur = i; render(); refreshStripSel();
      });
      strip.appendChild(btn);
    });
    $("delFrame").disabled = state.frames.length <= 1;
  }
  function refreshStripSel() {
    var kids = strip.children;
    for (var i = 0; i < kids.length; i++) kids[i].classList.toggle("sel", i === state.cur);
    if (kids[state.cur]) kids[state.cur].scrollIntoView({ inline: "nearest", block: "nearest" });
  }
  function refreshThumb(i) {
    var btn = strip.children[i]; if (!btn) return;
    var tc = btn.querySelector("canvas"); tc.getContext("2d").clearRect(0, 0, THUMB_W, THUMB_H);
    renderThumb(tc.getContext("2d"), state.frames[i]);
  }
  function refreshAllThumbs() { for (var i = 0; i < state.frames.length; i++) refreshThumb(i); }

  // ---- undo ----------------------------------------------------
  function snapshot() {
    return {
      frames: state.frames.map(function (f) { return { poses: f.poses.map(clonePose), props: f.props.map(cloneT) }; }),
      actors: state.actors.map(function (a) { return { color: a.color, fig: cloneFig(a.fig) }; }),
      props: state.props.slice(),
      bg: { img: state.bg.img, dataURL: state.bg.dataURL },
      cur: state.cur, sel: { type: state.sel.type, index: state.sel.index }
    };
  }
  function pushUndo() {
    undoStack.push(snapshot());
    if (undoStack.length > 40) undoStack.shift();
    $("undoBtn").disabled = false;
  }
  function undo() {
    if (!undoStack.length) return;
    if (state.playing) stop();
    var s = undoStack.pop();
    state.frames = s.frames; state.actors = s.actors; state.props = s.props;
    state.bg = s.bg; state.cur = Math.min(s.cur, state.frames.length - 1); state.sel = s.sel;
    $("undoBtn").disabled = undoStack.length === 0;
    rebuildStrip(); render(); syncSelUI(); save();
  }

  // ---- pointer / manipulation ---------------------------------
  var drag = null;
  function stageXY(e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (STAGE_W / r.width), y: (e.clientY - r.top) * (STAGE_H / r.height) };
  }
  function hitActorJoint(pt) {
    var best = null, bestD = GRAB * GRAB;
    for (var a = 0; a < state.actors.length; a++) {
      var fig = state.actors[a].fig, P = positions(state.frames[state.cur].poses[a], fig).pos;
      for (var i = 0; i < fig.length; i++) {
        if (fig[i].head) continue;
        var dx = P[i].x - pt.x, dy = P[i].y - pt.y, d = dx * dx + dy * dy;
        if (d < bestD) { bestD = d; best = { actor: a, node: i }; }
      }
    }
    return best;
  }
  function hitProp(pt) {
    for (var j = state.props.length - 1; j >= 0; j--) {
      if (propBodyHit(state.props[j], state.frames[state.cur].props[j], pt)) return j;
    }
    return -1;
  }

  canvas.addEventListener("pointerdown", function (e) {
    if (state.playing) return;
    var pt = stageXY(e), f = state.frames[state.cur];

    // 1) handles of the selected picture
    if (state.sel.type === "prop") {
      var def = state.props[state.sel.index], t = f.props[state.sel.index];
      var rh = propRotateHandle(def, t), sh = propScaleHandle(def, t);
      if (Math.hypot(pt.x - rh.x, pt.y - rh.y) <= 16) { drag = { kind: "rotate", j: state.sel.index }; begin(e); return; }
      if (Math.hypot(pt.x - sh.x, pt.y - sh.y) <= 16) { drag = { kind: "scale", j: state.sel.index }; begin(e); return; }
    }
    // 2) a person's joint
    var aj = hitActorJoint(pt);
    if (aj) {
      select("actor", aj.actor);
      var P = positions(f.poses[aj.actor], state.actors[aj.actor].fig).pos;
      drag = { kind: aj.node === 0 ? "actorMove" : "joint", actor: aj.actor, node: aj.node,
               offx: P[aj.node].x - pt.x, offy: P[aj.node].y - pt.y };
      begin(e); render(); return;
    }
    // 3) a picture body
    var pj = hitProp(pt);
    if (pj >= 0) {
      select("prop", pj);
      var tt = f.props[pj];
      drag = { kind: "move", j: pj, offx: tt.x - pt.x, offy: tt.y - pt.y };
      begin(e); render(); return;
    }
    // 4) empty space -> deselect
    select(null, -1); render();
  });
  function begin(e) { try { canvas.setPointerCapture(e.pointerId); } catch (_) {} e.preventDefault(); }

  canvas.addEventListener("pointermove", function (e) {
    if (!drag) return;
    if (!drag.moved) { pushUndo(); drag.moved = true; }
    var pt = stageXY(e), f = state.frames[state.cur];
    if (drag.kind === "actorMove") {
      var pose = f.poses[drag.actor]; pose.x = pt.x + drag.offx; pose.y = pt.y + drag.offy;
    } else if (drag.kind === "joint") {
      var fig = state.actors[drag.actor].fig, pose2 = f.poses[drag.actor];
      var info = positions(pose2, fig), par = fig[drag.node].parent;
      pose2.rel[drag.node] = Math.atan2(pt.y - info.pos[par].y, pt.x - info.pos[par].x) - info.world[par];
    } else if (drag.kind === "move") {
      var t = f.props[drag.j]; t.x = pt.x + drag.offx; t.y = pt.y + drag.offy;
    } else if (drag.kind === "scale") {
      var d2 = state.props[drag.j], t2 = f.props[drag.j];
      var half = 0.5 * Math.hypot(d2.w, d2.h);
      t2.scale = Math.max(0.05, Math.min(10, Math.hypot(pt.x - t2.x, pt.y - t2.y) / half));
    } else if (drag.kind === "rotate") {
      var t3 = f.props[drag.j];
      t3.rot = Math.atan2(pt.y - t3.y, pt.x - t3.x) + Math.PI / 2;
    }
    render(); e.preventDefault();
  });
  function endDrag(e) {
    if (!drag) return;
    var moved = drag.moved; drag = null;
    if (moved) { refreshThumb(state.cur); save(); }
    if (e && e.pointerId != null) { try { canvas.releasePointerCapture(e.pointerId); } catch (_) {} }
  }
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  // ---- selection UI -------------------------------------------
  function select(type, index) {
    state.sel = { type: type, index: index };
    syncSelUI();
  }
  function syncSelUI() {
    var s = state.sel, txt = "Nothing selected", canRemove = false;
    if (s.type === "actor" && state.actors[s.index]) { txt = "Selected: <b>Person " + (s.index + 1) + "</b>"; canRemove = true; }
    else if (s.type === "prop" && state.props[s.index]) { txt = "Selected: <b>" + (state.props[s.index].name || "Picture") + "</b>"; canRemove = true; }
    $("selInfo").innerHTML = txt;
    $("removeSelBtn").disabled = !canRemove;
    // reflect selected person's color on the swatches
    var col = (s.type === "actor" && state.actors[s.index]) ? state.actors[s.index].color : null;
    document.querySelectorAll("#swatches .swatch").forEach(function (x) {
      x.classList.toggle("sel", col != null && x.dataset.col === col);
    });
  }

  // ---- scene ops ----------------------------------------------
  function actorSpawnX() {
    // stagger new people so they don't stack
    var n = state.actors.length, span = 220;
    var x = STAGE_W / 2 + ((n % 2 === 0 ? 1 : -1) * Math.ceil(n / 2) * span);
    return Math.max(180, Math.min(STAGE_W - 180, x));
  }
  function addActor(fig) {
    if (state.playing) stop();
    pushUndo();
    var f2 = fig ? cloneFig(fig) : defaultFig();
    state.actors.push({ color: COLORS[state.actors.length % COLORS.length], fig: f2 });
    var pose = defaultPose(f2, actorSpawnX(), STAGE_H / 2 - 30);
    state.frames.forEach(function (f) { f.poses.push(clonePose(pose)); });
    select("actor", state.actors.length - 1);
    rebuildStrip(); render(); save();
  }
  function addPropDef(def) {
    if (state.playing) stop();
    pushUndo();
    state.props.push(def);
    var scale = 300 / Math.max(def.w, def.h);
    state.frames.forEach(function (f) { f.props.push({ x: STAGE_W / 2, y: STAGE_H / 2, scale: scale, rot: 0 }); });
    select("prop", state.props.length - 1);
    rebuildStrip(); render(); save();
  }
  function removeSelected() {
    var s = state.sel; if (s.type == null) return;
    if (state.playing) stop();
    pushUndo();
    if (s.type === "actor" && state.actors[s.index]) {
      state.actors.splice(s.index, 1);
      state.frames.forEach(function (f) { f.poses.splice(s.index, 1); });
    } else if (s.type === "prop" && state.props[s.index]) {
      state.props.splice(s.index, 1);
      state.frames.forEach(function (f) { f.props.splice(s.index, 1); });
    }
    select(null, -1);
    rebuildStrip(); render(); save();
  }

  // ---- images (import + downscale) ----------------------------
  function loadImageFile(file, maxSide) {
    return new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () {
          var w = im.naturalWidth, h = im.naturalHeight;
          var s = Math.min(1, maxSide / Math.max(w, h));
          w = Math.max(1, Math.round(w * s)); h = Math.max(1, Math.round(h * s));
          var cv = document.createElement("canvas"); cv.width = w; cv.height = h;
          cv.getContext("2d").drawImage(im, 0, 0, w, h);
          var durl = cv.toDataURL("image/png");
          var out = new Image();
          out.onload = function () { res({ dataURL: durl, w: w, h: h, img: out }); };
          out.src = durl;
        };
        im.onerror = rej; im.src = fr.result;
      };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }
  function onPropFile(file) {
    loadImageFile(file, 512).then(function (r) {
      addPropDef({ name: file.name.replace(/\.[^.]+$/, ""), img: r.img, dataURL: r.dataURL, w: r.w, h: r.h });
    });
  }
  function onBgFile(file) {
    loadImageFile(file, 1000).then(function (r) {
      if (state.playing) stop();
      pushUndo();
      state.bg.img = r.img; state.bg.dataURL = r.dataURL;
      render(); refreshAllThumbs(); save();
    });
  }

  // ---- frame ops ----------------------------------------------
  function addFrame() {
    if (state.playing) stop();
    pushUndo();
    var f = state.frames[state.cur];
    state.frames.splice(state.cur + 1, 0, { poses: f.poses.map(clonePose), props: f.props.map(cloneT) });
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
    if (!confirm("Start a brand new animation? This clears your scene.")) return;
    if (state.playing) stop();
    pushUndo();
    var fig = defaultFig();
    state.bg = { img: null, dataURL: null };
    state.actors = [{ color: COLORS[0], fig: fig }];
    state.props = [];
    state.frames = [{ poses: [defaultPose(fig)], props: [] }];
    state.cur = 0; select("actor", 0);
    rebuildStrip(); render(); save();
  }

  // ---- playback ------------------------------------------------
  var playT = 0, lastTS = 0, rafId = 0;
  // interpolated scene at continuous time t (t in frame units, wraps)
  function frameAt(t) {
    var n = state.frames.length;
    if (n === 1) return state.frames[0];
    var a = Math.floor(t) % n, b = (a + 1) % n, f = t - Math.floor(t);
    var A = state.frames[a], B = state.frames[b];
    return {
      poses: A.poses.map(function (p, i) { return blendPose(p, B.poses[i], f); }),
      props: A.props.map(function (tt, j) {
        var u = B.props[j];
        return { x: lerp(tt.x, u.x, f), y: lerp(tt.y, u.y, f), scale: lerp(tt.scale, u.scale, f), rot: lerpAngle(tt.rot, u.rot, f) };
      })
    };
  }
  function playFrame() { return frameAt(playT); }
  function tick(ts) {
    if (!state.playing) return;
    if (!lastTS) lastTS = ts;
    var dt = Math.min((ts - lastTS) / 1000, 0.1); lastTS = ts;
    var n = state.frames.length;
    playT += state.fps * dt;
    if (n > 1) {
      if (state.loop) playT = playT % n;
      else if (playT >= n - 1) { playT = n - 1; render(); stop(); return; }
    }
    render(); rafId = requestAnimationFrame(tick);
  }
  function play() {
    if (state.frames.length < 2) { flashHint("Add another frame first, then press Play!"); return; }
    state.playing = true; document.body.classList.add("playing-mode");
    var b = $("playBtn"); b.textContent = "■ Stop"; b.classList.add("playing");
    playT = state.cur; lastTS = 0; rafId = requestAnimationFrame(tick);
  }
  function stop() {
    state.playing = false; document.body.classList.remove("playing-mode");
    if (rafId) cancelAnimationFrame(rafId);
    var b = $("playBtn"); b.textContent = "▶ Play"; b.classList.remove("playing");
    render(); refreshStripSel();
  }
  function togglePlay() { state.playing ? stop() : play(); }

  var hintTimer = 0;
  function flashHint(msg) {
    var h = $("hint"), prev = h.innerHTML; h.textContent = msg;
    clearTimeout(hintTimer); hintTimer = setTimeout(function () { h.innerHTML = prev; }, 2600);
  }

  // ---- export animated GIF ------------------------------------
  function exportGif() {
    if (state.playing) stop();
    var K = state.frames.length;
    if (K < 2) { flashHint("Add at least 2 frames first, then Save GIF."); return; }
    if (!window.UTGGif) { flashHint("GIF tool didn't load — try refreshing."); return; }
    var btn = $("gifBtn"), label = btn.innerHTML;
    btn.disabled = true; btn.textContent = "Making GIF…";
    // downscale for a reasonable file size / speed
    var EXPORT_W = 640, EXPORT_H = Math.round(EXPORT_W * STAGE_H / STAGE_W);
    var SUB = Math.max(1, Math.min(4, Math.round(24 / state.fps)));
    if (K * SUB > 120) SUB = Math.max(1, Math.floor(120 / K));
    var total = K * SUB, delayCs = Math.max(2, Math.round(100 / (state.fps * SUB)));
    setTimeout(function () {
      try {
        var oc = document.createElement("canvas"); oc.width = EXPORT_W; oc.height = EXPORT_H;
        var octx = oc.getContext("2d"), frames = [];
        for (var i = 0; i < total; i++) {
          octx.setTransform(1, 0, 0, 1, 0, 0);
          octx.clearRect(0, 0, EXPORT_W, EXPORT_H);
          octx.scale(EXPORT_W / STAGE_W, EXPORT_W / STAGE_W);
          drawBackground(octx);
          drawScene(octx, frameAt(i / SUB), false, false);
          frames.push(octx.getImageData(0, 0, EXPORT_W, EXPORT_H));
        }
        var bytes = window.UTGGif.encode(frames, EXPORT_W, EXPORT_H, delayCs);
        var blob = new Blob([bytes], { type: "image/gif" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a"); a.href = url; a.download = "animation.gif";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
        flashHint("Saved animation.gif to your Downloads! 🎉");
      } catch (err) {
        flashHint("Sorry, the GIF couldn't be made.");
        if (window.console) console.error(err);
      }
      btn.disabled = false; btn.innerHTML = label;
    }, 40);
  }

  // ---- save / load --------------------------------------------
  var SKEY = "utg_animator";
  function save() {
    try {
      localStorage.setItem(SKEY, JSON.stringify({
        v: 3,
        bg: { dataURL: state.bg.dataURL },
        actors: state.actors.map(function (a) { return { color: a.color, fig: a.fig }; }),
        props: state.props.map(function (p) { return { name: p.name, dataURL: p.dataURL, w: p.w, h: p.h }; }),
        frames: state.frames, fps: state.fps, loop: state.loop, onion: state.onion
      }));
    } catch (_) { /* images may exceed quota; scene still works this session */ }
  }
  function imgFromDataURL(durl, onready) {
    if (!durl) return null;
    var im = new Image(); im.onload = onready; im.src = durl; return im;
  }
  function load() {
    try {
      var raw = localStorage.getItem(SKEY); if (!raw) return false;
      var d = JSON.parse(raw);
      if (d.v !== 3) return false; // ignore saves from an older stage size / schema
      if (!d.frames || !d.frames.length || !d.actors) return false;
      for (var ai = 0; ai < d.actors.length; ai++) if (!d.actors[ai].fig || !d.actors[ai].fig.length) return false;
      for (var i = 0; i < d.frames.length; i++) {
        var f = d.frames[i];
        if (!f.poses || f.poses.length !== d.actors.length) return false;
        for (var k = 0; k < f.poses.length; k++) if (!f.poses[k].rel || f.poses[k].rel.length !== d.actors[k].fig.length) return false;
        if (!f.props) f.props = [];
      }
      state.actors = d.actors.map(function (a) { return { color: a.color, fig: cloneFig(a.fig) }; });
      state.props = (d.props || []).map(function (p) {
        var def = { name: p.name, dataURL: p.dataURL, w: p.w, h: p.h, img: null };
        def.img = imgFromDataURL(p.dataURL, function () { render(); refreshAllThumbs(); });
        return def;
      });
      state.bg = { dataURL: (d.bg && d.bg.dataURL) || null, img: null };
      if (state.bg.dataURL) state.bg.img = imgFromDataURL(state.bg.dataURL, function () { render(); refreshAllThumbs(); });
      state.frames = d.frames; state.fps = d.fps || 8;
      state.loop = d.loop !== false; state.onion = !!d.onion;
      return true;
    } catch (_) { return false; }
  }

  // ---- controls ------------------------------------------------
  function buildSwatches() {
    var wrap = $("swatches");
    COLORS.forEach(function (col) {
      var s = document.createElement("button");
      s.className = "swatch"; s.style.background = col; s.dataset.col = col; s.title = "Color the selected person";
      s.addEventListener("click", function () {
        var sel = state.sel;
        var idx = (sel.type === "actor") ? sel.index : (state.actors.length ? 0 : -1);
        if (idx < 0) { flashHint("Add or pick a person first, then choose a color."); return; }
        pushUndo();
        state.actors[idx].color = col;
        if (sel.type !== "actor") select("actor", idx); else syncSelUI();
        render(); refreshAllThumbs(); save();
      });
      wrap.appendChild(s);
    });
  }
  function setFps(v) { state.fps = Math.max(1, Math.min(24, v)); $("fpsVal").textContent = state.fps; save(); }

  function wire() {
    $("undoBtn").addEventListener("click", undo); $("undoBtn").disabled = true;
    $("addFrame").addEventListener("click", addFrame);
    $("delFrame").addEventListener("click", delFrame);
    $("newBtn").addEventListener("click", newAnim);
    $("playBtn").addEventListener("click", togglePlay);
    $("fpsUp").addEventListener("click", function () { setFps(state.fps + 1); });
    $("fpsDown").addEventListener("click", function () { setFps(state.fps - 1); });
    $("loopBtn").addEventListener("click", function () { state.loop = !state.loop; $("loopBtn").classList.toggle("on", state.loop); save(); });
    $("onionBtn").addEventListener("click", function () { state.onion = !state.onion; $("onionBtn").classList.toggle("on", state.onion); render(); save(); });

    $("addActorBtn").addEventListener("click", function () { addActor(); });
    $("makeFigBtn").addEventListener("click", function () { FigMaker.open(); });
    $("addPropBtn").addEventListener("click", function () { $("propFile").click(); });
    $("propFile").addEventListener("change", function (e) { if (e.target.files[0]) onPropFile(e.target.files[0]); e.target.value = ""; });
    $("bgPhotoBtn").addEventListener("click", function () { $("bgFile").click(); });
    $("bgFile").addEventListener("change", function (e) { if (e.target.files[0]) onBgFile(e.target.files[0]); e.target.value = ""; });
    $("bgClearBtn").addEventListener("click", function () {
      if (state.playing) stop();
      pushUndo(); state.bg.img = null; state.bg.dataURL = null; render(); refreshAllThumbs(); save();
    });
    $("removeSelBtn").addEventListener("click", removeSelected);
    $("gifBtn").addEventListener("click", exportGif);

    document.addEventListener("keydown", function (e) {
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); undo(); }
      else if ((e.key === "Delete" || e.key === "Backspace") && state.sel.type && !state.playing) { e.preventDefault(); removeSelected(); }
      else if (e.key === "ArrowRight" && !state.playing) { if (state.cur < state.frames.length - 1) { state.cur++; render(); refreshStripSel(); } }
      else if (e.key === "ArrowLeft" && !state.playing) { if (state.cur > 0) { state.cur--; render(); refreshStripSel(); } }
    });
    window.addEventListener("beforeunload", save);
  }

  // ---- init ----------------------------------------------------
  function init() {
    if (!load()) {
      var fig = defaultFig();
      state.bg = { img: null, dataURL: null };
      state.actors = [{ color: COLORS[0], fig: fig }];
      state.props = [];
      state.frames = [{ poses: [defaultPose(fig)], props: [] }];
      state.cur = 0;
    }
    buildSwatches();
    setFps(state.fps);
    $("loopBtn").classList.toggle("on", state.loop);
    $("onionBtn").classList.toggle("on", state.onion);
    select("actor", 0);
    wire();
    rebuildStrip();
    render();
  }
  init();

  // expose the few things the Figure Maker needs
  window.UTGAnim = {
    addActorFromFig: function (fig) { addActor(fig); },
    defaultFig: defaultFig, positions: positions, DEG: DEG
  };
})();
