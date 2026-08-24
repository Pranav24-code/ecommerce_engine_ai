import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-primary-500/10 text-primary-500 flex items-center justify-center border border-primary-500/20 shadow-glow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Sign In Required to Access Your Cart
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            To ensure your cart is private and securely synced to your account, please sign in or create an account.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-glow transition-all"
          >
            Sign In Now
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    try {
      const res = await api.post('/coupons/apply', {
        code: couponCode,
        cartSubtotal: subtotal,
      });
      if (res.data.success) {
        setDiscountAmount(res.data.data.discountAmount);
        setCouponMessage(`Coupon ${res.data.data.code} applied! Saved ₹${res.data.data.discountAmount}`);
      }
    } catch (err: any) {
      setCouponMessage(err.response?.data?.message || 'Invalid coupon code');
    }
  };

  const tax = Math.round(subtotal * 0.08);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal + tax + shipping - discountAmount);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">Explore our catalog and add items with AI vector discovery!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.images[0] || ''}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.product.title}</h3>
                  <span className="text-xs text-slate-400">{item.product.category}</span>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="px-3 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>

                <span className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>

                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Financial Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-4">Order Summary</h3>

            {/* Coupon Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-semibold text-slate-500">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. SAVE10"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white transition"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {couponMessage}
                </p>
              )}
            </form>

            <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping Fee</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {shipping === 0 ? <span className="text-emerald-500 font-bold uppercase text-xs">Free</span> : `₹${shipping}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-extrabold border-t border-slate-100 dark:border-slate-800 pt-3 text-slate-900 dark:text-white">
                <span>Grand Total</span>
                <span className="text-primary-600 dark:text-primary-400">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout', { state: { discountAmount } })}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-500/25 transition"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
