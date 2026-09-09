import type { Category, Collection, Product } from '@/types';

  const img = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
  import demoImage from '../images/demo.jpg';
  import NecklaceCover from '../images/Category/Necklaces.webp';
  import PendantsCover from '../images/Category/Pendants.webp';
  import BraceletsCover from '../images/Category/Bracelets.webp';
  import Earringscover from '../images/Category/Earrings.webp';
  import KeychainsCover from '../images/Category/Keychains.webp';
  import MalasCover from '../images/Category/Malas.webp';


  //product images 

  import SereneCrystalPointNecklace from '../images/ProductImages/Serene Crystal Point Necklace.webp';
  import TripleDripJadeNecklace from '../images/ProductImages/Triple Drip Jade Necklace.webp';
  import DoubleDripJadeNecklace from '../images/ProductImages/Double Drip Jade Necklace.webp';
  import DoublePlainAgateDriftNecklace from '../images/ProductImages/Double Plain Agate Drift Necklace.webp';
  import MysticAuraNecklace from '../images/ProductImages/Mystic Aura Necklace.webp';
  import ConfettiAgateNecklace from '../images/ProductImages/Confetti Agate Necklace.webp';
  import RiverstoneAgateNecklace from '../images/ProductImages/Riverstone Agate Necklace.webp';
  import BlushRoseQuartzNecklace from '../images/ProductImages/Blush Rose Quartz Necklace.webp';
  import PrismAventurineNecklace from '../images/ProductImages/Prism Aventurine Necklace.webp';
  import HeartCarnelianNecklace from '../images/ProductImages/Heart Carnelian Necklace.webp';
  import DropletCarnelianNecklace from '../images/ProductImages/Droplet Carnelian Necklace.webp';
  import LustrousMotherOfPearlSquareNecklace from '../images/ProductImages/Lustrous Mother of Pearl Square Necklace.webp';
  import CrimsonCascadeJadeNecklace from '../images/ProductImages/Crimson Cascade Jade Necklace.webp';
  import MysticAmethystNecklace from '../images/ProductImages/Mystic Amethyst Necklace.webp';
  import RoseQuartzClusterStatementNecklace from '../images/ProductImages/Rose Quartz Cluster Statement Necklace.webp';
  import RawOceanAgateSlicesNecklace from '../images/ProductImages/Raw Ocean Agate Slices Necklace.webp';
  import TigersEyeBandedAgateBeadNecklace from '../images/ProductImages/Tiger\'s Eye & Banded Agate Bead Necklace.webp';
  import WarmCarnelianSingleStrandNecklace from '../images/ProductImages/Warm Carnelian Single-Strand Necklace.webp';
  import DeepGarnetMultiStrandNecklace from '../images/ProductImages/Deep Garnet Multi-Strand Necklace.webp';
  import BohoTurquoiseDropNecklace from '../images/ProductImages/Boho Turquoise Drop Necklace.webp';
  import AmberHoneyDonutRingNecklace from '../images/ProductImages/Amber Honey Donut Ring Necklace.webp';
  import BlushStrawberryQuartzBeadBracelet from '../images/ProductImages/Blush Strawberry Quartz Bead Bracelet.webp';
  import CobaltBluePatteredBeadChoker from '../images/ProductImages/Cobalt Blue Patterned Bead Choker.webp';
  import EarthtonAgateTubeChoker from '../images/ProductImages/Earthtone Agate Tube Choker.webp';
  import MilkyYellowJadeBracelet from '../images/ProductImages/Milky Yellow Jade Bracelet.webp';
  import MultiGemstoneBeadedBracelet from '../images/ProductImages/Multi-Gemstone Beaded Bracelet.webp';
  import RawRoseQuartzNuggetBracelet from '../images/ProductImages/Raw Rose Quartz Nugget Bracelet.webp';
  import SkyBlueTurquoiseCrossNecklace from '../images/ProductImages/Sky Blue Turquoise Cross Necklace.webp';
  import SunsetCrackedAgateOvalBeadBracelet from '../images/ProductImages/Sunset Cracked Agate Oval Bead Bracelet.webp';
  import TealBrownVeinedAgateBracelet from '../images/ProductImages/Teal & Brown Veined Agate Bracelet.webp';
  import SunsetKorianQuartzNecklace from '../images/ProductImages/Sunset Korian Quartz Necklace.webp';
  
  // Additional image versions
  import TripleDripJadeNecklace2 from '../images/ProductImages/Triple Drip Jade Necklace 2.webp';
  import DoublePlainAgateDriftNecklace2 from '../images/ProductImages/Double Plain Agate Drift Necklace 2.webp';
  import ConfettiAgateNecklace2 from '../images/ProductImages/Confetti Agate Necklace 2.webp';
  import RiverstoneAgateNecklace2 from '../images/ProductImages/Riverstone Agate Necklace 2.webp';
  import BlushRoseQuartzNecklace2 from '../images/ProductImages/Blush Rose Quartz Necklace 2.webp';
  import PrismAventurineNecklace2 from '../images/ProductImages/Prism Aventurine Necklace 2.webp';
  import HeartCarnelianNecklace2 from '../images/ProductImages/Heart Carnelian Necklace 2.webp';
  import DropletCarnelianNecklace2 from '../images/ProductImages/Droplet Carnelian Necklace 2.webp';
  import LustrousMotherOfPearlSquareNecklace2 from '../images/ProductImages/Lustrous Mother of Pearl Square Necklace 2.webp';
  import MysticAuraNecklace2 from '../images/ProductImages/Mystic Aura Necklace 2.webp';
  import MysticAmethystNecklace2 from '../images/ProductImages/Mystic Amethyst Necklace 2.webp';
  import RoseQuartzClusterStatementNecklace2 from '../images/ProductImages/Rose Quartz Cluster Statement Necklace 2.webp';
  
  import SereneCrystalPointNecklace1 from '../images/ProductImages/Serene Crystal Point Necklace 1.webp';
  import SereneCrystalPointNecklace2 from '../images/ProductImages/Serene Crystal Point Necklace 2.webp';
  import SereneCrystalPointNecklace3 from '../images/ProductImages/Serene Crystal Point Necklace 3.webp';
  import SereneCrystalPointNecklace4 from '../images/ProductImages/Serene Crystal Point Necklace 4.webp';
  
  import ClearQuartzArrowheadPendant from '../images/ProductImages/Clear Quartz Arrowhead Pendant.webp';
  import BlueChalgeonyCrystalApplePendant from '../images/ProductImages/Blue Chalcedony Apple Pendant.webp';
  import BlueChalGeonyCrystalApplePendant2 from '../images/ProductImages/Blue Chalcedony Apple Pendant 2.webp';
  import BlueChalGeonyCrystalApplePendant3 from '../images/ProductImages/Blue Chalcedony Apple Pendant 3.webp';
  
  import CelestialStarCrystalPendants from '../images/ProductImages/Celestial Star Crystal Pendants.webp';
  import CelestialStarCrystalPendants2 from '../images/ProductImages/Celestial Star Crystal Pendants 2.webp';
  import CelestialStarCrystalPendants3 from '../images/ProductImages/Celestial Star Crystal Pendants 3.webp';
  import CelestialStarCrystalPendants4 from '../images/ProductImages/Celestial Star Crystal Pendants 4.webp';
  
  import OvalPendantNecklace from '../images/ProductImages/Oval Pendant Necklace.webp';
  import OvalPendantNecklace2 from '../images/ProductImages/Oval Pendant Necklace 2.webp';
  import OvalPendantNecklace3 from '../images/ProductImages/Oval Pendant Necklace 3.webp';
  import OvalPendantNecklace4 from '../images/ProductImages/Oval Pendant Necklace 4.webp';
  import OvalPendantNecklace5 from '../images/ProductImages/Oval Pendant Necklace 5.webp';
  
  import SkyBlueTurquoiseCrossNecklace2 from '../images/ProductImages/Sky Blue Turquoise Cross Necklace 2.webp';
  import SunsetKorianQuartzNecklace2 from '../images/ProductImages/Sunset Korian Quartz Necklace 2.webp';
  import SunsetKorianQuartzNecklace3 from '../images/ProductImages/Sunset Korian Quartz Necklace 3.webp';
  import SunsetKorianQuartzNecklace4 from '../images/ProductImages/Sunset Korian Quartz Necklace 4.webp';
  import SunsetKorianQuartzNecklace5 from '../images/ProductImages/Sunset Korian Quartz Necklace 5.webp';
  
  import AmberHoneyDonutRingNecklace2 from '../images/ProductImages/Amber Honey Donut Ring Necklace 2.webp';
  import CobaltBluePatteredBeadChoker2 from '../images/ProductImages/Cobalt Blue Patterned Bead Choker 2.webp';



