import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VELA* · Agència de Desenvolupament Web & Arquitectura Digital d\'Alta Gamma · Manresa',
  description:
    'Dissenyem plataformes web d\'autor, arquitectures d\'alta velocitat i automatitzacions intel·ligents per a empreses líders a Manresa i Catalunya. Codi blindat, disseny Awwwards i garantia de resultats.',
  keywords: [
    'disseny web manresa',
    'agència digital manresa',
    'desenvolupament web bages',
    'bots whatsapp empreses',
    'creació web catalunya',
    'posicionament seo manresa',
    'arquitectura nextjs',
  ],
  authors: [{ name: 'VELA Manresa', url: 'https://velabages.es' }],
  creator: 'VELA Digital Studio',
  publisher: 'VELA Manresa',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'ca_ES',
    url: 'https://velabages.es',
    title: 'VELA* · Desenvolupament Web d\'Alta Gamma · Manresa',
    description: 'Enginyeria digital per a marques que no accepten ser una més. Seguretat blindada i rendiment 100/100.',
    siteName: 'VELA Manresa',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'VELA Manresa Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELA* · Agència Digital Manresa',
    description: 'Plataformes web d\'autor i automatitzacions per a empreses del Bages.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className="scroll-smooth">
      <body className="bg-vela-black text-vela-white selection:bg-vela-red/30 selection:text-white grain antialiased">
        {children}
      </body>
    </html>
  );
}
