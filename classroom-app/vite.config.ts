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

/* The PixelPad editor opens the site's Pixel Art Maker at /pixel-art-maker/,
   which on the live site is the directory next to /classroom/. The dev server
   is rooted one level in from that, so without this the drawing window is a
   404 in dev and only in dev - the kind of gap that gets found by a student. */
function pixelArtMaker(): Plugin {
  const dir = `${here}../pixel-art-maker/`;
  const types: Record<string, string> = {
    html: "text/html", js: "text/javascript", css: "text/css", svg: "image/svg+xml", png: "image/png",
  };
  return {
    name: "utg-pixel-art-maker",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url || "").split("?")[0];
        if (!path.startsWith("/pixel-art-maker/")) return next();
        const name = path.slice("/pixel-art-maker/".length) || "index.html";
        if (name.includes("..")) return next();
        try {
          const body = readFileSync(dir + name);
          res.setHeader("content-type", types[name.split(".").pop() || ""] || "application/octet-stream");
          res.end(body);
        } catch { next(); }
      });
    },
  };
}

export default defineConfig({
  base: "/classroom/",
  plugins: [react(), adminPage(), pixelArtMaker()],
  build: { outDir: "../classroom", emptyOutDir: true },
});
