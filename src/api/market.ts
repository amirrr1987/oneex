import { apiGet, apiPost, withDelay } from '@api/http'
import type { MarketRow, PairStats, PlatformStat } from '@api/types'

export const fetchMarkets = (options?: { quote?: string; live?: boolean }) => {
  const params = new URLSearchParams()
  if (options?.quote) params.set('quote', options.quote)
  if (options?.live === false) params.set('live', 'false')
  const query = params.toString()
  return apiGet<{ markets: MarketRow[] }>(`/markets${query ? `?${query}` : ''}`)
}

export const fetchPlatformStats = (live = true) =>
  apiGet<{ stats: PlatformStat[] }>(`/markets/platform-stats?live=${live ? 'true' : 'false'}`)

export const refreshPlatformStat = (id: string) =>
  apiPost<{ stats: PlatformStat[] }>(`/markets/platform-stats/${id}/refresh`, undefined, withDelay(600))

export const fetchPairStats = () => apiGet<{ stats: PairStats }>('/markets/pair-stats')

export const fetchReportMarkets = (coin: string) => fetchMarkets({ quote: coin, live: true })
