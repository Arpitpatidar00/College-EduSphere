/* eslint-disable no-undef */
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Set @ to point to the src directory
      "@components": path.resolve(__dirname, "src/components"), // Alias for components
      "@pages": path.resolve(__dirname, "src/pages"), // Alias for pages
      "@utils": path.resolve(__dirname, "src/utils"), // Alias for utilities
      "@services": path.resolve(__dirname, "src/services"), // Alias for API services
      "@context": path.resolve(__dirname, "src/context"), // Alias for API services
    },
  },
  server: {
    port: 3000,
    hmr: false,
    host: true, // Allow external connections
    allowedHosts: ["d50c-182-70-199-162.ngrok-free.app"], // Allow your ngrok URL
  },
});
