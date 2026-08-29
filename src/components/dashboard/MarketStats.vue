<script setup lang="ts">
import Col from 'ant-design-vue/es/col'
import Row from 'ant-design-vue/es/row'
import Spin from 'ant-design-vue/es/spin'
import Tag from 'ant-design-vue/es/tag'
import { SwapOutlined } from '@ant-design/icons-vue'
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { UiMetric } from '@/ui'
import { useMarketStore } from '@/stores/market'

const market = useMarketStore()
const { pairStats, isLoading } = storeToRefs(market)

onMounted(() => {
  if (!pairStats.value) void market.fetchPairStats()
})

const statItems = computed(() => {
  const stats = pairStats.value
  if (!stats) return []

  const changeColor = stats.change24h >= 0 ? 'success' : 'error'

  return [
    { label: '24hr Volume', value: stats.volume24h, suffix: ' BTC', precision: 2 },
    { label: '24hr High', value: stats.high24h, suffix: ' BTC', precision: 4 },
    { label: '24hr Low', value: stats.low24h, suffix: ' BTC', precision: 4 },
    { label: 'Last Price', value: stats.lastPrice, suffix: ' BTC', precision: 4 },
    {
      label: 'Change',
      value: stats.change24h,
      suffix: '%',
      precision: 2,
      trend: `${stats.change24h >= 0 ? '+' : ''}${stats.change24h.toFixed(2)}%`,
      trendColor: changeColor as 'success' | 'error',
    },
  ]
})
</script>

<template>
  <Spin :spinning="isLoading && !pairStats">
    <UiMetric
      v-if="!statItems.length"
      title="Market Stats"
      value="—"
      :icon="SwapOutlined"
      :loading="isLoading"
    />
    <div v-else>
      <Tag color="blue" class="mb-3">
        <SwapOutlined />
        {{ pairStats?.pair ?? 'ETH / BTC' }}
      </Tag>
      <Row :gutter="[12, 12]">
        <Col v-for="item in statItems" :key="item.label" :xs="12" :sm="8">
          <UiMetric
            :title="item.label"
            :value="item.value"
            :suffix="item.suffix"
            :precision="item.precision"
            :trend="item.trend"
            :trend-color="item.trendColor"
          />
        </Col>
      </Row>
    </div>
  </Spin>
</template>
