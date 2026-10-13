// Crawl the built site and verify every internal page, link, in-page anchor,
// image candidate (src + srcset), script and stylesheet returns 200.
//
// Usage: npm run build && npm run preview   (in one terminal)
//        npm run check:links                (in another)
const base = process.argv[2] || "http://localhost:4173";
const seen = new Set();
const assets = new Set();
const queue = ["/"];
const problems = [];
const ids = new Map();
const anchors = [];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: "manual" });
  if (res.status !== 200) {
    problems.push(`${res.status} page ${path}`);
    continue;
  }
  const html = await res.text();
  ids.set(path, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (/^(tel:|mailto:|https?:)/.test(href)) continue;
    if (href.startsWith("#")) {
      anchors.push([path, href]);
      continue;
    }
    const [p, hash] = href.split("#");
    if (hash) anchors.push([p, `#${hash}`]);
    if (!p.endsWith("/") && !/\.\w+$/.test(p)) problems.push(`missing trailing slash: ${href} (on ${path})`);
    queue.push(p);
  }
  for (const m of html.matchAll(/\b(?:src|href)="(\/[^"]+\.(?:avif|webp|png|jpg|svg|ico|js|css|woff2|webmanifest|xml|txt))"/g)) assets.add(m[1]);
  for (const m of html.matchAll(/\bsrc[sS]et="([^"]+)"/g)) {
    for (const part of m[1].split(",")) assets.add(part.trim().split(" ")[0]);
  }
}

for (const a of assets) {
  const r = await fetch(base + a, { method: "HEAD" });
  if (r.status !== 200) problems.push(`${r.status} asset ${a}`);
}
for (const [page, hash] of anchors) {
  const set = ids.get(page);
  if (set && !set.has(hash.slice(1))) problems.push(`missing anchor ${hash} on ${page}`);
}

console.log(`${seen.size} pages, ${assets.size} assets, ${anchors.length} anchors checked`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("No broken links or assets.");
