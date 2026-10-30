'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface WhyUsProps {
  content: SiteContent;
}

export const WhyUs: React.FC<WhyUsProps> = ({ content }) => {
  return (
    <section id="per-que-nosaltres" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-vela-gold inline-block mb-3">
              DIFERENCIAL COMPETITIU
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Per què triar VELA i no una agència convencional
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-vela-muted max-w-md">
            Mentre altres instal·len plantilles feixugues i desapareixen, nosaltres construïm la teva avantatja tecnològica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.whyUs.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-vela-card/70 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-vela-red to-vela-gold font-display">
                    {item.number}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-white/[0.05] text-vela-light uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-sm text-vela-text leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
