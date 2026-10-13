import manifest from "./media-manifest.json";

export type MediaKey = keyof typeof manifest;

export type MediaInfo = {
  width: number;
  height: number;
  widths: number[];
  alpha: boolean;
  lqip: string;
  source: string;
};

export const media = manifest as Record<MediaKey, MediaInfo>;

/**
 * Default alt text. Stock photography is described as what it shows — never as
 * an S3 project.
 */
export const mediaAlt: Record<MediaKey, string> = {
  "hero-house": "Contemporary two-storey house with white rendered volumes, a timber-clad block and charcoal canopy",
  "hero-house-dusk": "The same house at dusk with its windows lit",
  "director-t-srinivasan": "Portrait of T. Srinivasan, Director and CEO of S3 Infrastructure",
  "typology-independent-house": "Contemporary house with white rendered walls and a timber-clad volume",
  "typology-villa": "White modern villa with timber soffits, full-height glazing and a pool",
  "typology-duplex": "Two-storey white duplex house with a cantilevered upper floor",
  "typology-bungalow": "Whitewashed cubic bungalow with a garden path",
  "typology-apartment": "White residential apartment tower with stacked balconies",
  "typology-row-house": "Narrow modern townhouse with a lit entrance at dusk",
  "service-architecture": "Architect drawing a floor plan on paper with pencil and scale ruler",
  "service-interiors": "Modern living room with timber feature wall, pale sofa and open kitchen beyond",
  "service-turnkey": "Construction workers fixing reinforcement for concrete columns on site",
  "service-structural": "Aerial view of workers placing steel reinforcement bars on a slab",
  "service-renovation": "Room under renovation with an opened-up wall revealing the structure",
  "service-approvals": "Hand annotating architectural drawings with a pen and an architect's scale",
  "service-construction": "Engineers in safety gear reviewing progress on a large construction site",
  "interior-living": "Open-plan living and dining room with stone and timber wall finishes",
  "interior-kitchen": "White and oak modular kitchen with island and pendant lights",
  "interior-kitchen-dark": "Dark modular kitchen with timber tall units and a breakfast counter",
  "interior-bedroom": "Bedroom with dark feature wall, upholstered bed and warm bedside lighting",
  "interior-bedroom-warm": "Calm bedroom with timber bed, terracotta linen and textured grey wall",
  "interior-dining": "Dining room with a long table, green upholstered chairs and a round mirror",
  "interior-bathroom": "Dark tiled bathroom with freestanding white bathtub",
  "interior-stair": "Double-height interior with a floating timber staircase",
  "interior-office": "Open office with glass walls, concrete ceiling and a long meeting table",
  "arch-screen-facade": "House with a perforated white screen façade, timber cladding and a pool",
  "arch-timber-house": "Contemporary house in timber and concrete with planted courtyard",
  "arch-house-dusk": "Modern house with glowing windows at dusk",
  "site-frame": "Multi-storey building frame under construction against a blue sky",
  "site-painting": "Painter on a ladder repainting the façade of a house",
  "studio-sketching": "Two designers sketching an architectural drawing together",
};

export function mediaUrl(key: MediaKey, width: number, format: "avif" | "webp" = "webp") {
  return `/media/${key}-${width}.${format}`;
}

/** Largest generated width that is ≤ `target` (falls back to the smallest). */
export function nearestWidth(key: MediaKey, target: number) {
  const ws = media[key].widths;
  return [...ws].reverse().find((w) => w <= target) ?? ws[0];
}
