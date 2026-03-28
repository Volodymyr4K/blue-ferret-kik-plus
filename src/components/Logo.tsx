'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import LogoIcon from './LogoIcon';

type LogoProps = {
  variant?: 'full' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  light?: boolean;
};

const SIZES = {
  sm: { circle: 44, icon: 32 },
  md: { circle: 56, icon: 44 },
  lg: { circle: 72, icon: 58 },
};

export default function Logo({ variant = 'full', size = 'md', className = '', light = false }: LogoProps) {
  const { circle, icon } = SIZES[size];
  const logoMark = (
    <motion.div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: circle, height: circle }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <LogoIcon size={icon} className="flex-shrink-0" light={light} />
    </motion.div>
  );

  if (variant === 'icon') {
    return (
      <Link href="/" className={`inline-block ${className}`} aria-label="Blue Ferret — головна">
        {logoMark}
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group ${className}`}
      aria-label="Blue Ferret — головна"
    >
      {logoMark}
      {variant === 'full' && (
        <div className="hidden sm:block">
          <span
            className={`font-bold text-lg block tracking-tight transition-colors duration-300 ${
              light ? 'text-white group-hover:text-[#009FE3]' : 'text-slate-900 group-hover:text-bf'
            }`}
          >
            BLUE FERRET
          </span>
          <span
            className={`text-[11px] font-medium tracking-widest uppercase ${
              light ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            видавництво
          </span>
        </div>
      )}
    </Link>
  );
}
