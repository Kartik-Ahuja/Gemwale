import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-burgundy-950/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-burgundy-900"
          >
            <div className="flex items-center justify-between border-b border-gold-400/15 px-5 py-4">
              <h3 className="flex items-center gap-2 font-serif text-xl text-ivory-100">
                <ShoppingBag className="h-5 w-5 text-gold-400" /> Your Cart
                <span className="text-sm text-ivory-100/50">({cartCount})</span>
              </h3>
              <button onClick={() => setCartOpen(false)} aria-label="Close" className="text-ivory-100/70 hover:text-gold-300">
                <X className="h-5 w-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag className="h-12 w-12 text-ivory-100/20" />
                <p className="mt-4 font-serif text-xl text-ivory-100/80">Your cart is empty</p>
                <p className="mt-2 text-sm text-ivory-100/50">Find the piece that matches your vibe.</p>
                <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-gold mt-6">
                  Shop ऑल →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product_id}-${item.colour}`}
                      className="flex gap-4 border-b border-ivory-100/10 py-4"
                    >
                      <Link to={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="h-24 w-20 flex-shrink-0 overflow-hidden bg-burgundy-800">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <Link to={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-base text-ivory-100 hover:text-gold-300">
                            {item.name}
                          </Link>
                          <button onClick={() => removeFromCart(item.product_id, item.colour)} aria-label="Remove" className="text-ivory-100/40 hover:text-gold-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-[11px] uppercase tracking-widest text-ivory-100/40">
                          {item.product_code} · {item.colour}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-ivory-100/20">
                            <button onClick={() => updateQuantity(item.product_id, item.colour, item.quantity - 1)} className="grid h-8 w-8 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Decrease">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm text-ivory-100">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product_id, item.colour, item.quantity + 1)} className="grid h-8 w-8 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Increase">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-gold-300">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold-400/15 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-ivory-100/60">Total</span>
                    <span className="font-serif text-2xl text-gold-300">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-outline mt-4 w-full">
                    View Cart
                  </Link>
                  <Link to="/customer-details" onClick={() => setCartOpen(false)} className="btn-gold-solid mt-3 w-full">
                    Proceed to WhatsApp
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
