import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { ASSET_CONFIG, type SupportedCoin, type WithdrawPriority } from '@/constants/exchange'
import { deriveDepositAddress } from '@/utils/addresses'
import { queryClient } from '@api/query-client'
import { queryKeys } from '@api/query-keys'
import * as walletApi from '@api/wallet'
import type { PendingDeposit, WalletSnapshot, WithdrawRecord } from '@api/types'
import { useAuthStore } from './auth'

export type { PendingDeposit, WithdrawRecord }

export const useWalletStore = defineStore('wallet', () => {
  const auth = useAuthStore()
  const wallet = ref<WalletSnapshot | null>(null)
  const isLoading = ref(false)
  const isRefreshing = ref(false)

  const activeUserId = computed(() => auth.user?.id ?? 'guest')
  const balances = computed(() => wallet.value?.balances ?? null)
  const pendingDeposits = computed(() => wallet.value?.pendingDeposits ?? [])
  const withdrawHistory = computed(() => wallet.value?.withdrawHistory ?? [])

  async function fetchWallet() {
    isLoading.value = true
    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: queryKeys.wallet(activeUserId.value),
        queryFn: () => walletApi.fetchWallet(activeUserId.value),
      })
      wallet.value = data.wallet
    } finally {
      isLoading.value = false
    }
  }

  function getDepositAddress(coin: SupportedCoin) {
    const userId = auth.user?.id
    if (!userId) return ''
    return deriveDepositAddress(userId, coin)
  }

  function getBalance(coin: string) {
    const key = coin as SupportedCoin
    const value = wallet.value?.balances?.[key] ?? 0
    return walletApi.formatBalance(value, key in ASSET_CONFIG ? key : 'BTC')
  }

  function getAvailableBalance(coin: SupportedCoin) {
    return wallet.value?.balances[coin] ?? 0
  }

  function estimateWithdrawFee(coin: SupportedCoin, priority: WithdrawPriority) {
    return walletApi.estimateWithdrawFee(coin, priority)
  }

  function remainingDailyWithdrawLimit() {
    return walletApi.remainingDailyWithdrawLimit(activeUserId.value)
  }

  async function simulateIncomingDeposit(coin: SupportedCoin, amount: number) {
    const { data } = await walletApi.simulateDeposit({
      coin,
      amount,
      userId: activeUserId.value,
    })
    wallet.value = data.wallet
    await queryClient.invalidateQueries({ queryKey: queryKeys.wallet(activeUserId.value) })
  }

  async function refreshDeposits() {
    isRefreshing.value = true
    try {
      const { data } = await walletApi.refreshDeposits(activeUserId.value)
      wallet.value = data.wallet
      await queryClient.invalidateQueries({ queryKey: queryKeys.wallet(activeUserId.value) })
    } finally {
      isRefreshing.value = false
    }
  }

  async function submitWithdraw(input: {
    coin: SupportedCoin
    amount: number
    address: string
    priority: WithdrawPriority
  }) {
    const { data } = await walletApi.submitWithdraw({
      ...input,
      userId: activeUserId.value,
    })
    wallet.value = data.wallet
    await queryClient.invalidateQueries({ queryKey: queryKeys.wallet(activeUserId.value) })
    return data.record
  }

  return {
    wallet,
    balances,
    pendingDeposits,
    withdrawHistory,
    isLoading,
    isRefreshing,
    fetchWallet,
    getDepositAddress,
    getBalance,
    getAvailableBalance,
    estimateWithdrawFee,
    remainingDailyWithdrawLimit,
    simulateIncomingDeposit,
    refreshDeposits,
    submitWithdraw,
    formatBalance: walletApi.formatBalance,
  }
})
