import React, { useEffect, useState } from 'react';
import { ShoppingBag, Truck, CheckCircle2, Clock } from 'lucide-react';
import { Order } from '../../types';
import { api } from '../../services/api';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { orderStatus: status });
      if (res.data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Order Fulfillment & Management</h1>
        <p className="text-xs text-slate-500 mt-1">Review customer transactions and transition delivery statuses</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Grand Total</th>
              <th className="py-3 px-4">Current Status</th>
              <th className="py-3 px-4">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {orders.map((o) => (
              <tr key={o._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-mono text-xs font-semibold text-primary-600">#{o._id.substring(18)}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-xs">{o.user?.name || 'Customer'}</div>
                  <span className="text-[10px] text-slate-400">{o.user?.email}</span>
                </td>
                <td className="py-3 px-4 font-extrabold">${o.grandTotal}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {o.orderStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={o.orderStatus}
                    onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
