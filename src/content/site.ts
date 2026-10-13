/**
 * Company facts used across the site.
 *
 * Source: s3infrastructure.com (Home, About Us, Contact, Privacy Policy and
 * Terms pages), reviewed October 2026. Anything marked `confirm` could not be
 * verified independently and should be checked with S3 before launch.
 */

export const site = {
  name: "S3 Infrastructure",
  shortName: "S3 Infra",
  descriptor: "Architects & Interior Designers",
  tagline: "Architecture, interiors and turnkey construction",
  url: "https://s3infrastructure.com",
  locale: "en_IN",
  foundedNote: null, // Founding year is not published — do not invent one.

  director: {
    name: "T. Srinivasan",
    role: "Director & CEO",
    credential: "DCE",
    // Published on the existing homepage as "35+ Years of Experience (DCE)". confirm
    experience: "35+ years of experience",
    portrait: "director-t-srinivasan",
  },

  phones: [
    { display: "+91 70922 21713", href: "tel:+917092221713", whatsapp: true },
    { display: "+91 80721 57134", href: "tel:+918072157134", whatsapp: false },
  ],
  whatsappNumber: "917092221713",
  email: "support@s3infrastructure.com",

  address: {
    lines: ["Door No. 123, NSK Salai", "Narayanaswamy Garden, Nethaji Nagar", "Kodungaiyur, Chennai 600118"],
    street: "Door No. 123, NSK Salai, Narayanaswamy Garden, Nethaji Nagar, Kodungaiyur",
    locality: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600118",
    country: "IN",
  },

  /** Cities named on the existing site as places S3 plans and builds. */
  serviceAreas: ["Chennai", "Hosur", "Bengaluru"],

  /**
   * Official social profiles. The current site links to bare platform homepages
   * (facebook.com/, youtube.com/…), so none are published until S3 supplies
   * verified profile URLs.
   */
  social: [] as { label: string; href: string }[],
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
)}`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type NavItem = { label: string; href: string; description?: string };

export const serviceNav: NavItem[] = [
  { label: "Architectural Design", href: "/architectural/", description: "Plans, elevations & working drawings" },
  { label: "Interior Design", href: "/interior-design/", description: "Residential & commercial interiors" },
  { label: "Turnkey Construction", href: "/turnkey-construction/", description: "Packages, specifications & execution" },
  { label: "Renovation & Remodeling", href: "/renovation/", description: "Kitchens, bathrooms, whole homes" },
  { label: "Structural Design & Approvals", href: "/structural-engineer/", description: "Engineering, compliance & permits" },
];

export const primaryNav: NavItem[] = [
  { label: "Work", href: "/projects/" },
  { label: "Services", href: "/services/" },
  { label: "Turnkey Packages", href: "/turnkey-construction/" },
  { label: "About", href: "/about-us/" },
  { label: "Contact", href: "/contact/" },
];

export const utilityNav: NavItem[] = [
  { label: "Cost Calculator", href: "/construction-cost-calculator/" },
  { label: "FAQ", href: "/faq/" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-and-conditions/" },
];
