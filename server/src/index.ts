import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Import routes
let authRoutes, packRoutes, cardRoutes;
try {
  authRoutes = require('../routes/auth').default;
  packRoutes = require('../routes/packs').default;
  cardRoutes = require('../routes/cards').default;
} catch (error) {
  try {
    authRoutes = require('./routes/auth').default;
    packRoutes = require('./routes/packs').default;
    cardRoutes = require('./routes/cards').default;
  } catch (error) {
    console.error('Error loading routes:', error);
    throw new Error('Failed to load routes');
  }
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://161.97.177.233:5173',
  'http://161.97.177.233:4173',
  'http://161.97.177.233',
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log(`CORS blocked for origin: ${origin}`);
      return callback(null, false);
    }
    
    console.log(`CORS allowed for origin: ${origin}`);
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Add preflight response for all routes
app.options('*', cors());

// CORS debug middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log(`Request from origin: ${origin}`);
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);
  next();
});

// Middleware
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'truth_or_dare'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

// Add routes
app.use('/api/auth', authRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/cards', cardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 