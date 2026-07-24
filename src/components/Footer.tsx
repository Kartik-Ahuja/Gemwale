import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { OrnamentalDivider } from './Ornaments';

const shopLinks = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Necklaces', to: '/category/necklaces' },
  { label: 'Pendants', to: '/category/pendants' },
  { label: 'Bracelets', to: '/category/bracelets' },
  { label: 'Rings', to: '/category/rings' },
  { label: 'Malas', to: '/category/malas' },
  { label: 'Earrings', to: '/category/earrings' },
  { label: 'Keychains', to: '/category/keychains' },
];

const helpLinks = [
  { label: 'About GemWale', to: '/about' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Order Details', to: '/order-details' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold-400/15 bg-burgundy-950">
      <div className="bg-jaali absolute inset-0 opacity-30" />

      {/* Brand line */}
      <div className="container-editorial relative border-b border-gold-400/10 py-14 text-center">
        <p className="font-display text-3xl text-ivory-100 sm:text-4xl">
          Gem<span className="gold-text-gradient">Wale</span>
        </p>
        <OrnamentalDivider className="mt-4" />
        <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-gold-300">
          Jewellery that matches your vibe.
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-ivory-100/50">
          Anywhere. Everywhere.
        </p>
      </div>

      {/* Columns */}
      <div className="container-editorial relative grid gap-10 py-14 md:grid-cols-4">
        <div>
          <h4 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold-400">Shop</h4>
          <ul className="space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ivory-100/70 transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold-400">Help & Info</h4>
          <ul className="space-y-2.5">
            {helpLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ivory-100/70 transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold-400">Collections</h4>
          <ul className="space-y-2.5">
            <li><Link to="/collections/new-arrivals" className="text-sm text-ivory-100/70 hover:text-gold-300">New Arrivals</Link></li>
            <li><Link to="/collections/best-sellers" className="text-sm text-ivory-100/70 hover:text-gold-300">Best Sellers</Link></li>
            <li><Link to="/collections/trending" className="text-sm text-ivory-100/70 hover:text-gold-300">Trending Now</Link></li>
            <li><Link to="/collections/limited-edition" className="text-sm text-ivory-100/70 hover:text-gold-300">Limited Edition</Link></li>
            <li><Link to="/collections/unisex" className="text-sm text-ivory-100/70 hover:text-gold-300">Unisex Collection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold-400">Connect</h4>
          <div className="space-y-3 text-sm text-ivory-100/70">
            <a href="https://wa.me/919999999999" className="flex items-center gap-2 hover:text-gold-300">
              <Phone className="h-4 w-4 text-gold-400" /> +91 99999 99999
            </a>
            <a href="mailto:hello@gemwale.com" className="flex items-center gap-2 hover:text-gold-300">
              <Mail className="h-4 w-4 text-gold-400" /> hello@gemwale.com
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" /> Jaipur, Rajasthan, India
            </p>
            <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:text-gold-300">
              <Instagram className="h-4 w-4 text-gold-400" /> @weargemwale
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-gold-400/10 py-6">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 text-center text-[11px] uppercase tracking-widest text-ivory-100/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} GemWale. All rights reserved.</p>
          <p>No age limit. No style limit. No occasion limit.</p>
          <Link to="/admin" className="hover:text-gold-300">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
