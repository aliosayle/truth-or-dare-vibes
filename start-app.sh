#!/bin/bash
# Start the Truth or Dare app

# Start backend server
echo "Starting backend server..."
cd server
npm start &
BACKEND_PID=$!
echo "Backend server started with PID: $BACKEND_PID"

# Allow backend to initialize
sleep 5

# Start frontend server
echo "Starting frontend server..."
cd ../
npm start -- --host 161.97.177.233 &
FRONTEND_PID=$!
echo "Frontend server started with PID: $FRONTEND_PID"

echo "App started successfully"
echo "Backend running on http://161.97.177.233:3001"
echo "Frontend running on http://161.97.177.233:3000"

# Wait for user to exit with Ctrl+C
echo "Press Ctrl+C to stop all servers"
wait $BACKEND_PID $FRONTEND_PID 