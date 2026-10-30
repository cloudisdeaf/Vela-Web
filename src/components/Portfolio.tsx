'use client';

import React from 'react';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';

interface PortfolioProps {
  content: SiteContent;
}

export const Portfolio: React.FC<PortfolioProps> = ({ content }) => {
  return (
    <section id="projectes" className="py-24 sm:py-32 relative bg-vela-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-vela-gold inline-block mb-3">
            PORTFOLI SELECCIONAT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
            Casos d&apos;èxit i arquitectura d&apos;autor
          </h2>
          <p className="mt-4 text-base sm:text-lg text-vela-text">
            Un tast de projectes dissenyats per dominar els seus respectius sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.portfolio.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-vela-card border border-white/[0.08] hover:border-white/20 transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-vela-surface">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vela-card via-transparent to-transparent opacity-90" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10 uppercase tracking-wider">
                    {project.client}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-md bg-vela-red text-white text-xs font-bold shadow-lg">
                    {project.metric}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-medium text-vela-gold uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 font-display">{project.title}</h3>
                  <p className="text-sm text-vela-text leading-relaxed mb-6">{project.description}</p>
                </div>

                <a
                  href="#contacte"
                  className="text-xs font-bold text-white group-hover:text-vela-gold transition-colors inline-flex items-center gap-1.5 pt-4 border-t border-white/[0.06]"
                >
                  <span>Demanar una solució semblant</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
