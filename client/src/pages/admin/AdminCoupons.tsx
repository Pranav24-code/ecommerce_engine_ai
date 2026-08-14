import React, { useEffect, useState } from 'react';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { Coupon } from '../../types';
import { api } from '../../services/api';

export const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('15');
  const [minOrderValue, setMinOrderValue] = useState('50');

  const fetchCoupons = async () => {
    try {
      const res = await api.get('/coupons/admin');
      if (res.data.success) setCoupons(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    try {
      const res = await api.post('/coupons/admin', {
        code,
        discountPercentage: Number(discountPercentage),
        minOrderValue: Number(minOrderValue),
      });
      if (res.data.success) {
        fetchCoupons();
        setCode('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete coupon?')) return;
    try {
      await api.delete(`/coupons/admin/${id}`);
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Coupons & Promotional Offers</h1>
        <p className="text-xs text-slate-500 mt-1">Create discount voucher codes for customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary-500" /> Create Promo Code
          </h3>

          <input
            type="text"
            placeholder="Coupon Code (e.g. FLASH20)"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-mono"
          />

          <input
            type="number"
            placeholder="Discount Percentage (%)"
            required
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />

          <input
            type="number"
            placeholder="Minimum Order Value (₹)"
            value={minOrderValue}
            onChange={(e) => setMinOrderValue(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
          />

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-xs hover:bg-primary-700 transition"
          >
            Create Coupon
          </button>
        </form>

        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary-500" /> Active Promo Codes
          </h3>

          <div className="space-y-3">
            {coupons.map((c) => (
              <div key={c._id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-mono font-bold text-primary-600 text-sm">{c.code}</span>
                  <p className="text-xs text-slate-500">{c.discountPercentage}% OFF on orders over ₹{c.minOrderValue}</p>
                </div>

                <button onClick={() => handleDelete(c._id)} className="p-2 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
