import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173
  },
  resolve: {
    alias: {
      '@app': '/src/app',
      '@modules': '/src/modules',
      '@shared': '/src/shared',
      '@store': '/src/store',
      '@auth': '/auth'
    }
  }
});
