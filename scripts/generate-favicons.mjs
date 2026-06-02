/**
 * Gera favicon.ico e PNGs a partir de public/favicon.svg
 * Uso: node scripts/generate-favicons.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const svgPath = join(publicDir, "favicon.svg");
const svg = readFileSync(svgPath);

async function pngAt(size) {
  return sharp(svg).resize(size, size).png().toBuffer();
}

const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(icoSizes.map((s) => pngAt(s)));
writeFileSync(join(publicDir, "favicon.ico"), await toIco(icoBuffers));

await sharp(svg).resize(180, 180).png().toFile(join(publicDir, "apple-touch-icon.png"));
await sharp(svg).resize(192, 192).png().toFile(join(publicDir, "icon-192.png"));
await sharp(svg).resize(512, 512).png().toFile(join(publicDir, "icon-512.png"));
await sharp(svg).resize(32, 32).png().toFile(join(publicDir, "favicon-32.png"));

console.log("Favicons gerados em public/: favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png, favicon-32.png");
