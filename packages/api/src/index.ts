import express from 'express';

import { connectDatabase } from '@database-src/lib/databaseConnection';

import { healthRoutes } from '@api-src/routes/healthRoutes';

const app = express();
const apiBasePort = process.env.VITE_API_BASE_PORT;
const apiBaseUri = process.env.VITE_API_BASE_URI;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/health', healthRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'API server running',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  try {
    await connectDatabase();

    // Start Express server
    app.listen(apiBasePort, () => {
      console.log(
        `\x1b[32m✓\x1b[0m API server running on port \x1b[33m${apiBasePort}\x1b[0m`,
      );
      console.log(
        `\x1b[34m\i\x1b[0m Health check: \x1b[33m${apiBaseUri}:${apiBasePort}/api/v1/health\x1b[0m`,
      );
    });
  } catch (error) {
    console.error(
      '\x1b[31m✗\x1b[0m Failed to start server: \x1b[31m',
      error,
      '\x1b[0m',
    );
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

void startServer();
