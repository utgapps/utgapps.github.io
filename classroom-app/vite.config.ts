import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

// The admin dashboard is its own page at /admin/ — decoupled from the
// classroom. It reuses the shared bundle (App renders <AdminApp/> when the
// path ends in /admin), so this just emits an /admin/index.html alongside the
// classroom build, pointing at the same absolute /classroom/assets/ files.
function adminPage(): Plugin {
  return {
    name: "utg-admin-page",
    closeBundle() {
      const html = readFileSync(`${here}../classroom/index.html`, "utf8")
        .replace("<title>UTG Classroom</title>", "<title>UTG Academy · Admin</title>");
      mkdirSync(`${here}../admin`, { recursive: true });
      writeFileSync(`${here}../admin/index.html`, html);
    },
  };
}

export default defineConfig({
  base: "/classroom/",
  plugins: [react(), adminPage()],
  build: { outDir: "../classroom", emptyOutDir: true },
});
