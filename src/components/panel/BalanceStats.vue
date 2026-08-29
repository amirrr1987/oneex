<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const { balances } = storeToRefs(wallet)

const stats = [
  { coin: 'BTC', icon: 'bi-currency-bitcoin', variant: 'success' as const },
  { coin: 'ETH', icon: 'bi-currency-exchange', variant: 'success' as const },
  { coin: 'USDT', icon: 'bi-cash-stack', variant: 'danger' as const },
]
</script>

<template>
  <div class="row g-3 text-center">
    <div v-for="stat in stats" :key="stat.coin" class="col-md-4">
      <div class="card shadow-sm h-100">
        <div class="card-body">
          <i :class="['bi', stat.icon, 'fs-2', 'text-primary', 'mb-2']" />
          <strong class="text-uppercase d-block mb-2">{{ stat.coin }} Total</strong>
          <span class="d-block small font-monospace">{{ balances[stat.coin] ?? '0.00000000' }}</span>
          <span class="text-uppercase small" :class="stat.variant === 'success' ? 'text-success' : 'text-danger'">
            {{ stat.coin === 'USDT' ? 'USD equivalent' : stat.coin }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
