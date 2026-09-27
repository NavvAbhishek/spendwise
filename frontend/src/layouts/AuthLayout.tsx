import { Coins } from "lucide-react"

type AuthLayoutProps = {
  children: React.ReactNode
  legalLine?: React.ReactNode
}

export function AuthLayout({ children, legalLine }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Logo + wordmark */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Coins className="text-primary-foreground" size={20} />
        </div>
        <span className="text-xl font-semibold tracking-tight text-foreground">Spendwise</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-card border border-border rounded-2xl p-7 shadow-sm">
        {children}
      </div>

      {/* Legal / footer link */}
      {legalLine && (
        <p className="mt-5 text-center text-[12.5px] text-muted-foreground max-w-[360px]">
          {legalLine}
        </p>
      )}
    </div>
  )
}
