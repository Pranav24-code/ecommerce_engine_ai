import { Response } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/jwtAuth';

export const getDashboardOverview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [totalOrders, totalProducts, totalCustomers, orders] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.find({ paymentStatus: 'completed' }),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);
    const lowStockCount = await Product.countDocuments({ stock: { $lte: 5 } });
    const recentOrders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        metrics: {
          totalRevenue,
          totalOrders,
          totalProducts,
          totalCustomers,
          lowStockCount,
        },
        recentOrders,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesTrends = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const monthlyData = [
      { month: 'Jan', revenue: 12400, orders: 140 },
      { month: 'Feb', revenue: 18900, orders: 210 },
      { month: 'Mar', revenue: 23500, orders: 275 },
      { month: 'Apr', revenue: 19800, orders: 230 },
      { month: 'May', revenue: 31200, orders: 340 },
      { month: 'Jun', revenue: 28400, orders: 310 },
      { month: 'Jul', revenue: 35600, orders: 410 },
    ];

    const topProducts = await Product.find().sort({ rating: -1, reviewCount: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        salesTrends: monthlyData,
        topProducts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
