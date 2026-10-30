'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface HeroProps {
  content: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const marqueeItems = [
    'NEXT.JS 14 ARQUITECTURA',
    'ZERO PLANTILLES PREFABRICADES',
    'SEGURETAT OWASP TOP 10',
    'CORE WEB VITALS 100/100',
    'BOTS WHATSAPP AMB IA',
    'CONTRACTES BLINDATS AMB NDA',
    'MANRESA & EL BAGES',
    'VELOCITAT INFERIOR A 1S',
  ];

  return (
    <section className="relative min-h-[92vh] pt-36 sm:pt-44 pb-16 flex flex-col justify-between overflow-hidden tech-grid">
      {/* IL·LUMINACIÓ HOLOGRÀFICA AMBIENTAL */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[400px] glow-orb-crimson rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] glow-orb-cyan rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] glow-orb-violet rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center relative z-10 my-auto">
        {/* INSÍGNIA TECNOLÒGICA AMB RADAR ACTIU */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-pill mb-8 transition-all hover:scale-105 border border-cyber-crimson/30 shadow-[0_0_20px_rgba(255,30,86,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-crimson opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-crimson"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-titanium-200">
            {content.hero.badge}
          </span>
        </div>

        {/* TITULAR PRINCIPAL FUTURISTA DE GRAN IMPACTE */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.06] font-display">
          <span>{content.hero.headlinePart1} </span>
          <span className="text-gradient-crimson block sm:inline">
            {content.hero.headlineHighlight}
          </span>
        </h1>

        {/* SUBTITULAR ELEVANT EL TO D'AUTORITAT */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl text-titanium-400 max-w-3xl mx-auto leading-relaxed font-normal text-balance">
          {content.hero.subheadline}
        </p>

        {/* BOTONS D'ACCIÓ HOLOGRÀFICS D'ALT TICKET */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <Link
            href="/contacte"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson via-cyber-coral to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_35px_rgba(255,30,86,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Sol·licitar Proposta Confidencial</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            href="/projectes"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white glass-pill hover:bg-white/[0.08] transition-all flex items-center justify-center gap-2"
          >
            <span>Explorar Projectes Reals</span>
          </Link>
        </div>

        {/* MÈTRIQUES DE SISTEMA */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-gradient-silver">
                {stat.value}
              </span>
              <span className="text-xs font-mono text-titanium-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE INFINIT DE TECNOLOGIES I NIVELL DE SERVEI */}
      <div className="w-full overflow-hidden border-y border-white/[0.06] bg-space-900/80 py-4 mt-16 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-6 gap-3 text-xs font-mono uppercase tracking-widest text-titanium-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-crimson"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
