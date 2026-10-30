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
    <footer className="border-t border-white/[0.08] bg-vela-black py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.06]">
          {/* IDENTITAT */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-vela-card">
                {content.brand.logoUrl ? (
                  <Image src={content.brand.logoUrl} alt="VELA" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-vela-red text-vela-gold font-bold flex items-center justify-center text-sm">
                    V*
                  </div>
                )}
              </div>
              <span className="font-extrabold text-xl text-white font-display tracking-tight">
                {content.brand.name}
              </span>
            </div>

            <p className="text-sm text-vela-muted max-w-sm leading-relaxed">
              {content.brand.subTagline}. Construïm plataformes que transmeten autoritat, rigor tecnològic i conversió mesurable.
            </p>

            <div className="text-xs text-vela-text flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{content.brand.location}</span>
            </div>
          </div>

          {/* NAVEGACIÓ */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navegació</h4>
            <ul className="space-y-2.5 text-sm text-vela-muted">
              <li>
                <a href="#serveis" className="hover:text-white transition-colors">
                  Serveis
                </a>
              </li>
              <li>
                <a href="#garantia" className="hover:text-white transition-colors">
                  Garantia & Seguretat
                </a>
              </li>
              <li>
                <a href="#per-que-nosaltres" className="hover:text-white transition-colors">
                  Per què nosaltres
                </a>
              </li>
              <li>
                <a href="#projectes" className="hover:text-white transition-colors">
                  Projectes
                </a>
              </li>
              <li>
                <a href="#contacte" className="hover:text-white transition-colors">
                  Contacte
                </a>
              </li>
            </ul>
          </div>

          {/* SERVEIS CLAU */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Especialitats</h4>
            <ul className="space-y-2.5 text-sm text-vela-muted">
              <li>Webs d&apos;Alta Conversió</li>
              <li>Bots WhatsApp Intel·ligents</li>
              <li>Auditories de Ciberseguretat</li>
              <li>Posicionament Local Google</li>
              <li>Infraestructura Cloud Segura</li>
            </ul>
          </div>

          {/* LEGAL & ADMINISTRACIÓ */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal & Accés</h4>
            <ul className="space-y-2.5 text-sm text-vela-muted">
              <li>
                <Link href="/politica-privacidad" className="hover:text-white transition-colors">
                  Política de Privacitat
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-white transition-colors">
                  Termes i Condicions
                </Link>
              </li>
              <li>
                <span className="text-xs text-vela-muted">Acord NDA Disponibilitat</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs text-vela-gold font-medium transition-colors"
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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-vela-muted">
          <div>
            © {new Date().getFullYear()} {content.brand.name} ({content.brand.tagline}). Tots els drets reservats.
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${content.brand.email}`} className="hover:text-white transition-colors">
              {content.brand.email}
            </a>
            <a
              href={content.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-vela-red transition-colors font-medium"
            >
              {content.brand.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
