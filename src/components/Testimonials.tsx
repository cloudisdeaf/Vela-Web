'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface TestimonialsProps {
  content: SiteContent;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-vela-red inline-block mb-3">
            AVAL DE MERCAT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            La veu dels líders empresarials
          </h2>
          <p className="mt-4 text-base sm:text-lg text-vela-text">
            Opinions verificades de directius i empresaris que van confiar la seva reputació a VELA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-vela-card/60 border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* 5 ESTRELLES */}
                <div className="flex items-center gap-1 text-vela-gold mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-vela-light leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="text-sm font-bold text-white">{t.author}</h4>
                <p className="text-xs text-vela-muted">{t.role} · <span className="text-white/80">{t.company}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
