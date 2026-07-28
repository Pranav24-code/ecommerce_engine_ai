import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/jwtAuth';

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, status: 'approved' }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, comment, images } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const review = await Review.create({
      product: productId,
      user: req.user?.id,
      userName: req.user?.email.split('@')[0] || 'Customer',
      rating,
      comment,
      images: images || [],
      status: 'approved',
    });

    // Recalculate rating & review count for Product
    const reviews = await Review.find({ product: productId, status: 'approved' });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    product.rating = Number(avgRating.toFixed(1));
    product.reviewCount = reviews.length;
    await product.save();

    res.status(201).json({ success: true, message: 'Review submitted successfully', data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviewsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find().populate('product', 'title').sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const moderateReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ success: true, data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
