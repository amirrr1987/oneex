<script setup lang="ts">
import { HistoryOutlined, UploadOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiPage, UiSection } from '@/ui'
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const { withdrawHistory } = storeToRefs(wallet)

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
  <UiPage
    title="Withdraw History"
    :icon="HistoryOutlined"
    subtitle="Track outgoing transfers and their status"
    :breadcrumbs="[
      { label: 'Wallet', to: '/balance' },
      { label: 'Withdraw History' },
    ]"
  >
    <UiSection title="Withdraw History">
      <template #icon><UploadOutlined /></template>
      <SortableTable :columns="columns" :rows="rows" row-key="id" empty-description="No withdrawals yet" />
    </UiSection>
  </UiPage>
</template>
