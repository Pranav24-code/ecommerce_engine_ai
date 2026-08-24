import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Truck, CheckCircle2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
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

  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Card'>('COD');
  const [cardDetails, setCardDetails] = useState({ number: '', exp: '', cvc: '', name: '' });
  const [submitting, setSubmitting] = useState(false);

  const totalDiscount = (location.state?.discountAmount || 0) + promoDiscount;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const shippingFee = (subtotal > 100 || appliedCode === 'FREESHIP') ? 0 : 15;
  const grandTotal = Math.max(0, subtotal + tax + shippingFee - totalDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'INTERN20') {
      const disc = Math.round(subtotal * 0.2 * 100) / 100;
      setPromoDiscount(disc);
      setAppliedCode(code);
    } else if (code === 'FREESHIP') {
      setAppliedCode(code);
      setPromoDiscount(0);
    } else if (code === 'WELCOME10') {
      setPromoDiscount(10);
      setAppliedCode(code);
    } else {
      alert('Invalid Promo Code. Try INTERN20, FREESHIP, or WELCOME10!');
    }
  };

  const handleAutofillDemoCard = () => {
    setPaymentMethod('Card');
    setCardDetails({
      number: '4242 •••• •••• 4242',
      exp: '12/28',
      cvc: '888',
      name: 'Tauqeer Abbas (Demo)',
    });
  };

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

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-secondary-500/10 text-secondary-500 flex items-center justify-center border border-secondary-500/20">
          <Lock className="w-10 h-10" />
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
            Authentication Required for Checkout
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please sign in to complete your checkout and link your order history to your personal account.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-glow transition-all"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Step Indicator */}
      <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="section-subtitle">Secure Payment Portal</span>
            <h1 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              Order Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400 bg-accent-500/10 px-3 py-1.5 rounded-full border border-accent-500/20">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Transaction
          </div>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-200/60 dark:border-slate-800 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-sm shrink-0">
              1
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Shipping</div>
              <div className="text-[10px] text-slate-400">Destination Address</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-sm shrink-0">
              2
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Payment</div>
              <div className="text-[10px] text-slate-400">Method Selection</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs shadow-glow-sm shrink-0">
              3
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Confirmation</div>
              <div className="text-[10px] text-slate-400">Place Order</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Shipping & Payment Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Shipping Address */}
          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <div className="p-2 rounded-xl bg-primary-500/10 text-primary-500">
                <Truck className="w-5 h-5" />
              </div>
              Shipping Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  placeholder="e.g. 123 Innovation Way"
                  className="input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="San Francisco"
                  className="input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  State / Province
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="CA"
                  className="input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder="94105"
                  className="input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress.country}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                  placeholder="USA"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2.5 border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <div className="p-2 rounded-xl bg-secondary-500/10 text-secondary-500">
                <CreditCard className="w-5 h-5" />
              </div>
              Payment Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-5 rounded-2xl border-2 flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === 'COD'
                    ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/40 shadow-glow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${paymentMethod === 'COD' ? 'text-primary-500' : 'text-slate-300 dark:text-slate-600'}`} />
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Pay in cash upon physical item delivery</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('Card')}
                className={`p-5 rounded-2xl border-2 flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === 'Card'
                    ? 'border-primary-500 bg-primary-500/5 dark:bg-primary-950/40 shadow-glow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 shrink-0 ${paymentMethod === 'Card' ? 'text-primary-500' : 'text-slate-300 dark:text-slate-600'}`} />
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">Credit / Debit Card</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Instant online encrypted checkout</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Order Review & Submit */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-6 sticky top-24">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-4">
              <ShoppingBag className="w-5 h-5 text-primary-500" /> Order Summary
            </h3>

            <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center text-sm gap-2">
                  <div className="truncate flex-1">
                    <span className="font-medium text-slate-800 dark:text-slate-200 block truncate">{item.product.title}</span>
                    <span className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.price}</span>
                  </div>
                  <span className="font-display font-bold text-slate-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Estimated Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-accent-500 font-semibold">FREE</span> : `₹${shippingFee.toFixed(2)}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-accent-500 font-semibold">
                  <span>Promotional Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-display font-extrabold text-slate-900 dark:text-white border-t border-slate-200/80 dark:border-slate-800 pt-3">
                <span>Grand Total</span>
                <span className="gradient-text">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || cart.length === 0}
              className="w-full btn-primary py-4 text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">Processing Order...</span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Confirm & Place Order <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
