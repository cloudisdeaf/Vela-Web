'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileQuickBar } from '@/components/MobileQuickBar';
import { defaultSiteContent } from '@/lib/content';

export default function ServeisPage() {
  const content = defaultSiteContent;

  // Configurador interactiu d'inversió
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'web',
  ]);

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const calculateEstimate = () => {
    let total = 0;
    if (selectedFeatures.includes('web')) total += 890;
    if (selectedFeatures.includes('bot')) total += 450;
    if (selectedFeatures.includes('seo')) total += 250;
    if (selectedFeatures.includes('social')) total += 350;
    return total;
  };

  return (
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40 pb-16 md:pb-0">
      <Header content={content} />

      {/* HERO DE SERVEIS */}
      <section className="pt-36 sm:pt-48 pb-16 sm:pb-24 relative spotlight-red text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-noir-900/80 backdrop-blur-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-ferrari-red animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-apple-silver uppercase font-bold">
              DISCIPLINES D&apos;ENGINYERIA · TARIFA TRANSPARENT
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white text-headline font-display">
            Rigor tècnic.{' '}
            <span className="text-shimmer block sm:inline">Sense soroll.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            Desenvolupem arquitectures digitals pensades exclusivament per a empreses que necessiten projectar lideratge i autoritat absoluta.
          </p>
        </div>
      </section>

      {/* CATÀLEG EDITORIAL DELS 4 SERVEIS */}
      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 sm:space-y-12">
          {content.services.map((service, index) => (
            <div
              key={service.id}
              className="luxury-card rounded-3xl p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-apple-muted tracking-widest uppercase font-bold group-hover:text-ferrari-red transition-colors">
                    0{index + 1} //
                  </span>
                  {service.popular && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-ferrari-red/15 text-ferrari-red border border-ferrari-red/30">
                      ESTÀNDARD CORPORATIU
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold font-display text-white">
                  {service.title}
                </h2>

                <p className="text-xs font-mono text-apple-muted uppercase tracking-wider">
                  {service.tagline}
                </p>

                <p className="text-sm sm:text-base text-apple-silver leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/[0.08]">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-apple-silver">
                      <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red flex-shrink-0"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-noir-900/90 border border-white/[0.08] flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-apple-muted block mb-1">
                    Preu Tancat per Contracte
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-display text-white">
                    {service.price}
                  </div>
                  <p className="text-xs text-apple-muted mt-2">
                    Lliurament garantit per escrit amb acord de confidencialitat (NDA).
                  </p>
                </div>

                <Link
                  href={`/contacte?servei=${encodeURIComponent(service.title)}`}
                  className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-center text-white btn-ferrari-glow block"
                >
                  Demanar Proposta
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESTIMADOR INTERACTIU DE PROJECTE ESTIL FERRARI CONFIGURATOR */}
      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-900/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-bold">
              CONFIGURADOR D&apos;ARQUITECTURA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display text-headline">
              Configura el teu pla digital.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-apple-muted">
              Selecciona els components que requereix el teu negoci per obtenir una estimació d&apos;inversió immediata.
            </p>
          </div>

          <div className="luxury-card rounded-3xl p-6 sm:p-10 md:p-12 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => toggleFeature('web')}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedFeatures.includes('web')
                    ? 'bg-noir-850 border-ferrari-red shadow-[0_0_20px_rgba(255,30,22,0.25)]'
                    : 'bg-noir-900 border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white font-display">Plataforma Web d&apos;Autor</span>
                  <span className="text-xs font-mono text-apple-silver font-bold">890 €</span>
                </div>
                <p className="text-xs text-apple-muted">Next.js 14, codi a mida, velocitat &lt; 0.4s i SEO integrat.</p>
              </button>

              <button
                type="button"
                onClick={() => toggleFeature('bot')}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedFeatures.includes('bot')
                    ? 'bg-noir-850 border-ferrari-red shadow-[0_0_20px_rgba(255,30,22,0.25)]'
                    : 'bg-noir-900 border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white font-display">Automatització WhatsApp</span>
                  <span className="text-xs font-mono text-apple-silver font-bold">450 €</span>
                </div>
                <p className="text-xs text-apple-muted">Atenció 24/7/365, tancament de cites i integració CRM.</p>
              </button>

              <button
                type="button"
                onClick={() => toggleFeature('seo')}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedFeatures.includes('seo')
                    ? 'bg-noir-850 border-ferrari-red shadow-[0_0_20px_rgba(255,30,22,0.25)]'
                    : 'bg-noir-900 border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white font-display">Domini Local Google & SEO</span>
                  <span className="text-xs font-mono text-apple-silver font-bold">250 €</span>
                </div>
                <p className="text-xs text-apple-muted">Fitxa Google Business optimitzada i posicionament a Manresa.</p>
              </button>

              <button
                type="button"
                onClick={() => toggleFeature('social')}
                className={`p-6 rounded-2xl text-left border transition-all cursor-pointer ${
                  selectedFeatures.includes('social')
                    ? 'bg-noir-850 border-ferrari-red shadow-[0_0_20px_rgba(255,30,22,0.25)]'
                    : 'bg-noir-900 border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-white font-display">Direcció d&apos;Imatge & Xarxes</span>
                  <span className="text-xs font-mono text-apple-silver font-bold">350 €/mes</span>
                </div>
                <p className="text-xs text-apple-muted">Contingut cinematogràfic d&apos;alta conversió per a xarxes.</p>
              </button>
            </div>

            <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-apple-muted uppercase tracking-widest block">
                  Inversió Total Estimada
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white font-display">
                  {calculateEstimate()} €
                </span>
              </div>

              <Link
                href="/contacte"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow text-center cursor-pointer"
              >
                Bloquejar aquest Pressupost
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer content={content} />
      <MobileQuickBar content={content} />
    </main>
  );
}
