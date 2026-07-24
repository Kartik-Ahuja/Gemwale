import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Package, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PageHero } from '@/components/PageHero';
import { OrnamentalDivider } from '@/components/Ornaments';

interface OrderRow {
  order_id: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
  customers: { full_name: string; phone: string; address: string; city: string; state: string; pin_code: string; country: string } | null;
  order_items: { product_name: string; product_code: string; colour: string; quantity: number; price: number }[];
}

export function OrderDetailsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('id') || '');
  const [searched, setSearched] = useState(params.get('id') || '');
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          order_id, total, order_status, payment_status, created_at,
          customers ( full_name, phone, address, city, state, pin_code, country ),
          order_items ( product_name, product_code, colour, quantity, price )
        `)
        .eq('order_id', id.trim())
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        setError('No order found with that ID. Please check and try again.');
      } else {
        setOrder(data as unknown as OrderRow);
      }
    } catch {
      setError('Could not look up the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searched) search(searched);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="Track Your Order"
        title="Order Details"
        bilingual="ऑर्डर विवरण"
        description="Enter your Order ID to view your order status and details."
      />

      <section className="py-12">
        <div className="container-editorial max-w-2xl">
          {/* Search */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSearched(query); search(query); }}
            className="flex gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory-100/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. GW-2026-00001"
                className="input-field pl-10"
              />
            </div>
            <button type="submit" className="btn-gold-solid">Track</button>
          </form>

          {loading && (
            <div className="py-20 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-gold-400" />
              <p className="mt-3 text-sm text-ivory-100/60">Looking up your order…</p>
            </div>
          )}

          {error && (
            <div className="mt-6 border border-gold-400/20 bg-burgundy-950/50 p-6 text-center">
              <p className="text-sm text-ivory-100/70">{error}</p>
            </div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 border border-gold-400/15 bg-burgundy-950/50 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">Order ID</p>
                  <p className="font-serif text-2xl text-ivory-100">{order.order_id}</p>
                </div>
                <Package className="h-8 w-8 text-gold-400/50" />
              </div>
              <OrnamentalDivider className="my-5 justify-start" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Order Status</p>
                  <p className="mt-1 text-sm text-ivory-100">{order.order_status}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Payment Status</p>
                  <p className="mt-1 text-sm text-ivory-100">{order.payment_status}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Order Date</p>
                  <p className="mt-1 text-sm text-ivory-100">
                    {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {order.customers && (
                <div className="mt-6 border-t border-ivory-100/10 pt-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Delivery Address</p>
                  <p className="mt-1 text-sm text-ivory-100/80">{order.customers.full_name} · {order.customers.phone}</p>
                  <p className="text-sm text-ivory-100/70">{order.customers.address}</p>
                  <p className="text-sm text-ivory-100/70">{order.customers.city}, {order.customers.state} - {order.customers.pin_code}</p>
                  <p className="text-sm text-ivory-100/70">{order.customers.country}</p>
                </div>
              )}

              <div className="mt-6 border-t border-ivory-100/10 pt-5">
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold-400">Items</p>
                <div className="space-y-3">
                  {order.order_items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div>
                        <p className="text-ivory-100">{item.product_name}</p>
                        <p className="text-[11px] uppercase tracking-widest text-ivory-100/40">
                          {item.product_code} · {item.colour} · Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-gold-300">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-ivory-100/10 pt-5">
                <span className="text-xs uppercase tracking-widest text-ivory-100/60">Total</span>
                <span className="font-serif text-2xl text-gold-300">₹{Number(order.total).toLocaleString('en-IN')}</span>
              </div>
            </motion.div>
          )}

          {!loading && !order && !error && (
            <div className="mt-8 text-center text-sm text-ivory-100/50">
              Enter your Order ID above to track your order.
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/shop" className="text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">
              Continue Shopping →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
