import type { SupportedCoin } from '@/constants/exchange'
import { hashSeed } from '@/utils/addresses'
import type {
  AuthUser,
  LoginEvent,
  MarketRow,
  OrderBookRow,
  OrderRecord,
  PairStats,
  PlatformStat,
  TradeRecord,
  WalletSnapshot,
} from '@api/types'

import {
  SEED_MARKETS,
  SEED_ORDER_BOOK,
  SEED_PAIR_STATS,
  SEED_PLATFORM_STATS,
  SEED_TRADES,
  createDefaultWallet,
} from './seed'

const STORAGE_KEY = 'oneex-mock-db-v1'

type MockDatabase = {
  users: Record<string, AuthUser>
  sessionUser: AuthUser | null
  loginHistory: LoginEvent[]
  walletsByUser: Record<string, WalletSnapshot>
  ordersByUser: Record<string, OrderRecord[]>
  orderBook: OrderBookRow[]
  markets: MarketRow[]
  platformStats: PlatformStat[]
  pairStats: PairStats
  recentTrades: TradeRecord[]
}

function readLegacyStorage(): Partial<MockDatabase> {
  const legacy: Partial<MockDatabase> = {}

  try {
    const user = localStorage.getItem('oneex-user')
    if (user) legacy.sessionUser = JSON.parse(user) as AuthUser | null
  } catch {
    /* ignore */
  }

  try {
    const users = localStorage.getItem('oneex-users')
    if (users) legacy.users = JSON.parse(users) as Record<string, AuthUser>
  } catch {
    /* ignore */
  }

  try {
    const loginHistory = localStorage.getItem('oneex-login-history')
    if (loginHistory) legacy.loginHistory = JSON.parse(loginHistory) as LoginEvent[]
  } catch {
    /* ignore */
  }

  try {
    const wallets = localStorage.getItem('oneex-wallets')
    if (wallets) legacy.walletsByUser = JSON.parse(wallets) as Record<string, WalletSnapshot>
  } catch {
    /* ignore */
  }

  try {
    const orders = localStorage.getItem('oneex-orders')
    if (orders) legacy.ordersByUser = JSON.parse(orders) as Record<string, OrderRecord[]>
  } catch {
    /* ignore */
  }

  try {
    const orderBook = localStorage.getItem('oneex-order-book')
    if (orderBook) legacy.orderBook = JSON.parse(orderBook) as OrderBookRow[]
  } catch {
    /* ignore */
  }

  return legacy
}

function createDefaultDb(): MockDatabase {
  const legacy = readLegacyStorage()

  return {
    users: legacy.users ?? {},
    sessionUser: legacy.sessionUser ?? null,
    loginHistory: legacy.loginHistory ?? [],
    walletsByUser: legacy.walletsByUser ?? {},
    ordersByUser: legacy.ordersByUser ?? {},
    orderBook: legacy.orderBook ?? structuredClone(SEED_ORDER_BOOK),
    markets: structuredClone(SEED_MARKETS),
    platformStats: structuredClone(SEED_PLATFORM_STATS),
    pairStats: structuredClone(SEED_PAIR_STATS),
    recentTrades: structuredClone(SEED_TRADES),
  }
}

function loadDb(): MockDatabase {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultDb()
    return { ...createDefaultDb(), ...JSON.parse(raw) } as MockDatabase
  } catch {
    return createDefaultDb()
  }
}

let memoryDb = loadDb()

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryDb))
}

export function getDb(): MockDatabase {
  return memoryDb
}

export function userIdFromEmail(email: string) {
  return `user-${hashSeed(email.trim().toLowerCase())}`
}

export function getActiveUserId() {
  return memoryDb.sessionUser?.id ?? 'guest'
}

export function getWallet(userId: string): WalletSnapshot {
  if (!memoryDb.walletsByUser[userId]) {
    memoryDb.walletsByUser[userId] = createDefaultWallet()
    persist()
  }
  return memoryDb.walletsByUser[userId]
}

export function saveWallet(userId: string, wallet: WalletSnapshot) {
  memoryDb.walletsByUser[userId] = wallet
  persist()
}

export function getOrders(userId: string): OrderRecord[] {
  return memoryDb.ordersByUser[userId] ?? []
}

export function saveOrders(userId: string, orders: OrderRecord[]) {
  memoryDb.ordersByUser[userId] = orders
  persist()
}

export function saveOrderBook(orderBook: OrderBookRow[]) {
  memoryDb.orderBook = orderBook
  persist()
}

export function saveSessionUser(user: AuthUser | null) {
  memoryDb.sessionUser = user
  persist()
}

export function saveUsers(users: Record<string, AuthUser>) {
  memoryDb.users = users
  persist()
}

export function saveLoginHistory(history: LoginEvent[]) {
  memoryDb.loginHistory = history
  persist()
}

export function saveMarkets(markets: MarketRow[]) {
  memoryDb.markets = markets
  persist()
}

export function savePlatformStats(stats: PlatformStat[]) {
  memoryDb.platformStats = stats
  persist()
}

export function savePairStats(stats: PairStats) {
  memoryDb.pairStats = stats
  persist()
}

export function prependTrade(trade: TradeRecord) {
  memoryDb.recentTrades = [trade, ...memoryDb.recentTrades].slice(0, 20)
  persist()
}

export function jitterMarkets(markets: MarketRow[]): MarketRow[] {
  return markets.map((row) => {
    const price = Number(row.lastPrice)
    if (Number.isNaN(price) || price <= 0) return row

    const delta = price * (Math.random() * 0.004 - 0.002)
    const nextPrice = Math.max(0.00000001, price + delta)
    const decimals = row.lastPrice.includes('.') ? row.lastPrice.split('.')[1]?.length ?? 4 : 4

    return {
      ...row,
      lastPrice: nextPrice.toFixed(decimals),
    }
  })
}

export function jitterOrderBook(orderBook: OrderBookRow[]): OrderBookRow[] {
  return orderBook.map((row) => {
    const ask = Number(row.askPrice)
    const bid = Number(row.totalBid)
    const askDelta = ask * (Math.random() * 0.002 - 0.001)
    const bidDelta = bid * (Math.random() * 0.002 - 0.001)

    return {
      ...row,
      askPrice: Math.max(0.0001, ask + askDelta).toFixed(4),
      totalBid: Math.max(0.0001, bid + bidDelta).toFixed(4),
    }
  })
}

export function coinUsdRate(coin: SupportedCoin): number {
  const rates: Record<SupportedCoin, number> = {
    BTC: 68000,
    ETH: 3400,
    USDT: 1,
    TIC: 0.12,
    GVC: 0.08,
  }
  return rates[coin]
}
