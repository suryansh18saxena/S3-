"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, serviceNav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Menu, Phone } from "@/components/ui/Icons";
import dynamic from "next/dynamic";

// Motion-powered menu is loaded on demand — most visitors never open it.
const MobileMenu = dynamic(() => import("./MobileMenu").then((m) => m.MobileMenu), { ssr: false });
const prefetchMenu = () => void import("./MobileMenu");

/**
 * Floating glass navigation.
 * - Over the homepage hero it is translucent with light text.
 * - Elsewhere (or once the hero has scrolled away) it becomes a light glass pill.
 * - It tucks away while scrolling down and returns on the slightest scroll up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(isHome);
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const [menuLoaded, setMenuLoaded] = useState(false);
  const lastY = useRef(0);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      setCompact(y > 24);
      // On the homepage the hero holds while it turns to dusk; the header stays
      // dark until the intro panel has actually slid up beneath it.
      const intro = isHome ? document.getElementById("intro") : null;
      setOverHero(isHome && (intro ? intro.getBoundingClientRect().top > 64 : y < vh * 0.82));
      const max = document.documentElement.scrollHeight - vh;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) setHidden(delta > 0 && y > vh * 0.6);
      lastY.current = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isHome]);

  const dark = overHero && !menuOpen;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        data-site-header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-out-expo ${
          hidden && !menuOpen ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div className={`shell transition-[padding] duration-700 ease-out-expo ${compact ? "pt-2.5" : "pt-4 md:pt-5"}`}>
          <div
            className={`relative flex items-center justify-between gap-4 rounded-full py-2 pr-2 pl-4 transition-[background,box-shadow,border-color,color] duration-700 ease-out-expo md:pl-5 ${
              dark ? "glass text-white" : "glass-light text-ink"
            }`}
          >
            {/* Reading progress, drawn along the bottom edge of the pill. */}
            <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden rounded-full">
              <span
                ref={progress}
                className={`block h-full origin-left scale-x-0 ${dark ? "bg-sky-300/80" : "bg-blue-600/70"}`}
              />
            </span>
            <Link href="/" aria-label={`${site.name} — home`} className="shrink-0 rounded-md">
              <Logo onDark={dark} priority className="w-[62px] md:w-[70px]" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((item) =>
                  item.href === "/services/" ? (
                    <li key={item.href} className="group relative">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="eyebrow relative inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-[0.7rem] opacity-90 transition-opacity hover:opacity-100"
                      >
                        <span className="roll">
                          <span>{item.label}</span>
                        </span>
                        <span aria-hidden className="mt-px inline-block size-1 rounded-full bg-current opacity-60" />
                      </Link>
                      <div className="pointer-events-none invisible absolute top-full left-1/2 w-[27rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-500 ease-out-expo group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                        <ul className="glass-light grid gap-1 rounded-[1.4rem] p-2 text-ink">
                          {serviceNav.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                className="flex items-center justify-between gap-6 rounded-2xl px-4 py-3 transition-colors hover:bg-white focus-visible:bg-white"
                              >
                                <span>
                                  <span className="block font-display text-[0.98rem] font-semibold tracking-tight">{s.label}</span>
                                  <span className="block text-[0.8rem] text-slate-500">{s.description}</span>
                                </span>
                                <ArrowUpRight size={16} className="shrink-0 text-blue-600" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="eyebrow relative inline-block rounded-full px-4 py-3 text-[0.7rem] opacity-90 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-px aria-[current=page]:after:bg-current"
                      >
                        <span className="roll">
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.phones[0].href}
                className={`hidden size-11 place-items-center rounded-full transition-colors sm:grid ${
                  dark ? "bg-white/10 hover:bg-white/20" : "bg-navy-900/5 hover:bg-navy-900/10"
                }`}
                aria-label={`Call ${site.phones[0].display}`}
              >
                <Phone size={17} />
              </a>
              <Link
                href="/contact/"
                data-magnetic
                className={`group hidden items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 font-display text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 sm:inline-flex ${
                  dark ? "bg-white text-navy-900 hover:bg-sky-200" : "bg-navy-900 text-white hover:bg-blue-600"
                }`}
                style={{ fontStretch: "108%" }}
              >
                <span className="roll">
                  <span>Start your project</span>
                </span>
                <span
                  className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45 ${
                    dark ? "bg-navy-900 text-white" : "bg-sky-400 text-navy-950"
                  }`}
                  aria-hidden
                >
                  <ArrowUpRight size={15} />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuLoaded(true);
                  setMenuPath(pathname);
                }}
                onPointerEnter={prefetchMenu}
                onTouchStart={prefetchMenu}
                onFocus={prefetchMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={`grid size-11 place-items-center rounded-full lg:hidden ${
                  dark ? "bg-white/12 hover:bg-white/20" : "bg-navy-900 text-white"
                }`}
              >
                <span className="sr-only">Open menu</span>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      {menuLoaded && <MobileMenu open={menuOpen} onClose={() => setMenuPath(null)} />}
    </>
  );
}
