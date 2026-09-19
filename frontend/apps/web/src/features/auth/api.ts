import { api } from "@/lib/api"
import type { User } from "./types"

export type SignUpPayload = {
  name: string
  email: string
  password: string
}

export const authApi = {
  signUp: (payload: SignUpPayload) =>
    api.post<{ user: User }>("/auth/signup", payload),

  me: () => api.get<{ user: User }>("/me"),
}
