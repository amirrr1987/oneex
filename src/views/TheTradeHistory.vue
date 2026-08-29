<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'

type TradeRow = {
  id: number
  fromTo: string
  amountSend: string
  amountReceive: string
  dateTime: string
  status: string
}

const slide = ref(0)

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'fromTo' as const, label: 'From/To' },
  { key: 'amountSend' as const, label: 'Amount Send' },
  { key: 'amountReceive' as const, label: 'Amount Receive' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows: TradeRow[] = [
  { id: 1, fromTo: 'BTC/ETH', amountSend: '0.1', amountReceive: '2.5', dateTime: '2024-01-01', status: 'Completed' },
  { id: 2, fromTo: 'ETH/BTC', amountSend: '2.0', amountReceive: '0.08', dateTime: '2024-01-02', status: 'Completed' },
  { id: 3, fromTo: 'TIC/BTC', amountSend: '100', amountReceive: '0.01', dateTime: '2024-01-03', status: 'Pending' },
]
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Trade History" icon="bi-clock-history" />

    <div class="row justify-content-center d-none d-md-flex">
      <div class="col-xl-10">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
            <i class="bi bi-arrow-left-right" />Trade History
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <SortableTable :columns="columns" :rows="rows" row-key="id" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-md-none">
      <SwipeCarousel v-model="slide" :length="rows.length">
        <div v-for="row in rows" :key="row.id" class="px-1">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="mb-0">{{ row.fromTo }}</h5>
                <StatusBadge :status="row.status" />
              </div>
              <dl class="row small mb-0">
                <dt class="col-5 text-muted">Send</dt>
                <dd class="col-7">{{ row.amountSend }}</dd>
                <dt class="col-5 text-muted">Receive</dt>
                <dd class="col-7">{{ row.amountReceive }}</dd>
                <dt class="col-5 text-muted">Date</dt>
                <dd class="col-7">{{ row.dateTime }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </SwipeCarousel>
    </div>
  </div>
</template>
