'use client';

import React from 'react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface SecurityGuaranteeProps {
  content: SiteContent;
}

export const SecurityGuarantee: React.FC<SecurityGuaranteeProps> = ({ content }) => {
  return (
    <section id="garantia" className="py-32 sm:py-40 bg-noir-900 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20 sm:mb-28">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 font-semibold">
            STANDARDS DE CONFIDENCIALITAT & SEGURETAT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
            {content.securityGuarantee.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-apple-muted leading-relaxed">
            {content.securityGuarantee.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {content.securityGuarantee.points.map((pt, i) => (
            <div
              key={i}
              className="luxury-card rounded-3xl p-10 sm:p-12 space-y-4"
            >
              <span className="text-xs font-mono text-apple-muted tracking-widest">
                PROTOCOL 0{i + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {pt.title}
              </h3>
              <p className="text-sm text-apple-muted leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Acord de Confidencialitat (NDA) des del primer minut</h4>
            <p className="text-xs text-apple-muted">Signem acords legals abans de conèixer cap dada sensible del teu negoci.</p>
          </div>
          <Link
            href="/seguretat"
            className="px-6 py-3 rounded-full text-xs font-semibold text-white border border-white/10 hover:border-white/30 transition-all whitespace-nowrap"
          >
            Veure Marc Jurídic Complert
          </Link>
        </div>
      </div>
    </section>
  );
};
