import {
  getDb,
  jitterMarkets,
  saveMarkets,
  savePlatformStats,
} from '@api/mock/db'
import type { PairStats } from '@api/types'

export function getMarkets(options?: { quote?: string; live?: boolean }) {
  const db = getDb()
  let markets = structuredClone(db.markets)

  if (options?.quote) {
    const suffix = `/${options.quote}`
    markets = markets.filter((row) => row.market.endsWith(suffix))
  }

  if (options?.live !== false) {
    markets = jitterMarkets(markets)
    saveMarkets(markets)
  }

  return { markets }
}

export function getPlatformStats(live = true) {
  const db = getDb()
  let stats = structuredClone(db.platformStats)

  if (live) {
    stats = stats.map((stat) => {
      const delta =
        stat.id === 'btc'
          ? Math.random() > 0.5
            ? 12
            : -8
          : Math.floor(Math.random() * 20) + 1
      return {
        ...stat,
        numericValue: Math.max(0, stat.numericValue + delta),
      }
    })
    savePlatformStats(stats)
  }

  return { stats }
}

export function refreshPlatformStat(id: string) {
  const db = getDb()
  const stats = db.platformStats.map((stat) => {
    if (stat.id !== id) return stat
    const delta = id === 'btc' ? (Math.random() > 0.5 ? 12 : -8) : Math.floor(Math.random() * 20) + 1
    return {
      ...stat,
      numericValue: Math.max(0, stat.numericValue + delta),
    }
  })
  savePlatformStats(stats)
  return { stats: structuredClone(stats) }
}

export function getPairStats() {
  const db = getDb()
  const jitter = db.pairStats.lastPrice * (Math.random() * 0.003 - 0.0015)
  const stats: PairStats = {
    ...db.pairStats,
    lastPrice: Math.max(0.0001, db.pairStats.lastPrice + jitter),
    volume24h: db.pairStats.volume24h + Math.random() * 2,
  }
  return { stats }
}
