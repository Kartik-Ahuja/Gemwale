import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/catalog';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/PageHero';
import { SectionReveal } from '@/components/Ornaments';
import type { Product } from '@/types';

type SortKey = 'newest' | 'price-asc' | 'price-desc' | 'bestsellers' | 'trending';

const allColours = Array.from(new Set(products.flatMap((p) => p.colours))).sort();

export function ShopPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [selectedCats, setSelectedCats] = useState<string[]>(params.get('category') ? [params.get('category')!] : []);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [sort, setSort] = useState<SortKey>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [visible, setVisible] = useState(12);

  const filtered = useMemo(() => {
    let list: Product[] = [...products];
    if (selectedCats.length) {
      const catIds = categories.filter((c) => selectedCats.includes(c.slug)).map((c) => c.id);
      list = list.filter((p) => p.category_id && catIds.includes(p.category_id));
    }
    if (selectedColours.length) {
      list = list.filter((p) => p.colours.some((c) => selectedColours.includes(c)));
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'bestsellers': list.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller)); break;
      case 'trending': list.sort((a, b) => Number(b.is_trending) - Number(a.is_trending)); break;
      default: list.sort((a, b) => Number(b.is_new_arrival) - Number(a.is_new_arrival));
    }
    return list;
  }, [selectedCats, selectedColours, priceRange, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, value: string) =>
    set(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">Category</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ivory-100/75 hover:text-gold-300">
              <input
                type="checkbox"
                checked={selectedCats.includes(c.slug)}
                onChange={() => toggle(selectedCats, setSelectedCats, c.slug)}
                className="h-3.5 w-3.5 accent-gold-400"
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">Colour</h3>
        <div className="flex flex-wrap gap-2">
          {allColours.map((c) => (
            <button
              key={c}
              onClick={() => toggle(selectedColours, setSelectedColours, c)}
              className={`border px-3 py-1.5 text-xs transition-colors ${
                selectedColours.includes(c)
                  ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                  : 'border-ivory-100/20 text-ivory-100/70 hover:border-gold-400/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">Price Range</h3>
        <div className="flex items-center justify-between text-sm text-ivory-100/70">
          <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
          <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={0}
          max={6000}
          step={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="mt-2 w-full accent-gold-400"
        />
      </div>
    </div>
  );

  return (
    <div>
      <PageHero
        eyebrow="The Full Catalogue"
        title="Shop All"
        bilingual="Shop ऑल"
        description="Every piece in the GemWale atelier. Filter by category, colour, and price to find your vibe."
      />

      <section className="py-12">
        <div className="container-editorial">
          {/* Toolbar */}
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-gold-400/15 pb-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-ivory-100/80 hover:text-gold-300 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <p className="text-sm text-ivory-100/60">{filtered.length} pieces</p>
            <div className="flex items-center gap-3">
              <label className="text-[10px] uppercase tracking-widest text-ivory-100/50">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-ivory-100/20 bg-burgundy-950 px-3 py-2 text-sm text-ivory-100 focus:border-gold-400 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestsellers">Best Sellers</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          <div className="flex gap-10">
            {/* Desktop filters */}
            <aside className="hidden w-60 flex-shrink-0 lg:block">
              <FilterPanel />
            </aside>

            {/* Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="font-serif text-xl text-ivory-100/70">No pieces match your filters.</p>
                  <button
                    onClick={() => { setSelectedCats([]); setSelectedColours([]); setPriceRange([0, 6000]); }}
                    className="btn-gold mt-4"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.slice(0, visible).map((p, i) => (
                    <SectionReveal key={p.id} delay={(i % 4) * 0.05}>
                      <ProductCard product={p} />
                    </SectionReveal>
                  ))}
                </div>
              )}

              {visible < filtered.length && (
                <div className="mt-12 text-center">
                  <button onClick={() => setVisible((v) => v + 8)} className="btn-outline">
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {showFilters && (
        <>
          <div className="fixed inset-0 z-[80] bg-burgundy-950/80 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)} />
          <motion.aside
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-x-0 bottom-0 z-[90] max-h-[80vh] overflow-y-auto bg-burgundy-900 p-6 lg:hidden"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-serif text-xl">Filters</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close"><X className="h-5 w-5 text-ivory-100/70" /></button>
            </div>
            <FilterPanel />
            <button onClick={() => setShowFilters(false)} className="btn-gold-solid mt-8 w-full">
              Show {filtered.length} Results
            </button>
          </motion.aside>
        </>
      )}
    </div>
  );
}
