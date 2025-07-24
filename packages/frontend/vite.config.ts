import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const envDir = resolve(process.cwd(), '../', '../'); // Repo root

export default defineConfig({
  envDir,
  plugins: [
    AutoImport({
      dirs: [
        './src/components/**',
        './src/providers/**',
        './src/services/**',
        '../shared/src/components/**',
        '../shared/src/providers/**',
        '../shared/src/services/**',
      ],
      dts: true, // Generates auto-imports.d.ts
      imports: ['react', 'react-router-dom'],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@api-root': resolve(__dirname, '../', 'api'),
      '@api-src': resolve(__dirname, '../', 'api', 'src'),
      '@backend-root': resolve(__dirname, '../', 'backend'),
      '@backend-src': resolve(__dirname, '../', 'backend', 'src'),
      '@backend-styles': resolve(__dirname, '../', 'backend', 'src', 'styles'),
      '@database-root': resolve(__dirname, '../', 'database'),
      '@database-src': resolve(__dirname, '../', 'database', 'src'),
      '@frontend-root': resolve(__dirname),
      '@frontend-src': resolve(__dirname, 'src'),
      '@frontend-styles': resolve(__dirname, 'src', 'styles'),
      '@shared-root': resolve(__dirname, '../', 'shared'),
      '@shared-src': resolve(__dirname, '../', 'shared', 'src'),
      '@shared-styles': resolve(__dirname, '../', 'shared', 'src', 'styles'),
    },
  },
});
