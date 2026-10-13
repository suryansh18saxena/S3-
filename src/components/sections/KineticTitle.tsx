import type { CSSProperties } from "react";
import { stripAccent } from "@/lib/accent";

/**
 * A headline that assembles character by character from first paint (pure CSS,
 * see .chars-* in globals.css). Words in *asterisks* take the serif accent.
 * Screen readers get the plain sentence once.
 */
export function KineticTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  let c = 0;
  const segments = text.split(/(\*[^*]+\*)/).filter(Boolean);
  return (
    <>
      <span className="sr-only">{stripAccent(text)}</span>
      <span aria-hidden style={{ "--d": `${delay}s` } as CSSProperties}>
        {segments.map((seg, si) => {
          const accent = seg.startsWith("*") && seg.endsWith("*");
          const words = (accent ? seg.slice(1, -1) : seg).split(/\s+/).filter(Boolean);
          const lead = !accent && /^\s/.test(seg) && si > 0 ? " " : "";
          const trail = /\s$/.test(seg) ? " " : "";
          return (
            <span key={si}>
              {lead}
              {words.map((word, wi) => (
                <span key={wi}>
                  <span className={`chars-word ${accent ? "accent" : ""}`}>
                    {[...word].map((ch, i) => (
                      <span key={i} className="chars-char" style={{ "--c": c++ } as CSSProperties}>
                        {ch}
                      </span>
                    ))}
                  </span>
                  {wi < words.length - 1 ? " " : ""}
                </span>
              ))}
              {trail}
            </span>
          );
        })}
      </span>
    </>
  );
}
