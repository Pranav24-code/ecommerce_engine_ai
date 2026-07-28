import { Response } from 'express';
import { Wishlist } from '../models/Wishlist';
import { AuthRequest } from '../middleware/jwtAuth';

export const getWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user?.id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user?.id, products: [] });
    }
    res.json({ success: true, data: wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user?.id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user?.id, products: [] });
    }

    const index = wishlist.products.findIndex((id) => id.toString() === productId);
    if (index > -1) {
      wishlist.products.splice(index, 1);
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    await wishlist.populate('products');
    res.json({ success: true, data: wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
