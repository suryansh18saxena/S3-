import type { CSSProperties } from "react";

/**
 * A number whose digits roll into place when revealed (MotionProvider animates
 * [data-odometer]). Server-rendered at the final value, so no-JS and reduced
 * motion show the plain number; screen readers get the text value.
 */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span className={`odometer ${className}`} data-odometer>
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odometer-col" data-digit={ch} style={{ "--n": ch } as CSSProperties} aria-hidden>
            {Array.from({ length: 20 }, (_, d) => (
              <span key={d}>{d % 10}</span>
            ))}
          </span>
        ) : (
          <span key={i} aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
