<script setup lang="ts">
import { HistoryOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiPage, UiSection } from '@/ui'
import { useTradingStore } from '@/stores/trading'

const trading = useTradingStore()
const { orders } = storeToRefs(trading)

const columns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'fromTo' as const, label: 'Pair' },
  { key: 'amountSend' as const, label: 'Amount' },
  { key: 'amountReceive' as const, label: 'Price' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows = computed(() =>
  orders.value.map((order) => ({
    id: order.id.slice(0, 8),
    fromTo: order.pair,
    amountSend: `${order.amount} ETH`,
    amountReceive: `${order.price} BTC`,
    dateTime: new Date(order.createdAt).toLocaleString(),
    status: order.status,
  })),
)
</script>

<template>
  <UiPage
    title="Trade History"
    :icon="HistoryOutlined"
    subtitle="Review your completed and pending orders"
    :breadcrumbs="[
      { label: 'Exchange', to: '/exchange' },
      { label: 'Trade History' },
    ]"
  >
    <UiSection title="Trade History">
      <template #icon><SwapOutlined /></template>
      <SortableTable :columns="columns" :rows="rows" row-key="id" empty-description="No trades yet" />
    </UiSection>
  </UiPage>
</template>
