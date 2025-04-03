import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  server: {
    port: 3003,
    host: true,
  },
  envPrefix: 'REACT_APP_',
  plugins: [
    envCompatible(),
    react()
  ],
  define: {
    'process.env': process.env,
    global: {},
    'process.browser': true,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/[name].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'static/css/[name]-[hash][extname]';
          } else {
            return 'static/media/[name]-[hash][extname]';
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      include: ['node_modules/**/*.js'],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  }
});
