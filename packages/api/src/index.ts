import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { connectDatabase } from '@database-src/lib/databaseConnection';

import { albumRoutes } from '@api-src/routes/axAlbumRoutes';
import { artistRoutes } from '@api-src/routes/axArtistRoutes';
import { healthRoutes } from '@api-src/routes/axHealthRoutes';

import {
  API_BASE_URL,
  ENVIRONMENT_PRODUCTION,
} from '@shared-src/lib/constants';

const app = express();
const apiRootPort = process.env.VITE_API_ROOT_PORT;
const apiRootUrl = process.env.VITE_API_ROOT_URL;

const requiredEnvVars = [
  'VITE_CLERK_PUBLISHABLE_KEY',
  'PRIVATE_CLERK_SECRET_KEY',
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(
      `\x1b[31m✗\x1b[0m Missing required environment variable: ${envVar}`,
    );
    process.exit(1);
  }
}

// Middleware (order critical)
app.use(helmet());
app.use(
  cors({
    credentials: true,
  }),
);
app.use(
  clerkMiddleware({
    publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.PRIVATE_CLERK_SECRET_KEY,
  }),
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use(`${API_BASE_URL}/albums`, albumRoutes);
app.use(`${API_BASE_URL}/artists`, artistRoutes);
app.use(`${API_BASE_URL}/health`, healthRoutes);

app.get('/', (_req, res) => {
  res.json({
    message: 'API server running',
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('\x1b[31m✗\x1b[0m Unhandled application error:', err);

    res.status(500).json({
      error:
        process.env.NODE_ENV === ENVIRONMENT_PRODUCTION
          ? 'Internal server error:'
          : err.message,
      timestamp: new Date().toISOString(),
    });
  },
);

let server: ReturnType<typeof app.listen>;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    server = app.listen(apiRootPort, () => {
      console.log(
        `\x1b[32m✓\x1b[0m API server running on port \x1b[33m${apiRootPort}\x1b[0m`,
      );
      console.log(
        `\x1b[34mi\x1b[0m Health check: \x1b[33m${apiRootUrl}:${apiRootPort}${API_BASE_URL}/health\x1b[0m`,
      );
    });

    server.on('error', (error) => {
      console.error('\x1b[31m✗\x1b[0m Server connection error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error(
      '\x1b[31m✗\x1b[0m Server startup failed: \x1b[31m',
      error,
      '\x1b[0m',
    );
    process.exit(1);
  }
}

function gracefulShutdown(signal: string): void {
  console.log(
    `\x1b[34mi\x1b[0m ${signal} received, shutting down gracefully...`,
  );

  if (server) {
    server.close(() => {
      console.log('\x1b[32m✓\x1b[0m Server closed');
      process.exit(0);
    });

    // Force close after 10 seconds
    setTimeout(() => {
      console.log('\x1b[31m✗\x1b[0m Forced server shutdown');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', () => {
  void gracefulShutdown('SIGINT');
});
process.on('SIGTERM', () => {
  void gracefulShutdown('SIGTERM');
});

process.on('uncaughtException', (error) => {
  console.error('\x1b[31m✗\x1b[0m Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('\x1b[31m✗\x1b[0m Unhandled rejection:', reason);
  process.exit(1);
});

void startServer();
