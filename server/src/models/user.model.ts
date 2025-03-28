import pool from '../config/db.config';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// User interface
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  type: 'admin' | 'premium' | 'normal';
  created_at?: Date;
  updated_at?: Date;
}

// Create a new user
export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO users (username, email, password, type) VALUES (?, ?, ?, ?)',
    [user.username, user.email, user.password, user.type]
  );
  
  const insertId = result.insertId;
  return { id: insertId.toString(), ...user };
};

// Get a user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const [users] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  
  if (!users.length) {
    return null;
  }
  
  return users[0] as User;
};

// Get a user by username
export const getUserByUsername = async (username: string): Promise<User | null> => {
  const [users] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  
  if (!users.length) {
    return null;
  }
  
  return users[0] as User;
};

// Get a user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const [users] = await pool.query<RowDataPacket[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  
  if (!users.length) {
    return null;
  }
  
  return users[0] as User;
};

// Update a user
export const updateUser = async (id: string, user: Partial<User>): Promise<User | null> => {
  let query = 'UPDATE users SET ';
  const params: any[] = [];
  
  // Build the query dynamically based on provided fields
  if (user.username) {
    query += 'username = ?, ';
    params.push(user.username);
  }
  
  if (user.email) {
    query += 'email = ?, ';
    params.push(user.email);
  }
  
  if (user.password) {
    query += 'password = ?, ';
    params.push(user.password);
  }
  
  if (user.type) {
    query += 'type = ?, ';
    params.push(user.type);
  }
  
  // Remove trailing comma and space
  query = query.slice(0, -2);
  
  // Add WHERE clause
  query += ' WHERE id = ?';
  params.push(id);
  
  const [result] = await pool.execute<ResultSetHeader>(query, params);
  
  if (result.affectedRows === 0) {
    return null;
  }
  
  return getUserById(id);
};

// Delete a user
export const deleteUser = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  
  return result.affectedRows > 0;
}; 