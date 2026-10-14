"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ScrollTrigger, getLenis, gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";
import s from "./drum.module.css";

type Item = { index: string; title: string; short: string; summary: string; href: string; points: string[] };

const STEP = 19; // degrees between faces — keep in sync with --step in drum.module.css

/**
 * The disciplines printed on a 3D drum that turns as you scroll (or when you
 * pick a title). The discipline facing you drives the panel: photograph wipe,
 * counter, summary and link. Reduced motion / no JavaScript get `fallback`.
 */
export function ExpertiseDrum({ items, previews, fallback }: { items: Item[]; previews: ReactNode[]; fallback: ReactNode }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const faces = useRef<(HTMLButtonElement | null)[]>([]);
  const current = useRef(0);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    setupGsap();
    const state = { p: 0 };
    const render = () => {
      const rot = state.p * (n - 1) * STEP;
      if (drum.current) drum.current.style.transform = `rotateX(${rot}deg)`;
      faces.current.forEach((f, i) => {
        if (!f) return;
        const rel = Math.abs(rot - i * STEP);
        f.style.opacity = String(Math.max(0.07, 1 - rel / (STEP * 2.7)));
      });
      const next = Math.round(state.p * (n - 1));
      if (next !== current.current) {
        current.current = next;
        setActive(next);
      }
    };
    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
    }, el);
    render();

    // Warm every photograph before the drum can reach it: lazy images that
    // only start loading when they become the active one show up blank at
    // scroll speed. Load and decode all of them as the section approaches.
    const warm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        warm.disconnect();
        el.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
          img.loading = "eager";
          img.decode?.().catch(() => {});
        });
      },
      { rootMargin: "150% 0px" },
    );
    warm.observe(el);

    return () => {
      warm.disconnect();
      ctx.revert();
    };
  }, [n]);

  // Turn the drum to a discipline by scrolling to its point on the track.
  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (i / (n - 1)) * (el.offsetHeight - window.innerHeight);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
    ScrollTrigger.update();
  };

  return (
    <>
      <div ref={track} className={s.track} style={{ "--n": n } as CSSProperties}>
        <div className={s.stage}>
          <div className={s.drumWrap} role="group" aria-label="Disciplines">
            <div ref={drum} className={s.drum}>
              {items.map((item, i) => (
                <button
                  key={item.title}
                  ref={(b) => {
                    faces.current[i] = b;
                  }}
                  type="button"
                  className={s.face}
                  style={{ "--i": i } as CSSProperties}
                  data-active={i === active}
                  aria-pressed={i === active}
                  onClick={() => goTo(i)}
                >
                  <span className={s.faceIdx}>{item.index}</span>
                  <span className={s.faceTitle}>{item.short}</span>
                  <span className="sr-only"> — {item.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.panel}>
            <div className={s.counter}>
              <p className={s.count} aria-hidden>
                <span className={s.countNow}>
                  <span style={{ translate: `0 ${-active * 0.8}em` }}>
                    {items.map((item) => (
                      <span key={item.index} style={{ display: "block", height: "0.8em" }}>
                        {item.index}
                      </span>
                    ))}
                  </span>
                </span>
                <span className={s.countOf}>/ {String(n).padStart(2, "0")}</span>
              </p>
              <span className={s.rail} aria-hidden>
                {items.map((item, i) => (
                  <span key={item.index} data-on={i === active} />
                ))}
              </span>
            </div>

            <div className={s.frame}>
              {previews.map((p, i) => (
                <div key={i} className={s.shot} data-state={i === active ? "active" : i < active ? "before" : "after"} aria-hidden>
                  {p}
                </div>
              ))}
              <span className={s.tag}>Representative</span>
            </div>

            <div className={s.copies}>
              {items.map((item, i) => (
                <div key={item.title} className={s.copy} data-active={i === active} inert={i !== active}>
                  <h3 className="font-display text-h4 font-semibold tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-2 text-[1.04rem] leading-relaxed">{item.summary}</p>
                  <div className={s.chips}>
                    {item.points.map((pt) => (
                      <span key={pt}>{pt}</span>
                    ))}
                  </div>
                  <Link href={item.href} className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    <span className="link-line">Explore {item.title}</span>
                    <ArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <p className={s.hint} aria-hidden>
            Scroll to turn the drum — or pick a discipline
          </p>
        </div>
      </div>
      <div className={s.fallback}>{fallback}</div>
    </>
  );
}
