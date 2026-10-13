"use client";

import { useEffect, useState } from "react";
import { Picture } from "@/components/ui/Picture";
import { loaderDelay, prefersReducedMotion } from "@/lib/motion";

/**
 * The house at blue hour with its windows lit — the end state of the hero's
 * scroll sequence. It is requested only after the entrance has played and the
 * main thread is idle, so it never competes with the hero photograph (LCP).
 */
export function HeroDusk({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return; // the sequence never plays
    const firstVisit = !document.documentElement.classList.contains("intro-seen");
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const timer = window.setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      else setReady(true);
    }, loaderDelay() + (firstVisit ? 2200 : 700));
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return <div className={className} data-hero-dusk-house />;
  return (
    <div className={className} data-hero-dusk-house>
      <Picture
        name="hero-house-dusk"
        placeholder={false}
        sizes="(max-width: 1023px) 128vh, 100vw"
        mobile={{ maxWidth: 1440, sizes: "88vh" }}
        alt=""
      />
    </div>
  );
}
