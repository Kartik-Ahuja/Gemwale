import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, WHATSAPP_NUMBER } from '@/lib/firebase';
import { PageHero } from '@/components/PageHero';
import { OrnamentalDivider } from '@/components/Ornaments';
import type { Customer } from '@/types';

export function CustomerDetailsPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Customer>({
    full_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pin_code: '',
    country: 'India',
  });

  const set = (k: keyof Customer, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (cart.length === 0 && !loading) {
    return (
      <div>
        <PageHero eyebrow="Checkout" title="Customer Details" />
        <div className="container-editorial py-24 text-center">
          <p className="font-serif text-2xl text-ivory-100/80">Your cart is empty.</p>
          <Link to="/shop" className="btn-gold mt-6">Shop ऑल →</Link>
        </div>
      </div>
    );
  }

  const generateOrderId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 89999);
    return `GW-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const orderId = generateOrderId();

      if (!db) {
        throw new Error('Checkout is currently unavailable because Firebase is not configured.');
      }

      const items = cart.map((i) => ({
        order_id: orderId,
        product_code: i.product_code,
        product_name: i.name,
        colour: i.colour,
        quantity: i.quantity,
        price: i.price,
      }));

      const orderRef = doc(collection(db, 'orders'));
      await setDoc(orderRef, {
        order_id: orderId,
        total: cartTotal,
        order_status: 'WhatsApp Contacted',
        payment_status: 'Pending',
        customers: {
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || null,
          address: form.address,
          city: form.city,
          state: form.state,
          pin_code: form.pin_code,
          country: form.country,
        },
        order_items: items,
        created_at: new Date().toISOString(),
      });

      // 4. Build WhatsApp message
      const itemLines = cart
        .map(
          (i) =>
            `• ${i.name} (${i.product_code})\n   Colour: ${i.colour}\n   Qty: ${i.quantity}\n   Price: ₹${(i.price * i.quantity).toLocaleString('en-IN')}`,
        )
        .join('\n\n');

      const msg = `✨ NEW GEMWALE ORDER REQUEST

ORDER ID:
${orderId}

CUSTOMER DETAILS

Name: ${form.full_name}
Phone: ${form.phone}
Email: ${form.email || '—'}

DELIVERY ADDRESS

Address: ${form.address}
City: ${form.city}
State: ${form.state}
PIN Code: ${form.pin_code}
Country: ${form.country}

ORDER DETAILS

${itemLines}

TOTAL: ₹${cartTotal.toLocaleString('en-IN')}

Please confirm availability and share payment details.`;

      // 5. Open WhatsApp
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.location.href = url;

      // 6. Clear cart and go to success
      clearCart();
      navigate('/order-success', { state: { orderId } });
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setError(err?.message || 'Could not place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Checkout"
        title="Complete Your Order"
        bilingual="ऑर्डर पूरा करें"
        description="Enter your delivery details. We'll save your order and open WhatsApp to confirm."
      />

      <section className="py-12">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name *" required value={form.full_name} onChange={(v) => set('full_name', v)} />
                <Field label="Phone Number *" required type="tel" value={form.phone} onChange={(v) => set('phone', v)} />
                <Field label="Email Address" type="email" value={form.email} onChange={(v) => set('email', v)} />
                <Field label="Country" value={form.country} onChange={(v) => set('country', v)} />
                <div className="sm:col-span-2">
                  <Field label="Address *" required value={form.address} onChange={(v) => set('address', v)} />
                </div>
                <Field label="City *" required value={form.city} onChange={(v) => set('city', v)} />
                <Field label="State *" required value={form.state} onChange={(v) => set('state', v)} />
                <Field label="PIN Code *" required value={form.pin_code} onChange={(v) => set('pin_code', v)} />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 border border-red-400/40 bg-red-950/30 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </motion.p>
              )}

              <button type="submit" disabled={loading} className="btn-gold-solid mt-8 w-full disabled:opacity-60">
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving Order…</>
                ) : (
                  <>Continue to WhatsApp <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-ivory-100/40">
                Your order will be saved and WhatsApp will open with the full order details.
              </p>
            </form>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-gold-400/15 bg-burgundy-950/50 p-6">
                <h3 className="font-serif text-2xl text-ivory-100">Order Summary</h3>
                <OrnamentalDivider className="mt-4 justify-start" />
                <div className="mt-5 space-y-4">
                  {cart.map((i) => (
                    <div key={`${i.product_id}-${i.colour}`} className="flex gap-3">
                      <div className="h-16 w-14 flex-shrink-0 overflow-hidden bg-burgundy-800">
                        <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-sm text-ivory-100">{i.name}</p>
                        <p className="text-[10px] uppercase tracking-widest text-ivory-100/40">{i.colour} · Qty {i.quantity}</p>
                        <p className="text-sm text-gold-300">₹{(i.price * i.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-ivory-100/10 pt-5">
                  <span className="text-xs uppercase tracking-widest text-ivory-100/60">Total</span>
                  <span className="font-serif text-2xl text-gold-300">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-gold-400">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </label>
  );
}
