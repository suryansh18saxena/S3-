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
  // A pill that slides behind whichever link is hovered or focused.
  const [hl, setHl] = useState({ left: 0, width: 0, show: false });
  const track = (el: HTMLElement) => setHl({ left: el.offsetLeft, width: el.offsetWidth, show: true });

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
  // Off the hero, the bar turns solid white once the page has scrolled.
  const solid = !dark && compact;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        data-site-header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,color] duration-700 ease-out-expo ${
          hidden && !menuOpen ? "-translate-y-[120%]" : "translate-y-0"
        } ${
          solid
            ? "bg-white text-ink shadow-[0_1px_0_rgb(11_41_69/0.06),0_14px_34px_-20px_rgb(4_15_26/0.35)]"
            : dark
              ? "text-white"
              : "text-ink"
        }`}
      >
        {/* Over the hero: a soft dark scrim so the logo and links read on any sky. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-[160%] bg-gradient-to-b from-navy-950/65 via-navy-950/25 to-transparent transition-opacity duration-700 ${
            dark ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Reading progress along the bottom edge of the solid bar. */}
        <span aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden transition-opacity duration-500 ${solid ? "opacity-100" : "opacity-0"}`}>
          <span ref={progress} className="block h-full origin-left scale-x-0 bg-blue-600" />
        </span>
        <div className="shell relative">
          {/* Fixed height and logo size: only the background changes on scroll. */}
          <div className="flex h-[var(--header-h)] items-center justify-between gap-6">
            <Link href="/" aria-label={`${site.name} — home`} className="shrink-0 rounded-md transition-transform duration-500 ease-out-expo hover:scale-[1.04]">
              <Logo onDark={dark} priority sizes="112px" className="w-[96px] md:w-[112px]" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="relative flex items-center gap-1" onPointerLeave={() => setHl((h) => ({ ...h, show: false }))}>
                <span
                  aria-hidden
                  className={`pointer-events-none absolute top-1/2 h-10 -translate-y-1/2 rounded-full transition-[left,width,opacity] duration-500 ease-out-expo ${
                    dark ? "bg-white/15" : "bg-navy-900/[0.07]"
                  }`}
                  style={{ left: hl.left, width: hl.width, opacity: hl.show ? 1 : 0 }}
                />
                {primaryNav.map((item) =>
                  item.href === "/services/" ? (
                    <li
                      key={item.href}
                      className="group relative"
                      onPointerEnter={(e) => track(e.currentTarget)}
                      onFocus={(e) => track(e.currentTarget)}
                    >
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
                        {/* Near-opaque frosted panel: a backdrop-filter can't reach the page from inside the
                            (already blurred) header pill, so legibility comes from the fill itself. */}
                        <ul className="grid gap-1 rounded-[1.4rem] border border-white bg-[linear-gradient(180deg,#ffffff,#f4f9fe)] p-2 text-ink shadow-[0_30px_70px_-24px_rgb(4_15_26/0.55),0_0_0_1px_rgb(11_41_69/0.06),inset_0_1px_0_rgb(255_255_255)]">
                          {serviceNav.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                className="group/item flex items-center justify-between gap-6 rounded-2xl px-4 py-3 transition-colors hover:bg-ice-100 focus-visible:bg-ice-100"
                              >
                                <span>
                                  <span className="block font-display text-[0.98rem] font-semibold tracking-tight text-ink">{s.label}</span>
                                  <span className="block text-[0.8rem] text-slate-600">{s.description}</span>
                                </span>
                                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy-900/5 text-blue-600 transition-[transform,background-color,color] duration-500 ease-out-expo group-hover/item:rotate-45 group-hover/item:bg-blue-600 group-hover/item:text-white">
                                  <ArrowUpRight size={15} />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li key={item.href} className="relative" onPointerEnter={(e) => track(e.currentTarget)} onFocus={(e) => track(e.currentTarget)}>
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
              {/* Phone: opens up to show the number on hover / focus. */}
              <a
                href={site.phones[0].href}
                className={`group/phone hidden h-11 items-center rounded-full px-[0.8rem] transition-colors sm:inline-flex ${
                  dark ? "bg-white/10 hover:bg-white/20" : "bg-navy-900/5 hover:bg-navy-900/10"
                }`}
                aria-label={`Call ${site.phones[0].display}`}
              >
                <Phone size={17} />
                <span
                  aria-hidden
                  className="max-w-0 overflow-hidden text-[0.82rem] font-semibold whitespace-nowrap opacity-0 transition-[max-width,margin,opacity] duration-500 ease-out-expo group-hover/phone:ml-2 group-hover/phone:max-w-[9rem] group-hover/phone:opacity-100 group-focus-visible/phone:ml-2 group-focus-visible/phone:max-w-[9rem] group-focus-visible/phone:opacity-100"
                >
                  {site.phones[0].display}
                </span>
              </a>
              <Link
                href="/contact/"
                className={`nav-shine group relative hidden items-center gap-3 overflow-hidden rounded-full py-1.5 pr-1.5 pl-5 font-display text-[0.72rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 sm:inline-flex ${
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
