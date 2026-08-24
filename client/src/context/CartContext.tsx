import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const userId = user?.id || (user as any)?._id;
    const saved = userId ? localStorage.getItem(`cart_${userId}`) : localStorage.getItem('guestCart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with API or local storage when user logs in / out
  useEffect(() => {
    if (user) {
      const userId = user.id || (user as any)._id;
      // Load user specific cart
      const savedUserCart = localStorage.getItem(`cart_${userId}`);
      if (savedUserCart) {
        try {
          setCart(JSON.parse(savedUserCart));
        } catch (e) {
          console.error(e);
        }
      }

      api.get('/cart')
        .then((res) => {
          if (res.data.success && res.data.data?.items && res.data.data.items.length > 0) {
            setCart(res.data.data.items);
          }
        })
        .catch((err) => console.warn('Could not fetch server cart:', err));
    } else {
      // Reset cart when user is logged out so next user doesn't see previous user's cart!
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const userId = user.id || (user as any)._id;
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    } else {
      localStorage.removeItem('guestCart');
    }
  }, [cart, user]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, price: product.price }];
    });

    if (user) {
      api.post('/cart/add', { productId: product._id, quantity }).catch(console.error);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      api.put('/cart/update', { productId, quantity }).catch(console.error);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
    if (user) {
      api.delete(`/cart/remove/${productId}`).catch(console.error);
    }
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      api.delete('/cart/clear').catch(console.error);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
