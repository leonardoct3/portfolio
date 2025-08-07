import { Router } from 'express';
import projectRoutes from './projectRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import contactRoutes from './contactRoutes.js';

const router = Router();

// Mount project routes
router.use('/projects', projectRoutes);

// Mount experience routes
router.use('/experiences', experienceRoutes);

// Mount contact routes
router.use('/contact', contactRoutes);

// Health check route
router.get('/health', (_req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

export default router;
