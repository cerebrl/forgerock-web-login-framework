import vercel from '@sveltejs/adapter-vercel';
import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import slug from 'remark-slug';
import autolink from 'remark-autolink-headings';

import aliases from './alias.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  kit: {
    adapter: process.env.PREVIEW ? node() : vercel(),
    alias: aliases,
  },
  package: {
    dir: 'svelte-package',
    emitTypes: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [slug, autolink],
    }),
  ],
};

export default config;
