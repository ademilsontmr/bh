import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getPrerenderPages } from "./prerender-pages.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ssrEntry = join(root, "node_modules/.nitro/vite/services/ssr/index.js");

function outputPathForRoute(routePath) {
  if (routePath === "/") return join(dist, "index.html");
  const segments = routePath.replace(/^\//, "").replace(/\/$/, "");
  return join(dist, segments, "index.html");
}

async function main() {
  const { default: server } = await import(pathToFileURL(ssrEntry).href);
  const pages = getPrerenderPages();

  console.log(`[prerender-static] Gerando ${pages.length} páginas HTML estáticas...`);

  for (const page of pages) {
    const requestPath = page.path === "/" ? "/" : page.path.replace(/\/$/, "");
    let response = await server.fetch(new Request(`http://localhost${requestPath}`));

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location") ?? "";
      const redirectPath = location.replace(/^https?:\/\/[^/]+/, "") || requestPath;
      response = await server.fetch(new Request(`http://localhost${redirectPath}`));
    }

    if (!response.ok) {
      throw new Error(`Falha ao renderizar ${page.path}: HTTP ${response.status}`);
    }

    const html = await response.text();
    const filepath = outputPathForRoute(page.path);
    await mkdir(dirname(filepath), { recursive: true });
    await writeFile(filepath, html, "utf8");
    console.log(`[prerender-static] ✓ ${page.path} → ${filepath.replace(`${root}/`, "")}`);
  }

  console.log("[prerender-static] Concluído. Cloudflare Pages servirá HTML do CDN sem invocar o Worker.");
  await updateRoutesJson(pages);
}

async function updateRoutesJson(pages) {
  const routesPath = join(dist, "_routes.json");
  const routes = JSON.parse(await readFile(routesPath, "utf8"));
  const htmlExcludes = pages.flatMap((page) => {
    if (page.path === "/") return ["/", "/index.html"];
    return [page.path, `${page.path}/`, `${page.path}/index.html`];
  });

  routes.exclude = [...new Set([...(routes.exclude ?? []), ...htmlExcludes])];
  await writeFile(routesPath, `${JSON.stringify(routes, null, 2)}\n`);
  console.log(`[prerender-static] _routes.json atualizado (${htmlExcludes.length} exclusões de Worker).`);
}

main().catch((error) => {
  console.error("[prerender-static] Erro:", error);
  process.exit(1);
});
