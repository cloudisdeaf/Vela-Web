'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface WhyUsProps {
  content: SiteContent;
}

export const WhyUs: React.FC<WhyUsProps> = ({ content }) => {
  return (
    <section id="per-que-nosaltres" className="py-32 sm:py-40 bg-noir-900 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 sm:mb-28">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
              AVANTATGE COMPETITIU
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
              Per què triar VELA.
            </h2>
          </div>
          <Link
            href="/nosaltres"
            className="mt-6 md:mt-0 text-xs sm:text-sm font-mono text-apple-muted hover:text-white transition-colors flex items-center gap-2 group"
          >
            <span>Llegir manifest d&apos;enginyeria</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.whyUs.map((item, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                  <span className="text-3xl sm:text-4xl font-black font-display text-white">
                    {item.number}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/[0.05] text-apple-silver uppercase tracking-wider border border-white/10">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-xs sm:text-sm text-apple-muted leading-relaxed">{item.description}</p>
              </div>

              <div className="h-0.5 w-8 bg-ferrari-red/40 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
