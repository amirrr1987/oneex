<script setup lang="ts">
import Col from 'ant-design-vue/es/col'
import Row from 'ant-design-vue/es/row'
import { AccountBookOutlined, DollarOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

import { UiMetric } from '@/ui'
import { useWalletStore } from '@/stores/wallet'

const wallet = useWalletStore()
const { balances } = storeToRefs(wallet)

const stats = [
  { coin: 'BTC', icon: DollarOutlined, precision: 8, color: '#f59e0b' },
  { coin: 'ETH', icon: SwapOutlined, precision: 8, color: '#6366f1' },
  { coin: 'USDT', icon: AccountBookOutlined, precision: 2, color: '#22c55e' },
] as const
</script>

<template>
  <Row :gutter="[16, 16]">
    <Col v-for="stat in stats" :key="stat.coin" :xs="24" :md="8">
      <UiMetric
        :title="`${stat.coin} Balance`"
        :value="balances?.[stat.coin] ?? 0"
        :precision="stat.precision"
        :icon="stat.icon"
      />
    </Col>
  </Row>
</template>
