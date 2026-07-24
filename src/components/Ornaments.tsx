import { motion } from 'framer-motion';

export function JharokhaArch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 280" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M100 4C45 4 8 48 8 108v168h184V108C192 48 155 4 100 4Z" />
      <path d="M100 28C58 28 28 62 28 112v164h144V112C172 62 142 28 100 28Z" opacity="0.5" />
      <path d="M100 8v260M8 140h184M20 200h160" opacity="0.25" />
      <circle cx="100" cy="60" r="14" opacity="0.4" />
      <path d="M86 60h28M100 46v28" opacity="0.3" />
    </svg>
  );
}

export function JaaliPattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="30" cy="30" r="20" />
      <circle cx="70" cy="30" r="20" />
      <circle cx="30" cy="70" r="20" />
      <circle cx="70" cy="70" r="20" />
      <circle cx="50" cy="50" r="20" />
      <circle cx="90" cy="70" r="20" />
      <circle cx="70" cy="90" r="20" />
      <circle cx="90" cy="90" r="20" />
    </svg>
  );
}

export function PeacockCurve({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M10 110C40 40 120 20 150 70" />
      <path d="M150 70c-8-4-14-2-18 4M150 70c-2-8 2-14 10-16" />
      <circle cx="40" cy="50" r="3" />
      <circle cx="70" cy="40" r="3" />
      <circle cx="100" cy="42" r="3" />
      <circle cx="125" cy="55" r="3" />
    </svg>
  );
}

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold-400" fill="currentColor">
        <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
      </svg>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  );
}

export function FloatingMotif({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute text-gold-400/15 ${className}`}
      animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
