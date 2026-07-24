import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

export function ProductCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[78%] flex-shrink-0 snap-start sm:w-[42%] lg:w-[28%] xl:w-[23%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="absolute -left-2 top-[38%] hidden h-10 w-10 place-items-center border border-gold-400/40 bg-burgundy-900/70 text-gold-300 backdrop-blur-sm transition-colors hover:bg-gold-400 hover:text-burgundy-900 sm:grid"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Next"
        className="absolute -right-2 top-[38%] hidden h-10 w-10 place-items-center border border-gold-400/40 bg-burgundy-900/70 text-gold-300 backdrop-blur-sm transition-colors hover:bg-gold-400 hover:text-burgundy-900 sm:grid"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
