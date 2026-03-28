'use client';

import { motion } from 'motion/react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  /** 'default' = uppercase label, 'accent' = gradient label */
  labelVariant?: 'default' | 'accent';
}

export default function SectionHeader({ label, title, subtitle, centered = true, className = '', labelVariant = 'default' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <div className={`h-1 w-20 rounded-full bg-gradient-to-r from-[var(--bf-accent)] to-[var(--kik-accent)] mb-6 ${centered ? 'mx-auto' : ''}`} />
      )}
      {label && (
        <p className={`mb-3 ${labelVariant === 'accent' ? 'text-3xl sm:text-4xl text-gradient-warm' : 'section-label'}`}>{label}</p>
      )}
      <h2 className="heading-2 text-3xl sm:text-4xl md:text-5xl mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lead max-w-2xl text-slate-600" style={centered ? { margin: '0 auto' } : {}}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
