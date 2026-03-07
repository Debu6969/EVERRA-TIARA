import express from 'express';
import { supabase, supabaseAdmin } from '../supabase/client.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// Middleware to require admin authentication
const requireAdmin = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  if (!req.session.isAdmin) {
    return res.status(403).render('error', {
      message: 'Access denied. Admin privileges required.',
      error: {}
    });
  }
  next();
};

// Admin dashboard
router.get('/dashboard', requireAdmin, async (req, res) => {
  try {
    // Get statistics
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id');

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, total_amount, status');

    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id');

    if (productsError) throw productsError;
    if (ordersError) throw ordersError;
    if (usersError) throw usersError;

    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
    const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
    const completedOrders = orders?.filter(order => order.status === 'completed').length || 0;

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      stats: {
        totalProducts: products?.length || 0,
        totalOrders: orders?.length || 0,
        totalUsers: users?.length || 0,
        totalRevenue,
        pendingOrders,
        completedOrders
      },
      recentOrders: orders?.slice(0, 10) || []
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
      },
      recentOrders: []
    });
  }
});

// Products management
router.get('/products', requireAdmin, async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.render('admin/products', {
      title: 'Manage Products',
      products: products || []
    });
  } catch (error) {
    console.error('Admin products error:', error);
    res.render('admin/products', {
      title: 'Manage Products',
      products: []
    });
  }
});

// Create product
router.post('/products', requireAdmin, validateProduct, async (req, res) => {
  try {
    const { name, description, price, category, image_url, stock, featured } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        description,
        price: parseFloat(price),
        category,
        image_url,
        stock: parseInt(stock) || 0,
        featured: featured === 'on' || featured === true
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, product: data });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/products/:id', requireAdmin, validateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image_url, stock, featured } = req.body;

    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price: parseFloat(price),
        category,
        image_url,
        stock: parseInt(stock) || 0,
        featured: featured === 'on' || featured === true
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, product: data });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Orders management
router.get('/orders', requireAdmin, async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.render('admin/orders', {
      title: 'Manage Orders',
      orders: orders || []
    });
  } catch (error) {
    console.error('Admin orders error:', error);
    res.render('admin/orders', {
      title: 'Manage Orders',
      orders: []
    });
  }
});

// Update order status
router.put('/orders/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, order: data });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

