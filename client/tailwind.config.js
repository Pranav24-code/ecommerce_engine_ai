/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50:  '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        surface: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':      'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #d946ef 50%, #6366f1 75%, #10b981 100%)',
        'hero-grid':          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='%236366f1' fill-opacity='0.15'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm':  '0 0 15px -3px rgba(99, 102, 241, 0.35)',
        'glow':     '0 0 25px -5px rgba(99, 102, 241, 0.45)',
        'glow-lg':  '0 0 40px -8px rgba(99, 102, 241, 0.55)',
        'glow-purple': '0 0 30px -6px rgba(217, 70, 239, 0.4)',
        'glow-green':  '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'card':     '0 4px 24px -4px rgba(15, 23, 42, 0.12)',
        'card-hover': '0 20px 60px -12px rgba(99, 102, 241, 0.25)',
      },
      animation: {
        'shimmer':      'shimmer 2.5s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'slide-up':     'slide-up 0.4s ease-out forwards',
        'fade-in':      'fade-in 0.3s ease-out forwards',
        'spin-slow':    'spin 8s linear infinite',
        'gradient-x':   'gradient-x 4s ease infinite',
        'bounce-light': 'bounce 1s ease-in-out 3',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px -4px rgba(99,102,241,0.4)' },
          '50%':      { boxShadow: '0 0 35px -4px rgba(99,102,241,0.7)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%':      { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
