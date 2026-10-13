import { stages } from "@/content/process";
import { ProcessSequence } from "./ProcessSequence";

export function Process() {
  return (
    <section className="grain relative bg-navy-900 text-white" aria-labelledby="process-title">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="shell relative z-[2] pt-[var(--section-y)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-4 text-sky-300" data-reveal="fade">
              <span className="numeral text-[0.8rem] tracking-normal">04</span>
              <span aria-hidden className="h-px w-10 bg-current opacity-50" />
              From concept to reality
            </p>
            <h2 id="process-title" data-reveal="lines" className="mt-6 max-w-[16ch] text-h2">
              From the first sketch to <em className="accent text-sky-300">the keys in your hand.</em>
            </h2>
          </div>
          <p data-reveal data-reveal-delay="0.15" className="text-lede text-white/70 lg:col-span-5 lg:pb-2">
            Six clear stages, one team throughout. Scroll to watch a home take shape — from site analysis to handover.
          </p>
        </div>
      </div>
      <div className="relative z-[2]">
        <ProcessSequence stages={stages} />
      </div>
    </section>
  );
}
