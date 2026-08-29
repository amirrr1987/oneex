<script setup lang="ts">
import Card from 'ant-design-vue/es/card'
import Spin from 'ant-design-vue/es/spin'
import Typography from 'ant-design-vue/es/typography'
import { SwapOutlined } from '@ant-design/icons-vue'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import AnimatedCounter from '@/components/shared/AnimatedCounter.vue'
import { useMarketStore } from '@/stores/market'

const { Title, Text } = Typography

const market = useMarketStore()
const { pairStats, isLoading } = storeToRefs(market)

onMounted(() => {
  if (!pairStats.value) void market.fetchPairStats()
})

const statItems = computed(() => {
  const stats = pairStats.value
  if (!stats) return []

  return [
    { label: '24hr Volume', value: stats.volume24h, suffix: ' BTC', decimals: 2 },
    { label: '24hr High', value: stats.high24h, suffix: ' BTC', decimals: 4 },
    { label: '24hr Low', value: stats.low24h, suffix: ' BTC', decimals: 4 },
    { label: 'Last Price', value: stats.lastPrice, suffix: ' BTC', decimals: 4 },
    { label: 'Change', value: stats.change24h, suffix: '%', decimals: 2 },
  ]
})
</script>

<template>
  <Spin :spinning="isLoading && !pairStats">
    <Card
      v-motion
      :initial="{ opacity: 0, y: 12 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }"
    >
      <div class="grid grid-cols-1 items-center gap-3 md:grid-cols-3">
        <div class="text-center">
          <Title :level="5" class="mb-0 inline-flex items-center justify-center gap-2 uppercase">
            <SwapOutlined />{{ pairStats?.pair ?? 'ETH / BTC' }}
          </Title>
        </div>
        <div v-for="item in statItems" :key="item.label" class="md:col-span-1">
          <div class="rounded border p-3 text-center">
            <Text strong class="block">{{ item.label }}</Text>
            <div class="text-sm">
              <AnimatedCounter
                :value="item.value"
                :decimals="item.decimals"
                :suffix="item.suffix"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Spin>
</template>
