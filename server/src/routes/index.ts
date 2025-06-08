import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Use the auth routes for authentication-related endpoints
router.use('/auth', authRoutes);

// Add authentication to the API routes
router.use('/api', authenticateToken, apiRoutes); // Protect the API routes with the authenticateToken middleware

export default router;
