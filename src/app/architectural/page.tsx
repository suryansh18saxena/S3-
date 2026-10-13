import { architecturePage as page, designPackages } from "@/content/services";
import { typologies } from "@/content/typologies";
import { faqsFor } from "@/content/faqs";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqSection, FeatureGrid, SplitFeature } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { Check } from "@/components/ui/Icons";

export const metadata = pageMeta({ title: page.seo.title, description: page.seo.description, path: page.path });

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        crumbs={[{ name: "Services", path: "/services/" }, { name: "Architectural Design", path: page.path }]}
        image="studio-sketching"
        caption="Representative photography"
      >
        <ButtonLink href="/contact/">Discuss your plans</ButtonLink>
      </PageHero>

      <section className="section-y bg-paper" aria-labelledby="approach-title">
        <div className="shell">
          <SectionHeading id="approach-title" index="01" label="Approach" title="Architecture that answers to *the way you live.*" />
          <div className="mt-16">
            <FeatureGrid items={page.approach.map((a) => ({ title: a.title, body: a.body }))} />
          </div>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-label="Disciplines">
        <div className="shell grid gap-24 md:gap-32">
          <SplitFeature image="typology-independent-house" eyebrow="Residential architecture" title={page.disciplines[0].title}>
            <p>{page.disciplines[0].body}</p>
            <p>Renovation architects on the team also revitalise existing homes — from a single room to a complete makeover.</p>
          </SplitFeature>
          <SplitFeature image="interior-stair" eyebrow="Interior architecture" title={page.disciplines[1].title} flip>
            <p>{page.disciplines[1].body}</p>
          </SplitFeature>
          <SplitFeature image="arch-timber-house" eyebrow="3D architectural rendering" title={page.disciplines[2].title}>
            <p>{page.disciplines[2].body}</p>
          </SplitFeature>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="deliverables-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2]">
          <SectionHeading
            id="deliverables-title"
            index="02"
            label="Deliverables"
            title="Every drawing your build needs."
            lede="From the first floor plan to services layouts — clear, accurate documentation that keeps the site and the design in agreement."
            tone="dark"
            align="split"
          />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-5" data-reveal="stagger">
            {page.deliverables.map((d, i) => (
              <li key={d.title} data-reveal-item className="bg-navy-900 p-6">
                <span className="numeral text-xs text-sky-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-[0.9rem] text-white/65">{d.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="design-packages-title">
        <div className="shell">
          <SectionHeading
            id="design-packages-title"
            index="03"
            label="Design packages"
            title="Choose the depth of design you need."
            lede="Three architectural design packages, as published by S3. Ask us for current pricing for your plot."
            align="split"
          />
          <ul className="mt-16 grid gap-4 lg:grid-cols-3" data-reveal="stagger">
            {designPackages.map((p, i) => (
              <li
                key={p.name}
                data-reveal-item
                className={`flex flex-col rounded-[var(--radius-panel)] p-8 ${i === 2 ? "bg-navy-900 text-white" : "bg-white ring-1 ring-navy-900/8"}`}
              >
                <p className={`eyebrow ${i === 2 ? "text-sky-300" : "text-blue-600"}`}>Design package</p>
                <h3 className="mt-6 font-display text-h3 font-semibold">{p.name}</h3>
                <p className={`mt-3 ${i === 2 ? "text-white/70" : "text-slate-600"}`}>{p.summary}</p>
                <ul className="mt-8 grid gap-3 text-[0.95rem]">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <Check size={17} className={`mt-0.5 shrink-0 ${i === 2 ? "text-sky-300" : "text-blue-600"}`} />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <ButtonLink href="/contact/" variant={i === 2 ? "sky" : "dark"}>
                    Enquire
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="typology-title">
        <div className="shell">
          <SectionHeading id="typology-title" index="04" label="What we design" title="Residences *of every scale.*" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {typologies.map((t) => (
              <li key={t.name} data-reveal-item className="bg-stone-50 p-7">
                <span className="numeral text-sm text-blue-600">{t.index}</span>
                <h3 className="mt-5 font-display text-h4 font-semibold">{t.name}</h3>
                <p className="mt-2 text-slate-600">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={faqsFor("architecture")} index="05" />
      <CtaBand title="Let's draw *your home.*" whatsappMessage="Hello S3 Infrastructure, I'd like to discuss architectural design for my plot." />
      <JsonLd data={serviceJsonLd({ name: "Architectural design", description: page.seo.description, path: page.path })} />
    </>
  );
}
