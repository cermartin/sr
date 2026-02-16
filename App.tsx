import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGallery from './components/ProductGallery';
import TeamSection from './components/TeamSection';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

function App() {
  return (
    <main className="w-full min-h-screen">
      <Header />
      <Hero />
      <ProductGallery />
      <TeamSection />
      <Quiz />
      <Footer />
    </main>
  );
}

export default App;