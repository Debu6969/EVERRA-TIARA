import express from 'express';
import { supabase } from '../supabase/client.js';
import { validateReview } from '../middleware/validation.js';

const router = express.Router();

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ reviews: reviews || [] });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a review
router.post('/product/:productId', requireAuth, validateReview, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.session.user.id;

    // Check if user already reviewed this product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single();

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    // Create the review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        product_id: productId,
        user_id: userId,
        rating: parseInt(rating),
        comment: comment || null
      })
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .single();

    if (error) throw error;

    res.json({ success: true, review });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a review
router.put('/:id', requireAuth, validateReview, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.session.user.id;

    // Check if review exists and belongs to user
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (existingReview.user_id !== userId) {
      return res.status(403).json({ error: 'You can only edit your own reviews' });
    }

    // Update the review
    const { data: review, error } = await supabase
      .from('reviews')
      .update({
        rating: parseInt(rating),
        comment: comment || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .single();

    if (error) throw error;

    res.json({ success: true, review });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a review
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user.id;
    const isAdmin = req.session.isAdmin;

    // Check if review exists and belongs to user (or user is admin)
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    if (existingReview.user_id !== userId && !isAdmin) {
      return res.status(403).json({ error: 'You can only delete your own reviews' });
    }

    // Delete the review
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

