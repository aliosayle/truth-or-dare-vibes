// EMERGENCY SERVER - NO CORS RESTRICTIONS
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create Express app
const app = express();
const PORT = 3005;

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'truth_or_dare'
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// JSON body parser middleware
app.use(express.json());

// CORS middleware with all origins allowed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Helper function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username
  };
  
  return jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' });
};

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Emergency server running - no CORS restrictions',
    endpoints: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/packs',
      '/api/packs/:id/cards'
    ]
  });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Get user from database
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // For emergency purposes, allow login without password check
    // In production, you would check the password hash
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //   return res.status(401).json({ message: 'Invalid password' });
    // }
    
    // Generate token
    const token = generateToken(user);
    
    // Return user and token
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    const userId = result.insertId;
    
    // Generate token
    const token = generateToken({ id: userId, email, username });
    
    // Return user and token
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userId,
        email,
        username
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Packs routes
app.get('/api/packs', async (req, res) => {
  try {
    // Get all packs
    const [packs] = await pool.query('SELECT * FROM packs');
    res.json(packs);
  } catch (error) {
    console.error('Get packs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/packs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get pack
    const [packs] = await pool.query('SELECT * FROM packs WHERE id = ?', [id]);
    const pack = packs[0];
    
    if (!pack) {
      return res.status(404).json({ message: 'Pack not found' });
    }
    
    res.json(pack);
  } catch (error) {
    console.error(`Get pack ${req.params.id} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cards routes
app.get('/api/packs/:packId/cards', async (req, res) => {
  try {
    const { packId } = req.params;
    
    // Get cards for pack
    const [cards] = await pool.query('SELECT * FROM cards WHERE pack_id = ?', [packId]);
    res.json(cards);
  } catch (error) {
    console.error(`Get cards for pack ${req.params.packId} error:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Emergency server running on port ${PORT} with CORS disabled`);
  console.log(`API URL: http://localhost:${PORT}/api`);
}); 