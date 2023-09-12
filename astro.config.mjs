import { defineConfig } from "astro/config";
// import mdx from "@astrojs/mdx";
// import compress from "astro-compress";
// import remarkMath from 'remark-math';
// import rehypeMathJaxSvg from 'rehype-mathjax';
// import image from "@astrojs/image";
// import remarkToc from 'remark-toc';
import remarkWikiLink from "@flowershow/remark-wiki-link";

const pageUrlPathPrefix = "blog/notes/";

//Https for local development
// import basicSsl from '@vitejs/plugin-basic-ssl'

// Custom remark plugins
import { remarkReadingTime } from "./src/remark/remark-reading-time.mjs";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://conrads.website",
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    svelte(),
    mdx(),
  ],
  // vite: {
  //   ssr: {
  //     // noExternal: ['p5-svelte'],
  //     // plugins: [ basicSsl() ],
  //     server: {
  //       https: true
  //     }
  //   }
  // },
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      //   remarkToc,
      //   remarkMath,
      remarkWikiLink,
      // wikiLinkPlugin,
      // {
      //   pathFormat: "obsidian-short",
      //   // generate url of the linked page.
      //   // here `slug` would be "Page Name" for wiki link [[Page Name]].
      //   wikiLinkResolver: (slug) => [pageUrlPathPrefix + slug],
      // },
      remarkReadingTime,
    ],
    rehypePlugins: [
      // rehypeMathJaxSvg,
      // ['rehype-toc', { headings: ['h1', 'h2'] }],
    ],
    // remarkWikiLink: { markdownFolder: "/obsimg/" }, // doesn't work?
  },
});
