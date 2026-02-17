import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import TeamSection from './components/TeamSection';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import { PRODUCTS } from './constants';

type Page = { type: 'home' } | { type: 'product'; id: string } | { type: 'checkout' };

function App() {
  const [page, setPage] = useState<Page>({ type: 'home' });

  const goHome = () => {
    setPage({ type: 'home' });
    window.scrollTo({ top: 0 });
  };

  const goProduct = (id: string) => {
    setPage({ type: 'product', id });
    window.scrollTo({ top: 0 });
  };

  const goCheckout = () => {
    setPage({ type: 'checkout' });
    window.scrollTo({ top: 0 });
  };

  const selectedProduct = page.type === 'product'
    ? PRODUCTS.find(p => p.id === page.id) || null
    : null;

  return (
    <CartProvider>
      <main className="w-full min-h-screen">
        <Header onLogoClick={goHome} />
        {page.type === 'checkout' ? (
          <Checkout onBack={goHome} />
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
    </CartProvider>
  );
}

export default App;