const categoryCoverImage = demoImage;

export const categories: Category[] = [
  { id: 'cat-necklaces', name: 'Necklaces', slug: 'necklaces', description: 'Statement necklaces and delicate chains that carry the soul of gemstones.', image_url: NecklaceCover, display_order: 1 },
  { id: 'cat-pendants', name: 'Pendants', slug: 'pendants', description: 'Solitary gemstones set to rest against your skin.', image_url: PendantsCover, display_order: 2 },
  { id: 'cat-bracelets', name: 'Bracelets', slug: 'bracelets', description: 'Wrist pieces made for everyday wear and every vibe.', image_url: BraceletsCover, display_order: 3 },
  // { id: 'cat-rings', name: 'Rings', slug: 'rings', description: 'Bold rings and stacking bands with a gemstone heart.', image_url: categoryCoverImage, display_order: 4 },
  { id: 'cat-malas', name: 'Malas', slug: 'malas', description: 'Hand-strung gemstone malas for intention and adornment.', image_url: MalasCover  , display_order: 5 },
  { id: 'cat-earrings', name: 'Earrings', slug: 'earrings', description: 'From subtle studs to sculptural drops.', image_url: Earringscover, display_order: 6 },
  { id: 'cat-keychains', name: 'Keychains', slug: 'keychains', description: 'Gemstone keychains — small pieces, big energy.', image_url: KeychainsCover, display_order: 7 },
];

