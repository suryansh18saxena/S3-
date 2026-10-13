// Build responsive AVIF/WebP variants + blur placeholders for every image in
// scripts/media.config.mjs, and write src/content/media-manifest.json.
//
// Usage: npm run images            (incremental)
//        npm run images -- --force (re-encode everything)
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { WIDTHS, media } from "./media.config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "assets/source");
const outDir = path.join(root, "public/media");
const manifestPath = path.join(root, "src/content/media-manifest.json");
const force = process.argv.includes("--force");

mkdirSync(sourceDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

async function ensureSource(entry) {
  if (entry.source.local) return path.join(sourceDir, entry.source.local);
  const file = path.join(sourceDir, `${entry.key}.jpg`);
  if (!existsSync(file)) {
    const url = `https://images.unsplash.com/photo-${entry.source.unsplash}?w=2560&q=88&fm=jpg`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${entry.key}: download failed (${res.status})`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    console.log(`downloaded ${entry.key}`);
  }
  return file;
}

function isFresh(out, src) {
  return !force && existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;
}

const manifest = {};
for (const entry of media) {
  const src = await ensureSource(entry);
  const meta = await sharp(src).metadata();
  const candidates = entry.widths ?? WIDTHS;
  const widths = candidates.filter((w) => w <= meta.width);
  if (!widths.length || widths.at(-1) < meta.width) widths.push(Math.min(meta.width, candidates.at(-1)));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  const base = () => {
    let img = sharp(src).rotate();
    // Gentle, consistent grade for stock photography so the set reads as one.
    if (entry.source.unsplash) img = img.modulate({ saturation: 0.92 });
    return img;
  };

  for (const w of unique) {
    const avif = path.join(outDir, `${entry.key}-${w}.avif`);
    const webp = path.join(outDir, `${entry.key}-${w}.webp`);
    if (!isFresh(avif, src)) await base().resize({ width: w }).avif({ quality: entry.alpha ? 58 : 50, effort: 4 }).toFile(avif);
    if (!isFresh(webp, src)) await base().resize({ width: w }).webp({ quality: entry.alpha ? 80 : 72, alphaQuality: 90 }).toFile(webp);
  }

  const lqip = await base().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  manifest[entry.key] = {
    width: meta.width,
    height: meta.height,
    widths: unique,
    alpha: Boolean(entry.alpha),
    lqip: `data:image/webp;base64,${lqip.toString("base64")}`,
    source: entry.source.unsplash ? `unsplash:${entry.source.unsplash}` : "s3-infrastructure",
  };
  console.log(`${entry.key}: ${meta.width}x${meta.height} -> ${unique.join(", ")}`);
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`wrote ${path.relative(root, manifestPath)} (${Object.keys(manifest).length} images)`);
