/**
 * Input Validation Middleware
 * Provides validation functions for common input types
 */

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate email format
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required and must be a string' };
  }
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' };
  }
  return { valid: true };
};

// Validate password strength
export const validatePassword = (password, minLength = 6) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < minLength) {
    return { valid: false, error: `Password must be at least ${minLength} characters` };
  }
  return { valid: true };
};

// Validate required fields
export const validateRequired = (fields, data) => {
  const missing = [];
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missing.push(field);
    }
  }
  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missing.join(', ')}`
    };
  }
  return { valid: true };
};

// Validate price (must be positive number)
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    return { valid: false, error: 'Price must be a positive number' };
  }
  return { valid: true, value: numPrice };
};

// Validate stock (must be non-negative integer)
export const validateStock = (stock) => {
  const numStock = parseInt(stock);
  if (isNaN(numStock) || numStock < 0) {
    return { valid: false, error: 'Stock must be a non-negative integer' };
  }
  return { valid: true, value: numStock };
};

// Sanitize string input (basic XSS prevention)
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// Middleware to validate registration data
export const validateRegistration = (req, res, next) => {
  const { email, password, confirmPassword, fullName } = req.body;

  // Validate required fields
  const requiredCheck = validateRequired(['email', 'password', 'confirmPassword', 'fullName'], req.body);
  if (!requiredCheck.valid) {
    return res.render('auth/register', {
      title: 'Register',
      error: requiredCheck.error
    });
  }

  // Validate email
  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) {
    return res.render('auth/register', {
      title: 'Register',
      error: emailCheck.error
    });
  }

  // Validate password
  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    return res.render('auth/register', {
      title: 'Register',
      error: passwordCheck.error
    });
  }

  // Check password match
  if (password !== confirmPassword) {
    return res.render('auth/register', {
      title: 'Register',
      error: 'Passwords do not match'
    });
  }

  // Sanitize inputs
  req.body.email = email.trim().toLowerCase();
  req.body.fullName = sanitizeString(fullName);

  next();
};

// Middleware to validate login data
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const requiredCheck = validateRequired(['email', 'password'], req.body);
  if (!requiredCheck.valid) {
    return res.render('auth/login', {
      title: 'Login',
      error: requiredCheck.error
    });
  }

  const emailCheck = validateEmail(email);
  if (!emailCheck.valid) {
    return res.render('auth/login', {
      title: 'Login',
      error: emailCheck.error
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
};

// Middleware to validate product data
export const validateProduct = (req, res, next) => {
  const { name, description, price, category, stock } = req.body;

  const requiredCheck = validateRequired(['name', 'price', 'category'], req.body);
  if (!requiredCheck.valid) {
    return res.status(400).json({ error: requiredCheck.error });
  }

  const priceCheck = validatePrice(price);
  if (!priceCheck.valid) {
    return res.status(400).json({ error: priceCheck.error });
  }

  const stockCheck = validateStock(stock);
  if (!stockCheck.valid) {
    return res.status(400).json({ error: stockCheck.error });
  }

  // Sanitize string inputs
  req.body.name = sanitizeString(name);
  req.body.description = sanitizeString(description || '');
  req.body.category = sanitizeString(category);
  req.body.price = priceCheck.value;
  req.body.stock = stockCheck.value;

  next();
};

// Middleware to validate review data
export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  // Validate rating (required, must be 1-5)
  if (!rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }

  const numRating = parseInt(rating);
  if (isNaN(numRating) || numRating < 1 || numRating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  // Sanitize comment if provided
  if (comment) {
    req.body.comment = sanitizeString(comment).substring(0, 500); // Limit to 500 chars
  }

  req.body.rating = numRating;
  next();
};

