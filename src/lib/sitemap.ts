import { getSortedBlogPosts } from "./blog-posts";
import { SITE_URL } from "./site";

export type SitemapEntry = {
  loc: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: string;
};

export function getSitemapEntries(): SitemapEntry[] {
  const today = new Date().toISOString().split("T")[0];
  const posts = getSortedBlogPosts();

  return [
    {
      loc: `${SITE_URL}/`,
      lastmod: today,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: today,
      changefreq: "weekly",
      priority: "0.9",
    },
    ...posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
  ];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateSitemapXml(): string {
  const entries = getSitemapEntries();
  const urls = entries.map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}
