import { site } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";

/** Kinetic interlude between the studio intro and the building types. */
export function DisciplinesBand() {
  return (
    <section aria-label="Disciplines and service areas" className="relative overflow-hidden bg-paper pb-[clamp(4rem,8vw,8rem)] text-navy-900">
      <div className="border-y border-navy-900/10 py-6 md:py-8">
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
      <div className="py-4 text-blue-600 md:py-6">
        <Marquee
          reverse
          speed={30}
          className="[&_.marquee-word]:text-[clamp(1.6rem,1rem+2.6vw,3.4rem)] [&_.marquee-star]:w-[clamp(0.9rem,0.7rem+0.8vw,1.5rem)]"
          items={[...site.serviceAreas, "Design", "Engineering", "Construction"].map((text, i) => ({
            text,
            style: i % 2 ? ("outline" as const) : ("serif" as const),
          }))}
        />
      </div>
    </section>
  );
}
