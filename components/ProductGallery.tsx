import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-0 left-0 w-full py-4 uppercase text-xs tracking-widest font-medium translate-y-full group-hover:translate-y-0 transition-all duration-300 ${
        added ? 'bg-green-600 text-white' : 'bg-white text-stone-900'
      }`}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
};

const ProductGallery: React.FC = () => {
  return (
    <section id="collection" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl text-stone-900 mb-4">Curated Originals</h2>
            <p className="text-stone-500 font-light leading-relaxed">
              Each piece is a dialogue between nature and craftsmanship. Our epoxy finishes use high-clarity, non-yellowing formulas to preserve the art for generations.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-stone-800 hover:text-stone-500 transition-colors pb-1 border-b border-stone-300 hover:border-stone-500">
            <span className="uppercase text-xs tracking-widest">View All Works</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider text-stone-900">
                    1 of 1
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Add to Cart Button - appears on hover */}
                <AddToCartButton product={product} />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">{product.category}</p>
                </div>
                <span className="text-stone-900 font-medium">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
           <a href="#" className="inline-flex items-center gap-2 text-stone-800 border-b border-stone-300 pb-1">
            <span className="uppercase text-xs tracking-widest">View All Works</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Feature Banner */}
        <div className="mt-24 p-8 bg-stone-100 border border-stone-200 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="p-3 bg-white rounded-full text-stone-800 shadow-sm">
            <Sparkles size={24} />
          </div>
          <div>
             <h4 className="font-serif text-xl text-stone-900 mb-1">Lifetime Clarity Guarantee</h4>
             <p className="text-sm text-stone-500">Our proprietary finishing process ensures zero yellowing and maximum durability.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;
