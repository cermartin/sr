import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductGalleryProps {
  onSelectProduct: (productId: string) => void;
}

const ProductCard: React.FC<{ product: Product; onSelect: () => void }> = ({ product, onSelect }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const variants = product.variants;
  const displayImage = variants ? variants[selectedVariantIdx].image : product.image;
  const selectedVariantId = variants ? variants[selectedVariantIdx].id : undefined;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedVariantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group cursor-pointer" onClick={onSelect}>
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider text-stone-900">
            1 of 1
          </span>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* + Add to Cart button */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            added ? 'bg-green-600 text-white' : 'bg-white text-stone-900 hover:bg-stone-100'
          }`}
        >
          {added ? <Check size={18} /> : <Plus size={18} />}
        </button>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg text-stone-900 group-hover:text-stone-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 uppercase tracking-wide mt-1">{product.category}</p>
          {/* Variant swatches */}
          {variants && (
            <div className="flex gap-2 mt-2">
              {variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedVariantIdx(idx); }}
                  title={v.name}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    idx === selectedVariantIdx ? 'border-stone-900 scale-110' : 'border-stone-300 hover:border-stone-500'
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
          )}
        </div>
        <span className="text-stone-900 font-medium">{product.price}</span>
      </div>
    </div>
  );
};

const ProductGallery: React.FC<ProductGalleryProps> = ({ onSelectProduct }) => {
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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => onSelectProduct(product.id)}
            />
          ))}
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
