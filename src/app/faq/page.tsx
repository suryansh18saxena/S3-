import { faqGroups } from "@/content/faqs";
import { faqJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "FAQ — Architecture, Construction, Interiors & Renovation",
  description:
    "Answers to common questions about working with S3 Infrastructure: services, approvals, timelines, quality, warranties, budgets and renovation.",
  path: "/faq/",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Questions, *answered.*"
        lede="Everything homeowners usually ask before starting a project with us. Can't find yours? Call or WhatsApp the team."
        crumbs={[{ name: "FAQ", path: "/faq/" }]}
      />
      <section className="pb-[var(--section-y)] bg-paper" aria-label="Questions by topic">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="sticky top-28 grid gap-1">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-xl px-4 py-2.5 text-slate-600 transition-colors hover:bg-white hover:text-ink">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-20 lg:col-span-9">
            {faqGroups.map((g, i) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} data-reveal>
                <p className="eyebrow flex items-center gap-4 text-blue-600">
                  <span className="numeral text-[0.8rem] tracking-normal">0{i + 1}</span>
                  <span aria-hidden className="h-px w-10 bg-current opacity-50" />
                  Topic
                </p>
                <h2 id={`${g.id}-title`} className="mt-4 mb-6 text-h3 font-semibold">
                  {g.title}
                </h2>
                <FaqList items={g.items} defaultOpen={null} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still have *a question?*" body="Call or WhatsApp the team — we're happy to talk through your plans." />
      <JsonLd data={faqJsonLd(faqGroups.flatMap((g) => g.items))} />
    </>
  );
}
