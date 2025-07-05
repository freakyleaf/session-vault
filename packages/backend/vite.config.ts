import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@backend-root': resolve(__dirname, '../', 'backend'),
      '@backend-src': resolve(__dirname, '../', 'backend', 'src'),
      '@backend-styles': resolve(__dirname, '../', 'backend', 'src', 'styles'),
      '@frontend-root': resolve(__dirname),
      '@frontend-src': resolve(__dirname, 'src'),
      '@frontend-styles': resolve(__dirname, 'src', 'styles'),
      '@shared-root': resolve(__dirname, '../', 'shared'),
      '@shared-src': resolve(__dirname, '../', 'shared', 'src'),
      '@shared-styles': resolve(__dirname, '../', 'shared', 'src', 'styles'),
    },
  },
});
