// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      /**
       * Reminder to ensure aliases are added to the following:
       *
       * 1. svelte.config.js
       * 2. rollup.config.js
       * 3. .storybook/main.js.
       * 4. vitest.config.ts
       *
       * TODO: Share alias object with other configs listed above
       */
      $components: path.resolve('./src/lib/components'),
      $journey: path.resolve('./src/lib/journey'),
      $widget: path.resolve('./src/lib/widget'),
    },
  },
  preview: {
    port: 3000,
  },
  server: {
    hmr: {
      // Use if tunneling through Ngrok
      // port: 443
    },
    https: true,
    cors: {
      // Use if SvelteKit server needs to support external apps
      // origin: 'https://react.crbrl.ngrok.io',
      // credentials: true
    },
    fs: {
      allow: ['package'],
    },
  },
};
export default config;
