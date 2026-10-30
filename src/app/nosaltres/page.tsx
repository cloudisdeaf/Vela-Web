import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
      title: 'Auditoria Estratègica & Signatura de l\'Acord',
      description: 'Ens asseiem amb tu per analitzar el teu client ideal, competidors locals i objectius comercials. Signem el contracte amb data de lliurament fixada.',
    },
    {
      day: 'Dia 02 - 04',
      title: 'Arquitectura, Disseny en Figma & Ciberseguretat',
      description: 'Dissenyem la interfície a mida sense cap plantilla genèrica. Estruturem el codi en Next.js, integrem el motor SEO i configurem els escuts de seguretat.',
    },
    {
      day: 'Dia 05 - 06',
      title: 'Integració d\'Automatitzacions & Proves de Càrrega',
      description: 'Connectem el bot intel·ligent de WhatsApp, la passarel·la de reserves o pagament, i sotmetem la plataforma a proves d\'estrès i velocitat (Core Web Vitals).',
    },
    {
      day: 'Dia 07',
      title: 'Desplegament Global a Producció & Traspàs de Claus',
      description: 'Publiquem el teu projecte al domini oficial amb certificat SSL de 256 bits i t\'entreguem les credencials del panell CMS visual per tenir control absolut.',
    },
  ];

  return (
    <main className="min-h-screen bg-void text-white selection:bg-cyber-crimson/30">
      <Header content={content} />

      {/* HERO DE L'ESTUDI */}
      <section className="pt-36 sm:pt-44 pb-20 relative tech-grid overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[550px] h-[300px] glow-orb-crimson rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-space-800 border border-white/10 text-cyber-amber text-xs font-mono uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-cyber-amber animate-pulse"></span>
            MANIFEST FUNDACIONAL · MANRESA
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Vam néixer per acabar amb les{' '}
            <span className="text-gradient-crimson">webs lentes i inútils</span>.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            Massa empreses de la nostra ciutat han pagat milers d&apos;euros per pàgines de WordPress que triguen 6 segons a obrir-se i ningú visita. VELA és la resposta tecnològica d&apos;elit.
          </p>
        </div>
      </section>

      {/* MANIFEST SECTION */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel space-y-6">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block">
              FILOSOFIA IRRENUNCIABLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Codi d&apos;autor, proximitat de Manresa i compromís incondicional
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-titanium-300 leading-relaxed">
              <p>
                A VELA creiem que un negoci local no té per què conformar-se amb un disseny de segona fila. Les eines que utilitzem són exactament les mateixes que fan servir els gegants tecnològics mundials: <strong>Next.js, TypeScript, xarxes CDN globals i models d&apos;intel·ligència artificial d&apos;última generació</strong>.
              </p>
              <p>
                La diferència és que nosaltres estem aquí, a Manresa. Ens pots mirar als ulls, compartir un cafè al Passeig i saber amb certesa que el teu projecte està en mans d&apos;enginyers que responen al telèfon de manera immediata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA DE 7 DIES */}
      <section className="py-20 bg-space-900/60 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest block mb-2">
              PRECISIÓ CRONOMETRADA
            </span>
            <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
              Com treballem: De la idea a la facturació en 7 dies
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-space-800/70 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-cyber-crimson font-bold uppercase tracking-wider block mb-3">
                    {step.day}
                  </span>
                  <h4 className="text-lg font-bold font-display text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-titanium-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRIDA A L'ACCIÓ */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            Vols coneixe&apos;ns i parlar del teu projecte?
          </h2>
          <p className="text-sm sm:text-base text-titanium-400">
            Agenda una trobada presencial a Manresa o per videoconferència.
          </p>
          <div className="pt-2">
            <Link
              href="/contacte"
              className="inline-block px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyber-amber to-yellow-300 hover:brightness-110 active:scale-95 transition-all shadow-xl"
            >
              Contactar amb l&apos;Equip de VELA
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
