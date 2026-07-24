import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { products } from '@/data/catalog';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/PageHero';
import { SectionReveal } from '@/components/Ornaments';

export function WishlistPage() {
  const { wishlist } = useStore();
  const wished = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <PageHero
        eyebrow="Saved Pieces"
        title="Wishlist"
        bilingual="विशलिस्ट"
        description="The pieces you've saved. Your vibe, your way."
      />

      <section className="py-12">
        <div className="container-editorial">
          {wished.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Heart className="h-14 w-14 text-ivory-100/20" />
              <p className="mt-5 font-serif text-2xl text-ivory-100/80">Your wishlist is empty</p>
              <p className="mt-2 text-sm text-ivory-100/50">Tap the heart on any piece to save it here.</p>
              <Link to="/shop" className="btn-gold mt-6">Shop ऑल →</Link>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm text-ivory-100/60">{wished.length} pieces saved</p>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {wished.map((p, i) => (
                  <SectionReveal key={p.id} delay={(i % 4) * 0.05}>
                    <ProductCard product={p} />
                  </SectionReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
