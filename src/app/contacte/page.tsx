import React from 'react';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacte Confidencial & Sol·licitud de Proposta · VELA Manresa',
  description:
    'Sol·licita una auditoria digital confidencial per al teu negoci a Manresa. Respondrem en menys de 24 hores.',
};

export default async function ContactePage() {
  const content = await getSiteContent();

  const faqs = [
    {
      q: 'Quant de temps triga exactament el desenvolupament?',
      a: 'Per contracte, el termini de lliurament per a la majoria de plataformes és de 7 a 10 dies laborables des de l\'aprovació de la proposta tècnica.',
    },
    {
      q: 'Com funciona l\'estructura de pagament?',
      a: 'Treballem amb un esquema segur: 50% en formalitzar el contracte i iniciar l\'arquitectura, i el 50% restant únicament un cop la web estigui provada i desplegada a la teva plena satisfacció.',
    },
    {
      q: 'Necessito aportar fotos o redactar textos?',
      a: 'No és necessari. El nostre equip s\'encarrega de redactar tots els textos persuasius orientats a vendes i de seleccionar o crear els actius visuals d\'alta gamma adaptats a la teva marca.',
    },
    {
      q: 'Qui serà el propietari legal del domini i del codi?',
      a: 'Tu, al 100%. A diferència d\'altres agències que retenen els dominis, a VELA t\'entreguem tot el repositori de codi i els accessos totals al teu nom sense cap clàusula de permanència.',
    },
  ];

  return (
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40">
      <Header content={content} />

      {/* HERO DE CONTACTE */}
      <section className="pt-40 sm:pt-48 pb-16 relative spotlight-red text-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-noir-900 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-ferrari-red"></span>
            <span className="text-[11px] font-mono tracking-widest text-apple-silver uppercase">
              CANAL DIRECTE AMB L&apos;ENGINYERIA · MANRESA
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white text-apple-headline font-display">
            Inicia la teva{' '}
            <span className="text-apple-muted block sm:inline">transformació.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            Parla directament amb el nostre equip d&apos;enginyeria. Respondrem a la teva sol·licitud en menys de 24 hores laborables sota estricta confidencialitat.
          </p>
        </div>
      </section>

      {/* FORMULARI INTEGRAT DE CONTACTE */}
      <ContactForm content={content} />

      {/* FAQS DE MÀXIMA CONFIANÇA */}
      <section className="py-28 bg-noir-900 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-16 sm:mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block mb-3 font-semibold">
              PREGUNTES FREQÜENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-display text-apple-headline">
              Transparència absoluta abans de començar.
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  {faq.q}
                </h3>
                <p className="text-sm text-apple-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
