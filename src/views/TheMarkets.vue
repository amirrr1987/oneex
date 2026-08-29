<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Radio from 'ant-design-vue/es/radio'
import Spin from 'ant-design-vue/es/spin'
import { RiseOutlined, StarOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import BalanceStats from '@/components/panel/BalanceStats.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import { useMarketStore } from '@/stores/market'

const tabs = ['Favorite', 'BTC', 'TIC', 'GVC', 'ETH'] as const
const activeTab = ref<(typeof tabs)[number]>('BTC')

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

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
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Markets" :icon="RiseOutlined" />

    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-4xl">
        <Card>
          <BalanceStats />
        </Card>
      </div>
    </div>

    <div class="mb-3 flex justify-center">
      <div class="w-full max-w-5xl">
        <Radio.Group v-model:value="activeTab" button-style="solid" class="flex w-full">
          <Radio.Button
            v-for="tab in tabs"
            :key="tab"
            :value="tab"
            class="flex-1 text-center uppercase"
          >
            <StarOutlined v-if="tab === 'Favorite'" class="mr-1" />
            {{ tab }}
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>

    <section class="py-4">
      <div class="flex justify-center">
        <div class="w-full max-w-5xl">
          <Spin :spinning="isLoading">
            <Card>
              <SortableTable
                v-if="activeTab !== 'Favorite' || rows.length"
                :columns="columns"
                :rows="rows"
                row-key="market"
              />
              <p v-else class="py-8 text-center text-sm">Add markets to favorites (demo).</p>
            </Card>
          </Spin>
        </div>
      </div>
    </section>
  </div>
</template>
