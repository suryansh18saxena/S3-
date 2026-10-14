"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger, SplitText, gsap, prefersReducedMotion, setLenis, setupGsap } from "@/lib/motion";

/**
 * Site-wide motion system.
 *
 * - Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * - A declarative reveal layer: server-rendered markup opts in with attributes.
 *     data-reveal="up | fade | lines | words | chars | image | stagger | draw"
 *     data-reveal-delay="0.2"
 *     data-parallax="0.12"   (fraction of the element's height to travel)
 *     data-scrub="words"     (word-by-word colour fill tied to scroll)
 *     data-odometer          (digit columns roll into place; see Odometer.tsx)
 *     data-marquee           (endless band that speeds up with scroll velocity)
 *     data-stack             (sticky deck: each [data-stack-item] sinks back as the next one lands)
 * Everything is created inside one gsap.context per route and reverted on change.
 */
export function MotionProvider() {
  const pathname = usePathname();

  // Smooth scrolling (once).
  useEffect(() => {
    setupGsap();
    const root = document.documentElement;
    root.classList.add("motion-ready");
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -96 } });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Reveals, per route.
  useEffect(() => {
    setupGsap();
    const reduced = prefersReducedMotion();
    const scope = document.getElementById("main");
    if (!scope) return;

    // Text splitting is layout-heavy, so it waits until an element nears the viewport.
    const pending = new Map<Element, () => void>();
    const nearObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          nearObserver.unobserve(entry.target);
          const run = pending.get(entry.target);
          pending.delete(entry.target);
          if (run) ctx.add(run);
        }
      },
      { rootMargin: "0px 0px 35% 0px" },
    );
    const whenNear = (el: Element, run: () => void) => {
      pending.set(el, run);
      nearObserver.observe(el);
    };

    const ctx = gsap.context(() => {
      const all = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope);

      if (reduced) {
        gsap.set(all, { autoAlpha: 1 });
        return;
      }

      for (const el of all) {
        const type = el.dataset.reveal || "up";
        const delay = Number(el.dataset.revealDelay || 0);
        const start = el.dataset.revealStart || "top 86%";
        const trigger = { trigger: el, start, once: true };

        switch (type) {
          case "fade":
            gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, delay, ease: "power2.out", scrollTrigger: trigger });
            break;

          case "lines":
          case "words": {
            whenNear(el, () => {
              gsap.set(el, { autoAlpha: 1 });
              SplitText.create(el, {
                type: type === "lines" ? "lines" : "words,lines",
                mask: "lines",
                autoSplit: true,
                linesClass: "split-line",
                onSplit(self) {
                  const targets = type === "lines" ? self.lines : self.words;
                  return gsap.from(targets, {
                    yPercent: 115,
                    rotation: type === "lines" ? 2.5 : 4,
                    transformOrigin: "0% 100%",
                    duration: 1.2,
                    stagger: type === "lines" ? 0.1 : 0.035,
                    delay,
                    ease: "expo.out",
                    scrollTrigger: trigger,
                  });
                },
              });
            });
            break;
          }

          case "chars": {
            whenNear(el, () => {
              gsap.set(el, { autoAlpha: 1 });
              SplitText.create(el, {
                type: "words,chars",
                mask: "words",
                autoSplit: true,
                onSplit(self) {
                  return gsap.from(self.chars, {
                    yPercent: 120,
                    rotation: 10,
                    transformOrigin: "0% 100%",
                    duration: 1.1,
                    stagger: 0.016,
                    delay,
                    ease: "expo.out",
                    scrollTrigger: trigger,
                  });
                },
              });
            });
            break;
          }

          case "image": {
            const inner = el.querySelector("img, video, [data-reveal-inner]");
            const tl = gsap.timeline({ delay, scrollTrigger: trigger });
            tl.fromTo(
              el,
              { autoAlpha: 1, clipPath: "inset(18% 12% 18% 12% round var(--radius-panel))" },
              { clipPath: "inset(0% 0% 0% 0% round var(--radius-panel))", duration: 1.5, ease: "expo.inOut" },
            );
            if (inner) tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
            break;
          }

          case "stagger": {
            gsap.set(el, { autoAlpha: 1 });
            const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
            gsap.fromTo(
              items,
              { autoAlpha: 0, y: 36 },
              { autoAlpha: 1, y: 0, duration: 1.1, delay, stagger: 0.08, scrollTrigger: trigger },
            );
            break;
          }

          case "draw": {
            gsap.set(el, { autoAlpha: 1 });
            const paths = el.querySelectorAll("path, line, polyline, rect, circle");
            gsap.fromTo(
              paths,
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.8, delay, stagger: 0.03, ease: "power2.inOut", scrollTrigger: trigger },
            );
            break;
          }

          default:
            gsap.fromTo(el, { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 1.15, delay, scrollTrigger: trigger });
        }
      }

      // Word-by-word scroll scrub for editorial statements. Words start in a
      // mid-grey that already meets WCAG AA for large text (3.5:1 on paper).
      for (const el of gsap.utils.toArray<HTMLElement>("[data-scrub='words']", scope)) {
        whenNear(el, () => {
          SplitText.create(el, {
            type: "words",
            autoSplit: true,
            onSplit(self) {
              // Each word fills to its own colour, so accented words keep theirs.
              const finals = self.words.map((w) => getComputedStyle(w).color);
              return gsap.fromTo(
                self.words,
                { color: "#7a8694" },
                {
                  color: (i: number) => finals[i],
                  ease: "none",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
                },
              );
            },
          });
        });
      }

      // Odometers: each digit column spins up from zero.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-odometer]", scope)) {
        const cols = el.querySelectorAll<HTMLElement>("[data-digit]");
        gsap.set(cols, { y: 0, yPercent: 0 });
        gsap.to(cols, {
          yPercent: (i) => -(10 + Number(cols[i].dataset.digit)) * 5,
          duration: 2.2,
          stagger: 0.12,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      }

      // Marquees: a constant drift that surges and leans with scroll velocity.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-marquee]", scope)) {
        const band = el.firstElementChild as HTMLElement | null;
        if (!band) continue;
        const reverse = el.dataset.reverse === "true";
        const drift = gsap.fromTo(
          band,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: Number(el.dataset.speed || 38), ease: "none", repeat: -1 },
        );
        const lean = gsap.quickTo(band, "skewX", { duration: 0.5, ease: "power3.out" });
        let settle: gsap.core.Tween | null = null;
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? drift.play() : drift.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity();
            gsap.to(drift, { timeScale: 1 + Math.min(Math.abs(v) / 260, 6), duration: 0.2, overwrite: true });
            gsap.to(drift, { timeScale: 1, duration: 1.4, delay: 0.25, ease: "power2.out" });
            lean(gsap.utils.clamp(-9, 9, v / -220));
            settle?.kill();
            settle = gsap.delayedCall(0.18, () => lean(0));
          },
        });
      }

      // Stacked decks (sticky cards from md up): the card beneath dims as the next lands.
      if (window.matchMedia("(min-width: 768px)").matches) {
        for (const deck of gsap.utils.toArray<HTMLElement>("[data-stack]", scope)) {
          const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]", deck);
          items.forEach((item, i) => {
            const next = items[i + 1];
            const card = item.firstElementChild as HTMLElement | null;
            if (!next || !card) return;
            const dim = card.querySelector("[data-stack-dim]");
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              // From the moment the next card reaches this card's lower edge until it lands.
              scrollTrigger: {
                trigger: next,
                start: () => `top ${(parseFloat(getComputedStyle(item).top) || 0) + card.offsetHeight}px`,
                end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            // Cards keep their width (so the deck stays aligned); covered ones dim.
            if (dim) tl.to(dim, { opacity: 0.32 }, 0);
          });
        }
      }

      // Parallax.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]", scope)) {
        const amount = Number(el.dataset.parallax || 0.1) * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    }, scope);

    // Layout can shift once web fonts and lazy images settle. Sorting first puts
    // every trigger in page order, so ones created here (before the sections'
    // own pins exist) are measured after the pin spacing above them.
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("load", refresh);
      nearObserver.disconnect();
      ctx.revert();
    };
  }, [pathname]);

  // New page: start at the top unless navigating to an anchor.
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
