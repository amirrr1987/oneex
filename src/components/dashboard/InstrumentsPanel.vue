<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import SortableTable from '@/components/dashboard/SortableTable.vue'

type InstrumentRow = {
  market: string
  lastPrice: string
  change24: string
  volume24: string
}

const tabs = [
  { id: 'btc', label: 'BTC', icon: 'bi-currency-bitcoin' },
  { id: 'tic', label: 'TIC', icon: 'bi-coin' },
  { id: 'gvc', label: 'GVC', icon: 'bi-gem' },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('btc')
const searchQuery = ref('')
const debouncedQuery = ref('')

const applySearch = useDebounceFn((value: string) => {
  debouncedQuery.value = value.trim().toLowerCase()
}, 250)

watch(searchQuery, (value) => {
  void applySearch(value)
})

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const allRows: InstrumentRow[] = [
  { market: 'AE/BTC', lastPrice: '0.0001099', change24: '+2.4%', volume24: '120 BTC' },
  { market: 'REP/BTC', lastPrice: '0.0001099', change24: '-1.1%', volume24: '80 BTC' },
  { market: 'XTZ/BTC', lastPrice: '0.0000451', change24: '+0.8%', volume24: '200 BTC' },
  { market: 'TIC/BTC', lastPrice: '0.0000125', change24: '+5.2%', volume24: '340 BTC' },
  { market: 'GVC/BTC', lastPrice: '0.0000088', change24: '-0.5%', volume24: '45 BTC' },
]

const filteredRows = computed(() => {
  if (!debouncedQuery.value) return allRows
  return allRows.filter((row) =>
    Object.values(row).some((value) => value.toLowerCase().includes(debouncedQuery.value)),
  )
})
</script>

<template>
  <div class="card shadow-sm flex-grow-1">
    <div class="card-header bg-white d-flex align-items-center gap-2">
      <i class="bi bi-search text-primary" />
      <h6 class="mb-0">Instruments</h6>
    </div>
    <div class="card-body">
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-search" /></span>
        <input
          v-model="searchQuery"
          class="form-control"
          type="search"
          placeholder="Search markets..."
        />
        <button
          v-if="searchQuery"
          class="btn btn-outline-secondary"
          type="button"
          aria-label="Clear search"
          @click="searchQuery = ''"
        >
          <i class="bi bi-x-lg" />
        </button>
      </div>

      <ul class="nav nav-tabs nav-fill mb-3" role="tablist">
        <li v-for="tab in tabs" :key="tab.id" class="nav-item">
          <button
            type="button"
            class="nav-link d-inline-flex align-items-center justify-content-center gap-1"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <i :class="['bi', tab.icon]" />
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div v-if="filteredRows.length" class="table-responsive">
        <SortableTable :columns="columns" :rows="filteredRows" row-key="market" />
      </div>
      <p v-else class="text-center text-muted small mb-0 py-4">
        <i class="bi bi-search display-6 d-block mb-2" />
        No markets match your search.
      </p>
    </div>
  </div>
</template>
