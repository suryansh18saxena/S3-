import Link from "next/link";
import { typologies } from "@/content/typologies";
import { Picture } from "@/components/ui/Picture";
import { ArrowUpRight } from "@/components/ui/Icons";
import { HorizontalScroller } from "./HorizontalScroller";

/** "What we build" — the building types S3 designs and constructs. */
export function Typologies() {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 text-white" aria-labelledby="typologies-title">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[36rem] w-[70rem] bg-[radial-gradient(closest-side,rgb(22_132_216/0.18),transparent)]" aria-hidden />

      <div className="shell relative z-[2] pt-[var(--section-y)] lg:pb-4">
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

      <div className="relative z-[2]">
        <HorizontalScroller label="Building types S3 designs and builds">
          {typologies.map((t, i) => (
            <article
              key={t.name}
              className="group relative w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-[34vw] xl:w-[30vw]"
            >
              <div className={`media-frame relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-800 ${i % 2 ? "aspect-[4/5] lg:mt-16" : "aspect-[4/5]"}`}>
                <div data-card-media className="absolute -inset-x-[8%] inset-y-0">
                  <Picture
                    name={t.image}
                    alt={t.imageAlt}
                    sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 38vw, 82vw"
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-[1.6s] ease-out-expo group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" aria-hidden />
                <span className="numeral absolute top-5 left-6 text-sm text-white/80">{t.index}</span>
                <span className="absolute top-5 right-5 rounded-full border border-white/25 bg-navy-950/30 px-3 py-1 text-[0.68rem] tracking-wide text-white/75 backdrop-blur-sm">
                  Representative
                </span>
                <div className="absolute inset-x-6 bottom-6">
                  <h3 className="font-display text-h3 font-semibold">{t.name}</h3>
                  <p className="mt-1 text-white/75">{t.line}</p>
                </div>
              </div>
              <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">{t.body}</p>
            </article>
          ))}
          <article className="flex w-[82vw] shrink-0 snap-start flex-col justify-between rounded-[var(--radius-panel)] border border-white/15 p-8 sm:w-[58vw] lg:w-[26vw]">
            <p className="eyebrow text-sky-300">Your brief</p>
            <div>
              <h3 className="font-display text-h3 font-semibold">Planning something different?</h3>
              <p className="mt-3 text-white/65">Commercial spaces, renovations or a typology not listed here — tell us about it.</p>
              <Link
                href="/contact/"
                className="group mt-8 inline-flex items-center gap-3 font-display font-semibold tracking-tight text-sky-300"
              >
                <span className="link-line">Discuss your project</span>
                <ArrowUpRight size={16} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </Link>
            </div>
          </article>
        </HorizontalScroller>
      </div>
    </section>
  );
}
