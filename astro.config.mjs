import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import serviceWorker from 'astro-service-worker';

export default defineConfig({
  integrations: [
    svelte(),
    mdx(),
    serviceWorker(),
  ]
}); 