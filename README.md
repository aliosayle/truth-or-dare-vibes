# Truth or Dare Game

A fun, interactive Truth or Dare game built with React, TypeScript, and MySQL.

## Features

- Browse different packs of Truth or Dare cards
- Play the game with friends
- Admin panel for managing packs and cards
- User authentication (admin, premium, normal users)

## Local Development Setup

### Prerequisites

- Node.js and npm
- MySQL server running on localhost
- MySQL user: `root` with password: `goldfish`

### Quick Setup

Run the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Create the required database
2. Import the schema and initial data
3. Install dependencies for the frontend and backend

### Manual Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd truth-or-dare-vibes
```

2. Set up the database:
```bash
# Log into MySQL
mysql -u root -p'goldfish'

# Create the database
CREATE DATABASE truth_or_dare;
USE truth_or_dare;

# Exit MySQL
exit

# Import the schema
mysql -u root -p'goldfish' < server/database.sql
```

3. Install dependencies and start development servers:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
npm run build
npm run dev

# In a new terminal, start the frontend
cd ..
npm run dev
```

## Deployment

To deploy to the remote server:

1. Update the `GITHUB_REPO` in `deploy.sh` to your GitHub repository URL
2. Make the script executable and run it:
```bash
chmod +x deploy.sh
./deploy.sh
```

This will:
1. SSH into the remote server
2. Install required dependencies
3. Clone the repository
4. Set up the database
5. Configure services to run the application
6. Set up Nginx as a reverse proxy (if installed)

### Manual Server Setup

If you prefer to set up the server manually:

1. SSH into your server:
```bash
ssh root@161.97.177.233
```

2. Install dependencies:
```bash
apt-get update
apt-get install -y git nodejs npm mysql-server
```

3. Clone the repository:
```bash
mkdir -p /var/www/truth-or-dare
cd /var/www/truth-or-dare
git clone <repository-url> .
```

4. Set up MySQL:
```bash
mysql -u root -p'goldfish'
CREATE DATABASE truth_or_dare;
exit
mysql -u root -p'goldfish' < /var/www/truth-or-dare/server/database.sql
```

5. Build and run the application:
```bash
# Frontend
cd /var/www/truth-or-dare
npm install
npm run build

# Backend
cd /var/www/truth-or-dare/server
npm install
npm run build
npm run start
```

## Default Login

- Username: `admin`
- Password: `admin123`

## Credits

- Template provided by [lovable.dev](https://lovable.dev)
