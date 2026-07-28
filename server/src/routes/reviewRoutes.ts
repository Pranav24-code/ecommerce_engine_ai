import { Router } from 'express';
import { getProductReviews, createReview, getAllReviewsAdmin, moderateReview } from '../controllers/reviewController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.get('/product/:productId', getProductReviews);
router.post('/', jwtAuth, createReview);

// Admin moderation
router.get('/admin/all', jwtAuth, adminOnly, getAllReviewsAdmin);
router.put('/admin/:id/moderate', jwtAuth, adminOnly, moderateReview);

export default router;
