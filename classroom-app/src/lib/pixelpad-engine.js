/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.
 *
 * Sections 2 to 5 of vendor/pixelpad-offline.html: the procedural sprite and
 * sound assets, the Python tokenizer, parser and evaluator, and the 2D
 * engine - everything needed to RUN a game, and none of the IDE around it.
 *
 * This is loaded as text and inlined into the preview frame as a classic
 * <script>, so its top-level `Engine`, `INTERP` and `ART` are visible to the
 * runner script that follows it. It expects the page to provide: canvasContainer, debugPanel, output.
 */
/* ============================================================
   2. ASSETS — sprites are drawn procedurally onto canvases and
      sounds are synthesised, so the file needs zero network.
      Uploaded PNG/MP3 files replace them at runtime.
   ============================================================ */
function sheet(fw, fh, frames, draw) {
  const c = document.createElement('canvas');
  c.width = fw * frames; c.height = fh;
  const x = c.getContext('2d');
  for (let f = 0; f < frames; f++) {
    x.save(); x.translate(f * fw, 0);
    x.beginPath(); x.rect(0, 0, fw, fh); x.clip();
    draw(x, f, fw, fh);
    x.restore();
  }
  return c;
}
const ART = {};

/* half-stage size, so the demo's scaleX/scaleY of 2 fills 1280x720 exactly */
ART['background.jpg'] = () => sheet(640, 360, 1, (c, f, w, h) => {
  const sky = c.createLinearGradient(0, 0, 0, h * .72);
  sky.addColorStop(0, '#2E6BB8'); sky.addColorStop(.55, '#7FB2E5'); sky.addColorStop(1, '#F2C879');
  c.fillStyle = sky; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(255,246,214,.95)';
  c.beginPath(); c.arc(w * .78, h * .2, h * .085, 0, 7); c.fill();
  c.fillStyle = 'rgba(255,255,255,.55)';
  for (const [fx, fy, s] of [[.16, .19, 1], [.38, .31, .7], [.70, .17, .85], [.86, .36, .6]]) {
    const cx = w * fx, cy = h * fy, r = h * .072 * s;
    c.beginPath();
    c.arc(cx, cy, r, 0, 7); c.arc(cx + r * 1.1, cy + r * .24, r * .77, 0, 7); c.arc(cx - r * 1.1, cy + r * .3, r * .7, 0, 7);
    c.fill();
  }
  c.fillStyle = '#3E7A46';
  c.beginPath(); c.moveTo(-20, h * .78);
  const step = w / 8;
  for (let i = 0; i <= 8; i++)
    c.quadraticCurveTo(i * step + step / 2, h * (.62 + (i % 2) * .09), (i + 1) * step, h * .78);
  c.lineTo(w + 20, h); c.lineTo(-20, h); c.fill();
  const gr = c.createLinearGradient(0, h * .74, 0, h);
  gr.addColorStop(0, '#6BA84F'); gr.addColorStop(1, '#3F6B32');
  c.fillStyle = gr; c.fillRect(0, h * .8, w, h * .2);
  c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    const gx = (i * 137) % w, gy = h * .82 + (i * 53) % (h * .16);
    c.beginPath(); c.moveTo(gx, gy); c.lineTo(gx + 3, gy - 9); c.stroke();
  }
});

ART['black.png'] = () => sheet(32, 32, 1, (c) => { c.fillStyle = '#000'; c.fillRect(0, 0, 32, 32); });

function bugArt(body, wing) {
  return () => sheet(44, 40, 1, (c, f, w, h) => {
    c.strokeStyle = '#2B2B2B'; c.lineWidth = 2.5; c.lineCap = 'round';
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) {
      c.beginPath(); c.moveTo(22 + s * 7, 16 + i * 6);
      c.lineTo(22 + s * 18, 12 + i * 8); c.stroke();
    }
    c.fillStyle = wing;
    c.beginPath(); c.ellipse(22, 22, 15, 13, 0, 0, 7); c.fill();
    c.fillStyle = 'rgba(0,0,0,.28)';
    c.beginPath(); c.ellipse(22, 24, 2, 12, 0, 0, 7); c.fill();
    c.fillStyle = body;
    c.beginPath(); c.ellipse(22, 10, 9, 8, 0, 0, 7); c.fill();
    c.fillStyle = '#fff';
    c.beginPath(); c.arc(18, 9, 3.2, 0, 7); c.arc(26, 9, 3.2, 0, 7); c.fill();
    c.fillStyle = '#111';
    c.beginPath(); c.arc(18.6, 9.4, 1.6, 0, 7); c.arc(26.6, 9.4, 1.6, 0, 7); c.fill();
  });
}
ART['bluebug.png'] = bugArt('#2B4C8C', '#3E77D6');
ART['yellowbug.png'] = bugArt('#8A6B14', '#E8C337');
ART['redbug.png'] = bugArt('#8C2323', '#D64545');

/* 5-frame trotting boar */
ART['pumba.png'] = () => sheet(120, 96, 5, (c, f, w, h) => {
  const bob = [0, -2, -3, -2, 0][f], sw = [0, 1, 0, -1, 0][f];
  c.translate(0, bob);
  c.fillStyle = '#5A3A22'; c.lineWidth = 0;
  for (const [lx, dir] of [[38, 1], [50, -1], [78, -1], [90, 1]]) {
    c.save(); c.translate(lx, 62); c.rotate(dir * sw * .35);
    c.fillRect(-5, 0, 10, 26); c.restore();
  }
  c.fillStyle = '#7A4B28';
  c.beginPath(); c.ellipse(64, 48, 34, 24, 0, 0, 7); c.fill();
  c.fillStyle = '#8C5730';
  c.beginPath(); c.ellipse(30, 44, 20, 18, 0, 0, 7); c.fill();
  c.fillStyle = '#5A3A22';
  c.beginPath(); c.moveTo(34, 28); c.lineTo(24, 12); c.lineTo(44, 24); c.fill();
  c.fillStyle = '#6B4423';
  for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(52 - i * 3, 26 + i); c.lineTo(58 - i * 3, 12 + i * 2); c.lineTo(64 - i * 3, 26 + i); c.fill(); }
  c.fillStyle = '#D98CA0';
  c.beginPath(); c.ellipse(12, 48, 9, 7, 0, 0, 7); c.fill();
  c.fillStyle = '#8A5566';
  c.beginPath(); c.arc(9, 47, 1.7, 0, 7); c.arc(15, 47, 1.7, 0, 7); c.fill();
  c.fillStyle = '#F2EEE4';
  c.beginPath(); c.moveTo(16, 54); c.lineTo(8, 62); c.lineTo(15, 58); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(28, 38, 4, 0, 7); c.fill();
  c.fillStyle = '#111'; c.beginPath(); c.arc(26.8, 38.4, 2, 0, 7); c.fill();
  c.strokeStyle = '#5A3A22'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(97, 40); c.quadraticCurveTo(108 + sw * 4, 34, 104, 24); c.stroke();
});

/* 8-frame running meerkat */
ART['timon.png'] = () => sheet(96, 120, 8, (c, f, w, h) => {
  const ph = f / 8 * Math.PI * 2, bob = Math.sin(ph * 2) * 3, sw = Math.sin(ph);
  c.translate(0, bob);
  c.strokeStyle = '#8A6B3A'; c.lineWidth = 7; c.lineCap = 'round';
  for (const d of [1, -1]) {
    c.beginPath(); c.moveTo(48, 84); c.lineTo(48 + d * sw * 16, 108); c.stroke();
  }
  c.strokeStyle = '#C99B4E'; c.lineWidth = 6;
  for (const d of [1, -1]) {
    c.beginPath(); c.moveTo(48, 52); c.lineTo(48 - d * sw * 15, 70); c.stroke();
  }
  c.strokeStyle = '#B4873F'; c.lineWidth = 8;
  c.beginPath(); c.moveTo(44, 82); c.quadraticCurveTo(20, 76, 16 - sw * 6, 52); c.stroke();
  c.fillStyle = '#C99B4E';
  c.beginPath(); c.ellipse(48, 62, 19, 26, 0, 0, 7); c.fill();
  c.fillStyle = '#E8D4A8';
  c.beginPath(); c.ellipse(50, 66, 11, 18, 0, 0, 7); c.fill();
  c.fillStyle = '#C99B4E';
  c.beginPath(); c.ellipse(48, 28, 16, 15, 0, 0, 7); c.fill();
  c.beginPath(); c.arc(36, 18, 6, 0, 7); c.arc(60, 18, 6, 0, 7); c.fill();
  c.fillStyle = '#8A6B3A';
  c.beginPath(); c.arc(36, 18, 3, 0, 7); c.arc(60, 18, 3, 0, 7); c.fill();
  c.fillStyle = '#F0E2C0';
  c.beginPath(); c.ellipse(48, 36, 9, 7, 0, 0, 7); c.fill();
  c.fillStyle = '#fff';
  c.beginPath(); c.arc(41, 27, 5, 0, 7); c.arc(55, 27, 5, 0, 7); c.fill();
  c.fillStyle = '#111';
  c.beginPath(); c.arc(42, 28, 2.4, 0, 7); c.arc(56, 28, 2.4, 0, 7); c.fill();
  c.fillStyle = '#5B4526';
  c.beginPath(); c.ellipse(48, 34, 3.4, 2.6, 0, 0, 7); c.fill();
});

/* 7-frame A/D key prompt */
ART['wasd.png'] = () => sheet(220, 120, 7, (c, f, w, h) => {
  const hot = f % 6 < 3 ? 0 : 1;
  const key = (x, y, label, on) => {
    c.fillStyle = on ? '#17A2B8' : 'rgba(255,255,255,.88)';
    c.strokeStyle = 'rgba(0,0,0,.55)'; c.lineWidth = 3;
    c.beginPath(); c.roundRect(x, y, 62, 62, 10); c.fill(); c.stroke();
    c.fillStyle = on ? '#fff' : '#222';
    c.font = 'bold 34px Consolas,monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(label, x + 31, y + 33);
  };
  key(18, 30, 'A', hot === 0);
  key(140, 30, 'D', hot === 1);
  c.fillStyle = 'rgba(255,255,255,.9)';
  c.font = 'bold 16px Rubik,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText('MOVE', 110, 106);
});

/* --- WebAudio one-shots stand in for uploaded sound files --- */
let AC = null;
function audioCtx() {
  if (!AC) { const K = window.AudioContext || window.webkitAudioContext; if (K) AC = new K(); }
  if (AC && AC.state === 'suspended') AC.resume();
  return AC;
}
const SYNTH = {
  crunch(c) {
    const n = c.sampleRate * .18, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.5);
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = .8;
    const g = c.createGain(); g.gain.value = .35;
    s.connect(f); f.connect(g); g.connect(c.destination); s.start();
  },
  blip(c) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(660, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(220, c.currentTime + .12);
    g.gain.setValueAtTime(.18, c.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .14);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + .15);
  },
};

/* ============================================================
   3. PYTHON SUBSET — tokenizer + parser.
      Enough of the language for the classroom: expressions,
      control flow, functions, classes, comprehensions, f-strings.
   ============================================================ */
/* Error text mirrors Skulpt (the Python runtime the original IDE uses),
   because PixelPAD prints the bare exception message with no type prefix.
   Its parser reports almost every malformed line as "bad input". */
class PyError extends Error {
  constructor(type, msg, line) { super(msg); this.type = type; this.line = line || 0; }
  get display() { return this.type + ': ' + this.message; }
}
/* Skulpt's catch-all parse failure */
function badInput(line) { return new PyError('SyntaxError', 'bad input', line); }
const KEYWORDS = new Set(['and','as','assert','break','class','continue','def','del','elif','else','except',
  'False','finally','for','from','global','if','import','in','is','lambda','None','nonlocal','not','or','pass',
  'raise','return','True','try','while','with','yield','self']);

const OPS3 = ['**=','//=','...'];
const OPS2 = ['**','//','==','!=','<=','>=','+=','-=','*=','/=','%=','->','<<','>>'];

