'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface PortfolioProps {
  content: SiteContent;
}

export const Portfolio: React.FC<PortfolioProps> = ({ content }) => {
  return (
    <section id="projectes" className="py-28 sm:py-36 relative tech-grid-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyber-crimson inline-block mb-3">
              OBRA SELECCIONADA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight">
              Plataformes que generen negoci real
            </h2>
          </div>
          <Link
            href="/projectes"
            className="mt-4 md:mt-0 text-xs sm:text-sm font-mono text-cyber-cyan hover:text-white transition-colors flex items-center gap-1.5 font-bold"
          >
            <span>Explorar tots els projectes</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.portfolio.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl overflow-hidden glass-panel hover:border-white/20 transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-space-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent opacity-90" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-void/80 backdrop-blur-md text-[11px] font-mono text-white border border-white/10 uppercase tracking-wider">
                    {project.client}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-lg bg-cyber-crimson text-white text-xs font-bold font-display shadow-lg">
                    {project.metric}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">{project.title}</h3>
                  <p className="text-sm text-titanium-400 leading-relaxed mt-2">{project.description}</p>
                </div>

                <Link
                  href="/contacte"
                  className="text-xs font-mono font-bold text-white group-hover:text-cyber-cyan transition-colors inline-flex items-center gap-1.5 pt-4 border-t border-white/[0.06]"
                >
                  <span>Demanar una arquitectura semblant</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
