<script setup lang="ts">
import { ref } from 'vue'

import SortableTable from '@/components/dashboard/SortableTable.vue'

type OrderRow = {
  id: number
  amount: string
  price: string
  cancel: string
}

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'filled', label: 'Filled' },
  { id: 'canceled', label: 'Canceled' },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('active')

const activeColumns = [
  { key: 'id' as const, label: '#' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'price' as const, label: 'Price' },
  { key: 'cancel' as const, label: 'Cancel' },
]

const canceledColumns = [
  { key: 'id' as const, label: '#' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'price' as const, label: 'Price' },
]

const activeRows: OrderRow[] = [
  { id: 1, amount: 'Mark', price: 'Otto', cancel: '@mdo' },
  { id: 2, amount: 'Jacob', price: 'Thornton', cancel: '@fat' },
  { id: 3, amount: 'Larry', price: 'the Bird', cancel: '@twitter' },
]
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-header bg-white d-flex align-items-center gap-2">
      <i class="bi bi-list-check text-primary" />
      <h6 class="mb-0">My Order</h6>
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
        <SortableTable
          :columns="activeTab === 'canceled' ? canceledColumns : activeColumns"
          :rows="activeRows"
          row-key="id"
        />
      </div>
    </div>
  </div>
</template>
