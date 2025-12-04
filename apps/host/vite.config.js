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
  },
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remoteApp1: {
          type: 'module',
          name: 'remoteApp1',
          entry: 'http://127.0.0.1:3001/remoteEntry.js',
        },
        phrRemote: {
          type: 'module',
          name: 'phrRemote',
          entry: 'http://127.0.0.1:3000/remoteEntry.js',
        },
      },
      shared: sharedDeps,
    }),
  ],
});
