/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error response
  let error = {
    success: false,
    message: err.message || 'Internal server error'
  };

  // Handle specific error types
  if (err.code === '23505') { // PostgreSQL unique violation
    error.message = 'Duplicate entry found';
    res.status(409);
  } else if (err.code === '23503') { // PostgreSQL foreign key violation
    error.message = 'Referenced record not found';
    res.status(400);
  } else if (err.code === '23502') { // PostgreSQL not null violation
    error.message = 'Required field missing';
    res.status(400);
  } else if (err.message.includes('not found')) {
    res.status(404);
  } else {
    res.status(500);
  }

  res.json(error);
};

module.exports = errorHandler;
