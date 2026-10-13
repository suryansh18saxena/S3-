/**
 * Service content, rewritten from S3 Infrastructure's existing service pages
 * (Architecture, Interior Design, Turnkey Construction, Renovation and
 * Structural Engineer), October 2026. Claims that were placeholders on the old
 * site (skill percentages, counters, "best price guarantee", "320+ checks",
 * "ISO standards") are intentionally not reproduced.
 */
import type { MediaKey } from "./media";

export type Expertise = {
  index: string;
  title: string;
  summary: string;
  href: string;
  image: MediaKey;
  points: string[];
};

/** The seven disciplines S3 offers, in the order a project meets them. */
export const expertise: Expertise[] = [
  {
    index: "01",
    title: "Architectural Design",
    summary: "Floor plans, 3D elevations and working drawings shaped around how you live — with Vastu-aware planning when you want it.",
    href: "/architectural/",
    image: "service-architecture",
    points: ["2D & 3D floor plans", "3D elevations", "Civil drawings"],
  },
  {
    index: "02",
    title: "Interior Design",
    summary: "Modular kitchens, wardrobes, false ceilings, TV units and pooja rooms, resolved in 3D and executed by our own team.",
    href: "/interior-design/",
    image: "service-interiors",
    points: ["Residential", "Commercial", "3D visualisation"],
  },
  {
    index: "03",
    title: "Residential & Turnkey Construction",
    summary: "One contract from soil test to handover for independent houses, villas, duplexes and apartments.",
    href: "/turnkey-construction/",
    image: "service-turnkey",
    points: ["Four published packages", "Single point of contact", "Engineer monitoring"],
  },
  {
    index: "04",
    title: "Structural Design & Engineering",
    summary: "Load and seismic calculations and structural drawings to IS codes and the National Building Code.",
    href: "/structural-engineer/",
    image: "service-structural",
    points: ["ETABS · STAAD Pro", "Structural analysis", "Code compliance"],
  },
  {
    index: "05",
    title: "Renovation & Remodeling",
    summary: "Kitchens, bathrooms, flooring, ceilings, electrical and plumbing — from a single room to the whole home.",
    href: "/renovation/",
    image: "service-renovation",
    points: ["Site assessment", "3D concepts", "Supervised execution"],
  },
  {
    index: "06",
    title: "Planning, Design & Approvals",
    summary: "Site analysis, feasibility and drawings prepared so permits and approvals are navigated before work begins.",
    href: "/structural-engineer/#approvals",
    image: "service-approvals",
    points: ["Site analysis", "Feasibility", "Permit coordination"],
  },
  {
    index: "07",
    title: "Construction Management & Execution",
    summary: "Detailed schedules, supervised stages and regular progress updates, so you always know where your build stands.",
    href: "/turnkey-construction/#process",
    image: "service-construction",
    points: ["Scheduling", "Quality inspections", "Progress updates"],
  },
];

export type ServicePage = {
  slug: string;
  path: string;
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  lede: string;
  image: MediaKey;
  imageAlt: string;
};

