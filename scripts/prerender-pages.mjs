import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** Rotas estáticas para prerender — evita invocar o Worker no Cloudflare Pages. */
export function getPrerenderPages() {
  const postsContent = readFileSync(join(root, "src/lib/blog-posts.ts"), "utf8");
  const rawSection = postsContent.split("const rawPosts")[1]?.split("];")[0] ?? "";
  const slugs = [...rawSection.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

  return [
    { path: "/" },
    { path: "/blog" },
    ...slugs.map((slug) => ({ path: `/blog/${slug}` })),
  ];
}
