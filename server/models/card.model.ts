import pool from '../config/db.config';
import { v4 as uuidv4 } from 'uuid';

export interface Card {
  id: string;
  packId: string;
  type: 'truth' | 'dare';
  content: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface CardCreate {
  packId: string;
  type: 'truth' | 'dare';
  content: string;
  created_by: string;
}

class CardModel {
  async getAllCards(): Promise<Card[]> {
    const [rows] = await pool.query('SELECT * FROM cards');
    return rows as Card[];
  }

  async getCardById(id: string): Promise<Card | null> {
    const [rows] = await pool.query('SELECT * FROM cards WHERE id = ?', [id]);
    return (rows as Card[])[0] || null;
  }

  async getCardsByPackId(packId: string): Promise<Card[]> {
    const [rows] = await pool.query('SELECT * FROM cards WHERE packId = ?', [packId]);
    return rows as Card[];
  }

  async createCard(cardData: CardCreate): Promise<Card> {
    const id = uuidv4();
    
    const [result] = await pool.query(
      'INSERT INTO cards (id, packId, type, content, created_by) VALUES (?, ?, ?, ?, ?)',
      [id, cardData.packId, cardData.type, cardData.content, cardData.created_by]
    );
    
    const [card] = await pool.query('SELECT * FROM cards WHERE id = ?', [id]);
    return (card as Card[])[0];
  }

  async updateCard(id: string, updates: Partial<CardCreate>): Promise<Card | null> {
    const updatesList: string[] = [];
    const values: any[] = [];

    if (updates.packId) {
      updatesList.push('packId = ?');
      values.push(updates.packId);
    }

    if (updates.type) {
      updatesList.push('type = ?');
      values.push(updates.type);
    }

    if (updates.content) {
      updatesList.push('content = ?');
      values.push(updates.content);
    }

    if (updatesList.length === 0) return null;

    values.push(id);
    await pool.query(
      `UPDATE cards SET ${updatesList.join(', ')} WHERE id = ?`,
      values
    );

    return this.getCardById(id);
  }

  async deleteCard(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM cards WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}

export default new CardModel(); 