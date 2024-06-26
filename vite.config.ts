import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { create } from "@openreplyde/web-docker-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base = env.VITE_APP_BASE_PATH || "/";
  const exposes: { [key: string]: string } = {
    vue: "vue-module",
  };
  return {
    plugins: [
      vue(),
      create({
        basePath: base,
        fileName: "vue-module.json",
        module: "vue-module",
        type: "page",
        pages: [".*"],
        scope: "webdocker",
        exposes,
      }),
    ],
    define: {
      process: {
        env: {
          NODE_ENV: "production",
        },
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.ts"),
        name: "Vue",
        fileName: "vue",
        formats: ["es"],
      },
      outDir: "dist",
    },
  };
});
