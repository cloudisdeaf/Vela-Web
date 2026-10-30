'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface ServicesProps {
  content: SiteContent;
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="serveis" className="py-28 sm:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCAPÇALAMENT DE SECCIÓ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-cyan inline-block mb-3">
              SERVEIS PRINCIPALS D&apos;ENGINYERIA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Solucions digitals sense limitacions tècniques
            </h2>
          </div>
          <Link
            href="/serveis"
            className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-cyber-crimson hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <span>Veure catàleg complet & detalls</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* GRAELLA DE SERVEIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.services.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between glass-panel group hover:border-white/20 ${
                service.popular
                  ? 'border-cyber-crimson/40 shadow-[0_0_40px_rgba(255,30,86,0.12)]'
                  : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyber-crimson to-cyber-amber text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                  SOLUCIÓ RECOMANADA
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-space-800 border border-white/10 flex items-center justify-center text-cyber-cyan group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.75}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-white font-display">
                    {service.price}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1.5 font-display group-hover:text-cyber-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-cyber-amber mb-4">
                  {service.tagline}
                </p>
                <p className="text-sm text-titanium-400 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CARACTERÍSTIQUES TÈCNIQUES */}
                <div className="space-y-3 pt-6 border-t border-white/[0.06] mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs sm:text-sm text-titanium-300 font-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/contacte"
                  className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all block ${
                    service.popular
                      ? 'bg-gradient-to-r from-cyber-crimson via-cyber-coral to-cyber-amber text-white hover:brightness-110 shadow-lg'
                      : 'bg-space-800 hover:bg-space-700 text-white border border-white/10'
                  }`}
                >
                  Demanar Proposta
                </Link>
                <Link
                  href="/serveis"
                  className="px-4 py-3.5 rounded-xl text-xs font-mono text-titanium-400 hover:text-white glass-pill"
                >
                  Detalls →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
