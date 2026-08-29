import { useQuery } from '@tanstack/vue-query'

import * as authApi from '@api/auth'
import { queryKeys } from '@api/query-keys'

export function useSessionQuery() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: async () => {
      const response = await authApi.fetchSession()
      return response.data
    },
  })
}

export function useLoginHistoryQuery(enabled = true) {
  return useQuery({
    queryKey: queryKeys.loginHistory,
    queryFn: async () => {
      const response = await authApi.fetchLoginHistory()
      return response.data.loginHistory
    },
    enabled,
  })
}
