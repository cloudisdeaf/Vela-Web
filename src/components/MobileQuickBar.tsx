'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface MobileQuickBarProps {
  content: SiteContent;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ content }) => {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-fade-in">
      <div className="p-2 rounded-2xl bg-noir-900/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2">
        <a
          href={content.brand.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 border border-white/10 text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>WhatsApp</span>
        </a>

        <Link
          href="/contacte"
          className="flex-[1.5] py-3 px-4 rounded-xl bg-ferrari-red hover:bg-ferrari-dark active:scale-95 text-white text-center text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,30,22,0.4)] transition-all flex items-center justify-center gap-1.5"
        >
          <span>Sol·licitar Proposta</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};
