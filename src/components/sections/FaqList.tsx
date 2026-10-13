"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/faqs";

/**
 * Accessible accordion. Height animates with a CSS grid-rows transition
 * (0fr → 1fr), so no animation library is needed. Answers stay in the DOM when
 * collapsed (inert), keeping them crawlable and matching the FAQPage data.
 */
export function FaqList({ items, defaultOpen = 0, tone = "light" }: { items: Faq[]; defaultOpen?: number | null; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  const line = tone === "dark" ? "border-white/15" : "border-navy-900/12";
  const answer = tone === "dark" ? "text-white/70" : "text-slate-600";

  return (
    <ul className={`border-t ${line}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;
        return (
          <li key={f.q} className={`border-b ${line}`}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="font-display text-h4 font-semibold">{f.q}</span>
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color,border-color] duration-500 ease-out-expo ${
                    isOpen
                      ? "rotate-45 border-transparent bg-blue-600 text-white"
                      : tone === "dark"
                        ? "border-white/25 group-hover:bg-white/10"
                        : "border-navy-900/15 group-hover:bg-navy-900/5"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className={`max-w-3xl pr-12 pb-7 text-[1.02rem] leading-relaxed ${answer}`}>{f.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
