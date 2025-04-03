// workspaces/shell-app/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/page-vite': 'http://localhost:3003',
      '/page-webpack': 'http://localhost:3004'
    }
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
  resolve: {
    alias: {
      'events-module': resolve(__dirname, '../event-bus/src'),
      'page-vite': resolve(__dirname, '../page-vite/src')
    }
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
    include: ['react-router-dom', 'events'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  }
});
