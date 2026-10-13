import { projects } from "@/content/projects";
import { typologies } from "@/content/typologies";
import { whatsappLink } from "@/content/site";
import { formatNumber } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Picture } from "@/components/ui/Picture";
import { WhatsApp } from "@/components/ui/Icons";

export const metadata = pageMeta({
  title: "Our Work — Homes We Design & Build",
  description:
    "Independent houses, villas, duplexes, bungalows, apartments and row houses designed and built by S3 Infrastructure in Chennai, Hosur and Bengaluru.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="The homes we *design and build.*"
        lede="Independent houses, villas, duplexes, bungalows, apartments and row houses — planned, engineered and built by one team."
        crumbs={[{ name: "Work", path: "/projects/" }]}
      />

      {projects.length > 0 ? (
        <section className="pb-[var(--section-y)] bg-paper" aria-labelledby="case-studies-title">
          <div className="shell">
            <h2 id="case-studies-title" className="sr-only">
              Case studies
            </h2>
            <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug} data-reveal>
                  <div className="media-frame aspect-[4/3] rounded-[var(--radius-panel)]">
                    <Picture name={p.cover} sizes="(min-width: 768px) 46vw, 92vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
                  </div>
                  <p className="eyebrow mt-6 text-blue-600">
                    {p.typology} · {p.city}
                    {p.year ? ` · ${p.year}` : ""}
                  </p>
                  <h3 className="mt-3 font-display text-h3 font-semibold">{p.name}</h3>
                  <p className="mt-3 text-slate-600">{p.summary}</p>
                  <p className="mt-4 text-sm text-slate-500">
                    {p.scope.join(" · ")}
                    {p.area ? ` · ${formatNumber(p.area)} sq.ft` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="pb-[var(--section-y)] bg-paper" aria-labelledby="in-preparation-title">
          <div className="shell">
            <div className="grain relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-900 p-8 text-white md:p-14" data-reveal>
              <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <p className="eyebrow text-sky-300">Case studies in preparation</p>
                  <h2 id="in-preparation-title" className="mt-5 text-h3 font-semibold">
                    We&apos;re documenting completed S3 projects properly — photographs, plans and the story behind each build.
                  </h2>
                  <p className="mt-5 max-w-xl text-white/70">
                    Until they&apos;re published here, ask us for project references and examples of our work during your
                    consultation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                  <ButtonLink
                    href={whatsappLink("Hello S3 Infrastructure, could you share examples of completed projects?")}
                    variant="sky"
                    icon={<WhatsApp size={17} />}
                  >
                    Request references
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-y bg-stone-50" aria-labelledby="types-title">
        <div className="shell">
          <SectionHeading
            id="types-title"
            label="Building types"
            title="What we design and build."
            lede="Representative photography illustrates each typology; it does not depict S3 projects."
            align="split"
          />
          <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {typologies.map((t, i) => (
              <li key={t.name} data-reveal className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <div className="media-frame relative aspect-[4/5] overflow-hidden rounded-[var(--radius-panel)]">
                  <Picture
                    name={t.image}
                    alt={t.imageAlt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 right-4 rounded-full bg-navy-950/40 px-3 py-1 text-[0.68rem] tracking-wide text-white/85 backdrop-blur-sm">
                    Representative
                  </span>
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="numeral text-sm text-blue-600">{t.index}</span>
                  <h3 className="font-display text-h4 font-semibold">{t.name}</h3>
                </div>
                <p className="mt-2 font-medium text-ink">{t.line}</p>
                <p className="mt-2 text-slate-600">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Let's add *your home* to this page." />
    </>
  );
}
