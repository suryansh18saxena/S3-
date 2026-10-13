import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Typologies } from "@/components/home/Typologies";
import { Expertise } from "@/components/home/Expertise";
import { Process } from "@/components/home/Process";
import { PackagesTeaser } from "@/components/home/PackagesTeaser";
import { WhyS3 } from "@/components/home/WhyS3";
import { Testimonials } from "@/components/home/Testimonials";
import { Finale } from "@/components/home/Finale";
import { DisciplinesBand } from "@/components/home/DisciplinesBand";

export const metadata = pageMeta({
  title: "S3 Infrastructure — Architects, Interior Designers & Builders in Chennai",
  description:
    "S3 Infrastructure designs and builds homes in Chennai, Hosur and Bengaluru: architectural design, interior design, turnkey construction, structural engineering and renovation — one team from first sketch to handover.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <DisciplinesBand />
      <Typologies />
      <Expertise />
      <Process />
      <PackagesTeaser />
      <WhyS3 />
      <Testimonials />
      <Finale />
    </>
  );
}
