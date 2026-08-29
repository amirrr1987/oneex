<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Input from 'ant-design-vue/es/input'
import Progress from 'ant-design-vue/es/progress'
import Typography from 'ant-design-vue/es/typography'
import {
  DashboardOutlined,
  DownloadOutlined,
  UploadOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BalanceStats from '@/components/panel/BalanceStats.vue'
import PanelPageTitle from '@/components/panel/PanelPageTitle.vue'
import { DAILY_WITHDRAW_LIMIT_USDT } from '@/constants/exchange'
import { useWalletStore } from '@/stores/wallet'

const { Text } = Typography
const wallet = useWalletStore()

const withdrawProgress = computed(() => {
  const remaining = wallet.remainingDailyWithdrawLimit()
  return Math.round((remaining / DAILY_WITHDRAW_LIMIT_USDT) * 100)
})
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4">
    <PanelPageTitle title="Balance" :icon="WalletOutlined" />

    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-4xl">
        <Card>
          <BalanceStats />
        </Card>
      </div>
    </div>

    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-4xl">
        <Card>
          <Progress :percent="withdrawProgress" class="mb-3" />
          <Text class="block text-center">
            <DashboardOutlined class="mr-2" />
            {{ wallet.remainingDailyWithdrawLimit() }} USDT remaining of
            {{ DAILY_WITHDRAW_LIMIT_USDT }} daily withdrawal limit
          </Text>
        </Card>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <template #title>
          <span class="inline-flex items-center gap-2">
            <DownloadOutlined />Deposit funds
          </span>
        </template>
        <Text class="mb-4 block text-sm">
          Generate your personal deposit address and track blockchain confirmations.
        </Text>
        <RouterLink to="/deposit">
          <span>Open deposit page</span>
        </RouterLink>
      </Card>

      <Card>
        <template #title>
          <span class="inline-flex items-center gap-2">
            <UploadOutlined />Withdraw funds
          </span>
        </template>
        <Text class="mb-4 block text-sm">
          Withdraw to an external wallet with network fee and daily limit checks.
        </Text>
        <RouterLink to="/withdraw">
          <span>Open withdraw page</span>
        </RouterLink>
      </Card>
    </div>
  </div>
</template>
