'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';

interface FooterProps {
  content: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="border-t border-white/[0.06] bg-noir-950 py-20 relative">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/[0.06]">
          {/* IDENTITAT CORPORATIVA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-noir-850 border border-white/10 flex-shrink-0">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="VELA" fill className="object-contain p-0.5" />
                ) : (
                  <div className="w-full h-full bg-ferrari-red text-white font-bold flex items-center justify-center text-xs">
                    V*
                  </div>
                )}
              </div>
              <span className="font-extrabold text-lg text-white font-display">
                {content.brand.name}
              </span>
            </div>
            <p className="text-xs text-apple-muted leading-relaxed">
              {content.brand.subTagline}. Desenvolupem plataformes d&apos;enginyeria que projecten lideratge i autoritat absoluta.
            </p>
            <div className="text-[11px] font-mono text-apple-dark">
              MANRESA, BARCELONA · CATALUNYA
            </div>
          </div>

          {/* NAVEGACIÓ D'ENGINYERIA */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Navegació
            </h4>
            <ul className="space-y-2.5 text-xs text-apple-muted">
              <li><Link href="/" className="hover:text-white transition-colors">Inici</Link></li>
              <li><Link href="/serveis" className="hover:text-white transition-colors">Serveis & Tarifes</Link></li>
              <li><Link href="/projectes" className="hover:text-white transition-colors">Projectes Destacats</Link></li>
              <li><Link href="/seguretat" className="hover:text-white transition-colors">Seguretat & NDA</Link></li>
              <li><Link href="/nosaltres" className="hover:text-white transition-colors">L&apos;Estudi & Manifest</Link></li>
              <li><Link href="/contacte" className="hover:text-white transition-colors">Contacte Confidencial</Link></li>
            </ul>
          </div>

          {/* COMPLIMENT LEGAL & RGPD */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Legal & Privacitat
            </h4>
            <ul className="space-y-2.5 text-xs text-apple-muted">
              <li><Link href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacitat</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Termes de Contractació</Link></li>
              <li><Link href="/seguretat" className="hover:text-white transition-colors">Sobirania de Codi</Link></li>
              <li><Link href="/seguretat" className="hover:text-white transition-colors">Normativa RGPD UE</Link></li>
            </ul>
          </div>

          {/* SEU CENTRAL & ATENCIÓ */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Estudi a Manresa
            </h4>
            <div className="space-y-3 text-xs text-apple-muted">
              <p className="leading-relaxed">
                Passeig de Pere III, Manresa (Barcelona)
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-mono text-apple-silver">Disponibilitat Q4 Oberta</span>
              </div>
              <div className="pt-2">
                <a
                  href={`mailto:${content.brand.email}`}
                  className="text-white hover:text-ferrari-red transition-colors font-medium block"
                >
                  {content.brand.email}
                </a>
                <a
                  href={content.brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-silver hover:text-ferrari-red transition-colors text-[11px] font-mono mt-1 block"
                >
                  {content.brand.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-apple-dark">
          <div>
            © {new Date().getFullYear()} {content.brand.name}. Tots els drets reservats.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-apple-muted">Manresa, Bages · Catalunya</span>
            <a href={`mailto:${content.brand.email}`} className="hover:text-white transition-colors">
              {content.brand.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
