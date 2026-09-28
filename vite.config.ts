import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@/components": path.resolve(
        import.meta.dirname,
        "./src/shared/components",
      ),
      "@/hooks": path.resolve(import.meta.dirname, "./src/shared/hooks"),
      "@/lib": path.resolve(import.meta.dirname, "./src/shared/lib"),
      "@/types": path.resolve(import.meta.dirname, "./src/shared/types"),
      "@/utils": path.resolve(import.meta.dirname, "./src/shared/utils"),
      "@/styles": path.resolve(import.meta.dirname, "./src/shared/styles"),
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5173,
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
