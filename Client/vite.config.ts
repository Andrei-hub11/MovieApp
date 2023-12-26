/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "https://localhost:7238",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"), // Se necessário
      },
      "/notificationHub": {
        target: "wss://localhost:7238",
        secure: false,
        ws: true,
      },
    },
  },
});

