import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProductBySlug, products } from '@/data/catalog';
import { useStore } from '@/context/StoreContext';
import { WHATSAPP_NUMBER } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const navigate = useNavigate();

  const [activeImg, setActiveImg] = useState(0);
  const [colour, setColour] = useState(product?.colour || '');
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<'description' | 'details' | 'care'>('description');

  if (!product) {
    return (
      <div className="container-editorial py-32 text-center">
        <p className="font-display text-3xl text-ivory-100">Product not found</p>
        <Link to="/shop" className="btn-gold mt-6">Back to Shop</Link>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const related = products.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);

  const handleWhatsApp = () => {
    const msg = `✨ GEMWALE PRODUCT ENQUIRY\n\nProduct: ${product.name}\nProduct Code: ${product.product_code}\nColour: ${colour}\nQuantity: ${quantity}\nPrice: ₹${product.price.toLocaleString('en-IN')}\n\nI'd like to know more about this piece.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pt-16">
      <div className="container-editorial py-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ivory-100/60 hover:text-gold-300">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
        </Link>
      </div>

      <section className="container-editorial pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <motion.div
              key={activeImg}
              initial={{ opacity: 0.4, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden bg-burgundy-800"
            >
              <img src={product.images[activeImg]} alt={product.name} className="h-full w-full object-cover" />
              {product.is_limited_edition && (
                <span className="absolute left-4 top-4 border border-gold-400/50 bg-burgundy-900/70 px-3 py-1 text-[10px] uppercase tracking-widest text-gold-300 backdrop-blur-sm">
                  Limited Edition
                </span>
              )}
            </motion.div>
            <div className="mt-4 flex gap-3">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-16 flex-shrink-0 overflow-hidden border transition-colors ${
                    activeImg === i ? 'border-gold-400' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:pt-4">
            <p className="section-eyebrow mb-3">
              {product.is_new_arrival && 'New Arrival · '}
              {product.is_bestseller && 'Best Seller · '}
              {product.is_trending && 'Trending'}
            </p>
            <h1 className="font-display text-4xl leading-tight text-ivory-100 sm:text-5xl">{product.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-ivory-100/40">
              {product.product_code}
            </p>
            <p className="mt-4 font-serif text-3xl text-gold-300">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <OrnamentalDivider className="my-6 justify-start" />

            {/* Colour selection */}
            <div className="mb-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">Colour: <span className="text-ivory-100/80">{colour}</span></p>
              <div className="flex flex-wrap gap-2">
                {product.colours.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColour(c)}
                    className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                      colour === c
                        ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                        : 'border-ivory-100/20 text-ivory-100/70 hover:border-gold-400/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">Quantity</p>
              <div className="flex items-center border border-ivory-100/20 w-fit">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-ivory-100">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="grid h-10 w-10 place-items-center text-ivory-100/70 hover:text-gold-300" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Availability */}
            <p className="mb-6 flex items-center gap-2 text-sm text-ivory-100/70">
              <Check className="h-4 w-4 text-gold-400" /> {product.availability}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => addToCart(product, colour, quantity)}
                className="btn-gold-solid flex-1"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button onClick={handleWhatsApp} className="btn-gold flex-1">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                Buy on WhatsApp
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className="grid h-[52px] w-[52px] place-items-center border border-ivory-100/20 text-ivory-100/80 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <Heart className={`h-5 w-5 ${wished ? 'fill-gold-400 text-gold-400' : ''}`} />
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t border-gold-400/15 pt-6">
              <div className="mb-5 flex gap-6">
                {(['description', 'details', 'care'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`text-xs uppercase tracking-widest transition-colors ${
                      tab === t ? 'text-gold-300' : 'text-ivory-100/50 hover:text-ivory-100/80'
                    }`}
                  >
                    {t === 'care' ? 'Care' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <motion.p
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm leading-relaxed text-ivory-100/70"
              >
                {tab === 'description' && product.description}
                {tab === 'details' && product.details}
                {tab === 'care' && product.care_instructions}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gold-400/10 py-16">
          <div className="container-editorial">
            <SectionReveal className="mb-10 text-center">
              <p className="section-eyebrow mb-3">You May Also Like</p>
              <h2 className="font-display text-3xl text-ivory-100 sm:text-4xl">Related Pieces</h2>
              <OrnamentalDivider className="mt-4" />
            </SectionReveal>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p, i) => (
                <SectionReveal key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
