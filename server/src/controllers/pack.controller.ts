import { Request, Response } from 'express';
import * as packModel from '../models/pack.model';

// Get all packs
export const getAllPacks = async (req: Request, res: Response) => {
  try {
    const packs = await packModel.getAllPacks();
    res.json(packs);
  } catch (error) {
    console.error('Error in getAllPacks:', error);
    res.status(500).json({ message: 'Error retrieving packs' });
  }
};

// Get a pack by ID
export const getPackById = async (req: Request, res: Response) => {
  try {
    const packId = req.params.id;
    const pack = await packModel.getPackById(packId);
    
    if (!pack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    
    res.json(pack);
  } catch (error) {
    console.error('Error in getPackById:', error);
    res.status(500).json({ message: 'Error retrieving pack' });
  }
};

// Create a new pack
export const createPack = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    const userId = req.user?.id;
    const newPack = await packModel.createPack({
      name,
      description: description || '',
      created_by: userId
    });
    
    res.status(201).json(newPack);
  } catch (error) {
    console.error('Error in createPack:', error);
    res.status(500).json({ message: 'Error creating pack' });
  }
};

// Update a pack
export const updatePack = async (req: Request, res: Response) => {
  try {
    const packId = req.params.id;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    const updatedPack = await packModel.updatePack(packId, {
      name,
      description: description || '',
    });
    
    if (!updatedPack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    
    res.json(updatedPack);
  } catch (error) {
    console.error('Error in updatePack:', error);
    res.status(500).json({ message: 'Error updating pack' });
  }
};

// Delete a pack
export const deletePack = async (req: Request, res: Response) => {
  try {
    const packId = req.params.id;
    const result = await packModel.deletePack(packId);
    
    if (!result) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    
    res.json({ message: 'Pack deleted successfully' });
  } catch (error) {
    console.error('Error in deletePack:', error);
    res.status(500).json({ message: 'Error deleting pack' });
  }
}; 