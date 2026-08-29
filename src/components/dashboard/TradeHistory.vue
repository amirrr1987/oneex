<script setup lang="ts">
import Segmented from 'ant-design-vue/es/segmented'
import Tag from 'ant-design-vue/es/tag'
import { HistoryOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiSection } from '@/ui'
import { useTradingStore } from '@/stores/trading'

const trading = useTradingStore()
const { recentTrades, isLoading } = storeToRefs(trading)

const tabs = [
  { label: 'Active', value: 'active' },
  { label: 'Filled', value: 'filled' },
] as const

const activeTab = ref<(typeof tabs)[number]['value']>('filled')

onMounted(() => {
  if (!recentTrades.value.length) void trading.fetchTradingData()
})

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'fromTo' as const, label: 'Pair' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'type' as const, label: 'Type' },
  { key: 'dateTime' as const, label: 'Date/Time' },
]

const rows = computed(() => {
  const mapped = recentTrades.value.map((trade, index) => ({
    id: index + 1,
    fromTo: trade.pair,
    amount: `${trade.amount} ETH @ ${trade.price} BTC`,
    type: trade.side.toUpperCase(),
    dateTime: new Date(trade.createdAt).toLocaleString(),
  }))

  if (activeTab.value === 'active') return []
  return mapped.slice(0, 5)
})
</script>

<template>
  <UiSection title="Last 5 Trades" subtitle="Recent fills on your account" :loading="isLoading && !recentTrades.length">
    <template #icon><HistoryOutlined /></template>
    <template #extra>
      <Tag color="blue">Recent</Tag>
    </template>

    <Segmented v-model:value="activeTab" block :options="[...tabs]" class="mb-4" />

    <SortableTable
      :columns="columns"
      :rows="rows"
      row-key="id"
      empty-description="No recent trades"
    />
  </UiSection>
</template>
