import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        vela: {
          black: '#0A0A0A',
          dark: '#111111',
          surface: '#161616',
          card: '#1C1C1C',
          border: '#2A2A2A',
          muted: '#666666',
          text: '#999999',
          light: '#CCCCCC',
          white: '#F5F5F5',
          red: '#FF2D2D',
          'red-dark': '#CC2424',
          'red-glow': '#FF4444',
          gold: '#FFB800',
          'gold-dark': '#CC9300',
          'gold-glow': '#FFD54F',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-vela': 'linear-gradient(135deg, #FF2D2D 0%, #FFB800 100%)',
        'gradient-vela-subtle': 'linear-gradient(135deg, rgba(255,45,45,0.1) 0%, rgba(255,184,0,0.1) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '30%': { transform: 'translate(3%, -15%)' },
          '50%': { transform: 'translate(12%, 9%)' },
          '70%': { transform: 'translate(9%, 4%)' },
          '90%': { transform: 'translate(-1%, 7%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
