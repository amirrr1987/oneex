import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  const addresses: Record<string, string> = {
    BTC: '3MdzHjmYuQWCyDZryt2zyonKkzuc65WF3W',
    TIC: 'tic1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    GVC: 'gvc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  }

  const balances = ref<Record<string, string>>({
    BTC: '0.54210000',
    ETH: '2.15000000',
    TIC: '1250.00000000',
    USDT: '2000.00',
  })

  const isRefreshing = ref(false)

  function getAddress(coin: string) {
    return addresses[coin] ?? addresses.BTC ?? ''
  }

  function getBalance(coin: string) {
    return balances.value[coin] ?? '0.00000000'
  }

  async function refreshBalances() {
    isRefreshing.value = true
    await new Promise((resolve) => setTimeout(resolve, 800))
    balances.value = {
      ...balances.value,
      BTC: (Number(balances.value.BTC) + Math.random() * 0.001).toFixed(8),
    }
    isRefreshing.value = false
  }

  return {
    balances,
    isRefreshing,
    getAddress,
    getBalance,
    refreshBalances,
  }
})
