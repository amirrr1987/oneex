<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import DatePicker from 'ant-design-vue/es/date-picker'
import Radio from 'ant-design-vue/es/radio'
import Select from 'ant-design-vue/es/select'
import Spin from 'ant-design-vue/es/spin'
import Typography from 'ant-design-vue/es/typography'
import { BarChartOutlined, TableOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import { useMarketStore } from '@/stores/market'

const { Text } = Typography

const coins = ['ETH', 'BTC', 'USDT', 'EOS'] as const
const activeCoin = ref<(typeof coins)[number]>('BTC')

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

const columns = [
  { key: 'market' as const, label: 'Market' },
  { key: 'lastPrice' as const, label: 'Last Price' },
  { key: 'change24' as const, label: '24 Change' },
  { key: 'volume24' as const, label: '24 Volume' },
]

const tableRows = computed(() =>
  rows.value.map((row) => ({
    market: row.market,
    lastPrice: row.lastPrice,
    change24: row.change24,
    volume24: row.volume24,
  })),
)

onMounted(() => {
  void market.fetchMarkets(activeCoin.value)
})

watch(activeCoin, (coin) => {
  void market.fetchMarkets(coin)
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Reports" :icon="BarChartOutlined" />

    <div class="mb-3 flex justify-center">
      <div class="w-full max-w-5xl">
        <Radio.Group v-model:value="activeCoin" button-style="solid" class="flex w-full">
          <Radio.Button
            v-for="coin in coins"
            :key="coin"
            :value="coin"
            class="flex-1 text-center uppercase"
          >
            {{ coin }}
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>

    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-5xl">
        <Card>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-4">
            <DatePicker class="w-full" />
            <DatePicker class="w-full" />
            <Select class="w-full" default-value="All Markets">
              <Select.Option value="All Markets">All Markets</Select.Option>
              <Select.Option value="AE/BTC">AE/BTC</Select.Option>
            </Select>
            <Select class="w-full" default-value="All Actions">
              <Select.Option value="All Actions">All Actions</Select.Option>
              <Select.Option value="Buy">Buy</Select.Option>
              <Select.Option value="Sell">Sell</Select.Option>
            </Select>
          </div>
        </Card>
      </div>
    </div>

    <section class="py-4">
      <div class="flex justify-center">
        <div class="w-full max-w-5xl">
          <Spin :spinning="isLoading">
            <Card>
              <template #title>
                <span class="inline-flex items-center gap-2">
                  <TableOutlined />Market Report · {{ activeCoin }}
                </span>
              </template>
              <SortableTable :columns="columns" :rows="tableRows" row-key="market" />
              <Text v-if="!tableRows.length" class="mt-3 block text-sm">
                No markets found for {{ activeCoin }} quote.
              </Text>
            </Card>
          </Spin>
        </div>
      </div>
    </section>
  </div>
</template>
