<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Segmented from 'ant-design-vue/es/segmented'
import Space from 'ant-design-vue/es/space'
import Typography from 'ant-design-vue/es/typography'
import { HistoryOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { useTradingStore } from '@/stores/trading'

const { Title } = Typography
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
  <Card hoverable class="h-full" :loading="isLoading && !recentTrades.length">
    <template #title>
      <Space>
        <HistoryOutlined />
        <Title :level="5" class="mb-0">Last 5 Trades</Title>
      </Space>
    </template>

    <Segmented v-model:value="activeTab" block :options="[...tabs]" class="mb-4" />

    <SortableTable
      :columns="columns"
      :rows="rows"
      row-key="id"
      empty-description="No recent trades"
    />
  </Card>
</template>
