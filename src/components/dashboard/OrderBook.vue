<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Col from 'ant-design-vue/es/col'
import Row from 'ant-design-vue/es/row'
import Tag from 'ant-design-vue/es/tag'
import { ArrowDownOutlined, ArrowUpOutlined, BookOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { TRADING_PAIR } from '@/constants/exchange'
import { UiMetric, UiSection } from '@/ui'
import { useTradingStore } from '@/stores/trading'

const trading = useTradingStore()
const { orderBook, lastPrice } = storeToRefs(trading)

const columns = [
  { key: 'count' as const, label: 'Count' },
  { key: 'amountEth' as const, label: 'Amount (ETH)' },
  { key: 'totalBid' as const, label: 'Total (BTC) Bid' },
  { key: 'askPrice' as const, label: 'Ask Price' },
  { key: 'totalBtc' as const, label: 'Total (BTC)' },
  { key: 'amountEthAsk' as const, label: 'Amount (ETH)' },
]

const bestBid = computed(() => orderBook.value[0]?.totalBid ?? '—')
const spread = computed(() => {
  const ask = Number(orderBook.value[0]?.askPrice)
  const bid = Number(orderBook.value[0]?.totalBid)
  if (!ask || !bid) return '—'
  return `${((ask - bid) * 100).toFixed(4)}%`
})
</script>

<template>
  <UiSection title="Order Book" :subtitle="`Depth for ${TRADING_PAIR.label}`">
    <template #icon><BookOutlined /></template>
    <template #extra>
      <Tag color="processing">Live</Tag>
    </template>

    <Row :gutter="[12, 12]" class="mb-4">
      <Col :xs="24" :sm="8">
        <UiMetric title="Best Bid" :value="bestBid" suffix=" BTC" :icon="ArrowUpOutlined" trend="Buy side" trend-color="success" />
      </Col>
      <Col :xs="24" :sm="8">
        <UiMetric title="Last Price" :value="lastPrice" suffix=" BTC" trend="Mid market" />
      </Col>
      <Col :xs="24" :sm="8">
        <UiMetric title="Spread" :value="spread" :icon="ArrowDownOutlined" trend="Ask − Bid" trend-color="warning" />
      </Col>
    </Row>

    <SortableTable :columns="columns" :rows="orderBook" row-key="count" empty-description="Order book loading..." />

    <Alert
      class="mt-4"
      type="info"
      show-icon
      message="Demo order book — prices refresh with each trade on the exchange page."
    />
  </UiSection>
</template>
