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
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
  URL.revokeObjectURL(img.src);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), "image/webp", quality));
  if (!blob) throw new Error("Could not compress that image.");
  return { blob, mime: "image/webp", name: baseName(file) + ".webp" };
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
