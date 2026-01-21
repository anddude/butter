import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/butter/',
  plugins: [react()],
  resolve: {
    //keeps vite from loading react more than once, causing a react hook error
    dedupe: ['react', 'react-dom'],
  }, optimizeDeps: {
    //keeps react from loading twice to fix vite bundling bug 
    include: ['react', 'react-dom'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});