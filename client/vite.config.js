/* eslint-disable no-undef */
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    port: 3000,
    hmr: false,
    host: true, // Allow external connections
    allowedHosts: ["d50c-182-70-199-162.ngrok-free.app"], // Allow your ngrok URL
  },
});
