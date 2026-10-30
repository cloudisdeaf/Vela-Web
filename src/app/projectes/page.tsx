import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Projectes & Obra Seleccionada · VELA Manresa',
  description:
    'Casos d\'èxit reals desenvolupats per a empreses de Manresa i el Bages amb mètriques empresarials comprovables.',
};

export default async function ProjectesPage() {
  const content = await getSiteContent();

  const allProjects = [
    ...content.portfolio,
    {
      id: 'cas-4',
      title: 'Rovira & Associats Advocats',
      client: 'Sector Jurídic & Fiscal',
      category: 'Web Corporativa + Portal Privat',
      metric: 'Imatge de prestigi bancari & protecció RGPD',
      description:
        'Desenvolupament per a un dels bufets de referència a la Catalunya Central. Codi auditat, compliment estricte del secret professional i portal xifrat.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-5',
      title: 'Restaurant Gastronòmic La Plana',
      client: 'Hostaleria & Cuina de Mercat',
      category: 'Plataforma Web + Reserva de Taules',
      metric: 'Cap de setmana complet 3 setmanes abans',
      description:
        'Experiència immersiva de càrrega instantània amb carta interactiva i integració amb WhatsApp per a reserves en temps real.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-6',
      title: 'Gimnàs & Centre de Rendiment Bages',
      client: 'Salut & Fitness',
      category: 'Web + Automatització d\'Altes',
      metric: '+85 socis nous el primer trimestre',
      description:
        'Sistema d\'adquisició de clients amb landing page d\'alta conversió connectada directament amb el sistema de gestió del centre esportiu.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <main className="min-h-screen bg-void text-white selection:bg-cyber-crimson/30">
      <Header content={content} />

      {/* HERO DE PROJECTES */}
      <section className="pt-36 sm:pt-44 pb-20 relative tech-grid overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] glow-orb-cyan rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-800 border border-white/10 text-cyber-crimson text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-crimson animate-pulse"></span>
            PORTFOLI SELECCIONAT · BAGES
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Obra d&apos;enginyeria amb{' '}
            <span className="text-gradient-cyan">impacte econòmic real</span>.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            No mesurem l&apos;èxit en clics abstractes. El mesurem en visites mèdiques, trucades concertades, nous contractes i prestigi d&apos;alta gamma.
          </p>
        </div>
      </section>

      {/* GRAELLA DE PROJECTES AMPLIADA */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl overflow-hidden glass-panel flex flex-col justify-between transition-all duration-500 hover:border-cyber-cyan/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.12)]"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-space-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-85 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent opacity-95" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-void/80 backdrop-blur-md text-[11px] font-mono text-titanium-200 border border-white/10">
                      {project.client}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-lg bg-cyber-crimson text-white text-xs font-bold font-display shadow-lg">
                      {project.metric}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h2 className="text-xl font-bold font-display text-white group-hover:text-cyber-cyan transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-titanium-400 leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-titanium-300">
                    <span>ARQUITECTURA NEXT.JS</span>
                    <span className="text-cyber-amber">100% BLINDAT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 text-center border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Vols que el teu negoci sigui el pròxim cas d&apos;èxit?
          </h2>
          <p className="text-sm sm:text-base text-titanium-400">
            Tenim capacitat per a un màxim de 2 projectes nous aquest trimestre per mantenir el màxim estàndard de qualitat.
          </p>
          <div className="pt-2">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyber-amber to-yellow-300 hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Consultar Disponibilitat de Calendari
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
