import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";

type Variant = "dark" | "light" | "sky" | "outline";

const variantClass: Record<Variant, string> = {
  dark: "btn",
  light: "btn btn-light",
  sky: "btn btn-sky",
  outline: "btn btn-outline",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Opens off-site links (tel:, wa.me, mailto:) without client routing. */
  external?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
};

/** Pill button with a rotating arrow disc, and a rolling label — the site's primary CTA shape. */
export function ButtonLink({ href, children, variant = "dark", className = "", external, icon, ariaLabel }: Props) {
  const content = (
    <>
      <span className="roll">
        <span>{children}</span>
      </span>
      {variant === "outline" ? (
        <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          {icon ?? <ArrowUpRight size={16} />}
        </span>
      ) : (
        <span className="btn-dot" aria-hidden>
          {icon ?? <ArrowUpRight size={17} />}
        </span>
      )}
    </>
  );
  const cls = `group ${variantClass[variant]} ${className}`;
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a href={href} className={cls} aria-label={ariaLabel} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
