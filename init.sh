#!/bin/bash

# This script will set up the backend, frontend, and PostgreSQL services in Docker

echo "Setting up project..."

# Step 1: Clone repository if not already cloned (uncomment if needed)
# git clone https://your-repository-url.git
# cd your-repository-directory

# Step 2: Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Step 3: Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Step 4: Create a .env file for backend and frontend
echo "Creating .env files..."
if [ ! -f "./backend/.env" ]; then
  cat <<EOL > ./backend/.env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

DATABASE_URL=postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@postgres:5432/$POSTGRES_DB
FLASK_ENV=production
SECRET_KEY=your_secret_key
EOL
fi

if [ ! -f ".env" ]; then
  cat <<EOL > .env
DATABASE_URL=postgresql://postgres:password123@localhost:5432/blogdb
EOL
fi

# Step 5: Start Docker containers
echo "Starting Docker containers..."
docker-compose up --build -d

# Step 6: Run migrations
echo "Running database migrations..."
docker exec -it blog_backend flask db upgrade

echo "Setup complete. Your application should now be running!"
