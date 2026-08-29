<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Typography from 'ant-design-vue/es/typography'
import { AccountBookOutlined, DollarOutlined, SwapOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'

import { useWalletStore } from '@/stores/wallet'

const { Text } = Typography

const wallet = useWalletStore()
const { balances } = storeToRefs(wallet)

const stats = [
  { coin: 'BTC', icon: DollarOutlined },
  { coin: 'ETH', icon: SwapOutlined },
  { coin: 'USDT', icon: AccountBookOutlined },
] as const
</script>

<template>
  <div class="grid grid-cols-1 gap-3 text-center md:grid-cols-3">
    <Card v-for="stat in stats" :key="stat.coin" class="h-full">
      <component :is="stat.icon" class="mb-2 text-3xl" />
      <Text strong class="mb-2 block uppercase">{{ stat.coin }} Total</Text>
      <Text class="mb-2 block font-mono text-sm">{{ balances?.[stat.coin] ?? '0.00000000' }}</Text>
      <Text class="text-sm uppercase">
        {{ stat.coin === 'USDT' ? 'USD equivalent' : stat.coin }}
      </Text>
    </Card>
  </div>
</template>
