import { Response } from 'express';
import { Inventory } from '../models/Inventory';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/jwtAuth';

export const getInventoryList = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const items = await Inventory.find().populate('product', 'title category price stock').sort({ stock: 1 });
    res.json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStock = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, newStock } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const inventory = await Inventory.findOneAndUpdate(
      { product: productId },
      { stock: newStock, lastRestockedAt: new Date() },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: 'Stock updated', data: { product, inventory } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
