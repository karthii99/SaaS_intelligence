require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const clientRoutes = require('./routes/clientRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware - Dynamic configuration for frontend compatibility
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (
      origin.includes("localhost") ||
      origin.includes(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (non-intrusive)
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: "ok"
  });
});

// API health check endpoint (for frontend compatibility)
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: "ok"
  });
});

// Test endpoint for debugging frontend connection
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Frontend-Backend connection working!',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin || 'No origin header'
  });
});

// API routes
app.use('/api/clients', clientRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SaaS Intelligence Decision-Support System API',
    version: '1.0.0',
    endpoints: {
      'GET /api/clients': 'Get all clients with dashboard data',
      'GET /api/clients/:id': 'Get client with full intelligence',
      'POST /api/clients/seed': 'Seed database with sample data',
      'GET /health': 'Health check'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 SaaS Intelligence API running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Documentation: http://localhost:${PORT}/`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
});

module.exports = app;
