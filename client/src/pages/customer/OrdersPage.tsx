import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Order } from '../../types';
import { api } from '../../services/api';

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"><Clock className="w-3 h-3" /> Approved</span>;
      case 'dispatched':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"><Truck className="w-3 h-3" /> Dispatched</span>;
      case 'delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"><AlertCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Pending</span>;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-4">
        {[1, 2].map((n) => (
          <div key={n} className="h-40 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Order History & Tracking</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold">No orders placed yet</h3>
          <p className="text-sm text-slate-500">Your completed purchases will be tracked here in real-time.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-400">Order ID: #{order._id.substring(18)}</span>
                  <p className="text-xs text-slate-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                  {order.trackingNumber && (
                    <span className="inline-block text-[11px] font-mono bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      Tracking: {order.trackingNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {getStatusBadge(order.orderStatus)}
                  <span className="text-lg font-extrabold text-primary-600 dark:text-primary-400">₹{order.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-800" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <span className="font-bold text-sm">₹{(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
