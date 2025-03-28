# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6c8cf826-95b6-4d27-b87d-1297725bef6d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6c8cf826-95b6-4d27-b87d-1297725bef6d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6c8cf826-95b6-4d27-b87d-1297725bef6d) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Truth or Dare Game

A modern web application for playing Truth or Dare with friends, featuring themed card packs and a cultural twist!

## Features

- User authentication (admin, premium, and normal users)
- Browse and play with different card packs
- Admin panel for managing packs and cards
- Mobile-friendly design
- RESTful API backend with PostgreSQL database

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT

## Deployment

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd truth-or-dare-vibes
   ```

2. Install dependencies:
   ```
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   ```

3. Set up the database:
   ```
   # Create PostgreSQL database
   psql -U postgres
   CREATE DATABASE truth_or_dare;
   \q
   
   # Run the database initialization script
   psql -U postgres -d truth_or_dare -f server/database.sql
   ```

4. Start the development servers:
   ```
   # Start backend server (from server directory)
   npm run dev
   
   # In a separate terminal, start frontend (from project root)
   npm run dev
   ```

### Remote Server Deployment (161.97.177.233)

1. Connect to the server:
   ```
   ssh user@161.97.177.233
   ```

2. Clone the repository:
   ```
   git clone <repository-url>
   cd truth-or-dare-vibes
   ```

3. Install dependencies:
   ```
   npm install
   cd server
   npm install
   ```

4. Set up the database:
   ```
   # Create PostgreSQL database
   sudo -u postgres psql
   CREATE DATABASE truth_or_dare;
   \q
   
   # Run the database initialization script
   sudo -u postgres psql -d truth_or_dare -f database.sql
   ```

5. Configure environment variables:
   ```
   # Create .env file in server directory
   cat > .env << EOL
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=truth_or_dare
   JWT_SECRET=your_jwt_secret
   PORT=3001
   EOL
   ```

6. Build the frontend:
   ```
   cd ..
   npm run build
   ```

7. Set up PM2 for process management:
   ```
   # Install PM2 globally
   npm install -g pm2
   
   # Start the backend server
   cd server
   pm2 start index.ts --name "truth-or-dare-backend" --interpreter ./node_modules/.bin/ts-node
   
   # Start the frontend server (from project root)
   cd ..
   pm2 start --name "truth-or-dare-frontend" -- npm run preview -- --host 0.0.0.0
   ```

8. Configure Nginx (optional):
   ```
   sudo nano /etc/nginx/sites-available/truth-or-dare
   ```

   Add the following configuration:
   ```
   server {
       listen 80;
       server_name 161.97.177.233;

       location /api {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       location / {
           proxy_pass http://localhost:4173;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Create a symlink and restart Nginx:
   ```
   sudo ln -s /etc/nginx/sites-available/truth-or-dare /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Git Commands

```
# Add all changes
git add .

# Commit changes
git commit -m "Update: Configure app for remote server deployment"

# Push to GitHub
git push origin main
```

## Credits

- UI template by [lovable.dev](https://lovable.dev)

## License

MIT
