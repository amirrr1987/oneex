<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Radio from 'ant-design-vue/es/radio'
import Typography from 'ant-design-vue/es/typography'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { useTradingStore } from '@/stores/trading'

const { Title } = Typography
const trading = useTradingStore()
const { orders } = storeToRefs(trading)

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'filled', label: 'Filled' },
  { id: 'canceled', label: 'Canceled' },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('filled')

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
  <Card class="h-full">
    <template #title>
      <span class="inline-flex items-center gap-2">
        <UnorderedListOutlined />
        <Title :level="5" class="mb-0">My Order</Title>
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
</template>
