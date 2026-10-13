import { SectionHeading } from "@/components/sections/SectionHeading";

const reasons = [
  {
    title: "One team, drawing to handover",
    body: "Architects, interior designers and civil and structural engineers under one roof — and a single point of contact instead of a dozen vendors.",
  },
  {
    title: "Costs and schedules in writing",
    body: "Published package specifications, clear estimates, detailed schedules and regular progress updates throughout the build.",
  },
  {
    title: "Engineers on every stage",
    body: "Foundation, RCC, masonry, plastering and finishing are supervised by our engineers, with regular site inspections.",
  },
  {
    title: "Structures to code",
    body: "Structural design to IS codes and the National Building Code, with seismic and load-bearing calculations.",
  },
  {
    title: "Planned for the climate",
    body: "Natural light, cross-ventilation and energy-efficient planning — with Vastu requirements accommodated if you want them.",
  },
  {
    title: "Specified, branded materials",
    body: "Certified materials from trusted suppliers, with brands and allowances listed for every package.",
  },
];

const roles = [
  { label: "Architect", x: 70, y: 70 },
  { label: "Interior designer", x: 70, y: 190 },
  { label: "Structural engineer", x: 70, y: 310 },
  { label: "Civil engineer", x: 70, y: 430 },
  { label: "Site supervision", x: 70, y: 550 },
];

/** Many disciplines converge on one accountable team, with one line to you. */
function ConvergenceDiagram() {
  return (
    <svg viewBox="0 0 560 620" className="w-full" fill="none" aria-hidden focusable="false" data-reveal="draw">
      <g stroke="currentColor" strokeWidth="1.2" className="text-blue-600">
        {roles.map((r) => (
          <path key={r.label} d={`M${r.x + 8} ${r.y}C ${r.x + 170} ${r.y}, 250 310, 330 310`} pathLength={1} opacity={0.6} />
        ))}
        <path d="M330 310H500" pathLength={1} strokeWidth="2" />
        <circle cx="330" cy="310" r="34" pathLength={1} strokeWidth="1.6" />
        <circle cx="330" cy="310" r="50" pathLength={1} opacity={0.35} />
        <circle cx="508" cy="310" r="8" pathLength={1} strokeWidth="1.6" />
        {roles.map((r) => (
          <circle key={`dot-${r.label}`} cx={r.x} cy={r.y} r="6" pathLength={1} />
        ))}
      </g>
      <g className="fill-slate-600 font-sans" fontSize="15">
        {roles.map((r) => (
          <text key={`t-${r.label}`} x={r.x - 6} y={r.y - 16}>
            {r.label}
          </text>
        ))}
        <text x="486" y="282" className="fill-ink font-display" fontWeight="600">
          You
        </text>
      </g>
      <text x="330" y="317" textAnchor="middle" className="fill-navy-900 font-display" fontSize="20" fontWeight="700" style={{ fontStretch: "125%" }}>
        S3
      </text>
    </svg>
  );
}

export function WhyS3() {
  return (
    <section className="section-y bg-paper" aria-labelledby="why-title">
      <div className="shell">
        <SectionHeading
          id="why-title"
          index="06"
          label="Why S3"
          title="Fewer handoffs. Fewer surprises. *A better home.*"
          lede="What homeowners get when the people who design the house are the people who build it."
          align="split"
        />
        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-[var(--radius-panel)] bg-white p-6 shadow-[0_30px_70px_-45px_rgb(4_15_26/0.45)] ring-1 ring-navy-900/5 md:p-10">
              <p className="eyebrow text-blue-600">One point of contact</p>
              <div className="mt-6">
                <ConvergenceDiagram />
              </div>
            </div>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7" data-reveal="stagger">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal-item className="border-t border-navy-900/12 pt-6 pb-10">
                <span className="numeral text-sm text-blue-600">0{i + 1}</span>
                <h3 className="mt-4 font-display text-h4 font-semibold">{r.title}</h3>
                <p className="mt-3 text-slate-600">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
