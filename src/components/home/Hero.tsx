import type { CSSProperties } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Picture } from "@/components/ui/Picture";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowDown, ArrowUpRight, GlyphElevation } from "@/components/ui/Icons";
import { HeroElevation } from "./HeroElevation";
import { HeroMotion } from "./HeroMotion";
import { HeroDusk } from "./HeroDusk";
import { LocalTime } from "./LocalTime";
import { SkyCanvas } from "./SkyCanvas";
import s from "./hero.module.css";

/** Headline, split for the kinetic entrance. `serif` words get the italic accent face. */
const headline: { text: string; serif?: boolean }[][] = [
  [{ text: "Designed" }],
  [{ text: "with" }, { text: "intent.", serif: true }],
  [{ text: "Built" }, { text: "to" }, { text: "endure.", serif: true }],
];

const caption = ["From first light", "to lights on."];

/** Characters with a running index, so CSS can stagger them across lines. */
function KineticLines() {
  let c = 0;
  return (
    <>
      {headline.map((line, l) => (
        <span key={l} className={s.line}>
          {line.map((word, w) => (
            <span key={w} className={`${s.word2} ${word.serif ? s.serif : ""}`}>
              {[...word.text].map((ch, i) => (
                <span key={i} className={s.char} style={{ "--c": c++ } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

/**
 * Homepage hero — "first light to lights on".
 *
 * Entrance (CSS, from first paint): an architectural elevation draws itself on a
 * drawing board, a liquid reveal floods it with the photograph, the giant "S3"
 * rises behind the roofline and the headline assembles letter by letter.
 *
 * Scroll (GSAP, HeroMotion): the hero holds while the sky turns to dusk, stars
 * come out, the house's windows light up and the camera pushes in — then the
 * next section slides over it. On desktop an X-ray lens reveals the drawing
 * beneath the photograph wherever the pointer moves over the house.
 */
export function Hero() {
  return (
    <div className={s.track} data-hero-track>
      <section data-hero-intro className={s.hero} aria-labelledby="hero-title">
        <div className={s.blueprint} aria-hidden />

        <div className={`${s.box} ${s.drawing}`} aria-hidden>
          <HeroElevation />
        </div>

        {/* Drawing-board title block, shown while the elevation draws. */}
        <div className={s.titleBlock} aria-hidden>
          <span className={s.tbRow}>
            <span className={s.tbKey}>Project</span> Residence — front elevation
          </span>
          <span className={s.tbRow}>
            <span className={s.tbKey}>Drg.</span> A-201 <span className={s.tbKey}>Scale</span> 1:100
          </span>
          <span className={s.tbMeter}>
            <span className={s.tbBar} />
            <span className={s.tbCount} />
          </span>
        </div>

        <div className={s.scene} aria-hidden>
          <div className={s.cam} data-hero-cam>
            <div className={s.sky} data-depth="sky">
              <div className={s.skyDusk} data-hero-dusk-sky />
              <div className={s.stars} data-hero-stars />
              <SkyCanvas className={s.clouds} />
            </div>
            <div className={s.word} data-depth="word">
              <span className={s.wordPos}>
                <span className={s.wordInner}>S3</span>
              </span>
            </div>
            <div className={`${s.box} ${s.house}`} data-depth="house">
              <div className={s.houseInner}>
                <Picture
                  name="hero-house"
                  priority
                  placeholder={false}
                  sizes="(max-width: 1023px) 128vh, 100vw"
                  mobile={{ maxWidth: 1920, sizes: "88vh" }}
                  alt=""
                />
                <HeroDusk className={s.duskHouse} />
              </div>
            </div>

            {/* X-ray lens: the drawing beneath the photograph (desktop pointer). */}
            <div className={s.lens} data-hero-lens>
              <div className={s.lensBoard} />
              <div className={`${s.box} ${s.lensDrawing}`} data-depth="house">
                <HeroElevation />
              </div>
            </div>
          </div>
          <div className={s.mist} />
        </div>
        <div className={s.waterline} aria-hidden />

        <div className={s.lensRing} data-hero-ring aria-hidden>
          <span className={s.lensLabel}>Blueprint view</span>
        </div>

        <div className={`shell ${s.content}`}>
          <div className={s.copy}>
            <h1 id="hero-title" className={s.title}>
              <span className={`eyebrow ${s.kicker}`} data-hero-out>
                Architects · Interior designers · Builders — Chennai
              </span>
              <span className="sr-only">Designed with intent. Built to endure.</span>
              <span className={s.headline} aria-hidden data-hero-out>
                <KineticLines />
              </span>
            </h1>
            <div className={s.actions} data-hero-out>
              <ButtonLink href="/contact/" variant="light">
                <span className="sm:hidden">Start a project</span>
                <span className="hidden sm:inline">Start your project</span>
              </ButtonLink>
              <ButtonLink href="/projects/" variant="outline" className="hidden text-white sm:inline-flex">
                Explore our work
              </ButtonLink>
              <Link href="/projects/" className="eyebrow inline-flex items-center gap-2 py-3 text-[0.68rem] text-white max-[380px]:hidden sm:hidden">
                Our work <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Second beat, revealed as the scroll turns day into dusk. */}
          <p className={s.caption} aria-hidden data-hero-caption>
            {caption.map((line) => (
              <span key={line} className={s.capLine}>
                <span data-hero-cap>{line}</span>
              </span>
            ))}
          </p>

          <p className={s.hint} data-hero-hint aria-hidden>
            <span className={s.hintDot} />
            Hover the house — see its drawing
          </p>

          <aside className={`${s.noteCard} hidden md:block`} aria-label="Studio" data-hero-card>
            <p className="eyebrow mb-2.5 flex items-center gap-2.5 text-sky-300">
              <GlyphElevation size={15} /> Design &amp; build studio
            </p>
            <p className="text-[0.92rem] leading-relaxed text-white/85">
              One studio from the first sketch to handover — with engineers on site at every stage.
            </p>
            <p className="mt-3 flex items-center justify-between gap-4 border-t border-white/15 pt-3 text-[0.78rem] tracking-wide text-white/70">
              <span>{site.serviceAreas.join(" · ")}</span>
              <LocalTime className="numeral text-white/85" />
            </p>
          </aside>

          <a href="#intro" className={s.badge} data-hero-badge aria-label="Scroll to the next section">
            <svg viewBox="0 0 120 120" className={s.badgeText} aria-hidden>
              <defs>
                <path id="hero-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-circle" startOffset="0" textLength="286" lengthAdjust="spacing">
                  Scroll · watch the lights come on ·
                </textPath>
              </text>
            </svg>
            <span className={s.badgeCore}>
              <ArrowDown size={16} />
            </span>
          </a>
        </div>

        <div className={s.shade} data-hero-shade aria-hidden />
        <HeroMotion doneClass={s.done} lensOnClass={s.lensOn} />
      </section>
    </div>
  );
}
