import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/vex-build-center/",
  plugins: [react()],
  build: { outDir: "../vex-build-center", emptyOutDir: true },
});
