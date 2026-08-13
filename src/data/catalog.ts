import type { Category, Collection, Product } from '@/types';

const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
import demoImage from '../images/demo.jpg';

const categoryCoverImage = demoImage;

export const categories: Category[] = [
  { id: 'cat-necklaces', name: 'Necklaces', slug: 'necklaces', description: 'Statement necklaces and delicate chains that carry the soul of gemstones.', image_url: categoryCoverImage, display_order: 1 },
  { id: 'cat-pendants', name: 'Pendants', slug: 'pendants', description: 'Solitary gemstones set to rest against your skin.', image_url: categoryCoverImage, display_order: 2 },
  { id: 'cat-bracelets', name: 'Bracelets', slug: 'bracelets', description: 'Wrist pieces made for everyday wear and every vibe.', image_url: categoryCoverImage, display_order: 3 },
  { id: 'cat-rings', name: 'Rings', slug: 'rings', description: 'Bold rings and stacking bands with a gemstone heart.', image_url: categoryCoverImage, display_order: 4 },
  { id: 'cat-malas', name: 'Malas', slug: 'malas', description: 'Hand-strung gemstone malas for intention and adornment.', image_url: categoryCoverImage, display_order: 5 },
  { id: 'cat-earrings', name: 'Earrings', slug: 'earrings', description: 'From subtle studs to sculptural drops.', image_url: categoryCoverImage, display_order: 6 },
  { id: 'cat-keychains', name: 'Keychains', slug: 'keychains', description: 'Gemstone keychains — small pieces, big energy.', image_url: categoryCoverImage, display_order: 7 },
];

