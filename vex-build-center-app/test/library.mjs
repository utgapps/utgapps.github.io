// Every mechanism in the Examples library still builds, still holds together, still moves the
// way its description says, and is exactly what is committed under public/examples/library/.
//   node test/library.mjs
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("../tools/make-library.mjs", import.meta.url));
const run = spawnSync(process.execPath, [script, "--check"], { stdio: "inherit" });
process.exit(run.status ?? 1);
