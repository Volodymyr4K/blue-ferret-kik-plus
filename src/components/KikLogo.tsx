'use client';

import Image from 'next/image';
import Link from 'next/link';

interface KikLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact';
  className?: string;
  href?: string | null;
}

export default function KikLogo({ size = 'md', variant = 'full', className = '', href }: KikLogoProps) {
  const sizes = {
    compact: {
      sm: { w: 72, h: 60 },
      md: { w: 122, h: 102 },
      lg: { w: 188, h: 158 },
    },
    full: {
      sm: { w: 96, h: 82 },
      md: { w: 156, h: 132 },
      lg: { w: 224, h: 190 },
    },
  };
  const s = sizes[variant][size];

  const logo = (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo-kik-left-variant.png"
        alt="KIK вдома"
        width={s.w}
        height={s.h}
        className="object-contain"
      />
    </div>
  );

  return href ? (
    <Link href={href} className="inline-block hover:opacity-90 transition-opacity">
      {logo}
    </Link>
  ) : (
    logo
  );
}
