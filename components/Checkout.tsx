import React, { useState } from 'react';
import { ArrowLeft, Lock, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import { sendOrderEmails } from '../lib/email';

interface CheckoutProps {
  onBack: () => void;
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}

const Checkout: React.FC<CheckoutProps> = ({ onBack }) => {
  const { items, totalPrice, cartKey, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const shipping = totalPrice >= 100 ? 0 : 5;
  const total = totalPrice + shipping;

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: '',
  });

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const inputCls = 'w-full px-4 py-3 border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors';
  const labelCls = 'block text-xs uppercase tracking-widest text-stone-500 mb-1.5';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const orderItems = items.map(item => {
        const variant = item.product.variants?.find(v => v.id === item.variantId);
        return {
          product_id: item.product.id,
          product_name: item.product.name,
          variant_name: variant?.name || null,
          quantity: item.quantity,
          unit_price: parsePrice(item.product.price),
        };
      });

      const { error: dbError } = await supabase.from('orders').insert({
        email: form.email,
        phone: form.phone || null,
        first_name: form.firstName,
        last_name: form.lastName,
        address: form.address,
        city: form.city,
        postcode: form.postcode,
        country: form.country,
        card_last_four: form.cardNumber.slice(-4),
        subtotal: totalPrice,
        shipping,
        total,
        items: orderItems,
      });

      if (dbError) throw dbError;

      // Send confirmation emails (don't block order on email failure)
      sendOrderEmails({
        customerEmail: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        postcode: form.postcode,
        country: form.country,
        phone: form.phone,
        items,
        subtotal: totalPrice,
        shipping,
        total,
      }).catch(err => console.error('Email send failed:', err));

      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0 });
    } catch (err: any) {
      console.error('Order save failed:', err);
      setError('Something went wrong placing your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <section className="pt-28 pb-24 bg-white min-h-screen">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-serif text-3xl text-stone-900 mb-3">Order Confirmed</h1>
          <p className="text-stone-500 mb-2">Thank you for your purchase! A confirmation email has been sent to <span className="text-stone-900 font-medium">{form.email}</span>.</p>
          <p className="text-stone-400 text-sm mb-8">Your order will be carefully packaged and dispatched within 3-5 working days.</p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-stone-900 text-stone-50 uppercase text-sm tracking-widest hover:bg-stone-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="pt-28 pb-24 bg-white min-h-screen">
        <div className="container mx-auto px-6 max-w-lg text-center">
          <h1 className="font-serif text-3xl text-stone-900 mb-3">Your cart is empty</h1>
          <p className="text-stone-500 mb-8">Add some items before checking out.</p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-stone-900 text-stone-50 uppercase text-sm tracking-widest hover:bg-stone-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8">
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-widest">Back to Cart</span>
        </button>

        <h1 className="font-serif text-3xl text-stone-900 mb-10">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — Form */}
          <div className="lg:col-span-2 space-y-10">
            {/* Contact */}
            <div>
              <h2 className="font-serif text-lg text-stone-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" required placeholder="you@example.com" value={form.email} onChange={update('email')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone (optional)</label>
                  <input type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={update('phone')} className={inputCls} />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="font-serif text-lg text-stone-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input type="text" required placeholder="John" value={form.firstName} onChange={update('firstName')} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input type="text" required placeholder="Smith" value={form.lastName} onChange={update('lastName')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Address</label>
                  <input type="text" required placeholder="123 High Street" value={form.address} onChange={update('address')} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>City</label>
                    <input type="text" required placeholder="London" value={form.city} onChange={update('city')} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Postcode</label>
                    <input type="text" required placeholder="SW1A 1AA" value={form.postcode} onChange={update('postcode')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Country</label>
                  <select value={form.country} onChange={update('country')} className={inputCls}>
                    <option>United Kingdom</option>
                    <option>Ireland</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>Netherlands</option>
                    <option>United States</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-serif text-lg text-stone-900 mb-4">Payment</h2>
              <div className="bg-white border border-stone-200 p-6 space-y-4">
                <div>
                  <label className={labelCls}>Name on Card</label>
                  <input type="text" required placeholder="John Smith" value={form.cardName} onChange={update('cardName')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Card Number</label>
                  <input type="text" required placeholder="4242 4242 4242 4242" maxLength={19} value={form.cardNumber} onChange={update('cardNumber')} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Expiry</label>
                    <input type="text" required placeholder="MM / YY" maxLength={7} value={form.expiry} onChange={update('expiry')} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>CVC</label>
                    <input type="text" required placeholder="123" maxLength={4} value={form.cvc} onChange={update('cvc')} className={inputCls} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-xs pt-2">
                  <Lock size={12} />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3">{error}</p>
            )}

            {/* Submit — mobile */}
            <button
              type="submit"
              disabled={submitting}
              className="lg:hidden w-full py-4 bg-stone-900 text-stone-50 uppercase text-sm tracking-widest hover:bg-stone-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
              {submitting ? 'Processing...' : `Pay £${total.toLocaleString()}`}
            </button>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-stone-200 p-6 sticky top-28">
              <h2 className="font-serif text-lg text-stone-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const { product, quantity, variantId } = item;
                  const variant = product.variants?.find(v => v.id === variantId);
                  const displayImage = variant?.image || product.image;
                  const lineTotal = parsePrice(product.price) * quantity;
                  return (
                    <div key={cartKey(product.id, variantId)} className="flex gap-3">
                      <div className="w-16 h-16 bg-stone-100 flex-shrink-0 overflow-hidden relative">
                        <img src={displayImage} alt={product.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-900 font-medium truncate">{product.name}</p>
                        {variant && <p className="text-xs text-stone-500">{variant.name}</p>}
                        <p className="text-xs text-stone-400 uppercase tracking-wide">{product.category}</p>
                      </div>
                      <span className="text-sm text-stone-900 font-medium whitespace-nowrap">£{lineTotal.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-900">£{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Shipping</span>
                  <span className="text-stone-900">{shipping === 0 ? 'Free' : `£${shipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-stone-200">
                  <span className="text-stone-900">Total</span>
                  <span className="font-serif text-lg text-stone-900">£{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Shipping note */}
              <div className="flex items-center gap-2 mt-4 text-xs text-stone-400">
                <Truck size={14} />
                <span>{shipping === 0 ? 'Free shipping on orders over £100' : 'Free shipping on orders over £100'}</span>
              </div>

              {/* Submit — desktop */}
              <button
                type="submit"
                disabled={submitting}
                className="hidden lg:flex w-full mt-6 py-4 bg-stone-900 text-stone-50 uppercase text-sm tracking-widest hover:bg-stone-700 transition-colors items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                {submitting ? 'Processing...' : `Pay £${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
