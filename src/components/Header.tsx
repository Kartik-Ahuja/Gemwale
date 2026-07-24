import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const collectionLinks = [
  { label: 'New Arrivals', to: '/collections/new-arrivals' },
  { label: 'Best Sellers', to: '/collections/best-sellers' },
  { label: 'Trending Now', to: '/collections/trending' },
  { label: 'Featured Edit', to: '/collections/featured-edit' },
  { label: 'Latest Drops', to: '/collections/latest-drops' },
  { label: 'Fresh Styles', to: '/collections/fresh-styles' },
  { label: 'Signature Pieces', to: '/collections/signature-pieces' },
  { label: 'Limited Edition', to: '/collections/limited-edition' },
  { label: 'Top Picks', to: '/collections/top-picks' },
  { label: 'Unisex Collection', to: '/collections/unisex' },
];

const categoryLinks = [
  { label: 'Necklaces', to: '/category/necklaces' },
  { label: 'Pendants', to: '/category/pendants' },
  { label: 'Bracelets', to: '/category/bracelets' },
  { label: 'Rings', to: '/category/rings' },
  { label: 'Malas', to: '/category/malas' },
  { label: 'Earrings', to: '/category/earrings' },
  { label: 'Keychains', to: '/category/keychains' },
];

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const { cartCount, wishlist, setCartOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [location.pathname]);

  const transparent = isHome && !scrolled;
  const solidBg = 'bg-burgundy-900/95 backdrop-blur-md border-b border-gold-400/15';
  const transparentBg = 'bg-transparent';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          transparent ? transparentBg : solidBg
        }`}
      >
        <div className="container-editorial flex h-16 items-center justify-between lg:h-20">
          {/* Left: logo */}
          <Link to="/" className="font-display text-2xl tracking-wide text-ivory-100 lg:text-3xl">
            Gem<span className="gold-text-gradient">Wale</span>
          </Link>

          {/* Center: nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  if (link.label === 'Shop') setMegaOpen('shop');
                  else if (link.label === 'Collections') setMegaOpen('collections');
                }}
                onMouseLeave={() => setMegaOpen(null)}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-gold-300' : 'text-ivory-100/80 hover:text-gold-300'
                    }`
                  }
                >
                  {link.label}
                </NavLink>

                <AnimatePresence>
                  {megaOpen === 'shop' && link.label === 'Shop' && (
                    <MegaMenu links={categoryLinks} title="Shop by Category" />
                  )}
                  {megaOpen === 'collections' && link.label === 'Collections' && (
                    <MegaMenu links={collectionLinks} title="Collections" />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-4 lg:gap-5">
            <Link to="/shop" aria-label="Search" className="text-ivory-100/80 transition-colors hover:text-gold-300">
              <Search className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative text-ivory-100/80 transition-colors hover:text-gold-300">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && <Badge count={wishlist.length} />}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
              className="relative text-ivory-100/80 transition-colors hover:text-gold-300"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && <Badge count={cartCount} />}
            </button>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hidden text-ivory-100/80 transition-colors hover:text-gold-300 sm:block"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
              className="text-ivory-100/90 transition-colors hover:text-gold-300 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-burgundy-950/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm overflow-y-auto bg-burgundy-900 lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-gold-400/15 px-5 py-4">
                <span className="font-display text-2xl">
                  Gem<span className="gold-text-gradient">Wale</span>
                </span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-ivory-100/80 hover:text-gold-300">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-5 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `block border-b border-ivory-100/10 py-3.5 text-sm uppercase tracking-widest transition-colors ${
                        isActive ? 'text-gold-300' : 'text-ivory-100/85 hover:text-gold-300'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                <p className="mt-6 mb-2 text-[10px] uppercase tracking-[0.3em] text-gold-400">Categories</p>
                {categoryLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block py-2.5 text-sm text-ivory-100/70 hover:text-gold-300">
                    {l.label}
                  </Link>
                ))}

                <p className="mt-5 mb-2 text-[10px] uppercase tracking-[0.3em] text-gold-400">Collections</p>
                {collectionLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block py-2.5 text-sm text-ivory-100/70 hover:text-gold-300">
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold-400 px-1 text-[10px] font-semibold text-burgundy-900">
      {count}
    </span>
  );
}

function MegaMenu({ links, title }: { links: { label: string; to: string }[]; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 border border-gold-400/20 bg-burgundy-900/98 p-5 backdrop-blur-md"
    >
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-400">{title}</p>
      <div className="grid grid-cols-1 gap-1">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="py-1.5 text-sm text-ivory-100/75 transition-colors hover:text-gold-300"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
