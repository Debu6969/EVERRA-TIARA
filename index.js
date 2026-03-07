import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// Home page
router.get('/', async (req, res) => {
  try {
    // Fetch featured products
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(6);

    if (error) throw error;

    res.render('index', {
      title: 'Home',
      products: products || []
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.render('index', {
      title: 'Home',
      products: []
    });
  }
});

export default router;

