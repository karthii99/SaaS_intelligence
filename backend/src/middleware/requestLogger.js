/**
 * Non-intrusive request logging middleware
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  
  // Log only API endpoints
  if (url.startsWith('/api/')) {
    console.log(`[${timestamp}] ${method} ${url}`);
  }
  
  next();
};

module.exports = requestLogger;
