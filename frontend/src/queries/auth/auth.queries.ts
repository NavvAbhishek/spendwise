import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/queries/query-keys"
import { authApi } from "@/services/auth.api"
import { ApiError } from "@/lib/axios"

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => authApi.me(),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false
      return failureCount < 2
    },
    staleTime: 5 * 60_000,
  })
}
