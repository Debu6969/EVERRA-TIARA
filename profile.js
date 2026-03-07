import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// Require authentication for all profile routes
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
});

// GET /profile
router.get('/', async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', req.session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.render('profile', {
      title: 'Profile',
      user: req.session.user,
      orders: orders || []
    });
  } catch (error) {
    console.error('Profile route error:', error);
    res.render('profile', {
      title: 'Profile',
      user: req.session.user,
      orders: []
    });
  }
});

export default router;

