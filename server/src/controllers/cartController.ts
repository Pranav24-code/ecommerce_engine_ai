import { Response } from 'express';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { AuthRequest } from '../middleware/jwtAuth';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user?.id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user?.id, items: [], subtotal: 0 });
    }
    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    let cart = await Cart.findOne({ user: req.user?.id });
    if (!cart) {
      cart = new Cart({ user: req.user?.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: product._id as any, quantity, price: product.price });
    }

    cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, message: 'Product added to cart', data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user?.id });
    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart not found' });
      return;
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, message: 'Cart updated', data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user?.id });
    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await cart.save();
      await cart.populate('items.product');
    }
    res.json({ success: true, message: 'Item removed', data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOneAndUpdate({ user: req.user?.id }, { items: [], subtotal: 0 }, { new: true });
    res.json({ success: true, message: 'Cart cleared', data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
