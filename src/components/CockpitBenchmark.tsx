'use client';

import React, { useState } from 'react';

export const CockpitBenchmark: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'velocitat' | 'seguretat' | 'sobirania'>('velocitat');

  const benchmarks = {
    velocitat: {
      title: 'Velocitat & Core Web Vitals',
      velaScore: '0.4s',
      velaLabel: 'Carrega instantània (Next.js 14 + Edge CDN)',
      genericScore: '4.8s',
      genericLabel: 'Plantilla WordPress saturada de plugins',
      velaMetrics: [
        { label: 'First Contentful Paint (FCP)', val: '0.2s', status: 'optimal' },
        { label: 'Largest Contentful Paint (LCP)', val: '0.5s', status: 'optimal' },
        { label: 'Cumulative Layout Shift (CLS)', val: '0.00', status: 'optimal' },
      ],
      genericMetrics: [
        { label: 'First Contentful Paint (FCP)', val: '2.4s', status: 'poor' },
        { label: 'Largest Contentful Paint (LCP)', val: '4.8s', status: 'poor' },
        { label: 'Cumulative Layout Shift (CLS)', val: '0.38', status: 'poor' },
      ],
    },
    seguretat: {
      title: 'Blindatge & Ciberseguretat',
      velaScore: 'A+ 100/100',
      velaLabel: 'Zero vulnerabilitats OWASP, arquitectura estàtica serverless',
      genericScore: 'Risc Alt',
      genericLabel: 'Plugins desactualitzats i forats de seguretat PHP',
      velaMetrics: [
        { label: 'Content Security Policy (CSP)', val: 'Estricte', status: 'optimal' },
        { label: 'HSTS Preload (2 anys)', val: 'Activat', status: 'optimal' },
        { label: 'Prevenció d\'atacs XSS & CSRF', val: '100% Sanititzat', status: 'optimal' },
      ],
      genericMetrics: [
        { label: 'Content Security Policy (CSP)', val: 'Inexistent', status: 'poor' },
        { label: 'HSTS Preload', val: 'Desactivat', status: 'poor' },
        { label: 'Prevenció d\'atacs XSS & CSRF', val: 'Vulnerable a bots', status: 'poor' },
      ],
    },
    sobirania: {
      title: 'Propietat & Drets del Codi',
      velaScore: '100% Teu',
      velaLabel: 'Codi font, domini i base de dades lliurats sense quotes',
      genericScore: 'Segrestat',
      genericLabel: 'Quotes mensuals obligatòries o pèrdua de la web',
      velaMetrics: [
        { label: 'Titularitat del Domini', val: '100% al teu nom', status: 'optimal' },
        { label: 'Repositori GitHub', val: 'Propietat exclusiva', status: 'optimal' },
        { label: 'Permanència obligatòria', val: '0 mesos (Llibertat)', status: 'optimal' },
      ],
      genericMetrics: [
        { label: 'Titularitat del Domini', val: 'Retingut per l\'agència', status: 'poor' },
        { label: 'Repositori GitHub', val: 'Codi tancat', status: 'poor' },
        { label: 'Permanència obligatòria', val: 'Contractes de rescabalament', status: 'poor' },
      ],
    },
  };

  const current = benchmarks[activeTab];

  return (
    <section className="py-32 sm:py-40 bg-noir-900 border-t border-white/[0.06] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
              TELEMÈTRIA & RENDIMENT COMPARAT
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
              Enginyeria d&apos;elit vs. Plantilles ordinàries.
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-1.5 p-1 rounded-full bg-noir-850 border border-white/10 text-xs font-mono">
            {(['velocitat', 'seguretat', 'sobirania'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-ferrari-red text-white font-semibold shadow-[0_0_15px_rgba(225,6,0,0.4)]'
                    : 'text-apple-muted hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* COMPARADOR ESTIL COCKPIT / FERRARI TELEMETRY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COSTAT VELA */}
          <div className="luxury-card rounded-3xl p-8 sm:p-12 border border-ferrari-red/30 shadow-[0_0_40px_rgba(225,6,0,0.08)] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-ferrari-red text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              ESTÀNDARD VELA
            </div>

            <div>
              <span className="text-xs font-mono text-apple-muted uppercase tracking-wider block mb-2">
                Arquitectura Next.js App Router
              </span>
              <div className="text-5xl sm:text-7xl font-black font-display text-white tracking-tight mb-2">
                {current.velaScore}
              </div>
              <p className="text-sm text-apple-silver leading-relaxed mb-8">
                {current.velaLabel}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                {current.velaMetrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-apple-muted">{m.label}</span>
                    <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-emerald-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Garantit per contracte mercantil vinculant</span>
            </div>
          </div>

          {/* COSTAT CONVENCIONAL */}
          <div className="luxury-card rounded-3xl p-8 sm:p-12 opacity-80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-apple-muted uppercase tracking-wider block mb-2">
                Agències Tradicionals & Plantilles
              </span>
              <div className="text-5xl sm:text-7xl font-black font-display text-apple-muted tracking-tight mb-2 line-through decoration-ferrari-red/50">
                {current.genericScore}
              </div>
              <p className="text-sm text-apple-muted leading-relaxed mb-8">
                {current.genericLabel}
              </p>

              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                {current.genericMetrics.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-apple-dark">{m.label}</span>
                    <span className="font-mono text-apple-muted flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-apple-dark"></span>
                      {m.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-apple-dark">
              <span>Risc d&apos;abandó de clients i pèrdua de posicionament a Google</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
