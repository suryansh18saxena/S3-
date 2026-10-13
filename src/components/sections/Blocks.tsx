import type { ReactNode } from "react";
import { withAccent } from "@/lib/accent";
import type { MediaKey } from "@/content/media";
import type { Faq } from "@/content/faqs";
import { Picture } from "@/components/ui/Picture";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { FaqList } from "./FaqList";
import { SectionHeading } from "./SectionHeading";

/** Image beside text; `flip` puts the image on the right. */
export function SplitFeature({
  image,
  imageAlt,
  eyebrow,
  title,
  children,
  flip = false,
  caption = "Representative photography",
  aspect = "aspect-[4/5]",
}: {
  image: MediaKey;
  imageAlt?: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  flip?: boolean;
  caption?: string | null;
  aspect?: string;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <figure className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
        <div data-reveal="image" className={`media-frame ${aspect} rounded-[var(--radius-panel)]`}>
          <div data-parallax="0.1" className="absolute -inset-y-[7%] inset-x-0">
            <Picture name={image} alt={imageAlt} sizes="(min-width: 1024px) 46vw, 92vw" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
          </div>
        </div>
        {caption && <figcaption className="mt-3 text-[0.78rem] text-slate-500">{caption}</figcaption>}
      </figure>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
        <p className="eyebrow text-blue-600" data-reveal="fade">
          {eyebrow}
        </p>
        <h3 data-reveal="lines" className="mt-5 text-h3 font-semibold">
          {withAccent(title)}
        </h3>
        <div data-reveal data-reveal-delay="0.1" className="mt-6 grid gap-4 text-[1.04rem] leading-relaxed text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Indexed grid of short features separated by hairlines. */
export function FeatureGrid({
  items,
  columns = 3,
  tone = "light",
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark";
}) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const line = tone === "dark" ? "border-white/15" : "border-navy-900/12";
  return (
    <ol className={`grid gap-x-10 ${cols}`} data-reveal="stagger">
      {items.map((it, i) => (
        <li key={it.title} data-reveal-item className={`group relative border-t ${line} pt-6 pb-10`}>
          <span
            aria-hidden
            className={`absolute -top-px left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100 ${tone === "dark" ? "bg-sky-300" : "bg-blue-600"}`}
          />
          <span className={`numeral inline-block text-sm transition-transform duration-700 ease-out-expo group-hover:translate-x-2 ${tone === "dark" ? "text-sky-300" : "text-blue-600"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={`mt-4 font-display text-h4 font-semibold ${tone === "dark" ? "text-white" : ""}`}>{it.title}</h3>
          <p className={`mt-3 ${tone === "dark" ? "text-white/70" : "text-slate-600"}`}>{it.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Horizontal step sequence with a connecting rule. */
export function Steps({ steps, tone = "light" }: { steps: { title: string; body: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className={`grid gap-8 md:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`} data-reveal="stagger">
      {steps.map((s, i) => (
        <li key={s.title} data-reveal-item className="group relative">
          <div className="flex items-center gap-4">
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-full border numeral text-sm transition-[background-color,color,transform] duration-500 ease-out-expo group-hover:scale-110 ${
                dark
                  ? "border-sky-300/40 text-sky-300 group-hover:bg-sky-300 group-hover:text-navy-950"
                  : "border-blue-600/30 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && <span aria-hidden className={`hidden h-px flex-1 lg:block ${dark ? "bg-white/15" : "bg-navy-900/12"}`} />}
          </div>
          <h3 className={`mt-6 font-display text-h4 font-semibold ${dark ? "text-white" : ""}`}>{s.title}</h3>
          <p className={`mt-3 ${dark ? "text-white/70" : "text-slate-600"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Two-column pill list. */
export function ChipList({ items, tone = "light" }: { items: readonly string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="flex flex-wrap gap-2.5" data-reveal="stagger">
      {items.map((t) => (
        <li
          key={t}
          data-reveal-item
          className={`rounded-full px-4 py-2 text-[0.92rem] font-medium ${tone === "dark" ? "bg-white/8 text-white/85 ring-1 ring-white/12" : "bg-white text-slate-700 ring-1 ring-navy-900/8"}`}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** FAQ block with matching FAQPage structured data. */
export function FaqSection({ items, title = "Questions, answered.", index }: { items: Faq[]; title?: string; index?: string }) {
  return (
    <section className="section-y bg-paper" aria-labelledby="faq-title">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" index={index} label="FAQ" title={title} />
        </div>
        <div className="lg:col-span-8" data-reveal>
          <FaqList items={items} />
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
