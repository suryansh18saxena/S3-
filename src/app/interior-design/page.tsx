import { interiorsPage as page } from "@/content/services";
import { faqsFor } from "@/content/faqs";
import { pageMeta, serviceJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ChipList, FaqSection, SplitFeature, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JsonLd } from "@/components/ui/JsonLd";
import { Picture } from "@/components/ui/Picture";

export const metadata = pageMeta({ title: page.seo.title, description: page.seo.description, path: page.path });

const steps = [
  { title: "Consultation", body: "We study your space, routines, preferences and budget." },
  { title: "Design in 3D", body: "Layouts, materials, lighting and furniture, visualised before execution." },
  { title: "Execution", body: "Precise measurements and installation by our own team, with trusted brands." },
  { title: "Handover", body: "A final inspection of every finish before you move in." },
];

export default function InteriorDesignPage() {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        crumbs={[{ name: "Services", path: "/services/" }, { name: "Interior Design", path: page.path }]}
        image="interior-living"
        imagePosition="50% 55%"
        caption="Representative photography"
      >
        <ButtonLink href="/contact/">Plan your interiors</ButtonLink>
      </PageHero>

      <section className="section-y bg-paper" aria-labelledby="rooms-title">
        <div className="shell">
          <SectionHeading
            id="rooms-title"
            index="01"
            label="Room by room"
            title="Designed for the way each room is used."
            lede="Every space starts from how you use it daily — movement, storage, light — then gets the materials and detailing to match."
            align="split"
          />
          <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {page.rooms.map((room, i) => (
              <li key={room.title} data-reveal className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
                <div className={`media-frame overflow-hidden rounded-[var(--radius-card)] ${i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                  <Picture
                    name={room.image}
                    sizes={i === 0 ? "(min-width: 1024px) 62vw, 92vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"}
                    className="block h-full w-full"
                    imgClassName="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="numeral text-sm text-blue-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-h4 font-semibold">{room.title}</h3>
                </div>
                <p className="mt-3 max-w-xl text-slate-600">{room.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[0.78rem] text-slate-500">Representative photography.</p>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="specialities-title">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="specialities-title" index="02" label="Specialities" title="The details that *make a home work.*" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <ChipList items={page.specialities} />
            <p className="mt-8 text-lede text-slate-600" data-reveal>
              Using premium materials and trusted brands, we focus on precise measurements and flawless installation — so
              interiors stay beautiful and durable for years.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-paper" aria-label="Residential and commercial interiors">
        <div className="shell grid gap-24 md:gap-32">
          <SplitFeature image="interior-bedroom-warm" eyebrow="Residential" title={page.residential.title}>
            <p>{page.residential.body}</p>
          </SplitFeature>
          <SplitFeature image="interior-office" eyebrow="Commercial" title={page.commercial.title} flip>
            <p>{page.commercial.body}</p>
            <ChipList items={page.commercial.items} />
          </SplitFeature>
        </div>
      </section>

      <section className="grain relative section-y overflow-hidden bg-navy-900 text-white" aria-labelledby="interior-process-title">
        <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="shell relative z-[2]">
          <SectionHeading id="interior-process-title" index="03" label="Process" title="From brief *to finished room.*" tone="dark" />
          <div className="mt-16">
            <Steps steps={steps} tone="dark" />
          </div>
        </div>
      </section>

      <FaqSection items={faqsFor("interiors")} index="04" />
      <CtaBand title="Let's design rooms *you'll love living in.*" whatsappMessage="Hello S3 Infrastructure, I'd like to discuss interior design." />
      <JsonLd data={serviceJsonLd({ name: "Interior design", description: page.seo.description, path: page.path })} />
    </>
  );
}
