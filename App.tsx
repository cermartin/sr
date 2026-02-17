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
import { PRODUCTS } from './constants';

function App() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectedProduct = selectedProductId
    ? PRODUCTS.find(p => p.id === selectedProductId) || null
    : null;

  const handleBack = () => {
    setSelectedProductId(null);
    window.scrollTo({ top: 0 });
  };

  return (
    <CartProvider>
      <main className="w-full min-h-screen">
        <Header onLogoClick={handleBack} />
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBack={handleBack} />
        ) : (
          <>
            <Hero />
            <ProductGallery onSelectProduct={setSelectedProductId} />
            <TeamSection />
            <Quiz />
          </>
        )}
        <Footer />
        <Analytics />
        <CartDrawer />
      </main>
    </CartProvider>
  );
}

export default App;
