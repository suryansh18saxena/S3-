import Link from "next/link";
import { expertise } from "@/content/services";
import { stages } from "@/content/process";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { Picture } from "@/components/ui/Picture";
import { ArrowUpRight } from "@/components/ui/Icons";

export const metadata = pageMeta({
  title: "Services — Architecture, Interiors, Construction & Renovation",
  description:
    "Every S3 Infrastructure service in one place: architectural design, interior design, turnkey residential construction, structural design and engineering, renovation, approvals and construction management.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your project needs, *under one roof.*"
        lede="Seven disciplines that usually belong to seven different firms — coordinated by one team that stays with your project from the first drawing to the final inspection."
        crumbs={[{ name: "Services", path: "/services/" }]}
      />

      <section className="pb-[var(--section-y)] bg-paper" aria-label="Service list">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-2">
            {expertise.map((e, i) => (
              <li key={e.title} data-reveal className={i === 0 ? "md:col-span-2" : ""}>
                <Link
                  href={e.href}
                  data-cursor="View"
                  className="group grid overflow-hidden rounded-[var(--radius-panel)] bg-white ring-1 ring-navy-900/8 transition-shadow duration-500 hover:shadow-[0_30px_70px_-40px_rgb(4_15_26/0.45)] md:grid-cols-2"
                >
                  <div className={`media-frame ${i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[26rem]" : "aspect-[16/10]"} ${i === 0 ? "" : "md:col-span-2"}`}>
                    <Picture
                      name={e.image}
                      alt=""
                      sizes={i === 0 ? "(min-width: 768px) 46vw, 92vw" : "(min-width: 768px) 46vw, 92vw"}
                      className="block h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className={`flex flex-col p-7 md:p-9 ${i === 0 ? "" : "md:col-span-2"}`}>
                    <div className="flex items-start justify-between gap-6">
                      <span className="numeral text-sm text-blue-600">{e.index}</span>
                      <span className="grid size-11 place-items-center rounded-full ring-1 ring-navy-900/15 transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-navy-900 group-hover:text-white">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-h3 font-semibold">{e.title}</h2>
                    <p className="mt-3 text-slate-600">{e.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {e.points.map((p) => (
                        <li key={p} className="rounded-full bg-navy-900/5 px-3 py-1 text-[0.78rem] font-medium text-slate-600">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.78rem] text-slate-500">Representative photography.</p>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="svc-process-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2]">
          <SectionHeading id="svc-process-title" label="How a project runs" title="Six stages, *one team throughout.*" tone="dark" />
          <div className="mt-16">
            <Steps steps={stages.slice(0, 4).map((s) => ({ title: s.title, body: s.body }))} tone="dark" />
          </div>
          <div className="mt-12">
            <Steps steps={stages.slice(4).map((s) => ({ title: s.title, body: s.body }))} tone="dark" />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
