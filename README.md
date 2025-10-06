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

1. **Clone the repository**
2. **Start the backend**: `cd backend && ./mvnw spring-boot:run`
3. **Start the frontend**: `cd frontend && npm install && npm run dev`
4. **Access the application**: http://localhost:5173

## Deployment

### Backend (Render)

- **Live URL**: https://financial-portfolio-tracker.onrender.com
- **Health Check**: https://financial-portfolio-tracker.onrender.com/actuator/health
- **Auto-deploys** from main branch
- **Uses Docker** for containerization
- **H2 in-memory database** (no external database required for free tier)
- **Free tier** - may take 30-60 seconds to wake up after inactivity

### Frontend (Vercel/Netlify)

- Deploy the `frontend` folder to Vercel or Netlify
- Update API endpoints to point to the deployed backend

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/portfolios` - Get user portfolios
- `POST /api/portfolios` - Create portfolio
- `GET /api/stocks/search` - Search stocks
- `GET /actuator/health` - Health check

## Testing the Deployed Backend

### Health Check

```bash
curl https://financial-portfolio-tracker.onrender.com/actuator/health
```

### Register User

```bash
curl -X POST https://financial-portfolio-tracker.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST https://financial-portfolio-tracker.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "password123"}'
```

## Troubleshooting

### 502 Bad Gateway Error

- **Wait 2-3 minutes** - Free tier takes time to start
- **Check Render logs** for error messages
- **Service spins down** after 15 minutes of inactivity
- **First request** after spin-down takes 30-60 seconds

## Backend

- Backend document can be found [here](./backend/README.md)

## Frontend

- Frontend document can be found [here](./frontend/README.md)
