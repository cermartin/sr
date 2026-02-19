import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Ruler, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addItem } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variants = product.variants;
  const displayImage = variants ? variants[selectedVariantIdx].image : product.image;
  const selectedVariantId = variants ? variants[selectedVariantIdx].id : undefined;

  const handleAddToCart = () => {
    addItem(product, selectedVariantId, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="pt-28 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-10"
        >
          <ArrowLeft size={18} />
          <span className="text-sm uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-stone-100 overflow-hidden">
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Variant thumbnail strip */}
            {variants && (
              <div className="flex gap-3">
                {variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${
                      idx === selectedVariantIdx ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-xs text-stone-500 uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="font-serif text-3xl lg:text-4xl text-stone-900 mb-3">{product.name}</h1>
            <p className="font-serif text-2xl text-stone-900 mb-6">{product.price}</p>

            <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>

            {product.details && (
              <p className="text-stone-500 text-sm leading-relaxed mb-6">{product.details}</p>
            )}

            {/* Dimensions */}
            {product.dimensions && (
              <div className="flex items-center gap-3 mb-6 py-3 border-t border-b border-stone-200">
                <Ruler size={16} className="text-stone-400" />
                <span className="text-sm text-stone-600">
                  <span className="text-stone-400 uppercase tracking-wider text-xs mr-2">Dimensions</span>
                  {product.dimensions}
                </span>
              </div>
            )}

            {/* Variant selector */}
            {variants && (
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                  Colour — {variants[selectedVariantIdx].name}
                </p>
                <div className="flex gap-3">
                  {variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      title={v.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        idx === selectedVariantIdx ? 'border-stone-900 scale-110' : 'border-stone-300 hover:border-stone-500'
                      }`}
                      style={{ backgroundColor: v.color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mt-auto">
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-12 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 uppercase text-sm tracking-widest transition-colors ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-stone-900 text-stone-50 hover:bg-stone-700'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
