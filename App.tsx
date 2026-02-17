import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import TeamSection from './components/TeamSection';
import Quiz from './components/Quiz';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <main className="w-full min-h-screen">
        <Header />
        <Hero />
        <ProductGallery />
        <TeamSection />
        <Quiz />
        <Footer />
        <Analytics />
        <CartDrawer />
      </main>
    </CartProvider>
  );
}

export default App;
