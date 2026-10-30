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
    <footer className="border-t border-white/[0.08] bg-void py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.06]">
          {/* IDENTITAT I MANIFEST */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/10 bg-space-800 flex-shrink-0">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="VELA" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-cyber-crimson text-cyber-amber font-bold flex items-center justify-center text-sm">
                    V*
                  </div>
                )}
              </div>
              <span className="font-black text-xl text-white font-display tracking-tight">
                {content.brand.name}
              </span>
            </div>

            <p className="text-sm text-titanium-400 max-w-sm leading-relaxed">
              {content.brand.subTagline}. Desenvolupem experiències digitals d&apos;alt impacte per a empreses líders a Catalunya Central.
            </p>

            <div className="text-xs font-mono text-titanium-300 flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>41.7282° N, 1.8288° E · MANRESA</span>
            </div>
          </div>

          {/* PÀGINES DEL SISTEMA */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-titanium-200 mb-4">
              Navegació
            </h4>
            <ul className="space-y-2.5 text-sm text-titanium-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inici
                </Link>
              </li>
              <li>
                <Link href="/serveis" className="hover:text-white transition-colors">
                  Serveis & Tarifes
                </Link>
              </li>
              <li>
                <Link href="/projectes" className="hover:text-white transition-colors">
                  Projectes & Cartera
                </Link>
              </li>
              <li>
                <Link href="/seguretat" className="hover:text-white transition-colors">
                  Seguretat & Acord NDA
                </Link>
              </li>
              <li>
                <Link href="/nosaltres" className="hover:text-white transition-colors">
                  L&apos;Estudi & Manifest
                </Link>
              </li>
              <li>
                <Link href="/contacte" className="hover:text-white transition-colors">
                  Contacte Confidencial
                </Link>
              </li>
            </ul>
          </div>

          {/* CAPACITATS D'ENGINYERIA */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-titanium-200 mb-4">
              Arquitectura
            </h4>
            <ul className="space-y-2.5 text-sm text-titanium-400">
              <li>Next.js 14 App Router</li>
              <li>Bots WhatsApp amb IA</li>
              <li>Auditories OWASP Top 10</li>
              <li>Domini Local Google & SEO</li>
              <li>Microinteraccions Awwwards</li>
              <li>Infraestructura Serverless</li>
            </ul>
          </div>

          {/* LEGAL & CMS ADMIN */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-titanium-200 mb-4">
              Legal & Gestió
            </h4>
            <ul className="space-y-2.5 text-sm text-titanium-400">
              <li>
                <Link href="/politica-privacidad" className="hover:text-white transition-colors">
                  Política de Privacitat
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-white transition-colors">
                  Termes de Contractació
                </Link>
              </li>
              <li>
                <Link href="/seguretat" className="hover:text-white transition-colors">
                  Compromís de Sobirania
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-space-800 hover:bg-space-700 border border-white/10 text-xs text-cyber-amber font-mono font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Panell CMS Visual</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-titanium-400">
          <div>
            © {new Date().getFullYear()} {content.brand.name} ({content.brand.tagline}).
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${content.brand.email}`} className="hover:text-white transition-colors">
              {content.brand.email}
            </a>
            <a
              href={content.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyber-crimson transition-colors font-bold"
            >
              {content.brand.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
