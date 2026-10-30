import { SiteContent } from './types';

export const defaultSiteContent: SiteContent = {
  brand: {
    name: 'VELA*',
    tagline: 'Veiem Empreses Locals Avançar',
    subTagline: 'Agència de Desenvolupament Web & Arquitectura Digital d\'Alta Gamma',
    logoUrl: '/logo.png',
    email: 'velamanresa@gmail.com',
    instagram: 'https://instagram.com/velamanresa',
    instagramHandle: '@velamanresa',
    whatsapp: 'https://wa.me/34600000000',
    location: 'Manresa, Barcelona · Catalunya',
    availabilityStatus: 'Q4 / 2026: Disponibilitat per a 2 projectes exclusius',
  },
  hero: {
    badge: 'AGÈNCIA DE DISSENY WEB D\'ALTA GAMMA · MANRESA',
    headlinePart1: 'Enginyeria digital per a marques que no accepten',
    headlineHighlight: 'ser una més.',
    headlinePart2: 'Convertim la teva presència en un actiu de màxim valor.',
    subheadline:
      'Dissenyem plataformes web d\'autor, arquitectures d\'alta velocitat i automatitzacions intel·ligents. Sense plantilles prefabricades. Amb contractes blindats, confidencialitat absoluta i seguretat de nivell bancari.',
    ctaPrimary: 'Sol·licitar Proposta Confidencial',
    ctaSecondary: 'Explorar Obra & Casos d\'Èxit',
    stats: [
      { value: '100/100', label: 'Rendiment en Core Web Vitals' },
      { value: '<1s', label: 'Temps de càrrega global' },
      { value: '99.99%', label: 'SLA de disponibilitat garantit' },
      { value: '100% Blindat', label: 'Conformitat RGPD & Xifratge' },
    ],
  },
  services: [
    {
      id: 'web-elite',
      icon: 'Shield',
      title: 'Plataformes Web d\'Autor',
      tagline: 'Next.js 14, Tailwind CSS & Animacions Awwwards',
      description:
        'Desenvolupament a mida sense dependències obsoletes ni CMS lents. Codi net, auditat contra atacs OWASP, optimitzat per a posicionament SEO número 1 a Catalunya i experiències d\'usuari memorables.',
      price: 'Des de 890 €',
      features: [
        'Arquitectura Next.js App Router ultra-ràpida',
        'Disseny exclusiu en Figma (0% plantilles)',
        'Optimització d\'alta conversió UI/UX',
        'Auditoria de ciberseguretat & Certificat SSL Pro',
        'Adaptabilitat fluida a dispositius mòbils',
      ],
      popular: true,
    },
    {
      id: 'whatsapp-automation',
      icon: 'Cpu',
      title: 'Automatització & Bots WhatsApp',
      tagline: 'Atenció al client intel·ligent 24/7/365',
      description:
        'Sistemes d\'automatització que responen en segons, agenden visites i qualifiquen clients potencials directament a WhatsApp Business i CRM sense intervenció humana constant.',
      price: 'Des de 450 € + 49 €/mes',
      features: [
        'Respostes contextualitzades en català i castellà',
        'Integració directa amb calendaris i bases de dades',
        'Tancament automàtic de reserves i sol·licituds',
        'Panell d\'estadístiques de conversió a temps real',
        'Manteniment proactiu i actualitzacions',
      ],
    },
    {
      id: 'social-growth',
      icon: 'Zap',
      title: 'Direcció d\'Imatge & Redes',
      tagline: 'Posicionament d\'autoritat al mercat local',
      description:
        'Estratègia de contingut cinematogràfic, disseny d\'actius digitals i narració de marca que posicionen el teu negoci com el líder indiscutible del Bages.',
      price: 'Des de 350 €/mes',
      features: [
        '12 publicacions mensuals d\'alt impacte visual',
        'Copywriting persuasiu orientat a vendes',
        'Fotografia i contingut adaptat a la identitat de marca',
        'Informe d\'impacte i mètriques mensuals',
      ],
    },
    {
      id: 'local-authority',
      icon: 'Globe',
      title: 'Domini Local Google & SEO',
      tagline: 'Apareix davant de tothom quan busquen el teu servei',
      description:
        'Optimització quirúrgica de la fitxa de Google Business, esquemes locals rics i estratègia de paraules clau per capturar el 100% de les cerques a Manresa i comarca.',
      price: 'Des de 250 € (pagament únic)',
      features: [
        'Auditoria i sanejament complet del perfil a Google Maps',
        'Estratègia d\'adquisició sistemàtica de ressenyes 5 estrelles',
        'Paraules clau d\'alta intenció comercial local',
        'Indexació prioritària a cercadors',
      ],
    },
  ],
  securityGuarantee: {
    badge: 'MÀXIMA SEGURETAT & RIGOR JURÍDIC',
    headline: 'Per què les empreses més exigents confien cegament en VELA',
    subheadline:
      'No som aficionats que instal·len plugins insegurs. Implementem protocols d\'enginyeria de software que protegeixen la teva reputació, les dades dels teus clients i la continuïtat del teu negoci.',
    points: [
      {
        icon: 'Lock',
        title: 'Acord de Confidencialitat (NDA) des del primer minut',
        description:
          'Protegim la informació estratègica del teu negoci mitjançant contractes legalment vinculants abans d\'iniciar qualsevol auditoria o desenvolupament.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Compliment Estricte del RGPD / LOPD-GDD',
        description:
          'Gestió de consentiments legalment vàlida, sense vulnerabilitats en formularis, emmagatzematge xifrat de dades a la Unió Europea i textos legals auditats.',
      },
      {
        icon: 'CheckCircle',
        title: 'Codi de Propietat 100% Teu (Sense Segrests de Domini)',
        description:
          'Entreguem tot el repositori de codi i credencials d\'accés directe. No retenim mai els actius digitals dels nostres clients ni cobrem quotes d\'escapatòria.',
      },
      {
        icon: 'Activity',
        title: 'Auditoria de Vulnerabilitats OWASP Top 10',
        description:
          'Tots els llocs s\'entreguen blindats contra injeccions XSS, atacs CSRF, manipulació de formularis i escanejos automatitzats de bots maliciosos.',
      },
    ],
  },
  whyUs: [
    {
      number: '01',
      title: 'Arrelats a Manresa, amb estàndards internacionals',
      description:
        'Parlem el teu idioma, coneixem el teixit industrial i comercial del Bages i treballem colze a colze amb tu, no des d\'un call-center a 2.000 km.',
      badge: 'PROXIMITAT REAL',
    },
    {
      number: '02',
      title: 'Zero plantilles genèriques de WordPress',
      description:
        'Les webs lentes i insegures costen diners en vendes perdudes. Construïm sobre Next.js (el mateix motor que utilitzen marques com Ferrari, Apple o Stripe).',
      badge: 'RENDIMENT LÍDER',
    },
    {
      number: '03',
      title: 'Terminis de lliurament fixats per contracte',
      description:
        'Si acordem lliurar en 10 dies laborables, lliurem en 10 dies. Respectem el teu calendari comercial com si fos el nostre propi.',
      badge: 'COMPROMÍS FIRME',
    },
    {
      number: '04',
      title: 'Retorn d\'inversió demostrable',
      description:
        'Una web no és una despesa decorativa, és un comercial d\'elit que ven 24 hores al dia. El nostre enfocament està orientat exclusivament a la facturació.',
      badge: 'ORIENTAT A RESULTATS',
    },
  ],
  portfolio: [
    {
      id: 'cas-1',
      title: 'Clínica Mèdica & Odontologia Bages',
      client: 'Sector Sanitari Privat',
      category: 'Plataforma Web + Bot de Cites',
      metric: '+310% primeres consultes en 60 dies',
      description:
        'Desenvolupament web integral amb integració d\'intel·ligència artificial per a gestió d\'agendes mèdiques privades i protecció de dades sanitàries.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-2',
      title: 'Can Prat Enginyeria & Automoció',
      client: 'Taller Especialitzat & Renting',
      category: 'Web Corporativa + WhatsApp CRM',
      metric: '0 trucades perdudes en horari d\'obertura',
      description:
        'Plataforma d\'autoritat digital que automatitza pressupostos preliminars i centralitza el contacte de clients prèmium del Bages.',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'cas-3',
      title: 'Boutique D\'Autor & Moda Manresa',
      client: 'Retail d\'Alta Gamma',
      category: 'Catàleg Digital & Estratègia Social',
      metric: 'ROI x4.8 en campanyes locals',
      description:
        'Experiència digital minimalista i exclusiva que transmet el valor de la confecció local artesanal a un públic d\'alt poder adquisitiu.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    },
  ],
  testimonials: [
    {
      quote:
        'Treballar amb VELA ha estat la decisió digital més rendible dels nostres 14 anys d\'activitat. Ens han donat una imatge de prestigi impecable i el flux de clients privats s\'ha triplicat.',
      author: 'Dr. Marc Castells',
      role: 'Director Mèdic',
      company: 'Clínica Especialitzada Manresa',
      rating: 5,
    },
    {
      quote:
        'Veníem d\'una mala experiència amb una agència de Barcelona que ens cobrava quotes mensuals sense donar cap resultat. VELA va blindar el projecte amb dates i contracte tancat. Rigor absolut.',
      author: 'Laura Rovira',
      role: 'Sòcia Fundadora',
      company: 'Rovira & Associats Gestió Empresarial',
      rating: 5,
    },
    {
      quote:
        'El bot de WhatsApp combinat amb la nova web ha canviat la nostra operativa diària. El client té la resposta en 5 segons i arriba al taller amb la cita tancada.',
      author: 'Joan Carles Prat',
      role: 'Cap d\'Operacions',
      company: 'Can Prat Servei Oficial',
      rating: 5,
    },
  ],
  pricingNote:
    'Tots els preus són transparents i es formalitzen mitjançant pressupost firmat previ inici de feina. Facturació legal reglamentària amb IVA desglossat.',
};
