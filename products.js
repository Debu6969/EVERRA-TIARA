import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// All products page
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'created_at' } = req.query;

    let query = supabase
      .from('products')
      .select('*');

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    query = query.order(sort, { ascending: false });

    const { data: products, error } = await query;

    if (error) throw error;

    // Get categories for filter
    const { data: categories } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null);

    const uniqueCategories = [...new Set(categories?.map(c => c.category) || [])];

    res.render('products/all', {
      title: 'Products',
      products: products || [],
      categories: uniqueCategories,
      currentCategory: category || null,
      currentSearch: search || null,
      currentSort: sort
    });
  } catch (error) {
    console.error('Products error:', error);
    res.render('products/all', {
      title: 'Products',
      products: [],
      categories: [],
      currentCategory: null,
      currentSearch: null,
      currentSort: 'created_at'
    });
  }
});

// Single product page
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!product) {
      return res.status(404).render('error', {
        message: 'Product not found',
        error: {}
      });
    }

    // Get related products
    const { data: relatedProducts } = await supabase
      .from('products')
      .select('*')
      .eq('category', product.category)
      .neq('id', id)
      .limit(4);

    res.render('products/single', {
      title: product.name,
      product,
      relatedProducts: relatedProducts || [],
      user: req.session.user || null
    });
  } catch (error) {
    console.error('Product error:', error);
    res.status(404).render('error', {
      message: 'Product not found',
      error: {}
    });
  }
});

export default router;

