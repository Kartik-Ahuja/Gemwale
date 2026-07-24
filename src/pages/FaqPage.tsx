import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';

const faqs = [
  { q: 'How do I place an order?', a: "Browse the collection, add pieces to your cart, and proceed to WhatsApp checkout. Enter your delivery details, and we'll save your order and open WhatsApp with all the information. Our salesperson will confirm availability and share payment details." },
  { q: 'Is there an online payment option?', a: "We don't use an online payment gateway. After you place your order via WhatsApp, our salesperson shares a UPI QR code or payment link. You pay directly, and we confirm receipt before processing." },
  { q: 'Which payment methods do you accept?', a: 'We accept UPI (all major apps), bank transfers, and popular digital wallets. Our salesperson will share the exact details on WhatsApp after you place your order.' },
  { q: 'How long does delivery take?', a: 'Orders are typically processed within 1–2 business days after payment confirmation. Delivery takes 3–7 business days depending on your location within India.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. International shipping costs and times are calculated and shared on WhatsApp when you place your order.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day return window for unworn pieces in their original packaging. Custom or limited-edition pieces are non-returnable. Please contact us on WhatsApp to initiate a return.' },
  { q: 'Are your pieces suitable for all ages?', a: "Absolutely. GemWale is designed for every age group — young customers, millennials, Gen Z, and mature customers. No age limit. No style limit. No occasion limit." },
  { q: 'Are bracelets and keychains unisex?', a: 'Yes. Our bracelets and keychains are designed to be worn by anyone. Many of our rings and malas are also unisex. Look for the "Unisex" tag on product pages.' },
  { q: 'How do I care for my jewellery?', a: 'Store pieces in the GemWale pouch provided. Avoid contact with water, perfume, and chemicals. Clean with a soft dry cloth. With care, your jewellery stays beautiful for years.' },
  { q: 'Can I track my order?', a: 'Yes. Use the Order Details page and enter your Order ID (e.g. GW-2026-00001) to view your order status and details at any time.' },
];

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <PageHero
        eyebrow="Help & Support"
        title="FAQ"
        bilingual="सामान्य प्रश्न"
        description="Answers to the questions we hear most. Can't find what you're looking for? Reach out on WhatsApp."
      />

      <section className="py-16">
        <div className="container-editorial max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.03}>
                <div className="border border-gold-400/15 bg-burgundy-950/40">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-serif text-lg text-ivory-100">{faq.q}</span>
                    <span className="flex-shrink-0 text-gold-400">
                      {open === i ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-ivory-100/70">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <OrnamentalDivider className="mb-6" />
            <p className="font-serif text-xl text-ivory-100/80">Still have questions?</p>
            <a href="https://wa.me/919999999999" className="btn-gold mt-5">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  );
}
