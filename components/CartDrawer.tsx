import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { isOpen, closeCart, items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200">
          <h2 className="font-serif text-xl text-stone-900">Your Cart ({totalItems})</h2>
          <button onClick={closeCart} className="text-stone-500 hover:text-stone-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-stone-400 gap-4 px-6">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="text-sm uppercase tracking-widest">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4">
                <div className="w-20 h-24 bg-stone-100 flex-shrink-0 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm text-stone-900 truncate">{product.name}</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wide mt-0.5">{product.category}</p>
                  <p className="text-sm text-stone-900 font-medium mt-1">{product.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm text-stone-900 w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="ml-auto text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-200 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase tracking-widest text-stone-500">Subtotal</span>
              <span className="font-serif text-lg text-stone-900">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-3 bg-stone-900 text-stone-50 uppercase tracking-widest text-sm hover:bg-stone-700 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
