import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import adminRoutes from './routes/admin.js';
import profileRoutes from './routes/profile.js';
import reviewsRoutes from './routes/reviews.js';

// Import middleware
import { requestLogger, errorLogger } from './middleware/logger.js';
import { securityHeaders, rateLimiter } from './middleware/security.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// Security middleware (apply early)
app.use(securityHeaders);

// Request logging (development)
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Rate limiting
app.use(rateLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Make session available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);
app.use('/profile', profileRoutes);
app.use('/reviews', reviewsRoutes);

// Error handling middleware
app.use(errorLogger);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';
  
  // Log error details
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, {
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  
  res.status(statusCode).render('error', {
    title: 'Error',
    message,
    error: process.env.NODE_ENV === 'development' ? {
      message: err.message,
      stack: err.stack
    } : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page not found',
    error: {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Eveera Tiara E-commerce Server`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});

