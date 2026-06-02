/**
 * Gera public/og-image.png (1200×630) a partir de public/og-image.svg
 * Uso: node scripts/generate-og-image.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const svg = readFileSync(join(publicDir, "og-image.svg"));

const png = await sharp(svg).resize(1200, 630).png().toBuffer();
writeFileSync(join(publicDir, "og-image.png"), png);
console.log("og-image.png gerado em public/og-image.png");
