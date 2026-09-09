import { Link } from 'react-router-dom';
import { ArrowRight, Gem, Sparkles, Heart, Globe } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider, FloatingMotif, JharokhaArch, JaaliPattern } from '@/components/Ornaments';
import About from '../images/About.webp'
import OurStoryHero from '../images/OurStory/OurStoryHero.png';

export function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Story"
        title="About GemWale"
        bilingual="जेमवाले के बारे में"
        description="Premium gemstone jewellery with an Indian Rajasthani soul — made for every age, every style, every occasion."
        image={OurStoryHero}
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

GemWale started with something I had been seeing since childhood.
  <br />  <br />
I grew up watching gemstone jewellery being made and experiencing the world of gemstones up close through the wholesale market. As a child, I often wondered, “Who wears these? Where do these actually come into use?” At that time, gemstones felt like something very traditional—something you would probably see with a saree, an ethnic outfit, or perhaps in a very old-fashioned style of dressing.
  <br />  <br />
But as I grew older, my perspective slowly changed.
  <br />  <br />
I began to notice how unique gemstones really are—their natural colours, textures, imperfections and the way every stone has its own character. Unique jewelry and stone jewelry felt different from ordinary artificial or antique jewellery. Gradually, I realised that precious stone jewelry and natural gemstone jewellery don't have to be limited to traditions or special occasions. They can be beautiful fashion pieces too. They can be styled with a saree, a dress, jeans, a simple kurta—or even your everyday look.
  <br />  <br />
That realisation is where GemWale began.
  <br />  <br />
I started wearing and styling gemstone jewellery myself, experimenting with different stones, colours and designs, and discovering how effortlessly they could become a part of everyday fashion. What once seemed old and traditional started feeling fresh, personal and timeless.
  <br />  <br />
GemWale is our way of bringing that feeling to you.
  <br />  <br />
From natural and semi-precious stones to precious stones, glass stones, astrology stones, gemstone necklaces, rings, bracelets and even little everyday pieces like keychains, we want to create something for everyone and every age. Some pieces are about fashion, some carry meaning, some are simply beautiful—and some may hold a little bit of all three.
  <br />  <br />
Most importantly, we believe in keeping it real. We want you to know what you are wearing and appreciate the stone for what it truly is. No unnecessary claims, no pretending, and no trying to make gemstones something they are not.
  <br />  <br />
Because for us, gemstones are not just jewellery.
  <br />  <br />
They are little pieces of nature, individuality and stories—made to be worn, styled and enjoyed in your own way.
  <br />  <br />
Welcome to GemWale — where gemstones meet everyday style.
            </p>
           
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden bg-burgundy-800">
              <img src={About} alt="GemWale jewellery" className="h-full w-full object-cover" />
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
