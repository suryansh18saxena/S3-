"use client";

import { useEffect } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, setupGsap } from "@/lib/motion";

/**
 * Card effects for mouse and trackpad users, by event delegation so server
 * markup can opt in with attributes (the native cursor is never replaced):
 *   data-tilt        card tilts in 3D under the pointer
 *   data-spotlight   card gets a glow that follows the pointer (--mx / --my)
 */
export function PointerEffects() {
  useEffect(() => {
    if (!hasFinePointer()) return;
    setupGsap();
    const motion = !prefersReducedMotion();
    let tilt: HTMLElement | null = null;
    const untilt = (el: HTMLElement | null) => {
      if (el) gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as Element | null;
      if (!t?.closest) return;

      const spot = t.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (!motion) return;

      const next = t.closest<HTMLElement>("[data-tilt]");
      if (next !== tilt) {
        untilt(tilt);
        tilt = next;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tilt, { rotationY: px * 9, rotationX: -py * 7, transformPerspective: 1100, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      }
    };
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      untilt(tilt);
      tilt = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return null;
}
