import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termes i Condicions de Contractació · VELA Manresa',
  description: 'Condicions generals de prestació de serveis digitals, acords de nivell de servei (SLA) i propietat intel·lectual de VELA.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-vela-black text-vela-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-vela-gold hover:underline">
          ← Tornar a la pàgina principal
        </Link>

        <header className="border-b border-white/10 pb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-vela-red">Condicions Contractuals</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
            Termes i Condicions de Servei
          </h1>
          <p className="text-xs text-vela-muted mt-2">Darrera actualització: Octubre 2026 · VELA Manresa</p>
        </header>

        <div className="space-y-6 text-sm text-vela-text leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Objecte i Àmbit d&apos;Aplicació</h2>
            <p>
              Aquests Termes i Condicions regulen l&apos;accés i ús del lloc web de <strong>VELA Manresa</strong>, així com els principis generals que regeixen els nostres serveis professionals de disseny web, automatització, ciberseguretat i consultoria digital.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. Pressupostos i Contractació</h2>
            <p>
              Tots els serveis professionals oferts es formalitzen mitjançant un contracte mercantil o pressupost vinculant signat per ambdues parts. Cap feina de desenvolupament o consultoria s&apos;inicia sense aprovació explícita i pagament de la provisió acordada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Propietat Intel·lectual i Cessió de Codi</h2>
            <p>
              A VELA defensem la plena sobirania digital dels nostres clients: un cop satisfet el 100% de l&apos;import acordat pel projecte, <strong>la totalitat dels actius digitals, dissenys, repositori de codi font i credencials d&apos;allotjament passen a ser propietat exclusiva del client</strong>. VELA no reté ni cobra quotes de rescat ni bloqueja dominis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. Acord de Nivell de Servei (SLA) i Terminis</h2>
            <p>
              Els terminis de lliurament acordats són vinculants. En cas d&apos;endarreriment atribuïble exclusivament a VELA no justificat per força major o retard del client en el lliurament de continguts, s&apos;aplicaran les compensacions previstes en el contracte particular.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">5. Confidencialitat (NDA)</h2>
            <p>
              Ambdues parts s&apos;obliguen a mantenir estricta reserva de qualsevol dada, mètode, estratègia comercial o informació tècnica coneguda amb motiu del projecte, obligació que perviurà amb caràcter indefinit després de la finalització dels treballs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">6. Legislació Aplicable i Jurisdicció</h2>
            <p>
              Aquests termes es regeixen per la legislació espanyola i comunitària europea. Per a la resolució de qualsevol controvèrsia que pogués derivar-se, les parts se sotmeten expressament als Jutjats i Tribunals de la ciutat de <strong>Manresa (Barcelona)</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
