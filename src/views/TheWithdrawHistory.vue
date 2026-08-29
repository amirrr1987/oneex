<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'

type WithdrawRow = {
  id: number
  coin: string
  address: string
  amount: string
  dateTime: string
  status: string
}

const slide = ref(0)

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'coin' as const, label: 'Coin' },
  { key: 'address' as const, label: 'To Address' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows: WithdrawRow[] = [
  { id: 1, coin: 'BTC', address: '3Mdz...WF3W', amount: '0.05', dateTime: '2024-01-01', status: 'Completed' },
  { id: 2, coin: 'ETH', address: '0xabc...123', amount: '1.2', dateTime: '2024-01-02', status: 'Pending' },
  { id: 3, coin: 'TIC', address: 'tic1...xyz', amount: '500', dateTime: '2024-01-03', status: 'Failed' },
]
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Withdraw History" icon="bi-clock-history" />

    <div class="row justify-content-center d-none d-md-flex">
      <div class="col-xl-10">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
            <i class="bi bi-upload" />Withdraw History
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
                <h5 class="mb-0">{{ row.coin }}</h5>
                <StatusBadge :status="row.status" />
              </div>
              <dl class="row small mb-0">
                <dt class="col-5 text-muted">Amount</dt>
                <dd class="col-7">{{ row.amount }}</dd>
                <dt class="col-5 text-muted">Address</dt>
                <dd class="col-7 text-truncate">{{ row.address }}</dd>
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
