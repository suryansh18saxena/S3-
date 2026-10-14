import type { CSSProperties } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { packages } from "@/content/packages";
import { Picture } from "@/components/ui/Picture";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Odometer } from "@/components/ui/Odometer";
import { Aperture } from "./Aperture";
import { PillarPanels } from "./PillarPanels";


/** Only facts published by S3 — no invented counters. */
const facts = [
  { value: "35+", label: "years of experience — our Director & CEO" },
  { value: String(site.serviceAreas.length), label: `cities — ${site.serviceAreas.join(", ")}` },
  { value: String(packages.length), label: "turnkey packages with published specifications" },
  { value: "1", label: "accountable team, from first drawing to handover" },
];

export function Intro() {
  return (
    <section id="intro" className="hero-follow bg-paper pt-[var(--section-y)] pb-[clamp(2rem,4vw,4rem)]" aria-labelledby="intro-title">
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
      </div>

      <div className="mt-16 lg:mt-24">
        <Aperture />
      </div>

      <div className="shell">
        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p data-reveal className="text-lede text-slate-600">
              {site.name} is an architecture, interior design and construction company based in Kodungaiyur, Chennai. Our
              architects, interior designers and civil and structural engineers work as one team — planning, approvals,
              construction and finishing — for homes and commercial spaces across {site.serviceAreas.slice(0, -1).join(", ")}{" "}
              and {site.serviceAreas.at(-1)}.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div data-reveal className="flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-4 pr-6 shadow-[0_20px_50px_-30px_rgb(4_15_26/0.35)] ring-1 ring-navy-900/5">
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

        <div className="mt-14 lg:mt-20">
          <PillarPanels />
        </div>

        {/* Facts as a drawing-sheet spec table. */}
        <dl
          data-reveal="stagger"
          className="grain relative mt-24 grid overflow-hidden rounded-[var(--radius-panel)] bg-navy-900 text-white sm:grid-cols-2 lg:mt-32 lg:grid-cols-4"
        >
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
          {facts.map((f, i) => (
            <div
              key={f.label}
              data-reveal-item
              data-spotlight
              className="group relative border-white/10 p-7 not-last:border-b sm:[&:nth-child(odd)]:border-r md:p-10 lg:border-b-0 lg:not-last:border-r"
              style={{ "--spot": "rgb(82 178 227 / 0.2)" } as CSSProperties}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd className="relative">
                <span className="eyebrow flex items-center justify-between text-sky-300">
                  <span>Fig. 0{i + 1}</span>
                  <span aria-hidden className="h-px w-10 bg-current opacity-50 transition-[width] duration-700 ease-out-expo group-hover:w-20" />
                </span>
                <Odometer value={f.value} className="numeral mt-8 text-[clamp(4rem,3rem+3.6vw,7rem)] text-white" />
                {/* Dimension line under the figure, like on a drawing. */}
                <span aria-hidden className="mt-5 flex items-center gap-2 text-sky-300/70">
                  <span className="h-2.5 w-px bg-current" />
                  <span className="h-px flex-1 origin-left scale-x-[0.35] bg-current transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
                  <span className="h-2.5 w-px bg-current" />
                </span>
                <span className="mt-4 block max-w-[16rem] text-[0.95rem] leading-relaxed text-white/65">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
