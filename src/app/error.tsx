"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

/** Route-level error boundary: keeps the shell and offers a way forward. */
export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] items-center bg-paper pt-[var(--header-h)]">
      <div className="shell max-w-3xl py-24">
        <p className="eyebrow text-blue-600">Something went wrong</p>
        <h1 className="mt-5 text-h2">We couldn&apos;t load this part of the page.</h1>
        <p className="mt-5 text-lede text-slate-600">
          Please try again. If the problem continues, call us on{" "}
          <a href={site.phones[0].href} className="font-semibold text-blue-600 underline">
            {site.phones[0].display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 rounded-full bg-navy-900 px-7 py-4 font-display text-sm font-semibold tracking-[0.12em] text-white uppercase hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
