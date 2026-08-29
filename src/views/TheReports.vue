<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Col from 'ant-design-vue/es/col'
import DatePicker from 'ant-design-vue/es/date-picker'
import Row from 'ant-design-vue/es/row'
import Segmented from 'ant-design-vue/es/segmented'
import Select from 'ant-design-vue/es/select'
import Space from 'ant-design-vue/es/space'
import Spin from 'ant-design-vue/es/spin'
import Typography from 'ant-design-vue/es/typography'
import { BarChartOutlined, TableOutlined } from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiPage } from '@/ui'
import { useMarketStore } from '@/stores/market'

const { Text } = Typography

const coins = ['ETH', 'BTC', 'USDT', 'EOS'] as const
const activeCoin = ref<(typeof coins)[number]>('BTC')

const market = useMarketStore()
const { rows, isLoading } = storeToRefs(market)

const coinOptions = computed(() => coins.map((coin) => ({ label: coin, value: coin })))

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
  <UiPage title="Reports" :icon="BarChartOutlined" subtitle="Historical market performance">
    <Segmented v-model:value="activeCoin" block :options="coinOptions" />

    <Card hoverable>
      <Row :gutter="[16, 16]">
        <Col :xs="24" :md="6">
          <DatePicker class="w-full" placeholder="From date" />
        </Col>
        <Col :xs="24" :md="6">
          <DatePicker class="w-full" placeholder="To date" />
        </Col>
        <Col :xs="24" :md="6">
          <Select class="w-full" default-value="All Markets" placeholder="Market">
            <Select.Option value="All Markets">All Markets</Select.Option>
            <Select.Option value="AE/BTC">AE/BTC</Select.Option>
          </Select>
        </Col>
        <Col :xs="24" :md="6">
          <Select class="w-full" default-value="All Actions" placeholder="Action">
            <Select.Option value="All Actions">All Actions</Select.Option>
            <Select.Option value="Buy">Buy</Select.Option>
            <Select.Option value="Sell">Sell</Select.Option>
          </Select>
        </Col>
      </Row>
    </Card>

    <Spin :spinning="isLoading">
      <Card hoverable>
        <template #title>
          <Space>
            <TableOutlined />
            Market Report · {{ activeCoin }}
          </Space>
        </template>
        <SortableTable :columns="columns" :rows="tableRows" row-key="market" />
        <Text v-if="!tableRows.length" type="secondary" class="mt-3 block">
          No markets found for {{ activeCoin }} quote.
        </Text>
      </Card>
    </Spin>
  </UiPage>
</template>
