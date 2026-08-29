<script setup lang="ts">
import { storeToRefs } from 'pinia'

import AnimatedCounter from '@/components/shared/AnimatedCounter.vue'
import { useMarketStore } from '@/stores/market'

const market = useMarketStore()
const { platformStats } = storeToRefs(market)

const statLabels = ['24hr Volume', '24hr High', '24hr Low', 'Last Price', 'Change']
</script>

<template>
  <div
    v-motion
    class="card shadow-sm"
    :initial="{ opacity: 0, y: 12 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
  >
    <div class="card-body">
      <div class="row g-3 align-items-center">
        <div class="col-md-4 text-center">
          <h5 class="mb-0 text-uppercase d-inline-flex align-items-center justify-content-center gap-2">
            <i class="bi bi-currency-exchange text-primary" />TIC / BTC
          </h5>
        </div>
        <div v-for="(label, index) in statLabels" :key="label" class="col-md-4">
          <div class="border rounded p-3 text-center h-100">
            <div class="text-muted fw-semibold">{{ label }}</div>
            <div class="small">
              <AnimatedCounter
                :value="platformStats[index % platformStats.length]?.numericValue ?? 0"
                :decimals="index === 0 ? 2 : 0"
                suffix=" BTC"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
