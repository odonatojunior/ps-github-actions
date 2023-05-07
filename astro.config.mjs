import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://odonatojunior.github.io/ps-github-actions/',
  integrations: [mdx(), sitemap()],
  output: 'static',
})
