import { Router } from 'express';
import { applyCoupon, getCouponsAdmin, createCouponAdmin, deleteCouponAdmin } from '../controllers/couponController';
import { jwtAuth } from '../middleware/jwtAuth';
import { adminOnly } from '../middleware/adminOnly';

const router = Router();

router.post('/apply', applyCoupon);

// Admin routes
router.get('/admin', jwtAuth, adminOnly, getCouponsAdmin);
router.post('/admin', jwtAuth, adminOnly, createCouponAdmin);
router.delete('/admin/:id', jwtAuth, adminOnly, deleteCouponAdmin);

export default router;
