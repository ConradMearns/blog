import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true });
const posts = Object.values(postImportResult);

export const get = () => rss({
  title: "Conrad's Website",
  description: "wrigglin",
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: new Date(),
    pubDate: post.frontmatter.date,
  }))
});