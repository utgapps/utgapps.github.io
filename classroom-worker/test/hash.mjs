/* PBKDF2 matching the worker's hashPassword, so seed.sql can be regenerated:
   node hash.mjs <password>  */
import { webcrypto as crypto } from "node:crypto";
const toHex = (b) => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(process.argv[2]), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" }, key, 256);
console.log(JSON.stringify({ hash: toHex(bits), salt: toHex(salt) }));
