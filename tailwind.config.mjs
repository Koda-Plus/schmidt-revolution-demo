/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Schmidt brand — refined for 2026
        schmidt: {
          yellow: '#FFD400',
          yellowSoft: '#FFE15C',
          yellowDeep: '#E5BD00',
          ink: '#0A0A0B',
          carbon: '#161618',
          graphite: '#222226',
          steel: '#2E2E33',
          silver: '#A9ADB4',
          mist: '#E8E9EC',
          paper: '#F5F5F4',
        },
      },
      fontFamily: {
        display: ['"Neue Haas Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.02em',
        tighter2: '-0.04em',
      },
      backgroundImage: {
        'grid-faint': 'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'noise': 'radial-gradient(circle at 20% 30%, rgba(255,212,0,0.08), transparent 60%)',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'rim-rotate': 'spin 18s linear infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
