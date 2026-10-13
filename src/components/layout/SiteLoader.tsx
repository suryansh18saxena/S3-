import type { CSSProperties } from "react";

/**
 * First-visit loading screen: the company name assembles on the drawing board,
 * a drafting rule fills with a 0–100 count, then the sheet lifts away like a
 * curtain. Pure CSS; the boot script in layout.tsx decides whether it shows
 * (once per session, never with reduced motion or without JavaScript) and
 * holds every page entrance until the curtain lifts.
 */
export function SiteLoader() {
  return (
    <div className="site-loader" aria-hidden>
      <div className="blueprint absolute inset-0 opacity-80" />
      <div className="site-loader__glow" />
      <div className="site-loader__inner">
        <p className="site-loader__mark">
          {["S", "3"].map((ch, i) => (
            <span key={ch} className="site-loader__mask">
              <span style={{ "--i": i } as CSSProperties}>{ch}</span>
            </span>
          ))}
        </p>
        <p className="site-loader__word">
          {[..."INFRASTRUCTURE"].map((ch, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
        <span className="site-loader__rule" />
        <p className="site-loader__tag">Designed with intent. Built to endure.</p>
      </div>
      <p className="site-loader__foot">
        <span>Architects · Interior designers · Builders</span>
        <span className="site-loader__count" />
      </p>
    </div>
  );
}
