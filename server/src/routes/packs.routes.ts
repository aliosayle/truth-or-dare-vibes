import express from 'express';
import * as packController from '../controllers/pack.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = express.Router();

// Public routes
router.get('/', packController.getAllPacks);
router.get('/:id', packController.getPackById);

// Protected routes (require authentication)
router.post('/', authenticateToken, adminMiddleware, packController.createPack);
router.put('/:id', authenticateToken, adminMiddleware, packController.updatePack);
router.delete('/:id', authenticateToken, adminMiddleware, packController.deletePack);

export default router; 