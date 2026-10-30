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
          {/* IDENTITAT */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-noir-850 border border-white/10 flex-shrink-0">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="VELA" fill className="object-cover" />
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
              {content.brand.subTagline}. Construïm plataformes que projecten autoritat indiscutible.
            </p>
            <div className="text-[11px] font-mono text-apple-dark">
              MANRESA, BARCELONA · CATALUNYA
            </div>
          </div>

          {/* NAVEGACIÓ */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Navegació
            </h4>
            <ul className="space-y-2.5 text-xs text-apple-muted">
              <li><Link href="/" className="hover:text-white transition-colors">Inici</Link></li>
              <li><Link href="/serveis" className="hover:text-white transition-colors">Serveis</Link></li>
              <li><Link href="/projectes" className="hover:text-white transition-colors">Projectes</Link></li>
              <li><Link href="/seguretat" className="hover:text-white transition-colors">Seguretat & NDA</Link></li>
              <li><Link href="/nosaltres" className="hover:text-white transition-colors">L&apos;Estudi</Link></li>
              <li><Link href="/contacte" className="hover:text-white transition-colors">Contacte</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Legal & Privacitat
            </h4>
            <ul className="space-y-2.5 text-xs text-apple-muted">
              <li><Link href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacitat</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Termes de Contractació</Link></li>
              <li><Link href="/seguretat" className="hover:text-white transition-colors">Sobirania de Codi</Link></li>
            </ul>
          </div>

          {/* ACCÉS PRIVAT CMS */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Panell de Control
            </h4>
            <p className="text-xs text-apple-muted mb-4">
              Editor visual integrat per modificar continguts, preus i logo en viu.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 text-ferrari-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Accés CMS Studio</span>
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-apple-dark">
          <div>
            © {new Date().getFullYear()} {content.brand.name}. Tots els drets reservats.
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${content.brand.email}`} className="hover:text-white transition-colors">
              {content.brand.email}
            </a>
            <a href={content.brand.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ferrari-red transition-colors">
              {content.brand.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
