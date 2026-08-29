<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'

type TradeRow = {
  id: number
  fromTo: string
  amount: string
  type: string
  dateTime: string
}

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'filled', label: 'Filled' },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('active')

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'fromTo' as const, label: 'From/To' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'type' as const, label: 'Type' },
  { key: 'dateTime' as const, label: 'Date/Time' },
]

const rows: TradeRow[] = [
  { id: 1, fromTo: 'Mark', amount: 'Otto', type: '@mdo', dateTime: '@mdo' },
  { id: 2, fromTo: 'Jacob', amount: 'Thornton', type: '@fat', dateTime: '@fat' },
  { id: 3, fromTo: 'Larry', amount: 'the Bird', type: '@twitter', dateTime: '@twitter' },
  { id: 4, fromTo: 'Larry', amount: 'the Bird', type: '@twitter', dateTime: '@twitter' },
  { id: 5, fromTo: 'Larry', amount: 'the Bird', type: '@twitter', dateTime: '@twitter' },
]
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-header bg-white d-flex align-items-center gap-2">
      <i class="bi bi-clock-history text-primary" />
      <h6 class="mb-0">Last 5 Trade</h6>
    </div>
    <div class="card-body">
      <ul class="nav nav-tabs nav-fill mb-3" role="tablist">
        <li v-for="tab in tabs" :key="tab.id" class="nav-item">
          <button
            type="button"
            class="nav-link"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div class="table-responsive">
        <SortableTable :columns="columns" :rows="rows" row-key="id" />
      </div>
    </div>
  </div>
</template>
