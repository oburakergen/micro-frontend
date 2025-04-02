import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import stdLibBrowser from 'node-stdlib-browser';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
  },
  envPrefix: 'REACT_APP_',
  plugins: [
    envCompatible(),
    react({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
      },
    })
  ],
  define: {
    'process.env': process.env,
    global: {},
    'process.browser': true,
  },
  resolve: {
    alias: stdLibBrowser,
    crypto: 'crypto-browserify',
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
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
    },
  }
});
