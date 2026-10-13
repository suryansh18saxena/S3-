/**
 * S3's project journey. Stages follow the existing site's process
 * (Initial Consultation → Planning & Design → Permits & Approvals →
 * Construction & Execution → Final Inspection & Handover), with quality
 * control called out as its own stage because the site describes engineer
 * inspections at every phase.
 */

export type Stage = {
  index: string;
  key: "brief" | "design" | "approvals" | "build" | "quality" | "handover";
  title: string;
  body: string;
  detail: string[];
};

export const stages: Stage[] = [
  {
    index: "01",
    key: "brief",
    title: "Consultation",
    body: "We listen first: your plot, budget, lifestyle and long-term plans — and walk the site to understand its conditions.",
    detail: ["Site visit & analysis", "Budget & timeline", "Requirements brief"],
  },
  {
    index: "02",
    key: "design",
    title: "Design",
    body: "Floor plans, elevations and 3D views evolve with your feedback until the home on paper is the home you want.",
    detail: ["2D & 3D floor plans", "3D elevation", "Structural drawings"],
  },
  {
    index: "03",
    key: "approvals",
    title: "Approvals",
    body: "Drawings and documentation are prepared and the approvals process coordinated, so work starts compliant.",
    detail: ["Permit drawings", "Code compliance", "Approval coordination"],
  },
  {
    index: "04",
    key: "build",
    title: "Construction",
    body: "Soil testing, foundation, RCC frame, masonry and finishing — scheduled in detail and supervised by our engineers.",
    detail: ["Soil testing", "Foundation & RCC", "Masonry & finishing"],
  },
  {
    index: "05",
    key: "quality",
    title: "Quality control",
    body: "Regular site inspections check workmanship against the approved design, with progress updates at every stage.",
    detail: ["Stage inspections", "Material checks", "Progress reports"],
  },
  {
    index: "06",
    key: "handover",
    title: "Handover",
    body: "A final inspection against design and specification, then the keys — and a home that stands strong for generations.",
    detail: ["Final inspection", "Snag resolution", "Keys & documentation"],
  },
];
