import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      failOnError: false,
      failOnWarning: false,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5000,
    open: true,
  },
  optimizeDeps: {
    // Disable React Fast Refresh
    react: { fastRefresh: false },
  },
});
