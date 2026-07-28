import { Request, Response } from 'express';
import { Coupon } from '../models/Coupon';
import { AuthRequest } from '../middleware/jwtAuth';

export const applyCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, cartSubtotal } = req.body;
    const coupon = await Coupon.findOne({ code: String(code).toUpperCase(), isActive: true });

    if (!coupon) {
      res.status(404).json({ success: false, message: 'Invalid promo coupon code' });
      return;
    }

    if (new Date() > coupon.expiresAt) {
      res.status(400).json({ success: false, message: 'This coupon has expired' });
      return;
    }

    if (cartSubtotal < coupon.minOrderValue) {
      res.status(400).json({
        success: false,
        message: `Minimum order value of $${coupon.minOrderValue} required for this coupon`,
      });
      return;
    }

    let discount = (cartSubtotal * coupon.discountPercentage) / 100;
    if (coupon.maxDiscount && coupon.maxDiscount > 0) {
      discount = Math.min(discount, coupon.maxDiscount);
    }

    res.json({
      success: true,
      message: 'Coupon applied successfully!',
      data: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
        discountAmount: Math.round(discount),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCouponsAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCouponAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { code, discountPercentage, maxDiscount, minOrderValue, expiresAt } = req.body;
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
      maxDiscount: maxDiscount || 0,
      minOrderValue: minOrderValue || 0,
      expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    res.status(201).json({ success: true, data: coupon });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCouponAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
