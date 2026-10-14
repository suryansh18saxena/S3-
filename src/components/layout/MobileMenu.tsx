"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { primaryNav, serviceNav, site, utilityNav, whatsappLink } from "@/content/site";
import { getLenis } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight, Close, Mail, Phone, WhatsApp } from "@/components/ui/Icons";

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-screen navigation for touch and narrow screens. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll lock, Escape to close, focus trap, and focus return.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    getLenis()?.stop();
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      getLenis()?.start();
      previous?.focus?.();
    };
  }, [open, onClose]);

  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.18 + i * 0.05, duration: 0.8, ease } },
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-900 text-white blueprint"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 3rem) 2.6rem)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3rem) 2.6rem)" }}
            transition={{ duration: reduce ? 0.2 : 0.75, ease }}
            data-lenis-prevent
          >
            <div className="shell flex items-center justify-between pt-5 pb-4">
              <Link href="/" onClick={onClose} aria-label={`${site.name} — home`}>
                <Logo onDark sizes="96px" className="w-[96px]" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <span className="sr-only">Close menu</span>
                <Close size={20} />
              </button>
            </div>

            <nav aria-label="Mobile" className="shell flex-1 pt-6">
              <ul className="border-t border-white/12">
                {primaryNav.map((nav, i) => (
                  <m.li key={nav.href} {...item(i)} className="border-b border-white/12">
                    <Link
                      href={nav.href}
                      onClick={onClose}
                      className="flex items-baseline justify-between gap-4 py-4 font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] xs:text-[2.4rem]"
                    >
                      <span>{nav.label}</span>
                      <span className="numeral text-sm text-sky-300">0{i + 1}</span>
                    </Link>
                  </m.li>
                ))}
              </ul>

              <m.div {...item(primaryNav.length)} className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                <p className="eyebrow col-span-full text-sky-300">Services</p>
                {serviceNav.map((s) => (
                  <Link key={s.href} href={s.href} onClick={onClose} className="text-[1.02rem] text-white/80 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                {utilityNav.map((s) => (
                  <Link key={s.href} href={s.href} onClick={onClose} className="text-[1.02rem] text-white/80 hover:text-white">
                    {s.label}
                  </Link>
                ))}
              </m.div>
            </nav>

            <m.div {...item(primaryNav.length + 1)} className="shell grid gap-3 pt-10 pb-8">
              <Link
                href="/contact/"
                onClick={onClose}
                className="flex items-center justify-between rounded-full bg-sky-400 py-2 pr-2 pl-6 font-display text-sm font-semibold tracking-[0.12em] text-navy-950 uppercase"
              >
                Start your project
                <span className="grid size-10 place-items-center rounded-full bg-navy-950 text-sky-300">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <a href={site.phones[0].href} className="flex items-center justify-center gap-2 rounded-full bg-white/8 py-3">
                  <Phone size={16} /> Call
                </a>
                <a
                  href={whatsappLink("Hello S3 Infrastructure, I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-white/8 py-3"
                >
                  <WhatsApp size={16} /> WhatsApp
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center justify-center gap-2 rounded-full bg-white/8 py-3">
                  <Mail size={16} /> Email
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
