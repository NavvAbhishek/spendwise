export type StrengthLevel = {
  label: string
  hint: string
  colorClass: string
  segments: number
}

export const STRENGTH_LEVELS: StrengthLevel[] = [
  { label: "Too short", hint: "Use at least 8 characters.",          colorClass: "bg-danger",  segments: 0 },
  { label: "Weak",      hint: "Add a mix of letters and numbers.",    colorClass: "bg-danger",  segments: 1 },
  { label: "Fair",      hint: "Add uppercase letters or symbols.",    colorClass: "bg-warning", segments: 2 },
  { label: "Good",      hint: "Almost there — one more improvement!", colorClass: "bg-success", segments: 3 },
  { label: "Strong",    hint: "Great password!",                      colorClass: "bg-success", segments: 4 },
]

export function getPasswordScore(password: string): number {
  if (!password) return 0
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password) && /\d/.test(password)) score++
  if (/[A-Z]/.test(password) || /[^a-zA-Z0-9]/.test(password)) score++
  return score
}
