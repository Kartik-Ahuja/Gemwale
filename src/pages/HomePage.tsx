import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Star, ExternalLink, Loader, Instagram } from 'lucide-react';
import { categories, collections } from '@/data/catalog';
import { ProductCarousel } from '@/components/ProductCarousel';
import { ProductCard } from '@/components/ProductCard';
import { FloatingMotif, JharokhaArch, JaaliPattern, OrnamentalDivider, PeacockCurve, SectionReveal } from '@/components/Ornaments';
import { getProducts } from '@/lib/productStore';
import { getInstagramPosts, type InstagramPost } from '@/lib/instagram';
import type { Product } from '@/types';
import MainHero from '../images/hero section/main-hero.webp';
import demo1 from '../images/demo.jpg';
import demo2 from '../images/demo2.jpeg';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>GemWale | Fashion Jewellery That Matches Your Vibe</title>

        <meta
          name="description"
          content="Discover stylish fashion jewellery by GemWale, designed for everyday looks, festive moments and everything in between. Shop necklaces, bracelets and more."
        />

        <meta
          name="keywords"
          content="GemWale, fashion jewellery, trendy jewellery, jewellery for women, necklaces, bracelets, earrings, gemstone jewellery, stylish jewellery, online jewellery store"
        />
      </Helmet>

      {/* Home page content */}
    </>
  );
}

const lifestyleScenes = [
  { label: 'Café', img: demo1 },
  { label: 'Date', img: demo2 },
  { label: 'College', img: demo1 },
  { label: 'Work', img: demo2 },
  { label: 'Wedding', img: demo1 },
  { label: 'Traditional', img: demo2 },
  { label: 'Beach', img: demo1 },
  { label: 'Casual', img: demo2 },
  { label: 'Party', img: demo1 },
];

const testimonials = [
  {
    name: 'Aarushi M.',
    text: 'The necklace looks even better in person. It feels stylish, elegant, and goes perfectly with both Indian and western outfits.',
    role: 'Jaipur'
  },
  {
    name: 'Riya S.',
    text: 'I love how unique the designs feel. My GemWale necklace has quickly become one of those pieces I reach for all the time.',
    role: 'Delhi'
  },
  {
    name: 'Mehak J.',
    text: 'I wore my GemWale necklace with a simple outfit and it completely elevated the look. Such an effortless statement piece.',
    role: 'Mumbai'
  },
  {
    name: 'Ishita K.',
    text: 'The packaging was beautiful and the jewellery felt really special. It also makes such a lovely gifting option.',
    role: 'Bengaluru'
  },
  {
    name: 'Naina P.',
    text: 'What I like most is how easy the jewellery is to style. It works beautifully for everyday looks as well as festive occasions.',
    role: 'Pune'
  },
  {
    name: 'Tanya B.',
    text: 'Beautiful designs, good finishing, and very easy to style. GemWale has exactly the modern jewellery vibe I was looking for.',
    role: 'Jaipur'
  }
];

// Removed static instagramPosts - now fetched from API

