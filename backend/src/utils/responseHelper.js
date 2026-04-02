/**
 * Standardized response helper utility
 */
class ResponseHelper {
  /**
   * Success response
   */
  static success(data, message = 'Operation successful') {
    return {
      success: true,
      message,
      data
    };
  }

  /**
   * Error response
   */
  static error(message = 'Operation failed', code = 500) {
    const response = {
      success: false,
      message
    };
    
    if (code >= 500) {
      console.error(`Server Error: ${message}`);
    }
    
    return response;
  }

  /**
   * Validation error response
   */
  static validationError(message = 'Validation failed') {
    return {
      success: false,
      message,
      type: 'validation'
    };
  }

  /**
   * Not found response
   */
  static notFound(message = 'Resource not found') {
    return {
      success: false,
      message,
      type: 'not_found'
    };
  }
}

module.exports = ResponseHelper;
