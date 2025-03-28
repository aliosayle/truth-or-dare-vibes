import { Request, Response } from 'express';
import cardModel from '../models/card.model';
import { Card } from '../models/pack.model';

export const getCardsByPackId = async (req: Request, res: Response) => {
  try {
    const cards = await cardModel.getCardsByPackId(req.params.packId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cards', error });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const { type, content, packId } = req.body;
    if (!type || !content || !packId) {
      return res.status(400).json({ message: 'Type, content, and packId are required' });
    }
    if (type !== 'truth' && type !== 'dare') {
      return res.status(400).json({ message: 'Type must be either "truth" or "dare"' });
    }
    const card = await cardModel.createCard(type, content, packId);
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error creating card', error });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const { type, content } = req.body;
    if (!type || !content) {
      return res.status(400).json({ message: 'Type and content are required' });
    }
    if (type !== 'truth' && type !== 'dare') {
      return res.status(400).json({ message: 'Type must be either "truth" or "dare"' });
    }
    const card = await cardModel.updateCard(req.params.id, type, content);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error updating card', error });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const success = await cardModel.deleteCard(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error });
  }
}; 