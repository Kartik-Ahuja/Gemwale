import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types';

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, colour: string, quantity?: number) => void;
  removeFromCart: (productId: string, colour: string) => void;
  updateQuantity: (productId: string, colour: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  couponCode: string;
  couponDiscount: number;
  checkoutTotal: number;
  applyCoupon: (code: string) => 'applied' | 'invalid' | 'minimum';
  removeCoupon: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = 'gemwale_cart';
const WISH_KEY = 'gemwale_wishlist';
const COUPON_CODE = 'VIBECHECK10';

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSave(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn(`localStorage quota exceeded for ${key}. Skipping save.`);
      return;
    }
    console.warn(`Failed to save ${key} to localStorage.`, error);
  }
}

function loadCart(): CartItem[] {
  return safeLoad<CartItem[]>(CART_KEY, []);
}

function loadWishlist(): string[] {
  return safeLoad<string[]>(WISH_KEY, []);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [wishlist, setWishlist] = useState<string[]>(loadWishlist);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    safeSave(CART_KEY, cart);
  }, [cart]);

  useEffect(() => {
    safeSave(WISH_KEY, wishlist);
  }, [wishlist]);

  const addToCart: StoreContextValue['addToCart'] = (product, colour, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.id && i.colour === colour);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id && i.colour === colour
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          product_code: product.product_code,
          name: product.name,
          slug: product.slug,
          price: product.price,
          colour,
          quantity,
          image: product.images[0],
        },
      ];
    });
    setCartOpen(true);
  };

  const removeFromCart: StoreContextValue['removeFromCart'] = (productId, colour) => {
    setCart((prev) => prev.filter((i) => !(i.product_id === productId && i.colour === colour)));
  };

  const updateQuantity: StoreContextValue['updateQuantity'] = (productId, colour, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.product_id === productId && i.colour === colour ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
  };

  const applyCoupon: StoreContextValue['applyCoupon'] = (code) => {
    if (code.trim().toUpperCase() !== COUPON_CODE) return 'invalid';
    if (cartTotal <= 799) return 'minimum';
    setCouponCode(COUPON_CODE);
    return 'applied';
  };

  const removeCoupon = () => setCouponCode('');

  const toggleWishlist: StoreContextValue['toggleWishlist'] = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const isWishlisted: StoreContextValue['isWishlisted'] = (productId) =>
    wishlist.includes(productId);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart],
  );
  const couponDiscount = couponCode === COUPON_CODE && cartTotal > 799
    ? Math.round(cartTotal * 0.1)
    : 0;
  const checkoutTotal = cartTotal - couponDiscount;

  const value: StoreContextValue = {
    cart,
    wishlist,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    couponCode,
    couponDiscount,
    checkoutTotal,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    isWishlisted,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
