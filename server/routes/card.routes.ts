import express, { Request, Response, NextFunction } from 'express';
import cardModel from '../models/card.model';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Get all cards
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await cardModel.getAllCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards' });
  }
});

// Get card by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await cardModel.getCardById(req.params.id);
    if (!card) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching card' });
  }
});

// Create card (admin only)
router.post('/', authenticate, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const card = await cardModel.createCard({
      ...req.body,
      created_by: req.user!.id
    });
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
});

// Update card (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const card = await cardModel.updateCard(req.params.id, req.body);
    if (!card) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }
    res.json(card);
  } catch (error) {
    next(error);
  }
});

// Delete card (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await cardModel.deleteCard(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 