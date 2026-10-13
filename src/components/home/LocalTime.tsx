"use client";

import { useEffect, useState } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date());

/** Live studio time in Chennai (IST). Renders a placeholder on the server. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span className={className} title="Local time in Chennai">
      <span className="sr-only">Local time in Chennai: </span>
      {time ?? "--:--"} IST
    </span>
  );
}
