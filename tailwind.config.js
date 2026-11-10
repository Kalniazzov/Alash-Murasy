/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#F3EBDD',
        'archive-paper': '#E2D2B8',
        'ink-brown': '#382B25',
        'deep-burgundy': '#722F35',
        'forest-ink': '#202A27',
        'muted-gold': '#B18A52',
        'soft-line': '#CDBFA9',
        burgundy: {
          DEFAULT: '#722F35',
          hover: '#5b252a',
          light: '#8b3a41',
        },
        ivory: {
          DEFAULT: '#F3EBDD',
          light: '#FAF6EE',
          dark: '#E8DEC9',
        },
        paper: {
          DEFAULT: '#E2D2B8',
          light: '#EFE5D3',
          dark: '#D5C2A3',
        },
        ink: {
          DEFAULT: '#382B25',
          light: '#544239',
          dark: '#241B17',
        },
        forest: {
          DEFAULT: '#202A27',
          light: '#2E3D39',
          dark: '#141B19',
        },
        gold: {
          DEFAULT: '#B18A52',
          light: '#C7A26B',
          dark: '#936F3A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Manrope"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Consolas', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'parchment': '0 4px 20px -2px rgba(56, 43, 37, 0.08), 0 2px 6px -1px rgba(56, 43, 37, 0.04)',
        'parchment-hover': '0 8px 30px -4px rgba(56, 43, 37, 0.14), 0 4px 10px -2px rgba(56, 43, 37, 0.08)',
        'modal': '0 20px 40px -15px rgba(32, 42, 39, 0.3)',
        'subtle': '0 1px 3px rgba(56, 43, 37, 0.06)',
      },
      borderRadius: {
        'card': '6px',
        'button': '4px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.86)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'scroll-dot': {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'fade-in': 'fade-in 1.2s ease-out both',
        'scale-in': 'scale-in 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        'spin-slow': 'spin-slow 60s linear infinite',
        'spin-slower': 'spin-slow 120s linear infinite reverse',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 6s linear infinite',
        'scroll-dot': 'scroll-dot 1.8s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) infinite',
        'draw-line': 'draw-line 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};
