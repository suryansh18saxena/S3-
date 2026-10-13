/**
 * FAQs consolidated from the existing FAQ, Architecture, Interior Design,
 * Turnkey Construction and Renovation pages (duplicates removed, wording
 * tightened, meaning preserved).
 */

export type Faq = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "general",
    title: "Working with S3",
    items: [
      {
        q: "What services does S3 Infrastructure offer?",
        a: "Architectural design, interior design, civil and structural engineering, turnkey construction, construction management, renovation and 3D architectural rendering — for residential, commercial and industrial projects.",
      },
      {
        q: "How do I start a project with S3 Infrastructure?",
        a: "Call, WhatsApp or email us, or send an enquiry through the contact page, to schedule an initial consultation. We'll discuss your vision, requirements, budget and timeline, then prepare a plan tailored to your project.",
      },
      {
        q: "Does S3 Infrastructure handle permits and approvals?",
        a: "Yes. We manage the permits and approvals your project needs and navigate the regulatory process so your project complies with local building codes and regulations.",
      },
      {
        q: "Can S3 help with sustainable, eco-friendly building?",
        a: "Yes. We design with natural light, cross-ventilation and energy-efficient planning, and can incorporate sustainable materials and green building practices to reduce environmental impact.",
      },
      {
        q: "Which areas do you work in?",
        a: "Our office is in Kodungaiyur, Chennai, and we take on projects across Chennai, Hosur and Bengaluru.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    items: [
      {
        q: "What architectural services do you offer?",
        a: "Design and planning, 2D and 3D floor plans, 3D elevations and renderings, structural design, interior and exterior visualisation, renovation design and construction documentation — for residential and commercial projects.",
      },
      {
        q: "How long does the architectural design process take?",
        a: "It depends on the scope and complexity of the project. The initial design phase typically takes a few weeks to a few months, and we share a detailed timeline during planning.",
      },
      {
        q: "How involved will I be in the design process?",
        a: "Very. We encourage clients to stay involved throughout — reviewing options, giving feedback and making decisions — so the final design reflects your vision and preferences.",
      },
      {
        q: "How do you ensure the quality of your architectural work?",
        a: "We use advanced design tools, skilled professionals and structured reviews at each stage of the project.",
      },
    ],
  },
  {
    id: "construction",
    title: "Construction",
    items: [
      {
        q: "What types of construction do you take on?",
        a: "New residential and commercial construction, renovations, interior and exterior construction, structural design and project management — for projects of all sizes.",
      },
      {
        q: "How long will my construction project take?",
        a: "Smaller projects may take a few months; larger ones can take a year or more. You receive a detailed, stage-by-stage timeline during planning.",
      },
      {
        q: "How do you ensure construction quality?",
        a: "Specified, branded materials, skilled professionals, strict quality-control measures and engineer inspections at each stage of construction.",
      },
      {
        q: "What warranty do you offer?",
        a: "Our published Silver and Gold packages include a 5-year structural warranty and a 1-year waterproofing warranty. Specific warranty terms are discussed at consultation and written into your contract.",
      },
      {
        q: "How accurate is the online cost calculator?",
        a: "It gives an indicative figure from our published package rates and the add-ons you choose. Your actual cost depends on the site, soil, design and specification, and is confirmed after a site assessment.",
      },
    ],
  },
  {
    id: "interiors",
    title: "Interiors",
    items: [
      {
        q: "What interior design services do you offer?",
        a: "Residential and commercial interiors, design consultations, 3D interior visualisation and space planning — from the first concept to final execution.",
      },
      {
        q: "How long does an interior project take?",
        a: "Residential projects can take anywhere from a few weeks to several months; commercial projects may take longer. We share a detailed timeline during planning.",
      },
      {
        q: "Can you work within my budget?",
        a: "Yes. We discuss your budget at the first consultation and plan a design that makes the most of it while meeting your aesthetic and functional goals.",
      },
      {
        q: "Do you provide 3D visualisations?",
        a: "Yes. 3D interior visualisations let you see a realistic representation of your space and make decisions before anything is built.",
      },
    ],
  },
  {
    id: "renovation",
    title: "Renovation",
    items: [
      {
        q: "What renovation services do you offer?",
        a: "Residential and commercial renovations, kitchen and bathroom remodels, exterior renovations and whole-house makeovers — from minor updates to major overhauls.",
      },
      {
        q: "How long will my renovation take?",
        a: "Small renovations may take a few weeks; larger projects can take several months. We give you a detailed timeline during planning.",
      },
      {
        q: "Do I need to move out during the renovation?",
        a: "It depends on the scope. For minor work you can often stay at home; larger projects may need temporary relocation. We'll discuss this during planning.",
      },
    ],
  },
];

export function faqsFor(...ids: string[]): Faq[] {
  return faqGroups.filter((g) => ids.includes(g.id)).flatMap((g) => g.items);
}
