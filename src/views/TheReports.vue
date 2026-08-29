<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'

type ReportRow = {
  market: string
  lastPrice: string
  change24: string
  volume24: string
}

const coins = ['ETH', 'BTC', 'USDT', 'EOS'] as const
const activeCoin = ref<(typeof coins)[number]>('BTC')

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const rows: ReportRow[] = [
  { market: 'AE/BTC', lastPrice: '0.0012', change24: '+2%', volume24: '120 BTC' },
  { market: 'XTZ/BTC', lastPrice: '0.0008', change24: '-1%', volume24: '80 BTC' },
]
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Reports" icon="bi-file-earmark-bar-graph" />

    <div class="row justify-content-center mb-3">
      <div class="col-xl-10">
        <ul class="nav nav-tabs nav-fill">
          <li v-for="coin in coins" :key="coin" class="nav-item">
            <button
              type="button"
              class="nav-link text-uppercase"
              :class="{ active: activeCoin === coin }"
              @click="activeCoin = coin"
            >
              {{ coin }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="row justify-content-center mb-4">
      <div class="col-xl-10">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <input type="date" class="form-control" />
              </div>
              <div class="col-md-3">
                <input type="date" class="form-control" />
              </div>
              <div class="col-md-3">
                <select class="form-select">
                  <option>All Markets</option>
                  <option>AE/BTC</option>
                </select>
              </div>
              <div class="col-md-3">
                <select class="form-select">
                  <option>All Actions</option>
                  <option>Buy</option>
                  <option>Sell</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="bg-light py-4">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="card shadow-sm">
            <div class="card-header d-flex align-items-center gap-2">
              <i class="bi bi-file-earmark-spreadsheet" />{{ activeCoin }} Report
            </div>
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
