import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://conrads.website',
  integrations: [
    svelte(),
    mdx(),
    compress(),
  ],
  vite: {
    ssr: {
      noExternal: [
        'p5-svelte'
      ]
    }
  }
});