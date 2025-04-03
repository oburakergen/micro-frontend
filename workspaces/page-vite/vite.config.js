import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import { resolve } from 'path';

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
  resolve: {
    alias: {
      'events-module': resolve(__dirname, '../event-bus/src')
    }
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/App.jsx'),
      name: 'PageVite',
      formats: ['es', 'umd'],
      fileName: (format) => `page-vite.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM'
        },
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
