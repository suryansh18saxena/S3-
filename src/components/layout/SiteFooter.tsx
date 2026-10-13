import Link from "next/link";
import { legalNav, mapsUrl, primaryNav, serviceNav, site, utilityNav, whatsappLink } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";
import { FooterMotion } from "./FooterMotion";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-navy-950 text-white" aria-labelledby="footer-title">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -top-56 left-1/2 h-[34rem] w-[80rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(22_132_216/0.22),transparent)]" aria-hidden />

      <div className="shell relative z-[2] pt-20 md:pt-28" data-footer-content>
        <h2 id="footer-title" className="sr-only">
          {site.name} — contact and site links
        </h2>

        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo onDark sizes="150px" className="w-[150px]" />
            <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-white/70">
              Architecture, interior design and turnkey construction — planned, engineered and built by one team in{" "}
              {site.serviceAreas.slice(0, -1).join(", ")} and {site.serviceAreas.at(-1)}.
            </p>
            <Link
              href="/contact/"
              data-magnetic
              className="group mt-8 inline-flex items-center gap-3 font-display text-lg font-semibold tracking-tight"
            >
              <span className="link-line">Book a consultation</span>
              <span className="grid size-9 place-items-center rounded-full bg-sky-400 text-navy-950 transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-5 md:grid-cols-2">
            <div>
              <p className="eyebrow text-sky-300">Explore</p>
              <ul className="mt-5 grid gap-2.5 text-[0.95rem] text-white/75">
                {[{ label: "Home", href: "/" }, ...primaryNav, ...utilityNav].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-sky-300">Services</p>
              <ul className="mt-5 grid gap-2.5 text-[0.95rem] text-white/75">
                {serviceNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-line hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-sky-300">Get in touch</p>
            <ul className="mt-5 grid gap-4 text-[0.95rem] text-white/80">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="group flex items-center gap-3 hover:text-white">
                    <Phone size={16} className="text-sky-300" />
                    <span className="link-line">{p.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white">
                  <WhatsApp size={16} className="text-sky-300" />
                  <span className="link-line">WhatsApp us</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                  <Mail size={16} className="shrink-0 text-sky-300" />
                  <span className="link-line">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white">
                  <MapPin size={16} className="mt-1 shrink-0 text-sky-300" />
                  <address className="not-italic leading-relaxed">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-7 pb-8 text-[0.8rem] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-center">
            Photography marked as representative is licensed from Unsplash and illustrates building types — it does not depict S3 projects.
          </p>
          <ul className="flex items-center gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#main"
                data-magnetic
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 py-1.5 pr-1.5 pl-4 text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                <span className="roll">
                  <span>Back to top</span>
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-white/10 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} className="-rotate-45" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Architectural sign-off: outlined wordmark spanning the full width. The
          viewBox keeps a margin around the text so stroked glyph edges never clip. */}
      <div aria-hidden className="relative z-[2] mx-auto w-full max-w-[120rem] select-none px-[clamp(0.75rem,2.2vw,2.5rem)] pt-4" data-footer-mark>
        <svg viewBox="-6 -4 1012 108" className="block w-full overflow-visible" focusable="false">
          <defs>
            <linearGradient id="footer-mark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(139 205 241)" stopOpacity="0.16" />
              <stop offset="1" stopColor="rgb(139 205 241)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="86"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-mark-fill)"
            stroke="rgb(139 205 241 / 0.5)"
            strokeWidth="0.8"
            className="font-display"
            fontSize="104"
            fontWeight="700"
            style={{ fontStretch: "125%" }}
          >
            S3 INFRASTRUCTURE
          </text>
        </svg>
      </div>

      <div className="relative z-[2] border-t border-white/10">
        <p className="shell flex flex-wrap items-center justify-center gap-x-1.5 py-5 text-center text-[0.8rem] text-white/55">
          Made with{" "}
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          by
          <a
            href="https://labs.theangaarbatch.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line font-semibold text-white/85 hover:text-white"
          >
            The Angaar Labs
          </a>
        </p>
      </div>
      <FooterMotion />
    </footer>
  );
}
