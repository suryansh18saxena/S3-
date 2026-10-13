"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

let registered = false;

/** Register GSAP plugins once, on the client only. */
export function setupGsap() {
  if (registered || typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
  return gsap;
}

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fine pointer + hover: desktop-class input where pointer parallax makes sense. */
export function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Milliseconds until the first-visit loading screen lifts (0 if it isn't showing). */
export function loaderDelay() {
  if (typeof window === "undefined") return 0;
  const root = document.documentElement;
  if (!root.classList.contains("show-loader") || root.classList.contains("loader-done")) return 0;
  const end = (window as Window & { __s3LoaderEnd?: number }).__s3LoaderEnd ?? 0;
  return Math.max(0, end - performance.now());
}

export { gsap, ScrollTrigger, SplitText };
