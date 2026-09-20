// @ts-nocheck - see tools/build-engine.mjs. The two functions below are a
// verbatim copy; answering a type complaint about one would mean editing it.
/* GENERATED - do not edit. Run `node tools/build-engine.mjs` instead.
 *
 * From vendor/pixelpad-offline.html: a PCM WAV writer and the renderer that
 * turns one of the engine's synthesised sounds into samples. The engine
 * plays blip and crunch as WebAudio nodes and never makes a file of
 * either, so this is what lets the Sounds pane play one.
 */
function renderSynth(kind, rate) {
  rate = rate || 22050;
  const n = Math.floor(rate * (kind === 'crunch' ? 0.18 : 0.15));
  const d = new Float32Array(n);
  if (kind === 'crunch') {
    let seed = 1;
    for (let i = 0; i < n; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      d[i] = ((seed / 0x3fffffff) - 1) * Math.pow(1 - i / n, 2.5) * 0.5;
    }
  } else {
    for (let i = 0; i < n; i++) {
      const t = i / rate, f = 660 * Math.pow(220 / 660, Math.min(1, t / 0.12));
      d[i] = (Math.sin(2 * Math.PI * f * t) > 0 ? 0.18 : -0.18) * Math.pow(1 - i / n, 2);
    }
  }
  return { data: d, rate };
}
function wavDataUri(pcm) {
  const n = pcm.data.length, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const tag = (off, s) => { for (let i = 0; i < s.length; i++) v.setUint8(off + i, s.charCodeAt(i)); };
  tag(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); tag(8, 'WAVE');
  tag(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, pcm.rate, true); v.setUint32(28, pcm.rate * 2, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  tag(36, 'data'); v.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) v.setInt16(44 + i * 2, Math.max(-1, Math.min(1, pcm.data[i])) * 32767, true);
  let bin = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return 'data:audio/wav;base64,' + btoa(bin);
}

/** The sounds the engine makes itself, in the order it declares them.
 *  They need no file and cannot be deleted. */
export const BUILT_IN_SOUNDS: string[] = ["crunch","blip"];

/** One of those as something an <audio> element can play, exactly as the
 *  offline IDE's own soundPreviewSrc makes it. Empty for anything else. */
export function synthWav(name: string): string {
  return BUILT_IN_SOUNDS.includes(name) ? wavDataUri(renderSynth(name)) : "";
}
