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
    <main className="min-h-screen bg-void text-white selection:bg-cyber-crimson/30">
      <Header content={content} />

      {/* HERO DE CONTACTE */}
      <section className="pt-36 sm:pt-44 pb-12 relative tech-grid overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] glow-orb-crimson rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-800 border border-white/10 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            MANRESA: 41.7282° N, 1.8288° E · CATALUNYA
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Comença a jugar en una{' '}
            <span className="text-gradient-crimson">categoria superior</span>.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            Parla directament amb el nostre equip d&apos;enginyeria. Respondrem a la teva sol·licitud en menys de 24 hores laborables sota estricta confidencialitat.
          </p>
        </div>
      </section>

      {/* FORMULARI INTEGRAT DE CONTACTE */}
      <ContactForm content={content} />

      {/* FAQS DE MÀXIMA CONFIANÇA */}
      <section className="py-24 bg-space-900/60 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block mb-2">
              PREGUNTES FREQÜENTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
              Transparència absoluta abans de començar
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/[0.06] space-y-2">
                <h3 className="text-base sm:text-lg font-bold font-display text-white">
                  {faq.q}
                </h3>
                <p className="text-sm text-titanium-400 leading-relaxed">
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
