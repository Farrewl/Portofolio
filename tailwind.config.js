/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#FD796C',
        'coral-dark': '#CA6155',
        peach: '#FEBA8B',
        ink: '#2E2F31',
        outline: '#1E1F21',
        gray: '#444547',
        white: '#FFFFFF',
        paper: '#F5F5F7',
      },
      fontFamily: {
        pixel: ['Silkscreen', 'Courier New', 'monospace'],
        term: ['VT323', 'Courier New', 'monospace'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      keyframes: {
        'window-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'window-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.94)' },
        },
      },
      animation: {
        'window-in': 'window-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.15) backwards',
        'window-out': 'window-out 0.16s ease forwards',
      },
    },
  },
  plugins: [],
};
