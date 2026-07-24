import { Link } from 'react-router-dom';
import { ArrowRight, Package, RotateCcw, Truck, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';

export function ShippingReturnsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Customer Care"
        title="Shipping & Returns"
        bilingual="शिपिंग और रिटर्न"
        description="Everything you need to know about delivery, returns, and exchanges."
      />

      <section className="py-16">
        <div className="container-editorial max-w-3xl">
          {/* Highlights */}
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Truck, title: 'Pan-India Shipping', text: 'We ship across India and worldwide.' },
              { icon: Clock, title: 'Fast Processing', text: 'Orders processed in 1–2 business days.' },
              { icon: RotateCcw, title: '7-Day Returns', text: 'Easy returns on unworn pieces.' },
            ].map((h, i) => (
              <SectionReveal key={h.title} delay={i * 0.08}>
                <div className="border border-gold-400/15 bg-burgundy-950/40 p-6 text-center">
                  <h.icon className="mx-auto h-8 w-8 text-gold-400" />
                  <h3 className="mt-3 font-serif text-lg text-ivory-100">{h.title}</h3>
                  <p className="mt-1.5 text-sm text-ivory-100/60">{h.text}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Shipping */}
          <div className="mt-14">
            <SectionReveal>
              <h2 className="font-display text-3xl text-ivory-100">Shipping</h2>
              <OrnamentalDivider className="mt-3 justify-start" />
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ivory-100/70">
                <p><strong className="text-ivory-100">Processing Time:</strong> All orders are processed within 1–2 business days after payment confirmation. You'll receive a confirmation message on WhatsApp once your order is shipped.</p>
                <p><strong className="text-ivory-100">Domestic Shipping (India):</strong> Delivery takes 3–7 business days depending on your location. Shipping costs are shared on WhatsApp at the time of ordering.</p>
                <p><strong className="text-ivory-100">International Shipping:</strong> We ship worldwide. Delivery times and shipping costs are calculated and shared on WhatsApp based on your destination.</p>
                <p><strong className="text-ivory-100">Tracking:</strong> Once shipped, we share a tracking link on WhatsApp. You can also check your order status anytime on the Order Details page using your Order ID.</p>
              </div>
            </SectionReveal>
          </div>

          {/* Returns */}
          <div className="mt-12">
            <SectionReveal>
              <h2 className="font-display text-3xl text-ivory-100">Returns & Exchanges</h2>
              <OrnamentalDivider className="mt-3 justify-start" />
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ivory-100/70">
                <p><strong className="text-ivory-100">7-Day Return Window:</strong> You can return any unworn piece within 7 days of delivery, provided it is in its original condition and packaging.</p>
                <p><strong className="text-ivory-100">How to Initiate a Return:</strong> Message us on WhatsApp with your Order ID and the piece you'd like to return. Our team will guide you through the process.</p>
                <p><strong className="text-ivory-100">Exchanges:</strong> Want a different colour or piece? We're happy to exchange. Reach out on WhatsApp and we'll arrange it.</p>
                <p><strong className="text-ivory-100">Non-Returnable Items:</strong> Custom-made pieces, limited-edition items, and earrings (for hygiene reasons) are non-returnable unless damaged on arrival.</p>
                <p><strong className="text-ivory-100">Damaged on Arrival:</strong> If your piece arrives damaged, please message us on WhatsApp within 48 hours with a photo, and we'll arrange a replacement or refund.</p>
              </div>
            </SectionReveal>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <OrnamentalDivider className="mb-6" />
            <Package className="mx-auto h-8 w-8 text-gold-400" />
            <p className="mt-4 font-serif text-xl text-ivory-100/80">Questions about your order?</p>
            <Link to="/contact" className="btn-gold mt-5">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
