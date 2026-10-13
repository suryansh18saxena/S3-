import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CostCalculator } from "@/components/calculator/CostCalculator";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata = pageMeta({
  title: "Construction Cost Calculator — Indicative House Construction Estimate",
  description:
    "Estimate your house construction cost in Chennai with S3 Infrastructure's published Silver, Gold, Diamond and Platinum package rates, plus parking, sump, compound wall and solar.",
  path: "/construction-cost-calculator/",
});

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Cost calculator"
        title="What will your home *cost to build?*"
        lede="Pick a package, enter your built-up area and add the extras you need. You'll get an indicative figure in seconds — and a detailed quote after a site assessment."
        crumbs={[
          { name: "Turnkey Construction", path: "/turnkey-construction/" },
          { name: "Cost Calculator", path: "/construction-cost-calculator/" },
        ]}
      >
        <ButtonLink href="/turnkey-construction/#packages" variant="outline">
          Compare package specifications
        </ButtonLink>
      </PageHero>
      <section className="pb-[var(--section-y)] bg-paper" aria-label="Calculator">
        <div className="shell">
          <CostCalculator />
        </div>
      </section>
      <CtaBand title="Want a *precise number?*" body="Share your plot details and drawings — we'll prepare a detailed, itemised estimate for your project." />
    </>
  );
}
