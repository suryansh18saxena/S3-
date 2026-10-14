"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { gsap, prefersReducedMotion, setupGsap } from "@/lib/motion";

/* Shared drawing space for both layers. */
const W = 520;
const H = 560;

/** The usual way: separate parties, everyone wired to everyone, you in the middle of it. */
const usual = [
  { label: "Architect", x: 96, y: 120 },
  { label: "Structural engineer", x: 410, y: 96 },
  { label: "Site supervisor", x: 262, y: 222 },
  { label: "Contractor", x: 100, y: 352 },
  { label: "Interior firm", x: 420, y: 330 },
  { label: "You", x: 262, y: 470 },
];

/** The S3 way: every discipline converges on one team, one line to you. */
const roles = ["Architect", "Interior designer", "Structural engineer", "Civil engineer", "Site supervision"];
const hub = { x: 318, y: 290 };
const you = { x: 462, y: 290 };

function tangle() {
  const paths: string[] = [];
  usual.forEach((a, i) =>
    usual.slice(i + 1).forEach((b, j) => {
      // Bowed, crossing curves: alternate the bend so the lines knot together.
      const k = (i + j) % 2 ? 1 : -1;
      const mx = (a.x + b.x) / 2 + k * (60 + ((i * 37 + j * 53) % 70));
      const my = (a.y + b.y) / 2 - k * (40 + ((i * 29 + j * 41) % 60));
      paths.push(`M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}`);
    }),
  );
  return paths;
}
const tangled = tangle();

/**
 * "The usual way vs the S3 way" — a draggable before/after comparison. Drag
 * (or use the arrow keys on the handle) to wipe between a knot of separate
 * firms and S3's single accountable team.
 */
export function TwoWays() {
  const [split, setSplit] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  const fromPointer = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setSplit(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  // A one-time sweep the first time the card scrolls into view, to invite a drag.
  useEffect(() => {
    const el = box.current;
    if (!el || prefersReducedMotion()) return;
    setupGsap();
    const state = { v: 50 };
    let tl: gsap.core.Timeline | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        tl = gsap
          .timeline({ delay: 0.5, onUpdate: () => !touched.current && setSplit(state.v) })
          .to(state, { v: 80, duration: 1, ease: "power3.inOut" })
          .to(state, { v: 22, duration: 1.3, ease: "power3.inOut" })
          .to(state, { v: 50, duration: 0.9, ease: "power3.inOut" });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tl?.kill();
    };
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) fromPointer(e.clientX);
  };
  const onUp = () => {
    dragging.current = false;
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 20 : 5;
    const next = { ArrowLeft: split - step, ArrowRight: split + step, Home: 4, End: 96 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    touched.current = true;
    setSplit(Math.min(96, Math.max(4, next)));
  };

  return (
    <figure className="select-none">
      <div
        ref={box}
        className="relative aspect-[520/560] touch-pan-y overflow-hidden rounded-[var(--radius-panel)] ring-1 ring-navy-900/10"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ cursor: "ew-resize" }}
      >
        {/* Layer 1 — the usual way */}
        <div className="absolute inset-0 bg-stone-100">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden focusable="false">
            <g className="two-ways-tangle" stroke="#77787a" strokeWidth="1.3" strokeDasharray="5 6" opacity="0.75">
              {tangled.map((d, i) => (
                <path key={i} d={d} style={{ animationDelay: `${-i * 0.37}s` }} />
              ))}
            </g>
            {usual.map((n) => (
              <g key={n.label}>
                <circle cx={n.x} cy={n.y} r={n.label === "You" ? 11 : 7} fill={n.label === "You" ? "#c62828" : "#f4f3ef"} stroke="#556373" strokeWidth="1.5" />
                <text x={n.x} y={n.y - 18} textAnchor="middle" className="fill-slate-700 font-sans" fontSize="15" fontWeight={n.label === "You" ? 700 : 500}>
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
          <p className="eyebrow absolute top-5 left-5 rounded-full bg-white/80 px-3 py-1.5 text-red-700 ring-1 ring-red-700/15">The usual way</p>
        </div>

        {/* Layer 2 — the S3 way, revealed from the handle to the right */}
        <div className="absolute inset-0 bg-navy-900 text-white" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          <div className="blueprint absolute inset-0" aria-hidden />
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden focusable="false">
            <g stroke="#52b2e3" strokeWidth="1.4">
              {roles.map((_, i) => {
                const y = 130 + i * 80;
                return <path key={i} d={`M78 ${y}C 200 ${y}, 230 ${hub.y}, ${hub.x - 36} ${hub.y}`} opacity="0.7" />;
              })}
              <path className="two-ways-flow" d={`M${hub.x + 36} ${hub.y}H${you.x - 12}`} strokeWidth="2.6" strokeDasharray="6 8" />
              <circle cx={hub.x} cy={hub.y} r="36" strokeWidth="1.8" fill="#071a2b" />
              <circle cx={hub.x} cy={hub.y} r="54" opacity="0.3" />
              <circle cx={you.x} cy={you.y} r="11" fill="#52b2e3" stroke="none" />
            </g>
            {roles.map((r, i) => (
              <g key={r}>
                <circle cx="70" cy={130 + i * 80} r="6" fill="#071a2b" stroke="#8bcdf1" strokeWidth="1.5" />
                <text x="64" y={112 + i * 80} className="fill-sky-200 font-sans" fontSize="15">
                  {r}
                </text>
              </g>
            ))}
            <text x={hub.x} y={hub.y + 7} textAnchor="middle" className="fill-white font-display" fontSize="21" fontWeight="700" style={{ fontStretch: "125%" }}>
              S3
            </text>
            <text x={you.x} y={you.y - 22} textAnchor="middle" className="fill-white font-display" fontSize="16" fontWeight="700">
              You
            </text>
          </svg>
          <p className="eyebrow absolute top-5 right-5 rounded-full bg-sky-400 px-3 py-1.5 text-navy-950">The S3 way</p>
        </div>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgb(4_15_26/0.15)]" style={{ left: `${split}%` }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Compare the usual way with the S3 way"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            aria-valuetext={split > 50 ? "Showing mostly the usual way" : "Showing mostly the S3 way"}
            onKeyDown={onKey}
            className="pointer-events-auto absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy-900 shadow-[0_12px_30px_-8px_rgb(4_15_26/0.5)] transition-transform duration-300 ease-out-expo hover:scale-110"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
      <figcaption className="mt-5">
        <span className="grid grid-cols-2 gap-5 text-[0.88rem] leading-snug">
          <span className="border-t-2 border-red-700/60 pt-3 text-slate-600">
            <strong className="block font-semibold text-ink">The usual way</strong>
            Separate firms, separate contracts — and you in the middle, coordinating them all.
          </span>
          <span className="border-t-2 border-sky-400 pt-3 text-slate-600">
            <strong className="block font-semibold text-ink">The S3 way</strong>
            One team under one roof — and one line to you.
          </span>
        </span>
        <span className="mt-4 flex items-center gap-3 text-[0.8rem] text-slate-500">
          <span aria-hidden className="h-px w-8 bg-current" />
          Drag the handle to compare
        </span>
      </figcaption>
    </figure>
  );
}
