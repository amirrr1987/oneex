import { MAKER_TAKER_FEE_RATE, TIC_MINING_RATE, TRADING_PAIR } from '@/constants/exchange'
import { ApiError } from '@api/client'
import {
  getActiveUserId,
  getDb,
  getOrders,
  getWallet,
  jitterOrderBook,
  prependTrade,
  saveOrderBook,
  saveOrders,
  savePairStats,
} from '@api/mock/db'
import { applyTradeSettlement, creditTic } from '@api/mock/handlers/wallet'
import { SEED_ORDERS } from '@api/mock/seed'
import type { OrderRecord, OrderSide, OrderType, TradeRecord } from '@api/types'

export function getOrderBook() {
  const db = getDb()
  const orderBook = jitterOrderBook(structuredClone(db.orderBook))
  saveOrderBook(orderBook)

  const lastPrice = Number(orderBook[0]?.askPrice ?? '0.0482')
  savePairStats({
    ...db.pairStats,
    lastPrice,
  })

  return { orderBook, lastPrice }
}

export function getOrdersForUser(userId?: string) {
  const id = userId ?? getActiveUserId()
  const orders = getOrders(id)
  return { orders: orders.length ? structuredClone(orders) : structuredClone(SEED_ORDERS) }
}

export function getRecentTrades() {
  return { trades: structuredClone(getDb().recentTrades) }
}

export function placeOrder(payload: {
  type: OrderType
  side: OrderSide
  amount: number
  price?: number
  userId?: string
}) {
  if (payload.amount <= 0) {
    throw new ApiError('Enter a valid amount')
  }

  const { lastPrice } = getOrderBook()
  const price = payload.type === 'Market' ? lastPrice : (payload.price ?? lastPrice)

  if (price <= 0) {
    throw new ApiError('Enter a valid price')
  }

  const quoteAmount = payload.amount * price
  const fee = quoteAmount * MAKER_TAKER_FEE_RATE
  const userId = payload.userId ?? getActiveUserId()

  applyTradeSettlement({
    side: payload.side,
    baseAmount: payload.amount,
    quoteAmount,
    feeQuote: fee,
    userId,
  })
  creditTic(payload.amount * TIC_MINING_RATE, userId)

  const order: OrderRecord = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    pair: TRADING_PAIR.label,
    type: payload.type,
    side: payload.side,
    price,
    amount: payload.amount,
    fee,
    status: 'Filled',
    createdAt: new Date().toISOString(),
  }

  const existing = getOrders(userId)
  const orders = [order, ...(existing.length ? existing : SEED_ORDERS)]
  saveOrders(userId, orders)

  const trade: TradeRecord = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    pair: TRADING_PAIR.label,
    side: payload.side,
    amount: payload.amount,
    price,
    total: quoteAmount,
    createdAt: order.createdAt,
  }
  prependTrade(trade)

  return { order, trades: getDb().recentTrades }
}

export function getTradingSnapshot(userId?: string) {
  const id = userId ?? getActiveUserId()
  const book = getOrderBook()
  const orders = getOrdersForUser(id)
  const trades = getRecentTrades()

  return {
    orderBook: book.orderBook,
    lastPrice: book.lastPrice,
    orders: orders.orders,
    trades: trades.trades,
    balances: structuredClone(getWallet(id).balances),
  }
}

export const feeRateLabel = `${(MAKER_TAKER_FEE_RATE * 100).toFixed(2)}%`