export const architecturePage = {
  slug: "architectural",
  path: "/architectural/",
  seo: {
    title: "Architectural Design in Chennai — Plans, Elevations & Drawings",
    description:
      "Residential and commercial architecture by S3 Infrastructure: 2D and 3D floor plans, 3D elevations, structural, plumbing and electrical drawings, with Vastu-aware planning on request.",
  },
  eyebrow: "Architectural design",
  title: "Plans that start with *how you live.*",
  lede:
    "From the first site study to construction-ready drawings, our architects design homes and commercial spaces that balance light, ventilation, structure and budget — and let you walk through them in 3D before a single wall goes up.",
  image: "service-architecture",
  approach: [
    {
      title: "Listen first",
      body: "Every brief begins with a conversation about your lifestyle, plot, budget and long-term plans. Nothing is drawn until we understand how you want to live.",
    },
    {
      title: "Plan for the climate",
      body: "We study natural light, cross-ventilation and spatial flow, so rooms feel open and comfortable without leaning on air-conditioning.",
    },
    {
      title: "Design to comply",
      body: "Layouts are planned to local building regulations and structural safety standards — with Vastu requirements accommodated if you want them.",
    },
  ],
  disciplines: [
    {
      title: "Residential architecture",
      body: "Custom homes that make the most of every square foot — from compact plots to generous villas — planned for comfort today and flexibility tomorrow.",
    },
    {
      title: "Interior architecture",
      body: "Movement, storage, lighting and built-in furniture resolved together with the architecture, so the interiors feel inevitable rather than added on.",
    },
    {
      title: "3D architectural rendering",
      body: "Realistic 3D models and renderings that make design intent clear, support confident material decisions and reduce errors on site.",
    },
  ],
  deliverables: [
    { title: "2D floor plan", body: "Precise layouts that make every square foot work." },
    { title: "3D floor plan", body: "An immersive view of how spaces connect and flow." },
    { title: "Presentation floor plan", body: "Clear plans that communicate design intent." },
    { title: "3D elevation", body: "Your façade explored from every angle before it is built." },
    { title: "Interior visualisation", body: "Photo-realistic renderings of your rooms." },
    { title: "Exterior visualisation", body: "Realistic renderings of the finished building." },
    { title: "Measurement drawings", body: "Accurate drawings of existing interiors and exteriors." },
    { title: "Structural drawings", body: "The framework and structural elements, fully detailed." },
    { title: "Plumbing plan", body: "Water supply, drainage and waste, planned end to end." },
    { title: "Electrical plan", body: "Power distribution, lighting and safety, laid out clearly." },
  ],
} as const;

/** Architectural design packages as published on the existing Architecture page (no prices published). */
export const designPackages = [
  {
    name: "Standard",
    summary: "The essentials to plan and visualise your home.",
    items: ["2D floor plan — Vastu", "3D elevation", "Floor plan revisions up to 3 times", "Electrical design", "Façade — standard design"],
  },
  {
    name: "Premium",
    summary: "Engineering and services drawings included.",
    items: [
      "2D floor plan — Vastu",
      "3D elevation",
      "Floor plan revisions up to 10 times",
      "Structural design",
      "Plumbing design",
      "Electrical design",
      "Furniture layout",
      "Civil drawings",
      "Site visits by architects up to 2 times",
    ],
  },
  {
    name: "Elite",
    summary: "The complete set, including a 3D walkthrough.",
    items: [
      "2D & 3D floor plans — Vastu",
      "3D and 2D elevations",
      "3D walkthrough",
      "Unlimited floor plan revisions",
      "Structural design",
      "Civil drawings",
      "Plumbing design",
      "Electrical design",
      "Furniture layout",
      "Site visits by architects up to 5 times",
    ],
  },
] as const;

export const interiorsPage = {
  slug: "interior-design",
  path: "/interior-design/",
  seo: {
    title: "Interior Designers in Chennai — Homes, Kitchens & Offices",
    description:
      "Residential and commercial interior design by S3 Infrastructure: modular kitchens, wardrobes, false ceilings, living and bedroom interiors, offices and retail — planned in 3D and executed end to end.",
  },
  eyebrow: "Interior design",
  title: "Interiors designed *around your day.*",
  lede:
    "We plan interiors from your routines outward — layouts, storage, lighting and materials resolved in 3D, then built and installed by our own team with trusted brands and precise measurements.",
  image: "service-interiors",
  rooms: [
    {
      title: "Modular kitchen",
      image: "interior-kitchen",
      body: "Kitchens designed for safety as much as style — quality-checked cabinets, countertops, chimneys and laminates, planned around the appliances you use every day.",
    },
    {
      title: "Living room",
      image: "interior-living",
      body: "Warm, functional living spaces for compact apartments and generous villas alike, with help choosing furnishings, art and décor that suit how you live.",
    },
    {
      title: "Bedroom",
      image: "interior-bedroom",
      body: "Fully personalised bedrooms — from wardrobe design to colour themes — conceived as calm retreats that support rest.",
    },
    {
      title: "Dining room",
      image: "interior-dining",
      body: "Custom dining spaces for small homes or lavish settings, with furniture, storage and accessories selected for you.",
    },
    {
      title: "Bathroom",
      image: "interior-bathroom",
      body: "Premium materials and modern detailing that turn everyday bathrooms into composed, spa-like spaces.",
    },
  ],
  specialities: ["Modular kitchens", "Customised wardrobes", "False ceilings", "TV units", "Pooja rooms", "Space-saving storage"],
  residential: {
    title: "Residential interiors",
    body: "Living rooms, bedrooms, kitchens and bathrooms designed for comfort, style and function. We study your daily routines, then plan lighting, ventilation and acoustics so every room feels bright, intuitive and calm.",
  },
  commercial: {
    title: "Commercial interiors",
    body: "Productive offices, engaging retail layouts and inviting restaurants and cafés. We start from your brand and business goals, then translate them into layouts, lighting and custom furniture that last.",
    items: ["Offices", "Retail spaces", "Restaurants & cafés"],
  },
} as const;