export const collections: Collection[] = [
  // { id: 'col-new-arrivals', name: 'New Arrivals', slug: 'new-arrivals', tagline: 'New अराइवल्स', description: 'Fresh pieces. New vibes. The latest additions to the GemWale atelier.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 1 },
  { id: 'col-best-sellers', name: 'Best Sellers', slug: 'best-sellers', tagline: 'Best सेलर्स', description: 'The pieces our community keeps coming back for.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 2 },
  { id: 'col-trending', name: 'Trending Now', slug: 'trending', tagline: 'Trending नाउ', description: 'What the world is wearing right now.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 3 },
  // { id: 'col-  featured-edit', name: 'Featured Edit', slug: 'featured-edit', tagline: 'Featured एडिट', description: 'The GemWale Edit — pieces that match every version of you.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 4 },
  { id: 'col-latest-drops', name: 'Latest Drops', slug: 'latest-drops', tagline: 'Latest ड्रॉप्स', description: 'Just dropped. Limited quantities.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 5 },
  // { id: 'col-fresh-styles', name: 'Fresh Styles', slug: 'fresh-styles', tagline: 'Fresh स्टाइल्स', description: 'Your style. Your vibe. Your GemWale.', image_url: img('1454113009175-9a4b1c3de9a4'), display_order: 6 },
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

  P(
    'Triple Drip Jade Necklace',
    'GW-N001',
    1799,
    'necklaces',
    {
      description: 'A striking three-layer green beaded necklace with a rich, flowing silhouette that adds effortless depth to ethnic and western looks.',
      is_featured: true,
      is_bestseller: true,
      is_limited_edition: true,
    },
    ['Green'],
    [TripleDripJadeNecklace, TripleDripJadeNecklace2]
  ),

  P(
    'Double Drip Jade Necklace',
    'GW-N002',
    1199,
    'necklaces',
    {
      description: 'An elegant double-layer green beaded necklace with a polished finish, designed for festive occasions, office wear and everyday styling.',
      is_featured: true,
      is_bestseller: true,
    },
    ['Green'],
    [DoubleDripJadeNecklace]
  ),

  P(
    'Double Plain Agate Drift Necklace',
    'GW-N003',
    599,
    'necklaces',
    {
      description: 'A graceful double-layer pink agate beaded necklace with a soft polished finish that transitions easily from everyday styling to festive looks.',
      is_bestseller: true,
    },
    ['Pink'],
    [DoublePlainAgateDriftNecklace, DoublePlainAgateDriftNecklace2]
  ),

 




  P(
    'Mystic Aura Necklace',
    'GW-N007',
    649,
    'necklaces',
    {
      description: 'Luminous iridescent beads create a soft, light-catching glow in this versatile necklace made for effortless everyday and occasion styling.',
      is_featured: true,
      is_bestseller: true,
      is_trending: true,
    },
    ['Pink', 'Iridescent'],
    [MysticAuraNecklace, MysticAuraNecklace2]
  ),

  P(
    'Confetti Agate Necklace',
    'GW-N008',
    899,
    'necklaces',
    {
      description: 'A playful necklace featuring colourful marbled agate-style beads, bringing vibrant texture and personality to both casual and festive looks.',
      is_new_arrival: true,
      is_trending: true,
    },
    ['Colourful'],
    [ConfettiAgateNecklace, ConfettiAgateNecklace2]
  ),

  P(
    'Riverstone Agate Necklace',
    'GW-N009',
    649,
    'necklaces',
    {
      description: 'Smooth organic-shaped pink agate-style beads give this necklace an earthy, polished character that works effortlessly from daywear to festive styling.',
      is_featured: true,
    },
    ['Pink'],
    [RiverstoneAgateNecklace, RiverstoneAgateNecklace2]
  ),

  P(
    'Blush Rose Quartz Necklace',
    'GW-N010',
    799,
    'necklaces',
    {
      description: 'Soft blush-pink polished beads give this necklace a delicate and refined finish that complements both traditional and contemporary outfits.',
      is_featured: true,
      is_bestseller: true,
    },
    ['Pink'],
    [BlushRoseQuartzNecklace, BlushRoseQuartzNecklace2]
  ),

  P(
    'Prism Aventurine Necklace',
    'GW-N011',
    799,
    'necklaces',
    {
      description: 'Vibrant green faceted beads create a polished, light-catching necklace with an elegant statement feel for everyday and occasion wear.',
      is_featured: true,
      is_trending: true,
    },
    ['Green'],
    [PrismAventurineNecklace, PrismAventurineNecklace2]
  ),

  P(
    'Heart Carnelian Necklace',
    'GW-N012',
    599,
    'necklaces',
    {
      description: 'A bold red beaded necklace finished with a charming heart centerpiece, combining playful character with an easy statement silhouette.',
      is_bestseller: true,
      is_trending: true,
    },
    ['Red'],
    [HeartCarnelianNecklace, HeartCarnelianNecklace2]
  ),



  P(
    'Droplet Carnelian Necklace',
    'GW-N018',
    599,
    'necklaces',
    {
      description: 'Warm red beads paired with a faceted teardrop centerpiece give this necklace a distinctive yet wearable statement character.',
      is_new_arrival: true,
    },
    ['Red'],
    [DropletCarnelianNecklace, DropletCarnelianNecklace2]
  ),

  P(
    'Lustrous Mother of Pearl Square Necklace',
    'GW-N019',
    799,
    'necklaces',
    {
      description: 'Geometric square beads with a luminous pearlescent finish create an elegant necklace with a clean and sophisticated contemporary feel.',
      is_featured: true,
      is_limited_edition: true,
    },
    ['White', 'Pearl'],
    [LustrousMotherOfPearlSquareNecklace, LustrousMotherOfPearlSquareNecklace2]
  ),



  P(
    'Crimson Cascade Jade Necklace',
    'GW-N027',
    1499,
    'necklaces',
    {
      description: 'Rich crimson faceted beads flow across multiple strands, creating a dramatic statement necklace with depth, texture and a luxurious finish.',
      is_featured: true,
      is_bestseller: true,
      is_limited_edition: true,
    },
    ['Crimson', 'Red'],
    [CrimsonCascadeJadeNecklace]
  ),

  P(
    'Oval Pendant Necklace',
    'GW-N028',
    799,
    'necklaces',
    {
      description: 'A patterned oval centerpiece surrounded by vibrant green beaded accents creates an earthy statement necklace with distinctive character.',
      is_featured: true,
    },
    ['Green'],
    [OvalPendantNecklace, OvalPendantNecklace2, OvalPendantNecklace3, OvalPendantNecklace4, OvalPendantNecklace5]
  ),

  P(
    'Mystic Amethyst Necklace',
    'GW-N030',
    799,
    'necklaces',
    {
      description: 'Polished violet beads create a refined single-strand necklace with rich colour and an effortless contemporary statement.',
      is_bestseller: true,
      is_trending: true,
    },
    ['Purple', 'Violet'],
    [MysticAmethystNecklace, MysticAmethystNecklace2]
  ),

  P(
  'Rose Quartz Cluster Statement Necklace',
  'GW-N031',
  1199,
  'necklaces',
  {
    description: 'A statement necklace featuring textured pink beaded clusters arranged along a soft pastel strand, creating a bold yet elegant silhouette for ethnic and contemporary styling.',
    is_featured: true,
    is_new_arrival: true,
  },
  ['Pink', 'Rose'],
  [RoseQuartzClusterStatementNecklace, RoseQuartzClusterStatementNecklace2]
),

P(
  'Raw Ocean Agate Slices Necklace',
  'GW-N032',
  1499,
  'necklaces',
  {
    description: 'A bold statement necklace featuring organically shaped turquoise and earth-toned agate-style slices, designed for effortless bohemian, resort and contemporary styling.',
    is_featured: true,
    is_limited_edition: true,
  },
  ['Turquoise', 'Earth Tone', 'Blue'],
  [RawOceanAgateSlicesNecklace]
),

P(
  "Tiger's Eye & Banded Agate Bead Necklace",
  'GW-N033',
  649,
  'necklaces',
  {
    description: 'A polished beaded necklace featuring warm honey brown, caramel and creamy tones that bring an earthy, sophisticated finish to everyday and smart-casual looks.',
    is_bestseller: true,
    is_trending: true,
  },
  ['Brown', 'Caramel', 'Cream'],
  [TigersEyeBandedAgateBeadNecklace]
),

P(
  'Warm Carnelian Single-Strand Necklace',
  'GW-N034',
  649,
  'necklaces',
  {
    description: 'A sleek single-strand necklace featuring warm terracotta-orange disc beads, designed to bring vibrant colour and a refined contemporary finish to everyday outfits.',
    is_new_arrival: true,
    is_trending: true,
  },
  ['Orange', 'Terracotta'],
  [WarmCarnelianSingleStrandNecklace]
),

P(
  'Deep Garnet Multi-Strand Necklace',
  'GW-N035',
  1499,
  'necklaces',
  {
    description: 'A rich multi-strand necklace featuring deep wine-red oval beads, creating a regal layered silhouette with an elegant statement finish for festive and occasion wear.',
    is_featured: true,
    is_bestseller: true,
    is_limited_edition: true,
  },
  ['Deep Red', 'Wine', 'Garnet'],
  [DeepGarnetMultiStrandNecklace]
),

  // Pendants

  P(
    'Serene Crystal Point Necklace',
    'GW-N020',
    199,
    'pendants',
    {
      description: 'A polished blue crystal-point pendant suspended from a simple cord, bringing a clean geometric edge to everyday styling.',
      is_bestseller: true,
    },
    ['Blue'],
    [SereneCrystalPointNecklace, SereneCrystalPointNecklace1, SereneCrystalPointNecklace2, SereneCrystalPointNecklace3, SereneCrystalPointNecklace4]
  ),

  P(
    'Boho Turquoise Drop Necklace',
    'GW-N021',
    199,
    'pendants',
    {
      description: 'A turquoise-style teardrop pendant with detailed silver-tone accents, designed for effortless bohemian and western styling.',
      is_featured: true,
      is_trending: true,
    },
    ['Turquoise', 'Blue'],
    [BohoTurquoiseDropNecklace]
  ),

  P(
    'Clear Quartz Arrowhead Pendant',
    'GW-N022',
    199,
    'pendants',
    {
      description: 'A sharp arrowhead-inspired crystal pendant with a minimal geometric form that adds an edgy finish to casual and streetwear looks.',
      is_bestseller: true,
      is_trending: true,
    },
    ['Clear', 'White'],
    [ClearQuartzArrowheadPendant]
  ),

  P(
    'Blue Chalcedony Apple Pendant',
    'GW-N023',
    199,
    'pendants',
    {
      description: 'A charming polished blue apple-shaped pendant with a playful silhouette, designed as an easy everyday accessory or gifting piece.',
      is_new_arrival: true,
      is_trending: true,
    },
    ['Blue'],
    [BlueChalgeonyCrystalApplePendant, BlueChalGeonyCrystalApplePendant2, BlueChalGeonyCrystalApplePendant3]
  ),

  // P(
  //   'Mystic Heart Crystal Pendants',
  //   'GW-N024',
  //   199,
  //   'pendants',
  //   {
  //     description: 'Smooth polished heart-shaped crystal pendants with a clean, playful form that works beautifully with cords and chains.',
  //     is_bestseller: true,
  //     is_new_arrival: true,
  //   },
  //   ['Multi'],
  //   []
  // ),

  P(
    'Celestial Star Crystal Pendants',
    'GW-N025',
    199,
    'pendants',
    {
      description: 'Polished star-shaped crystal pendants with a playful celestial silhouette, perfect for adding a distinctive accent to everyday looks.',
      is_featured: true,
      is_new_arrival: true,
      is_trending: true,
    },
    ['Multi'],
    [CelestialStarCrystalPendants, CelestialStarCrystalPendants2, CelestialStarCrystalPendants3, CelestialStarCrystalPendants4]
  ),

  // Additional Necklaces & Chokers
  P(
    'Amber Honey Donut Ring Necklace',
    'GW-N036',
    699,
    'necklaces',
    {
      description: 'A warm amber-toned beaded necklace with distinctive donut-shaped beads, bringing a playful geometric element to casual and bohemian styling.',
      is_new_arrival: true,
      is_trending: true,
    },
    ['Amber', 'Gold'],
    [AmberHoneyDonutRingNecklace, AmberHoneyDonutRingNecklace2]
  ),

  P(
    'Cobalt Blue Patterned Bead Choker',
    'GW-N037',
    749,
    'necklaces',
    {
      description: 'A vibrant cobalt-blue choker featuring patterned beads, designed as a bold statement piece for ethnic and contemporary styling.',
      is_featured: true,
      is_trending: true,
    },
    ['Blue', 'Cobalt'],
    [CobaltBluePatteredBeadChoker, CobaltBluePatteredBeadChoker2]
  ),

  P(
    'Earthtone Agate Tube Choker',
    'GW-N038',
    599,
    'necklaces',
    {
      description: 'A warm earthtone choker featuring smooth tube-shaped agate beads, bringing an organic and refined finish to everyday and festive looks.',
      is_new_arrival: true,
    },
    ['Beige', 'Brown', 'Tan'],
    [EarthtonAgateTubeChoker]
  ),

  P(
    'Sky Blue Turquoise Cross Necklace',
    'GW-N039',
    849,
    'necklaces',
    {
      description: 'A striking sky-blue turquoise necklace featuring a decorative cross centerpiece, designed for bohemian and spiritual styling.',
      is_featured: true,
      is_limited_edition: true,
    },
    ['Sky Blue', 'Turquoise'],
    [SkyBlueTurquoiseCrossNecklace, SkyBlueTurquoiseCrossNecklace2]
  ),

  P(
    'Sunset Korian Quartz Necklace',
    'GW-N026',
    549,
    'necklaces',
    {
      description: 'A vibrant sunset-toned necklace featuring luminous Korian quartz-style beads with an iridescent finish, designed to catch the light beautifully for everyday and occasion wear.',
      is_new_arrival: true,
      is_trending: true,
    },
    ['Orange', 'Pink', 'Sunset', 'Iridescent'],
    [SunsetKorianQuartzNecklace, SunsetKorianQuartzNecklace2, SunsetKorianQuartzNecklace3, SunsetKorianQuartzNecklace4, SunsetKorianQuartzNecklace5]
  ),

  // Bracelets
  P(
    'Blush Strawberry Quartz Bead Bracelet',
    'GW-B001',
    499,
    'bracelets',
    {
      description: 'A delicate blush-pink bracelet featuring polished strawberry quartz beads, designed as a versatile piece for everyday wear and layering.',
      is_new_arrival: true,
      is_trending: true,
    },
    ['Blush Pink', 'Rose'],
    [BlushStrawberryQuartzBeadBracelet]
  ),

  P(
    'Milky Yellow Jade Bracelet',
    'GW-B002',
    549,
    'bracelets',
    {
      description: 'A warm milky-yellow jade bracelet with smooth polished beads, bringing a soft luminous tone to wrist wear and stacking looks.',
      is_featured: true,
    },
    ['Yellow', 'Golden'],
    [MilkyYellowJadeBracelet]
  ),

  P(
    'Multi-Gemstone Beaded Bracelet',
    'GW-B003',
    599,
    'bracelets',
    {
      description: 'A vibrant multi-coloured bracelet featuring assorted gemstone beads, designed as a playful statement piece for everyday wear and self-expression.',
      is_featured: true,
      is_new_arrival: true,
      is_trending: true,
    },
    ['Multi', 'Colourful'],
    [MultiGemstoneBeadedBracelet]
  ),

  P(
    'Raw Rose Quartz Nugget Bracelet',
    'GW-B004',
    449,
    'bracelets',
    {
      description: 'A natural raw rose quartz bracelet featuring organic nugget-shaped stones, bringing an earthy and unpolished character to everyday styling.',
      is_new_arrival: true,
    },
    ['Pink', 'Rose'],
    [RawRoseQuartzNuggetBracelet]
  ),

  P(
    'Sunset Cracked Agate Oval Bead Bracelet',
    'GW-B005',
    499,
    'bracelets',
    {
      description: 'A warm sunset-toned bracelet featuring cracked agate oval beads, bringing organic texture and colour to wrist wear and layered looks.',
      is_trending: true,
    },
    ['Orange', 'Pink', 'Peach'],
    [SunsetCrackedAgateOvalBeadBracelet]
  ),

  P(
    'Teal & Brown Veined Agate Bracelet',
    'GW-B006',
    549,
    'bracelets',
    {
      description: 'An earthy bracelet featuring veined agate beads in teal and brown tones, combining natural patterns with a grounded colour palette for everyday wear.',
      is_featured: true,
    },
    ['Teal', 'Brown', 'Earth Tone'],
    [TealBrownVeinedAgateBracelet]
  ),




  // // Necklaces
  // P('Mehr Strand Necklace', 'GW-N001', 4200, 'necklaces', { description: 'A warm antique-gold necklace with gemstone colour and an easy, layered silhouette for everyday styling.', is_featured: true, is_bestseller: true, is_new_arrival: true, is_trending: true }, ['Antique Gold', 'Burgundy', 'Ivory'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Jharokha Choker', 'GW-N002', 5600, 'necklaces', { description: 'A regal choker inspired by carved jharokha windows, finished with emerald tones for statement occasions.', is_featured: true, is_limited_edition: true }, ['Emerald', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Saavan Layered Necklace', 'GW-N003', 3800, 'necklaces', { description: 'Soft pearl tones and layered chains bring a light, fluid feel to this versatile necklace.', is_new_arrival: true, is_trending: true }, ['Pearl', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Roohani Pendant Necklace', 'GW-N004', 3400, 'necklaces', { description: 'An amethyst pendant necklace with a calm, luminous presence that transitions from daywear to evening looks.', is_bestseller: true }, ['Amethyst', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Pendants
  // P('Surya Solitaire Pendant', 'GW-P001', 2400, 'pendants', { description: 'A radiant citrine solitaire designed to add a small, sunlit accent to everyday outfits.', is_featured: true, is_bestseller: true, is_new_arrival: true }, ['Citrine', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Chand Drop Pendant', 'GW-P002', 2800, 'pendants', { description: 'A moonstone drop pendant with a cool silver finish and a graceful shape inspired by moonlight.', is_trending: true, is_limited_edition: true }, ['Moonstone', 'Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Mor Pendant', 'GW-P003', 3200, 'pendants', { description: 'A peacock-blue pendant that pairs jewel-like colour with a clean gold setting for a confident finish.', is_featured: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Aab Pendant', 'GW-P004', 2200, 'pendants', { description: 'A delicate aquamarine pendant with a fresh, clear tone made for simple daily layering.', is_new_arrival: true }, ['Aquamarine', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Bracelets
  // P('Jaali Cuff Bracelet', 'GW-B001', 2600, 'bracelets', { description: 'An openwork jaali cuff with a bold architectural pattern, designed to sit comfortably on the wrist.', is_featured: true, is_bestseller: true, is_unisex: true }, ['Antique Gold', 'Oxidised Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Vibe Beaded Bracelet', 'GW-B002', 1800, 'bracelets', { description: 'A playful mix of gemstone beads that brings colour and texture to relaxed everyday looks.', is_new_arrival: true, is_trending: true, is_unisex: true }, ['Turquoise', 'Onyx', 'Carnelian'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Kundan Stack Bracelet', 'GW-B003', 2400, 'bracelets', { description: 'A ruby-red and gold bracelet made to layer beautifully while keeping its traditional Kundan character.', is_bestseller: true }, ['Ruby Red', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Rajwada Kada', 'GW-B004', 4200, 'bracelets', { description: 'A strong antique-gold kada with royal Rajwada influence, made for a distinctive unisex statement.', is_limited_edition: true, is_unisex: true }, ['Antique Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Rings
  // P('Padmini Cocktail Ring', 'GW-R001', 2200, 'rings', { description: 'A colourful cocktail ring with emerald and ruby-red tones for an expressive, celebration-ready look.', is_featured: true, is_bestseller: true, is_trending: true }, ['Emerald', 'Ruby Red', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Saanj Stacking Ring', 'GW-R002', 1400, 'rings', { description: 'A slim stacking ring with a warm gold finish that works alone or alongside your everyday favourites.', is_new_arrival: true }, ['Gold', 'Silver'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Heer Signet Ring', 'GW-R003', 2800, 'rings', { description: 'A polished onyx signet ring with a grounded silhouette and a quietly bold, limited-edition feel.', is_limited_edition: true }, ['Onyx', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Morpankh Ring', 'GW-R004', 2600, 'rings', { description: 'A peacock-blue statement ring with a strong unisex profile and a jewel-toned centre.', is_featured: true, is_unisex: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Malas
  // P('Sattva Mala', 'GW-M001', 3600, 'malas', { description: 'A grounded Tulsi wood mala accented with gemstones for a calm, meaningful everyday layer.', is_featured: true, is_bestseller: true }, ['Tulsi Wood', 'Gemstone'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Sukha Mala', 'GW-M002', 3200, 'malas', { description: 'A sandalwood mala with warm gold accents, carrying a peaceful and naturally tactile character.', is_new_arrival: true, is_trending: true }, ['Sandalwood', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Ras Mala', 'GW-M003', 3800, 'malas', { description: 'An expressive limited-edition mala blending amethyst and quartz tones into a rich, meditative piece.', is_limited_edition: true }, ['Amethyst', 'Quartz'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Earrings
  // P('Jhumka Drop Earrings', 'GW-E001', 2400, 'earrings', { description: 'Classic jhumka drops with antique-gold warmth and a ruby-red accent for festive movement.', is_featured: true, is_bestseller: true, is_new_arrival: true }, ['Antique Gold', 'Ruby Red'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Chandbali Earrings', 'GW-E002', 3200, 'earrings', { description: 'Pearl-toned Chandbali earrings with a graceful crescent shape that frames the face beautifully.', is_trending: true, is_limited_edition: true }, ['Pearl', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Stud Vibe Earrings', 'GW-E003', 1200, 'earrings', { description: 'Compact gemstone studs in bright mixed tones, made for an effortless pop of colour every day.', is_new_arrival: true }, ['Turquoise', 'Onyx', 'Citrine'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Mor Stud Earrings', 'GW-E004', 1800, 'earrings', { description: 'Minimal peacock-blue studs with a polished gold finish for subtle colour and easy repeat wear.', is_bestseller: true }, ['Peacock Blue', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),

  // // Keychains
  // P('GemVibe Keychain', 'GW-K001', 900, 'keychains', { description: 'A colourful gemstone keychain that adds a small, personal accent to keys, bags, and everyday carry.', is_featured: true, is_new_arrival: true, is_unisex: true }, ['Turquoise', 'Onyx', 'Carnelian', 'Amethyst'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Rajwada Keychain', 'GW-K002', 1100, 'keychains', { description: 'A compact Rajwada-inspired keychain with antique gold character and a rich ruby-red detail.', is_bestseller: true, is_unisex: true }, ['Antique Gold', 'Ruby Red'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Mini Mala Keychain', 'GW-K003', 800, 'keychains', { description: 'A tactile mini mala keychain combining sandalwood warmth with gemstone detail in a pocket-sized form.', is_trending: true, is_unisex: true }, ['Sandalwood', 'Gemstone'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
  // P('Limited Edition Keychain', 'GW-K004', 1400, 'keychains', { description: 'An emerald-and-gold limited-edition keychain designed as a distinctive everyday keepsake.', is_limited_edition: true, is_unisex: true }, ['Emerald', 'Gold'], I('1454113009175-9a4b1c3de9a4', '1616406', '1458946')),
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);
export const getProductsByCategory = (catId: string) => products.filter((p) => p.category_id === catId);
