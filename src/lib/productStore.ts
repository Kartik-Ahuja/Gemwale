import { db, isFirebaseConfigured } from '@/lib/firebase';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

import type { Product } from '@/types';

const STORAGE_KEY = 'gemwale_products';

/**
 * Normalize product data
 */
const normalizeProduct = (
  product: Partial<Product> & Record<string, any>
): Product => {
  const baseName =
    product.name ||
    product.slug ||
    'Untitled Product';

  const baseSlug =
    product.slug ||
    baseName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') ||
    `product-${Date.now()}`;

  return {
    id:
      product.id ||
      `product-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

    name: product.name || 'Untitled Product',

    slug: baseSlug,

    product_code:
      product.product_code || 'GW-NEW',

    price:
      Number(product.price) || 0,

    category_id:
      product.category_id ?? null,

    collection_id:
      product.collection_id ?? null,

    colour:
      product.colour || '',

    colours:
      Array.isArray(product.colours)
        ? product.colours
        : [],

    images:
      Array.isArray(product.images)
        ? product.images
        : [],

    description:
      product.description || '',

    details:
      product.details || '',

    care_instructions:
      product.care_instructions || '',

    stock:
      Number(product.stock) || 0,

    availability:
      product.availability || 'In Stock',

    is_featured:
      Boolean(product.is_featured),

    is_bestseller:
      Boolean(product.is_bestseller),

    is_trending:
      Boolean(product.is_trending),

    is_new_arrival:
      Boolean(product.is_new_arrival),

    is_limited_edition:
      Boolean(product.is_limited_edition),

    is_unisex:
      Boolean(product.is_unisex),

    display_order:
      Number(product.display_order) || 0,

    created_at:
      product.created_at ||
      new Date().toISOString(),
  };
};

/**
 * Read cached products from localStorage
 */
const readStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) =>
      normalizeProduct(item)
    );
  } catch (error) {
    console.error(
      '❌ Failed to read products from localStorage:',
      error
    );

    return [];
  }
};

/**
 * Save products to localStorage
 */
const writeStoredProducts = (
  products: Product[]
) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    );
  } catch (error) {
    console.error(
      '❌ Failed to save products to localStorage:',
      error
    );
  }
};

/**
 * Get all products from Firestore
 *
 * Firestore is the PRIMARY source.
 * localStorage is only used when Firebase
 * is unavailable.
 */
export async function getProducts(): Promise<Product[]> {
  /**
   * Firebase not configured
   */
  if (!isFirebaseConfigured || !db) {
    console.warn(
      '⚠️ Firebase is not configured.'
    );

    return readStoredProducts();
  }

  try {
    console.log(
      '🔥 Loading products from Firestore...'
    );

    const snapshot = await getDocs(
      collection(db, 'products')
    );

    /**
     * No products in Firestore
     */
    if (snapshot.empty) {
      console.warn(
        '⚠️ Firestore products collection is empty.'
      );

      /**
       * IMPORTANT:
       * Do not treat localStorage as the
       * main database.
       *
       * Returning local products here can
       * make different browsers show
       * different products.
       */
      return [];
    }

    /**
     * Convert Firestore documents
     */
    const products = snapshot.docs
      .map((item) =>
        normalizeProduct({
          ...item.data(),
          id: item.id,
        })
      )
      .sort(
        (a, b) =>
          (new Date(
            b.created_at
          ).getTime() || 0) -
          (new Date(
            a.created_at
          ).getTime() || 0)
      );

    /**
     * Cache Firestore products locally
     */
    writeStoredProducts(products);

    console.log(
      `✅ ${products.length} products loaded from Firestore.`
    );

    return products;
  } catch (error) {
    console.error(
      '🔥 Firebase getProducts failed:',
      error
    );

    /**
     * Only use local cache when Firebase
     * itself is unavailable.
     */
    const localProducts =
      readStoredProducts();

    if (localProducts.length) {
      console.warn(
        '⚠️ Using cached local products because Firestore could not be reached.'
      );

      return localProducts;
    }

    return [];
  }
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products =
    await getProducts();

  return (
    products.find(
      (product) =>
        product.slug === slug
    ) || null
  );
}

/**
 * Add or update product
 */
export async function upsertProduct(
  input: Partial<Product> &
    Record<string, any>
): Promise<Product> {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase is not configured. Product cannot be saved permanently.'
    );
  }

  /**
   * If editing an existing product,
   * keep its ID.
   *
   * If adding a new product,
   * generate a new ID.
   */
  const productId =
    input.id ||
    `product-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  const nextProduct =
    normalizeProduct({
      ...input,
      id: productId,
    });

  console.log(
    '🔥 Saving product to Firestore:',
    nextProduct
  );

  try {
    /**
     * IMPORTANT:
     * Firestore is saved FIRST.
     */
    await setDoc(
      doc(
        db,
        'products',
        nextProduct.id
      ),
      nextProduct,
      {
        merge: true,
      }
    );

    console.log(
      '✅ Product successfully saved to Firestore:',
      nextProduct.id
    );

    /**
     * Update local cache only after
     * successful Firebase save.
     */
    const existing =
      readStoredProducts();

    const exists = existing.some(
      (product) =>
        product.id === nextProduct.id
    );

    const updatedProducts = exists
      ? existing.map((product) =>
          product.id === nextProduct.id
            ? nextProduct
            : product
        )
      : [
          nextProduct,
          ...existing,
        ];

    writeStoredProducts(
      updatedProducts
    );

    return nextProduct;
  } catch (error) {
    console.error(
      '🔥 Firebase upsertProduct failed:',
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    throw new Error(
      `Product could not be saved to Firebase: ${message}`
    );
  }
}

/**
 * Delete product
 */
export async function deleteProduct(
  id: string
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase is not configured.'
    );
  }

  try {
    console.log(
      '🔥 Deleting product from Firestore:',
      id
    );

    await deleteDoc(
      doc(
        db,
        'products',
        id
      )
    );

    console.log(
      '✅ Product deleted from Firestore:',
      id
    );

    /**
     * Update local cache after
     * successful Firebase delete.
     */
    const updatedProducts =
      readStoredProducts().filter(
        (product) =>
          product.id !== id
      );

    writeStoredProducts(
      updatedProducts
    );
  } catch (error) {
    console.error(
      '🔥 Firebase deleteProduct failed:',
      error
    );

    throw error;
  }
}

/**
 * Seed locally cached admin products to Firestore.
 * This is kept for compatibility with the admin dashboard.
 */
export async function seedProductsToDb(
  onDone?: () => void
): Promise<void> {
  const localProducts = readStoredProducts();

  if (!isFirebaseConfigured || !db) {
    console.warn(
      '⚠️ Firebase is not configured. Seed skipped.'
    );
    onDone?.();
    return;
  }

  if (!localProducts.length) {
    onDone?.();
    return;
  }

  try {
    const firestoreDb = db;

    await Promise.all(
      localProducts.map((product) =>
        setDoc(
          doc(firestoreDb, 'products', product.id),
          product,
          { merge: true }
        )
      )
    );

    console.log(
      '✅ Local admin products synced to Firestore.'
    );
  } catch (error) {
    console.error(
      '🔥 Failed to sync local products to Firestore:',
      error
    );
    throw error;
  } finally {
    onDone?.();
  }
}

/**
 * Clear local cache
 *
 * This does NOT delete products
 * from Firebase.
 */
export function clearStoredProducts(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );

    console.log(
      '🧹 Local product cache cleared.'
    );
  } catch (error) {
    console.error(
      'Failed to clear local products:',
      error
    );
  }
}