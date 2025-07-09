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
        './src/hooks/**',
        './src/services/**',
        '../shared/src/components/**',
        '../shared/src/hooks/**',
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
      '@backend-root': resolve(__dirname),
      '@backend-src': resolve(__dirname, 'src'),
      '@backend-styles': resolve(__dirname, 'src', 'styles'),
      '@database-root': resolve(__dirname, '../', 'database'),
      '@database-src': resolve(__dirname, '../', 'database', 'src'),
      '@frontend-root': resolve(__dirname, '../', 'frontend'),
      '@frontend-src': resolve(__dirname, '../', 'frontend', 'src'),
      '@frontend-styles': resolve(
        __dirname,
        '../',
        'frontend',
        'src',
        'styles',
      ),
      '@shared-root': resolve(__dirname, '../', 'shared'),
      '@shared-src': resolve(__dirname, '../', 'shared', 'src'),
      '@shared-styles': resolve(__dirname, '../', 'shared', 'src', 'styles'),
    },
  },
});
