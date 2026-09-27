import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router"
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/layouts/AuthLayout"
import { PasswordStrengthMeter } from "./components/PasswordStrengthMeter"
import { authApi } from "@/services/auth.api"
import { queryKeys } from "@/queries/query-keys"
import { ApiError } from "@/lib/axios"

const schema = z
  .object({
    name: z.string().min(1, "Enter your name.").max(80),
    email: z
      .string()
      .min(1, "Enter the email you use for Spendwise.")
      .refine((v) => v.includes("@"), "That doesn't look like an email address."),
    password: z.string().min(8, "Password must be at least 8 characters.").max(72),
    confirm: z.string().min(1, "Please confirm your password."),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match yet.",
    path: ["confirm"],
  })

type FormValues = z.infer<typeof schema>

export function SignUpPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password", "")

  const { mutate, isPending } = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.me, data)
      navigate("/me")
    },
    onError: (err) => {
      if (err instanceof ApiError && err.status === 409) {
        setError("email", {
          message: err.error.fields?.email ?? "An account with this email already exists.",
        })
      }
    },
  })

  const onSubmit = (values: FormValues) => {
    mutate({ name: values.name, email: values.email, password: values.password })
  }

  return (
    <AuthLayout
      legalLine={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </>
      }
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Create your account</h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Start tracking your spending in minutes — it's free.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Name */}
        <Field label="Name" error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
        </Field>

        {/* Email */}
        <Field label="Email" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password?.message}>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <PasswordStrengthMeter password={password} />
        </Field>

        {/* Confirm password */}
        <Field label="Confirm password" error={errors.confirm?.message}>
          <div className="relative">
            <Input
              {...register("confirm")}
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              aria-invalid={!!errors.confirm}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>

        <Button type="submit" className="w-full h-10 mt-2" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin" size={16} />}
          {isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  )
}

/* ── Shared field wrapper ────────────────────────────────────────────── */
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-[12.5px] text-danger">
          <AlertCircle size={13} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