function tokenize(src) {
  src = String(src).replace(/\r\n?/g, '\n');
  let srcNewlines = 0;
  for (const ch of src) if (ch === '\n') srcNewlines++;
  if (!src.endsWith('\n')) src += '\n';
  const toks = [], indents = [0];
  let i = 0, line = 1, depth = 0, lineStart = true;
  const push = (t, v) => toks.push({ t, v, line });

  while (i < src.length) {
    if (lineStart && depth === 0) {
      let j = i, ind = 0;
      while (j < src.length && (src[j] === ' ' || src[j] === '\t')) { ind += src[j] === '\t' ? 4 : 1; j++; }
      if (j >= src.length) break;
      if (src[j] === '\n') { i = j + 1; line++; continue; }
      if (src[j] === '#') { while (j < src.length && src[j] !== '\n') j++; i = j; continue; }
      if (ind > indents[indents.length - 1]) { indents.push(ind); push('INDENT'); }
      else while (ind < indents[indents.length - 1]) {
        indents.pop(); push('DEDENT');
        if (ind > indents[indents.length - 1])
          throw new PyError('SyntaxError', 'unindent does not match any outer indentation level', line);
      }
      i = j; lineStart = false; continue;
    }
    const c = src[i];
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
    if (c === '\\' && src[i + 1] === '\n') { i += 2; line++; continue; }
    if (c === '#') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '\n') { if (depth === 0) { push('NEWLINE'); lineStart = true; } line++; i++; continue; }

    /* string (with optional f / r / b prefix) */
    const pm = /^([fFrRbB]{0,2})(['"])/.exec(src.slice(i, i + 3));
    if (pm && (pm[1].length === 0 ? /['"]/.test(c) : true)) {
      const pre = pm[1].toLowerCase(), q = pm[2];
      let k = i + pre.length;
      const triple = src.startsWith(q.repeat(3), k);
      const term = triple ? q.repeat(3) : q;
      k += term.length;
      let out = '';
      while (k < src.length && !src.startsWith(term, k)) {
        if (src[k] === '\\' && !pre.includes('r')) {
          const e = src[k + 1];
          const map = { n: '\n', t: '\t', r: '\r', '\\': '\\', "'": "'", '"': '"', '0': '\0' };
          if (e === '\n') { line++; k += 2; continue; }
          out += (e in map) ? map[e] : '\\' + e; k += 2; continue;
        }
        if (src[k] === '\n') { if (!triple) throw badInput(line); line++; }
        out += src[k++];
      }
      if (k >= src.length) throw badInput(line);
      i = k + term.length;
      if (pre.includes('f')) push('FSTR', out); else push('STR', out);
      continue;
    }
    /* number */
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      const m = /^(?:0[xX][0-9a-fA-F_]+|(?:[0-9_]*\.[0-9_]+|[0-9_]+\.?)(?:[eE][+-]?[0-9]+)?)/.exec(src.slice(i));
      const raw = m[0]; i += raw.length;
      push('NUM', raw.startsWith('0x') || raw.startsWith('0X') ? parseInt(raw.replace(/_/g, ''), 16) : parseFloat(raw.replace(/_/g, '')));
      continue;
    }
    /* name */
    if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i));
      i += m[0].length; push('NAME', m[0]); continue;
    }
    /* operator */
    const three = src.substr(i, 3), two = src.substr(i, 2);
    if (OPS3.includes(three)) { push('OP', three); i += 3; continue; }
    if (OPS2.includes(two)) { push('OP', two); i += 2; continue; }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth = Math.max(0, depth - 1);
    if (!'+-*/%<>=!&|^~.,:;()[]{}@'.includes(c))
      throw new PyError('SyntaxError', 'bad token T_OP', line);
    push('OP', c); i++;
  }
  /* a bracket left open when the source runs out: Skulpt reports this at
     the line two past the final newline, not at the opening bracket */
  /* A bracket left open swallows the newlines after it. Skulpt only calls
     that "EOF in multi-line statement" when the parse runs clean off the
     end; if a later token breaks the parse first it is plain "bad input".
     Record the position, emit no closing NEWLINE so the parser actually
     reaches EOF, and let it decide which of the two applies. */
  if (depth === 0 && !lineStart) push('NEWLINE');
  while (indents.length > 1) { indents.pop(); push('DEDENT'); }
  push('EOF');
  if (depth > 0) toks.unclosed = srcNewlines + 2;
  return toks;
}

const AUGOPS = { '+=':'+', '-=':'-', '*=':'*', '/=':'/', '//=':'//', '%=':'%', '**=':'**' };
const COMPOPS = ['<', '>', '<=', '>=', '==', '!='];

function parse(src) {
  const toks = tokenize(src);
  let p = 0;
  const cur = () => toks[p];
  const at = (t, v) => toks[p].t === t && (v === undefined || toks[p].v === v);
  const atKw = (v) => toks[p].t === 'NAME' && toks[p].v === v;
  const eat = (t, v) => at(t, v) ? toks[p++] : null;
  const eatKw = (v) => atKw(v) ? toks[p++] : null;
  /* Skulpt blames the line the parser choked on; a NEWLINE/EOF token
     carries the line after the offending one, so step back to it. */
  function blame() {
    const tok = toks[p];
    if ((tok.t === 'NEWLINE' || tok.t === 'EOF' || tok.t === 'DEDENT') && p > 0) {
      for (let q = p - 1; q >= 0; q--) {
        if (toks[q].t !== 'NEWLINE' && toks[q].t !== 'INDENT' && toks[q].t !== 'DEDENT' && toks[q].t !== 'EOF')
          return toks[q].line;
      }
    }
    return tok.line;
  }
  /* running out of tokens inside an unclosed bracket is the EOF case */
  function fail() {
    if (toks.unclosed && toks[p].t === 'EOF')
      return new PyError('SyntaxError', 'EOF in multi-line statement', toks.unclosed);
    return badInput(blame());
  }
  function want(t, v) {
    const k = eat(t, v);
    if (!k) throw fail();
    return k;
  }
  const ln = () => toks[p].line;

  /* ---------- statements ---------- */
  function parseSuite() {
    want('OP', ':');
    if (eat('NEWLINE')) {
      want('INDENT');
      const body = [];
      while (!at('DEDENT') && !at('EOF')) body.push(...parseStatement());
      eat('DEDENT');
      return body;
    }
    return parseSimpleLine();
  }
  function parseSimpleLine() {
    const out = [parseSimple()];
    while (eat('OP', ';')) { if (at('NEWLINE')) break; out.push(parseSimple()); }
    eat('NEWLINE');
    return out;
  }
  function parseStatement() {
    while (eat('NEWLINE')) {}
    if (at('EOF') || at('DEDENT')) return [];
    const line = ln();
    if (atKw('if')) { p++; return [parseIf(line)]; }
    if (atKw('while')) {
      p++; const test = parseExpr(), body = parseSuite();
      let orelse = null;
      if (atKw('else')) { p++; orelse = parseSuite(); }
      return [{ k: 'While', test, body, orelse, line }];
    }
    if (atKw('for')) {
      p++; const target = parseTarget();
      if (!eatKw('in')) throw fail();
      const iter = parseExpr(), body = parseSuite();
      let orelse = null;
      if (atKw('else')) { p++; orelse = parseSuite(); }
      return [{ k: 'For', target, iter, body, orelse, line }];
    }
    if (atKw('def')) { p++; return [parseDef(line)]; }
    if (atKw('class')) {
      p++; const name = want('NAME').v;
      let bases = [];
      if (eat('OP', '(')) { while (!at('OP', ')')) { bases.push(parseExpr()); if (!eat('OP', ',')) break; } want('OP', ')'); }
      return [{ k: 'ClassDef', name, bases, body: parseSuite(), line }];
    }
    if (atKw('try')) {
      p++; const body = parseSuite(), handlers = [];
      while (atKw('except')) {
        p++; let type = null, name = null;
        if (!at('OP', ':')) { type = parseExpr(); if (eatKw('as')) name = want('NAME').v; }
        handlers.push({ type, name, body: parseSuite() });
      }
      let orelse = null, fin = null;
      if (atKw('else')) { p++; orelse = parseSuite(); }
      if (atKw('finally')) { p++; fin = parseSuite(); }
      return [{ k: 'Try', body, handlers, orelse, fin, line }];
    }
    if (atKw('with')) {
      p++; const ctx = parseExpr();
      let name = null; if (eatKw('as')) name = want('NAME').v;
      return [{ k: 'With', ctx, name, body: parseSuite(), line }];
    }
    return parseSimpleLine();
  }
  function parseIf(line) {
    const test = parseExpr(), body = parseSuite();
    let orelse = null;
    if (atKw('elif')) { const l2 = ln(); p++; orelse = [parseIf(l2)]; }
    else if (atKw('else')) { p++; orelse = parseSuite(); }
    return { k: 'If', test, body, orelse, line };
  }
  function parseDef(line) {
    const name = want('NAME').v;
    want('OP', '(');
    const params = [];
    while (!at('OP', ')')) {
      if (eat('OP', '*')) { if (at('NAME')) params.push({ name: want('NAME').v, star: true }); }
      else {
        const pn = want('NAME').v;
        let def = null;
        if (eat('OP', '=')) def = parseExpr();
        params.push({ name: pn, def });
      }
      if (!eat('OP', ',')) break;
    }
    want('OP', ')');
    if (eat('OP', '->')) parseExpr();
    return { k: 'FuncDef', name, params, body: parseSuite(), line };
  }
  function parseSimple() {
    const line = ln();
    if (eatKw('pass')) return { k: 'Pass', line };
    if (eatKw('break')) return { k: 'Break', line };
    if (eatKw('continue')) return { k: 'Continue', line };
    if (eatKw('return')) return { k: 'Return', value: (at('NEWLINE') || at('OP', ';') || at('EOF')) ? null : parseExprList(), line };
    if (eatKw('raise')) return { k: 'Raise', value: (at('NEWLINE') || at('EOF')) ? null : parseExpr(), line };
    if (eatKw('global') || eatKw('nonlocal')) {
      const names = [want('NAME').v];
      while (eat('OP', ',')) names.push(want('NAME').v);
      return { k: 'Global', names, line };
    }
    if (eatKw('del')) {
      const targets = [parseExpr()];
      while (eat('OP', ',')) targets.push(parseExpr());
      return { k: 'Del', targets, line };
    }
    if (atKw('import')) {
      p++; const mods = [];
      do {
        let mod = want('NAME').v;
        while (eat('OP', '.')) mod += '.' + want('NAME').v;
        let alias = eatKw('as') ? want('NAME').v : mod.split('.')[0];
        mods.push({ mod, alias });
      } while (eat('OP', ','));
      return { k: 'Import', mods, line };
    }
    if (atKw('from')) {
      p++; let mod = want('NAME').v;
      while (eat('OP', '.')) mod += '.' + want('NAME').v;
      if (!eatKw('import')) throw fail();
      const names = [];
      if (eat('OP', '*')) names.push({ name: '*', alias: '*' });
      else do {
        const n = want('NAME').v;
        names.push({ name: n, alias: eatKw('as') ? want('NAME').v : n });
      } while (eat('OP', ','));
      return { k: 'FromImport', mod, names, line };
    }
    if (eatKw('assert')) {
      const test = parseExpr();
      let msg = null; if (eat('OP', ',')) msg = parseExpr();
      return { k: 'Assert', test, msg, line };
    }

    const first = parseExprList();
    if (at('OP') && AUGOPS[cur().v]) {
      const op = AUGOPS[toks[p++].v];
      checkTarget(first);
      return { k: 'AugAssign', target: first, op, value: parseExprList(), line };
    }
    if (at('OP', ':')) {                       /* annotated assignment */
      p++; parseExpr();
      if (eat('OP', '=')) return { k: 'Assign', targets: [first], value: parseExprList(), line };
      return { k: 'Expr', value: first, line };
    }
    if (at('OP', '=')) {
      const targets = [first];
      let value = null;
      while (eat('OP', '=')) { value = parseExprList(); targets.push(value); }
      targets.pop();
      targets.forEach(checkTarget);
      return { k: 'Assign', targets, value, line };
    }
    return { k: 'Expr', value: first, line };
  }
  /* Python rejects bad assignment targets while parsing, so mirror
     Skulpt's wording here rather than failing later at run time */
  const TARGET_ERR = {
    Num: 'literal', Str: 'literal', FStr: 'literal', Const: 'literal',
    Call: 'function call', Bin: 'operator', Unary: 'operator', Bool: 'operator',
    Compare: 'comparison', IfExp: 'conditional expression', Lambda: 'lambda',
    Comp: 'comprehension', Dict: 'literal', Set: 'literal',
  };
  function checkTarget(n) {
    if (!n) return;
    if (n.k === 'Name' || n.k === 'Attr' || n.k === 'Index' || n.k === 'Slice') return;
    if (n.k === 'Tuple' || n.k === 'List') { n.items.forEach(checkTarget); return; }
    throw new PyError('SyntaxError', "can't assign to " + (TARGET_ERR[n.k] || 'expression'), n.line);
  }
  function parseTarget() {
    const first = parsePostfix();
    if (at('OP', ',')) {
      const items = [first];
      while (eat('OP', ',')) { if (at('NAME') || at('OP', '(') || at('OP', '[')) items.push(parsePostfix()); else break; }
      return { k: 'Tuple', items, line: first.line };
    }
    return first;
  }
  function parseExprList() {
    const first = parseExpr();
    if (!at('OP', ',')) return first;
    const items = [first];
    while (eat('OP', ',')) {
      if (at('NEWLINE') || at('EOF') || at('OP', '=') || at('OP', ')') || at('OP', ']') || at('OP', '}')) break;
      items.push(parseExpr());
    }
    return { k: 'Tuple', items, line: first.line };
  }

  /* ---------- expressions ---------- */
  function parseExpr() { return parseTernary(); }
  function parseTernary() {
    const body = parseOr();
    if (atKw('if')) {
      const line = ln(); p++;
      const test = parseOr();
      if (!eatKw('else')) throw fail();
      return { k: 'IfExp', test, body, orelse: parseTernary(), line };
    }
    return body;
  }
  function parseOr() {
    let l = parseAnd();
    while (atKw('or')) { const line = ln(); p++; l = { k: 'Bool', op: 'or', l, r: parseAnd(), line }; }
    return l;
  }
  function parseAnd() {
    let l = parseNot();
    while (atKw('and')) { const line = ln(); p++; l = { k: 'Bool', op: 'and', l, r: parseNot(), line }; }
    return l;
  }
  function parseNot() {
    if (atKw('not')) { const line = ln(); p++; return { k: 'Unary', op: 'not', v: parseNot(), line }; }
    return parseComparison();
  }
  function parseComparison() {
    const first = parseArith();
    const ops = [], rights = [];
    for (;;) {
      let op = null;
      if (at('OP') && COMPOPS.includes(cur().v)) op = toks[p++].v;
      else if (atKw('in')) { p++; op = 'in'; }
      else if (atKw('not') && toks[p + 1].t === 'NAME' && toks[p + 1].v === 'in') { p += 2; op = 'not in'; }
      else if (atKw('is')) { p++; op = (atKw('not') && (p++, true)) ? 'is not' : 'is'; }
      else break;
      ops.push(op); rights.push(parseArith());
    }
    if (!ops.length) return first;
    return { k: 'Compare', left: first, ops, rights, line: first.line };
  }
  const binLevel = (next, opsList) => function () {
    let l = next();
    while (at('OP') && opsList.includes(cur().v)) { const line = ln(); const op = toks[p++].v; l = { k: 'Bin', op, l, r: next(), line }; }
    return l;
  };
  const parseTerm = () => binLevel(parseFactor, ['*', '/', '//', '%', '@'])();
  const parseArithRaw = () => binLevel(parseTerm, ['+', '-'])();
  const parseShift = () => binLevel(parseArithRaw, ['<<', '>>'])();
  const parseBitAnd = () => binLevel(parseShift, ['&'])();
  const parseBitXor = () => binLevel(parseBitAnd, ['^'])();
  function parseArith() { return binLevel(parseBitXor, ['|'])(); }
  function parseFactor() {
    if (at('OP', '-') || at('OP', '+') || at('OP', '~')) {
      const line = ln(); const op = toks[p++].v;
      return { k: 'Unary', op, v: parseFactor(), line };
    }
    return parsePower();
  }
  function parsePower() {
    const base = parsePostfix();
    if (at('OP', '**')) { const line = ln(); p++; return { k: 'Bin', op: '**', l: base, r: parseFactor(), line }; }
    return base;
  }
  function parsePostfix() {
    let node = parseAtom();
    for (;;) {
      const line = ln();
      if (eat('OP', '.')) { node = { k: 'Attr', obj: node, name: want('NAME').v, line }; continue; }
      if (eat('OP', '(')) {
        const args = [], kwargs = [];
        while (!at('OP', ')')) {
          if (at('NAME') && toks[p + 1].t === 'OP' && toks[p + 1].v === '=' ) {
            const key = want('NAME').v; want('OP', '=');
            kwargs.push({ key, value: parseExpr() });
          } else if (eat('OP', '*')) { args.push({ star: true, value: parseExpr() }); }
          else args.push({ value: parseExpr() });
          if (!eat('OP', ',')) break;
        }
        want('OP', ')');
        node = { k: 'Call', fn: node, args, kwargs, line }; continue;
      }
      if (eat('OP', '[')) {
        let lo = null, hi = null, step = null, isSlice = false;
        if (!at('OP', ':')) lo = parseExprList();
        if (eat('OP', ':')) {
          isSlice = true;
          if (!at('OP', ']') && !at('OP', ':')) hi = parseExpr();
          if (eat('OP', ':') && !at('OP', ']')) step = parseExpr();
        }
        want('OP', ']');
        node = isSlice ? { k: 'Slice', obj: node, lo, hi, step, line } : { k: 'Index', obj: node, idx: lo, line };
        continue;
      }
      break;
    }
    return node;
  }
  function parseComprehension(elt, closer, kind, valueElt) {
    const clauses = [];
    while (atKw('for')) {
      p++; const target = parseTarget();
      if (!eatKw('in')) throw fail();
      const iter = parseOr();
      const ifs = [];
      while (atKw('if')) { p++; ifs.push(parseOr()); }
      clauses.push({ target, iter, ifs });
    }
    want('OP', closer);
    return { k: 'Comp', kind, elt, valueElt: valueElt || null, clauses, line: elt.line };
  }
  function parseAtom() {
    const tk = cur(), line = tk.line;
    if (tk.t === 'NUM') { p++; return { k: 'Num', v: tk.v, line }; }
    if (tk.t === 'STR') {
      p++; let s = tk.v;
      while (at('STR')) s += toks[p++].v;
      return { k: 'Str', v: s, line };
    }
    if (tk.t === 'FSTR') { p++; return { k: 'FStr', parts: compileFString(tk.v, line), line }; }
    if (tk.t === 'NAME') {
      if (tk.v === 'True') { p++; return { k: 'Const', v: true, line }; }
      if (tk.v === 'False') { p++; return { k: 'Const', v: false, line }; }
      if (tk.v === 'None') { p++; return { k: 'Const', v: null, line }; }
      if (tk.v === 'lambda') {
        p++; const params = [];
        while (!at('OP', ':')) {
          const pn = want('NAME').v;
          params.push({ name: pn, def: eat('OP', '=') ? parseExpr() : null });
          if (!eat('OP', ',')) break;
        }
        want('OP', ':');
        return { k: 'Lambda', params, body: parseExpr(), line };
      }
      p++; return { k: 'Name', id: tk.v, line };
    }
    if (tk.t === 'OP') {
      if (tk.v === '(') {
        p++;
        if (eat('OP', ')')) return { k: 'Tuple', items: [], line };
        const first = parseExpr();
        if (atKw('for')) return parseComprehension(first, ')', 'list');
        if (at('OP', ',')) {
          const items = [first];
          while (eat('OP', ',')) { if (at('OP', ')')) break; items.push(parseExpr()); }
          want('OP', ')');
          return { k: 'Tuple', items, line };
        }
        want('OP', ')');
        return first;
      }
      if (tk.v === '[') {
        p++;
        if (eat('OP', ']')) return { k: 'List', items: [], line };
        const first = parseExpr();
        if (atKw('for')) return parseComprehension(first, ']', 'list');
        const items = [first];
        while (eat('OP', ',')) { if (at('OP', ']')) break; items.push(parseExpr()); }
        want('OP', ']');
        return { k: 'List', items, line };
      }
      if (tk.v === '{') {
        p++;
        if (eat('OP', '}')) return { k: 'Dict', keys: [], values: [], line };
        const firstKey = parseExpr();
        if (eat('OP', ':')) {
          const firstVal = parseExpr();
          if (atKw('for')) return parseComprehension(firstKey, '}', 'dict', firstVal);
          const keys = [firstKey], values = [firstVal];
          while (eat('OP', ',')) {
            if (at('OP', '}')) break;
            keys.push(parseExpr()); want('OP', ':'); values.push(parseExpr());
          }
          want('OP', '}');
          return { k: 'Dict', keys, values, line };
        }
        if (atKw('for')) return parseComprehension(firstKey, '}', 'set');
        const items = [firstKey];
        while (eat('OP', ',')) { if (at('OP', '}')) break; items.push(parseExpr()); }
        want('OP', '}');
        return { k: 'Set', items, line };
      }
    }
    throw fail();
  }

  /* f-string: split into literal chunks and embedded expressions */
  function compileFString(raw, line) {
    const parts = [];
    let buf = '';
    for (let i = 0; i < raw.length; i++) {
      const c = raw[i];
      if (c === '{' && raw[i + 1] === '{') { buf += '{'; i++; continue; }
      if (c === '}' && raw[i + 1] === '}') { buf += '}'; i++; continue; }
      if (c === '{') {
        if (buf) { parts.push({ lit: buf }); buf = ''; }
        let d = 1, j = i + 1, expr = '';
        while (j < raw.length && d > 0) {
          if (raw[j] === '{') d++;
          else if (raw[j] === '}') { d--; if (!d) break; }
          expr += raw[j++];
        }
        i = j;
        const fmt = expr.split(/(?<!\!)\:(?![^\[]*\])/);
        let spec = null, src = expr;
        if (fmt.length > 1) { src = fmt[0]; spec = fmt.slice(1).join(':'); }
        src = src.replace(/![rsa]$/, '');
        parts.push({ node: parse(src.trim()).body[0].value, spec });
        continue;
      }
      buf += c;
    }
    if (buf) parts.push({ lit: buf });
    return parts;
  }

  const body = [];
  while (!at('EOF')) {
    const before = p;
    body.push(...parseStatement());
    if (p === before && !at('EOF')) throw fail();
  }
  return { k: 'Module', body };
}

