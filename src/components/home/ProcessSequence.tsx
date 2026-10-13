"use client";

import { useEffect, useRef, useState } from "react";
import type { Stage } from "@/content/process";
import { ScrollTrigger, gsap, getLenis, setupGsap } from "@/lib/motion";
import { ProcessDrawing } from "./ProcessDrawing";

/**
 * Scroll-driven construction sequence. Desktop: the section pins and the
 * drawing builds stage by stage as you scroll. Mobile / reduced motion: the
 * drawing is shown complete and the stages read as a list.
 */
export function ProcessSequence({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setupGsap();
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const svg = el.querySelector<SVGSVGElement>("[data-pin-drawing] svg");
      if (!svg) return;
      const layers = stages.map((_, k) => svg.querySelectorAll(`[data-stage="${k}"] path, [data-stage="${k}"] rect`));
      const labels = svg.querySelectorAll<SVGTextElement>("[data-stage-label]");
      gsap.set(svg.querySelectorAll("[data-stage] path, [data-stage] rect"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(svg.querySelectorAll("[data-stage] rect"), { fillOpacity: 0 });
      gsap.set(labels, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * stages.length * 0.75}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(stages.length - 1, Math.floor(self.progress * stages.length))),
        },
      });
      stRef.current = tl.scrollTrigger ?? null;
      layers.forEach((paths, k) => {
        tl.to(paths, { strokeDashoffset: 0, duration: 0.85, stagger: 0.5 / Math.max(paths.length, 1) }, k);
        const stageLabels = Array.from(labels).filter((l) => l.dataset.stageLabel === String(k));
        if (stageLabels.length) tl.to(stageLabels, { opacity: 0.7, duration: 0.3 }, k + 0.5);
      });
      tl.to(svg.querySelectorAll("[data-stage='5'] rect"), { fillOpacity: 1, duration: 0.4 }, stages.length - 0.6);
      tl.to({}, { duration: 0.4 }); // hold on the finished house

      return () => {
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, [stages]);

  const goTo = (k: number) => {
    const st = stRef.current;
    if (!st) return;
    const y = st.start + ((k + 0.55) / stages.length) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const stage = stages[active];

  return (
    <div ref={root} className="relative">
      {/* Desktop: pinned stage panel */}
      <div className="hidden min-h-svh items-center lg:flex lg:motion-reduce:hidden">
        <div className="shell grid w-full grid-cols-12 items-center gap-10 py-20">
          <div data-pin-drawing className="col-span-7 text-sky-200">
            <div className="relative rounded-[var(--radius-panel)] border border-white/10 bg-navy-950/30 p-6 xl:p-10">
              <ProcessDrawing className="w-full" />
              <span className="eyebrow absolute top-5 left-6 text-[0.62rem] text-white/40">Front elevation · not to scale</span>
            </div>
          </div>
          <div className="col-span-5 pl-4 xl:pl-10">
            <div className="flex items-baseline gap-4" aria-live="polite">
              <span className="numeral text-[7rem] leading-none text-white">{stage.index}</span>
              <span className="numeral text-xl text-white/35">/ 0{stages.length}</span>
            </div>
            <h3 key={stage.key} className="mt-6 font-display text-h3 font-semibold text-white">
              {stage.title}
            </h3>
            <p className="mt-4 max-w-md text-lede text-white/70">{stage.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {stage.detail.map((d) => (
                <li key={d} className="rounded-full border border-white/15 px-3 py-1 text-[0.8rem] text-white/75">
                  {d}
                </li>
              ))}
            </ul>
            <ol className="mt-12 grid grid-cols-6 gap-2" aria-label="Project stages">
              {stages.map((s, k) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => goTo(k)}
                    aria-current={k === active ? "step" : undefined}
                    className="group w-full text-left"
                  >
                    <span className={`block h-0.5 rounded-full transition-colors duration-500 ${k <= active ? "bg-sky-400" : "bg-white/15"}`} />
                    <span className={`mt-3 block text-[0.72rem] transition-colors ${k === active ? "text-white" : "text-white/45 group-hover:text-white/75"}`}>
                      {s.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Mobile / reduced motion: drawing + list */}
      <div className="shell pb-[var(--section-y)] lg:hidden lg:motion-reduce:block">
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-navy-950/30 p-4 text-sky-200" data-reveal="draw">
          <ProcessDrawing className="w-full" />
        </div>
        <ol className="mt-10 border-t border-white/12">
          {stages.map((s) => (
            <li key={s.key} data-reveal className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-white/12 py-7">
              <span className="numeral text-lg text-sky-300">{s.index}</span>
              <div>
                <h3 className="font-display text-h4 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-white/70">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
