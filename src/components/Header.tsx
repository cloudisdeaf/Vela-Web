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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Serveis', href: '/serveis' },
    { label: 'Projectes', href: '/projectes' },
    { label: 'Seguretat & NDA', href: '/seguretat' },
    { label: 'L\'Estudi', href: '/nosaltres' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-3.5 shadow-2xl' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* LOGO MONOLÍTIC */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-noir-850 border border-white/10 flex-shrink-0">
                {content.brand.logoUrl ? (
                  <Image
                    src={content.brand.logoUrl}
                    alt={content.brand.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-ferrari-red text-white font-bold flex items-center justify-center text-xs">
                    V*
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white font-display">
                  {content.brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-apple-muted font-mono -mt-0.5">
                  MANRESA
                </span>
              </div>
            </Link>

            {/* NAVEGACIÓ D'AUTOR ESTIL APPLE */}
            <nav className="hidden md:flex items-center gap-9 text-xs font-medium tracking-wide">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-white font-semibold' : 'text-apple-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* BOTÓ D'ACCIÓ REFINAT */}
            <div className="hidden md:flex items-center gap-6">
              <span className="text-[11px] font-mono text-apple-muted flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Places Obertes Q4</span>
              </span>

              <Link
                href="/contacte"
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-ferrari-red hover:bg-ferrari-dark active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(225,6,0,0.25)]"
              >
                Iniciar Projecte
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

      {/* MENÚ MÒBIL ESTIL APPLE MODERNE */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden pt-28 pb-12 px-8 flex flex-col justify-between">
          <nav className="space-y-6">
            <Link
              href="/"
              className={`block text-2xl font-bold font-display ${pathname === '/' ? 'text-white' : 'text-apple-muted'}`}
            >
              Inici
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-2xl font-bold font-display ${pathname === link.href ? 'text-white' : 'text-apple-muted'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacte"
              className={`block text-2xl font-bold font-display ${pathname === '/contacte' ? 'text-ferrari-red' : 'text-apple-muted'}`}
            >
              Contacte & Pressupost
            </Link>
          </nav>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <Link
              href="/contacte"
              className="block w-full py-3.5 rounded-full text-center text-xs font-semibold text-white bg-ferrari-red"
            >
              Sol·licitar Auditoria Confidencial
            </Link>
            <p className="text-center text-xs font-mono text-apple-muted">
              Manresa, Barcelona · velamanresa@gmail.com
            </p>
          </div>
        </div>
      )}
    </>
  );
};
