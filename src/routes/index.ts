import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { authRoutes } from './auth.routes';
import configRoutes from './config.routes';
// import { config } from '../config/environment';

const router = Router();

// Add root endpoint for testing
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 Welcome to Campus Connect API - Your Gateway to Digital Campus Life!',
    timestamp: new Date().toISOString()
  });
});
router.get('/check', (_req, res) => {
    res.status(200).json({
      success: true,
      message: '🎓 Welcome to Check it is successful',
      timestamp: new Date().toISOString()
    });
  });
  

router.use(`/api/v1`, healthRoutes);
router.use(`/api/v1`, authRoutes);
router.use(`/api/v1/config`, configRoutes);

// Catch-all debug route for diagnostics
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found (debug catch-all)`,
    timestamp: new Date().toISOString()
  });
});

export { router as apiRoutes };
