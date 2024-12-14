import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module for resolving paths

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'movie-station'
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Map '@' to the 'src' directory
    },
  },
});
