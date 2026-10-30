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
    <section id="projectes" className="py-32 sm:py-40 bg-noir-950 border-t border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 sm:mb-28">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
              OBRA SELECCIONADA
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display text-apple-headline">
              Rendiment demostrat.
            </h2>
          </div>
          <Link
            href="/projectes"
            className="mt-6 md:mt-0 text-xs sm:text-sm font-mono text-apple-muted hover:text-white transition-colors"
          >
            Veure tots els casos d&apos;èxit →
          </Link>
        </div>

        <div className="space-y-16">
          {content.portfolio.map((project, idx) => (
            <div
              key={project.id}
              className="luxury-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-96 w-full overflow-hidden bg-noir-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 brightness-90 hover:brightness-100"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-apple-muted uppercase tracking-wider">
                    CAS 0{idx + 1} · {project.client}
                  </span>
                  <span className="text-xs font-mono text-ferrari-red font-semibold">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {project.title}
                </h3>

                <p className="text-sm text-apple-muted leading-relaxed">
                  {project.description}
                </p>

                <div className="p-4 rounded-2xl bg-noir-900 border border-white/[0.06]">
                  <span className="text-xs font-mono text-apple-muted uppercase tracking-wider block mb-1">
                    Mètrica de Negoci Assolida
                  </span>
                  <span className="text-base font-bold text-white font-display">
                    {project.metric}
                  </span>
                </div>

                <div>
                  <Link
                    href="/contacte"
                    className="text-xs font-semibold uppercase tracking-wider text-white hover:text-ferrari-red transition-colors inline-flex items-center gap-2"
                  >
                    <span>Sol·licitar Arquitectura Similar</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