/* ============================================================
   4. PYTHON SUBSET — evaluator.
   ============================================================ */
class PyFunc {
  constructor(name, params, body, scope, self) {
    this.name = name; this.params = params; this.body = body; this.scope = scope; this.self = self;
  }
  bind(inst) { const f = new PyFunc(this.name, this.params, this.body, this.scope, inst); return f; }
}
class PyClass {
  constructor(name, bases) { this.name = name; this.bases = bases || []; this.methods = new Map(); }
  lookup(n) {
    if (this.methods.has(n)) return this.methods.get(n);
    for (const b of this.bases) { const v = b.lookup && b.lookup(n); if (v !== undefined) return v; }
    return undefined;
  }
}
class PyObj {
  constructor(cls) { this.cls = cls; this.attrs = new Map(); }
  get(n) { return this.attrs.get(n); }
  set(n, v) { this.attrs.set(n, v); return v; }
}
class PyTuple extends Array {}
class Scope {
  constructor(parent, globals) { this.v = new Map(); this.parent = parent || null; this.globals = globals || this; this.globalNames = null; }
  has(n) { return this.v.has(n) || (this.parent ? this.parent.has(n) : false); }
  get(n, line) {
    let s = this;
    while (s) { if (s.v.has(n)) return s.v.get(n); s = s.parent; }
    throw new PyError('NameError', "name '" + n + "' is not defined", line);
  }
  set(n, val) {
    if (this.globalNames && this.globalNames.has(n)) { this.globals.v.set(n, val); return val; }
    this.v.set(n, val); return val;
  }
}
const BREAK = { sig: 'break' }, CONTINUE = { sig: 'continue' };
class ReturnSig { constructor(v) { this.value = v; } }

const isNum = v => typeof v === 'number';
const isStr = v => typeof v === 'string';
const isList = v => Array.isArray(v);
const isDict = v => v instanceof Map;
const isSet = v => v instanceof Set;

function pyBool(v) {
  if (v === null || v === undefined || v === false) return false;
  if (v === true) return true;
  if (isNum(v)) return v !== 0;
  if (isStr(v)) return v.length > 0;
  if (isList(v)) return v.length > 0;
  if (isDict(v) || isSet(v)) return v.size > 0;
  return true;
}
function fmtNum(n) {
  if (!isFinite(n)) return n > 0 ? 'inf' : (n < 0 ? '-inf' : 'nan');
  if (Number.isInteger(n)) return String(n);
  const s = String(n);
  return s.includes('e') ? s : s;
}
function repr(v) {
  if (isStr(v)) return "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  return str(v);
}
function str(v) {
  if (v === null || v === undefined) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (isNum(v)) return fmtNum(v);
  if (isStr(v)) return v;
  if (v instanceof PyTuple) return '(' + [...v].map(repr).join(', ') + (v.length === 1 ? ',' : '') + ')';
  if (isList(v)) return '[' + v.map(repr).join(', ') + ']';
  if (isDict(v)) return '{' + [...v.entries()].map(([k, x]) => repr(k) + ': ' + repr(x)).join(', ') + '}';
  if (isSet(v)) return v.size ? '{' + [...v].map(repr).join(', ') + '}' : 'set()';
  if (v instanceof PyError) return v.message;
  if (v instanceof PyObj) {
    const s = v.cls && v.cls.lookup && v.cls.lookup('__str__');
    if (s) return str(INTERP.callFunc(s.bind(v), [], [], 0));
    return '<' + (v.cls ? v.cls.name : 'object') + ' object>';
  }
  if (v instanceof PyClass) return "<class '" + v.name + "'>";
  if (v instanceof PyFunc) return '<function ' + v.name + '>';
  if (typeof v === 'function') return '<built-in function ' + (v.pyName || v.name) + '>';
  if (v && v.__module) return "<module '" + v.__module + "'>";
  if (v && v.__sprite) return '<sprite ' + v.name + '>';
  if (v && v.__anim) return '<animation>';
  return String(v);
}
function typeName(v) {
  if (v === null || v === undefined) return 'NoneType';
  if (typeof v === 'boolean') return 'bool';
  if (isNum(v)) return Number.isInteger(v) ? 'int' : 'float';
  if (isStr(v)) return 'str';
  if (v instanceof PyTuple) return 'tuple';
  if (isList(v)) return 'list';
  if (isDict(v)) return 'dict';
  if (isSet(v)) return 'set';
  if (v instanceof PyObj) return v.cls ? v.cls.name : 'object';
  if (v instanceof PyClass) return 'type';
  return 'object';
}
function iterate(v, line) {
  if (isStr(v)) return v.split('');
  if (isList(v)) return v.slice();
  if (isSet(v)) return [...v];
  if (isDict(v)) return [...v.keys()];
  if (v && v.__range) return v.toArray();
  if (v instanceof PyObj) {
    const it = v.cls && v.cls.lookup('__iter__');
    if (it) return iterate(INTERP.callFunc(it.bind(v), [], [], line), line);
  }
  throw new PyError('TypeError', "'" + typeName(v) + "' object is not iterable", line);
}
function eq(a, b) {
  if (a === b) return true;
  if (isNum(a) && isNum(b)) return a === b;
  if (a instanceof PyTuple !== b instanceof PyTuple) { /* still compare elementwise */ }
  if (isList(a) && isList(b)) return a.length === b.length && a.every((x, i) => eq(x, b[i]));
  if (isDict(a) && isDict(b)) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) { if (!b.has(k) || !eq(v, b.get(k))) return false; }
    return true;
  }
  if ((a === null || a === undefined) && (b === null || b === undefined)) return true;
  return false;
}
function cmpLt(a, b, line) {
  if (isNum(a) && isNum(b)) return a < b;
  if (isStr(a) && isStr(b)) return a < b;
  if (isList(a) && isList(b)) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (!eq(a[i], b[i])) return cmpLt(a[i], b[i], line);
    }
    return a.length < b.length;
  }
  throw new PyError('TypeError', "'<' not supported between instances of '" + typeName(a) + "' and '" + typeName(b) + "'", line);
}
function contains(hay, needle, line) {
  if (isStr(hay)) return isStr(needle) ? hay.includes(needle) : false;
  if (isList(hay)) return hay.some(x => eq(x, needle));
  if (isDict(hay)) { for (const k of hay.keys()) if (eq(k, needle)) return true; return false; }
  if (isSet(hay)) { for (const k of hay) if (eq(k, needle)) return true; return false; }
  throw new PyError('TypeError', "argument of type '" + typeName(hay) + "' is not iterable", line);
}
function normIndex(i, len, line, allowEnd, kind) {
  let n = Math.trunc(i);
  if (n < 0) n += len;
  if (n < 0 || (allowEnd ? n > len : n >= len))
    throw new PyError('IndexError', (kind || 'list') + ' index out of range', line);
  return n;
}

