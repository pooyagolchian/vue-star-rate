import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), vue()],
  base: '/vue-star-rate/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-js-star-rating': path.resolve(__dirname, '../src'),
      'vue-star-rate': path.resolve(__dirname, '../src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
