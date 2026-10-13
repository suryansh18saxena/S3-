"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Headline whose letters swell — heavier and wider, via Archivo's variable
 * weight and width axes — as the pointer passes near them. Explicit lines keep
 * the wrap stable while glyph widths change. Static for touch / reduced motion.
 */
export function ProximityHeading({ lines, id, className = "" }: { lines: string[]; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-pc]"));
    const area = el.closest("section") ?? el;
    const level = chars.map(() => 0);
    let px = -1e4;
    let py = -1e4;
    let raf = 0;

    const tick = () => {
      raf = 0;
      const radius = Math.max(180, el.offsetWidth * 0.28);
      // Read every position first, then write — one layout per frame.
      const rects = chars.map((c) => c.getBoundingClientRect());
      let moving = false;
      rects.forEach((r, i) => {
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const target = Math.max(0, 1 - d / radius) ** 1.5;
        level[i] += (target - level[i]) * 0.18;
        if (Math.abs(target - level[i]) > 0.003) moving = true;
      });
      chars.forEach((c, i) => {
        const v = level[i];
        c.style.fontVariationSettings = v < 0.004 ? "" : `"wght" ${Math.round(600 + 300 * v)}, "wdth" ${Math.round(100 + 25 * v)}`;
      });
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      kick();
    };
    const onLeave = () => {
      px = py = -1e4;
      kick();
    };
    area.addEventListener("pointermove", onMove as EventListener);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("pointermove", onMove as EventListener);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h2 ref={ref} id={id} className={className} data-reveal>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden>
        {lines.map((line) => (
          <span key={line} className="block lg:whitespace-nowrap">
            {line.split(" ").map((word, w) => (
              <span key={w}>
                {w > 0 && " "}
                <span className="whitespace-nowrap">
                  {[...word].map((ch, i) => (
                    <span key={i} data-pc>
                      {ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </h2>
  );
}
