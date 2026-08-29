import { apiGet, apiPost, withDelay } from '@api/http'
import type { OrderBookRow, OrderRecord, OrderSide, OrderType, TradeRecord } from '@api/types'

export { feeRateLabel } from '@api/mock/handlers/trading'

export const fetchOrderBook = () =>
  apiGet<{ orderBook: OrderBookRow[]; lastPrice: number }>('/trading/order-book')

export const fetchOrders = (userId: string) =>
  apiGet<{ orders: OrderRecord[] }>(`/trading/orders?userId=${encodeURIComponent(userId)}`)

export const fetchRecentTrades = () =>
  apiGet<{ trades: TradeRecord[] }>('/trading/trades')

export const fetchTradingSnapshot = (userId: string) =>
  apiGet<{
    orderBook: OrderBookRow[]
    lastPrice: number
    orders: OrderRecord[]
    trades: TradeRecord[]
    balances: Record<string, number>
  }>(`/trading/snapshot?userId=${encodeURIComponent(userId)}`, withDelay(450))

export const placeOrder = (payload: {
  type: OrderType
  side: OrderSide
  amount: number
  price?: number
  userId: string
}) => apiPost<{ order: OrderRecord; trades: TradeRecord[] }>('/trading/orders', payload, withDelay(600))
