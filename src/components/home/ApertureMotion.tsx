"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";

/** Scrubs the aperture's single --a variable (0 → 1) across its scroll track. */
export function ApertureMotion() {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = probe.current?.closest<HTMLElement>("[data-aperture-track]");
    const stage = track?.querySelector<HTMLElement>("[data-aperture-stage]");
    if (!track || !stage || prefersReducedMotion()) return;
    setupGsap();
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .fromTo(stage, { "--a": 0 }, { "--a": 1, duration: 0.78, ease: "power2.inOut" }, 0.06)
        .to({}, { duration: 0.16 }); // hold on the open view
    }, track);
    return () => ctx.revert();
  }, []);

  return <span ref={probe} hidden />;
}
