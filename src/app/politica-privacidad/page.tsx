import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacitat & Cookies · VELA Manresa',
  description: 'Informació legal sobre el tractament de dades personals conforme al Reglament General de Protecció de Dades (RGPD) i la LOPD-GDD.',
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-vela-black text-vela-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-vela-gold hover:underline">
          ← Tornar a la pàgina principal
        </Link>

        <header className="border-b border-white/10 pb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-vela-red">Marc Jurídic & RGPD</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-display">
            Política de Privacitat i Protecció de Dades
          </h1>
          <p className="text-xs text-vela-muted mt-2">Darrera actualització: Octubre 2026 · Conforme al Reglament (UE) 2016/679</p>
        </header>

        <div className="space-y-6 text-sm text-vela-text leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">1. Responsable del Tractament</h2>
            <p>
              El responsable del tractament de les teves dades personals és <strong>VELA Manresa</strong>, amb domicili d&apos;activitat a Manresa (Barcelona, Espanya), correu electrònic oficial de contacte: <strong className="text-white">velamanresa@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">2. Dades recopilades i Finalitat</h2>
            <p>Recopilem exclusivament les dades estrictament necessàries per a les següents finalitats:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-vela-light">
              <li><strong>Formulari de Contacte:</strong> Nom, correu electrònic, telèfon i detalls del projecte, amb la finalitat exclusiva de donar resposta a la teva consulta comercial i elaborar la proposta tècnica.</li>
              <li><strong>Dades Tècniques de Navegació:</strong> Adreça IP (anonimitzada) i dades d&apos;agent d&apos;usuari utilitzades amb finalitat de seguretat informàtica, prevenció d&apos;atacs de denegació de servei (DoS/DDoS) i registre de consentiment de cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">3. Base Jurídica del Tractament</h2>
            <p>
              La base legal per al tractament de les dades del formulari és el <strong>consentiment exprés de l&apos;usuari</strong> (Art. 6.1.a RGPD) atorgat en prémer el botó d&apos;enviament, així com l&apos;aplicació de mesures precontractuals (Art. 6.1.b RGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">4. Conservació de les Dades</h2>
            <p>
              Les dades es conservaran durant el temps estrictament necessari per atendre la sol·licitud o mentre existeixi una relació comercial activa, i posteriorment durant els terminis legals d&apos;exigència de responsabilitats derivades del tractament.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">5. Drets de l&apos;Usuari (ARCO / RGPD)</h2>
            <p>Com a titular de les teves dades, pots exercir en qualsevol moment els teus drets:</p>
            <ul className="list-disc pl-5 space-y-1 text-vela-light">
              <li>Dret d&apos;Accés, Rectificació i Supressió (&quot;dret a l&apos;oblit&quot;).</li>
              <li>Dret a la Limitació del tractament i Oposició.</li>
              <li>Dret a la Portabilitat de les dades.</li>
              <li>Dret a retirar el consentiment prestat en qualsevol moment.</li>
            </ul>
            <p className="pt-1">
              Per exercir aquests drets només has d&apos;enviar un correu a <strong className="text-white">velamanresa@gmail.com</strong> indicant com a assumpte &quot;Protecció de Dades&quot; i adjuntant document d&apos;identitat vàlid. Així mateix, tens dret a presentar reclamació davant l&apos;Agència Espanyola de Protecció de Dades (AEPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-display">6. Política de Cookies</h2>
            <p>
              Aquest lloc web utilitza cookies tècniques estrictament necessàries per al seu funcionament. Les cookies analítiques o de tercers només s&apos;instal·len previ consentiment informat mitjançant el nostre gestor interactiu de cookies. Pots revocar o modificar les teves preferències en qualsevol moment des de l&apos;enllaç de configuració del peu de pàgina.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
