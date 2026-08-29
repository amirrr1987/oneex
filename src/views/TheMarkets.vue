<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import BalanceStats from '@/components/panel/BalanceStats.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'

type MarketRow = {
  market: string
  lastPrice: string
  change24: string
  max24: string
  min24: string
  volume24: string
}

const tabs = ['Favorite', 'BTC', 'TIC', 'GVC', 'ETH'] as const
const activeTab = ref<(typeof tabs)[number]>('BTC')

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'max24' as const, label: '24 Max Price' },
  { key: 'min24' as const, label: '24 Min Price' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const rows: MarketRow[] = [
  { market: 'AE/BTC', lastPrice: '0.0012', change24: '+2%', max24: '0.0015', min24: '0.0010', volume24: '120 BTC' },
  { market: 'XTZ/BTC', lastPrice: '0.0008', change24: '-1%', max24: '0.0009', min24: '0.0007', volume24: '80 BTC' },
  { market: 'TIC/BTC', lastPrice: '0.0003', change24: '+5%', max24: '0.0004', min24: '0.0002', volume24: '200 BTC' },
]
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Markets" icon="bi-graph-up-arrow" />

    <div class="row justify-content-center mb-4">
      <div class="col-xl-9">
        <div class="card shadow-sm">
          <div class="card-body">
            <BalanceStats />
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mb-3">
      <div class="col-xl-10">
        <ul class="nav nav-tabs nav-fill">
          <li v-for="tab in tabs" :key="tab" class="nav-item">
            <button
              type="button"
              class="nav-link text-uppercase"
              :class="{ active: activeTab === tab }"
              @click="activeTab = tab"
            >
              <i v-if="tab === 'Favorite'" class="bi bi-star me-1" />
              {{ tab }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <section class="bg-light py-4">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card shadow-sm">
            <div class="card-body p-0">
              <div class="table-responsive">
                <SortableTable :columns="columns" :rows="rows" row-key="market" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
