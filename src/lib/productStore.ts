import { db, storage, isFirebaseConfigured } from '@/lib/firebase';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { products as seedProducts } from '@/data/catalog';

import type { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';
const STORAGE_FOLDER = 'products';
const USE_LOCAL_PRODUCTS = true;

/**
 * Normalize product data so every product follows
 * the same structure.
 */
export function normalizeProduct(product: any): Product {
  return {
    id: String(product?.id || ''),
    name: String(product?.name || ''),
    slug: String(product?.slug || ''),
    product_code: String(product?.product_code || ''),
    price: Number(product?.price || 0),

    category_id:
      product?.category_id === ''
        ? null
        : product?.category_id ?? null,

    collection_id:
      product?.collection_id === ''
        ? null
        : product?.collection_id ?? null,

    colour: String(product?.colour || ''),

    colours: Array.isArray(product?.colours)
      ? product.colours.map(String)
      : [],

    images: Array.isArray(product?.images)
      ? product.images.map(String)
      : [],

    description: String(product?.description || ''),
    care_instructions: String(product?.care_instructions || ''),

    stock: Number(product?.stock || 0),

    availability:
      product?.availability || 'In Stock',

    is_featured: Boolean(product?.is_featured),
    is_bestseller: Boolean(product?.is_bestseller),
    is_trending: Boolean(product?.is_trending),
    is_new_arrival: Boolean(product?.is_new_arrival),
    is_limited_edition: Boolean(product?.is_limited_edition),
    is_unisex: Boolean(product?.is_unisex),

    display_order: Number(product?.display_order || 0),

    created_at:
      product?.created_at ||
      new Date().toISOString(),
  } as Product;
}

/**
 * Get all products directly from Firebase Firestore.
 *
 * IMPORTANT:
 * No localStorage fallback.
 */
export async function getProducts(): Promise<Product[]> {
  if (USE_LOCAL_PRODUCTS) {
    return seedProducts.map((product) => normalizeProduct(product));
  }

  if (!isFirebaseConfigured || !db) {
    console.error(
      '🔥 Firebase is not configured.'
    );

    return [];
  }

  try {
    console.log(
      '🔥 Loading products from Firestore...'
    );

    const snapshot = await getDocs(
      collection(db, PRODUCTS_COLLECTION)
    );

    if (snapshot.empty) {
      console.warn(
        '⚠️ Firestore products collection is empty.'
      );

      return [];
    }

    const products = snapshot.docs
      .map((item) =>
        normalizeProduct({
          id: item.id,
          ...item.data(),
        })
      )
      .sort((a, b) => {
        const aOrder = Number(a.display_order || 0);
        const bOrder = Number(b.display_order || 0);

        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
      });

    console.log(
      `✅ Loaded ${products.length} products from Firestore.`
    );

    return products;
  } catch (error) {
    console.error(
      '🔥 Failed to load products from Firestore:',
      error
    );

    return [];
  }
}

/**
 * Get one product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();

  return (
    products.find(
      (product) => product.slug === slug
    ) || null
  );
}

/**
 * Upload one product image to Firebase Storage.
 */
export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error(
      'Firebase Storage is not configured.'
    );
  }

  if (!file.type.startsWith('image/')) {
    throw new Error(
      `${file.name} is not a valid image file.`
    );
  }

  /**
   * Create a safe filename.
   */
  const extension =
    file.name.split('.').pop()?.toLowerCase() || 'jpg';

  const randomId =
    typeof crypto !== 'undefined' &&
    'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`;

  const fileName = `${randomId}.${extension}`;

  const storagePath =
    `${STORAGE_FOLDER}/${productId}/${fileName}`;

  const storageRef = ref(
    storage,
    storagePath
  );

  console.log(
    `⬆️ Uploading image: ${file.name}`
  );

  await uploadBytes(
    storageRef,
    file,
    {
      contentType: file.type,
      cacheControl: 'public,max-age=31536000',
    }
  );

  const downloadURL =
    await getDownloadURL(storageRef);

  console.log(
    `✅ Image uploaded: ${file.name}`
  );

  return downloadURL;
}

/**
 * Upload multiple product images.
 */
export async function uploadProductImages(
  files: File[],
  productId: string
): Promise<string[]> {
  if (!files.length) {
    return [];
  }

  return Promise.all(
    files.map((file) =>
      uploadProductImage(
        file,
        productId
      )
    )
  );
}

/**
 * Delete a product image from Firebase Storage.
 *
 * This expects a Firebase Storage download URL.
 */
export async function deleteProductImage(
  imageUrl: string
): Promise<void> {
  if (!isFirebaseConfigured || !storage) {
    throw new Error(
      'Firebase Storage is not configured.'
    );
  }

  if (!imageUrl) {
    return;
  }

  try {
    const imageRef = ref(
      storage,
      imageUrl
    );

    await deleteObject(imageRef);

    console.log(
      '🗑️ Product image deleted from Storage.'
    );
  } catch (error: any) {
    /**
     * If the file is already deleted,
     * don't fail the whole operation.
     */
    if (
      error?.code ===
      'storage/object-not-found'
    ) {
      return;
    }

    console.error(
      '🔥 Failed to delete product image:',
      error
    );

    throw error;
  }
}

/**
 * Create or update product directly in Firestore.
 *
 * NO localStorage.
 */
export async function upsertProduct(
  product: Partial<Product>
): Promise<Product> {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Firebase is not configured.'
    );
  }

  const productId =
    product.id ||
    crypto.randomUUID();

  const normalizedProduct =
    normalizeProduct({
      ...product,
      id: productId,
      created_at:
        product.created_at ||
        new Date().toISOString(),
    });

  try {
    console.log(
      `🔥 Saving product "${normalizedProduct.name}" to Firestore...`
    );

    await setDoc(
      doc(
        db,
        PRODUCTS_COLLECTION,
        productId
      ),
      normalizedProduct,
      {
        merge: true,
      }
    );

    console.log(
      `✅ Product saved to Firestore: ${productId}`
    );

    return normalizedProduct;
  } catch (error) {
    console.error(
      '🔥 Failed to save product:',
      error
    );

    throw error;
  }
}

/**
 * Delete product from Firestore.
 *
 * NOTE:
 * Product document is deleted.
 * Storage images are intentionally not automatically
 * deleted here because Firestore only stores URLs.
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
      `🗑️ Deleting product: ${id}`
    );

    await deleteDoc(
      doc(
        db,
        PRODUCTS_COLLECTION,
        id
      )
    );

    console.log(
      `✅ Product deleted: ${id}`
    );
  } catch (error) {
    console.error(
      '🔥 Failed to delete product:',
      error
    );

    throw error;
  }
}

/**
 * Seed the existing catalog into Firestore.
 *
 * This is OPTIONAL.
 *
 * After products are in Firestore,
 * the website does NOT depend on catalog.ts.
 */
export async function seedProductsToDb(
  onDone?: () => void
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.error(
      '🔥 Firebase is not configured.'
    );

    return;
  }

  const firestore = db;

  try {
    const normalizedProducts =
      seedProducts.map((product) =>
        normalizeProduct(product)
      );

    await Promise.all(
      normalizedProducts.map(
        (product) =>
          setDoc(
            doc(
              firestore,
              PRODUCTS_COLLECTION,
              product.id
            ),
            product,
            {
              merge: true,
            }
          )
      )
    );

    console.log(
      `✅ ${normalizedProducts.length} products seeded to Firestore.`
    );

    onDone?.();
  } catch (error) {
    console.error(
      '🔥 Failed to seed products:',
      error
    );

      throw error;
  }
}