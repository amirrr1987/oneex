<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { HistoryOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import { useWalletStore } from '@/stores/wallet'

const { Title } = Typography
const wallet = useWalletStore()
const { withdrawHistory } = storeToRefs(wallet)
const slide = ref(0)

const columns = [
  { key: 'id' as const, label: 'ID' },
  { key: 'coin' as const, label: 'Coin' },
  { key: 'address' as const, label: 'To Address' },
  { key: 'amount' as const, label: 'Amount' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows = computed(() =>
  withdrawHistory.value.map((entry) => ({
    id: entry.id.slice(0, 8),
    coin: entry.coin,
    address: `${entry.address.slice(0, 8)}…${entry.address.slice(-4)}`,
    amount: `${entry.amount} (+ fee ${entry.fee})`,
    dateTime: new Date(entry.createdAt).toLocaleString(),
    status: entry.status,
  })),
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Withdraw History" :icon="HistoryOutlined" />

    <div class="hidden justify-center md:flex">
      <div class="w-full max-w-5xl">
        <Card>
          <template #title>
            <span class="inline-flex items-center gap-2">
              <UploadOutlined />Withdraw History
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
              <Title :level="5" class="mb-0">{{ row.coin }}</Title>
              <StatusBadge :status="row.status" />
            </div>
            <dl class="mb-0 grid grid-cols-12 gap-y-1 text-sm">
              <dt class="col-span-5">Amount</dt>
              <dd class="col-span-7">{{ row.amount }}</dd>
              <dt class="col-span-5">Address</dt>
              <dd class="col-span-7 truncate">{{ row.address }}</dd>
              <dt class="col-span-5">Date</dt>
              <dd class="col-span-7">{{ row.dateTime }}</dd>
            </dl>
          </Card>
        </div>
      </SwipeCarousel>
    </div>
  </div>
</template>
