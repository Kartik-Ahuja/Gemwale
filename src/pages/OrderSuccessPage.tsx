import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/firebase';
import { OrnamentalDivider } from '@/components/Ornaments';

export function OrderSuccessPage() {
  const location = useLocation();
  const orderId = (location.state as { orderId?: string } | null)?.orderId;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-20">
      <div className="bg-jaali absolute inset-0 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-lg border border-gold-400/20 bg-burgundy-950/60 p-10 text-center backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold-400 bg-gold-400/10"
        >
          <Check className="h-8 w-8 text-gold-300" />
        </motion.div>

        <h1 className="mt-6 font-display text-4xl text-ivory-100">Order Placed!</h1>
        <OrnamentalDivider className="mt-4" />

        {orderId && (
          <p className="mt-5 text-sm text-ivory-100/70">
            Your Order ID is
          </p>
        )}
        {orderId && (
          <p className="mt-1 font-serif text-2xl text-gold-300">{orderId}</p>
        )}

        <p className="mt-5 text-sm leading-relaxed text-ivory-100/70">
          We've opened WhatsApp with your complete order details. Our salesperson will confirm
          availability and share payment instructions shortly.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-solid"
          >
            <MessageCircle className="h-4 w-4" /> Open WhatsApp
          </a>
          <Link to="/shop" className="btn-outline">Continue Shopping</Link>
        </div>

        <Link
          to={orderId ? `/order-details?id=${orderId}` : '/order-details'}
          className="mt-6 inline-block text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200"
        >
          View Order Details →
        </Link>
      </motion.div>
    </div>
  );
}
