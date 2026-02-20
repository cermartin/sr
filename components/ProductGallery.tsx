import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../constants';
import { Sparkles, Plus, Check, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

/** Fires `inView = true` once the element enters the viewport. */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   PRODUCT CARD  — Museumcore + Dopamine style
   ───────────────────────────────────────────── */
const ProductCard: React.FC<{
  product: Product;
  index: number;
  onSelect: () => void;
}> = ({ product, index, onSelect }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { ref, inView } = useInView(0.15);

  const variants          = product.variants;
  const displayImage      = variants ? variants[selectedVariantIdx].image : product.image;
  const selectedVariantId = variants ? variants[selectedVariantIdx].id : undefined;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedVariantId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      ref={ref}
      className={`group cursor-pointer transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 160}ms` }}
      onClick={onSelect}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Museum catalog badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-white/95 backdrop-blur px-3 py-1 text-[9px] uppercase tracking-wider text-stone-500 font-medium">
            No. 00{index + 1}
          </span>
          <span className="bg-orange-500 text-white px-3 py-1 text-[9px] uppercase tracking-wider font-semibold">
            1 of 1
          </span>
        </div>

        {/* Hover darkening */}
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/8 transition-colors duration-300" />

        {/* Add to Cart — electric orange, slides up on hover, 44 px min touch target */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 text-[10px] uppercase tracking-wider font-bold shadow-lg
            opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          style={{ minHeight: '44px' }}
        >
          {added ? <Check size={13} /> : <Plus size={13} />}
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>

      {/* Meta */}
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 mr-4">
          {/* Catalog index */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] uppercase tracking-[0.25em] text-orange-500 font-bold">00{index + 1}</span>
            <span className="block w-4 h-px bg-stone-300" />
          </div>
          <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-1">{product.category}</p>

          {/* Variant swatches */}
          {variants && (
            <div className="flex gap-2 mt-3">
              {variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={e => { e.stopPropagation(); setSelectedVariantIdx(idx); }}
                  title={v.name}
                  className={`w-5 h-5 rounded-full border-2 transition-all ${
                    idx === selectedVariantIdx
                      ? 'border-stone-900 scale-110'
                      : 'border-stone-300 hover:border-stone-500'
                  }`}
                  style={{ backgroundColor: v.color }}
                />
              ))}
            </div>
          )}
        </div>
        <span className="font-serif text-xl text-stone-900 font-semibold flex-shrink-0">{product.price}</span>
      </div>

      {/* View details hint */}
      <div className="mt-3 pt-3 border-t border-stone-200">
        <span className="text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-orange-500 transition-colors flex items-center gap-2">
          View Details <span className="text-xs">→</span>
        </span>
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   PRODUCT GALLERY  — editorial Museumcore layout
   ───────────────────────────────────────────── */
interface ProductGalleryProps {
  onSelectProduct: (productId: string) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ onSelectProduct }) => {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <section id="collection" className="pt-20 pb-28 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ─── Editorial Section Header ─── */}
        <div ref={headerRef} className="relative mb-16 md:mb-24">

          {/* Ghost "Works" text — Museumcore large-type background detail */}
          <span
            aria-hidden
            className={`absolute -top-6 left-0 font-serif font-bold text-stone-900 leading-none select-none pointer-events-none transition-all duration-1000 ease-out ${
              headerInView ? 'opacity-[0.045] translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
            style={{ fontSize: 'clamp(5rem, 18vw, 15rem)' }}
          >Works</span>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-orange-500 flex-shrink-0" />
                <span className="text-orange-500 text-[10px] font-semibold uppercase tracking-[0.3em]">The Collection</span>
              </div>
              <h2
                className={`font-serif text-stone-900 leading-tight transition-all duration-1000 delay-100 ease-out ${
                  headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
              >
                Curated<br />
                <span className="italic font-light text-stone-400">Originals</span>
              </h2>
            </div>
            <p
              className={`text-stone-500 font-light leading-relaxed max-w-xs text-sm md:text-base transition-all duration-1000 delay-200 ease-out ${
                headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Each piece is a dialogue between nature and craft.
              High-clarity, non-yellowing epoxy — preserved for generations.
            </p>
          </div>
        </div>

        {/* ─── Product Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16 max-w-5xl mx-auto">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onSelect={() => onSelectProduct(product.id)}
            />
          ))}
        </div>

        {/* ─── Feature Banner — dark Museumcore with electric orange CTA ─── */}
        <div className="mt-24 bg-stone-900 text-white overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12">
            <div className="flex items-center gap-6">
              <span
                aria-hidden
                className="font-serif font-bold text-orange-500/40 leading-none select-none flex-shrink-0"
                style={{ fontSize: '5rem' }}
              >∞</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-orange-400" />
                  <span className="text-orange-400 text-[9px] uppercase tracking-[0.3em] font-semibold">Lifetime Promise</span>
                </div>
                <h4 className="font-serif text-xl mb-1">Lifetime Clarity Guarantee</h4>
                <p className="text-sm text-stone-400">
                  Zero-yellowing formula. If it ever fades, we refinish it — no questions asked.
                </p>
              </div>
            </div>

            {/* Electric orange CTA — high contrast, 56 px touch target */}
            <a
              href="#collection"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 transition-all duration-150 w-full md:w-auto"
              style={{ minHeight: '56px' }}
            >
              <Zap size={14} />
              Order Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;
