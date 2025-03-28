import express, { Request, Response, NextFunction } from 'express';
import packModel from '../models/pack.model';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Get all packs
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('GET /api/packs - Fetching all packs');
    const packs = await packModel.getAllPacks();
    console.log(`Found ${packs.length} packs`);
    res.json(packs);
  } catch (error) {
    console.error('Error in GET /api/packs:', error);
    res.status(500).json({ 
      message: 'Error fetching packs',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Get pack by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const pack = await packModel.getPackById(req.params.id);
    if (!pack) {
      res.status(404).json({ message: 'Pack not found' });
      return;
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pack' });
  }
});

// Create pack (admin only)
router.post('/', authenticate, authorize(['admin']), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pack = await packModel.createPack({
      ...req.body,
      created_by: req.user!.id
    });
    res.status(201).json(pack);
  } catch (error) {
    next(error);
  }
});

// Update pack (admin only)
router.put('/:id', authenticate, authorize(['admin']), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pack = await packModel.updatePack(req.params.id, req.body);
    if (!pack) {
      res.status(404).json({ message: 'Pack not found' });
      return;
    }
    res.json(pack);
  } catch (error) {
    next(error);
  }
});

// Delete pack (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await packModel.deletePack(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: 'Pack not found' });
      return;
    }
    res.json({ message: 'Pack deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 