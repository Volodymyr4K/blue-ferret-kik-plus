'use client';

import Image from 'next/image';

export default function LogoIcon({
  className = '',
  size = 64,
  light = false,
}: {
  className?: string;
  size?: number;
  light?: boolean;
}) {
  return (
    <Image
      src="/logo-blue-ferret.png"
      alt="Blue Ferret"
      width={size}
      height={size}
      className={`object-contain ${light ? 'brightness-[2] contrast-[1.2]' : 'mix-blend-multiply'} ${className}`}
      priority
      unoptimized
    />
  );
}