export const turnkeyPage = {
  slug: "turnkey-construction",
  path: "/turnkey-construction/",
  seo: {
    title: "Turnkey House Construction in Chennai — Packages & Cost Calculator",
    description:
      "Turnkey home construction by S3 Infrastructure in Chennai, Hosur and Bengaluru. Compare Silver, Gold, Diamond and Platinum packages, published specifications and an indicative cost calculator.",
  },
  eyebrow: "Turnkey construction",
  title: "One contract. *From soil test to keys.*",
  lede:
    "Architectural design, approvals, material procurement, structure and finishing — delivered by one accountable team, so you never have to coordinate a dozen vendors.",
  image: "service-turnkey",
  steps: [
    {
      title: "Planning & design",
      body: "We study your plot, budget and lifestyle, then develop the plans, elevations and structural drawings.",
    },
    {
      title: "Permits & approvals",
      body: "We prepare the drawings and coordinate the approvals your project needs before work begins.",
    },
    {
      title: "Construction & execution",
      body: "Soil testing, foundation, RCC, masonry, plastering and finishing — each stage supervised by our engineers.",
    },
    {
      title: "Final inspection & handover",
      body: "A thorough inspection against the approved design and specification before we hand over your keys.",
    },
  ],
  commitments: [
    {
      title: "Single point of contact",
      body: "Design, procurement, structure and finishing coordinated by one team — no juggling multiple contractors.",
    },
    {
      title: "Supervised at every stage",
      body: "From foundation and RCC work to brickwork, plastering and finishing, our engineers supervise each phase.",
    },
    {
      title: "Clear costs and schedules",
      body: "Itemised estimates, detailed schedules and regular progress updates, so there are no surprises.",
    },
    {
      title: "Materials that last",
      body: "Specified, branded materials and modern construction techniques for homes that are durable and safe.",
    },
  ],
} as const;

/** Cost-plus vs fixed-price comparison, as explained on the existing Turnkey page. */
export const pricingModels = {
  intro:
    "Most home builds in India are contracted either as cost-plus or as a lump-sum fixed price. Here is how the two models compare — ask us which suits your project.",
  rows: [
    {
      aspect: "Payments",
      costPlus: "Paid as materials reach site and work is completed.",
      fixed: "Often requires larger advances up front.",
    },
    {
      aspect: "Transparency",
      costPlus: "Full visibility of material, labour, fees and design costs.",
      fixed: "Limited visibility into what the price is made of.",
    },
    {
      aspect: "Flexibility",
      costPlus: "Design changes can be accommodated during execution.",
      fixed: "Changes are difficult once work begins.",
    },
    {
      aspect: "Control",
      costPlus: "You stay involved in decisions at every stage.",
      fixed: "Involvement is limited by the predefined scope.",
    },
    {
      aspect: "Quality focus",
      costPlus: "Effort goes into workmanship and materials, not cost-cutting.",
      fixed: "Cost pressure can affect materials and manpower.",
    },
  ],
} as const;

