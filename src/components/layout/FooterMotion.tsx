"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";

/**
 * Footer choreography: the content eases up out of the page above, and the
 * outlined wordmark sketches its glyph outlines like a pen on tracing paper.
 */
export function FooterMotion() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const footer = probe.current?.closest<HTMLElement>("footer");
    if (!footer || prefersReducedMotion()) return;
    setupGsap();
    const ctx = gsap.context(() => {
      const content = footer.querySelector("[data-footer-content]");
      const mark = footer.querySelector<SVGTextElement>("[data-footer-mark] text");
      if (content) {
        gsap.from(content, {
          yPercent: -12,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: { trigger: footer, start: "top bottom", end: "top 35%", scrub: true },
        });
      }
      if (mark) {
        gsap
          .timeline({ scrollTrigger: { trigger: mark, start: "top bottom-=40", once: true } })
          // Dash longer than any glyph outline, then cleared, so no letter is left with a gap.
          .fromTo(mark, { strokeDasharray: 1600, strokeDashoffset: 1600 }, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" })
          .fromTo(mark, { fillOpacity: 0 }, { fillOpacity: 1, duration: 1.4, ease: "power2.out" }, "-=0.9");
      }
    }, footer);
    return () => ctx.revert();
  }, []);

  return <span ref={probe} hidden />;
}
