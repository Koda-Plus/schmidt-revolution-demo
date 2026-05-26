import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), react()],
  server: { host: '127.0.0.1', port: 4321 },
  vite: {
    ssr: {
      noExternal: ['maplibre-gl'],
    },
  },
});
