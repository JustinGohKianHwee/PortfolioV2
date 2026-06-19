import { defineConfig } from "vitest/config";
import path from "path";

// Use esbuild's native JSX transform instead of @vitejs/plugin-react
// to avoid the Babel ↔ Vitest env-substitution chunk-edit conflict.
export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: false,
    env: {
      VITE_API_BASE_URL: "http://localhost:5000",
    },
  },
});
