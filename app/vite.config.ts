import { defineConfig } from "vite";
import { ViteToml } from "vite-plugin-toml";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteToml()],
  server: {
    port: 8008,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
