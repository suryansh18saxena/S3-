import { testimonials } from "@/content/testimonials";
import { SectionHeading } from "@/components/sections/SectionHeading";

/**
 * Renders only verified, client-approved testimonials (see
 * src/content/testimonials.ts). With none on file, the section is omitted
 * rather than filled with placeholder praise.
 */
export function Testimonials() {
  if (!testimonials.length) return null;
  const [lead, ...rest] = testimonials;
  return (
    <section className="section-y bg-stone-50" aria-labelledby="voices-title">
      <div className="shell">
        <SectionHeading id="voices-title" label="Client voices" title="In their words." />
        <figure className="mt-16 max-w-5xl" data-reveal>
          <blockquote className="font-display text-[clamp(1.7rem,1.1rem+2.2vw,3.2rem)] leading-[1.12] font-medium tracking-[-0.025em] text-ink">
            “{lead.quote}”
          </blockquote>
          <figcaption className="mt-8 text-slate-600">
            <span className="font-semibold text-ink">{lead.name}</span> — {lead.project}, {lead.city}
            {lead.sourceUrl && (
              <>
                {" · "}
                <a href={lead.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-line text-blue-600">
                  Original review
                </a>
              </>
            )}
          </figcaption>
        </figure>
        {rest.length > 0 && (
          <ul className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {rest.map((t) => (
              <li key={t.name + t.quote.slice(0, 12)} data-reveal-item className="border-t border-navy-900/12 pt-6">
                <blockquote className="text-lg leading-relaxed text-slate-700">“{t.quote}”</blockquote>
                <p className="mt-5 text-sm text-slate-500">
                  <span className="font-semibold text-ink">{t.name}</span> — {t.project}, {t.city}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
