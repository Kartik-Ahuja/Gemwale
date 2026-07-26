import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { products as seedProducts } from '@/data/catalog';
import type { Product } from '@/types';

const STORAGE_KEY = 'gemwale_products';

const normalizeProduct = (product: Partial<Product> & Record<string, any>): Product => {
  const baseName = product.name || product.slug || 'Untitled Product';
  const baseSlug = product.slug || baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `product-${Date.now()}`;

  return {
    id: product.id || `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: product.name || 'Untitled Product',
    slug: baseSlug,
    product_code: product.product_code || 'GW-NEW',
    price: Number(product.price) || 0,
    category_id: product.category_id ?? null,
    collection_id: product.collection_id ?? null,
    colour: product.colour || '',
    colours: Array.isArray(product.colours) ? product.colours : [],
    images: Array.isArray(product.images) ? product.images : [],
    description: product.description || '',
    details: product.details || '',
    care_instructions: product.care_instructions || '',
    stock: Number(product.stock) || 0,
    availability: product.availability || 'In Stock',
    is_featured: Boolean(product.is_featured),
    is_bestseller: Boolean(product.is_bestseller),
    is_trending: Boolean(product.is_trending),
    is_new_arrival: Boolean(product.is_new_arrival),
    is_limited_edition: Boolean(product.is_limited_edition),
    is_unisex: Boolean(product.is_unisex),
    display_order: Number(product.display_order) || 0,
    created_at: product.created_at || new Date().toISOString(),
  };
};

const readStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item) => normalizeProduct(item));
  } catch {
    return [];
  }
};

const writeStoredProducts = (products: Product[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

const getFallbackProducts = (): Product[] => {
  const fromStorage = readStoredProducts();
  if (fromStorage.length) return fromStorage;

  const fallback = seedProducts.map((product) => normalizeProduct(product));
  writeStoredProducts(fallback);
  return fallback;
};

export async function getProducts(): Promise<Product[]> {
  const fallbackProducts = getFallbackProducts();

  if (!isSupabaseConfigured || !supabase) {
    return fallbackProducts;
  }

  try {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && Array.isArray(data)) {
      const normalized = (data as Partial<Product>[]).map((item) => normalizeProduct(item));
      writeStoredProducts(normalized);
      return normalized;
    }
  } catch {
    // fall through to local fallback
  }

  return fallbackProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}

export async function upsertProduct(input: Partial<Product> & Record<string, any>): Promise<Product> {
  const existing = readStoredProducts();
  const nextProduct = normalizeProduct(input);
  const nextProducts = input.id
    ? existing.map((product) => (product.id === input.id ? nextProduct : product))
    : [nextProduct, ...existing];

  writeStoredProducts(nextProducts);

  if (isSupabaseConfigured && supabase) {
    try {
      const payload = {
        ...nextProduct,
        id: undefined,
      };

      if (input.id) {
        await supabase.from('products').update(payload).eq('id', input.id);
      } else {
        await supabase.from('products').insert(payload);
      }
    } catch {
      // local storage fallback remains intact
    }
  }

  return nextProduct;
}

export async function deleteProduct(id: string): Promise<void> {
  const nextProducts = readStoredProducts().filter((product) => product.id !== id);
  writeStoredProducts(nextProducts);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // ignore and keep local storage state
    }
  }
}

export async function seedProductsToDb(onDone?: () => void): Promise<void> {
  const seedPayload = seedProducts.map((product) => normalizeProduct(product));
  writeStoredProducts(seedPayload);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').insert(seedPayload.map((product) => ({ ...product, id: undefined })));
    } catch {
      // local storage fallback remains intact
    }
  }

  onDone?.();
}
