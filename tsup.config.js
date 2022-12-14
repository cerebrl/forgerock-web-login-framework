import autoprefixer from 'autoprefixer';
import { defineConfig } from 'tsup';
import postcssPlugin from '@chialab/esbuild-plugin-postcss';

export default defineConfig(() => {
  return {
    clean: false,
    dts: true,
    format: ['esm', 'cjs'],
    entry: ['./src/widget/inline.svelte', './src/widget/modal.svelte'],
    watch: false,
    declaration: true,
    minify: false,
    plugins: [
      postcssPlugin({
        plugins: [autoprefixer],
      }),
    ],
    sourcemap: false,
    outDir: 'package',
  };
});
