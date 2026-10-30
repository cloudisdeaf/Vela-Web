import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40">
      <Header content={content} />

      <section className="pt-40 sm:pt-48 pb-20 relative spotlight-platinum text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-noir-900 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-mono tracking-widest text-apple-silver uppercase">
              MARC JURÍDIC & CIBERSEGURETAT
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white text-apple-headline font-display">
            Confidencialitat.{' '}
            <span className="text-apple-muted block sm:inline">Sense concessions.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            La protecció del teu negoci i la reputació dels teus clients és el nostre primer principi d&apos;enginyeria.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-white/[0.06] bg-noir-950">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPillars.map((p) => (
              <div
                key={p.code}
                className="luxury-card rounded-3xl p-10 flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-apple-muted">{p.code}</span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-apple-silver border border-white/10">
                      {p.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold font-display text-white mb-3">
                    {p.title}
                  </h2>
                  <p className="text-sm text-apple-muted leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-apple-dark">
                  STANDARDS ISO / OWASP
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/[0.06] bg-noir-900 text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display text-apple-headline">
            Sol·licita el nostre acord de confidencialitat (NDA).
          </h2>
          <p className="text-sm sm:text-base text-apple-muted">
            Formalitzem el document legal abans de la primera reunió d&apos;estratègia.
          </p>
          <div className="pt-4">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark transition-all duration-200 shadow-[0_0_25px_rgba(225,6,0,0.3)]"
            >
              Demanar Model d&apos;Acord NDA
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
