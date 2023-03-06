import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    manifest: {
      name: 'Doctolib-App',
      short_name: 'Docto',
      icons: [
        {
          src: '/assets/icone-doctolib192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/assets/icone-doctolib512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  })],
});