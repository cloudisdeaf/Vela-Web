import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#050608',
          900: '#0A0C12',
          850: '#0F121A',
          800: '#141724',
          700: '#1C2133',
          600: '#2A3047',
        },
        noir: {
          950: '#050608',
          900: '#090B10',
          850: '#0E1118',
          800: '#141822',
          700: '#1C202C',
          600: '#282E3E',
        },
        ferrari: {
          DEFAULT: '#FF1E16',
          red: '#FF1E16',
          crimson: '#E10600',
          dark: '#B00400',
          glow: 'rgba(255, 30, 22, 0.25)',
          light: '#FF4D45',
        },
        apple: {
          white: '#F5F5F7',
          silver: '#E5E5EA',
          muted: '#A1A1A6',
          dark: '#6E6E73',
          card: 'rgba(15, 18, 26, 0.75)',
        },
        gold: {
          satin: '#E5B842',
          pure: '#D4AF37',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
