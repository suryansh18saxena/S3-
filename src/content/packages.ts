/**
 * Turnkey construction packages and the construction-cost calculator.
 *
 * Source: the live /turnkey-construction/ page and its "Cost Calculator
 * Builder" configuration (calculator id 12465), captured 13 October 2026.
 *
 * ⚠️ Prices change. Update `publishedOn` and the rates together, and have S3
 * confirm them before each launch. Everything the UI shows is derived from this
 * file — no other component contains prices.
 */

export const pricing = {
  currency: "INR",
  unit: "sq.ft",
  publishedOn: "2026-10-13",
  publishedLabel: "October 2026",
  note:
    "Published per-square-foot rates for the built-up area. Final pricing is confirmed after a site assessment and depends on design, structure, soil conditions and specification changes.",
} as const;

export type SpecLine = { label: string; value: string };

export type TurnkeyPackage = {
  id: "silver" | "gold" | "diamond" | "platinum";
  name: string;
  tier: string;
  /** Rate the existing site advertises (shown as the headline price). */
  rate: number;
  /** "Standard" rate the existing site shows struck-through next to `rate`. */
  listRate: number;
  summary: string;
  inheritsFrom?: TurnkeyPackage["id"];
  specs: SpecLine[];
  included?: string;
  warranty?: string;
};

export const packages: TurnkeyPackage[] = [
  {
    id: "silver",
    name: "Silver",
    tier: "Essential",
    rate: 1899,
    listRate: 1999,
    summary: "A complete, well-specified home with structural drawings and 2D/3D elevations included.",
    specs: [
      { label: "Planning & design", value: "2D floor plans, 2D/3D elevation and structural drawings" },
      { label: "Structure", value: "RCC with Fe-500/550 TMT steel, ISI cement, M-sand/P-sand, solid blocks (6″ & 4″), Dr. Fixit waterproofing" },
      { label: "Kitchen", value: "Granite platform (₹100/sq.ft), ceramic wall tiles to 2′ height, SS sink and faucets" },
      { label: "Flooring", value: "Vitrified tiles (₹50/sq.ft) in living and bedrooms; granite staircase (₹65/sq.ft)" },
      { label: "Bathrooms", value: "Sanitaryware & CP fittings (₹35,000 per 1,000 sq.ft), wall tiles to 7′, waterproof flush doors" },
      { label: "Doors & windows", value: "Main door (₹15,000), internal flush doors (₹8,000), 2-track aluminium sliding windows with grills" },
      { label: "Painting", value: "Interior putty and emulsion; exterior primer and weatherproof paint; enamel on metal" },
      { label: "Electrical", value: "Anchor fire-proof wiring, Anchor/Roma switches" },
      { label: "Utilities", value: "Overhead tank (1,000 L), sump (5,000 L), MS railings, anti-termite treatment" },
    ],
    warranty: "5 years structure · 1 year waterproofing",
  },
  {
    id: "gold",
    name: "Gold",
    tier: "Premium upgrades",
    rate: 1999,
    listRate: 2099,
    summary: "Silver's structural specification with significant upgrades to interiors, fittings and finishes.",
    inheritsFrom: "silver",
    specs: [
      { label: "Kitchen", value: "Granite (₹130/sq.ft), wall tiles (₹50/sq.ft), SS sink (up to ₹4,500) and faucets (up to ₹1,600)" },
      { label: "Bathrooms", value: "Sanitary & CP fittings upgraded to ₹50,000 per 1,000 sq.ft; tiles ₹50/sq.ft" },
      { label: "Windows", value: "3-track aluminium windows" },
      { label: "Doors", value: "Main door (₹25,000), internal doors (₹9,500), waterproof flush doors for toilets" },
      { label: "Painting", value: "2 coats JK putty with Asian Paints Tractor Emulsion; weatherproof exterior" },
      { label: "Flooring", value: "Living/dining vitrified (₹80/sq.ft), bedrooms (₹70/sq.ft), granite stairs (₹80/sq.ft)" },
      { label: "Electrical & plumbing", value: "Finolex wiring, Anchor/Roma panels, Astral plumbing" },
    ],
    included: "Anti-termite treatment, inverter provision, site sheds, soil testing and engineer monitoring",
    warranty: "Same warranty as Silver",
  },
  {
    id: "diamond",
    name: "Diamond",
    tier: "Luxury edition",
    rate: 2199,
    listRate: 2299,
    summary: "Top-tier upgrades: uPVC windows, premium emulsion, WPC doors and high-end flooring.",
    specs: [
      { label: "Kitchen", value: "Granite (₹160/sq.ft), tiles (₹60/sq.ft), sink (~₹7,000) and faucets (up to ₹2,200)" },
      { label: "Bathrooms", value: "WPC waterproof doors, sanitary & CP fittings (₹65,000 per 1,000 sq.ft), tiles (₹60/sq.ft)" },
      { label: "Windows", value: "2.5-track uPVC sliding windows" },
      { label: "Doors", value: "Main door (₹35,000), laminated internal doors (₹11,000)" },
      { label: "Painting", value: "Birla putty with Asian Paints Premium Emulsion; Apex exterior" },
      { label: "Flooring", value: "Granite/vitrified (₹120/sq.ft) in living/dining, bedrooms (₹100/sq.ft), stairs (₹100/sq.ft)" },
      { label: "Electrical & plumbing", value: "Finolex wiring, Goldmedal panels, Ashirvad/Supreme CPVC" },
      { label: "Railings", value: "SS 304 piping (glass optional)" },
    ],
    included: "CCTV, solar and inverter provisions, with standard civil monitoring",
  },
  {
    id: "platinum",
    name: "Platinum",
    tier: "Ultimate luxury",
    rate: 2399,
    listRate: 2499,
    summary: "The pinnacle specification: Honne wood frames, Havells electricals and premium granite throughout.",
    specs: [
      { label: "Kitchen", value: "Granite (₹190/sq.ft), sink (up to ₹9,000), faucets (up to ₹3,200)" },
      { label: "Bathrooms", value: "Fittings budget ₹80,000 per 1,000 sq.ft, WPC waterproof doors, tiles ₹70/sq.ft" },
      { label: "Woodwork", value: "Honne wood frames; main door (₹45,000), internal doors (₹12,500)" },
      { label: "Windows", value: "Premium 2.5-track uPVC windows" },
      { label: "Flooring", value: "Granite in living areas (₹160/sq.ft); wooden or granite flooring in bedrooms (₹120/sq.ft)" },
      { label: "Electrical", value: "Complete Havells wiring and panels" },
    ],
    included: "Anti-termite treatment, CCTV, solar and inverter provisions, site sheds, soil testing and civil-engineer monitoring",
  },
];

