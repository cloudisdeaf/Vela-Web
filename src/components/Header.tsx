'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SiteContent } from '@/lib/types';

interface HeaderProps {
  content: SiteContent;
}

export const Header: React.FC<HeaderProps> = ({ content }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tancar menú mòbil al canviar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Inici', href: '/' },
    { label: 'Serveis', href: '/serveis' },
    { label: 'Projectes', href: '/projectes' },
    { label: 'Seguretat & NDA', href: '/seguretat' },
    { label: 'L\'Estudi', href: '/nosaltres' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-void/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LOGO CORPORATIU & IDENTITAT VELA */}
            <Link href="/" className="flex items-center gap-3.5 group focus:outline-none">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-white/15 bg-space-800 shadow-[0_0_20px_rgba(255,30,86,0.2)] flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:border-cyber-crimson/50">
                {content.brand.logoUrl ? (
                  <Image
                    src={content.brand.logoUrl}
                    alt={`${content.brand.name} Logo`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-cyber-amber text-lg bg-cyber-crimson">
                    V*
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-white group-hover:text-cyber-crimson transition-colors font-display">
                    {content.brand.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-titanium-400 font-mono font-medium">
                  {content.brand.location.split('·')[0].trim()}
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓ MULTI-PÀGINA ESCRIPTORI */}
            <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-space-800/80 border border-white/[0.08] backdrop-blur-xl">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'text-white bg-white/[0.1] shadow-inner font-bold'
                        : 'text-titanium-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyber-crimson"></span>
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ACCIONS D'ESCRIPTORI (DISPONIBILITAT + CTA) */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-800/60 border border-white/[0.06] text-[11px] font-mono text-titanium-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>2 PLACES Q4</span>
              </div>

              <Link
                href="/contacte"
                className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson via-cyber-coral to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,30,86,0.35)] cursor-pointer"
              >
                Iniciar Projecte
              </Link>
            </div>

            {/* BOTÓ D'OBERTURA MÒBIL */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/contacte"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyber-crimson"
              >
                Contacte
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-space-800 border border-white/10 text-white hover:border-cyber-crimson/50 transition-colors focus:outline-none"
                aria-label="Menú de navegació"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MENÚ MÒBIL FULL-SCREEN ULTRA-FUTURISTA */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-void/98 backdrop-blur-3xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono uppercase tracking-widest text-titanium-400">
                NAVEGACIÓ ARQUITECTURAL
              </span>
              <span className="text-xs font-mono text-cyber-cyan flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-ping"></span>
                SISTEMA EN LÍNIA
              </span>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold font-display transition-all ${
                      isActive
                        ? 'bg-space-800 border border-cyber-crimson/40 text-white shadow-[0_0_20px_rgba(255,30,86,0.15)]'
                        : 'bg-space-900/60 border border-white/[0.06] text-titanium-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${isActive ? 'text-cyber-crimson translate-x-1' : 'text-titanium-500'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 space-y-4 border-t border-white/[0.08]">
            <Link
              href="/contacte"
              className="block w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson via-cyber-coral to-cyber-amber shadow-lg"
            >
              Sol·licitar Anàlisi Confidencial
            </Link>

            <div className="flex items-center justify-between text-xs font-mono text-titanium-400">
              <a href={`mailto:${content.brand.email}`} className="hover:text-white transition-colors">
                {content.brand.email}
              </a>
              <a
                href={content.brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-crimson font-bold"
              >
                {content.brand.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
