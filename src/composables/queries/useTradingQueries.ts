import { useQuery } from '@tanstack/vue-query'
import { computed, type MaybeRefOrGetter, toValue } from 'vue'

import * as tradingApi from '@api/trading'
import { queryKeys } from '@api/query-keys'

export function useTradingSnapshotQuery(userId: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => queryKeys.tradingSnapshot(toValue(userId))),
    queryFn: async () => {
      const response = await tradingApi.fetchTradingSnapshot(toValue(userId))
      return response.data
    },
    enabled: computed(() => Boolean(toValue(userId))),
  })
}

export function useOrderBookQuery() {
  return useQuery({
    queryKey: queryKeys.orderBook,
    queryFn: async () => {
      const response = await tradingApi.fetchOrderBook()
      return response.data
    },
  })
}

export function useRecentTradesQuery() {
  return useQuery({
    queryKey: queryKeys.recentTrades,
    queryFn: async () => {
      const response = await tradingApi.fetchRecentTrades()
      return response.data.trades
    },
  })
}
