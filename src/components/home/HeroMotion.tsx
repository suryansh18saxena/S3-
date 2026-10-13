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
 * - an X-ray lens that reveals the elevation drawing beneath the photograph,
 * - intro bookkeeping (mask removal, "seen this session" flag).
 * CSS entrances use `backwards` fill, so GSAP can own the final states.
 */
export function HeroMotion({ doneClass, lensOnClass }: { doneClass: string; lensOnClass: string }) {
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
    const hint = q("[data-hero-hint]");

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
        .to([q("[data-hero-card]"), hint], { y: 30, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.02)
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

      // ---- X-ray lens --------------------------------------------------------
      const lens = q("[data-hero-lens]");
      const ring = q("[data-hero-ring]");
      const house = houses[0];
      const lensEnabled = !!(lens && ring && house && cam) && window.matchMedia("(min-width: 1024px)").matches;
      const RING = 150; // half of the ring's CSS size
      let px = 0,
        py = 0,
        x = 0,
        y = 0,
        r = 0,
        target = 0,
        running = false,
        hinted = false;

      const frame = () => {
        x += (px - x) * 0.22;
        y += (py - y) * 0.22;
        r += (target - r) * 0.16;
        if (target === 0 && r < 0.6) {
          r = 0;
          lens!.style.visibility = ring!.style.visibility = "hidden";
          hero.classList.remove(lensOnClass);
          gsap.ticker.remove(frame);
          running = false;
          return;
        }
        // The lens lives inside the camera, so undo the camera's push-in.
        const k = Number(gsap.getProperty(cam!, "scale")) || 1;
        const ox = hero.clientWidth * 0.58;
        const oy = hero.clientHeight * 0.72;
        lens!.style.setProperty("--lx", `${ox + (x - ox) / k}px`);
        lens!.style.setProperty("--ly", `${oy + (y - oy) / k}px`);
        lens!.style.setProperty("--lr", `${r / k}px`);
        ring!.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${r / RING})`;
      };
      const start = () => {
        if (running) return;
        running = true;
        x = px;
        y = py;
        lens!.style.visibility = ring!.style.visibility = "visible";
        hero.classList.add(lensOnClass); // the lens ring is the cursor here
        gsap.ticker.add(frame);
      };

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        for (const m of movers) {
          m.qx(nx * m.x);
          m.qy(ny * m.y);
        }
        if (!lensEnabled) return;
        const hb = hero.getBoundingClientRect();
        px = e.clientX - hb.left;
        py = e.clientY - hb.top;
        // Over the building itself (from the roofline down), not the open sky.
        const b = house!.getBoundingClientRect();
        const over =
          e.clientX > b.left + b.width * 0.03 &&
          e.clientX < b.right - b.width * 0.04 &&
          e.clientY > b.top + b.height * 0.27 &&
          e.clientY < Math.min(b.bottom, hb.bottom) - 8 &&
          !(e.target as Element).closest("a, button");
        target = over ? gsap.utils.clamp(110, 170, window.innerWidth * 0.1) : 0;
        if (over) {
          start();
          if (!hinted && hint) {
            hinted = true;
            gsap.to(hint, { autoAlpha: 0, duration: 0.5, overwrite: "auto" });
          }
        }
      };
      const onLeave = () => {
        movers.forEach((m) => (m.qx(0), m.qy(0)));
        target = 0;
      };
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);
      return () => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
        gsap.ticker.remove(frame);
        hero.classList.remove(lensOnClass);
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
  }, [doneClass, lensOnClass]);

  return <span ref={probe} hidden />;
}
