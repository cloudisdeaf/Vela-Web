'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface HeroProps {
  content: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative min-h-screen pt-36 pb-20 flex flex-col justify-center overflow-hidden">
      {/* GLOWS D'IL·LUMINACIÓ AMBIENTAL LUXE (ROIG & OR METÀL·LIC) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-vela-red/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-vela-gold/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* QUADRÍCULA SUBTIL DE FONS */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10">
        {/* INSÍGNIA D'AUTORITAT */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-vela-card/90 border border-white/10 shadow-[0_0_20px_rgba(255,45,45,0.15)] mb-8 transition-transform hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-vela-red animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
            {content.hero.badge}
          </span>
        </div>

        {/* TITULAR PRINCIPAL DE MÀXIM IMPACTE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08] font-display">
          <span>{content.hero.headlinePart1} </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vela-red via-orange-400 to-vela-gold">
            {content.hero.headlineHighlight}
          </span>
        </h1>

        {/* SUBTITULAR D'AUTORITAT & SEGURETAT */}
        <p className="mt-7 text-lg sm:text-xl text-vela-text max-w-3xl mx-auto leading-relaxed font-normal">
          {content.hero.subheadline}
        </p>

        {/* BOTONS D'ACCIÓ D'ALT TICKET */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href="#contacte"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-black bg-gradient-to-r from-vela-gold via-amber-400 to-yellow-300 hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,184,0,0.35)] flex items-center justify-center gap-2.5"
          >
            <span>{content.hero.ctaPrimary}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <a
            href="#projectes"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white bg-vela-card/70 hover:bg-vela-card border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{content.hero.ctaSecondary}</span>
          </a>
        </div>

        {/* BARRA DE MÈTRIQUES & CONFIANÇA BLINDADA */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-vela-muted mt-1 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
