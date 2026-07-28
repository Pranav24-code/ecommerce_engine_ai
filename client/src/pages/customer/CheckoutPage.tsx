import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const discountAmount = location.state?.discountAmount || 0;

  const [shippingAddress, setShippingAddress] = useState({
    street: user?.email ? '123 Innovation Way' : '',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'USA',
  });

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Card'>('COD');
  const [submitting, setSubmitting] = useState(false);

  const tax = Math.round(subtotal * 0.08);
  const shippingFee = subtotal > 100 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal + tax + shippingFee - discountAmount);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    try {
      const orderItems = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const res = await api.post('/orders', {
        items: orderItems,
        shippingAddress,
        paymentMethod,
        discount: discountAmount,
      });

      if (res.data.success) {
        clearCart();
        navigate('/orders');
      }
    } catch (err) {
      console.error('Failed to place order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Truck className="w-5 h-5 text-primary-500" /> Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-500">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">City</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">State / Province</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Postal Code</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Country</label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <CreditCard className="w-5 h-5 text-primary-500" /> Payment Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/50'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 ${paymentMethod === 'COD' ? 'text-primary-500' : 'text-slate-300'}`} />
                <div>
                  <h4 className="font-bold text-sm">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-slate-400">Pay cash upon item receipt</p>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition ${
                  paymentMethod === 'Card'
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/50'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 ${paymentMethod === 'Card' ? 'text-primary-500' : 'text-slate-300'}`} />
                <div>
                  <h4 className="font-bold text-sm">Credit / Debit Card</h4>
                  <p className="text-xs text-slate-400">Instant online checkout</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Review & Submit */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-3">Final Order Review</h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center text-sm">
                  <span className="truncate max-w-[180px] font-medium">{item.product.title} x {item.quantity}</span>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-500 font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold border-t border-slate-100 dark:border-slate-800 pt-3">
                <span>Grand Total</span>
                <span className="text-primary-600 dark:text-primary-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg shadow-primary-500/25 transition"
            >
              <ShieldCheck className="w-5 h-5" /> Confirm & Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
