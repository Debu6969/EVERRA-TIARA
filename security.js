/**
 * Security Middleware
 * Provides security-related middleware functions
 */

// Rate limiting (simple in-memory store - use Redis in production)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // Max requests per window

export const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // Clean old entries
  if (requestCounts.has(ip)) {
    const { count, resetTime } = requestCounts.get(ip);
    if (now > resetTime) {
      requestCounts.delete(ip);
    } else if (count >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }
  }
  
  // Update or create entry
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
  } else {
    const entry = requestCounts.get(ip);
    entry.count++;
  }
  
  next();
};

// Security headers
export const securityHeaders = (req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Content Security Policy (basic)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  );
  
  next();
};

// CSRF protection (simple token-based - use csrf package in production)
export const csrfProtection = (req, res, next) => {
  // Skip for GET requests
  if (req.method === 'GET') {
    return next();
  }
  
  // For POST/PUT/DELETE, check if session exists
  if (!req.session) {
    return res.status(403).json({ error: 'Session required' });
  }
  
  next();
};

