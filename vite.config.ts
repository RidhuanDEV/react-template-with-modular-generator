import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/shared/components"),
      "@/hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@/lib": path.resolve(__dirname, "./src/shared/lib"),
      "@/types": path.resolve(__dirname, "./src/shared/types"),
      "@/utils": path.resolve(__dirname, "./src/shared/utils"),
      "@/styles": path.resolve(__dirname, "./src/shared/styles"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom/")
          ) {
            return "vendor";
          }

          if (id.includes("node_modules/@tanstack/react-query/")) {
            return "query";
          }

          return undefined;
        },
      },
    },
  },
});
