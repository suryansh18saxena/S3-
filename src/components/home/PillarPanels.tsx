import type { MediaKey } from "@/content/media";
import { Picture } from "@/components/ui/Picture";
import s from "./pillars.module.css";

const pillars: { title: string; accent: string; body: string; image: MediaKey }[] = [
  {
    title: "Design",
    accent: "around your life.",
    body: "Floor plans, elevations and interiors shaped around your routines, your plot and your budget.",
    image: "service-architecture",
  },
  {
    title: "Engineering",
    accent: "to code.",
    body: "Structural design, services drawings and approvals — calculated to IS codes and the National Building Code.",
    image: "service-structural",
  },
  {
    title: "Execution",
    accent: "on site, every stage.",
    body: "Supervised construction with clear schedules, stage-wise quality checks and regular progress updates.",
    image: "service-construction",
  },
];

/** The studio's three pillars as panels that open on hover or keyboard focus. */
export function PillarPanels() {
  return (
    <ol className={s.panels} data-reveal="stagger" aria-label="How we work">
      {pillars.map((p, i) => (
        <li key={p.title} className={s.panel} tabIndex={0} data-reveal-item>
          <div className={s.media} aria-hidden>
            <Picture name={p.image} alt="" sizes="(min-width: 768px) 60vw, 92vw" />
          </div>
          <p className={s.spine} aria-hidden>
            <span>0{i + 1}</span>
            {p.title}
          </p>
          <div className={s.body}>
            <span className={s.num} aria-hidden>
              0{i + 1}
            </span>
            <h3>
              {p.title} <em>{p.accent}</em>
            </h3>
            <span className={s.rule} aria-hidden />
            <p>{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
