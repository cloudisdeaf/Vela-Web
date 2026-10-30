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
      setScrolled(window.scrollY > 15);
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
    { label: 'Serveis', href: '/serveis' },
    { label: 'Projectes', href: '/projectes' },
    { label: 'Seguretat & NDA', href: '/seguretat' },
    { label: 'L\'Estudi', href: '/nosaltres' },
    { label: 'Contacte', href: '/contacte' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3.5 shadow-[0_15px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* LOGO CORPORATIU VELA */}
            <Link href="/" className="flex items-center gap-3.5 group focus:outline-none">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-noir-850 border border-white/10 flex-shrink-0 shadow-lg group-hover:border-ferrari-red/50 transition-colors">
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
                <span className="font-extrabold text-base tracking-tight text-white font-display group-hover:text-ferrari-red transition-colors">
                  {content.brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-apple-muted font-mono -mt-0.5">
                  MANRESA {time ? `· ${time} CET` : ''}
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓ D'AUTOR ESTIL APPLE */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 relative py-1 ${
                      isActive ? 'text-white font-semibold' : 'text-apple-muted hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ferrari-red rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ACCIONS D'ESCRIPTORI */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir-850 border border-white/[0.08] text-[11px] font-mono text-apple-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Places Obertes Q4</span>
              </div>

              <Link
                href="/contacte"
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(225,6,0,0.3)] cursor-pointer"
              >
                Sol·licitar Proposta
              </Link>
            </div>

            {/* BOTÓ MÒBIL MINIMALISTA */}
            <div className="flex items-center gap-3 md:hidden">
              <Link
                href="/contacte"
                className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-white bg-ferrari-red"
              >
                Contacte
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-apple-muted hover:text-white focus:outline-none"
                aria-label="Menú"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MENÚ MÒBIL ESTIL APPLE */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl md:hidden pt-28 pb-10 px-8 flex flex-col justify-between">
          <nav className="space-y-6">
            <Link
              href="/"
              className={`block text-3xl font-black font-display tracking-tight ${pathname === '/' ? 'text-white' : 'text-apple-muted'}`}
            >
              Inici
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-3xl font-black font-display tracking-tight ${pathname === link.href ? 'text-white' : 'text-apple-muted'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <Link
              href="/contacte"
              className="block w-full py-4 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white bg-ferrari-red"
            >
              Sol·licitar Proposta Confidencial
            </Link>
            <div className="flex justify-between items-center text-xs font-mono text-apple-muted pt-2">
              <span>MANRESA · {time} CET</span>
              <a href="mailto:velamanresa@gmail.com" className="hover:text-white underline">
                velamanresa@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
