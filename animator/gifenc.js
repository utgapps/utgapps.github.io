/* ============================================================
   UTGGif — a tiny self-contained animated GIF89a encoder.
   No dependencies. window.UTGGif.encode(frames, w, h, delayCs)
   where frames = array of ImageData (RGBA), returns Uint8Array.

   Pipeline: median-cut quantize (≤256 colors, global table) →
   nearest-color map each frame → GIF LZW (Kevin Weiner's classic,
   public-domain algorithm) → assemble GIF89a with a NETSCAPE loop.
   ============================================================ */
(function () {
  "use strict";

  // ---- median-cut color quantization --------------------------
  function quantize(frames, maxColors) {
    var samples = [];
    for (var f = 0; f < frames.length; f++) {
      var d = frames[f].data, px = d.length / 4;
      var step = 4 * Math.max(1, Math.floor(px / 8000)); // ~8k samples/frame
      for (var i = 0; i < d.length; i += step) samples.push([d[i], d[i + 1], d[i + 2]]);
    }
    function mkBox(px) {
      var r0 = 255, r1 = 0, g0 = 255, g1 = 0, b0 = 255, b1 = 0;
      for (var i = 0; i < px.length; i++) {
        var p = px[i];
        if (p[0] < r0) r0 = p[0]; if (p[0] > r1) r1 = p[0];
        if (p[1] < g0) g0 = p[1]; if (p[1] > g1) g1 = p[1];
        if (p[2] < b0) b0 = p[2]; if (p[2] > b1) b1 = p[2];
      }
      return { px: px, r: r1 - r0, g: g1 - g0, b: b1 - b0 };
    }
    var boxes = [mkBox(samples)];
    while (boxes.length < maxColors) {
      var bi = -1, best = -1;
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].px.length < 2) continue;
        var m = Math.max(boxes[i].r, boxes[i].g, boxes[i].b);
        if (m > best) { best = m; bi = i; }
      }
      if (bi < 0) break;
      var box = boxes[bi];
      var ch = box.r >= box.g && box.r >= box.b ? 0 : (box.g >= box.b ? 1 : 2);
      box.px.sort(function (x, y) { return x[ch] - y[ch]; });
      var mid = box.px.length >> 1;
      boxes.splice(bi, 1, mkBox(box.px.slice(0, mid)), mkBox(box.px.slice(mid)));
    }
    var pal = [];
    for (var k = 0; k < boxes.length; k++) {
      var px = boxes[k].px, r = 0, g = 0, b = 0;
      for (var j = 0; j < px.length; j++) { r += px[j][0]; g += px[j][1]; b += px[j][2]; }
      var n = px.length || 1;
      pal.push([Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
    }
    while (pal.length < 2) pal.push([0, 0, 0]);
    return pal;
  }

  function makeMapper(pal) {
    var cache = new Int16Array(1 << 18); for (var i = 0; i < cache.length; i++) cache[i] = -1;
    return function (r, g, b) {
      var key = ((r >> 2) << 12) | ((g >> 2) << 6) | (b >> 2);
      var v = cache[key]; if (v >= 0) return v;
      var bi = 0, bd = 1e9;
      for (var i = 0; i < pal.length; i++) {
        var p = pal[i], dr = r - p[0], dg = g - p[1], db = b - p[2], d = dr * dr + dg * dg + db * db;
        if (d < bd) { bd = d; bi = i; }
      }
      cache[key] = bi; return bi;
    };
  }

  // ---- GIF LZW (Kevin Weiner, public domain) ------------------
  function lzwEncode(width, height, pixels, colorDepth, out) {
    var EOF = -1, initCodeSize = Math.max(2, colorDepth);
    var BITS = 12, HSIZE = 5003, maxbits = BITS, maxmaxcode = 1 << BITS;
    var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F,
      0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
    var htab = new Int32Array(HSIZE), codetab = new Int32Array(HSIZE);
    var n_bits, maxcode, free_ent = 0, clear_flg = false, g_init_bits, ClearCode, EOFCode;
    var cur_accum = 0, cur_bits = 0, a_count = 0, accum = new Uint8Array(256);
    var remaining = width * height, curPixel = 0;

    function MAXCODE(nb) { return (1 << nb) - 1; }
    function flush_char() { if (a_count > 0) { out.push(a_count); for (var i = 0; i < a_count; i++) out.push(accum[i]); a_count = 0; } }
    function char_out(c) { accum[a_count++] = c; if (a_count >= 254) flush_char(); }
    function cl_hash(h) { for (var i = 0; i < h; i++) htab[i] = -1; }
    function output(code) {
      cur_accum &= masks[cur_bits];
      if (cur_bits > 0) cur_accum |= (code << cur_bits); else cur_accum = code;
      cur_bits += n_bits;
      while (cur_bits >= 8) { char_out(cur_accum & 0xff); cur_accum >>= 8; cur_bits -= 8; }
      if (free_ent > maxcode || clear_flg) {
        if (clear_flg) { maxcode = MAXCODE(n_bits = g_init_bits); clear_flg = false; }
        else { n_bits++; maxcode = (n_bits === maxbits) ? maxmaxcode : MAXCODE(n_bits); }
      }
      if (code === EOFCode) {
        while (cur_bits > 0) { char_out(cur_accum & 0xff); cur_accum >>= 8; cur_bits -= 8; }
        flush_char();
      }
    }
    function cl_block() { cl_hash(HSIZE); free_ent = ClearCode + 2; clear_flg = true; output(ClearCode); }
    function nextPixel() { if (remaining === 0) return EOF; remaining--; return pixels[curPixel++] & 0xff; }

    out.push(initCodeSize); // LZW minimum code size byte
    g_init_bits = initCodeSize + 1;
    clear_flg = false; n_bits = g_init_bits; maxcode = MAXCODE(n_bits);
    ClearCode = 1 << (g_init_bits - 1); EOFCode = ClearCode + 1; free_ent = ClearCode + 2;
    a_count = 0;
    var ent = nextPixel(), c, i, disp, fcode, hshift = 0;
    for (fcode = HSIZE; fcode < 65536; fcode *= 2) hshift++;
    hshift = 8 - hshift;
    cl_hash(HSIZE);
    output(ClearCode);
    outer:
    while ((c = nextPixel()) !== EOF) {
      fcode = (c << maxbits) + ent;
      i = (c << hshift) ^ ent;
      if (htab[i] === fcode) { ent = codetab[i]; continue; }
      else if (htab[i] >= 0) {
        disp = HSIZE - i; if (i === 0) disp = 1;
        do {
          if ((i -= disp) < 0) i += HSIZE;
          if (htab[i] === fcode) { ent = codetab[i]; continue outer; }
        } while (htab[i] >= 0);
      }
      output(ent); ent = c;
      if (free_ent < maxmaxcode) { codetab[i] = free_ent++; htab[i] = fcode; }
      else cl_block();
    }
    output(ent); output(EOFCode);
    out.push(0); // image block terminator
  }

  // ---- byte helpers -------------------------------------------
  function u16(out, v) { out.push(v & 0xff, (v >> 8) & 0xff); }
  function str(out, s) { for (var i = 0; i < s.length; i++) out.push(s.charCodeAt(i)); }

  // ---- public: encode -----------------------------------------
  function encode(frames, width, height, delayCs) {
    var pal = quantize(frames, 256);
    var depth = Math.max(2, Math.ceil(Math.log(pal.length) / Math.LN2));
    var tableSize = 1 << depth;
    var map = makeMapper(pal);

    var out = [];
    str(out, "GIF89a");
    u16(out, width); u16(out, height);
    out.push(0xF0 | (depth - 1));  // global table, 8-bit color res, size=depth-1
    out.push(0);                    // background color index
    out.push(0);                    // pixel aspect ratio
    for (var i = 0; i < tableSize; i++) {
      var p = i < pal.length ? pal[i] : [0, 0, 0];
      out.push(p[0], p[1], p[2]);
    }
    // NETSCAPE 2.0 loop-forever extension
    out.push(0x21, 0xFF, 0x0B); str(out, "NETSCAPE2.0"); out.push(0x03, 0x01); u16(out, 0); out.push(0);

    var npx = width * height;
    for (var f = 0; f < frames.length; f++) {
      var d = frames[f].data, idx = new Uint8Array(npx);
      for (var p2 = 0, q = 0; p2 < d.length; p2 += 4, q++) idx[q] = map(d[p2], d[p2 + 1], d[p2 + 2]);
      // Graphic Control Extension (disposal=1 leave-in-place, delay)
      out.push(0x21, 0xF9, 0x04, 0x04); u16(out, delayCs); out.push(0, 0);
      // Image Descriptor (full frame, no local table)
      out.push(0x2C); u16(out, 0); u16(out, 0); u16(out, width); u16(out, height); out.push(0);
      lzwEncode(width, height, idx, depth, out);
    }
    out.push(0x3B); // trailer
    return Uint8Array.from(out);
  }

  window.UTGGif = { encode: encode };
})();
