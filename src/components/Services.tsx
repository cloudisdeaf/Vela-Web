'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface ServicesProps {
  content: SiteContent;
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="serveis" className="py-32 sm:py-40 bg-noir-950 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* ENCAPÇALAMENT EDITORIAL */}
        <div className="max-w-2xl mb-20 sm:mb-28">
          <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
            CAPACITATS & DISCIPLINES
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
            Tecnologia sense compromisos.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-apple-muted leading-relaxed">
            Eliminem tot allò que fa lentes i vulnerables les solucions ordinàries per oferir rendiment d&apos;elit.
          </p>
        </div>

        {/* GRAELLA EDITORIAL DE SERVEIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {content.services.map((service, index) => (
            <div
              key={service.id}
              className="luxury-card rounded-3xl p-10 sm:p-12 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.06]">
                  <span className="text-xs font-mono tracking-widest text-apple-muted uppercase">
                    0{index + 1}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-display text-white">
                    {service.price}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-display">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-apple-muted mb-6">
                  {service.tagline}
                </p>
                <p className="text-sm sm:text-base text-apple-muted leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* DETALLS TÈCNICS */}
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-apple-silver">
                      <span className="w-1 h-1 rounded-full bg-ferrari-red"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.06]">
                <Link
                  href="/contacte"
                  className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-center text-white bg-white/[0.06] hover:bg-ferrari-red transition-all duration-300 block"
                >
                  Demanar Proposta
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
