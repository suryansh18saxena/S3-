import { site, whatsappLink } from "@/content/site";
import { Picture } from "@/components/ui/Picture";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Phone, WhatsApp } from "@/components/ui/Icons";
import { ProximityHeading } from "./ProximityHeading";

/** Closing invitation — a different register from the sections before it. */
export function Finale() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white" aria-labelledby="finale-title">
      <div className="absolute inset-0 -z-10">
        <div data-parallax="0.18" className="absolute -inset-y-[12%] inset-x-0">
          <Picture
            name="arch-house-dusk"
            alt=""
            sizes="100vw"
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover"
            position="50% 60%"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(4_15_26/0.94)_0%,rgb(4_15_26/0.8)_45%,rgb(4_15_26/0.3)_100%)]" />
        <div className="blueprint absolute inset-0 opacity-50" />
        {/* Warm window light leaking into the frame. */}
        <div className="absolute -right-40 bottom-0 size-[46rem] bg-[radial-gradient(closest-side,rgb(255_178_102/0.18),transparent)]" />
      </div>

      <div className="shell grid min-h-[92svh] items-center py-28 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="eyebrow flex items-center gap-4 text-sky-300" data-reveal="fade">
            <span aria-hidden className="h-px w-10 bg-current opacity-60" />
            Start your project
          </p>
          <ProximityHeading
            id="finale-title"
            lines={["Have a plot?", "Let's draw", "the first line."]}
            className="mt-7 font-display text-[clamp(3rem,1.2rem+5.6vw,7.6rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
          />
          {/* The first line, drawn. */}
          <svg viewBox="0 0 640 46" className="mt-5 w-[min(38rem,86%)] text-sky-400" fill="none" aria-hidden focusable="false" data-reveal="draw">
            <path
              d="M3 33C92 12 170 9 252 24s152 20 232 4 120-14 150-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
            />
            <circle cx="634" cy="26" r="4.5" stroke="currentColor" strokeWidth="2" pathLength={1} />
          </svg>
          <p data-reveal data-reveal-delay="0.15" className="mt-8 max-w-xl text-lede text-white/75">
            Tell us about your site, budget and ideas. We&apos;ll come back with a clear plan, a realistic timeline and an
            honest estimate — from the people who will actually build it.
          </p>
          <div data-reveal data-reveal-delay="0.25" className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact/" variant="sky">
              Book a consultation
            </ButtonLink>
            <ButtonLink
              href={whatsappLink("Hello S3 Infrastructure, I'd like to discuss a new project.")}
              variant="outline"
              icon={<WhatsApp size={16} />}
              className="text-white"
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.phones[0].href} variant="outline" icon={<Phone size={16} />} className="text-white">
              {site.phones[0].display}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
