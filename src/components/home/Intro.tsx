import Link from "next/link";
import { site } from "@/content/site";
import { packages } from "@/content/packages";
import { Picture } from "@/components/ui/Picture";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Odometer } from "@/components/ui/Odometer";

const pillars = [
  { title: "Design", body: "Floor plans, elevations and interiors shaped around your routines, your plot and your budget." },
  { title: "Engineering", body: "Structural design, services drawings and approvals — calculated to IS codes and the National Building Code." },
  { title: "Execution", body: "Supervised construction with clear schedules, stage-wise quality checks and regular progress updates." },
];

/** Only facts published by S3 — no invented counters. */
const facts = [
  { value: "35+", label: "years of experience — our Director & CEO" },
  { value: String(site.serviceAreas.length), label: `cities — ${site.serviceAreas.join(", ")}` },
  { value: String(packages.length), label: "turnkey packages with published specifications" },
  { value: "1", label: "accountable team, from first drawing to handover" },
];

export function Intro() {
  return (
    <section id="intro" className="hero-follow section-y bg-paper" aria-labelledby="intro-title">
      <div className="shell">
        <p className="eyebrow flex items-center gap-4 text-blue-600" data-reveal="fade">
          <span className="numeral text-[0.8rem] tracking-normal">01</span>
          <span aria-hidden className="h-px w-10 bg-current opacity-50" />
          The studio
        </p>
        <h2 id="intro-title" data-scrub="words" className="mt-8 max-w-[22ch] font-display text-[clamp(2rem,1.2rem+3.4vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-ink">
          We draw it, engineer it and build it — so the home you approve on paper is{" "}
          <em className="accent text-blue-700">the home you walk into.</em>
        </h2>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <figure className="lg:col-span-5">
            <div data-reveal="image" className="media-frame aspect-[4/5] rounded-[var(--radius-panel)]">
              <div data-parallax="0.12" className="absolute -inset-y-[8%] inset-x-0">
                <Picture
                  name="arch-screen-facade"
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  position="50% 40%"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-[0.78rem] text-slate-500">Representative photography</figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p data-reveal className="text-lede text-slate-600">
              {site.name} is an architecture, interior design and construction company based in Kodungaiyur, Chennai. Our
              architects, interior designers and civil and structural engineers work as one team — planning, approvals,
              construction and finishing — for homes and commercial spaces across {site.serviceAreas.slice(0, -1).join(", ")}{" "}
              and {site.serviceAreas.at(-1)}.
            </p>

            <ol data-reveal="stagger" className="mt-12 border-t border-navy-900/12">
              {pillars.map((p, i) => (
                <li key={p.title} data-reveal-item className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-navy-900/12 py-6 md:grid-cols-[4rem_10rem_1fr]">
                  <span className="numeral text-sm text-blue-600">0{i + 1}</span>
                  <h3 className="font-display text-h4 font-semibold">{p.title}</h3>
                  <p className="col-start-2 text-slate-600 md:col-start-3">{p.body}</p>
                </li>
              ))}
            </ol>

            <div data-reveal className="mt-12 flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-4 pr-6 shadow-[0_20px_50px_-30px_rgb(4_15_26/0.35)] ring-1 ring-navy-900/5">
              <div className="media-frame size-20 shrink-0 overflow-hidden rounded-2xl">
                <Picture
                  name="director-t-srinivasan"
                  sizes="80px"
                  className="block h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  position="55% 18%"
                />
              </div>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">
                  {site.director.name}, {site.director.credential}
                </p>
                <p className="text-sm text-slate-500">
                  {site.director.role} · {site.director.experience}
                </p>
              </div>
              <Link href="/about-us/" className="group ml-auto hidden items-center gap-2 text-sm font-semibold text-blue-600 sm:flex">
                <span className="link-line">About S3</span>
                <ArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>

        <dl data-reveal="stagger" className="mt-24 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-navy-900/10 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} data-reveal-item data-spotlight className="group bg-paper p-7 md:p-9">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="flex items-start justify-between">
                  <Odometer value={f.value} className="numeral text-[clamp(3.4rem,2.6rem+3vw,5.5rem)] text-navy-900" />
                  <span className="numeral text-[0.7rem] text-blue-600 opacity-70">0{i + 1}</span>
                </span>
                <span aria-hidden className="mt-6 block h-px w-full origin-left scale-x-[0.18] bg-navy-900/25 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                <span className="mt-4 block max-w-[16rem] text-[0.95rem] text-slate-500">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
