"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { site, whatsappLink } from "@/content/site";
import { expertise } from "@/content/services";
import { packages } from "@/content/packages";
import { Mail, WhatsApp } from "@/components/ui/Icons";

/**
 * Optional form backend. When NEXT_PUBLIC_FORM_ENDPOINT is set (for example a
 * Formspree/Web3Forms/your own endpoint accepting JSON POSTs), enquiries are
 * posted there. Without it, the form hands the message to WhatsApp or the
 * visitor's email app — and says so — instead of pretending to send it.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

type Fields = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string } | { kind: "handoff"; via: "whatsapp" | "email" };

const cities = [...site.serviceAreas, "Other"];
const services = [...expertise.map((e) => e.title), ...packages.map((p) => `${p.name} turnkey package`), "Something else"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!/^(91)?[6-9]\d{9}$/.test(digits)) e.phone = "Please enter a valid 10-digit Indian mobile number.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please check the email address.";
  if (f.message.trim().length < 10) e.message = "A line or two about your project helps us prepare.";
  return e;
}

function compose(f: Fields) {
  const lines = [`New enquiry for ${site.name}`, `Name: ${f.name.trim()}`, `Phone: ${f.phone.trim()}`];
  if (f.email.trim()) lines.push(`Email: ${f.email.trim()}`);
  if (f.city) lines.push(`City: ${f.city}`);
  if (f.service) lines.push(`Interested in: ${f.service}`);
  lines.push("", f.message.trim());
  return lines.join("\n");
}

export function EnquiryForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>({ name: "", phone: "", email: "", city: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof Fields) => (v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const check = () => {
    const e = validate(fields);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  };

  const handoff = (via: "whatsapp" | "email") => {
    if (!check()) return;
    const text = compose(fields);
    const url =
      via === "whatsapp"
        ? whatsappLink(text)
        : `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${fields.name.trim()}`)}&body=${encodeURIComponent(text)}`;
    if (via === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    setStatus({ kind: "handoff", via });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ENDPOINT) return handoff("whatsapp");
    if (!check()) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...fields, source: "s3infrastructure.com" }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setStatus({ kind: "sent" });
    } catch {
      setStatus({ kind: "error", message: "We couldn't send your enquiry. Please use WhatsApp, email or call us instead." });
    }
  };

  const field = "mt-2 w-full rounded-2xl border-0 bg-white px-4 py-3.5 text-[1rem] ring-1 ring-navy-900/12 transition-shadow placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600";
  const label = "text-sm font-semibold text-ink";
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-2 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Fields) => ({
    "aria-invalid": Boolean(errors[k]),
    "aria-describedby": errors[k] ? `${uid}-${k}-error` : undefined,
  });

  if (status.kind === "sent") {
    return (
      <div className="rounded-[var(--radius-panel)] bg-white p-8 ring-1 ring-navy-900/8 md:p-10" role="status">
        <p className="eyebrow text-blue-600">Enquiry received</p>
        <h3 className="mt-4 font-display text-h3 font-semibold">Thank you, {fields.name.split(" ")[0]}.</h3>
        <p className="mt-3 text-slate-600">Your enquiry has been sent to the S3 team. We&apos;ll be in touch on {fields.phone}.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[var(--radius-panel)] bg-white p-6 ring-1 ring-navy-900/8 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={label}>
            Your name <span aria-hidden className="text-blue-600">*</span>
          </label>
          <input id={`${uid}-name`} name="name" autoComplete="name" required value={fields.name} onChange={(e) => set("name")(e.target.value)} className={field} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={label}>
            Mobile number <span aria-hidden className="text-blue-600">*</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="98765 43210" value={fields.phone} onChange={(e) => set("phone")(e.target.value)} className={field} {...a11y("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>
            Email <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" value={fields.email} onChange={(e) => set("email")(e.target.value)} className={field} {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor={`${uid}-city`} className={label}>
            Project location
          </label>
          <select id={`${uid}-city`} name="city" value={fields.city} onChange={(e) => set("city")(e.target.value)} className={field}>
            <option value="">Select a city</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${uid}-service`} className={label}>
            What can we help with?
          </label>
          <select id={`${uid}-service`} name="service" value={fields.service} onChange={(e) => set("service")(e.target.value)} className={field}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${uid}-message`} className={label}>
            About your project <span aria-hidden className="text-blue-600">*</span>
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={5}
            required
            placeholder="Plot size and location, what you'd like to build or change, and your timeline."
            value={fields.message}
            onChange={(e) => set("message")(e.target.value)}
            className={`${field} resize-y`}
            {...a11y("message")}
          />
          {err("message")}
        </div>
      </div>

      {ENDPOINT ? (
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="mt-8 inline-flex min-h-13 items-center rounded-full bg-navy-900 px-8 font-display text-sm font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-blue-600 disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      ) : (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="submit"
              className="flex min-h-14 items-center justify-between gap-3 rounded-full bg-navy-900 py-2 pr-2 pl-6 font-display text-sm font-semibold tracking-[0.1em] text-white uppercase transition-colors hover:bg-blue-600"
            >
              Send via WhatsApp
              <span className="grid size-10 place-items-center rounded-full bg-sky-400 text-navy-950">
                <WhatsApp size={17} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => handoff("email")}
              className="flex min-h-14 items-center justify-between gap-3 rounded-full py-2 pr-2 pl-6 font-display text-sm font-semibold tracking-[0.1em] text-ink uppercase ring-1 ring-navy-900/20 transition-colors hover:bg-navy-900/5"
            >
              Send via email
              <span className="grid size-10 place-items-center rounded-full bg-navy-900/6">
                <Mail size={17} />
              </span>
            </button>
          </div>
          <p className="mt-4 text-[0.85rem] leading-relaxed text-slate-500">
            Your message opens in WhatsApp or your email app with everything filled in — nothing is sent until you press send
            there.
          </p>
        </>
      )}

      <div aria-live="polite" className="mt-4">
        {status.kind === "handoff" && (
          <p className="rounded-2xl bg-ice-100 p-4 text-[0.9rem] text-navy-800">
            {status.via === "whatsapp"
              ? "WhatsApp should now be open with your enquiry ready — press send there to reach us."
              : "Your email app should now be open with your enquiry ready — press send there to reach us."}{" "}
            Nothing opened? Call us on{" "}
            <a href={site.phones[0].href} className="font-semibold underline">
              {site.phones[0].display}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && <p className="rounded-2xl bg-red-50 p-4 text-[0.9rem] text-red-800">{status.message}</p>}
      </div>
    </form>
  );
}
