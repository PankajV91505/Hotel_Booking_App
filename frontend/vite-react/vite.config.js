// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Ensure sourcemaps are generated
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Explicitly include React
  },
});