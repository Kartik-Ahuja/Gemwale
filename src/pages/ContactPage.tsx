import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, OrnamentalDivider } from '@/components/Ornaments';
import { WHATSAPP_NUMBER } from '@/lib/firebase';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const msg = `✨ GEMWALE CONTACT\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        bilingual="संपर्क करें"
        description="Questions about a piece, a custom request, or just want to say hello? We'd love to hear from you."
      />

      <section className="py-16">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <SectionReveal>
                <h2 className="font-display text-3xl text-ivory-100 sm:text-4xl">Let's Talk</h2>
                <OrnamentalDivider className="mt-4 justify-start" />
                <p className="mt-5 max-w-md text-base leading-relaxed text-ivory-100/70">
                  Reach out via WhatsApp, email, or the form. Our team responds within 24 hours.
                </p>

                <div className="mt-8 space-y-5">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center gap-4 group">
                    <div className="grid h-12 w-12 place-items-center border border-gold-400/30 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-burgundy-900">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">WhatsApp / Phone</p>
                      <p className="text-sm text-ivory-100">+91 99999 99999</p>
                    </div>
                  </a>
                  <a href="mailto:hello@gemwale.com" className="flex items-center gap-4 group">
                    <div className="grid h-12 w-12 place-items-center border border-gold-400/30 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-burgundy-900">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Email</p>
                      <p className="text-sm text-ivory-100">hello@gemwale.com</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center border border-gold-400/30 text-gold-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold-400">Studio</p>
                      <p className="text-sm text-ivory-100">Jaipur, Rajasthan, India</p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Form */}
            <div>
              <SectionReveal delay={0.1}>
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center border border-gold-400/20 bg-burgundy-950/50 p-10 text-center"
                  >
                    <Send className="h-10 w-10 text-gold-400" />
                    <p className="mt-5 font-serif text-2xl text-ivory-100">Message Sent!</p>
                    <p className="mt-2 text-sm text-ivory-100/60">We've opened WhatsApp with your message. Talk soon!</p>
                    <button onClick={() => setSent(false)} className="btn-outline mt-6">Send Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="border border-gold-400/15 bg-burgundy-950/40 p-6 sm:p-8">
                    <h3 className="font-serif text-2xl text-ivory-100">Send a Message</h3>
                    <OrnamentalDivider className="mt-3 justify-start" />
                    <div className="mt-6 space-y-5">
                      <label className="block">
                        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-gold-400">Name *</span>
                        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-gold-400">Email</span>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-[10px] uppercase tracking-[0.25em] text-gold-400">Message *</span>
                        <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" />
                      </label>
                      <button type="submit" disabled={loading} className="btn-gold-solid w-full disabled:opacity-60">
                        {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send via WhatsApp <Send className="h-4 w-4" /></>}
                      </button>
                    </div>
                  </form>
                )}
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
