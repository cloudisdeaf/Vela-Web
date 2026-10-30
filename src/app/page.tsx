import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { CockpitBenchmark } from '@/components/CockpitBenchmark';
import { SecurityGuarantee } from '@/components/SecurityGuarantee';
import { WhyUs } from '@/components/WhyUs';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export const revalidate = 60; // Regeneració incremental en segons

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-noir-950 text-apple-white selection:bg-ferrari-red/40 relative overflow-hidden">
      <Header content={content} />
      <Hero content={content} />
      <Services content={content} />
      <CockpitBenchmark />
      <SecurityGuarantee content={content} />
      <WhyUs content={content} />
      <Portfolio content={content} />
      <Testimonials content={content} />
      <ContactForm content={content} />
      <Footer content={content} />
      <CookieBanner />
    </main>
  );
}
