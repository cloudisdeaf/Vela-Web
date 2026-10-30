'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface SecurityGuaranteeProps {
  content: SiteContent;
}

export const SecurityGuarantee: React.FC<SecurityGuaranteeProps> = ({ content }) => {
  return (
    <section id="garantia" className="py-24 sm:py-32 relative bg-vela-dark/60 border-y border-white/[0.06]">
      {/* GLOW DE PROTECCIÓ EN SEGUNDO PLANO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>{content.securityGuarantee.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            {content.securityGuarantee.headline}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-vela-text">
            {content.securityGuarantee.subheadline}
          </p>
        </div>

        {/* GRAELLA DELS 4 ESCUTS DE SEGURETAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.securityGuarantee.points.map((pt, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-vela-card/50 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-display">
                    {pt.title}
                  </h3>
                  <p className="text-sm sm:text-base text-vela-text leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DISTINTIU D'AUDITORIA LEGAL */}
        <div className="mt-12 p-6 rounded-2xl bg-vela-surface/50 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-vela-gold/10 border border-vela-gold/20 flex items-center justify-center text-vela-gold flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dret d&apos;informació i protecció del client</h4>
              <p className="text-xs text-vela-muted">
                Contracte mercantil transparent amb terminis d&apos;execució i clàusules de penalització a favor teu.
              </p>
            </div>
          </div>

          <a
            href="#contacte"
            className="text-xs font-semibold text-vela-gold hover:text-white transition-colors underline whitespace-nowrap"
          >
            Demanar model d&apos;acord NDA →
          </a>
        </div>
      </div>
    </section>
  );
};
