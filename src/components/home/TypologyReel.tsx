"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ScrollTrigger, getLenis, gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";
import s from "./reel.module.css";

type Slide = { index: string; name: string; line: string; body: string; media: ReactNode };

/**
 * "What we build" as a cinematic reel: every building type fills the screen in
 * turn — the next photograph wipes up over the last as you scroll, and its
 * name rises in. A clickable index jumps between them.
 */
export function TypologyReel({ slides, label }: { slides: Slide[]; label: string }) {
  const n = slides.length;
  const track = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    setupGsap();
    const state = { p: 0 };
    let last = -1;
    const render = () => {
      const f = state.p * (n - 1);
      els.current.forEach((slide, i) => {
        if (!slide) return;
        const r = i === 0 ? 1 : gsap.utils.clamp(0, 1, f - (i - 1));
        const c = gsap.utils.clamp(0, 1, f - i);
        slide.style.setProperty("--r", r.toFixed(4));
        slide.style.setProperty("--c", c.toFixed(4));
      });
      if (bar.current) bar.current.style.scale = `${state.p} 1`;
      const next = Math.round(f);
      if (next !== last) {
        last = next;
        setActive(next);
      }
    };
    const ctx = gsap.context(() => {
      gsap.to(state, { p: 1, ease: "none", onUpdate: render, scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7 } });
    }, el);
    render();

    // Full-screen photographs: load them all before the reel reaches them.
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

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + (i / (n - 1)) * (el.offsetHeight - window.innerHeight) + 2;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
    ScrollTrigger.update();
  };

  return (
    <div ref={track} className={s.track} style={{ "--n": n } as CSSProperties}>
      <div className={s.stage} role="region" aria-label={label}>
        {slides.map((slide, i) => (
          <article
            key={slide.name}
            ref={(a) => {
              els.current[i] = a;
            }}
            className={s.slide}
            data-active={i === active}
            aria-label={slide.name}
          >
            <div className={s.media}>{slide.media}</div>
            <div className={s.shade} aria-hidden />
            <div className={s.cover} aria-hidden />
            <span className={s.tag}>Representative</span>
            <div className={s.copy}>
              <span className={`${s.idx} eyebrow`} style={{ "--k": 0 } as CSSProperties}>
                {slide.index} / {String(n).padStart(2, "0")}
              </span>
              <h3 className={s.name} style={{ "--k": 1 } as CSSProperties}>
                {slide.name}
              </h3>
              <span className={s.line} style={{ "--k": 2 } as CSSProperties}>
                {slide.line}
              </span>
              <p className={s.body} style={{ "--k": 3 } as CSSProperties}>
                {slide.body}
              </p>
            </div>
          </article>
        ))}

        <nav className={s.rail} aria-label="Building types">
          {slides.map((slide, i) => (
            <button key={slide.name} type="button" className={s.railItem} aria-current={i === active} onClick={() => goTo(i)}>
              {slide.name}
            </button>
          ))}
        </nav>
        <div className={s.meta} aria-hidden>
          <span className={s.count}>
            {slides[active]?.index} <span>/ {String(n).padStart(2, "0")}</span>
          </span>
          <span className={s.bar}>
            <span ref={bar} />
          </span>
          <span className={s.hint}>Scroll</span>
        </div>
      </div>
    </div>
  );
}