/** Exclusions listed under every package on the existing site. */
export const packageExclusions = [
  "Borewell",
  "Interiors",
  "Temporary power and water",
  "Compound wall and gate",
  "Government approvals",
  "Meter charges",
  "Rock cutting",
];

/**
 * Construction-cost calculator.
 *
 * Mirrors the live calculator's formula:
 *   total = packageRate × area + parking + sump + recyclingTank + compoundWall + solar
 *
 * Two deliberate, documented differences from the live configuration:
 *  1. Car parking: the live field says "charged @ Rs. 1800/sft approximately" but
 *     is configured with a multiplier of 1, so it adds ₹1 per sq.ft. We apply the
 *     ₹1,800/sq.ft rate the field itself describes. Confirm with S3.
 *  2. Built-up area: the live input is capped at 1,000 sq.ft, which blocks most
 *     homes. We allow up to 20,000 sq.ft.
 */
export const calculator = {
  area: { min: 300, max: 20000, step: 50, default: 1500 },
  addOns: [
    {
      id: "parking",
      label: "Car parking area",
      unit: "sq.ft",
      rate: 1800,
      min: 0,
      max: 5000,
      step: 10,
      hint: "Car parking is charged at approximately ₹1,800 per sq.ft.",
    },
    {
      id: "sump",
      label: "Underground sump",
      unit: "litres",
      rate: 25,
      min: 0,
      max: 20000,
      step: 500,
      hint: "An average family of four needs at least 10,000 litres.",
    },
    {
      id: "recycling",
      label: "Wastewater recycling tank",
      unit: "persons",
      rate: 30000,
      min: 0,
      max: 50,
      step: 1,
      hint: "An alternative to a septic tank that recycles wastewater and recharges groundwater. Not needed if you have a drainage connection.",
    },
    {
      id: "wall",
      label: "Compound wall",
      unit: "running ft",
      rate: 2000,
      min: 0,
      max: 2000,
      step: 5,
      hint: "For a 40 × 30 ft plot the wall runs 40 + 40 + 30 + 30 = 140 ft.",
    },
    {
      id: "solar",
      label: "Solar power",
      unit: "kW",
      rate: 75000,
      min: 0,
      max: 20,
      step: 1,
      hint: "A 3BHK home typically needs about 2 kW to run fans, lights and a television during the day.",
    },
  ],
  disclaimer:
    "This is an indicative estimate based on S3 Infrastructure's published package rates. It is not a quotation. Actual costs depend on your plot, soil, design, structural requirements, approvals and specification choices, and are confirmed after a site assessment.",
} as const;

export type AddOnId = (typeof calculator.addOns)[number]["id"];
