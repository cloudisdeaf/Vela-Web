import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileQuickBar } from '@/components/MobileQuickBar';

export const metadata: Metadata = {
  title: 'L\'Estudi & Manifest · VELA Manresa',
  description:
    'L\'equip i la filosofia darrere de VELA: enginyeria de software d\'alta precisió per elevar el teixit empresarial de Manresa i el Bages.',
};

export default async function NosaltresPage() {
  const content = await getSiteContent();

  const timelineSteps = [
    {
      day: 'Dia 01',
      title: 'Auditoria Estratègica & Acord Legal',
      description: 'Definim objectius comercials, analitzem el teu mercat i signem el contracte mercantil amb data d\'entrega tancada i acord NDA.',
    },
    {
      day: 'Dia 02 - 04',
      title: 'Arquitectura & Disseny a Mida en Figma',
      description: 'Construïm la interfície des de zero sense plantilles prefabricades. Codi net en Next.js 14, responsive i optimitzat per a SEO.',
    },
    {
      day: 'Dia 05 - 06',
      title: 'Automatitzacions & Proves de Ciberseguretat',
      description: 'Connectem el bot intel·ligent de WhatsApp i sotmetem la plataforma a auditories de velocitat Core Web Vitals i vulnerabilitats OWASP.',
    },
    {
      day: 'Dia 07',
      title: 'Llançament a Producció & Lliurament de Claus',
      description: 'Publiquem el projecte al domini oficial amb certificat SSL i t\'entreguem l\'accés complet al panell CMS visual.',
    },
  ];

  return (
    <main className="min-h-screen bg-noir-950 text-white selection:bg-ferrari-red/40 pb-16 md:pb-0">
      <Header content={content} />

      <section className="pt-36 sm:pt-48 pb-16 sm:pb-24 relative spotlight-red text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-noir-900/80 backdrop-blur-xl mb-8">
            <span className="w-2 h-2 rounded-full bg-ferrari-red animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-apple-silver uppercase font-bold">
              MANIFEST DE L&apos;ESTUDI · MANRESA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white text-headline font-display">
            Vam crear VELA per{' '}
            <span className="text-shimmer block sm:inline">exigir més.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-apple-muted max-w-2xl mx-auto leading-relaxed">
            Massa negocis de la nostra ciutat han estat enganyats amb plantilles que triguen 6 segons a obrir-se i ningú visita. Nosaltres fem enginyeria de debò.
          </p>
        </div>
      </section>

      {/* MANIFEST EDITORIAL */}
      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="luxury-card rounded-3xl p-6 sm:p-12 md:p-14 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-ferrari-red block font-bold">
              FILOSOFIA IRRENUNCIABLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              Codi d&apos;autor, proximitat real i compromís incondicional
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-apple-silver leading-relaxed">
              <p>
                Creiem fermament que una empresa de Manresa no té per què conformar-se amb un disseny de segona fila. Les eines que utilitzem són les mateixes que utilitzen marques com <strong>Apple, Stripe o Ferrari: Next.js, infraestructura Serverless a la UE i models d&apos;IA de màxima precisió</strong>.
              </p>
              <p>
                La gran diferència és que nosaltres som d&apos;aquí. Ens asseiem amb tu al Bages, ens pots mirar als ulls i saber amb certesa que el teu projecte està en mans de professionals que responen immediatament.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA DE 7 DIES */}
      <section className="py-20 sm:py-28 border-t border-white/[0.08] bg-noir-900/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-12 sm:mb-20">
            <span className="text-xs font-mono uppercase tracking-widest text-apple-silver block mb-3 font-bold">
              EL MÈTODE VELA
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white font-display text-headline">
              De la idea al llançament en 7 dies.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="luxury-card rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-ferrari-red font-bold uppercase tracking-wider block mb-3">
                    {step.day} //
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2 font-display">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-apple-silver leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-ferrari-red/40 rounded-full"></div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white btn-ferrari-glow"
            >
              Començar el Dia 01 amb VELA
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
      <MobileQuickBar content={content} />
    </main>
  );
}
