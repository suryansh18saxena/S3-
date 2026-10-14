import { expertise } from "@/content/services";
import { Picture } from "@/components/ui/Picture";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ExpertiseDrum } from "./ExpertiseDrum";
import { ExpertiseList } from "./ExpertiseList";

export function Expertise() {
  const items = expertise.map(({ index, title, summary, href, points }) => ({ index, title, summary, href, points }));
  // Short names fit on the drum; the panel beside it shows the full title.
  const short = ["Architecture", "Interiors", "Turnkey construction", "Structural engineering", "Renovation", "Planning & approvals", "Construction management"];
  const previews = (sizes: string) =>
    expertise.map((e) => (
      <Picture key={e.image} name={e.image} alt="" sizes={sizes} className="block h-full w-full" imgClassName="h-full w-full object-cover" />
    ));
  return (
    <section className="relative bg-paper" aria-labelledby="expertise-title">
      <div className="blueprint-light pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative pt-[var(--section-y)]">
        <SectionHeading
          id="expertise-title"
          index="03"
          label="Expertise"
          title="Seven disciplines. *One accountable team.*"
          lede="Every stage of your project is handled in-house — so design intent survives engineering, and engineering survives the site."
          align="split"
        />
      </div>
      <div className="relative">
        <ExpertiseDrum
          items={items.map((it, i) => ({ ...it, short: short[i] ?? it.title }))}
          previews={previews("(min-width: 1024px) 44vw, 92vw")}
          fallback={
            <div className="shell mt-16 md:mt-20">
              <ExpertiseList items={items} previews={previews("(min-width: 1024px) 22rem, 92vw")} />
            </div>
          }
        />
      </div>
      <div className="shell relative flex justify-end pt-10 pb-[var(--section-y)]" data-reveal>
        <ButtonLink href="/services/" variant="outline">
          All services
        </ButtonLink>
      </div>
    </section>
  );
}
