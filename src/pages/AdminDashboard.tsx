import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, FolderTree,
  Loader2, Plus, Pencil, Trash2, X, Check, LogOut, Lock, Mail,
} from 'lucide-react';
import { categories, collections } from '@/data/catalog';
import { deleteProduct as deleteStoredProduct, getProducts, seedProductsToDb, upsertProduct } from '@/lib/productStore';
import { OrnamentalDivider } from '@/components/Ornaments';
import type { OrderStatus, PaymentStatus, Product } from '@/types';

type Tab = 'overview' | 'products' | 'orders' | 'customers' | 'categories' | 'collections';

const orderStatuses: OrderStatus[] = ['WhatsApp Contacted', 'Payment Pending', 'Payment Received', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatuses: PaymentStatus[] = ['Pending', 'Paid', 'Failed', 'Refunded'];
const ADMIN_AUTH_KEY = 'gemwale_admin_auth';
const PRODUCT_IMAGES_BUCKET = 'products';
const configuredAdminEmail = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase() || '';
const configuredAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD?.trim() || '';
const adminCredentialsConfigured = Boolean(configuredAdminEmail && configuredAdminPassword);

function isValidAdminLogin(email: string, password: string) {
  return adminCredentialsConfigured
    && email.trim().toLowerCase() === configuredAdminEmail
    && password === configuredAdminPassword;
}

export function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem(ADMIN_AUTH_KEY);
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || checkingAuth) return;

    (async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchCustomers(), fetchProducts()]);
      setLoading(false);
    })();
  }, [isAuthenticated, checkingAuth]);

  const fetchOrders = async () => {
    setOrders([]);
  };

  const fetchCustomers = async () => {
    setCustomers([]);
  };

const fetchProducts = async () => {
  const products = await getProducts();
  setDbProducts(products);
};

  const updateOrderStatus = async () => {
    fetchOrders();
  };

  const deleteProduct = async (id: string) => {
    await deleteStoredProduct(id);
    fetchProducts();
  };

  const stats = {
    total: orders.length,
    pendingPayments: orders.filter((o) => o.payment_status === 'Pending').length,
    paid: orders.filter((o) => o.payment_status === 'Paid').length,
    processing: orders.filter((o) => o.order_status === 'Processing').length,
    shipped: orders.filter((o) => o.order_status === 'Shipped').length,
    delivered: orders.filter((o) => o.order_status === 'Delivered').length,
  };

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'orders', label: 'Orders', icon: ShoppingBag },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'categories', label: 'Categories', icon: Tag },
    { key: 'collections', label: 'Collections', icon: FolderTree },
  ];

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminCredentialsConfigured) {
      setAuthError('Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD in your .env file before logging in.');
      return;
    }

    if (isValidAdminLogin(email, password)) {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setAuthError('');
      setPassword('');
      return;
    }

    setAuthError('Invalid email or password');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setEmail('');
    setPassword('');
    setAuthError('');
    setTab('overview');
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-burgundy-950 px-4 pt-16">
        <div className="flex items-center gap-3 text-ivory-100/70">
          <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
          <span>Checking access…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-burgundy-950 px-4 pt-16">
        <div className="w-full max-w-md border border-gold-400/20 bg-burgundy-900/90 p-8 shadow-2xl">
          <div className="mb-6 text-center">
            <p className="section-eyebrow mb-2">GemWale Admin</p>
            <h1 className="font-display text-3xl text-ivory-100">Secure Login</h1>
            <p className="mt-2 text-sm text-ivory-100/60">Use the admin credentials configured in your local environment to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block">
              <span className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-400">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Enter your admin email"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-400">
                <Lock className="h-3.5 w-3.5" /> Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your admin password"
                required
              />
            </label>

            {authError && <p className="text-sm text-red-300">{authError}</p>}

            <button type="submit" disabled={!adminCredentialsConfigured} className="btn-gold-solid w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-burgundy-950 pt-16">
      <div className="container-editorial py-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-eyebrow mb-2">GemWale Admin</p>
            <h1 className="font-display text-4xl text-ivory-100 sm:text-5xl">Dashboard</h1>
            <OrnamentalDivider className="mt-4 justify-start" />
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 border border-gold-400/20 px-3 py-2 text-sm text-ivory-100/70 hover:border-gold-400 hover:text-gold-300">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-gold-400/15 pb-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                tab === t.key ? 'bg-gold-400 text-burgundy-900' : 'text-ivory-100/70 hover:text-gold-300'
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold-400" />
            <p className="mt-3 text-sm text-ivory-100/60">Loading dashboard…</p>
          </div>
        ) : (
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {tab === 'overview' && <Overview stats={stats} orders={orders} />}
            {tab === 'products' && (
              <ProductsTab
                products={dbProducts}
                onEdit={setEditingProduct}
                onDelete={deleteProduct}
                onSaved={fetchProducts}
              />
            )}
            {tab === 'orders' && <OrdersTab orders={orders} onStatusChange={updateOrderStatus} />}
            {tab === 'customers' && <CustomersTab customers={customers} orders={orders} />}
            {tab === 'categories' && <CategoriesTab />}
            {tab === 'collections' && <CollectionsTab />}
          </motion.div>
        )}
      </div>

      {editingProduct && (
        <ProductEditModal product={editingProduct} onClose={() => setEditingProduct(null)} onSaved={fetchProducts} />
      )}
    </div>
  );
}

