import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { useMe } from "../hooks/useMe"
import { api } from "@/lib/api"
import { queryKeys } from "@/lib/query-keys"

export function SignedInPage() {
  const { data, isLoading } = useMe()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: () => api.post("/auth/logout", {}),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.me })
      navigate("/login")
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    )
  }

  const user = data?.user

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-success-tint flex items-center justify-center mx-auto text-xl font-semibold text-success-ink">
          {user?.name?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="text-[13px] text-muted-foreground font-medium uppercase tracking-wide">
            Signed in as
          </p>
          <p className="text-lg font-semibold text-foreground mt-0.5">{user?.name}</p>
          <p className="text-[13.5px] text-muted-foreground">{user?.email}</p>
        </div>
        {user && !user.emailVerified && (
          <p className="text-[13px] text-warning-ink bg-warning-tint px-3 py-2 rounded-lg">
            Check your inbox — we sent a verification email.
          </p>
        )}
        <Button
          variant="outline"
          onClick={() => signOut()}
          disabled={isPending}
          className="w-full"
        >
          {isPending && <Loader2 className="animate-spin" size={14} />}
          Sign out
        </Button>
      </div>
    </div>
  )
}
