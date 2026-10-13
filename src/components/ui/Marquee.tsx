import type { MediaKey } from "@/content/media";
import { Picture } from "./Picture";

export type MarqueeItem =
  | { text: string; style?: "solid" | "outline" | "serif" }
  | { image: MediaKey };

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="marquee-star" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * Oversized kinetic type band. Decorative (aria-hidden): it repeats words that
 * appear as real headings elsewhere. MotionProvider drives the drift and the
 * scroll-velocity surge; reduced motion shows a single static row.
 */
export function Marquee({
  items,
  speed = 38,
  reverse = false,
  className = "",
}: {
  items: MarqueeItem[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const group = (copy: boolean) => (
    <div className="marquee-group" aria-hidden={copy || undefined}>
      {items.map((item, i) =>
        "image" in item ? (
          <span key={i} className="marquee-pill">
            <Picture name={item.image} alt="" sizes="11rem" className="block h-full w-full" imgClassName="h-full w-full object-cover" />
          </span>
        ) : (
          <span key={i} className="flex items-center">
            <span className={`marquee-word ${item.style === "outline" ? "is-outline" : item.style === "serif" ? "is-serif" : ""}`}>
              {item.text}
            </span>
            <Sparkle />
          </span>
        ),
      )}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`} data-marquee data-speed={speed} data-reverse={reverse} aria-hidden>
      <div className="marquee">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
