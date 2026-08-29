import {
  ASSET_CONFIG,
  DAILY_WITHDRAW_LIMIT_USDT,
  type SupportedCoin,
  type WithdrawPriority,
  WITHDRAW_PRIORITY_MULTIPLIER,
} from '@/constants/exchange'
import { deriveDepositAddress, isValidAddress } from '@/utils/addresses'
import { ApiError } from '@api/client'
import {
  coinUsdRate,
  getActiveUserId,
  getDb,
  getWallet,
  saveWallet,
} from '@api/mock/db'
import type { PendingDeposit, WalletSnapshot, WithdrawRecord } from '@api/types'

export function formatBalance(value: number, coin: SupportedCoin) {
  return value.toFixed(ASSET_CONFIG[coin].decimals)
}

export function getWalletSnapshot(userId?: string) {
  const id = userId ?? getActiveUserId()
  return {
    userId: id,
    wallet: structuredClone(getWallet(id)),
  }
}

export function getDepositAddress(coin: SupportedCoin, userId?: string) {
  const id = userId ?? getActiveUserId()
  if (id === 'guest') throw new ApiError('Not authenticated', 401)
  return { address: deriveDepositAddress(id, coin) }
}

export function estimateWithdrawFee(coin: SupportedCoin, priority: WithdrawPriority) {
  const base = ASSET_CONFIG[coin].networkFee
  return Number((base * WITHDRAW_PRIORITY_MULTIPLIER[priority]).toFixed(ASSET_CONFIG[coin].decimals))
}

export function simulateDeposit(payload: { coin: SupportedCoin; amount: number; userId?: string }) {
  const id = payload.userId ?? getActiveUserId()
  const config = ASSET_CONFIG[payload.coin]

  if (payload.amount < config.minDeposit) {
    throw new ApiError(`Minimum deposit is ${config.minDeposit} ${payload.coin}`)
  }

  const wallet = getWallet(id)
  const deposit: PendingDeposit = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    coin: payload.coin,
    amount: payload.amount,
    confirmations: 0,
    requiredConfirmations: config.confirmations,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }

  const nextWallet: WalletSnapshot = {
    ...wallet,
    pendingDeposits: [deposit, ...wallet.pendingDeposits],
  }

  saveWallet(id, nextWallet)
  return { wallet: structuredClone(nextWallet), deposit }
}

export function refreshDeposits(userId?: string) {
  const id = userId ?? getActiveUserId()
  const wallet = getWallet(id)
  const nextDeposits = wallet.pendingDeposits.map((deposit) => ({ ...deposit }))
  const nextBalances = { ...wallet.balances }

  for (const deposit of nextDeposits) {
    if (deposit.status === 'Confirmed') continue
    deposit.confirmations = Math.min(deposit.requiredConfirmations, deposit.confirmations + 1)
    if (deposit.confirmations >= deposit.requiredConfirmations) {
      deposit.status = 'Confirmed'
      nextBalances[deposit.coin] = (nextBalances[deposit.coin] ?? 0) + deposit.amount
    }
  }

  const nextWallet: WalletSnapshot = {
    ...wallet,
    balances: nextBalances,
    pendingDeposits: nextDeposits,
  }

  saveWallet(id, nextWallet)
  return { wallet: structuredClone(nextWallet) }
}

export function submitWithdraw(payload: {
  coin: SupportedCoin
  amount: number
  address: string
  priority: WithdrawPriority
  userId?: string
}) {
  const id = payload.userId ?? getActiveUserId()
  const config = ASSET_CONFIG[payload.coin]
  const wallet = getWallet(id)

  if (!isValidAddress(payload.coin, payload.address)) {
    throw new ApiError(`Enter a valid ${payload.coin} address`)
  }
  if (payload.amount < config.minWithdraw) {
    throw new ApiError(`Minimum withdrawal is ${config.minWithdraw} ${payload.coin}`)
  }

  const fee = estimateWithdrawFee(payload.coin, payload.priority)
  const total = payload.amount + fee
  const available = wallet.balances[payload.coin] ?? 0

  if (total > available) {
    throw new ApiError(`Insufficient balance. Need ${formatBalance(total, payload.coin)} ${payload.coin}`)
  }

  const usdtEquivalent = payload.amount * coinUsdRate(payload.coin)
  const today = new Date().toISOString().slice(0, 10)
  const withdrawnToday = wallet.lastWithdrawDay === today ? wallet.withdrawnTodayUsdt : 0
  const remaining = Math.max(0, DAILY_WITHDRAW_LIMIT_USDT - withdrawnToday)

  if (usdtEquivalent > remaining) {
    throw new ApiError('Daily withdrawal limit reached')
  }

  const record: WithdrawRecord = {
    id: crypto.randomUUID?.() ?? String(Date.now()),
    coin: payload.coin,
    amount: payload.amount,
    fee,
    address: payload.address,
    priority: payload.priority,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  }

  const nextWallet: WalletSnapshot = {
    ...wallet,
    balances: {
      ...wallet.balances,
      [payload.coin]: available - total,
    },
    withdrawHistory: [record, ...wallet.withdrawHistory],
    withdrawnTodayUsdt: withdrawnToday + usdtEquivalent,
    lastWithdrawDay: today,
  }

  saveWallet(id, nextWallet)
  return { wallet: structuredClone(nextWallet), record }
}

export function applyTradeSettlement(payload: {
  side: 'buy' | 'sell'
  baseAmount: number
  quoteAmount: number
  feeQuote: number
  userId?: string
}) {
  const id = payload.userId ?? getActiveUserId()
  const wallet = getWallet(id)
  const base = 'ETH' as SupportedCoin
  const quote = 'BTC' as SupportedCoin
  const balances = { ...wallet.balances }

  if (payload.side === 'buy') {
    if ((balances[quote] ?? 0) < payload.quoteAmount + payload.feeQuote) {
      throw new ApiError('Insufficient BTC balance')
    }
    balances[quote] = (balances[quote] ?? 0) - payload.quoteAmount - payload.feeQuote
    balances[base] = (balances[base] ?? 0) + payload.baseAmount
  } else {
    if ((balances[base] ?? 0) < payload.baseAmount) {
      throw new ApiError('Insufficient ETH balance')
    }
    balances[base] = (balances[base] ?? 0) - payload.baseAmount
    balances[quote] = (balances[quote] ?? 0) + payload.quoteAmount - payload.feeQuote
  }

  const nextWallet: WalletSnapshot = { ...wallet, balances }
  saveWallet(id, nextWallet)
  return { wallet: structuredClone(nextWallet) }
}

export function creditTic(amount: number, userId?: string) {
  const id = userId ?? getActiveUserId()
  const wallet = getWallet(id)
  const nextWallet: WalletSnapshot = {
    ...wallet,
    balances: {
      ...wallet.balances,
      TIC: (wallet.balances.TIC ?? 0) + amount,
    },
  }
  saveWallet(id, nextWallet)
  return { wallet: structuredClone(nextWallet) }
}

export function remainingDailyWithdrawLimit(userId?: string) {
  const id = userId ?? getActiveUserId()
  const wallet = getDb().walletsByUser[id] ?? getWallet(id)
  const today = new Date().toISOString().slice(0, 10)
  const withdrawn = wallet.lastWithdrawDay === today ? wallet.withdrawnTodayUsdt : 0
  return Math.max(0, DAILY_WITHDRAW_LIMIT_USDT - withdrawn)
}
