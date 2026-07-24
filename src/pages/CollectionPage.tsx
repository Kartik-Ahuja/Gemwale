import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections, products } from '@/data/catalog';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';
import type { CollectionSlug } from '@/types';

const filterMap: Record<string, (p: typeof products[number]) => boolean> = {
  'new-arrivals': (p) => p.is_new_arrival,
  'best-sellers': (p) => p.is_bestseller,
  'trending': (p) => p.is_trending,
  'featured-edit': (p) => p.is_featured,
  'latest-drops': (p) => p.is_new_arrival || p.is_limited_edition,
  'fresh-styles': () => true,
  'signature-pieces': (p) => p.is_featured,
  'limited-edition': (p) => p.is_limited_edition,
  'top-picks': (p) => p.is_bestseller || p.is_trending,
  'unisex': (p) => p.is_unisex,
};

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collections.find((c) => c.slug === slug);
  const [visible, setVisible] = useState(12);

  const items = useMemo(() => {
    if (!collection) return [];
    const fn = filterMap[collection.slug as CollectionSlug];
    return fn ? products.filter(fn) : [];
  }, [collection]);

  if (!collection) {
    return (
      <div className="container-editorial py-32 text-center">
        <p className="font-display text-3xl text-ivory-100">Collection not found</p>
        <Link to="/collections" className="btn-gold mt-6">View All Collections</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        eyebrow="Collection"
        title={collection.name}
        bilingual={collection.tagline}
        description={collection.description}
        image={collection.image_url}
      />

      <section className="py-12">
        <div className="container-editorial">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm text-ivory-100/60">{items.length} pieces</p>
            <Link to="/shop" className="text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">
              Shop All <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-xl text-ivory-100/70">No pieces in this collection yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {items.slice(0, visible).map((p, i) => (
                <SectionReveal key={p.id} delay={(i % 4) * 0.05}>
                  <ProductCard product={p} />
                </SectionReveal>
              ))}
            </div>
          )}

          {visible < items.length && (
            <div className="mt-12 text-center">
              <button onClick={() => setVisible((v) => v + 8)} className="btn-outline">Load More</button>
            </div>
          )}
        </div>
      </section>

      {/* Other collections */}
      <section className="border-t border-gold-400/10 py-16">
        <div className="container-editorial text-center">
          <OrnamentalDivider className="mb-6" />
          <p className="section-eyebrow mb-3">Explore More</p>
          <h3 className="font-display text-3xl text-ivory-100">Other Collections</h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {collections.filter((c) => c.slug !== collection.slug).map((c) => (
              <Link
                key={c.id}
                to={`/collections/${c.slug}`}
                className="border border-ivory-100/20 px-5 py-2.5 text-xs uppercase tracking-widest text-ivory-100/75 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
