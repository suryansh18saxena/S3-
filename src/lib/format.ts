const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹1,899 — Indian digit grouping. */
export function formatINR(value: number) {
  return inr.format(Math.round(value));
}

export function formatNumber(value: number) {
  return num.format(value);
}

/** Compact Indian notation for large totals: ₹42.5 lakh, ₹1.2 crore. */
export function formatLakhCrore(value: number) {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2).replace(/\.?0+$/, "")} crore`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(2).replace(/\.?0+$/, "")} lakh`;
  return formatINR(value);
}
