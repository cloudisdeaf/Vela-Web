import { getSiteContent } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { SecurityGuarantee } from '@/components/SecurityGuarantee';
import { WhyUs } from '@/components/WhyUs';
import { Portfolio } from '@/components/Portfolio';
import { Testimonials } from '@/components/Testimonials';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export const revalidate = 60; // Regeneració incremental cada 60 segons

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-vela-black relative selection:bg-vela-red/30">
      <Header content={content} />
      <Hero content={content} />
      <Services content={content} />
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
