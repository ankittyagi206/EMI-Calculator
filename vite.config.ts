import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import manifest from "./manifest.json";
import { crx } from "@crxjs/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "/path/to/main.js",
    },
  },
  plugins: [
    react(),
    crx({
      manifest: manifest as any, // or as ManifestV3Export
    }),
  ],
});
