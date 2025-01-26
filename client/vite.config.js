// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"), // Alias for utils folder
      "@components": path.resolve(__dirname, "src/components"), // Alias for components folder
    },
  },
  server: {
    port: 3000,
  },
});
