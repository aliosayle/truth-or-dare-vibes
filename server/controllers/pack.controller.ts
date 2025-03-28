import { Request, Response } from 'express';
import packModel from '../models/pack.model';
import { Pack, PackWithCards } from '../models/pack.model';

export const getAllPacks = async (req: Request, res: Response) => {
  try {
    const packs = await packModel.getAllPacks();
    res.json(packs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packs', error });
  }
};

export const getPackById = async (req: Request, res: Response) => {
  try {
    const pack = await packModel.getPackById(req.params.id);
    if (!pack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pack', error });
  }
};

export const createPack = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    const pack = await packModel.createPack(name, description);
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pack', error });
  }
};

export const updatePack = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    const pack = await packModel.updatePack(req.params.id, name, description);
    if (!pack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.json(pack);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pack', error });
  }
};

export const deletePack = async (req: Request, res: Response) => {
  try {
    const success = await packModel.deletePack(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pack', error });
  }
}; 