export const collections: Collection[] = [
  // { id: 'col-new-arrivals', name: 'New Arrivals', slug: 'new-arrivals', tagline: 'New अराइवल्स', description: 'Fresh pieces. New vibes. The latest additions to the GemWale atelier.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 1 },
  { id: 'col-best-sellers', name: 'Best Sellers', slug: 'best-sellers', tagline: 'Best सेलर्स', description: 'The pieces our community keeps coming back for.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 2 },
  { id: 'col-trending', name: 'Trending Now', slug: 'trending', tagline: 'Trending नाउ', description: 'What the world is wearing right now.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 3 },
  // { id: 'col-  featured-edit', name: 'Featured Edit', slug: 'featured-edit', tagline: 'Featured एडिट', description: 'The GemWale Edit — pieces that match every version of you.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 4 },
  { id: 'col-latest-drops', name: 'Latest Drops', slug: 'latest-drops', tagline: 'Latest ड्रॉप्स', description: 'Just dropped. Limited quantities.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 5 },
  { id: 'col-fresh-styles', name: 'Fresh Styles', slug: 'fresh-styles', tagline: 'Fresh स्टाइल्स', description: 'Your style. Your vibe. Your GemWale.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 6 },
  // { id: 'col-signature-pieces', name: 'Signature Pieces', slug: 'signature-pieces', tagline: 'Signature पीसेस', description: 'The hero pieces that define the house.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 7 },
  { id: 'col-limited-edition', name: 'Limited Edition', slug: 'limited-edition', tagline: 'Limited एडिशन', description: 'Exclusive, numbered, and never repeated.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 8 },
  { id: 'col-top-picks', name: 'Top Picks', slug: 'top-picks', tagline: 'Top पिक्स', description: 'Our atelier’s most-loved selections.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 9 },
  // { id: 'col-unisex', name: 'Unisex Collection', slug: 'unisex', tagline: 'For Everyone', description: 'Bracelets and keychains designed for everyone.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 10 },
];

const P = (
  name: string,
  code: string,
  price: number,
  categorySlug: string,
  flags: Partial<Product>,
  colours: string[],
  images: string[],
): Product => {
  const cat = categories.find((c) => c.slug === categorySlug);
  return {
    id: `prod-${code.toLowerCase()}`,
    name,
    slug: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${code.toLowerCase()}`,
    product_code: code,
    price,
    category_id: cat?.id ?? null,
    collection_id: null,
    colour: colours[0],
    colours,
    images,
    description:
      flags.description ||
      'A premium gemstone piece from the GemWale atelier, crafted to move with you from café mornings to celebration evenings.',
    details:
      flags.details ||
      'Hand-finished setting with ethically sourced gemstones. Anti-tarnish finish. Hypoallergenic.',
    care_instructions:
      'Store in the GemWale pouch provided. Avoid contact with water, perfume, and chemicals. Clean with a soft dry cloth.',
    stock: flags.stock ?? 12,
    availability: flags.availability ?? 'In Stock',
    is_featured: flags.is_featured ?? false,
    is_bestseller: flags.is_bestseller ?? false,
    is_trending: flags.is_trending ?? false,
    is_new_arrival: flags.is_new_arrival ?? false,
    is_limited_edition: flags.is_limited_edition ?? false,
    is_unisex: flags.is_unisex ?? false,
    display_order: flags.display_order ?? 0,
    created_at: new Date().toISOString(),
  };
};

const I = (...ids: string[]) => ids.map(img);

export const products: Product[] = [
  // Necklaces
  P('Mehr Strand Necklace', 'GW-N001', 4200, 'necklaces', { is_featured: true, is_bestseller: true, is_new_arrival: true, is_trending: true }, ['Antique Gold', 'Burgundy', 'Ivory'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Jharokha Choker', 'GW-N002', 5600, 'necklaces', { is_featured: true, is_limited_edition: true }, ['Emerald', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Saavan Layered Necklace', 'GW-N003', 3800, 'necklaces', { is_new_arrival: true, is_trending: true }, ['Pearl', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Roohani Pendant Necklace', 'GW-N004', 3400, 'necklaces', { is_bestseller: true }, ['Amethyst', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Pendants
  P('Surya Solitaire Pendant', 'GW-P001', 2400, 'pendants', { is_featured: true, is_bestseller: true, is_new_arrival: true }, ['Citrine', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Chand Drop Pendant', 'GW-P002', 2800, 'pendants', { is_trending: true, is_limited_edition: true }, ['Moonstone', 'Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Mor Pendant', 'GW-P003', 3200, 'pendants', { is_featured: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Aab Pendant', 'GW-P004', 2200, 'pendants', { is_new_arrival: true }, ['Aquamarine', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Bracelets
  P('Jaali Cuff Bracelet', 'GW-B001', 2600, 'bracelets', { is_featured: true, is_bestseller: true, is_unisex: true }, ['Antique Gold', 'Oxidised Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Vibe Beaded Bracelet', 'GW-B002', 1800, 'bracelets', { is_new_arrival: true, is_trending: true, is_unisex: true }, ['Turquoise', 'Onyx', 'Carnelian'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Kundan Stack Bracelet', 'GW-B003', 2400, 'bracelets', { is_bestseller: true }, ['Ruby Red', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Rajwada Kada', 'GW-B004', 4200, 'bracelets', { is_limited_edition: true, is_unisex: true }, ['Antique Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Rings
  P('Padmini Cocktail Ring', 'GW-R001', 2200, 'rings', { is_featured: true, is_bestseller: true, is_trending: true }, ['Emerald', 'Ruby Red', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Saanj Stacking Ring', 'GW-R002', 1400, 'rings', { is_new_arrival: true }, ['Gold', 'Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Heer Signet Ring', 'GW-R003', 2800, 'rings', { is_limited_edition: true }, ['Onyx', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Morpankh Ring', 'GW-R004', 2600, 'rings', { is_featured: true, is_unisex: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Malas
  P('Sattva Mala', 'GW-M001', 3600, 'malas', { is_featured: true, is_bestseller: true }, ['Tulsi Wood', 'Gemstone'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Sukha Mala', 'GW-M002', 3200, 'malas', { is_new_arrival: true, is_trending: true }, ['Sandalwood', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Ras Mala', 'GW-M003', 3800, 'malas', { is_limited_edition: true }, ['Amethyst', 'Quartz'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Earrings
  P('Jhumka Drop Earrings', 'GW-E001', 2400, 'earrings', { is_featured: true, is_bestseller: true, is_new_arrival: true }, ['Antique Gold', 'Ruby Red'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Chandbali Earrings', 'GW-E002', 3200, 'earrings', { is_trending: true, is_limited_edition: true }, ['Pearl', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Stud Vibe Earrings', 'GW-E003', 1200, 'earrings', { is_new_arrival: true }, ['Turquoise', 'Onyx', 'Citrine'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Mor Stud Earrings', 'GW-E004', 1800, 'earrings', { is_bestseller: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // Keychains
  P('GemVibe Keychain', 'GW-K001', 900, 'keychains', { is_featured: true, is_new_arrival: true, is_unisex: true }, ['Turquoise', 'Onyx', 'Carnelian', 'Amethyst'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Rajwada Keychain', 'GW-K002', 1100, 'keychains', { is_bestseller: true, is_unisex: true }, ['Antique Gold', 'Ruby Red'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Mini Mala Keychain', 'GW-K003', 800, 'keychains', { is_trending: true, is_unisex: true }, ['Sandalwood', 'Gemstone'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  P('Limited Edition Keychain', 'GW-K004', 1400, 'keychains', { is_limited_edition: true, is_unisex: true }, ['Emerald', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);
export const getProductsByCategory = (catId: string) => products.filter((p) => p.category_id === catId);
