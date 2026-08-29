<script setup lang="ts">
import Empty from 'ant-design-vue/es/empty'
import Input from 'ant-design-vue/es/input'
import Segmented from 'ant-design-vue/es/segmented'
import Space from 'ant-design-vue/es/space'
import Spin from 'ant-design-vue/es/spin'
import { DollarOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiSection } from '@/ui'
import { useMarketStore } from '@/stores/market'

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

const tabs = [
  { label: 'BTC', value: 'btc', icon: DollarOutlined },
  { label: 'TIC', value: 'tic', icon: DollarOutlined },
  { label: 'GVC', value: 'gvc', icon: StarOutlined },
] as const

const activeTab = ref<(typeof tabs)[number]['value']>('btc')
const searchQuery = ref('')
const debouncedQuery = ref('')

const applySearch = useDebounceFn((value: string) => {
  debouncedQuery.value = value.trim().toLowerCase()
}, 250)

watch(searchQuery, (value) => {
  void applySearch(value)
})

watch(activeTab, (tab) => {
  void market.fetchMarkets(tab.toUpperCase())
})

onMounted(() => {
  void market.fetchMarkets('BTC')
})

const tabOptions = computed(() => tabs.map((tab) => ({ label: tab.label, value: tab.value })))

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const filteredRows = computed(() => {
  const source = rows.value.map((row) => ({
    market: row.market,
    lastPrice: row.lastPrice,
    change24: row.change24,
    volume24: row.volume24,
  }))

  if (!debouncedQuery.value) return source
  return source.filter((row) =>
    Object.values(row).some((value) => value.toLowerCase().includes(debouncedQuery.value)),
  )
})
</script>

<template>
  <Spin :spinning="isLoading">
    <UiSection title="Instruments" subtitle="Search and browse quote markets">
      <template #icon><SearchOutlined /></template>

      <Space direction="vertical" class="w-full" :size="12">
        <Input
          v-model:value="searchQuery"
          type="search"
          placeholder="Search markets..."
          allow-clear
          size="large"
        >
          <template #prefix><SearchOutlined /></template>
        </Input>

        <Segmented v-model:value="activeTab" block :options="tabOptions" />

        <SortableTable
          v-if="filteredRows.length"
          :columns="columns"
          :rows="filteredRows"
          row-key="market"
        />
        <Empty v-else description="No markets match your search" />
      </Space>
    </UiSection>
  </Spin>
</template>
