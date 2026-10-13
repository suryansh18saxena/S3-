import { renovationPage as page } from "@/content/services";
import { faqsFor } from "@/content/faqs";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ChipList, FaqSection, FeatureGrid, SplitFeature, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({ title: page.seo.title, description: page.seo.description, path: page.path });

export default function RenovationPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        crumbs={[{ name: "Services", path: "/services/" }, { name: "Renovation & Remodeling", path: page.path }]}
        image="service-renovation"
        caption="Representative photography"
      >
        <ButtonLink href="/contact/">Ask for a quotation</ButtonLink>
      </PageHero>

      <section className="section-y bg-paper" aria-labelledby="reno-scope-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="reno-scope-title" index="01" label="What we renovate" title="One room, *or the whole house.*" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <ChipList items={page.services} />
            <p className="mt-8 text-lede text-slate-600" data-reveal>
              Residential and commercial renovations, from minor updates to major overhauls — each change executed safely and
              in compliance with building standards.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="reno-pillars-title">
        <div className="shell">
          <SectionHeading id="reno-pillars-title" index="02" label="How we work" title="Careful planning, *clean execution.*" />
          <div className="mt-16">
            <FeatureGrid items={page.pillars.map((p) => ({ title: p.title, body: p.body }))} columns={4} />
          </div>
        </div>
      </section>

      <section className="section-y bg-paper" aria-label="Renovation approach">
        <div className="shell grid gap-24 md:gap-32">
          <SplitFeature image="interior-kitchen-dark" eyebrow="Kitchens & bathrooms" title="Upgrades you'll use every single day.">
            <p>
              Kitchen remodels, bathroom upgrades, new flooring, false ceilings and improved electrical and plumbing — planned
              around how your household actually moves through the space.
            </p>
          </SplitFeature>
          <SplitFeature image="site-painting" eyebrow="Whole-home makeovers" title="Modern comfort in an existing structure." flip>
            <p>
              We begin with a thorough site assessment of the existing structure, then evaluate space utilisation, lighting,
              ventilation and layout efficiency before proposing changes that add comfort and value.
            </p>
          </SplitFeature>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="reno-steps-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2]">
          <SectionHeading id="reno-steps-title" index="03" label="Here's how it works" title="Four steps to *a renewed home.*" tone="dark" />
          <div className="mt-16">
            <Steps steps={page.steps.map((s) => ({ title: s.title, body: s.body }))} tone="dark" />
          </div>
        </div>
      </section>

      <FaqSection items={faqsFor("renovation")} index="04" />
      <CtaBand title="Tell us what you'd *like to change.*" whatsappMessage="Hello S3 Infrastructure, I'd like a quotation for a renovation." />
      <JsonLd data={serviceJsonLd({ name: "Home renovation and remodeling", description: page.seo.description, path: page.path })} />
    </>
  );
}
