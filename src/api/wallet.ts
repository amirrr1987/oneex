import type { SupportedCoin, WithdrawPriority } from '@/constants/exchange'
import { apiGet, apiPost, withDelay } from '@api/http'
import type { PendingDeposit, WalletSnapshot, WithdrawRecord } from '@api/types'

export {
  estimateWithdrawFee,
  formatBalance,
  remainingDailyWithdrawLimit,
} from '@api/mock/handlers/wallet'

export const fetchWallet = (userId: string) =>
  apiGet<{ wallet: WalletSnapshot; userId: string }>(`/wallet/${userId}`)

export const fetchDepositAddress = (coin: SupportedCoin, userId: string) =>
  apiGet<{ address: string }>(`/wallet/${userId}/deposit-address?coin=${coin}`)

export const simulateDeposit = (payload: {
  coin: SupportedCoin
  amount: number
  userId: string
}) =>
  apiPost<{ wallet: WalletSnapshot; deposit: PendingDeposit }>(
    `/wallet/${payload.userId}/deposits/simulate`,
    payload,
    withDelay(500),
  )

export const refreshDeposits = (userId: string) =>
  apiPost<{ wallet: WalletSnapshot }>(
    `/wallet/${userId}/deposits/refresh`,
    undefined,
    withDelay(900),
  )

export const submitWithdraw = (payload: {
  coin: SupportedCoin
  amount: number
  address: string
  priority: WithdrawPriority
  userId: string
}) =>
  apiPost<{ wallet: WalletSnapshot; record: WithdrawRecord }>(
    `/wallet/${payload.userId}/withdrawals`,
    payload,
  )

export const applyTradeSettlement = (payload: {
  side: 'buy' | 'sell'
  baseAmount: number
  quoteAmount: number
  feeQuote: number
  userId: string
}) =>
  apiPost<{ wallet: WalletSnapshot }>(
    `/wallet/${payload.userId}/trades/settle`,
    payload,
    withDelay(200),
  )

export const creditTic = (amount: number, userId: string) =>
  apiPost<{ wallet: WalletSnapshot }>(
    `/wallet/${userId}/tic/credit`,
    { amount },
    withDelay(150),
  )
