<script setup lang="ts">
import { LoginOutlined, SafetyCertificateOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import { UiPage, UiSection } from '@/ui'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { loginHistory } = storeToRefs(auth)

const columns = [
  { key: 'id' as const, label: '#' },
  { key: 'ip' as const, label: 'IP Address' },
  { key: 'device' as const, label: 'Device' },
  { key: 'dateTime' as const, label: 'Date/Time' },
  { key: 'status' as const, label: 'Status' },
]

const rows = computed(() =>
  loginHistory.value.map((entry, index) => ({
    id: index + 1,
    ip: entry.ip,
    device: entry.device,
    dateTime: new Date(entry.at).toLocaleString(),
    status: 'Success',
  })),
)
</script>

<template>
  <UiPage
    title="Last 10 Login"
    :icon="LoginOutlined"
    subtitle="Recent sign-in activity on your account"
    :breadcrumbs="[
      { label: 'Account', to: '/profile' },
      { label: 'Login History' },
    ]"
  >
    <UiSection title="Recent Login Sessions">
      <template #icon><SafetyCertificateOutlined /></template>
      <SortableTable :columns="columns" :rows="rows" row-key="id" empty-description="No login history" />
    </UiSection>
  </UiPage>
</template>
