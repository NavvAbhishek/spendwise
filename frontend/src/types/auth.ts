export type UserSettings = {
  currency: string
  timezone: string
  weekStart: "monday" | "sunday"
  theme: "light" | "dark" | "system"
  budgetAlertsEnabled: boolean
  warnAt80: boolean
  weeklySummaryEnabled: boolean
}

export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  onboardingCompleted: boolean
  settings: UserSettings
  createdAt: string
}
