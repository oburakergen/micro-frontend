import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const sharedDeps = {
  react: { singleton: true, requiredVersion: '18.2.0', eager: true },
  'react-dom': { singleton: true, requiredVersion: '18.2.0', eager: true },
  'react-router-dom': { singleton: true, requiredVersion: '6.10.0' },
  'react-redux': { singleton: true, requiredVersion: '7.2.9' },
};

export default defineConfig({
  server: {
    port: 3002,
    host: true,
    cors: true,
  },
  preview: {
    port: 3002,
    host: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    modulePreload: false,
  },
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remoteApp1: 'http://localhost:3001/assets/remoteEntry.js',
        phrRemote: 'http://localhost:3000/build/static/js/remoteEntry.js',
      },
      shared: sharedDeps,
    }),
  ],
});
