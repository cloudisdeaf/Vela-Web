import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VELA* · Agència de Desenvolupament Web & Arquitectura Digital d\'Alta Gamma · Manresa',
  description:
    'Dissenyem plataformes web d\'autor, arquitectures d\'alta velocitat i automatitzacions intel·ligents per a empreses líders a Manresa i Catalunya. Codi blindat, disseny estil Apple/Ferrari i garantia de resultats.',
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
        width: 1024,
        height: 1024,
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
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'VELA* Manresa',
  image: 'https://velabages.es/logo.png',
  '@id': 'https://velabages.es',
  url: 'https://velabages.es',
  telephone: '+34600000000',
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Passeig de Pere III',
    addressLocality: 'Manresa',
    addressRegion: 'Barcelona',
    postalCode: '08241',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.7282,
    longitude: 1.8288,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '19:00',
  },
  sameAs: ['https://instagram.com/velamanresa'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-noir-950 text-apple-white selection:bg-ferrari-red/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
