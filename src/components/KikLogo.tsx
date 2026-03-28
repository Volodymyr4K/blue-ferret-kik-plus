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
    sm: { w: 82, h: 52 },
    md: { w: 144, h: 92 },
    lg: { w: 216, h: 138 },
  };
  const s = sizes[size];

  const logo = (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Image
        src="/logo-kik-greenmark.webp"
        alt="KIK вдома"
        width={s.w}
        height={s.h}
        className="object-contain"
      />
      {variant === 'full' && (
        <span
          className="text-kik text-sm sm:text-base -mt-1 font-medium"
          style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}
        >
          вдома
        </span>
      )}
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
