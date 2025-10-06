# Financial Portfolio Tracker

A full-stack web application for managing financial portfolios with real-time stock data.

## Features

- User authentication and authorization
- Portfolio management
- Real-time stock data integration
- Asset tracking and insights
- Modern React frontend with Spring Boot backend

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Spring Boot, Java 21, Maven
- **Database**: H2 (in-memory for free tier), PostgreSQL (local development)
- **Authentication**: JWT
- **Deployment**: Render (Backend), Vercel/Netlify (Frontend)

## Quick Start

### Prerequisites

- Java 21
- Node.js 18+
- PostgreSQL

### Running Locally

#### Option 1: Docker Compose (Recommended)
```bash
# Start both backend and PostgreSQL with one command
docker-compose up --build

# Access the application
# Backend: http://localhost:8080
# Frontend: http://localhost:5173 (run separately)
```

#### Option 2: Manual Setup
1. **Clone the repository**
2. **Start PostgreSQL** (or use Docker): `docker run -d -p 5432:5432 -e POSTGRES_DB=portfolio_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=Pavitra@7019 postgres:15`
3. **Start the backend**: `cd backend && ./mvnw spring-boot:run`
4. **Start the frontend**: `cd frontend && npm install && npm run dev`
5. **Access the application**: http://localhost:5173

## 🚀 Live Demo

### **Frontend**: [Your Frontend URL]
- Deployed on Vercel/Netlify
- Connected to backend API

### **Backend**: https://financial-portfolio-tracker.onrender.com
- Deployed on Render
- API endpoints working
- JWT authentication enabled

## Deployment

### Backend (Render)

- **Live URL**: https://financial-portfolio-tracker.onrender.com
- **Health Check**: https://financial-portfolio-tracker.onrender.com/actuator/health
- **Auto-deploys** from main branch
- **Uses Docker** for containerization
- **H2 in-memory database** (no external database required for free tier)
- **Free tier** - may take 30-60 seconds to wake up after inactivity

### Frontend (Vercel/Netlify)

- **Status**: ✅ Deployed
- **Platform**: Vercel or Netlify
- **Connected to**: Backend API at https://financial-portfolio-tracker.onrender.com

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/portfolios` - Get user portfolios
- `POST /api/portfolios` - Create portfolio
- `GET /api/stocks/search` - Search stocks
- `GET /actuator/health` - Health check

## Testing the Deployed Backend

### ✅ Register User (Working)

```bash
curl -X POST https://financial-portfolio-tracker.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

### ✅ Login (Working)

```bash
curl -X POST https://financial-portfolio-tracker.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

### Health Check

```bash
curl https://financial-portfolio-tracker.onrender.com/actuator/health
```

_Note: Health endpoint may show 500 error due to H2 database configuration, but API endpoints work correctly._

## 🐳 Docker Compose

The project includes a `docker-compose.yml` file for easy local development setup:

### Services
- **PostgreSQL Database**: Port 5432
- **Backend API**: Port 8080
- **Networking**: Services communicate via internal network

### Commands
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up --build --force-recreate
```

### Environment Variables
- `POSTGRES_DB=portfolio_db`
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=Pavitra@7019`
- `JWT_SECRET=mySecretKey123456789012345678901234567890`
- `ALPHA_VANTAGE_API_KEY=demo`

## Troubleshooting

### 502 Bad Gateway Error

- **Wait 2-3 minutes** - Free tier takes time to start
- **Check Render logs** for error messages
- **Service spins down** after 15 minutes of inactivity
- **First request** after spin-down takes 30-60 seconds

### Docker Issues

- **Port conflicts**: Make sure ports 5432 and 8080 are available
- **Build issues**: Run `docker-compose up --build --force-recreate`
- **Database connection**: Wait for PostgreSQL to fully start before backend

## Backend

- Backend document can be found [here](./backend/README.md)

## Frontend

- Frontend document can be found [here](./frontend/README.md)
