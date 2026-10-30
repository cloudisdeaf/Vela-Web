import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Serveis d\'Enginyeria Digital & Tarifes · VELA Manresa',
  description:
    'Desenvolupament web d\'autor en Next.js, automatització de WhatsApp amb IA, SEO local i ciberseguretat per a empreses del Bages.',
};

export default async function ServeisPage() {
  const content = await getSiteContent();

  const techStack = [
    { name: 'Next.js 14', category: 'Framework Líder' },
    { name: 'TypeScript', category: 'Seguretat de Tipus' },
    { name: 'Tailwind CSS', category: 'Disseny d\'Alta Freqüència' },
    { name: 'Framer Motion', category: 'Animació Awwwards' },
    { name: 'Supabase', category: 'Base de Dades Núvol' },
    { name: 'Cloudflare Edge', category: 'Protecció DDoS Global' },
    { name: 'OpenAI API', category: 'Intel·ligència Artificial' },
    { name: 'Vercel Enterprise', category: 'Infraestructura Serverless' },
  ];

  return (
    <main className="min-h-screen bg-void text-white selection:bg-cyber-crimson/30">
      <Header content={content} />

      {/* HERO DE PÀGINA */}
      <section className="pt-36 sm:pt-44 pb-20 relative tech-grid overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-orb-crimson rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-800 border border-white/10 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            CATÀLEG DE SOLUCIONS D&apos;ENGINYERIA 2026
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Arquitectura digital dissenyada per a{' '}
            <span className="text-gradient-crimson">multiplicar facturació</span>.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            Eliminem la lentitud i la mediocritat de les plantilles tradicionals. Construïm plataformes que posicionen el teu negoci a la cúspide del seu mercat.
          </p>
        </div>
      </section>

      {/* DETALL PROFUND DELS SERVEIS */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {content.services.map((service, index) => (
            <div
              key={service.id}
              className={`p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden transition-all duration-300 hover:border-white/20 ${
                service.popular ? 'border-cyber-crimson/30 shadow-[0_0_50px_rgba(255,30,86,0.1)]' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-cyber-cyan tracking-widest uppercase">
                      SERVEI 0{index + 1}
                    </span>
                    {service.popular && (
                      <span className="px-3 py-0.5 rounded-full bg-cyber-crimson/20 border border-cyber-crimson/40 text-[11px] font-bold text-cyber-crimson uppercase">
                        Solució Recomanada
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                    {service.title}
                  </h2>

                  <p className="text-sm font-mono text-cyber-amber uppercase tracking-wider">
                    {service.tagline}
                  </p>

                  <p className="text-base text-titanium-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-titanium-200">
                        <svg className="w-4 h-4 text-cyber-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end p-6 rounded-2xl bg-space-800/80 border border-white/[0.06]">
                  <span className="text-xs font-mono text-titanium-400 uppercase tracking-widest mb-1">
                    Inversió Estimada
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
                    {service.price}
                  </div>
                  <p className="text-xs text-titanium-400 mb-6 text-left lg:text-right max-w-xs">
                    Pressupost tancat per contracte amb compromís de lliurament garantit per escrit.
                  </p>

                  <Link
                    href={`/contacte?servei=${encodeURIComponent(service.title)}`}
                    className="w-full py-3.5 px-6 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-cyber-crimson to-cyber-amber hover:brightness-110 active:scale-95 transition-all shadow-lg"
                  >
                    Demanar Proposta per a aquest Servei
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK REIXETA */}
      <section className="py-20 bg-space-900/60 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block mb-3">
            ARQUITECTURA DE NIVELL EMPRESARIAL
          </span>
          <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-12">
            Les mateixes tecnologies que utilitzen Apple, Stripe i Ferrari
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <div key={i} className="p-5 rounded-2xl bg-space-800/60 border border-white/[0.06] text-left">
                <span className="text-[10px] font-mono text-titanium-400 uppercase tracking-wider block mb-1">
                  {tech.category}
                </span>
                <span className="text-base font-bold text-white font-display">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA INFERIOR */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white">
            Preparat per fer un salt d&apos;autoritat al teu sector?
          </h2>
          <p className="text-base text-titanium-400">
            Analitzem el teu cas concret sense cap cost ni compromís.
          </p>
          <div className="pt-4">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyber-amber via-yellow-400 to-amber-300 hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Agendar Auditoria Digital Gratuïta
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
