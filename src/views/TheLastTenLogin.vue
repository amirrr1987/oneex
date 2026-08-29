<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { DesktopOutlined, LoginOutlined, SafetyCertificateOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import SortableTable from '@/components/dashboard/SortableTable.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import SwipeCarousel from '@/components/shared/SwipeCarousel.vue'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import { useAuthStore } from '@/stores/auth'

const { Title } = Typography
const auth = useAuthStore()
const { loginHistory } = storeToRefs(auth)
const slide = ref(0)

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
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Last 10 Login" :icon="LoginOutlined" />

    <div class="hidden justify-center md:flex">
      <div class="w-full max-w-5xl">
        <Card>
          <template #title>
            <span class="inline-flex items-center gap-2">
              <SafetyCertificateOutlined />Recent Login Sessions
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
              <Title :level="5" class="mb-0 inline-flex items-center gap-2">
                <DesktopOutlined />{{ row.device }}
              </Title>
              <StatusBadge :status="row.status" />
            </div>
            <dl class="mb-0 grid grid-cols-12 gap-y-1 text-sm">
              <dt class="col-span-4">IP</dt>
              <dd class="col-span-8">{{ row.ip }}</dd>
              <dt class="col-span-4">Date</dt>
              <dd class="col-span-8">{{ row.dateTime }}</dd>
            </dl>
          </Card>
        </div>
      </SwipeCarousel>
    </div>
  </div>
</template>
