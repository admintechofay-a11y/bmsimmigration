import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Brotli pre-compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
    // Gzip pre-compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('SceneKit')) {
            return 'scene-kit';
          }
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-ui';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
