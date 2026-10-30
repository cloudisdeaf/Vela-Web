import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Seguretat de Nivell Bancari & Rigor Jurídic · VELA Manresa',
  description:
    'Protocols de ciberseguretat OWASP Top 10, compliment estricte del RGPD europeu i acord de confidencialitat (NDA) per a projectes web.',
};

export default async function SeguretatPage() {
  const content = await getSiteContent();

  const securityPillars = [
    {
      code: 'SEC-01',
      title: 'Acord de Confidencialitat (NDA) Automàtic',
      description:
        'Abans de compartir qualsevol documentació interna, xifres de facturació o estratègia de negoci, formalitzem un acord de confidencialitat bilateral legalment vinculant.',
      badge: 'JURÍDICAMENT VINCULANT',
    },
    {
      code: 'SEC-02',
      title: 'Allotjament Exclusiu a la Unió Europea (RGPD / LOPD)',
      description:
        'Totes les dades dels teus clients i els formularis es processen en servidors d\'alta disponibilitat dins de territori europeu, complint escrupolosament el Reglament (UE) 2016/679.',
      badge: 'CONFORME RGPD',
    },
    {
      code: 'SEC-03',
      title: 'Propietat 100% Teva del Codi Font (Zero Segrest)',
      description:
        'Moltes agències retenen els accessos o el domini per cobrar quotes eternes. A VELA, un cop entregat el projecte, el repositori de codi, el domini i tots els actius són exclusivament teus.',
      badge: 'SOBIRANIA TOTAL',
    },
    {
      code: 'SEC-04',
      title: 'Auditoria de Vulnerabilitats OWASP Top 10',
      description:
        'Impedim atacs de Cross-Site Scripting (XSS), injeccions SQL/NoSQL, manipulació de formularis per bots i atacs de denegació de servei (DoS) mitjançant Cloudflare Edge.',
      badge: 'BLINDATGE TÈCNIC',
    },
    {
      code: 'SEC-05',
      title: 'Capçaleres de Seguretat de Grau Bancari (A+ SSL)',
      description:
        'Implementem CSP (Content Security Policy), HSTS a 2 anys, protecció d\'iframe contra clickjacking i xifratge de dades TLS 1.3 de 256 bits a cada petició.',
      badge: 'QUALIFICACIÓ A+',
    },
    {
      code: 'SEC-06',
      title: 'Compromís de Disponibilitat SLA 99.99%',
      description:
        'La teva plataforma no cau quan més la necessites. Utilitzem xarxes de distribució de contingut (CDN) ultra-redundants distribuïdes globalment.',
      badge: 'DISPONIBILITAT CONTÍNUA',
    },
  ];

  return (
    <main className="min-h-screen bg-void text-white selection:bg-cyber-crimson/30">
      <Header content={content} />

      {/* HERO DE SEGURETAT */}
      <section className="pt-36 sm:pt-44 pb-20 relative tech-grid overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-orb-violet rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-800 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            SEGURETAT BANCÀRIA & RIGOR JURÍDIC
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight max-w-4xl mx-auto leading-[1.1]">
            La tranquil·litat de saber que el teu actiu digital està{' '}
            <span className="text-gradient-cyan">blindat</span>.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            La ciberseguretat i la confidencialitat no són un afegit d&apos;última hora. Són la base sobre la qual construïm cada projecte a VELA.
          </p>
        </div>
      </section>

      {/* GRAELLA DELS 6 PILARS DE SEGURETAT */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPillars.map((pillar) => (
              <div
                key={pillar.code}
                className="p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-emerald-400 tracking-wider">
                      {pillar.code}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-display text-white mb-3">
                    {pillar.title}
                  </h2>

                  <p className="text-sm text-titanium-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-titanium-400">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Verificat en cada desplegament</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFEST DE CONFIDENCIALITAT */}
      <section className="py-20 bg-space-900/60 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-mono text-cyber-amber uppercase tracking-widest block">
            CLÀUSULA D&apos;HONESTEDAT VELA
          </span>
          <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
            Mai vendrem les teves dades ni utilitzarem el teu projecte com a laboratori
          </h3>
          <p className="text-sm sm:text-base text-titanium-400 leading-relaxed">
            Cada línia de codi s&apos;escriu exclusivament per a tu. Si vols sol·licitar un esborrany del nostre acord de confidencialitat o consultar qualsevol aspecte legal abans de començar, estem a la teva disposició a Manresa.
          </p>

          <div className="pt-4">
            <Link
              href="/contacte"
              className="inline-block px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-space-800 hover:bg-space-700 border border-white/10 transition-all shadow-md"
            >
              Sol·licitar Acord de Confidencialitat (NDA)
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
