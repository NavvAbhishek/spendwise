import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { authApi } from "../api"
import { ApiError } from "@/lib/api"

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
