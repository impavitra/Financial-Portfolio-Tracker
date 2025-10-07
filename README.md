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
- PostgreSQL

### Running Locally

#### Option 1: Docker Compose (Recommended)

```bash
# Start both backend and PostgreSQL with one command
docker-compose up --build

# Access the application
# Backend: http://localhost:8082
# Frontend: http://localhost:5173 (run separately)
```

#### Option 2: Manual Setup

1. **Clone the repository**
2. **Start PostgreSQL** (or use Docker): `docker run -d -p 5432:5432 -e POSTGRES_DB=portfolio_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=Pavitra@7019 postgres:15`
3. **Start the backend**: `cd backend && ./mvnw spring-boot:run`
4. **Start the frontend**: `cd frontend && npm install && npm run dev`
5. **Access the application**: http://localhost:5173

## 🚀 Live Demo

### **Frontend**: https://financial-portfolio-tracker-rose.vercel.app/login

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

### Frontend (Vercel)

- **Status**: ✅ Deployed
- **Platform**: Vercel
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

## Backend

- Backend document can be found [here](./backend/README.md)

## Frontend

- Frontend document can be found [here](./frontend/README.md)
