'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
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
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40">
      <Header content={content} />

      {/* HERO DE PROJECTES */}
      <section className="pt-40 sm:pt-48 pb-20 relative spotlight-red text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-noir-900 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
            <span className="text-[11px] font-mono tracking-widest text-apple-silver uppercase">
              OBRA SELECCIONADA & RESULTATS
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white text-apple-headline font-display">
            Casos reals.{' '}
            <span className="text-apple-muted block sm:inline">Impacte demostrable.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            No mesurem l&apos;èxit en impressions buides. El mesurem en visites mèdiques, reserves confirmades i facturació corporativa.
          </p>

          {/* FILTRE INTERACTIU */}
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
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-noir-900 text-apple-muted hover:text-white border border-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA EDITORIAL */}
      <section className="py-24 border-t border-white/[0.06] bg-noir-950">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="luxury-card rounded-3xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-noir-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/10">
                      {project.client}
                    </span>
                  </div>
                </div>

                <div className="p-8 sm:p-10 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-apple-muted block mb-1">
                      {project.category}
                    </span>
                    <h2 className="text-2xl font-bold font-display text-white group-hover:text-ferrari-red transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-apple-muted leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">
                      {project.metric}
                    </span>
                    <Link
                      href="/contacte"
                      className="text-xs font-semibold uppercase tracking-wider text-apple-muted group-hover:text-white transition-colors"
                    >
                      Veure Solució →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-28 text-center border-t border-white/[0.06] bg-noir-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-display text-apple-headline">
            El teu negoci mereix un actiu digital a aquest nivell.
          </h2>
          <p className="text-sm sm:text-base text-apple-muted">
            Acceptem un màxim de 2 projectes simultanis per mantenir aquest estàndard de precisió.
          </p>
          <div className="pt-4">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-ferrari-red hover:bg-ferrari-dark transition-all duration-200 shadow-[0_0_25px_rgba(225,6,0,0.3)]"
            >
              Consultar Calendari de Treball
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
