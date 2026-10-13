import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Picture } from "@/components/ui/Picture";

export const metadata = pageMeta({
  title: "About Us — Architects, Engineers & Builders in Chennai",
  description:
    "Meet S3 Infrastructure: a Chennai-based architecture, civil engineering and construction company led by Director & CEO T. Srinivasan, building across Chennai, Hosur and Bengaluru.",
  path: "/about-us/",
});

const values = [
  {
    title: "Collaboration first",
    body: "We take the time to understand your vision, budget and lifestyle, so designs are practical as well as inspiring.",
  },
  {
    title: "Quality, supervised",
    body: "Premium materials, modern construction techniques and strict quality control — with engineers supervising every stage.",
  },
  {
    title: "Complete transparency",
    body: "Detailed cost estimates, realistic timelines and regular progress updates keep you informed and confident.",
  },
  {
    title: "Sustainable by design",
    body: "Eco-friendly materials, energy-efficient planning and smart space utilisation for future-ready homes.",
  },
];

const disciplines = ["Architects", "Interior designers", "Civil engineers", "Structural engineers", "Site supervisors"];

const places = [
  { city: "Chennai", note: "Our office is in Kodungaiyur, North Chennai — the base for projects across the city." },
  { city: "Hosur", note: "House construction and planning for homeowners in and around Hosur." },
  { city: "Bengaluru", note: "Residential architecture, interiors and construction in Bengaluru." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About S3 Infrastructure"
        title="Architects, engineers and builders — *working as one.*"
        lede="S3 Infrastructure is a Chennai-based architecture, civil engineering and construction company. We turn ideas into homes and spaces through architectural design, interior design, construction management and renovation."
        crumbs={[{ name: "About Us", path: "/about-us/" }]}
        image="arch-timber-house"
        caption="Representative photography"
      />

      <section className="section-y bg-paper" aria-labelledby="leader-title">
        <div className="shell grid items-center gap-14 lg:grid-cols-12">
          <figure className="lg:col-span-5">
            <div data-reveal="image" className="media-frame aspect-[4/5] rounded-[var(--radius-panel)] bg-stone-100">
              <Picture
                name={site.director.portrait as "director-t-srinivasan"}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
                position="55% 20%"
              />
            </div>
          </figure>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="leader-title" index="01" label="Leadership" title={`${site.director.name}, ${site.director.credential}`} />
            <p className="mt-4 font-display text-h4 font-medium text-blue-600" data-reveal>
              {site.director.role} · {site.director.experience}
            </p>
            <p className="mt-8 text-lede text-slate-600" data-reveal>
              S3 is led by Director &amp; CEO {site.director.name}, who brings {site.director.experience} to every project the
              team takes on — and the conviction that a home should stand strong creatively and structurally.
            </p>
            <p className="mt-5 text-slate-600" data-reveal>
              From the first consultation to handover, his team of architects, interior designers and civil and structural
              engineers works as one — so every decision on paper is one the site can deliver.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="values-title">
        <div className="shell">
          <SectionHeading id="values-title" index="02" label="What we stand for" title="Built on trust, expertise *and care.*" />
          <div className="mt-16">
            <FeatureGrid items={values} columns={4} />
          </div>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="team-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2] grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading id="team-title" index="03" label="The team" title="Every discipline *your project needs.*" tone="dark" />
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-6" data-reveal="stagger">
            {disciplines.map((d) => (
              <li key={d} data-reveal-item className="rounded-full border border-white/20 px-5 py-3 font-display text-lg font-semibold">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="where-title">
        <div className="shell">
          <SectionHeading id="where-title" index="04" label="Where we work" title="Three cities, *one standard.*" />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-navy-900/10 md:grid-cols-3" data-reveal="stagger">
            {places.map((p, i) => (
              <li key={p.city} data-reveal-item className="bg-paper p-8 md:p-10">
                <span className="numeral text-sm text-blue-600">0{i + 1}</span>
                <h3 className="mt-8 font-display text-[clamp(2.2rem,1.6rem+2vw,3.4rem)] leading-none font-semibold tracking-[-0.04em]">{p.city}</h3>
                <p className="mt-4 text-slate-600">{p.note}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3" data-reveal>
            <ButtonLink href="/services/">Our services</ButtonLink>
            <ButtonLink href="/projects/" variant="outline">
              What we build
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
