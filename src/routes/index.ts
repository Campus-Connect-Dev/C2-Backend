import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';
import configRoutes from './config.routes';
import { config } from '../config/environment';

const router = Router();

// Add root endpoint for testing
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 Welcome to Campus Connect API - Your Gateway to Digital Campus Life!',
    timestamp: new Date().toISOString()
  });
});

router.use(`/api/${config.API_VERSION}`, healthRoutes);
router.use(`/api/${config.API_VERSION}`, authRoutes);
router.use(`/api/${config.API_VERSION}/config`, configRoutes);

export { router as apiRoutes };
