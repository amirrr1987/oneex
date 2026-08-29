import type { InternalAxiosRequestConfig } from 'axios'

import { ApiError } from '@api/client'
import * as authHandlers from '@api/mock/handlers/auth'
import * as marketHandlers from '@api/mock/handlers/market'
import * as tradingHandlers from '@api/mock/handlers/trading'
import * as walletHandlers from '@api/mock/handlers/wallet'

function parseBody<T>(config: InternalAxiosRequestConfig): T | undefined {
  if (!config.data) return undefined
  if (typeof config.data === 'string') {
    try {
      return JSON.parse(config.data) as T
    } catch {
      return undefined
    }
  }
  return config.data as T
}

function pathOf(config: InternalAxiosRequestConfig) {
  const url = config.url ?? '/'
  return url.replace(/^\/api/, '').split('?')[0] ?? '/'
}

function queryOf(config: InternalAxiosRequestConfig) {
  const url = config.url ?? '/'
  const query = url.includes('?') ? url.split('?')[1] : ''
  return new URLSearchParams(query)
}

export async function resolveMockRequest(config: InternalAxiosRequestConfig) {
  const method = (config.method ?? 'get').toUpperCase()
  const path = pathOf(config)
  const query = queryOf(config)
  const body = parseBody<Record<string, unknown>>(config)

  if (method === 'GET' && path === '/auth/session') {
    return authHandlers.getSession()
  }

  if (method === 'GET' && path === '/auth/login-history') {
    return authHandlers.getLoginHistory()
  }

  if (method === 'POST' && path === '/auth/sign-in') {
    return authHandlers.signIn(body as authHandlers.SignInPayload)
  }

  if (method === 'POST' && path === '/auth/sign-up') {
    return authHandlers.signUp(body as authHandlers.SignUpPayload)
  }

  if (method === 'POST' && path === '/auth/sign-out') {
    return authHandlers.signOut()
  }

  if (method === 'PATCH' && path === '/auth/profile') {
    return authHandlers.updateProfile(String(body?.firstName ?? ''), String(body?.lastName ?? ''))
  }

  const walletMatch = path.match(/^\/wallet\/([^/]+)$/)
  if (method === 'GET' && walletMatch) {
    return walletHandlers.getWalletSnapshot(walletMatch[1])
  }

  const depositSimMatch = path.match(/^\/wallet\/([^/]+)\/deposits\/simulate$/)
  if (method === 'POST' && depositSimMatch) {
    return walletHandlers.simulateDeposit({
      userId: depositSimMatch[1],
      coin: body?.coin as never,
      amount: Number(body?.amount),
    })
  }

  const depositRefreshMatch = path.match(/^\/wallet\/([^/]+)\/deposits\/refresh$/)
  if (method === 'POST' && depositRefreshMatch) {
    return walletHandlers.refreshDeposits(depositRefreshMatch[1])
  }

  const withdrawMatch = path.match(/^\/wallet\/([^/]+)\/withdrawals$/)
  if (method === 'POST' && withdrawMatch) {
    return walletHandlers.submitWithdraw({
      userId: withdrawMatch[1],
      coin: body?.coin as never,
      amount: Number(body?.amount),
      address: String(body?.address ?? ''),
      priority: body?.priority as never,
    })
  }

  if (method === 'GET' && path === '/trading/order-book') {
    return tradingHandlers.getOrderBook()
  }

  if (method === 'GET' && path === '/trading/orders') {
    return tradingHandlers.getOrdersForUser(query.get('userId') ?? undefined)
  }

  if (method === 'GET' && path === '/trading/trades') {
    return tradingHandlers.getRecentTrades()
  }

  if (method === 'GET' && path === '/trading/snapshot') {
    return tradingHandlers.getTradingSnapshot(query.get('userId') ?? undefined)
  }

  if (method === 'POST' && path === '/trading/orders') {
    return tradingHandlers.placeOrder({
      userId: body?.userId as string | undefined,
      type: body?.type as never,
      side: body?.side as never,
      amount: Number(body?.amount),
      price: body?.price !== undefined ? Number(body.price) : undefined,
    })
  }

  if (method === 'GET' && path === '/markets') {
    return marketHandlers.getMarkets({
      quote: query.get('quote') ?? undefined,
      live: query.get('live') !== 'false',
    })
  }

  if (method === 'GET' && path === '/markets/platform-stats') {
    return marketHandlers.getPlatformStats(query.get('live') !== 'false')
  }

  const statRefreshMatch = path.match(/^\/markets\/platform-stats\/([^/]+)\/refresh$/)
  if (method === 'POST' && statRefreshMatch) {
    return marketHandlers.refreshPlatformStat(statRefreshMatch[1]!)
  }

  if (method === 'GET' && path === '/markets/pair-stats') {
    return marketHandlers.getPairStats()
  }

  throw new ApiError(`No mock route for ${method} ${path}`, 404)
}
