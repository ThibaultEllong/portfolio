// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: a repo named <user>.github.io (or a custom domain) is served at the root,
// so remove `base` in that case. Any other repo name is served at /<repo-name>.
export default defineConfig({
  site: 'https://thibaultellong.github.io',
  base: '/portfolio',
  integrations: [sitemap()],
});
