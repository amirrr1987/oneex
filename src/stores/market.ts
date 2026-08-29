import { defineStore } from 'pinia'
import { ref } from 'vue'

import { queryClient } from '@api/query-client'
import { queryKeys } from '@api/query-keys'
import * as marketApi from '@api/market'
import type { MarketRow, PairStats, PlatformStat } from '@api/types'

export type { MarketRow, PlatformStat, PairStats }

export const useMarketStore = defineStore('market', () => {
  const activeCoin = ref('BTC')
  const rows = ref<MarketRow[]>([])
  const platformStats = ref<PlatformStat[]>([])
  const pairStats = ref<PairStats | null>(null)
  const isLoading = ref(false)

  async function fetchMarkets(quote?: string) {
    isLoading.value = true
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: queryKeys.markets(quote ?? 'all'),
        queryFn: () => marketApi.fetchMarkets({ quote, live: true }),
      })
      rows.value = data.markets
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPlatformStats() {
    const { data } = await queryClient.fetchQuery({
      queryKey: queryKeys.platformStats,
      queryFn: () => marketApi.fetchPlatformStats(true),
    })
    platformStats.value = data.stats
  }

  async function fetchPairStats() {
    const { data } = await queryClient.fetchQuery({
      queryKey: queryKeys.pairStats,
      queryFn: () => marketApi.fetchPairStats(),
    })
    pairStats.value = data.stats
  }

  async function refreshLandingData() {
    isLoading.value = true
    try {
      await Promise.all([fetchMarkets(), fetchPlatformStats()])
    } finally {
      isLoading.value = false
    }
  }

  async function bumpStat(id: string) {
    const { data } = await marketApi.refreshPlatformStat(id)
    platformStats.value = data.stats
    queryClient.setQueryData(queryKeys.platformStats, {
      data: { stats: data.stats },
      timestamp: new Date().toISOString(),
    })
  }

  return {
    activeCoin,
    rows,
    platformStats,
    pairStats,
    isLoading,
    fetchMarkets,
    fetchPlatformStats,
    fetchPairStats,
    refreshLandingData,
    bumpStat,
  }
})
