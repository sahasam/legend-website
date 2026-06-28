/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  // Smoke tests run under the same Vite pipeline, so import.meta.glob and asset
  // imports resolve exactly as they do in the app. Pure-logic only (no DOM/WebGL).
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