/* ---------- method tables ---------- */
function strMethods(s) {
  return {
    upper: () => s.toUpperCase(), lower: () => s.toLowerCase(),
    strip: (c) => c === undefined ? s.trim() : s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), ''),
    lstrip: () => s.replace(/^\s+/, ''), rstrip: () => s.replace(/\s+$/, ''),
    split: (sep, n) => sep === undefined || sep === null ? s.split(/\s+/).filter(x => x) : s.split(sep),
    join: (arr) => iterate(arr, 0).map(str).join(s),
    replace: (a, b) => s.split(a).join(b),
    startswith: (a) => s.startsWith(a), endswith: (a) => s.endsWith(a),
    find: (a) => s.indexOf(a), index: (a) => { const i = s.indexOf(a); if (i < 0) throw new PyError('ValueError', 'substring not found', 0); return i; },
    count: (a) => a === '' ? s.length + 1 : s.split(a).length - 1,
    capitalize: () => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
    title: () => s.replace(/\w\S*/g, t => t[0].toUpperCase() + t.slice(1).toLowerCase()),
    isdigit: () => /^[0-9]+$/.test(s), isalpha: () => /^[A-Za-z]+$/.test(s),
    isspace: () => /^\s+$/.test(s), isupper: () => s === s.toUpperCase() && /[A-Z]/.test(s),
    islower: () => s === s.toLowerCase() && /[a-z]/.test(s),
    format: (...a) => { let i = 0; return s.replace(/\{(\d*)\}/g, (_, d) => str(d === '' ? a[i++] : a[+d])); },
    zfill: (n) => s.padStart(n, '0'),
  };
}
function listMethods(l) {
  return {
    append: (v) => { l.push(v); return null; },
    extend: (v) => { l.push(...iterate(v, 0)); return null; },
    pop: (i) => { if (!l.length) throw new PyError('IndexError', 'pop from empty list', 0); return i === undefined ? l.pop() : l.splice(normIndex(i, l.length, 0), 1)[0]; },
    insert: (i, v) => { l.splice(Math.max(0, i < 0 ? l.length + i : i), 0, v); return null; },
    remove: (v) => { const i = l.findIndex(x => eq(x, v)); if (i < 0) throw new PyError('ValueError', 'list.remove(x): x not in list', 0); l.splice(i, 1); return null; },
    index: (v) => { const i = l.findIndex(x => eq(x, v)); if (i < 0) throw new PyError('ValueError', 'is not in list', 0); return i; },
    count: (v) => l.filter(x => eq(x, v)).length,
    clear: () => { l.length = 0; return null; },
    copy: () => l.slice(),
    reverse: () => { l.reverse(); return null; },
    sort: () => { sortInPlace(l, takeKw()); return null; },
  };
}
/* keyword arguments for the current builtin call */
let PENDING_KW = null;
function takeKw() { const k = PENDING_KW || {}; PENDING_KW = null; return k; }

function sortInPlace(l, kw) {
  kw = kw || {};
  const key = kw.key || null, rev = pyBool(kw.reverse);
  l.sort((a, b) => {
    const ka = key ? INTERP.callAny(key, [a], 0) : a, kb = key ? INTERP.callAny(key, [b], 0) : b;
    if (eq(ka, kb)) return 0;
    return cmpLt(ka, kb, 0) ? -1 : 1;
  });
  if (rev) l.reverse();
}
function dictMethods(d) {
  const findKey = (k) => { for (const kk of d.keys()) if (eq(kk, k)) return kk; return undefined; };
  return {
    get: (k, dflt) => { const kk = findKey(k); return kk === undefined ? (dflt === undefined ? null : dflt) : d.get(kk); },
    keys: () => [...d.keys()], values: () => [...d.values()],
    items: () => [...d.entries()].map(([k, v]) => PyTuple.from([k, v])),
    pop: (k, dflt) => { const kk = findKey(k); if (kk === undefined) { if (dflt !== undefined) return dflt; throw new PyError('KeyError', str(k), 0); } const v = d.get(kk); d.delete(kk); return v; },
    update: (o) => { if (isDict(o)) for (const [k, v] of o) d.set(k, v); return null; },
    clear: () => { d.clear(); return null; },
    copy: () => new Map(d),
    setdefault: (k, v) => { const kk = findKey(k); if (kk !== undefined) return d.get(kk); d.set(k, v === undefined ? null : v); return d.get(k); },
    __find: findKey,
  };
}
function setMethods(s) {
  return {
    add: (v) => { if (!contains(s, v, 0)) s.add(v); return null; },
    remove: (v) => { for (const x of s) if (eq(x, v)) { s.delete(x); return null; } throw new PyError('KeyError', str(v), 0); },
    discard: (v) => { for (const x of s) if (eq(x, v)) { s.delete(x); break; } return null; },
    clear: () => { s.clear(); return null; },
    copy: () => new Set(s),
  };
}

/* ---------- interpreter ---------- */
class Interp {
  constructor() {
    this.globals = new Scope(null);
    this.globals.globals = this.globals;
    this.steps = 0; this.limit = 3000000;
    this.stdout = (s) => console.log(s);
  }
  reset() {
    this.globals = new Scope(null);
    this.globals.globals = this.globals;
    installBuiltins(this.globals);
  }
  tick(line) {
    if (++this.steps > this.limit)
      throw new PyError('RuntimeError', 'script ran too long (possible infinite loop)', line);
  }
  run(body, scope) { for (const s of body) this.exec(s, scope); }

  exec(n, sc) {
    this.tick(n.line);
    switch (n.k) {
      case 'Expr': this.eval(n.value, sc); return;
      case 'Pass': return;
      case 'Assign': {
        const v = this.eval(n.value, sc);
        for (const t of n.targets) this.assign(t, v, sc);
        return;
      }
      case 'AugAssign': {
        const curv = this.eval(n.target, sc);
        this.assign(n.target, this.binop(n.op, curv, this.eval(n.value, sc), n.line), sc);
        return;
      }
      case 'If': {
        if (pyBool(this.eval(n.test, sc))) this.run(n.body, sc);
        else if (n.orelse) this.run(n.orelse, sc);
        return;
      }
      case 'While': {
        let broke = false;
        while (pyBool(this.eval(n.test, sc))) {
          this.tick(n.line);
          try { this.run(n.body, sc); }
          catch (e) { if (e === BREAK) { broke = true; break; } if (e === CONTINUE) continue; throw e; }
        }
        if (!broke && n.orelse) this.run(n.orelse, sc);
        return;
      }
      case 'For': {
        const seq = iterate(this.eval(n.iter, sc), n.line);
        let broke = false;
        for (const item of seq) {
          this.tick(n.line);
          this.assign(n.target, item, sc);
          try { this.run(n.body, sc); }
          catch (e) { if (e === BREAK) { broke = true; break; } if (e === CONTINUE) continue; throw e; }
        }
        if (!broke && n.orelse) this.run(n.orelse, sc);
        return;
      }
      case 'Break': throw BREAK;
      case 'Continue': throw CONTINUE;
      case 'Return': throw new ReturnSig(n.value ? this.eval(n.value, sc) : null);
      case 'FuncDef': sc.set(n.name, new PyFunc(n.name, n.params, n.body, sc, null)); return;
      case 'ClassDef': {
        const bases = n.bases.map(b => this.eval(b, sc));
        const cls = new PyClass(n.name, bases.filter(b => b instanceof PyClass));
        const inner = new Scope(sc, sc.globals);
        this.run(n.body, inner);
        for (const [k, v] of inner.v) cls.methods.set(k, v);
        sc.set(n.name, cls);
        return;
      }
      case 'Global': {
        if (!sc.globalNames) sc.globalNames = new Set();
        for (const nm of n.names) sc.globalNames.add(nm);
        return;
      }
      case 'Del': {
        for (const t of n.targets) {
          if (t.k === 'Name') sc.v.delete(t.id);
          else if (t.k === 'Index') {
            const o = this.eval(t.obj, sc), i = this.eval(t.idx, sc);
            if (isList(o)) o.splice(normIndex(i, o.length, n.line), 1);
            else if (isDict(o)) dictMethods(o).pop(i);
          } else if (t.k === 'Attr') {
            const o = this.eval(t.obj, sc);
            if (o instanceof PyObj) o.attrs.delete(t.name);
          }
        }
        return;
      }
      case 'Import': {
        for (const m of n.mods) {
          const mod = MODULES[m.mod.split('.')[0]];
          if (!mod) throw new PyError('ModuleNotFoundError', "No module named '" + m.mod + "'", n.line);
          sc.set(m.alias, mod);
        }
        return;
      }
      case 'FromImport': {
        const mod = MODULES[n.mod];
        if (!mod) throw new PyError('ModuleNotFoundError', "No module named '" + n.mod + "'", n.line);
        for (const nm of n.names) {
          if (nm.name === '*') { for (const k of Object.keys(mod)) if (!k.startsWith('__')) sc.set(k, mod[k]); }
          else {
            if (!(nm.name in mod)) throw new PyError('ImportError', "cannot import name '" + nm.name + "'", n.line);
            sc.set(nm.alias, mod[nm.name]);
          }
        }
        return;
      }
      case 'Assert': {
        if (!pyBool(this.eval(n.test, sc)))
          throw new PyError('AssertionError', n.msg ? str(this.eval(n.msg, sc)) : '', n.line);
        return;
      }
      case 'Raise': {
        const v = n.value ? this.eval(n.value, sc) : null;
        if (v instanceof PyError) throw v;
        throw new PyError(v && v.__exc ? v.__exc : 'Exception', v === null ? '' : str(v), n.line);
      }
      case 'Try': {
        try { this.run(n.body, sc); if (n.orelse) this.run(n.orelse, sc); }
        catch (e) {
          if (e === BREAK || e === CONTINUE || e === ABORT || e instanceof ReturnSig) { if (n.fin) this.run(n.fin, sc); throw e; }
          const err = (e instanceof PyError) ? e : new PyError('RuntimeError', e.message || String(e), n.line);
          let handled = false;
          for (const h of n.handlers) {
            let match = true;
            if (h.type) {
              const names = h.type.k === 'Tuple' ? h.type.items.map(x => x.id) : [h.type.id || (h.type.k === 'Name' ? h.type.id : null)];
              match = names.includes('Exception') || names.includes(err.type);
            }
            if (match) {
              if (h.name) sc.set(h.name, err);
              this.run(h.body, sc); handled = true; break;
            }
          }
          if (n.fin) this.run(n.fin, sc);
          if (!handled) throw err;
          return;
        }
        if (n.fin) this.run(n.fin, sc);
        return;
      }
      case 'With': {
        const v = this.eval(n.ctx, sc);
        if (n.name) sc.set(n.name, v);
        this.run(n.body, sc);
        return;
      }
      default: throw badInput(n.line);
    }
  }

  assign(t, v, sc) {
    switch (t.k) {
      case 'Name': sc.set(t.id, v); return;
      case 'Attr': {
        const o = this.eval(t.obj, sc);
        if (o instanceof PyObj) { o.set(t.name, v); if (o.__hooks && o.__hooks[t.name]) o.__hooks[t.name](v); return; }
        if (o instanceof PyClass) { o.methods.set(t.name, v); return; }
        if (o && typeof o === 'object') { o[t.name] = v; return; }
        throw new PyError('AttributeError', "cannot set attribute on '" + typeName(o) + "'", t.line);
      }
      case 'Index': {
        const o = this.eval(t.obj, sc), i = this.eval(t.idx, sc);
        if (isList(o)) { o[normIndex(i, o.length, t.line)] = v; return; }
        if (isDict(o)) { const kk = dictMethods(o).__find(i); o.set(kk === undefined ? i : kk, v); return; }
        throw new PyError('TypeError', "'" + typeName(o) + "' object does not support item assignment", t.line);
      }
      case 'Tuple': case 'List': {
        const items = iterate(v, t.line);
        if (items.length !== t.items.length)
          throw new PyError('ValueError', items.length > t.items.length
            ? 'too many values to unpack (expected ' + t.items.length + ')'
            : 'need more than ' + items.length + ' value' + (items.length === 1 ? '' : 's') + ' to unpack', t.line);
        t.items.forEach((tt, i) => this.assign(tt, items[i], sc));
        return;
      }
      default: throw new PyError('SyntaxError', 'cannot assign to expression', t.line);
    }
  }

