import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import TeamSection from './components/TeamSection';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import BuildBadge from './components/BuildBadge';
import { PRODUCTS } from './constants';
import { supabase } from './lib/supabase';
import { sendOrderEmails } from './lib/email';

type Page = { type: 'home' } | { type: 'product'; id: string } | { type: 'checkout' };

function AppInner() {
  const [page, setPage] = useState<Page>({ type: 'home' });
  const [orderConfirmation, setOrderConfirmation] = useState<{ orderId: string; email: string } | null>(null);
  const [cancelledMessage, setCancelledMessage] = useState('');
  const { items, totalPrice, clearCart } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('success') === 'true' && params.get('session_id')) {
      const sessionId = params.get('session_id')!;
      // Clean URL immediately
      window.history.replaceState({}, '', window.location.pathname);

      handleSuccessfulPayment(sessionId);
    } else if (params.get('cancelled') === 'true') {
      window.history.replaceState({}, '', window.location.pathname);
      setCancelledMessage('Payment was cancelled. You can try again when ready.');
      setPage({ type: 'checkout' });
    }
  }, []);

  const handleSuccessfulPayment = async (sessionId: string) => {
    try {
      // Fetch session details from Stripe via our API
      const res = await fetch(`/api/get-checkout-session?session_id=${sessionId}`);
      const session = await res.json();

      if (!res.ok) {
        throw new Error(session.error || 'Failed to retrieve session');
      }

      const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
      const meta = session.metadata || {};
      const email = session.customer_email || '';

      // Save order to Supabase
      const orderItems = (session.line_items || [])
        .filter((li: any) => li.description !== 'Shipping')
        .map((li: any) => ({
          product_name: li.description,
          quantity: li.quantity,
          unit_price: li.amount_total / 100 / li.quantity,
        }));

      const totalAmount = session.amount_total / 100;
      const shippingItem = (session.line_items || []).find((li: any) => li.description === 'Shipping');
      const shippingCost = shippingItem ? shippingItem.amount_total / 100 : 0;
      const subtotal = totalAmount - shippingCost;

      await supabase.from('orders').insert({
        email,
        phone: meta.phone || null,
        first_name: meta.firstName || '',
        last_name: meta.lastName || '',
        address: meta.address || '',
        city: meta.city || '',
        postcode: meta.postcode || '',
        country: meta.country || '',
        subtotal,
        shipping: shippingCost,
        total: totalAmount,
        items: orderItems,
        order_ref: orderId,
        stripe_session_id: sessionId,
      });

      // Send emails (don't block on failure)
      sendOrderEmails({
        orderId,
        customerEmail: email,
        firstName: meta.firstName || '',
        lastName: meta.lastName || '',
        address: meta.address || '',
        city: meta.city || '',
        postcode: meta.postcode || '',
        country: meta.country || '',
        phone: meta.phone || '',
        items,
        subtotal,
        shipping: shippingCost,
        total: totalAmount,
      }).catch(err => console.error('Email send failed:', err));

      setOrderConfirmation({ orderId, email });
      setPage({ type: 'checkout' });
      clearCart();
    } catch (err) {
      console.error('Failed to process successful payment:', err);
      setOrderConfirmation({ orderId: 'PROCESSING', email: '' });
      setPage({ type: 'checkout' });
    }
  };

  const goHome = () => {
    setPage({ type: 'home' });
    setOrderConfirmation(null);
    setCancelledMessage('');
    window.scrollTo({ top: 0 });
  };

  const goProduct = (id: string) => {
    setPage({ type: 'product', id });
    window.scrollTo({ top: 0 });
  };

  const goCheckout = () => {
    setPage({ type: 'checkout' });
    setCancelledMessage('');
    window.scrollTo({ top: 0 });
  };

  const selectedProduct = page.type === 'product'
    ? PRODUCTS.find(p => p.id === page.id) || null
    : null;

  return (
    <main className="w-full min-h-screen">
      <Header onLogoClick={goHome} />
      <BuildBadge />
      {page.type === 'checkout' ? (
        <Checkout
          onBack={goHome}
          orderConfirmation={orderConfirmation}
          cancelledMessage={cancelledMessage}
        />
      ) : selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={goHome} />
      ) : (
        <>
          <Hero />
          <ProductGallery onSelectProduct={goProduct} />
          <TeamSection />
          <Quiz />
        </>
      )}
      <Footer />
      <Analytics />
      <CartDrawer onCheckout={goCheckout} />
    </main>
  );
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

export default App;
