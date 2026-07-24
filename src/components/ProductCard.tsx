import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative flex flex-col"
    >
      <div className="product-card-img relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.is_new_arrival && (
            <span className="border border-gold-400/50 bg-burgundy-900/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-gold-300 backdrop-blur-sm">
              New
            </span>
          )}
          {product.is_limited_edition && (
            <span className="border border-gold-400/50 bg-burgundy-900/70 px-2.5 py-1 text-[10px] uppercase tracking-widest text-gold-300 backdrop-blur-sm">
              Limited
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center border border-ivory-100/20 bg-burgundy-900/50 text-ivory-100 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-300"
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-gold-400 text-gold-400' : ''}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-burgundy-900/85 p-3 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
          <button
            onClick={() => addToCart(product, product.colour, 1)}
            className="flex w-full items-center justify-center gap-2 border border-gold-400 py-2.5 text-[10px] uppercase tracking-widest text-gold-300 transition-colors hover:bg-gold-400 hover:text-burgundy-900"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <Link to={`/product/${product.slug}`} className="font-serif text-lg leading-snug text-ivory-100 transition-colors hover:text-gold-300">
          {product.name}
        </Link>
        <p className="mt-0.5 text-[11px] uppercase tracking-widest text-ivory-100/40">
          {product.product_code} · {product.colour}
        </p>
        <p className="mt-1.5 font-sans text-sm tracking-wide text-gold-300">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </motion.div>
  );
}
