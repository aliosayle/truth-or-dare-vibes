import express from 'express';
import * as authController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes
router.get('/me', authenticateToken, authController.getCurrentUser);
router.post('/logout', authenticateToken, authController.logout);

export default router; 