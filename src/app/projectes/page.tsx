'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileQuickBar } from '@/components/MobileQuickBar';
import { defaultSiteContent } from '@/lib/content';

export default function ProjectesPage() {
  const content = defaultSiteContent;
  const [filter, setFilter] = useState('tots');

  const allProjects = [
    {
      id: 'cas-1',
      title: 'Clínica Mèdica & Odontologia Bages',
      client: 'Sector Sanitari Privat',
      categoryTag: 'salut',
      category: 'Plataforma Web + Bot de Cites',
      metric: '+310% primeres consultes en 60 dies',
      description:
        'Desenvolupament web integral amb integració d\'intel·ligència artificial per a gestió d\'agendes mèdiques privades i protecció de dades sanitàries.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-2',
      title: 'Can Prat Enginyeria & Automoció',
      client: 'Taller Especialitzat & Renting',
      categoryTag: 'automocio',
      category: 'Web Corporativa + WhatsApp CRM',
      metric: '0 trucades perdudes en horari d\'obertura',
      description:
        'Plataforma d\'autoritat digital que automatitza pressupostos preliminars i centralitza el contacte de clients prèmium del Bages.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-3',
      title: 'Boutique D\'Autor & Moda Manresa',
      client: 'Retail d\'Alta Gamma',
      categoryTag: 'retail',
      category: 'Catàleg Digital & Estratègia Social',
      metric: 'ROI x4.8 en campanyes locals',
      description:
        'Experiència digital minimalista i exclusiva que transmet el valor de la confecció local artesanal a un públic d\'alt poder adquisitiu.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-4',
      title: 'Rovira & Associats Advocats',
      client: 'Sector Jurídic & Fiscal',
      categoryTag: 'serveis',
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
      categoryTag: 'serveis',
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
      categoryTag: 'salut',
      category: 'Web + Automatització d\'Altes',
      metric: '+85 socis nous el primer trimestre',
      description:
        'Sistema d\'adquisició de clients amb landing page d\'alta conversió connectada directament amb el sistema de gestió del centre esportiu.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filteredProjects =
    filter === 'tots'
      ? allProjects
      : allProjects.filter((p) => p.categoryTag === filter);

  return (
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40 pb-16 md:pb-0">
      <Header content={content} />

      {/* HERO DE PROJECTES */}
      <section className="pt-36 sm:pt-48 pb-16 sm:pb-24 relative spotlight-red text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-noir-900/80 backdrop-blur-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-ferrari-red animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-apple-silver uppercase font-bold">
              OBRA SELECCIONADA & RESULTATS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white text-headline font-display">
            Casos reals.{' '}
            <span className="text-shimmer block sm:inline">Impacte demostrable.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            No mesurem l&apos;èxit en impressions buides. El mesurem en visites mèdiques, reserves confirmades i facturació corporativa.
          </p>

          {/* FILTRE INTERACTIU HORITZONTAL SWIPEABLE */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'tots', label: 'Tots els Projectes' },
              { id: 'salut', label: 'Salut & Mèdic' },
              { id: 'automocio', label: 'Automoció & Indústria' },
              { id: 'retail', label: 'Moda & Retail' },
              { id: 'serveis', label: 'Serveis & Hostaleria' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-ferrari-red text-white font-bold shadow-[0_0_20px_rgba(255,30,22,0.4)]'
                    : 'bg-noir-900 text-apple-muted hover:text-white border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRAELLA DE CASOS */}
      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 sm:space-y-16">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="luxury-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              <div className="lg:col-span-7 relative h-64 sm:h-96 w-full overflow-hidden bg-noir-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-105"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-apple-muted uppercase tracking-wider">
                    CAS 0{idx + 1} · {project.client}
                  </span>
                  <span className="text-xs font-mono text-ferrari-red font-bold">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-display group-hover:text-apple-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-apple-silver leading-relaxed">
                  {project.description}
                </p>

                <div className="p-4 rounded-2xl bg-noir-900/90 border border-white/[0.08]">
                  <span className="text-xs font-mono text-apple-muted uppercase tracking-wider block mb-1">
                    Mètrica de Negoci Assolida
                  </span>
                  <span className="text-base font-bold text-white font-display">
                    {project.metric}
                  </span>
                </div>

                <div>
                  <Link
                    href="/contacte"
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-ferrari-red transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Sol·licitar Arquitectura Similar</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-28 text-center border-t border-white/[0.08] bg-noir-900/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display text-headline">
            El teu negoci mereix un actiu digital a aquest nivell.
          </h2>
          <p className="text-sm sm:text-base text-apple-muted">
            Acceptem un màxim de 2 projectes simultanis per mantenir aquest estàndard de precisió.
          </p>
          <div className="pt-4">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow"
            >
              Consultar Calendari de Treball
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
      <MobileQuickBar content={content} />
    </main>
  );
}
