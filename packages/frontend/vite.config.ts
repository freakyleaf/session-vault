import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@backend': resolve(__dirname, '../', 'backend', 'src'),
      '@backend-components': resolve(
        __dirname,
        '../',
        'backend',
        'src',
        'components',
      ),
      '@backend-root': resolve(__dirname, '../', 'backend'),
      '@backend-styles': resolve(__dirname, '../', 'backend', 'src', 'styles'),
      '@frontend': resolve(__dirname, 'src'),
      '@frontend-components': resolve(__dirname, 'src', 'components'),
      '@frontend-root': resolve(__dirname),
      '@frontend-styles': resolve(__dirname, 'src', 'styles'),
      '@shared': resolve(__dirname, '../', 'shared', 'src'),
      '@shared-components': resolve(
        __dirname,
        '../',
        'shared',
        'src',
        'components',
      ),
      '@shared-root': resolve(__dirname, '../', 'shared'),
      '@shared-styles': resolve(__dirname, '../', 'shared', 'src', 'styles'),
    },
  },
});
