import { Link } from 'react-router-dom';
import { ArrowRight, Gem, Sparkles, Heart, Globe } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider, FloatingMotif, JharokhaArch, JaaliPattern } from '@/components/Ornaments';

export function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Story"
        title="About GemWale"
        bilingual="गेमवाले के बारे में"
        description="Premium gemstone jewellery with an Indian Rajasthani soul — made for every age, every style, every occasion."
        image="https://images.pexels.com/photos/1454113009175-9a4b1c3de9a4/pexels-photo-1454113009175-9a4b1c3de9a4.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      {/* Brand idea */}
      <section className="border-b border-gold-400/10 py-24 text-center">
        <div className="container-editorial">
          <SectionReveal>
            <p className="section-eyebrow mb-4">The Core Idea</p>
            <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
              Jewellery That Matches Your <span className="gold-text-gradient">Vibe.</span>
            </h2>
            <p className="mt-2 font-serif text-2xl italic text-gold-300">Anywhere. Everywhere.</p>
            <OrnamentalDivider className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ivory-100/70">
              GemWale was born from a simple observation: jewellery shouldn't wait for a special
              occasion. It should move with you — from a café morning to a wedding evening, from
              college corridors to beach vacations. One piece. Endless vibes.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-12 text-center">
            <p className="section-eyebrow mb-3">What We Believe</p>
            <h2 className="font-display text-3xl text-ivory-100 sm:text-4xl">No Limits</h2>
          </SectionReveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Heart, title: 'No Age Limit', text: 'From young to mature, GemWale is for women of all age groups — and anyone who loves premium gemstone jewellery.' },
              { icon: Sparkles, title: 'No Style Limit', text: 'Traditional, casual, street-inspired, elegant. Style it your way with anything in your wardrobe.' },
              { icon: Globe, title: 'No Occasion Limit', text: 'Everyday moments or unforgettable occasions. Your jewellery moves with you, everywhere.' },
            ].map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div className="h-full border border-gold-400/15 bg-burgundy-950/40 p-8 text-center">
                  <v.icon className="mx-auto h-8 w-8 text-gold-400" />
                  <h3 className="mt-4 font-serif text-2xl text-ivory-100">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-100/65">{v.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft */}
      <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <FloatingMotif className="left-10 top-12 h-28 w-28 opacity-15" delay={0}>
          <JharokhaArch className="h-full w-full" />
        </FloatingMotif>
        <FloatingMotif className="right-10 bottom-12 h-24 w-24 opacity-10" delay={1.5}>
          <JaaliPattern className="h-full w-full" />
        </FloatingMotif>
        <div className="container-editorial relative grid items-center gap-12 lg:grid-cols-2">
          <SectionReveal>
            <p className="section-eyebrow mb-4">The Craft</p>
            <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-4xl lg:text-5xl">
              Premium Gemstone Jewellery
            </h2>
            <OrnamentalDivider className="mt-5 justify-start" />
            <p className="mt-5 text-base leading-relaxed text-ivory-100/70">
              Every GemWale piece is hand-finished with ethically sourced gemstones, resin, and glass
              stones. Our anti-tarnish finish and hypoallergenic settings mean your jewellery stays
              beautiful — wear after wear.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ivory-100/70">
              We draw from the jharokhas of Jaipur, the jaali of Jaisalmer, and the mandana of
              Marwar — reimagined for a contemporary world. Subtle. Luxurious. Artistic.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden bg-burgundy-800">
              <img src="https://images.pexels.com/photos/1616406/pexels-photo-1616406.jpeg?auto=compress&cs=tinysrgb&w=900" alt="GemWale craft" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-burgundy-950/20" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container-editorial">
          <SectionReveal>
            <Gem className="mx-auto h-10 w-10 text-gold-400" />
            <h2 className="mt-5 font-display text-3xl text-ivory-100 sm:text-5xl">
              Find Your <span className="gold-text-gradient">Vibe</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-ivory-100/65">
              Explore the collection and find the piece that matches you.
            </p>
            <Link to="/shop" className="btn-gold-solid mt-8">
              Shop ऑल <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
