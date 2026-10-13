import type { CSSProperties, ReactNode } from "react";
import { withAccent } from "@/lib/accent";
import { site, whatsappLink } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Phone, WhatsApp } from "@/components/ui/Icons";

/** Closing invitation used at the end of inner pages. */
export function CtaBand({
  title = "Let's plan your project.",
  body = "Share your plot, budget and ideas — we'll come back with a clear plan, a realistic timeline and an honest estimate.",
  whatsappMessage = "Hello S3 Infrastructure, I'd like to discuss a project.",
}: {
  title?: ReactNode;
  body?: ReactNode;
  whatsappMessage?: string;
}) {
  return (
    <section className="section-y bg-paper">
      <div className="shell">
        <div
          data-spotlight
          className="grain relative overflow-hidden rounded-[var(--radius-panel)] bg-navy-900 px-6 py-14 text-white sm:px-12 md:py-20 lg:px-20"
          style={{ "--spot": "rgb(82 178 227 / 0.22)", "--accent": "var(--color-sky-300)" } as CSSProperties}
        >
          <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
          <div className="pointer-events-none absolute -right-56 -bottom-64 size-[52rem] bg-[radial-gradient(closest-side,rgb(22_132_216/0.3),transparent)]" aria-hidden />
          <div className="relative z-[2] grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-sky-300" data-reveal="fade">
                Start a conversation
              </p>
              <h2 data-reveal="lines" className="mt-5 text-h2 text-white">
                {withAccent(title)}
              </h2>
              <p data-reveal data-reveal-delay="0.15" className="mt-6 max-w-xl text-lede text-white/70">
                {body}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end" data-reveal data-reveal-delay="0.25">
              <ButtonLink href="/contact/" variant="sky">
                Book a consultation
              </ButtonLink>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={whatsappLink(whatsappMessage)} variant="outline" icon={<WhatsApp size={16} />} className="text-white">
                  WhatsApp
                </ButtonLink>
                <ButtonLink href={site.phones[0].href} variant="outline" icon={<Phone size={16} />} className="text-white">
                  {site.phones[0].display}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
