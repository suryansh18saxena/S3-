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

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-reveal="stagger">
          {packages.map((p, i) => {
            const dark = i >= 2;
            return (
              <li
                key={p.id}
                data-reveal-item
                data-tilt
                data-spotlight
                className={`relative flex flex-col overflow-hidden rounded-[var(--radius-panel)] p-7 md:p-8 ${tones[i]}`}
                style={{ "--spot": dark ? "rgb(82 178 227 / 0.22)" : "rgb(22 132 216 / 0.1)" } as CSSProperties}
              >
                {dark && <div className="blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden />}
                <div className="relative flex items-center justify-between">
                  <p className={`eyebrow ${dark ? "text-sky-300" : "text-blue-600"}`}>{p.tier}</p>
                  <span className="numeral text-sm opacity-50">0{i + 1}</span>
                </div>
                <h3 className="relative mt-8 font-display text-h3 font-semibold">{p.name}</h3>
                <p className="relative mt-5 flex items-baseline gap-2">
                  <span className="numeral text-[2.6rem] leading-none font-normal">{formatINR(p.rate)}</span>
                  <span className={dark ? "text-white/60" : "text-slate-500"}>/ {pricing.unit}</span>
                </p>
                <p className={`relative mt-2 text-[0.78rem] ${dark ? "text-white/45" : "text-slate-500"}`}>
                  Published standard rate {formatINR(p.listRate)}
                </p>
                <p className={`relative mt-6 text-[0.95rem] leading-relaxed ${dark ? "text-white/75" : "text-slate-600"}`}>{p.summary}</p>
                <ul className="relative mt-6 grid gap-2.5 text-[0.88rem]">
                  {p.specs.slice(0, 3).map((s) => (
                    <li key={s.label} className="flex gap-2.5">
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
                  className={`group relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold ${dark ? "text-sky-300" : "text-blue-600"}`}
                >
                  <span className="link-line">Full {p.name} specification</span>
                  <ArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                </Link>
              </li>
            );
          })}
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
