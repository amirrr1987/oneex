<script setup lang="ts">
import Button from 'ant-design-vue/es/button'
import Card from 'ant-design-vue/es/card'
import Input from 'ant-design-vue/es/input'
import Radio from 'ant-design-vue/es/radio'
import Spin from 'ant-design-vue/es/spin'
import Typography from 'ant-design-vue/es/typography'
import { CloseOutlined, DollarOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { useMarketStore } from '@/stores/market'

const { Title, Text } = Typography

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

const tabs = [
  { id: 'btc', label: 'BTC', icon: DollarOutlined },
  { id: 'tic', label: 'TIC', icon: DollarOutlined },
  { id: 'gvc', label: 'GVC', icon: StarOutlined },
] as const

const activeTab = ref<(typeof tabs)[number]['id']>('btc')
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
    <Card class="flex-grow">
      <template #title>
        <span class="inline-flex items-center gap-2">
          <SearchOutlined />
          <Title :level="5" class="mb-0">Instruments</Title>
        </span>
      </template>

      <Input v-model:value="searchQuery" type="search" placeholder="Search markets..." class="mb-3">
        <template #prefix>
          <SearchOutlined />
        </template>
        <template v-if="searchQuery" #suffix>
          <Button type="text" size="small" aria-label="Clear search" @click="searchQuery = ''">
            <template #icon><CloseOutlined /></template>
          </Button>
        </template>
      </Input>

      <Radio.Group v-model:value="activeTab" button-style="solid" class="mb-3 flex w-full">
        <Radio.Button
          v-for="tab in tabs"
          :key="tab.id"
          :value="tab.id"
          class="flex-1 text-center"
        >
          <span class="inline-flex items-center justify-center gap-1">
            <component :is="tab.icon" />
            {{ tab.label }}
          </span>
        </Radio.Button>
      </Radio.Group>

      <SortableTable v-if="filteredRows.length" :columns="columns" :rows="filteredRows" row-key="market" />
      <div v-else class="py-4 text-center">
        <SearchOutlined class="mb-2 block text-5xl" />
        <Text class="text-sm">No markets match your search.</Text>
      </div>
    </Card>
  </Spin>
</template>
