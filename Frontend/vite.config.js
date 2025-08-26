import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://eazybinsbackend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["https://c6c6f0d44822.ngrok-free.app/"],
  },
});
