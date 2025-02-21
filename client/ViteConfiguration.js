import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@enums": "/src/enums",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@utils": "/src/utils",
      "@themes": "/src/themes",
    },
  },
});
