import express from 'express';
import * as cardController from '../controllers/card.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = express.Router();

// Public routes
router.get('/pack/:packId', cardController.getCardsByPackId);
router.get('/:id', cardController.getCardById);

// Protected routes (require authentication)
router.post('/', authenticateToken, adminMiddleware, cardController.createCard);
router.put('/:id', authenticateToken, adminMiddleware, cardController.updateCard);
router.delete('/:id', authenticateToken, adminMiddleware, cardController.deleteCard);

export default router; 