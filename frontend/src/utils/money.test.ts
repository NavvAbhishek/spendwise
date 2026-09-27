import { describe, it, expect } from "vitest"
import { formatMoney, parseMoneyInput } from "./money"

describe("formatMoney", () => {
  it("formats LKR", () => {
    expect(formatMoney(185000, "LKR")).toBe("Rs 1,850.00")
  })

  it("formats USD", () => {
    expect(formatMoney(1050, "USD")).toBe("$ 10.50")
  })

  it("formats EUR", () => {
    expect(formatMoney(100, "EUR")).toBe("€ 1.00")
  })

  it("formats GBP", () => {
    expect(formatMoney(99, "GBP")).toBe("£ 0.99")
  })

  it("handles zero", () => {
    expect(formatMoney(0, "LKR")).toBe("Rs 0.00")
  })

  it("handles negative amounts", () => {
    expect(formatMoney(-185000, "LKR")).toBe("-Rs 1,850.00")
  })

  it("adds thousands separators", () => {
    expect(formatMoney(1245000, "LKR")).toBe("Rs 12,450.00")
  })

  it("pads single-digit cents", () => {
    expect(formatMoney(101, "USD")).toBe("$ 1.01")
  })

  it("falls back to currency code when symbol unknown", () => {
    expect(formatMoney(1000, "JPY")).toBe("JPY 10.00")
  })
})

describe("parseMoneyInput", () => {
  it("parses whole number", () => {
    expect(parseMoneyInput("18")).toBe(1800)
  })

  it("parses decimal", () => {
    expect(parseMoneyInput("18.50")).toBe(1850)
  })

  it("parses one decimal digit", () => {
    expect(parseMoneyInput("18.5")).toBe(1850)
  })

  it("parses zero", () => {
    expect(parseMoneyInput("0")).toBe(0)
  })

  it("returns 0 for empty string", () => {
    expect(parseMoneyInput("")).toBe(0)
  })

  it("strips commas", () => {
    expect(parseMoneyInput("1,850.00")).toBe(185000)
  })
})
