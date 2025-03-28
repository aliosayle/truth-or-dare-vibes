#!/bin/bash

# Fix MySQL connection issues
echo "Fixing MySQL connection issues..."

# Create src/config directory if it doesn't exist
mkdir -p src/config

# Create db.ts in src/config
cat > src/config/db.ts << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('DB CONFIG LOADING from src/config/db.ts');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

export const pool = mysql.createPool({
  host: '127.0.0.1', // Force IPv4 rather than IPv6 localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Database pool created in src/config/db.ts with HARDCODED host: 127.0.0.1');

export default pool;
EOF

# Create db.config.ts in src/config
cat > src/config/db.config.ts << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from root server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('DB CONFIG LOADING from src/config/db.config.ts');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

export const pool = mysql.createPool({
  host: '127.0.0.1', // Force IPv4 rather than IPv6 localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Database pool created in src/config/db.config.ts with HARDCODED host: 127.0.0.1');

export default pool;
EOF

# Also update the root config files for good measure
cat > config/db.ts << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from current directory
dotenv.config();

console.log('DB CONFIG LOADING from config/db.ts');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

export const pool = mysql.createPool({
  host: '127.0.0.1', // Force IPv4 rather than IPv6 localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Database pool created in config/db.ts with HARDCODED host: 127.0.0.1');

export default pool;
EOF

cat > config/db.config.ts << 'EOF'
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from current directory
dotenv.config();

console.log('DB CONFIG LOADING from config/db.config.ts');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

export const pool = mysql.createPool({
  host: '127.0.0.1', // Force IPv4 rather than IPv6 localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'goldfish',
  database: process.env.DB_NAME || 'truth_or_dare',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Database pool created in config/db.config.ts with HARDCODED host: 127.0.0.1');

export default pool;
EOF

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  cat > .env << 'EOF'
PORT=3001
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=goldfish
DB_NAME=truth_or_dare
JWT_SECRET=your-super-secret-key-change-this-in-production
EOF
  echo "Created .env file"
else
  echo ".env file already exists"
fi

echo "Connection fix complete!"
echo "Please restart your server with 'npm run dev'" 