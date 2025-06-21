import { Router } from 'express';
// Import other route handlers here
import userRoutes from './users/users.routes.js';
import webhookRoutes from './webhooks/webhooks.routes.js';
// import productRoutes from './products/products.routes.js';

const router = Router();

// Hook up route handlers
router.use('/users', userRoutes);
router.use('/webhooks', webhookRoutes);
// router.use('/products', productRoutes);

export default router; 