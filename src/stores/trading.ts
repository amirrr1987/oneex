import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { TRADING_PAIR } from '@/constants/exchange'
import { queryClient } from '@api/query-client'
import { queryKeys } from '@api/query-keys'
import * as tradingApi from '@api/trading'
import type { OrderBookRow, OrderRecord, OrderSide, OrderType, TradeRecord } from '@api/types'
import { useAuthStore } from './auth'
import { useWalletStore } from './wallet'

export type { OrderSide, OrderType, OrderRecord, TradeRecord }

export const useTradingStore = defineStore('trading', () => {
  const auth = useAuthStore()
  const wallet = useWalletStore()

  const orders = ref<OrderRecord[]>([])
  const orderBook = ref<OrderBookRow[]>([])
  const recentTrades = ref<TradeRecord[]>([])
  const lastPrice = ref(0.0482)
  const isLoading = ref(false)

  const activeUserId = computed(() => auth.user?.id ?? 'guest')

  async function fetchTradingData() {
    isLoading.value = true
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: queryKeys.tradingSnapshot(activeUserId.value),
        queryFn: () => tradingApi.fetchTradingSnapshot(activeUserId.value),
      })
      orderBook.value = data.orderBook
      lastPrice.value = data.lastPrice
      orders.value = data.orders
      recentTrades.value = data.trades
      await wallet.fetchWallet()
    } finally {
      isLoading.value = false
    }
  }

  async function refreshOrderBook() {
    const { data } = await queryClient.fetchQuery({
      queryKey: queryKeys.orderBook,
      queryFn: () => tradingApi.fetchOrderBook(),
    })
    orderBook.value = data.orderBook
    lastPrice.value = data.lastPrice
  }

  async function placeOrder(input: {
    type: OrderType
    side: OrderSide
    amount: number
    price?: number
  }) {
    const { data } = await tradingApi.placeOrder({
      ...input,
      userId: activeUserId.value,
    })
    orders.value = [data.order, ...orders.value.filter((item) => item.id !== data.order.id)]
    recentTrades.value = data.trades
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.tradingSnapshot(activeUserId.value) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.orderBook }),
      queryClient.invalidateQueries({ queryKey: queryKeys.recentTrades }),
      wallet.fetchWallet(),
    ])
    return data.order
  }

  return {
    orders,
    orderBook,
    recentTrades,
    lastPrice,
    isLoading,
    fetchTradingData,
    refreshOrderBook,
    placeOrder,
    feeRateLabel: tradingApi.feeRateLabel,
    tradingPairLabel: TRADING_PAIR.label,
  }
})
