// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Force Vite to look for index.html in the current directory
  build: {
    outDir: 'dist', // Build output directory
  },
  server: {
    open: true, // Automatically open the browser
  },
});
