// Source list for every raster image on the site.
//
// `unsplash` images are representative photography published under the
// Unsplash License (free for commercial use, no attribution required).
// They are NOT S3 Infrastructure projects and must never be captioned as such.
// `local` images live in assets/source and are S3's own material.
//
// Run `npm run images` after editing this file.

export const WIDTHS = [480, 768, 1080, 1440, 1920, 2560];

export const media = [
  // Hero: house cut out from its sky (alpha) — see assets/source/hero-house.png.
  { key: "hero-house", source: { local: "hero-house.png" }, alpha: true, widths: [768, 1080, 1440, 1920, 2560, 3200] },
  // Same cut-out graded to blue hour with lit windows (generated from hero-house.png) — the hero's scroll-to-dusk state.
  { key: "hero-house-dusk", source: { local: "hero-house-dusk.png" }, alpha: true, widths: [768, 1080, 1440, 1920, 2560] },
  { key: "director-t-srinivasan", source: { local: "director-t-srinivasan.webp" } },

  // Building typologies.
  { key: "typology-independent-house", source: { unsplash: "1600047509807-ba8f99d2cdde" } },
  { key: "typology-villa", source: { unsplash: "1613490493576-7fde63acd811" } },
  { key: "typology-duplex", source: { unsplash: "1600047509782-20d39509f26d" } },
  { key: "typology-bungalow", source: { unsplash: "1523217582562-09d0def993a6" } },
  { key: "typology-apartment", source: { unsplash: "1580216643062-cf460548a66a" } },
  { key: "typology-row-house", source: { unsplash: "1494526585095-c41746248156" } },

  // Services.
  { key: "service-architecture", source: { unsplash: "1503387762-592deb58ef4e" } },
  { key: "service-interiors", source: { unsplash: "1600607687939-ce8a6c25118c" } },
  { key: "service-turnkey", source: { unsplash: "1531834685032-c34bf0d84c77" } },
  { key: "service-structural", source: { unsplash: "1504307651254-35680f356dfd" } },
  { key: "service-renovation", source: { unsplash: "1517581177682-a085bb7ffb15" } },
  { key: "service-approvals", source: { unsplash: "1503387837-b154d5074bd2" } },
  { key: "service-construction", source: { unsplash: "1541888946425-d81bb19240f5" } },

  // Interiors.
  { key: "interior-living", source: { unsplash: "1600585154084-4e5fe7c39198" } },
  { key: "interior-kitchen", source: { unsplash: "1600607686527-6fb886090705" } },
  { key: "interior-kitchen-dark", source: { unsplash: "1622372738946-62e02505feb3" } },
  { key: "interior-bedroom", source: { unsplash: "1617104678098-de229db51175" } },
  { key: "interior-bedroom-warm", source: { unsplash: "1616627561839-074385245ff6" } },
  { key: "interior-dining", source: { unsplash: "1617806118233-18e1de247200" } },
  { key: "interior-bathroom", source: { unsplash: "1600566752355-35792bedcfea" } },
  { key: "interior-stair", source: { unsplash: "1600047508788-786f3865b4b9" } },
  { key: "interior-office", source: { unsplash: "1497366811353-6870744d04b2" } },

  // Architecture & site.
  { key: "arch-screen-facade", source: { unsplash: "1600573472592-401b489a3cdc" } },
  { key: "arch-timber-house", source: { unsplash: "1600566753190-17f0baa2a6c3" } },
  { key: "arch-house-dusk", source: { unsplash: "1600585153490-76fb20a32601" } },
  { key: "site-frame", source: { unsplash: "1508450859948-4e04fabaa4ea" } },
  { key: "site-painting", source: { unsplash: "1574359411659-15573a27fd0c" } },
  { key: "studio-sketching", source: { unsplash: "1581094288338-2314dddb7ece" } },
];
