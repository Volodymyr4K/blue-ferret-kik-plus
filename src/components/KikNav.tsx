'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, FolderKanban, Info } from 'lucide-react';
import uiContent from '@/data/ui-content';

export default function KikNav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
      pathname === href
        ? 'text-[#4BB272] bg-[#4BB272]/10 font-semibold'
        : 'text-slate-600 hover:text-[#4BB272] hover:bg-[#4BB272]/10'
    }`;

  return (
    <header className="sm:sticky sm:top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-2 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors text-sm font-medium"
            aria-label={uiContent.kikNav.backHomeAria}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Blue Ferret</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/kik/pro-kik" className={linkClass('/kik/pro-kik')}>
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">{uiContent.kikNav.about}</span>
            </Link>
            <Link href="/kik/proekty" className={linkClass('/kik/proekty')}>
              <FolderKanban className="w-4 h-4" />
              <span className="hidden sm:inline">{uiContent.kikNav.projects}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
