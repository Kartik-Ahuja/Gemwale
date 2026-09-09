import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, ExternalLink, Loader } from 'lucide-react';
import { OrnamentalDivider } from './Ornaments';
import { useEffect, useState } from 'react';
import { getInstagramPosts, type InstagramPost } from '@/lib/instagram';

const shopLinks = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Necklaces', to: '/category/necklaces' },
  { label: 'Pendants', to: '/category/pendants' },
  { label: 'Bracelets', to: '/category/bracelets' },
  // { label: 'Rings', to: '/category/rings' },
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
  // { label: 'Order Details', to: '/order-details' },
];

export function Footer() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(true);

  useEffect(() => {
    // Load Instagram embed script for embedded feed
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    // Fetch Instagram posts
    (async () => {
      setIsLoadingInstagram(true);
      const posts = await getInstagramPosts(5);
      setInstagramPosts(posts);
      setIsLoadingInstagram(false);
    })();
  }, []);

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
            {/* <li><Link to="/collections/new-arrivals" className="text-sm text-ivory-100/70 hover:text-gold-300">New Arrivals</Link></li> */}
            <li><Link to="/collections/best-sellers" className="text-sm text-ivory-100/70 hover:text-gold-300">Best Sellers</Link></li>
            <li><Link to="/collections/trending" className="text-sm text-ivory-100/70 hover:text-gold-300">Trending Now</Link></li>
            <li><Link to="/collections/limited-edition" className="text-sm text-ivory-100/70 hover:text-gold-300">Limited Edition</Link></li>
            {/* <li><Link to="/collections/unisex" className="text-sm text-ivory-100/70 hover:text-gold-300">Unisex Collection</Link></li> */}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold-400">Connect</h4>
          <div className="space-y-3 text-sm text-ivory-100/70">
            <a href="https://wa.me/919588897473" className="flex items-center gap-2 hover:text-gold-300">
              <Phone className="h-4 w-4 text-gold-400" /> +91 95888 97473
            </a>
            <a href="mailto:info@gemwale.com" className="flex items-center gap-2 hover:text-gold-300">
              <Mail className="h-4 w-4 text-gold-400" />  info@gemwale.com
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" /> Jaipur, Rajasthan, India
            </p>
            <a href="https://www.instagram.com/gemwale.comm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold-300">
              <Instagram className="h-4 w-4 text-gold-400" /> @gemwale.comm
            </a>
          </div>
        </div>
      </div>

      {/* Connect with us socially - Instagram Feed */}
      {/* <div className="relative border-t border-gold-400/10 py-14">
        <div className="container-editorial">
          <h2 className="mb-2 text-center font-display text-2xl text-ivory-100">Connect with us socially</h2>
          <OrnamentalDivider className="mb-10 justify-center" />
          
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <p className="text-center text-sm text-ivory-100/70">
              Follow <span className="font-semibold text-gold-300">@gemwale.comm</span> for exclusive designs, styling tips & gemstone stories
            </p>
            <a 
              href="https://www.instagram.com/gemwale.comm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/50 bg-gold-400/10 px-6 py-2 text-sm uppercase tracking-widest text-gold-300 transition-all hover:bg-gold-400/20 hover:border-gold-400"
            >
              <Instagram className="h-4 w-4" /> Follow on Instagram
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {isLoadingInstagram ? (
              // Loading state
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 animate-pulse"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="h-8 w-8 animate-spin text-gold-300/50" />
                  </div>
                </div>
              ))
            ) : instagramPosts.length > 0 ? (
              // Display real posts
              instagramPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 transition-all hover:border-gold-400/50"
                >
                  <img
                    src={post.media_url}
                    alt={post.caption || 'Instagram post'}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-burgundy-900/0 backdrop-blur-sm transition-all group-hover:bg-burgundy-900/40">
                    <div className="flex flex-col items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      {post.media_type === 'VIDEO' && (
                        <svg className="h-12 w-12 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      )}
                      {post.media_type === 'CAROUSEL_ALBUM' && (
                        <svg className="h-12 w-12 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4.5-4.5 3 3 4-4 2.5 2.5V5H4v10z" />
                        </svg>
                      )}
                      <Instagram className="h-8 w-8 text-gold-300" />
                    </div>
                  </div>

                  <div className="absolute right-2 top-2 rounded-full bg-gold-400/20 p-1.5 text-gold-300 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-3 w-3" />
                  </div>

                  {post.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-burgundy-900/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="line-clamp-2 text-xs text-ivory-100">
                        {post.caption}
                      </p>
                    </div>
                  )}
                </a>
              ))
            ) : (
              // Fallback when no posts available
              [...Array(5)].map((_, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/gemwale.comm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-square overflow-hidden border border-gold-400/20 bg-burgundy-800 transition-all hover:border-gold-400/50"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-burgundy-900/40 backdrop-blur-sm transition-all group-hover:bg-burgundy-900/60">
                    <div className="flex flex-col items-center gap-2">
                      <Instagram className="h-8 w-8 text-gold-300" />
                      <span className="text-xs uppercase tracking-widest text-gold-300">
                        Post {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-2 top-2 rounded-full bg-gold-400/20 p-1.5 text-gold-300 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              ))
            )}
          </div>

          <p className="mt-8 text-center text-xs text-ivory-100/50">
            Posts, videos and stories are updated automatically from Instagram
          </p>
        </div>
      </div> */}

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
