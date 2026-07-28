import React, { useEffect, useState } from 'react';
import { Warehouse, AlertTriangle, RefreshCw } from 'lucide-react';
import { InventoryItem } from '../../types';
import { api } from '../../services/api';

export const AdminInventory: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory');
      if (res.data.success) setItems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const res = await api.put('/inventory/update', { productId, newStock });
      if (res.data.success) fetchInventory();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Inventory & Stock Alerts</h1>
        <p className="text-xs text-slate-500 mt-1">Monitor low stock items and quickly trigger restocks</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Stock Level</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-mono text-xs text-slate-400">{item.sku}</td>
                <td className="py-3 px-4 font-semibold">{item.productTitle || item.product?.title}</td>
                <td className="py-3 px-4 font-bold">{item.stock} units</td>
                <td className="py-3 px-4">
                  {item.stock <= (item.lowStockThreshold || 5) ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      <AlertTriangle className="w-3 h-3" /> Low Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      Healthy
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleUpdateStock(item.product?._id || item._id, item.stock + 20)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary-600 hover:text-white text-xs font-semibold transition"
                  >
                    <RefreshCw className="w-3 h-3" /> Restock +20
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
