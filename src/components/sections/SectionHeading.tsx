import type { CSSProperties, ReactNode } from "react";
import { withAccent } from "@/lib/accent";

type Props = {
  index?: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "split";
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

/**
 * Editorial section heading: indexed label with a hairline, a large headline
 * revealed line by line (wrap words in *asterisks* for the serif accent), and
 * an optional lede.
 */
export function SectionHeading({ index, label, title, lede, tone = "light", align = "left", as = "h2", className = "", id }: Props) {
  const Tag = as;
  const muted = tone === "dark" ? "text-white/65" : "text-slate-500";
  const labelColor = tone === "dark" ? "text-sky-300" : "text-blue-600";
  return (
    <div className={`${align === "split" ? "grid gap-8 lg:grid-cols-12 lg:items-end" : ""} ${className}`}>
      <div className={align === "split" ? "lg:col-span-7" : ""}>
        <p className={`eyebrow flex items-center gap-4 ${labelColor}`} data-reveal="fade">
          {index && <span className="numeral text-[0.8rem] tracking-normal">{index}</span>}
          <span aria-hidden className="h-px w-10 bg-current opacity-50" />
          {label}
        </p>
        <Tag
          id={id}
          data-reveal="lines"
          className={`mt-6 max-w-[17ch] text-h2 ${tone === "dark" ? "text-white" : "text-ink"}`}
          style={{ "--accent": tone === "dark" ? "var(--color-sky-300)" : "var(--color-blue-700)" } as CSSProperties}
        >
          {withAccent(title)}
        </Tag>
      </div>
      {lede && (
        <p
          data-reveal
          data-reveal-delay="0.15"
          className={`${align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-7"} max-w-xl text-lede ${muted}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
