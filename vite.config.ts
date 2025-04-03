import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import { rmSync } from 'node:fs';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  rmSync('dist-electron', { recursive: true, force: true });

  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      electron([
        {
          entry: 'electron/main/index.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : false,
              outDir: 'dist-electron',
              rollupOptions: {
                external: ['electron'],
                output: {
                  format: 'cjs',
                  entryFileNames: 'main.js',
                },
              },
            },
          },
        },
        {
          entry: 'electron/preload/index.ts',
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : false,
              outDir: 'dist-electron',
              rollupOptions: {
                external: ['electron'],
                output: {
                  format: 'cjs',
                  entryFileNames: 'preload.js',
                },
              },
              lib: { entry: 'electron/preload/index.ts', formats: ['cjs'] },
              emptyOutDir: false,
              target: 'node18',
            },
          },
          onstart(options) {
            options.reload();
          },
        },
      ]),
      renderer(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      sourcemap: sourcemap,
    },
    clearScreen: false,
  };
});
