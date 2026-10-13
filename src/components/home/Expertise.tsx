import { expertise } from "@/content/services";
import { Picture } from "@/components/ui/Picture";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ExpertiseList } from "./ExpertiseList";

export function Expertise() {
  return (
    <section className="section-y bg-paper" aria-labelledby="expertise-title">
      <div className="shell">
        <SectionHeading
          id="expertise-title"
          index="03"
          label="Expertise"
          title="Seven disciplines. *One accountable team.*"
          lede="Every stage of your project is handled in-house — so design intent survives engineering, and engineering survives the site."
          align="split"
        />
        <div className="mt-16 md:mt-20">
          <ExpertiseList
            items={expertise.map(({ index, title, summary, href, points }) => ({ index, title, summary, href, points }))}
            previews={expertise.map((e) => (
              <Picture
                key={e.image}
                name={e.image}
                alt=""
                sizes="(min-width: 1024px) 22rem, 92vw"
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            ))}
          />
        </div>
        <div className="mt-12 flex justify-end" data-reveal>
          <ButtonLink href="/services/" variant="outline">
            All services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
