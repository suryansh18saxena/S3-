"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, setupGsap } from "@/lib/motion";
import { ArrowUpRight } from "@/components/ui/Icons";

type Item = { index: string; title: string; summary: string; href: string; points: string[] };

/**
 * Editorial index of disciplines. On desktop a preview image follows the
 * cursor and cross-fades between rows; on touch screens each row shows its
 * own image inline.
 */
export function ExpertiseList({ items, previews }: { items: Item[]; previews: ReactNode[] }) {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setupGsap();
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !hasFinePointer()) return;
    const reduce = prefersReducedMotion();
    const qx = gsap.quickTo(float, "x", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    const qy = gsap.quickTo(float, "y", { duration: reduce ? 0 : 0.7, ease: "power3.out" });
    // The card leans into the direction of travel, then settles.
    const qr = gsap.quickTo(float, "rotation", { duration: 0.8, ease: "power3.out" });
    let lastX = 0;
    let settle: gsap.core.Tween | null = null;
    const onMove = (e: PointerEvent) => {
      qx(e.clientX + 28);
      qy(e.clientY - float.offsetHeight / 2);
      if (reduce) return;
      qr(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.7));
      lastX = e.clientX;
      settle?.kill();
      settle = gsap.delayedCall(0.12, () => qr(0));
    };
    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="group/list border-t border-navy-900/15"
        onPointerLeave={() => setActive(null)}
      >
        {items.map((item, i) => (
          <li key={item.title} className="border-b border-navy-900/15" data-reveal>
            <Link
              href={item.href}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-[3rem_1fr_auto] items-start gap-x-4 gap-y-4 py-7 transition-opacity duration-500 md:grid-cols-[4.5rem_1fr_auto] md:py-9 lg:grid-cols-[5rem_minmax(0,1.15fr)_minmax(0,1fr)_3rem] lg:items-center lg:gap-x-8 ${
                active !== null && active !== i ? "lg:opacity-35" : "opacity-100"
              }`}
            >
              <span className="numeral pt-2 text-sm text-blue-600 lg:pt-0">{item.index}</span>
              <span className="ink-fill font-display text-[clamp(1.55rem,1.1rem+1.9vw,3.1rem)] leading-[1.02] font-semibold tracking-[-0.035em] transition-[translate,background-position] duration-700 ease-out-expo lg:group-hover:translate-x-3">
                {item.title}
              </span>
              <span className="col-span-2 col-start-2 text-slate-600 md:col-span-1 md:col-start-2 lg:col-start-3 lg:row-start-1">
                <span className="mb-4 block overflow-hidden rounded-2xl lg:hidden" aria-hidden>
                  <span className="media-frame block aspect-[16/10]">{previews[i]}</span>
                </span>
                {item.summary}
                <span className="mt-4 flex flex-wrap gap-2">
                  {item.points.map((p) => (
                    <span key={p} className="rounded-full bg-navy-900/5 px-3 py-1 text-[0.75rem] font-medium text-slate-600">
                      {p}
                    </span>
                  ))}
                </span>
              </span>
              <span
                aria-hidden
                className="col-start-3 row-start-1 grid size-11 place-items-center rounded-full border border-navy-900/15 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-navy-900 group-hover:text-white lg:col-start-4"
              >
                <ArrowUpRight size={17} />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (desktop). */}
      <div
        ref={floatRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-40 hidden aspect-[4/5] w-[19rem] overflow-hidden rounded-[1.4rem] shadow-[0_30px_80px_-30px_rgb(4_15_26/0.55)] transition-[opacity,scale] duration-500 ease-out-expo lg:block xl:w-[22rem] ${
          active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {previews.map((p, i) => (
          <div
            key={i}
            className={`media-frame absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
              active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
