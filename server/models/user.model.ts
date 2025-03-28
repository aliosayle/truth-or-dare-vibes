import pool from '../config/db.config';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  email: string;
  type: 'admin' | 'premium' | 'normal';
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  type?: 'admin' | 'premium' | 'normal';
}

class UserModel {
  async createUser(userData: UserCreate): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const id = uuidv4();
    
    const [result] = await pool.query(
      'INSERT INTO users (id, username, email, password, type) VALUES (?, ?, ?, ?, ?)',
      [id, userData.username, userData.email, hashedPassword, userData.type || 'normal']
    );
    
    const [user] = await pool.query('SELECT id, username, email, type, created_at, updated_at FROM users WHERE id = ?', [id]);
    return (user as any[])[0];
  }

  async getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as any[])[0] || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT id, username, email, type, created_at, updated_at FROM users WHERE id = ?', [id]);
    return (rows as any[])[0] || null;
  }

  async updateUser(id: string, updates: Partial<UserCreate>): Promise<User | null> {
    const updatesList: string[] = [];
    const values: any[] = [];

    if (updates.username) {
      updatesList.push('username = ?');
      values.push(updates.username);
    }

    if (updates.email) {
      updatesList.push('email = ?');
      values.push(updates.email);
    }

    if (updates.password) {
      updatesList.push('password = ?');
      values.push(await bcrypt.hash(updates.password, 10));
    }

    if (updates.type) {
      updatesList.push('type = ?');
      values.push(updates.type);
    }

    if (updatesList.length === 0) return null;

    values.push(id);
    await pool.query(
      `UPDATE users SET ${updatesList.join(', ')} WHERE id = ?`,
      values
    );

    return this.getUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }

  async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query('SELECT id, username, email, type, created_at, updated_at FROM users');
    return rows as User[];
  }
}

export default new UserModel(); 