# Portfolio Management System - Backend

A Spring Boot REST API for managing investment portfolios with real-time stock data integration and AI-powered insights.

## Features

- **User Authentication**: JWT-based secure authentication
- **Portfolio Management**: Create, view, and manage investment portfolios
- **Asset Management**: Add/remove stocks and ETFs by ticker symbol
- **Real-time Stock Data**: Integration with Alpha Vantage API for live stock prices
- **AI/ML Insights**: Diversification scoring, risk assessment, and investment recommendations
- **Database**: PostgreSQL for persistent data storage

## Technology Stack

- **Java 21**
- **Spring Boot 3.5.6**
- **Spring Security** (JWT authentication)
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Lombok**
- **Jackson** (JSON processing)

## Prerequisites

- Java 21+
- Maven 3.6+
- PostgreSQL 12+
- Alpha Vantage API key (optional, for real-time data)

## Setup

### 1. Database Setup

```sql
-- Create database
CREATE DATABASE portfolio_db;

-- Create user (optional)
CREATE USER portfolio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
```

### 2. Configuration

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=postgres
spring.datasource.password=your_password

# Alpha Vantage API (Optional)
# Get your free API key from: https://www.alphavantage.co/support/#api-key
alpha.vantage.api.key=your_api_key_here

# JWT Configuration
jwt.secret=your-256-bit-secret-key-here
jwt.expiration=86400000
```

### 3. Run the Application

```bash
# Using Maven
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

The API will be available at `http://localhost:8081`

## API Endpoints

### Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | User login        |

**Request Body (Register/Login):**

```json
{
  "username": "string",
  "password": "string",
  "email": "string" (register only)
}
```

### Portfolio Management

| Method | Endpoint                               | Description                 |
| ------ | -------------------------------------- | --------------------------- |
| POST   | `/api/portfolios`                      | Create new portfolio        |
| GET    | `/api/portfolios`                      | Get user's portfolios       |
| GET    | `/api/portfolios/{id}`                 | Get portfolio details       |
| POST   | `/api/portfolios/{id}/assets`          | Add asset to portfolio      |
| DELETE | `/api/portfolios/{id}/assets/{ticker}` | Remove asset from portfolio |

**Request Body (Create Portfolio):**

```json
{
  "name": "My Investment Portfolio"
}
```

**Request Body (Add Asset):**

```json
{
  "ticker": "AAPL",
  "quantity": 10.0
}
```

### Stock Information

| Method | Endpoint                     | Description                    |
| ------ | ---------------------------- | ------------------------------ |
| GET    | `/api/stocks/{ticker}/price` | Get current stock price        |
| GET    | `/api/stocks/{ticker}/info`  | Get detailed stock information |

### Portfolio Insights

| Method | Endpoint                        | Description                       |
| ------ | ------------------------------- | --------------------------------- |
| GET    | `/api/portfolios/{id}/insights` | Get AI-powered portfolio insights |

**Insights Response:**

```json
{
  "diversificationScore": 85.5,
  "riskLevel": "Medium",
  "totalValue": 15000.0,
  "assetCount": 5,
  "recommendations": [
    "Consider adding more diverse assets",
    "Look into ETFs for broad market exposure"
  ],
  "analysis": {
    "summary": "Portfolio with 5 assets worth $15000.00",
    "strengths": ["Multiple assets for diversification"],
    "weaknesses": ["Limited historical data"]
  },
  "suggestedAssets": [
    "AAPL - Apple Inc. (Technology)",
    "VTI - Vanguard Total Stock Market ETF"
  ]
}
```

## Authentication

All endpoints (except `/api/auth/**`) require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Users Table

- `id` (Primary Key)
- `username` (Unique)
- `password` (Encrypted)
- `email`

### Portfolios Table

- `id` (Primary Key)
- `name`
- `user_id` (Foreign Key)
- `created_at`

### Portfolio Assets Table

- `id` (Primary Key)
- `portfolio_id` (Foreign Key)
- `ticker`
- `quantity`
- `current_price`
- `added_at`

## Stock Data Integration

The application integrates with Alpha Vantage API for real-time stock data:

- **Real-time Prices**: Fetches current stock prices
- **Company Information**: Gets company name, sector, and industry
- **Fallback System**: Uses mock data when API is unavailable
- **Rate Limiting**: Handles API rate limits gracefully

### Supported Tickers

The system supports all major stock tickers including:

- Individual stocks: AAPL, MSFT, GOOGL, TSLA, AMZN, META, etc.
- ETFs: VTI, SPY, QQQ, etc.
- International stocks: Various global markets

## AI/ML Features

### Diversification Score

- Calculates portfolio diversification based on asset count and sector distribution
- Score range: 0-100
- Higher scores indicate better diversification

### Risk Assessment

- **Low Risk**: 5+ assets, $10,000+ value
- **Medium Risk**: 3+ assets, $5,000+ value
- **High Risk**: Fewer assets or lower value

### Investment Recommendations

- AI-generated suggestions based on portfolio analysis
- Sector diversification recommendations
- Asset suggestions to improve portfolio balance

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid JWT token
- **403 Forbidden**: Access denied to resource
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

## Example Usage

### 1. Register and Login

```bash
# Register
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123","email":"john@example.com"}'

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

### 2. Create Portfolio

```bash
curl -X POST http://localhost:8081/api/portfolios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"name":"My Tech Portfolio"}'
```

### 3. Add Assets

```bash
curl -X POST http://localhost:8081/api/portfolios/1/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"ticker":"AAPL","quantity":10}'
```

### 4. Get Portfolio Insights

```bash
curl -X GET http://localhost:8081/api/portfolios/1/insights \
  -H "Authorization: Bearer <your-token>"
```

## 🔧 Development

### Running Tests

```bash
mvn test
```

### Building for Production

```bash
mvn clean package -Pproduction
```

### Database Migration

The application uses Hibernate auto-update mode. For production, consider using Flyway or Liquibase for database migrations.

## License

This project is part of a portfolio management system assignment.
