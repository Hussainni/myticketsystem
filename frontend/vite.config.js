import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@jumbo", replacement: "/src/@jumbo" },
      { find: "@assets", replacement: "/src/@assets" },
      { find: "@app", replacement: "/src/app" },
    ],
  },
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["react-draft-wysiwyg"],
  },
});
