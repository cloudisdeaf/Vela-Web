'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface HeroProps {
  content: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative min-h-[95vh] pt-40 sm:pt-48 pb-20 flex flex-col justify-between overflow-hidden bg-noir-950 spotlight-red">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full text-center relative z-10 my-auto">
        {/* INSÍGNIA MONOCROMÀTICA D'ÉLITE */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-noir-900/80 mb-10 transition-transform hover:scale-105">
          <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
          <span className="text-[11px] font-mono tracking-widest text-apple-silver uppercase">
            ESTUDI D&apos;ENGINYERIA WEB · MANRESA
          </span>
        </div>

        {/* TITULAR ESCULPÍRIC ESTIL APPLE / FERRARI */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white text-apple-headline max-w-5xl mx-auto font-display">
          Enginyeria web.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-apple-silver to-apple-muted block sm:inline">
            Sensació de poder.
          </span>
        </h1>

        {/* SUBTITULAR CONTEXTUALITZAT AMB ESPAI */}
        <p className="mt-8 sm:mt-10 text-lg sm:text-2xl text-apple-muted max-w-2xl mx-auto font-normal leading-relaxed text-balance">
          Construïm plataformes que projecten autoritat indiscutible. Sense plantilles ordinàries, amb velocitat extrema i codi 100% en propietat.
        </p>

        {/* BOTONS D'ACCIÓ NETS I CONTUNDENTS */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/contacte"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(225,6,0,0.3)] flex items-center justify-center gap-2"
          >
            <span>Sol·licitar Proposta Confidencial</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/projectes"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-medium text-apple-white hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all"
          >
            Explorar Obra & Casos
          </Link>
        </div>

        {/* MÈTRIQUES ESCULPÍRIQUES */}
        <div className="mt-24 pt-12 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-apple-muted mt-2 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
