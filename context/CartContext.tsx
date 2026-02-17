import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variantId?: string }
  | { type: 'REMOVE_ITEM'; key: string }
  | { type: 'UPDATE_QUANTITY'; key: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

function cartKey(productId: string, variantId?: string): string {
  return variantId ? `${productId}:${variantId}` : productId;
}

interface CartContextValue extends CartState {
  addItem: (product: Product, variantId?: string) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  cartKey: typeof cartKey;
}

const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}

function itemKey(item: CartItem): string {
  return cartKey(item.product.id, item.variantId);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = cartKey(action.product.id, action.variantId);
      const existing = state.items.find(i => itemKey(i) === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            itemKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1, variantId: action.variantId }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => itemKey(i) !== action.key) };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => itemKey(i) !== action.key) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          itemKey(i) === action.key ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback((product: Product, variantId?: string) => dispatch({ type: 'ADD_ITEM', product, variantId }), []);
  const removeItem = useCallback((key: string) => dispatch({ type: 'REMOVE_ITEM', key }), []);
  const updateQuantity = useCallback((key: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', key, quantity }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + parsePrice(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart, totalItems, totalPrice, cartKey }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
