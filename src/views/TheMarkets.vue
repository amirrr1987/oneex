<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Empty from 'ant-design-vue/es/empty'
import Segmented from 'ant-design-vue/es/segmented'
import Spin from 'ant-design-vue/es/spin'
import { RiseOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import BalanceStats from '@/components/panel/BalanceStats.vue'
import { UiPage } from '@/ui'
import { useMarketStore } from '@/stores/market'

const tabs = ['Favorite', 'BTC', 'TIC', 'GVC', 'ETH'] as const
const activeTab = ref<(typeof tabs)[number]>('BTC')

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

const tabOptions = computed(() =>
  tabs.map((tab) => ({
    label: tab === 'Favorite' ? '★ Favorite' : tab,
    value: tab,
  })),
)

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'max24' as const, label: '24 Max Price' },
  { key: 'min24' as const, label: '24 Min Price' },
  { key: 'volume24' as const, label: '24 Volume' },
]

onMounted(() => {
  void market.fetchMarkets('BTC')
})

watch(activeTab, (tab) => {
  if (tab !== 'Favorite') void market.fetchMarkets(tab)
})
</script>

<template>
  <UiPage title="Markets" :icon="RiseOutlined" subtitle="Live prices across all trading pairs">
    <Card hoverable>
      <BalanceStats />
    </Card>

    <Segmented v-model:value="activeTab" block :options="tabOptions" />

    <Spin :spinning="isLoading">
      <Card hoverable>
        <SortableTable
          v-if="activeTab !== 'Favorite' || rows.length"
          :columns="columns"
          :rows="rows"
          row-key="market"
        />
        <Empty v-else description="Add markets to favorites (demo)" />
      </Card>
    </Spin>
  </UiPage>
</template>
