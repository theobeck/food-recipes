/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/project2',
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '**/src/test/setup.ts',

    // testMatch: ['./test/**/*.test.ts?(x)'],
  },
});
