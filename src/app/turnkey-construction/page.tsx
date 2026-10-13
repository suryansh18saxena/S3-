import { packageExclusions, packages, pricing } from "@/content/packages";
import { pricingModels, turnkeyPage as page } from "@/content/services";
import { faqsFor } from "@/content/faqs";
import { formatINR } from "@/lib/format";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FaqSection, FeatureGrid, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { CostCalculator } from "@/components/calculator/CostCalculator";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { Check } from "@/components/ui/Icons";

export const metadata = pageMeta({ title: page.seo.title, description: page.seo.description, path: page.path });

export default function TurnkeyPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        crumbs={[{ name: "Services", path: "/services/" }, { name: "Turnkey Construction", path: page.path }]}
        image="site-frame"
        imagePosition="50% 35%"
        caption="Representative photography"
      >
        <ButtonLink href="#packages">Compare packages</ButtonLink>
        <ButtonLink href="#calculator" variant="outline">
          Cost calculator
        </ButtonLink>
      </PageHero>

      <section id="process" className="section-y bg-paper" aria-labelledby="how-title">
        <div className="shell">
          <SectionHeading
            id="how-title"
            index="01"
            label="How it works"
            title="Four stages. One contract."
            lede="Villas, duplexes and independent houses delivered end to end — from concept to completion with a single point of contact."
            align="split"
          />
          <div className="mt-16">
            <Steps steps={page.steps.map((s) => ({ title: s.title, body: s.body }))} />
          </div>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="commit-title">
        <div className="shell">
          <SectionHeading id="commit-title" index="02" label="Our commitments" title="What a turnkey build *with S3 includes.*" />
          <div className="mt-16">
            <FeatureGrid items={page.commitments.map((c) => ({ title: c.title, body: c.body }))} columns={4} />
          </div>
        </div>
      </section>

      <section id="packages" className="section-y bg-paper" aria-labelledby="pk-title">
        <div className="shell">
          <SectionHeading
            id="pk-title"
            index="03"
            label="Turnkey packages"
            title="Specifications, in writing."
            lede={
              <>
                {pricing.note} Rates shown are S3&apos;s published rates as of {pricing.publishedLabel}.
              </>
            }
            align="split"
          />

          <div className="mt-16 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {packages.map((p, i) => {
              const dark = i >= 2;
              return (
                <article
                  key={p.id}
                  id={`package-${p.id}`}
                  data-reveal
                  className={`relative flex flex-col overflow-hidden rounded-[var(--radius-panel)] p-7 md:p-9 ${
                    dark ? "bg-navy-900 text-white" : i === 1 ? "bg-ice-100 ring-1 ring-sky-300/40" : "bg-white ring-1 ring-navy-900/8"
                  }`}
                >
                  {dark && <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />}
                  <header className="relative">
                    <p className={`eyebrow ${dark ? "text-sky-300" : "text-blue-600"}`}>{p.tier}</p>
                    <h3 className="mt-5 font-display text-h3 font-semibold">{p.name} package</h3>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="numeral text-[2.4rem] leading-none">{formatINR(p.rate)}</span>
                      <span className={dark ? "text-white/60" : "text-slate-500"}>/ {pricing.unit}</span>
                    </p>
                    <p className={`mt-1 text-[0.78rem] ${dark ? "text-white/45" : "text-slate-500"}`}>
                      Published standard rate {formatINR(p.listRate)} / {pricing.unit}
                    </p>
                    <p className={`mt-5 ${dark ? "text-white/75" : "text-slate-600"}`}>{p.summary}</p>
                  </header>
                  <dl className={`relative mt-7 grid gap-4 border-t pt-6 text-[0.9rem] ${dark ? "border-white/15" : "border-navy-900/10"}`}>
                    {p.inheritsFrom && (
                      <div className="flex gap-3">
                        <Check size={16} className={`mt-0.5 shrink-0 ${dark ? "text-sky-300" : "text-blue-600"}`} />
                        <dd>All structural specifications of the {packages.find((x) => x.id === p.inheritsFrom)?.name} package.</dd>
                      </div>
                    )}
                    {p.specs.map((s) => (
                      <div key={s.label} className="grid gap-1">
                        <dt className="font-semibold">{s.label}</dt>
                        <dd className={dark ? "text-white/70" : "text-slate-600"}>{s.value}</dd>
                      </div>
                    ))}
                    {p.included && (
                      <div className="grid gap-1">
                        <dt className="font-semibold">Included</dt>
                        <dd className={dark ? "text-white/70" : "text-slate-600"}>{p.included}</dd>
                      </div>
                    )}
                    {p.warranty && (
                      <div className="grid gap-1">
                        <dt className="font-semibold">Warranty</dt>
                        <dd className={dark ? "text-white/70" : "text-slate-600"}>{p.warranty}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="relative mt-auto pt-9">
                    <ButtonLink href="/contact/" variant={dark ? "sky" : "dark"}>
                      Request {p.name} quote
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 rounded-[var(--radius-card)] border border-navy-900/10 p-6 md:grid-cols-[14rem_1fr] md:p-8" data-reveal>
            <p className="eyebrow text-blue-600">Not included in any package</p>
            <ul className="flex flex-wrap gap-2">
              {packageExclusions.map((x) => (
                <li key={x} className="rounded-full bg-stone-100 px-3.5 py-1.5 text-[0.88rem] text-slate-700">
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 max-w-3xl text-[0.85rem] text-slate-500">
            Warranty terms for each project are confirmed at consultation and written into your contract. Brand names refer to
            the materials specified in S3&apos;s published packages; equivalents may be agreed in writing.
          </p>
        </div>
      </section>

      <section id="calculator" className="section-y bg-stone-50" aria-labelledby="calc-title">
        <div className="shell">
          <SectionHeading
            id="calc-title"
            index="04"
            label="Cost calculator"
            title="Estimate your build."
            lede="An indicative figure from the published package rates and the extras you choose. Your final quote follows a site assessment."
            align="split"
          />
          <div className="mt-14">
            <CostCalculator />
          </div>
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="models-title">
        <div className="shell">
          <SectionHeading id="models-title" index="05" label="Transparent pricing" title="Cost-plus *or fixed price?*" lede={pricingModels.intro} align="split" />
          <div className="mt-14 overflow-x-auto rounded-[var(--radius-card)] ring-1 ring-navy-900/10" data-reveal>
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Comparison of cost-plus and fixed-price construction contracts</caption>
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th scope="col" className="w-48 p-5 font-display font-semibold">Aspect</th>
                  <th scope="col" className="p-5 font-display font-semibold">Cost-plus</th>
                  <th scope="col" className="p-5 font-display font-semibold">Lump-sum / fixed price</th>
                </tr>
              </thead>
              <tbody>
                {pricingModels.rows.map((r) => (
                  <tr key={r.aspect} className="border-t border-navy-900/10 bg-white odd:bg-paper">
                    <th scope="row" className="p-5 align-top font-semibold">
                      {r.aspect}
                    </th>
                    <td className="p-5 align-top text-slate-700">{r.costPlus}</td>
                    <td className="p-5 align-top text-slate-500">{r.fixed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqSection items={faqsFor("construction")} index="06" />
      <CtaBand title="Let's plan *your build.*" whatsappMessage="Hello S3 Infrastructure, I'd like a quote for turnkey house construction." />
      <JsonLd data={serviceJsonLd({ name: "Turnkey house construction", description: page.seo.description, path: page.path })} />
    </>
  );
}