export const renovationPage = {
  slug: "renovation",
  path: "/renovation/",
  seo: {
    title: "House Renovation & Remodeling in Chennai",
    description:
      "Home renovation by S3 Infrastructure: kitchen and bathroom remodels, flooring, false ceilings, painting, electrical and plumbing upgrades, structural modifications and whole-home makeovers.",
  },
  eyebrow: "Renovation & remodeling",
  title: "Give your home *a second life.*",
  lede:
    "From a single kitchen to a whole-house makeover, we assess what is already there, plan the upgrade in 3D and execute it safely — with transparent estimates from the very first visit.",
  image: "service-renovation",
  services: [
    "Kitchen remodeling",
    "Bathroom upgrades",
    "Flooring replacement",
    "Painting",
    "False ceilings",
    "Electrical improvements",
    "Plumbing improvements",
    "Structural modifications",
    "Complete interior transformations",
  ],
  pillars: [
    {
      title: "Expert renovation planning",
      body: "A detailed site assessment of existing structures, space utilisation, lighting, ventilation and layout before anything is proposed.",
    },
    {
      title: "Customised design solutions",
      body: "Modern or classic, every proposal reflects your style — previewed in 3D so you decide with confidence.",
    },
    {
      title: "High-quality craftsmanship",
      body: "Premium materials, trusted brands and skilled craftsmen who pay attention to every corner and every finish.",
    },
    {
      title: "Stress-free project management",
      body: "Changes executed safely and to building standards, with one team handling the work from start to finish.",
    },
  ],
  steps: [
    { title: "Ask for a quotation", body: "Tell us about your space and what you want to change." },
    { title: "Planning", body: "Site evaluation, design suggestions and a transparent cost estimate." },
    { title: "Construction", body: "Supervised execution with precision and minimal disruption." },
    { title: "Delivery", body: "A final walkthrough of your renewed space." },
  ],
} as const;

export const structuralPage = {
  slug: "structural-engineer",
  path: "/structural-engineer/",
  seo: {
    title: "Structural Engineer in Chennai — Structural Design & Approvals",
    description:
      "Structural design, analysis and approvals by S3 Infrastructure for villas, apartments, offices and factories — load and seismic calculations to IS codes and the National Building Code.",
  },
  eyebrow: "Structural design & approvals",
  title: "Structures engineered *to stand for generations.*",
  lede:
    "Safe, efficient frameworks for villas, apartments, office buildings and factories — calculated for load, soil and seismic conditions, coordinated with the architecture and drawn to IS codes and the National Building Code.",
  image: "service-structural",
  services: [
    {
      title: "Structural designing",
      body: "Intelligent structural layouts that account for load dynamics, usage, materials, soil conditions and future expansion.",
    },
    {
      title: "Structural analysis",
      body: "Comprehensive analysis to predict performance, reduce risk and optimise material use — from earthquake resistance to wind load.",
    },
    {
      title: "Customised solutions",
      body: "No one-size-fits-all: every design is tailored to your site conditions, architectural vision and usage.",
    },
    {
      title: "Advanced engineering tools",
      body: "Accurate 2D and 3D models, stress simulations and construction-ready documentation using ETABS, STAAD Pro, AutoCAD and Revit.",
    },
    {
      title: "Quality assurance & compliance",
      body: "Designs follow IS codes and National Building Code (NBC) regulations, with quality checks from design to documentation.",
    },
  ],
  method: [
    "Detailed site and requirement analysis",
    "Custom structural design solutions",
    "Integration with architectural layouts",
    "Seismic and load-bearing calculations",
    "Timely delivery and clear communication",
    "Designed to IS codes and the NBC",
  ],
  approvals: {
    title: "Permits and approvals, handled.",
    body: "We prepare the drawings and documentation your project needs and coordinate the approval process, so construction starts compliant with local building codes and regulations.",
  },
} as const;
