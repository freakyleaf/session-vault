import express from 'express';

const healthRoutes = express.Router();

healthRoutes.get('/', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export { healthRoutes };
