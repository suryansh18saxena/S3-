import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";

const areas = [...site.serviceAreas, "Design", "Engineering", "Construction"];

/**
 * Kinetic interlude: two marquee bands crossing like site tape — navy one way,
 * sky blue the other — each surging with scroll speed.
 */
export function DisciplinesBand() {
  return (
    <section aria-label="Disciplines and service areas" className="relative overflow-hidden bg-paper py-[clamp(6rem,11vw,11rem)]">
      <div
        className="relative left-1/2 w-[116vw] -translate-x-1/2 -rotate-[4.5deg] bg-navy-900 py-3 text-white shadow-[0_30px_60px_-30px_rgb(4_15_26/0.6)] md:py-4 [&_.marquee-pill]:w-[clamp(4rem,2.5rem+5vw,8rem)] [&_.marquee-word]:text-[clamp(2.4rem,1.4rem+4vw,6rem)]"
        style={{ "--stroke": "rgb(255 255 255 / 0.85)" } as CSSProperties}
      >
        <Marquee
          items={[
            { text: "Architecture" },
            { image: "typology-villa" },
            { text: "Interiors", style: "serif" },
            { image: "interior-living" },
            { text: "Turnkey construction", style: "outline" },
            { image: "site-frame" },
            { text: "Structural engineering" },
            { image: "studio-sketching" },
            { text: "Renovation", style: "serif" },
          ]}
        />
      </div>
      <div
        className="relative left-1/2 z-[1] -mt-[clamp(4.2rem,7vw,7.6rem)] w-[116vw] -translate-x-1/2 rotate-[4deg] bg-sky-400 py-2 text-navy-950 shadow-[0_20px_50px_-30px_rgb(4_15_26/0.5)] md:py-3"
        style={{ "--stroke": "var(--color-navy-950)" } as CSSProperties}
      >
        <Marquee
          reverse
          speed={30}
          className="[&_.marquee-star]:w-[clamp(0.9rem,0.7rem+0.8vw,1.5rem)] [&_.marquee-star]:text-navy-950 [&_.marquee-word]:text-[clamp(1.5rem,1rem+2.4vw,3.2rem)]"
          items={[...areas, ...areas].map((text, i) => ({
            text,
            style: i % 2 ? ("outline" as const) : ("serif" as const),
          }))}
        />
      </div>
    </section>
  );
}