  eval(n, sc) {
    this.tick(n.line);
    switch (n.k) {
      case 'Num': case 'Str': return n.v;
      case 'Const': return n.v;
      case 'Name': return sc.get(n.id, n.line);
      case 'FStr': {
        let out = '';
        for (const part of n.parts) {
          if (part.lit !== undefined) { out += part.lit; continue; }
          let v = this.eval(part.node, sc);
          if (part.spec) {
            const m = /^\.(\d+)f$/.exec(part.spec);
            if (m && isNum(v)) { out += v.toFixed(+m[1]); continue; }
            const w = /^(\d+)$/.exec(part.spec);
            if (w) { out += str(v).padStart(+w[1]); continue; }
          }
          out += str(v);
        }
        return out;
      }
      case 'List': return n.items.map(x => this.eval(x, sc));
      case 'Tuple': return PyTuple.from(n.items.map(x => this.eval(x, sc)));
      case 'Set': { const s = new Set(); for (const it of n.items) { const v = this.eval(it, sc); if (!contains(s, v, n.line)) s.add(v); } return s; }
      case 'Dict': {
        const d = new Map();
        n.keys.forEach((k, i) => d.set(this.eval(k, sc), this.eval(n.values[i], sc)));
        return d;
      }
      case 'Comp': {
        const outList = [], outDict = new Map(), outSet = new Set();
        const walk = (ci, scope) => {
          if (ci >= n.clauses.length) {
            if (n.kind === 'dict') outDict.set(this.eval(n.elt, scope), this.eval(n.valueElt, scope));
            else if (n.kind === 'set') { const v = this.eval(n.elt, scope); if (!contains(outSet, v, n.line)) outSet.add(v); }
            else outList.push(this.eval(n.elt, scope));
            return;
          }
          const cl = n.clauses[ci];
          for (const item of iterate(this.eval(cl.iter, scope), n.line)) {
            this.tick(n.line);
            this.assign(cl.target, item, scope);
            if (cl.ifs.every(c => pyBool(this.eval(c, scope)))) walk(ci + 1, scope);
          }
        };
        const inner = new Scope(sc, sc.globals);
        walk(0, inner);
        return n.kind === 'dict' ? outDict : n.kind === 'set' ? outSet : outList;
      }
      case 'Bool': {
        const l = this.eval(n.l, sc);
        if (n.op === 'and') return pyBool(l) ? this.eval(n.r, sc) : l;
        return pyBool(l) ? l : this.eval(n.r, sc);
      }
      case 'Unary': {
        const v = this.eval(n.v, sc);
        if (n.op === 'not') return !pyBool(v);
        if (n.op === '-') { this.needNum(v, n.line); return -v; }
        if (n.op === '+') { this.needNum(v, n.line); return +v; }
        if (n.op === '~') { this.needNum(v, n.line); return ~v; }
        return v;
      }
      case 'Bin': return this.binop(n.op, this.eval(n.l, sc), this.eval(n.r, sc), n.line);
      case 'Compare': {
        let left = this.eval(n.left, sc);
        for (let i = 0; i < n.ops.length; i++) {
          const right = this.eval(n.rights[i], sc), op = n.ops[i];
          let ok;
          switch (op) {
            case '==': ok = eq(left, right); break;
            case '!=': ok = !eq(left, right); break;
            case '<': ok = cmpLt(left, right, n.line); break;
            case '>': ok = cmpLt(right, left, n.line); break;
            case '<=': ok = eq(left, right) || cmpLt(left, right, n.line); break;
            case '>=': ok = eq(left, right) || cmpLt(right, left, n.line); break;
            case 'in': ok = contains(right, left, n.line); break;
            case 'not in': ok = !contains(right, left, n.line); break;
            case 'is': ok = left === right || (left == null && right == null); break;
            case 'is not': ok = !(left === right || (left == null && right == null)); break;
          }
          if (!ok) return false;
          left = right;
        }
        return true;
      }
      case 'IfExp': return pyBool(this.eval(n.test, sc)) ? this.eval(n.body, sc) : this.eval(n.orelse, sc);
      case 'Lambda': return new PyFunc('<lambda>', n.params, [{ k: 'Return', value: n.body, line: n.line }], sc, null);
      case 'Attr': return this.getattr(this.eval(n.obj, sc), n.name, n.line);
      case 'Index': {
        const o = this.eval(n.obj, sc), i = this.eval(n.idx, sc);
        if (isStr(o)) return o[normIndex(i, o.length, n.line, false, 'string')];
        if (isList(o)) return o[normIndex(i, o.length, n.line)];
        if (isDict(o)) {
          const kk = dictMethods(o).__find(i);
          if (kk === undefined) throw new PyError('KeyError', str(i), n.line);
          return o.get(kk);
        }
        if (o instanceof PyObj) {
          const gi = o.cls && o.cls.lookup('__getitem__');
          if (gi) return this.callFunc(gi.bind(o), [i], [], n.line);
        }
        throw new PyError('TypeError', "'" + typeName(o) + "' object is not subscriptable", n.line);
      }
      case 'Slice': {
        const o = this.eval(n.obj, sc);
        const len = isStr(o) || isList(o) ? o.length : 0;
        if (!isStr(o) && !isList(o)) throw new PyError('TypeError', "'" + typeName(o) + "' object is not subscriptable", n.line);
        const st = n.step === null || n.step === undefined ? 1 : Math.trunc(this.eval(n.step, sc));
        if (st === 0) throw new PyError('ValueError', 'slice step cannot be zero', n.line);
        let lo = n.lo === null || n.lo === undefined ? (st > 0 ? 0 : len - 1) : Math.trunc(this.eval(n.lo, sc));
        let hi = n.hi === null || n.hi === undefined ? (st > 0 ? len : -len - 1) : Math.trunc(this.eval(n.hi, sc));
        if (lo < 0) lo += len; if (hi < 0 && !(n.hi === null || n.hi === undefined)) hi += len;
        const out = [];
        if (st > 0) { for (let i = Math.max(0, lo); i < Math.min(len, hi); i += st) out.push(o[i]); }
        else { for (let i = Math.min(len - 1, lo); i > Math.max(-1, hi); i += st) out.push(o[i]); }
        return isStr(o) ? out.join('') : out;
      }
      case 'Call': {
        const fn = this.eval(n.fn, sc);
        const args = [];
        for (const a of n.args) {
          const v = this.eval(a.value, sc);
          if (a.star) args.push(...iterate(v, n.line)); else args.push(v);
        }
        const kw = {};
        for (const k of n.kwargs) kw[k.key] = this.eval(k.value, sc);
        try { return this.callAny(fn, args, n.line, kw, n.fn); }
        catch (e) { if (e instanceof PyError && !e.line) e.line = n.line; throw e; }
      }
      default: throw badInput(n.line);
    }
  }

  needNum(v, line) {
    if (!isNum(v) && typeof v !== 'boolean')
      throw new PyError('TypeError', "bad operand type: '" + typeName(v) + "'", line);
  }
  binop(op, a, b, line) {
    if (op === '+') {
      if (isStr(a) && isStr(b)) return a + b;
      if (isList(a) && isList(b)) return a.concat(b);
      if (isNum(a) && isNum(b)) return a + b;
      if (isStr(a) || isList(a))
        throw new PyError('TypeError', "cannot concatenate '" + typeName(a) + "' and '" + typeName(b) + "' objects", line);
    }
    if (op === '*') {
      if (isStr(a) && isNum(b)) return b > 0 ? a.repeat(Math.trunc(b)) : '';
      if (isNum(a) && isStr(b)) return a > 0 ? b.repeat(Math.trunc(a)) : '';
      if (isList(a) && isNum(b)) { const o = []; for (let i = 0; i < Math.trunc(b); i++) o.push(...a); return o; }
      if (isList(b) && isNum(a)) { const o = []; for (let i = 0; i < Math.trunc(a); i++) o.push(...b); return o; }
    }
    if (op === '%' && isStr(a)) {
      const vals = isList(b) || b instanceof PyTuple ? [...b] : [b];
      let i = 0;
      return a.replace(/%(?:\.(\d+))?([sdif%])/g, (m, prec, kind) => {
        if (kind === '%') return '%';
        const v = vals[i++];
        if (kind === 'd' || kind === 'i') return String(Math.trunc(v));
        if (kind === 'f') return Number(v).toFixed(prec === undefined ? 6 : +prec);
        return str(v);
      });
    }
    if (!isNum(a) && typeof a !== 'boolean' || !isNum(b) && typeof b !== 'boolean')
      throw new PyError('TypeError', "unsupported operand type(s) for " + op + ": '" + typeName(a) + "' and '" + typeName(b) + "'", line);
    const x = Number(a), y = Number(b);
    switch (op) {
      case '+': return x + y;
      case '-': return x - y;
      case '*': return x * y;
      case '/': if (y === 0) throw new PyError('ZeroDivisionError', 'integer division or modulo by zero', line); return x / y;
      case '//': if (y === 0) throw new PyError('ZeroDivisionError', 'integer division or modulo by zero', line); return Math.floor(x / y);
      case '%': if (y === 0) throw new PyError('ZeroDivisionError', 'integer division or modulo by zero', line); return ((x % y) + y) % y;
      case '**': return Math.pow(x, y);
      case '&': return x & y; case '|': return x | y; case '^': return x ^ y;
      case '<<': return x << y; case '>>': return x >> y;
    }
    throw new PyError('TypeError', "unsupported operand type(s) for " + op + ": '" + typeName(a) + "' and '" + typeName(b) + "'", line);
  }

  getattr(o, name, line) {
    if (o instanceof PyObj) {
      if (o.attrs.has(name)) return o.attrs.get(name);
      if (o.__computed && o.__computed[name]) return o.__computed[name]();
      const m = o.cls && o.cls.lookup(name);
      if (m !== undefined) return (m instanceof PyFunc) ? m.bind(o) : m;
      throw new PyError('AttributeError', "'" + typeName(o) + "' object has no attribute '" + name + "'", line);
    }
    if (o instanceof PyClass) {
      const m = o.lookup(name);
      if (m !== undefined) return m;
      throw new PyError('AttributeError', "type object '" + o.name + "' has no attribute '" + name + "'", line);
    }
    if (isStr(o)) { const t = strMethods(o); if (name in t) return t[name]; }
    else if (isList(o)) { const t = listMethods(o); if (name in t) return t[name]; }
    else if (isDict(o)) { const t = dictMethods(o); if (name in t) return t[name]; }
    else if (isSet(o)) { const t = setMethods(o); if (name in t) return t[name]; }
    else if (o instanceof PyError) {
      if (name === 'args') return PyTuple.from([o.message]);
      if (name === 'message') return o.message;
    }
    else if (o && typeof o === 'object' && name in o) return o[name];
    throw new PyError('AttributeError', "'" + typeName(o) + "' object has no attribute '" + name + "'", line);
  }

  callAny(fn, args, line, kw, fnNode) {
    kw = kw || {};
    if (fn instanceof PyFunc) return this.callFunc(fn, args, kw, line);
    if (fn instanceof PyClass) return this.instantiate(fn, args, kw, line);
    if (typeof fn === 'function') {
      /* rest-parameter builtins rebuild their argument array, so keyword
         arguments travel on the interpreter instead of on `args` */
      PENDING_KW = kw;
      const r = fn.apply(null, args);
      PENDING_KW = null;
      return r === undefined ? null : r;
    }
    throw new PyError('TypeError', "'" + typeName(fn) + "' object is not callable", line);
  }
  callFunc(fn, args, kw, line) {
    kw = kw || {};
    const sc = new Scope(fn.scope, this.globals);
    let ai = 0;
    const params = fn.params.slice();
    if (fn.self !== null && fn.self !== undefined && params.length && params[0].name === 'self')
      sc.set('self', fn.self), params.shift();
    if (!params.some(pp => pp.star) && args.length > params.length)
      /* the doubled space before "given" is Skulpt's own wording */
      throw new PyError('TypeError', fn.name + '() takes ' + params.length + ' positional argument' +
        (params.length === 1 ? '' : 's') + ' but ' + args.length + ' were  given', line);
    for (const prm of params) {
      if (prm.star) { sc.set(prm.name, PyTuple.from(args.slice(ai))); ai = args.length; continue; }
      if (ai < args.length) sc.set(prm.name, args[ai++]);
      else if (prm.name in kw) sc.set(prm.name, kw[prm.name]);
      else if (prm.def) sc.set(prm.name, this.eval(prm.def, fn.scope));
      else throw new PyError('TypeError', fn.name + '() missing 1 required argument: ' + prm.name, line);
    }
    try { this.run(fn.body, sc); }
    catch (e) { if (e instanceof ReturnSig) return e.value; throw e; }
    return null;
  }
  instantiate(cls, args, kw, line) {
    if (cls.__native) return cls.__native(args, kw, line);
    const o = new PyObj(cls);
    const init = cls.lookup('__init__');
    if (init) this.callFunc(init.bind(o), args, kw, line);
    return o;
  }
}
const INTERP = new Interp();

