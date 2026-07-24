import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PageHero } from '@/components/PageHero';
import { OrnamentalDivider } from '@/components/Ornaments';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useStore();

  return (
    <div>
      <PageHero
        eyebrow="Your Selection"
        title="Cart"
        bilingual="कार्ट"
        description="Review your pieces before proceeding to WhatsApp checkout."
      />

      <section className="py-12">
        <div className="container-editorial">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag className="h-14 w-14 text-ivory-100/20" />
              <p className="mt-5 font-serif text-2xl text-ivory-100/80">Your cart is empty</p>
              <p className="mt-2 text-sm text-ivory-100/50">Find the piece that matches your vibe.</p>
              <Link to="/shop" className="btn-gold mt-6">Shop ऑल →</Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3">
              {/* Items */}
              <div className="lg:col-span-2">
                {cart.map((item) => (
                  <div
                    key={`${item.product_id}-${item.colour}`}
                    className="flex gap-5 border-b border-ivory-100/10 py-6"
                  >
                    <Link to={`/product/${item.slug}`} className="h-32 w-28 flex-shrink-0 overflow-hidden bg-burgundy-800">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.slug}`} className="font-serif text-xl text-ivory-100 hover:text-gold-300">
                          {item.name}
                        </Link>
                        <button onClick={() => removeFromCart(item.product_id, item.colour)} aria-label="Remove" className="text-ivory-100/40 hover:text-gold-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-widest text-ivory-100/40">
                        {item.product_code} · {item.colour}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="flex items-center border border-ivory-100/20">
                          <button onClick={() => updateQuantity(item.product_id, item.colour, item.quantity - 1)} className="grid h-9 w-9 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Decrease">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm text-ivory-100">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product_id, item.colour, item.quantity + 1)} className="grid h-9 w-9 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Increase">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-lg text-gold-300">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 border border-gold-400/15 bg-burgundy-950/50 p-6">
                  <h3 className="font-serif text-2xl text-ivory-100">Order Summary</h3>
                  <OrnamentalDivider className="mt-4 justify-start" />
                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between text-ivory-100/70">
                      <span>Items ({cartCount})</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-ivory-100/70">
                      <span>Shipping</span>
                      <span className="text-gold-300">Calculated on WhatsApp</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-ivory-100/10 pt-5">
                    <span className="text-xs uppercase tracking-widest text-ivory-100/60">Total</span>
                    <span className="font-serif text-3xl text-gold-300">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <Link to="/customer-details" className="btn-gold-solid mt-6 w-full">
                    Proceed to WhatsApp
                  </Link>
                  <Link to="/shop" className="btn-outline mt-3 w-full">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
