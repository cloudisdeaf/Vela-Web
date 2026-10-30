'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface ServicesProps {
  content: SiteContent;
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="serveis" className="py-28 sm:py-36 md:py-40 bg-noir-950/80 relative border-t border-white/[0.08] overflow-hidden">
      {/* GLOW DE FONS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-ferrari-red/10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* ENCAPÇALAMENT EDITORIAL */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ferrari-red"></span>
            DISCIPLINES D&apos;ENGINYERIA PURA
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display text-headline">
            Tecnologia sense compromisos.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-apple-muted leading-relaxed">
            Eliminem tot allò que fa lentes i vulnerables les solucions ordinàries per oferir velocitat extrema i prestigi immediat.
          </p>
        </div>

        {/* GRAELLA EDITORIAL DE SERVEIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {content.services.map((service, index) => (
            <div
              key={service.id}
              className="luxury-card rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.08]">
                  <span className="text-xs font-mono tracking-widest text-apple-muted uppercase font-bold group-hover:text-ferrari-red transition-colors">
                    0{index + 1} //
                  </span>
                  <div className="flex items-center gap-2">
                    {service.popular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-ferrari-red/15 text-ferrari-red border border-ferrari-red/30">
                        Més Sol·licitat
                      </span>
                    )}
                    <span className="text-lg sm:text-2xl font-black font-display text-white">
                      {service.price}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 font-display group-hover:text-apple-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-apple-muted mb-6">
                  {service.tagline}
                </p>
                <p className="text-sm sm:text-base text-apple-silver leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* DETALLS TÈCNICS */}
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-apple-silver">
                      <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <Link
                  href="/contacte"
                  className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-center text-white bg-white/[0.06] hover:bg-ferrari-red transition-all duration-300 block shadow-md group-hover:shadow-[0_0_20px_rgba(255,30,22,0.3)]"
                >
                  Demanar Proposta per a {service.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