/* ---------- builtins & modules ---------- */
function makeRange(a, b, c) {
  const start = b === undefined ? 0 : a;
  const stop = b === undefined ? a : b;
  const step = c === undefined ? 1 : c;
  if (step === 0) throw new PyError('ValueError', 'range() arg 3 must not be zero', 0);
  return {
    __range: true, start, stop, step,
    toArray() {
      const out = [];
      if (step > 0) for (let i = start; i < stop; i += step) { out.push(i); if (out.length > 2000000) break; }
      else for (let i = start; i > stop; i += step) { out.push(i); if (out.length > 2000000) break; }
      return out;
    },
    get length() { return Math.max(0, Math.ceil((stop - start) / step)); },
  };
}
function installBuiltins(g) {
  const B = {
    print: (...a) => {
      const kw = takeKw();
      const sep = kw.sep !== undefined ? kw.sep : ' ';
      const end = kw.end !== undefined ? kw.end : '\n';
      INTERP.stdout(a.map(str).join(sep) + end);
      return null;
    },
    len: (v) => {
      if (isStr(v) || isList(v)) return v.length;
      if (isDict(v) || isSet(v)) return v.size;
      if (v && v.__range) return v.length;
      throw new PyError('TypeError', "object of type '" + typeName(v) + "' has no len()", 0);
    },
    range: makeRange,
    int: (v, base) => {
      if (v === undefined) return 0;
      if (isStr(v)) { const n = parseInt(v.trim(), base || 10); if (isNaN(n)) throw new PyError('ValueError', "invalid literal for int() with base " + (base || 10) + ": " + repr(v), 0); return n; }
      if (typeof v === 'boolean') return v ? 1 : 0;
      if (isNum(v)) return Math.trunc(v);
      throw new PyError('TypeError', "int() argument must be a string or a number", 0);
    },
    float: (v) => { if (isStr(v)) { const n = parseFloat(v); if (isNaN(n)) throw new PyError('ValueError', 'could not convert string to float: ' + repr(v), 0); return n; } return Number(v); },
    str: (v) => v === undefined ? '' : str(v),
    repr: (v) => repr(v),
    bool: (v) => pyBool(v),
    abs: (v) => Math.abs(v),
    round: (v, d) => { const f = Math.pow(10, d || 0); const r = Math.round(Math.abs(v) * f) / f * Math.sign(v); return d ? r : Math.round(v); },
    min: (...a) => { const l = a.length === 1 ? iterate(a[0], 0) : a; return l.reduce((m, x) => cmpLt(x, m, 0) ? x : m); },
    max: (...a) => { const l = a.length === 1 ? iterate(a[0], 0) : a; return l.reduce((m, x) => cmpLt(m, x, 0) ? x : m); },
    sum: (v, s) => iterate(v, 0).reduce((t, x) => t + x, s === undefined ? 0 : s),
    list: (v) => v === undefined ? [] : iterate(v, 0),
    tuple: (v) => PyTuple.from(v === undefined ? [] : iterate(v, 0)),
    set: (v) => { const s = new Set(); if (v !== undefined) for (const x of iterate(v, 0)) if (!contains(s, x, 0)) s.add(x); return s; },
    dict: (v) => {
      const kw = takeKw(), d = new Map();
      if (isDict(v)) for (const [k, x] of v) d.set(k, x);
      else if (isList(v)) for (const pair of v) { const p = iterate(pair, 0); d.set(p[0], p[1]); }
      for (const k in kw) d.set(k, kw[k]);
      return d;
    },
    sorted: (v) => { const arr = iterate(v, 0).slice(); sortInPlace(arr, takeKw()); return arr; },
    reversed: (v) => iterate(v, 0).reverse(),
    enumerate: (v, s) => iterate(v, 0).map((x, i) => PyTuple.from([i + (s || 0), x])),
    zip: (...a) => { const ls = a.map(x => iterate(x, 0)); const n = Math.min(...ls.map(l => l.length)); const o = []; for (let i = 0; i < n; i++) o.push(PyTuple.from(ls.map(l => l[i]))); return o; },
    map: (f, v) => iterate(v, 0).map(x => INTERP.callAny(f, [x], 0)),
    filter: (f, v) => iterate(v, 0).filter(x => pyBool(f === null ? x : INTERP.callAny(f, [x], 0))),
    any: (v) => iterate(v, 0).some(pyBool),
    all: (v) => iterate(v, 0).every(pyBool),
    type: (v) => typeName(v),
    isinstance: (v, t) => {
      const names = (isList(t) || t instanceof PyTuple) ? [...t] : [t];
      return names.some(x => {
        const nm = (x instanceof PyClass) ? x.name : (typeof x === 'function' ? (x.pyName || x.name) : str(x));
        if (nm === 'int') return isNum(v) && Number.isInteger(v);
        if (nm === 'float') return isNum(v);
        if (nm === 'str') return isStr(v);
        if (nm === 'bool') return typeof v === 'boolean';
        if (nm === 'list') return isList(v);
        if (nm === 'dict') return isDict(v);
        if (x instanceof PyClass && v instanceof PyObj) {
          let c = v.cls; const seen = [];
          const walk = (cc) => { if (!cc) return false; if (cc === x) return true; return (cc.bases || []).some(walk); };
          return walk(c);
        }
        return typeName(v) === nm;
      });
    },
    ord: (c) => c.charCodeAt(0),
    chr: (n) => String.fromCharCode(n),
    input: () => '',
    hasattr: (o, n) => { try { INTERP.getattr(o, n, 0); return true; } catch (e) { return false; } },
    getattr: (o, n, d) => { try { return INTERP.getattr(o, n, 0); } catch (e) { if (d !== undefined) return d; throw e; } },
    setattr: (o, n, v) => { if (o instanceof PyObj) o.set(n, v); return null; },
    id: (o) => 0,
    divmod: (a, b) => PyTuple.from([Math.floor(a / b), ((a % b) + b) % b]),
    pow: (a, b) => Math.pow(a, b),
    format: (v, spec) => { const m = /^\.(\d+)f$/.exec(spec || ''); return m ? Number(v).toFixed(+m[1]) : str(v); },
  };
  for (const k in B) { B[k].pyName = k; g.set(k, B[k]); }
  return g;
}
let RNGSEED = 123456789;
function rnd() {
  RNGSEED ^= RNGSEED << 13; RNGSEED ^= RNGSEED >>> 17; RNGSEED ^= RNGSEED << 5;
  return ((RNGSEED >>> 0) % 1000000) / 1000000;
}
const MODULES = {
  random: {
    __module: 'random',
    random: () => rnd(),
    randint: (a, b) => Math.floor(rnd() * (b - a + 1)) + a,
    randrange: (a, b, s) => { if (b === undefined) { b = a; a = 0; } s = s || 1; const n = Math.floor((b - a) / s); return a + Math.floor(rnd() * n) * s; },
    uniform: (a, b) => a + rnd() * (b - a),
    choice: (l) => { const arr = iterate(l, 0); if (!arr.length) throw new PyError('IndexError', 'Cannot choose from an empty sequence', 0); return arr[Math.floor(rnd() * arr.length)]; },
    shuffle: (l) => { for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return null; },
    sample: (l, k) => { const a = iterate(l, 0); const o = []; for (let i = 0; i < k && a.length; i++) o.push(a.splice(Math.floor(rnd() * a.length), 1)[0]); return o; },
    seed: (s) => { RNGSEED = (Number(s) || 1) | 0 || 1; return null; },
  },
  math: {
    __module: 'math', pi: Math.PI, e: Math.E, tau: Math.PI * 2, inf: Infinity,
    sqrt: (x) => { if (x < 0) throw new PyError('ValueError', 'math domain error', 0); return Math.sqrt(x); },
    sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos,
    atan: Math.atan, atan2: Math.atan2, hypot: Math.hypot, exp: Math.exp,
    log: (x, b) => b === undefined ? Math.log(x) : Math.log(x) / Math.log(b),
    log10: Math.log10, log2: Math.log2,
    floor: Math.floor, ceil: Math.ceil, trunc: Math.trunc, fabs: Math.abs,
    pow: Math.pow, degrees: (r) => r * 180 / Math.PI, radians: (d) => d * Math.PI / 180,
    copysign: (a, b) => Math.sign(b) * Math.abs(a),
  },
  time: { __module: 'time', time: () => performance.now() / 1000, sleep: () => null },
};
for (const m of Object.values(MODULES)) for (const k in m) if (typeof m[k] === 'function') m[k].pyName = k;

/* ============================================================
   5. ENGINE — 1600x900 world, origin centre, +y up.
      Mirrors the PixelPAD script model: every class owns a
      START block (runs once at spawn) and a LOOP block
      (runs every frame), with `self` bound to the instance.
   ============================================================ */
/* the stage matches the original's camera: 1280x720 with the origin at
   the centre, so x runs -640..640 and y runs -360..360 (y up) */
const WORLD_W = 1280, WORLD_H = 720;
/* thrown to unwind a script whose error has already been reported */
const ABORT = { abort: true };

