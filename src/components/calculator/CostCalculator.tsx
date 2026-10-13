"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { type AddOnId, type TurnkeyPackage, calculator, packages, pricing } from "@/content/packages";
import { site, whatsappLink } from "@/content/site";
import { formatINR, formatLakhCrore, formatNumber } from "@/lib/format";
import { ArrowUpRight, Mail, Minus, WhatsApp } from "@/components/ui/Icons";

type AddOnValues = Record<AddOnId, number>;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Tween the displayed total so changes read as a smooth recalculation. */
function AnimatedAmount({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = last.current;
    last.current = value;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || from === value) {
      el.textContent = formatINR(value);
      return;
    }
    const start = performance.now();
    const duration = 600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      el.textContent = formatINR(from + (value - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span ref={ref}>{formatINR(value)}</span>;
}

export function CostCalculator({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [pkgId, setPkgId] = useState<TurnkeyPackage["id"]>("gold");
  const [areaInput, setAreaInput] = useState(String(calculator.area.default));
  const [addOns, setAddOns] = useState<AddOnValues>(
    () => Object.fromEntries(calculator.addOns.map((a) => [a.id, 0])) as AddOnValues,
  );

  const pkg = packages.find((p) => p.id === pkgId)!;
  const areaNum = Number(areaInput.replace(/,/g, ""));
  const areaValid = Number.isFinite(areaNum) && areaNum >= calculator.area.min && areaNum <= calculator.area.max;
  const area = areaValid ? areaNum : 0;

  const lines = useMemo(() => {
    const base = { label: `${pkg.name} package · ${formatNumber(area)} ${pricing.unit} × ${formatINR(pkg.rate)}`, amount: pkg.rate * area };
    const extras = calculator.addOns
      .filter((a) => addOns[a.id] > 0)
      .map((a) => ({
        label: `${a.label} · ${formatNumber(addOns[a.id])} ${a.unit} × ${formatINR(a.rate)}`,
        amount: addOns[a.id] * a.rate,
      }));
    return [base, ...extras];
  }, [pkg, area, addOns]);

  const total = lines.reduce((sum, l) => sum + l.amount, 0);

  const summaryText = [
    `Construction estimate request — ${site.name}`,
    `Package: ${pkg.name} (${formatINR(pkg.rate)}/${pricing.unit})`,
    `Built-up area: ${formatNumber(area)} ${pricing.unit}`,
    ...calculator.addOns.filter((a) => addOns[a.id] > 0).map((a) => `${a.label}: ${formatNumber(addOns[a.id])} ${a.unit}`),
    `Indicative total from the website calculator: ${formatINR(total)}`,
    "Please share a detailed estimate.",
  ].join("\n");

  const setAddOn = (id: AddOnId, v: number) => {
    const def = calculator.addOns.find((a) => a.id === id)!;
    setAddOns((prev) => ({ ...prev, [id]: clamp(Number.isFinite(v) ? v : 0, def.min, def.max) }));
  };

  return (
    <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-12 lg:gap-10"}`}>
      <div className={`grid gap-10 ${compact ? "" : "lg:col-span-7"}`}>
        {/* 1. Package */}
        <fieldset>
          <legend className="eyebrow text-blue-600">1 · Choose a package</legend>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {packages.map((p) => {
              const checked = p.id === pkgId;
              return (
                <label
                  key={p.id}
                  className={`relative cursor-pointer rounded-2xl p-4 ring-1 transition-[background-color,box-shadow,color] duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue-500 ${
                    checked ? "bg-navy-900 text-white ring-navy-900" : "bg-white ring-navy-900/10 hover:ring-navy-900/30"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${uid}-package`}
                    value={p.id}
                    checked={checked}
                    onChange={() => setPkgId(p.id)}
                    className="sr-only"
                  />
                  <span className="block font-display text-lg font-semibold">{p.name}</span>
                  <span className={`numeral mt-1 block text-[1.05rem] ${checked ? "text-sky-300" : "text-blue-600"}`}>
                    {formatINR(p.rate)}
                  </span>
                  <span className={`block text-[0.75rem] ${checked ? "text-white/60" : "text-slate-500"}`}>per {pricing.unit}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* 2. Area */}
        <div>
          <label htmlFor={`${uid}-area`} className="eyebrow text-blue-600">
            2 · Built-up area ({pricing.unit})
          </label>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
            <input
              id={`${uid}-area`}
              inputMode="numeric"
              value={areaInput}
              onChange={(e) => setAreaInput(e.target.value.replace(/[^\d,]/g, ""))}
              onBlur={() => areaValid && setAreaInput(String(areaNum))}
              aria-invalid={!areaValid}
              aria-describedby={`${uid}-area-hint`}
              className="w-full rounded-2xl border-0 bg-white px-5 py-4 font-display text-2xl font-semibold tracking-tight ring-1 ring-navy-900/10 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-48"
            />
            <input
              type="range"
              aria-label="Built-up area slider"
              min={calculator.area.min}
              max={6000}
              step={calculator.area.step}
              value={clamp(area || calculator.area.min, calculator.area.min, 6000)}
              onChange={(e) => setAreaInput(e.target.value)}
              className="h-2 w-full cursor-pointer accent-blue-600"
            />
          </div>
          <p id={`${uid}-area-hint`} className={`mt-3 text-sm ${areaValid ? "text-slate-500" : "text-red-700"}`}>
            {areaValid
              ? `Enter between ${formatNumber(calculator.area.min)} and ${formatNumber(calculator.area.max)} ${pricing.unit}.`
              : `Please enter an area between ${formatNumber(calculator.area.min)} and ${formatNumber(calculator.area.max)} ${pricing.unit}.`}
          </p>
        </div>

        {/* 3. Optional extras */}
        <fieldset>
          <legend className="eyebrow text-blue-600">3 · Optional extras</legend>
          <ul className="mt-5 grid gap-3">
            {calculator.addOns.map((a) => {
              const id = `${uid}-${a.id}`;
              return (
                <li key={a.id} className="grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-navy-900/8 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
                  <div>
                    <label htmlFor={id} className="font-display font-semibold">
                      {a.label}
                    </label>
                    <p id={`${id}-hint`} className="mt-1 text-[0.85rem] leading-relaxed text-slate-500">
                      {a.hint} <span className="whitespace-nowrap">({formatINR(a.rate)} per {a.unit.replace(/s$/, "")})</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAddOn(a.id, addOns[a.id] - a.step)}
                      className="grid size-10 place-items-center rounded-full ring-1 ring-navy-900/15 hover:bg-navy-900/5"
                      aria-label={`Decrease ${a.label}`}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      id={id}
                      inputMode="numeric"
                      value={addOns[a.id]}
                      onChange={(e) => setAddOn(a.id, Number(e.target.value.replace(/\D/g, "")))}
                      aria-describedby={`${id}-hint`}
                      className="w-24 rounded-xl border-0 bg-paper px-3 py-2.5 text-center font-display font-semibold ring-1 ring-navy-900/10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setAddOn(a.id, addOns[a.id] + a.step)}
                      className="grid size-10 place-items-center rounded-full ring-1 ring-navy-900/15 hover:bg-navy-900/5"
                      aria-label={`Increase ${a.label}`}
                    >
                      <span aria-hidden className="text-lg leading-none">+</span>
                    </button>
                    <span className="w-16 text-[0.8rem] text-slate-500">{a.unit}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>

      {/* Summary */}
      <aside className={compact ? "" : "lg:col-span-5"} aria-label="Estimate summary">
        <div className="grain relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-900 p-7 text-white md:p-9 lg:sticky lg:top-28">
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative z-[2]">
            <p className="eyebrow text-sky-300">Indicative estimate</p>
            <p className="mt-5 numeral text-[clamp(2.4rem,1.8rem+2.6vw,3.8rem)] leading-none text-white" aria-live="polite" aria-atomic="true">
              <AnimatedAmount value={total} />
            </p>
            <p className="mt-2 text-white/60">{total > 0 ? `≈ ${formatLakhCrore(total)}` : "Enter a valid area to calculate"}</p>

            <ul className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-[0.88rem]">
              {lines.map((l) => (
                <li key={l.label} className="flex items-start justify-between gap-6">
                  <span className="text-white/70">{l.label}</span>
                  <span className="shrink-0 font-semibold tabular-nums">{formatINR(l.amount)}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-2xl bg-white/6 p-4 text-[0.8rem] leading-relaxed text-white/65 ring-1 ring-white/10">
              {calculator.disclaimer} Rates as published {pricing.publishedLabel}.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href={whatsappLink(summaryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-full bg-sky-400 py-2 pr-2 pl-6 font-display text-sm font-semibold tracking-[0.1em] text-navy-950 uppercase transition-colors hover:bg-white"
              >
                Get a detailed estimate
                <span className="grid size-10 place-items-center rounded-full bg-navy-950 text-sky-300">
                  <WhatsApp size={17} />
                </span>
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Construction estimate request")}&body=${encodeURIComponent(summaryText)}`}
                className="flex items-center justify-between rounded-full py-2 pr-2 pl-6 text-sm font-semibold ring-1 ring-white/25 transition-colors hover:bg-white/8"
              >
                Email this estimate to S3
                <span className="grid size-10 place-items-center rounded-full bg-white/10">
                  <Mail size={17} />
                </span>
              </a>
              <Link href="/contact/" className="group mt-1 inline-flex items-center gap-2 text-sm text-sky-300">
                <span className="link-line">Or book a site consultation</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
