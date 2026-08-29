import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'

import * as marketApi from '@api/market'
import { queryKeys } from '@api/query-keys'

export function useMarketsQuery(quote?: MaybeRefOrGetter<string | undefined>) {
  return useQuery({
    queryKey: computed(() => queryKeys.markets(toValue(quote) ?? 'all')),
    queryFn: async () => {
      const response = await marketApi.fetchMarkets({
        quote: toValue(quote),
        live: true,
      })
      return response.data.markets
    },
  })
}

export function usePlatformStatsQuery() {
  return useQuery({
    queryKey: queryKeys.platformStats,
    queryFn: async () => {
      const response = await marketApi.fetchPlatformStats(true)
      return response.data.stats
    },
  })
}

export function usePairStatsQuery() {
  return useQuery({
    queryKey: queryKeys.pairStats,
    queryFn: async () => {
      const response = await marketApi.fetchPairStats()
      return response.data.stats
    },
  })
}
