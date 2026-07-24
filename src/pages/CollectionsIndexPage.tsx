import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/catalog';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';

export function CollectionsIndexPage() {
  return (
    <div>
      <PageHero
        eyebrow="Curated Selections"
        title="Collections"
        bilingual="संग्रह"
        description="Ten curated collections. Each one a different way to wear GemWale. Find the edit that matches your vibe."
      />

      <section className="py-16">
        <div className="container-editorial">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <SectionReveal key={c.id} delay={(i % 3) * 0.08}>
                <Link to={`/collections/${c.slug}`} className="group relative block overflow-hidden border border-gold-400/15 bg-burgundy-950">
                  <div className="relative aspect-[16/10] overflow-hidden bg-burgundy-800">
                    <img src={c.image_url} alt={c.name} className="h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <p className="section-eyebrow mb-2">{c.tagline}</p>
                      <h3 className="font-display text-3xl text-ivory-100">{c.name}</h3>
                      <OrnamentalDivider className="mt-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <p className="mt-3 max-w-xs text-sm text-ivory-100/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {c.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 opacity-0 transition-opacity group-hover:opacity-100">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
