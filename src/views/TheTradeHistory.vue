<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { HistoryOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import { useTradingStore } from '@/stores/trading'

const { Title } = Typography
const trading = useTradingStore()
const { orders } = storeToRefs(trading)
const slide = ref(0)

const columns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'fromTo' as const, label: 'Pair' },
  { key: 'amountSend' as const, label: 'Amount' },
  { key: 'amountReceive' as const, label: 'Price' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows = computed(() =>
  orders.value.map((order) => ({
    id: order.id.slice(0, 8),
    fromTo: order.pair,
    amountSend: `${order.amount} ETH`,
    amountReceive: `${order.price} BTC`,
    dateTime: new Date(order.createdAt).toLocaleString(),
    status: order.status,
  })),
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Trade History" :icon="HistoryOutlined" />

    <div class="hidden justify-center md:flex">
      <div class="w-full max-w-5xl">
        <Card>
          <template #title>
            <span class="inline-flex items-center gap-2">
              <SwapOutlined />Trade History
            </span>
          </template>
          <SortableTable :columns="columns" :rows="rows" row-key="id" />
        </Card>
      </div>
    </div>

    <div class="md:hidden">
      <SwipeCarousel v-model="slide" :length="rows.length || 1">
        <div v-for="row in rows" :key="row.id" class="px-1">
          <Card>
            <div class="mb-3 flex items-start justify-between">
              <Title :level="5" class="mb-0">{{ row.fromTo }}</Title>
              <StatusBadge :status="row.status" />
            </div>
            <dl class="mb-0 grid grid-cols-12 gap-y-1 text-sm">
              <dt class="col-span-5">Amount</dt>
              <dd class="col-span-7">{{ row.amountSend }}</dd>
              <dt class="col-span-5">Price</dt>
              <dd class="col-span-7">{{ row.amountReceive }}</dd>
              <dt class="col-span-5">Date</dt>
              <dd class="col-span-7">{{ row.dateTime }}</dd>
            </dl>
          </Card>
        </div>
      </SwipeCarousel>
    </div>
  </div>
</template>
