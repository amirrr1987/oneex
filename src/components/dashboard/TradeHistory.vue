<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Radio from 'ant-design-vue/es/radio'
import Spin from 'ant-design-vue/es/spin'
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
  { id: 'active', label: 'Active' },
  { id: 'filled', label: 'Filled' },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('filled')

onMounted(() => {
  if (!recentTrades.value.length) void trading.fetchTradingData()
})

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'fromTo' as const, label: 'From/To' },
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
  <Spin :spinning="isLoading && !recentTrades.length">
    <Card class="h-full">
      <template #title>
        <span class="inline-flex items-center gap-2">
          <HistoryOutlined />
          <Title :level="5" class="mb-0">Last 5 Trade</Title>
        </span>
      </template>

      <Radio.Group v-model:value="activeTab" button-style="solid" class="mb-3 flex w-full">
        <Radio.Button
          v-for="tab in tabs"
          :key="tab.id"
          :value="tab.id"
          class="flex-1 text-center"
        >
          {{ tab.label }}
        </Radio.Button>
      </Radio.Group>

      <SortableTable :columns="columns" :rows="rows" row-key="id" />
    </Card>
  </Spin>
</template>
