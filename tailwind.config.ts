import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#000000',
          900: '#060606',
          850: '#0A0A0A',
          800: '#101010',
          700: '#161616',
          600: '#222222',
        },
        ferrari: {
          red: '#E10600',
          dark: '#B00400',
          glow: 'rgba(225, 6, 0, 0.15)',
        },
        apple: {
          white: '#F5F5F7',
          silver: '#E5E5EA',
          muted: '#86868B',
          dark: '#424245',
        },
        gold: {
          satin: '#D4AF37',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
