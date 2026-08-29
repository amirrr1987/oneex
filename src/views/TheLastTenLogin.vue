<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'

type LoginRow = {
  id: number
  ip: string
  device: string
  dateTime: string
  status: string
}

const slide = ref(0)

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'ip' as const, label: 'IP Address' },
  { key: 'device' as const, label: 'Device' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows: LoginRow[] = [
  { id: 1, ip: '192.168.1.1', device: 'Chrome / Windows', dateTime: '2024-01-10 14:30', status: 'Success' },
  { id: 2, ip: '10.0.0.5', device: 'Safari / macOS', dateTime: '2024-01-09 09:15', status: 'Success' },
  { id: 3, ip: '172.16.0.2', device: 'Firefox / Linux', dateTime: '2024-01-08 18:45', status: 'Success' },
  { id: 4, ip: '192.168.1.1', device: 'Chrome / Windows', dateTime: '2024-01-07 11:00', status: 'Success' },
  { id: 5, ip: '203.0.113.1', device: 'Mobile / Android', dateTime: '2024-01-06 20:22', status: 'Failed' },
]
</script>

<template>
  <div class="container py-4">
    <PanelPageTitle title="Last 10 Login" icon="bi-box-arrow-in-right" />

    <div class="row justify-content-center d-none d-md-flex">
      <div class="col-xl-10">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
            <i class="bi bi-shield-check" />Recent Login Sessions
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
                <h6 class="mb-0"><i class="bi bi-pc-display me-2" />{{ row.device }}</h6>
                <StatusBadge :status="row.status" />
              </div>
              <dl class="row small mb-0">
                <dt class="col-4 text-muted">IP</dt>
                <dd class="col-8">{{ row.ip }}</dd>
                <dt class="col-4 text-muted">Date</dt>
                <dd class="col-8">{{ row.dateTime }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </SwipeCarousel>
    </div>
  </div>
</template>
