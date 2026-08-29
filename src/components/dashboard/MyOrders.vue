<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Segmented from 'ant-design-vue/es/segmented'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { useTradingStore } from '@/stores/trading'

const trading = useTradingStore()
const { orders } = storeToRefs(trading)

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Filled', value: 'filled' },
  { label: 'Canceled', value: 'canceled' },
] as const

const activeTab = ref<(typeof tabs)[number]['value']>('filled')

const columns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'side' as const, label: 'Side' },
  { key: 'amount' as const, label: 'Amount (ETH)' },
  { key: 'price' as const, label: 'Price (BTC)' },
  { key: 'status' as const, label: 'Status' },
]

const rows = computed(() => {
  const mapped = orders.value.map((order) => ({
    id: order.id.slice(0, 8),
    side: order.side.toUpperCase(),
    amount: order.amount.toFixed(4),
    price: order.price.toFixed(6),
    status: order.status,
  }))

  if (activeTab.value === 'active') {
    return mapped.filter((row) => row.status === 'Open')
  }
  if (activeTab.value === 'canceled') {
    return []
  }
  return mapped.filter((row) => row.status === 'Filled')
})
</script>

<template>
  <Card hoverable class="h-full">
    <template #title>My Orders</template>

    <Segmented v-model:value="activeTab" block :options="[...tabs]" class="mb-4" />

    <SortableTable
      :columns="columns"
      :rows="rows"
      row-key="id"
      empty-description="No orders in this category"
    />
  </Card>
</template>
