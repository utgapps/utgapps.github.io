/* Bundles the classroom Java compiler and runtime (TypeScript) for the node
   tests, and gives them one way to run a program with scripted typing. */
import { build } from "esbuild";
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

/* java-mutate.mjs breaks one line through JAVA_MUTATE="file|||find|||replace" (file
   relative to src/lib/java); the text must be there, or the mutation proves nothing. */
function mutationPlugin() {
  const mutation = process.env.JAVA_MUTATE;
  if (!mutation) return [];
  const [file, find, replace] = mutation.split("|||");
  return [{
    name: "mutate",
    setup(builder) {
      builder.onLoad({ filter: /\.ts$/ }, (args) => {
        if (!args.path.replace(/\\/g, "/").endsWith("/src/lib/java/" + file)) return undefined;
        const source = readFileSync(args.path, "utf8");
        if (!source.includes(find)) { console.log(`mutation did not apply: ${file} has no ${JSON.stringify(find)}`); process.exit(2); }
        return { contents: source.replace(find, replace), loader: "ts" };
      });
    },
  }];
}

export async function loadJava() {
  const result = await build({
    plugins: mutationPlugin(),
    stdin: {
      contents: [
        'export { compileJava } from "./src/lib/java/index.ts";',
        'export { JavaSession } from "./src/lib/java/session.ts";',
        'export { library } from "./src/lib/java/library.ts";',
        'export { createRuntime } from "./src/lib/java/runtime.ts";',
      ].join("\n"),
      resolveDir: join(here, ".."),
      loader: "ts",
    },
    bundle: true, format: "esm", platform: "neutral", write: false, logLevel: "silent",
  });
  const folder = mkdtempSync(join(tmpdir(), "java-test-"));
  const file = join(folder, "java.mjs");
  writeFileSync(file, result.outputFiles[0].text);
  try {
    return await import(pathToFileURL(file).href);
  } finally {
    rmSync(folder, { recursive: true, force: true });
  }
}

/* Run a compiled program the way the classroom console does, typing each line
   the moment the program waits for input and echoing it as [[line]], the same
   markup cs701's checkpoints and Harness.java use. */
export async function runJava(java, code, typed = [], { maxSteps = 100000, streams = false } = {}) {
  const chunks = [];
  const session = new java.JavaSession(code, { write: (stream, text) => chunks.push(streams ? { stream, text } : text) });
  const queue = [...typed];
  for (let step = 0; step < maxSteps; step++) {
    const next = session.step();
    if (next.state === "exit") return { output: streams ? chunks : chunks.join(""), status: next.status };
    if (next.state === "input") {
      if (!queue.length) { session.endInput(); continue; }
      const line = queue.shift();
      chunks.push(streams ? { stream: "in", text: `[[${line}]]\n` } : `[[${line}]]\n`);
      session.feed(line + "\n");
    }
  }
  throw new Error("program did not finish");
}
