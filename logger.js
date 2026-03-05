/**
 * Simple Request Logger Middleware
 * Logs HTTP requests with timestamp, method, URL, and status code
 */

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ` +
      `${res.statusCode} - ${duration}ms`
    );
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

// Error logger
export const errorLogger = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  next(err);
};

