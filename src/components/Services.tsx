'use client';

import React from 'react';
import { SiteContent } from '@/lib/types';

interface ServicesProps {
  content: SiteContent;
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  return (
    <section id="serveis" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ENCAPÇALAMENT DE SECCIÓ */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-vela-red inline-block mb-3">
            CATÀLEG D&apos;ENGINYERIA DIGITAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Solucions digitals sense compromisos tècnics
          </h2>
          <p className="mt-4 text-base sm:text-lg text-vela-text">
            Construïm actius digitals que eleven la percepció de la teva marca i generen facturació previsible.
          </p>
        </div>

        {/* GRAELLA DE SERVEIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {content.services.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between ${
                service.popular
                  ? 'bg-gradient-to-b from-vela-card to-vela-dark border-2 border-vela-gold/40 shadow-[0_0_40px_rgba(255,184,0,0.12)]'
                  : 'bg-vela-surface/70 border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-vela-gold to-yellow-400 text-black text-xs font-bold uppercase tracking-wider shadow-md">
                  Recomanat per a empreses
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-vela-card border border-white/10 flex items-center justify-center text-vela-gold">
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

                <h3 className="text-2xl font-bold text-white mb-2 font-display">{service.title}</h3>
                <p className="text-xs uppercase font-semibold tracking-wider text-vela-gold mb-4">
                  {service.tagline}
                </p>
                <p className="text-sm sm:text-base text-vela-text leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* CARACTERÍSTIQUES TÈCNIQUES */}
                <div className="space-y-3 pt-6 border-t border-white/[0.08] mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-vela-gold flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-vela-light font-normal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contacte"
                className={`w-full py-3.5 rounded-xl text-sm font-bold text-center transition-all block ${
                  service.popular
                    ? 'bg-gradient-to-r from-vela-gold to-amber-400 text-black hover:brightness-110 shadow-lg'
                    : 'bg-vela-card hover:bg-white/[0.08] text-white border border-white/10'
                }`}
              >
                Demanar Informació per a aquest Servei
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs sm:text-sm text-vela-muted max-w-2xl mx-auto">
          {content.pricingNote}
        </div>
      </div>
    </section>
  );
};
