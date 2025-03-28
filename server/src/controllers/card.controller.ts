import { Request, Response } from 'express';
import * as cardModel from '../models/card.model';

// Get all cards for a specific pack
export const getCardsByPackId = async (req: Request, res: Response) => {
  try {
    const packId = req.params.packId;
    const cards = await cardModel.getCardsByPackId(packId);
    res.json(cards);
  } catch (error) {
    console.error('Error in getCardsByPackId:', error);
    res.status(500).json({ message: 'Error retrieving cards' });
  }
};

// Get a card by ID
export const getCardById = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const card = await cardModel.getCardById(cardId);
    
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    res.json(card);
  } catch (error) {
    console.error('Error in getCardById:', error);
    res.status(500).json({ message: 'Error retrieving card' });
  }
};

// Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const { content, type, pack_id } = req.body;
    
    if (!content || !type || !pack_id) {
      return res.status(400).json({ message: 'Content, type, and pack_id are required' });
    }
    
    if (type !== 'truth' && type !== 'dare') {
      return res.status(400).json({ message: 'Type must be "truth" or "dare"' });
    }
    
    const userId = req.user?.id;
    const newCard = await cardModel.createCard({
      content,
      type,
      pack_id,
      created_by: userId
    });
    
    res.status(201).json(newCard);
  } catch (error) {
    console.error('Error in createCard:', error);
    res.status(500).json({ message: 'Error creating card' });
  }
};

// Update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const { content, type } = req.body;
    
    if (!content || !type) {
      return res.status(400).json({ message: 'Content and type are required' });
    }
    
    if (type !== 'truth' && type !== 'dare') {
      return res.status(400).json({ message: 'Type must be "truth" or "dare"' });
    }
    
    const updatedCard = await cardModel.updateCard(cardId, {
      content,
      type
    });
    
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    res.json(updatedCard);
  } catch (error) {
    console.error('Error in updateCard:', error);
    res.status(500).json({ message: 'Error updating card' });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const cardId = req.params.id;
    const result = await cardModel.deleteCard(cardId);
    
    if (!result) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCard:', error);
    res.status(500).json({ message: 'Error deleting card' });
  }
}; 