import pool from '../config/db.config';
import { v4 as uuidv4 } from 'uuid';
import { Card } from './card.model';

export interface Pack {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  cards?: Card[];
}

export interface PackCreate {
  name: string;
  description: string;
  created_by: string;
}

class PackModel {
  async getAllPacks(): Promise<Pack[]> {
    try {
      console.log('Getting all packs...');
      const [rows] = await pool.query('SELECT * FROM packs');
      console.log('Fetched packs:', rows);
      const packs = rows as Pack[];
      
      // Fetch cards for each pack
      for (const pack of packs) {
        console.log(`Fetching cards for pack ${pack.id}...`);
        const [cards] = await pool.query('SELECT * FROM cards WHERE packId = ?', [pack.id]);
        console.log(`Fetched ${(cards as any[]).length} cards for pack ${pack.id}`);
        pack.cards = cards as Card[];
      }
      
      return packs;
    } catch (error) {
      console.error('Error in getAllPacks:', error);
      throw error;
    }
  }

  async getPackById(id: string): Promise<Pack | null> {
    try {
      console.log(`Getting pack by ID: ${id}`);
      const [rows] = await pool.query('SELECT * FROM packs WHERE id = ?', [id]);
      const pack = (rows as Pack[])[0];
      
      if (!pack) {
        console.log(`Pack with ID ${id} not found`);
        return null;
      }
      
      // Fetch cards for the pack
      console.log(`Fetching cards for pack ${id}...`);
      const [cards] = await pool.query('SELECT * FROM cards WHERE packId = ?', [id]);
      console.log(`Fetched ${(cards as any[]).length} cards for pack ${id}`);
      pack.cards = cards as Card[];
      
      return pack;
    } catch (error) {
      console.error(`Error in getPackById(${id}):`, error);
      throw error;
    }
  }

  async createPack(packData: PackCreate): Promise<Pack> {
    const id = uuidv4();
    
    const [result] = await pool.query(
      'INSERT INTO packs (id, name, description, created_by) VALUES (?, ?, ?, ?)',
      [id, packData.name, packData.description, packData.created_by]
    );
    
    const [pack] = await pool.query('SELECT * FROM packs WHERE id = ?', [id]);
    return (pack as Pack[])[0];
  }

  async updatePack(id: string, updates: Partial<PackCreate>): Promise<Pack | null> {
    const updatesList: string[] = [];
    const values: any[] = [];

    if (updates.name) {
      updatesList.push('name = ?');
      values.push(updates.name);
    }

    if (updates.description) {
      updatesList.push('description = ?');
      values.push(updates.description);
    }

    if (updatesList.length === 0) return null;

    values.push(id);
    await pool.query(
      `UPDATE packs SET ${updatesList.join(', ')} WHERE id = ?`,
      values
    );

    return this.getPackById(id);
  }

  async deletePack(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM packs WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}

export default new PackModel(); 