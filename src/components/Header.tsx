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
  const [time, setTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Hora local de Manresa en viu
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ca-ES', {
          timeZone: 'Europe/Madrid',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { number: '01', label: 'Serveis & Tarifes', href: '/serveis' },
    { number: '02', label: 'Obra & Projectes', href: '/projectes' },
    { number: '03', label: 'Seguretat & NDA', href: '/seguretat' },
    { number: '04', label: 'L\'Estudi & Manifest', href: '/nosaltres' },
    { number: '05', label: 'Contacte', href: '/contacte' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* LOGO CORPORATIU VELA AMB EFECTE GLOW */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-noir-900 border border-white/15 flex-shrink-0 shadow-[0_0_20px_rgba(255,30,22,0.2)] group-hover:border-ferrari-red transition-all">
                {content.brand.logoUrl ? (
                  <Image
                    src={content.brand.logoUrl}
                    alt={content.brand.name}
                    fill
                    className="object-contain p-0.5"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-ferrari-red text-white font-bold flex items-center justify-center text-xs">
                    V*
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight text-white font-display group-hover:text-ferrari-red transition-colors">
                  {content.brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-apple-muted font-mono -mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red animate-pulse"></span>
                  <span>MANRESA {time ? `· ${time}` : ''}</span>
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓ D'AUTOR ESTIL APPLE / FERRARI */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 relative py-1.5 group ${
                      isActive ? 'text-white' : 'text-apple-muted hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ferrari-red rounded-full shadow-[0_0_10px_rgba(255,30,22,0.8)]"></span>
                    ) : (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/0 group-hover:bg-white/40 rounded-full transition-all"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACCIONS D'ESCRIPTORI */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir-850/90 border border-white/10 text-[11px] font-mono text-apple-silver">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Places Q4 Obertes</span>
              </div>

              <Link
                href="/contacte"
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow active:scale-95 transition-all cursor-pointer"
              >
                Sol·licitar Proposta
              </Link>
            </div>

            {/* BOTÓ MÒBIL ESTIL iOS */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/contacte"
                className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-ferrari-red shadow-[0_0_15px_rgba(255,30,22,0.4)]"
              >
                Contacte
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white bg-noir-850/90 rounded-xl border border-white/10 focus:outline-none"
                aria-label="Menú de navegació"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MENÚ MÒBIL AMB DESENFOCAMENT CRISTAL·LÍ I ANIMACIÓ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-noir-950/95 backdrop-blur-3xl md:hidden pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto animate-fade-in">
          <nav className="space-y-4 pt-4">
            <Link
              href="/"
              className={`block p-3 rounded-2xl border transition-all ${
                pathname === '/'
                  ? 'bg-noir-850 border-ferrari-red text-white'
                  : 'bg-transparent border-transparent text-apple-muted hover:text-white'
              }`}
            >
              <span className="text-xs font-mono text-ferrari-red block mb-1">00</span>
              <span className="text-2xl font-black font-display tracking-tight">Inici Principal</span>
            </Link>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block p-3 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-noir-850 border-ferrari-red text-white'
                      : 'bg-transparent border-transparent text-apple-muted hover:text-white'
                  }`}
                >
                  <span className="text-xs font-mono text-ferrari-red block mb-1">{link.number}</span>
                  <span className="text-2xl font-black font-display tracking-tight">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <Link
              href="/contacte"
              className="block w-full py-4 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow"
            >
              Sol·licitar Proposta Confidencial
            </Link>

            <div className="flex justify-between items-center text-xs font-mono text-apple-muted pt-1">
              <span>MANRESA · {time} CET</span>
              <a href="mailto:velamanresa@gmail.com" className="text-white underline">
                velamanresa@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
