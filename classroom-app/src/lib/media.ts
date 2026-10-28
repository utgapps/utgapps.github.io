import { Mp3Encoder } from "@breezystack/lamejs";

export type Compressed = { blob: Blob; mime: string; name: string };

function baseName(file: File) { return file.name.replace(/\.[^.]+$/, "") || "upload"; }

// Images -> WebP, downscaled so the longest side <= maxDim.
export async function compressImage(file: File, maxDim = 1280, quality = 0.82): Promise<Compressed> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const el = new Image();
    el.onload = () => res(el);
    el.onerror = () => rej(new Error("Could not read that image."));
    el.src = URL.createObjectURL(file);
  });
  // An SVG with no width or height of its own reports 0 x 0, which would come
  // out as a single pixel. It gets a size a game can use instead.
  const iw = img.width || 512, ih = img.height || 512;
  const scale = Math.min(1, maxDim / Math.max(iw, ih));
  const w = Math.max(1, Math.round(iw * scale));
  const h = Math.max(1, Math.round(ih * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
  URL.revokeObjectURL(img.src);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), "image/webp", quality));
  if (!blob) throw new Error("Could not compress that image.");
  return { blob, mime: "image/webp", name: baseName(file) + ".webp" };
}

// A picture for a game. A PNG that is already game-sized goes up untouched:
// it is most likely pixel art made somewhere else, and lossy WebP softens
// every hard edge in it - the same reason a drawing from the Pixel Art Maker
// stays a PNG. Anything else is compressed as above.
export async function compressGameImage(file: File, maxDim = 1280, maxBytes = 1_500_000): Promise<Compressed> {
  if (file.type === "image/png" && file.size <= maxBytes) {
    const size = await new Promise<{ w: number; h: number } | null>((res) => {
      const el = new Image();
      el.onload = () => { res({ w: el.naturalWidth, h: el.naturalHeight }); URL.revokeObjectURL(el.src); };
      el.onerror = () => { res(null); URL.revokeObjectURL(el.src); };
      el.src = URL.createObjectURL(file);
    });
    if (size && Math.max(size.w, size.h) <= maxDim) {
      return { blob: file, mime: "image/png", name: baseName(file) + ".png" };
    }
  }
  return compressImage(file, maxDim);
}

// Audio -> mono 24kHz MP3 (re-encoded in the browser; big size reduction).
export async function compressAudio(file: File, kbps = 64): Promise<Compressed> {
  const arrayBuf = await file.arrayBuffer();
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  let decoded: AudioBuffer;
  try { decoded = await ctx.decodeAudioData(arrayBuf); } finally { ctx.close(); }
  const rate = 24000;
  const frames = Math.max(1, Math.ceil(decoded.duration * rate));
  const offline = new OfflineAudioContext(1, frames, rate); // 1 channel -> downmix to mono
  const src = offline.createBufferSource();
  src.buffer = decoded; src.connect(offline.destination); src.start();
  const rendered = await offline.startRendering();
  const mono = rendered.getChannelData(0);
  const pcm = new Int16Array(mono.length);
  for (let i = 0; i < mono.length; i++) { const s = Math.max(-1, Math.min(1, mono[i])); pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff; }
  const enc = new Mp3Encoder(1, rate, kbps);
  const chunks: Uint8Array[] = [];
  const block = 1152;
  for (let i = 0; i < pcm.length; i += block) {
    const out = enc.encodeBuffer(pcm.subarray(i, i + block));
    if (out.length) chunks.push(new Uint8Array(out));
  }
  const end = enc.flush();
  if (end.length) chunks.push(new Uint8Array(end));
  return { blob: new Blob(chunks as BlobPart[], { type: "audio/mpeg" }), mime: "audio/mpeg", name: baseName(file) + ".mp3" };
}