const Engine = {
  canvas: null, ctx: null,
  running: false, paused: false,
  objects: [], nextId: 1,
  keys: new Set(), keysDown: new Set(), keysUp: new Set(),
  /* x/y are world units; sx/sy are canvas pixels, for drawing the readout */
  mouse: { x: 0, y: 0, sx: 0, sy: 0, over: false, down: false, pressed: false, released: false },
  camera: { x: 0, y: 0, zoom: 1, w: WORLD_W, h: WORLD_H },
  graphics: [], nextGraphicId: 1,
  sprites: new Map(),          // name -> {canvas, cols, rows}
  classes: new Map(),          // name -> {name, start, loop, ast}
  gameObj: null,
  frame: 0, fps: 0, _fpsT: 0, _fpsN: 0,
  debug: { on: false, info: false, inspect: false, grid: false },
  selected: null,
  onError: null, onStop: null,

  /* ---------- sprite registry ---------- */
  loadSprite(name, canvas) { this.sprites.set(name, canvas); },
  spriteHandle(name, rows, cols, line) {
    const img = this.sprites.get(name);
    if (!img) throw new PyError('ValueError', "sprite '" + name + "' not found", line);
    rows = rows || 1; cols = cols || 1;
    /* frame size is read live: an <img> built from a data: URI decodes
       asynchronously, so caching it here would pin the sprite at 0x0 for
       any script that ran before the decode finished */
    return {
      __sprite: true, name, img, rows, cols,
      get fw() { return (img.naturalWidth || img.width || 0) / cols; },
      get fh() { return (img.naturalHeight || img.height || 0) / rows; },
    };
  },

  /* ---------- lifecycle ---------- */
  start(project, out) {
    this.stopLoop();
    this.objects = []; this.nextId = 1; this.frame = 0;
    this.keys.clear(); this.keysDown.clear(); this.keysUp.clear();
    this.selected = null;
    this.camera = { x: 0, y: 0, zoom: 1, w: WORLD_W, h: WORLD_H };
    this.graphics = []; this.nextGraphicId = 1;
    stopAllSounds();
    this.fit();          /* re-fit: a previous run may have resized the camera */
    RNGSEED = (Date.now() & 0x7fffffff) || 1;

    INTERP.reset();
    INTERP.stdout = out;
    this.classes.clear();

    /* compile every class's start/loop up front so syntax errors
       surface before anything runs, exactly like a build step */
    let broken = false;
    for (const cls of project.classes) {
      const rec = { name: cls.name, isGame: cls.isGame };
      rec.startAst = this.compile(cls.start, cls.name + '.start()');
      rec.loopAst = this.compile(cls.loop, cls.name + '.loop()');
      if (!rec.startAst || !rec.loopAst) broken = true;
      this.classes.set(cls.name, rec);
    }
    /* rooms behave exactly like object scripts: set_room() instantiates
       one, so they share the same record shape and constructor table */
    for (const room of (project.rooms || [])) {
      const rec = { name: room.name, isRoom: true };
      rec.startAst = this.compile(room.start, room.name + '.start()');
      rec.loopAst = this.compile(room.loop, room.name + '.loop()');
      if (!rec.startAst || !rec.loopAst) broken = true;
      this.classes.set(room.name, rec);
    }
    if (broken) { this.running = false; return false; }
    /* shared functions run at module level */
    this.running = true;
    for (const fn of project.functions) {
      const ast = this.compile(fn.body, 'functions: ' + fn.name);
      if (!this.execAst(ast, INTERP.globals, 'functions: ' + fn.name)) return false;
    }

    /* expose each class as a constructor in the Python globals */
    for (const [name, rec] of this.classes) {
      if (rec.isGame) continue;
      const cls = new PyClass(name, []);
      cls.__native = (args, kw, line) => this.spawn(name, args[0] || null, line);
      INTERP.globals.set(name, cls);
    }
    installEngineApi(INTERP.globals);

    /* the Game class instance is the root `self`; the original rebinds
       the globals `Game` and `game` to that instance, which is how
       projects hang shared state off `Game.something` */
    const gameRec = [...this.classes.values()].find(c => c.isGame);
    this.gameObj = new PyObj(new PyClass(gameRec ? gameRec.name : 'Game', []));
    this.gameObj.__rec = gameRec;
    INTERP.globals.set('Game', this.gameObj);
    INTERP.globals.set('game', this.gameObj);
    this.gameRec = gameRec;
    this.currentRoom = null;
    this.running = true; this.paused = false;

    /* As in the original: if start() fails the error is logged and the
       loops never run, but the game stays "playing" and keeps drawing. */
    this.startOk = gameRec ? this.execAst(gameRec.startAst, this.scopeFor(this.gameObj), gameRec.name + '.start()') : true;
    this._fpsT = performance.now(); this._fpsN = 0;
    this.raf = requestAnimationFrame(this.tick.bind(this));
    return true;
  },
  compile(src, where) {
    try { return parse(src || ''); }
    catch (e) {
      this.reportError(e, where);
      return null;
    }
  },
  scopeFor(obj) {
    const sc = new Scope(INTERP.globals, INTERP.globals);
    sc.v.set('self', obj);
    return sc;
  },
  /* Runs one block. Returns false if it failed — the error is reported
     here, and ABORT marks a failure already reported further down the
     call chain (e.g. an object's start() raised while being constructed). */
  execAst(ast, scope, where) {
    if (!ast) return false;
    try { INTERP.steps = 0; INTERP.run(ast.body, scope); return true; }
    catch (e) {
      if (e === ABORT) return false;
      if (e instanceof ReturnSig) return true;
      this.reportError(e, where);
      return false;
    }
  },
  reportError(e, where) {
    /* only Python-level errors carry a block and line, matching the
       original's fallback of logging a bare message for anything else */
    const isPy = e instanceof PyError;
    const err = isPy ? e : new PyError('InternalError', e.message || String(e), 0);
    if (this.onError) this.onError(where, err, isPy);
  },
  crash() { this.stopLoop(); if (this.onStop) this.onStop(); },
  stopLoop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  },
  stop() { this.stopLoop(); this.objects = []; this.render(); },

  /* ---------- objects ---------- */
  spawn(clsName, spriteArg, line) {
    const rec = this.classes.get(clsName);
    if (!rec) throw new PyError('NameError', "name '" + clsName + "' is not defined", line);
    const pcls = new PyClass(clsName, []);
    const o = new PyObj(pcls);
    o.__id = this.nextId++;
    o.__rec = rec;
    o.__alive = true;
    o.__anim = null;
    o.__frame = 0; o.__ftime = 0;
    o.attrs.set('x', 0); o.attrs.set('y', 0); o.attrs.set('z', 0);
    o.attrs.set('scaleX', 1); o.attrs.set('scaleY', 1);
    o.attrs.set('angle', 0); o.attrs.set('rotation', 0); o.attrs.set('alpha', 1);
    o.attrs.set('sprite', spriteArg && spriteArg.__sprite ? spriteArg : null);
    o.attrs.set('visible', true);
    o.attrs.set('persistent', false);
    o.attrs.set('skewX', 0); o.attrs.set('skewY', 0);
    attachAliases(o);
    this.objects.push(o);
    /* a failed start() is reported against that class, then unwinds the
       script that was constructing the object */
    if (!this.execAst(rec.startAst, this.scopeFor(o), clsName + '.start()')) throw ABORT;
    return o;
  },
  destroy(o) { if (o instanceof PyObj) o.__alive = false; },
  attachAliases(o) { return attachAliases(o); },
  /* set_room: destroy everything not flagged persistent, then spawn the
     room's own script so its start() runs and its loop() ticks */
  setRoom(name, line) {
    if (!this.classes.has(name)) throw new PyError('NameError', "name '" + name + "' is not defined", line);
    for (const o of this.objects) {
      if (!o.__alive) continue;
      if (pyBool(o.attrs.get('persistent'))) continue;
      o.__alive = false;
    }
    this.currentRoom = name;
    return this.spawn(name, null, line);
  },
  makeText(s) {
    const o = new PyObj(new PyClass('Text', []));
    o.__id = this.nextId++;
    o.__rec = { name: 'Text', startAst: null, loopAst: null };
    o.__alive = true; o.__anim = null; o.__frame = 0; o.__ftime = 0;
    o.__isText = true;
    o.attrs.set('x', 0); o.attrs.set('y', 0); o.attrs.set('z', 0);
    o.attrs.set('scaleX', 1); o.attrs.set('scaleY', 1);
    o.attrs.set('angle', 0); o.attrs.set('rotation', 0); o.attrs.set('alpha', 1);
    o.attrs.set('visible', true); o.attrs.set('persistent', false);
    o.attrs.set('sprite', null);
    o.attrs.set('text', s === undefined || s === null ? '' : str(s));
    o.attrs.set('fontSize', 30);
    o.attrs.set('color', '#FFFFFF');
    o.attrs.set('skewX', 0); o.attrs.set('skewY', 0);
    attachAliases(o);
    this.objects.push(o);
    return o;
  },
  objectsOf(name) { return this.objects.filter(o => o.__alive && o.__rec && o.__rec.name === name); },
  bbox(o) {
    const sp = o.attrs.get('sprite'), an = o.__anim;
    const s = an ? an.sprite : sp;
    const w = s ? s.fw : 40, h = s ? s.fh : 40;
    const sx = Math.abs(Number(o.attrs.get('scaleX')) || 1), sy = Math.abs(Number(o.attrs.get('scaleY')) || 1);
    const x = Number(o.attrs.get('x')) || 0, y = Number(o.attrs.get('y')) || 0;
    return { l: x - w * sx / 2, r: x + w * sx / 2, b: y - h * sy / 2, t: y + h * sy / 2, w: w * sx, h: h * sy };
  },
  overlap(a, b) {
    const A = this.bbox(a), B = this.bbox(b);
    return A.l < B.r && A.r > B.l && A.b < B.t && A.t > B.b;
  },

  /* ---------- frame ---------- */
  tick(now) {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.tick.bind(this));
    this._fpsN++;
    if (now - this._fpsT >= 500) { this.fps = Math.round(this._fpsN * 1000 / (now - this._fpsT)); this._fpsT = now; this._fpsN = 0; }

    /* start() failed: the original keeps ticking and drawing but never
       runs a loop, so the error is reported once rather than per frame */
    if (!this.paused && this.startOk) {
      this.frame++;
      let ok = true;
      if (this.gameRec && this.gameRec.loopAst)
        ok = this.execAst(this.gameRec.loopAst, this.scopeFor(this.gameObj), this.gameRec.name + '.loop()');
      /* snapshot: objects spawned this frame start looping next frame */
      if (ok) {
        for (const o of this.objects.slice()) {
          if (!o.__alive || !o.__rec.loopAst) continue;
          /* the original runs every object's loop inside one Python call,
             so the first failure skips the rest of the objects this frame */
          if (!this.execAst(o.__rec.loopAst, this.scopeFor(o), o.__rec.name + '.loop()')) break;
        }
      }
      /* animation advance + reap */
      for (const o of this.objects) {
        const an = o.__anim;
        if (an && an.fps > 0) {
          o.__ftime += an.fps / 60;
          const span = an.end - an.start + 1;
          if (o.__ftime >= 1) { o.__ftime -= 1; o.__frame = (o.__frame + 1) % span; }
        }
      }
      const before = this.objects.length;
      this.objects = this.objects.filter(o => {
        if (!o.__alive) return false;
        const x = Number(o.attrs.get('x')) || 0, y = Number(o.attrs.get('y')) || 0;
        return Math.abs(x) < 20000 && Math.abs(y) < 20000;   /* runaway guard */
      });
      this.keysDown.clear(); this.keysUp.clear();
      this.mouse.pressed = false; this.mouse.released = false;
    }
    this.render();
  },

  /* ---------- render ---------- */
  fit() {
    const host = document.getElementById('canvasContainer');
    const panel = document.getElementById('debugPanel');
    const ph = this.debug.on ? 30 : 0;
    const availW = host.clientWidth, availH = host.clientHeight - ph;
    if (availW <= 0 || availH <= 0) return;
    const cw = this.camera.w, ch = this.camera.h;
    let w = availW, h = w * ch / cw;
    if (h > availH) { h = availH; w = h * cw / ch; }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.style.width = Math.floor(w) + 'px';
    this.canvas.style.height = Math.floor(h) + 'px';
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    panel.style.width = Math.floor(w) + 'px';
    this.scale = (w * dpr) / cw;
  },
  w2s(x, y) {
    const c = this.camera, k = this.scale * c.zoom;
    return [this.canvas.width / 2 + (x - c.x) * k, this.canvas.height / 2 - (y - c.y) * k];
  },
  s2w(px, py) {
    const r = this.canvas.getBoundingClientRect();
    if (!r.width || !r.height) return [this.camera.x, this.camera.y];
    const c = this.camera;
    const x = c.x + ((px - r.left) / r.width - 0.5) * c.w / c.zoom;
    const y = c.y - ((py - r.top) / r.height - 0.5) * c.h / c.zoom;
    return [x, y];
  },
  render() {
    const c = this.ctx;
    if (!c) return;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = '#000';
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const order = this.objects.slice().sort((a, b) => (Number(a.attrs.get('z')) || 0) - (Number(b.attrs.get('z')) || 0) || a.__id - b.__id);
    for (const o of order) {
      if (!pyBool(o.attrs.get('visible'))) continue;
      const an = o.__anim, sp = an ? an.sprite : o.attrs.get('sprite');
      const x = Number(o.attrs.get('x')) || 0, y = Number(o.attrs.get('y')) || 0;
      const sx = Number(o.attrs.get('scaleX')); const sy = Number(o.attrs.get('scaleY'));
      const rot = (Number(o.attrs.get('angle')) || 0) * Math.PI / 180;
      const alpha = o.attrs.get('alpha');
      const [px, py] = this.w2s(x, y);
      if (o.__isText) {
        const fs = (Number(o.attrs.get('fontSize')) || 30) * this.scale;
        c.save();
        c.globalAlpha = Math.max(0, Math.min(1, isNum(alpha) ? alpha : 1));
        c.translate(px, py);
        if (rot) c.rotate(-rot);
        c.font = Math.max(1, fs) + 'px Rubik,"Segoe UI",system-ui,sans-serif';
        c.textAlign = 'left'; c.textBaseline = 'middle';
        c.fillStyle = str(o.attrs.get('color') || '#FFFFFF');
        c.fillText(str(o.attrs.get('text')), 0, 0);
        c.restore();
        continue;
      }
      if (!sp || !sp.__sprite) continue;
      let fi = 0;
      if (an) fi = an.start + (o.__frame % (an.end - an.start + 1));
      const col = fi % sp.cols, row = Math.floor(fi / sp.cols) % sp.rows;
      c.save();
      c.globalAlpha = Math.max(0, Math.min(1, isNum(alpha) ? alpha : 1));
      c.translate(px, py);
      if (rot) c.rotate(-rot);
      c.scale((isNum(sx) ? sx : 1) * this.scale, (isNum(sy) ? sy : 1) * this.scale);
      c.imageSmoothingEnabled = true;
      try {
        c.drawImage(sp.img, col * sp.fw, row * sp.fh, sp.fw, sp.fh, -sp.fw / 2, -sp.fh / 2, sp.fw, sp.fh);
      } catch (e) { /* zero-size frame */ }
      c.restore();
    }
    /* drawRect / drawLine graphics sit above the sprites */
    for (const gr of this.graphics) {
      c.save();
      c.lineWidth = Math.max(1, gr.thickness * this.scale * this.camera.zoom);
      if (gr.kind === 'rect') {
        const [x1, y1] = this.w2s(gr.x1, gr.y1), [x2, y2] = this.w2s(gr.x2, gr.y2);
        if (gr.fill !== null) { c.fillStyle = gr.fill; c.fillRect(x1, y1, x2 - x1, y2 - y1); }
        if (gr.line !== null && gr.thickness > 0) { c.strokeStyle = gr.line; c.strokeRect(x1, y1, x2 - x1, y2 - y1); }
      } else {
        const [x1, y1] = this.w2s(gr.x1, gr.y1), [x2, y2] = this.w2s(gr.x2, gr.y2);
        c.strokeStyle = gr.line; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
      }
      c.restore();
    }
    if (this.debug.on) this.renderDebug();
  },
  renderDebug() {
    const c = this.ctx, S = this.scale;
    if (this.debug.grid) {
      const fs = Math.max(9, Math.round(this.canvas.height / 40));
      c.save();
      c.strokeStyle = 'rgba(23,162,184,.35)'; c.lineWidth = 1;
      c.font = fs + 'px Consolas,monospace';
      c.fillStyle = 'rgba(23,162,184,.9)';
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
      for (let gx = -640; gx <= 640; gx += 160) {
        const [px] = this.w2s(gx, 0);
        c.beginPath(); c.moveTo(px, 0); c.lineTo(px, this.canvas.height); c.stroke();
        if (gx !== 0) c.fillText(String(gx), px + 3, fs + 4);
      }
      for (let gy = -360; gy <= 360; gy += 120) {
        const [, py] = this.w2s(0, gy);
        c.beginPath(); c.moveTo(0, py); c.lineTo(this.canvas.width, py); c.stroke();
        if (gy !== 0) c.fillText(String(gy), 4, py - 4);
      }
      c.strokeStyle = 'rgba(255,255,255,.6)';
      const [cx, cy] = this.w2s(0, 0);
      c.beginPath(); c.moveTo(cx, 0); c.lineTo(cx, this.canvas.height); c.moveTo(0, cy); c.lineTo(this.canvas.width, cy); c.stroke();

      /* live readout of the world coordinate under the pointer */
      if (this.mouse.over) {
        const mx = Math.round(this.mouse.x), my = Math.round(this.mouse.y);
        const px = this.mouse.sx, py = this.mouse.sy;
        c.strokeStyle = 'rgba(255,209,0,.9)'; c.lineWidth = 1;
        c.beginPath();
        c.moveTo(px - fs, py); c.lineTo(px + fs, py);
        c.moveTo(px, py - fs); c.lineTo(px, py + fs);
        c.stroke();

        const label = mx + ', ' + my;
        c.font = 'bold ' + fs + 'px Consolas,monospace';
        const tw = c.measureText(label).width;
        const bw = tw + fs, bh = fs * 1.6;
        /* keep the box inside the stage when the pointer nears an edge */
        let bx = px + fs * .7, by = py - bh - fs * .4;
        if (bx + bw > this.canvas.width) bx = px - bw - fs * .7;
        if (by < 0) by = py + fs * .5;
        c.fillStyle = 'rgba(47,28,64,.9)';
        c.fillRect(bx, by, bw, bh);
        c.strokeStyle = 'rgba(255,209,0,.9)';
        c.strokeRect(bx, by, bw, bh);
        c.fillStyle = '#FFD100';
        c.textBaseline = 'middle';
        c.fillText(label, bx + fs / 2, by + bh / 2);
      }
      c.restore();
    }
    if (this.debug.inspect) {
      c.save();
      c.lineWidth = 2; c.strokeStyle = 'rgba(255,209,0,.9)';
      for (const o of this.objects) {
        const b = this.bbox(o);
        const [l, t] = this.w2s(b.l, b.t);
        c.strokeRect(l, t, b.w * this.scale, b.h * this.scale);
      }
      if (this.selected && this.selected.__alive) {
        const b = this.bbox(this.selected);
        const [l, t] = this.w2s(b.l, b.t);
        c.strokeStyle = '#17A2B8'; c.lineWidth = 3;
        c.strokeRect(l, t, b.w * this.scale, b.h * this.scale);
      }
      c.restore();
    }
    if (this.debug.info) {
      const lines = ['fps ' + this.fps, 'frame ' + this.frame, 'objects ' + this.objects.length];
      if (this.selected && this.selected.__alive) {
        const o = this.selected;
        lines.push('— ' + o.__rec.name + ' #' + o.__id);
        for (const [k, v] of o.attrs) {
          if (k === 'sprite') { lines.push('  sprite = ' + (v ? v.name : 'None')); continue; }
          lines.push('  ' + k + ' = ' + (isNum(v) ? fmtNum(Math.round(v * 100) / 100) : str(v)).slice(0, 28));
        }
      }
      c.save();
      const fs = Math.max(11, Math.round(this.canvas.height / 42));
      c.font = fs + 'px Consolas,monospace';
      const wmax = Math.max(...lines.map(l => c.measureText(l).width)) + 16;
      c.fillStyle = 'rgba(47,28,64,.82)';
      c.fillRect(8, 8, wmax, lines.length * (fs + 3) + 12);
      c.fillStyle = '#EDE7F6'; c.textBaseline = 'top';
      lines.forEach((l, i) => c.fillText(l, 16, 14 + i * (fs + 3)));
      c.restore();
    }
  },
};

