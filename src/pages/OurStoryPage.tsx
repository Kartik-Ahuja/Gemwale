import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider, FloatingMotif, JharokhaArch, PeacockCurve, JaaliPattern } from '@/components/Ornaments';
import OurStoryHero from '../images/OurStory/OurStoryHero.png';
import OurStory2 from '../images/OurStory/OurStory2.png';

export function OurStoryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Rooted in Rajasthan"
        title="Our Story"
        bilingual="हमारी कहानी"
        description="A reflection of your mood, a part of your style."
        image={OurStoryHero}
      />

      {/* Narrative */}
      <section className="border-b border-gold-400/10 py-24">
        <div className="container-editorial max-w-3xl">
          <SectionReveal>
            {/* <p className="section-eyebrow mb-4">Chapter One</p> */}
            <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-4xl">
              It Started With a Stone
            </h2>
            <OrnamentalDivider className="mt-5 justify-start" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ivory-100/70">
              <p>
               I grew up watching gemstone jewellery being made and seeing the world of gemstones up close through the wholesale market. As a child, I often wondered, “Who wears these? Where do these actually come into use?” At that time, gemstones felt like something very traditional—something you would probably see with a saree, an ethnic outfit, or perhaps in a very old-fashioned style of dressing.
<br />  <br />
But as I grew older, my perspective slowly changed.
<br />  <br />
I began to notice how unique gemstones really are—their natural colours, textures, imperfections and the way every stone has its own character. They looked different from ordinary artificial or antique jewellery. And gradually, I realised that gemstones don't have to be limited to traditions or special occasions. They can be beautiful fashion pieces too. They can be styled with a saree, a dress, jeans, a simple kurta—or even your everyday look.
           <br />  <br /> That realisation is where GemWale began.
<br />  <br />
I started wearing and styling gemstone jewellery myself, experimenting with different stones, colours and designs, and discovering how effortlessly they could become a part of everyday fashion. What once seemed old and traditional started feeling fresh, personal and timeless.
<br />  <br />
GemWale is our way of bringing that feeling to you.
<br />  <br />
From natural and semi-precious stones to precious stones, glass stones, astrology stones, necklaces, rings, bracelets and even little everyday pieces like keychains, we want to create something for everyone and every age. Some pieces are about fashion, some carry meaning, some are simply beautiful—and some may hold a little bit of all three.
<br />  <br />
Most importantly, we believe in keeping it real. We want you to know what you are wearing and appreciate the stone for what it truly is. No unnecessary claims, no pretending, and no trying to make gemstones something they are not.
<br />  <br />
Because for us, gemstones are not just jewellery.
<br />  <br />
They are little pieces of nature, individuality and stories—made to be worn, styled and enjoyed in your own way.
<br />  <br />
Welcome to GemWale — where gemstones meet everyday style.
             
              </p>
              <p className="font-extrabold">
                For plans, no plans & everything in between.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Visual break */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden border-b border-gold-400/10">
        <img src={OurStory2} alt="Rajasthan" className="h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/40 to-burgundy-950/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <SectionReveal className="text-center">
            <p className="font-display text-3xl text-ivory-100 sm:text-5xl">
              Rooted in <span className="gold-text-gradient">Rajasthan.</span>
            </p>
            <p className="mt-2 font-display text-3xl text-ivory-100 sm:text-5xl">
              Made for <span className="gold-text-gradient">Everywhere.</span>
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Chapter two */}
      {/* <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <FloatingMotif className="right-10 top-10 h-28 w-28 opacity-15" delay={0}>
          <PeacockCurve className="h-full w-full" />
        </FloatingMotif>
        <FloatingMotif className="left-10 bottom-10 h-24 w-24 opacity-10" delay={1}>
          <JaaliPattern className="h-full w-full" />
        </FloatingMotif>
        <div className="container-editorial max-w-3xl relative">
          <SectionReveal>
            <p className="section-eyebrow mb-4">Chapter Two</p>
            <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-4xl">
              Made for Every Vibe
            </h2>
            <OrnamentalDivider className="mt-5 justify-start" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ivory-100/70">
              <p>
                So we built GemWale — premium gemstone jewellery with subtle influences from Rajasthani craft, reimagined for a contemporary world.

Subtle arches. Fine patterns. Abstract peacock-inspired curves.
Never overwhelming. Always effortless.
              </p>
              <p>
              We work with gemstones, resin, and glass, paired with anti-tarnish, skin-friendly finishes, creating pieces made to stay beautiful, wear after wear.

And we made our bracelets and keychains unisex — because style has no rules.
              </p>
              <p className="font-serif text-xl italic text-gold-300">
No age limit. No style limit. No occasion limit. Just jewellery that matches your vibe.              </p>
            </div>
          </SectionReveal>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="container-editorial">
          <SectionReveal>
            <FloatingMotif className="left-1/4 top-0 h-20 w-20 opacity-10" delay={0}>
              <JharokhaArch className="h-full w-full" />
            </FloatingMotif>
            <h2 className="font-display text-3xl text-ivory-100 sm:text-5xl">
              Your <span className="gold-text-gradient">GemWale</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-ivory-100/65">
              Your style. Your vibe. Your way.
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
