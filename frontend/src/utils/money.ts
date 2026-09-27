const CURRENCY_SYMBOLS: Record<string, string> = {
  LKR: "Rs",
  USD: "$",
  EUR: "€",
  GBP: "£",
}

/**
 * Formats an integer minor-unit amount (cents) as a display string.
 * e.g. formatMoney(185000, "LKR") → "Rs 1,850.00"
 * Uses en-US grouping separators. Never uses floats for arithmetic.
 */
export function formatMoney(minor: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency
  const negative = minor < 0
  const abs = Math.abs(minor)
  const whole = Math.floor(abs / 100)
  const cents = abs % 100
  const grouped = new Intl.NumberFormat("en-US").format(whole)
  const sign = negative ? "-" : ""
  return `${sign}${symbol} ${grouped}.${String(cents).padStart(2, "0")}`
}

/**
 * Parses a user-typed decimal string (e.g. "18.50") into minor units
 * without floating-point arithmetic.
 */
export function parseMoneyInput(value: string): number {
  const trimmed = value.trim().replace(/,/g, "")
  if (!/^\d*\.?\d{0,2}$/.test(trimmed) || trimmed === "") return 0

  const [wholePart, centsPart = ""] = trimmed.split(".")
  const whole = parseInt(wholePart || "0", 10)
  const cents = parseInt(centsPart.padEnd(2, "0").slice(0, 2), 10)
  return whole * 100 + cents
}
