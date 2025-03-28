import pool from '../config/db.config';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Pack interface
export interface Pack {
  id: string;
  name: string;
  description: string;
  created_by?: string;
  creator_username?: string;
  created_at?: Date;
  updated_at?: Date;
  cards?: Card[];
}

// Card interface (for including cards in packs)
export interface Card {
  id: string;
  content: string;
  type: 'truth' | 'dare';
  pack_id: string;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Create a new pack
export const createPack = async (pack: Omit<Pack, 'id' | 'created_at' | 'updated_at' | 'creator_username'>): Promise<Pack> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO packs (name, description, created_by) VALUES (?, ?, ?)',
    [pack.name, pack.description, pack.created_by]
  );
  
  const insertId = result.insertId;
  return { id: insertId.toString(), ...pack };
};

// Get all packs with their cards
export const getAllPacks = async (): Promise<Pack[]> => {
  // First get all packs
  const [packs] = await pool.query<RowDataPacket[]>(`
    SELECT p.id, p.name, p.description, p.created_by, p.created_at, p.updated_at,
    u.username as creator_username
    FROM packs p
    LEFT JOIN users u ON p.created_by = u.id
    ORDER BY p.created_at DESC
  `);
  
  // If no packs, return empty array
  if (!packs.length) {
    return [];
  }
  
  // Now get all cards for these packs
  const packIds = packs.map(pack => pack.id);
  const [cards] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM cards WHERE pack_id IN (?)`,
    [packIds]
  );
  
  // Group cards by pack_id
  const cardsByPack: Record<string, Card[]> = {};
  cards.forEach((card: any) => {
    if (!cardsByPack[card.pack_id]) {
      cardsByPack[card.pack_id] = [];
    }
    cardsByPack[card.pack_id].push({
      id: card.id,
      content: card.content,
      type: card.type,
      pack_id: card.pack_id,
      created_by: card.created_by,
      created_at: card.created_at,
      updated_at: card.updated_at
    });
  });
  
  // Combine packs with their cards
  return packs.map(pack => ({
    id: pack.id,
    name: pack.name,
    description: pack.description,
    created_by: pack.created_by,
    created_at: pack.created_at,
    updated_at: pack.updated_at,
    creator_username: pack.creator_username,
    cards: cardsByPack[pack.id] || []
  }));
};

// Get a pack by ID with its cards
export const getPackById = async (id: string): Promise<Pack | null> => {
  // Get the pack
  const [packs] = await pool.query<RowDataPacket[]>(
    `SELECT p.*, u.username as creator_username 
     FROM packs p
     LEFT JOIN users u ON p.created_by = u.id
     WHERE p.id = ?`,
    [id]
  );
  
  if (!packs.length) {
    return null;
  }
  
  const pack = packs[0];
  
  // Get cards for this pack
  const [cards] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM cards WHERE pack_id = ?',
    [id]
  );
  
  return {
    id: pack.id,
    name: pack.name,
    description: pack.description,
    created_by: pack.created_by,
    created_at: pack.created_at,
    updated_at: pack.updated_at,
    creator_username: pack.creator_username,
    cards: cards as Card[]
  };
};

// Update a pack
export const updatePack = async (id: string, pack: Partial<Pack>): Promise<Pack | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE packs SET name = ?, description = ? WHERE id = ?',
    [pack.name, pack.description, id]
  );
  
  if (result.affectedRows === 0) {
    return null;
  }
  
  return getPackById(id);
};

// Delete a pack
export const deletePack = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'DELETE FROM packs WHERE id = ?',
    [id]
  );
  
  return result.affectedRows > 0;
}; 