function Overview({ stats, orders }: { stats: any; orders: any[] }) {
  const cards = [
    { label: 'Total Orders', value: stats.total, color: 'text-ivory-100' },
    { label: 'Pending Payments', value: stats.pendingPayments, color: 'text-gold-300' },
    { label: 'Paid Orders', value: stats.paid, color: 'text-green-400' },
    { label: 'Processing', value: stats.processing, color: 'text-blue-300' },
    { label: 'Shipped', value: stats.shipped, color: 'text-purple-300' },
    { label: 'Delivered', value: stats.delivered, color: 'text-emerald-300' },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((c) => (
          <div key={c.label} className="border border-gold-400/15 bg-burgundy-900/50 p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">{c.label}</p>
            <p className={`mt-2 font-display text-3xl ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 mb-4 font-serif text-2xl text-ivory-100">Recent Orders</h3>
      <div className="space-y-3">
        {orders.slice(0, 5).map((o) => (
          <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 border border-gold-400/10 bg-burgundy-900/40 p-4">
            <div>
              <p className="font-serif text-lg text-ivory-100">{o.order_id}</p>
              <p className="text-xs text-ivory-100/50">{o.customers?.full_name} · {o.customers?.city}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-gold-300">₹{Number(o.total).toLocaleString('en-IN')}</span>
              <span className="text-ivory-100/60">{o.order_status}</span>
              <span className="text-ivory-100/60">{o.payment_status}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-sm text-ivory-100/50">No orders yet.</p>}
      </div>
    </div>
  );
}

function ProductsTab({ products: items, onEdit, onDelete, onSaved }: {
  products: any[]; onEdit: (p: Product) => void; onDelete: (id: string) => void; onSaved: () => void;
}) {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ivory-100/60">{items.length} products</p>
        <button onClick={() => setShowAdd(true)} className="btn-gold-solid">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border border-gold-400/10 bg-burgundy-900/40 p-4">
            <div className="flex items-center gap-4">
              {p.images?.[0] && <img src={p.images[0]} alt="" className="h-14 w-12 object-cover" />}
              <div>
                <p className="font-serif text-lg text-ivory-100">{p.name}</p>
                <p className="text-xs text-ivory-100/50">{p.product_code} · ₹{Number(p.price).toLocaleString('en-IN')} · Stock: {p.stock}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(p as Product)} className="grid h-9 w-9 place-items-center border border-ivory-100/20 text-ivory-100/70 hover:border-gold-400 hover:text-gold-300" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => onDelete(p.id)} className="grid h-9 w-9 place-items-center border border-red-400/30 text-red-300/70 hover:border-red-400 hover:text-red-300" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-ivory-100/50">No products in the database yet.</p>
            <button onClick={() => seedProductsToDb(onSaved)} className="btn-gold mt-4">Seed Sample Products</button>
          </div>
        )}
      </div>
      {showAdd && <ProductEditModal product={null} onClose={() => setShowAdd(false)} onSaved={onSaved} />}
    </div>
  );
}

function OrdersTab({ orders, onStatusChange }: { orders: any[]; onStatusChange: (id: string, field: string, value: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="border border-gold-400/10 bg-burgundy-900/40">
          <button onClick={() => setExpanded(expanded === o.id ? null : o.id)} className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left">
            <div>
              <p className="font-serif text-lg text-ivory-100">{o.order_id}</p>
              <p className="text-xs text-ivory-100/50">{o.customers?.full_name} · {o.customers?.phone} · {new Date(o.created_at).toLocaleDateString('en-IN')}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gold-300">₹{Number(o.total).toLocaleString('en-IN')}</span>
              <span className="text-xs text-ivory-100/60">{o.order_items?.length} items</span>
            </div>
          </button>
          {expanded === o.id && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden border-t border-ivory-100/10">
              <div className="p-4">
                {/* Items */}
                <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-gold-400">Items</p>
                <div className="mb-4 space-y-2">
                  {o.order_items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm text-ivory-100/80">
                      <span>{item.product_name} ({item.product_code}) · {item.colour} · Qty {item.quantity}</span>
                      <span className="text-gold-300">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                {/* Address */}
                <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-gold-400">Address</p>
                <p className="mb-4 text-sm text-ivory-100/70">
                  {o.customers?.full_name}, {o.customers?.phone}<br />
                  {o.customers?.city}, {o.customers?.state} - {o.customers?.pin_code}
                </p>
                {/* Status controls */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-gold-400">Order Status</span>
                    <select value={o.order_status} onChange={(e) => onStatusChange(o.id, 'order_status', e.target.value)} className="input-field">
                      {orderStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-gold-400">Payment Status</span>
                    <select value={o.payment_status} onChange={(e) => onStatusChange(o.id, 'payment_status', e.target.value)} className="input-field">
                      {paymentStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      ))}
      {orders.length === 0 && <p className="py-12 text-center text-sm text-ivory-100/50">No orders yet.</p>}
    </div>
  );
}

function CustomersTab({ customers, orders }: { customers: any[]; orders: any[] }) {
  return (
    <div className="space-y-3">
      {customers.map((c) => {
        const custOrders = orders.filter((o) => o.customer_id === c.id);
        return (
          <div key={c.id} className="border border-gold-400/10 bg-burgundy-900/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-serif text-lg text-ivory-100">{c.full_name}</p>
                <p className="text-xs text-ivory-100/50">{c.phone} · {c.email || '—'}</p>
              </div>
              <span className="text-xs text-gold-300">{custOrders.length} orders</span>
            </div>
            <p className="mt-2 text-sm text-ivory-100/60">{c.address}, {c.city}, {c.state} - {c.pin_code}, {c.country}</p>
          </div>
        );
      })}
      {customers.length === 0 && <p className="py-12 text-center text-sm text-ivory-100/50">No customers yet.</p>}
    </div>
  );
}

function CategoriesTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <div key={c.id} className="border border-gold-400/10 bg-burgundy-900/40 p-4">
          <p className="font-serif text-lg text-ivory-100">{c.name}</p>
          <p className="text-xs text-ivory-100/50">/{c.slug}</p>
          <p className="mt-2 text-sm text-ivory-100/60">{c.description}</p>
        </div>
      ))}
    </div>
  );
}

function CollectionsTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((c) => (
        <div key={c.id} className="border border-gold-400/10 bg-burgundy-900/40 p-4">
          <p className="font-serif text-lg text-ivory-100">{c.name}</p>
          <p className="text-xs text-gold-300">{c.tagline}</p>
          <p className="text-xs text-ivory-100/50">/{c.slug}</p>
          <p className="mt-2 text-sm text-ivory-100/60">{c.description}</p>
        </div>
      ))}
    </div>
  );
}

function ProductEditModal({ product, onClose, onSaved }: { product: Product | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Partial<Product>>(
    product || {
      name: '', slug: '', product_code: '', price: 0, category_id: null, collection_id: null,
      colour: '', colours: [], images: [], description: '', details: '', care_instructions: '',
      stock: 10, availability: 'In Stock', is_featured: false, is_bestseller: false,
      is_trending: false, is_new_arrival: false, is_limited_edition: false, is_unisex: false,
      display_order: 0,
    },
  );
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [coloursInput, setColoursInput] = useState((product?.colours || []).join(', '));
  const [imagesInput, setImagesInput] = useState((product?.images || []).join(', '));
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read selected image.'));
    reader.readAsDataURL(file);
  });

  const handleSave = async () => {
    setSaving(true);
    setUploadError('');

    try {
      let uploadedImageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        setUploadingImages(true);
        uploadedImageUrls = await Promise.all(
          selectedFiles.map(async (file) => fileToDataUrl(file)),
        );
      }

      const manualImages = imagesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...form,
        slug: form.slug || (form.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + (form.product_code || '').toLowerCase(),
        colours: coloursInput.split(',').map((s) => s.trim()).filter(Boolean),
        images: [...uploadedImageUrls, ...manualImages].filter(Boolean),
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        display_order: Number(form.display_order) || 0,
      };

      await upsertProduct({
        ...payload,
        id: product?.id,
      });

      onSaved();
      onClose();
    } catch (error: any) {
      const message = error?.message || 'Unable to save product. Check your Firebase configuration and database permissions.';
      setUploadError(message);
      console.error('Product save failed:', error);
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-burgundy-950/85 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-gold-400/20 bg-burgundy-900 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-serif text-2xl text-ivory-100">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5 text-ivory-100/70 hover:text-gold-300" /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <L label="Name"><input value={form.name || ''} onChange={(e) => set('name', e.target.value)} className="input-field" /></L>
          <L label="Product Code"><input value={form.product_code || ''} onChange={(e) => set('product_code', e.target.value)} className="input-field" /></L>
          <L label="Price (₹)"><input type="number" value={form.price || ''} onChange={(e) => set('price', e.target.value)} className="input-field" /></L>
          <L label="Stock"><input type="number" value={form.stock || ''} onChange={(e) => set('stock', e.target.value)} className="input-field" /></L>
          <L label="Category">
            <select value={form.category_id || ''} onChange={(e) => set('category_id', e.target.value || null)} className="input-field">
              <option value="">—</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </L>
          <L label="Collection">
            <select value={form.collection_id || ''} onChange={(e) => set('collection_id', e.target.value || null)} className="input-field">
              <option value="">—</option>
              {collections.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </L>
          <L label="Primary Colour"><input value={form.colour || ''} onChange={(e) => set('colour', e.target.value)} className="input-field" /></L>
          <L label="Availability">
            <select value={form.availability || 'In Stock'} onChange={(e) => set('availability', e.target.value)} className="input-field">
              <option>In Stock</option><option>Limited Stock</option><option>Out of Stock</option>
            </select>
          </L>
          <div className="sm:col-span-2"><L label="Colours (comma separated)"><input value={coloursInput} onChange={(e) => setColoursInput(e.target.value)} className="input-field" /></L></div>
          <div className="sm:col-span-2">
            <L label="Upload Images">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                className="input-field mt-2 file:mr-4 file:rounded file:border-0 file:bg-gold-400 file:px-3 file:py-2 file:text-burgundy-900"
              />
            </L>
            <p className="mt-2 text-xs text-ivory-100/50">
              Selected images are saved with the product. If Supabase Storage is available, they are uploaded there; otherwise they are stored as embedded image data.
            </p>
            {selectedFiles.length > 0 && <p className="mt-1 text-xs text-gold-300">{selectedFiles.length} image(s) selected</p>}
            {uploadError && <p className="mt-2 text-sm text-red-300">{uploadError}</p>}
          </div>
          <div className="sm:col-span-2"><L label="Image URLs (optional, comma separated)"><input value={imagesInput} onChange={(e) => setImagesInput(e.target.value)} className="input-field" /></L></div>
          <div className="sm:col-span-2"><L label="Description"><textarea rows={3} value={form.description || ''} onChange={(e) => set('description', e.target.value)} className="input-field resize-none" /></L></div>
          <div className="sm:col-span-2"><L label="Details"><textarea rows={2} value={form.details || ''} onChange={(e) => set('details', e.target.value)} className="input-field resize-none" /></L></div>
          <div className="sm:col-span-2"><L label="Care Instructions"><textarea rows={2} value={form.care_instructions || ''} onChange={(e) => set('care_instructions', e.target.value)} className="input-field resize-none" /></L></div>
        </div>

        {/* Flags */}
        <div className="mt-5 flex flex-wrap gap-4">
          {(['is_featured', 'is_bestseller', 'is_trending', 'is_new_arrival', 'is_limited_edition', 'is_unisex'] as const).map((f) => (
            <label key={f} className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-widest text-ivory-100/70">
              <input type="checkbox" checked={!!form[f]} onChange={(e) => set(f, e.target.checked)} className="h-3.5 w-3.5 accent-gold-400" />
              {f.replace('is_', '').replace('_', ' ')}
            </label>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={handleSave} disabled={saving || uploadingImages} className="btn-gold-solid flex-1 disabled:opacity-60">
            {saving || uploadingImages ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4" /> Save</>}
          </button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-gold-400">{label}</span>
      {children}
    </label>
  );
}

// seedProductsToDb is provided by the shared product store
