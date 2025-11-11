// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/JankenAppGitHub/',
  server: {
    port: 3000,
    host: '0.0.0.0', 

    hmr: {
      host: process.env.VITE_DEV_SERVER_HOST || 'localhost',
      port: 3000,
      protocol: 'ws',
    },

    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});