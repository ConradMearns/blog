import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import remarkMath from 'remark-math';
import rehypeMathJaxSvg from 'rehype-mathjax';
import image from "@astrojs/image";
import remarkWikiLink from '@flowershow/remark-wiki-link';

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://conrads.website',
  integrations: [svelte(), mdx(), compress(), image()],
  vite: {
    ssr: {
      noExternal: ['p5-svelte']
    }
  },
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      remarkMath,
      remarkWikiLink,
    ],
    rehypePlugins: [
      rehypeMathJaxSvg,
    ],
    // remarkWikiLink: { markdownFolder: "/obsimg/" }, // doesn't work?
  }
});