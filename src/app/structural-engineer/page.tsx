import { structuralPage as page } from "@/content/services";
import { faqGroups } from "@/content/faqs";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqSection, FeatureGrid, SplitFeature } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { Check } from "@/components/ui/Icons";

export const metadata = pageMeta({ title: page.seo.title, description: page.seo.description, path: page.path });

const faqs = [
  ...faqGroups.find((g) => g.id === "general")!.items.filter((f) => /permits|sustainable/i.test(f.q)),
  ...faqGroups.find((g) => g.id === "construction")!.items.filter((f) => /quality|types/i.test(f.q)),
];

export default function StructuralPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        crumbs={[{ name: "Services", path: "/services/" }, { name: "Structural Design & Approvals", path: page.path }]}
        image="service-structural"
        caption="Representative photography"
      >
        <ButtonLink href="/contact/">Talk to an engineer</ButtonLink>
      </PageHero>

      <section className="section-y bg-paper" aria-labelledby="struct-services-title">
        <div className="shell">
          <SectionHeading
            id="struct-services-title"
            index="01"
            label="Structural engineering"
            title="Safety, stability and durability — calculated."
            lede="For residential homes, commercial complexes and industrial units: structural engineering that supports every stage of your construction journey."
            align="split"
          />
          <div className="mt-16">
            <FeatureGrid items={page.services.map((s) => ({ title: s.title, body: s.body }))} />
          </div>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="method-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2] grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="method-title" index="02" label="Method" title="Problem solvers, not just calculators." tone="dark" />
            <p data-reveal className="mt-8 max-w-xl text-lede text-white/70">
              Every structure begins with a detailed site evaluation and requirement analysis, then a custom design integrated
              with the architectural layout — calculated for seismic and load-bearing conditions.
            </p>
          </div>
          <ul className="grid gap-px self-end overflow-hidden rounded-[var(--radius-card)] bg-white/12 sm:grid-cols-2 lg:col-span-6" data-reveal="stagger">
            {page.method.map((m) => (
              <li key={m} data-reveal-item className="flex gap-3 bg-navy-900 p-6">
                <Check size={18} className="mt-0.5 shrink-0 text-sky-300" />
                <span className="text-white/85">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="approvals" className="section-y bg-stone-50" aria-label="Planning, design and approvals">
        <div className="shell">
          <SplitFeature image="service-approvals" eyebrow="Planning, design & approvals" title={page.approvals.title}>
            <p>{page.approvals.body}</p>
            <p>
              Site analysis and feasibility studies come first, so the drawings submitted for approval are the drawings we
              build from.
            </p>
            <div className="pt-2">
              <ButtonLink href="/contact/" variant="outline">
                Discuss approvals
              </ButtonLink>
            </div>
          </SplitFeature>
        </div>
      </section>

      <FaqSection items={faqs} index="03" />
      <CtaBand title="Build on a structure you can trust." whatsappMessage="Hello S3 Infrastructure, I'd like to discuss structural design and approvals." />
      <JsonLd data={serviceJsonLd({ name: "Structural design and approvals", description: page.seo.description, path: page.path })} />
    </>
  );
}
