'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface TestimonialsProps {
  content: SiteContent;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="py-32 sm:py-40 bg-noir-950 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-20 sm:mb-28">
          <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
            VERIFICACIÓ DE MERCAT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
            La veu dels nostres clients.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-apple-muted leading-relaxed">
            Opinions reals de fundadors i directius que van decidir delegar la seva arquitectura web a VELA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="luxury-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-8"
            >
              <div>
                {/* 5 ESTRELLES D'OR SATINAT */}
                <div className="flex items-center gap-1.5 text-gold-satin mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-apple-white leading-relaxed font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">{t.author}</h4>
                  <p className="text-xs text-apple-muted mt-0.5">{t.role} · <span className="text-apple-silver">{t.company}</span></p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Verificat</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
