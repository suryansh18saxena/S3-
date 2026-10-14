import { Picture } from "@/components/ui/Picture";
import { ApertureMotion } from "./ApertureMotion";
import s from "./aperture.module.css";

/**
 * Pinned interlude in the studio section: a window cut into the drawing sheet
 * opens to a full-bleed photograph as "Drawn." and "Built." are pushed apart.
 */
export function Aperture() {
  return (
    <div className={s.track} data-aperture-track>
      <div className={s.stage} data-aperture-stage>
        <p className={`${s.word} ${s.left}`} aria-hidden>
          Drawn.
        </p>
        <p className={`${s.word} ${s.right}`} aria-hidden>
          <em>Built.</em>
        </p>

        <figure className={s.window}>
          <Picture name="arch-timber-house" sizes="100vw" alt="" className="block h-full w-full" position="50% 55%" />
          <figcaption className="sr-only">Representative photography</figcaption>
        </figure>

        <div className={s.marks} aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span className={s.fig}>Fig. 01 — Elevation to reality</span>
        </div>

        <div className={s.caption}>
          <p className="eyebrow flex items-center gap-4 text-sky-300">
            <span aria-hidden className="h-px w-10 bg-current opacity-60" />
            Design · Engineering · Execution
          </p>
          <h3>
            One studio, <em>from the first line to the last brick.</em>
          </h3>
          <p className="mt-4 text-[0.78rem] text-white/60">Representative photography</p>
        </div>
      </div>
      <ApertureMotion />
    </div>
  );
}