/* ---------- the PixelPAD standard library ---------- */
function installEngineApi(g) {
  const E = Engine;
  const need = (o, what, line) => {
    if (!(o instanceof PyObj)) throw new PyError('TypeError', what + ' expected an object', line);
    return o;
  };
  const API = {
    sprite: (name, rows, cols) => {
      if (!isStr(name)) throw new PyError('TypeError', 'sprite() expects a file name', 0);
      return E.spriteHandle(name, rows, cols, 0);
    },
    animation: (sp, fps, start, end) => {
      if (!sp || !sp.__sprite) throw new PyError('TypeError', 'animation() expects a sprite', 0);
      const total = sp.rows * sp.cols;
      return {
        __anim: true, sprite: sp,
        fps: fps === undefined ? 10 : fps,
        start: start === undefined ? 0 : Math.max(0, Math.trunc(start)),
        end: end === undefined ? total - 1 : Math.min(total - 1, Math.trunc(end)),
      };
    },
    set_animation: (o, an) => {
      need(o, 'set_animation()', 0);
      if (an && an.__sprite) an = API.animation(an, 0, 0, 0);
      if (an && !an.__anim) throw new PyError('TypeError', 'set_animation() expects an animation', 0);
      o.__anim = an; o.__frame = 0; o.__ftime = 0;
      if (an) o.attrs.set('sprite', an.sprite);
      return null;
    },
    set_sprite: (o, sp) => { need(o, 'set_sprite()', 0); o.__anim = null; o.attrs.set('sprite', sp); return null; },
    destroy: (o) => { E.destroy(o); return null; },
    get_collision: (o, clsName) => {
      need(o, 'get_collision()', 0);
      for (const other of E.objects) {
        if (other === o || !other.__alive) continue;
        if (clsName !== undefined && clsName !== null && other.__rec.name !== str(clsName)) continue;
        if (E.overlap(o, other)) return other;
      }
      return null;
    },
    get_collisions: (o, clsName) => {
      need(o, 'get_collisions()', 0);
      return E.objects.filter(other => other !== o && other.__alive &&
        (clsName === undefined || clsName === null || other.__rec.name === str(clsName)) && E.overlap(o, other));
    },
    get_objects: (clsName) => clsName === undefined ? E.objects.filter(o => o.__alive) : E.objectsOf(str(clsName)),
    count_objects: (clsName) => (clsName === undefined ? E.objects.filter(o => o.__alive) : E.objectsOf(str(clsName))).length,
    distance: (a, b) => {
      need(a, 'distance()', 0); need(b, 'distance()', 0);
      const dx = (a.attrs.get('x') || 0) - (b.attrs.get('x') || 0);
      const dy = (a.attrs.get('y') || 0) - (b.attrs.get('y') || 0);
      return Math.hypot(dx, dy);
    },
    key_is_pressed: (k) => E.keys.has(normKey(k)),
    key_was_pressed: (k) => E.keysDown.has(normKey(k)),
    key_was_released: (k) => E.keysUp.has(normKey(k)),
    mouse_x: () => E.mouse.x,
    mouse_y: () => E.mouse.y,
    mouse_is_pressed: () => E.mouse.down,
    mouse_was_pressed: () => E.mouse.pressed,
    /* sound() hands back a handle; play_sound takes a handle or a name */
    sound: (name) => ({ __sound: true, name: str(name) }),
    play_sound: (what) => { playSound(what, false); return null; },
    set_room: (name) => E.setRoom(str(name), 0),
    get_room: () => E.currentRoom,
    text: (s) => E.makeText(s),
    new_text: (s) => E.makeText(s),
    screen_width: () => WORLD_W,
    screen_height: () => WORLD_H,
    frame_count: () => E.frame,
    clear_console: () => { document.getElementById('output').textContent = ''; return null; },
    stop_game: () => { E.crash(); return null; },

    /* --- object construction by name --- */
    new_object: (clsName) => E.spawn(str(clsName), null, 0),

    /* --- collisions --- */
    get_collision_list: (o, t) => API.get_collisions(o, t),
    collision_check_all: (o, t) => API.get_collisions(o, t),

    /* --- measurements --- */
    get_width: (o) => { need(o, 'get_width()', 0); return E.bbox(o).w; },
    get_height: (o) => { need(o, 'get_height()', 0); return E.bbox(o).h; },
    get_bounds: (o) => {
      need(o, 'get_bounds()', 0);
      const b = E.bbox(o), d = new Map();
      d.set('topLeft', PyTuple.from([b.l, b.t]));
      d.set('topRight', PyTuple.from([b.r, b.t]));
      d.set('bottomLeft', PyTuple.from([b.l, b.b]));
      d.set('bottomRight', PyTuple.from([b.r, b.b]));
      return d;
    },

    /* --- camera --- */
    get_camera_x: () => E.camera.x,
    get_camera_y: () => E.camera.y,
    set_camera: (x, y) => { E.camera.x = Number(x) || 0; E.camera.y = Number(y) || 0; return E.camera.x; },
    move_camera: (dx, dy) => { E.camera.x += Number(dx) || 0; E.camera.y += Number(dy) || 0; return E.camera.x; },
    zoom_camera: (z) => { E.camera.zoom = Math.max(0.05, Number(z) || 1); return E.camera.zoom; },
    set_camera_size: (w, h) => {
      E.camera.w = Math.max(1, Number(w) || WORLD_W);
      E.camera.h = Math.max(1, Number(h) || WORLD_H);
      E.fit();
      const d = new Map();
      d.set('camera_width', E.camera.w); d.set('camera_height', E.camera.h);
      return d;
    },

    /* --- sound control --- */
    loop_sound: (s) => { playSound(s, true); return s; },
    stop_sound: (s) => { stopSound(s); return null; },
    set_volume: (s, v) => { setSoundVolume(s, Number(v)); return null; },
    sound_playing: (s) => isSoundPlaying(s),
    get_sounds_playing: () => [...ACTIVE_SOUNDS.keys()].map(n => ({ __sound: true, name: n })),

    /* --- room object list --- */
    get_room_objects: () => E.objects.filter(o => o.__alive),
    add_room_object: (o) => { if (o instanceof PyObj && !E.objects.includes(o)) E.objects.push(o); return o; },
    clean_room_objects: () => { E.objects = E.objects.filter(o => o.__alive); return null; },

    /* --- input extras --- */
    mouse_was_released: () => E.mouse.released,
    set_mouse_x: (x) => { E.mouse.x = Number(x) || 0; return E.mouse.x; },
    set_mouse_y: (y) => { E.mouse.y = Number(y) || 0; return E.mouse.y; },
    simulate_key_down: (k) => { const n = normKey(k); if (!E.keys.has(n)) E.keysDown.add(n); E.keys.add(n); return null; },
    simulate_key_up: (k) => { const n = normKey(k); E.keys.delete(n); E.keysUp.add(n); return null; },

    /* --- misc --- */
    get_fps: () => E.fps,
    consolelog: (o) => { INTERP.stdout(str(o) + '\n'); return o; },
    wait: () => null,

    /* --- graphics --- */
    drawRect: (x1, y1, x2, y2, thickness, lineColor, fillColor) => {
      const g2 = {
        id: E.nextGraphicId++, kind: 'rect',
        x1: num(x1, 0), y1: num(y1, 0), x2: num(x2, 100), y2: num(y2, 100),
        thickness: num(thickness, 2), line: hexColor(lineColor, 0x000000), fill: hexColor(fillColor, 0x228B22),
      };
      E.graphics.push(g2); return g2.id;
    },
    drawLine: (x1, y1, x2, y2, thickness, lineColor) => {
      const g2 = {
        id: E.nextGraphicId++, kind: 'line',
        x1: num(x1, 0), y1: num(y1, 0), x2: num(x2, 100), y2: num(y2, 100),
        thickness: num(thickness, 2), line: hexColor(lineColor, 0x228B22), fill: null,
      };
      E.graphics.push(g2); return g2.id;
    },
    destroy_graphic: (id) => { E.graphics = E.graphics.filter(x => x.id !== id); return null; },

    /* --- accepted but inert offline --- */
    add_filter: () => null,
    remove_filter: () => null,
    vibrate_phone: () => null,

    /* --- saved data (per browser) --- */
    data_save: (k, v) => { try { localStorage.setItem(DATA_PREFIX + str(k), JSON.stringify(toPlain(v))); } catch (e) {} return null; },
    data_load: (k, dflt) => {
      try {
        const raw = localStorage.getItem(DATA_PREFIX + str(k));
        if (raw === null) return dflt === undefined ? null : dflt;
        return fromPlain(JSON.parse(raw));
      } catch (e) { return dflt === undefined ? null : dflt; }
    },
    data_clear: () => {
      try {
        for (const k of Object.keys(localStorage)) if (k.startsWith(DATA_PREFIX)) localStorage.removeItem(k);
      } catch (e) {}
      return null;
    },
  };

  /* multiplayer needs a server, so fail loudly instead of NameError */
  for (const name of ['init_multiplayer', 'create_server', 'join_server', 'inspect_server', 'get_server_event',
                      'send_message', 'get_messages', 'get_player_count', 'leave_server', 'get_servers']) {
    API[name] = () => { throw new PyError('RuntimeError', name + '() needs a server and is not available offline', 0); };
  }
  /* touch input: report "nothing touched" rather than blowing up */
  API.get_touches = () => [];
  API.touch_start = () => [];
  API.touch_end = () => [];
  API.touch_move = () => [];
  API.editor_open = () => null;

  /* the original exposes several spellings of the same call */
  const ALIASES = {
    object_new: 'new_object',
    Sprite: 'sprite', new_sprite: 'sprite', sprite_new: 'sprite', image: 'sprite',
    new_animation: 'animation', animation_new: 'animation',
    animation_set: 'set_animation',
    collision_check: 'get_collision',
    new_sound: 'sound', sound_new: 'sound',
    sound_play: 'play_sound', sound_loop: 'loop_sound', sound_stop: 'stop_sound', sound_volume: 'set_volume',
    room_set: 'set_room', room_get: 'get_room',
    camera_x: 'get_camera_x', camera_y: 'get_camera_y',
    camera_set: 'set_camera', camera_move: 'move_camera',
    destroyGraphic: 'destroy_graphic',
    draw_rect: 'drawRect', draw_line: 'drawLine',
  };
  for (const alias in ALIASES) if (API[ALIASES[alias]]) API[alias] = API[ALIASES[alias]];

  for (const k in API) { API[k].pyName = k; g.set(k, API[k]); }
  return API;
}
const num = (v, d) => (v === undefined || v === null || !isFinite(Number(v))) ? d : Number(v);
function hexColor(v, dflt) {
  if (v === null) return null;
  let n = (v === undefined) ? dflt : v;
  if (isStr(n)) return n;                       /* allow "#ff0000" too */
  n = Math.max(0, Math.trunc(Number(n) || 0));
  return '#' + n.toString(16).padStart(6, '0');
}
/* convert between Python values and JSON for data_save / data_load */
function toPlain(v) {
  if (isList(v)) return v.map(toPlain);
  if (isDict(v)) { const o = {}; for (const [k, x] of v) o[str(k)] = toPlain(x); return o; }
  if (isSet(v)) return [...v].map(toPlain);
  if (v instanceof PyObj) return null;
  return v === undefined ? null : v;
}
function fromPlain(v) {
  if (Array.isArray(v)) return v.map(fromPlain);
  if (v && typeof v === 'object') { const d = new Map(); for (const k in v) d.set(k, fromPlain(v[k])); return d; }
  return v;
}
const DATA_PREFIX = 'pixelpad.offline.data.';
/* The original exposes several spellings of the same object property, plus
   two read-only ones. Writes mirror through __hooks; reads that are not
   stored attributes resolve through __computed. */
const PROP_ALIASES = [
  ['angle', 'rotation'],
  ['scaleX', 'scale_x'],
  ['scaleY', 'scale_y'],
  ['skewX', 'skew_x'],
  ['skewY', 'skew_y'],
  ['sprite', 'image'],
];
function attachAliases(o) {
  const hooks = {};
  for (const [a, b] of PROP_ALIASES) {
    hooks[a] = v => o.attrs.set(b, v);
    hooks[b] = v => o.attrs.set(a, v);
    if (o.attrs.has(a) && !o.attrs.has(b)) o.attrs.set(b, o.attrs.get(a));
  }
  o.__hooks = hooks;
  o.__computed = {
    sprite_width: () => Engine.bbox(o).w,
    sprite_height: () => Engine.bbox(o).h,
  };
  return o;
}
const KEYMAP = { ' ': 'space', 'space': 'space', 'arrowleft': 'left', 'arrowright': 'right', 'arrowup': 'up', 'arrowdown': 'down', 'escape': 'esc', 'enter': 'enter' };
function normKey(k) {
  const s = String(k).toLowerCase();
  return KEYMAP[s] || s;
}
const SOUNDS = new Map();

/* Playback bookkeeping so loop_sound / stop_sound / set_volume /
   sound_playing all work against the same handle. */
const ACTIVE_SOUNDS = new Map();          /* name -> [{src, gain}] */
const SOUND_VOLUME = new Map();           /* name -> 0..1 */
const soundName = (s) => (s && s.__sound) ? s.name : str(s);

function playSound(what, loop) {
  const name = soundName(what);
  const c = audioCtx(); if (!c) return null;
  const vol = SOUND_VOLUME.has(name) ? SOUND_VOLUME.get(name) : 1;
  const entry = SOUNDS.get(name);
  if (entry && entry.buffer) {
    const src = c.createBufferSource(), gain = c.createGain();
    src.buffer = entry.buffer; src.loop = !!loop; gain.gain.value = vol;
    src.connect(gain); gain.connect(c.destination); src.start();
    const list = ACTIVE_SOUNDS.get(name) || [];
    const rec = { src, gain };
    list.push(rec); ACTIVE_SOUNDS.set(name, list);
    src.onended = () => {
      const l = ACTIVE_SOUNDS.get(name);
      if (!l) return;
      const i = l.indexOf(rec);
      if (i >= 0) l.splice(i, 1);
      if (!l.length) ACTIVE_SOUNDS.delete(name);
    };
    return null;
  }
  /* synthesised fallback: short, so looping it is not worth tracking */
  (SYNTH[name.replace(/\.\w+$/, '')] || SYNTH.blip)(c);
  return null;
}
function stopSound(what) {
  const name = soundName(what);
  for (const rec of ACTIVE_SOUNDS.get(name) || []) { try { rec.src.stop(); } catch (e) {} }
  ACTIVE_SOUNDS.delete(name);
}
function stopAllSounds() {
  for (const list of ACTIVE_SOUNDS.values())
    for (const rec of list) { try { rec.src.stop(); } catch (e) {} }
  ACTIVE_SOUNDS.clear();
}
function setSoundVolume(what, v) {
  const name = soundName(what);
  const vol = Math.max(0, Math.min(1, isFinite(v) ? v : 1));
  SOUND_VOLUME.set(name, vol);
  for (const rec of ACTIVE_SOUNDS.get(name) || []) rec.gain.gain.value = vol;
}
function isSoundPlaying(what) {
  const list = ACTIVE_SOUNDS.get(soundName(what));
  return !!(list && list.length);
}
