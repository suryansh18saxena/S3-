import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Breadcrumbs } from "./Breadcrumbs";

/** Long-form legal layout with readable measure and contact block. */
export function LegalPage({ title, path, intro, children }: { title: string; path: string; intro: ReactNode; children: ReactNode }) {
  return (
    <article className="bg-paper pt-[calc(var(--header-h)+3.5rem)] pb-[var(--section-y)] md:pt-[calc(var(--header-h)+5rem)]">
      <div className="shell">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="mt-10 max-w-[14ch] text-h1">{title}</h1>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-lede text-slate-600">{intro}</p>
            <div className="legal mt-12 grid gap-10 text-[1.02rem] leading-relaxed text-slate-700 [&_h2]:font-display [&_h2]:text-h4 [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:grid [&_ul]:gap-1.5">
              {children}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-navy-900/8">
              <p className="eyebrow text-blue-600">Questions?</p>
              <p className="mt-4 font-display text-lg font-semibold">{site.name}</p>
              <ul className="mt-3 grid gap-1.5 text-[0.95rem] text-slate-600">
                {site.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="link-line">
                      {p.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${site.email}`} className="link-line break-all">
                    {site.email}
                  </a>
                </li>
              </ul>
              <address className="mt-4 text-[0.9rem] leading-relaxed text-slate-500 not-italic">
                {site.address.lines.join(", ")}, {site.address.region}
              </address>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
