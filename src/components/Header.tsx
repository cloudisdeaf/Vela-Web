'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteContent } from '@/lib/types';

interface HeaderProps {
  content: SiteContent;
}

export const Header: React.FC<HeaderProps> = ({ content }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-vela-black/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO DINÀMIC — Configurable des del panell CMS */}
          <Link href="/" className="flex items-center gap-3.5 group focus:outline-none">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-white/10 bg-vela-card shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              {content.brand.logoUrl ? (
                <Image
                  src={content.brand.logoUrl}
                  alt={`${content.brand.name} Logo`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-vela-gold text-lg bg-vela-red">
                  V*
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-vela-gold transition-colors font-display">
                {content.brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-vela-muted font-medium">
                {content.brand.location.split('·')[0].trim()}
              </span>
            </div>
          </Link>

          {/* MENÚ DE NAVEGACIÓ D'ESCRIPTORI */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-vela-light">
            <a href="#serveis" className="hover:text-white transition-colors link-underline">
              Serveis
            </a>
            <a href="#garantia" className="hover:text-white transition-colors link-underline">
              Garantia & Seguretat
            </a>
            <a href="#per-que-nosaltres" className="hover:text-white transition-colors link-underline">
              Per què nosaltres
            </a>
            <a href="#projectes" className="hover:text-white transition-colors link-underline">
              Projectes
            </a>
            <a href="#contacte" className="hover:text-white transition-colors link-underline">
              Contacte
            </a>
          </nav>

          {/* ACCIONS DE DRETA (STATUS + CTA) */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-vela-card/80 border border-white/[0.06] text-xs text-vela-light">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-white/90">2 places Q4</span>
            </div>

            <a
              href="#contacte"
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-gradient-to-r from-vela-gold via-amber-400 to-yellow-300 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:shadow-[0_0_30px_rgba(255,184,0,0.5)] cursor-pointer"
            >
              Sol·licitar Proposta
            </a>
          </div>

          {/* BOTÓ HAMBURGUESA PER A MÒBIL */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-vela-light hover:text-white hover:bg-white/[0.05] focus:outline-none"
            aria-label="Obrir menú"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MENÚ MÒBIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-vela-dark/95 backdrop-blur-2xl border-b border-white/10 px-5 pt-4 pb-6 mt-3 space-y-4 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-vela-card border border-white/10 text-xs text-vela-light w-fit">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>{content.brand.availabilityStatus}</span>
          </div>

          <div className="flex flex-col space-y-3 text-base font-medium">
            <a
              href="#serveis"
              onClick={() => setMobileMenuOpen(false)}
              className="text-vela-light hover:text-white transition-colors py-1"
            >
              Serveis
            </a>
            <a
              href="#garantia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-vela-light hover:text-white transition-colors py-1"
            >
              Garantia & Seguretat
            </a>
            <a
              href="#per-que-nosaltres"
              onClick={() => setMobileMenuOpen(false)}
              className="text-vela-light hover:text-white transition-colors py-1"
            >
              Per què nosaltres
            </a>
            <a
              href="#projectes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-vela-light hover:text-white transition-colors py-1"
            >
              Projectes
            </a>
            <a
              href="#contacte"
              onClick={() => setMobileMenuOpen(false)}
              className="text-vela-light hover:text-white transition-colors py-1"
            >
              Contacte
            </a>
          </div>

          <div className="pt-2">
            <a
              href="#contacte"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-5 py-3 rounded-lg text-sm font-bold text-black bg-gradient-to-r from-vela-gold to-yellow-400 shadow-lg"
            >
              Sol·licitar Proposta
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
