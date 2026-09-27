import { getPasswordScore, STRENGTH_LEVELS } from "@/utils/password-strength"

type Props = { password: string }

export function PasswordStrengthMeter({ password }: Props) {
  if (!password) return null

  const level = STRENGTH_LEVELS[getPasswordScore(password)]

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`h-1.25 flex-1 rounded-full transition-colors duration-200 ${
              i < level.segments ? level.colorClass : "bg-border"
            }`}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[12.5px] font-medium text-foreground">{level.label}</span>
        <span className="text-[12px] text-muted-foreground">{level.hint}</span>
      </div>
    </div>
  )
}
