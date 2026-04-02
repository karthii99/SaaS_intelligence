# SaaS Intelligence Decision-Support System

A production-grade backend system that transforms raw SaaS company data into structured intelligence for advisory board decision-making.

## 🧠 Overview

This is **NOT** a basic CRUD application. It's a sophisticated decision-support system that:

- Provides structured intelligence for SaaS companies
- Generates actionable insights and scores
- Supports advisory board decision-making
- Delivers ready-to-render intelligence data

## 🏗️ Architecture

```
src/
├── routes/          # API route definitions
├── controllers/     # Request/response handling
├── services/        # Business logic layer
├── intelligence/    # Core intelligence engine
├── db/             # Database configuration and schema
├── middleware/     # Express middleware
├── utils/          # Helper utilities
└── server.js       # Main application entry point
```

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 16+
- PostgreSQL (Neon recommended)
- npm or yarn

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database configuration
DATABASE_URL=postgresql://username:password@host:5432/database?sslmode=require
PORT=3000
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup & Seeding

```bash
# Run database setup and seeding
npm run seed
```

This will:
- Create the database schema
- Insert 5 realistic SaaS companies
- Generate intelligence data

### 5. Start the Server

```bash
# Development
npm run dev

# Production
npm start
```

## 📊 API Endpoints

### GET `/api/clients`

Returns optimized dashboard data with computed intelligence.

**Query Parameters:**
- `search` (optional): Search by client name
- `industry` (optional): Filter by industry

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "DataSync Analytics",
      "industry": "Data Analytics",
      "overview_short": "Enterprise-grade data analytics platform...",
      "score": 8.5,
      "positioning": "Leader",
      "verdict": "Strong",
      "key_insight": "DataSync Analytics is a strongly differentiated data analytics platform...",
      "offering_count": 5,
      "capability_count": 6,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET `/api/clients/:id`

Returns full structured intelligence for a single client.

**Response:**
```json
{
  "success": true,
  "data": {
    "client": {
      "id": 1,
      "name": "DataSync Analytics",
      "industry": "Data Analytics",
      "overview": "Enterprise-grade data analytics platform..."
    },
    "details": {
      "offerings": ["Real-time Dashboard Analytics", ...],
      "capabilities": ["Machine Learning Integration", ...],
      "benefits": ["Improved Decision Making", ...],
      "differentiators": ["Proprietary ML algorithms", ...],
      "pricing": "Startup: $999/month, ..."
    },
    "intelligence": {
      "summary": "DataSync Analytics is a data analytics company...",
      "positioning": "Leader",
      "strengths": ["Diverse product portfolio...", ...],
      "weaknesses": [],
      "risks": ["Product complexity may impact...", ...],
      "opportunities": ["AI/ML market expansion...", ...],
      "differentiator_score": 9.0,
      "market_score": 8.5,
      "product_score": 9.0,
      "pricing_score": 8.0,
      "moat_score": 8.5,
      "overall_score": 8.5,
      "verdict": "Strong",
      "best_fit": ["Enterprise clients seeking...", ...],
      "key_takeaway": "DataSync Analytics is a strongly differentiated..."
    }
  }
}
```

### POST `/api/clients/seed`

Seeds the database with realistic SaaS companies.

**Response:**
```json
{
  "success": true,
  "inserted": 5,
  "skipped": 0,
  "message": "Seeding completed safely"
}
```

## 🧠 Intelligence Engine

The core of the system is the intelligence engine that:

### Scoring System (0-10)
- **Differentiator Score** (25% weight): Based on unique differentiators
- **Product Score** (25% weight): Based on capabilities and offerings
- **Market Score** (20% weight): Based on offerings and benefits
- **Pricing Score** (15% weight): Based on pricing clarity and structure
- **Moat Score** (15% weight): Based on competitive advantages

### Positioning Classification
- **Leader**: 4+ offerings, 3+ differentiators, 4+ capabilities
- **Challenger**: 2+ offerings, 2+ differentiators
- **Niche**: Below challenger thresholds

### Verdict System
- **Strong**: Overall score ≥ 8.0
- **Moderate**: Overall score 6.0-7.9
- **Weak**: Overall score < 6.0

## 🗄️ Database Schema

### Clients Table
```sql
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(100) NOT NULL,
    overview TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ClientDetails Table
```sql
CREATE TABLE client_details (
    id SERIAL PRIMARY KEY,
    client_id INTEGER UNIQUE NOT NULL REFERENCES clients(id),
    offerings TEXT[],
    capabilities TEXT[],
    benefits TEXT[],
    differentiators TEXT[],
    pricing TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Adding New Intelligence Metrics

1. Update `src/intelligence/engine.js` with new scoring methods
2. Modify the `generateIntelligence` method to include new metrics
3. Update the `calculateOverallScore` method with new weights

### Adding New API Endpoints

1. Create controller method in `src/controllers/`
2. Add route in `src/routes/`
3. Update server.js to include new route

### Database Changes

1. Update `src/db/schema.sql`
2. Run `npm run seed` to apply changes
3. Update service layer as needed

## 🚀 Production Deployment

### Environment Variables
```bash
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourdomain.com
```

### Health Check
- `GET /health` - Service health status
- Returns service status, timestamp, and version

## 📈 Performance Features

- **JOIN Queries**: Single database calls for client + details
- **Indexed Columns**: Industry and client_id indexes
- **Connection Pooling**: PostgreSQL connection pool
- **Error Handling**: Comprehensive error management
- **Response Caching**: Ready-to-render intelligence data

## 🛡️ Security

- **Helmet**: Security headers
- **CORS**: Configurable cross-origin requests
- **Input Validation**: Request sanitization
- **SQL Injection Prevention**: Parameterized queries
- **Error Sanitization**: Safe error responses

## 📊 Sample Data

The seeder includes 5 realistic SaaS companies:

1. **DataSync Analytics** - Data Analytics
2. **CloudFlow Systems** - Cloud Infrastructure  
3. **SecureShield AI** - Cybersecurity
4. **RevenueMax CRM** - Customer Relationship Management
5. **DevOps Pipeline Pro** - DevOps Tools

Each includes:
- Realistic offerings and capabilities
- Meaningful differentiators
- Clear pricing structures
- Industry-specific details

## 🤝 Contributing

1. Follow the existing architecture patterns
2. Add tests for new features
3. Update documentation
4. Ensure intelligence engine consistency

## 📝 License

MIT License - see LICENSE file for details
