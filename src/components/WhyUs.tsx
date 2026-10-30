'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface WhyUsProps {
  content: SiteContent;
}

export const WhyUs: React.FC<WhyUsProps> = ({ content }) => {
  return (
    <section id="per-que-nosaltres" className="py-28 sm:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-amber inline-block mb-3">
              AVANTATGE COMPETITIU
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Per què triar VELA i no una agència convencional
            </h2>
          </div>
          <Link
            href="/nosaltres"
            className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-cyber-cyan hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <span>Llegir el nostre manifest complet</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.whyUs.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-black font-display text-gradient-crimson">
                    {item.number}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-space-800 text-titanium-300 uppercase tracking-wider border border-white/[0.08]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-sm text-titanium-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
