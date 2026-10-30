export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface WhyUsItem {
  number: string;
  title: string;
  description: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  metric: string;
  description: string;
  image: string;
  liveUrl?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface SecurityPoint {
  title: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
    logoUrl: string;
    email: string;
    instagram: string;
    instagramHandle: string;
    whatsapp: string;
    location: string;
    availabilityStatus: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlineHighlight: string;
    headlinePart2: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: StatItem[];
  };
  services: ServiceItem[];
  securityGuarantee: {
    headline: string;
    subheadline: string;
    badge: string;
    points: SecurityPoint[];
  };
  whyUs: WhyUsItem[];
  portfolio: ProjectItem[];
  testimonials: TestimonialItem[];
  pricingNote: string;
}
