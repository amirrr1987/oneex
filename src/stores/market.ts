import { defineStore } from 'pinia'
import { ref } from 'vue'

export type MarketRow = {
  market: string
  lastPrice: string
  change24: string
  max24: string
  min24: string
  volume24: string
}

export type PlatformStat = {
  id: string
  icon: string
  label: string
  numericValue: number
  suffix: string
  prefix?: string
}

export const useMarketStore = defineStore('market', () => {
  const activeCoin = ref('BTC')

  const rows = ref<MarketRow[]>([
    { market: 'AE/BTC', lastPrice: '0.0001099', change24: '+2.4%', max24: '0.00012', min24: '0.00010', volume24: '120 BTC' },
    { market: 'REP/BTC', lastPrice: '0.0001099', change24: '-1.1%', max24: '0.00012', min24: '0.00010', volume24: '80 BTC' },
    { market: 'XTZ/BTC', lastPrice: '0.0001099', change24: '+0.8%', max24: '0.00012', min24: '0.00010', volume24: '200 BTC' },
    { market: 'TIC/BTC', lastPrice: '0.0000451', change24: '+5.2%', max24: '0.00005', min24: '0.00004', volume24: '340 BTC' },
  ])

  const platformStats = ref<PlatformStat[]>([
    { id: 'btc', icon: 'bi-graph-up', label: 'BTC Price', numericValue: 3429, suffix: ' USD', prefix: '$' },
    { id: 'users', icon: 'bi-people', label: 'Active Users', numericValue: 2992, suffix: '' },
    { id: 'volume', icon: 'bi-bar-chart', label: '24 Volume', numericValue: 151, suffix: ' BTC' },
  ])

  function bumpStat(id: string) {
    const stat = platformStats.value.find((item) => item.id === id)
    if (!stat) return

    const delta = id === 'btc' ? (Math.random() > 0.5 ? 12 : -8) : Math.floor(Math.random() * 20) + 1
    stat.numericValue = Math.max(0, stat.numericValue + delta)
  }

  return { activeCoin, rows, platformStats, bumpStat }
})
