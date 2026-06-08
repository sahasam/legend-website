import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
