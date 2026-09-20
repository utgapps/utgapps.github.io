/* A .zip, written here rather than fetched from a package.
 *
 * The game editor's "Export art" hands back every picture and every sound in a
 * project as one file, because a child who wants their monster for a poster,
 * or a teacher collecting a term's work, should not be right-clicking eleven
 * signed URLs one at a time.
 *
 * Everything is STORED, not deflated. Every file that goes into one of these
 * is a PNG, a WebP or an MP3 - all three are already compressed, and deflating
 * them again buys a fraction of a percent for a compressor this file would
 * otherwise have to contain. A stored zip opens in Windows Explorer, in macOS
 * Archive Utility and in every unzip tool, which is the whole requirement.
 *
 * The format is PKZIP's, little-endian throughout: a local header and the
 * bytes for each file, then a central directory repeating those headers, then
 * a twenty-two byte end record pointing at it.
 */

/* Plain bytes, not a view onto a buffer that might be shared: a Blob will
   only take the former, and everything here comes from an ArrayBuffer of
   its own anyway. */
type Bytes = Uint8Array<ArrayBuffer>;

export type ZipEntry = { name: string; bytes: Bytes };

/* CRC-32, which every entry carries twice - once beside its bytes and once in
   the central directory. Built once on first use rather than at module load,
   because a student who never presses Export should not pay for it. */
let TABLE: Uint32Array | null = null;
function table(): Uint32Array {
  if (TABLE) return TABLE;
  const made = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    made[n] = c >>> 0;
  }
  TABLE = made;
  return made;
}

function crc32(bytes: Bytes): number {
  const t = table();
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) c = t[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

/* MS-DOS date and time, which is what a zip records and all it can record:
   two-second resolution, and no year before 1980. A file that claimed 1970
   would show up in a listing as a date no zip tool believes. */
function dosStamp(when: Date): { time: number; date: number } {
  const year = Math.max(1980, when.getFullYear());
  return {
    time: (when.getHours() << 11) | (when.getMinutes() << 5) | (when.getSeconds() >> 1),
    date: ((year - 1980) << 9) | ((when.getMonth() + 1) << 5) | when.getDate(),
  };
}

/** Every entry, zipped, in the order given. Names are written as UTF-8 with
 *  the language-encoding flag set, so an accented file name arrives intact. */
export function zipStore(entries: ZipEntry[], when = new Date()): Blob {
  const stamp = dosStamp(when);
  const encoder = new TextEncoder();
  const parts: Bytes[] = [];
  const directory: Bytes[] = [];
  let offset = 0;

  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const crc = crc32(entry.bytes);
    const size = entry.bytes.length;

    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034B50, true);   // local file header
    lv.setUint16(4, 20, true);           // version needed: 2.0
    lv.setUint16(6, 0x0800, true);       // flags: the name is UTF-8
    lv.setUint16(8, 0, true);            // method: stored
    lv.setUint16(10, stamp.time, true);
    lv.setUint16(12, stamp.date, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);        // compressed size
    lv.setUint32(22, size, true);        // uncompressed size
    lv.setUint16(26, name.length, true);
    lv.setUint16(28, 0, true);           // no extra field
    local.set(name, 30);

    parts.push(local, entry.bytes);

    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014B50, true);   // central directory header
    cv.setUint16(4, 20, true);           // version made by
    cv.setUint16(6, 20, true);           // version needed
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, stamp.time, true);
    cv.setUint16(14, stamp.date, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, name.length, true);
    cv.setUint16(30, 0, true);           // extra
    cv.setUint16(32, 0, true);           // comment
    cv.setUint16(34, 0, true);           // disk this entry starts on
    cv.setUint16(36, 0, true);           // internal attributes
    cv.setUint32(38, 0, true);           // external attributes
    cv.setUint32(42, offset, true);      // where the local header is
    central.set(name, 46);
    directory.push(central);

    offset += local.length + size;
  }

  const directorySize = directory.reduce((total, row) => total + row.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054B50, true);     // end of central directory
  ev.setUint16(4, 0, true);              // this disk
  ev.setUint16(6, 0, true);              // the disk the directory starts on
  ev.setUint16(8, directory.length, true);
  ev.setUint16(10, directory.length, true);
  ev.setUint32(12, directorySize, true);
  ev.setUint32(16, offset, true);        // where the directory starts
  ev.setUint16(20, 0, true);             // no comment

  return new Blob([...parts, ...directory, end], { type: "application/zip" });
}
