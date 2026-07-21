import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/classroom/",
  plugins: [react()],
  build: { outDir: "../classroom", emptyOutDir: true },
});
