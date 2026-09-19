export const queryKeys = {
  me: ["me"] as const,
  expenses: (filters?: object) => ["expenses", filters] as const,
  dashboard: (period?: string, date?: string) => ["dashboard", period, date] as const,
  categories: ["categories"] as const,
  budgets: (month?: string) => ["budgets", month] as const,
}
