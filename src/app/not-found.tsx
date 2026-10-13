import Link from "next/link";
import { serviceNav } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-navy-900 text-white">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="shell relative z-[2] grid gap-12 py-32 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-sky-300">Error 404</p>
          <p
            aria-hidden
            className="mt-6 font-display text-[clamp(7rem,22vw,18rem)] leading-[0.8] font-bold tracking-[-0.06em] text-transparent"
            style={{ fontStretch: "125%", WebkitTextStroke: "1.5px rgb(139 205 241 / 0.6)" }}
          >
            404
          </p>
          <h1 className="mt-8 text-h2">This page isn&apos;t on the plans.</h1>
          <p className="mt-5 max-w-lg text-lede text-white/70">
            The page may have moved when we rebuilt our website. These links will get you back on site.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/" variant="sky">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact/" variant="outline" className="text-white">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Popular pages" className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-sky-300">Services</p>
          <ul className="mt-5 grid gap-3">
            {serviceNav.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="link-line text-white/80 hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
