<script setup lang="ts">
import Alert from 'ant-design-vue/es/alert'
import Card from 'ant-design-vue/es/card'
import Tag from 'ant-design-vue/es/tag'
import Typography from 'ant-design-vue/es/typography'
import { BookOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

import { TRADING_PAIR } from '@/constants/exchange'
import SortableTable from '@/components/dashboard/SortableTable.vue'
import { useTradingStore } from '@/stores/trading'

const { Title } = Typography
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
</script>

<template>
  <Card hoverable class="h-full">
    <template #title>
      <span class="inline-flex items-center gap-2">
        <BookOutlined />
        <Title :level="5" class="mb-0">Order Book</Title>
        <Tag>{{ TRADING_PAIR.label }}</Tag>
      </span>
    </template>

    <SortableTable :columns="columns" :rows="orderBook" row-key="count" />

    <div class="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
      <Alert type="info" :message="`Best bid ${orderBook[0]?.totalBid ?? '-'} BTC`" show-icon />
      <Alert type="info" :message="`Last price ${lastPrice} BTC`" show-icon />
    </div>
  </Card>
</template>
