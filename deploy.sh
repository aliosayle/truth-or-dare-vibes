#!/bin/bash

# Truth or Dare Game Deployment Script
# This script sets up the application on the remote server

# Remote server details
SERVER_IP="161.97.177.233"
SERVER_USER="root"
REMOTE_DIR="/var/www/truth-or-dare"
GITHUB_REPO="https://github.com/yourusername/truth-or-dare-vibes.git"

echo "Deploying Truth or Dare application to $SERVER_IP..."

# SSH into server and run setup
ssh $SERVER_USER@$SERVER_IP << 'EOF'

# Install dependencies
apt-get update
apt-get install -y git nodejs npm mysql-server

# Set up MySQL
mysql -u root -p'goldfish' -e "
  CREATE USER IF NOT EXISTS 'truth_or_dare'@'localhost' IDENTIFIED BY 'goldfish';
  GRANT ALL PRIVILEGES ON truth_or_dare.* TO 'truth_or_dare'@'localhost';
  FLUSH PRIVILEGES;
"

# Create application directory
mkdir -p /var/www/truth-or-dare
cd /var/www/truth-or-dare

# Clone the repository (replace with your actual repo)
if [ -d ".git" ]; then
  git pull
else
  git clone $GITHUB_REPO .
fi

# Install dependencies for frontend
cd /var/www/truth-or-dare
npm install

# Build frontend
npm run build

# Install dependencies for backend
cd /var/www/truth-or-dare/server
npm install

# Create database and tables
mysql -u root -p'goldfish' < database.sql

# Create service files for systemd
cat > /etc/systemd/system/truth-or-dare-api.service << 'ENDSERVICE'
[Unit]
Description=Truth or Dare API
After=network.target

[Service]
Environment=NODE_ENV=production
Environment=PORT=3001
Environment=DB_HOST=localhost
Environment=DB_USER=root
Environment=DB_PASSWORD=goldfish
Environment=DB_NAME=truth_or_dare
Environment=JWT_SECRET=some-secret-key-change-this-in-production
Type=simple
User=root
ExecStart=/usr/bin/node /var/www/truth-or-dare/server/dist/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
ENDSERVICE

cat > /etc/systemd/system/truth-or-dare-frontend.service << 'ENDSERVICE'
[Unit]
Description=Truth or Dare Frontend
After=network.target

[Service]
Environment=NODE_ENV=production
Type=simple
User=root
WorkingDirectory=/var/www/truth-or-dare
ExecStart=/usr/bin/npm run preview
Restart=on-failure

[Install]
WantedBy=multi-user.target
ENDSERVICE

# Reload systemd, enable and start services
systemctl daemon-reload
systemctl enable truth-or-dare-api
systemctl enable truth-or-dare-frontend
systemctl start truth-or-dare-api
systemctl start truth-or-dare-frontend

# Set up Nginx (if installed)
if command -v nginx &> /dev/null; then
  cat > /etc/nginx/sites-available/truth-or-dare << 'ENDNGINX'
server {
    listen 80;
    server_name $SERVER_IP;

    location / {
        proxy_pass http://localhost:4173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
ENDNGINX

  ln -sf /etc/nginx/sites-available/truth-or-dare /etc/nginx/sites-enabled/
  nginx -t && systemctl restart nginx
fi

echo "Truth or Dare application deployed successfully!"
EOF

echo "Deployment completed!" 