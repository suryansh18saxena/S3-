"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, setupGsap } from "@/lib/motion";

/**
 * Pointer layer for mouse and trackpad users, driven by event delegation so any
 * server-rendered markup can opt in with attributes:
 *   data-cursor="View"   a labelled disc replaces the cursor over this element
 *                        (everywhere else the native cursor is kept)
 *   data-magnetic        element leans towards the pointer, springs back on leave
 *   data-tilt            card tilts in 3D under the pointer
 *   data-spotlight       card gets a glow that follows the pointer (--mx / --my)
 * Touch input, reduced motion and coarse pointers keep the native cursor and
 * static elements (spotlight still works, since it is not motion).
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
    setupGsap();
    const root = document.documentElement;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const motion = !prefersReducedMotion();

    if (motion) root.classList.add("has-cursor");
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let state = "";
    const setState = (next: string, text = "") => {
      if (next === state && label.textContent === text) return;
      state = next;
      ring.dataset.state = next;
      label.textContent = text;
    };

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    const release = (el: HTMLElement | null) => {
      if (!el) return;
      gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
      const inner = el.querySelector("[data-magnetic-inner]");
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
    };
    const untilt = (el: HTMLElement | null) => {
      if (el) gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const t = e.target as Element | null;
      if (!t?.closest) return;

      // Spotlight works with or without motion.
      const spot = t.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (!motion) return;

      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled && state !== "label") gsap.set(ring, { x: e.clientX, y: e.clientY }); // appear in place
      ringX(e.clientX);
      ringY(e.clientY);
      if (labelled) setState("label", labelled.dataset.cursor);
      else setState("");

      // Magnetic pull.
      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) {
        release(magnet);
        magnet = m;
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2 - Number(gsap.getProperty(magnet, "x"));
        const cy = r.top + r.height / 2 - Number(gsap.getProperty(magnet, "y"));
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        gsap.to(magnet, { x: dx * 0.28, y: dy * 0.36, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        const inner = magnet.querySelector("[data-magnetic-inner]");
        if (inner) gsap.to(inner, { x: dx * 0.14, y: dy * 0.18, duration: 0.6, ease: "power3.out", overwrite: "auto" });
      }

      // 3D tilt.
      const tl = t.closest<HTMLElement>("[data-tilt]");
      if (tl !== tilt) {
        untilt(tilt);
        tilt = tl;
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(tilt, {
          rotationY: px * 9,
          rotationX: -py * 7,
          transformPerspective: 1100,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    };

    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return; // still inside the document
      setState("hidden");
      release(magnet);
      untilt(tilt);
      magnet = tilt = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden>
        <span className="cursor-disc">
          <span ref={labelRef} className="cursor-label" />
        </span>
      </div>
    </>
  );
}
