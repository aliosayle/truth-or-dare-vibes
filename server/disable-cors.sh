#!/bin/bash

echo "Disabling CORS restrictions..."

# Backup the original index.ts file
echo "Backing up original index.ts file..."
cp src/index.ts src/index.ts.bak

# Create a new index.ts file with completely open CORS
cat > src/index.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Try to import routes with different possible paths
let packRoutes, cardRoutes, authRoutes;
try {
  // First try direct imports
  packRoutes = require('./routes/pack.routes').default;
  cardRoutes = require('./routes/card.routes').default;
  authRoutes = require('./routes/auth.routes').default;
} catch (e) {
  try {
    // Then try without 'default'
    packRoutes = require('./routes/pack.routes');
    cardRoutes = require('./routes/card.routes');
    authRoutes = require('./routes/auth.routes');
  } catch (e) {
    try {
      // Try from parent directory
      packRoutes = require('../routes/pack.routes');
      cardRoutes = require('../routes/card.routes');
      authRoutes = require('../routes/auth.routes');
    } catch (e) {
      console.error('Failed to import route files:', e);
      // Use empty router as fallback
      const router = express.Router();
      packRoutes = router;
      cardRoutes = router;
      authRoutes = router;
    }
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

console.log('Setting up Express server with COMPLETELY OPEN CORS...');

// Middleware - Allow ALL origins with no restrictions
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Also keep the regular CORS module as a backup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request Headers:', JSON.stringify(req.headers));
  if (req.method !== 'GET') {
    console.log('Request Body:', JSON.stringify(req.body));
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/cards', cardRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Truth or Dare API is running - CORS UNRESTRICTED' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const server = app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
  console.log('*** CORS RESTRICTIONS DISABLED - ALL ORIGINS ALLOWED ***');
  console.log('Available endpoints:');
  console.log(`- GET    /                 (API health check)`);
  console.log(`- POST   /api/auth/login   (Login)`);
  console.log(`- POST   /api/auth/register (Register)`);
  console.log(`- GET    /api/auth/me      (Get current user)`);
  console.log(`- GET    /api/packs        (Get all packs)`);
  console.log(`- GET    /api/cards        (Get all cards)`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
EOF

echo "CORS restrictions disabled. Restart your server with 'npm run dev' to apply changes."
echo "To restore original settings, run: cp src/index.ts.bak src/index.ts" 