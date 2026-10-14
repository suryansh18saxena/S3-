import type { CSSProperties } from "react";
import Link from "next/link";
import { packages, pricing } from "@/content/packages";
import { formatINR } from "@/lib/format";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight, Check } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/sections/SectionHeading";

/** Light → deep navy, so the tiers read as a progression of specification. */
const tones = [
  "bg-white text-ink ring-1 ring-navy-900/8",
  "bg-ice-100 text-ink ring-1 ring-sky-300/40",
  "bg-navy-800 text-white",
  "bg-navy-950 text-white edge-glow",
];

export function PackagesTeaser() {
  return (
    <section className="section-y bg-stone-50" aria-labelledby="packages-title">
      <div className="shell">
        <SectionHeading
          id="packages-title"
          index="05"
          label="Turnkey packages"
          title="Four specifications. *Priced per square foot.*"
          lede={
            <>
              Every package includes design, structure and finishing with the materials and brands listed in writing. Rates are
              S3&apos;s published rates as of {pricing.publishedLabel} and are confirmed after a site assessment.
            </>
          }
          align="split"
        />

        {/* A stacked deck: each specification lands on top of the last (md and up).
            Every card's header row stays visible as a tab, so the stack reads as an index. */}
        <ul className="mt-16 md:mt-20" data-stack>
          {packages.map((p, i) => {
            const dark = i >= 2;
            const muted = dark ? "text-white/60" : "text-slate-500";
            return (
              <li
                key={p.id}
                data-stack-item
                className="mb-5 last:mb-0 md:sticky md:mb-[14vh] md:pb-[var(--tail)]"
                // --tail: as the deck leaves, every card stays one tab below the last
                // instead of sliding up into the same spot.
                style={{ top: `calc(var(--header-h) + 1.25rem + ${i * 4.6}rem)`, "--tail": `${(packages.length - 1 - i) * 4.6}rem` } as CSSProperties}
              >
                <article
                  data-spotlight
                  data-reveal
                  className={`relative overflow-hidden rounded-[var(--radius-panel)] shadow-[0_-18px_40px_-28px_rgb(4_15_26/0.45)] ${tones[i]}`}
                  style={{ "--spot": dark ? "rgb(82 178 227 / 0.22)" : "rgb(22 132 216 / 0.1)" } as CSSProperties}
                >
                  {dark && <div className="blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden />}
                  <span data-stack-dim aria-hidden className="pointer-events-none absolute inset-0 z-[3] bg-navy-950 opacity-0" />

                  {/* Tab row */}
                  <header className={`relative flex h-[4.6rem] items-center gap-4 border-b px-6 md:px-10 ${dark ? "border-white/12" : "border-navy-900/10"}`}>
                    <span className="numeral text-sm opacity-60">0{i + 1}</span>
                    <h3 className="font-display text-[1.6rem] font-semibold tracking-[-0.03em] md:text-[1.9rem]">{p.name}</h3>
                    <span className={`eyebrow hidden sm:inline ${dark ? "text-sky-300" : "text-blue-600"}`}>{p.tier}</span>
                    <span className="ml-auto flex items-baseline gap-1.5">
                      <span className="numeral text-[1.35rem]">{formatINR(p.rate)}</span>
                      <span className={`text-[0.8rem] ${muted}`}>/ {pricing.unit}</span>
                    </span>
                  </header>

                  <div className="relative grid gap-8 p-6 md:min-h-[min(50svh,27rem)] md:grid-cols-12 md:gap-10 md:p-10">
                    {/* Oversized tier number, cut off by the card edge. */}
                    <span
                      aria-hidden
                      className={`numeral pointer-events-none absolute -right-4 -bottom-10 text-[clamp(9rem,18vw,17rem)] leading-none select-none ${dark ? "text-white/[0.05]" : "text-navy-900/[0.05]"}`}
                    >
                      0{i + 1}
                    </span>
                    <div className="relative flex flex-col md:col-span-5">
                      <p className={`text-lede ${dark ? "text-white/80" : "text-slate-600"}`}>{p.summary}</p>
                      <p className="mt-auto flex items-baseline gap-2 pt-8">
                        <span className="numeral text-[clamp(2.6rem,1.8rem+2.6vw,4.4rem)] leading-none font-normal">{formatINR(p.rate)}</span>
                        <span className={muted}>/ {pricing.unit}</span>
                      </p>
                      <p className={`mt-2 text-[0.8rem] ${muted}`}>Published standard rate {formatINR(p.listRate)}</p>
                    </div>
                    <div className="relative flex flex-col md:col-span-7">
                      <ul className="grid gap-x-8 gap-y-4 text-[0.92rem] sm:grid-cols-2">
                        {p.specs.slice(0, 4).map((s) => (
                          <li key={s.label} className={`flex gap-2.5 border-t pt-4 ${dark ? "border-white/12" : "border-navy-900/10"}`}>
                            <Check size={16} className={`mt-0.5 shrink-0 ${dark ? "text-sky-300" : "text-blue-600"}`} />
                            <span>
                              <span className="font-semibold">{s.label}:</span>{" "}
                              <span className={dark ? "text-white/70" : "text-slate-600"}>{s.value.split(";")[0]}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/turnkey-construction/#package-${p.id}`}
                        className={`group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold ${dark ? "text-sky-300" : "text-blue-600"}`}
                      >
                        <span className="link-line">Full {p.name} specification</span>
                        <ArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
          {/* Room after the last card: it lands and the full deck holds before leaving. */}
          <li aria-hidden className="hidden md:block md:h-[38vh]" />
        </ul>

        <div className="mt-12 flex flex-col gap-6 rounded-[var(--radius-card)] border border-navy-900/10 p-6 md:flex-row md:items-center md:justify-between md:p-8" data-reveal>
          <p className="max-w-2xl text-slate-600">
            <span className="font-semibold text-ink">Estimate your build in a minute.</span> Choose a package, enter your built-up
            area and optional extras such as a sump, compound wall or solar — and get an indicative figure.
          </p>
          <ButtonLink href="/construction-cost-calculator/">Cost calculator</ButtonLink>
        </div>
      </div>
    </section>
  );
}