// (hero image imported above as `MainHero`)

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [products, setProducts] = useState<Product[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(true);

  useEffect(() => {
    (async () => {
      const items = await getProducts();
      setProducts(items as Product[]);
    })();
  }, []);

  useEffect(() => {
    // Fetch Instagram posts
    (async () => {
      setIsLoadingInstagram(true);
      const posts = await getInstagramPosts(6);
      setInstagramPosts(posts);
      setIsLoadingInstagram(false);
    })();
  }, []);

  // const newArrivals = products.filter((p) => p.is_new_arrival);
  const bestSellers = products.filter((p) => p.is_bestseller);
  const trending = products.filter((p) => p.is_trending);
  const latestDrops = products.filter((p) => p.is_new_arrival || p.is_limited_edition).slice(0, 8);
  // const signature = products.filter((p) => p.is_featured).slice(0, 4);
  const limited = products.filter((p) => p.is_limited_edition);
  const topPicks = [...bestSellers, ...trending].slice(0, 8);
  // const unisex = products.filter((p) => p.is_unisex);

  return (
    <div className="overflow-hidden">

<section
  ref={heroRef}
  
  className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden"
>
  
 
  {/* ================= BACKGROUND ================= */}
  <motion.div
  style={{ y: heroY }}
  className="pointer-events-none absolute inset-0"
>
  <img
    src={MainHero}
    alt="GemWale hero background"
    className="absolute inset-0 h-full w-full object-cover opacity-15"
  />


  <div className="absolute inset-0 bg-burgundy-950/20" />
</motion.div>


   <FloatingMotif className="left-8 top-24 h-32 w-32 opacity-20" delay={0}>
          <JharokhaArch className="h-full w-full" />
        </FloatingMotif>
        <FloatingMotif className="right-10 bottom-32 h-28 w-28 opacity-15" delay={2}>
          <PeacockCurve className="h-full w-full" />
        </FloatingMotif>

        <motion.div style={{ opacity: heroOpacity }} className="container-editorial relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="section-eyebrow mb-5"
          >
            Premium Gemstone Jewellery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="font-display text-4xl leading-[1.05] text-ivory-100 text-shadow-lux sm:text-6xl lg:text-7xl xl:text-8xl"
          >
          <span className="gold-text-gradient">ज्वेलरी</span>    That
            <br />
            Matches Your <span className="gold-text-gradient">Vibe.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto mt-5 max-w-xl font-serif text-lg italic text-ivory-100/80 sm:text-xl"
          >
            Anywhere. Everywhere.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mx-auto mt-4 max-w-md text-sm text-ivory-100/60 sm:text-base"
          >
            Gemstone jewellery designed for every age, every style, and every occasion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/shop" className="btn-gold-solid">Shop the Collection</Link>
            <Link to="/about" className="btn-outline">Explore GemWale</Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-ivory-100/50">Scroll to Explore</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-2 text-gold-400"
          >
            <ChevronDown className="mx-auto h-5 w-5" />
          </motion.div>
        </motion.div>
</section>
      {/* BRAND STATEMENT */}
      <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24 text-center">
        <div className="bg-mandana absolute inset-0 opacity-50" />
        <FloatingMotif className="left-6 top-10 h-24 w-24 opacity-10" delay={1}>
          <JaaliPattern className="h-full w-full" />
        </FloatingMotif>
        <SectionReveal className="container-editorial relative">
          <p className="section-eyebrow mb-4">The GemWale Philosophy</p>
          <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
           For plans you made
            <br />
            <span className="gold-text-gradient">& moments you didn't. </span>
          </h2>
          <OrnamentalDivider className="mt-7" />
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ivory-100/70">
            From everyday moments to unforgettable occasions, GemWale jewellery moves with you.
          </p>
          <p className="mt-3 font-serif text-xl italic text-gold-300">
            Your vibe. Your style. Your way.
          </p>
        </SectionReveal>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-12 text-center">
            <p className="section-eyebrow mb-3">Shop by Category</p>
            <h2 className="section-title-bilingual">
              अपनी <span className="gold-text-gradient">स्टाइल</span> चुनें
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ivory-100/60">
              Seven categories. Endless ways to wear them.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 ">
            {categories.map((cat, i) => (
              <SectionReveal key={cat.id} delay={i * 0.05}>
                <Link to={`/category/${cat.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-burgundy-800">
                    <img src={cat.image_url} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-burgundy-950/55 transition-colors group-hover:bg-burgundy-950/35" />
                    <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                      <p className="font-serif text-lg text-ivory-100">{cat.name}</p>
                      <span className="mt-1 block h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-10 group-hover:mx-auto" />
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {/* <SectionBlock eyebrow="New Arrivals" bilingual="New अराइवल्स" subtitle="Fresh pieces. New vibes." products={newArrivals} cta="See मोर" ctaLink="/collections/new-arrivals" carousel /> */}

      {/* BEST SELLERS */}
      {/* <SectionBlock eyebrow="Best Sellers" bilingual="Best सेलर्स" subtitle="The pieces our community keeps coming back for." products={bestSellers} cta="Shop ऑल" ctaLink="/collections/best-sellers" carousel dark /> */}
<SectionBlock
  eyebrow="Best Sellers"
  bilingual={
    <>
      Best <span className="gold-text-gradient">सेलर्स</span>
    </>
  }
  subtitle="The pieces our community keeps coming back for."
  products={bestSellers}
  cta="Shop All"
  ctaLink="/collections/best-sellers"
  carousel
  dark
/>
      {/* LIFESTYLE */}
      {/* <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial mb-10 text-center">
          <SectionReveal>
            <p className="section-eyebrow mb-3">The Vibe Edit</p>
            <h2 className="section-title">Jewellery That Matches Your Vibe</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ivory-100/60">
              From a café to a celebration. Swipe through the moments.
            </p>
          </SectionReveal>
        </div>
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
          {lifestyleScenes.map((scene) => (
            <div key={scene.label} className="relative aspect-[3/4] w-[72%] flex-shrink-0 snap-start overflow-hidden bg-burgundy-800 sm:w-[42%] lg:w-[26%] xl:w-[22%]">
              <img src={scene.img} alt={scene.label} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Vibe</p>
                <p className="font-display text-2xl text-ivory-100">{scene.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* TRENDING */}
      {/* <SectionBlock  eyebrow="Trending" bilingual="Trending नाउ" subtitle="What the world is wearing right now." products={trending} cta="See मोर" ctaLink="/collections/trending" carousel /> */}
<SectionBlock
  eyebrow="Trending"
  bilingual={
    <>
      Trending <span className="gold-text-gradient">नाउ</span>
    </>
  }
  subtitle="What the world is wearing right now."
  products={trending}
  cta="See More"
  ctaLink="/collections/trending"
  carousel
/>
      {/* FEATURED EDIT */}
      {/* <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <div className="bg-jaali absolute inset-0 opacity-30" />
        <FloatingMotif className="right-8 top-16 h-32 w-32 opacity-15" delay={0}>
          <JharokhaArch className="h-full w-full" />
        </FloatingMotif>
        <div className="container-editorial relative grid items-center gap-12 lg:grid-cols-2">
          <SectionReveal>
            <p className="section-eyebrow mb-4">The GemWale Edit</p>
            <h2 className="font-display text-4xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
              Featured <span className="gold-text-gradient">एडिट</span>
            </h2>
            <OrnamentalDivider className="mt-6 justify-start" />
            <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ivory-100/70">
              Pieces that match every version of you. Curated by the atelier for the season.
            </p>
            <Link to="/collections/featured-edit" className="btn-gold mt-8">
              Explore Edit <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {signature.slice(0, 4).map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group relative aspect-[3/4] overflow-hidden bg-burgundy-800">
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-burgundy-950/40 transition-opacity group-hover:bg-burgundy-950/20" />
                  <p className="absolute bottom-3 left-3 font-serif text-sm text-ivory-100">{p.name}</p>
                </Link>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section> */}

      {/* LATEST DROPS */}
      <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Just Landed</p>
            <h2 className="section-title-bilingual">Latest <span className="gold-text-gradient">ड्रॉप्स</span></h2>
          </SectionReveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {latestDrops.slice(0, 8).map((p, i) => (
              <SectionReveal key={p.id} delay={i * 0.04}>
                <ProductCard product={p} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RAJASTHAN STORY */}
      <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <div className="bg-mandana absolute inset-0 opacity-40" />
        <FloatingMotif className="left-10 top-12 h-28 w-28 opacity-15" delay={1}>
          <PeacockCurve className="h-full w-full" />
        </FloatingMotif>
        <FloatingMotif className="bottom-10 right-12 h-24 w-24 opacity-10" delay={2}>
          <JaaliPattern className="h-full w-full" />
        </FloatingMotif>
        <SectionReveal className="container-editorial relative text-center">
          <p className="section-eyebrow mb-4">Our Inspiration</p>
          <h2 className="font-display text-3xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
            Rooted in <span className="gold-text-gradient">Rajasthan.</span>
            <br />
            <span className="gold-text-gradient">Made</span> for Everywhere.
          </h2>
          <OrnamentalDivider className="mt-7" />
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ivory-100/70">
           Every GemWale piece is designed with a modern point of view — subtle, refined, and made to stand out effortlessly.
          </p>
          <Link to="/our-story" className="btn-gold mt-8">
            Read Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </section>

      {/* FRESH STYLES */}
      {/* <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Style It Your Way</p>
            <h2 className="section-title-bilingual">Fresh <span className="gold-text-gradient">स्टाइल्स</span></h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ivory-100/60">
              Traditional. Casual. Street-inspired. Elegant. Beach. Festive.
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {['Traditional', 'Casual', 'Street', 'Elegant', 'Beach', 'Festive'].map((style, i) => (
              <SectionReveal key={style} delay={i * 0.05}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-burgundy-800">
                  <img src={lifestyleScenes[i % lifestyleScenes.length].img} alt={style} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-burgundy-950/55 transition-colors group-hover:bg-burgundy-950/35" />
                  <p className="absolute inset-0 grid place-items-center font-display text-xl text-ivory-100">{style}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
          <SectionReveal className="mt-10 text-center">
            <p className="font-serif text-2xl italic text-gold-300">
              Your style. Your vibe. Your GemWale.
            </p>
          </SectionReveal>
        </div>
      </section> */}

      {/* SIGNATURE PIECES */}
      {/* <SectionBlock eyebrow="Premium Selection" bilingual="Signature पीसेस" subtitle="The hero pieces that define the house." products={signature} cta="Explore Edit" ctaLink="/collections/signature-pieces" carousel dark /> */}

      {/* LIMITED EDITION */}
      <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <div className="bg-jaali absolute inset-0 opacity-30" />
        <FloatingMotif className="right-10 top-16 h-32 w-32 opacity-20" delay={0}>
          <JharokhaArch className="h-full w-full" />
        </FloatingMotif>
        <div className="container-editorial relative text-center">
          <SectionReveal>
            <p className="section-eyebrow mb-4">Exclusive & Numbered</p>
            <h2 className="font-display text-4xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
              Limited <span className="gold-text-gradient">एडिशन</span>
            </h2>
            <OrnamentalDivider className="mt-7" />
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ivory-100/70">
              Exclusive pieces, crafted in limited numbers. Once they’re gone, they’re gone forever.
            </p>
          </SectionReveal>
          <div className="mt-12">
            <ProductCarousel products={limited} />
          </div>
          <Link to="/collections/limited-edition" className="btn-gold mt-10">
            View Limited Edition <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TOP PICKS */}
      {/* <SectionBlock eyebrow="Atelier Favourites" bilingual="Top पिक्स" subtitle="Our most-loved selections." products={topPicks} cta="See मोर" ctaLink="/collections/top-picks" carousel /> */}
<SectionBlock
  eyebrow="Atelier Favourites"
  bilingual={
    <>
      Top <span className="gold-text-gradient">पिक्स</span>
    </>
  }
  subtitle="Our most-loved selections."
  products={topPicks}
  cta="See More"
  ctaLink="/collections/top-picks"
  carousel
/>
      {/* UNISEX */}
      {/* <section className="relative overflow-hidden border-b border-gold-400/10 bg-burgundy-950 py-24">
        <div className="bg-mandana absolute inset-0 opacity-40" />
        <SectionReveal className="container-editorial relative text-center">
          <p className="section-eyebrow mb-4">For Everyone</p>
          <h2 className="font-display text-4xl leading-tight text-ivory-100 sm:text-5xl lg:text-6xl">
            For <span className="gold-text-gradient">Everyone.</span>
          </h2>
          <OrnamentalDivider className="mt-7" />
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-ivory-100/70">
            Bracelets and keychains designed to be worn by anyone, anywhere. No rules. Just vibes.
          </p>
        </SectionReveal>
        <div className="container-editorial relative mt-12">
          <ProductCarousel products={unisex} />
        </div>
        <div className="container-editorial relative mt-10 text-center">
          <Link to="/collections/unisex" className="btn-gold">
            Shop Unisex <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section> */}

      {/* TESTIMONIALS */}
      <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Customer Love</p>
            <h2 className="font-display text-3xl text-ivory-100 sm:text-5xl">
              Worn. Loved. <span className="gold-text-gradient">Repeated.</span>
            </h2>
          </SectionReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.08}>
                <div className="h-full border border-gold-400/15 bg-burgundy-950/50 p-6">
                  <div className="mb-3 flex gap-1 text-gold-400">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-gold-400" />
                    ))}
                  </div>
                  <p className="font-serif text-base italic leading-relaxed text-ivory-100/80">“{t.text}”</p>
                  <div className="mt-4">
                    <p className="text-sm text-gold-300">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-widest text-ivory-100/40">{t.role}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      {/* <section className="border-b border-gold-400/10 py-20">
        <div className="container-editorial">
          <SectionReveal className="mb-10 text-center">
            <p className="section-eyebrow mb-3">Follow the Vibe</p>
            <h2 className="font-display text-3xl text-ivory-100 sm:text-5xl">
              <span className="gold-text-gradient">Connect with us socially</span>
            </h2>
            <p className="mt-4 text-sm text-ivory-100/70">
              Follow <span className="font-semibold text-gold-300">@gemwale.comm</span> for exclusive designs, styling tips & gemstone stories
            </p>
            <a
              href="https://www.instagram.com/gemwale.comm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-400/10 px-4 py-2 text-xs uppercase tracking-widest text-gold-300 transition-all hover:bg-gold-400/20 hover:border-gold-400"
            >
              <Instagram className="h-3.5 w-3.5" /> Follow on Instagram
              <ExternalLink className="h-3 w-3" />
            </a>
          </SectionReveal>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {isLoadingInstagram ? (
              // Loading state
              [...Array(6)].map((_, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <div className="relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader className="h-6 w-6 animate-spin text-gold-300/50" />
                    </div>
                  </div>
                </SectionReveal>
              ))
            ) : instagramPosts.length > 0 ? (
              // Display real posts
              instagramPosts.map((post, i) => (
                <SectionReveal key={post.id} delay={i * 0.05}>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 transition-all hover:border-gold-400/50"
                  >
                    <img
                      src={post.media_url}
                      alt={post.caption || 'Instagram post'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-burgundy-950/0 transition-all group-hover:bg-burgundy-950/40">
                      <div className="flex flex-col items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        {post.media_type === 'VIDEO' && (
                          <svg className="h-8 w-8 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        )}
                        <Instagram className="h-6 w-6 text-gold-300" />
                      </div>
                    </div>
                  </a>
                </SectionReveal>
              ))
            ) : (
              // Fallback when no posts available
              [...Array(6)].map((_, i) => (
                <SectionReveal key={i} delay={i * 0.05}>
                  <a
                    href="https://www.instagram.com/gemwale.comm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 transition-all hover:border-gold-400/50"
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-burgundy-950/40 transition-all group-hover:bg-burgundy-950/60">
                      <div className="flex flex-col items-center gap-2">
                        <Instagram className="h-6 w-6 text-gold-300" />
                      </div>
                    </div>
                  </a>
                </SectionReveal>
              ))
            )}
          </div>
        </div>
      </section> */}

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-28 text-center">
        <div className="bg-jaali absolute inset-0 opacity-30" />
        <FloatingMotif className="left-12 top-8 h-24 w-24 opacity-15" delay={0}>
          <JaaliPattern className="h-full w-full" />
        </FloatingMotif>
        <FloatingMotif className="right-12 bottom-8 h-24 w-24 opacity-15" delay={1.5}>
          <PeacockCurve className="h-full w-full" />
        </FloatingMotif>
        <SectionReveal className="container-editorial relative">
          <h2 className="font-display text-4xl leading-tight text-ivory-100 sm:text-6xl lg:text-7xl">
            Found Your <span className="gold-text-gradient">Vibe?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-ivory-100/70">
            Find the piece that matches it.
          </p>
          <Link to="/shop" className="btn-gold-solid mt-8">
            Shop ऑल <ArrowRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </section>
    </div>
  );
}

function SectionBlock({
  eyebrow,
  bilingual,
  subtitle,
  products: items,
  cta,
  ctaLink,
  carousel,
  dark,
  }: {
    eyebrow: string;
  bilingual: React.ReactNode;
    subtitle: string;
    products: Product[];
    cta: string;
    ctaLink: string;
    carousel?: boolean;
    dark?: boolean;
  }) {
  return (
    <section className={`border-b border-gold-400/10 py-20 ${dark ? 'bg-burgundy-950' : ''}`}>
      <div className="container-editorial">
        <SectionReveal className="mb-10 text-center">
          <p className="section-eyebrow mb-3">{eyebrow}</p>
          <h2 className="section-title-bilingual">{bilingual}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ivory-100/60">{subtitle}</p>
        </SectionReveal>
        {carousel ? <ProductCarousel products={items} /> : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {items.slice(0, 4).map((p, i) => (
              <SectionReveal key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </SectionReveal>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link to={ctaLink} className="btn-gold">
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
