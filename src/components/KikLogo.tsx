'use client';

import Image from 'next/image';
import Link from 'next/link';
import uiContent from '@/data/ui-content';

interface KikLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'compact';
  className?: string;
  href?: string | null;
}

export default function KikLogo({ size = 'md', variant = 'full', className = '', href }: KikLogoProps) {
  const sizes = {
    compact: {
      sm: { w: 126, h: 50 },
      md: { w: 176, h: 70 },
      lg: { w: 228, h: 90 },
    },
    full: {
      sm: { w: 164, h: 64 },
      md: { w: 236, h: 92 },
      lg: { w: 328, h: 128 },
    },
  };
  const s = sizes[variant][size];

  const logo = (
    <div className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/kik/logo-kik-horizontal.png"
        alt={uiContent.branding.kikLogoAlt}
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
