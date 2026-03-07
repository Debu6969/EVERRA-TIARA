import express from 'express';
import { supabase } from '../supabase/client.js';

const router = express.Router();

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
};

// Initialize cart in session if it doesn't exist
const initCart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
};

// View cart
router.get('/', initCart, async (req, res) => {
  try {
    const cartItems = req.session.cart || [];
    const productIds = cartItems.map(item => item.productId);

    if (productIds.length === 0) {
      return res.render('cart', {
        title: 'Shopping Cart',
        cartItems: [],
        total: 0
      });
    }

    // Fetch product details
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (error) throw error;

    // Combine cart items with product details
    const cartWithProducts = cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return {
        ...cartItem,
        product,
        subtotal: product ? product.price * cartItem.quantity : 0
      };
    }).filter(item => item.product); // Remove items with missing products

    const total = cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);

    res.render('cart', {
      title: 'Shopping Cart',
      cartItems: cartWithProducts,
      total
    });
  } catch (error) {
    console.error('Cart error:', error);
    res.render('cart', {
      title: 'Shopping Cart',
      cartItems: [],
      total: 0
    });
  }
});

// Add to cart
router.post('/add', initCart, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    const existingItemIndex = req.session.cart.findIndex(
      item => item.productId === productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      req.session.cart[existingItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new item
      req.session.cart.push({
        productId,
        quantity: parseInt(quantity)
      });
    }

    res.json({ success: true, cartCount: req.session.cart.length });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.post('/update', initCart, (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    const itemIndex = req.session.cart.findIndex(
      item => item.productId === productId
    );

    if (itemIndex >= 0) {
      if (parseInt(quantity) <= 0) {
        // Remove item
        req.session.cart.splice(itemIndex, 1);
      } else {
        // Update quantity
        req.session.cart[itemIndex].quantity = parseInt(quantity);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove from cart
router.post('/remove', initCart, (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    req.session.cart = req.session.cart.filter(
      item => item.productId !== productId
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.post('/clear', initCart, (req, res) => {
  req.session.cart = [];
  res.json({ success: true });
});

// Checkout page
router.get('/checkout', requireAuth, initCart, async (req, res) => {
  try {
    const cartItems = req.session.cart || [];

    if (cartItems.length === 0) {
      return res.redirect('/cart');
    }

    const productIds = cartItems.map(item => item.productId);
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (error) throw error;

    const cartWithProducts = cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return {
        ...cartItem,
        product,
        subtotal: product ? product.price * cartItem.quantity : 0
      };
    }).filter(item => item.product);

    const total = cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);

    res.render('checkout', {
      title: 'Checkout',
      cartItems: cartWithProducts,
      total,
      user: req.session.user
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.redirect('/cart');
  }
});

// Process checkout
router.post('/checkout', requireAuth, initCart, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const cartItems = req.session.cart || [];

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const productIds = cartItems.map(item => item.productId);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);

    if (productsError) throw productsError;

    const total = cartItems.reduce((sum, cartItem) => {
      const product = products.find(p => p.id === cartItem.productId);
      return sum + (product ? product.price * cartItem.quantity : 0);
    }, 0);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: req.session.user.id,
        total_amount: total,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = cartItems.map(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      return {
        order_id: order.id,
        product_id: cartItem.productId,
        quantity: cartItem.quantity,
        price: product ? product.price : 0
      };
    });

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Clear cart
    req.session.cart = [];

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Checkout processing error:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

export default router;

