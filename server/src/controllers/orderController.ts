import { Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';
import { Inventory } from '../models/Inventory';
import { AuthRequest } from '../middleware/jwtAuth';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, shippingAddress, paymentMethod, discount = 0 } = req.body;
    if (!items || items.length === 0 || !shippingAddress) {
      res.status(400).json({ success: false, message: 'Order items and shipping address are required' });
      return;
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ success: false, message: `Product ${item.product} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ success: false, message: `Insufficient stock for product ${product.title}` });
        return;
      }

      // Reduce product stock
      product.stock -= item.quantity;
      await product.save();

      // Update Inventory record if exists
      await Inventory.findOneAndUpdate(
        { product: product._id },
        { $inc: { stock: -item.quantity } }
      );

      subtotal += product.price * item.quantity;
      orderItems.push({
        product: product._id as any,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] || '',
      });
    }

    const tax = Math.round(subtotal * 0.08); // 8% tax
    const shippingFee = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const grandTotal = Math.max(0, subtotal + tax + shippingFee - discount);

    const trackingNumber = 'TRK' + Math.floor(10000000 + Math.random() * 90000000);

    const newOrder = await Order.create({
      user: req.user?.id,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'pending' : 'completed',
      orderStatus: 'approved',
      subtotal,
      tax,
      shippingFee,
      discount,
      grandTotal,
      trackingNumber,
    });

    // Clear user's cart
    await Cart.findOneAndUpdate({ user: req.user?.id }, { items: [], subtotal: 0 });

    res.status(201).json({ success: true, message: 'Order placed successfully', data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const updates: any = {};
    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) updates.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
