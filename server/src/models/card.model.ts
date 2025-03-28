import pool from '../config/db.config';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Card interface
export interface Card {
  id: string;
  content: string;
  type: 'truth' | 'dare';
  pack_id: string;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Create a new card
export const createCard = async (card: Omit<Card, 'id' | 'created_at' | 'updated_at'>): Promise<Card> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO cards (content, type, pack_id, created_by) VALUES (?, ?, ?, ?)',
    [card.content, card.type, card.pack_id, card.created_by]
  );
  
  const insertId = result.insertId;
  return { id: insertId.toString(), ...card };
};

// Get all cards for a specific pack
export const getCardsByPackId = async (packId: string): Promise<Card[]> => {
  const [cards] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM cards WHERE pack_id = ? ORDER BY created_at DESC',
    [packId]
  );
  
  return cards as Card[];
};

// Get a card by ID
export const getCardById = async (id: string): Promise<Card | null> => {
  const [cards] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM cards WHERE id = ?',
    [id]
  );
  
  if (!cards.length) {
    return null;
  }
  
  return cards[0] as Card;
};

// Update a card
export const updateCard = async (id: string, card: Partial<Card>): Promise<Card | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE cards SET content = ?, type = ? WHERE id = ?',
    [card.content, card.type, id]
  );
  
  if (result.affectedRows === 0) {
    return null;
  }
  
  return getCardById(id);
};

// Delete a card
export const deleteCard = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'DELETE FROM cards WHERE id = ?',
    [id]
  );
  
  return result.affectedRows > 0;
}; 