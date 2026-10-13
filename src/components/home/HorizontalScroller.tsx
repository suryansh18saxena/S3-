"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger, gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";

/**
 * Pinned horizontal gallery on desktop (scroll moves the track sideways);
 * a native swipe carousel with scroll-snap everywhere else.
 */
export function HorizontalScroller({ children, label }: { children: ReactNode; label: string }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setupGsap();
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, tr.scrollWidth - tr.clientWidth);
      const cards = Array.from(tr.children);
      let settle: gsap.core.Tween | null = null;
      gsap.to(cards, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
            // Cards lean with the speed of travel, like frames on a moving reel.
            const skew = gsap.utils.clamp(-7, 7, self.getVelocity() / -260);
            gsap.to(cards, { skewX: skew, duration: 0.35, ease: "power3.out", overwrite: "auto" });
            settle?.kill();
            settle = gsap.delayedCall(0.15, () => gsap.to(cards, { skewX: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" }));
          },
        },
      });
      // Gentle counter-parallax on each card's image.
      gsap.utils.toArray<HTMLElement>("[data-card-media]", tr).forEach((m) => {
        gsap.fromTo(m, { xPercent: 6 }, {
          xPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        });
      });
    });

    // Native scroller progress (touch / small screens / reduced motion).
    const onScroll = () => {
      const max = tr.scrollWidth - tr.clientWidth;
      if (bar.current && max > 0) bar.current.style.transform = `scaleX(${tr.scrollLeft / max})`;
    };
    tr.addEventListener("scroll", onScroll, { passive: true });
    if (prefersReducedMotion()) onScroll();
    ScrollTrigger.refresh();

    return () => {
      tr.removeEventListener("scroll", onScroll);
      mm.revert();
    };
  }, []);

  return (
    <div ref={section} className="relative flex min-h-svh flex-col justify-center py-10 lg:py-0">
      <div
        ref={track}
        role="region"
        aria-label={label}
        data-cursor="Scroll"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-6 [scrollbar-width:none] lg:snap-none lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="shell mt-6 flex items-center gap-5">
        <span className="relative h-px flex-1 overflow-hidden bg-white/15">
          <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-sky-400" />
        </span>
        <span className="eyebrow text-[0.62rem] text-white/50">Scroll</span>
      </div>
    </div>
  );
}
