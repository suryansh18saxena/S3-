import type { CSSProperties } from "react";
import { mapsUrl, site, whatsappLink } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Steps } from "@/components/sections/Blocks";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { ArrowUpRight, Mail, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

export const metadata = pageMeta({
  title: "Contact Us — Book a Consultation",
  description:
    "Call, WhatsApp or email S3 Infrastructure, or visit our office in Kodungaiyur, Chennai, to discuss architecture, interiors, construction or renovation.",
  path: "/contact/",
});

const next = [
  { title: "We get in touch", body: "A member of the team calls you back to understand your plot, plans and budget." },
  { title: "Consultation", body: "We discuss your goals and timeline — and visit the site when your project needs it." },
  { title: "Plan & estimate", body: "You receive a clear plan, a realistic schedule and an estimate in writing." },
];

export default function ContactPage() {
  const channels = [
    {
      icon: <Phone size={20} />,
      label: "Call",
      value: site.phones.map((p) => p.display).join(" · "),
      href: site.phones[0].href,
      note: "Speak to the team",
    },
    {
      icon: <WhatsApp size={20} />,
      label: "WhatsApp",
      value: site.phones.find((p) => p.whatsapp)?.display ?? site.phones[0].display,
      href: whatsappLink("Hello S3 Infrastructure, I'd like to discuss a project."),
      note: "Share photos, plans and site details",
      external: true,
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      note: "For drawings and documents",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+3.5rem)] pb-[var(--section-y)] md:pt-[calc(var(--header-h)+5rem)]">
        <div className="blueprint-light pointer-events-none absolute inset-x-0 top-0 h-[34rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="shell relative">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact/" }]} />
          <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="enter eyebrow flex items-center gap-4 text-blue-600">
                <span aria-hidden className="h-px w-10 bg-current opacity-50" />
                Contact
              </p>
              <h1 className="enter-wipe mt-6 max-w-[12ch] text-h1" style={{ "--d": "0.08s" } as CSSProperties}>
                Let&apos;s talk about your project.
              </h1>
              <p className="enter mt-7 max-w-md text-lede text-slate-600" style={{ "--d": "0.25s" } as CSSProperties}>
                Tell us about your plot, your plans or the space you want to change. The people who answer are the people
                who design and build.
              </p>

              <ul className="mt-12 grid gap-3" data-reveal="stagger">
                {channels.map((c) => (
                  <li key={c.label} data-reveal-item>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-5 rounded-[var(--radius-card)] bg-white p-5 ring-1 ring-navy-900/8 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgb(4_15_26/0.45)]"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy-900 text-sky-300">{c.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="eyebrow block text-[0.62rem] text-slate-500">{c.label}</span>
                        <span className="mt-1 block truncate font-display text-lg font-semibold tracking-tight">{c.value}</span>
                        <span className="block text-sm text-slate-500">{c.note}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-blue-600 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group grain relative mt-3 block overflow-hidden rounded-[var(--radius-card)] bg-navy-900 p-6 text-white"
              >
                <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
                <span className="relative z-[2] flex items-start gap-4">
                  <MapPin size={22} className="mt-1 shrink-0 text-sky-300" />
                  <span>
                    <span className="eyebrow block text-[0.62rem] text-sky-300">Office</span>
                    <address className="mt-2 not-italic leading-relaxed text-white/85">
                      {site.address.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                      <span className="block">{site.address.region}</span>
                    </address>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                      <span className="link-line">Open in Google Maps</span>
                      <ArrowUpRight size={15} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
                    </span>
                  </span>
                </span>
              </a>
            </div>

            <div className="enter lg:col-span-7" style={{ "--d": "0.3s" } as CSSProperties}>
              <h2 className="sr-only">Send an enquiry</h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-stone-50" aria-labelledby="next-title">
        <div className="shell">
          <p className="eyebrow text-blue-600">After you get in touch</p>
          <h2 id="next-title" data-reveal="lines" className="mt-5 max-w-[18ch] text-h2">
            What happens next.
          </h2>
          <div className="mt-14">
            <Steps steps={next} />
          </div>
        </div>
      </section>
    </>
  );
}
