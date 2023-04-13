import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";
import remarkMath from 'remark-math';
import rehypeMathJaxSvg from 'rehype-mathjax';
import image from "@astrojs/image";
import remarkToc from 'remark-toc';
import remarkWikiLink from '@flowershow/remark-wiki-link';


//Https for local development
import basicSsl from '@vitejs/plugin-basic-ssl'

// Custom remark plugins
import { remarkReadingTime } from './src/remark/remark-reading-time.mjs';

// https://astro.build/config

export default defineConfig({
  site: 'https://conrads.website',
  integrations: [svelte(), mdx(), compress(), image()],
  vite: {
    ssr: {
      noExternal: ['p5-svelte'],
      plugins: [ basicSsl() ],
      server: {
        https: true,
      }
    }
  },
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      remarkToc,
      remarkMath,
      remarkWikiLink,
      remarkReadingTime,
    ],
    rehypePlugins: [
      rehypeMathJaxSvg,
      // ['rehype-toc', { headings: ['h1', 'h2'] }],
    ],
    // remarkWikiLink: { markdownFolder: "/obsimg/" }, // doesn't work?
  }
});