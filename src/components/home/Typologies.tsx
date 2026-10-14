import Link from "next/link";
import { typologies } from "@/content/typologies";
import { Picture } from "@/components/ui/Picture";
import { ArrowUpRight } from "@/components/ui/Icons";
import { TypologyReel } from "./TypologyReel";

/** "What we build" — the building types S3 designs and constructs, as a full-screen reel. */
export function Typologies() {
  const slides = typologies.map((t) => ({
    index: t.index,
    name: t.name,
    line: t.line,
    body: t.body,
    media: <Picture name={t.image} alt={t.imageAlt} sizes="100vw" className="block h-full w-full" />,
  }));

  return (
    <section className="grain relative overflow-clip bg-navy-900 text-white" aria-labelledby="typologies-title">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[36rem] w-[70rem] bg-[radial-gradient(closest-side,rgb(22_132_216/0.18),transparent)]" aria-hidden />

      <div className="shell relative z-[2] pt-[var(--section-y)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-4 text-sky-300" data-reveal="fade">
              <span className="numeral text-[0.8rem] tracking-normal">02</span>
              <span aria-hidden className="h-px w-10 bg-current opacity-50" />
              What we build
            </p>
            <h2 id="typologies-title" data-reveal="lines" className="mt-6 text-h2">
              Homes we design
              <br /> <em className="accent text-sky-300">and build.</em>
            </h2>
          </div>
          <div className="lg:col-span-5" data-reveal data-reveal-delay="0.15">
            <p className="text-lede text-white/70">
              From compact independent houses to villas and apartment blocks — each typology planned, engineered and
              built by the same team.
            </p>
            <p className="mt-4 text-[0.82rem] text-white/45">
              Photography is representative of each building type. Documented S3 case studies will be published here.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-[2] mt-14 md:mt-20">
        <TypologyReel slides={slides} label="Building types S3 designs and builds" />
      </div>

      <div className="shell relative z-[2] pt-10 pb-[var(--section-y)] md:pt-14">
        <div className="flex flex-col gap-5 rounded-[var(--radius-panel)] border border-white/15 p-7 md:flex-row md:items-center md:justify-between md:p-9" data-reveal>
          <div>
            <p className="eyebrow text-sky-300">Your brief</p>
            <p className="mt-3 font-display text-h4 font-semibold">Planning something different?</p>
            <p className="mt-1 text-white/65">Commercial spaces, renovations or a typology not listed here — tell us about it.</p>
          </div>
          <Link href="/contact/" className="group inline-flex shrink-0 items-center gap-3 font-display font-semibold tracking-tight text-sky-300">
            <span className="link-line">Discuss your project</span>
            <ArrowUpRight size={16} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </section>
  );
}
