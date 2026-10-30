import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Termes i Condicions de Contractació · VELA Manresa',
  description: 'Condicions generals de prestació de serveis digitals, acords de nivell de servei (SLA) i propietat intel·lectual de VELA.',
};

export default async function TerminosPage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-noir-950 text-apple-white selection:bg-ferrari-red/40">
      <Header content={content} />

      <section className="pt-40 sm:pt-48 pb-28 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-apple-muted hover:text-white transition-colors">
            ← Tornar a la pàgina principal
          </Link>

          <header className="border-b border-white/[0.08] pb-8">
            <span className="text-xs uppercase font-mono tracking-widest text-ferrari-red font-semibold">Condicions Contractuals</span>
            <h1 className="text-4xl sm:text-6xl font-black text-white mt-3 font-display text-apple-headline">
              Termes i Condicions de Servei
            </h1>
            <p className="text-xs font-mono text-apple-muted mt-3">Darrera actualització: Octubre 2026 · VELA Manresa</p>
          </header>

          <div className="space-y-8 text-sm sm:text-base text-apple-muted leading-relaxed">
            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">1. Objecte i Àmbit d&apos;Aplicació</h2>
              <p>
                Aquests Termes i Condicions regulen l&apos;accés i ús del lloc web de <strong>VELA Manresa</strong>, així com els principis generals que regeixen els nostres serveis professionals de disseny web, automatització, ciberseguretat i consultoria digital.
              </p>
            </section>

            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">2. Pressupostos i Contractació</h2>
              <p>
                Tots els serveis professionals oferts es formalitzen mitjançant un contracte mercantil o pressupost vinculant signat per ambdues parts. Cap feina de desenvolupament o consultoria s&apos;inicia sense aprovació explícita i pagament de la provisió acordada.
              </p>
            </section>

            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">3. Propietat Intel·lectual i Cessió de Codi</h2>
              <p>
                A VELA defensem la plena sobirania digital dels nostres clients: un cop satisfet el 100% de l&apos;import acordat pel projecte, <strong>la totalitat dels actius digitals, dissenys, repositori de codi font i credencials d&apos;allotjament passen a ser propietat exclusiva del client</strong>. VELA no reté ni cobra quotes de rescat ni bloqueja dominis.
              </p>
            </section>

            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">4. Acord de Nivell de Servei (SLA) i Terminis</h2>
              <p>
                Els terminis de lliurament acordats són vinculants. En cas d&apos;endarreriment atribuïble exclusivament a VELA no justificat per força major o retard del client en el lliurament de continguts, s&apos;aplicaran les compensacions previstes en el contracte particular.
              </p>
            </section>

            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">5. Confidencialitat (NDA)</h2>
              <p>
                Ambdues parts s&apos;obliguen a mantenir estricta reserva de qualsevol dada, mètode, estratègia comercial o informació tècnica coneguda amb motiu del projecte, obligació que perviurà amb caràcter indefinit després de la finalització dels treballs.
              </p>
            </section>

            <section className="luxury-card rounded-3xl p-8 sm:p-10 space-y-3">
              <h2 className="text-xl font-bold text-white font-display">6. Legislació Aplicable i Jurisdicció</h2>
              <p>
                Aquests termes es regeixen per la legislació espanyola i comunitària europea. Per a la resolució de qualsevol controvèrsia que pogués derivar-se, les parts se sotmeten expressament als Jutjats i Tribunals de la ciutat de <strong>Manresa (Barcelona)</strong>.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  );
}
