import express from 'express';
import { supabase } from '../supabase/client.js';
import bcrypt from 'bcryptjs';
import { validateRegistration, validateLogin } from '../middleware/validation.js';

const router = express.Router();

// Middleware to check if user is already logged in
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/profile');
  }
  next();
};

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};

// Login page
router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    error: null
  });
});

// Login handler
router.post('/login', redirectIfAuthenticated, validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError;
    }

    // Set session
    req.session.user = {
      id: data.user.id,
      email: data.user.email,
      ...profile
    };
    req.session.isAdmin = profile?.role === 'admin' || false;

    res.redirect('/profile');
  } catch (error) {
    console.error('Login error:', error);
    res.render('auth/login', {
      title: 'Login',
      error: error.message || 'Invalid email or password'
    });
  }
});

// Register page
router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('auth/register', {
    title: 'Register',
    error: null
  });
});

// Register handler
router.post('/register', redirectIfAuthenticated, validateRegistration, async (req, res) => {
  try {
    const { email, password, confirmPassword, fullName } = req.body;

    // Create user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: fullName,
          role: 'customer'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }
    }

    res.redirect('/auth/login?registered=true');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('auth/register', {
      title: 'Register',
      error: error.message || 'Registration failed'
    });
  }
});

// Logout handler
router.post('/logout', requireAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

export default router;

