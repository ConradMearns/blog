import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
});

// http://proxy01.pnl.gov:3128


// cafile=C:\Users\mear593\cert\cacert.pem
// https-proxy=http://proxy01.pnl.gov:3128/
// proxy=http://proxy01.pnl.gov:3128/