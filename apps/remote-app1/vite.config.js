import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const sharedDeps = {
  react: { singleton: true, requiredVersion: '18.2.0' },
  'react-dom': { singleton: true, requiredVersion: '18.2.0' },
  'react-router-dom': { singleton: true, requiredVersion: '6.10.0' },
  'react-redux': { singleton: true, requiredVersion: '7.2.9' },
};

export default defineConfig({
  server: {
    port: 3001,
    host: true,
    cors: true,
  },
  preview: {
    port: 3001,
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
      name: 'remoteApp1',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: sharedDeps,
    }),
  ],
});
