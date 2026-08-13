import { motion } from 'framer-motion';
import { OrnamentalDivider } from './Ornaments';

export function PageHero({
  eyebrow,
  title,
  bilingual,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  bilingual?: string;
  description?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold-400/15 bg-burgundy-950">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover object-[center_-15%] opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/40 via-burgundy-900/60 to-burgundy-950" />
        </div>
      )}
      <div className="bg-jaali absolute inset-0 opacity-40" />
      <div className="container-editorial relative py-20 text-center sm:py-48">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl leading-tight text-ivory-100 sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        {bilingual && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 font-serif text-2xl italic text-gold-300 sm:text-3xl"
          >
            {bilingual}
          </motion.p>
        )}
        <OrnamentalDivider className="mt-6" />
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-ivory-100/70 sm:text-base"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
