// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true, // Ensure sourcemaps are generated
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Explicitly include React
  },
});