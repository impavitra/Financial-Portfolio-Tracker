#!/bin/bash

# Financial Portfolio Tracker - Development Startup Script
echo "🚀 Starting Financial Portfolio Tracker Development Environment"
echo "=============================================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 21+ to run the backend."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ to run the frontend."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL before running the application."
    echo "   On Ubuntu/Debian: sudo systemctl start postgresql"
    echo "   On macOS: brew services start postgresql"
    echo "   On Windows: Start PostgreSQL service"
fi

echo ""
echo "📦 Starting Backend (Spring Boot)..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

echo "⏳ Waiting for backend to start..."
sleep 10

echo ""
echo "🌐 Starting Frontend (React + Vite)..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers started!"
echo ""
echo "🔗 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8081"
echo ""
echo "📚 API Documentation: http://localhost:8081/api"
echo ""
echo "🛑 To stop all servers, press Ctrl+C"
echo ""

# Wait for user to stop
wait

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ All servers stopped."
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM
