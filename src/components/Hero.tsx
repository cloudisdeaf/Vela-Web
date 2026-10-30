'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface HeroProps {
  content: SiteContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [rpmValue, setRpmValue] = useState(0);

  // Animació inicial de pujada de revolucions (estil Ferrari tachometer)
  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 1200;
    const intervalTime = 20;
    const step = (end / (duration / intervalTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setRpmValue(end);
        clearInterval(timer);
      } else {
        setRpmValue(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-36 sm:pt-44 md:pt-48 pb-16 sm:pb-24 flex flex-col justify-between overflow-hidden spotlight-red">
      {/* AURA DE LLUM ANIMADA DE FONS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] md:w-[900px] h-[350px] sm:h-[600px] rounded-full bg-ferrari-red/15 blur-[120px] pointer-events-none aura-glow" />
      <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 w-full text-center relative z-10 my-auto">
        {/* INSÍGNIA MONOCROMÀTICA D'ÉLITE AMB RADAR ACTIU */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 bg-noir-850/80 backdrop-blur-xl mb-8 sm:mb-10 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,30,22,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ferrari-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ferrari-red"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-apple-silver uppercase font-semibold">
            ESTUDI D&apos;ENGINYERIA WEB · MANRESA
          </span>
        </div>

        {/* TITULAR ESCULPÍRIC AMB EFECTE METÀL·LIC APPLE SHIMMER */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-headline max-w-5xl mx-auto font-display tracking-tight leading-[1.08]">
          Enginyeria web.{' '}
          <span className="text-shimmer block sm:inline">
            Sensació de poder.
          </span>
        </h1>

        {/* SUBTITULAR CONTEXTUALITZAT */}
        <p className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-apple-muted max-w-2xl mx-auto font-normal leading-relaxed text-balance px-2">
          Construïm plataformes que projecten autoritat indiscutible. Sense plantilles ordinàries, amb velocitat extrema i codi 100% en propietat.
        </p>

        {/* BOTONS D'ACCIÓ VIBRANTS */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
          <Link
            href="/contacte"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white btn-ferrari-glow flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Sol·licitar Proposta Confidencial</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="/projectes"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold text-apple-white hover:text-white border border-white/15 hover:border-white/30 bg-noir-850/60 backdrop-blur-xl transition-all"
          >
            Explorar Obra & Casos
          </Link>
        </div>

        {/* TELEMETRIA EN VIU FERRARI (TACHOMETER REVS) */}
        <div className="mt-16 sm:mt-20 max-w-xl mx-auto p-4 sm:p-6 rounded-3xl bg-noir-900/80 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between text-xs font-mono text-apple-muted mb-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ferrari-red animate-pulse"></span>
              <span>TELEMETRIA DE RENDIMENT</span>
            </span>
            <span className="text-white font-bold">{rpmValue}/100 OPTIMAL</span>
          </div>

          {/* BARRA DE VELOCITAT LED ESTIL FERRARI */}
          <div className="w-full h-3 bg-noir-950 rounded-full overflow-hidden p-0.5 border border-white/10 flex gap-1">
            {[...Array(20)].map((_, idx) => {
              const activeCount = Math.floor((rpmValue / 100) * 20);
              const isActive = idx < activeCount;
              const isRedLine = idx >= 15;
              return (
                <div
                  key={idx}
                  className={`flex-1 rounded-sm transition-all duration-300 ${
                    isActive
                      ? isRedLine
                        ? 'bg-ferrari-red shadow-[0_0_8px_rgba(255,30,22,0.8)]'
                        : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : 'bg-white/10'
                  }`}
                />
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-apple-muted">
            <span>TEMPS DE RESPOSTA &lt; 0.3s</span>
            <span>GOOGLE CORE WEB VITALS 100%</span>
            <span>XIFRATGE TLS 1.3</span>
          </div>
        </div>

        {/* MÈTRIQUES ESCULPÍRIQUES */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {content.hero.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left p-2 rounded-2xl bg-noir-900/40 border border-white/[0.04]">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-apple-muted mt-1.5 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
