import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileQuickBar } from '@/components/MobileQuickBar';

export const metadata: Metadata = {
  title: 'Seguretat de Grau Bancari & Rigor Jurídic · VELA Manresa',
  description:
    'Protocols de ciberseguretat OWASP Top 10, compliment estricte del RGPD europeu i acord de confidencialitat (NDA) per a projectes web.',
};

export default async function SeguretatPage() {
  const content = await getSiteContent();

  const securityPillars = [
    {
      code: 'PROTOCOL 01',
      title: 'Acord de Confidencialitat (NDA) Bilateral',
      description:
        'Abans de conèixer qualsevol dada financera, estratègia o documentació interna, formalitzem un acord de confidencialitat bilateral legalment vinculant.',
      badge: 'JURÍDICAMENT VINCULANT',
    },
    {
      code: 'PROTOCOL 02',
      title: 'Servidors Exclusius a la Unió Europea (RGPD)',
      description:
        'Totes les dades dels teus clients es processen en centres de dades certificats a la Unió Europea, complint escrupolosament el Reglament (UE) 2016/679.',
      badge: 'CONFORME RGPD',
    },
    {
      code: 'PROTOCOL 03',
      title: 'Sobirania Total del Codi (Sense Retencions)',
      description:
        'A diferència d\'altres agències que bloquegen dominis o retenen accessos, un cop liquidat el projecte, el 100% dels actius i el codi font són teus.',
      badge: 'PROPIETAT 100%',
    },
    {
      code: 'PROTOCOL 04',
      title: 'Auditoria de Vulnerabilitats OWASP Top 10',
      description:
        'Blindem la plataforma contra injeccions SQL, atacs XSS, manipulació maliciosa de formularis per bots i atacs de denegació de servei (DDoS).',
      badge: 'BLINDATGE OWASP',
    },
    {
      code: 'PROTOCOL 05',
      title: 'Capçaleres de Seguretat i Certificació SSL A+',
      description:
        'Implementació estricta de Content Security Policy (CSP), HSTS a 2 anys, protecció d\'iframe i xifratge TLS 1.3 de 256 bits a cada connexió.',
      badge: 'QUALIFICACIÓ A+',
    },
    {
      code: 'PROTOCOL 06',
      title: 'Disponibilitat Garantida per Contracte (SLA 99.99%)',
      description:
        'La teva web no caurà durant campanyes o pics de trànsit. Utilitzem infraestructura Edge global ultra-redundant.',
      badge: 'DISPONIBILITAT CONTÍNUA',
    },
  ];

  return (
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40 pb-16 md:pb-0">
      <Header content={content} />

      <section className="pt-36 sm:pt-48 pb-16 sm:pb-24 relative spotlight-platinum text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-noir-900/80 backdrop-blur-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-apple-silver uppercase font-bold">
              MARC JURÍDIC & CIBERSEGURETAT
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white text-headline font-display">
            Confidencialitat.{' '}
            <span className="text-shimmer block sm:inline">Sense concessions.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            La protecció del teu negoci i la reputació dels teus clients és el nostre primer principi d&apos;enginyeria.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {securityPillars.map((p) => (
              <div
                key={p.code}
                className="luxury-card rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-apple-muted font-bold">{p.code}</span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.08] text-apple-silver border border-white/10 font-bold">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm text-apple-silver leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-ferrari-red/50 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white font-display">Acord de Confidencialitat (NDA) des del primer minut</h4>
              <p className="text-xs sm:text-sm text-apple-muted">Signem acords legals abans de conèixer cap dada sensible del teu negoci.</p>
            </div>
            <Link
              href="/contacte"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow whitespace-nowrap"
            >
              Sol·licitar Acord NDA
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
      <MobileQuickBar content={content} />
    </main>
  );
}
