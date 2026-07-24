export type CategorySlug =
  | 'necklaces'
  | 'pendants'
  | 'bracelets'
  | 'rings'
  | 'malas'
  | 'earrings'
  | 'keychains';

export type CollectionSlug =
  | 'new-arrivals'
  | 'best-sellers'
  | 'trending'
  | 'featured-edit'
  | 'latest-drops'
  | 'fresh-styles'
  | 'signature-pieces'
  | 'limited-edition'
  | 'top-picks'
  | 'unisex';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image_url: string;
  display_order: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: CollectionSlug;
  tagline: string;
  description: string;
  image_url: string;
  display_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  product_code: string;
  price: number;
  category_id: string | null;
  collection_id: string | null;
  colour: string;
  colours: string[];
  images: string[];
  description: string;
  details: string;
  care_instructions: string;
  stock: number;
  availability: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_trending: boolean;
  is_new_arrival: boolean;
  is_limited_edition: boolean;
  is_unisex: boolean;
  display_order: number;
  created_at: string;
}

export interface CartItem {
  product_id: string;
  product_code: string;
  name: string;
  slug: string;
  price: number;
  colour: string;
  quantity: number;
  image: string;
}

export interface Customer {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
}

export type OrderStatus =
  | 'WhatsApp Contacted'
  | 'Payment Pending'
  | 'Payment Received'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
