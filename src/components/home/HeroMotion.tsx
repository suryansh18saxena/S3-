"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, loaderDelay, prefersReducedMotion, setupGsap } from "@/lib/motion";
import { setSkyDusk } from "./SkyCanvas";

/**
 * Brings the server-rendered hero to life once hydrated:
 * - scroll: the hero holds while day turns to dusk — copy lifts away, the sky
 *   darkens, stars come out, the windows light up, the camera pushes in and a
 *   second line rises; the next section then slides over a darkening hero,
 * - pointer depth between sky, wordmark and house (fine pointers only),
 * - intro bookkeeping (mask removal, "seen this session" flag).
 * CSS entrances use `backwards` fill, so GSAP can own the final states.
 */
export function HeroMotion({ doneClass }: { doneClass: string }) {
  const probe = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = probe.current?.closest<HTMLElement>("[data-hero-intro]");
    const track = hero?.closest<HTMLElement>("[data-hero-track]");
    if (!hero || !track) return;
    setupGsap();
    const root = document.documentElement;
    const firstVisit = !root.classList.contains("intro-seen");
    try {
      sessionStorage.setItem("s3:intro", "1");
    } catch {}

    const doneTimer = window.setTimeout(() => hero.classList.add(doneClass), loaderDelay() + (firstVisit ? 2300 : 50));
    const q = (sel: string) => hero.querySelector<HTMLElement>(sel);
    const qa = (sel: string) => Array.from(hero.querySelectorAll<HTMLElement>(sel));

    const cam = q("[data-hero-cam]");
    const sky = q("[data-depth='sky']");
    const word = q("[data-depth='word']");
    const houses = qa("[data-depth='house']");

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      // ---- Scroll: first light → lights on --------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      // The WebGL clouds follow the (smoothed) timeline, not the raw scroll.
      tl.eventCallback("onUpdate", () => setSkyDusk(gsap.utils.clamp(0, 1, (tl.progress() - 0.04) / 0.38)));
      const copyLines = qa("[data-hero-intro] h1 [aria-hidden] > span");
      tl.to(q("[data-hero-badge]"), { opacity: 0, duration: 0.08 }, 0)
        .to(q("h1 > span:first-child"), { y: -40, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.02)
        .to(copyLines, { yPercent: -60, opacity: 0, stagger: 0.035, duration: 0.2, ease: "power2.in" }, 0.04)
        .to(q("[data-hero-intro] h1 + div"), { y: -40, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.12)
        .to(q("[data-hero-card]"), { y: 30, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.02)
        .to(cam, { scale: window.innerWidth < 768 ? 1.05 : 1.13, duration: 1 }, 0)
        .to(word, { yPercent: -18, duration: 1 }, 0)
        .to(word, { opacity: 0.55, duration: 0.3 }, 0.15)
        .to(q("[data-hero-dusk-sky]"), { opacity: 1, duration: 0.38 }, 0.04)
        .to(q("[data-hero-stars]"), { opacity: 1, duration: 0.2 }, 0.25)
        .to(q("[data-hero-dusk-house]"), { opacity: 1, duration: 0.3 }, 0.12)
        .fromTo(
          qa("[data-hero-cap]"),
          { y: 0, yPercent: 115 },
          { y: 0, yPercent: 0, stagger: 0.06, duration: 0.16, ease: "power3.out" },
          0.38,
        )
        .to(q("[data-hero-shade]"), { opacity: 0.6, duration: 0.2 }, 0.8);

      // ---- Pointer depth (desktop-class input only) ----------------------
      if (!hasFinePointer()) return;
      const layers = [
        { el: sky, x: -10, y: -6 },
        { el: word, x: 30, y: 16 },
        ...houses.map((el) => ({ el, x: -14, y: -5 })),
      ].filter((l): l is { el: HTMLElement; x: number; y: number } => !!l.el);
      const movers = layers.map((l) => ({
        ...l,
        qx: gsap.quickTo(l.el, "x", { duration: 1.4, ease: "power3.out" }),
        qy: gsap.quickTo(l.el, "y", { duration: 1.4, ease: "power3.out" }),
      }));

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        for (const m of movers) {
          m.qx(nx * m.x);
          m.qy(ny * m.y);
        }
      };
      const onLeave = () => movers.forEach((m) => (m.qx(0), m.qy(0)));
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      return () => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
      };
    }, hero);

    return () => {
      window.clearTimeout(doneTimer);
      ctx.revert();
      setSkyDusk(0);
      // Once the hero has actually left the page (not a dev StrictMode re-run),
      // later visits to the homepage this session get the short entrance.
      window.setTimeout(() => {
        if (!document.querySelector("[data-hero-intro]")) root.classList.add("intro-seen");
      }, 0);
    };
  }, [doneClass]);

  return <span ref={probe} hidden />;
}
